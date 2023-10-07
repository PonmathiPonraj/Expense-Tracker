import { useDispatch,useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
//import AuthContext from './store/AuthContext';
import { authActions } from './store/authSlice';
import classes from './MainNavigation.module.css';
//import { darkModeActions } from './store/DarkModeSlice';

const MainNavigation = () => {
    const navigate = useNavigate();
    console.log('mainNavigation rerendered')
   // const authCtx = useContext(AuthContext);
    const dispatch=useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
    const isPremium=useSelector((state)=>state.premium.isPremium);
  
    console.log('isPremium:',isPremium);
    const logoutHandler = () => {

        localStorage.removeItem('idToken');
        dispatch(authActions.logout());
        // authCtx.logout();
        navigate('/Login');
    };

    //{isPremium && <button onClick={darkModeHandler}>Dark Mode </button>}
    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>

                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
            {isLoggedIn && (
                <button onClick={logoutHandler}>Logout</button>
            )}
        </header>
    );
};

export default MainNavigation;