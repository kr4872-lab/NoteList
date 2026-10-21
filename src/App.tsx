import { useState, useEffect } from "react";
import type { Note, NoteDTO, FilterValues } from "./types";
import { mapNoteFromDTO } from "./utils";
import NoteCard from "./NoteCard";
import CreateNoteForm from "./CreateNoteForm";
import NoteFilterForm from "./NoteFilterForm";

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    showHidden: false,
    sortBy: "newest",
    searchTags: "",
  });

  useEffect(() => {
    async function fetchNotes() {
      try {
        const params = new URLSearchParams();

        if (filters.search) params.set("title_like", filters.search);

        if (filters.showHidden === false) {
          params.set("hidden", "false");
        }

        params.set("_sort", "createdAt");
        params.set("_order", filters.sortBy === "newest" ? "desc" : "asc");

        if (filters.searchTags.trim()) {
          const tagsArray = filters.searchTags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t.length > 0);
          tagsArray.forEach((tag) => {
            params.append("tags_like", tag);
          });
        }

        const response = await fetch(
          `http://localhost:3000/notes?${params.toString()}`,
        );
        const data: NoteDTO[] = await response.json();

        setNotes(data.map(mapNoteFromDTO));
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      }
    }
    fetchNotes();
  }, [filters]);

  const handleNoteSubmit = async (note: Omit<NoteDTO, "id">) => {
    try {
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });

      const res: NoteDTO = await response.json();

      if (filters.sortBy === "newest") {
        setNotes((prev) => [mapNoteFromDTO(res), ...prev]);
      } else {
        setNotes((prev) => [...prev, mapNoteFromDTO(res)]);
      }
    } catch (error) {
      console.error("Ошибка сохранения:", error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/notes/${id}`, { method: "DELETE" });
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Менеджер заметок</h2>

      <CreateNoteForm onSubmit={handleNoteSubmit} />
      <hr
        style={{
          margin: "20px 0",
          border: "none",
          borderTop: "1px solid #eee",
        }}
      />

      <NoteFilterForm filters={filters} setFilters={setFilters} />

      {notes.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "50px 20px",
            color: "#888",
            background: "#fafafa",
            borderRadius: "8px",
            marginTop: "20px",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0" }}>Заметки не найдены 🕵️‍♂️</h3>
          <p style={{ margin: 0, fontSize: "14px" }}>
            Попробуйте изменить параметры фильтрации или создайте новую заметку.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} />
          ))}
        </div>
      )}
    </div>
  );
}
