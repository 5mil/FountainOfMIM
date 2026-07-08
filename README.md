# Fountain of MIM

Zig WASM Faucet for Wasmer.io

## Deploy
1. Build: zig build-lib faucet.zig -target wasm32-wasi -femit-bin=faucet.wasm
2. wasmer deploy

The magic trick and wallet validation run in WASM.