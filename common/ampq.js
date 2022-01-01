const config = require("../config");

var open = require("amqplib").connect(config.AMPQP_URL);

module.exports = open;
