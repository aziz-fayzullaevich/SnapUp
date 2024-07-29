import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories, fetchAsyncCategories } from '../../store/CategorySlice';
import ProductList from '../../components/product-list/ProductList';
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from '../../store/ProductSlice';
import Loader from '../../components/loader/Loader';
import { STATUS } from '../../utils/Status';
import HeaderSlider from '../../components/slider/HeaderSlider';
import HomePageStyle from './HomePage.module.css';

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAsyncCategories());
        dispatch(fetchAsyncProducts(50));
    }, [dispatch]);

    const categories = useSelector(getAllCategories);
    const products = useSelector(getAllProducts);
    const productsStatus = useSelector(getAllProductsStatus);

    const tempProducts = [];
    if (products.length > 0) {
        for (let i in products) {
            let randomIndex = Math.floor(Math.random() * products.length);

            while (tempProducts.includes(products[randomIndex])) {
                randomIndex = Math.floor(Math.random() * products.length);
            }
            tempProducts[i] = products[randomIndex];
        }
    }

    const catProductsOne = categories[0] ? products.filter(product => product.category === categories[0].slug) : [];
    const catProductsTwo = categories[1] ? products.filter(product => product.category === categories[1].slug) : [];
    const catProductsThree = categories[2] ? products.filter(product => product.category === categories[2].slug) : [];
    const catProductsFour = categories[3] ? products.filter(product => product.category === categories[3].slug) : [];

    return (
        <main className={HomePageStyle.main}>
            <div className="container">
                <div className={HomePageStyle.innerMain}>
                    <HeaderSlider />
                </div>

                <div className={HomePageStyle.mainContent}>
                    <div className={HomePageStyle.categories}>
                        <h2>Продукты</h2>
                    </div>
                    {productsStatus === STATUS.LOADING ? <Loader /> : <ProductList products={tempProducts} />}
                </div>

                {categories[0] && (
                    <div className={HomePageStyle.mainContent}>
                        <div className={HomePageStyle.categories}>
                            <h2>{categories[0].name}</h2>
                        </div>
                        {productsStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsOne} />}
                    </div>
                )}

                {categories[1] && (
                    <div className={HomePageStyle.mainContent}>
                        <div className={HomePageStyle.categories}>
                            <h2>{categories[1].name}</h2>
                        </div>
                        {productsStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsTwo} />}
                    </div>
                )}

                {categories[2] && (
                    <div className={HomePageStyle.mainContent}>
                        <div className={HomePageStyle.categories}>
                            <h2>{categories[2].name}</h2>
                        </div>
                        {productsStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsThree} />}
                    </div>
                )}

                {categories[3] && (
                    <div className={HomePageStyle.mainContent}>
                        <div className={HomePageStyle.categories}>
                            <h2>{categories[3].name}</h2>
                        </div>
                        {productsStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsFour} />}
                    </div>
                )}
            </div>
        </main>
    );
}

export default HomePage;
