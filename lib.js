
var config  = require('./config');
var qs      = require('qs');
var crypto  = require('crypto');
var extend  = require('extend');
var unirest = require('unirest');

module.exports = exports = function(method, path, params) {
    
    method = (method || 'GET').toUpperCase();
    
    var nonce = new Date().getTime();

    var req = extend({ apiKey: config.PUBLIC_KEY, nonce: nonce }, params);
    
    var queryString = qs.stringify(req);
    
    var hmac = crypto.createHmac('sha256', config.PRIVATE_KEY);
    var sign = hmac.update(queryString).digest('hex');
    
    console.log('Query-String: ' + queryString);
    console.log('Using sign: ' + sign);
    
    queryString += "&hash=" + sign;
    
    var requestUrl = config.HOST + path;
    
    if('GET' === method) {
        requestUrl = requestUrl + '?' + queryString;
        console.log('Going to do a GET on ' + requestUrl);
        unirest.get(requestUrl).headers({ 'User-Agent': 'Mozilla/4.0 (compatible; SWISSCEX API NODE client;'})
        .end(function(response) {
           console.log(response.body);
        });
    } else {
        console.log('Going to do a POST on ' + requestUrl);
        req.hash = sign;
        unirest.post(requestUrl)
        .headers({ 'User-Agent': 'Mozilla/4.0 (compatible; SWISSCEX API NODE client;'})
        .send(req)
        .end(function(response) {
           console.log(response.body);
        });
    }
};
