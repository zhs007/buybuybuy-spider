/**
 * Created by zhs007 on 15/4/22.
 */

var cheerio = require("cheerio");
var request = require('request');
var jsdom = require('jsdom');
var recommendmgr = require('./recommendmgr');

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
		var str1 = "";
		str1 += "id: " + json[i].id + "\n";
		str1 += "attachment_url: " + json[i].attachment_url + "\n";
		str1 += "is_liked: " + json[i].is_liked + "\n";
		str1 += "remind_url: " + json[i].remind_url + "\n";
		str1 += "post_place: " + json[i].post_place + "\n";
		str1 += "seo_msg.keywords: " + json[i].seo_msg.keywords + "\n";
		str1 += "seo_msg.description: " + json[i].seo_msg.description + "\n";
		str1 += "likes: " + json[i].likes + "\n";
		str1 += "children: " + json[i].children + "\n";
		str1 += "category: " + json[i].category + "\n";
		str1 += "attachment_path: " + json[i].attachment_path + "\n";
		str1 += "bomb_username: " + json[i].bomb_username + "\n";
		str1 += "post_special: " + json[i].post_special + "\n";
		str1 += "area: " + json[i].area + "\n";
		str1 += "remind_content: " + json[i].remind_content + "\n";
		str1 += "hot: " + json[i].hot + "\n";
		
		str1 += "post_url: " + json[i].post_url + "\n";
		str1 += "post_title: " + json[i].post_title + "\n";
		str1 += "comment_count: " + json[i].comment_count + "\n";
		str1 += "draft: " + json[i].draft + "\n";
		str1 += "is_sold_out: " + json[i].is_sold_out + "\n";
		str1 += "thumbnail: " + json[i].thumbnail + "\n";
		str1 += "slide_thumb: " + json[i].slide_thumb + "\n";
		str1 += "tags: " + json[i].tags + "\n";
		str1 += "mgpyh_like_set: " + json[i].mgpyh_like_set + "\n";
		str1 += "price: " + json[i].price + "\n";
		str1 += "SubCate_id: " + json[i].SubCate_id + "\n";
		str1 += "extra_msg2: " + json[i].extra_msg2 + "\n";
		str1 += "exact_time: " + json[i].exact_time + "\n";
		str1 += "need_remind: " + json[i].need_remind + "\n";
		str1 += "post: " + json[i].post + "\n";
		str1 += "money_url: " + json[i].money_url + "\n";
		str1 += "is_advenced_bomb: " + json[i].is_advenced_bomb + "\n";
		str1 += "hits: " + json[i].hits + "\n";
		str1 += "SubCate: " + json[i].SubCate + "\n";
		str1 += "like: " + json[i].like + "\n";
		str1 += "remind_time: " + json[i].remind_time + "\n";
		str1 += "is_delete: " + json[i].is_delete + "\n";
		str1 += "post_name: " + json[i].post_name + "\n";
		str1 += "time: " + json[i].time + "\n";
		str1 += "post_excerpt: " + json[i].post_excerpt + "\n";
		str1 += "extra_msg3: " + json[i].extra_msg3 + "\n";
		
		str += str1 + "\n";
		
		
		var platform_id = "mgpyh_" + json[i].id;
		var title = json[i].post_title;
		var content = json[i].seo_msg.description;
		var price = json[i].price;
		var content_all = json[i].post;
		var poster = json[i].post_name;
		var date = json[i].exact_time;
		var comment = json[i].comment_count;
		var url = "www.mgpyh.com" + json[i].post_url;
		var category = json[i].category;
		var timesort = "";
		var pic = json[i].thumbnail;
		var all = str1;
		
		title = replace(title);
		content = replace(content);
		price = replace(price);
		content_all = replace(content_all);
		poster = replace(poster);
		date = replace(date);
		comment = replace(comment);
		url = replace(url);
		category = replace(category);
		timesort = replace(timesort);
		pic = replace(pic);
		all = replace(all);
		
		var DataJson = {"platform":"mgpyh", "platform_id":platform_id, "title":title, "content":content, "price":price, "content_all":content_all, "poster":poster, "date":date, "comment":comment, "url":url, "category":category, "timesort":timesort, "pic":pic, "all":all};
		
		recommendmgr.insertRecommend(DataJson);
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



function replace(str){

	var str1 = "";
	str1 += str;
	str1 = str1.replace(/"/g, "“");
	str1 = str1.replace(/'/g, "‘");
// 	console.log("str1:" + str1);

	return str1;
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