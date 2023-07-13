const { Router } = require('express');

const { getDogsHandler, getDogHandler, createDogHandler, deleteDogHandler } = require('../handlers/dogsHandlers');



const dogsRouter = Router();

dogsRouter.get("/", getDogsHandler);
dogsRouter.get("/:id", getDogHandler);
dogsRouter.post("/", createDogHandler);
dogsRouter.delete("/delete/:id", deleteDogHandler);




module.exports = dogsRouter;