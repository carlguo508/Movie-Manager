import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

export function Rating({ value, onChange, readOnly = false }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[...Array(10)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <button
            key={i}
            type="button"
            disabled={readOnly}
            className={cn(
              "transition-all duration-200 focus:outline-none",
              readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"
            )}
            onClick={() => onChange && onChange(ratingValue)}
            onMouseEnter={() => !readOnly && setHover(ratingValue)}
            onMouseLeave={() => !readOnly && setHover(0)}
          >
            <Star
              className={cn(
                "w-4 h-4",
                ratingValue <= (hover || value)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-600"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
