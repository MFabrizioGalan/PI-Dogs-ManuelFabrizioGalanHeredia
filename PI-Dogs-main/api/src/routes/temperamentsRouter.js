const { Router } = require('express');

const { getTemperamentsHandler, createTemperamentHandler, deleteTemperamentHandler } = require('../handlers/temperamentsHandlers');


const temperamentsRouter = Router();

temperamentsRouter.get("/", getTemperamentsHandler);
temperamentsRouter.post("/", createTemperamentHandler);
temperamentsRouter.delete("/delete/id", deleteTemperamentHandler);

module.exports = temperamentsRouter;