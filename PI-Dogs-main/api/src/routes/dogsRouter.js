const { Router } = require('express');
const { validateDog } = require ('../middlewares/validate');

const { getDogsHandler, getDogHandler, createDogHandler, deleteDogHandler } = require('../handlers/dogsHandlers');

const { getAllDogs } = require('../controllers/dogsController')



const dogsRouter = Router();

dogsRouter.get("/", getDogsHandler);
dogsRouter.post("/", validateDog ,createDogHandler);
dogsRouter.delete("/delete/:id", deleteDogHandler);
// dogsRouter.get("/:id", getDogHandler);

dogsRouter.get("/:id", async (req, res) => {
    const id  = req.params.id
    const allDogs = await getAllDogs()
    try {
        if (id) {
            const dogId = await allDogs.find(dog => dog.id == (id))
            dogId ? res.status(200).send(dogId) : res.status(404).json("Dog not found");
        }
    } catch (error) {
        return res.status(404).send(error.message)
    }
});

module.exports = dogsRouter;