import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";
import Conta from "./Conta.js";

const Transacao = sequelize.define("Transacao", {
    type: {
        type: DataTypes.ENUM("deposit", "withdraw", "transfer"),
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(15,2),
        allowNull: false
    }
});

// relacionamento
Conta.hasMany(Transacao, { foreignKey: "accountId" });
Transacao.belongsTo(Conta, { foreignKey: "accountId" });

export default Transacao;