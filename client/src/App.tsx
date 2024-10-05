import { useState } from "react";
import { useWasm } from "./wasm";

function App() {
	const wasm = useWasm();
	const [result, setResult] = useState<number>();

	const onClick = () => {
		if (wasm.funcs) {
			setResult(wasm.funcs.Add(5, 3));
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
			<button type="button" onClick={onClick}>
				Add 5 + 3
			</button>
			{result !== null && <p>Result: {result}</p>}
		</div>
	);
}

export default App;
