const express = require('express');
const app = express();
const router = express.Router();

const client_id = 'mP5wYclFwvfe8Z35L6rw';
const client_secret = 'PpXLohYGGB';

app.use(express.static('.'));

// router.get('/', (req, res) => {
//     res.render('./test-area/test', {title: 'Express' });
// });

app.get('/translate', function (req, res) {
   const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
   const request = require('request');
   const options = {
       url: api_url,
       form: {'source':'ko', 'target':'en', 'text':req.query.text},
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.post(options, function (error, response, body) {
        console.log(body);
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });
 app.listen(443, function () {
   console.log('app listening on port 443!');
 });