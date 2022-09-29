# fix syscall/js

1. setting => `go tools env`

2. as follow

```
{
  "go.toolsEnvVars": {
    "GOOS": "js",
    "GOARCH": "wasm"
  }
}
```
