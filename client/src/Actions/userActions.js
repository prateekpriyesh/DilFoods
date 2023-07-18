import axios from "axios";

export const userRegister = (name, email, password) => async (dispatch) => {
	try {
		dispatch({ type: "USER_REGISTER_REQUEST" });
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.post(
			"/api/users/register",
			{
				name,
				email,
				password,
			},
			config
		);
		console.log(data);
		dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
		dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
		localStorage.setItem("currentUser", JSON.stringify(data));
	} catch (error) {
		dispatch({ type: "USER_REGISTER_FAILED", payload: error });
	}
};

export const userLogin = (email, password) => async (dispatch) => {
	dispatch({ type: "USER_LOGIN_REQUEST" });

	try {
		const response = await axios.post("/api/users/login", { email, password });
		console.log(response);
		dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
		localStorage.setItem("currentUser", JSON.stringify(response.data));
		window.location.href = "/";
	} catch (error) {
		dispatch({ type: "USER_LOGIN_FAILED", payload: error });
	}
};

export const userLogout = () => (dispatch) => {
	localStorage.removeItem("currentUser");
	window.location.href = "/login";
};
