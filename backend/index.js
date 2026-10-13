import  express from 'express'
import dotenv from "dotenv";
import pool from './db.js'
import cors from 'cors'

dotenv.config();


const app = express();

app.use(cors()); 
app.use(express.json());

app.get('/api/health-check', async (req, res) => {
  res.json({ message: 'OK' });
});

app.post('/api/save', async (req, res) => {
  // We extract 'message' from the frontend request
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Insert into the 'messages' table, specifically the 'msg' column
    // $1 is a parameterized query to prevent SQL injection
    const result = await pool.query(
      'INSERT INTO messages (msg) VALUES ($1) RETURNING *',
      [message]
    );
    
    console.log('Saved to PostgreSQL:', result.rows[0]);

    res.status(200).json({ success: true, savedData: result.rows[0] });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to save to database' });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});