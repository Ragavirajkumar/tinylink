// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import AddLinkForm from "../components/AddLinkForm";
import LinkTable from "../components/LinkTable";

export default function Dashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function reloadLinks() {
    const res = await fetch(`${baseUrl}/api/links`, { cache: "no-store" });
    const data = await res.json();
    setLinks(data);
    setLoading(false);
  }

  useEffect(() => {
    reloadLinks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-4xl space-y-8">
        
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          TinyLink Dashboard
        </h1>

        {/* ADD LINK FORM (pass reloadLinks) */}
        <div className="bg-white shadow rounded-lg p-6">
          <AddLinkForm reloadLinks={reloadLinks} />
        </div>

        {/* TABLE (pass links + reloadLinks) */}
        <div className="bg-white shadow rounded-lg p-6">
          <LinkTable links={links} reloadLinks={reloadLinks} loading={loading} />
        </div>

      </div>
    </div>
  );
}
