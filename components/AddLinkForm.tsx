// components/AddLinkForm.tsx
"use client";

import { useState } from "react";

export default function AddLinkForm({ reloadLinks }: any) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [urlError, setUrlError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  function validateUrl(value: string) {
    try {
      new URL(value);
      setUrlError("");
      return true;
    } catch {
      setUrlError("Please enter a valid URL");
      return false;
    }
  }

  function validateCode(value: string) {
    if (!value) return true;

    if (!/^[A-Za-z0-9]{6,8}$/.test(value)) {
      setCodeError("Code must be 6–8 letters/numbers");
      return false;
    }

    setCodeError("");
    return true;
  }

  async function submit(e: any) {
    e.preventDefault();
    setServerError("");
    setSuccess("");

    if (!validateUrl(url)) return;
    if (!validateCode(code)) return;

    setLoading(true);

    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, code }),
    });

    setLoading(false);

    const data = await res.json();

    if (!res.ok) {
      setServerError(data.error || "Something went wrong");
      return;
    }

    setUrl("");
    setCode("");
    setSuccess("Link created successfully!");
    reloadLinks();
setUrl("");
setCode("");
  }

  return (
    <form onSubmit={submit} className="space-y-4">

      <div>
        <input
          className="border bg-gray-50 p-3 w-full rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            validateUrl(e.target.value);
          }}
          placeholder="Enter long URL"
          required
        />
        {urlError && <p className="text-red-600 text-sm mt-1">{urlError}</p>}
      </div>

      <div>
        <input
          className="border bg-gray-50 p-3 w-full rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            validateCode(e.target.value);
          }}
          placeholder="Custom code (optional)"
        />
        {codeError && <p className="text-red-600 text-sm mt-1">{codeError}</p>}
      </div>

      {serverError && <p className="text-red-600 text-sm">{serverError}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      <button
  type="submit"
  disabled={loading || urlError !== "" || codeError !== "" || url === ""}
  className={`w-full py-3 rounded-md text-white font-semibold transition
    ${
      loading || urlError || codeError || url === ""
        ? "bg-blue-300 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }
  `}
>
  {loading ? "Creating..." : "Create Link"}
</button>

    </form>
  );
}
