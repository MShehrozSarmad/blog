import React, { useState } from "react";
import { Logo, LogoutBtn, Container } from "../index";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const authStatus = useSelector((state) => state.auth.status);
	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);
	const navItems = [
		{
			name: "Home",
			slug: "/",
			active: true,
		},
		{
			name: "Login",
			slug: "/login",
			active: !authStatus,
		},
		{
			name: "Signup",
			slug: "/signup",
			active: !authStatus,
		},
		{
			name: "All Posts",
			slug: "/all-posts",
			active: authStatus,
		},
		{
			name: "Add Post",
			slug: "/add-post",
			active: authStatus,
		},
	];

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="py-3 shadow bg-gray-900 text-white">
			<Container>
				<nav className="flex flex-wrap items-center justify-between">
					<div className="mr-4">
						<Link to="/">
							<Logo width="70px" />
						</Link>
					</div>
					<div className="ml-auto">
						<button
							className="block md:hidden text-white focus:outline-none"
							onClick={toggleMenu}
						>
							<svg
								className="h-6 w-6 fill-current"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								{isMenuOpen ? (
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M19 12H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2zm0-7H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2zm0 14H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2z"
									/>
								) : (
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
									/>
								)}
							</svg>
						</button>
					</div>
					<ul
						className={`${
							isMenuOpen ? "block" : "hidden"
						} md:flex md:flex-wrap md:items-center md:ml-auto`}
					>
						{navItems.map((item) =>
							item.active ? (
								<li key={item.name}>
									<button
										onClick={() => navigate(item.slug)}
										className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-gray-900 rounded-full"
									>
										{item.name}
									</button>
								</li>
							) : null
						)}
						{authStatus && (
							<>
								<li className="ml-4">
									<LogoutBtn />
								</li>
								<li className="inline-block px-6 py-2 duration-200 hover:text-gray-900 rounded-full" style={{ color: "white" }}>
									{userData?.name}
								</li>
							</>
						)}
					</ul>
				</nav>
			</Container>
		</header>
	);
};

export default Header;
