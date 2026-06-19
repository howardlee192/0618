"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { motion, useSpring, useMotionTemplate } from "framer-motion";

type AsciiArtHoverProps = {
  src: string;
  resolution?: number;
  charset?: "standard" | "blocks" | "binary" | "dots";
  color?: string;
  className?: string;
};

export const AsciiArtHover: React.FC<AsciiArtHoverProps> = ({
  src,
  resolution = 80, // 降低解析度讓符號變大、變少，增加呼吸空間
  charset = "mixed",
  color = "#888888", // 與設計稿相符的灰色
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const [asciiData, setAsciiData] = useState<{ char: string; r: number; g: number; b: number }[][]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Framer Motion Springs for smooth cursor tracking and radius animation
  const mouseX = useSpring(0, { stiffness: 400, damping: 40 });
  const mouseY = useSpring(0, { stiffness: 400, damping: 40 });
  const radius = useSpring(0, { stiffness: 300, damping: 30 });

  const clipPath = useMotionTemplate`circle(${radius}px at ${mouseX}px ${mouseY}px)`;

  const charsets = {
    standard: " .,:;i1tfLCG08@",
    blocks: " -≡░▒▓█", // 黑白反轉：改變明暗與密度的對應關係
    mixed: "    .,-:;~+*oO08#@M", // 混合標點、英文與數字，並加重暗處的留白
    binary: " 01",
    dots: " ·•●",
  };

  // 1. 預先計算圖片的 ASCII 矩陣
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const cols = resolution;
      const rows = Math.floor(cols * (img.height / img.width)); // 動態計算比例，確保不論圖片比例都能適應
      canvas.width = cols;
      canvas.height = rows;
      
      ctx.drawImage(img, 0, 0, cols, rows);
      try {
        const imgData = ctx.getImageData(0, 0, cols, rows);
        const data = imgData.data;
        const result = [];
        const targetCharset = charsets[charset];

        for (let y = 0; y < rows; y++) {
          const row = [];
          for (let x = 0; x < cols; x++) {
            const idx = (y * cols + x) * 4;
            const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx + 3];
            const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            const charIdx = Math.floor((a === 0 ? 0 : brightness) * (targetCharset.length - 1));
            row.push({ char: targetCharset[charIdx] || " ", r, g, b });
          }
          result.push(row);
        }
        setAsciiData(result);
        setIsLoaded(true);
      } catch (e) {
        console.error("CORS issue or canvas error", e);
      }
    };
  }, [src, resolution, charset]);

  // 2. 繪製 Canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || asciiData.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    // 取得容器的精準尺寸，確保自適應
    const cw = container.clientWidth;
    const ch = container.clientHeight;

    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    ctx.scale(dpr, dpr);

    // 背景填滿與網站同色的淺灰，讓 ASCII 自然融合
    ctx.fillStyle = "#F0F0F0"; 
    ctx.fillRect(0, 0, cw, ch);

    const rows = asciiData.length;
    const cols = asciiData[0].length;
    const charWidth = cw / cols;
    const charHeight = ch / rows;

    // 縮小字體比例，讓符號之間產生「呼吸感」與稍微的距離
    ctx.font = `${Math.min(charWidth * 0.9, charHeight * 0.7)}px monospace`;
    ctx.textBaseline = "top";
    ctx.textAlign = "center";

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const pixel = asciiData[y][x];
        ctx.fillStyle = color; // 這裡可自訂顏色
        ctx.fillText(pixel.char, x * charWidth + charWidth / 2, y * charHeight);
      }
    }
  }, [asciiData, color]);

  // 當載入完成後繪製，並監聽視窗縮放以重繪
  useEffect(() => {
    if (isLoaded) {
      drawCanvas();
      window.addEventListener("resize", drawCanvas);
      return () => window.removeEventListener("resize", drawCanvas);
    }
  }, [isLoaded, drawCanvas]);

  // 3. 滑鼠事件處理 (更新 Framer Motion 的值)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // 進去時瞬間設定座標，才不會從 (0,0) 飛過來
    mouseX.jump(e.clientX - rect.left);
    mouseY.jump(e.clientY - rect.top);
    radius.set(120); // 展開圓形遮罩
  };

  const handleMouseLeave = () => {
    radius.set(0); // 縮小圓形遮罩至消失
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden group cursor-crosshair", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 底層：正常照片 */}
      <img
        ref={imageRef}
        src={src}
        alt="Profile"
        className="w-full h-full object-cover block grayscale"
      />

      {/* 上層：ASCII 濾鏡 Canvas，透過 clipPath 產生圓形遮罩透視效果 */}
      <motion.canvas
        ref={canvasRef}
        style={{ clipPath }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};
