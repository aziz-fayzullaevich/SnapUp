import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { shoppingCart } from "../../utils/Images";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/Helpers";
import { getAllCarts, toggleCartQty, removeFromCart, clearCart, getCartTotal } from "../../store/CartSlice";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete, MdDeleteForever } from "react-icons/md";
import CartPageStyle from './CartPage.module.css';

const CartPages = () => {
    const dispatch = useDispatch();
    const carts = useSelector(getAllCarts);
    const { itemCount, totalAmount } = useSelector(state => state.cart);

    if (carts.length === 0) {
        return (
            <div className={CartPageStyle.mainCartPage}>
                <div className="container">
                    <div className={CartPageStyle.empryCart}>
                        <img src={shoppingCart} alt="shoppingCart" />
                        <span>Корзина пуста</span>
                        <Link to='/'>Перейти к покупке</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={CartPageStyle.mainCartPage}>
            <div className="container">
                <div className={CartPageStyle.inMainCartPage}>
                    <h2 className={CartPageStyle.cartTitle}>Корзина</h2>

                    <div className={CartPageStyle.cartTablse}>

                        <div className={CartPageStyle.tableHead}>
                            <div className={CartPageStyle.cartCtr}>
                                <div className={CartPageStyle.cartCth}>
                                    <span className={CartPageStyle.cartCtxt}>№</span>
                                </div>

                                <div className={CartPageStyle.cartCth}>
                                    <span className={CartPageStyle.cartCtxt}>Товары</span>
                                </div>

                                <div className={CartPageStyle.cartCth}>
                                    <span className={CartPageStyle.cartCtxt}>Стоимость</span>
                                </div>

                                <div className={CartPageStyle.cartCth}>
                                    <span className={CartPageStyle.cartCtxt}>Количество</span>
                                </div>

                                <div className={CartPageStyle.cartCth}>
                                    <span className={CartPageStyle.cartCtxt}>Итоговая цена</span>
                                </div>

                                <div className={CartPageStyle.cartCth}>
                                    <span className={CartPageStyle.cartCtxt}>Actions</span>
                                </div>
                            </div>
                        </div>

                        <div className={CartPageStyle.tableBody}>
                            {
                                carts.map((cart, idx) => {
                                    return (
                                        <div className={CartPageStyle.cartCtr} key={cart?.id}>

                                            <div className={CartPageStyle.cartCtd}>
                                                <span>{idx + 1}</span>
                                            </div>

                                            <div className={CartPageStyle.cartCtd}>
                                                <span className={CartPageStyle.titleCart}>{cart?.title}</span>
                                            </div>

                                            <div className={CartPageStyle.cartCtd}>
                                                <span>{cart?.discountedPrice.toFixed(2)}</span>
                                            </div>

                                            <div className={CartPageStyle.cartCtd}>
                                                <div className={CartPageStyle.qtyBlock}>
                                                    <button type="button" className={CartPageStyle.decrement}
                                                        onClick={() => dispatch(toggleCartQty({ id: cart?.id, type: "DEC" }))}>
                                                        <FaMinus />
                                                    </button>
                                                    <span>{cart?.quantity}</span>
                                                    <button type="button" className={CartPageStyle.increment}
                                                        onClick={() => dispatch(toggleCartQty({ id: cart?.id, type: "INC" }))}>
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className={CartPageStyle.cartCtd}>
                                                <span className={CartPageStyle.cartctct}>
                                                    {formatPrice(cart?.totalPrice)}
                                                </span>
                                            </div>


                                            <div className={CartPageStyle.cartCtd}>
                                                <button className={CartPageStyle.deleteBtn}
                                                    type="button"
                                                    onClick={() => dispatch(removeFromCart(cart?.id))}>
                                                    <MdDelete />
                                                </button>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className={CartPageStyle.bottom}>
                            <div className={CartPageStyle.clearCart}>
                                <button type="button" onClick={() => dispatch(clearCart())}>
                                    <MdDeleteForever className={CartPageStyle.clearCartsBtn} />
                                    Очистить корзину
                                </button>
                            </div>
                            <div className={CartPageStyle.bottomRight}>
                                <div className={CartPageStyle.totalPriceBlock}>
                                    <p>Общее количество товаров: <span>{itemCount}</span></p>
                                    <span>Итоговая сумма: <span>{totalAmount.toFixed(2)}$</span></span>
                                </div>
                                <button type="button" className={CartPageStyle.getForm}>
                                    Оформить заказ
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </ div >
    );
}

export default CartPages;