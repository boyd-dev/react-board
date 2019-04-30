const Models = require('../../models');
const {ResSuccess, ResError} = require('../utils');

list = async (ctx) => {

    let result = {data: [], count: 0};

    //페이징을 위한 정보를 받는다.
    let {limit, pageNo} = ctx.query;
    let offset = 0;

    if (limit === undefined || pageNo === undefined) {
        limit = 10; //default
    } else {
        offset = (parseInt(pageNo)-1)*parseInt(limit);
    }

    try {
        //const list = await Models.Board.findAll({limit: 10, offset: 0, order: [['cnttId', 'DESC']]});
        const list = await Models.Board.findAll({limit: parseInt(limit), offset, order: [['cnttId', 'DESC']]});
        list.forEach((b) => {
            result.data.push(b.dataValues);
        });

        const totalCount = await Models.Board.count();
        //const listCount = await Models.Board.findAll({attributes: [[Models.sequelize.fn('COUNT', Models.sequelize.col('CNTT_ID')), 'totalCount']]});
        result.count = totalCount;

        ctx.body = ResSuccess(result);

    } catch (err) {
        ctx.body = ResError(err);
        ctx.app.emit('error', err, ctx);
    }
}

read = async (ctx) => {

    const cnttId = ctx.params.id;
    let result = {data: [], count: 0};

    try {
        const list = await Models.Board.findAll({where: {cnttId}});

        if (list.length === 0) {
            ctx.body = ResSuccess({result});
            return;
        }

        list.forEach(async (b) => {
            result.data.push(b.dataValues);
            await Models.Board.update({cnttHit: parseInt(b.dataValues.cnttHit) + 1}, {where: {cnttId}});
        });

        result.count = list.length; //always 1

        ctx.body = ResSuccess(result);

    } catch (err) {
        ctx.body = ResError(err);
        ctx.app.emit('error', err, ctx);
    }

}


write = async (ctx) => {

    const {cnttTitle, cnttPost, authorId, did} = ctx.request.body;

    const post = {
        boardId : 'BOARD_0001',
        cnttTitle: cnttTitle,
        cnttPost: cnttPost,
        authorId: authorId,
        did: did,
        instId: authorId,
        updtId: authorId
    }

    //managed transaction, not explicitly commit/rollback
    try {

        const result = await Models.sequelize.transaction(async (tx) => {

            return await Models.Board.create(post, {transaction: tx}); //just one insert

        });

        //저장 후 목록 이동할 때 리턴을 넘기면 배열이 아니므로 오류가 발생한다.
        //따라서 그냥 성공 플래그만 리턴하기로 한다.
        //ctx.body = ResSuccess(result.dataValues);
        ctx.body = ResSuccess();

    } catch (err) {
        ctx.body = ResError(err);
        ctx.app.emit('error', err, ctx);
    }

}



remove = async (ctx) => {

    const cnttId = ctx.params.id;
    const {did} = ctx.query;

    //managed transaction, not explicitly commit/rollback
    try {

        const result = await Models.sequelize.transaction(async (tx) => {

            return await Models.Board.destroy({where: {cnttId, did}}, {transaction: tx});

        });

        if (result > 0) {
            ctx.body = ResSuccess(); //건수가 리턴되지만 그냥 플래그만 전달하기로 한다.

        } else {
            //TODO error handling
            throw new Error("You can't delete this post.");
        }

    } catch (err) {
        ctx.body = ResError(err);
        ctx.app.emit('error', err, ctx);
    }
}


update = async (ctx) => {

    const cnttId = ctx.params.id;
    const {cnttTitle, cnttPost, authorId, did} = ctx.request.body;

    const updtId = authorId;
    const updtTm = new Date().toISOString().slice(0, 19).replace('T', ' ');

    //managed transaction, not explicitly commit/rollback
    try {

        const result = await Models.sequelize.transaction(async (tx) => {

            return await Models.Board.update({cnttTitle, cnttPost, updtId, updtTm}, {where: {cnttId, did}}, {transaction: tx});

        });

        ctx.body = ResSuccess(); //건수가 리턴되지만 그냥 플래그만 전달하기로 한다.

    } catch (err) {
        ctx.body = ResError(err);
        ctx.app.emit('error', err, ctx);
    }
}


module.exports = {
    list,
    read,
    write,
    remove,
    update
}