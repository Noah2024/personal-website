let memory;
let wasmInstance;
let CPU_ACTIVE = false;
const decoder = new TextDecoder("utf-16le");

//To do next
// Add a toggle to ansci color codes on the log output of the CPU
// - Test if that fixes things for the prefixed bytes
//Test if the toggle allows for the use of the null terminator again


//ChatGPT gen here
// function readUtf16WasmString(ptr) {

//     let start = ptr >>> 1; // faster than /2

//     let end = start;

//     // safety cap prevents infinite loops
//     const max = memory.length;

//     while (end < max && memory[end] !== 0) {
//         end++;
//     }

//     // slice is fine (views, no copy yet)
//     const slice = memory.subarray(start, end);

//     // FAST conversion (no spread)Uint8Array
//     return String.fromCharCode.apply(null, slice);
// }

// function readUtf16(ptr) {
  
//     // memory is already Uint16Array
//       const memory = new Uint16Array(wasmInstance.exports.memory.buffer); // ALWAYS fresh view

//     // 1. Read u16 length prefix
//     const len = memory[ptr / 2];
//     console.log("LEN AS:", len)

//     // 2. Move past prefix (1 UTF-16 unit = 2 bytes)
//     const start = (ptr / 2) + 1;

//     // 3. Extract UTF-16 slice
//     const slice = memory.subarray(start, start + len);

//     // 4. Convert UTF-16 code units → JS string
//     return String.fromCharCode(...slice);
// }
function readUtf16(ptr) {
    const memory = new Uint16Array(wasmInstance.exports.memory.buffer);

    // read 2x u16 prefix (little-endian)
    const low = memory[ptr / 2];
    const high = memory[(ptr / 2) + 1];
    const len = low | (high << 8);

    const start = (ptr / 2) + 2;
    const slice = memory.subarray(start, start + len);

    return String.fromCharCode(...slice);
}

const imports = {
  env: {
    abort: (msg, file, line, col) => {
      throw new Error(`WASM abort`);
    },
    "console.log": (...args) => {
        console.log("[wasm]", readUtf16(...args));
        // console.log("[wasm]", ...args);

    }
  }
};

async function loadWasm()  {
  const response = await fetch("../projects/tsiram/websrc/debug.wasm");
  const bytes = await response.arrayBuffer();
  const { instance, module } = await WebAssembly.instantiate(bytes, imports);

  wasmInstance = instance;
  // memory = new Uint16Array(instance.exports.memory.buffer);

  console.log("Instantiated CPU")

  return instance;
}

loadWasm().then(instance => {
  // startSystem()
  //Esnures wasm memory has been instanciated firs
  // instance.exports.initWasm() 
  // console.log("Exports:", readUtf16(instance.exports.initWasm()));
  // instance.exports.start
  // // const memory = new Uint16Array(instance.exports.memory.buffer);

  // // console.log(Object.keys(instance.exports));
  // // instance.exports["$export:src/wasmIndex/createAndLoadSystem"]();
  // let out = instance.exports.createAndLoadSystem()
  // console.log(readUtf16WasmString(out))
  // let out2 = instance.exports.startSystem();  

  // console.log("START")
  // console.log(out)
  // console.log(out2)
  // console.log("FIN")
  // console.log(`WHAT THE FUCKING FUCKER FUCKING $}`)
});

function startSystem(){
  console.log("Starting system...")
  let system = wasmInstance.exports.startSystem();
  CPU_ACTIVE = true
  console.log("System Started")

  const clockLoop = setInterval(() => {
    if (!CPU_ACTIVE) {
        clearInterval(clockLoop);
        return;
    }
    wasmInstance.exports.systemPulse();
  }, 20); //I think this is in ms 
}

function stopSystem(){
    CPU_ACTIVE = false
}

const btn = document.getElementById('StartSystem');
btn.onclick = function() {
  startSystem()
};

const btn2 = document.getElementById('StopSystem');
btn2.onclick = function() {
  stopSystem()
};