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
    // const dog = 
    //     source === "api"
    //         ? (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`))
    //             .data
    //         : await Dog.findByPk(id);
    // return dog;
    let dog;
    if (source === "api") {
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`);
        const { name, height, weight, life_span, temperament } = response.data;
        const heightMetric = height.metric;
        const weightMetric = weight.metric;
        dog = { name, height: heightMetric, weight: weightMetric, life_span, temperament, createInDb: false };
    } else {
        dog = await Dog.findByPk(id, { include: Temperament});
        // const dogFromDb = await Dog.findByPk(id);
        // dog = {
        //   name: dogFromDb.name,
        //   height: dogFromDb.height.height.metric,
        //   weight: dogFromDb.weight.weight.metric,
        //   life_span: dogFromDb.life_span,
        //   image: dogFromDb.image,
        //   temperament: dogFromDb.temperament,
        //   createInDb: true
        // };
    }
    return dog;
};

const getDogsByName = async (name) => {
    const allDogs = await getAllDogs();
    const dbDogs = await getDbDogs();
    return [...allDogs, ...dbDogs].filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
};

// const postDogs = async (name, height, weight, life_span, image, temperament, createInDb) => {
//     const dbResponse = await Dog.findAll({
//         where: {
//             name: {
//                 [Op.iLike]: `%${name}%`,
//             },
//         },
//     });
//     console.log(dbResponse);
//     if (dbResponse.length) throw new Error("Ya existe un perro con ese nombre");

//     const newDog = await Dog.create({
//         name: name,
//         height: height,
//         weight: weight,
//         life_span: life_span,
//         image: image,
//         createInDb: true,
//     });

//     const temperamentCount = await Temperament.count();
//     if (temperamentCount === 0) {
//         await getAllTemperaments();
//     }

//     const temperamentsFound = [];
//     for (let i = 0; i < temperament.length; i++) {
//         const temperamentFound = await Temperament.findOne({ where: { name: temperament[i]}});
//         if (!temperamentFound) {
//             throw new Error(`Tipo de ${temperament[i]} no existe`);
//         }
//         temperamentsFound.push(temperamentFound);
//     }
//     await newDog.setTemperament(temperamentsFound);
//     return newDog;
// };
////////////////////////////////////////////

// const postDogs = async (name, height, weight, life_span, image, temperament, createInDb = true) => {
//     const dbResponse = await Dog.findAll({
//         where: {
//             name: {
//                 [Op.iLike]: `%${name}%`,
//             },
//         },
//     });

//     if (dbResponse.length) {
//         throw new Error("Ya existe un perro con ese nombre");
//     }

//     const newDog = await Dog.create({
//         name: name,
//         height: height,
//         weight: weight,
//         life_span: life_span,
//         image: image,
//         createInDb: true, // Establecer createInDb directamente a true.
//     });

//     const temperamentCount = await Temperament.count();
//     if (temperamentCount === 0) {
//         // Asumiendo que getAllTemperaments es una función definida en db.js.
//         await getAllTemperaments();
//     }

//     const temperamentsFound = [];
//     for (let i = 0; i < temperament.length; i++) {
//         const temperamentFound = await Temperament.findOne({ where: { name: temperament[i] }});
//         if (!temperamentFound) {
//             throw new Error(`Tipo de ${temperament[i]} no existe`);
//         }
//         temperamentsFound.push(temperamentFound);
//     }

//     // Ahora, para establecer los temperamentos asociados con el nuevo perro:
//     await newDog.setTemperaments(temperamentsFound);

//     return newDog;
// };

const postDogs = async (name, height, weight, life_span, image, temperament, createInDb = true) => {
    const dbResponse = await Dog.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`,
            },
        },
    });

    if (dbResponse.length) {
        throw new Error("Ya existe un perro con ese nombre");
    }

    // Crear el nuevo perro en la base de datos
    const newDog = await Dog.create({
        name,
        height,
        weight,
        life_span,
        image,
        createInDb, // Establecer createInDb directamente a true o false según corresponda.
        temperament,
    });

    // Verificar si existen temperamentos seleccionados desde el front-end
    if (temperament && temperament.length > 0) {
        // Buscar todos los temperamentos en una sola consulta
        const temperamentsFound = await Temperament.findAll({
            where: {
                name: temperament, // Buscar por nombres de temperamentos que coincidan con los seleccionados
            },
        });

        // Verificar si todos los temperamentos seleccionados existen en la base de datos
        if (temperamentsFound.length !== temperament.length) {
            throw new Error("Alguno de los temperamentos seleccionados no existe");
        }

        // Establecer los temperamentos asociados con el nuevo perro
        await newDog.setTemperaments(temperamentsFound);
    }

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