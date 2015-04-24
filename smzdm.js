/**
 * Created by zhs007 on 15/4/22.
 */

var cheerio = require("cheerio");
var request = require('request');
var jsdom = require('jsdom');

readHead("cookie.json");

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

		saveFromJson(body);

	}
}

//解析json
function saveFromJson(body){
	var json = JSON.parse(body);
	
	console.log(json.length);
	
	var str = "";
	for(var i = 0; i < json.length; ++i)
	{
		console.log(json[i].article_id);
		str += "article_id: " + json[i].article_id + "\n";
		str += "article_title: " + json[i].article_title + "\n";
		str += "article_content: " + json[i].article_content + "\n";
		str += "article_price: " + json[i].article_price + "\n";
		str += "article_content_all: " + json[i].article_content_all + "\n";
		str += "article_referrals: " + json[i].article_referrals + "\n";
		str += "article_date: " + json[i].article_date + "\n";
		str += "article_is_sold_out: " + json[i].article_is_sold_out + "\n";
		str += "article_is_timeout: " + json[i].article_is_timeout + "\n";
		str += "article_mall: " + json[i].article_mall + "\n";
		str += "article_worthy: " + json[i].article_worthy + "\n";
		str += "article_unworthy: " + json[i].article_unworthy + "\n";
		str += "article_comment: " + json[i].article_comment + "\n";
		str += "article_collection: " + json[i].article_collection + "\n";
		str += "article_pic: " + json[i].article_pic + "\n";
		str += "article_pic_style: " + json[i].article_pic_style + "\n";
		str += "article_link: " + json[i].article_link + "\n";
		str += "article_link_domain: " + json[i].article_link_domain + "\n";
		str += "article_link_list: " + "\n";// + json[i].article_link_list + "\n";
		
		if(json[i].article_link_list)
		{
			for(var j = 0; j < json[i].article_link_list.length; ++j)
			{
				str += "[" + j + "]" + "article_link_list_name: " + json[i].article_link_list[j].name + "\n";
				str += "[" + j + "]" + "article_link_list_link: " + json[i].article_link_list[j].link + "\n";
				str += "[" + j + "]" + "article_link_list_link_nofollow: " + json[i].article_link_list[j].link_nofollow + "\n";
				str += "[" + j + "]" + "article_link_list_domain: " + json[i].article_link_list[j].domain + "\n";
			}
		}
		
		str += "article_url: " + json[i].article_url + "\n";
		str += "article_mall_url: " + json[i].article_mall_url + "\n";
		str += "article_channel: " + json[i].article_channel + "\n";
		str += "article_channel_url: " + json[i].article_channel_url + "\n";
		str += "article_channel_id: " + json[i].article_channel_id + "\n";
		str += "is_out: " + json[i].is_out + "\n";
		str += "article_category: " + "\n";// + json[i].article_category + "\n";
		
		if(json[i].article_category)
		{
			for(var j = 0; j < json[i].article_category.length; ++j)
			{
				str += "[" + j + "]" + "article_category_ID: " + json[i].article_category[j].ID + "\n";
				str += "[" + j + "]" + "article_category_title: " + json[i].article_category[j].title + "\n";
				str += "[" + j + "]" + "url_nicktitle: " + json[i].article_category[j].url_nicktitle + "\n";
				str += "[" + j + "]" + "pnumlenth: " + json[i].article_category[j].pnumlenth + "\n";
				str += "[" + j + "]" + "category_url: " + json[i].article_category[j].category_url + "\n";
			}
		}
		
		str += "top_category: " + json[i].top_category + "\n";
		str += "article_tese_tags: "  + "\n";//+ json[i].article_tese_tags + "\n";
				
		if(json[i].article_tese_tags)
		{
			for(var j = 0; j < json[i].article_tese_tags.length; ++j)
			{
				str += "[" + j + "]" + "article_tese_tags_id: " + json[i].article_tese_tags[j].id + "\n";
				str += "[" + j + "]" + "article_tese_tags_tag_type: " + json[i].article_tese_tags[j].tag_type + "\n";
				str += "[" + j + "]" + "article_tese_tags_tag_url: " + json[i].article_tese_tags[j].tag_url + "\n";
			}
		}
		
		str += "timesort: " + json[i].timesort + "\n";
		str += "\n";
	}
    output(str, "json.txt");
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