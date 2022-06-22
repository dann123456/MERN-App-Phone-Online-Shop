import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles.module.css";
import { Button, Spacer, Loading, Input } from '@nextui-org/react';
import jwt_decode from "jwt-decode";

const PasswordTab = () => {

  const [user, setUser] = useState([]);
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [pwd, setPwd] = useState("");
  const token = localStorage.getItem("token");
  var userId;

  try {
    const decoded = jwt_decode(token);
    userId = decoded;
  } catch (exception) {
    console.log(exception);
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const response = await fetch(`http://localhost:8080/api/users/profile/${userId._id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const user = await response.json();
      // setData(user);
      setUser(user);
      setLoading(false);

    }

    fetchData();
    return;
  }, [userId._id]);



  const handleChange = (event) => {
    const newPwd = event.target.value;
    setPwd(newPwd);
  };

  const handleCurrentPassword = (event) => {
    const pwd = event.target.value;
    data.password = pwd;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    data.email = user[0].email;
    setError("");
    setMsg("");

    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);

      const password = { password: pwd }

      axios.post(`http://localhost:8080/api/users/profile/pass/${userId._id}`, password);

      setMsg("Success! Your password has been updated")

    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }



    // try {
    //   const url = `http://localhost:8080/api/users/profile/pass/${userId._id}`;
    //   const { data: res } = await axios.post(url, data);
    //   localStorage.setItem("token", res.data);
    // } catch (error) {
    //   if (
    //     error.response &&
    //     error.response.status >= 400 &&
    //     error.response.status <= 500
    //   ) {
    //     setError(error.response.data.message);
    //   }
    // }
  };

  return (
    loading ? <div><Spacer y={10} /><div className="container d-flex justify-content-center"><Loading align="center" color="secondary" size="xl" /></div><Spacer y={10} /></div> :
      <div>
        <div className="container d-flex justify-content-center">
          <div className="row d-flex">
            <Spacer y={2} />
            <h2 className="text-center">Change Password</h2>
            <Spacer y={1} />
            <form className="row justify-content-center" onSubmit={handleSubmit}>
              <label htmlFor="currPassword">Current Password:</label>
              <Input.Password
                type="password" Î
                placeholder="Current Password"
                name="currPassword"
                onChange={handleCurrentPassword}
                required
              />
              <Spacer y={0.5} />
              <label htmlFor="newPassword">New Password:</label>
              <Input.Password
                type="password"
                placeholder="New Password"
                name="newPassword"
                onChange={handleChange}
                required
              />
              <Spacer y={1} />
              {error && <div className={styles.error_msg}>{error}</div>}
              {msg && <div className={styles.success_msg}>{msg}</div>}
              <Spacer y={1} />
              <Button type="submit" color="secondary" flat>
                Update Password
              </Button>
              <Spacer y={2} />
            </form>
          </div>
        </div>
      </div>

  );
};

export default PasswordTab;