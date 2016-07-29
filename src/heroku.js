// Description
//   Hubot Script for managing cloud services
//
// Configuration:
//   LIST_OF_ENV_VARS_TO_SET
//
// Commands:
//   wake up - wakes up heroku servers that are sleeping
//   heroku apps - fetches names of apps loaded to heroku
//   heroku status - fetches the status of all apps loaded to heroku
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   Meta Studios Inc <theTeam@metastudiosinc.com>


var spawn = require('child_process').spawn

var getRandomComment = function() {
  return "Good morning sleepy heads."

}


var getHerokuApps = function(callback) {

  var build = spawn('heroku', ["apps"]);
  var err = null;

  build.stdout.on('data', function(data) {
    var apps = [];
    if (data) {
      data = data.toString();
      data = data.split("\n");
      for (chunk of data) {
        if (chunk.indexOf("===") < 0 && chunk.length > 0) {
          apps.push(chunk)

        }
      }
      callback(err, apps);
    }
  });

  build.stderr.on('data', function(data) {
    err = "error"
    callback(err, data);
  });

}

var getHerokuAppStatus = function(appname, callback) {
  var build = spawn('heroku', ["ps", "-a", appname]);
  var err = null;
  build.stdout.on('data', function(data) {
    callback(err, appname, data);
  });
  build.stderr.on('data', function(data) {
    err = "error"
    callback(err, appname, data);
  });

}



module.exports = function(robot) {
  robot.respond(/heroku status/i, function(msg) {
    getHerokuApps(function(error, data) {
      if(error){
         msg.send("error");
         msg.send(data);
      }else{

        for (var i = 0; i < data.length; i++) {

          getHerokuAppStatus(data[i], function(error, appName, data) {
            if (error) {
              msg.send(data.toString());
            } else {
              var post = data.toString()
              if (post.indexOf(appName) > -1 || post.indexOf("web") > -1) {
                msg.send(post);
              }

            }
          })
        }

      }


    });

  });

  robot.respond(/heroku apps/i, function(msg) {
    getHerokuApps(function(error, data) {
      if(error){
        msg.send(data)
      }else{
        for (var i = 0; i < data.length; i++) {
          msg.send(data[i]);

        }

      }

    });

  });

  robot.hear(/.*wake up.*/i, function(msg) {
    msg.send(getRandomComment());
    build = spawn('heroku', ["ps:restart", "--app", "metabot-slackbot"])
    build.stdout.on('data', function(data) {
      msg.send(data.toString());
    });
    build.stderr.on('data', function(data) {
      msg.send(data.toString());
    });




  });


}
