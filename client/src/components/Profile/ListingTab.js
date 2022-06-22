import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, Text, Spacer, Loading, Table, Checkbox } from '@nextui-org/react';
import axios from "axios";
import styles from "../styles.module.css";
import jwt_decode from "jwt-decode";

const ListingTab = () => {
  const user = localStorage.getItem("token");

  var isloggedin;
  if (user) {
    isloggedin = true;
  }
  else {
    isloggedin = false;
  }

  const [phones, setPhones] = useState([]);
  const [input, setInput] = useState({ title: "", brand: "", image: "imageurl", stock: 0, price: "", seller: "", disabled: false, reviews: [] });
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [selected, setSelected] = React.useState(true);

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");


  const token = localStorage.getItem("token");
  var userId;
  var disabled = false;

  try {
    const decoded = jwt_decode(token);
    userId = decoded;
  } catch (exception) {
    console.log(exception);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/users/profile/phones/${userId._id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const phone = await response.json();
      setPhones(phone);
      setLoading(false);
    }

    fetchData();

    return;
  }, [phones.length]);

  async function handleSubmit() {
    input.seller = userId._id;

    setError("");
    setMsg("");

    if (input.title.length === 0 || input.brand.length === 0 || input.price.length === 0) {
      setError("Please fill in the required fields")
    } else {

      if (isNaN(input.stock) || Number(input.stock) < 0) {
        setError("Please enter a valid number for stock")
      } else {


        if (parseFloat(input.price)) {
          input.stock = Number(input.stock)
          input.disabled = disabled;

          console.log(input.disabled);

          const newPhone = {
            title: input.title,
            brand: input.brand,
            image: input.image,
            stock: input.stock,
            price: input.price,
            seller: input.seller,
            disabled: input.disabled,
            reviews: input.reviews

          }

          axios.post(`http://localhost:8080/api/users/profile/phones/${userId._id}`, newPhone);
          setMsg("Success! Your listing has been added")
          window.location.reload()


        } else {
          setError("Please enter a valid price")


        }
      }

    }
  }

  async function setSelected() {
    if (disabled === true) {
      disabled = false;
    } else {
      disabled = true;
    }
  }

  async function removeItemfromCart(id) {

    axios.post(`http://localhost:8080/api/users/profile/phones/remove/${id}`)
    window.location.reload()


  }

  async function modifyItem(id, disabledItem) {

    console.log(disabledItem)
    if (disabledItem.length != 0) {
      axios.post(`http://localhost:8080/api/users/profile/phones/enable/${id}`)
    } else {
      axios.post(`http://localhost:8080/api/users/profile/phones/disable/${id}`)
    }
    // window.location.reload()

  }


  return (
    loading ? <div><Spacer y={10} /><div className="container d-flex justify-content-center"><Loading align="center" color="secondary" size="xl" /></div><Spacer y={10} /></div> :
      <div>
        <div className="container d-flex justify-content-center border-bottom">
          <div className="row d-flex">
            <Spacer y={2} />
            <h2 className="text-center">Add Listing</h2>
            <Spacer y={1} />
            <form className="row justify-content-center" onSubmit={handleSubmit} >
              <label htmlFor="title">Title:</label>
              <Input
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChange}
              />
              <Spacer y={0.5} />
              <label htmlFor="brand">Brand:</label>
              <Input
                type="text"
                placeholder="Brand"
                name="brand"
                onChange={handleChange}
              />
              <Spacer y={0.5} />
              <label htmlFor="stock">Stock:</label>
              <Input
                type="text"
                placeholder="Stock"
                name="stock"
                onChange={handleChange}
              />
              <Spacer y={0.5} />
              <label htmlFor="price">Price:</label>
              <Input
                type="text"
                placeholder="Price"
                name="price"
                onChange={handleChange}
              />
              <Spacer y={1} />
              <Checkbox color="secondary" defaultSelected={true} onChange={setSelected} size="sm">Enabled</Checkbox>
              <Spacer y={1} />
              {error && <div className={styles.error_msg}>{error}</div>}
              {msg && <div className={styles.success_msg}>{msg}</div>}

              <Button flat color="secondary" onClick={handleSubmit}>Add Listing</Button>
              <Spacer y={2} />
            </form>

          </div>
        </div>
        <div>
          <div className="container">
            <div className="row d-flex">
              <Spacer y={2} />
              <h2 className="text-center">My Listings</h2>
              <Spacer y={1} />

              <Table
                shadow={false}
                color="secondary"
                aria-label="Reviews"
                css={{
                  height: "auto",
                  width: "100%",
                  tableLayout: "fixed",
                }}
              >
                <Table.Header>
                  <Table.Column width="45%" >Title</Table.Column>
                  <Table.Column width="10%" >Brand</Table.Column>
                  <Table.Column width="7.5%" >Stock</Table.Column>
                  <Table.Column width="7.5%" >Price</Table.Column>
                  <Table.Column width="10%" >Disabled</Table.Column>
                  <Table.Column width="10%" ></Table.Column>
                  <Table.Column width="10%" ></Table.Column>
                </Table.Header>
                <Table.Body>
                  {phones.map((phone, index) => (
                    <Table.Row key={index}>
                      <Table.Cell css={{ whiteSpace: "normal" }}><Text css={{ wordWrap: "break-word" }}>{phone.title}</Text></Table.Cell>
                      <Table.Cell css={{ whiteSpace: "normal" }}><Text css={{ wordWrap: "break-word" }}>{phone.brand}</Text></Table.Cell>
                      <Table.Cell css={{ whiteSpace: "normal" }}><Text css={{ wordWrap: "break-word" }}>{phone.stock}</Text></Table.Cell>
                      <Table.Cell css={{ whiteSpace: "normal" }}><Text css={{ wordWrap: "break-word" }}>${phone.price}</Text></Table.Cell>
                      <Table.Cell css={{ whiteSpace: "normal" }}><Text css={{ wordWrap: "break-word" }}>{phone.disabled}</Text></Table.Cell>
                      <Table.Cell css={{ whiteSpace: "normal" }}><Text css={{ wordWrap: "break-word" }}><Button flat auto onClick={() => modifyItem(phone._id, phone.disabled)}>Update</Button></Text></Table.Cell>
                      <Table.Cell css={{ whiteSpace: "normal" }}><Text css={{ wordWrap: "break-word" }}><Button color="error" flat auto onClick={() => removeItemfromCart(phone._id)}>Remove</Button></Text></Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>


              </Table>
              <Spacer />

            </div>
            <div className="row d-flex align-items-center">
              <Spacer y={1.5} />


            </div>
          </div >
        </div>
      </div>
  )
}
export default ListingTab;




