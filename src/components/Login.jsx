import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { Button, Box, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function Login({ onLogin }) {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onLogin(); // redirige al dashboard
    } catch (error) {
      alert("Error al iniciar sesión con Google: " + error.message);
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>Iniciar sesión con Google</Typography>
      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
        fullWidth
      >
        Entrar con Google
      </Button>
    </Box>
  );
}
