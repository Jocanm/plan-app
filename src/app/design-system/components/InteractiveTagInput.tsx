"use client";

import { useState } from "react";
import { Label } from "@/components/ui";
import { TagInput } from "@/components/task";

export function InteractiveTagInput() {
  const [tags, setTags] = useState<string[]>(["urgent", "feature"]);

  return (
    <div className="space-y-2">
      <Label>Tag Input</Label>
      <TagInput
        value={tags}
        onChange={setTags}
        placeholder="Add tags..."
        className="max-w-md"
      />
    </div>
  );
}