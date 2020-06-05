import {UPDATE_ROLES_LIST, UPDATE_SELECTED_ROLES} from "./acions";

const initialState = {
  selectedRole: '',
  rolesList: [
    {
      "RM":
        {
          "CUST_ON_BOARD_001": 13,
          "CUST_ON_BOARD_002": 13,
          "Search_001": 1
        }
    },
    {
      "UnderWriter":
        {
          "BUS_ON_BOARD_001": 12,
          "BUS_ON_BOARD_002": 12,
          "Search_001": 1
        }
    },
    {
      "BasicUser":
        {
          "CUST_ON_BOARD_001": 1,
          "CUST_ON_BOARD_002": 1,
          "BUS_ON_BOARD_001": 1,
          "BUS_ON_BOARD_002": 1
        }
    },
    {
      "Admin":
        {
          All: 777
        }
    }
  ]
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ROLES_LIST:
      return {
        ...state,
        rolesList: action.rolesList
      };
    case UPDATE_SELECTED_ROLES:
      return {
        ...state,
        selectedRole: action.roleID
      };
    default:
      return state;
  }
}

export default reducer;
