import { Markdown } from "@yamada-ui/markdown";
import { Box, Button, Flex, Stack, Text, Textarea } from "@yamada-ui/react";
import { useState } from "react";
import { useWasm } from "./wasm";

function App() {
	const wasm = useWasm();
	const [json, setJson] = useState<string>("");
	const [result, setResult] = useState<string>("");
	const [error, setError] = useState<string>();

	const onClick = () => {
		if (wasm.funcs) {
			try {
				setResult(wasm.funcs.toGoStruct(json));
			} catch (e) {
				if (e instanceof Error) {
					setError(e.message);
				}
				console.error(e);
			}
			console.log(result);
		}
	};

	if (wasm.loading) {
		return <p>Loading...</p>;
	}

	if (wasm.error) {
		return <div>Error loading WebAssembly: {wasm.error.message}</div>;
	}

	const md = `\`\`\`golang\n${error ? error : result}\n\`\`\``;

	return (
		<Flex height="100vh" direction="column">
			<Text>Wasm Consumer</Text>
			<Flex gap="md" padding="20px" align="center" height="100%">
				<Textarea
					placeholder="basic"
					onChange={(e) => setJson(e.target.value)}
					height="100%"
				/>
				<Button onClick={onClick}>Make Go Struct</Button>
				<Markdown height="100%">{md}</Markdown>
			</Flex>
		</Flex>
	);
}

export default App;
