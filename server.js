const express = require("express")
const { bindCommonMiddleware } = require("./src/express")
const { sendNotification } = require("./src/utils")
const availableAppName = ["Demo", "JustForMe"]
const port = process.env.PORT || 5000

const app = express()
bindCommonMiddleware(app)
app.listen(port, () => console.log(`OneSignal running on port: ${port}`))

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/send-button.html`)
})

app.post("/push-notification", function(req, res) {
  const { appName } = req.body
  const isValidAppName = availableAppName.includes(appName)

  if (!isValidAppName) return res.json({ msg: "Please provide available appName" })

  const now = new Date()
  const nowStr = now.toLocaleString()
  const oneSignalConfig = require(`./src/.credential/onesignal-${appName}.json`)
  const waitForSendNofication = sendNotification(oneSignalConfig)(`Hi there, see new push at: ${nowStr}`, {
    headings: { en: appName }
  })
  waitForSendNofication.then(() => {
    res.json({ msg: "Test msg sent, please wait until 5s" })
  })
})
