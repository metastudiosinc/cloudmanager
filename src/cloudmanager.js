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

var getHerokuAppStatus = function(appname, callback){
  var build = spawn('heroku', ["ps", "-a", appname]);
  build.stdout.on('data', function(data){
      callback(appname, data);
  })

}



module.exports = function(robot) {
    robot.hear(/heroku status/i, function(msg){
      getHerokuApps(function(apps) {
        for (var i = 0; i < apps.length; i++) {

          getHerokuAppStatus(apps[i], function(appName, data) {
            var post = data.toString()
            if (post.indexOf(appName) > -1 || post.indexOf("web") > -1){
              msg.send(post);
            }


          })
        }

      });

    });

    robot.hear(/heroku apps/i, function(msg){
      getHerokuApps(function(apps) {
        for (var i = 0; i < apps.length; i++) {
              msg.send(post);

          })
        }

      });
}
