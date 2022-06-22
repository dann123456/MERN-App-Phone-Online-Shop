import React from 'react'
import { Navigate } from 'react-router-dom'
import Profile from '.';



const useAuth = () => {
	const user = localStorage.getItem("token");
	if (user) {
		return true
	} else {
		return false
	}
}


const ProtectedRoute = () => {
	const auth = useAuth();
	return auth ? < Profile /> : <Navigate to="/login" />;
}

export default ProtectedRoute;