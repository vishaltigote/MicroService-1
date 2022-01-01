var senderService = require("../sender/service");
var config = require("../../config");

const controller = {
  sender: async (req, res, next) => {
    // File path
    let filePath = config.csvFilePath;
    console.log("req ", req.file);
    try {
      // json conversion
      let fileInJSon = await senderService
        .sender()
        .csvToJson(filePath + req.file.originalname);

      if (fileInJSon.flagCheck) {
        console.log("File JSON", fileInJSon.data);

        let jsonDetails = fileInJSon.data;
        let jsonLength = jsonDetails.length;

        if (jsonLength > 0) {
          let responseFlag;
          // Send json
          responseFlag = await senderService
            .sender()
            .interateThrougObj(jsonDetails);
          // response after message send
          if (responseFlag) {
            res.status(200).send({
              status: 200,
              message: "success",
              data: [],
            });
          }
        } else {
          res.status(404).send({
            status: 404,
            message: "Something went wrong while converting into  json",
            data: [],
          });
        }
      }
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "error",
        data: error.message,
      });
    }
  },
};

module.exports = controller;
