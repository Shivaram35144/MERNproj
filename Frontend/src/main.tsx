import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {AuthProvider} from './context/AuthContext.tsx';
import axios from 'axios';
import {Toaster} from 'react-hot-toast'; // for toast notifications

axios.defaults.baseURL = 'http://localhost:3000/api/v1';
axios.defaults.withCredentials = true; // to send cookies with every request to backend

const theme = createTheme({ typography: { fontFamily: 'Roboto Slab, serif', allVariants: { color: 'white' } } });
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Toaster position='bottom-center'/>
        <App />
      </ThemeProvider>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
