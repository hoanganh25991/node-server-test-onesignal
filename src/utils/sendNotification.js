const getOption = apiKey => ({
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Basic ${apiKey}`
    }
})

const getData = appId => ({
  app_id: appId,
  included_segments: ["TestUsers"]
})

const sendNotification = ({apiKey, appId}) => (content, messageObj = null) => {
  const options = getOption(apiKey)
  const data = getData(appId)

  // Merge
  Object.assign(
    data,
    {
      headings: { en: "Notification" },
      contents: { en: content }
    },
    messageObj
  )

  const https = require("https")
  const req = https.request(options)
  req.write(JSON.stringify(data))
  const waitReqFinish = new Promise(resolve => req.end(resolve))
  return waitReqFinish
}

module.exports = sendNotification
