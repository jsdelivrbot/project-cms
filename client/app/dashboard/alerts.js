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

Ideally we have a _.flow that dispatches the fact there was an object update
This could then automagically connect to a storage backend
For now actions can emit the following properties:

* new_object
* updated_object
* deleted_object
* error

Dashboard reducer can monitor for those properties and create the appropriate alert.
Issue: determine type of object, possibly from type

Maybe this should be handled within the individual app:
  The other half is determining what the next url should be.
  * deleted_object should redirect to listing
  * new_object should redirect to edit object

  To do this we need to know the baseUrl of the managing app related to the object


*/
