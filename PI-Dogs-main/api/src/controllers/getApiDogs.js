const axios = require('axios');
const { API_KEY } = process.env;

const getApiDogs = async () => {
    const getData = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const infoData = await getData.data.map(dog=>{
        return {
            id: dog.id,
            name: dog.name,
            age: dog.age,
            image: dog.image.url,
            height: dog["height"]["metric"],
            weight: dog["weight"]["metric"],
            temperament: dog.temperament?.split(",").map(temperament => temperament.trim())
        }
    })
    return infoData;
}

module.exports = {
    getApiDogs
}