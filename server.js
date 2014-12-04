var express = require('express');
var app = express();
var port    = 	process.env.PORT || 8080;

var CronJob = require('cron').CronJob,
    moment = require('moment'),
    cons = require('consolidate');
    moment().format();

app.engine('html', cons.mustache);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

//-----------------------------------
//              Routes
//-----------------------------------

app.get('/controller', function(req, res){
  controller();
  cons.mustache('views/controller.html', {}, function(err, html) { //cons makes mustache play nice with express :-)
    if(err) throw err;
    res.send(html);
  });
});

//404 catchall
app.get('*', function(req, res) {
  cons.mustache('views/404.html', {}, function(err, html){
    if(err) throw new Error;
    res.send(html);
  });
});

app.listen(port);
console.log('App running at http://localhost:' + port);

//-----------------------------------
//        Resource Functions
//-----------------------------------
function controller() {
  new CronJob('*/10 * * * * 1-5', function(){
    console.log('Cron job interation', new Date());
    //do controller stuff
  }, null, true, "America/New_York");
  //You need a way of ending this cron job when the user exits
}
