import { useState, useEffect } from 'react';
import axios from 'axios';

interface Item { id?: number; name: string; price: number; }

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<Item>({ name: '', price: 0 });
  const [editingId, setEditingId] = useState<number | null>(null); // Track which item we are editing

  const API = '/api/items';

  const fetchItems = () => {
    axios.get(API)
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async () => {
    if(!form.name || !form.price) return;
    try {
      if (editingId) {
        // Update Existing Item (PUT)
        await axios.put(`${API}/${editingId}`, form);
        setEditingId(null);
      } else {
        // Create New Item (POST)
        await axios.post(API, form);
      }
      setForm({ name: '', price: 0 }); // Clear form
      fetchItems();
    } catch (error) {
      alert("Action failed. Is Backend running?");
    }
  };

  const handleEdit = (item: Item) => {
    setForm({ name: item.name, price: item.price });
    setEditingId(item.id!);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
      <h1>Inventory Management</h1>
      
      {/* Form Section */}
      <div style={{ background: '#333', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>{editingId ? 'Edit Item' : 'Add New Item'}</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            placeholder="Item Name" 
            value={form.name} 
            onChange={e => setForm({...form, name: e.target.value})}
            style={{ padding: '10px', flex: 1, borderRadius: '4px', border: 'none' }}
          />
          <input 
            type="number" 
            placeholder="Price" 
            value={form.price} 
            onChange={e => setForm({...form, price: Number(e.target.value)})}
            style={{ padding: '10px', width: '100px', borderRadius: '4px', border: 'none' }}
          />
          <button 
            onClick={handleSubmit} 
            style={{ 
              padding: '10px 20px', 
              background: editingId ? '#ffc107' : '#007bff', // Yellow for update, Blue for add
              color: editingId ? 'black' : 'white',
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {editingId ? 'Update' : 'Add'}
          </button>
          
          {editingId && (
            <button 
              onClick={() => { setEditingId(null); setForm({name:'', price:0}); }}
              style={{ padding: '10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* List Section */}
      <h3>Product List</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item.id} style={{ 
            background: '#fff', 
            color: '#000', // FIXED: Text is now Black so you can see it
            marginBottom: '10px', 
            padding: '15px', 
            borderRadius: '5px',
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '18px' }}>
              <strong>{item.name}</strong> - ${item.price}
            </span>
            <div>
              <button 
                onClick={() => handleEdit(item)}
                style={{ marginRight: '10px', padding: '8px 15px', background: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(item.id!)}
                style={{ padding: '8px 15px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;