import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Text, Card, Spacer, Loading, Table, Radio, Textarea } from '@nextui-org/react';
import axios from "axios";
import styles from "./styles.module.css";
import jwt_decode from "jwt-decode";

const Product = () => {

    const storedCart = JSON.parse(localStorage.getItem("cart")) || 0;
    const [cart, setCart] = useState(storedCart);

    const [phone, setPhone] = useState([]);
    const [seller, setSeller] = useState([]);
    const [reviews, setReview] = useState([]);
    const [reviewer, setReviewer] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showMoreR, setShowMoreR] = useState(false);
    const [showMoreT, setShowMoreT] = useState(false);

    const [input, setInput] = useState({ user: "", comment: "", rating: 0 });

    const [error, setError] = useState("");
    const [errorOOS, setErrorOOS] = useState("");
    const [msg, setMsg] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    function setRating(e) {
        input.rating = e;
    }

    const id = params.id.toString();
    const token = localStorage.getItem("token");
    var userId;

    try {
        const decoded = jwt_decode(token);
        userId = decoded;
    } catch (exception) {
        console.log(exception);
    }

    var isloggedin;
    if (token) {
        isloggedin = true;
    }
    else {
        isloggedin = false;
        //localStorage.setItem("product_id_state", params.id);
        //window.location = "/";
    }

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/api/phones/product/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const phone = await response.json();
            if (!phone) {
                window.alert(`Phone with id ${id} not found`);
                navigate("/");
                return;
            }

            setPhone(phone);
            setSeller(phone.seller);
            setReview(phone.reviews);
            setLoading(false);

        }

        fetchData();

        return;
    }, [params.id, navigate]);

    useEffect(() => {

        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    function handleSubmit(event) {
        setError("");
        setMsg("");
        setErrorOOS("");
        input.user = userId;
        console.log(input);

        if (input.comment.length === 0) {
            setError("Please enter a comment")
        } else if (input.rating === 0) {
            setError("Please select a rating")
        } else {

            const newReview = {
                reviewer: input.user,
                rating: input.rating,
                comment: input.comment
            }

            axios.post(`http://localhost:8080/api/phones/review/${params.id}`, newReview)

            setMsg("Success. Your review has been posted. Please refresh the page!")

        }

    }

    function popupATC() {

        if (phone.stock == 0) {
            setErrorOOS("Sorry, this phone is Out of Stock!");
        } else {
            var input = prompt("Please enter the quantity: ");
            if (isNaN(input)) {
                alert("Please enter a valid number.")
            } else {
                var qty = Number(input);

                if (qty > phone.stock) {
                    alert(`Insufficient quantity. Please enter a number less than or equal to the available stock: ${phone.stock}`)

                } else if (qty > 0) {
                    var t_qty = Number(cart);
                    t_qty = t_qty + qty;
                    setCart(t_qty);
                    localStorage.setItem("cart", t_qty);

                    // var temp = phone.stock-qty;

                    // const updatedPhone = {
                    //     _id : phone._id,
                    //     title : phone.title,
                    //     brand : phone.brand,
                    //     image : phone.image,
                    //     stock : temp,
                    //     seller : phone.seller,
                    //     reviews : phone.reviews,
                    //     disabled : phone.disabled

                    // }

                    // setPhone(updatedPhone);

                    let products = [];
                    let itemExists = false;
                    if (localStorage.getItem('products')) {
                        products = JSON.parse(localStorage.getItem('products'));
                    }

                    itemExists = products.some(phone => phone._id === id);

                    const newProduct = { '_id': id, 'title': phone.title, 'price': phone.price, 'qty': qty, 'stock': phone.stock };

                    if (itemExists) {

                        for (var i = 0; i < products.length; i++) {
                            if (newProduct._id === products[i]._id) {
                                products[i].qty += newProduct.qty;
                                break;
                            }
                        }

                    } else {
                        products.push(newProduct);
                    }

                    localStorage.setItem('products', JSON.stringify(products));
                    window.location.reload();

                } else {
                    alert("Please enter a positive number.")
                }
            }
        }
    }

    return (

        loading ? <div><Spacer y={10} /><div className="container d-flex justify-content-center"><Loading align="center" color="secondary" size="xl" /></div><Spacer y={10} /></div> :
            <div>
                <Spacer y={3} />
                <div className="container border-bottom">
                    <Card>
                        <Spacer y={1.5} />
                        <div className="row d-flex">
                            <div className="col-md-6 d-flex my-auto flex-column align-items-center">
                                <img src={'/assets/phone_default_images/' + phone.brand + '.jpeg'} alt={phone.title} height="400px" width="400px" />
                            </div>
                            <div className="col-md-6 d-flex my-auto flex-column">
                                <Text h5 className="text-uppercase text-black-50" >
                                    {phone.brand}
                                </Text>
                                <Text h3>{phone.title}</Text>
                                <Spacer />
                                <Text>Availability: {phone.stock} In Stock</Text>
                                {/* <Text>Rating: {phone.stock}</Text> */}
                                <Spacer />
                                <Text>Sold by: {seller.firstname} {seller.lastname}</Text>
                                <Spacer />
                                <Text h2>${phone.price}</Text>
                                <Spacer />
                                {errorOOS && <div className={styles.error_msg}>{errorOOS}</div>}
                                {isloggedin ? (
                                    <Button flat color="secondary" auto onClick={() => popupATC()} >Add to Cart</Button>
                                ) : (
                                    <Button onClick={(e) => { window.location.href = "/login"; }} flat color="secondary">Login and Add to Cart</Button>
                                )}
                            </div>
                        </div>
                        <Spacer y={1.5} />
                    </Card>
                    <Spacer y={1.5} />
                </div >
                <div className="container">
                    <div className="row d-flex">
                        <Spacer y={1} />
                        <h2 className="text-center">Reviews</h2>
                        <Spacer y={1} />
                        <Card>
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
                                    <Table.Column width="18%">Reviewed By</Table.Column>
                                    <Table.Column width="75%" >Comment</Table.Column>
                                    <Table.Column width="7%" >Rating</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {reviews.map((review, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell css={{ whiteSpace: "normal" }}><Text css={{ wordWrap: "break-word" }}>{`${review.reviewer.firstname} ${review.reviewer.lastname}`}</Text></Table.Cell>
                                            <Table.Cell css={{ whiteSpace: "normal" }}><Text css={{ wordWrap: "break-word" }}>

                                                {showMoreR ? review.comment : `${review.comment.substring(0, 200)}`}

                                                {review.comment.length > 200 ? <Button bordered color="secondary" auto size="xs" light onClick={() => setShowMoreR(!showMoreR)}>
                                                    {showMoreR ? "Show less" : "Show more"}</Button> : null}

                                                {/* <Button size="xs" light onClick={() => setShowMore(!showMore)}>
                                                {showMore ? "Show less" : "Show more"}</Button> */}
                                            </Text></Table.Cell>
                                            <Table.Cell css={{ whiteSpace: "normal" }}><Text css={{ wordWrap: "break-word" }}>{review.rating} / 5</Text></Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>

                                <Table.Pagination
                                    shadow
                                    noMargin
                                    align="center"
                                    rowsPerPage={3}
                                    onPageChange={(page) => console.log({ page })}
                                />
                            </Table>
                            <Spacer />
                            {/* <Button flat color="secondary">Show more</Button> */}
                        </Card>
                    </div>
                    <div className="row d-flex align-items-center">
                        <Spacer y={1.5} />
                        <Card>
                            <Spacer />
                            <h4 className="text-center">Write a Review</h4>
                            <Textarea label="Comment" name="comment" onChange={handleChange} placeholder="Write here.." />
                            <Spacer />
                            <div className="d-flex my-auto flex-column align-items-center">
                                How would you rate this product out of 5?
                                <Spacer />
                                {/* {event => handleChange(event)}  */}
                                <Radio.Group row name="rating" value={input.rating} label="Rating" >
                                    <Radio value="1" checked={input.rating === 1}
                                        onChange={() => setRating(1)} size="sm" color="secondary">
                                        1
                                    </Radio>
                                    <Spacer />
                                    <Radio value="2" checked={input.rating === 2} onChange={() => setRating(2)} size="sm" color="secondary">
                                        2
                                    </Radio>
                                    <Spacer />
                                    <Radio value="3" checked={input.rating === 3} onChange={() => setRating(3)} size="sm" color="secondary">
                                        3
                                    </Radio>
                                    <Spacer />
                                    <Radio value="4" checked={input.rating === 4} onChange={() => setRating(4)} size="sm" color="secondary">
                                        4
                                    </Radio>
                                    <Spacer />
                                    <Radio value="5" checked={input.rating === 5} onChange={() => setRating(5)} size="sm" color="secondary">
                                        5
                                    </Radio>
                                </Radio.Group>
                            </div>
                            <Spacer />
                            {error && <div className={styles.error_msg}>{error}</div>}
                            {msg && <div className={styles.success_msg}>{msg}</div>}

                            {isloggedin ? (
                                <Button type="submit" onPress={handleSubmit} flat color="secondary">Submit</Button>
                            ) : (
                                <Button onClick={(e) => { window.location.href = "/login"; }} flat color="secondary">Login and Submit</Button>
                            )}

                            <Spacer />
                        </Card>

                    </div>
                </div >
            </div>
    );
};

export default Product;