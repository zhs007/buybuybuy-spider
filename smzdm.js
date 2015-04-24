/**
 * Created by zhs007 on 15/4/22.
 */

var cheerio = require("cheerio");
var request = require('request');
var jsdom = require('jsdom');

var options = {
    url: 'http://www.smzdm.com/json_more?timesort=142979851721',
    headers: {
        'Host': 'www.smzdm.com',
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36',
        'Referer': 'http://faxian.smzdm.com/',
        'Accept-Language': 'zh,en-US;q=0.8,en;q=0.6',
        'Cookie': 'smzdm_user_source=926894FE0F104E9BC9EE9B18A4657883; __gads=ID=24389e3c27982adf:T=1415324663:S=ALNI_MaGNNgYy0KQzMgaVOhmoTGG4ksFrA; c8be548de9b51485bac4f9ec4c3bea3f1=hCY953Q%3D; bdshare_firstime=1416840668572; 3thread-20150320183143=14; 3thread-20150320182719=14; 3thread-20150325172319=2; 3thread-20150330182825=3; 3thread-20150216174551=35; 3thread-20150403192133=1; 3thread-20150330094602=17; 3thread-20150402183807=1; 3thread-20150330100002=6; 3thread-20150403194411=6; niuxamss30=194; smzdm_wordpress_360d4e510beef4fe51293184b8908074=chowray%7C1430871983%7Cd8fbd6cc0b06983eec01bd67e2c93047; smzdm_wordpress_logged_in_360d4e510beef4fe51293184b8908074=chowray%7C1430871983%7C30015fe65fd523c03d9a6a561295465f; user-role-smzdm=subscriber; sess=NWUwOTJ8MTQzMDg3MTk4M3w1OTM1MDUzODM4fGYyNzIzM2E4NmYxZmVhNGMzYzlhZDg4ZDc3MmQ4MTEy; user=chowray%7C5935053838; __utma=123313929.375347902.1415324662.1429666235.1429677053.14; __utmz=123313929.1429663435.12.7.utmcsr=faxian.smzdm.com|utmccn=(referral)|utmcmd=referral|utmcct=/; __jsluid=d1d25023040e2f0ed66d9cfd076c6cb3; PHPSESSID=h3a9ig50o10bpvtpjkluat4u30; wt3_eid=%3B999768690672041%7C2142352893200886172%232142979595800799096; wt3_sid=%3B999768690672041; smzdm_user_view=D6A433B5F0D33AE3A1CB176D0B593CB0; crtg_rta=; Hm_lvt_9b7ac3d38f30fe89ff0b8a0546904e58=1428930241,1429518146,1429580910,1429751739; Hm_lpvt_9b7ac3d38f30fe89ff0b8a0546904e58=1429837706; AJSTAT_ok_pages=4; AJSTAT_ok_times=468; _ga=GA1.2.375347902.1415324662; amvid=44ce7b447ccda916c0068f2929e0b24a; __jsl_clearance=1429838367.791|0|CV1sB6aRtH5WWd8z0leec8BApB4%3d'
        }
};

function callback(error, response, body) {
console.log(response.statusCode);
    if (!error && response.statusCode == 200) {
//         console.log(body);
output(body, "doc.json");

// saveFromHtml(body);

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

request(options, callback);

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