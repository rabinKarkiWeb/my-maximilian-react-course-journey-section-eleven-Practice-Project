import classes from './Cart.module.css';
import Modal from "../UI/Modal/Modal";
import {useContext} from "react";
import cartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = props => {
	const cartCtx = useContext(cartContext);
	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);

	}
	const cartItemAddHandler = (item) => {
		cartCtx.addItem({...item,amount:1});

	}
	const cartItems = (<ul className={classes['cart-items']}>
		{
			cartCtx.items.map((item)=>(
				<CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)}/>
			))
		}
	</ul>)

	const hasItems = cartCtx.items.length > 0 ;
	const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
	return <Modal onClick={props.onHideCart}>
		{cartItems}
		<div className={classes.total}>
			<span>{totalAmount}</span>
			<span>35.62</span>
		</div>
		<div className={classes.actions}>
			<button onClick={props.onHideCart} className={classes['button--alt']}>Close</button>
			{hasItems && <button className={classes.button}>Order</button>}
		</div>
	</Modal>

};
export default Cart;
