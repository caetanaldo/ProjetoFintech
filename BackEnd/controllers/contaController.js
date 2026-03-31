import { createConta } from "../services/contaService.js";
import Conta from "../models/Conta.js";

const contaController = {

    async create(req, res) {
        try {
            const { name, email, password } = req.body;

            const result = await createConta({ name, email, password });

            res.status(201).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getAll(req, res) {
        try {
            const contas = await Conta.findAll();
            res.json(contas);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        try {
            const conta = await Conta.findByPk(req.params.id);

            if (!conta) {
                return res.status(404).json({ error: "Conta não encontrada" });
            }

            res.json(conta);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    
    async getBalance(req, res) {
        try {
            const conta = await Conta.findByPk(req.params.id);
    
            if (!conta) {
                return res.status(404).json({ error: "Conta não encontrada" });
            }
    
            res.json({ balance: conta.balance });
    
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const conta = await Conta.findByPk(req.params.id);

            if (!conta) {
                return res.status(404).json({ error: "Conta não encontrada" });
            }

            await conta.update(req.body);

            res.json(conta);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            const conta = await Conta.findByPk(req.params.id);

            if (!conta) {
                return res.status(404).json({ error: "Conta não encontrada" });
            }

            await conta.destroy();

            res.json({ message: "Conta deletada com sucesso" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async list(req, res) {
        try {
            const contas = await Conta.findAll({
                include: "User" // se tiver relacionamento
            });

            res.json(contas);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

export default contaController;