const Router = require('koa-router');
const controller = require('./controllers/board.controller');

const api = new Router();

api.get('/', controller.list);
api.get('/:id', controller.read);
api.post('/', controller.write);
api.delete('/:id', controller.remove);
api.patch('/:id', controller.update);



module.exports = api;
