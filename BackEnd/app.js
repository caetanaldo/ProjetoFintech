import express, { json } from "express";
import { connect } from "./database/sqlConnection.js";
import tasksRouter from "./routes/tasksroutes.js";
import cors from "cors"

import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(json())
app.use('/', tasksRouter)


app.listen(PORT, ()=>{
    connect();
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})