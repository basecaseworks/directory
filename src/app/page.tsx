import Link from "next/link";
import {
  allCategory,
  buildDirectoryUrl,
  filterItems,
  getAllItems,
  getCategories,
  normalizeSearchQuery,
  resolveCategory,
} from "@/lib/directory";

type SearchParamValue = string | string[] | undefined;

type HomePageProps = {
  searchParams: Promise<{
    q?: SearchParamValue;
    category?: SearchParamValue;
  }>;
};

function firstParam(value: SearchParamValue): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const query = normalizeSearchQuery(firstParam(params.q));
  const category = resolveCategory(firstParam(params.category));
  const allItems = getAllItems();
  const filteredItems = filterItems(allItems, query, category);
  const categories = [allCategory, ...getCategories()];
  const hasFilters = Boolean(query) || category !== allCategory;

  return (
    <main>
      <header className="page-header">
        <h1>Directory</h1>
      </header>

      <form className="search-form" method="get" action="/">
        <label htmlFor="directory-search">Search</label>
        <div className="search-row">
          <input
            id="directory-search"
            name="q"
            type="search"
            defaultValue={query}
            autoComplete="off"
          />
          {category !== allCategory && <input type="hidden" name="category" value={category} />}
          <button type="submit">Search</button>
        </div>
      </form>

      <nav className="category-nav" aria-label="Filter by category">
        <ul>
          {categories.map((categoryOption) => (
            <li key={categoryOption}>
              <Link
                href={buildDirectoryUrl(query, categoryOption)}
                aria-current={category === categoryOption ? "page" : undefined}
                className={category === categoryOption ? "category-link selected" : "category-link"}
              >
                {categoryOption}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="result-count">
        Showing {filteredItems.length} of {allItems.length} entries
      </p>

      {filteredItems.length === 0 ? (
        <section className="empty-state" aria-live="polite">
          <p>No results.</p>
          {hasFilters && <p><Link href="/">Clear search and filters</Link></p>}
        </section>
      ) : (
        <ul className="item-list">
          {filteredItems.map((item) => (
            <li key={item.id} className="item-row">
              <Link href={`/items/${item.id}`} className="item-link">
                <h2>{item.name}</h2>
                <p className="item-category">{item.category}</p>
                <p className="item-description">{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
