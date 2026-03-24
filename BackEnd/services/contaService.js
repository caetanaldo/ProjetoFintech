import Conta from "../models/Conta.js";
import User from "../models/User.js";

export async function createConta({ name, email, password }) {

    // 1. cria usuário
    const user = await User.create({
        name,
        email,
        password
    });

    // 2. gera número da conta (simples por enquanto)
    const ContaNumber = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. cria conta vinculada ao usuário
    const conta = await Conta.create({
        ContaNumber,
        userId: user.id
    });

    return { user, conta };
}