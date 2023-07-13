const validateDog = (req, res, next) => {
    const { name, weight, height, life_span } = req.body;
    if (!name) return res.status(400).json({ error: "Falta name"});
    if (!weight) return res.status(400).json({ error: "Falta weight"});
    if (!height) return res.status(400).json({ error: "Falta height"});
    if (!life_span) return res.status(400).json({ error: "Falta life_span"});

    next();
};

const validateTemperament = (req, res, next) => {
    const {name} = req.body;
    if (!name) return res.status(400).json({ error: "falta name" });

    next();
};

module.exports = {
    validateDog,
    validateTemperament,
};