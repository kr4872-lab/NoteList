import { useForm, type SubmitHandler } from "react-hook-form";
import type { NoteDTO, CreateNoteFormValues } from "./types";

interface Props {
  onSubmit: (note: Omit<NoteDTO, "id">) => void;
}

export default function CreateNoteForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateNoteFormValues>({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
      hidden: false,
    },
  });

  const handleFormSubmit: SubmitHandler<CreateNoteFormValues> = (data) => {
    const tags = data.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const note: Omit<NoteDTO, "id"> = {
      title: data.title.trim(),
      content: data.content.trim(),
      tags: tags,
      createdAt: new Date().toISOString(),
      hidden: data.hidden,
    };

    onSubmit(note);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <div>
        <input
          placeholder="Title"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 4,
              message: "Title must be at least 4 characters",
            },
          })}
          style={{ width: "100%", padding: "8px" }}
        />
        {errors.title && (
          <p style={{ color: "red", margin: "5px 0 0 0", fontSize: "14px" }}>
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Content"
          {...register("content", { required: "Content is required" })}
          style={{ width: "100%", padding: "8px", minHeight: "60px" }}
        />
        {errors.content && (
          <p style={{ color: "red", margin: "5px 0 0 0", fontSize: "14px" }}>
            {errors.content.message}
          </p>
        )}
      </div>

      <div>
        <input
          placeholder="Tags (comma separated)"
          {...register("tags", {
            validate: (value) => {
              const tagsArray = value
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t.length > 0);
              if (tagsArray.length > 5) return "You can only add up to 5 tags";
              return true;
            },
          })}
          style={{ width: "100%", padding: "8px" }}
        />
        {errors.tags && (
          <p style={{ color: "red", margin: "5px 0 0 0", fontSize: "14px" }}>
            {errors.tags.message}
          </p>
        )}
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <input type="checkbox" {...register("hidden")} />
        Hidden
      </label>

      <button
        type="submit"
        style={{ padding: "8px", background: "#24292e", color: "white" }}
      >
        Add Note
      </button>
    </form>
  );
}
