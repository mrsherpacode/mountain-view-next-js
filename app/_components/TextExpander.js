"use client";

import { useState } from "react";
//This component is made client component using "use client" directive because it uses textExpander that is user interactive.
// children: description text passed from server component, from [cabinId],page.js.

export function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : String(children).split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {/* display text is dynamic version of children depending on user interaction */}
      {displayText}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
}

export default TextExpander;
