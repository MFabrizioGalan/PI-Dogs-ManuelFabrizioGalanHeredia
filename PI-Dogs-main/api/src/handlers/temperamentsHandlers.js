const { getAllTemperaments, createTemperament, deleteTemperament, deleteTemperamentById } = require('../controllers/temperamentsController');

const getTemperamentsHandler = async (req, res) => {
    const temperaments = await getAllTemperaments();
    try {
        res.status(200).json(temperaments)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const createTemperamentHandler = async (req, res) => {
    const {name} = req.body;
    try {
        const newTemperament = await createTemperament (name);
        res.status(201).json(newTemperament);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTemperamentHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const borrarTemperament = await deleteTemperamentById(id);
        return res.status(200).json({
            message: `El temperamento con id ${id} ha sido eliminado`,
            deleteTemperament: borrarTemperament
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

module.exports = {
    getTemperamentsHandler,
    createTemperamentHandler,
    deleteTemperamentHandler,
}