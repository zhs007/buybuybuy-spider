/**
 * Created by zhs007 on 15/4/22.
 */

var cheerio = require("cheerio");
var request = require('request');

var options = {
    url: 'http://haitao.smzdm.com/',
    headers: {
        'User-Agent': 'request',
        'Content-Type': 'text/html;charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Connection': 'keep-alive',
        'Vary': 'Accept-Encoding, Accept-Encoding, Accept-Encoding, Accept-Encoding, Accept-Encoding',
        'Access-Control-Allow-Credentials': 'true',
        'Cache-Control': 'max-age=30',
        'Content-Encoding': 'gzip',
        'X-Cache': 'pass'
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
//         console.log(body);
        output(body);
    }
}

request(options, callback);

function output(doc){
var fs = require('fs');
//新建 hello.txt ,并往文件中写入 Hello World!
fs.open('doc.txt', 'w', 0666, function(e, fd) {
    if(e) {
        console.log('错误信息：' + e);
    } else {    
        fs.write(fd, doc, 0, 'utf8', function(e) {
            if(e) {
                console.log('出错信息：' + e);
            } else {
                fs.closeSync(fd);
            }
        });
    }
});
}


//var url = "http://haitao.smzdm.com/"
//
//download(url, function(data) {
//    if (data) {
//        console.log(data);
//
//        var $ = cheerio.load(data);
//        $("a.downbtn").each(function(i, e) {
//            console.log($(e).attr("href"));
//        });
//
//        console.log("done");
//    } else {
//        console.log("error");
//    }
//});