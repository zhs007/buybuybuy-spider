/**
 * Created by zhs007 on 15/4/24.
 */

var dbmgr = require('./dbmgr');
var cfg = require('./config');
var util = require('util');

dbmgr.newDBClient('default', cfg.mysql_host, cfg.mysql_user, cfg.mysql_pwd, cfg.mysql_name);

function insert(lib, obj) {
    var val1 = '';
    var val2 = '';
    var index = 0;
    for (var key in obj) {
        if (index > 0) {
            val1 += ', ';
            val2 += ', ';
        }

        val1 += key;
        val2 += util.format("'%s'", obj[key]);

        ++index;
    }

    var sql = util.format("insert into %s(%s) values(%s)", lib, val1, val2);

    this.dbclient.query(sql, function (err, rows, fields) {

    });
}

function DataMgr_mysql() {
    this.dbclient = dbmgr.getDBClient('default');
}

DataMgr_mysql.prototype.type = 'DataMgr_mysql';
DataMgr_mysql.prototype.insert = insert;

exports.mgr = new DataMgr_mysql();