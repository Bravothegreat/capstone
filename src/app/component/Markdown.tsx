

// import React, { useState, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import MdEditor from "react-markdown-editor-lite";
// import "react-markdown-editor-lite/lib/index.css";

// // You can use localStorage to save content for simplicity or an API to persist data.
// const saveMarkdown = (content) => {
//   localStorage.setItem("markdownContent", content);
// };

// const loadMarkdown = () => {
//   return localStorage.getItem("markdownContent") || "";
// };

// const MarkdownEditor = () => {
//   const [content, setContent] = useState(loadMarkdown);
//   const [isEditing, setIsEditing] = useState(true);

//   const handleEditorChange = ({ html, text }) => {
//     setContent(text);
//   };

//   const handleSave = () => {
//     saveMarkdown(content);
//     setIsEditing(false);
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   return (
//     <div className="markdown-editor">
//       {isEditing ? (
//         <div>
//           <MdEditor
//             value={content}
//             style={{ height: "500px" }}
//             renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
//             onChange={handleEditorChange}
//           />
//           <button onClick={handleSave} className="save-button">
//             Save
//           </button>
//         </div>
//       ) : (
//         <div>
//           <ReactMarkdown>{content}</ReactMarkdown>
//           <button onClick={handleEdit} className="edit-button">
//             Edit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MarkdownEditor;
