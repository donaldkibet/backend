"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var unitofworkfactory_1 = require("./dbcontext/unitofworkfactory");
var moodrepository_1 = require("./repository/moodrepository");
var mood_1 = require("./models/mood");
var activity_1 = require("./models/activity");
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var activityrepository_1 = require("./repository/activityrepository");
var unitofWork = new unitofworkfactory_1.UnitOfWorkFactory();
var moodrepo, activityrepo = undefined;
unitofWork.create(function (res) {
    moodrepo = new moodrepository_1.MoodRepository(res);
    activityrepo = new activityrepository_1.Activityrepository(res);
});
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.route('/mood')
    .get(function (req, res) {
    moodrepo.findAll(function (result) {
        res.json(result);
    });
})
    .post(function (req, res) {
    var body = req.body;
    var mood = new mood_1.moods(body.id, body.time, body.date, body.mood);
    moodrepo.Add(mood, function (result) {
        res.json(result);
    });
})
    .put(function (req, res) {
    var body = req.body;
    var mood = new mood_1.moods(body.id, body.time, body.date, body.mood);
    moodrepo.Update(mood, function (result) {
        res.json(result);
    });
})
    .delete(function (req, res) {
    var body = req.body;
    var mood = new mood_1.moods(req.query.id, body.time, body.date, body.mood);
    moodrepo.Remove(mood, function (result) {
        res.json(result);
    });
});
app.route('/activity')
    .get(function (req, res) {
    if (req.query.id) {
        activityrepo.findById(req.query.id, function (results) {
            res.json(results);
        });
    }
    else {
        activityrepo.findAll(function (result) {
            res.json(result);
        });
    }
})
    .post(function (req, res) {
    var body = req.body;
    var activity = new activity_1.Activity(body.id, body.time, body.date, body.activity);
    activityrepo.Add(activity, function (results) {
        res.json(results);
    });
})
    .put(function (req, res) {
    var body = req.body;
    var activity = new activity_1.Activity(body.id, body.time, body.date, body.activity);
    activityrepo.Update(activity, function (results) {
        res.json(results);
    });
})
    .delete(function (req, res) {
    var body = req.body;
    console.log(req.query.id);
    var activity = new activity_1.Activity(req.query.id, body.time, body.date, body.activity);
    activityrepo.Remove(activity, function (results) {
        res.json(results);
    });
});
app.get('/mood/:id', function (req, res) {
    moodrepo.findById(req.params.id, function (results) {
        res.json(results);
    });
});
app.listen(8052, function () {
    console.log('server started listening at port');
});
