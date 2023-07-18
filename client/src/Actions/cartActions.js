export const addToCart =
	(thali, quantity, subscription, value) => (dispatch, getState) => {
		var cartItem = {
			name: thali.name,
			_id: thali._id,
			image: thali.image,
			subscription: subscription,
			quantity: Number(quantity),
			prices: thali.prices,
			price: thali.prices[0][subscription] * quantity,
			value,
		};

		if (cartItem.quantity > 10) {
			alert("You can not add more than 10 quantities");
		} else {
			if (cartItem.quantity < 1) {
				dispatch({ type: "DELETE_FROM_CART", payload: thali });
			} else {
				dispatch({ type: "ADD_TO_CART", payload: cartItem });
			}
		}

		const cartItems = getState().cartReducer.cartItems;
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	};

export const deleteFromCart = (thali) => (dispatch, getState) => {
	dispatch({ type: "DELETE_FROM_CART", payload: thali });
	const cartItems = getState().cartReducer.cartItems;
	localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const emptyCart = () => (dispatch, getState) => {
	dispatch({ type: "EMPTY_CART" });
	const cartItems = getState().cartReducer.cartItems;
	localStorage.removeItem("cartItems", JSON.stringify(cartItems));
};
