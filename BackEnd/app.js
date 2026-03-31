import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connect } from "./database/sqlConnection.js";
import contasRouter from "./routes/contaRoutes.js";
import trasacaoRoutes from "./routes/transacaoRoutes.js";
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// rotas organizadas
app.use("/contas", contasRouter);
app.use("/transactions", trasacaoRoutes);
console.log("USER:", process.env.DBUSER);
console.log("PASS:", process.env.DBPASSWORD);

app.listen(PORT, async () => {
    await connect();
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
