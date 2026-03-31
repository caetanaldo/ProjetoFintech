import express from "express";
import {deposit,  withdraw, transfer,getStatement} from "../controllers/transacaoController.js";

const router = express.Router();

//deposito
router.post("/deposit", deposit);

//saque
router.post("/withdraw", withdraw);

//tranferencia 
router.post ("/transfer", transfer);

//extrato
router.get("/:contaId/statement", getStatement);

export default router;

