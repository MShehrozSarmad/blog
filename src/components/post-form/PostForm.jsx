import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RTE, Button, Select, Input } from "../index";
import dbService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
	const [contentLoading, setContentLoading] = useState(true);

	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm({
			defaultValues: {
				title: post?.title || "",
				slug: post?.slug || "",
				content: post?.content || "",
				status: post?.status || "active",
			},
		});

	useEffect(() => {
		if (post) {
			setValue("title", post.title);
			setValue("content", post.content);
			setValue("status", post.status);
			post.content && post.featuredImg
				? setContentLoading(false)
				: setContentLoading(true);
			console.log(post);
		} else {
			setContentLoading(false);
		}
		// console.log("---------------------------------------");
		// console.log("ye chx => post, loading", post, contentLoading);
		// console.log("ye chx2 => post && loading = ", post && contentLoading);
		// console.log("---------------------------------------");
	}, [post, setValue]);

	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);

	const submit = async (data) => {
		console.log("submitted");
		if (post) {
			let file = null;
			if (data.image[0]) {
				file = await dbService.uploadFile(data.image[0]); // await the file upload
				if (file) {
					console.log("success ", file, file.$id); // check if file is defined before accessing file.$id
					dbService.delFile(post.featuredImg);
				} else {
					console.log("failed ", file);
				}
			}

			const dbPost = await dbService.updatePost(post.$id, {
				...data,
				featuredImg: file ? file.$id : "fdata", // use the uploaded file's id
			});

			dbPost ? navigate(`/post/${dbPost.$id}`) : null;
		} else {
			const file = await dbService.uploadFile(data.image[0]);

			if (file) {
				const fileId = file.$id;
				data.featuredImg = fileId;
				const dbPost = await dbService.createPost({
					...data,
					userId: userData.$id,
					author: userData.name,
				});
				dbPost ? navigate(`/post/${dbPost}`) : null;
			} else {
				console.log("file is not uploaded");
			}
			console.log("yes submitted");
		}
	};

	const slugTransform = useCallback((value) => {
		if (value && typeof value === "string")
			return value
				.trim()
				.toLowerCase()
				.replace(/^[a-zA-Z\d\s]+/g, "-")
				.replace(/\s/g, "-");
		return "";
	}, []);

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === "title") {
				setValue(
					"slug",
					slugTransform(value.title, { shouldValidate: true })
				);
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [watch, slugTransform, setValue]);

	return (
		<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
			<div className="w-2/3 px-2">
				<Input
					label="Title :"
					placeholder="Title"
					className="mb-4"
					{...register("title", { required: true })}
				/>
				<Input
					label="Slug :"
					placeholder="Slug"
					className="mb-4"
					{...register("slug", { required: true })}
					onInput={(e) => {
						setValue("slug", slugTransform(e.currentTarget.value), {
							shouldValidate: true,
						});
					}}
					disabled={post}
				/>
				{contentLoading ? (
					<p>Loading content...</p>
				) : (
					<RTE
						label="Content :"
						name="content"
						control={control}
						defaultValue={getValues("content")}
					/>
				)}
			</div>
			<div className="w-1/3 px-2">
				<Input
					label="Featured Image :"
					type="file"
					className="mb-4"
					accept="image/png, image/jpg, image/jpeg, image/gif"
					{...register("image", { required: !post })}
				/>

				{post ? (
					contentLoading ? (
						<p>content is loading...</p>
					) : (
						<div className="w-full mb-4">
							<img
								src={dbService.previewFile(
									post.featuredImg || '"657b1a633744df1ad97b"'
								)}
								alt={post.title}
								className="rounded-lg"
							/>
						</div>
					)
				) : null}

				<Select
					options={["active", "inactive"]}
					label="Status"
					className="mb-4"
					{...register("status", { required: true })}
				/>
				<Button
					type="submit"
					bgColor={post ? "bg-green-500" : undefined}
					className="w-full"
					onClick={() => console.log("clicked...")}
				>
					{post ? "Update" : "Submit"}
				</Button>
			</div>
		</form>
	);
};

export default PostForm;
