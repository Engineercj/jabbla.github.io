var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var url = 'https://www.zhihu.com/question/35242408';
request({
    url: url,
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36'
    }
}, function (error, response, body) {
    if (error) {
        return console.error(error);
    }

    var $ = cheerio.load(response.body.toString());
    var $imglist = $('img');
    //console.log($imglist)
    var i = 328;

    function getImg() {
        var url = checkUrl($imglist[i].attributes['src']);
        if (!url) {
            i++;
            return getImg();
        }
        request
            .get(url)
            .on('response', function (response) {
                console.log(response.statusCode); // 200
                console.log(response.headers['content-type']) // 'image/png'
            })
            .pipe(fs.createWriteStream("./img/" + encodeURIComponent(url)).on('finish', function () {
                console.log('ok' + i++);
                getImg();
            }));
    }

    getImg();


});

function checkUrl(url) {
    if (!!url && url.indexOf('http') > -1) {
        return url;
    }
}
