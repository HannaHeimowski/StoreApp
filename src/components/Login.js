import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => (
    <nav>
        <h2>Inventory Login</h2>
        <p>Sign in to manage your store inventory</p>
        <button 
            className="github" 
            onClick={() => props.authenticate('Github')}
        >GutHub Login</button>
         {/* <button 
            className="gmail" 
            onClick={() => props.authenticate('Gmail')}
        >G-mail Login</button>  */}
    </nav>
);




Login.propTypes = {
    authenticate: PropTypes.func.isRequired
}

export default Login;