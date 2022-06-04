import React,{useState}from 'react';
import axois from 'axios';

const CommentCreate =(props)=>{
    const [comment, setComment]=useState("");

    const commentSubmitHandler=async(event)=>{
        event.preventDefault();
        await axois.post(`http://posts.com/posts/${props.postId}/comments`,
        {content: comment}
        );

        setComment("");
    }
    
    return (
        <div>
            <form onSubmit={commentSubmitHandler} className="form-group">
                <div>
                    <label>Comment</label>
                    <input value={comment}
                    onChange={event=> setComment(event.target.value)}
                    className="form-control"/>
                    <button className='btn btn-primary'>comment</button>
                </div>
            </form>
        </div>
    );
}

export default CommentCreate;