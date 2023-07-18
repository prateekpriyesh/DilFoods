import axios from "axios";

export const getAllThalis = () => async (dispatch, getState) => {
	const currentUser = getState().loginUserReducer.currentUser;
	dispatch({ type: "GET_THALI_REQUEST" });

	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${currentUser.token}`,
			},
		};
		const response = await axios.get("/api/thalis/getAllThalis", config);
		console.log(response);
		dispatch({ type: "GET_THALI_SUCCESS", payload: response.data });
	} catch (error) {
		dispatch({ type: "GET_THALI_FAILED", payload: error });
	}
};
