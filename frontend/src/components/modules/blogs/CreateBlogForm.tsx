"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function CreateBlogForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!token) {
      setError("You must be logged in to create a blog.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      tags.split(",").map(tag => tag.trim()).forEach(tag => {
        formData.append("tags", tag);
      });
      if (thumbnail) formData.append("thumbnail", thumbnail);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      setLoading(false);

      if (result?.data?.id) {
        toast.success("Blog Created Successfully!")
        router.push("/blogs"); 
      } else {
        setError(result?.message || "Failed to create blog");
        console.error("Blog creation failed:", result);
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 w-full"
    >
      <h2 className="text-xl font-semibold mb-4">Create Blog</h2>

      {error && <p className="text-red-500">{error}</p>}

      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded-md"
        required
      />

      {/* Content */}
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border px-3 py-2 rounded-md"
        rows={6}
        required
      />

      {/* Thumbnail */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && setThumbnail(e.target.files[0])}
      />

      {/* Tags */}
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full border px-3 py-2 rounded-md"
      />

      {/* Featured */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="isFeatured"
            checked={isFeatured === true}
            onChange={() => setIsFeatured(true)}
          />
          Featured
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="isFeatured"
            checked={isFeatured === false}
            onChange={() => setIsFeatured(false)}
          />
          Not Featured
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Creating..." : "Submit"}
      </button>
    </form>
  );
}
