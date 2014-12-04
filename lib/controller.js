var CronJob = require('cron').CronJob,
    moment = require('moment');
    moment().format();

function controller() {
  new CronJob('*/10 * * * * 1-5', function(){ //Every 5 minutes (*/5) at 00seconds (0), Monday through Friday (1-5)
    console.log('Cron job interation', new Date());
    //do controller stuff
  }, null, true, "America/New_York");
}

exports.controller = controller;
