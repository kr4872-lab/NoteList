import type { Note } from "./types";
import styles from "./NoteCard.module.css";

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{note.title}</h2>
      <p className={styles.content}>{note.content}</p>

      {note.tags && note.tags.length > 0 && (
        <div className={styles.tagsContainer}>
          {note.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className={styles.meta}>
        <span>{note.createdAt.toLocaleDateString()}</span>
        <span>{note.hidden ? " Hidden" : " Visible"}</span>
        <button className={styles.deleteBtn} onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
