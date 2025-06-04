import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import BookList from "../components/BookList";
import { Box, Typography } from "@mui/material";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Cargando usuario...</p>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: 4,
        background: "linear-gradient(135deg, #e0f7fa, #ede7f6)",
        color: "#333",
      }}
    >
      <Typography variant="h3" gutterBottom align="center">
        Bienvenido al Panel 📚
      </Typography>

      {user ? (
        <BookList userId={user.uid} />
      ) : (
        <Typography align="center">No has iniciado sesión</Typography>
      )}
    </Box>
  );
}
