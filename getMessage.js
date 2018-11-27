var superagent = require('superagent');
var $ = require('cheerio');
var crypto = require('crypto');
var fs = require('fs');

var url = "http://sso.jwc.whut.edu.cn/Certification//login.do";
var headers = {
    'Referer': "http://sso.jwc.whut.edu.cn/Certification//toLogin.do",
    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0"
};

fs.readFile("id.json", 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        userId = JSON.parse(data);
    }

    var userName = userId.username;
    var userName1 = crypto.createHash('md5').update(userName).digest('hex');
    console.log(userName1);

    var password = userId.password;
    var password1 = crypto.createHash('sha1').update(userName + password).digest('hex');
    console.log(password1);

    var forms = {
        'code': "4332694498",
        //'password': "",
        'password1': password1, // md5
        'type': "xs",
        //'userName': "",
        'userName1': userName1, // username + password sha1
        'webfinger': "b9a7a7901c83c4c0dad90bd2bbf19498"
    };
    superagent
        .post(url)
        .set(headers)
        .type('form')
        .send(forms)
        .end(function (err, res) {
            if (err) {
                throw err;
            } else {
                //console.log(res.text);
                var message = $('a.clearfix', res.text).text();
                console.log(message);
            }
        });
});