"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ProductRow } from "@/lib/csv";

type ProductsTableProps = {
  rows: ProductRow[];
};

export function ProductsTable({ rows }: ProductsTableProps) {
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return rows;
    }

    return rows.filter((row) =>
      [row.type, row.specie, row.variety].some((value) =>
        value.toLowerCase().includes(normalized),
      ),
    );
  }, [query, rows]);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) {
      return;
    }

    const updateHeaderHeight = () => {
      setHeaderHeight(header.getBoundingClientRect().height);
    };

    updateHeaderHeight();

    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const search = searchRef.current;
    if (!search) {
      return;
    }

    const updateSearchHeight = () => {
      setSearchHeight(search.getBoundingClientRect().height);
    };

    updateSearchHeight();

    const observer = new ResizeObserver(updateSearchHeight);
    observer.observe(search);

    return () => {
      observer.disconnect();
    };
  }, []);

  const tableHeadTop = headerHeight + searchHeight;

  return (
    <div>
      <div
        ref={searchRef}
        className="sticky z-40 -mx-6 mb-6 bg-white px-6 py-4 lg:-mx-8 lg:px-8"
        style={{ top: headerHeight }}
      >
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>
        <input
          id="product-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by type, specie, or variety…"
          className="w-full max-w-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-skyline-teal"
        />
        <p className="mt-2 text-sm text-skyline-gray-light">
          Showing {filteredRows.length.toLocaleString()} of {rows.length.toLocaleString()} products
        </p>
      </div>

      <div className="rounded-xl border border-black/10 shadow-sm">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
            <thead
              className="sticky z-30 bg-skyline-green-dark text-white shadow-[0_1px_0_rgba(0,0,0,0.15)]"
              style={{ top: tableHeadTop }}
            >
              <tr>
                <th className="px-4 py-3 font-[family-name:var(--font-oswald)] text-xs font-medium uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 font-[family-name:var(--font-oswald)] text-xs font-medium uppercase tracking-wider">
                  Specie
                </th>
                <th className="px-4 py-3 font-[family-name:var(--font-oswald)] text-xs font-medium uppercase tracking-wider">
                  Variety
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, index) => (
                <tr
                  key={`${row.type}-${row.specie}-${row.variety}-${index}`}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border-t border-black/5 px-4 py-2.5 align-top font-medium text-skyline-gray">
                    {row.type}
                  </td>
                  <td className="border-t border-black/5 px-4 py-2.5 align-top text-skyline-gray-light">
                    {row.specie}
                  </td>
                  <td className="border-t border-black/5 px-4 py-2.5 align-top text-skyline-gray-light">
                    {row.variety || "—"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
