import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../index";

function Footer() {
	const subscribeHandler = (e) => {
		e.preventDefault();
		console.log('run');
	}
	return (
		<section>
			<section className="bg-gray-900 text-white py-8 px-4 sm:px-8 lg:px-16 xl:px-20">
				<div className="container mx-auto">
					<div className="flex flex-wrap justify-between">
						<div className="w-full sm:w-1/2 lg:w-1/4 mb-4 sm:mb-0">
							<Logo />
							<p className="mt-4">&copy; 2022 <Link to='https://mshehrozsarmad.github.io' target="_blank" >shehrozm107@gmail.com</Link> <br /> All rights reserved.</p>
						</div>
						<div className="w-full sm:w-1/2 lg:w-1/4 mb-4 sm:mb-0">
							<h3 className="text-lg font-semibold mb-2">Quick Links</h3>
							<ul className="list-none">
								<li><Link to="/">Home</Link></li>
								<li><Link to="/all-posts">Posts</Link></li>
								<li><Link to="/login">Signin</Link></li>
								<li><Link to="https://mshehrozsarmad.github.io" target="_blank">About</Link></li>
							</ul>
						</div>
						<div className="w-full sm:w-1/2 lg:w-1/4 mb-4 sm:mb-0">
							<h3 className="text-lg font-semibold mb-2">Social Media</h3>
							<ul className="list-none">
								<li><Link to="https://wa.me/+923424295275" target="_blank">Whatsapp</Link></li>
								<li><Link to="https://facebook.com" target="_blank">Facebook</Link></li>
								<li><Link to="https://instagram.com" target="_blank">Instagram</Link></li>
								<li><Link to="https://linkedin.com" target="_blank">LinkedIn</Link></li>
							</ul>
						</div>
						<div className="w-full sm:w-1/2 lg:w-1/4">
							<h3 className="text-lg font-semibold mb-2">Subscribe</h3>
							<p>Subscribe to our newsletter to get the latest updates.</p>
							<form className="mt-4" onSubmit={subscribeHandler}>
								<input type="email" placeholder="Enter your email" className="w-full py-2 px-4 rounded-lg bg-gray-800 text-white" />
								<button type="submit" className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-lg">Subscribe</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</section>
	);
}

export default Footer;
