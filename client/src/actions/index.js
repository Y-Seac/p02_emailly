import axios from 'axios'; //Enables us to your use Ajax
import { FETCH_USER } from './types'; /**
export const fetchUser = () => { //this arrow function automatically returns another function/arrow function
   function(dispatch) {
    axios
      .get("/api/current_user") //remember .get request always returns a promise
      .then(res => dispatch({ type: FETCH_USER, payload: res })); //only returns action if given route is succusfull.
  };
*/ //REF:

//Init new action creater? They are used to initate change or modify state in redux

/** Version w.o dispatch function
const fetchUser = () => {
  axios.get("/api/current_user"); //sends a get request to backend to get state. Immediately returns action. See auth.js !!we only use the realitive path when making request to express backend.
};
*/

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user'); //remember .get request always returns a promise
  dispatch({ type: FETCH_USER, payload: res.data }); //only returns action if given route is succusfull.
}; //res.data only returns the import user info

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const surveySubmit = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};
