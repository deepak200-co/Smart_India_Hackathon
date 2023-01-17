import React, { useContext, useState } from "react";

import { store } from "../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Axios from "axios";

import "./appstatus.css";
import Navbar from "./UI/Navbar";

const ApplicationStatusAll = () => {
	const navigate = useNavigate();

	/* eslint-disable no-unused-vars */
	const [user, setUser] = useContext(store);

	const [allGroundRequests, setAllGroundRequests] = useState([]);
	const [allEquipmentRequests, setAllEquipmentRequests] = useState([]);
	const [allPlayfieldRequests, setAllPlayfieldRequests] = useState([]);

	// console.log("Ground Requests", allGroundRequests[0].useremail);

	const getAllRequests = async () => {
		const response = await Axios.get(
			"http://localhost:5000/requests/getallrequests"
		);
		// console.log(response.data);
		setAllGroundRequests(
			response.data.get_ground.sort(
				(a, b) => a.approx_price - b.approx_price
			)
		);
		setAllEquipmentRequests(
			response.data.get_equipment.sort(
				(a, b) => a.approx_price - b.approx_price
			)
		);
		setAllPlayfieldRequests(
			response.data.get_playfield.sort(
				(a, b) => a.approx_price - b.approx_price
			)
		);
	};

	useEffect(() => {
		console.log(user);
		if (Object.keys(user).length === 0) {
			navigate("/admin/login");
		}

		getAllRequests();

		// eslint-disable-next-line
	}, []);

	// console.log(pendingRequests);

	const getColour = (status) => {
		if (status === "Accepted") {
			return "#168205";
		} else if (status === "Pending") {
			// console.log("yellow");
			return "#8c8606";
		} else {
			return "red";
		}
	};

	function numberWithCommas(x) {
		return x.toString().split(".")[0].length > 3
			? x
					.toString()
					.substring(0, x.toString().split(".")[0].length - 3)
					.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
					"," +
					x
						.toString()
						.substring(x.toString().split(".")[0].length - 3)
			: x.toString();
	}

	const Handler = async (req_type, status, id) => {
		const response = await Axios.post(
			"http://localhost:5000/requests/change_status",
			{
				req_type: req_type,
				change_status_to: status,
				id: id,
			}
		);

		console.log(response);

		navigate("/admin/dashboard");
	};

	const groundData = () => {
		const data = [];
		for (let i in allGroundRequests) {
			// console.log(allGroundRequests[i]);
			// const temp = <p>Registered Mail : {allGroundRequests[i].useremail}</p>;
			const temp = (
				<>
					<tr>
						<td>{allGroundRequests[i].useremail}</td>
						<td>{allGroundRequests[i].school_addr}</td>
						<td>{allGroundRequests[i].ground_area}</td>
						<td>{allGroundRequests[i].status_of_ground === false ? 'Construction' : allGroundRequests[i].status_of_ground}</td>
						<td>{`₹${numberWithCommas(
							allGroundRequests[i].approx_price
						)}`}</td>
						<td>{allGroundRequests[i].purpose}</td>
						<td>{allGroundRequests[i].addn_info}</td>
						<td
							style={{
								color: getColour(allGroundRequests[i].status),
							}}>
							{allGroundRequests[i].status}
						</td>
						{allGroundRequests[i].status === "Pending" ? (
							<td>
								<button
									onClick={() =>
										Handler(
											"get_ground",
											"Accepted",
											allGroundRequests[i]._id
										)
									}>
									Accept
								</button>
								<button
									onClick={() =>
										Handler(
											"get_ground",
											"Rejected",
											allGroundRequests[i]._id
										)
									}>
									Reject
								</button>
							</td>
						) : (
							<td>{allGroundRequests[i].remarks}</td>
						)}
					</tr>
				</>
			);
			data.push(temp);
		}
		// console.log(allGroundRequests);

		return data;
	};

	const equipmentData = () => {
		const data = [];
		for (let i in allEquipmentRequests) {
			// console.log(allEquipmentRequests[i]);
			// const temp = <p>Registered Mail : {allGroundRequests[i].useremail}</p>;
			const temp = (
				<>
					<tr>
						<td>{allEquipmentRequests[i].useremail}</td>
						<td>{allEquipmentRequests[i].name_of_equipment}</td>
						<td>{allEquipmentRequests[i].number_of_items}</td>
						<td>{allEquipmentRequests[i].addn_info}</td>
						<td>{`₹${numberWithCommas(
							allEquipmentRequests[i].approx_price
						)}`}</td>
						<td
							style={{
								color: getColour(
									allEquipmentRequests[i].status
								),
							}}>
							{allEquipmentRequests[i].status}
						</td>
						{allEquipmentRequests[i].status === "Pending" ? (
							<td>
								<button
									onClick={() =>
										Handler(
											"get_equipment",
											"Accepted",
											allEquipmentRequests[i]._id
										)
									}>
									Accept
								</button>
								<button
									onClick={() =>
										Handler(
											"get_equipment",
											"Rejected",
											allEquipmentRequests[i]._id
										)
									}>
									Reject
								</button>
							</td>
						) : (
							<td>{allEquipmentRequests[i].remarks}</td>
						)}
					</tr>
				</>
			);
			data.push(temp);
		}
		// console.log(allGroundRequests);

		return data;
	};

	const playfieldData = () => {
		const data = [];
		for (let i in allPlayfieldRequests) {
			// console.log(allPlayfieldRequests[i]);
			// const temp = <p>Registered Mail : {allGroundRequests[i].useremail}</p>;
			const temp = (
				<>
					<tr>
						<td>{allPlayfieldRequests[i].useremail}</td>
						<td>{allPlayfieldRequests[i].required_for}</td>
						<td>{allPlayfieldRequests[i].intended_age}</td>
						<td>{`₹${numberWithCommas(
							allPlayfieldRequests[i].approx_price
						)}`}</td>
						<td>{allPlayfieldRequests[i].addn_info}</td>
						<td
							style={{
								color: getColour(
									allPlayfieldRequests[i].status
								),
							}}>
							{allPlayfieldRequests[i].status}
						</td>
						{allPlayfieldRequests[i].status === "Pending" ? (
							<td>
								<button
									onClick={() =>
										Handler(
											"get_playfield",
											"Accepted",
											allPlayfieldRequests[i]._id
										)
									}>
									Accept
								</button>
								<button
									onClick={() =>
										Handler(
											"get_playfield",
											"Rejected",
											allPlayfieldRequests[i]._id
										)
									}>
									Reject
								</button>
							</td>
						) : (
							<td>{allPlayfieldRequests[i].remarks}</td>
						)}
					</tr>
				</>
			);
			data.push(temp);
		}
		// console.log(allGroundRequests);

		return data;
	};

	const pendingGroundRequests = () => {
		let data = [];
		let groundRequests = allGroundRequests;

		groundRequests.sort(
			(a, b) =>
				a.status_of_ground - b.status_of_ground ||
				a.approx_price - b.approx_price
		);
		console.log(groundRequests);
		// console.log(typeof(groundRequests));

		for (let i in groundRequests) {
			// console.log(groundRequests[i]);
			if (groundRequests[i].status === "Pending") {
				const temp = (
					<>
						<tr>
							<td>{groundRequests[i].useremail}</td>
							<td>{groundRequests[i].school_addr}</td>
							<td>{groundRequests[i].ground_area}</td>
							<td>{groundRequests[i].status_of_ground}</td>
							<td>{`₹${numberWithCommas(
								groundRequests[i].approx_price
							)}`}</td>
							<td>{groundRequests[i].purpose}</td>
							<td>{groundRequests[i].addn_info}</td>
							<td
								style={{
									color: getColour(groundRequests[i].status),
								}}>
								{groundRequests[i].status}
							</td>
							{groundRequests[i].status === "Pending" && (
								<td>
									<button
										onClick={() =>
											Handler(
												"get_ground",
												"Accepted",
												groundRequests[i]._id
											)
										}>
										Accept
									</button>
									<button
										onClick={() =>
											Handler(
												"get_ground",
												"Rejected",
												groundRequests[i]._id
											)
										}>
										Reject
									</button>
								</td>
							)}
						</tr>
					</>
				);
				data.push(temp);
			}
			// const temp = <p>Registered Mail : {allGroundRequests[i].useremail}</p>;
		}
		return data;
	};

	const pendingEquipmentRequests = () => {
		let data = [];
		let equipmentRequests = allEquipmentRequests;

		equipmentRequests.sort((a,b) => (a.approx_price/a.number_of_items) - (b.approx_price/b.number_of_items))
		// console.log(equipmentRequests);
		for (let i in equipmentRequests) {
			// console.log(equipmentRequests[i]);
			if (equipmentRequests[i].status === "Pending") {
				const temp = (
					<>
						<tr>
							<td>{equipmentRequests[i].useremail}</td>
							<td>{equipmentRequests[i].name_of_equipment}</td>
							<td>{equipmentRequests[i].number_of_items}</td>
							<td>{equipmentRequests[i].addn_info}</td>
							<td>{`₹${numberWithCommas(
								equipmentRequests[i].approx_price
							)}`}</td>
							<td
								style={{
									color: getColour(
										equipmentRequests[i].status
									),
								}}>
								{equipmentRequests[i].status}
							</td>
							{equipmentRequests[i].status === "Pending" && (
								<td>
									<button
										onClick={() =>
											Handler(
												"get_equipment",
												"Accepted",
												equipmentRequests[i]._id
											)
										}>
										Accept
									</button>
									<button
										onClick={() =>
											Handler(
												"get_equipment",
												"Rejected",
												equipmentRequests[i]._id
											)
										}>
										Reject
									</button>
								</td>
							)}
						</tr>
					</>
				);
				data.push(temp);
			}
			// const temp = <p>Registered Mail : {allGroundRequests[i].useremail}</p>;
		}
		return data;
	};

	const pendingPlayfieldRequests = () => {
		const data = [];
		const playfieldRequests = allPlayfieldRequests;
		playfieldRequests.sort((a,b) => (a.approx_price / a.intended_age) - (b.approx_price / b.intended_age))
		for (let i in playfieldRequests) {
			// console.log(allPlayfieldRequests[i]);
			if (playfieldRequests[i].status === "Pending") {
				// const temp = <p>Registered Mail : {allGroundRequests[i].useremail}</p>;
				const temp = (
					<>
						<tr>
							<td>{playfieldRequests[i].useremail}</td>
							<td>{playfieldRequests[i].required_for}</td>
							<td>{playfieldRequests[i].intended_age}</td>
							{/* <td>{playfieldRequests[i].approx_usage}</td> */}
							<td>{playfieldRequests[i].addn_info}</td>

							<td>{`₹${numberWithCommas(
								playfieldRequests[i].approx_price
							)}`}</td>

							<td
								style={{
									color: getColour(
										playfieldRequests[i].status
									),
								}}>
								{playfieldRequests[i].status}
							</td>
							{playfieldRequests[i].status === "Pending" && (
								<td>
									<button
										onClick={() =>
											Handler(
												"get_playfield",
												"Accepted",
												playfieldRequests[i]._id
											)
										}>
										Accept
									</button>
									<button
										onClick={() =>
											Handler(
												"get_playfield",
												"Rejected",
												playfieldRequests[i]._id
											)
										}>
										Reject
									</button>
								</td>
							)}
						</tr>
					</>
				);
				data.push(temp);
			}
		}
		// console.log(allGroundRequests);

		return data;
	};

	return (
		<div>
			<Navbar user="Admin" />
			<div>
				{/* <p>
					Your Admin ID is <b>{user._id}</b>
				</p> */}
				<h2>All Pending Requests are : </h2>
				<h5>Pending Requests for Grounds : </h5>
				<div class="card-holder">
					<table>
						<tr>
							<th>Registered Mail</th>
							<th>Registered School / College</th>
							<th>Estimate about Ground Area</th>
							<th>Status of Ground</th>
							<th>Approx. Price</th>
							<th>Purpose for ground</th>
							<th>Additional Information</th>
							<th>Status</th>
							<th>Change Status</th>
						</tr>
						{pendingGroundRequests()}
					</table>
				</div>
				<h5>Pending Requests for Equipment : </h5>
				<div class="card-holder">
					<table>
						<tr>
							<th>Registered Mail</th>
							<th>Name of equipment needed</th>
							<th>Number of items</th>
							<th>Additional Information</th>
							<th>Approx. Price</th>
							<th>Status</th>
							<th>Change Status</th>
						</tr>
						{pendingEquipmentRequests()}
					</table>
				</div>
				<h5>Pending Requests for Playfield : </h5>
				<div class="card-holder">
					<table>
						<tr>
							<th>Registered Mail</th>
							<th>Purpose of playfield</th>
							<th>Intended age</th>
							{/* <th>Intended number of people</th> */}
							<th>Additional Information</th>
							<th>Approx. Price</th>
							<th>Status</th>
							<th>Change Status</th>
						</tr>
						{pendingPlayfieldRequests()}
					</table>
				</div>

				<h2>All Requests for Grounds : </h2>
				<div class="card-holder">
					<table>
						<tr>
							<th>Registered Mail</th>
							<th>Registered School / College</th>
							<th>Estimate about Ground Area</th>
							<th>Status of Ground</th>
							<th>Approx. Price</th>
							<th>Purpose for ground</th>
							<th>Additional Information</th>
							<th>Status</th>
							<th>Change Status</th>
						</tr>
						{groundData()}
					</table>
				</div>
				<br></br>
				<br></br>
				<h2>Request for Equipment : </h2>
				<div class="card-holder">
					<table>
						<tr>
							<th>Registered Mail</th>
							<th>Name of equipment needed</th>
							<th>Number of items</th>
							<th>Additional Information</th>
							<th>Approx. Price</th>
							<th>Status</th>
							<th>Change Status</th>
						</tr>
						{equipmentData()}
					</table>
				</div>

				<br></br>
				<br></br>
				<h2>Request for Playfield : </h2>
				<div class="card-holder">
					<table>
						<tr>
							<th>Registered Mail</th>
							<th>Purpose of playfield</th>
							<th>Intended age</th>
							<th>Approx. Price</th>
							<th>Additional Information</th>
							<th>Status</th>
							<th>Change Status</th>
						</tr>
						{playfieldData()}
					</table>
				</div>
			</div>
			<div>
				<br></br>
			</div>
		</div>
	);
};

export default ApplicationStatusAll;
