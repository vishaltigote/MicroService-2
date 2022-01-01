const con = require("../../common/mysql");
const util = require("util");
const query = util.promisify(con.query).bind(con);

class Rec {
  async insertLine(messageObject) {
    return new Promise(async (resolve, reject) => {
      // Replace single qoute
      let companyName = messageObject["Company"].replace("'", " ");

      let q_string = `INSERT INTO employee(Company,Employee_Name,Phone_Number,Email) VALUES('${companyName}','${messageObject["Employee Name"]}','${messageObject["Phone Number"]}','${messageObject["Email Address"]}');`;

      console.log(q_string);

      // Fired Query
      var result = await query(q_string, (err, data) => {
        if (err) {
          console.log("Error");
          resolve({ flag: false, data: [] });
        } else {
          if (data.affectedRows == 1) {
            resolve({ flag: true, data: data.recordsets });
          } else {
            resolve({ flag: false, data: [] });
          }
        }
      });
    });
  }
}

module.exports = {
  recService: function () {
    return new Rec();
  },
};
