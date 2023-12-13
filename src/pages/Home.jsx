import React, { useState, useEffect } from "react";
import dbService from "../appwrite/config";
import { Container, PostCard } from "../components/index";

const Home = () => {
	const [posts, setposts] = useState([]);

	useEffect(() => {
		dbService.getPosts().then((possts) => {
			possts ? setposts(possts.documents.documents) : null;
		});
	}, []);

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
							{/* <PostCard post={posts} /> */}
						</div>
					))}
				</div>
			</Container>
		</div>
	);
};

export default Home;
