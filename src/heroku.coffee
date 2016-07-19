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

getRandomComment = () ->
  "Good morning sleepy heads."


module.exports = (robot) ->
# heroku ps:restart --app metabot-slackbot
  robot.hear /(.*)wake up(.*)/i, (res)->
    res.send getRandomComment()
    build = spawn 'heroku', ["ps:restart", "--app", "metabot-slackbot"]
    build.stdout.on 'data', (data) -> res.send data.toString()
    build.stderr.on 'data', (data) -> res.send data.toString()
