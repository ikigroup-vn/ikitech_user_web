import React, { useRef, useState, useEffect } from "react";

export default function SignatureCanvas({ onSave }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineWidth = 2;
    context.strokeStyle = "#000000";
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    // Get correct coordinates for both mouse and touch events
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    // Get correct coordinates for both mouse and touch events
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.closePath();
      setIsDrawing(false);
      if (onSave) {
        onSave(canvas.toDataURL());
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (onSave) {
      onSave(null);
    }
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    console.log(canvas.toDataURL());
    if (onSave) {
      onSave(canvas.toDataURL());
    }
  };

  return (
    <div className="signature-pad">
      <canvas
        ref={canvasRef}
        width={300}
        height={100}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        style={{
          border: "1px solid #000",
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "300px",
        }}
      ></canvas>
      <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
        <button
          onClick={clearCanvas}
          style={{
            padding: "2px 8px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          Xóa
        </button>
        <button
          onClick={saveSignature}
          style={{
            padding: "2px 8px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          Lưu
        </button>
      </div>
    </div>
  );
}
