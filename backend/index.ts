import "reflect-metadata";
import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from  "body-parser";
import {createConnection} from "typeorm";
import * as UserControl from "./src/controllers/userControl";
import * as CommonControl from "./src/controllers/commonControl";

createConnection().then(async connection => {
    const cookieParser = require('cookie-parser')
    // create and setup express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(function(req,res,next){
        res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
        res.header('Content-Type', 'application/json;charset=UTF-8')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
        next();
    })

//  <================COMMON ACCESS API====================>
    app.get("/",async function(req: Request, res: Response) {
        return  await CommonControl.BasicContent(req,res);
    })

    app.post("/register",async function(req: Request, res: Response) {
       return  await CommonControl.Register(req,res);
    })

    app.post("/login", async function(req: Request, res: Response) {
        return await CommonControl.Login(req,res);
    })

    app.get("/guitars",async function(req:Request , res: Response) {
        return await CommonControl.Guitars(req, res);
    })

    app.get("/guitar/:id",async function(req:Request , res: Response) {
        return await CommonControl.GuitarSpecific(req, res);
    })

//  <================USER API====================>
    app.post("/profile", async function(req:Request , res: Response) {
        return await UserControl.Profile(req, res);
    })
  
    app.post("/profile/offers", async function(req:Request , res: Response) {
        return await UserControl.Offers(req, res);
    })

    app.post("/profile/offer/add", async function(req:Request , res: Response) {
        return await UserControl.OfferAdd(req, res);
    })

    app.post("/profile/offer/template", async function(req:Request , res: Response) {
        return await UserControl.OfferTemplate(req, res);
    })

    app.post("/profile/offer/remove/:id", async function(req:Request , res: Response) {
        return await UserControl.OfferRemove(req, res);
    })
    
    app.post("/profile/offer/edit/:id", async function(req:Request , res: Response) {
        return await UserControl.OfferUpdate(req, res);
    })
    
    app.post("/profile/offer/:id", async function(req:Request , res: Response) {
        return await UserControl.OfferDetails(req, res);
    })

    // start express server
    app.listen(4000);
}).catch(error => console.log(error));