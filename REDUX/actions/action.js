const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
const RESET_LOGIN = 'RESET_LOGIN';

 function userLoginAction(text) {
  return { type: LOGIN_SUCCESSFUL, text };
}
function userLoginReset(text){
  return {type: RESET_LOGIN, text };
}

module.exports = {
  userLoginAction,
  userLoginReset
};