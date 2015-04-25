/**
 * Created by zhs007 on 15/4/24.
 */

var cfg = require('./config');
var datamgr_mysql = require('./datamgr_mysql').mgr;

// datamgr是最基础的数据管理器，可以有很多具体实现

var s_mgr;

function getDataMgr() {
    if (s_mgr == undefined) {
        if (cfg.datamgr_type == 'mysql') {
            s_mgr = datamgr_mysql;
        }
    }

    return s_mgr;
}

exports.getDataMgr = getDataMgr;