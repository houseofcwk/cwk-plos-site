/**
 * ESM shim for react-dom/server.edge (a CJS-only module).
 *
 * Vite's SSRCompatModuleRunner evaluates modules as ESM, so bare `require()`
 * calls in react-dom/server.edge.js throw "ReferenceError: require is not
 * defined". This shim loads the CJS module via Node's createRequire (which
 * works in ESM context) and re-exports every named export so Vite sees a
 * proper ESM module.
 *
 * Aliased in astro.config.mjs: 'react-dom/server' → this file.
 */
import { createRequire } from 'module';

const _require = createRequire(import.meta.url);
const _mod = _require('react-dom/server.edge');

export const version              = _mod.version;
export const renderToReadableStream = _mod.renderToReadableStream;
export const renderToString       = _mod.renderToString;
export const renderToStaticMarkup = _mod.renderToStaticMarkup;
export const resume               = _mod.resume;

export default _mod;
