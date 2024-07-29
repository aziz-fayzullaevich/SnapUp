import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMenu, MdShoppingBag, MdOutlineSearch, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarOn } from '../../store/SideBarSlice';
import { getSidebarStatus } from '../../store/SideBarSlice';
import { fetchAsyncCategories, getAllCategories } from '../../store/CategorySlice';
import { getAllCarts, getCartItemsCount, getCartTotal } from '../../store/CartSlice';
import NavbarStyle from './Navbar.module.css';
import CartModal from '../cart-modal/CartModal';

const Navbar = () => {
    const dispatch = useDispatch();
    const isSidebarOn = useSelector(getSidebarStatus);
    const categories = useSelector(getAllCategories);
    const carts = useSelector(getAllCarts);
    const itemsCount = useSelector(getCartItemsCount);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchTerm = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        dispatch(getCartTotal());
    }, [dispatch, carts]);

    useEffect(() => {
        dispatch(fetchAsyncCategories());
    }, [dispatch]);

    return (
        <nav className={NavbarStyle.navbar}>
            <div className='container'>
                <div className={NavbarStyle.innerNavbar}>

                    <div className={NavbarStyle.left}>
                        <button
                            className={NavbarStyle.menuBtn}
                            onClick={() => dispatch(setSidebarOn())}
                        >
                            <MdMenu className={NavbarStyle.icon} />
                        </button>
                        <Link to='/'>
                            <span>
                                <MdShoppingBag className={NavbarStyle.icon} />
                                <span>Snap<span>Up</span></span>
                            </span>
                        </Link>
                    </div>

                    <div className={NavbarStyle.center}>
                        <input type="text" placeholder='Поиск товаров'
                            onChange={(e) => handleSearchTerm(e)} />
                        <Link to={`/search/${searchTerm}`}>
                            <MdOutlineSearch className={NavbarStyle.icon} />
                        </Link>
                    </div>

                    <div className="right">
                        <Link to='/cart' className={NavbarStyle.linkToCart}>
                            <MdShoppingCart className={NavbarStyle.icon} />
                            <div className={NavbarStyle.cartCount}>{itemsCount}</div>
                        </Link>
                        <CartModal carts={carts} />
                    </div>
                </div>
                <ul className={NavbarStyle.products}>
                    {categories.slice(0, 8).map((category, idx) => (
                        <li key={idx}>
                            <Link to={`/category/${category.slug}`}>{category.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;