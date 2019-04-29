package io.slingr.endpoints.coinbase;

import io.slingr.endpoints.HttpPerUserEndpoint;
import io.slingr.endpoints.exceptions.EndpointException;
import io.slingr.endpoints.exceptions.ErrorCode;
import io.slingr.endpoints.framework.annotations.*;
import io.slingr.endpoints.services.AppLogs;
import io.slingr.endpoints.services.exchange.ReservedName;
import io.slingr.endpoints.utils.Json;
import io.slingr.endpoints.ws.exchange.FunctionRequest;
import io.slingr.endpoints.ws.exchange.WebServiceResponse;
import org.apache.commons.lang.StringUtils;
import org.apache.http.entity.ContentType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <p>Coinbase endpoint
 * <p>
 * <p>Created by hpacini on 11/12/18.
 */
@SlingrEndpoint(name = "coinbase", functionPrefix = "_")
public class CoinbaseEndpoint extends HttpPerUserEndpoint {

    private static final Logger logger = LoggerFactory.getLogger(CoinbaseEndpoint.class);

    private final static String API_URL = "https://api.coinbase.com/";
    private final static String CB_ACCESS_SIGN = "CB-ACCESS-SIGN";
    private final static String CB_ACCESS_TIMESTAMP = "CB-ACCESS-TIMESTAMP";
    private final static String CB_ACCESS_KEY = "CB-ACCESS-KEY";

    private static final String OAUTH_URL = "https://api.coinbase.com/oauth/token";
    private static final String REFRESH_TOKEN = "refresh_token";
    private static final String ACCESS_TOKEN = "access_token";

    @ApplicationLogger
    protected AppLogs appLogger;

    @EndpointProperty
    private String clientId;

    @EndpointProperty
    private String clientSecret;

    @Override
    public String getApiUri() {
        return API_URL;
    }

    @Override
    public void endpointStarted() {
        httpService().setupDefaultHeader("Content-Type", "application/json");
        httpService().setAllowExternalUrl(true);
    }

    // Authentication process

    @EndpointWebService(path = "authCallback")
    public WebServiceResponse authCallback() {
        return new WebServiceResponse("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n" +
                "<html>\n" +
                "<head>\n" +
                "<title>Coinbase authentication</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "</body>\n" +
                "</html>", ContentType.TEXT_HTML.toString());
    }

    @EndpointFunction(name = ReservedName.CONNECT_USER)
    public Json connectUser(FunctionRequest request) {
        final String userId = request.getUserId();
        if(StringUtils.isNotBlank(userId)) {
            // checks if the user includes a non-empty 'code' on the request
            final Json jsonBody = request.getJsonParams();
            if (jsonBody != null && StringUtils.isNotBlank(jsonBody.string("code"))) {

                String code = jsonBody.string("code");
                Json accessTokenRequest = Json.map()
                        .set("path", OAUTH_URL)
                        .set("body", Json.map()
                                .set("grant_type", "authorization_code")
                                .set("code", code)
                                .set("client_id", clientId)
                                .set("client_secret", clientSecret)
                                .set("redirect_uri", jsonBody.string("redirectUri"))
                        );
                Json res = httpService().defaultPostRequest(accessTokenRequest);
                if (res.contains(ACCESS_TOKEN)) {

                    // saves the information on the users data store
                    Json conf = users().save(userId, res);
                    logger.info(String.format("User connected [%s] [%s]", userId, conf.toString()));

                    // sends connected user event
                    users().sendUserConnectedEvent(request.getFunctionId(), userId, conf);

                    return conf;
                } else {
                    logger.warn(String.format("Problems trying to connect user [%s] to Slack: %s", userId, res.toString()));
                    appLogger.warn(String.format("Problems trying to connect user [%s] to Slack: %s", userId, res.string("error")));
                }
            } else {
                logger.info(String.format("Empty 'code' when try to connect user [%s] [%s]", userId, request.toString()));
            }
        }
        defaultMethodDisconnectUsers(request);
        return Json.map();
    }

    @EndpointFunction(name = "_get")
    public Json userGet(FunctionRequest request) {
        try {
            setUserRequestHeaders(request);
            Json res = defaultGetRequest(request);
            return res;
        } catch (EndpointException restException) {

            if (restException.getCode() == ErrorCode.API && updateExpiredToken(request.getUserId(), restException.getAdditionalInfo())) {
                return userGet(request);
            }

            if (restException.getCode() == ErrorCode.CLIENT) {
                users().sendUserDisconnectedEvent(request.getUserId());
            }
            throw restException;
        }
    }

    @EndpointFunction(name = "_post")
    public Json userPost(FunctionRequest request) {
        try {
            setUserRequestHeaders(request);
            Json res = defaultPostRequest(request);
            return res;
        } catch (EndpointException restException) {
            if (restException.getCode() == ErrorCode.API && updateExpiredToken(request.getUserId(), restException.getAdditionalInfo())) {
                return userPost(request);
            }
            if (restException.getCode() == ErrorCode.CLIENT) {
                users().sendUserDisconnectedEvent(request.getUserId());
            }
            throw restException;
        }
    }

    @EndpointFunction(name = "_put")
    public Json userPut(FunctionRequest request) {
        try {
            setUserRequestHeaders(request);
            Json res = defaultPutRequest(request);
            return res;
        } catch (EndpointException restException) {
            if (restException.getCode() == ErrorCode.API && updateExpiredToken(request.getUserId(), restException.getAdditionalInfo())) {
                return userPut(request);
            }
            if (restException.getCode() == ErrorCode.CLIENT) {
                users().sendUserDisconnectedEvent(request.getUserId());
            }
            throw restException;
        }
    }

    @EndpointFunction(name = "_delete")
    public Json userDelete(FunctionRequest request) {
        try {
            setUserRequestHeaders(request);
            Json res = defaultDeleteRequest(request);
            return res;
        } catch (EndpointException restException) {
            if (restException.getCode() == ErrorCode.API && updateExpiredToken(request.getUserId(), restException.getAdditionalInfo())) {
                return userDelete(request);
            }
            if (restException.getCode() == ErrorCode.CLIENT) {
                users().sendUserDisconnectedEvent(request.getUserId());
            }
            throw restException;
        }
    }

    private void setUserRequestHeaders(FunctionRequest request) {
        Json userConfig = users().findById(request.getUserId());
        if (userConfig == null || userConfig.isEmpty("access_token")) {
            throw EndpointException.permanent(ErrorCode.CLIENT, String.format("User [%s] is not connected", request.getUserEmail()));
        }
        Json body = request.getJsonParams();
        String token = userConfig.string("access_token");
        Json headers = body.json("headers");
        if (headers == null) {
            headers = Json.map();
        }
        headers.set("Authorization", "Bearer " + token);
        headers.set("Content-Type", "application/json");

        body.set("headers", headers);
        request.getRequest().set("params", body);
    }

    private boolean updateExpiredToken(String userId, Json additionalInfo) {

        if (!additionalInfo.toString().contains("\"id\":\"expired_token\"")) {
            return false;
        }

        Json userConfig = users().findById(userId);

        Json refreshTokenRequest = Json.map()
                .set("path", OAUTH_URL)
                .set("body", Json.map()
                        .set("grant_type", REFRESH_TOKEN)
                        .set("client_id", clientId)
                        .set("client_secret", clientSecret)
                        .set(REFRESH_TOKEN, userConfig.string(REFRESH_TOKEN))
                );

        Json res = httpService().defaultPostRequest(refreshTokenRequest);
        if (res.contains(ACCESS_TOKEN)) {

            userConfig.set(ACCESS_TOKEN, res.string(ACCESS_TOKEN));
            userConfig.set(REFRESH_TOKEN, res.string(REFRESH_TOKEN));

            // saves the information on the users data store
            Json conf = users().save(userId, res);
            logger.info(String.format("User token was updated for [%s] [%s]", userId, conf.toString()));

            return true;
        } else {
            logger.warn(String.format("Problems trying to reset token for user [%s] in Coinbase: %s", userId, res.toString()));
            appLogger.warn(String.format("Problems trying to reset token for user [%s] in Coinbase: %s", userId, res.string("error")));
            throw EndpointException.permanent(ErrorCode.CLIENT, String.format("Problems trying to reset token for user [%s] in Coinbase", userId));
        }

    }

}
