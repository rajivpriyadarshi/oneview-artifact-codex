"use client";

import React from "react";

export interface ColumnDef<T> {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  keyField: keyof T;
  selectedKey?: string;
  onRowClick?: (row: T) => void;
  className?: string;
}

export function DataTablePrimitive<T extends Record<string, unknown>>({
  columns,
  data,
  keyField,
  selectedKey,
  onRowClick,
  className = "",
}: DataTableProps<T>) {
  return (
    <div className={`overflow-x-auto border border-[rgba(0,0,0,0.06)] rounded-xl bg-white ${className}`}>
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-[#ece8df] bg-[#fbf9f5] text-[#73716a] text-[10px] uppercase tracking-wider">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`py-2.5 px-3 font-semibold ${
                  col.align === "right"
                    ? "text-right"
                    : col.align === "center"
                    ? "text-center"
                    : "text-left"
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f2efe9]">
          {data.map((row) => {
            const isSelected = selectedKey && row[keyField] === selectedKey;
            return (
              <tr
                key={String(row[keyField])}
                onClick={() => onRowClick?.(row)}
                className={`transition-colors ${
                  onRowClick ? "cursor-pointer hover:bg-[#faf7f2]" : ""
                } ${isSelected ? "bg-[#f5eedf] font-medium" : ""}`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`py-3 px-3 text-[#2d2e2a] ${
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    {col.render ? col.render(row) : (row[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
