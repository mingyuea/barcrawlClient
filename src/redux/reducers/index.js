const initialState = {
	login: false,
	uInput: "",
	p1Input: "",
	p2Input: "",
};

const rootReducer = (state = initialState, action) => {
	switch(action.type){
		case "TOGGLE_AUTH":
			return {...state, login: !(state.login)}
		default:
			return state
	}
};

export default rootReducer;