import React, { useState } from 'react';
import axios from 'axios';
import './Story.css'; 

const Story = ({ story }) => {
  const [votes, setVotes] = useState(story.votes);

  const handleVote = async (voteType) => {
    const newVotes = voteType === 'up' ? votes + 1 : votes - 1;

    try {
      
      await axios.put(`http://localhost:3000/api/stories/${story._id}`, {
        votes: newVotes,
      });
      
      setVotes(newVotes); 
    } catch (error) {
      console.error('Error updating votes:', error);
    }
  };

  return (
    <div className='story'>
      <h2>{story.title}</h2>
      <p>{story.content}</p>
      <p><strong>Submitted by: </strong> {story.author}</p>
      <p><strong>Votes: </strong>{votes}</p>
      <button onClick={() => handleVote('up')}>Upvote</button>
      <button onClick={() => handleVote('down')}>Downvote</button>
    </div>
  );
};

export default Story;
