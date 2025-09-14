"use client";

import { HoverPeek } from "@/components/ui/link-preview"

export const LinkPreview = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <p className="text-lg text-gray-800">
        Hover link for preview:{" "}
        <HoverPeek url="https://21st.dev/?tab=home">
          <a
            href="https://21st.dev/?tab=home"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 underline decoration-blue-400 decoration-dotted hover:text-blue-800 hover:decoration-blue-600 hover:decoration-solid"
          >
            21st.dev
          </a>
        </HoverPeek>
      </p>
    </div>
  );
};