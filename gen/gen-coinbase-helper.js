var fs = require('fs');

var FILE_NAME = "coinbase-helpers.js";
var CODE = '';
var SRC_USR = '';
var cache = {};

var API = [
    {namespace: 'users', method: 'GET', URL: 'users/:user_id'},
    {namespace: 'users', method: 'GET', URL: 'users'},
    {namespace: 'users', method: 'GET', URL: 'user/auth'},
    {namespace: 'users', method: 'GET', URL: 'user'},
    {namespace: 'users', method: 'PUT', URL: 'user', params: true},
    {namespace: 'accounts', method: 'GET', URL: 'accounts'},
    {namespace: 'accounts', method: 'GET', URL: 'accounts/:account_id'},
    {namespace: 'accounts', method: 'POST', URL: 'accounts/:account_id/primary'},
    {namespace: 'accounts', method: 'PUT', URL: 'accounts/:account_id', params: true},
    {namespace: 'accounts', method: 'DELETE', URL: 'accounts/:account_id'},
    {namespace: 'addresses', method: 'GET', URL: 'accounts/:account_id/addresses'},
    {namespace: 'addresses', method: 'GET', URL: 'accounts/:account_id/addresses/:address_id'},
    {namespace: 'addresses', method: 'GET', URL: 'accounts/:account_id/addresses/:address_id/transactions'},
    {namespace: 'addresses', method: 'POST', URL: 'accounts/:account_id/addresses', params: true},
    {namespace: 'transactions', method: 'GET', URL: 'accounts/:account_id/transactions'},
    {namespace: 'transactions', method: 'GET', URL: 'accounts/:account_id/transactions/:transaction_id'},
    {namespace: 'transactions', method: 'POST', URL: 'accounts/:account_id/transactions', params: true},
    {namespace: 'transactions', method: 'POST', URL: 'accounts/:account_id/transactions/:transaction_id/complete'},
    {namespace: 'transactions', method: 'POST', URL: 'accounts/:account_id/transactions/:transaction_id/resend'},
    {namespace: 'transactions', method: 'DELETE', URL: 'accounts/:account_id/transactions/:transaction_id'},
    {namespace: 'buys', method: 'GET', URL: 'accounts/:account_id/buys'},
    {namespace: 'buys', method: 'GET', URL: 'accounts/:account_id/buys/:buy_id'},
    {namespace: 'buys', method: 'POST', URL: 'accounts/:account_id/buys', params: true},
    {namespace: 'buys', method: 'POST', URL: 'accounts/:account_id/buys/:buy_id/commit'},
    {namespace: 'sells', method: 'GET', URL: 'accounts/:account_id/sells'},
    {namespace: 'sells', method: 'GET', URL: 'accounts/:account_id/sells/:sell_id'},
    {namespace: 'sells', method: 'POST', URL: 'accounts/:account_id/sells', params: true},
    {namespace: 'sells', method: 'POST', URL: 'accounts/:account_id/sells/:sell_id/commit'},
    {namespace: 'deposits', method: 'GET', URL: 'accounts/:account_id/deposits'},
    {namespace: 'deposits', method: 'GET', URL: 'accounts/:account_id/deposits/:deposit_id'},
    {namespace: 'deposits', method: 'POST', URL: 'accounts/:account_id/deposits', params: true},
    {namespace: 'deposits', method: 'POST', URL: 'accounts/:account_id/deposits/:deposit_id/commit'},
    {namespace: 'withdrawals', method: 'GET', URL: 'accounts/:account_id/withdrawals'},
    {namespace: 'withdrawals', method: 'GET', URL: 'accounts/:account_id/withdrawals/:withdrawal_id'},
    {namespace: 'withdrawals', method: 'POST', URL: 'accounts/:account_id/withdrawals', params: true},
    {namespace: 'withdrawals', method: 'POST', URL: 'accounts/:account_id/withdrawals/:withdrawal_id/commit'},
    {namespace: 'paymentMethods', method: 'GET', URL: 'payment-methods'},
    {namespace: 'paymentMethods', method: 'GET', URL: 'payment-methods/:payment_method_id/'},
    {namespace: 'dataEndpoints', method: 'GET', URL: 'currencies'},
    {namespace: 'dataEndpoints', method: 'GET', URL: 'exchange-rates', params: true},
    {namespace: 'dataEndpoints', method: 'GET', URL: 'prices/:currency_pair/buy'},
    {namespace: 'dataEndpoints', method: 'GET', URL: 'prices/:currency_pair/sell'},
    {namespace: 'dataEndpoints', method: 'GET', URL: 'prices/:currency_pair/spot', params: true},
    {namespace: 'dataEndpoints', method: 'GET', URL: 'time'},
    {namespace: 'notifications', method: 'GET', URL: 'notifications'},
    {namespace: 'notifications', method: 'GET', URL: 'notifications/:notifications_id'},
];

var urlsData = {get: {}, post: {}, put: {}, patch: {}, delete: {}};
var endpoint = {};
var NAMESPACE = 'endpoint.';
var NAMESPACE_USR = 'endpoint.user.';

var camelCase = function (input) {
    return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
        return group1.toUpperCase();
    });
};

var parse = function (str) {
    try {
        if (arguments.length > 1) {
            var args = arguments[1],
                i = 0;
            return str.replace(/:(\w+)/g, function () {
                return args[i++];
            });

        } else {
            if (str) {
                return str;
            }
            throw 'Function is not valid.';
        }
    } catch (err) {
        throw 'Function is not valid for given arguments.';
    }
};

var setInitializers = function (fnName, givenNamespace) {

    var tmpCode = '',
        namesArr = fnName.split('.'),
        path = '';

    for (var i in namesArr) {

        if (i == 0) {
            path = namesArr[0];
        } else {
            path += '.' + namesArr[i];
        }

        if (!cache[path]) {
            tmpCode += NAMESPACE + givenNamespace + path + ' = {};\n';
            cache[path] = path;
        }

    }

    return tmpCode;
};

var capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

var getMethod = function (method, space) {

    if (space) {
        return space + capitalizeFirstLetter(method);
    }
    return method;
};

var makeEndpointsHelpers = function () {

    for (var i in API) {
        var apiInfo = API[i];
        var numVars = 0;
        var fnNames = [];
        var newPath = '';
        var method = apiInfo.method.toLowerCase();

        var urlParts = apiInfo.URL.split('/');
        for (var p in urlParts) {
            if (urlParts[p] != "") {
                if (urlParts[p].substr(0, 1) == ':') {
                    numVars++;
                    newPath += '/%s'
                } else {
                    fnNames.push(urlParts[p]);
                    newPath += '/' + urlParts[p];
                }
            }
        }

        var functionName = camelCase(fnNames.join('.'));
        if (!urlsData[method][functionName]) {
            urlsData[method][functionName] = {};
        }

        urlsData[method][functionName][numVars] = '/v2/' + apiInfo.URL;
        if (apiInfo.params) {
            urlsData[method][functionName]['args'] = true;
        }
    }

    for (var method in urlsData) {
        for (var fn in urlsData[method]) {

            CODE += setInitializers(fn, '');
            SRC_USR += setInitializers(fn, 'user.');

            if (method == 'get' || method == 'delete') {
                var sizeStr = 'var size = arguments.length > 0 ? arguments.length : 0;';

                var hasArguments = '\n\n\tvar index = 0;';
                hasArguments += '\n\tvar args = "";';

                if (urlsData[method][fn]['args']) {
                    hasArguments += '\n\n\tif(size >= 1 && typeof arguments[size-1] === "object"){';
                    hasArguments += '\n\t\tindex = 1;';
                    hasArguments += '\n\t\targs = "?";';
                    hasArguments += '\n\t\tfor(var j in arguments[size-1]) {';
                    hasArguments += '\n\t\t\targs += j + "=" + arguments[size-1][j];';
                    hasArguments += '\n\t\t}';
                    hasArguments += '\n\n\t}';
                }


                var parseStr = 'parse(urlsData[\'' + method + '\'][\'' + fn + '\'][size-index], Array.prototype.slice.call(arguments, 0, size-index));';

                var getSrcFn = function (fn, method, sizeStr, hasArguments, parseStr, space) {

                    var src = fn + '.' + method + ' = function() {';
                    src += '\n\t' + sizeStr;
                    src += hasArguments;
                    src += '\n\tvar url = ' + parseStr;
                    src += '\n\turl += args;';
                    src += '\n\tsys.logs.debug(\'[Coinbase] ' + method.toUpperCase() + ' from: \' + url);';
                    src += '\n\treturn ' + NAMESPACE + getMethod(method, space) + '(url);\n};\n\n';

                    return src;
                };

                CODE += NAMESPACE + getSrcFn(fn, method, sizeStr, hasArguments, parseStr, '');

            } else if (method == 'post' || method == 'put' || method == 'patch') {
                var sizeStr = 'var size = arguments.length > 0 ? arguments.length : 0;\n\t';
                sizeStr += 'if(size <= 0) { return;\n\t\tsys.logs.warn(\'wrong numbers of arguments for ' + fn + '.' + method + '\');\n\t}';

                var hasArguments = '\n\n\tvar index = 1;';
                hasArguments += '\n\tvar args = "";';

                if (urlsData[method][fn]['args']) {
                    hasArguments += '\n\n\tif(size >= 2 && typeof arguments[size-1] === "object" && typeof arguments[size-2] === "object" ){';
                    hasArguments += '\n\t\tindex = 2;';
                    hasArguments += '\n\t\targs = "?";';
                    hasArguments += '\n\t\tfor(var j in arguments[size-1]) {';
                    hasArguments += '\n\t\t\targs += j + "=" + arguments[size-1][j];';
                    hasArguments += '\n\t\t}';
                    hasArguments += '\n\n\t}';
                }

                var parseStr = 'parse(urlsData[\'' + method + '\'][\'' + fn + '\'][size - 1], Array.prototype.slice.call(arguments, 0, size-index));';

                var getSrcFn = function (fn, method, sizeStr, hasArguments, parseStr, space) {
                    var src = fn + '.' + method + ' = function() {';
                    src += '\n\t' + sizeStr;
                    src += hasArguments;
                    src += '\n\tvar url = ' + parseStr;
                    src += '\n\turl += args;';
                    src += '\n\tsys.logs.debug(\'[Coinbase] ' + method.toUpperCase() + ' from: \' + url);';
                    src += '\n\treturn ' + NAMESPACE + getMethod(method, space) + '(url, arguments[arguments.length - index]);\n};\n\n';

                    return src;
                };

                CODE += NAMESPACE + getSrcFn(fn, method, sizeStr, hasArguments, parseStr, '');
            }

        }
    }


    var MESSAGE = '//////////////////////////////////////////////////////////////////////////\n';
    MESSAGE += '//                                                                      //\n';
    MESSAGE += '//  This file is generated with coinbase/gen/gen-coinbase-helpers.js    //\n';
    MESSAGE += '//                                                                      //\n';
    MESSAGE += '//            ' + new Date() + '                   //\n';
    MESSAGE += '//                                                                      //\n';
    MESSAGE += '//////////////////////////////////////////////////////////////////////////\n';

    CODE = MESSAGE + '\n\nvar urlsData = ' + JSON.stringify(urlsData, null, "\t") + ';\n\nvar parse = ' + parse.toString() + ';\n\n' + CODE + '\n' + SRC_USR;

};

makeEndpointsHelpers();

fs.writeFile("../scripts/" + FILE_NAME, CODE, function (err) {
    if (err) {
        return console.error(err);
    }

    console.info('Generator has run successfully!');
});
