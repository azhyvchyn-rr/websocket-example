const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api', {
        target: 'http://localhost:3030'
    }));
    app.use(createProxyMiddleware('/ws', {
        target: 'ws://localhost:3030',
        ws: true
    }));
};
