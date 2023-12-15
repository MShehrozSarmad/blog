import "./App.css";
import { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				userData ? dispatch(login({ userData })) : dispatch(logout());
			})
			.finally(() => setLoading(false));
	}, []);
	
	return !loading ? (
		<div>
			<Header />
			<main>
				<Outlet/>
			</main>
			<Footer />
		</div>
	) : <div>loading...</div>;
}

export default App;