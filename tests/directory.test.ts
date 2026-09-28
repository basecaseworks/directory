import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import ItemPage, { generateStaticParams } from "@/app/items/[id]/page";
import { items } from "@/data/items";
import {
  allCategory,
  buildDirectoryUrl,
  filterItems,
  getCategories,
  getItemById,
} from "@/lib/directory";

describe("directory data", () => {
  it("contains unique complete entries and known categories", () => {
    const ids = items.map((item) => item.id);
    const categories = new Set(getCategories());

    expect(items.length).toBeGreaterThanOrEqual(10);
    expect(new Set(ids).size).toBe(ids.length);
    expect(categories).toEqual(new Set(["Cafe", "Restaurant", "Service", "Shop"]));
    expect(items.every((item) => item.name && item.description && item.category && item.location)).toBe(true);
  });

  it("finds entries by stable ID and returns undefined for unknown IDs", () => {
    expect(getItemById("central-coffee")?.name).toBe("Central Coffee");
    expect(getItemById("missing-entry")).toBeUndefined();
  });
});

describe("directory filtering", () => {
  it("searches name, category, and description case-insensitively after trimming", () => {
    expect(filterItems(items, "  COFFEE ", allCategory).map((item) => item.id)).toEqual([
      "central-coffee",
      "station-cafe",
    ]);
    expect(filterItems(items, "gardening", allCategory).map((item) => item.id)).toEqual(["green-house-goods"]);
    expect(filterItems(items, "service", allCategory).every((item) => item.category === "Service")).toBe(true);
  });

  it("combines category filtering with search and keeps an empty query broad", () => {
    expect(filterItems(items, "coffee", "Cafe").map((item) => item.id)).toEqual([
      "central-coffee",
      "station-cafe",
    ]);
    expect(filterItems(items, "coffee", "Restaurant")).toEqual([]);
    expect(filterItems(items, "", "Cafe")).toHaveLength(3);
    expect(filterItems(items, undefined, "All")).toHaveLength(items.length);
    expect(filterItems(items, undefined, "not-a-category")).toHaveLength(items.length);
  });

  it("builds shareable URL state", () => {
    expect(buildDirectoryUrl("coffee", "Cafe")).toBe("/?q=coffee&category=Cafe");
    expect(buildDirectoryUrl("", allCategory)).toBe("/");
  });
});

describe("directory routes and rendering", () => {
  it("generates a static route for every item and renders a valid detail page", async () => {
    expect(generateStaticParams()).toHaveLength(items.length);
    const page = await ItemPage({ params: Promise.resolve({ id: "central-coffee" }) });
    const markup = renderToStaticMarkup(page);

    expect(markup).toContain("Central Coffee");
    expect(markup).toContain("Cafe");
  });

  it("uses the not-found route for an unknown item", async () => {
    await expect(ItemPage({ params: Promise.resolve({ id: "missing-entry" }) })).rejects.toThrow(
      "NEXT_HTTP_ERROR_FALLBACK;404",
    );
  });

  it("renders filtered results and the no-results state", async () => {
    const filteredPage = await HomePage({
      searchParams: Promise.resolve({ q: "coffee", category: "Cafe" }),
    });
    const emptyPage = await HomePage({
      searchParams: Promise.resolve({ q: "does-not-exist" }),
    });

    expect(renderToStaticMarkup(filteredPage)).toContain("Central Coffee");
    expect(renderToStaticMarkup(filteredPage)).not.toContain("Harbor Table");
    expect(renderToStaticMarkup(emptyPage)).toContain("No results.");
  });
});
