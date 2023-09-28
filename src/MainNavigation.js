import { NavLink } from "react-router-dom";
import classes from './MainNavigation.module.css';

const MainNavigation = () =>{
    return(
        <header className = {classes.header}>
            <ul>
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/Login'>Login</NavLink>
                </li>
            </ul>
        </header>
    );
};

export default MainNavigation;