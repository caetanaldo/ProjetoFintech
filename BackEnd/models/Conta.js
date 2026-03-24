import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";
import User from "./User.js";

const Conta = sequelize.define("Conta", {
    ContaNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    balance: {
        type: DataTypes.DECIMAL(15,2),
        defaultValue: 0.00
    }
});

// relacionamento
User.hasMany(Conta, { foreignKey: "userId" });
Conta.belongsTo(User, { foreignKey: "userId" });

export default Conta;