"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface UploadZoneProps {
  onUploadComplete?: (docId: string) => void;
  compact?: boolean;
}

export function UploadZone({ onUploadComplete, compact = false }: UploadZoneProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    setUploading(true);
    setProgress(10);

    try {
      const supabase = createClient();

      // Get current user (authenticated with Supabase server)
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        toast.error("Please sign in to upload documents.");
        setUploading(false);
        return;
      }

      // Get session for access token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Session expired. Please sign in again.");
        setUploading(false);
        return;
      }

      const accessToken = session.access_token;
      setProgress(20);

      // Get signed upload URL from our backend
      const sigRes = await fetch(`${API_URL}/auth/signature`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ filename: file.name, content_type: file.type }),
      });

      if (!sigRes.ok) {
        throw new Error("Failed to get upload signature");
      }

      const { signed_url, path } = await sigRes.json();
      setProgress(40);

      // Upload directly to Supabase Storage
      const uploadRes = await fetch(signed_url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload file to storage");
      }

      setProgress(70);

      // Register document in our backend
      const docRes = await fetch(`${API_URL}/documents/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          filename: file.name,
          storage_path: path,
          user_id: user.id,
        }),
      });

      if (!docRes.ok) {
        throw new Error("Failed to register document");
      }

      const { id: docId } = await docRes.json();
      setProgress(90);

      // Trigger analysis
      await fetch(`${API_URL}/documents/${docId}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ user_id: user.id }),
      });

      setProgress(100);
      toast.success("Document uploaded and analysis started!");
      onUploadComplete?.(docId);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      toast.error(message);
    } finally {
      setUploading(false);
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    disabled: uploading,
  });

  if (compact) {
    return (
      <div
        {...getRootProps()}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition-colors ${
          isDragActive
            ? "border-zinc-400 bg-zinc-50 dark:bg-zinc-800"
            : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
        ) : (
          <Upload className="w-4 h-4 text-zinc-500" />
        )}
        <span className="text-sm font-medium">
          {uploading ? `${Math.round(progress)}%` : "Upload PDF"}
        </span>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`w-full max-w-lg flex flex-col items-center justify-center px-4 sm:px-8 py-8 sm:py-12 rounded-2xl border-2 border-dashed cursor-pointer transition-colors ${
        isDragActive
          ? "border-black dark:border-white bg-zinc-50 dark:bg-zinc-900"
          : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600"
      }`}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-zinc-400" />
          <div className="w-48 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
            <div
              className="h-full bg-black dark:bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-zinc-500">Uploading and analyzing...</p>
        </div>
      ) : (
        <>
          <div className="w-12 h-12 sm:w-16 sm:h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-500" />
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="font-semibold text-base text-black dark:text-white">
              {isDragActive ? "Drop your PDF here" : "Drop a PDF or click to upload"}
            </p>
            <p className="text-sm text-zinc-500">
              Pitch decks and financial reports supported
            </p>
          </div>
        </>
      )}
    </div>
  );
}