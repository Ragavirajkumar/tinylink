
// components/CopyButton.tsx
"use client";

export default function CopyButton({ code }: any) {
  const copy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${code}`
    );
    alert("Copied!");
  };

  return (
    <button
      onClick={copy}
      className="bg-gray-700 text-white px-2 py-1 rounded"
    >
      Copy
    </button>
  );
}
