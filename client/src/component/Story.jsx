import React, { useState } from 'react';
import axios from 'axios';
import './Story.css'; 

const Story = ({ story, onDelete, onEdit }) => {
  const [votes, setVotes] = useState(story.votes);
  const [loading, setLoading] = useState(false); 

  const handleVote = async (voteType) => {
    if (loading) return; 
    setLoading(true); 

    const newVotes = voteType === 'up' ? votes + 1 : Math.max(0, votes - 1); 

    try {
      await axios.put(`http://localhost:3000/api/stories/${story._id}`, {
        votes: newVotes,
      });
      setVotes(newVotes); 
    } catch (error) {
      console.error('Error updating votes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="story p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold">{story.title}</h2>
      <p className="text-gray-600">{story.content}</p>
      <p className="text-sm text-gray-400"><strong>Submitted by:</strong> {story.author}</p>
      
      <div className="flex items-center mt-2 space-x-4">
        <button 
          onClick={() => handleVote('up')} 
          disabled={loading} 
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
        >
          👍 Upvote
        </button>
        <button 
          onClick={() => handleVote('down')} 
          disabled={loading || votes <= 0} 
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
        >
          👎 Downvote
        </button>
        <p className="text-lg font-bold">{votes} Votes</p>
      </div>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => onEdit(story._id)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(story._id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default Story;
