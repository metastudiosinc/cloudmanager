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


var getHerokuApps = function() {
  var apps = [];
  var build = spawn('heroku', ["apps"]);
  build.stdout.on('data', function(data){
    data = data.toString();
    data = data.split("\n");
    for (chunk of data) {
      if(chunk.indexOf("===") < 0 && chunk.length > 0){
        app.push(chunk)

      }
    }
    return apps;

  });

}

module.exports = function(robot) {
    robot.hear(/heroku apps/i, function(msg){
      apps = getHerokuApps();
      msg.send(apps.toString());
    });
}
