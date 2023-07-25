import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom';
import { deleteDog } from '../../redux/actions/actions';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


const Card = ({id, name, weight, height, image, temperaments, temperament, createInDb}) => {
    const [ setDeleted ] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const dispatch = useDispatch();
    let timer ;

    const handleDeleteDog = async (id) => {
        try {
        dispatch(deleteDog(id));
        setDeleted(true);
        setShowConfirmation(true);
        timer = setTimeout(() => {
            setShowConfirmation(false);
        }, 2000);
        } catch (error) {
        console.error(error);
        }
    };
    useEffect(() => {
        return () => {
        clearTimeout(timer);
        };
    }, [timer]);
    
    return (
        <div className={style.container}>
            <Link to={`/dogs/${id}`} className={style.link}>
                <h2 className={style.title}>{name}</h2>
            </Link>  
            <div className={style.imageContainer}>
                <img className={style.image} src={image} alt={name} />
            </div>
            {createInDb && Array.isArray(temperaments) && temperaments.length ? (
                <p className={style.temperaments}>
                    TEMPERAMENTO: {temperaments.join(", ")}
                </p>
            ) : Array.isArray(temperament) && temperament.length ? (
                <p className={style.temperaments}>
                    TEMPERAMENTO: {temperament?.join(", ")}
                </p>
            ) : null}
            <p className={style.info}>PESO: {weight} kg</p>
            <p className={style.info}>ALTURA: {height} cm</p>
            {createInDb && (
            <button className={style.deleteButton} onClick={() => handleDeleteDog(id)}>
                Eliminar
            </button>
            )}
            {showConfirmation && (
                <p className={style.confirmationMessage}>
                El perro fue eliminado exitosamente
                </p>
            )}
            </div>

    );
};

export default Card;