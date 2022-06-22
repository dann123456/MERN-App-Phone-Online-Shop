import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import { Button, Spacer } from '@nextui-org/react';

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
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
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
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
						<NavLink to="/forgot-password" style={{ alignSelf: "center" }}>
							<p style={{ padding: "0 15px" }}>Forgot Password?</p>
						</NavLink>

						{error && <div className={styles.error_msg}>{error}</div>}
						<Spacer y={0.5} />
						<Button type="submit" color="secondary" flat>
							Login
						</Button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here?</h1>
					<NavLink className="nav-link" to="/signup">
						<Button type="button" color="secondary" flat>
							Sign Up
						</Button>
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Login;
