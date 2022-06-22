import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import { Button, Spacer } from '@nextui-org/react';

const Signup = () => {
	const [data, setData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			setMsg(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<NavLink className="nav-link" to="/login">
						<Button type="submit" color="secondary" flat>
							Login
						</Button>
					</NavLink>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstname"
							onChange={handleChange}
							value={data.firstname}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastname"
							onChange={handleChange}
							value={data.lastname}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}
						<Spacer y={0.5} />
						<Button type="submit" color="secondary" flat>
							Sign Up
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
