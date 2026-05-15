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
 * src/wasmIndex/systemPulse
 */
export declare function systemPulse(): void;
/** src/System/System */
declare class __Internref8 extends Number {
  private __nominal8: symbol;
  private __nominal9: symbol;
  private __nominal0: symbol;
}
