import React, {useState, useEffect} from "react";
// import axios from 'axios';

const CommentList=({comments})=>{
    // const [comments, setComments]=useState({});
    // const fetchComments =async()=>{
    //     const res= await axios.get(`http://localhost:4001/posts/${props.postId}/comments`);
    //     console.log(res.data)
    //     setComments(res.data);
    // }

    // useEffect(()=>{
    //     fetchComments();
    // },[])
    // const allCommentsList= Object.values(comments);
    // const numberOfComments = allCommentsList.length;
    const numberOfComments = comments.length;
    const commentRenderer= comments.map(comment=>{
        if(comment.status === 'rejected'){
            comment.content = "This content is rejected";
        }
        if(comment.status === 'pending'){
            comment.content = "This comment is awaiting moderator approval";
        }
        return (
            <li key={comment.id}>
                {comment.content}
            </li>
        )
    })
    return (
        <div>
            <div>{numberOfComments} comment(s)</div>
            <ul>
                {commentRenderer}
            </ul>
        </div>
    );
}

export default CommentList;