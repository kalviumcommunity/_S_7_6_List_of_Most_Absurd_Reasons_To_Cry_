import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Story from './component/Story'; 

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
      setStories([...stories, response.data]); // Add the new story to the list of stories
      setNewStory({ title: '', content: '', author: '' }); // Reset form
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding story:', error);
      setErrorMessage('There was an error adding your story. Please try again.');
    }
  };

  return (
    <div className="App bg-white text-black">
      <header className="bg-black text-center py-20">
        <h1 className="text-4xl text-white font-extrabold">The Most Absurd Reasons You Have Ever Cried</h1>
        <p className="text-xl text-white mt-4">Join the community and share your funniest, most absurd crying stories.</p>
        <a
          href="/register"
          className="mt-6 inline-block bg-purple-200 text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-300 transition duration-300"
        >
          Get Started
        </a>
      </header>

     
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">Add Your Story</h2>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-4">
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
          <input
            type="text"
            name="title"
            value={newStory.title}
            onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
            placeholder="Story Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            name="content"
            value={newStory.content}
            onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
            placeholder="Story Content"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="author"
            value={newStory.author}
            onChange={(e) => setNewStory({ ...newStory, author: e.target.value })}
            placeholder="Author Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-600 transition duration-300"
          >
            Submit Story
          </button>
        </form>
      </section>

  
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Reasons to Cry</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {stories.length > 0 ? (
            stories.map((story) => (
              <Story key={story._id} story={story} />
            ))
          ) : (
            <p>No stories available</p>
          )}
        </div>
      </section>

      <footer className="bg-black text-white py-8">
        <div className="text-center">
          <a href="/register" className="mx-4">Register</a>
          <a href="/login" className="mx-4">Login</a>
          <a href="/privacy-policy" className="mx-4">Privacy Policy</a>
        </div>
        <div className="mt-4 text-center">
          <a href="#" className="mx-4">Facebook</a>
          <a href="#" className="mx-4">Instagram</a>
          <a href="#" className="mx-4">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
