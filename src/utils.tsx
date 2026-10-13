import type { Note, NoteDTO } from "./types";

export function mapNoteFromDTO(dto: NoteDTO): Note {
  return {
    id: dto.id,
    title: dto.title,
    content: dto.content,
    createdAt: new Date(dto.createdAt),
    hidden: dto.hidden,
    tags: dto.tags,
  };
}
