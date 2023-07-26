import React from "react";
import style from "./Home.module.css"
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, getByName, FilterByTemperament, FilterByWeight, FilterByHeight, FilterByOrigin, FilterByName } from "../../redux/actions/actions";
import Card from "../../components/Card/Card.jsx";
import Pagination from '../../components/Pagination/Pagination.jsx';
import SearchBar from "../../components/SearchBar/SearchBar.jsx";

const Home = () => {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const tempState = useSelector((state) => state.temperaments);

    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(8);

    const lastDogIndex = currentPage * dogsPerPage;
    const firstDogIndex = lastDogIndex - dogsPerPage;
    const currentDogs = allDogs.slice(firstDogIndex, lastDogIndex);
    
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const resetPagination = () => {
        setCurrentPage(1);
    };

    const handleClick = (event) => {
        event.preventDefault();
        resetPagination();
        
        dispatch(getDogs());
        window.location.reload()
    };
    
    const handleFilterByTemperament = (event) => {
        event.preventDefault();
        resetPagination();
        dispatch(FilterByTemperament(event.target.value));
    };
    
    
    useEffect (()=>{
        dispatch(getDogs());
        dispatch(getTemperaments());
    },[dispatch])
//


    const handleFilterByWeight = (event) => {
        event.preventDefault();
        resetPagination();
        dispatch(FilterByWeight(event.target.value));
    };
    
    const handleFilterByHeight = (event) => {
        event.preventDefault();
        resetPagination();
        dispatch(FilterByHeight(event.target.value));
    };
    
    const handleFilteredByOrigin = (event) => {
        event.preventDefault();
        resetPagination();
        dispatch(FilterByOrigin(event.target.value));
    };
    
    const handleFilterByName = (event) => {
        event.preventDefault();
        resetPagination();
        dispatch(FilterByName(event.target.value));
    };
    
    const handleSearch = (search) => {
        resetPagination();
        dispatch(getByName(search));
    };


    return (
        <div className={style.maincontainer}>
            <div className={style.prevFilter}>
                    <button className={style.reloadButton} onClick={(event) => handleClick(event)}>
                        Recargar Patitas
                    </button>
                    <div className={style.SearchBar}>
                        <SearchBar onSearch={handleSearch} />
                    </div>
            </div>
            

            <div className={style.filterContainer}>
                <div className={style.filterOption}>
                    <h3 className={style.filterTitle1}>Ordenar:</h3>
                    <div className={style.selectContainer}>
                        <label className={style.filterLabel}>Alfabéticamente:</label>
                        <select className={style.filterSelect} onChange={(event) => handleFilterByName(event)}>
                            <option value="">Seleccionar</option>
                            <option value="Asc">Ascendente</option>
                            <option value="Dec">Descendente</option>
                        </select>
                    </div>
                    <div className={style.selectContainer}>
                        <label className={style.filterLabel}>Peso:</label>
                        <select className={style.filterSelect} onChange={(event) => handleFilterByWeight(event)}>
                            <option value="">Seleccionar</option>
                            <option value="max">Peso Max-Min</option>
                            <option value="min">Peso Min-Max</option>
                        </select>
                    </div>
                    <div className={style.selectContainer}>
                        <label className={style.filterLabel}>Altura:</label>
                        <select className={style.filterSelect} onChange={(event) => handleFilterByHeight(event)}>
                            <option value="">Seleccionar</option>
                            <option value="max">Max-Min</option>
                            <option value="min">Min-Max</option>
                        </select>
                    </div>
                </div>
                <div className={style.filterOption}>
                    <h3 className={style.filterTitle1}>Filtrar:</h3>
                    <div className={style.selectContainer}>
                        <label className={style.filterLabel}>Origen:</label>
                        <select className={style.filterSelect} onChange={(event) => handleFilteredByOrigin(event)}>
                            <option value="">Seleccionar</option>
                            <option value="all">Todos</option>
                            <option value="api">API</option>
                            <option value="created">Creado</option>
                        </select>
                    </div>
                    <div className={style.selectContainer}>
                        <label className={style.filterLabel}>Temperamento:</label>
                        <select className={style.filterSelect} onChange={(event) => handleFilterByTemperament(event)}>
                            <option value="">Seleccionar</option>
                            <option value="All">Todos los temperamentos</option>
                            {tempState?.sort().map((temp) => (
                                <option key={temp} value={temp.id}>
                                    {temp.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>



            <div className={style.titleContainer}>
                <h1 className={style.title}>Descubre a los Perros Contigo</h1>
            </div>
            {/* <button className={style.reloadButton} onClick={(event) => handleClick(event)}>
                Recargar Patitas
            </button> */}


            <div className={style.cardContainer}>
            {currentDogs?.map((dog) => (
            <Card
                key={dog.id}
                id={dog.id}
                name={dog.name}
                image={dog.image}
                weight={dog.weight}
                height={dog.height}
                temperaments={dog.temperaments}
                temperament={dog.temperament}
                createInDb={dog.createInDb}
            />
            ))}
            </div>
            <Pagination
                dogs={allDogs.length}
                dogsPerPage={dogsPerPage}
                currentPage={currentPage}
                pagination={pagination}
            />
        </div>
    )
}

export default Home;