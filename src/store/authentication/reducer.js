import {AUTHENTICATED} from "./acions";

const initialState = {
  isAuthenticated: true,
  profileObj: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        profileObj: action.profileObj
      };
    default:
      return state;
  }
}

export default reducer;
