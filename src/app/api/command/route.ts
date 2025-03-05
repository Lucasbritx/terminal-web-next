import { exec } from "child_process";

export async function POST(req: Request) {
    try {
        const { command } = await req.json();
        if (!command) return new Response(JSON.stringify({ error: "Command is required" }), { status: 400 });

        return new Promise((resolve) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    resolve(new Response(JSON.stringify({ error: stderr }), { status: 500 }));
                } else {
                    resolve(new Response(JSON.stringify({ output: stdout }), { status: 200 }));
                }
            });
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
    }
}