"use client";

import { X } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
}

export function UploadModal({ open, onClose }: UploadModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-[var(--panel-2)] transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center gap-2 mb-6 text-center">
          <h2 className="text-xl font-semibold text-white">Upload New Document</h2>
          <p className="text-sm text-[var(--muted)]">Upload PDFs for instant AI analysis</p>
        </div>

        <UploadZone onUploadComplete={onClose} />
      </div>
    </div>
  );
}
