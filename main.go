package main

import (
	"encoding/json"
	"fmt"
	"syscall/js"

	"github.com/k0kubun/pp/v3"
	"github.com/slack-go/slack"
)

func toGoStruct(s string) (res string, err error) {
	var blocks struct {
		Blocks slack.Blocks `json:"blocks,omitempty"`
	}
	err = json.Unmarshal([]byte(s), &blocks)

	pp.Default.SetColoringEnabled(false)
	return pp.Sprint(blocks.Blocks), err
}

func toGoStructWasm(this js.Value, args []js.Value) (ret any) {
	defer func() {
		if rec := recover(); rec != nil {
			ret = js.ValueOf(
				map[string]interface{}{
					"result": "",
					"error":  fmt.Sprintf("panic: %v", rec),
				})
		}
	}()

	res, err := toGoStruct(args[0].String())
	return js.ValueOf(
		map[string]interface{}{
			"result": res,
			"error":  err,
		},
	)
}

func main() {
	done := make(chan struct{})

	js.Global().Set("toGoStructWasm", js.FuncOf(toGoStructWasm))

	fmt.Println("WASM loaded!")
	<-done
}
