// Description
//   Hubot Script for managing cloud services
//
// Configuration:
//   LIST_OF_ENV_VARS_TO_SET
//
// Commands:
//   DO small server - creates a small DigitalOcean server
//   DO status - fetches droplets info
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   Meta Studios Inc <theTeam@metastudiosinc.com>

spawn = require('child_process').spawn

var sshkey = "";

//TODO ID Should be passed in somewhere
build = spawn('doctl', ["compute", "ssh-key", "get", "1846811"])
build.stdout.on('data', function(data) {
  console.log(data.toString());
  sshkey = data[0]["fingerprint"];
});
build.stderr.on('data', function(data) {
  console.log(data);
});


var getRandomName = function(){
  return ("action-jack");
}

var get

var createDOServer = function(size, image, callback){
  var name = getRandomName();
  build = spawn('doctl', ["compute", "droplet", "create", name, "--size", size, "--image", image, "--region", "nyc1", "--ssh-keys", sshkey])
  build.stdout.on('data', function(data) {
    console.log(data);
    callback(data)
  });
  build.stderr.on('data', function(data) {
    console.log(data);
    callback(data)
  });

}

var getDOdroplets = function(callback) {
  build = spawn('doctl', ["compute", "droplet", "list"])
  build.stdout.on('data', function(data) {
    console.log(data);
    callback(data)
  });
  build.stderr.on('data', function(data) {
    console.log(data);
    callback(data)
  });
}


module.exports = function(robot){
  robot.hear(/(.*)DO small server(.*)/i, function(msg) {
    msg.send("I will see what is lying around.")
    createDOServer(function(data) {
      msg.send(data.toString())
    });

  })

  robot.hear(/(.*)DO status(.*)/i, function(msg) {
    getDOdroplets(function(data) {
      msg.send(data.toString())
    });

  })



}
