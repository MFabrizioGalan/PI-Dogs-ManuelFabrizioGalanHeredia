const { Dog, Temperament } = require('../db');

const getDbDogs = async () => {
    const dbDogs = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            throw: {
                attributes: [],
            },
            raw: true,
        }
    })
    const reDogs = dbDogs?.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            weight: dog.weight,
            height: dog.height,
            life_span: dog.life_span,
            image: dog.image,
            createInDb: dog.createInDb,
            temperament: dog.temperament?.map(temperament => temperament.name),
        }
    })
    return reDogs
}

module.exports = {
    getDbDogs
}

