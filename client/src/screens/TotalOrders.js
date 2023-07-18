import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../Actions/orderActions";
import Error from "../components/Error";
import Loading from "../components/Loading";

const TotalOrders = () => {
	const dispatch = useDispatch();
	const ordersState = useSelector((state) => state.getAllOrdersReducer);
	const { orders, error, loading } = ordersState;
	useEffect(() => {
		dispatch(getAllOrders());
	}, []);
	return (
		<div>
			<h2 style={{ fontSize: " 35px" }}>
				<b>All Orders</b>
			</h2>
			<hr />
			<div className='row justify-content-center'>
				{loading && <Loading />}
				{error && <Error error='Something went wrong!' />}
				{orders &&
					orders.map((order) => {
						return (
							<div
								key={order._id}
								className='col-md-8 m-2 p-1 rounded shadow-md'
								style={{ backgroundColor: "#e09177", color: "white" }}
							>
								<div className='flex-container'>
									<div className='text-left w-100 m-1'>
										<h2 style={{ fontSize: "25px" }}>Items</h2>
										{order.orderItems.map((item) => {
											return (
												<div key={item._id}>
													<hr />
													<p>
														{item.name} [{item.subscription}]*{item.quantity} ={" "}
														{item.price}
													</p>
												</div>
											);
										})}
									</div>
									<div className='text-left w-100 m-1'>
										<h2 style={{ fontSize: "25px" }}>Address</h2>
										<hr />
										<p>Street: {order.shippingAddress.street}</p>
										<p>City: {order.shippingAddress.city}</p>
										<p>Country: {order.shippingAddress.country}</p>
										<p>Pincode: {order.shippingAddress.pincode}</p>
									</div>
									<div className='text-left w-100 m-1'>
										<h2 style={{ fontSize: "25px" }}>Order Info</h2>
										<hr />
										<p>Order Amount: {order.orderAmount}</p>
										<p>Date: {order.createdAt.substr(0, 10)}</p>
										<p>Transaction ID: {order.transactionId}</p>
										<p>Order ID: {order._id}</p>
										<p>Delivery Time: {order.time + 1}</p>
										<p>Delivery Status: {order.isDelivered}</p>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default TotalOrders;
