import type { Note } from "./types";

interface Props {
  note: Note;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onDelete }: Props) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <button
        onClick={() => onDelete(note.id)}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          background: "#ff4d4f",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "5px 10px",
          cursor: "pointer",
          fontSize: "12px",
        }}
      >
        Удалить
      </button>

      <h3 style={{ margin: "0 0 10px 0", paddingRight: "70px" }}>
        {note.title}
      </h3>
      <p style={{ margin: "0 0 10px 0", color: "#555" }}>{note.content}</p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        {note.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "#eee",
              padding: "2px 8px",
              borderRadius: "10px",
              fontSize: "12px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#999",
          fontSize: "12px",
        }}
      >
        <span>{note.createdAt.toLocaleString()}</span>
        {note.hidden && <span style={{ color: "red" }}>Скрытая</span>}
      </div>
    </div>
  );
}
