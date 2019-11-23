  
const request = require("request");
const option = clientToken => {
  const data = {
    url: "https://fcm.googleapis.com/fcm/send",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "key=AAAAv_1q94w:APA91bHrf3NYu7T_UMG_pjMcw7qE4NUzViCMb6EHaXhsyVHsfALupKZniYuBYtR-aMzI-EyUDwgzxQw716I2HJXQsZNca9byb_K3vY13Befdia67h7PhhKc_-tdpp1BXp1TzApH9oXT1"
    },
    body: JSON.stringify({
      notification: {
        title: "ddd",
        body: "dddd"
      },
      to: "dpTPCsOt4jE:APA91bGx4z7d_nVgFml95fk-BwFZxTpwZhbrYLRuWWBZ2Z5_3CcJ7iA3WuCdU8nXZasNWna_eZ-hxHBsgKG4Myevk8BJx0Dqx7BDAlnoqNzkqsT0KCEmqmWQiUOKTpH-Xvb2xSgVfUqr"
    })
  };return data
};
sendFcmMessage = () => {
  request.post(option(""));
};

module.exports={
    sendFcmMessage:sendFcmMessage
}