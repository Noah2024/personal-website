/** Exported memory */
export declare const memory: WebAssembly.Memory;
/**
 * src/wasmIndex/initWasm
 * @param name `~lib/string/String`
 * @returns `~lib/string/String`
 */
export declare function initWasm(name: string): string;
/**
 * src/wasmIndex/startSystem
 * @returns `src/System/System | null`
 */
export declare function startSystem(): __Internref8 | null;
/**
 * src/wasmIndex/stopSystem
 */
export declare function stopSystem(): void;
/**
 * src/wasmIndex/systemPulse
 */
export declare function systemPulse(): void;
/**
 * src/wasmIndex/clockstatus
 * @returns `bool`
 */
export declare function clockstatus(): boolean;
/**
 * src/wasmIndex/restartSystem
 */
export declare function restartSystem(): void;
/**
 * src/wasmIndex/writeImmediate
 * @param index `i32`
 * @param byte `i32`
 */
export declare function writeImmediate(index: number, byte: number): void;
/** src/System/System */
declare class __Internref8 extends Number {
  private __nominal8: symbol;
  private __nominal9: symbol;
  private __nominal0: symbol;
}
