
//mapping Board to T_BOARD
module.exports = (sequelize, DataTypes) => {

    const Board = sequelize.define('Board', {
        // column definition
        cnttId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'CNTT_ID',
            allowNull: false
        },
        boardId: {
            type: DataTypes.STRING(10),
            primaryKey: true,
            field: 'BOARD_ID',
            allowNull: false
        },
        cnttTitle: {
            type: DataTypes.STRING(1000),
            field: 'CNTT_TITLE',
            allowNull: false,
            validate: {len: {args: [1, 100], msg: "Content size exceeds 100 characters"}, notEmpty: {args: true, msg: "Empty string is not allowed"}}
        },
        cnttPost: {
            type: DataTypes.TEXT,
            field: 'CNTT_POST',
            validate: {len: {args: [1, 200], msg: "Content size exceeds 200 characters"}, notEmpty: {args: true, msg: "Empty string is not allowed"}}
        },
        cnttHit: {
            type: DataTypes.INTEGER,
            field: 'CNTT_HIT',
            defaultValue: 0
        },
        authorId: {
            type: DataTypes.STRING(160),
            field: 'AUTHOR_ID',
            allowNull: false
        },
        did: {
            type: DataTypes.STRING(51),
            field: 'DID'
        },
        instTm: {
            type: DataTypes.DATE,
            field: 'INST_TM',
            defaultValue: DataTypes.NOW
        },
        instId: {
            type: DataTypes.STRING(160),
            field: 'INST_ID'
        },
        updtTm: {
            type: DataTypes.DATE,
            field: 'UPDT_TM',
            defaultValue: DataTypes.NOW
        },
        updtId: {
            type: DataTypes.STRING(160),
            field: 'UPDT_ID'
        },

    }, {
        // options
        timestamps: false,
        tableName: 'T_BOARD'
    });

    return Board;
}
