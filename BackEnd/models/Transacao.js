import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";
import Account from "./Account.js";

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
Account.hasMany(Transacao, { foreignKey: "accountId" });
Transacao.belongsTo(Account, { foreignKey: "accountId" });

export default Transacao;