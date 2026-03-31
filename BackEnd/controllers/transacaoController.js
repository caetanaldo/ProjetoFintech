import Conta from "../models/Conta.js";
import Transacao from "../models/Transacao.js";

//  DEPÓSITO
export async function deposit(req, res) {
    try {
        const { accountId, amount } = req.body;

        if (!accountId || !amount) {
            return res.status(400).json({ error: "Dados obrigatórios faltando" });
        }

        if (amount <= 0) {
            return res.status(400).json({ error: "Valor inválido" });
        }

        const conta = await Conta.findByPk(accountId);

        if (!conta) {
            return res.status(404).json({ error: "Conta não encontrada" });
        }

        conta.balance = parseFloat(conta.balance) + parseFloat(amount);
        await conta.save();

        await Transacao.create({
            type: "deposit",
            amount,
            accountId
        });

        res.json({
            message: "Depósito realizado com sucesso",
            balance: conta.balance
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//  SAQUE
export async function withdraw(req, res) {
    try {
        const { accountId, amount } = req.body;

        if (!accountId || !amount) {
            return res.status(400).json({ error: "Dados obrigatórios faltando" });
        }

        const conta = await Conta.findByPk(accountId);

        if (!conta) {
            return res.status(404).json({ error: "Conta não encontrada" });
        }

        if (parseFloat(conta.balance) < amount) {
            return res.status(400).json({ error: "Saldo insuficiente" });
        }

        conta.balance = parseFloat(conta.balance) - parseFloat(amount);
        await conta.save();

        await Transacao.create({
            type: "withdraw",
            amount,
            accountId
        });

        res.json({
            message: "Saque realizado com sucesso",
            balance: conta.balance
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//  TRANSFERÊNCIA
export async function transfer(req, res) {
    try {
        const { fromId, toId, amount } = req.body;

        if (!fromId || !toId || !amount) {
            return res.status(400).json({ error: "Dados obrigatórios faltando" });
        }

        if (fromId === toId) {
            return res.status(400).json({ error: "Não é permitido transferir para a mesma conta" });
        }

        const from = await Conta.findByPk(fromId);
        const to = await Conta.findByPk(toId);

        if (!from || !to) {
            return res.status(404).json({ error: "Conta não encontrada" });
        }

        if (parseFloat(from.balance) < amount) {
            return res.status(400).json({ error: "Saldo insuficiente" });
        }

        from.balance = parseFloat(from.balance) - parseFloat(amount);
        to.balance = parseFloat(to.balance) + parseFloat(amount);

        await from.save();
        await to.save();

        await Transacao.create({
            type: "transfer",
            amount,
            accountId: fromId
        });

        await Transacao.create({
            type: "transfer",
            amount,
            accountId: toId
        });

        res.json({
            message: "Transferência realizada com sucesso"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//  EXTRATO
export async function getStatement(req, res) {
    try {
        const { contaId } = req.params;

        const transacoes = await Transacao.findAll({
            where: { accountId: contaId },
            order: [["createdAt", "DESC"]]
        });

        res.json(transacoes);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}