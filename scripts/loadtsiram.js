async function readUtf16WasmString(ptr, instance) {
    const memory = new Uint16Array(instance.exports.memory.buffer);

    // ptr is byte offset, Uint16Array uses 2-byte indexing
    let index = ptr / 2;

    let end = index;

    while (memory[end] !== 0) {
        end++;
    }

    const slice = memory.subarray(index, end);

    return String.fromCharCode(...slice);
}

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

  console.log("Exports:", instance.exports.createAndLoadSystem);
  console.log(Object.keys(instance.exports));
  // instance.exports["$export:src/wasmIndex/createAndLoadSystem"]();
  let out = instance.exports.createAndLoadSystem()
  console.log(readUtf16WasmString(out, instance))
  let out2 = instance.exports.startSystem();
  // console.log("START")
  // console.log(out)
  // console.log(out2)
  // console.log("FIN")
  // console.log(`WHAT THE FUCKING FUCKER FUCKING $}`)
  return instance.exports.startSystem;
}

let instance = loadWasm()
// let createAndLoadSystem = loadWasm();
// console.log("PLEASE")
// console.log(createAndLoadSystem)
// console.log("AFTER")


// console.log(`HELLO? WHAT THE FUCKING FUCKER FUCKING2 ${createAndLoadSystem.exports}`)

// let system = tsiram.exports.createAndLoadSystem()
// console.log("plz")
// console.log(system)
// // system.startSystem()
