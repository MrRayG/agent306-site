"use client";

interface ResearchFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  typeValue: string;
  onTypeChange: (value: string) => void;
  availableTypes: string[];
}

export function formatTypeLabel(raw: string): string {
  if (raw === "__uncategorized__") return "Uncategorized";
  return raw
    .split("_")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export default function ResearchFilters({
  searchValue,
  onSearchChange,
  typeValue,
  onTypeChange,
  availableTypes,
}: ResearchFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search manuscripts by title or excerpt..."
          className="w-full bg-surface-2 border border-border-subtle rounded-lg px-4 py-2.5 pr-9 text-sm text-text-primary placeholder:text-text-faint focus:outline-none focus:border-accent transition-colors"
          aria-label="Search manuscripts"
        />
        {searchValue && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent text-lg leading-none px-2 py-0.5 transition-colors"
          >
            &times;
          </button>
        )}
      </div>
      <select
        value={typeValue}
        onChange={(e) => onTypeChange(e.target.value)}
        aria-label="Filter by manuscript type"
        className="w-full md:w-auto bg-surface-2 border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors cursor-pointer"
      >
        <option value="">All types</option>
        {availableTypes.map((t) => (
          <option key={t} value={t}>
            {formatTypeLabel(t)}
          </option>
        ))}
      </select>
    </div>
  );
}
