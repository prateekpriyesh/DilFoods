import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../Actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";

const Login = () => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();
	const loginState = useSelector((state) => state.loginUserReducer);
	const { loading, error } = loginState;

	useEffect(() => {
		if (localStorage.getItem("currentUser")) {
			window.location.href = "/";
		}
	}, []);

	const login = () => {
		dispatch(userLogin(email, password));
	};
	return (
		<div>
			<div className='row justify-content-center mt-5'>
				<div className='col-md-5 mt-5 text-left shadow-lg 	p-3 mb-5 bg-white rounded'>
					<h2 className='text-center m-2' style={{ fontSize: "35px" }}>
						Login
					</h2>
					{loading && <Loading />}
					{error && <Error error='Invalid credentials' />}
					<div>
						<input
							type='email'
							placeholder='email'
							className='form-control'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<input
							type='password'
							placeholder='password'
							className='form-control'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>

						<button className='btn m-3' onClick={login}>
							Login
						</button>
						<br />
						<a style={{ color: "black" }} className='m-2' href='/register'>
							Click here to register
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
