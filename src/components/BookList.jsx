import React from 'react';
import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../firebase';
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Grid,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BookList({ userId }) {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const q = query(collection(db, 'books'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const booksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBooks(booksData);
    });
    return () => unsubscribe();
  }, [userId]);

  const handleAddBook = async () => {
    if (!newBook.trim()) return;
    try {
      await addDoc(collection(db, 'books'), {
        title: newBook,
        userId: userId,
      });
      setNewBook('');
    } catch (error) {
      console.error('Error al añadir libro:', error);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await deleteDoc(doc(db, 'books', bookId));
    } catch (error) {
      console.error('Error al eliminar libro:', error);
    }
  };

  const generateRecommendation = async () => {
    if (books.length === 0) {
      setRecommendation('Agrega al menos un libro primero.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://ai.hackclub.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `Recomiéndame un libro basado en estos títulos: ${books.map((b) => b.title).join(', ')}`,
            },
          ],
        }),
      });

      const data = await response.json();
      setRecommendation(data.choices?.[0]?.message?.content || 'No se pudo obtener recomendación.');
    } catch (error) {
      console.error('Error al obtener recomendación:', error);
      setRecommendation('Error al obtener recomendación.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🎯 Tus Libros
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1">{book.title}</Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleDelete(book.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          ➕ Añadir nuevo libro
        </Typography>
        <TextField
          label="Nuevo Libro"
          value={newBook}
          onChange={(e) => setNewBook(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="contained" onClick={handleAddBook}>
            Añadir
          </Button>
          <Button variant="outlined" onClick={generateRecommendation} disabled={loading}>
            {loading ? 'Cargando...' : 'Recomendar'}
          </Button>
        </Box>
      </Paper>

      {recommendation && (
        <Paper
          elevation={2}
          sx={{
            p: 3,
            backgroundColor: '#e3f2fd',
            borderLeft: '6px solid #1976d2',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">📖 Recomendación:</Typography>
          <Typography>{recommendation}</Typography>
        </Paper>
      )}
    </Box>
  );
}

