var config = require("../../config");
var open = require("../../common/ampq");
var recservice = require("../reciver/service");
console.log("AMQP connection established ");

console.log("open", open);

class Rec {
  async callFun() {
    let counter = 0;
    console.log("Consuming...");
    open
      .then(function (conn) {
        return conn.createChannel();
      })
      .then(function (ch) {
        return ch.assertQueue(config.q).then(function (ok) {
          return ch.consume(config.q, async function (msg) {
            if (msg !== null) {
              let res_insert;
              let messageParse;

              counter = counter + 1;

              console.log("counter", counter);

              // Ack Message :Read
              ch.ack(msg);

              // Message parsed
              messageParse = JSON.parse(msg.content.toString());

              if (
                messageParse ||
                messageParse["Employee Name"] ||
                messageParse["Company"] ||
                messageParse["Phone Number"] ||
                messageParse["Email Address"]
              ) {
                res_insert = await recservice
                  .recService()
                  .insertLine(messageParse);
                if (res_insert.flagCheck) {
                  console.log("Line Inserted ", counter);
                } else {
                  console.log("Line Not inserted ", counter);
                }
              }
            }
          });
        });
      })
      .catch(console.log(""));
  }
}

module.exports = {
  rec: function () {
    return new Rec();
  },
};
