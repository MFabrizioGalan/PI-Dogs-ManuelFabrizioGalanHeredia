const { Dog, Temperament } = require('../db');

const getDbDogs = async () => {
    const dbDogs = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
        raw: true,
        nest: true,
    });

    const groupedDogs = dbDogs.reduce((dogsAccumulator, dog) => {
        const existingDog = dogsAccumulator.find(d => d.id === dog.id);
        if (existingDog) {
            existingDog.temperament.push(dog.temperaments.name);
        } else {
            dogsAccumulator.push({
                id: dog.id,
                name: dog.name,
                weight: dog.weight,
                height: dog.height,
                life_span: dog.life_span,
                image: dog.image,
                createInDb: dog.creteInDb,
                temperament: [dog.temperaments.name],
            });
        }

        return dogsAccumulator;
    }, []);

    return groupedDogs;
};

module.exports = {
    getDbDogs,
};