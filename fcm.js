const request = require("request");
const option = clientToken => {
  const data = {
    url: "https://fcm.googleapis.com/fcm/send",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: ""
    },
    body: JSON.stringfy({
      notification: {
        title: "",
        body: ""
      },
      to: "token"
    })
  };
};
sendFcmMessage = () => {
  request(option(""));
};
