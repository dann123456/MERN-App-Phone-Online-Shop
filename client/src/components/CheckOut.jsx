import React, { useState, useEffect } from 'react';
import styles from "./styles.module.css";
import { Button, Text, Card, Spacer, Table } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import axios from "axios";

const CheckOut = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            var products = JSON.parse(localStorage.getItem("products"));

            if (products === null) {
                return null;
            } else {

                setData(JSON.parse(localStorage.getItem("products")));
                console.log(data);
                setLoading(false);

            }

        }

        fetchData();

        return;
    }, []);

    console.log(data);

    const handleConfetti = () => {

        setError("");
        setMsg("");

        if (Number(localStorage.getItem("cart")) === 0) {
            setError("You have 0 items in your cart. Your order cannot be placed.");
        } else {
            confetti({
                particleCount: 300,
                startVelocity: 60,
                spread: 120
            });

            console.log(data);

            axios.post(`http://localhost:8080/api/phones/checkout`, data);

            setMsg("Success! Order placed. Redirecting you to the home page..");
            localStorage.setItem("products", []);
            localStorage.setItem("cart", 0);
            setTimeout(function () { window.location.href = "/"; }, 3000);

        }

    };

    function emptyCart() {
        localStorage.setItem("products", []);
        localStorage.setItem("cart", 0);
        window.location.reload();
    }

    var cartTotal = 0;
    data.forEach((item) => {
        cartTotal = parseFloat(cartTotal) + parseFloat((Math.round(item.price * item.qty * 100) / 100).toFixed(2));
    });

    function removeItemfromCart(id, qty) {
        const filtered = data.filter(item => item._id !== id);
        const cart = localStorage.getItem("cart");
        localStorage.setItem("cart", (Number(cart) - qty));
        localStorage.setItem("products", JSON.stringify(filtered));
        window.location.reload();

    }

    function modifyQty(id, currentQty, stock) {
        var input = prompt("Please enter the new quantity: ");
        if (isNaN(input)) {
            alert("Please enter a valid number.")
        } else {
            var qty = Number(input);
            const cart = localStorage.getItem("cart");
            if (qty > 0) {
                if (qty > stock) {
                    alert(`Insufficient quantity. Please enter a number less than or equal to the available stock: ${stock}`)
                } else {
                    if (qty > currentQty) {
                        var temp = qty - currentQty;
                        console.log(temp);
                        localStorage.setItem("cart", (Number(cart) + temp));
                    } else if (qty < currentQty) {
                        var temp = currentQty - qty;
                        localStorage.setItem("cart", (Number(cart) - temp));
                    }

                    let products = [];

                    if (localStorage.getItem('products')) {
                        products = JSON.parse(localStorage.getItem('products'));
                    }

                    for (var i = 0; i < products.length; i++) {
                        if (id === products[i]._id) {
                            products[i].qty = qty;
                            break;
                        }
                    }

                    localStorage.setItem('products', JSON.stringify(products));
                    window.location.reload();
                }

            } else if (qty === 0) {
                localStorage.setItem("cart", (Number(cart) - currentQty));
                const filtered = data.filter(item => item._id !== id);
                localStorage.setItem("products", JSON.stringify(filtered));
                alert("This item has been removed from cart.")
                window.location.reload();
            } else {
                alert("Please enter a number.")
            }
        }
    }


    return (

        // loading ? <div><Spacer y={10} /><div className="container d-flex justify-content-center"><Loading align="center" color="secondary" size="xl" /></div><Spacer y={10} /></div> :
        <div >
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="px-4 pt-5 my-5 text-center">
                            <Card>
                                <Spacer y={2} />
                                <Text className="text-center" h1>Checkout</Text>
                                <Spacer />
                                <div className="d-flex justify-content-between">
                                    <Button flat color="secondary" auto onClick={(e) => { window.location.href = "/"; }}>Back</Button>
                                    <Button flat color="error" auto onClick={emptyCart}>Empty cart</Button>
                                </div>
                                <Spacer />

                                <Table
                                    shadow={false}
                                    aria-label="Reviews"
                                    css={{
                                        height: "auto",
                                        width: "100%",
                                        tableLayout: "fixed",
                                    }}
                                >
                                    <Table.Header>
                                        <Table.Column width="60%">Product</Table.Column>
                                        <Table.Column width="8%" >Price</Table.Column>
                                        <Table.Column width="6%" >Quantity</Table.Column>
                                        <Table.Column width="8%">Total</Table.Column>
                                        <Table.Column width="18%" ></Table.Column>
                                        {/* <Table.Column width="8%" ></Table.Column> */}
                                    </Table.Header>
                                    <Table.Body>
                                        {data.map(item => (
                                            <Table.Row>
                                                <Table.Cell css={{ whiteSpace: "normal" }}><Text css={{ wordWrap: "break-word" }}>{item.title}</Text></Table.Cell>
                                                <Table.Cell css={{ whiteSpace: "normal" }}><Text css={{ wordWrap: "break-word" }}>${item.price}</Text></Table.Cell>
                                                <Table.Cell css={{ whiteSpace: "normal" }}><Text css={{ wordWrap: "break-word" }}>{item.qty}</Text></Table.Cell>
                                                <Table.Cell css={{ whiteSpace: "normal" }}><Text css={{ wordWrap: "break-word" }}>${(Math.round(item.price * item.qty * 100) / 100).toFixed(2)}</Text></Table.Cell>
                                                <Table.Cell css={{ whiteSpace: "normal" }}><Text css={{ wordWrap: "break-word" }}> <div className="d-flex justify-content-between"><Button color="primary" flat auto onClick={() => modifyQty(item._id, item.qty, item.stock)}>Modify</Button><Button color="error" flat auto onClick={() => removeItemfromCart(item._id, item.qty)}>Remove</Button></div></Text></Table.Cell>
                                            </Table.Row>

                                        ))}
                                    </Table.Body>

                                </Table>
                                <Spacer y={4} />
                                <div className="d-flex justify-content-center">
                                    <Text h4>Your Total: ${cartTotal}</Text>
                                </div>
                                <Spacer y={1} />
                                {error && <div className={styles.error_msg}>{error}</div>}
                                {msg && <div className={styles.success_msg}>{msg}</div>}
                                <Spacer y={1} />
                                <Button color="secondary" flat auto ripple={false}
                                    size="xl" onClick={handleConfetti}>Place Order</Button>
                                <Spacer y={2} />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;



