// Imports
// @ts-ignore
import express, {Express, response} from "express";
import mongoose from "mongoose";
// @ts-ignore
import cors from "cors";
import "dotenv/config";
import Task from "./Models/task";

//Main Variables
const server: Express = express();
const port: Number = 3000;
const {MONGO_URI} = process.env;

//Middleware
server.use(express.urlencoded({extended: true }));
server.use(express.json());
server.use(cors());

//Connection
if (!MONGO_URI) {
    throw new Error("MongoDB URI is missing or null");
}

mongoose.connect(MONGO_URI).then(() => {
    server.listen(port, () => {
    console.log(`Connected to DB \nServer is running on port: ${port}`)
    });
}).catch((error) => {console.log(error)});

//Routes
//Index Route (/)
server.get("/", (request, response) => {
    response.send("Server is live!");
})

//API Data route
server.get("/data", async (request,response) => {
    try {
        const data = await Task.find();
        response.status(200).send(data);
    } catch (error) {
        console.log(error)
        response.status(500).send(error)
    }
})

server.post("/data", async (request, response) => {
    const {id, title, checked} = request.body;
    const newTask = new Task({
        id, title, checked,
    })

    try {
        await newTask.save();
        response.status(201).send("Task has been saved");
    } catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
})

server.delete("/data/:id", async (request, response) => {
    const {id} = request.params;
    try {
        await Task.findOneAndDelete({ id });
        response.status(201).send(`Task with id: ${id} has been deleted`);
    } catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
})