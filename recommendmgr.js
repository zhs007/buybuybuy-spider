/**
 * Created by zhs007 on 15/4/24.
 */

var datamgr = require('./datamgr').getDataMgr();

// recommend基本定义
// platform
// platform_id
// title
// content
// price
// content_all
// poster
// date
// comment
// url
// category
// timesort
// pic
// all

// 检查一条推荐是否已经存在
function hasRecommend(platform, platform_id) {

}

// 插入一条推荐
function insertRecommend(obj) {
//     obj.title = new Buffer(obj.title).toString('base64');
//     obj.content = new Buffer(obj.content).toString('base64');
// 
//     if(!isNaN(parseInt(obj.price, 10))) {
//         obj.price = new Buffer(obj.price).toString('base64');
//     }
// 
//     obj.content_all = new Buffer(obj.content_all).toString('base64');
//     obj.poster = new Buffer(obj.poster).toString('base64');
//     obj.date = new Buffer(obj.date).toString('base64');
//     obj.url = new Buffer(obj.url).toString('base64');
// 
//     if(!isNaN(parseInt(obj.category, 10))) {
//         obj.category = new Buffer(obj.category).toString('base64');
//     }
// 
//     obj.pic = new Buffer(obj.pic).toString('base64');
//     obj.all = new Buffer(obj.all).toString('base64');

    datamgr.insert('buy_recommend', obj);
}

exports.insertRecommend = insertRecommend;