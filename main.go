package main

import (
	"fmt"
	"syscall/js"
)

func add(this js.Value, p []js.Value) interface{} {
	a := p[0].Float()
	b := p[1].Float()
	result := a + b
	return js.ValueOf(result)
}

func main() {
	done := make(chan struct{})

	js.Global().Set("add", js.FuncOf(add))

	fmt.Println("WASM loaded!")
	<-done
}
