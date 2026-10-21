export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  hidden: boolean;
}

export interface NoteDTO {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  hidden: boolean;
}

export interface CreateNoteFormValues {
  title: string;
  content: string;
  tags: string;
  hidden: boolean;
}

export interface FilterValues {
  search: string;
  sortBy: "newest" | "oldest";
  showHidden: boolean;
  searchTags: string;
}
