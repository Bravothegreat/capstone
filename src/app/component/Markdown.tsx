

"use client";
import React, { useState, ChangeEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useDropzone } from "react-dropzone";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("");
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  };

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setImages((prevImages) => [
          ...prevImages,
          { name: file.name, url: base64data },
        ]);
      };
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const resetMarkdown = () => {
    setMarkdown("");
    setImages([]);
  };

  const saveToFile = async () => {
    const doc = new jsPDF();
    const previewElement = document.querySelector(".preview") as HTMLElement; 
    if (previewElement) {
      const canvas = await html2canvas(previewElement);
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, 10, 180, 160);
      doc.save("markdown.pdf");
    }
  };
  

  return (
    <div className="markdown-editor">
      <h1 className="font-serif text-base md:text-lg flex justify-center text-gray-700 py-3">
        Markdown Support
      </h1>
      <div className="editor-container">
        <textarea
          value={markdown}
          onChange={handleInputChange}
          placeholder="Write your markdown here..."
          rows={10}
          cols={80}
          className="markdown-textarea placeholder:font-mono focus:outline-blue-400"
        />
        <div className="dropzone" {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag & drop images here, or click to select images</p>
        </div>
        {markdown && (
          <div className="button-group ">
            <button
              onClick={resetMarkdown}
              className="reset-button bg-blue-500 hover:bg-blue-400  text-gray-800"
            >
              Reset
            </button>
            <button
              onClick={saveToFile}
              className="save-button bg-green-500 hover:bg-green-400 text-gray-800"
            >
              Save
            </button>
          </div>
        )}
      </div>
      {(markdown || images.length > 0) && (
        <div className="preview-container">
          <h2 className="font-serif text-gray-700">Preview</h2>
          <div className="preview">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
            {images.map((image, index) => (
              <div key={index} className="image-container">
                <img
                  src={image.url}
                  alt={`uploaded-${index}`}
                  className="uploaded-image"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <style jsx>{`
        .markdown-editor {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .editor-container {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }
        .markdown-textarea {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .dropzone {
          padding: 20px;
          border: 2px dashed #ddd;
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
          background-color: #f9f9f9;
          margin-bottom: 10px;
        }
        .dropzone p {
          margin: 0;
          font-size: 14px;
          color: #888;
        }
        .button-group {
          display: flex;
          gap: 10px;
          margin-top: 10px;
          display: flex;
          justify-content: center;
        }
        .reset-button,
        .save-button {
          padding: 10px 15px;
          font-size: 14px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        .preview-container {
          margin-top: 20px;
        }
        .preview {
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 4px;
          background-color: #fff;
        }
        .image-container {
          position: relative;
          display: inline-block;
          margin-top: 10px;
        }
        .uploaded-image {
          max-width: 100%;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .remove-button {
          position: absolute;
          top: 5px;
          right: 5px;
          padding: 5px 10px;
          font-size: 12px;
          background-color: #ff4d4f;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .remove-button:hover {
          background-color: #ff7875;
        }
        @media (max-width: 600px) {
          .markdown-textarea {
            font-size: 14px;
          }
          .dropzone {
            padding: 10px;
          }
          .dropzone p {
            font-size: 12px;
          }
          .reset-button,
          .save-button {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}
