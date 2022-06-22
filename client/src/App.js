import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Product from './components/Product';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Search from './components/Search';
import Profile from './components/Profile';
import CheckOut from './components/CheckOut';
import ProtectedRoute from './components/Profile/ProtectedRoute';
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";

// localStorage.setItem("cart", 0);
// localStorage.setItem("products", []);

function App() {

	const user = localStorage.getItem("token");
	const location = useLocation();
	var isloggedin;
	if (user) {
		isloggedin = true;
	}
	else {
		isloggedin = false;
	}

	return (
		<>
			{location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/checkout" && location.pathname !== "/forgot-password" && location.pathname !== "/password-reset" && location.pathname !== "/profile" && <Navbar />}
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/search" element={<Search />} />
				<Route exact path="/search/q" element={<Search />} />
				<Route exact path="/products" element={<Products />} />
				<Route exact path="/product/:id" element={<Product />} />
				<Route exact path="/about" element={<About />} />
				<Route exact path="/contact" element={<Contact />} />
				<Route exact path="/profile" element={< ProtectedRoute />} />
				<Route exact path="/checkout" element={<CheckOut />} />
				{user && <Route path="/" exact element={<Main />} />}
				<Route path="/signup" exact element={<Signup />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/" element={<Navigate replace to="/login" />} />
				<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
			</Routes>
			{location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/checkout" && location.pathname !== "/forgot-password" && location.pathname !== "/password-reset" && location.pathname !== "/profile" && <Footer />}
		</>
	);
}

export default App;
