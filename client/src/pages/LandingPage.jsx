import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Story = ({ story, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="story p-6 bg-white shadow-lg rounded-lg border border-gray-200 transform hover:scale-105 transition duration-300">
      <h2 className="text-2xl font-semibold text-gray-800">{story.title}</h2>
      <p className="text-gray-600 mt-2">{story.content}</p>
      <p className="text-sm text-gray-500 mt-2">Submitted by: <strong>{story.author}</strong></p>
      <div className="flex items-center mt-4 space-x-4">
        <button
          onClick={() => navigate(`/update-story/${story._id}`)}
          className="bg-purple-400 text-white px-4 py-2 rounded-md hover:bg-purple-500 transition"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(story._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState({ title: '', content: '', author: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/stories');
        setStories(response.data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };
    fetchStories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newStory.title || !newStory.content || !newStory.author) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/stories', newStory);
      setStories([...stories, response.data]);
      setNewStory({ title: '', content: '', author: '' });
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding story:', error);
      setErrorMessage('There was an error adding your story. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-purple-700 text-gray-100 flex flex-col items-center">
      <header className="w-full max-w-7xl bg-white shadow-md rounded-lg text-center py-16 px-8">
        <h1 className="text-5xl font-extrabold text-gray-800">The Most Absurd Reasons You Have Ever Cried</h1>
        <p className="text-xl mt-4 text-gray-600">Join the community and share your funniest, most absurd crying stories.</p>
      </header>

      <section className="w-full max-w-5xl py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-purple-300">Add Your Story</h2>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-4">
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          <input
            type="text"
            name="title"
            value={newStory.title}
            onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
            placeholder="Story Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <textarea
            name="content"
            value={newStory.content}
            onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
            placeholder="Story Content"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="text"
            name="author"
            value={newStory.author}
            onChange={(e) => setNewStory({ ...newStory, author: e.target.value })}
            placeholder="Author Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-400 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-500 transition"
          >
            Submit Story
          </button>
        </form>
      </section>

      <section className="w-full max-w-5xl py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-purple-300">Popular Reasons to Cry</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stories.length > 0 ? (
            stories.map((story) => (
              <Story key={story._id} story={story} onDelete={() => {}} />
            ))
          ) : (
            <p className="text-center text-gray-300">No stories available</p>
          )}
        </div>
      </section>

      <footer className="w-full bg-gray-900 text-white py-8 mt-8">
        <div className="text-center">
          <Link to="/privacy-policy" className="mx-4 hover:underline">Privacy Policy</Link>
        </div>
        <div className="mt-4 text-center space-x-4">
          <a href="#" className="hover:underline">Facebook</a>
          <a href="#" className="hover:underline">Instagram</a>
          <a href="#" className="hover:underline">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
