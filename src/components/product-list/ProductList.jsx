import Product from '../product/Product';
import ProductListStyle from './ProductList.module.css';

const ProductList = ({ products }) => {
    const productList = products || [];
    return (
        <div className={ProductListStyle.main}>
            <div className="container">
                <div className={ProductListStyle.productBox}>
                    {productList.map(product => {
                        const discountedPrice = product.price - (product.price * (product.discountPercentage / 100));
                        return (
                            <Product key={product.id} product={{ ...product, discountedPrice }} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProductList;