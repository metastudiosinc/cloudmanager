# Description
#   Hubot Script for managing cloud services
#
# Configuration:
#   LIST_OF_ENV_VARS_TO_SET
#
# Commands:
#   ping all - ansible command to ping all known hosts
#
# Notes:
#   <optional notes required for the script>
#
# Author:
#   Meta Studios Inc <theTeam@metastudiosinc.com>

spawn = require('child_process').spawn

module.exports = (robot) ->
  robot.respond /ping all/i, (res) ->
    #build = spawn '/bin/bash', ['test.sh']
    build = spawn 'ansible', ['all','-m','ping']
    build.stdout.on 'data', (data) -> res.send data.toString()
    build.stderr.on 'data', (data) -> res.send data.toString()
