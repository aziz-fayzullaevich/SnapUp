import { useEffect } from "react";
import ProductList from "../../components/product-list/ProductList";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllCarts } from "../../store/CartSlice";
import { getAllProductsByCategory, fetchAsyncProductsOfCategory, getCategoryProductStatus } from "../../store/CategorySlice";
import Loader from "../../components/loader/Loader";
import { STATUS } from '../../utils/Status';
import CategoryProductStyle from './CategoryProducts.module.css';

const CategoryProducts = () => {
    const dispatch = useDispatch();
    const { category } = useParams();
    const categoryProduct = useSelector(getAllProductsByCategory);
    const categoryProductStatus = useSelector(getCategoryProductStatus);

    useEffect(() => {
        dispatch(fetchAsyncProductsOfCategory(category))
    }, [dispatch, category]);

    return (
        <div className={CategoryProductStyle.mainBlock}>
            <div className="container">
                <div className={CategoryProductStyle.innerMainBlock}>
                    <div className={CategoryProductStyle.productContent}>
                        <div className={CategoryProductStyle.title}><h2>{category.replace('-', '')}</h2></div>

                        {
                            categoryProductStatus === STATUS.LOADING ? <Loader /> : <ProductList products={categoryProduct} />
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryProducts;