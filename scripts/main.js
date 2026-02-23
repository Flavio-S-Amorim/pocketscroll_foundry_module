/**
 * PocketScroll Socket Bridge — Loader Stub
 * Fetches the module code from the PocketScroll server at runtime.
 * GM just installs and activates — no configuration needed.
 */

const PS_ENDPOINT = "https://kbgdqplwyzapqeetfwkj.supabase.co/functions/v1/serve-module";
const PS_API_KEY = "sb_publishable_OMKTl_YcYqBwZbWpfkmE9g_ZSBMYT4V";

Hooks.once("ready", async () => {
    console.log("PocketScroll Socket | Loading module...");

    try {
        const worldId = game.world?.id || "unknown";
        const resp = await fetch(PS_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${PS_API_KEY}`,
            },
            body: JSON.stringify({ worldId }),
        });

        if (!resp.ok) {
            throw new Error(`Server returned ${resp.status}: ${resp.statusText}`);
        }

        const code = await resp.text();

        // Try execution methods in order of preference
        if (await tryBlobImport(code)) return;
        if (tryNewFunction(code)) return;
        if (tryScriptInject(code)) return;

        throw new Error("All code execution methods blocked by CSP");
    } catch (err) {
        console.error("PocketScroll Socket | Failed to load module:", err);
        ui.notifications?.error(
            "PocketScroll: Could not load module. Check your internet connection and try reloading.",
            { permanent: true }
        );
    }
});

async function tryBlobImport(code) {
    try {
        const blob = new Blob([code], { type: "text/javascript" });
        const url = URL.createObjectURL(blob);
        try {
            await import(url);
            console.log("PocketScroll Socket | Loaded via blob import");
            return true;
        } finally {
            URL.revokeObjectURL(url);
        }
    } catch {
        console.warn("PocketScroll Socket | Blob import blocked, trying fallback...");
        return false;
    }
}

function tryNewFunction(code) {
    try {
        new Function(code)();
        console.log("PocketScroll Socket | Loaded via Function constructor");
        return true;
    } catch {
        console.warn("PocketScroll Socket | Function constructor blocked, trying fallback...");
        return false;
    }
}

function tryScriptInject(code) {
    try {
        const script = document.createElement("script");
        script.textContent = code;
        document.head.appendChild(script);
        document.head.removeChild(script);
        console.log("PocketScroll Socket | Loaded via script injection");
        return true;
    } catch {
        console.warn("PocketScroll Socket | Script injection blocked");
        return false;
    }
}
