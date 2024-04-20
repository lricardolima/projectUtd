const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const CartCheck = sequelize.define('CartCheck', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        establishment: {
            type: DataTypes.STRING
        },
        card: {
            type: DataTypes.STRING
        },
        purchaseDate: {
            type: DataTypes.DATEONLY
        },
        installmentNumber: {
            type: DataTypes.INTEGER
        },
        installmentQuantity: {
            type: DataTypes.INTEGER
        },
        installmentValue: {
            type: DataTypes.DECIMAL(10, 2) // Decimal com 10 dígitos, sendo 2 a precisão após o ponto decimal
        },
        amountDue: {
            type: DataTypes.DECIMAL(10, 2)
        },
        totalDue: {
            type: DataTypes.DECIMAL(15, 2)
        },
        lastInstallmentDate: {
            type: DataTypes.DATEONLY
        }
    })

    return CartCheck
}
