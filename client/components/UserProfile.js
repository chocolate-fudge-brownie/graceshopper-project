// Import modules
import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

// Define component
class UserProfile extends React.Component {
  render() {
    const { username, email, error } = this.props.auth;
    const { handleSubmit } = this.props;

    return (
      <div id="user-profile">
        <div id="user-profile-title">
          <h2>Account Details</h2>
          <i className="bi bi-pencil-square"></i>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="mb-3 row">
            <label htmlFor="username" className="col-sm-2 col-form-label">
              Username:
            </label>
            <div className="col-sm-10">
              <input
                name="username"
                type="text"
                id="username"
                readOnly
                className="form-control-plaintext"
                required
                value={username}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email:
            </label>
            <div className="col-sm-10">
              <input
                name="email"
                type="text"
                id="email"
                readOnly
                className="form-control-plaintext"
                required
                value={email}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Password:
            </label>
            <div className="col-sm-10">
              <input
                name="password"
                type="password"
                id="password"
                readOnly
                className="form-control-plaintext"
                required
                value="********"
              />
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          {error && error.response && (
            <div>
              {error.response.data.includes('Validation error:') ? (
                error.response.data
                  .split('Validation error:')
                  .slice(1)
                  .map((error, index) => (
                    <div
                      key={index}
                      className="alert alert-danger"
                      role="alert"
                    >
                      Validation error: {error.replace(',', '.')}
                    </div>
                  ))
              ) : (
                <div className="alert alert-danger" role="alert">
                  {error.response.data}
                </div>
              )}
              <br />
            </div>
          )}
        </form>
      </div>
    );
  }
}

// Connect Redux store's state to props
const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

// Connect Redux store's action/thunk creators to props
const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const email = evt.target.email;
      const password = evt.target.password.value;
      dispatch(authenticate(username, email, password, formName));
    },
  };
};

// Export redux-connected component
export default connect(mapState, mapDispatch)(UserProfile);
