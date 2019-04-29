//////////////////////////////////////////////////////////////////////////
//                                                                      //
//  This file is generated with coinbase/gen/gen-coinbase-helpers.js    //
//                                                                      //
//            Thu Dec 27 2018 11:35:19 GMT-0300 (-03)                   //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


var urlsData = {
	"get": {
		"users": {
			"0": "/v2/users",
			"1": "/v2/users/:user_id"
		},
		"user.auth": {
			"0": "/v2/user/auth"
		},
		"user": {
			"0": "/v2/user"
		},
		"accounts": {
			"0": "/v2/accounts",
			"1": "/v2/accounts/:account_id"
		},
		"accounts.addresses": {
			"1": "/v2/accounts/:account_id/addresses",
			"2": "/v2/accounts/:account_id/addresses/:address_id"
		},
		"accounts.addresses.transactions": {
			"2": "/v2/accounts/:account_id/addresses/:address_id/transactions"
		},
		"accounts.transactions": {
			"1": "/v2/accounts/:account_id/transactions",
			"2": "/v2/accounts/:account_id/transactions/:transaction_id"
		},
		"accounts.buys": {
			"1": "/v2/accounts/:account_id/buys",
			"2": "/v2/accounts/:account_id/buys/:buy_id"
		},
		"accounts.sells": {
			"1": "/v2/accounts/:account_id/sells",
			"2": "/v2/accounts/:account_id/sells/:sell_id"
		},
		"accounts.deposits": {
			"1": "/v2/accounts/:account_id/deposits",
			"2": "/v2/accounts/:account_id/deposits/:deposit_id"
		},
		"accounts.withdrawals": {
			"1": "/v2/accounts/:account_id/withdrawals",
			"2": "/v2/accounts/:account_id/withdrawals/:withdrawal_id"
		},
		"paymentMethods": {
			"0": "/v2/payment-methods",
			"1": "/v2/payment-methods/:payment_method_id/"
		},
		"currencies": {
			"0": "/v2/currencies"
		},
		"exchangeRates": {
			"0": "/v2/exchange-rates",
			"args": true
		},
		"prices.buy": {
			"1": "/v2/prices/:currency_pair/buy"
		},
		"prices.sell": {
			"1": "/v2/prices/:currency_pair/sell"
		},
		"prices.spot": {
			"1": "/v2/prices/:currency_pair/spot",
			"args": true
		},
		"time": {
			"0": "/v2/time"
		},
		"notifications": {
			"0": "/v2/notifications",
			"1": "/v2/notifications/:notifications_id"
		}
	},
	"post": {
		"accounts.primary": {
			"1": "/v2/accounts/:account_id/primary"
		},
		"accounts.addresses": {
			"1": "/v2/accounts/:account_id/addresses",
			"args": true
		},
		"accounts.transactions": {
			"1": "/v2/accounts/:account_id/transactions",
			"args": true
		},
		"accounts.transactions.complete": {
			"2": "/v2/accounts/:account_id/transactions/:transaction_id/complete"
		},
		"accounts.transactions.resend": {
			"2": "/v2/accounts/:account_id/transactions/:transaction_id/resend"
		},
		"accounts.buys": {
			"1": "/v2/accounts/:account_id/buys",
			"args": true
		},
		"accounts.buys.commit": {
			"2": "/v2/accounts/:account_id/buys/:buy_id/commit"
		},
		"accounts.sells": {
			"1": "/v2/accounts/:account_id/sells",
			"args": true
		},
		"accounts.sells.commit": {
			"2": "/v2/accounts/:account_id/sells/:sell_id/commit"
		},
		"accounts.deposits": {
			"1": "/v2/accounts/:account_id/deposits",
			"args": true
		},
		"accounts.deposits.commit": {
			"2": "/v2/accounts/:account_id/deposits/:deposit_id/commit"
		},
		"accounts.withdrawals": {
			"1": "/v2/accounts/:account_id/withdrawals",
			"args": true
		},
		"accounts.withdrawals.commit": {
			"2": "/v2/accounts/:account_id/withdrawals/:withdrawal_id/commit"
		}
	},
	"put": {
		"user": {
			"0": "/v2/user",
			"args": true
		},
		"accounts": {
			"1": "/v2/accounts/:account_id",
			"args": true
		}
	},
	"patch": {},
	"delete": {
		"accounts": {
			"1": "/v2/accounts/:account_id"
		},
		"accounts.transactions": {
			"2": "/v2/accounts/:account_id/transactions/:transaction_id"
		}
	}
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

endpoint.users = {};
endpoint.users.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['get']['users'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.user = {};
endpoint.user.auth = {};
endpoint.user.auth.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['get']['user.auth'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.user.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['get']['user'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.accounts = {};
endpoint.accounts.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['get']['accounts'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.accounts.addresses = {};
endpoint.accounts.addresses.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['get']['accounts.addresses'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.accounts.addresses.transactions = {};
endpoint.accounts.addresses.transactions.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['get']['accounts.addresses.transactions'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.accounts.transactions = {};
endpoint.accounts.transactions.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['get']['accounts.transactions'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.accounts.buys = {};
endpoint.accounts.buys.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['get']['accounts.buys'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.accounts.sells = {};
endpoint.accounts.sells.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['get']['accounts.sells'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.accounts.deposits = {};
endpoint.accounts.deposits.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['get']['accounts.deposits'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.accounts.withdrawals = {};
endpoint.accounts.withdrawals.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['get']['accounts.withdrawals'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.paymentMethods = {};
endpoint.paymentMethods.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['get']['paymentMethods'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.currencies = {};
endpoint.currencies.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['get']['currencies'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.exchangeRates = {};
endpoint.exchangeRates.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";

	if(size >= 1 && typeof arguments[size-1] === "object"){
		index = 1;
		args = "?";
		for(var j in arguments[size-1]) {
			args += j + "=" + arguments[size-1][j];
		}

	}
	var url = parse(urlsData['get']['exchangeRates'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.prices = {};
endpoint.prices.buy = {};
endpoint.prices.buy.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['get']['prices.buy'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.prices.sell = {};
endpoint.prices.sell.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['get']['prices.sell'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.prices.spot = {};
endpoint.prices.spot.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";

	if(size >= 1 && typeof arguments[size-1] === "object"){
		index = 1;
		args = "?";
		for(var j in arguments[size-1]) {
			args += j + "=" + arguments[size-1][j];
		}

	}
	var url = parse(urlsData['get']['prices.spot'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.time = {};
endpoint.time.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['get']['time'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.notifications = {};
endpoint.notifications.get = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['get']['notifications'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] GET from: ' + url);
	return endpoint.get(url);
};

endpoint.accounts.primary = {};
endpoint.accounts.primary.post = function() {
	var size = arguments.length > 0 ? arguments.length : 0;
	if(size <= 0) { return;
		sys.logs.warn('wrong numbers of arguments for accounts.primary.post');
	}

	var index = 1;
	var args = "";
	var url = parse(urlsData['post']['accounts.primary'][size - 1], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] POST from: ' + url);
	return endpoint.post(url, arguments[arguments.length - index]);
};

endpoint.accounts.addresses.post = function() {
	var size = arguments.length > 0 ? arguments.length : 0;
	if(size <= 0) { return;
		sys.logs.warn('wrong numbers of arguments for accounts.addresses.post');
	}

	var index = 1;
	var args = "";

	if(size >= 2 && typeof arguments[size-1] === "object" && typeof arguments[size-2] === "object" ){
		index = 2;
		args = "?";
		for(var j in arguments[size-1]) {
			args += j + "=" + arguments[size-1][j];
		}

	}
	var url = parse(urlsData['post']['accounts.addresses'][size - 1], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] POST from: ' + url);
	return endpoint.post(url, arguments[arguments.length - index]);
};

endpoint.accounts.transactions.post = function() {
	var size = arguments.length > 0 ? arguments.length : 0;
	if(size <= 0) { return;
		sys.logs.warn('wrong numbers of arguments for accounts.transactions.post');
	}

	var index = 1;
	var args = "";

	if(size >= 2 && typeof arguments[size-1] === "object" && typeof arguments[size-2] === "object" ){
		index = 2;
		args = "?";
		for(var j in arguments[size-1]) {
			args += j + "=" + arguments[size-1][j];
		}

	}
	var url = parse(urlsData['post']['accounts.transactions'][size - 1], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] POST from: ' + url);
	return endpoint.post(url, arguments[arguments.length - index]);
};

endpoint.accounts.transactions.complete = {};
endpoint.accounts.transactions.complete.post = function() {
	var size = arguments.length > 0 ? arguments.length : 0;
	if(size <= 0) { return;
		sys.logs.warn('wrong numbers of arguments for accounts.transactions.complete.post');
	}

	var index = 1;
	var args = "";
	var url = parse(urlsData['post']['accounts.transactions.complete'][size - 1], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] POST from: ' + url);
	return endpoint.post(url, arguments[arguments.length - index]);
};

endpoint.accounts.transactions.resend = {};
endpoint.accounts.transactions.resend.post = function() {
	var size = arguments.length > 0 ? arguments.length : 0;
	if(size <= 0) { return;
		sys.logs.warn('wrong numbers of arguments for accounts.transactions.resend.post');
	}

	var index = 1;
	var args = "";
	var url = parse(urlsData['post']['accounts.transactions.resend'][size - 1], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] POST from: ' + url);
	return endpoint.post(url, arguments[arguments.length - index]);
};

endpoint.accounts.buys.post = function() {
	var size = arguments.length > 0 ? arguments.length : 0;
	if(size <= 0) { return;
		sys.logs.warn('wrong numbers of arguments for accounts.buys.post');
	}

	var index = 1;
	var args = "";

	if(size >= 2 && typeof arguments[size-1] === "object" && typeof arguments[size-2] === "object" ){
		index = 2;
		args = "?";
		for(var j in arguments[size-1]) {
			args += j + "=" + arguments[size-1][j];
		}

	}
	var url = parse(urlsData['post']['accounts.buys'][size - 1], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] POST from: ' + url);
	return endpoint.post(url, arguments[arguments.length - index]);
};

endpoint.accounts.buys.commit = {};
endpoint.accounts.buys.commit.post = function() {
	var size = arguments.length > 0 ? arguments.length : 0;
	if(size <= 0) { return;
		sys.logs.warn('wrong numbers of arguments for accounts.buys.commit.post');
	}

	var index = 1;
	var args = "";
	var url = parse(urlsData['post']['accounts.buys.commit'][size - 1], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] POST from: ' + url);
	return endpoint.post(url, arguments[arguments.length - index]);
};

endpoint.accounts.sells.post = function() {
	var size = arguments.length > 0 ? arguments.length : 0;
	if(size <= 0) { return;
		sys.logs.warn('wrong numbers of arguments for accounts.sells.post');
	}

	var index = 1;
	var args = "";

	if(size >= 2 && typeof arguments[size-1] === "object" && typeof arguments[size-2] === "object" ){
		index = 2;
		args = "?";
		for(var j in arguments[size-1]) {
			args += j + "=" + arguments[size-1][j];
		}

	}
	var url = parse(urlsData['post']['accounts.sells'][size - 1], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] POST from: ' + url);
	return endpoint.post(url, arguments[arguments.length - index]);
};

endpoint.accounts.sells.commit = {};
endpoint.accounts.sells.commit.post = function() {
	var size = arguments.length > 0 ? arguments.length : 0;
	if(size <= 0) { return;
		sys.logs.warn('wrong numbers of arguments for accounts.sells.commit.post');
	}

	var index = 1;
	var args = "";
	var url = parse(urlsData['post']['accounts.sells.commit'][size - 1], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] POST from: ' + url);
	return endpoint.post(url, arguments[arguments.length - index]);
};

endpoint.accounts.deposits.post = function() {
	var size = arguments.length > 0 ? arguments.length : 0;
	if(size <= 0) { return;
		sys.logs.warn('wrong numbers of arguments for accounts.deposits.post');
	}

	var index = 1;
	var args = "";

	if(size >= 2 && typeof arguments[size-1] === "object" && typeof arguments[size-2] === "object" ){
		index = 2;
		args = "?";
		for(var j in arguments[size-1]) {
			args += j + "=" + arguments[size-1][j];
		}

	}
	var url = parse(urlsData['post']['accounts.deposits'][size - 1], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] POST from: ' + url);
	return endpoint.post(url, arguments[arguments.length - index]);
};

endpoint.accounts.deposits.commit = {};
endpoint.accounts.deposits.commit.post = function() {
	var size = arguments.length > 0 ? arguments.length : 0;
	if(size <= 0) { return;
		sys.logs.warn('wrong numbers of arguments for accounts.deposits.commit.post');
	}

	var index = 1;
	var args = "";
	var url = parse(urlsData['post']['accounts.deposits.commit'][size - 1], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] POST from: ' + url);
	return endpoint.post(url, arguments[arguments.length - index]);
};

endpoint.accounts.withdrawals.post = function() {
	var size = arguments.length > 0 ? arguments.length : 0;
	if(size <= 0) { return;
		sys.logs.warn('wrong numbers of arguments for accounts.withdrawals.post');
	}

	var index = 1;
	var args = "";

	if(size >= 2 && typeof arguments[size-1] === "object" && typeof arguments[size-2] === "object" ){
		index = 2;
		args = "?";
		for(var j in arguments[size-1]) {
			args += j + "=" + arguments[size-1][j];
		}

	}
	var url = parse(urlsData['post']['accounts.withdrawals'][size - 1], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] POST from: ' + url);
	return endpoint.post(url, arguments[arguments.length - index]);
};

endpoint.accounts.withdrawals.commit = {};
endpoint.accounts.withdrawals.commit.post = function() {
	var size = arguments.length > 0 ? arguments.length : 0;
	if(size <= 0) { return;
		sys.logs.warn('wrong numbers of arguments for accounts.withdrawals.commit.post');
	}

	var index = 1;
	var args = "";
	var url = parse(urlsData['post']['accounts.withdrawals.commit'][size - 1], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] POST from: ' + url);
	return endpoint.post(url, arguments[arguments.length - index]);
};

endpoint.user.put = function() {
	var size = arguments.length > 0 ? arguments.length : 0;
	if(size <= 0) { return;
		sys.logs.warn('wrong numbers of arguments for user.put');
	}

	var index = 1;
	var args = "";

	if(size >= 2 && typeof arguments[size-1] === "object" && typeof arguments[size-2] === "object" ){
		index = 2;
		args = "?";
		for(var j in arguments[size-1]) {
			args += j + "=" + arguments[size-1][j];
		}

	}
	var url = parse(urlsData['put']['user'][size - 1], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] PUT from: ' + url);
	return endpoint.put(url, arguments[arguments.length - index]);
};

endpoint.accounts.put = function() {
	var size = arguments.length > 0 ? arguments.length : 0;
	if(size <= 0) { return;
		sys.logs.warn('wrong numbers of arguments for accounts.put');
	}

	var index = 1;
	var args = "";

	if(size >= 2 && typeof arguments[size-1] === "object" && typeof arguments[size-2] === "object" ){
		index = 2;
		args = "?";
		for(var j in arguments[size-1]) {
			args += j + "=" + arguments[size-1][j];
		}

	}
	var url = parse(urlsData['put']['accounts'][size - 1], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] PUT from: ' + url);
	return endpoint.put(url, arguments[arguments.length - index]);
};

endpoint.accounts.delete = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['delete']['accounts'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] DELETE from: ' + url);
	return endpoint.delete(url);
};

endpoint.accounts.transactions.delete = function() {
	var size = arguments.length > 0 ? arguments.length : 0;

	var index = 0;
	var args = "";
	var url = parse(urlsData['delete']['accounts.transactions'][size-index], Array.prototype.slice.call(arguments, 0, size-index));
	url += args;
	sys.logs.debug('[Coinbase] DELETE from: ' + url);
	return endpoint.delete(url);
};


