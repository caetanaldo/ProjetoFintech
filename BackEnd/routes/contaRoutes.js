import express from "express";
import contaController from "../controllers/contaController.js";

const contasRouter = express.Router();

contasRouter.get('/listar', taskController.list)

contasRouter.get('/', taskController.getAll)
contasRouter.get('/:id', taskController.getById)

contasRouter.post('/', taskController.create)
contasRouter.put('/:id', taskController.update)
contasRouter.delete('/:id', taskController.delete)

export default contasRouter;