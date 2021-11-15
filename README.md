---
title: Coinbase endpoint
keywords: 
last_updated: December 13, 2018
tags: []
summary: "Detailed description of the API of the Coinbase endpoint."
---

## Overview

Coinbase’s API makes it easy to integrate bitcoin, bitcoin cash, litecoin and ethereum into both new 
and existing applications.

Coinbase’s APIs enable a variety of capabilities; from simply gathering read-only data, to building 
something that’s never been done before.

Before integrating Coinbase endpoint, you’ll need to register a new OAuth2 application under your 
[API settings](https://www.coinbase.com/settings/api).

Capabilities:

- Generate bitcoin, bitcoin cash, litecoin and ethereum wallets and addresses
- Buy/sell and send/receive bitcoin, bitcoin cash, litecoin and ethereum
- Securely store bitcoin, bitcoin cash, litecoin and ethereum
- Retrieve real-time or historical price information
- Receive notifications when payments arrive
- Shortcuts to access the REST API
- Oauth for users
- Support for webhooks

In most cases you will be using the provided shortcuts to access the API. For example, you could use the REST API
directly by doing an HTTP request like this:

```js
var res = app.endpoints.coinbase.get('/v2/accounts');
```

However you probably want to use the shortcuts:

```js
var res = app.endpoints.coinbase.accounts.get(); 
```

These shortcuts are based on the [Coinbase REST API](https://developers.coinbase.com/api/v2).
You can see more information about that in the [shortcuts section](#shortcuts).

## Configuration

First you will need to setup an account in Coinbase. Then you will be able to configure the endpoint you will
need to generate  a new OAuth2 application under your [API settings](https://www.coinbase.com/settings/api).
You can find more information about that in [Coinbase Digital API](https://developers.coinbase.com/).

### Client Id

This is the client ID for OAuth, which is needed in order to perform operations on behalf of a user.

### Client Secret

This is the client secret for OAuth, which is needed in order to perform operations on behalf of a user.

### Send Limit Amount

A limit to the amount of money your application can send from the user’s account.

### Send Limit Currency

Supported fiat currency in ISO format, ex. EUR, USD

### Send Limit Period

How often the send money limit expires. Default is month - allowed values are day, month and year.

### Scope

Comma separated list of permissions (scopes) your application requests access to. Required scopes are listed under endpoints in the [Full Scopes List](https://developers.coinbase.com/docs/wallet/permissions)

### OAuth callback
This is the OAuth callback you need to configure in your Coinbase app.

### Webhook URL

This is the URL you need to set in your Coinbase app so webhooks are sent there.

## Javascript API

The user token will be automatically attach in each request when is used Coinbase endpoint. When use shortcuts or directly the API request.

```js
var res = app.endpoints.coinbase.get('/v2/accounts');
```

- **HTTP request**: this allows to make regular HTTP requests like `GET`, `POST` or `PUT` to the API.
- **Shortcuts**: these are helpers to make HTTP request to the API in a more convenient way. Sign request automatically.

### HTTP requests

You can make `GET`, `POST`, `PUT`, and `DELETE` request to the 
[Coinbase API](https://developers.coinbase.com/api/v2) like this:

Please take a look at the documentation of the [HTTP endpoint]({{site.baseurl}}/endpoints_http.html#javascript-api)
for more information.

### Shortcuts

Instead of having to use the generic HTTP methods, you can make use of the shortcuts provided in the endpoint.
There are two groups of shortcuts:

These shortcuts follow these rules:

- **Path sections get converted to namespaces**: for example if the method is GET `~/v2/accounts/:account_id/transactions` 
  it is converted to `app.endpoints.coinbase.accounts.transactions.get(accountId)`. 
- **If they have dashes, we should convert them to camel case**: `~/exchange-rates` is converted to 
  `app.endpoints.coinbase.exchangeRates.get()`. 
- **HTTP method is appended at the end of the method**: for example if the method is `GET`, you will see a method with 
  the suffix `.get(...)`. For example `GET ~/accounts/:account_id` will become `app.endpoints.coinbase.accounts.get(accountId)`. 
  This is the mapping of names:
  - `GET`: `get`
  - `POST`: `post`
  - `PUT`: `put`
  - `DELETE`: `delete`
- **Path variables become method parameters**: if the method has variables in the path, they will become parameters for 
  the method. For example `GET ~/v2/accounts/:account_id/withdrawals/:withdrawal_id` will become 
  `app.endpoints.coinbase.accounts.withdrawals.get(accountId, withdrawalId)`.
- **Body are sent in the last param as JSON**: if the method accepts more parameters or it allows to send a body, 
   that will be sent in the last parameter. For example the method `PUT ~/v2/accounts/:account_id`  will become 
   `app.endpoints.coinbase.accounts.put(accountId, {...params to update...})`
- **Arguments are sent in the last param as JSON. After the body**: if the method accepts argument, 
   that will be sent in the last parameter. In case of PUT or POST after the body. For example the method `PUT ~/v2/accounts/:account_id`  will become 
   `app.endpoints.coinbase.accounts.put(accountId, {...params to update...}, {... arguments...})`.
  
Here are some URLs of the REST API and their corresponding shortcut:

```js
// GET ~/v2/exchange-rates?currency=BTC
var res = app.endpoints.coinbase.exchangeRates.get({currency: 'BTC'});

// GET ~/v2/accounts/:account_id
var res = app.endpoints.coinbase.accounts.get(accountId);

// PUT ~/v2/accounts/:account_id?name=xx
var res = app.endpoints.coinbase.accounts.get(accountId, {/*params to update*/}, {name: 'xx'});

```

## About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

## License

This endpoint is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
