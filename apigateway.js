const express = require('express');
const httpProxy = require('http-proxy');
const cors = require('cors');

const app = express();
const proxy = httpProxy.createProxyServer();

const doctorServicePort = 6001; 
const userServicePort = 6002;
const chatServicePort = 6003;
const paymentServicePort = 6004;

app.use(cors());

app.all('/doctor/*', (req, res) => {
    proxy.web(req, res, { target: `http://localhost:${doctorServicePort}` }, (err) => {
        console.error("Proxy error:", err);
        res.status(500).send("Proxy error");
    });
});
app.all('/user/*', (req, res) => {
    proxy.web(req, res, { target: `http://localhost:${userServicePort}` }, (err) => {
        console.error("Proxy error:", err);
        res.status(500).send("Proxy error");
    }); 
});

app.all('/chat/*', (req, res) => {
    proxy.web(req, res, { target: `http://localhost:${chatServicePort}` }, (err) => {
        console.error("Proxy error:", err);
        res.status(500).send("Proxy error");
    }); 
});

app.all('/payment/*', (req, res) => {
    proxy.web(req, res, { target: `http://localhost:${paymentServicePort}` }, (err) => {
        console.error("Proxy error:", err);
        res.status(500).send("Proxy error");
    }); 
});

proxy.on('error', (err, req, res) => {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy error");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
