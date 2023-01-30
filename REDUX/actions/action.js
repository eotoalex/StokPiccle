const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
const RESET_LOGIN = 'RESET_LOGIN';
const ADD_USER_SUCCESSFUL = 'ADD_USER_SUCCESSFUL'

function userLoginAction(text) {
  return { type: LOGIN_SUCCESSFUL, text };
}
function userLoginReset(text){
  return {type: RESET_LOGIN, text };
}

function addUserAction(text) {
  return { type: ADD_USER_SUCCESSFUL, text };
}

module.exports = {
  userLoginAction,
  userLoginReset,
  addUserAction
};