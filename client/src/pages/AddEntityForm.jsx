
import React, { useState } from 'react';
import axios from 'axios';

const AddEntityForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [entities, setEntities] = useState([]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleAuthorChange = (e) => setAuthor(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEntity = {
      title,
      content,
      author,
    };

    try {
      await axios.post('http://localhost:5000/api/entities', newEntity); // Adjust the endpoint based on your backend route
      setTitle('');
      setContent('');
      setAuthor('');

      // Refresh the list of entities
      const response = await axios.get('http://localhost:5000/api/entities');
      setEntities(response.data);
    } catch (error) {
      console.error('Error adding entity:', error);
    }
  };

  return (
    <div>
      <h2>Add New Entity</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={handleContentChange}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={handleAuthorChange}
            required
          />
        </div>
        <button type="submit">Add Entity</button>
      </form>

      <h3>Entities List</h3>
      <ul>
        {entities.map((entity) => (
          <li key={entity._id}>
            <h4>{entity.title}</h4>
            <p>{entity.content}</p>
            <p><strong>{entity.author}</strong></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddEntityForm;
