"use client";

// import "@/global.css";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <h1 className="text-2xl font-bold">Loading...</h1>
      <p>Loading something</p>
    </div>
  );
}
