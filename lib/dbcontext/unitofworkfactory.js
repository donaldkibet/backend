"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var config_json_1 = __importDefault(require("../config.json"));
var dbcontext_1 = require("./dbcontext");
var config = config_json_1.default.Database.development;
var db = undefined;
var _dbconn = mysql_1.default.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    connectionLimit: config.connectionLimit
});
var UnitOfWorkFactory = /** @class */ (function () {
    function UnitOfWorkFactory() {
    }
    UnitOfWorkFactory.prototype.create = function (callback) {
        _dbconn.getConnection(function (err, connection) {
            db = new dbcontext_1.dbcontext(connection);
            return callback(db);
        });
    };
    return UnitOfWorkFactory;
}());
exports.UnitOfWorkFactory = UnitOfWorkFactory;
