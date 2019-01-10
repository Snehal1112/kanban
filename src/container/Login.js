import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authenticate } from '../actions/Authentication';
import Util from '../utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faUserCircle);

export class Login extends Component {
	onClickLogin(e) {
		e.preventDefault();
		let form = e.target.form;
		let payLoad = {
			username: form['username'].value,
			password: form['password'].value
		};
		this.props.authenticate(payLoad);
	}

	render() {
		return (
			<div className="login-container">
				<form className="login" method="POST">
					<div className="login-title-container">
						<FontAwesomeIcon icon={faUserCircle} size="8x" color={'#2979FF'} />
						<h2 className="title">Login</h2>
					</div>
					<div className="input-field">
						<input type="text" name="username" placeholder="User name" />
					</div>
					<div className="input-field">
						<input type="password" name="password" placeholder="Password" />
					</div>

					{!Util.isEmpty(this.props.data) && !Util.isDefined(this.props.data.is_oauth) ? (
						<div className="errors">
							<span>{this.props.data.message}</span>
						</div>
					) : (
						''
					)}

					<input type="submit" onClick={(e) => this.onClickLogin(e)} value="Login" />
				</form>
			</div>
		);
	}
}

Login.propTypes = {
	data: PropTypes.object
};

const mapStateToProps = (state) => ({
	data: state.auth.data
});

export default connect(mapStateToProps, { authenticate })(Login);