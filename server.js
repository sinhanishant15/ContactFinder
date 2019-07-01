var express = require('express')
, path = require('path'),sqlite3 = require('sqlite3'), app = express(),router = express.Router(),dbPath = path.join(__dirname,'db','demo.db');
var db = new sqlite3.Database(dbPath);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
var result;
app.get('/contact', function (req, res) {
//var sql = 'SELECT userid,title,NAME,birthdate,isfavorite FROM contact';
var sql = 'SELECT userid,title,NAME,birthdate,isfavorite,(SELECT count(*) FROM contactdetail where userid =c.userid) as count FROM contact c';
db.all(sql, [], (err, rows) => {if (err) {console.log(err);}
		rows.forEach((row) => {
			//console.log(row.userid);
		});
		res.render('contact.ejs',{result:rows});
	});
});	

app.get('/contactDetails', function (req, res) {
	var id = req.query.id;
	var sql = 'SELECT userid,contactdetailtype,contactdetailcontent FROM contactdetail where userid ='+id;
	db.all(sql, [], (err, rows) => {if (err) {console.log(err);}
			rows.forEach((row) => {
			});
			res.render('contact-detail.ejs',{result:rows});
		});
});	

app.set('port', 80);
var server = app.listen(app.get('port'),app.get('ip'), function () {
	 console.log("tech app is running at http://127.0.0.1:"+app.get('port'));
});