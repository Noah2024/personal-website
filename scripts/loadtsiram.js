const imports = {
  env: {
    abort: (msg, file, line, col) => {
      throw new Error(`WASM abort`);
    },
    "console.log": (...args) => {
      console.log("[wasm]", ...args);
    }
  }
};

async function loadWasm() {
  const response = await fetch("../projects/tsiram/websrc/debug.wasm");
  const bytes = await response.arrayBuffer();

  const { instance, module } = await WebAssembly.instantiate(bytes, imports);

  console.log("Exports:", instance.exports.System);

  return instance;
}

let tsiram = loadWasm();
console.log(tsiram.exports)