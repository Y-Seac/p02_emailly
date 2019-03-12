import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_USER: //imported from action file
      return action.payload || false; //if fetchUser returns a empty string(falsie value) then boolean exp returns false other wise true.
    default:
      return state;
  }
}
