import React, { useState, useEffect } from "react";
import dbService from "../appwrite/config";
import { PostCard, Container } from "../components/index";

const AllPosts = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		dbService.getPosts([]).then((post) => {
			post ? setPosts(posts.documents) : null;
		});
	}, []);

	return (
		<div className="w-full py-8">
			<Container>
				<div className="flex flex-wrap">
					{posts.map((post) => (
						<div key={post.$id} className="p-2 w-1/4">
							<PostCard post={post} />
						</div>
					))}
				</div>
			</Container>
		</div>
	);
};

export default AllPosts;
