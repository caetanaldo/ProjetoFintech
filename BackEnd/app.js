import express, { json } from "express";
import { connect } from "./database/sqlConnection.js";
import contasRouter from "./routes/contaRoutes.js";
import cors from "cors"

import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(json())
app.use('/', contasRouter)


app.listen(PORT, ()=>{
    connect();
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})