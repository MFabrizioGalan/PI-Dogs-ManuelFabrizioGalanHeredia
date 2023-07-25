import { useSelector } from "react-redux";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardsContainer = () => {

    const dogs = useSelector(state=>state.dogs)

    return (
        <div className={style.container}>
            {dogs.map(dog=>{
                return <Card
                    id={dog.id}
                    name={dog.name}
                    height={dog.height}
                    weight={dog.weight}
                    life_span={dog.life_span}
                    image={dog.image}
                />
            })}

        </div>
    )
}

export default CardsContainer;