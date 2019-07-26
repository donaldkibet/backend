"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var express_1 = __importDefault(require("express"));
var config_json_1 = __importDefault(require("./config.json"));
var config = config_json_1.default.Database.development;
var app = express_1.default();
var dbcon = mysql_1.default.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
});
app.get('/moods', function (req, res) {
    dbcon.query('select * from activity', function (err, results) {
        if (err)
            throw err;
        res.json(results);
    });
});
app.listen(8080, function () {
    console.log('serve started listening at port 8080');
});
