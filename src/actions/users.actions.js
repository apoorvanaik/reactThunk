export const FETCH_USERS = "FETCH_USERS";

export const getUserDetails = selectedEmp => {
  return dispatch => {
    fetch(`https://reqres.in/api/users/${selectedEmp}`)
      .then(res => res.json())
      .then(users => {
        dispatch({
          type: FETCH_USERS,
          payload: { data: users.data, loading: false }
        });
      });
  };
};
