const { Dog, Temperament } = require('../db.js');
const { Op } = require('sequelize');
const { getApiDogs } = require('./getApiDogs');
const { getDbDogs } = require('./getDbDogs');
const { getAllTemperaments} = require('./temperamentsController.js');
const axios = require('axios');


const getAllDogs = async () => {
    const apiDogs = await getApiDogs();
    let dbDogs = await getDbDogs();
    const allDogs = apiDogs.concat(dbDogs);
    return allDogs;
};

const getDogsById = async (id, source) => {
    const dog = 
        source === "api"
            ? (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`))
                .data
            : await Dog.findByPk(id);
    return dog;
};

const getDogsByName = async (name) => {
    const allDogs = await getAllDogs();
    const dbDogs = await getDbDogs();
    return [...allDogs, ...dbDogs].filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
};

const postDogs = async (name, height, weight, age, image, temperament, creatInDb) => {
    const dbResponse = await Dog.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`,
            },
        },
    });
    console.log(dbResponse);
    if (dbResponse.lenght) throw new Error("Ya existe un perro con ese nombre");

    const newDog = await Dog.create({
        name: name,
        height: height,
        weight: weight,
        age: age,
        image: image,
        createInDb: true,
    });

    const temperamentCount = await Temperament.count();
    if (temperamentCount === 0) {
        await getAllTemperaments();
    }

    const temperamentsFound = [];
    for (let i = 0; i < temperament.lenght; i++) {
        const temperamentsFound = await Temperament.findOne({ where: { name: temperament[i]}});
        if (!temperamentsFound) {
            throw new Error(`Tipo de ${temperament[i]} no existe`);
        }
        temperamentsFound.push(temperamentsFound);
    }
    await newDog.addTemperament(temperamentsFound);
    return newDog;
};

const deleteDog = async (id) => {
    if (!id) {
        throw new Error(`No existe este perro`)
    } else if (typeof id === 'number') throw new Error('No puedes borrar este perro')
    const foundDog = await Dog.findByPk(id)

    foundDog.destroy({
        where: { id: id }
    })
    return foundDog;
}

module.exports = {
    getAllDogs,
    getDogsById,
    getDogsByName,
    postDogs,
    deleteDog,
    
}