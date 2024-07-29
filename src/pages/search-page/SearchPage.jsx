import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { STATUS } from '../../utils/Status';
import Loader from '../../components/loader/Loader';
import ProductList from '../../components/product-list/ProductList';
import { fetchAsyncSearchProduct, getSearchProducts, getSearchProductsStatus, clearSearch } from "../../store/SearchSlice";
import { useEffect } from "react";
import SearchStyle from './SearchPage.module.css';

const SearchPage = () => {
    const dispatch = useDispatch();
    const { searchTerm } = useParams();

    useEffect(() => {
        dispatch(clearSearch());
        if (searchTerm) {
            dispatch(fetchAsyncSearchProduct(searchTerm));
        }
    }, [dispatch, searchTerm]);

    const searchProduct = useSelector(getSearchProducts);
    const searchProductsStatus = useSelector(getSearchProductsStatus);

    if (searchProductsStatus === STATUS.LOADING) {
        return <Loader />;
    }

    if (searchProduct.length === 0) {
        return (
            <div className={SearchStyle.mainBlock}>
                <div className="container">
                    <div className={SearchStyle.emptyMainBlock}>
                        <h1 className={SearchStyle.emptyCart}>Товар не найден (</h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={SearchStyle.mainBlock}>
            <div className="container">
                <div className={SearchStyle.innerMainBlock}>
                    <div className={SearchStyle.title}>
                        <h2>Результат поиска</h2>
                    </div>
                    <br />
                    <ProductList products={searchProduct} />
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
