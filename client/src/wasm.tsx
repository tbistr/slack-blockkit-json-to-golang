import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface Funcs {
	Add: typeof add;
}

declare function add(a: number, b: number): number;

const WASM_BIN = "/main.wasm";

const initWasm = async (): Promise<Funcs> => {
	const go = new Go();
	const result = await WebAssembly.instantiateStreaming(
		fetch(WASM_BIN),
		go.importObject,
	);
	const instance = result.instance;
	go.run(instance);
	return {
		Add: add,
	};
};

interface WasmContextValue {
	funcs?: Funcs;
	loading: boolean;
	error?: Error;
}

const WasmContext = createContext<WasmContextValue>({ loading: true });

export const useWasm = () => useContext(WasmContext);

export const WasmProvider = ({ children }: { children: ReactNode }) => {
	const [state, setState] = useState<WasmContextValue>({ loading: true });

	useEffect(() => {
		initWasm()
			.then((funcs) => setState({ funcs, loading: false }))
			.catch((error) => setState({ error, loading: false }));
	}, []);

	return <WasmContext.Provider value={state}>{children}</WasmContext.Provider>;
};
