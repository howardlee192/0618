import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Text3DFlipProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  className?: string;
  textClassName?: string;
  flipTextClassName?: string;
  rotateDirection?: "top" | "bottom" | "left" | "right";
  staggerDuration?: number;
}

export default function Text3DFlip({
  text,
  className,
  textClassName,
  flipTextClassName,
  rotateDirection = "top",
  staggerDuration = 0.05,
  ...props
}: Text3DFlipProps) {
  const words = useMemo(() => text.split(" "), [text]);

  const rotateValue =
    rotateDirection === "top"
      ? { rotateX: 90 }
      : rotateDirection === "bottom"
        ? { rotateX: -90 }
        : rotateDirection === "left"
          ? { rotateY: -90 }
          : { rotateY: 90 };

  return (
    <div
      className={cn(
        "group relative flex cursor-pointer overflow-hidden",
        className
      )}
      {...props}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-pre">
          {word.split("").map((char, charIndex) => {
            const delay = (wordIndex * word.length + charIndex) * staggerDuration;
            return (
              <span
                key={charIndex}
                className="relative inline-block [transform-style:preserve-3d]"
              >
                <motion.span
                  initial={{ rotateX: 0, rotateY: 0, y: 0 }}
                  transition={{ duration: 0.5, delay, ease: "easeOut" }}
                  className={cn(
                    "inline-block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0",
                    textClassName
                  )}
                >
                  {char}
                </motion.span>
                <motion.span
                  initial={rotateValue}
                  transition={{ duration: 0.5, delay, ease: "easeOut" }}
                  className={cn(
                    "absolute left-0 top-0 inline-block origin-bottom opacity-0 transition-all duration-500 group-hover:opacity-100",
                    rotateDirection === "top" && "group-hover:translate-y-0 group-hover:rotateX-0",
                    flipTextClassName
                  )}
                  style={{
                    transformOrigin:
                      rotateDirection === "top"
                        ? "bottom"
                        : rotateDirection === "bottom"
                          ? "top"
                          : rotateDirection === "left"
                            ? "right"
                            : "left",
                  }}
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </div>
  );
}
