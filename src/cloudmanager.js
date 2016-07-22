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


var getHerokuApps = function(callback) {

  var build = spawn('heroku', ["apps"]);
  build.stdout.on('data', function(data){
    var apps = [];
    if (data){
      data = data.toString();
      data = data.split("\n");
      for (chunk of data) {
        if(chunk.indexOf("===") < 0 && chunk.length > 0){
          apps.push(chunk)

        }
      }
      callback(apps);
    }


  });

}

var getAppStatus = function(appname, callback){
  var build = spawn('heroku', ["ps", "-a", appname]);
  build.stdout.on('data', function(data){
      callback(data);
  })

}

module.exports = function(robot) {
    robot.hear(/heroku apps/i, function(msg){
      getHerokuApps(function(apps) {
        for (var i = 0; i < apps.length; i++) {

          getAppStatus(apps[i], function(data) {
            msg.send(data.toString());

          })
        }

      });

    });
}
