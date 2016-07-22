// Description
//   Hubot Script for managing cloud services
//
// Configuration:
//   LIST_OF_ENV_VARS_TO_SET
//
// Commands:
//   cloud status - Checks GCE, DigitalOcean, Heroku and AWS for VM statuses
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   Meta Studios Inc <theTeam@metastudiosinc.com>

var spawn = require('child_process').spawn


module.exports = function(robot) {
    robot.hear(/heroku status/i, function(msg){
      var build = spawn('heroku', ["apps"]);
      build.stdout.on('data', function(data){
        data = data.toString();
        data = data.split("\n");
        for (chunk of data) {
          if(chunk.indexOf("===") < 0){
            build2 = spawn('heroku', ["ps", "--app", chunk])
            build2.stdout.on('data', function (data2) {
              msg.send(data2);

            });
          }
        }

      });
    });
}
