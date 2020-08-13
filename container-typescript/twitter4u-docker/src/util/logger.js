'use strict';

const log4js = require('./node_modules/log4js');

function logger() {
  const config = {
    "appenders": [
      {
        "type": "console",
        "layout": {
          "type": "pattern",
          "pattern": "%d (PID: %x{pid}) %p %c - %m",
          "tokens": {
            "pid" : function() { return process.pid; }
          }
        }
      }
    ]
  };

  log4js.configure(config, {});

  return {
    getLogger: function(category) {
      return log4js.getLogger(category);
    }
  };
}

module.exports = logger;
