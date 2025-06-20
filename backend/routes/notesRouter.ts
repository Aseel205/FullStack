import express from 'express';
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  getNoteByIndex,
  updateNoteByIndex,
  deleteNoteByIndex,
  getNoteCountOnly
} from '../controllers/notesController';
import Note from '../models/noteModel';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// 🔥 TEMPORARY ROUTE TO DELETE ALL NOTES (for dev only)
router.delete('/', async (req, res) => {
  try {
    await Note.deleteMany({});
    res.status(200).json({ message: 'All notes deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete all notes' });
  }
});

// By MongoDB _id
router.get('/count', getNoteCountOnly);
router.get('/', getNotes); // ?_page=&_per_page=
router.get('/:id', getNoteById);
router.post('/', authMiddleware, createNote);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);

// By array index
router.get('/by-index/:i', getNoteByIndex);
router.put('/by-index/:i', authMiddleware, updateNoteByIndex);
router.delete('/by-index/:i', authMiddleware, deleteNoteByIndex);

export default router;
