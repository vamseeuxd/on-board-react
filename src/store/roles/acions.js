export const UPDATE_ROLES_LIST = 'UPDATE_ROLES_LIST';
export const UPDATE_SELECTED_ROLES = 'UPDATE_SELECTED_ROLES';

export const updateRolesList = (rolesList) => {
  return {
    type: UPDATE_ROLES_LIST,
    rolesList
  }
}

export const updateSelectedRoles = (roleID) => {
  return {
    type: UPDATE_SELECTED_ROLES,
    roleID
  }
}
