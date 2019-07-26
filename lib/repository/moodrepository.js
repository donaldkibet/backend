"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MoodRepository = /** @class */ (function () {
    function MoodRepository(uow) {
        this.uow = undefined;
        this.uow = uow;
    }
    MoodRepository.prototype.findAll = function (callback) {
        this.uow.query('select * from mood', [], function (results) {
            return callback(results);
        });
    };
    MoodRepository.prototype.findById = function (id, callback) {
        this.uow.query('select * from mood where id = ?', [id], function (results) {
            return callback(results);
        });
    };
    MoodRepository.prototype.Add = function (value, callback) {
        this.uow.query('insert into mood (time,date,mood) values(?,?,?)', [value.time, value.date, value.mood], function (results) {
            return callback(results);
        });
        this.uow.saveChanges();
    };
    MoodRepository.prototype.Update = function (value, callback) {
        this.uow.query('update mood set time = ? , date = ? , mood = ? where id = ?', [value.time, value.date, value.mood, value.id], function (results) {
            return callback(results);
        });
        this.uow.saveChanges();
    };
    MoodRepository.prototype.Remove = function (value, callback) {
        this.uow.query('delete from mood where id = ?', [value.id], function (results) {
            return callback(results);
        });
        this.uow.saveChanges();
    };
    return MoodRepository;
}());
exports.MoodRepository = MoodRepository;
