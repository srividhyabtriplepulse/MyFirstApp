var Connection =require("mssql");
var exprress=require("express");
var app   = exprress();
var util=require("util");
var path=require("path");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var dbconfig=
{
    user: "admin_triplepulse",
    password: "10_pulse",
    server: "triplepulse.database.windows.net",
    options: {encrypt: true,database: "TriplePulse"}
};
Connection.connect(dbconfig, function(err) {
    if(err) throw ("Issue in connecting to db");
    console.log("Connected");
});


app.get("/dboClient", function(req, res) {
    Connection.connect(dbconfig, function (err, conn) { // settings should not come here so i removed it
        if (err) {
            console.log(err);
            res.send(500, "Cannot open connection.");
        }
        else {
            var request = new Connection.Request();
            request.query("SELECT * FROM Client", function (err, results) {
                if (err) {
                    console.log(err);
                    res.send(500, "Cannot retrive records.");
                }
                else {
                    //console.log(results);
                    res.json(results);
                }
            });
        }
    });
});

app.post("/dboClient", function(req, res) {

    var data={

        //ClientID : req.body.ClientID,
        ClientName : req.body.ClientName,
        ClientMobile : req.body.ClientMobile,
        ClientEmail : req.body.ClientEmail,
        ClientPassword : req.body.ClientPassword,
        ClientPhone : req.body.ClientPhone,
        Emr1Name : req.body.Emr1Name,
        Emr1Phone : req.body.Emr1Phone,
        Emr2Name : req.body.Emr2Name,
        Emr2Phone : req.body.Emr2Phone

    };

    


    Connection.connect(dbconfig, function (err) {
        if (err) {
            console.log(err);
            res.send(500, "Cannot open connection.");
        }

        else {
            var request = new Connection.Request();



            var sql1 = "INSERT INTO Client(ClientName,ClientMobile,ClientEmail,ClientPassword,ClientPhone,Emr1Name,Emr1Phone,Emr2Name,Emr2Phone) values";
            sql1 += util.format("('%s','%s','%s','%s','%s','%s','%s','%s','%s')",data.ClientName,
                data.ClientMobile, data.ClientEmail, data.ClientPassword, data.ClientPhone, data.Emr1Name, data.Emr1Phone,
                data.Emr2Name, data.Emr2Phone);
            request.query(sql1, function (err, results) {

                if (err) {
                    console.log(err);
                    res.send("Cannot retrive records.");
                }
                else {
                    res.json(results);
                }
            });

        }
    });

});

var server = app.listen(8000,function ()
{
    console.log('server running at : 8000');

});