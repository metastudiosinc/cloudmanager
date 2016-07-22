# Description
#   Hubot Script for managing cloud services
#
# Configuration:
#   LIST_OF_ENV_VARS_TO_SET
#
# Commands:
#   cloud status - Checks GCE, DigitalOcean, Heroku and AWS for VM statuses
#
# Notes:
#   <optional notes required for the script>
#
# Author:
#   Meta Studios Inc <theTeam@metastudiosinc.com>

spawn = require('child_process').spawn

module.exports = (robot) ->
  robot.hear /(.*)cloud status(.*)/i, (res)->
    apps = spawn 'heroku', ["apps"]
    res.send apps
