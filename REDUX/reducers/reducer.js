const initialState = {login:false};
// Pass a function to initialize when Login is successful. in order to 
// have an alternative to looking into the state. (deactivate the Login button on tool bar.)

function reducer (state = initialState, action){
  switch (action.type){

    case 'LOGIN_SUCCESSFUL':
    console.log("LOGIN_SUCCESSFUL")
    //  newState = {...state, login : true};
     return {...state, login : true};
    break;

    case 'RESET_LOGIN':
    console.log("LOGIN RESET")
    return {...state, login : false};
    break;

    case 'ADD_USER_SUCCESSFUL':
    console.log("USER ADDED SUCCESSFULLY")
    return {...state, login : false};
    break;

    default:
    return state
    
  }
  
};

module.exports = reducer;