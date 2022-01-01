var config = require("../../config");
var open = require("../../common/ampq");
const csv = require("csvtojson");
console.log("open", open);

class Sender {
  async sendMessageInQueue(jsonDetails) {
    return new Promise((resolve, reject) => {
      // Publisher
      open
        .then(function (conn) {
          return conn.createChannel();
        })
        .then(async function (ch) {
          return ch.assertQueue(config.q).then(async function (ok) {
            // send message in loop while getting all data
            var sendRes;
            jsonDetails.forEach(async (element, index) => {
              sendRes = await ch.sendToQueue(
                config.q,
                Buffer.from(JSON.stringify(element))
              );
              console.log("Index ", index);
              console.log("send res", sendRes);
            });
            resolve({ flagCheck: true, data: sendRes });
          });
        })
        .catch((err) => {
          resolve({ flagCheck: false, data: err });
        });
    });
  }

  async csvToJson(csvFilePath) {
    return new Promise(async (resolve, reject) => {
      csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
          console.log("Data Get", jsonObj);
          if (jsonObj || jsonObj.length) {
            resolve({ flagCheck: true, data: jsonObj });
          } else {
            resolve({ flagCheck: false, data: [] });
          }
        })
        .catch((error) => {
          resolve({ flagCheck: false, data: [] });
        });
    });
  }

  async interateThrougObj(jsonDetails) {
    let res_send;
    res_send = await this.sendMessageInQueue(jsonDetails);
    if (res_send.flagCheck) {
      console.log("object", res_send);
    } else {
      console.log("Object", res_send);
    }

    return true;
  }
}

module.exports = {
  sender: function () {
    return new Sender();
  },
};
