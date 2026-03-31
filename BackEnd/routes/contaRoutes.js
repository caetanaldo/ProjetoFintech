import express from "express";
import contaController from "../controllers/contaController.js";

const contasRouter = express.Router();

contasRouter.get("/listar", contaController.list);

contasRouter.get("/", contaController.getAll);
contasRouter.get("/:id", contaController.getById);
contasRouter.get("/:id/balance", contaController.getBalance);

contasRouter.post("/", contaController.create);
contasRouter.put("/:id", contaController.update);
contasRouter.delete("/:id", contaController.delete);

export default contasRouter;