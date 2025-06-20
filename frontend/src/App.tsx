import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import {
  NotesProvider,
  useNotes,
  Note,
  fetchNotesWithSlidingCache
} from './context/NotesContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider, useNotification } from './context/NotificationContext';
import NotesList from './components/NotesList';
import Pagination from './components/Pagination';
import NoteForm from './components/NoteForm';
import LoginPage from './pages/LoginPage';
import CreateUserPage from './pages/CreateUserPage';
import './App.css';

const POSTS_PER_PAGE = 10;

function HomePage() {
  const {
    state: { page, totalCount },
    dispatch,
    state,
  } = useNotes();

  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const { state: auth, dispatch: authDispatch } = useAuth();
  const { message } = useNotification();
  const navigate = useNavigate();

  const [cacheInitialized, setCacheInitialized] = useState(false); // ✅ NEW STATE

  // ✅ Caching logic with init protection
  useEffect(() => {
    if (!cacheInitialized) {
      fetchNotesWithSlidingCache(page, state, dispatch)
        .then(() => setCacheInitialized(true))
        .catch(console.error);
    } else {
      fetchNotesWithSlidingCache(page, state, dispatch).catch(console.error);
    }
  }, [page, cacheInitialized]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <div>
      {/* 🔔 Notification bar */}
      <div className="notification">{message}</div>

      {/* 👤 Auth buttons */}
      <div style={{ margin: '1rem' }}>
        {!auth.token ? (
          <>
            <button onClick={() => navigate('/login')} data-testid="go_to_login_button">
              Go to Login
            </button>
            <button onClick={() => navigate('/create-user')} data-testid="go_to_create_user_button">
              Create New User
            </button>
          </>
        ) : (
          <button onClick={() => authDispatch({ type: 'LOGOUT' })} data-testid="logout">
            Logout
          </button>
        )}
      </div>

      {/* 📝 Notes layout */}
      <div className="app-container">
        <div className="sidebar">
          <div className="card form-card">
            <NoteForm
              editingNote={editingNote || undefined}
              onClose={() => setEditingNote(null)}
            />
          </div>
        </div>

        <div className="content">
          <NotesList onEdit={setEditingNote} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            setPage={(p) => dispatch({ type: 'SET_PAGE', payload: p })}
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <NotesProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/create-user" element={<CreateUserPage />} />
            </Routes>
          </Router>
        </NotesProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
