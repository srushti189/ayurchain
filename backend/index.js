import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
import { readFileSync } from 'fs';
import authRouter from './auth.js';
import { authenticate, authorize } from './middleware.js';
import './database.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Auth routes
app.use('/auth', authRouter);

// Connect to blockchain
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const abi = JSON.parse(readFileSync('./contractABI.json', 'utf8'));
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, provider);

// GET all batches — public, anyone can view
app.get('/batches', async (req, res) => {
  try {
    const total = await contract.getTotalBatches();
    const batches = [];
    for (let i = 1; i <= total; i++) {
      const batch = await contract.getBatch(i);
      batches.push({
        id: batch.id.toString(),
        herbName: batch.herbName,
        location: batch.location,
        stage: batch.stage,
        addedBy: batch.addedBy,
        timestamp: new Date(Number(batch.timestamp) * 1000).toISOString(),
        notes: batch.notes,
      });
    }
    res.json(batches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single batch — public
app.get('/batches/:id', async (req, res) => {
  try {
    const batch = await contract.getBatch(req.params.id);
    res.json({
      id: batch.id.toString(),
      herbName: batch.herbName,
      location: batch.location,
      stage: batch.stage,
      addedBy: batch.addedBy,
      timestamp: new Date(Number(batch.timestamp) * 1000).toISOString(),
      notes: batch.notes,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET current user info — any logged in user
app.get('/me', authenticate, (req, res) => {
  res.json(req.user);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));