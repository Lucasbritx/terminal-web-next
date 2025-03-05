"use client";
import { useState } from "react";

export default function Terminal() {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState("");

    const executeCommand = async () => {
        const res = await fetch("/api/command", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ command }),
        });

        const data = await res.json();
        setOutput(data.output || data.error);
    };

    return (
        <div style={{ padding: 20 }}>
            <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Enter command"
            />
            <button onClick={executeCommand}>Run</button>
            <p>{output}</p>
        </div>
    );
}