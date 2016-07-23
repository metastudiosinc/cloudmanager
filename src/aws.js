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

function getAWSstatus(callback) {
  //aws ec2 describe-hosts
  build = spawn('aws', ["ec2", "describe-hosts"])
  build.stdout.on('data', function(data) {
    var info = JSON.parse(data.toString())
      callback(info.Hosts)
  });
  build.stderr.on('data', function(data) {
    console.log(data.toString());
    callback(data);
  });

}


module.exports = function(robot) {

  robot.hear(/(.*)AWS status(.*)/i, function(msg) {
    getAWSstatus(function(data) {
      console.log("aws call complete");
      if(data.toString() != ""){
        msg.send(data.toString())
      }else{
        msg.send("no active hosts")
      }

    });

  })



}
