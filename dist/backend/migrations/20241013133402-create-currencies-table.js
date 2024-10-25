'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('currencies', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            text: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            symbol: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            code: {
                type: Sequelize.STRING(10),
                allowNull: false,
                unique: true
            },
            currencycode: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            rates: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            createdat: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updatedat: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('currencies');
    }
};
