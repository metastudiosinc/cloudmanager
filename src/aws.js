// Description
//   Hubot Script for managing cloud services
//
// Configuration:
//   LIST_OF_ENV_VARS_TO_SET
//
// Commands:
//   AWS status - fetches AWS info
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   Meta Studios Inc <theTeam@metastudiosinc.com>

spawn = require('child_process').spawn

function getAWSstatus() {
  return "no connection to AWS yet"

}


module.exports = function(robot) {

  robot.hear(/(.*)AWS status(.*)/i, function(msg) {
    getAWSstatus(function(data) {
      msg.send(data.toString())
    });

  })



}
