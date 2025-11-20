"use client";

import React from "react";
import CopyButton from "./CopyButton";

export default function LinkTable({
  links,
  reloadLinks,
  loading
}: {
  links: any[];
  reloadLinks: () => void;
  loading: boolean;
}) {

  if (loading)
    return <p className="text-gray-500 animate-pulse">Loading links...</p>;

  if (!links || links.length === 0)
    return <p className="text-gray-500 text-center py-4">No links created yet.</p>;

  return (
    <table className="w-full rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gray-50 text-gray-700 text-sm">
          <th className="p-3 text-left">Code</th>
          <th className="p-3 text-left">URL</th>
          <th className="p-3 text-center">Clicks</th>
          <th className="p-3 text-left">Last Click</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {links.map((link) => (
          <tr key={link.id} className="hover:bg-gray-50 transition">

            <td className="p-3 font-semibold">{link.code}</td>

            <td className="p-3 max-w-sm truncate text-blue-600">
              {link.url}
            </td>

            <td className="p-3 text-center">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm">
                {link.clicks}
              </span>
            </td>

            <td className="p-3 text-gray-700">
              {link.last_clicked ? new Date(link.last_clicked).toLocaleString() : "Never"}
            </td>

            <td className="p-3 flex gap-3">
              <CopyButton code={link.code} />

              <button
                onClick={async () => {
                  await fetch(`/api/links/${link.code}`, { method: "DELETE" });
                  reloadLinks();
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
              >
                Delete
              </button>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  );
}
