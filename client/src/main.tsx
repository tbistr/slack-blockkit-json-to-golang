import { UIProvider } from "@yamada-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { WasmProvider } from "./wasm.tsx";

const root = document.getElementById("root");
if (!root) {
	throw new Error("Root element not found");
}

createRoot(root).render(
	<StrictMode>
		<WasmProvider>
			<UIProvider>
				<App />
			</UIProvider>
		</WasmProvider>
	</StrictMode>,
);
