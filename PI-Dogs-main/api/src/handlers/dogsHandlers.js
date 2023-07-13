const { getAllDogs, getDogsById, getDogsByName, postDogs, deleteDog } = require('../controllers/dogsController');

const getDogsHandler = async (req, res) => {
    const { name } = req.query;
    const results = name ? await getDogsByName (name) : await getAllDogs()
    res.status(200).json(results);
};

const getDogHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bd" : "api";
    try {
        const dog = await getDogsById(id, source);
        res.status(200).json(dog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createDogHandler = async (req, res) => {
    const { name, height, weight, life_span, image, temperament, createInDb } = req.body;
    try {
        if (!name || !height || !weight || !life_span || !image || !temperament){
            throw Error("Falta información para crear el perro");
        } else {
            const newDog = await postDogs (name, height, weight, life_span, image, temperament, createInDb );
            res.status(201).json(newDog);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteDogHandler = async (req, res) => {
    const {id} = req.params;
    const source = isNaN(id) ? "bd" : "api";
    try {
        const borrarDog = await deleteDog(id, source);
        return res.status(200).json(`El perro ${borrarDog.name} se ha eliminado`);
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

module.exports = {
    getDogsHandler,
    getDogHandler,
    createDogHandler,
    deleteDogHandler,
}