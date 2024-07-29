import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getSidebarStatus, setSidebarOff } from '../../store/SideBarSlice';
import { fetchAsyncCategories, getAllCategories } from '../../store/CategorySlice';
import SidebarStyle from './Sidebar.module.css';

const SideBar = () => {
    const dispatch = useDispatch();
    const isSidebarOn = useSelector(getSidebarStatus);
    const categories = useSelector(getAllCategories);

    useEffect(() => {
        dispatch(fetchAsyncCategories());
    }, [dispatch]);

    return (
        <aside className={`${SidebarStyle.sidebar} ${isSidebarOn ? SidebarStyle.showSidebar : SidebarStyle.hideSidebar}`}>
            <div className={SidebarStyle.sidebarBlock}>
                <h2>Общие категории</h2>
                <button type='button' className={SidebarStyle.sidebarHideBtn} onClick={() => dispatch(setSidebarOff())}>
                    <MdClose />
                </button>
            </div>
            <ul className={SidebarStyle.catListLink}>
                {categories.map((category, idx) => (
                    <li key={idx} onClick={() => dispatch(setSidebarOff())}>
                        <Link to={`category/${category.slug}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default SideBar;