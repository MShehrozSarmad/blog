// import React, { useState, useEffect } from "react";
// import dbService from "../appwrite/config";
// import { Container, PostCard } from "../components/index";

// const Home = () => {
// 	const [posts, setposts] = useState([]);

// 	useEffect(() => {
// 		dbService.getPosts().then((possts) => {
// 			possts ? setposts(possts.documents) : null;
// 		});
// 	}, []);

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dbService from "../appwrite/config";
import { Container, PostCard } from "../components/index";
import { setPosts as stPstsSlc, clearPosts } from "../store/postSlice";
const Home = () => {
	const posts = useSelector((state) => state.postSlc); // access the posts state
	const authStatus = useSelector((state) => state.auth.status);
	const dispatch = useDispatch();

	useEffect(() => {
		if (authStatus) {
			dbService.getPosts().then((possts) => {
				possts
					? dispatch(stPstsSlc(possts.documents))
					: dispatch(clearPosts());
			});
		} else {
			dispatch(clearPosts()); // clear posts when not authenticated
		}
	}, [authStatus, dispatch]);

	if (posts.length === 0) {
		return (
			<div className="w-full py-8 mt-4 text-center">
				<Container>
					<div className="flex flex-wrap">
						<div className="p-2 w-full">
							<h1 className="text-2xl font-bold hover:text-gray-500">
								Login to read posts
							</h1>
						</div>
					</div>
				</Container>
			</div>
		);
	}

	return (
		<div className="w-full py-8">
			<Container>
				<div className="flex flex-wrap">
					{posts.map((post) => (
						<div key={post.$id} className="p-2 w-1/4">
							<PostCard {...post} />
						</div>
					))}
				</div>
			</Container>
		</div>
	);
};

export default Home;
