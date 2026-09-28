import { items, type DirectoryItem } from "@/data/items";

export const allCategory = "All";

export function getAllItems(): DirectoryItem[] {
  return items;
}

export function getItemById(id: string): DirectoryItem | undefined {
  return items.find((item) => item.id === id);
}

export function getCategories(): string[] {
  return [...new Set(items.map((item) => item.category))].sort((a, b) => a.localeCompare(b));
}

export function resolveCategory(value: string | undefined): string {
  const normalized = value?.trim().toLowerCase();
  if (!normalized || normalized === allCategory.toLowerCase()) {
    return allCategory;
  }

  return getCategories().find((category) => category.toLowerCase() === normalized) ?? allCategory;
}

export function normalizeSearchQuery(value: string | undefined): string {
  return value?.trim().toLowerCase() ?? "";
}

export function filterItems(
  sourceItems: DirectoryItem[],
  query: string | undefined,
  category: string | undefined,
): DirectoryItem[] {
  const normalizedQuery = normalizeSearchQuery(query);
  const resolvedCategory = resolveCategory(category);

  return sourceItems.filter((item) => {
    const matchesCategory = resolvedCategory === allCategory || item.category === resolvedCategory;
    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return [item.name, item.category, item.description].some((field) =>
      field.toLowerCase().includes(normalizedQuery),
    );
  });
}

export function buildDirectoryUrl(query: string, category: string): string {
  const params = new URLSearchParams();
  if (query) {
    params.set("q", query);
  }
  if (category !== allCategory) {
    params.set("category", category);
  }

  const search = params.toString();
  return search ? `/?${search}` : "/";
}
