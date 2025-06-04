import React from 'react';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert('Usuario registrado correctamente');
      console.log('Usuario:', userCredential.user.uid);
    } catch (error) {
      alert("Error al registrarse: " + error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h5">Registrarse</Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Repetir Contraseña"
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" fullWidth>
        Registrarse
      </Button>
    </Box>
  );
}
