import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogin, userRegister } from "../Actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();
	const [cPassword, setCPassword] = useState("");
	const registerState = useSelector((state) => state.registerUserReducer);
	const { error, loading, success } = registerState;
	const dispatch = useDispatch();

	const register = () => {
		if (password != cPassword) {
			alert("Passwords do not match!");
		} else {
			const user = { name, email, password };
			dispatch(userRegister(name, email, password));
		}
	};

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("currentUser"));
		if (user?.token) {
			history.push("/");
		}
	}, []);

	return (
		<div>
			<div className='row justify-content-center mt-5'>
				<div className='col-md-5 mt-5 text-left shadow-lg 	p-3 mb-5 bg-white rounded'>
					{loading && <Loading />}
					{success && <Success success='User registration successful!' />}
					{error && <Error error='Email already exists' />}
					<h2 className='text-center m-2' style={{ fontSize: "35px" }}>
						Register
					</h2>
					<div>
						<input
							type='text'
							placeholder='name'
							className='form-control'
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
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
						<input
							type='password'
							placeholder='confirm password'
							className='form-control'
							value={cPassword}
							onChange={(e) => setCPassword(e.target.value)}
							required
						/>
						<button className='btn m-3' onClick={register}>
							Register
						</button>
						<br />
						<a style={{ color: "black" }} className='m-2' href='/login'>
							Click here to Login
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
