import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState({ title: '', content: '', author: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/stories/${id}`);
        setStory(response.data);
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };
    fetchStory();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/stories/${id}`, story);
      navigate('/'); // Redirect back to landing page
    } catch (error) {
      setErrorMessage('Error updating story. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Update Story</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={story.title}
          onChange={(e) => setStory({ ...story, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          value={story.content}
          onChange={(e) => setStory({ ...story, content: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={story.author}
          onChange={(e) => setStory({ ...story, author: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Update Story
        </button>
      </form>
    </div>
  );
};

export default UpdateStory;
