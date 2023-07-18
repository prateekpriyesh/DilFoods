import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addToCart, deleteFromCart } from "../Actions/cartActions";
import Checkout from "../components/Checkout";

const CartScreen = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const cartState = useSelector((state) => state.cartReducer);
	const { currentUser } = useSelector((state) => state.loginUserReducer);
	const cartItems = cartState.cartItems;
	const subTotal = cartItems.reduce((x, item) => x + item.price, 0);
	const val = cartItems.map((item) => item.value);

	return (
		<div>
			<div className='row justify-content-center'>
				<div className='col-md-6'>
					<h2 style={{ fontSize: "40px" }}>My Cart</h2>
					{cartItems.map((item) => {
						return (
							<div className='flex-container' key={item._id}>
								<div className='text-left m-1 w-100'>
									<h1>
										{item.name} [{item.subscription}]
									</h1>
									<h1>
										Price: {item.quantity} * {item.prices[0][item.subscription]}{" "}
										= {item.price}
									</h1>
									<h1>Delivery Time: {item.value ? item.value : "10:00"}</h1>
									<h1 style={{ display: "inline" }}>Quantity: </h1>
									<i
										className='fa fa-plus'
										aria-hidden='true'
										style={{ cursor: "pointer" }}
										onClick={() => {
											dispatch(
												addToCart(
													item,
													item.quantity + 1,
													item.subscription,
													item.value
												)
											);
										}}
									></i>
									<b>{item.quantity}</b>
									<i
										className='fa fa-minus'
										aria-hidden='true'
										style={{ cursor: "pointer" }}
										onClick={() => {
											dispatch(
												addToCart(
													item,
													item.quantity - 1,
													item.subscription,
													item.value
												)
											);
										}}
									></i>
									<hr />
								</div>

								<div className='w-100 m-1'>
									<img
										src={item.image}
										alt={item.name}
										style={{ height: "80px", width: "80px" }}
									/>
								</div>

								<div className='w-100 m-1'>
									<i
										className='fa fa-trash mt-4'
										aria-hidden='true'
										style={{ cursor: "pointer" }}
										onClick={() => {
											dispatch(deleteFromCart(item));
										}}
									></i>
								</div>
							</div>
						);
					})}
				</div>
				<div className='col-md-4 text-right'>
					<h2 style={{ fontSize: "45px" }}>SubTotal: {subTotal} /-</h2>
					{currentUser ? (
						<Checkout subtotal={subTotal} val={val} />
					) : (
						<button className='btn' onClick={() => history.push("/login")}>
							{" "}
							Login
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default CartScreen;
