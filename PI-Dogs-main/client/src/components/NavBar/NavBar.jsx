import { Link, useHistory } from "react-router-dom";
import style from "./NavBar.module.css"

const NavBar = () => {
    const history = useHistory();
    const handleRedirect = () => {
        history.push('/home');
        window.location.reload()
    };
    const handleRe = () => {
        history.push('/');
        window.location.reload()
    };

    return (
        <div className={style.mainContainer}>
            <ul className={style.listas}>
                <Link className={style.link} to="/" onClick={handleRe}>¡Woof!</Link>
                <Link className={style.link} to="/home" onClick={handleRedirect}>Caninos</Link>
                <Link className={style.link} to="/create">¡Adopta!</Link>
            </ul>
        </div>
    )
}

export default NavBar;