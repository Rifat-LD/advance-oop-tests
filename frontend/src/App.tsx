import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  // --- PASTE YOUR URL HERE AGAIN ---
  const API_URL = "https://fictional-space-orbit-x55rv9r6rx4pf6p9j-8080.app.github.dev/api/books"; 
  // --------------------------------

  const [books, setBooks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editId, setEditId] = useState<number | null>(null); // Track if we are editing

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get(API_URL)
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    // If editId has a number, we are UPDATING. Otherwise, we are ADDING.
    if (editId) {
      // UPDATE LOGIC
      axios.put(`${API_URL}/${editId}`, { title, author })
        .then(() => {
          resetForm();
          fetchBooks();
        })
        .catch(err => alert("Error updating: " + err.message));
    } else {
      // ADD LOGIC
      axios.post(API_URL, { title, author })
        .then(() => {
          resetForm();
          fetchBooks();
        })
        .catch(err => alert("Error adding: " + err.message));
    }
  };

  const handleEdit = (book: any) => {
    setTitle(book.title);
    setAuthor(book.author);
    setEditId(book.id); // Switch mode to 'Edit'
  };

  const handleDelete = (id: number) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => fetchBooks())
      .catch(err => alert("Error deleting: " + err.message));
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setEditId(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Book Library</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input 
          placeholder="Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          required 
        />
        <input 
          placeholder="Author" 
          value={author} 
          onChange={e => setAuthor(e.target.value)} 
          required 
        />
        {/* Button changes text based on mode */}
        <button type="submit" style={{ marginLeft: 10 }}>
          {editId ? "Update Book" : "Add Book"}
        </button>
        
        {/* Show Cancel button only when editing */}
        {editId && (
          <button type="button" onClick={resetForm} style={{ marginLeft: 5, backgroundColor: 'gray' }}>
            Cancel
          </button>
        )}
      </form>

      <ul>
        {books.map(book => (
          <li key={book.id} style={{ marginBottom: 10 }}>
            <strong>{book.title}</strong> by {book.author} 
            
            <button 
              onClick={() => handleEdit(book)} 
              style={{ marginLeft: 15, backgroundColor: '#007bff', color: 'white' }}
            >
              Edit
            </button>
            
            <button 
              onClick={() => handleDelete(book.id)} 
              style={{ marginLeft: 5, backgroundColor: 'red', color: 'white' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App