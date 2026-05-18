let memory;
let wasmInstance;
let CPU_ACTIVE = false;
let CLOCK_INTERVAL = 20;
let clockLoop;
const decoder = new TextDecoder("utf-16le");
const outputLog = document.getElementsByClassName("cpu-log")[0]
const outputReal = document.getElementsByClassName("cpu-output")[0]

//Checking if there exists an output contianer for tsiram to output to
if (outputLog == undefined){
  console.log("Could not find location for tsiram log output, defaulting to console log only")
}
if (outputReal == undefined){
  console.log("Could not find location for tsiram output, defaulting to console log only")
}

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
        let str = readUtf16(...args);
        console.log("[tsiram]", str);
        htmlOutputWrapper(str)
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
  //Checking if the user has set a valid clockInterval
  if (setClockInterval() == false ){
    return;
  }
  console.log("System Started")
  console.log(CLOCK_INTERVAL)

  clockLoop = setInterval(() => {
    //CPU_ACTIVE represents the UI's ability to stop the clock, and clear its interval
    //the CPU has a clockactive variable which can be set by the CPU to stopi tself (like when it reaches the end of its program)
    if (!CPU_ACTIVE) {
        clearInterval(clockLoop);
        return;
    }
    wasmInstance.exports.systemPulse();
  }, CLOCK_INTERVAL);
}

function stopSystem(){
    wasmInstance.exports.stopSystem()
    clearInterval(clockLoop)
}

function restartSystem(){
  wasmInstance.exports.restartSystem()
}

//This is the function to check if the CPU has decided internally to stop execution
function clockStatus(){
   return wasmInstance.exports.clockStatus();
}

const btn = document.getElementById('StartSystem');
btn.onclick = function() {
  startSystem()
};

const btn2 = document.getElementById('StopSystem');
btn2.onclick = function() {
  stopSystem()
};

const btn3 = document.getElementById('RestartSystem');
btn3.onclick = function(){
  restartSystem()
  if (outputLog != undefined){
    outputLog.innerHTML = "";
    outputReal.innerHTML = "";
     clearInterval(clockLoop)
  }
}

const clockInput = document.getElementById("CLOCK_INTERVAL")
function setClockInterval() {
  if (clockInput.value.trim() === "") {
    htmlOutputWrapper("CLOCK_INTERVAL cannot be empty")
    return false
  }

  const value = Number(clockInput.value)

  if (!Number.isInteger(value)) {
    htmlOutputWrapper("CLOCK_INTERVAL must be a valid integer")
    return false
  }

  CLOCK_INTERVAL = value
  return true
}

function htmlOutputWrapper(output){
  if (outputLog != undefined){
    outputLog.innerHTML += `<p> ${output} </p>`  
    outputLog.scrollTop = outputLog.scrollHeight
    if (output.slice(0,1) != "["){
      outputReal.innerHTML += `${output} `
    }
  }
}

// const textarea = document.querySelector(".ProgramInput")

// function forceCursorEnd() {
//   console.log("Bruh")
//   console.log(JSON.stringify(textarea.value))
//   const end = textarea.value.length
//   textarea.setSelectionRange(end, end)
// }

// textarea.addEventListener("focus", () => setTimeout(forceCursorEnd, 0))
// textarea.addEventListener("click", () => setTimeout(forceCursorEnd, 0))
// textarea.addEventListener("keyup", forceCursorEnd)