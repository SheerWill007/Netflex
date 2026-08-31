import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { CatalogProvider } from './context/CatalogContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyList from './pages/MyList';
import Search from './pages/Search';
import Browse from './pages/Browse';
import './App.css';

function AppShell() {
  return (
    <WatchlistProvider>
      <CatalogProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tv-shows"
            element={
              <ProtectedRoute>
                <Browse type="series" title="TV Shows" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Browse type="movie" title="Movies" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-list"
            element={
              <ProtectedRoute>
                <MyList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CatalogProvider>
    </WatchlistProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
