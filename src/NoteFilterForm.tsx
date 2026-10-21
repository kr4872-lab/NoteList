import type { FilterValues } from "./types";

interface Props {
  filters: FilterValues;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
}

export default function NoteFilterForm({ filters, setFilters }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
        alignItems: "center",
        background: "#f9f9f9",
        padding: "15px",
        borderRadius: "8px",
      }}
    >
      <input
        type="text"
        placeholder="Поиск по заголовку..."
        value={filters.search}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, search: e.target.value }))
        }
        style={{ padding: "6px", flex: 1, minWidth: "150px" }}
      />

      <input
        type="text"
        placeholder="Теги (через запятую)..."
        value={filters.searchTags}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, searchTags: e.target.value }))
        }
        style={{ padding: "6px", flex: 1, minWidth: "150px" }}
      />

      <select
        value={filters.sortBy}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            sortBy: e.target.value as "newest" | "oldest",
          }))
        }
        style={{ padding: "6px" }}
      >
        <option value="newest">Сначала новые</option>
        <option value="oldest">Сначала старые</option>
      </select>

      <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <input
          type="checkbox"
          checked={filters.showHidden}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, showHidden: e.target.checked }))
          }
        />
        Скрытые
      </label>
    </div>
  );
}
