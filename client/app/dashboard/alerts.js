import {addAlert} from './actions';

/*
Convenience functions to dispatch another action and attach an alert as well

Needs to be a drop in for redux's dispatch binding
Also need to consider the user may have other custom functions to bind

(dispatch) => {

  addPage: (...) => {
    dispatch(addPage(...));
    dispatch(addAlert('success', 'Added page'))
    goto(new page)
  }
}

*/
