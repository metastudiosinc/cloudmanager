# Description
#   Hubot Script for managing cloud services
#
# Configuration:
#   LIST_OF_ENV_VARS_TO_SET
#
# Commands:
#   hubot hello - <what the respond trigger does>
#   orly - <what the hear trigger does>
#
# Notes:
#   <optional notes required for the script>
#
# Author:
#   Meta Studios Inc <theTeam@metastudiosinc.com>

spawn = require('child_process').spawn

getRandomName = ()->
  "action-jack"

module.exports = (robot) ->
# digital ocean start a small server
  robot.hear /(.*)small server(.*)/i, (res)->
    res.send "I will see what is lying around."
    build = spawn 'tugboat', ["create", getRandomName()]
    build.stdout.on 'data', (data) -> res.send data.toString()
    build.stderr.on 'data', (data) -> res.send data.toString()
