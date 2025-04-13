import { useEffect, useState } from 'react';
import axios from 'axios';
import NotesList from './components/NotesList';
import Pagination from './components/Pagination';

const POSTS_PER_PAGE = 10; 
const NOTES_URL = 'http://localhost:3001/notes'; 

function App() {
  const [notes, setNotes] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalNotes, setTotalNotes] = useState(0);

  // Fetch only current page notes
  useEffect(() => {
    const start = (activePage - 1) * POSTS_PER_PAGE;
    const limit = POSTS_PER_PAGE;

    axios
      .get(`${NOTES_URL}?_start=${start}&_limit=${limit}`)
      .then((res) => {
        setNotes(res.data);
        console.debug('Fetched notes for page', activePage, res.data);
      })
      .catch((err) => console.error('Error fetching notes:', err));
  }, [activePage]);

  // Fetch total count once
  useEffect(() => {
    console.log(" we are fetching the number of notes....")
    axios
      .get(NOTES_URL)
      .then((res) => {
        setTotalNotes(res.data.length);
      })
      .catch((err) => console.error('Error fetching total note count:', err));
  }, []);

  const totalPages = totalNotes > 0 ? Math.ceil(totalNotes / POSTS_PER_PAGE) : 1;

  return (
    <>
      <NotesList notes={notes} />
      <Pagination
        currentPage={activePage}
        totalPages={totalPages}
        setPage={setActivePage}
      />
    </>
  );
}

export default App;
