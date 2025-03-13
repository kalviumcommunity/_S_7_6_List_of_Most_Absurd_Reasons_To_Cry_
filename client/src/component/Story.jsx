import React from 'react';
import './Story.css';  


const Story =({ story }) => {
    return(
        <div className='story'>
            <h2>{story.title}</h2>
            <p>{story.content}</p>
            <p><strong>Submitted by: </strong> {story.author}</p>
            <button>Upvote</button>
            <button>Downvote</button>
        </div>
    );
}

export default Story;