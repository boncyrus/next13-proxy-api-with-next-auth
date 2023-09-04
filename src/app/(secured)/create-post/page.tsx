"use client";

import React, { FunctionComponent, useState } from "react";
import { proxyClient } from "../../api/clients/proxyClient";
import { Post } from "../../models/post";

const CreatePostsPage: FunctionComponent = () => {
  const [post, setPost] = useState<Post>({
    body: "",
    title: "",
    userId: Math.floor(Math.random() * 100),
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await proxyClient.post<Post>("/posts", post);

    if (res.status === 200) {
      alert(`Post created! ${JSON.stringify(res.data)}`);
    } else {
      alert("Failed creating a post.");
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "720px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
            }}
          >
            Create a post
          </h2>
          <input
            onChange={handleChange}
            placeholder="Enter title"
            name="title"
          />

          <textarea
            name="body"
            placeholder="Enter post"
            value={post.body}
            onChange={handleChange}
          />

          <button type="submit">Post</button>
        </div>
      </form>
    </>
  );
};

export default CreatePostsPage;
