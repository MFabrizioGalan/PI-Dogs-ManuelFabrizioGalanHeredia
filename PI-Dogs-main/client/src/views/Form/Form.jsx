import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../../redux/actions/actions";
import styles from "./Form.module.css";
import { validate } from "../../components/validate";
import { useEffect, useState } from "react";

const Form = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
      //? Estado local para todos los inputs
      id: "",
      name: "",
      height: "",
      weight: "",
      life_span: "",
      image: "",
      createInDb: "",
      temperament: [],
      temperaments: [], //? Acá se guardan los temperamentos filtrados para el select
    });
  
    useEffect(() => {
      dispatch(getTemperaments());
    }, [dispatch]);
  
    const temperaments = useSelector((state) => state.temperaments);
    const [selectedTemps, setSelectedTemps] = useState([]);
    const [errors, setErrors] = useState({});
    const [filter] = useState("");
  //   const filteredTemps = temperaments?.filter((temp) =>
  //     temp.toLowerCase().includes(filter.toLowerCase())
  //   );
    const handleChange = (event) => {
      //? Manejo del input
      const { name, value } = event.target;
      const error = validate(name, value);
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
      setErrors((prevErrors) => ({
        //? Manejo de errores
        ...prevErrors,
        [name]: error,
      }));
    };
   
    // const handleSelect = (event) => {
    //   //? Selección de temperamentos para que se mantengan los seleccionados
    //   const selectedTemperament = event.target.value;
    //   setInput((prevInput) => ({
    //     ...prevInput,
    //     temperament: [...prevInput.temperament, selectedTemperament],
    //     temperaments: Array.isArray(prevInput.temperaments)
    //       ? [...prevInput.temperaments, selectedTemperament]
    //       : [selectedTemperament],
    //   }));
    //   setSelectedTemps((prevSelectedTemperaments) => [
    //     ...prevSelectedTemperaments,
    //     selectedTemperament,
    //   ]);
    // };
    const handleSelect = async (event) => {
      event.preventDefault();

      const selectedTemperament = event.target.value;
      const { temperaments } = input;
    
      // Verificar si el temperamento seleccionado ya está en la lista de temperamentos mostrados
      const isDuplicate = temperaments.some((temp) => temp === selectedTemperament);
      if (!isDuplicate) {
        try {
          await setInput((prevInput) => ({
            ...prevInput,
            temperaments: [...prevInput.temperaments, selectedTemperament],
          }));
      
          setSelectedTemps((prevSelectedTemperaments) => [
            ...prevSelectedTemperaments,
            selectedTemperament,
          ]);
        } catch (error) {
          console.error("Error al actualizar el estado:", error);
        }
        
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const validationErrors = validate(input);
  
      if (Object.keys(validationErrors).length === 0) {
        dispatch(postDog(input));
        setInput({
          id: "",
          name: "",
          height: "",
          weight: "",
          life_span: "",
          image: "",
          createInDb: "",
          temperament: [],
          temperaments: [],
        });
      }
    };
  
    const handleRemove = (temperament) => {
      setSelectedTemps((prevSelectedTemps) =>
        prevSelectedTemps.filter((temp) => temp !== temperament)
      );
    };
  
    return (
      <div className={styles.container}>
        {/* <div className={styles.backgroundImage}></div> */}
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <h1 className={styles.title}>¡Crea tu propia raza!</h1>
              <div className={styles.field}>
                <label className={styles.label}>Raza:</label>
                <input
                  type="text"
                  value={input.name}
                  name="name"
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Nombre de la raza"
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Altura:</label>
                <input
                  type="text"
                  value={input.height}
                  name="height"
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Altura min - altura max  (ejm: 30 - 120)"
                />
                {errors.height && <p className={styles.error}>{errors.height}</p>}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Peso:</label>
                <input
                  type="text"
                  value={input.weight}
                  name="weight"
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Peso min - peso max  (ejm: 5 - 80)"
                />
                {errors.weight && <p className={styles.error}>{errors.weight}</p>}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Esperanza de vida:</label>
                <input
                  type="text"
                  value={input.life_span}
                  name="life_span"
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Min - max  (ejm: 8 - 20)"
                />
                {errors.life_span && <p className={styles.error}>{errors.life_span}</p>}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Imagen URL:</label>
                <input
                  type="text"
                  value={input.image}
                  name="image"
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="http://example.com"
                />
                {/* <input
                  type="file"
                  id="imageInput"
                  onChange={handleChange}
                  accept="image/*"
                  className={styles.input}
                  // placeholder="http://example.com"
                /> */}
                {errors.image && <p className={styles.error}>{errors.image}</p>}
              </div>
              <div className={styles.field}>
                <label htmlFor="temperament" className={styles.label}>
                  Temperamento:
                </label>
                {errors.temperaments && (
                  <p className={styles.error}>{errors.temperaments}</p>
                )}
                <select
                  id="temperaments"
                  onChange={handleSelect}
                  className={styles.select}
                >
                  <option value="" className={styles.a}>Seleccionar</option>
                  {temperaments?.sort().map((temp) => (
                    <option key={temp.id} value={temp.id}>
                      {temp.name}
                    </option>
                  ))}
                </select>
                <div className={styles.selectedTemps}>
                  {selectedTemps?.sort().map((temp) => (
                    <div key={temp?.id} className={styles.selectedTemp}>
                      <span>{
                        temperaments.find(temperament => temperament.id == temp).name
                        }</span>
                      <button
                        type="button"
                        onClick={() => handleRemove(temp)}
                        className={styles.removeButton}
                      >
                        
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <button type="submit" className={styles.createButton}>
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};
  
export default Form;