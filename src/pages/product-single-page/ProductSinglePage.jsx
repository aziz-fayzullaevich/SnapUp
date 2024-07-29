import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncProductsSingle, getProductSingle, getProductsSingleStatus } from "../../store/ProductSlice";
import { STATUS } from '../../utils/Status';
import { formatPrice } from "../../utils/Helpers";
import Loader from "../../components/loader/Loader";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { BiCartAdd } from "react-icons/bi";
import { addToCart, setCartMessageOn, setCartMessageOff, getCartMessageStatus } from "../../store/CartSlice";
import CartMessage from '../../components/cart-message/CartMessage';
import ProductSingleStyle from './ProductSinglePage.module.css';

const ProductSinglePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(getProductSingle);
    const productsSingleStatus = useSelector(getProductsSingleStatus);
    const [quantity, setQuantity] = useState(1);
    const cartMessageStatus = useSelector(getCartMessageStatus);

    useEffect(() => {
        dispatch(fetchAsyncProductsSingle(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (cartMessageStatus) {
            const timer = setTimeout(() => {
                dispatch(setCartMessageOff());
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [cartMessageStatus, dispatch]);

    const discountedPrice = product ? product.price - (product.price * (product.discountPercentage / 100)) : 0;

    if (productsSingleStatus === STATUS.LOADING) {
        return <Loader />;
    }

    const increment = () => {
        setQuantity(prevQty => (prevQty + 1 > product?.stock ? product?.stock : prevQty + 1));
    };

    const decrement = () => {
        setQuantity(prevQty => (prevQty - 1 < 1 ? 1 : prevQty - 1));
    };

    const addToCartHandler = () => {
        const totalPrice = quantity * discountedPrice;

        dispatch(addToCart({ ...product, quantity, totalPrice, discountedPrice }));
        dispatch(setCartMessageOn());
    };

    return (
        <main className={ProductSingleStyle.mainBlock}>
            <div className="container">
                <div className={ProductSingleStyle.innerMainBlock}>
                    <div className={ProductSingleStyle.mainImgBlock}>
                        {product?.images?.[0] && <img src={product.images[0]} alt="image" />}
                        <div className={ProductSingleStyle.inNextImgBlock}>
                            {product?.images?.slice(1, 4).map((img, index) => (
                                <img key={index} src={img} alt={`image-${index}`} />
                            ))}
                        </div>
                    </div>
                    <div className={ProductSingleStyle.singler}>
                        <div className={ProductSingleStyle.details}>
                            <div className={ProductSingleStyle.title}>
                                {product?.title}
                            </div>
                            <div className={ProductSingleStyle.desc}>
                                <p>{product?.description}</p>
                            </div>
                            <div className={ProductSingleStyle.info}>
                                <div className={ProductSingleStyle.innerInfo}>
                                    <p>Рейтинг:</p>
                                    <span>{product?.rating}</span>
                                </div>
                                <div className={ProductSingleStyle.innerInfo}>
                                    <p>Бренд:</p>
                                    <span>{product?.brand}</span>
                                </div>
                                <div className={ProductSingleStyle.innerInfo}>
                                    <p>Категория:</p>
                                    <span>{product?.category ? product.category.replace('-', '') : ''}</span>
                                </div>
                            </div>
                        </div>
                        <div className={ProductSingleStyle.priceBlock}>
                            <div className={ProductSingleStyle.innerPriceBlock}>
                                <span className={ProductSingleStyle.oldPrice}>
                                    {formatPrice(product?.price)}
                                </span>
                                <p className={ProductSingleStyle.priceDesc}>(включая все налоги)</p>
                            </div>
                            <div className={ProductSingleStyle.innerPriceBlock}>
                                <span className={ProductSingleStyle.newPrice}>{formatPrice(discountedPrice)}</span>
                                <p className={ProductSingleStyle.newPriceBox}>
                                    {product?.discountPercentage}% скидка
                                </p>
                            </div>
                        </div>
                        <div className={ProductSingleStyle.quantityBlock}>
                            <p>Количество:</p>
                            <div>
                                <button type="button" className={ProductSingleStyle.decrement} onClick={decrement}>
                                    <FaMinus />
                                </button>
                                <span>{quantity}</span>
                                <button type="button" className={ProductSingleStyle.increment} onClick={increment}>
                                    <FaPlus />
                                </button>
                            </div>
                            {product?.stock === 0 && <div className={ProductSingleStyle.quantityError}>Распродано</div>}
                        </div>
                        <div className={ProductSingleStyle.addedBlock}>
                            <button type="button" className={ProductSingleStyle.addToCards} onClick={addToCartHandler}>
                                <BiCartAdd className={ProductSingleStyle.addedIcon} />
                                <span>Добавить в корзину</span>
                            </button>
                            <button type="button" className={ProductSingleStyle.buyNow}>
                                Купить сейчас
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {cartMessageStatus && <CartMessage />}
        </main>
    );
}

export default ProductSinglePage;
