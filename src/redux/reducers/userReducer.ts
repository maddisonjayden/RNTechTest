const initialState = {
  id: null,
  isLoggedIn: false,
  name: null,
  emailAddress: null,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SAVE_USER':
      return {
        ...state,
        ...action.payload, // Save the user data
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default userReducer;
