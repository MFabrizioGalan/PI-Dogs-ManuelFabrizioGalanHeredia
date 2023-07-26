import { GET_BY_ID, GET_BY_NAME, GET_DOGS, GET_TEMPERAMENTS, POST_DOG, FILTER_BY_TEMPERAMENT, FILTER_BY_WEIGHT, FILTER_BY_HEIGHT, FILTER_BY_ORIGIN, FILTER_BY_NAME, DELETE_DOG, DELETE_DOG_ID } from '../actions/actions-types.js'

const initialState = {
    dogs: [],
    dogsCopy: [],
    temperaments: [],
    details: [],
    error: null,
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: payload,
                dogsCopy: payload,
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: payload,
            }
        case GET_BY_NAME:
            return {
                ...state,
                dogs: payload,
            }
        case GET_BY_ID:
            return {
                ...state,
                details: payload,
            };
            
        case POST_DOG:
            return {
                ...state,
                dogs: [...state.dogs, payload],
            }
        case FILTER_BY_TEMPERAMENT:
            const allDogs = state.dogsCopy 
            const temperaments = state.temperaments
            const filterDog = (payload === "All" || payload === "") ?
                allDogs :
                allDogs.filter(dog => dog.temperament?.includes(temperaments.find(temperament => temperament.id == payload).name)); 
            const filterDb = []; 
            allDogs.forEach(dog => { 
                if (typeof dog.id === "string") {
                    dog.temperament?.forEach(tempDb => {
                        if (tempDb === payload) filterDb.push(tempDb) 
                    })
                }
            })
            return {
                ...state,
                dogs: filterDog.concat(filterDb), 
                error: null,
            }
        case FILTER_BY_WEIGHT:
            const sortedDogsByWeight = [...state.dogs]; 
            const weightAscendingOrder = payload === "min"; 

            sortedDogsByWeight.sort((first, second) => {  
                const parseWeight = weight => {
                    const parts = weight.split(" - ");
                    const average = parts.reduce((sum, part) => sum + parseInt(part), 0) 
                    return isNaN(average) ? Infinity : average;
                };
                const weightFirst = parseWeight(first.weight);  
                const weightSecond = parseWeight(second.weight); 

                if (weightAscendingOrder) { 
                    return weightFirst - weightSecond;
                } else {
                    return weightSecond - weightFirst; 
                }
            });
            return {
                ...state,
                dogs: sortedDogsByWeight,
                error: null,
            }
        case FILTER_BY_HEIGHT:
            const sortedDogsByHeight = [...state.dogs];
            const heightAscendingOrder = payload === "min";

            sortedDogsByHeight.sort((first, second) => {
                const parseHeight = height => {
                    const parts = height.split(" - ");
                    const average = parts.reduce((sum, part) => sum + parseInt(part), 0) / parts.length;
                    return isNaN(average) ? -1 : average;
                };
                const heightFirst = parseHeight(first.height);
                const heightSecond = parseHeight(second.height);

                if (heightAscendingOrder) {
                    return heightFirst - heightSecond;
                } else {
                    return heightSecond - heightFirst;
                }
            });
            return {
                ...state,
                dogs: sortedDogsByHeight,
                error: null,
            };
        case FILTER_BY_ORIGIN:
            const originDogs = state.dogsCopy;
            let filterDogs = [];
            if(payload === "all" || payload === ""){
                filterDogs = originDogs
            }else {
                filterDogs = originDogs.filter((dog) => payload === 'created' ? dog.createInDb : !dog.createInDb)
            }
            return {
                ...state,
                dogs: filterDogs,
            }
        case FILTER_BY_NAME:
            const sortedDogs = [...state.dogs];
            const sortOrder = payload === 'Asc' ? 1 : -1;
            sortedDogs.sort((dogA, dogB) => {
                if (dogA.name > dogB.name) {
                    return 1 * sortOrder;
                }
                if (dogB.name > dogA.name) {
                    return -1 * sortOrder;
                }
                return 0;
            });
            return {
                ...state,
                dogs: sortedDogs,
            };
        case DELETE_DOG:
            const copyOfDogs = state.dogsCopy.filter((dog) => dog.id !== payload)
            return {
                ...state,
                dogs: copyOfDogs,
                dogsCopy: copyOfDogs,
            }
        case DELETE_DOG_ID:
            return {
                ...state,
                details: [],
            }
        default:
            return { ...state }
    }
}

export default reducer;