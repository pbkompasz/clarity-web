// This is a generated file that was modified by hand.

let wasm;
let ready_callbacks = [];
let wasm_binary;
let wasm_imports;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) {
  return heap[idx];
}

let heap_next = heap.length;

function dropObject(idx) {
  if (idx < 36) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];

  heap[idx] = obj;
  return idx;
}

function makeMutClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
    // First up with a closure we increment the internal reference
    // count. This ensures that the Rust closure environment won't
    // be deallocated while we're invoking it.
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      if (--state.cnt === 0) {
        wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);
      } else {
        state.a = a;
      }
    }
  };
  real.original = state;

  return real;
}

/**
 * @param {string} fetch_contract
 * @returns {any}
 */
export async function init_session(fetch_contract) {
  if (!wasm) {
    let repl_backend = await WebAssembly.instantiate(wasm_binary, wasm_imports);
    wasm = repl_backend.instance.exports;
  }
  var ptr0 = passStringToWasm0(
    fetch_contract || "null",
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc
  );
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.init_session(ptr0, len0);
  return await takeObject(ret);
}

/**
 * @param {string} command
 * @returns {string}
 */
export function handle_command(command) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passStringToWasm0(
      command,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    var len0 = WASM_VECTOR_LEN;
    wasm.handle_command(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(r0, r1);
  }
}

export function on_ready(fn) {
  if (ready_callbacks === null) return fn();
  ready_callbacks.push(fn);
}

fetch("./clarity_repl_bg.wasm")
  .then((response) => {
    return response.arrayBuffer();
  })
  .then((result) => {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function (arg0) {
      takeObject(arg0);
    };
    imports.wbg.__wbindgen_string_new = function (arg0, arg1) {
      var ret = getStringFromWasm0(arg0, arg1);
      return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_json_serialize = function (arg0, arg1) {
      const obj = getObject(arg1);
      var ret = JSON.stringify(obj === undefined ? null : obj);
      var ptr0 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc
      );
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_object_clone_ref = function (arg0) {
      var ret = getObject(arg0);
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_fetch_5274d89a348c0462 = function (arg0) {
      var ret = fetch(getObject(arg0));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_fetch_9dbf87b840590e85 = function (arg0, arg1) {
      var ret = getObject(arg0).fetch(getObject(arg1));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_80e79fe6852cbe9c = function () {
      return handleError(function () {
        var ret = new Headers();
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_append_441dc2c4b2281095 = function () {
      return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).append(
          getStringFromWasm0(arg1, arg2),
          getStringFromWasm0(arg3, arg4)
        );
      }, arguments);
    };
    imports.wbg.__wbg_instanceof_Response_d61ff4c524b8dbc4 = function (arg0) {
      var ret = getObject(arg0) instanceof Response;
      return ret;
    };
    imports.wbg.__wbg_url_0ffe73d78f393423 = function (arg0, arg1) {
      var ret = getObject(arg1).url;
      var ptr0 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc
      );
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_status_1a7d875f6e1318cd = function (arg0) {
      var ret = getObject(arg0).status;
      return ret;
    };
    imports.wbg.__wbg_headers_f49eca784c8ebeba = function (arg0) {
      var ret = getObject(arg0).headers;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_arrayBuffer_b7c95af83e1e2705 = function () {
      return handleError(function (arg0) {
        var ret = getObject(arg0).arrayBuffer();
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_newwithstrandinit_155cb1478824b198 = function () {
      return handleError(function (arg0, arg1, arg2) {
        var ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbindgen_cb_drop = function (arg0) {
      const obj = takeObject(arg0).original;
      if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
      }
      var ret = false;
      return ret;
    };
    imports.wbg.__wbindgen_is_function = function (arg0) {
      var ret = typeof getObject(arg0) === "function";
      return ret;
    };
    imports.wbg.__wbindgen_is_object = function (arg0) {
      const val = getObject(arg0);
      var ret = typeof val === "object" && val !== null;
      return ret;
    };
    imports.wbg.__wbg_next_e38a92137a5693de = function (arg0) {
      var ret = getObject(arg0).next;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_done_86efa5ac73f5b194 = function (arg0) {
      var ret = getObject(arg0).done;
      return ret;
    };
    imports.wbg.__wbg_value_708ce1aa93862729 = function (arg0) {
      var ret = getObject(arg0).value;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_iterator_30586bd3e46ee10e = function () {
      var ret = Symbol.iterator;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_newnoargs_9fdd8f3961dd1bee = function (arg0, arg1) {
      var ret = new Function(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_ba36642bd901572b = function () {
      return handleError(function (arg0, arg1) {
        var ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_call_3fc07b7d5fc9022d = function () {
      return handleError(function (arg0, arg1, arg2) {
        var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_next_8b73f854755d8e5e = function () {
      return handleError(function (arg0) {
        var ret = getObject(arg0).next();
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_new_edbe38a4e21329dd = function () {
      var ret = new Object();
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_c143a4f563f78c4e = function (arg0, arg1) {
      try {
        var state0 = { a: arg0, b: arg1 };
        var cb0 = (arg0, arg1) => {
          const a = state0.a;
          state0.a = 0;
          try {
            return __wbg_adapter_65(a, state0.b, arg0, arg1);
          } finally {
            state0.a = a;
          }
        };
        var ret = new Promise(cb0);
        return addHeapObject(ret);
      } finally {
        state0.a = state0.b = 0;
      }
    };
    imports.wbg.__wbg_resolve_cae3d8f752f5db88 = function (arg0) {
      var ret = Promise.resolve(getObject(arg0));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_c2361a9d5c9a4fcb = function (arg0, arg1) {
      var ret = getObject(arg0).then(getObject(arg1));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_6c9a4bf55755f9b8 = function (arg0, arg1, arg2) {
      var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_self_bb69a836a72ec6e9 = function () {
      return handleError(function () {
        var ret = self.self;
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_window_3304fc4b414c9693 = function () {
      return handleError(function () {
        var ret = window.window;
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_globalThis_e0d21cabc6630763 = function () {
      return handleError(function () {
        var ret = globalThis.globalThis;
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_global_8463719227271676 = function () {
      return handleError(function () {
        var ret = global.global;
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbindgen_is_undefined = function (arg0) {
      var ret = getObject(arg0) === undefined;
      return ret;
    };
    imports.wbg.__wbg_buffer_9e184d6f785de5ed = function (arg0) {
      var ret = getObject(arg0).buffer;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_e57ad1f2ce812c03 = function (
      arg0,
      arg1,
      arg2
    ) {
      var ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_e8101319e4cf95fc = function (arg0) {
      var ret = new Uint8Array(getObject(arg0));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_e8ae7b27314e8b98 = function (arg0, arg1, arg2) {
      getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_2d56cb37075fcfb1 = function (arg0) {
      var ret = getObject(arg0).length;
      return ret;
    };
    imports.wbg.__wbg_get_800098c980b31ea2 = function () {
      return handleError(function (arg0, arg1) {
        var ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_has_9fa0c068863afd36 = function () {
      return handleError(function (arg0, arg1) {
        var ret = Reflect.has(getObject(arg0), getObject(arg1));
        return ret;
      }, arguments);
    };
    imports.wbg.__wbg_set_73349fc4814e0fc6 = function () {
      return handleError(function (arg0, arg1, arg2) {
        var ret = Reflect.set(
          getObject(arg0),
          getObject(arg1),
          getObject(arg2)
        );
        return ret;
      }, arguments);
    };
    imports.wbg.__wbindgen_debug_string = function (arg0, arg1) {
      var ret = debugString(getObject(arg1));
      var ptr0 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc
      );
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function (arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function () {
      var ret = wasm.memory;
      return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper5734 = function (arg0, arg1, arg2) {
      var ret = makeMutClosure(arg0, arg1, 1534, __wbg_adapter_24);
      return addHeapObject(ret);
    };

    //return WebAssembly.instantiate(result, imports);
    return { result, imports };
  })
  // .then(repl_backend => {
  // 	wasm = repl_backend.instance.exports;
  // 	return init_session();
  // })
  // .then(() => {
  // 	ready_callbacks.forEach(fn => fn(wasm));
  // 	ready_callbacks = null;
  // });
  .then(({ result, imports }) => {
    wasm_binary = result;
    wasm_imports = imports;
    ready_callbacks.forEach((fn) => fn());
    ready_callbacks = null;
  });

let WASM_VECTOR_LEN = 0;

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
  if (
    cachegetUint8Memory0 === null ||
    cachegetUint8Memory0.buffer !== wasm.memory.buffer
  ) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory0;
}

let cachedTextEncoder = new TextEncoder("utf-8");

const encodeString =
  typeof cachedTextEncoder.encodeInto === "function"
    ? function (arg, view) {
        return cachedTextEncoder.encodeInto(arg, view);
      }
    : function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
          read: arg.length,
          written: buf.length,
        };
      };

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length);
    getUint8Memory0()
      .subarray(ptr, ptr + buf.length)
      .set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len);

  const mem = getUint8Memory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7f) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, (len = offset + arg.length * 3));
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
  if (
    cachegetInt32Memory0 === null ||
    cachegetInt32Memory0.buffer !== wasm.memory.buffer
  ) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachegetInt32Memory0;
}

let cachedTextDecoder = new TextDecoder("utf-8", {
  ignoreBOM: true,
  fatal: true,
});

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
function __wbg_adapter_65(arg0, arg1, arg2, arg3) {
  wasm.wasm_bindgen__convert__closures__invoke2_mut__h31572824d18875c6(
    arg0,
    arg1,
    addHeapObject(arg2),
    addHeapObject(arg3)
  );
}
function __wbg_adapter_24(arg0, arg1, arg2) {
  wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h31929444ff8cc14b(
    arg0,
    arg1,
    addHeapObject(arg2)
  );
}

function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
  }
}
