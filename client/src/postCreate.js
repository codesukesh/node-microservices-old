import React, {useState} from "react";
import axois from 'axios';

const Post = ()=>{
    const [title, setTitle]=useState('');

    const submitChangeHandler= async (event)=>{
        event.preventDefault();

        await axois.post(
            "http://posts.com/posts/create",
            {title}
        );

        setTitle('');
    }
    return (
        <div>

            <form onSubmit={submitChangeHandler}>
                <div className="form-group">
                    <label>
                        Title
                    </label>
                    <input 
                    value={title}
                    onChange={event => setTitle(event.target.value)} className="form-control" />
                </div>
                <button className="btn btn-primary">Post</button>
            </form>
        </div>
    )
}

export default Post;