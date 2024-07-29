import { correct } from "../../utils/Images";
import CartMessageStyle from './CartMessage.module.css';

const CartMessage = () => {
    return (
        <div className={CartMessageStyle.correctBox}>
            <div className={CartMessageStyle.innerMainBlock}>
                <img src={correct} alt="correct" />
            </div>
            <p>Товар добавлен в корзину!</p>
        </div>
    );
}

export default CartMessage;