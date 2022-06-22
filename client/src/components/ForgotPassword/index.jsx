import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { Button, Spacer } from '@nextui-org/react';

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:8080/api/password-reset`;
			const { data } = await axios.post(url, { email });
			setMsg(data.message);
			setError("");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};

	return (
		<div className={styles.container}>
			<form className={styles.form_container} onSubmit={handleSubmit}>
				<div className={styles.vertical_centred}>

					<Spacer />
					<h1>Forgot Password</h1>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						required
						className={styles.input}
					/>
					{error && <div className={styles.error_msg}>{error}</div>}
					{msg && <div className={styles.success_msg}>{msg}</div>}
					<Spacer />
					<Button type="submit" color="secondary" flat>
						Submit
					</Button>
					<Spacer />

				</div>
			</form>
		</div>
	);
};

export default ForgotPassword;