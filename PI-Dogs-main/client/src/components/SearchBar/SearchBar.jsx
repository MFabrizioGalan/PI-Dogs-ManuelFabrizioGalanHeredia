import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getByName } from "../../redux/actions/actions";
import style from "../../components/SearchBar/SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [error, setError] = useState("");
  
  const handleOnChange = (event) => {
    setSearchName(event.target.value);
    setError("");
  };
  
  const handleSearch = async () => {
  const search = searchName.trim().toLowerCase();
  if (!search) {
    setError("*Por favor ingrese un nombre");
    return;
  } else if (!search.match(/^[a-zA-Z\s]+$/)) {
    setError("*Por favor ingrese valores alfabéticos");
    return;
  }
  
  dispatch(getByName(search))
    .then(() => {
      onSearch(search);
      setSearchName("");
    })
    .catch(() => {
      setError("*Ha ocurrido un error en la búsqueda");
    });
  };
  
  return (
    <div className={style.SearchBarContainer}>
      {error && <p className={style.Error}>{error}</p>} 
      {/* <br/> */}
      <input className={style.SearchInput} type="text" value={searchName} onChange={handleOnChange} placeholder="¿Quieres saber más sobre razas de perros?"/>
      <button className={style.SearchButton} onClick={handleSearch} disabled={!searchName}>
        Rastrear
      </button>
      {/* {error && <p className={style.Error}>{error}</p>} */}
    </div>
  );
};
  
export default SearchBar;