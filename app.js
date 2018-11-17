const express    = require('express'),
      app        = express(),
      path       = require('path'),
      bodyParser = require('body-parser'),
      mailgun    = require('mailgun-js')({apiKey: process.env.mailApi_key, domain: process.env.mailDomain}),
      PORT       = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/mail', (req, res) => {
    
    
    const requests = {
        nimi: req.body.nimi,
        sähköpostiosoite: req.body.sähköpostiosoite,
        puhelinnumero: req.body.puhelinnumero,
        valitse: req.body.valitse,
        viesti: req.body.viesti 
    }
    
    

    var data = {
        from: 'Trung <jleevi@gmail.com>',
        to: 'nhht77@gmail.com',
        subject: 'Hello World',
        text: 'You have this request:',
        html: `<h1>You have a new request from:</h1> 
                <ul> 
                    <li>Nimi: ${requests.nimi}</li>
                    <li>Sähköpostiosoite: ${requests.sähköpostiosoite}</li>
                    <li>Puhelinnumero: ${requests.puhelinnumero}</li>
                    <li>valitse: ${requests.valitse}</li>
                    <li>viesti: ${requests.viesti}</li>
                </ul>`
      };
       
      mailgun.messages().send(data,  (error, body) => {
        if(error){
            console.log(error);
        }else{
          console.log(body);
        }
      });

    console.log(data);
    res.redirect('/');
})

app.get('/palvelut', (req, res) => {
    res.render('palvelut');
})

app.get('/hinnasto', (req, res) => {
    res.render('hinnasto');
})

app.get('/yritys', (req, res) => {
    res.render('yritys');
})

app.get('/yhteystiedot', (req, res) => {
    res.render('yhteystiedot');
})
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})