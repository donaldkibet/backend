"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbcontext = /** @class */ (function () {
    function dbcontext(connection) {
        this.connection = undefined;
        this.connection = connection;
    }
    dbcontext.prototype.query = function (sql, params, callback) {
        var _this = this;
        this.connection.beginTransaction(function (err) {
            _this.connection.query(sql, params, function (errors, results) {
                if (err)
                    _this.connection.rollBack();
                return callback(results);
            });
        });
    };
    dbcontext.prototype.saveChanges = function () {
        this.connection.commit(function (err) {
            if (err)
                throw err;
        });
    };
    return dbcontext;
}());
exports.dbcontext = dbcontext;
