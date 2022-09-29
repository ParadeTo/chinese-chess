package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"syscall/js"
	"unsafe"
)

func getHash(this js.Value, args []js.Value) any {
	unit8Array := args[0]
	len := unit8Array.Get("byteLength").Int()
	array := make([]byte, len)
	js.CopyBytesToGo(array, unit8Array)
	hash := md5.Sum(array)
	fmt.Printf("%s", string(hash[:]))
	return js.ValueOf(hex.EncodeToString(hash[:]))
}

// InitializeWasmMemory initializes wasm memory of passed length and returns a pointer
func initializeWasmMemory(this js.Value, args []js.Value) interface{} {

	var ptr *[]uint8
	goArrayLen := args[0].Int()

	goArray := make([]uint8, goArrayLen)
	ptr = &goArray

	boxedPtr := unsafe.Pointer(ptr)
	boxedPtrMap := map[string]interface{}{
		"internalptr": boxedPtr,
	}
	return js.ValueOf(boxedPtrMap)
}

func main() {
	quit := make(chan struct{}, 0)
	js.Global().Set("getHash", js.FuncOf(getHash))
	js.Global().Set("initializeWasmMemory", js.FuncOf(initializeWasmMemory))
	<-quit
}

// https://github.com/gptankit/go-wasm
