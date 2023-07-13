const axios = require('axios');
const { API_KEY } = process.env;
const { Temperament } = require('../db');

const getAllTemperaments = async () => {
    const tempsData = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    tempsData.data.forEach(dog => {
        if (dog.temperament) {
            let temps = dog. temperament.split(', ')
            temps.forEach(dogTemp => {
                Temperament.findOrCreate({
                    where: {name: dogTemp}
                })
            })
        }
    })
    const temperamentsFound = await Temperament.findAll()
    return temperamentsFound
};

const createTemperament = async(name) => await Temperament.create({ name, created: true });

const deleteTemperamentById = async( id ) => {
    if (!id) {
        throw new Error ('El temperamento no existe');
    } else if (typeof id === 'number') {
        throw new Error ('No puedes borrar este temperamento');
    }

    const foundTemperament = await Temperament.findByPk(id);

    if (!foundTemperament) {
        throw new Error ('El temperamento no existe');
    }

    await foundTemperament.destroy ({
        where: { id: id}
    });

    return foundTemperament;
};

module.exports = {
    getAllTemperaments,
    createTemperament,
    deleteTemperamentById,
}