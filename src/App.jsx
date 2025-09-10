import './App.css'
import { useState, useEffect } from 'react';

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Travel Explorer</h1>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#trips">Trips</a>
          <a href="#gallery">Gallery</a>
          <a href="#expense-tracker">Trip Expense</a>
          <a href="#about">About</a>
        </nav>
      </header>
      <main>
        <section className="hero" id="home">
          <h2>Discover Amazing Places</h2>
          <p>Find your next adventure trip with curated trips and guides. Explore destinations like Goa and more!</p>
        </section>
        <section className="trips" id="trips">
          <h3>Featured Destination: Goa</h3>
          <div className="trip-card">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Goa Beach" className="trip-image" />
            <div className="trip-info">
              <h4>Goa, India</h4>
              <p>Enjoy the sun, sand, and sea in Goa. Famous for its beautiful beaches, vibrant nightlife, and rich culture.</p>
              <ul>
                <li>Best time to visit: November to February</li>
                <li>Popular spots: Baga Beach, Fort Aguada, Anjuna Market</li>
                <li>Activities: Water sports, Nightlife, Sightseeing</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="gallery" id="gallery">
          <h3>Goa Photo Gallery</h3>
          <Gallery />
        </section>
        <section className="expense-tracker" id="expense-tracker">
          <h3>Trip Expense Tracker</h3>
          <ExpenseTracker />
        </section>
        <section className="about" id="about">
          <h3>About Travel Explorer</h3>
          <p>Travel Explorer is your companion for discovering the best trips and destinations. We provide curated guides, tips, and inspiration for your next journey. Start exploring today!</p>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2025 Travel Explorer. All rights reserved.</p>
      </footer>
    </div>
  )
}

// ExpenseTracker component
function ExpenseTracker() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('tripExpenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    localStorage.setItem('tripExpenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    if (!desc.trim() || !amount || isNaN(amount)) return;
    setExpenses([
      ...expenses,
      { desc, amount: parseFloat(amount), id: Date.now() },
    ]);
    setDesc('');
    setAmount('');
  };

  return (
    <div>
      <form className="expense-form" onSubmit={addExpense}>
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          min="0"
          step="0.01"
          required
        />
        <button type="submit">Add Expense</button>
      </form>
      <ul className="expense-list">
        {expenses.length === 0 && <li>No expenses yet.</li>}
        {expenses.map(exp => (
          <li key={exp.id}>
            <span>{exp.desc}</span>
            <span>₹{exp.amount.toFixed(2)}</span>
            <button className="delete-btn" onClick={() => setExpenses(expenses.filter(e => e.id !== exp.id))} title="Delete">🗑️</button>
          </li>
        ))}
      </ul>
      <div className="expense-total">
        Total: ₹{expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
      </div>
    </div>
  );
}

// Gallery component
function Gallery() {
  const categories = [
    {
      name: 'Beaches',
      images: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      ],
    },
    {
      name: 'Forts',
      images: [
        'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80',
      ],
    },
    {
      name: 'Markets',
      images: [
        'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80',
      ],
    },
  ];
  return (
    <div className="gallery-categories">
      {categories.map(cat => (
        <div className="gallery-category" key={cat.name}>
          <h4>{cat.name}</h4>
          <div className="gallery-grid">
            {cat.images.map((img, idx) => (
              <img src={img} alt={cat.name + ' ' + (idx + 1)} key={img} className="gallery-img" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App
