/*import Conta from "../models/Conta.js";
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
}*/


import Conta from "../models/Conta.js";
import User from "../models/User.js";

export async function createConta ({name, email, password}){
    //validações básicas
    if(!name ||!email ||!password){
        throw new Error ("Todos os campos são obrigatórios");
    }

    //verificar se o email ja existe
    const existingUser = await User.findOne({where:{email}});
    if(existingUser) {
        throw new Error ("Email já cadastrado");
    }

    //cria usuario
    const user = await User.create({
        name,
        email,
        password
    });

    //gera numero de conta unico
    let ContaNumber;
    let exists = true;

    while(exists) {
        ContaNumber = Math.floor(100000+ Math.random()* 900000).toString();

        const contaExistente = await Conta.findOne({
            where:{ContaNumber}
        });

        exists = !!contaExistente;
    }

    //cria conta
    const conta = await Conta.create({
        ContaNumber,
        balance:0.00,
        userId:user.id
    });
    return(
        user,
        conta
    );
}