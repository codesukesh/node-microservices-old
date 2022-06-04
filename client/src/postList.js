import React, { useEffect, useState } from "react";
import axois from "axios";
import CommentCreate from "./commentCreate";
import CommentList from "./commentList";

const PostList =()=>{

    const [posts, setPosts] = useState({});

    const fetchPosts =async ()=>{
        const res = await axois.get("http://posts.com/posts");
        setPosts(res.data);
    }

    useEffect(()=>{
        fetchPosts();
    },[])

    const postRenderer = Object.values(posts).map(post => {
        return (
            <div className="card"
            style={{width:"30%", marginBottom:"20px"}}
            key={post.id}
            >
                <div className="card-body">
                    <h3>
                        {post.title}
                    </h3>
                    <CommentCreate postId={post.id}/>
                    <hr/>
                    <CommentList comments={post.comments}/>
                </div>
            </div>
        );
    })
    return (
        <div className="d-flex flex-row justify-content-between flex-wrap">
            {postRenderer}
        </div>
    );
}

export default PostList;