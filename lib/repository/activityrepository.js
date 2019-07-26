"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Activityrepository = /** @class */ (function () {
    function Activityrepository(uow) {
        this.uow = undefined;
        this.uow = uow;
    }
    Activityrepository.prototype.findAll = function (callback) {
        this.uow.query('select * from activity', [], function (results) {
            return callback(results);
        });
    };
    Activityrepository.prototype.findById = function (id, callback) {
        this.uow.query('select * from activity where id = ?', [id], function (results) {
            return callback(results);
        });
    };
    Activityrepository.prototype.Add = function (value, callback) {
        this.uow.query('insert into activity (time,date,activity) values (?,?,?)', [value.time, value.date, value.activity], function (results) {
            return callback(results);
        });
        this.uow.saveChanges();
    };
    Activityrepository.prototype.Update = function (value, callback) {
        this.uow.query('update activity set time = ?, date = ? ,activity = ? where id = ?', [value.time, value.date, value.activity, value.id], function (results) {
            return callback(results);
        });
        this.uow.saveChanges();
    };
    Activityrepository.prototype.Remove = function (value, callback) {
        console.log(value.id);
        this.uow.query('delete from activity where id = ?', [value.id], function (result) {
            return callback(result);
        });
        this.uow.saveChanges();
    };
    return Activityrepository;
}());
exports.Activityrepository = Activityrepository;
