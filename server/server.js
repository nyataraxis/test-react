// server.js
const jsonServer = require('json-server');
const path = require('path');


const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
//прокидываем дефолтные значения и руты для сервера, ставим слушаться на соседний порт с yarn
server.use(middlewares);
server.use(router);
server.listen(3001, () => {
    console.log('JSON Server is running');
});
