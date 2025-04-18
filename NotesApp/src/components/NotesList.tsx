type Note = {
    id: number;
    title: string;
    author: { name: string; email: string };
    content: string;
  };
  
  function NotesList({ notes }: { notes: Note[] }) {
    return (
      <div>
        {notes.map(note => (
          <div className="note" id={String(note.id)} key={note.id}>
            <h2>{note.title}</h2>
            <small>By {note.author.name}</small>
            <br />
            {note.content}
          </div>
        ))}
      </div>
    );
  }
  
  export default NotesList;
  