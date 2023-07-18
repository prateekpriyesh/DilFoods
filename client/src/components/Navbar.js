import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../Actions/userActions";
import TotalOrders from "../screens/TotalOrders";

const Navbar = () => {
	const dispatch = useDispatch();
	const cartState = useSelector((state) => state.cartReducer);
	const userState = useSelector((state) => state.loginUserReducer);
	const { currentUser } = userState;

	return (
		<div>
			<nav className='navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded'>
				<a className='navbar-brand' href='/'>
					❤️Foods
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav ml-auto'>
						{currentUser ? (
							<div className='dropdown mt-2'>
								<a
									className='dropdown-toggle'
									id='dropdownMenuButton'
									type='button'
									data-toggle='dropdown'
									aria-haspopup='true'
									aria-expanded='false'
									style={{ cursor: "pointer", color: "black" }}
								>
									{currentUser.name}
								</a>
								<div
									className='dropdown-menu'
									aria-labelledby='dropdownMenuButton'
								>
									{currentUser.isAdmin ? (
										<a className='dropdown-item' href='/allOrders'>
											All orders
										</a>
									) : (
										<a className='dropdown-item' href='/orders'>
											Orders
										</a>
									)}
									<a
										className='dropdown-item'
										onClick={() => dispatch(userLogout())}
									>
										<li>Logout</li>
									</a>
								</div>
							</div>
						) : (
							<li className='nav-item'>
								<a className='nav-link' href='/login'>
									Login
								</a>
							</li>
						)}

						<li className='nav-item'>
							<a className='nav-link' href='/cart'>
								Cart {cartState.cartItems.length}
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
