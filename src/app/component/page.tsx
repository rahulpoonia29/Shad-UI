"use client";

// pages/editor.js
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import AceEditor to avoid SSR issues
import AceEditor from "react-ace";

// Import Ace editor themes and modes
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/theme-github";

export default function EditorPage() {
    const [code, setCode] = useState("<div>Hello, world!</div>");

    // Function to handle code change
    const handleChange = (newCode: any) => {
        setCode(newCode);
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div style={{ flex: 1, borderRight: "1px solid #ddd" }}>
                <AceEditor
                    mode="jsx"
                    theme="github"
                    name="codeEditor"
                    value={code}
                    onChange={handleChange}
                    editorProps={{ $blockScrolling: true }}
                    style={{ height: "100%", width: "100%" }}
                />
            </div>
            <div style={{ flex: 1, padding: "10px" }}>
                <iframe
                    srcDoc={`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>Preview</title>
              </head>
              <body>
                <div id="root">${code}</div>
              </body>
            </html>
          `}
                    style={{ width: "100%", height: "100%", border: "none" }}
                />
            </div>
        </div>
    );
}
