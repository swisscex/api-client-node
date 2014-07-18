var lib         = require('./lib');
var socketio    = require('socket.io-client');
var config      = require('./config');

// Get quotes
// lib('GET', 'quote');

// price is only necessary when placing a LMT order
// lib('POST', 'order/new', { side: 'BUY/SELL', type: 'LMT/MKT', price: '0.92', qty: '1', symbol: 'SOME_MARKET_SYMBOL' });

lib('GET', 'quote/DOGE_BTC');

var socket = socketio(config.SOCKET_ENDPOINT);

socket.on('connect', function() {
    console.log("Connected to " + config.SOCKET_ENDPOINT);
    
    // called when bid / ask on a merket changes
    socket.on('QUOTE_UPDATE', function(data) {
        console.log(data);    
    });
    
    // called when bid side updates
    socket.on('ORDERBOOK:UPDATE:BUY', function(data) {
        // console.log(data);        
    });
    
    // called when ask side updates
    socket.on('ORDERBOOK:UPDATE:SELL', function(data) {
        // console.log(data);
    });
    
    // called on order execution / confirmation / rejection
    socket.on('EXECUTION_REPORT', function(data) {
        console.log(data);
    });
    
    // called when a trade happens
    socket.on('MARKET_TRADE_PUSH', function(data) {
        console.log(data); 
    });
});