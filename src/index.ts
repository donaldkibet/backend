import { UnitOfWorkFactory } from "./dbcontext/unitofworkfactory";
import { MoodRepository } from "./repository/moodrepository";
import { moods } from './models/mood';
import { Activity } from './models/activity';
import bodyParser from 'body-parser';

import express from 'express';
import { Activityrepository } from "./repository/activityrepository";
const unitofWork = new UnitOfWorkFactory();
let moodrepo,activityrepo = undefined;


unitofWork.create((res) => {
    moodrepo = new MoodRepository(res);
    activityrepo = new Activityrepository(res);
})

const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.route('/mood')
    .get((req, res) => {
        moodrepo.findAll(result => {
            res.json(result);
        });
    })
    .post((req, res) => {
        let body = req.body;
        let mood = new moods(body.id,body.time,body.date,body.mood);
        moodrepo.Add(mood,result=>{
            res.json(result);
        });
    })
    .put((req, res) => {
        let body = req.body;
        let mood = new moods(body.id,body.time,body.date,body.mood);
        moodrepo.Update(mood,result=>{
            res.json(result);
        });
    })
    .delete((req, res) => {
        let body = req.body;
        let mood = new moods(req.query.id,body.time,body.date,body.mood);
        moodrepo.Remove(mood,result=>{
            res.json(result);
        });
    })

app.route('/activity')
    .get((req,res)=>{
        if(req.query.id){
            activityrepo.findById(req.query.id,results=>{
                res.json(results);
            });
        }else{
            activityrepo.findAll(result=>{
                res.json(result);
            })
        }
    })
    .post((req,res)=>{
        let body = req.body;
        let activity = new Activity(body.id,body.time,body.date,body.activity);
        activityrepo.Add(activity,results=>{
            res.json(results);
        })
    })
    .put((req,res)=>{
        let body = req.body;
        let activity = new Activity(body.id,body.time,body.date,body.activity);
        activityrepo.Update(activity,results=>{
            res.json(results);
        })
    })
    .delete((req,res)=>{
        let body = req.body;
        console.log(req.query.id);
        let activity = new Activity(req.query.id,body.time,body.date,body.activity);
        activityrepo.Remove(activity,results=>{
            res.json(results);
        })
    })

app.get('/mood/:id',(req,res)=>{
    moodrepo.findById(req.params.id,results=>{
        res.json(results);
    });
})

app.listen(8052, () => {
    console.log('server started listening at port');
})