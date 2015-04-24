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
    datamgr.insert('buy_recommend', obj);
}

exports.insertRecommend = insertRecommend;