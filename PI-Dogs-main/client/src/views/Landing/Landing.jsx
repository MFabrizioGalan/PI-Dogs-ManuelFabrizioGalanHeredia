import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import dogLandingImage from "../../extras/images-1.png";
import dogTitle from "../../extras/imagen-2.png";

const Landing = () => {
    return (
        <div className={style.container}>
            <div className={style.background} style={{ backgroundImage: `url(${dogLandingImage})`}}></div>
            <div className={style.overlay}>
                <div className={style.title} style={{ backgroundImage: `url(${dogTitle})`}}></div>
            </div>
            <div className={style.content}>
                {/* <div className={style.title} ></div> */}
                <Link to="/home" className={style.link}>
                <button className={`${style.button} ${style.enterButton}`}>Ingresar</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing;