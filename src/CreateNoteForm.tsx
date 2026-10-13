import { useState } from "react";
import type { Note } from "./types";

interface CreateNoteFormProps {
  onSubmit: (note: Omit<Note, "id">) => void;
}

export default function CreateNoteForm({ onSubmit }: CreateNoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hidden, setHidden] = useState(false);
  const [tags, setTags] = useState("");

  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [tagsError, setTagsError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setTitleError("");
    setContentError("");
    setTagsError("");

    let hasError = false;

    const currentTitle = title.trim();
    if (currentTitle.length === 0) {
      setTitleError("Title is required");
      hasError = true;
    }

    const currentContent = content.trim();
    if (currentContent.length === 0) {
      setContentError("Content is required");
      hasError = true;
    }

    const currentTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    if (currentTags.length > 5) {
      setTagsError("You can only add up to 5 tags");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    onSubmit({
      title: currentTitle,
      content: currentContent,
      createdAt: new Date(),
      hidden,
      tags: currentTags,
    });

    setTitle("");
    setContent("");
    setHidden(false);
    setTags("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #e1e4e8",
        boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
        marginBottom: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <h3 style={{ margin: "0 0 4px 0", color: "#24292e" }}>
        Создать новую заметку
      </h3>

      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            boxSizing: "border-box",
          }}
        />
        {titleError && (
          <p style={{ color: "#d73a49", fontSize: "12px", margin: "4px 0 0" }}>
            {titleError}
          </p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            minHeight: "80px",
            boxSizing: "border-box",
          }}
        />
        {contentError && (
          <p style={{ color: "#d73a49", fontSize: "12px", margin: "4px 0 0" }}>
            {contentError}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            boxSizing: "border-box",
          }}
        />
        {tagsError && (
          <p style={{ color: "#d73a49", fontSize: "12px", margin: "4px 0 0" }}>
            {tagsError}
          </p>
        )}
      </div>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          fontSize: "14px",
          color: "#4b5563",
        }}
      >
        <input
          type="checkbox"
          checked={hidden}
          onChange={(e) => setHidden(e.target.checked)}
          style={{ width: "16px", height: "16px" }}
        />
        Hidden
      </label>

      <button
        type="submit"
        style={{
          background: "#2ea44f",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "6px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
      >
        Add Note
      </button>
    </form>
  );
}
