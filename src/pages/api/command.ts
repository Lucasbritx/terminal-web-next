import { exec } from "child_process";

export default function handler(req: any, res: any) {
    if (req.method !== "POST") return res.status(405).end();

    const { command } = req.body;
    if (!command) return res.status(400).json({ error: "Command is required" });

    exec(command, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ error: stderr });
        res.status(200).json({ output: stdout });
    });
}