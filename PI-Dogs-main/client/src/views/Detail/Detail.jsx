import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getById, deleteDogId } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./Detail.module.css";

const Detail = ({ name, weight, height, image, life_span, temperaments, temperament, createInDb}) => {
  // const dispatch = useDispatch();
  // let dog = useSelector((state) => state.details);
  // const [ setDogId] = useState();
  // const { id } = useParams();
  // useEffect(() => {
  //   dispatch(getById(id));
  //   setDogId({});
  //   return dispatch(deleteDogId());
  // }, [dispatch, id]);

  const dispatch = useDispatch();
  let dog = useSelector((state) => state.details);
  // const [dogId, setDogId] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
    dispatch(getById(id));
    // setDogId({}); 
    return () => dispatch(deleteDogId()); 
  }, [dispatch, id]);

  return (
    <div className={style.detailAll}>
      <div className={style.contentContainer}>
        <h1 className={style.titleName}>{name}</h1>
        <div className={style.imageContainer}>
          <img className={style.image} src={image} alt={name} />
        </div>
        <p className={style.temperaments}>
          {/* Temperamento: {dog.temperament ? dog.temperament.join(", ") : ""} */}
          Temperamento: {Array.isArray(dog.temperament) ? dog.temperament.join(", ") : ""}
        </p>
        <p className={style.info}>Esperanza de vida: {life_span} years</p>
        <p className={style.info}>Altura: {height} cm</p>
        <p className={style.info}>Peso: {weight} kg</p>
      </div>
    </div>
  );
};

export default Detail;