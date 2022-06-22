import React, { useState, useEffect } from 'react';
import { Input, Button, Text, Spacer, Modal } from '@nextui-org/react';
import { UserIcon } from './UserIcon';
import { CartIcon } from './CartIcon';
import { LogOutIcon } from './LogOutIcon';
import { SearchIcon } from './SearchIcon';
import { LogInIcon } from './LogInIcon';
import { NavLink } from 'react-router-dom';


const Navbar = () => {

    const [searchTerm, setST] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const user = localStorage.getItem("token");

    var isloggedin;
    if (user) {
        isloggedin = true;
    }
    else {
        isloggedin = false;
    }

    var cart;

    useEffect(() => {
        async function fetchData() {
            cart = localStorage.getItem("cart")
            console.log(cart);
        }

        fetchData();

        return;
    });

    var cQty;

    if (localStorage.getItem("cart") === null) {
        cQty = 0;
        localStorage.setItem("products", []);
    } else {
        cQty = localStorage.getItem("cart");
    }

    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <div>
                        <NavLink className="nav-link" to="/">
                            <Text h1 css={{
                                textGradient: '45deg, $purple800 -20%, $purple500 50%'
                            }}
                                weight="bold">SellPhone</Text>
                        </NavLink>
                    </div>

                    <div className="collapse navbar-collapse flex-column my-auto mx-auto" id="navbarCollapse">
                        <Spacer />
                        <div className="navbar-nav mb-lg-0 text-center">
                            <Input clearable bordered placeholder="Search all mobile phones.." width="400px" value={searchTerm} onKeyDown={(e) => { if (e.key === 'Enter') { window.location.href = `/search?q=${searchTerm}` } }} onChange={(evt) => { setST(evt.target.value) }}></Input>
                            <NavLink className="nav-link" style={{ color: "black" }} to={`/search?q=${searchTerm}`}>
                                <Button.Group color="secondary" light><Button icon={<SearchIcon fill="currentColor" />} flat auto></Button></Button.Group></NavLink>
                        </div>

                        <div className="navbar-nav mb-lg-0 align-items-center">
                            <Button.Group color="black" light css={{ margin: 'auto' }} size="lg">
                                <NavLink className="nav-link" style={{ color: "black" }} to="/"> <Button>Home</Button></NavLink>
                                <NavLink className="nav-link" style={{ color: "black" }} to="/products"><Button>Products</Button></NavLink>
                                <NavLink className="nav-link" style={{ color: "black" }} to="/about"><Button>About</Button></NavLink>
                                <NavLink className="nav-link" style={{ color: "black" }} to="/contact"><Button>Contact</Button></NavLink>
                            </Button.Group>
                        </div>

                    </div>
                    <div>


                        {isloggedin ? (
                            <Button.Group color="secondary" light>
                                <Button onClick={(e) => { window.location.href = "/checkout"; }} icon={<CartIcon fill="currentColor" />} flat auto>
                                    <span className="position-absolute top-10 translate-right badge rounded-pill bg-danger">{cQty}</span></Button>
                                <Button onClick={(e) => { window.location.href = "/profile"; }} icon={<UserIcon fill="currentColor" />} flat auto></Button>
                                <Button onClick={handler} icon={<LogOutIcon fill="currentColor" />} flat auto></Button>
                                <Modal
                                    closeButton
                                    blur
                                    aria-labelledby="modal-title"
                                    open={visible}
                                    onClose={closeHandler}
                                >
                                    <Modal.Header>
                                        <Text id="modal-title" size={20}>
                                            Are you sure you want to log out?
                                        </Text>
                                    </Modal.Header>
                                    <Modal.Footer className="d-flex justify-content-center">
                                        <Button auto flat color="error" onClick={handleLogout}>
                                            Yes
                                        </Button>
                                        <Button auto flat onClick={closeHandler}>
                                            No
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Button.Group>
                        ) : (
                            <Button.Group color="secondary" light>
                                {/* <Button onClick={(e) => { window.location.href = "/signup"; }} icon={<SignUpIcon fill="currentColor" />} flat auto></Button> */}
                                <Button onClick={(e) => { window.location.href = "/login"; }} icon={<LogInIcon fill="currentColor" />} flat auto></Button>
                            </Button.Group>
                        )}
                    </div>
                </div>
            </nav >
        </div >
    );
}

export default Navbar;