import { Link } from "react-router-dom";
import { formatPrice } from '../../utils/Helpers'
import ProductStyle from "./Product.module.css";

const Product = ({ product }) => {

    return (
        <Link to={`/product/${product?.id}`} key={product?.id} >
            <div className={ProductStyle.productCart}>
                <div className={ProductStyle.category}>
                    {product?.category}
                </div>
                <img src={product?.images[0]} alt={product.title} />
                <div className={ProductStyle.productItem}>
                    <div className={ProductStyle.brand}>
                        <span>Брэнд: </span>
                        <span>{product?.brand}</span>
                    </div>
                    <div className={ProductStyle.title}>
                        {product?.title}
                    </div>
                    <div className={ProductStyle.price}>
                        <span className={ProductStyle.isPrice}>{formatPrice(product?.price)}</span>
                        <span className={ProductStyle.isNewPrice}>{formatPrice(product?.discountedPrice)}</span>
                        <span className={ProductStyle.discount}>
                            ({product?.discountedPercentage}% Off)
                        </span>
                    </div>
                </div>
            </div>
        </ Link >
    );
}

export default Product;