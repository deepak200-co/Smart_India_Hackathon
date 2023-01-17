import React, { useContext } from "react";

import { store } from "../App";

import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./UI/Navbar";

function UserInterface() {
	const navigate = useNavigate();

	/* eslint-disable no-unused-vars */
	const [user, setUser] = useContext(store);

	useEffect(() => {
		console.log(user);
		if (Object.keys(user).length === 0) {
			navigate("/user/login");
		}
	});

	return (
		<div>
			<Navbar user="User" />
			<div style={{ marginTop: 100 }}>
				<h1>Hello {`${user.firstname} ${user.lastname}`}</h1>
				<p>Welcome back to your User Account</p>
				<p>
					Track any application of yours{" "}
					<Link to="/user/application_status">here</Link> or keep a
					new application <Link to="/user/request">here</Link>
				</p>
			</div>
		</div>
	);
}

export default UserInterface;
