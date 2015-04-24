/**
 * Created by zhs007 on 15/4/6.
 */

var mysql = require('mysql');
var logger = require('./logger');

// 连接数据库
function connect(funcOnConnect) {
    var dbc = this;

    if (this.stateConnect == -1) {
        this.stateConnect = 0;

        logger.normal.log('info', 'dbbase connect ' + this.cfg.host);

        this.dbcon = mysql.createConnection(this.cfg);
        this.dbcon.on('error', function (err) {
            dbc.onDBError(err);
        });
        this.dbcon.connect(function (err) {
            if (err) {
                this.stateConnect = -1;

                logger.normal.log('error', 'dbbase connect error ' + err.code);

                setTimeout(function () {
                    this.connect(funcOnConnect);
                }, 5000);

                return ;
            }

            this.stateConnect = 1;

            funcOnConnect();
        });
    }
    else if (this.stateConnect == 1) {
        funcOnConnect();
    }
}

function reconnect(funcOnReconnect) {
    if (this.stateConnect == 1) {
        this.dbcon.end(function (err) {
            this.stateConnect = -1;

            this.connect(funcOnReconnect);
        });
    }
    else if (this.stateConnect == -1) {
        this.connect(funcOnReconnect);
    }
}

function onDBError(err) {
    if (err) {
        logger.normal.log('error', 'dbbase onDBError error ' + err.code);

        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            this.stateConnect = -1;

            this.reconnect();
        }
        else {
            setTimeout(this.reconnect, 5000);
        }
    }
}

function query(sql, funcOnQuery) {
    this.connect(function () {
        this.dbcon.query(sql, funcOnQuery);
    });
}

function _queryList(sqlarr, begin, max, result, func) {
    if(begin >= max) {
        func(result);

        return ;
    }

    //logger.dev.info('sql ' + begin + ' ' + sqlarr[begin]);
    this.dbcon.query(sqlarr[begin], function (err, rows, fields) {
        result[begin] = {err: err, rows: rows, fields: fields};
        this._queryList(sqlarr, begin + 1, max, result, func);
    });
}

// onQueryList(results as [{err, rows, fields},...])
function queryList(sqlarr, funcOnQueryList) {
    this.connect(function () {
        var max = sqlarr.length;
        var i = 0;
        var result = [];

        this._queryList(sqlarr, i, max, result, funcOnQueryList);
    });
}

function isValidResult(rows, name) {
    return typeof (rows) != 'undefined' && rows.length > 0 && rows[0].hasOwnProperty(name) && rows[0][name] !== null;
}

function DBClient(dbid, host, user, password, database) {
    this.dbid = dbid;

    this.cfg = {
        host: host,
        user: user,
        password: password,
        database: database
    };

    this.dbcon = null;
    this.stateConnect = -1;
}

DBClient.prototype.type = 'DBClient';
DBClient.prototype.connect = connect;
DBClient.prototype.reconnect = reconnect;
DBClient.prototype.onDBError = onDBError;
DBClient.prototype.query = query;
DBClient.prototype._queryList = _queryList;
DBClient.prototype.queryList = queryList;
DBClient.prototype.isValidResult = isValidResult;

var mapDBClient = {};

function getDBClient(dbid) {
    if (mapDBClient.hasOwnProperty(dbid)) {
        return mapDBClient[dbid];
    }

    return null;
}

function newDBClient(dbid, host, user, password, database) {
    mapDBClient[dbid] = new DBClient(dbid, host, user, password, database);
}

exports.getDBClient = getDBClient;
exports.newDBClient = newDBClient;