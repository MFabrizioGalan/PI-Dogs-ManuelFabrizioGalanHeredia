const { Router } = require('express');
const { validateTemperament } = require('../middlewares/validate');

const { getTemperamentsHandler, createTemperamentHandler, deleteTemperamentHandler } = require('../handlers/temperamentsHandlers');


const temperamentsRouter = Router();

temperamentsRouter.get("/", getTemperamentsHandler);
temperamentsRouter.post("/", validateTemperament ,createTemperamentHandler);
temperamentsRouter.delete("/delete/id", deleteTemperamentHandler);

module.exports = temperamentsRouter;