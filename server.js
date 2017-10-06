const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const bodyParser = require('body-parser');

const {sendNotification} = require("./src/utils")
const availableAppName = ["Demo", "JustForMe"]

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
}).options('*', function(req, res, next) {
    res.end();
});

app.listen(port);

console.log('OneSignalLocal server started on: ' + port);


app.get("/hi", (req, res) => {
    res.send("Hi")
})

// Index route
app.post('/push-notification', function(req, res) {
    const {appName} = req.body
    const isValidAppName = availableAppName.includes(appName)

    if(!isValidAppName) {
        res.json({msg: 'Please provide available appName'})
        return
    }

    const now = new Date()
    const nowStr = now.toLocaleString()
    const oneSignalConfig = require(`./src/.credential/onesignal-${appName}.json`)
    const waitForSendNofication = sendNotification(oneSignalConfig)(`Hi there, see new push at: ${nowStr}`)
    waitForSendNofication.then(() => {
        res.json({msg: 'Test msg sent, please wait until 5s'})
    })
})