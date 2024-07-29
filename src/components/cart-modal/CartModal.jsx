import React from 'react';
import { shoppingCart } from "../../utils/Images";
import { formatPrice } from "../../utils/Helpers";
import CartModalStyle from './CartModal.module.css';
import { Link } from 'react-router-dom';

const CartModal = ({ carts }) => {
    return (
        <div className="cartModal">
            <p className={CartModalStyle.desc}>
                Недавно добавленные товары
            </p>
            {carts?.length > 0 ? (
                <div className={CartModalStyle.cartModalList}>
                    {carts.map(cart => (
                        <div key={cart.id} className={CartModalStyle.cartModalItem}>
                            <img src={cart?.thumbnail} alt="cart-image" />
                            <h3 className={CartModalStyle.cartModalTitle}>
                                {cart?.title}
                            </h3>
                            <div className={CartModalStyle.cartModalPrice}>
                                {formatPrice(cart?.discountedPrice)}
                            </div>
                        </div>
                    ))}

                    <Link to="/cart" className={CartModalStyle.linkToCart}>
                        Перейти к корзину
                    </Link>
                </div>
            ) : (
                <div className={CartModalStyle.notProduct}>
                    <img src={shoppingCart} alt="shopping cart" />
                    <p>Ещё нет товара</p>
                </div>
            )}
        </div>
    );
}

export default CartModal;
