import { useEffect, useState } from "react";
import type { Note, NoteDTO } from "./types";
import NoteCard from "./NoteCard";
import CreateNoteForm from "./CreateNoteForm";

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch("http://localhost:3000/notes");

        if (!response.ok) {
          throw new Error("Не удалось загрузить заметки");
        }

        const data: NoteDTO[] = await response.json();

        const formattedNotes: Note[] = data.map((note) => ({
          ...note,
          createdAt: new Date(note.createdAt),
        }));

        setNotes(formattedNotes);
      } catch (err) {
        console.error("Ошибка при загрузке заметок:", err);
      }
    }

    fetchNotes();
  }, []);

  async function handleSummit(noteData: Omit<Note, "id">) {
    try {
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...noteData,
          createdAt: noteData.createdAt.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Не удалось создать заметку");
      }

      const createdNoteDTO: NoteDTO = await response.json();

      const newNote: Note = {
        ...createdNoteDTO,
        createdAt: new Date(createdNoteDTO.createdAt),
      };

      setNotes((prevNotes) => [...prevNotes, newNote]);
    } catch (err) {
      console.error("Ошибка при создании заметки:", err);
    }
  }

  async function handleDelete(id: number) {
    try {
      const response = await fetch(`http://localhost:3000/notes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("The note could not be deleted.");
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Ошибка при удалении заметки:", err);
    }
  }

  return (
    <div
      style={{
        background: "#f6f8fa",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            color: "#24292e",
            marginBottom: "24px",
          }}
        >
          Мои заметки
        </h1>
        <CreateNoteForm onSubmit={handleSummit} />
        <div>
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}
