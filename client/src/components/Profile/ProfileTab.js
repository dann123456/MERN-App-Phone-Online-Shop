import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import styles from "../styles.module.css";
import { Button, Spacer, Input, Loading, Modal, Text } from '@nextui-org/react';
import jwt_decode from "jwt-decode";
import { Password } from './Password';

const ProfileTab = () => {

  const [input, setInput] = useState({ _id: "", firstname: "", lastname: "", email: "" });

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [errorPwd, setErrorPwd] = useState("");
  const [data, setData] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");


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



  function handleChange(event) {
    const { name, value } = event.target;

    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  }


  function handleUpdate(e) {
    e.preventDefault();

    setError("");
    input._id = userId._id;
    // input.firstname = "D"
    // input.lastname = "W"
    // input.email = "dw"

    console.log(input);

    if (input.firstname.length === 0 || input.lastname.length === 0 || input.email.length === 0) {
      setError("Please fill in the required fields")
    } else {


      setVisible(true);

    }
  };

  const handleSubmit = async (e) => {
    data.email = user[0].email;
    setError("");
    setMsg("");

    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);

      const editUser = {
        _id: input._id,
        firstname: input.firstname,
        lastname: input.lastname,
        email: input.email
      }

      axios.post(`http://localhost:8080/api/users/profile/edit/${userId._id}`, editUser);
      setMsg("Success! Your profile has been updated")

      setTimeout(function () { window.location.href = "/profile"; }, 2000);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setErrorPwd(error.response.data.message);
      }
    }

  }

  const handleDataChange = (event) => {
    const pwd = event.target.value;
    data.password = pwd;
  };

  // const handleChange = ({ currentTarget: input }) => {
  //   setData({ ...data, [input.name]: input.value });
  // };

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };



  // console.log(user.firstname)

  return (

    loading ? <div><Spacer y={10} /><div className="container d-flex justify-content-center"><Loading align="center" color="secondary" size="xl" /></div><Spacer y={10} /></div> :
      <div>
        <div className="container d-flex justify-content-center">
          <div className="row d-flex">
            <Spacer y={2} />
            <h2 className="text-center">Edit Profile</h2>
            <Spacer y={1} />
            {user.map((u, index) => (
              <form className="row justify-content-center" onSubmit={handleSubmit} key={index}>
                <label htmlFor="firstname">First Name:</label>
                <Input
                  type="text"
                  placeholder={u.firstname}
                  name="firstname"
                  // value={u.firstname}
                  onChange={handleChange}
                />
                <Spacer y={0.5} />
                <label htmlFor="lastname">Last Name:</label>
                <Input
                  type="text"
                  placeholder={u.lastname}
                  name="lastname"
                  // value={u.lastname}
                  onChange={handleChange}
                />
                <Spacer y={0.5} />
                <label htmlFor="email">E-mail:</label>
                <Input
                  type="email"
                  placeholder={u.email}
                  name="email"
                  // value={u.email}
                  onChange={handleChange}
                />
                <Spacer y={1} />
                {error && <div className={styles.error_msg}>{error}</div>}
                <Spacer y={1} />
                <Button flat color="secondary" onClick={handleUpdate}>Update Profile</Button>
                <Modal
                  closeButton
                  blur
                  aria-labelledby="modal-title"
                  open={visible}
                  onClose={closeHandler}
                >
                  <Modal.Header>
                    <Text id="modal-title" size={20}>
                      Please enter your password:
                    </Text>
                  </Modal.Header>
                  <Modal.Body>
                    <Input.Password
                      clearable
                      bordered
                      fullWidth
                      color="primary"
                      size="lg"
                      placeholder="Password"
                      onChange={handleDataChange}
                      contentLeft={<Password fill="currentColor" />}

                    />
                    {errorPwd && <div className={styles.error_msg}>{errorPwd}</div>}
                    {msg && <div className={styles.success_msg}>{msg}</div>}
                  </Modal.Body>
                  <Modal.Footer className="d-flex justify-content-center">
                    <Button type="submit" onClick={handleSubmit} auto flat>
                      Submit
                    </Button>
                    {/* <Button auto flat onClick={closeHandler}>
                      No
                    </Button> */}
                  </Modal.Footer>
                </Modal>
                <Spacer y={2} />
              </form>
            ))}
          </div>
        </div>
      </div>
  );
}

export default ProfileTab;