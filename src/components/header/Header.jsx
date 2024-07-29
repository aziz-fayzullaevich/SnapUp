import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { CiCircleQuestion } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentUser } from '../../store/AuthSlice';
import HeaderStyle from './Header.module.css';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);

    const handleLogOut = () => {
        dispatch(logOut());
    };

    return (
        <header className={HeaderStyle.headerBlock}>
            <div className="container">
                <div className={HeaderStyle.innerHeaderBlock}>
                    <div className={HeaderStyle.headerTop}>
                        <div className={HeaderStyle.headerLeft}>
                            <ul className={HeaderStyle.ul}>
                                <li className={HeaderStyle.link}>
                                    <Link to='/seller'>Seller Center</Link>
                                </li>
                                <li className={HeaderStyle.link}>
                                    <Link to='/download'>Download</Link>
                                </li>
                                <li className={HeaderStyle.link}></li>

                                <li className={HeaderStyle.link}>
                                    <span className={HeaderStyle.linkInSpan}>
                                        Follow us on
                                    </span>
                                    <ul className={HeaderStyle.socialLinks}>
                                        <li className={HeaderStyle.socialLink}>
                                            <a href="www.facebook.com" className={HeaderStyle.socialLinkA}>
                                                <FaFacebook className={HeaderStyle.icon} />
                                            </a>
                                        </li>
                                        <li className={HeaderStyle.socialLink}>
                                            <a href="www.instagram.com" className={HeaderStyle.socialLinkA}>
                                                <FaInstagram className={HeaderStyle.icon} />
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className={HeaderStyle.headerRight}>
                            <ul className={HeaderStyle.ul}>
                                <li>
                                    <Link to='/' className={HeaderStyle.linkTo}>
                                        <div>
                                            <span className={HeaderStyle.icon}>
                                                <CiCircleQuestion />
                                            </span>
                                            <span className={HeaderStyle.text}>Support</span>
                                        </div>
                                    </Link>
                                </li>
                                <li></li>
                                <li>
                                    {user ? (
                                        <span className={HeaderStyle.linkTo} onClick={handleLogOut}>
                                            <span className={HeaderStyle.text}>Log Out</span>
                                        </span>
                                    ) : (
                                        <Link to='/login' className={HeaderStyle.linkTo}>
                                            <span className={HeaderStyle.text}>Log In</span>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={HeaderStyle.headerBottom}>
                        <Navbar />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
