export const getAllThalisReducer = (state = { thalis: [] }, action) => {
	switch (action.type) {
		case "GET_THALI_REQUEST":
			return {
				loading: true,
				...state,
			};
		case "GET_THALI_SUCCESS":
			return {
				loading: false,
				thalis: action.payload,
			};
		case "GET_THALI_FAILED":
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
