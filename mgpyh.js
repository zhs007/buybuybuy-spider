/**
 * Created by zhs007 on 15/4/22.
 */

var cheerio = require("cheerio");
var request = require('request');
var jsdom = require('jsdom');

readHead("header_mgpyh.json");

function readHead(head){
	var fs = require('fs');
	fs.readFile(head, 'utf-8', function(err, data) {  
		if (err) {  
			console.error(err);  
		} else {   	
			var json = JSON.parse(data);
	
			var options = {
			    url: json.url,
			    headers: {
        			'Host': json.host,
			        'Connection': 'keep-alive',
			        'Accept': 'application/json, text/javascript, */*; q=0.01',
			        'X-Requested-With': 'XMLHttpRequest',
			        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36',
			        'Referer': json.referer,
			        'Accept-Language': 'zh,en-US;q=0.8,en;q=0.6',
			        'Cookie': json.cookie
		        }
   
			};

			request(options, callback);

		}  
	});  
}

function callback(error, response, body) {
console.log(response.statusCode);
    if (!error && response.statusCode == 200) {
//         console.log(body);
		output(body, "doc.json");

// 		saveFromHtml(body);

		var str = saveFromJson(body);

   		output(str, "output_mgpyh.txt");
	}
}

//解析json
function saveFromJson(body){

	var json = JSON.parse(body).items;
	console.log(json.length);
		
	var str = "";
	for(var i = 0; i < json.length; ++i)
	{
		console.log(json[i].id);
		str += "id: " + json[i].id + "\n";
		str += "attachment_url: " + json[i].attachment_url + "\n";
		str += "is_liked: " + json[i].is_liked + "\n";
		str += "remind_url: " + json[i].remind_url + "\n";
		str += "post_place: " + json[i].post_place + "\n";
		str += "seo_msg.keywords: " + json[i].seo_msg.keywords + "\n";
		str += "seo_msg.description: " + json[i].seo_msg.description + "\n";
		str += "likes: " + json[i].likes + "\n";
		str += "children: " + json[i].children + "\n";
		str += "category: " + json[i].category + "\n";
		str += "attachment_path: " + json[i].attachment_path + "\n";
		str += "bomb_username: " + json[i].bomb_username + "\n";
		str += "post_special: " + json[i].post_special + "\n";
		str += "area: " + json[i].area + "\n";
		str += "remind_content: " + json[i].remind_content + "\n";
		str += "hot: " + json[i].hot + "\n";
		
		str += "post_url: " + json[i].post_url + "\n";
		str += "post_title: " + json[i].post_title + "\n";
		str += "comment_count: " + json[i].comment_count + "\n";
		str += "draft: " + json[i].draft + "\n";
		str += "is_sold_out: " + json[i].is_sold_out + "\n";
		str += "thumbnail: " + json[i].thumbnail + "\n";
		str += "slide_thumb: " + json[i].slide_thumb + "\n";
		str += "tags: " + json[i].tags + "\n";
		str += "mgpyh_like_set: " + json[i].mgpyh_like_set + "\n";
		str += "price: " + json[i].price + "\n";
		str += "SubCate_id: " + json[i].SubCate_id + "\n";
		str += "extra_msg2: " + json[i].extra_msg2 + "\n";
		str += "exact_time: " + json[i].exact_time + "\n";
		str += "need_remind: " + json[i].need_remind + "\n";
		str += "post: " + json[i].post + "\n";
		str += "money_url: " + json[i].money_url + "\n";
		str += "is_advenced_bomb: " + json[i].is_advenced_bomb + "\n";
		str += "hits: " + json[i].hits + "\n";
		str += "SubCate: " + json[i].SubCate + "\n";
		str += "like: " + json[i].like + "\n";
		str += "remind_time: " + json[i].remind_time + "\n";
		str += "is_delete: " + json[i].is_delete + "\n";
		str += "post_name: " + json[i].post_name + "\n";
		str += "time: " + json[i].time + "\n";
		str += "post_excerpt: " + json[i].post_excerpt + "\n";
		str += "extra_msg3: " + json[i].extra_msg3 + "\n";
		
		str += "\n";
	}
    return str;
}

//解析html
function saveFromHtml(body){
	jsdom.env(body,['http://code.jquery.com/jquery.js'],function(errors, window){  
	
	var str = "";
	window.$("[class='list list_preferential']").each(function(){
		
		var list = window.$(this);
		var timesort = list.attr("timesort");
		console.log("timesort:", timesort);
		str += "timesort:" + timesort + "\n";

		
		var itemName = list.find("[class='itemName']").children().html();		
		console.log("itemName:", itemName);
		str += "itemName:" + itemName + "\n";
				
		var lrInfo = list.find("[class='lrInfo']").children().html();
		console.log("lrInfo:", lrInfo);		
		str += "lrInfo:" + lrInfo + "\n";
		
		var img = list.find("img").attr("src");
		console.log("img:", img);
		str += "img:" + img + "\n";
				
		var link = list.find("[class='itemName']").find("a").attr("href");
		console.log("link:", link);		
		str += "link:" + link + "\n";
				
		str += "\n";
	});
	
    output(str, "html.txt");

	});
}


function output(doc, name){
var fs = require('fs');
//新建 hello.txt ,并往文件中写入 Hello World!
	fs.open(name, 'w', 0666, function(e, fd) {
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



//var url = "http://haitao.mgpyh.com/"
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