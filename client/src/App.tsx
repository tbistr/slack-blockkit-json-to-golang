import { useState } from "react";
import { useWasm } from "./wasm";

function App() {
	const wasm = useWasm();
	const [json, setJson] = useState<string>("");
	const [result, setResult] = useState<string>();

	const onClick = () => {
		if (wasm.funcs) {
			setResult(wasm.funcs.toGoStruct(json));
		}
		console.log(result);
	};

	if (wasm.loading) {
		return <p>Loading...</p>;
	}

	if (wasm.error) {
		return <div>Error loading WebAssembly: {wasm.error.message}</div>;
	}

	return (
		<div>
			<h1>Wasm Consumer</h1>

			<input
				type="text"
				id="a"
				value={json}
				onChange={(e) => setJson(e.target.value)}
			/>
			<button type="button" onClick={onClick}>
				Make Go Struct
			</button>
			{result !== null && <p>Result: {result}</p>}
		</div>
	);
}

export default App;
