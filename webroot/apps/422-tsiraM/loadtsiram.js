let memory;
let wasmInstance;
let CPU_ACTIVE = false;
let CLOCK_INTERVAL = 20;
let clockLoop;
const decoder = new TextDecoder("utf-16le");
const outputLog = document.getElementsByClassName("cpu-log")[0]
const outputReal = document.getElementsByClassName("cpu-output")[0]
const programSelect = document.getElementById("ProgramSelect")
const programInput = document.getElementById("ProgramInput")
const programs = new Map();

//ToDo
// NEED TO ORGANZIE THIS FILE BETTER

//Checking if there exists an output contianer for tsiram to output to
if (outputLog == undefined){
  console.log("Could not find location for tsiram log output, defaulting to console log only")
}
if (outputReal == undefined){
  console.log("Could not find location for tsiram output, defaulting to console log only")
}

//Declaring preset programs
programs.set("Hello World", `0xA2, 0x03, 0xFF, 0x06, 0x00, 0x00, 0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x20, 0x57, 0x6F, 0x72, 0x6C, 0x64, 0x21, 0x0A, 0x00`)
programs.set("Two + Two", `0xA9, 0x02, 0x8D, 0x10, 0x00, 0x6D, 0x10, 0x00, 0xA2, 0x01, 0xA8, 0xFF, 0x00`)
programs.set("Tribonacci", `0xA9, 0x01,
            0x8D, 0x47 ,0x00,
            0x8D, 0x48, 0x00,
            0xA9, 0x0B,
            0x8D, 0x4B, 0x00,
            0xEC, 0x4B, 0x00,
            0xD0, 0x02, 0x00,
            0x00,
            0xA2, 0x01,
            0xAC, 0x49, 0x00,
            0xFF,
            0xAD, 0x47, 0x00,
            0x8D, 0x4A, 0x00,
            0x6D, 0x48, 0x00,
            0x6D, 0x49, 0x00,
            0x8D, 0x47, 0x00,
            0xAD, 0x48, 0x00,
            0x8D, 0x49, 0x00,
            0xAD, 0x4A, 0x00,
            0x8D, 0x48, 0x00,
            0xA9, 0xFF,
            0x6D, 0x4B, 0x00,
            0x8D, 0x4B, 0x00,
            0xA2, 0x00,
            0xEC, 0x4B, 0x00,
            0xD0, 0xD0, 0x00,
            0x00`)

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
    }
  }
};

async function loadWasm()  {
  const response = await fetch("./websrc/debug.wasm");
  const bytes = await response.arrayBuffer();
  const { instance, module } = await WebAssembly.instantiate(bytes, imports);

  wasmInstance = instance;
  // memory = new Uint16Array(instance.exports.memory.buffer);

  console.log("Instantiated CPU")

  return instance;
}

loadWasm().then(instance => {

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
  writeImmediate(0, parseHexBytes(programInput.value))
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

//Turns string to bytes
function parseHexBytes(input) {
  return input
    .split(",")
    .map(x => x.trim())                 // remove spaces/newlines
    .filter(x => x.length > 0)         // remove empty entries
    .map(x => parseInt(x, 16))         // convert hex → number
}

function parseToI32Array(str) {
  return str
    .split(",")
    .map(x => x.trim())
    .filter(x => x.length > 0)
    .map(x => parseInt(x, 16))
}

function writeImmediate(index, bytes){
  console.log(index, bytes)

  for (let i = index; i < bytes.length-1; i++){
    wasmInstance.exports.writeImmediate(i, bytes[i])
  }
  // console.log(bytesAsArray)

  // wasmInstance.exports.writeImmediate(0, bytesAsArray)
}

programSelect.addEventListener("change", () => {
  console.log(programSelect.value)
  if (programSelect != undefined && programInput != undefined){
    programInput.value = programs.get(programSelect.value)
  }
})