! function(t, e) { "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports["jsgbc-web"] = e() : t["jsgbc-web"] = e() }(window, function() {
    return function(t) {
        var e = {};

        function r(i) { if (e[i]) return e[i].exports; var s = e[i] = { i: i, l: !1, exports: {} }; return t[i].call(s.exports, s, s.exports, r), s.l = !0, s.exports }
        return r.m = t, r.c = e, r.d = function(t, e, i) { r.o(t, e) || Object.defineProperty(t, e, { configurable: !1, enumerable: !0, get: i }) }, r.r = function(t) { Object.defineProperty(t, "__esModule", { value: !0 }) }, r.n = function(t) { var e = t && t.__esModule ? function() { return t.default } : function() { return t }; return r.d(e, "a", e), e }, r.o = function(t, e) { return Object.prototype.hasOwnProperty.call(t, e) }, r.p = "", r(r.s = 58)
    }([function(t, e, r) {
        "use strict";
        var i = r(4),
            s = r(50),
            n = r(17),
            a = r(97),
            o = r(11);

        function h(t) { return t }

        function u(t, e) { for (var r = 0; r < t.length; ++r) e[r] = 255 & t.charCodeAt(r); return e }
        e.newBlob = function(t, r) { e.checkSupport("blob"); try { return new Blob([t], { type: r }) } catch (e) { try { var i = new(self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder); return i.append(t), i.getBlob(r) } catch (t) { throw new Error("Bug : can't construct the Blob.") } } };
        var l = {
            stringifyByChunk: function(t, e, r) {
                var i = [],
                    s = 0,
                    n = t.length;
                if (n <= r) return String.fromCharCode.apply(null, t);
                for (; s < n;) "array" === e || "nodebuffer" === e ? i.push(String.fromCharCode.apply(null, t.slice(s, Math.min(s + r, n)))) : i.push(String.fromCharCode.apply(null, t.subarray(s, Math.min(s + r, n)))), s += r;
                return i.join("")
            },
            stringifyByChar: function(t) { for (var e = "", r = 0; r < t.length; r++) e += String.fromCharCode(t[r]); return e },
            applyCanBeUsed: { uint8array: function() { try { return i.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length } catch (t) { return !1 } }(), nodebuffer: function() { try { return i.nodebuffer && 1 === String.fromCharCode.apply(null, n.allocBuffer(1)).length } catch (t) { return !1 } }() }
        };

        function c(t) {
            var r = 65536,
                i = e.getTypeOf(t),
                s = !0;
            if ("uint8array" === i ? s = l.applyCanBeUsed.uint8array : "nodebuffer" === i && (s = l.applyCanBeUsed.nodebuffer), s)
                for (; r > 1;) try { return l.stringifyByChunk(t, i, r) } catch (t) { r = Math.floor(r / 2) }
            return l.stringifyByChar(t)
        }

        function f(t, e) { for (var r = 0; r < t.length; r++) e[r] = t[r]; return e }
        e.applyFromCharCode = c;
        var d = {};
        d.string = { string: h, array: function(t) { return u(t, new Array(t.length)) }, arraybuffer: function(t) { return d.string.uint8array(t).buffer }, uint8array: function(t) { return u(t, new Uint8Array(t.length)) }, nodebuffer: function(t) { return u(t, n.allocBuffer(t.length)) } }, d.array = { string: c, array: h, arraybuffer: function(t) { return new Uint8Array(t).buffer }, uint8array: function(t) { return new Uint8Array(t) }, nodebuffer: function(t) { return n.newBufferFrom(t) } }, d.arraybuffer = { string: function(t) { return c(new Uint8Array(t)) }, array: function(t) { return f(new Uint8Array(t), new Array(t.byteLength)) }, arraybuffer: h, uint8array: function(t) { return new Uint8Array(t) }, nodebuffer: function(t) { return n.newBufferFrom(new Uint8Array(t)) } }, d.uint8array = { string: c, array: function(t) { return f(t, new Array(t.length)) }, arraybuffer: function(t) { return t.buffer }, uint8array: h, nodebuffer: function(t) { return n.newBufferFrom(t) } }, d.nodebuffer = { string: c, array: function(t) { return f(t, new Array(t.length)) }, arraybuffer: function(t) { return d.nodebuffer.uint8array(t).buffer }, uint8array: function(t) { return f(t, new Uint8Array(t.length)) }, nodebuffer: h }, e.transformTo = function(t, r) {
            if (r || (r = ""), !t) return r;
            e.checkSupport(t);
            var i = e.getTypeOf(r);
            return d[i][t](r)
        }, e.getTypeOf = function(t) { return "string" == typeof t ? "string" : "[object Array]" === Object.prototype.toString.call(t) ? "array" : i.nodebuffer && n.isBuffer(t) ? "nodebuffer" : i.uint8array && t instanceof Uint8Array ? "uint8array" : i.arraybuffer && t instanceof ArrayBuffer ? "arraybuffer" : void 0 }, e.checkSupport = function(t) { if (!i[t.toLowerCase()]) throw new Error(t + " is not supported by this platform") }, e.MAX_VALUE_16BITS = 65535, e.MAX_VALUE_32BITS = -1, e.pretty = function(t) { var e, r, i = ""; for (r = 0; r < (t || "").length; r++) i += "\\x" + ((e = t.charCodeAt(r)) < 16 ? "0" : "") + e.toString(16).toUpperCase(); return i }, e.delay = function(t, e, r) { a(function() { t.apply(r || null, e || []) }) }, e.inherits = function(t, e) {
            var r = function() {};
            r.prototype = e.prototype, t.prototype = new r
        }, e.extend = function() {
            var t, e, r = {};
            for (t = 0; t < arguments.length; t++)
                for (e in arguments[t]) arguments[t].hasOwnProperty(e) && void 0 === r[e] && (r[e] = arguments[t][e]);
            return r
        }, e.prepareContent = function(t, r, n, a, h) {
            return o.Promise.resolve(r).then(function(t) {
                return i.blob && (t instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(t))) && "undefined" != typeof FileReader ? new o.Promise(function(e, r) {
                    var i = new FileReader;
                    i.onload = function(t) { e(t.target.result) }, i.onerror = function(t) { r(t.target.error) }, i.readAsArrayBuffer(t)
                }) : t
            }).then(function(r) { var l, c = e.getTypeOf(r); return c ? ("arraybuffer" === c ? r = e.transformTo("uint8array", r) : "string" === c && (h ? r = s.decode(r) : n && !0 !== a && (r = u(l = r, i.uint8array ? new Uint8Array(l.length) : new Array(l.length)))), r) : o.Promise.reject(new Error("Can't read the data of '" + t + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?")) })
        }
    }, function(t, e, r) {
        "use strict";

        function i(t) { this.name = t || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = { data: [], end: [], error: [] }, this.previous = null }
        i.prototype = {
            push: function(t) { this.emit("data", t) },
            end: function() {
                if (this.isFinished) return !1;
                this.flush();
                try { this.emit("end"), this.cleanUp(), this.isFinished = !0 } catch (t) { this.emit("error", t) }
                return !0
            },
            error: function(t) { return !this.isFinished && (this.isPaused ? this.generatedError = t : (this.isFinished = !0, this.emit("error", t), this.previous && this.previous.error(t), this.cleanUp()), !0) },
            on: function(t, e) { return this._listeners[t].push(e), this },
            cleanUp: function() { this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [] },
            emit: function(t, e) {
                if (this._listeners[t])
                    for (var r = 0; r < this._listeners[t].length; r++) this._listeners[t][r].call(this, e)
            },
            pipe: function(t) { return t.registerPrevious(this) },
            registerPrevious: function(t) {
                if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                this.streamInfo = t.streamInfo, this.mergeStreamInfo(), this.previous = t;
                var e = this;
                return t.on("data", function(t) { e.processChunk(t) }), t.on("end", function() { e.end() }), t.on("error", function(t) { e.error(t) }), this
            },
            pause: function() { return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0) },
            resume: function() {
                if (!this.isPaused || this.isFinished) return !1;
                this.isPaused = !1;
                var t = !1;
                return this.generatedError && (this.error(this.generatedError), t = !0), this.previous && this.previous.resume(), !t
            },
            flush: function() {},
            processChunk: function(t) { this.push(t) },
            withStreamInfo: function(t, e) { return this.extraStreamInfo[t] = e, this.mergeStreamInfo(), this },
            mergeStreamInfo: function() { for (var t in this.extraStreamInfo) this.extraStreamInfo.hasOwnProperty(t) && (this.streamInfo[t] = this.extraStreamInfo[t]) },
            lock: function() {
                if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                this.isLocked = !0, this.previous && this.previous.lock()
            },
            toString: function() { var t = "Worker " + this.name; return this.previous ? this.previous + " -> " + t : t }
        }, t.exports = i
    }, function(t, e) {
        var r;
        r = function() { return this }();
        try { r = r || Function("return this")() || (0, eval)("this") } catch (t) { "object" == typeof window && (r = window) }
        t.exports = r
    }, function(t, e, r) {
        "use strict";
        var i = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;

        function s(t, e) { return Object.prototype.hasOwnProperty.call(t, e) }
        e.assign = function(t) { for (var e = Array.prototype.slice.call(arguments, 1); e.length;) { var r = e.shift(); if (r) { if ("object" != typeof r) throw new TypeError(r + "must be non-object"); for (var i in r) s(r, i) && (t[i] = r[i]) } } return t }, e.shrinkBuf = function(t, e) { return t.length === e ? t : t.subarray ? t.subarray(0, e) : (t.length = e, t) };
        var n = {
                arraySet: function(t, e, r, i, s) {
                    if (e.subarray && t.subarray) t.set(e.subarray(r, r + i), s);
                    else
                        for (var n = 0; n < i; n++) t[s + n] = e[r + n]
                },
                flattenChunks: function(t) { var e, r, i, s, n, a; for (i = 0, e = 0, r = t.length; e < r; e++) i += t[e].length; for (a = new Uint8Array(i), s = 0, e = 0, r = t.length; e < r; e++) n = t[e], a.set(n, s), s += n.length; return a }
            },
            a = { arraySet: function(t, e, r, i, s) { for (var n = 0; n < i; n++) t[s + n] = e[r + n] }, flattenChunks: function(t) { return [].concat.apply([], t) } };
        e.setTyped = function(t) { t ? (e.Buf8 = Uint8Array, e.Buf16 = Uint16Array, e.Buf32 = Int32Array, e.assign(e, n)) : (e.Buf8 = Array, e.Buf16 = Array, e.Buf32 = Array, e.assign(e, a)) }, e.setTyped(i)
    }, function(t, e, r) {
        "use strict";
        (function(t) {
            if (e.base64 = !0, e.array = !0, e.string = !0, e.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, e.nodebuffer = void 0 !== t, e.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) e.blob = !1;
            else {
                var i = new ArrayBuffer(0);
                try { e.blob = 0 === new Blob([i], { type: "application/zip" }).size } catch (t) {
                    try {
                        var s = new(self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
                        s.append(i), e.blob = 0 === s.getBlob("application/zip").size
                    } catch (t) { e.blob = !1 }
                }
            }
            try { e.nodestream = !!r(56).Readable } catch (t) { e.nodestream = !1 }
        }).call(this, r(13).Buffer)
    }, function(t, e, r) {
        var i;
        /*!
         * jQuery JavaScript Library v3.3.1
         * https://jquery.com/
         *
         * Includes Sizzle.js
         * https://sizzlejs.com/
         *
         * Copyright JS Foundation and other contributors
         * Released under the MIT license
         * https://jquery.org/license
         *
         * Date: 2018-01-20T17:24Z
         */
        /*!
         * jQuery JavaScript Library v3.3.1
         * https://jquery.com/
         *
         * Includes Sizzle.js
         * https://sizzlejs.com/
         *
         * Copyright JS Foundation and other contributors
         * Released under the MIT license
         * https://jquery.org/license
         *
         * Date: 2018-01-20T17:24Z
         */
        ! function(e, r) { "use strict"; "object" == typeof t && "object" == typeof t.exports ? t.exports = e.document ? r(e, !0) : function(t) { if (!t.document) throw new Error("jQuery requires a window with a document"); return r(t) } : r(e) }("undefined" != typeof window ? window : this, function(r, s) {
            "use strict";
            var n = [],
                a = r.document,
                o = Object.getPrototypeOf,
                h = n.slice,
                u = n.concat,
                l = n.push,
                c = n.indexOf,
                f = {},
                d = f.toString,
                m = f.hasOwnProperty,
                p = m.toString,
                g = p.call(Object),
                y = {},
                C = function(t) { return "function" == typeof t && "number" != typeof t.nodeType },
                b = function(t) { return null != t && t === t.window },
                v = { type: !0, src: !0, noModule: !0 };

            function w(t, e, r) {
                var i, s = (e = e || a).createElement("script");
                if (s.text = t, r)
                    for (i in v) r[i] && (s[i] = r[i]);
                e.head.appendChild(s).parentNode.removeChild(s)
            }

            function k(t) { return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? f[d.call(t)] || "object" : typeof t }
            var B = function(t, e) { return new B.fn.init(t, e) },
                S = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

            function R(t) {
                var e = !!t && "length" in t && t.length,
                    r = k(t);
                return !C(t) && !b(t) && ("array" === r || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
            }
            B.fn = B.prototype = {
                jquery: "3.3.1",
                constructor: B,
                length: 0,
                toArray: function() { return h.call(this) },
                get: function(t) { return null == t ? h.call(this) : t < 0 ? this[t + this.length] : this[t] },
                pushStack: function(t) { var e = B.merge(this.constructor(), t); return e.prevObject = this, e },
                each: function(t) { return B.each(this, t) },
                map: function(t) { return this.pushStack(B.map(this, function(e, r) { return t.call(e, r, e) })) },
                slice: function() { return this.pushStack(h.apply(this, arguments)) },
                first: function() { return this.eq(0) },
                last: function() { return this.eq(-1) },
                eq: function(t) {
                    var e = this.length,
                        r = +t + (t < 0 ? e : 0);
                    return this.pushStack(r >= 0 && r < e ? [this[r]] : [])
                },
                end: function() { return this.prevObject || this.constructor() },
                push: l,
                sort: n.sort,
                splice: n.splice
            }, B.extend = B.fn.extend = function() {
                var t, e, r, i, s, n, a = arguments[0] || {},
                    o = 1,
                    h = arguments.length,
                    u = !1;
                for ("boolean" == typeof a && (u = a, a = arguments[o] || {}, o++), "object" == typeof a || C(a) || (a = {}), o === h && (a = this, o--); o < h; o++)
                    if (null != (t = arguments[o]))
                        for (e in t) r = a[e], a !== (i = t[e]) && (u && i && (B.isPlainObject(i) || (s = Array.isArray(i))) ? (s ? (s = !1, n = r && Array.isArray(r) ? r : []) : n = r && B.isPlainObject(r) ? r : {}, a[e] = B.extend(u, n, i)) : void 0 !== i && (a[e] = i));
                return a
            }, B.extend({
                expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(t) { throw new Error(t) },
                noop: function() {},
                isPlainObject: function(t) { var e, r; return !(!t || "[object Object]" !== d.call(t)) && (!(e = o(t)) || "function" == typeof(r = m.call(e, "constructor") && e.constructor) && p.call(r) === g) },
                isEmptyObject: function(t) { var e; for (e in t) return !1; return !0 },
                globalEval: function(t) { w(t) },
                each: function(t, e) {
                    var r, i = 0;
                    if (R(t))
                        for (r = t.length; i < r && !1 !== e.call(t[i], i, t[i]); i++);
                    else
                        for (i in t)
                            if (!1 === e.call(t[i], i, t[i])) break; return t
                },
                trim: function(t) { return null == t ? "" : (t + "").replace(S, "") },
                makeArray: function(t, e) { var r = e || []; return null != t && (R(Object(t)) ? B.merge(r, "string" == typeof t ? [t] : t) : l.call(r, t)), r },
                inArray: function(t, e, r) { return null == e ? -1 : c.call(e, t, r) },
                merge: function(t, e) { for (var r = +e.length, i = 0, s = t.length; i < r; i++) t[s++] = e[i]; return t.length = s, t },
                grep: function(t, e, r) { for (var i = [], s = 0, n = t.length, a = !r; s < n; s++) !e(t[s], s) !== a && i.push(t[s]); return i },
                map: function(t, e, r) {
                    var i, s, n = 0,
                        a = [];
                    if (R(t))
                        for (i = t.length; n < i; n++) null != (s = e(t[n], n, r)) && a.push(s);
                    else
                        for (n in t) null != (s = e(t[n], n, r)) && a.push(s);
                    return u.apply([], a)
                },
                guid: 1,
                support: y
            }), "function" == typeof Symbol && (B.fn[Symbol.iterator] = n[Symbol.iterator]), B.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) { f["[object " + e + "]"] = e.toLowerCase() });
            var T =
                /*!
                 * Sizzle CSS Selector Engine v2.3.3
                 * https://sizzlejs.com/
                 *
                 * Copyright jQuery Foundation and other contributors
                 * Released under the MIT license
                 * http://jquery.org/license
                 *
                 * Date: 2016-08-08
                 */
                function(t) {
                    var e, r, i, s, n, a, o, h, u, l, c, f, d, m, p, g, y, C, b, v = "sizzle" + 1 * new Date,
                        w = t.document,
                        k = 0,
                        B = 0,
                        S = at(),
                        R = at(),
                        T = at(),
                        A = function(t, e) { return t === e && (c = !0), 0 },
                        F = {}.hasOwnProperty,
                        L = [],
                        _ = L.pop,
                        x = L.push,
                        H = L.push,
                        E = L.slice,
                        M = function(t, e) {
                            for (var r = 0, i = t.length; r < i; r++)
                                if (t[r] === e) return r;
                            return -1
                        },
                        P = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                        O = "[\\x20\\t\\r\\n\\f]",
                        D = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                        W = "\\[" + O + "*(" + D + ")(?:" + O + "*([*^$|!~]?=)" + O + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + D + "))|)" + O + "*\\]",
                        I = ":(" + D + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)",
                        G = new RegExp(O + "+", "g"),
                        N = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"),
                        z = new RegExp("^" + O + "*," + O + "*"),
                        j = new RegExp("^" + O + "*([>+~]|" + O + ")" + O + "*"),
                        U = new RegExp("=" + O + "*([^\\]'\"]*?)" + O + "*\\]", "g"),
                        q = new RegExp(I),
                        Z = new RegExp("^" + D + "$"),
                        V = { ID: new RegExp("^#(" + D + ")"), CLASS: new RegExp("^\\.(" + D + ")"), TAG: new RegExp("^(" + D + "|[*])"), ATTR: new RegExp("^" + W), PSEUDO: new RegExp("^" + I), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"), bool: new RegExp("^(?:" + P + ")$", "i"), needsContext: new RegExp("^" + O + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)", "i") },
                        J = /^(?:input|select|textarea|button)$/i,
                        Y = /^h\d$/i,
                        X = /^[^{]+\{\s*\[native \w/,
                        $ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                        Q = /[+~]/,
                        K = new RegExp("\\\\([\\da-f]{1,6}" + O + "?|(" + O + ")|.)", "ig"),
                        tt = function(t, e, r) { var i = "0x" + e - 65536; return i != i || r ? e : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320) },
                        et = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                        rt = function(t, e) { return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t },
                        it = function() { f() },
                        st = Ct(function(t) { return !0 === t.disabled && ("form" in t || "label" in t) }, { dir: "parentNode", next: "legend" });
                    try { H.apply(L = E.call(w.childNodes), w.childNodes), L[w.childNodes.length].nodeType } catch (t) {
                        H = {
                            apply: L.length ? function(t, e) { x.apply(t, E.call(e)) } : function(t, e) {
                                for (var r = t.length, i = 0; t[r++] = e[i++];);
                                t.length = r - 1
                            }
                        }
                    }

                    function nt(t, e, i, s) {
                        var n, o, u, l, c, m, y, C = e && e.ownerDocument,
                            k = e ? e.nodeType : 9;
                        if (i = i || [], "string" != typeof t || !t || 1 !== k && 9 !== k && 11 !== k) return i;
                        if (!s && ((e ? e.ownerDocument || e : w) !== d && f(e), e = e || d, p)) {
                            if (11 !== k && (c = $.exec(t)))
                                if (n = c[1]) { if (9 === k) { if (!(u = e.getElementById(n))) return i; if (u.id === n) return i.push(u), i } else if (C && (u = C.getElementById(n)) && b(e, u) && u.id === n) return i.push(u), i } else { if (c[2]) return H.apply(i, e.getElementsByTagName(t)), i; if ((n = c[3]) && r.getElementsByClassName && e.getElementsByClassName) return H.apply(i, e.getElementsByClassName(n)), i }
                            if (r.qsa && !T[t + " "] && (!g || !g.test(t))) {
                                if (1 !== k) C = e, y = t;
                                else if ("object" !== e.nodeName.toLowerCase()) {
                                    for ((l = e.getAttribute("id")) ? l = l.replace(et, rt) : e.setAttribute("id", l = v), o = (m = a(t)).length; o--;) m[o] = "#" + l + " " + yt(m[o]);
                                    y = m.join(","), C = Q.test(t) && pt(e.parentNode) || e
                                }
                                if (y) try { return H.apply(i, C.querySelectorAll(y)), i } catch (t) {} finally { l === v && e.removeAttribute("id") }
                            }
                        }
                        return h(t.replace(N, "$1"), e, i, s)
                    }

                    function at() { var t = []; return function e(r, s) { return t.push(r + " ") > i.cacheLength && delete e[t.shift()], e[r + " "] = s } }

                    function ot(t) { return t[v] = !0, t }

                    function ht(t) { var e = d.createElement("fieldset"); try { return !!t(e) } catch (t) { return !1 } finally { e.parentNode && e.parentNode.removeChild(e), e = null } }

                    function ut(t, e) { for (var r = t.split("|"), s = r.length; s--;) i.attrHandle[r[s]] = e }

                    function lt(t, e) {
                        var r = e && t,
                            i = r && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;
                        if (i) return i;
                        if (r)
                            for (; r = r.nextSibling;)
                                if (r === e) return -1;
                        return t ? 1 : -1
                    }

                    function ct(t) { return function(e) { return "input" === e.nodeName.toLowerCase() && e.type === t } }

                    function ft(t) { return function(e) { var r = e.nodeName.toLowerCase(); return ("input" === r || "button" === r) && e.type === t } }

                    function dt(t) { return function(e) { return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && st(e) === t : e.disabled === t : "label" in e && e.disabled === t } }

                    function mt(t) { return ot(function(e) { return e = +e, ot(function(r, i) { for (var s, n = t([], r.length, e), a = n.length; a--;) r[s = n[a]] && (r[s] = !(i[s] = r[s])) }) }) }

                    function pt(t) { return t && void 0 !== t.getElementsByTagName && t }
                    for (e in r = nt.support = {}, n = nt.isXML = function(t) { var e = t && (t.ownerDocument || t).documentElement; return !!e && "HTML" !== e.nodeName }, f = nt.setDocument = function(t) {
                            var e, s, a = t ? t.ownerDocument || t : w;
                            return a !== d && 9 === a.nodeType && a.documentElement ? (m = (d = a).documentElement, p = !n(d), w !== d && (s = d.defaultView) && s.top !== s && (s.addEventListener ? s.addEventListener("unload", it, !1) : s.attachEvent && s.attachEvent("onunload", it)), r.attributes = ht(function(t) { return t.className = "i", !t.getAttribute("className") }), r.getElementsByTagName = ht(function(t) { return t.appendChild(d.createComment("")), !t.getElementsByTagName("*").length }), r.getElementsByClassName = X.test(d.getElementsByClassName), r.getById = ht(function(t) { return m.appendChild(t).id = v, !d.getElementsByName || !d.getElementsByName(v).length }), r.getById ? (i.filter.ID = function(t) { var e = t.replace(K, tt); return function(t) { return t.getAttribute("id") === e } }, i.find.ID = function(t, e) { if (void 0 !== e.getElementById && p) { var r = e.getElementById(t); return r ? [r] : [] } }) : (i.filter.ID = function(t) { var e = t.replace(K, tt); return function(t) { var r = void 0 !== t.getAttributeNode && t.getAttributeNode("id"); return r && r.value === e } }, i.find.ID = function(t, e) {
                                if (void 0 !== e.getElementById && p) {
                                    var r, i, s, n = e.getElementById(t);
                                    if (n) {
                                        if ((r = n.getAttributeNode("id")) && r.value === t) return [n];
                                        for (s = e.getElementsByName(t), i = 0; n = s[i++];)
                                            if ((r = n.getAttributeNode("id")) && r.value === t) return [n]
                                    }
                                    return []
                                }
                            }), i.find.TAG = r.getElementsByTagName ? function(t, e) { return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : r.qsa ? e.querySelectorAll(t) : void 0 } : function(t, e) {
                                var r, i = [],
                                    s = 0,
                                    n = e.getElementsByTagName(t);
                                if ("*" === t) { for (; r = n[s++];) 1 === r.nodeType && i.push(r); return i }
                                return n
                            }, i.find.CLASS = r.getElementsByClassName && function(t, e) { if (void 0 !== e.getElementsByClassName && p) return e.getElementsByClassName(t) }, y = [], g = [], (r.qsa = X.test(d.querySelectorAll)) && (ht(function(t) { m.appendChild(t).innerHTML = "<a id='" + v + "'></a><select id='" + v + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && g.push("[*^$]=" + O + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || g.push("\\[" + O + "*(?:value|" + P + ")"), t.querySelectorAll("[id~=" + v + "-]").length || g.push("~="), t.querySelectorAll(":checked").length || g.push(":checked"), t.querySelectorAll("a#" + v + "+*").length || g.push(".#.+[+~]") }), ht(function(t) {
                                t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                                var e = d.createElement("input");
                                e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && g.push("name" + O + "*[*^$|!~]?="), 2 !== t.querySelectorAll(":enabled").length && g.push(":enabled", ":disabled"), m.appendChild(t).disabled = !0, 2 !== t.querySelectorAll(":disabled").length && g.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), g.push(",.*:")
                            })), (r.matchesSelector = X.test(C = m.matches || m.webkitMatchesSelector || m.mozMatchesSelector || m.oMatchesSelector || m.msMatchesSelector)) && ht(function(t) { r.disconnectedMatch = C.call(t, "*"), C.call(t, "[s!='']:x"), y.push("!=", I) }), g = g.length && new RegExp(g.join("|")), y = y.length && new RegExp(y.join("|")), e = X.test(m.compareDocumentPosition), b = e || X.test(m.contains) ? function(t, e) {
                                var r = 9 === t.nodeType ? t.documentElement : t,
                                    i = e && e.parentNode;
                                return t === i || !(!i || 1 !== i.nodeType || !(r.contains ? r.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
                            } : function(t, e) {
                                if (e)
                                    for (; e = e.parentNode;)
                                        if (e === t) return !0;
                                return !1
                            }, A = e ? function(t, e) { if (t === e) return c = !0, 0; var i = !t.compareDocumentPosition - !e.compareDocumentPosition; return i || (1 & (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !r.sortDetached && e.compareDocumentPosition(t) === i ? t === d || t.ownerDocument === w && b(w, t) ? -1 : e === d || e.ownerDocument === w && b(w, e) ? 1 : l ? M(l, t) - M(l, e) : 0 : 4 & i ? -1 : 1) } : function(t, e) {
                                if (t === e) return c = !0, 0;
                                var r, i = 0,
                                    s = t.parentNode,
                                    n = e.parentNode,
                                    a = [t],
                                    o = [e];
                                if (!s || !n) return t === d ? -1 : e === d ? 1 : s ? -1 : n ? 1 : l ? M(l, t) - M(l, e) : 0;
                                if (s === n) return lt(t, e);
                                for (r = t; r = r.parentNode;) a.unshift(r);
                                for (r = e; r = r.parentNode;) o.unshift(r);
                                for (; a[i] === o[i];) i++;
                                return i ? lt(a[i], o[i]) : a[i] === w ? -1 : o[i] === w ? 1 : 0
                            }, d) : d
                        }, nt.matches = function(t, e) { return nt(t, null, null, e) }, nt.matchesSelector = function(t, e) {
                            if ((t.ownerDocument || t) !== d && f(t), e = e.replace(U, "='$1']"), r.matchesSelector && p && !T[e + " "] && (!y || !y.test(e)) && (!g || !g.test(e))) try { var i = C.call(t, e); if (i || r.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i } catch (t) {}
                            return nt(e, d, null, [t]).length > 0
                        }, nt.contains = function(t, e) { return (t.ownerDocument || t) !== d && f(t), b(t, e) }, nt.attr = function(t, e) {
                            (t.ownerDocument || t) !== d && f(t);
                            var s = i.attrHandle[e.toLowerCase()],
                                n = s && F.call(i.attrHandle, e.toLowerCase()) ? s(t, e, !p) : void 0;
                            return void 0 !== n ? n : r.attributes || !p ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
                        }, nt.escape = function(t) { return (t + "").replace(et, rt) }, nt.error = function(t) { throw new Error("Syntax error, unrecognized expression: " + t) }, nt.uniqueSort = function(t) {
                            var e, i = [],
                                s = 0,
                                n = 0;
                            if (c = !r.detectDuplicates, l = !r.sortStable && t.slice(0), t.sort(A), c) { for (; e = t[n++];) e === t[n] && (s = i.push(n)); for (; s--;) t.splice(i[s], 1) }
                            return l = null, t
                        }, s = nt.getText = function(t) {
                            var e, r = "",
                                i = 0,
                                n = t.nodeType;
                            if (n) { if (1 === n || 9 === n || 11 === n) { if ("string" == typeof t.textContent) return t.textContent; for (t = t.firstChild; t; t = t.nextSibling) r += s(t) } else if (3 === n || 4 === n) return t.nodeValue } else
                                for (; e = t[i++];) r += s(e);
                            return r
                        }, (i = nt.selectors = {
                            cacheLength: 50,
                            createPseudo: ot,
                            match: V,
                            attrHandle: {},
                            find: {},
                            relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
                            preFilter: { ATTR: function(t) { return t[1] = t[1].replace(K, tt), t[3] = (t[3] || t[4] || t[5] || "").replace(K, tt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4) }, CHILD: function(t) { return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || nt.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && nt.error(t[0]), t }, PSEUDO: function(t) { var e, r = !t[6] && t[2]; return V.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : r && q.test(r) && (e = a(r, !0)) && (e = r.indexOf(")", r.length - e) - r.length) && (t[0] = t[0].slice(0, e), t[2] = r.slice(0, e)), t.slice(0, 3)) } },
                            filter: {
                                TAG: function(t) { var e = t.replace(K, tt).toLowerCase(); return "*" === t ? function() { return !0 } : function(t) { return t.nodeName && t.nodeName.toLowerCase() === e } },
                                CLASS: function(t) { var e = S[t + " "]; return e || (e = new RegExp("(^|" + O + ")" + t + "(" + O + "|$)")) && S(t, function(t) { return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "") }) },
                                ATTR: function(t, e, r) { return function(i) { var s = nt.attr(i, t); return null == s ? "!=" === e : !e || (s += "", "=" === e ? s === r : "!=" === e ? s !== r : "^=" === e ? r && 0 === s.indexOf(r) : "*=" === e ? r && s.indexOf(r) > -1 : "$=" === e ? r && s.slice(-r.length) === r : "~=" === e ? (" " + s.replace(G, " ") + " ").indexOf(r) > -1 : "|=" === e && (s === r || s.slice(0, r.length + 1) === r + "-")) } },
                                CHILD: function(t, e, r, i, s) {
                                    var n = "nth" !== t.slice(0, 3),
                                        a = "last" !== t.slice(-4),
                                        o = "of-type" === e;
                                    return 1 === i && 0 === s ? function(t) { return !!t.parentNode } : function(e, r, h) {
                                        var u, l, c, f, d, m, p = n !== a ? "nextSibling" : "previousSibling",
                                            g = e.parentNode,
                                            y = o && e.nodeName.toLowerCase(),
                                            C = !h && !o,
                                            b = !1;
                                        if (g) {
                                            if (n) {
                                                for (; p;) {
                                                    for (f = e; f = f[p];)
                                                        if (o ? f.nodeName.toLowerCase() === y : 1 === f.nodeType) return !1;
                                                    m = p = "only" === t && !m && "nextSibling"
                                                }
                                                return !0
                                            }
                                            if (m = [a ? g.firstChild : g.lastChild], a && C) {
                                                for (b = (d = (u = (l = (c = (f = g)[v] || (f[v] = {}))[f.uniqueID] || (c[f.uniqueID] = {}))[t] || [])[0] === k && u[1]) && u[2], f = d && g.childNodes[d]; f = ++d && f && f[p] || (b = d = 0) || m.pop();)
                                                    if (1 === f.nodeType && ++b && f === e) { l[t] = [k, d, b]; break }
                                            } else if (C && (b = d = (u = (l = (c = (f = e)[v] || (f[v] = {}))[f.uniqueID] || (c[f.uniqueID] = {}))[t] || [])[0] === k && u[1]), !1 === b)
                                                for (;
                                                    (f = ++d && f && f[p] || (b = d = 0) || m.pop()) && ((o ? f.nodeName.toLowerCase() !== y : 1 !== f.nodeType) || !++b || (C && ((l = (c = f[v] || (f[v] = {}))[f.uniqueID] || (c[f.uniqueID] = {}))[t] = [k, b]), f !== e)););
                                            return (b -= s) === i || b % i == 0 && b / i >= 0
                                        }
                                    }
                                },
                                PSEUDO: function(t, e) { var r, s = i.pseudos[t] || i.setFilters[t.toLowerCase()] || nt.error("unsupported pseudo: " + t); return s[v] ? s(e) : s.length > 1 ? (r = [t, t, "", e], i.setFilters.hasOwnProperty(t.toLowerCase()) ? ot(function(t, r) { for (var i, n = s(t, e), a = n.length; a--;) t[i = M(t, n[a])] = !(r[i] = n[a]) }) : function(t) { return s(t, 0, r) }) : s }
                            },
                            pseudos: {
                                not: ot(function(t) {
                                    var e = [],
                                        r = [],
                                        i = o(t.replace(N, "$1"));
                                    return i[v] ? ot(function(t, e, r, s) { for (var n, a = i(t, null, s, []), o = t.length; o--;)(n = a[o]) && (t[o] = !(e[o] = n)) }) : function(t, s, n) { return e[0] = t, i(e, null, n, r), e[0] = null, !r.pop() }
                                }),
                                has: ot(function(t) { return function(e) { return nt(t, e).length > 0 } }),
                                contains: ot(function(t) {
                                    return t = t.replace(K, tt),
                                        function(e) { return (e.textContent || e.innerText || s(e)).indexOf(t) > -1 }
                                }),
                                lang: ot(function(t) {
                                    return Z.test(t || "") || nt.error("unsupported lang: " + t), t = t.replace(K, tt).toLowerCase(),
                                        function(e) {
                                            var r;
                                            do { if (r = p ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (r = r.toLowerCase()) === t || 0 === r.indexOf(t + "-") } while ((e = e.parentNode) && 1 === e.nodeType);
                                            return !1
                                        }
                                }),
                                target: function(e) { var r = t.location && t.location.hash; return r && r.slice(1) === e.id },
                                root: function(t) { return t === m },
                                focus: function(t) { return t === d.activeElement && (!d.hasFocus || d.hasFocus()) && !!(t.type || t.href || ~t.tabIndex) },
                                enabled: dt(!1),
                                disabled: dt(!0),
                                checked: function(t) { var e = t.nodeName.toLowerCase(); return "input" === e && !!t.checked || "option" === e && !!t.selected },
                                selected: function(t) { return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected },
                                empty: function(t) {
                                    for (t = t.firstChild; t; t = t.nextSibling)
                                        if (t.nodeType < 6) return !1;
                                    return !0
                                },
                                parent: function(t) { return !i.pseudos.empty(t) },
                                header: function(t) { return Y.test(t.nodeName) },
                                input: function(t) { return J.test(t.nodeName) },
                                button: function(t) { var e = t.nodeName.toLowerCase(); return "input" === e && "button" === t.type || "button" === e },
                                text: function(t) { var e; return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase()) },
                                first: mt(function() { return [0] }),
                                last: mt(function(t, e) { return [e - 1] }),
                                eq: mt(function(t, e, r) { return [r < 0 ? r + e : r] }),
                                even: mt(function(t, e) { for (var r = 0; r < e; r += 2) t.push(r); return t }),
                                odd: mt(function(t, e) { for (var r = 1; r < e; r += 2) t.push(r); return t }),
                                lt: mt(function(t, e, r) { for (var i = r < 0 ? r + e : r; --i >= 0;) t.push(i); return t }),
                                gt: mt(function(t, e, r) { for (var i = r < 0 ? r + e : r; ++i < e;) t.push(i); return t })
                            }
                        }).pseudos.nth = i.pseudos.eq, { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) i.pseudos[e] = ct(e);
                    for (e in { submit: !0, reset: !0 }) i.pseudos[e] = ft(e);

                    function gt() {}

                    function yt(t) { for (var e = 0, r = t.length, i = ""; e < r; e++) i += t[e].value; return i }

                    function Ct(t, e, r) {
                        var i = e.dir,
                            s = e.next,
                            n = s || i,
                            a = r && "parentNode" === n,
                            o = B++;
                        return e.first ? function(e, r, s) {
                            for (; e = e[i];)
                                if (1 === e.nodeType || a) return t(e, r, s);
                            return !1
                        } : function(e, r, h) {
                            var u, l, c, f = [k, o];
                            if (h) {
                                for (; e = e[i];)
                                    if ((1 === e.nodeType || a) && t(e, r, h)) return !0
                            } else
                                for (; e = e[i];)
                                    if (1 === e.nodeType || a)
                                        if (l = (c = e[v] || (e[v] = {}))[e.uniqueID] || (c[e.uniqueID] = {}), s && s === e.nodeName.toLowerCase()) e = e[i] || e;
                                        else { if ((u = l[n]) && u[0] === k && u[1] === o) return f[2] = u[2]; if (l[n] = f, f[2] = t(e, r, h)) return !0 } return !1
                        }
                    }

                    function bt(t) {
                        return t.length > 1 ? function(e, r, i) {
                            for (var s = t.length; s--;)
                                if (!t[s](e, r, i)) return !1;
                            return !0
                        } : t[0]
                    }

                    function vt(t, e, r, i, s) { for (var n, a = [], o = 0, h = t.length, u = null != e; o < h; o++)(n = t[o]) && (r && !r(n, i, s) || (a.push(n), u && e.push(o))); return a }

                    function wt(t, e, r, i, s, n) {
                        return i && !i[v] && (i = wt(i)), s && !s[v] && (s = wt(s, n)), ot(function(n, a, o, h) {
                            var u, l, c, f = [],
                                d = [],
                                m = a.length,
                                p = n || function(t, e, r) { for (var i = 0, s = e.length; i < s; i++) nt(t, e[i], r); return r }(e || "*", o.nodeType ? [o] : o, []),
                                g = !t || !n && e ? p : vt(p, f, t, o, h),
                                y = r ? s || (n ? t : m || i) ? [] : a : g;
                            if (r && r(g, y, o, h), i)
                                for (u = vt(y, d), i(u, [], o, h), l = u.length; l--;)(c = u[l]) && (y[d[l]] = !(g[d[l]] = c));
                            if (n) {
                                if (s || t) {
                                    if (s) {
                                        for (u = [], l = y.length; l--;)(c = y[l]) && u.push(g[l] = c);
                                        s(null, y = [], u, h)
                                    }
                                    for (l = y.length; l--;)(c = y[l]) && (u = s ? M(n, c) : f[l]) > -1 && (n[u] = !(a[u] = c))
                                }
                            } else y = vt(y === a ? y.splice(m, y.length) : y), s ? s(null, a, y, h) : H.apply(a, y)
                        })
                    }

                    function kt(t) {
                        for (var e, r, s, n = t.length, a = i.relative[t[0].type], o = a || i.relative[" "], h = a ? 1 : 0, l = Ct(function(t) { return t === e }, o, !0), c = Ct(function(t) { return M(e, t) > -1 }, o, !0), f = [function(t, r, i) { var s = !a && (i || r !== u) || ((e = r).nodeType ? l(t, r, i) : c(t, r, i)); return e = null, s }]; h < n; h++)
                            if (r = i.relative[t[h].type]) f = [Ct(bt(f), r)];
                            else {
                                if ((r = i.filter[t[h].type].apply(null, t[h].matches))[v]) { for (s = ++h; s < n && !i.relative[t[s].type]; s++); return wt(h > 1 && bt(f), h > 1 && yt(t.slice(0, h - 1).concat({ value: " " === t[h - 2].type ? "*" : "" })).replace(N, "$1"), r, h < s && kt(t.slice(h, s)), s < n && kt(t = t.slice(s)), s < n && yt(t)) }
                                f.push(r)
                            }
                        return bt(f)
                    }
                    return gt.prototype = i.filters = i.pseudos, i.setFilters = new gt, a = nt.tokenize = function(t, e) { var r, s, n, a, o, h, u, l = R[t + " "]; if (l) return e ? 0 : l.slice(0); for (o = t, h = [], u = i.preFilter; o;) { for (a in r && !(s = z.exec(o)) || (s && (o = o.slice(s[0].length) || o), h.push(n = [])), r = !1, (s = j.exec(o)) && (r = s.shift(), n.push({ value: r, type: s[0].replace(N, " ") }), o = o.slice(r.length)), i.filter) !(s = V[a].exec(o)) || u[a] && !(s = u[a](s)) || (r = s.shift(), n.push({ value: r, type: a, matches: s }), o = o.slice(r.length)); if (!r) break } return e ? o.length : o ? nt.error(t) : R(t, h).slice(0) }, o = nt.compile = function(t, e) {
                        var r, s = [],
                            n = [],
                            o = T[t + " "];
                        if (!o) {
                            for (e || (e = a(t)), r = e.length; r--;)(o = kt(e[r]))[v] ? s.push(o) : n.push(o);
                            (o = T(t, function(t, e) {
                                var r = e.length > 0,
                                    s = t.length > 0,
                                    n = function(n, a, o, h, l) {
                                        var c, m, g, y = 0,
                                            C = "0",
                                            b = n && [],
                                            v = [],
                                            w = u,
                                            B = n || s && i.find.TAG("*", l),
                                            S = k += null == w ? 1 : Math.random() || .1,
                                            R = B.length;
                                        for (l && (u = a === d || a || l); C !== R && null != (c = B[C]); C++) {
                                            if (s && c) {
                                                for (m = 0, a || c.ownerDocument === d || (f(c), o = !p); g = t[m++];)
                                                    if (g(c, a || d, o)) { h.push(c); break }
                                                l && (k = S)
                                            }
                                            r && ((c = !g && c) && y--, n && b.push(c))
                                        }
                                        if (y += C, r && C !== y) {
                                            for (m = 0; g = e[m++];) g(b, v, a, o);
                                            if (n) {
                                                if (y > 0)
                                                    for (; C--;) b[C] || v[C] || (v[C] = _.call(h));
                                                v = vt(v)
                                            }
                                            H.apply(h, v), l && !n && v.length > 0 && y + e.length > 1 && nt.uniqueSort(h)
                                        }
                                        return l && (k = S, u = w), b
                                    };
                                return r ? ot(n) : n
                            }(n, s))).selector = t
                        }
                        return o
                    }, h = nt.select = function(t, e, r, s) {
                        var n, h, u, l, c, f = "function" == typeof t && t,
                            d = !s && a(t = f.selector || t);
                        if (r = r || [], 1 === d.length) {
                            if ((h = d[0] = d[0].slice(0)).length > 2 && "ID" === (u = h[0]).type && 9 === e.nodeType && p && i.relative[h[1].type]) {
                                if (!(e = (i.find.ID(u.matches[0].replace(K, tt), e) || [])[0])) return r;
                                f && (e = e.parentNode), t = t.slice(h.shift().value.length)
                            }
                            for (n = V.needsContext.test(t) ? 0 : h.length; n-- && (u = h[n], !i.relative[l = u.type]);)
                                if ((c = i.find[l]) && (s = c(u.matches[0].replace(K, tt), Q.test(h[0].type) && pt(e.parentNode) || e))) { if (h.splice(n, 1), !(t = s.length && yt(h))) return H.apply(r, s), r; break }
                        }
                        return (f || o(t, d))(s, e, !p, r, !e || Q.test(t) && pt(e.parentNode) || e), r
                    }, r.sortStable = v.split("").sort(A).join("") === v, r.detectDuplicates = !!c, f(), r.sortDetached = ht(function(t) { return 1 & t.compareDocumentPosition(d.createElement("fieldset")) }), ht(function(t) { return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href") }) || ut("type|href|height|width", function(t, e, r) { if (!r) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2) }), r.attributes && ht(function(t) { return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value") }) || ut("value", function(t, e, r) { if (!r && "input" === t.nodeName.toLowerCase()) return t.defaultValue }), ht(function(t) { return null == t.getAttribute("disabled") }) || ut(P, function(t, e, r) { var i; if (!r) return !0 === t[e] ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null }), nt
                }(r);
            B.find = T, B.expr = T.selectors, B.expr[":"] = B.expr.pseudos, B.uniqueSort = B.unique = T.uniqueSort, B.text = T.getText, B.isXMLDoc = T.isXML, B.contains = T.contains, B.escapeSelector = T.escape;
            var A = function(t, e, r) {
                    for (var i = [], s = void 0 !== r;
                        (t = t[e]) && 9 !== t.nodeType;)
                        if (1 === t.nodeType) {
                            if (s && B(t).is(r)) break;
                            i.push(t)
                        }
                    return i
                },
                F = function(t, e) { for (var r = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && r.push(t); return r },
                L = B.expr.match.needsContext;

            function _(t, e) { return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase() }
            var x = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

            function H(t, e, r) { return C(e) ? B.grep(t, function(t, i) { return !!e.call(t, i, t) !== r }) : e.nodeType ? B.grep(t, function(t) { return t === e !== r }) : "string" != typeof e ? B.grep(t, function(t) { return c.call(e, t) > -1 !== r }) : B.filter(e, t, r) }
            B.filter = function(t, e, r) { var i = e[0]; return r && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? B.find.matchesSelector(i, t) ? [i] : [] : B.find.matches(t, B.grep(e, function(t) { return 1 === t.nodeType })) }, B.fn.extend({
                find: function(t) {
                    var e, r, i = this.length,
                        s = this;
                    if ("string" != typeof t) return this.pushStack(B(t).filter(function() {
                        for (e = 0; e < i; e++)
                            if (B.contains(s[e], this)) return !0
                    }));
                    for (r = this.pushStack([]), e = 0; e < i; e++) B.find(t, s[e], r);
                    return i > 1 ? B.uniqueSort(r) : r
                },
                filter: function(t) { return this.pushStack(H(this, t || [], !1)) },
                not: function(t) { return this.pushStack(H(this, t || [], !0)) },
                is: function(t) { return !!H(this, "string" == typeof t && L.test(t) ? B(t) : t || [], !1).length }
            });
            var E, M = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
            (B.fn.init = function(t, e, r) {
                var i, s;
                if (!t) return this;
                if (r = r || E, "string" == typeof t) {
                    if (!(i = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : M.exec(t)) || !i[1] && e) return !e || e.jquery ? (e || r).find(t) : this.constructor(e).find(t);
                    if (i[1]) {
                        if (e = e instanceof B ? e[0] : e, B.merge(this, B.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : a, !0)), x.test(i[1]) && B.isPlainObject(e))
                            for (i in e) C(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                        return this
                    }
                    return (s = a.getElementById(i[2])) && (this[0] = s, this.length = 1), this
                }
                return t.nodeType ? (this[0] = t, this.length = 1, this) : C(t) ? void 0 !== r.ready ? r.ready(t) : t(B) : B.makeArray(t, this)
            }).prototype = B.fn, E = B(a);
            var P = /^(?:parents|prev(?:Until|All))/,
                O = { children: !0, contents: !0, next: !0, prev: !0 };

            function D(t, e) {
                for (;
                    (t = t[e]) && 1 !== t.nodeType;);
                return t
            }
            B.fn.extend({
                has: function(t) {
                    var e = B(t, this),
                        r = e.length;
                    return this.filter(function() {
                        for (var t = 0; t < r; t++)
                            if (B.contains(this, e[t])) return !0
                    })
                },
                closest: function(t, e) {
                    var r, i = 0,
                        s = this.length,
                        n = [],
                        a = "string" != typeof t && B(t);
                    if (!L.test(t))
                        for (; i < s; i++)
                            for (r = this[i]; r && r !== e; r = r.parentNode)
                                if (r.nodeType < 11 && (a ? a.index(r) > -1 : 1 === r.nodeType && B.find.matchesSelector(r, t))) { n.push(r); break }
                    return this.pushStack(n.length > 1 ? B.uniqueSort(n) : n)
                },
                index: function(t) { return t ? "string" == typeof t ? c.call(B(t), this[0]) : c.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 },
                add: function(t, e) { return this.pushStack(B.uniqueSort(B.merge(this.get(), B(t, e)))) },
                addBack: function(t) { return this.add(null == t ? this.prevObject : this.prevObject.filter(t)) }
            }), B.each({ parent: function(t) { var e = t.parentNode; return e && 11 !== e.nodeType ? e : null }, parents: function(t) { return A(t, "parentNode") }, parentsUntil: function(t, e, r) { return A(t, "parentNode", r) }, next: function(t) { return D(t, "nextSibling") }, prev: function(t) { return D(t, "previousSibling") }, nextAll: function(t) { return A(t, "nextSibling") }, prevAll: function(t) { return A(t, "previousSibling") }, nextUntil: function(t, e, r) { return A(t, "nextSibling", r) }, prevUntil: function(t, e, r) { return A(t, "previousSibling", r) }, siblings: function(t) { return F((t.parentNode || {}).firstChild, t) }, children: function(t) { return F(t.firstChild) }, contents: function(t) { return _(t, "iframe") ? t.contentDocument : (_(t, "template") && (t = t.content || t), B.merge([], t.childNodes)) } }, function(t, e) { B.fn[t] = function(r, i) { var s = B.map(this, e, r); return "Until" !== t.slice(-5) && (i = r), i && "string" == typeof i && (s = B.filter(i, s)), this.length > 1 && (O[t] || B.uniqueSort(s), P.test(t) && s.reverse()), this.pushStack(s) } });
            var W = /[^\x20\t\r\n\f]+/g;

            function I(t) { return t }

            function G(t) { throw t }

            function N(t, e, r, i) { var s; try { t && C(s = t.promise) ? s.call(t).done(e).fail(r) : t && C(s = t.then) ? s.call(t, e, r) : e.apply(void 0, [t].slice(i)) } catch (t) { r.apply(void 0, [t]) } }
            B.Callbacks = function(t) {
                t = "string" == typeof t ? function(t) { var e = {}; return B.each(t.match(W) || [], function(t, r) { e[r] = !0 }), e }(t) : B.extend({}, t);
                var e, r, i, s, n = [],
                    a = [],
                    o = -1,
                    h = function() {
                        for (s = s || t.once, i = e = !0; a.length; o = -1)
                            for (r = a.shift(); ++o < n.length;) !1 === n[o].apply(r[0], r[1]) && t.stopOnFalse && (o = n.length, r = !1);
                        t.memory || (r = !1), e = !1, s && (n = r ? [] : "")
                    },
                    u = {
                        add: function() { return n && (r && !e && (o = n.length - 1, a.push(r)), function e(r) { B.each(r, function(r, i) { C(i) ? t.unique && u.has(i) || n.push(i) : i && i.length && "string" !== k(i) && e(i) }) }(arguments), r && !e && h()), this },
                        remove: function() {
                            return B.each(arguments, function(t, e) {
                                for (var r;
                                    (r = B.inArray(e, n, r)) > -1;) n.splice(r, 1), r <= o && o--
                            }), this
                        },
                        has: function(t) { return t ? B.inArray(t, n) > -1 : n.length > 0 },
                        empty: function() { return n && (n = []), this },
                        disable: function() { return s = a = [], n = r = "", this },
                        disabled: function() { return !n },
                        lock: function() { return s = a = [], r || e || (n = r = ""), this },
                        locked: function() { return !!s },
                        fireWith: function(t, r) { return s || (r = [t, (r = r || []).slice ? r.slice() : r], a.push(r), e || h()), this },
                        fire: function() { return u.fireWith(this, arguments), this },
                        fired: function() { return !!i }
                    };
                return u
            }, B.extend({
                Deferred: function(t) {
                    var e = [
                            ["notify", "progress", B.Callbacks("memory"), B.Callbacks("memory"), 2],
                            ["resolve", "done", B.Callbacks("once memory"), B.Callbacks("once memory"), 0, "resolved"],
                            ["reject", "fail", B.Callbacks("once memory"), B.Callbacks("once memory"), 1, "rejected"]
                        ],
                        i = "pending",
                        s = {
                            state: function() { return i },
                            always: function() { return n.done(arguments).fail(arguments), this },
                            catch: function(t) { return s.then(null, t) },
                            pipe: function() {
                                var t = arguments;
                                return B.Deferred(function(r) {
                                    B.each(e, function(e, i) {
                                        var s = C(t[i[4]]) && t[i[4]];
                                        n[i[1]](function() {
                                            var t = s && s.apply(this, arguments);
                                            t && C(t.promise) ? t.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[i[0] + "With"](this, s ? [t] : arguments)
                                        })
                                    }), t = null
                                }).promise()
                            },
                            then: function(t, i, s) {
                                var n = 0;

                                function a(t, e, i, s) {
                                    return function() {
                                        var o = this,
                                            h = arguments,
                                            u = function() {
                                                var r, u;
                                                if (!(t < n)) {
                                                    if ((r = i.apply(o, h)) === e.promise()) throw new TypeError("Thenable self-resolution");
                                                    u = r && ("object" == typeof r || "function" == typeof r) && r.then, C(u) ? s ? u.call(r, a(n, e, I, s), a(n, e, G, s)) : (n++, u.call(r, a(n, e, I, s), a(n, e, G, s), a(n, e, I, e.notifyWith))) : (i !== I && (o = void 0, h = [r]), (s || e.resolveWith)(o, h))
                                                }
                                            },
                                            l = s ? u : function() { try { u() } catch (r) { B.Deferred.exceptionHook && B.Deferred.exceptionHook(r, l.stackTrace), t + 1 >= n && (i !== G && (o = void 0, h = [r]), e.rejectWith(o, h)) } };
                                        t ? l() : (B.Deferred.getStackHook && (l.stackTrace = B.Deferred.getStackHook()), r.setTimeout(l))
                                    }
                                }
                                return B.Deferred(function(r) { e[0][3].add(a(0, r, C(s) ? s : I, r.notifyWith)), e[1][3].add(a(0, r, C(t) ? t : I)), e[2][3].add(a(0, r, C(i) ? i : G)) }).promise()
                            },
                            promise: function(t) { return null != t ? B.extend(t, s) : s }
                        },
                        n = {};
                    return B.each(e, function(t, r) {
                        var a = r[2],
                            o = r[5];
                        s[r[1]] = a.add, o && a.add(function() { i = o }, e[3 - t][2].disable, e[3 - t][3].disable, e[0][2].lock, e[0][3].lock), a.add(r[3].fire), n[r[0]] = function() { return n[r[0] + "With"](this === n ? void 0 : this, arguments), this }, n[r[0] + "With"] = a.fireWith
                    }), s.promise(n), t && t.call(n, n), n
                },
                when: function(t) {
                    var e = arguments.length,
                        r = e,
                        i = Array(r),
                        s = h.call(arguments),
                        n = B.Deferred(),
                        a = function(t) { return function(r) { i[t] = this, s[t] = arguments.length > 1 ? h.call(arguments) : r, --e || n.resolveWith(i, s) } };
                    if (e <= 1 && (N(t, n.done(a(r)).resolve, n.reject, !e), "pending" === n.state() || C(s[r] && s[r].then))) return n.then();
                    for (; r--;) N(s[r], a(r), n.reject);
                    return n.promise()
                }
            });
            var z = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
            B.Deferred.exceptionHook = function(t, e) { r.console && r.console.warn && t && z.test(t.name) && r.console.warn("jQuery.Deferred exception: " + t.message, t.stack, e) }, B.readyException = function(t) { r.setTimeout(function() { throw t }) };
            var j = B.Deferred();

            function U() { a.removeEventListener("DOMContentLoaded", U), r.removeEventListener("load", U), B.ready() }
            B.fn.ready = function(t) { return j.then(t).catch(function(t) { B.readyException(t) }), this }, B.extend({
                isReady: !1,
                readyWait: 1,
                ready: function(t) {
                    (!0 === t ? --B.readyWait : B.isReady) || (B.isReady = !0, !0 !== t && --B.readyWait > 0 || j.resolveWith(a, [B]))
                }
            }), B.ready.then = j.then, "complete" === a.readyState || "loading" !== a.readyState && !a.documentElement.doScroll ? r.setTimeout(B.ready) : (a.addEventListener("DOMContentLoaded", U), r.addEventListener("load", U));
            var q = function(t, e, r, i, s, n, a) {
                    var o = 0,
                        h = t.length,
                        u = null == r;
                    if ("object" === k(r))
                        for (o in s = !0, r) q(t, e, o, r[o], !0, n, a);
                    else if (void 0 !== i && (s = !0, C(i) || (a = !0), u && (a ? (e.call(t, i), e = null) : (u = e, e = function(t, e, r) { return u.call(B(t), r) })), e))
                        for (; o < h; o++) e(t[o], r, a ? i : i.call(t[o], o, e(t[o], r)));
                    return s ? t : u ? e.call(t) : h ? e(t[0], r) : n
                },
                Z = /^-ms-/,
                V = /-([a-z])/g;

            function J(t, e) { return e.toUpperCase() }

            function Y(t) { return t.replace(Z, "ms-").replace(V, J) }
            var X = function(t) { return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType };

            function $() { this.expando = B.expando + $.uid++ }
            $.uid = 1, $.prototype = {
                cache: function(t) { var e = t[this.expando]; return e || (e = {}, X(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, { value: e, configurable: !0 }))), e },
                set: function(t, e, r) {
                    var i, s = this.cache(t);
                    if ("string" == typeof e) s[Y(e)] = r;
                    else
                        for (i in e) s[Y(i)] = e[i];
                    return s
                },
                get: function(t, e) { return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][Y(e)] },
                access: function(t, e, r) { return void 0 === e || e && "string" == typeof e && void 0 === r ? this.get(t, e) : (this.set(t, e, r), void 0 !== r ? r : e) },
                remove: function(t, e) { var r, i = t[this.expando]; if (void 0 !== i) { if (void 0 !== e) { r = (e = Array.isArray(e) ? e.map(Y) : (e = Y(e)) in i ? [e] : e.match(W) || []).length; for (; r--;) delete i[e[r]] }(void 0 === e || B.isEmptyObject(i)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando]) } },
                hasData: function(t) { var e = t[this.expando]; return void 0 !== e && !B.isEmptyObject(e) }
            };
            var Q = new $,
                K = new $,
                tt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                et = /[A-Z]/g;

            function rt(t, e, r) {
                var i;
                if (void 0 === r && 1 === t.nodeType)
                    if (i = "data-" + e.replace(et, "-$&").toLowerCase(), "string" == typeof(r = t.getAttribute(i))) {
                        try { r = function(t) { return "true" === t || "false" !== t && ("null" === t ? null : t === +t + "" ? +t : tt.test(t) ? JSON.parse(t) : t) }(r) } catch (t) {}
                        K.set(t, e, r)
                    } else r = void 0;
                return r
            }
            B.extend({ hasData: function(t) { return K.hasData(t) || Q.hasData(t) }, data: function(t, e, r) { return K.access(t, e, r) }, removeData: function(t, e) { K.remove(t, e) }, _data: function(t, e, r) { return Q.access(t, e, r) }, _removeData: function(t, e) { Q.remove(t, e) } }), B.fn.extend({
                data: function(t, e) {
                    var r, i, s, n = this[0],
                        a = n && n.attributes;
                    if (void 0 === t) {
                        if (this.length && (s = K.get(n), 1 === n.nodeType && !Q.get(n, "hasDataAttrs"))) {
                            for (r = a.length; r--;) a[r] && 0 === (i = a[r].name).indexOf("data-") && (i = Y(i.slice(5)), rt(n, i, s[i]));
                            Q.set(n, "hasDataAttrs", !0)
                        }
                        return s
                    }
                    return "object" == typeof t ? this.each(function() { K.set(this, t) }) : q(this, function(e) {
                        var r;
                        if (n && void 0 === e) return void 0 !== (r = K.get(n, t)) ? r : void 0 !== (r = rt(n, t)) ? r : void 0;
                        this.each(function() { K.set(this, t, e) })
                    }, null, e, arguments.length > 1, null, !0)
                },
                removeData: function(t) { return this.each(function() { K.remove(this, t) }) }
            }), B.extend({
                queue: function(t, e, r) { var i; if (t) return e = (e || "fx") + "queue", i = Q.get(t, e), r && (!i || Array.isArray(r) ? i = Q.access(t, e, B.makeArray(r)) : i.push(r)), i || [] },
                dequeue: function(t, e) {
                    e = e || "fx";
                    var r = B.queue(t, e),
                        i = r.length,
                        s = r.shift(),
                        n = B._queueHooks(t, e);
                    "inprogress" === s && (s = r.shift(), i--), s && ("fx" === e && r.unshift("inprogress"), delete n.stop, s.call(t, function() { B.dequeue(t, e) }, n)), !i && n && n.empty.fire()
                },
                _queueHooks: function(t, e) { var r = e + "queueHooks"; return Q.get(t, r) || Q.access(t, r, { empty: B.Callbacks("once memory").add(function() { Q.remove(t, [e + "queue", r]) }) }) }
            }), B.fn.extend({
                queue: function(t, e) {
                    var r = 2;
                    return "string" != typeof t && (e = t, t = "fx", r--), arguments.length < r ? B.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                        var r = B.queue(this, t, e);
                        B._queueHooks(this, t), "fx" === t && "inprogress" !== r[0] && B.dequeue(this, t)
                    })
                },
                dequeue: function(t) { return this.each(function() { B.dequeue(this, t) }) },
                clearQueue: function(t) { return this.queue(t || "fx", []) },
                promise: function(t, e) {
                    var r, i = 1,
                        s = B.Deferred(),
                        n = this,
                        a = this.length,
                        o = function() {--i || s.resolveWith(n, [n]) };
                    for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; a--;)(r = Q.get(n[a], t + "queueHooks")) && r.empty && (i++, r.empty.add(o));
                    return o(), s.promise(e)
                }
            });
            var it = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                st = new RegExp("^(?:([+-])=|)(" + it + ")([a-z%]*)$", "i"),
                nt = ["Top", "Right", "Bottom", "Left"],
                at = function(t, e) { return "none" === (t = e || t).style.display || "" === t.style.display && B.contains(t.ownerDocument, t) && "none" === B.css(t, "display") },
                ot = function(t, e, r, i) { var s, n, a = {}; for (n in e) a[n] = t.style[n], t.style[n] = e[n]; for (n in s = r.apply(t, i || []), e) t.style[n] = a[n]; return s };

            function ht(t, e, r, i) {
                var s, n, a = 20,
                    o = i ? function() { return i.cur() } : function() { return B.css(t, e, "") },
                    h = o(),
                    u = r && r[3] || (B.cssNumber[e] ? "" : "px"),
                    l = (B.cssNumber[e] || "px" !== u && +h) && st.exec(B.css(t, e));
                if (l && l[3] !== u) {
                    for (h /= 2, u = u || l[3], l = +h || 1; a--;) B.style(t, e, l + u), (1 - n) * (1 - (n = o() / h || .5)) <= 0 && (a = 0), l /= n;
                    l *= 2, B.style(t, e, l + u), r = r || []
                }
                return r && (l = +l || +h || 0, s = r[1] ? l + (r[1] + 1) * r[2] : +r[2], i && (i.unit = u, i.start = l, i.end = s)), s
            }
            var ut = {};

            function lt(t) {
                var e, r = t.ownerDocument,
                    i = t.nodeName,
                    s = ut[i];
                return s || (e = r.body.appendChild(r.createElement(i)), s = B.css(e, "display"), e.parentNode.removeChild(e), "none" === s && (s = "block"), ut[i] = s, s)
            }

            function ct(t, e) { for (var r, i, s = [], n = 0, a = t.length; n < a; n++)(i = t[n]).style && (r = i.style.display, e ? ("none" === r && (s[n] = Q.get(i, "display") || null, s[n] || (i.style.display = "")), "" === i.style.display && at(i) && (s[n] = lt(i))) : "none" !== r && (s[n] = "none", Q.set(i, "display", r))); for (n = 0; n < a; n++) null != s[n] && (t[n].style.display = s[n]); return t }
            B.fn.extend({ show: function() { return ct(this, !0) }, hide: function() { return ct(this) }, toggle: function(t) { return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() { at(this) ? B(this).show() : B(this).hide() }) } });
            var ft = /^(?:checkbox|radio)$/i,
                dt = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
                mt = /^$|^module$|\/(?:java|ecma)script/i,
                pt = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };

            function gt(t, e) { var r; return r = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || "*") : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || "*") : [], void 0 === e || e && _(t, e) ? B.merge([t], r) : r }

            function yt(t, e) { for (var r = 0, i = t.length; r < i; r++) Q.set(t[r], "globalEval", !e || Q.get(e[r], "globalEval")) }
            pt.optgroup = pt.option, pt.tbody = pt.tfoot = pt.colgroup = pt.caption = pt.thead, pt.th = pt.td;
            var Ct, bt, vt = /<|&#?\w+;/;

            function wt(t, e, r, i, s) {
                for (var n, a, o, h, u, l, c = e.createDocumentFragment(), f = [], d = 0, m = t.length; d < m; d++)
                    if ((n = t[d]) || 0 === n)
                        if ("object" === k(n)) B.merge(f, n.nodeType ? [n] : n);
                        else if (vt.test(n)) {
                    for (a = a || c.appendChild(e.createElement("div")), o = (dt.exec(n) || ["", ""])[1].toLowerCase(), h = pt[o] || pt._default, a.innerHTML = h[1] + B.htmlPrefilter(n) + h[2], l = h[0]; l--;) a = a.lastChild;
                    B.merge(f, a.childNodes), (a = c.firstChild).textContent = ""
                } else f.push(e.createTextNode(n));
                for (c.textContent = "", d = 0; n = f[d++];)
                    if (i && B.inArray(n, i) > -1) s && s.push(n);
                    else if (u = B.contains(n.ownerDocument, n), a = gt(c.appendChild(n), "script"), u && yt(a), r)
                    for (l = 0; n = a[l++];) mt.test(n.type || "") && r.push(n);
                return c
            }
            Ct = a.createDocumentFragment().appendChild(a.createElement("div")), (bt = a.createElement("input")).setAttribute("type", "radio"), bt.setAttribute("checked", "checked"), bt.setAttribute("name", "t"), Ct.appendChild(bt), y.checkClone = Ct.cloneNode(!0).cloneNode(!0).lastChild.checked, Ct.innerHTML = "<textarea>x</textarea>", y.noCloneChecked = !!Ct.cloneNode(!0).lastChild.defaultValue;
            var kt = a.documentElement,
                Bt = /^key/,
                St = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                Rt = /^([^.]*)(?:\.(.+)|)/;

            function Tt() { return !0 }

            function At() { return !1 }

            function Ft() { try { return a.activeElement } catch (t) {} }

            function Lt(t, e, r, i, s, n) {
                var a, o;
                if ("object" == typeof e) { for (o in "string" != typeof r && (i = i || r, r = void 0), e) Lt(t, o, r, i, e[o], n); return t }
                if (null == i && null == s ? (s = r, i = r = void 0) : null == s && ("string" == typeof r ? (s = i, i = void 0) : (s = i, i = r, r = void 0)), !1 === s) s = At;
                else if (!s) return t;
                return 1 === n && (a = s, (s = function(t) { return B().off(t), a.apply(this, arguments) }).guid = a.guid || (a.guid = B.guid++)), t.each(function() { B.event.add(this, e, s, i, r) })
            }
            B.event = {
                global: {},
                add: function(t, e, r, i, s) {
                    var n, a, o, h, u, l, c, f, d, m, p, g = Q.get(t);
                    if (g)
                        for (r.handler && (r = (n = r).handler, s = n.selector), s && B.find.matchesSelector(kt, s), r.guid || (r.guid = B.guid++), (h = g.events) || (h = g.events = {}), (a = g.handle) || (a = g.handle = function(e) { return void 0 !== B && B.event.triggered !== e.type ? B.event.dispatch.apply(t, arguments) : void 0 }), u = (e = (e || "").match(W) || [""]).length; u--;) d = p = (o = Rt.exec(e[u]) || [])[1], m = (o[2] || "").split(".").sort(), d && (c = B.event.special[d] || {}, d = (s ? c.delegateType : c.bindType) || d, c = B.event.special[d] || {}, l = B.extend({ type: d, origType: p, data: i, handler: r, guid: r.guid, selector: s, needsContext: s && B.expr.match.needsContext.test(s), namespace: m.join(".") }, n), (f = h[d]) || ((f = h[d] = []).delegateCount = 0, c.setup && !1 !== c.setup.call(t, i, m, a) || t.addEventListener && t.addEventListener(d, a)), c.add && (c.add.call(t, l), l.handler.guid || (l.handler.guid = r.guid)), s ? f.splice(f.delegateCount++, 0, l) : f.push(l), B.event.global[d] = !0)
                },
                remove: function(t, e, r, i, s) {
                    var n, a, o, h, u, l, c, f, d, m, p, g = Q.hasData(t) && Q.get(t);
                    if (g && (h = g.events)) {
                        for (u = (e = (e || "").match(W) || [""]).length; u--;)
                            if (d = p = (o = Rt.exec(e[u]) || [])[1], m = (o[2] || "").split(".").sort(), d) {
                                for (c = B.event.special[d] || {}, f = h[d = (i ? c.delegateType : c.bindType) || d] || [], o = o[2] && new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = n = f.length; n--;) l = f[n], !s && p !== l.origType || r && r.guid !== l.guid || o && !o.test(l.namespace) || i && i !== l.selector && ("**" !== i || !l.selector) || (f.splice(n, 1), l.selector && f.delegateCount--, c.remove && c.remove.call(t, l));
                                a && !f.length && (c.teardown && !1 !== c.teardown.call(t, m, g.handle) || B.removeEvent(t, d, g.handle), delete h[d])
                            } else
                                for (d in h) B.event.remove(t, d + e[u], r, i, !0);
                        B.isEmptyObject(h) && Q.remove(t, "handle events")
                    }
                },
                dispatch: function(t) {
                    var e, r, i, s, n, a, o = B.event.fix(t),
                        h = new Array(arguments.length),
                        u = (Q.get(this, "events") || {})[o.type] || [],
                        l = B.event.special[o.type] || {};
                    for (h[0] = o, e = 1; e < arguments.length; e++) h[e] = arguments[e];
                    if (o.delegateTarget = this, !l.preDispatch || !1 !== l.preDispatch.call(this, o)) {
                        for (a = B.event.handlers.call(this, o, u), e = 0;
                            (s = a[e++]) && !o.isPropagationStopped();)
                            for (o.currentTarget = s.elem, r = 0;
                                (n = s.handlers[r++]) && !o.isImmediatePropagationStopped();) o.rnamespace && !o.rnamespace.test(n.namespace) || (o.handleObj = n, o.data = n.data, void 0 !== (i = ((B.event.special[n.origType] || {}).handle || n.handler).apply(s.elem, h)) && !1 === (o.result = i) && (o.preventDefault(), o.stopPropagation()));
                        return l.postDispatch && l.postDispatch.call(this, o), o.result
                    }
                },
                handlers: function(t, e) {
                    var r, i, s, n, a, o = [],
                        h = e.delegateCount,
                        u = t.target;
                    if (h && u.nodeType && !("click" === t.type && t.button >= 1))
                        for (; u !== this; u = u.parentNode || this)
                            if (1 === u.nodeType && ("click" !== t.type || !0 !== u.disabled)) {
                                for (n = [], a = {}, r = 0; r < h; r++) void 0 === a[s = (i = e[r]).selector + " "] && (a[s] = i.needsContext ? B(s, this).index(u) > -1 : B.find(s, this, null, [u]).length), a[s] && n.push(i);
                                n.length && o.push({ elem: u, handlers: n })
                            }
                    return u = this, h < e.length && o.push({ elem: u, handlers: e.slice(h) }), o
                },
                addProp: function(t, e) { Object.defineProperty(B.Event.prototype, t, { enumerable: !0, configurable: !0, get: C(e) ? function() { if (this.originalEvent) return e(this.originalEvent) } : function() { if (this.originalEvent) return this.originalEvent[t] }, set: function(e) { Object.defineProperty(this, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) } }) },
                fix: function(t) { return t[B.expando] ? t : new B.Event(t) },
                special: { load: { noBubble: !0 }, focus: { trigger: function() { if (this !== Ft() && this.focus) return this.focus(), !1 }, delegateType: "focusin" }, blur: { trigger: function() { if (this === Ft() && this.blur) return this.blur(), !1 }, delegateType: "focusout" }, click: { trigger: function() { if ("checkbox" === this.type && this.click && _(this, "input")) return this.click(), !1 }, _default: function(t) { return _(t.target, "a") } }, beforeunload: { postDispatch: function(t) { void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result) } } }
            }, B.removeEvent = function(t, e, r) { t.removeEventListener && t.removeEventListener(e, r) }, B.Event = function(t, e) {
                if (!(this instanceof B.Event)) return new B.Event(t, e);
                t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? Tt : At, this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target, this.currentTarget = t.currentTarget, this.relatedTarget = t.relatedTarget) : this.type = t, e && B.extend(this, e), this.timeStamp = t && t.timeStamp || Date.now(), this[B.expando] = !0
            }, B.Event.prototype = {
                constructor: B.Event,
                isDefaultPrevented: At,
                isPropagationStopped: At,
                isImmediatePropagationStopped: At,
                isSimulated: !1,
                preventDefault: function() {
                    var t = this.originalEvent;
                    this.isDefaultPrevented = Tt, t && !this.isSimulated && t.preventDefault()
                },
                stopPropagation: function() {
                    var t = this.originalEvent;
                    this.isPropagationStopped = Tt, t && !this.isSimulated && t.stopPropagation()
                },
                stopImmediatePropagation: function() {
                    var t = this.originalEvent;
                    this.isImmediatePropagationStopped = Tt, t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation()
                }
            }, B.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, char: !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: function(t) { var e = t.button; return null == t.which && Bt.test(t.type) ? null != t.charCode ? t.charCode : t.keyCode : !t.which && void 0 !== e && St.test(t.type) ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : t.which } }, B.event.addProp), B.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function(t, e) {
                B.event.special[t] = {
                    delegateType: e,
                    bindType: e,
                    handle: function(t) {
                        var r, i = t.relatedTarget,
                            s = t.handleObj;
                        return i && (i === this || B.contains(this, i)) || (t.type = s.origType, r = s.handler.apply(this, arguments), t.type = e), r
                    }
                }
            }), B.fn.extend({ on: function(t, e, r, i) { return Lt(this, t, e, r, i) }, one: function(t, e, r, i) { return Lt(this, t, e, r, i, 1) }, off: function(t, e, r) { var i, s; if (t && t.preventDefault && t.handleObj) return i = t.handleObj, B(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this; if ("object" == typeof t) { for (s in t) this.off(s, e, t[s]); return this } return !1 !== e && "function" != typeof e || (r = e, e = void 0), !1 === r && (r = At), this.each(function() { B.event.remove(this, t, r, e) }) } });
            var _t = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
                xt = /<script|<style|<link/i,
                Ht = /checked\s*(?:[^=]|=\s*.checked.)/i,
                Et = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

            function Mt(t, e) { return _(t, "table") && _(11 !== e.nodeType ? e : e.firstChild, "tr") && B(t).children("tbody")[0] || t }

            function Pt(t) { return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t }

            function Ot(t) { return "true/" === (t.type || "").slice(0, 5) ? t.type = t.type.slice(5) : t.removeAttribute("type"), t }

            function Dt(t, e) {
                var r, i, s, n, a, o, h, u;
                if (1 === e.nodeType) {
                    if (Q.hasData(t) && (n = Q.access(t), a = Q.set(e, n), u = n.events))
                        for (s in delete a.handle, a.events = {}, u)
                            for (r = 0, i = u[s].length; r < i; r++) B.event.add(e, s, u[s][r]);
                    K.hasData(t) && (o = K.access(t), h = B.extend({}, o), K.set(e, h))
                }
            }

            function Wt(t, e, r, i) {
                e = u.apply([], e);
                var s, n, a, o, h, l, c = 0,
                    f = t.length,
                    d = f - 1,
                    m = e[0],
                    p = C(m);
                if (p || f > 1 && "string" == typeof m && !y.checkClone && Ht.test(m)) return t.each(function(s) {
                    var n = t.eq(s);
                    p && (e[0] = m.call(this, s, n.html())), Wt(n, e, r, i)
                });
                if (f && (n = (s = wt(e, t[0].ownerDocument, !1, t, i)).firstChild, 1 === s.childNodes.length && (s = n), n || i)) {
                    for (o = (a = B.map(gt(s, "script"), Pt)).length; c < f; c++) h = s, c !== d && (h = B.clone(h, !0, !0), o && B.merge(a, gt(h, "script"))), r.call(t[c], h, c);
                    if (o)
                        for (l = a[a.length - 1].ownerDocument, B.map(a, Ot), c = 0; c < o; c++) h = a[c], mt.test(h.type || "") && !Q.access(h, "globalEval") && B.contains(l, h) && (h.src && "module" !== (h.type || "").toLowerCase() ? B._evalUrl && B._evalUrl(h.src) : w(h.textContent.replace(Et, ""), l, h))
                }
                return t
            }

            function It(t, e, r) { for (var i, s = e ? B.filter(e, t) : t, n = 0; null != (i = s[n]); n++) r || 1 !== i.nodeType || B.cleanData(gt(i)), i.parentNode && (r && B.contains(i.ownerDocument, i) && yt(gt(i, "script")), i.parentNode.removeChild(i)); return t }
            B.extend({
                htmlPrefilter: function(t) { return t.replace(_t, "<$1></$2>") },
                clone: function(t, e, r) {
                    var i, s, n, a, o, h, u, l = t.cloneNode(!0),
                        c = B.contains(t.ownerDocument, t);
                    if (!(y.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || B.isXMLDoc(t)))
                        for (a = gt(l), i = 0, s = (n = gt(t)).length; i < s; i++) o = n[i], h = a[i], void 0, "input" === (u = h.nodeName.toLowerCase()) && ft.test(o.type) ? h.checked = o.checked : "input" !== u && "textarea" !== u || (h.defaultValue = o.defaultValue);
                    if (e)
                        if (r)
                            for (n = n || gt(t), a = a || gt(l), i = 0, s = n.length; i < s; i++) Dt(n[i], a[i]);
                        else Dt(t, l);
                    return (a = gt(l, "script")).length > 0 && yt(a, !c && gt(t, "script")), l
                },
                cleanData: function(t) {
                    for (var e, r, i, s = B.event.special, n = 0; void 0 !== (r = t[n]); n++)
                        if (X(r)) {
                            if (e = r[Q.expando]) {
                                if (e.events)
                                    for (i in e.events) s[i] ? B.event.remove(r, i) : B.removeEvent(r, i, e.handle);
                                r[Q.expando] = void 0
                            }
                            r[K.expando] && (r[K.expando] = void 0)
                        }
                }
            }), B.fn.extend({
                detach: function(t) { return It(this, t, !0) },
                remove: function(t) { return It(this, t) },
                text: function(t) { return q(this, function(t) { return void 0 === t ? B.text(this) : this.empty().each(function() { 1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t) }) }, null, t, arguments.length) },
                append: function() { return Wt(this, arguments, function(t) { 1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Mt(this, t).appendChild(t) }) },
                prepend: function() {
                    return Wt(this, arguments, function(t) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var e = Mt(this, t);
                            e.insertBefore(t, e.firstChild)
                        }
                    })
                },
                before: function() { return Wt(this, arguments, function(t) { this.parentNode && this.parentNode.insertBefore(t, this) }) },
                after: function() { return Wt(this, arguments, function(t) { this.parentNode && this.parentNode.insertBefore(t, this.nextSibling) }) },
                empty: function() { for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (B.cleanData(gt(t, !1)), t.textContent = ""); return this },
                clone: function(t, e) { return t = null != t && t, e = null == e ? t : e, this.map(function() { return B.clone(this, t, e) }) },
                html: function(t) {
                    return q(this, function(t) {
                        var e = this[0] || {},
                            r = 0,
                            i = this.length;
                        if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                        if ("string" == typeof t && !xt.test(t) && !pt[(dt.exec(t) || ["", ""])[1].toLowerCase()]) {
                            t = B.htmlPrefilter(t);
                            try {
                                for (; r < i; r++) 1 === (e = this[r] || {}).nodeType && (B.cleanData(gt(e, !1)), e.innerHTML = t);
                                e = 0
                            } catch (t) {}
                        }
                        e && this.empty().append(t)
                    }, null, t, arguments.length)
                },
                replaceWith: function() {
                    var t = [];
                    return Wt(this, arguments, function(e) {
                        var r = this.parentNode;
                        B.inArray(this, t) < 0 && (B.cleanData(gt(this)), r && r.replaceChild(e, this))
                    }, t)
                }
            }), B.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function(t, e) { B.fn[t] = function(t) { for (var r, i = [], s = B(t), n = s.length - 1, a = 0; a <= n; a++) r = a === n ? this : this.clone(!0), B(s[a])[e](r), l.apply(i, r.get()); return this.pushStack(i) } });
            var Gt = new RegExp("^(" + it + ")(?!px)[a-z%]+$", "i"),
                Nt = function(t) { var e = t.ownerDocument.defaultView; return e && e.opener || (e = r), e.getComputedStyle(t) },
                zt = new RegExp(nt.join("|"), "i");

            function jt(t, e, r) { var i, s, n, a, o = t.style; return (r = r || Nt(t)) && ("" !== (a = r.getPropertyValue(e) || r[e]) || B.contains(t.ownerDocument, t) || (a = B.style(t, e)), !y.pixelBoxStyles() && Gt.test(a) && zt.test(e) && (i = o.width, s = o.minWidth, n = o.maxWidth, o.minWidth = o.maxWidth = o.width = a, a = r.width, o.width = i, o.minWidth = s, o.maxWidth = n)), void 0 !== a ? a + "" : a }

            function Ut(t, e) {
                return {
                    get: function() {
                        if (!t()) return (this.get = e).apply(this, arguments);
                        delete this.get
                    }
                }
            }! function() {
                function t() {
                    if (l) {
                        u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", kt.appendChild(u).appendChild(l);
                        var t = r.getComputedStyle(l);
                        i = "1%" !== t.top, h = 12 === e(t.marginLeft), l.style.right = "60%", o = 36 === e(t.right), s = 36 === e(t.width), l.style.position = "absolute", n = 36 === l.offsetWidth || "absolute", kt.removeChild(u), l = null
                    }
                }

                function e(t) { return Math.round(parseFloat(t)) }
                var i, s, n, o, h, u = a.createElement("div"),
                    l = a.createElement("div");
                l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", y.clearCloneStyle = "content-box" === l.style.backgroundClip, B.extend(y, { boxSizingReliable: function() { return t(), s }, pixelBoxStyles: function() { return t(), o }, pixelPosition: function() { return t(), i }, reliableMarginLeft: function() { return t(), h }, scrollboxSize: function() { return t(), n } }))
            }();
            var qt = /^(none|table(?!-c[ea]).+)/,
                Zt = /^--/,
                Vt = { position: "absolute", visibility: "hidden", display: "block" },
                Jt = { letterSpacing: "0", fontWeight: "400" },
                Yt = ["Webkit", "Moz", "ms"],
                Xt = a.createElement("div").style;

            function $t(t) {
                var e = B.cssProps[t];
                return e || (e = B.cssProps[t] = function(t) {
                    if (t in Xt) return t;
                    for (var e = t[0].toUpperCase() + t.slice(1), r = Yt.length; r--;)
                        if ((t = Yt[r] + e) in Xt) return t
                }(t) || t), e
            }

            function Qt(t, e, r) { var i = st.exec(e); return i ? Math.max(0, i[2] - (r || 0)) + (i[3] || "px") : e }

            function Kt(t, e, r, i, s, n) {
                var a = "width" === e ? 1 : 0,
                    o = 0,
                    h = 0;
                if (r === (i ? "border" : "content")) return 0;
                for (; a < 4; a += 2) "margin" === r && (h += B.css(t, r + nt[a], !0, s)), i ? ("content" === r && (h -= B.css(t, "padding" + nt[a], !0, s)), "margin" !== r && (h -= B.css(t, "border" + nt[a] + "Width", !0, s))) : (h += B.css(t, "padding" + nt[a], !0, s), "padding" !== r ? h += B.css(t, "border" + nt[a] + "Width", !0, s) : o += B.css(t, "border" + nt[a] + "Width", !0, s));
                return !i && n >= 0 && (h += Math.max(0, Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - n - h - o - .5))), h
            }

            function te(t, e, r) {
                var i = Nt(t),
                    s = jt(t, e, i),
                    n = "border-box" === B.css(t, "boxSizing", !1, i),
                    a = n;
                if (Gt.test(s)) {
                    if (!r) return s;
                    s = "auto"
                }
                return a = a && (y.boxSizingReliable() || s === t.style[e]), ("auto" === s || !parseFloat(s) && "inline" === B.css(t, "display", !1, i)) && (s = t["offset" + e[0].toUpperCase() + e.slice(1)], a = !0), (s = parseFloat(s) || 0) + Kt(t, e, r || (n ? "border" : "content"), a, i, s) + "px"
            }

            function ee(t, e, r, i, s) { return new ee.prototype.init(t, e, r, i, s) }
            B.extend({
                cssHooks: { opacity: { get: function(t, e) { if (e) { var r = jt(t, "opacity"); return "" === r ? "1" : r } } } },
                cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 },
                cssProps: {},
                style: function(t, e, r, i) {
                    if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                        var s, n, a, o = Y(e),
                            h = Zt.test(e),
                            u = t.style;
                        if (h || (e = $t(o)), a = B.cssHooks[e] || B.cssHooks[o], void 0 === r) return a && "get" in a && void 0 !== (s = a.get(t, !1, i)) ? s : u[e];
                        "string" === (n = typeof r) && (s = st.exec(r)) && s[1] && (r = ht(t, e, s), n = "number"), null != r && r == r && ("number" === n && (r += s && s[3] || (B.cssNumber[o] ? "" : "px")), y.clearCloneStyle || "" !== r || 0 !== e.indexOf("background") || (u[e] = "inherit"), a && "set" in a && void 0 === (r = a.set(t, r, i)) || (h ? u.setProperty(e, r) : u[e] = r))
                    }
                },
                css: function(t, e, r, i) { var s, n, a, o = Y(e); return Zt.test(e) || (e = $t(o)), (a = B.cssHooks[e] || B.cssHooks[o]) && "get" in a && (s = a.get(t, !0, r)), void 0 === s && (s = jt(t, e, i)), "normal" === s && e in Jt && (s = Jt[e]), "" === r || r ? (n = parseFloat(s), !0 === r || isFinite(n) ? n || 0 : s) : s }
            }), B.each(["height", "width"], function(t, e) {
                B.cssHooks[e] = {
                    get: function(t, r, i) { if (r) return !qt.test(B.css(t, "display")) || t.getClientRects().length && t.getBoundingClientRect().width ? te(t, e, i) : ot(t, Vt, function() { return te(t, e, i) }) },
                    set: function(t, r, i) {
                        var s, n = Nt(t),
                            a = "border-box" === B.css(t, "boxSizing", !1, n),
                            o = i && Kt(t, e, i, a, n);
                        return a && y.scrollboxSize() === n.position && (o -= Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - parseFloat(n[e]) - Kt(t, e, "border", !1, n) - .5)), o && (s = st.exec(r)) && "px" !== (s[3] || "px") && (t.style[e] = r, r = B.css(t, e)), Qt(0, r, o)
                    }
                }
            }), B.cssHooks.marginLeft = Ut(y.reliableMarginLeft, function(t, e) { if (e) return (parseFloat(jt(t, "marginLeft")) || t.getBoundingClientRect().left - ot(t, { marginLeft: 0 }, function() { return t.getBoundingClientRect().left })) + "px" }), B.each({ margin: "", padding: "", border: "Width" }, function(t, e) { B.cssHooks[t + e] = { expand: function(r) { for (var i = 0, s = {}, n = "string" == typeof r ? r.split(" ") : [r]; i < 4; i++) s[t + nt[i] + e] = n[i] || n[i - 2] || n[0]; return s } }, "margin" !== t && (B.cssHooks[t + e].set = Qt) }), B.fn.extend({
                css: function(t, e) {
                    return q(this, function(t, e, r) {
                        var i, s, n = {},
                            a = 0;
                        if (Array.isArray(e)) { for (i = Nt(t), s = e.length; a < s; a++) n[e[a]] = B.css(t, e[a], !1, i); return n }
                        return void 0 !== r ? B.style(t, e, r) : B.css(t, e)
                    }, t, e, arguments.length > 1)
                }
            }), B.Tween = ee, ee.prototype = { constructor: ee, init: function(t, e, r, i, s, n) { this.elem = t, this.prop = r, this.easing = s || B.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = n || (B.cssNumber[r] ? "" : "px") }, cur: function() { var t = ee.propHooks[this.prop]; return t && t.get ? t.get(this) : ee.propHooks._default.get(this) }, run: function(t) { var e, r = ee.propHooks[this.prop]; return this.options.duration ? this.pos = e = B.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), r && r.set ? r.set(this) : ee.propHooks._default.set(this), this } }, ee.prototype.init.prototype = ee.prototype, ee.propHooks = { _default: { get: function(t) { var e; return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = B.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0 }, set: function(t) { B.fx.step[t.prop] ? B.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[B.cssProps[t.prop]] && !B.cssHooks[t.prop] ? t.elem[t.prop] = t.now : B.style(t.elem, t.prop, t.now + t.unit) } } }, ee.propHooks.scrollTop = ee.propHooks.scrollLeft = { set: function(t) { t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now) } }, B.easing = { linear: function(t) { return t }, swing: function(t) { return .5 - Math.cos(t * Math.PI) / 2 }, _default: "swing" }, B.fx = ee.prototype.init, B.fx.step = {};
            var re, ie, se = /^(?:toggle|show|hide)$/,
                ne = /queueHooks$/;

            function ae() { ie && (!1 === a.hidden && r.requestAnimationFrame ? r.requestAnimationFrame(ae) : r.setTimeout(ae, B.fx.interval), B.fx.tick()) }

            function oe() { return r.setTimeout(function() { re = void 0 }), re = Date.now() }

            function he(t, e) {
                var r, i = 0,
                    s = { height: t };
                for (e = e ? 1 : 0; i < 4; i += 2 - e) s["margin" + (r = nt[i])] = s["padding" + r] = t;
                return e && (s.opacity = s.width = t), s
            }

            function ue(t, e, r) {
                for (var i, s = (le.tweeners[e] || []).concat(le.tweeners["*"]), n = 0, a = s.length; n < a; n++)
                    if (i = s[n].call(r, e, t)) return i
            }

            function le(t, e, r) {
                var i, s, n = 0,
                    a = le.prefilters.length,
                    o = B.Deferred().always(function() { delete h.elem }),
                    h = function() { if (s) return !1; for (var e = re || oe(), r = Math.max(0, u.startTime + u.duration - e), i = 1 - (r / u.duration || 0), n = 0, a = u.tweens.length; n < a; n++) u.tweens[n].run(i); return o.notifyWith(t, [u, i, r]), i < 1 && a ? r : (a || o.notifyWith(t, [u, 1, 0]), o.resolveWith(t, [u]), !1) },
                    u = o.promise({
                        elem: t,
                        props: B.extend({}, e),
                        opts: B.extend(!0, { specialEasing: {}, easing: B.easing._default }, r),
                        originalProperties: e,
                        originalOptions: r,
                        startTime: re || oe(),
                        duration: r.duration,
                        tweens: [],
                        createTween: function(e, r) { var i = B.Tween(t, u.opts, e, r, u.opts.specialEasing[e] || u.opts.easing); return u.tweens.push(i), i },
                        stop: function(e) {
                            var r = 0,
                                i = e ? u.tweens.length : 0;
                            if (s) return this;
                            for (s = !0; r < i; r++) u.tweens[r].run(1);
                            return e ? (o.notifyWith(t, [u, 1, 0]), o.resolveWith(t, [u, e])) : o.rejectWith(t, [u, e]), this
                        }
                    }),
                    l = u.props;
                for (! function(t, e) {
                        var r, i, s, n, a;
                        for (r in t)
                            if (s = e[i = Y(r)], n = t[r], Array.isArray(n) && (s = n[1], n = t[r] = n[0]), r !== i && (t[i] = n, delete t[r]), (a = B.cssHooks[i]) && "expand" in a)
                                for (r in n = a.expand(n), delete t[i], n) r in t || (t[r] = n[r], e[r] = s);
                            else e[i] = s
                    }(l, u.opts.specialEasing); n < a; n++)
                    if (i = le.prefilters[n].call(u, t, l, u.opts)) return C(i.stop) && (B._queueHooks(u.elem, u.opts.queue).stop = i.stop.bind(i)), i;
                return B.map(l, ue, u), C(u.opts.start) && u.opts.start.call(t, u), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always), B.fx.timer(B.extend(h, { elem: t, anim: u, queue: u.opts.queue })), u
            }
            B.Animation = B.extend(le, {
                    tweeners: { "*": [function(t, e) { var r = this.createTween(t, e); return ht(r.elem, t, st.exec(e), r), r }] },
                    tweener: function(t, e) { C(t) ? (e = t, t = ["*"]) : t = t.match(W); for (var r, i = 0, s = t.length; i < s; i++) r = t[i], le.tweeners[r] = le.tweeners[r] || [], le.tweeners[r].unshift(e) },
                    prefilters: [function(t, e, r) {
                        var i, s, n, a, o, h, u, l, c = "width" in e || "height" in e,
                            f = this,
                            d = {},
                            m = t.style,
                            p = t.nodeType && at(t),
                            g = Q.get(t, "fxshow");
                        for (i in r.queue || (null == (a = B._queueHooks(t, "fx")).unqueued && (a.unqueued = 0, o = a.empty.fire, a.empty.fire = function() { a.unqueued || o() }), a.unqueued++, f.always(function() { f.always(function() { a.unqueued--, B.queue(t, "fx").length || a.empty.fire() }) })), e)
                            if (s = e[i], se.test(s)) {
                                if (delete e[i], n = n || "toggle" === s, s === (p ? "hide" : "show")) {
                                    if ("show" !== s || !g || void 0 === g[i]) continue;
                                    p = !0
                                }
                                d[i] = g && g[i] || B.style(t, i)
                            }
                        if ((h = !B.isEmptyObject(e)) || !B.isEmptyObject(d))
                            for (i in c && 1 === t.nodeType && (r.overflow = [m.overflow, m.overflowX, m.overflowY], null == (u = g && g.display) && (u = Q.get(t, "display")), "none" === (l = B.css(t, "display")) && (u ? l = u : (ct([t], !0), u = t.style.display || u, l = B.css(t, "display"), ct([t]))), ("inline" === l || "inline-block" === l && null != u) && "none" === B.css(t, "float") && (h || (f.done(function() { m.display = u }), null == u && (l = m.display, u = "none" === l ? "" : l)), m.display = "inline-block")), r.overflow && (m.overflow = "hidden", f.always(function() { m.overflow = r.overflow[0], m.overflowX = r.overflow[1], m.overflowY = r.overflow[2] })), h = !1, d) h || (g ? "hidden" in g && (p = g.hidden) : g = Q.access(t, "fxshow", { display: u }), n && (g.hidden = !p), p && ct([t], !0), f.done(function() { for (i in p || ct([t]), Q.remove(t, "fxshow"), d) B.style(t, i, d[i]) })), h = ue(p ? g[i] : 0, i, f), i in g || (g[i] = h.start, p && (h.end = h.start, h.start = 0))
                    }],
                    prefilter: function(t, e) { e ? le.prefilters.unshift(t) : le.prefilters.push(t) }
                }), B.speed = function(t, e, r) { var i = t && "object" == typeof t ? B.extend({}, t) : { complete: r || !r && e || C(t) && t, duration: t, easing: r && e || e && !C(e) && e }; return B.fx.off ? i.duration = 0 : "number" != typeof i.duration && (i.duration in B.fx.speeds ? i.duration = B.fx.speeds[i.duration] : i.duration = B.fx.speeds._default), null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function() { C(i.old) && i.old.call(this), i.queue && B.dequeue(this, i.queue) }, i }, B.fn.extend({
                    fadeTo: function(t, e, r, i) { return this.filter(at).css("opacity", 0).show().end().animate({ opacity: e }, t, r, i) },
                    animate: function(t, e, r, i) {
                        var s = B.isEmptyObject(t),
                            n = B.speed(e, r, i),
                            a = function() {
                                var e = le(this, B.extend({}, t), n);
                                (s || Q.get(this, "finish")) && e.stop(!0)
                            };
                        return a.finish = a, s || !1 === n.queue ? this.each(a) : this.queue(n.queue, a)
                    },
                    stop: function(t, e, r) {
                        var i = function(t) {
                            var e = t.stop;
                            delete t.stop, e(r)
                        };
                        return "string" != typeof t && (r = e, e = t, t = void 0), e && !1 !== t && this.queue(t || "fx", []), this.each(function() {
                            var e = !0,
                                s = null != t && t + "queueHooks",
                                n = B.timers,
                                a = Q.get(this);
                            if (s) a[s] && a[s].stop && i(a[s]);
                            else
                                for (s in a) a[s] && a[s].stop && ne.test(s) && i(a[s]);
                            for (s = n.length; s--;) n[s].elem !== this || null != t && n[s].queue !== t || (n[s].anim.stop(r), e = !1, n.splice(s, 1));
                            !e && r || B.dequeue(this, t)
                        })
                    },
                    finish: function(t) {
                        return !1 !== t && (t = t || "fx"), this.each(function() {
                            var e, r = Q.get(this),
                                i = r[t + "queue"],
                                s = r[t + "queueHooks"],
                                n = B.timers,
                                a = i ? i.length : 0;
                            for (r.finish = !0, B.queue(this, t, []), s && s.stop && s.stop.call(this, !0), e = n.length; e--;) n[e].elem === this && n[e].queue === t && (n[e].anim.stop(!0), n.splice(e, 1));
                            for (e = 0; e < a; e++) i[e] && i[e].finish && i[e].finish.call(this);
                            delete r.finish
                        })
                    }
                }), B.each(["toggle", "show", "hide"], function(t, e) {
                    var r = B.fn[e];
                    B.fn[e] = function(t, i, s) { return null == t || "boolean" == typeof t ? r.apply(this, arguments) : this.animate(he(e, !0), t, i, s) }
                }), B.each({ slideDown: he("show"), slideUp: he("hide"), slideToggle: he("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function(t, e) { B.fn[t] = function(t, r, i) { return this.animate(e, t, r, i) } }), B.timers = [], B.fx.tick = function() {
                    var t, e = 0,
                        r = B.timers;
                    for (re = Date.now(); e < r.length; e++)(t = r[e])() || r[e] !== t || r.splice(e--, 1);
                    r.length || B.fx.stop(), re = void 0
                }, B.fx.timer = function(t) { B.timers.push(t), B.fx.start() }, B.fx.interval = 13, B.fx.start = function() { ie || (ie = !0, ae()) }, B.fx.stop = function() { ie = null }, B.fx.speeds = { slow: 600, fast: 200, _default: 400 }, B.fn.delay = function(t, e) {
                    return t = B.fx && B.fx.speeds[t] || t, e = e || "fx", this.queue(e, function(e, i) {
                        var s = r.setTimeout(e, t);
                        i.stop = function() { r.clearTimeout(s) }
                    })
                },
                function() {
                    var t = a.createElement("input"),
                        e = a.createElement("select").appendChild(a.createElement("option"));
                    t.type = "checkbox", y.checkOn = "" !== t.value, y.optSelected = e.selected, (t = a.createElement("input")).value = "t", t.type = "radio", y.radioValue = "t" === t.value
                }();
            var ce, fe = B.expr.attrHandle;
            B.fn.extend({ attr: function(t, e) { return q(this, B.attr, t, e, arguments.length > 1) }, removeAttr: function(t) { return this.each(function() { B.removeAttr(this, t) }) } }), B.extend({
                attr: function(t, e, r) { var i, s, n = t.nodeType; if (3 !== n && 8 !== n && 2 !== n) return void 0 === t.getAttribute ? B.prop(t, e, r) : (1 === n && B.isXMLDoc(t) || (s = B.attrHooks[e.toLowerCase()] || (B.expr.match.bool.test(e) ? ce : void 0)), void 0 !== r ? null === r ? void B.removeAttr(t, e) : s && "set" in s && void 0 !== (i = s.set(t, r, e)) ? i : (t.setAttribute(e, r + ""), r) : s && "get" in s && null !== (i = s.get(t, e)) ? i : null == (i = B.find.attr(t, e)) ? void 0 : i) },
                attrHooks: { type: { set: function(t, e) { if (!y.radioValue && "radio" === e && _(t, "input")) { var r = t.value; return t.setAttribute("type", e), r && (t.value = r), e } } } },
                removeAttr: function(t, e) {
                    var r, i = 0,
                        s = e && e.match(W);
                    if (s && 1 === t.nodeType)
                        for (; r = s[i++];) t.removeAttribute(r)
                }
            }), ce = { set: function(t, e, r) { return !1 === e ? B.removeAttr(t, r) : t.setAttribute(r, r), r } }, B.each(B.expr.match.bool.source.match(/\w+/g), function(t, e) {
                var r = fe[e] || B.find.attr;
                fe[e] = function(t, e, i) { var s, n, a = e.toLowerCase(); return i || (n = fe[a], fe[a] = s, s = null != r(t, e, i) ? a : null, fe[a] = n), s }
            });
            var de = /^(?:input|select|textarea|button)$/i,
                me = /^(?:a|area)$/i;

            function pe(t) { return (t.match(W) || []).join(" ") }

            function ge(t) { return t.getAttribute && t.getAttribute("class") || "" }

            function ye(t) { return Array.isArray(t) ? t : "string" == typeof t && t.match(W) || [] }
            B.fn.extend({ prop: function(t, e) { return q(this, B.prop, t, e, arguments.length > 1) }, removeProp: function(t) { return this.each(function() { delete this[B.propFix[t] || t] }) } }), B.extend({ prop: function(t, e, r) { var i, s, n = t.nodeType; if (3 !== n && 8 !== n && 2 !== n) return 1 === n && B.isXMLDoc(t) || (e = B.propFix[e] || e, s = B.propHooks[e]), void 0 !== r ? s && "set" in s && void 0 !== (i = s.set(t, r, e)) ? i : t[e] = r : s && "get" in s && null !== (i = s.get(t, e)) ? i : t[e] }, propHooks: { tabIndex: { get: function(t) { var e = B.find.attr(t, "tabindex"); return e ? parseInt(e, 10) : de.test(t.nodeName) || me.test(t.nodeName) && t.href ? 0 : -1 } } }, propFix: { for: "htmlFor", class: "className" } }), y.optSelected || (B.propHooks.selected = {
                get: function(t) { var e = t.parentNode; return e && e.parentNode && e.parentNode.selectedIndex, null },
                set: function(t) {
                    var e = t.parentNode;
                    e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
                }
            }), B.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() { B.propFix[this.toLowerCase()] = this }), B.fn.extend({
                addClass: function(t) {
                    var e, r, i, s, n, a, o, h = 0;
                    if (C(t)) return this.each(function(e) { B(this).addClass(t.call(this, e, ge(this))) });
                    if ((e = ye(t)).length)
                        for (; r = this[h++];)
                            if (s = ge(r), i = 1 === r.nodeType && " " + pe(s) + " ") {
                                for (a = 0; n = e[a++];) i.indexOf(" " + n + " ") < 0 && (i += n + " ");
                                s !== (o = pe(i)) && r.setAttribute("class", o)
                            }
                    return this
                },
                removeClass: function(t) {
                    var e, r, i, s, n, a, o, h = 0;
                    if (C(t)) return this.each(function(e) { B(this).removeClass(t.call(this, e, ge(this))) });
                    if (!arguments.length) return this.attr("class", "");
                    if ((e = ye(t)).length)
                        for (; r = this[h++];)
                            if (s = ge(r), i = 1 === r.nodeType && " " + pe(s) + " ") {
                                for (a = 0; n = e[a++];)
                                    for (; i.indexOf(" " + n + " ") > -1;) i = i.replace(" " + n + " ", " ");
                                s !== (o = pe(i)) && r.setAttribute("class", o)
                            }
                    return this
                },
                toggleClass: function(t, e) {
                    var r = typeof t,
                        i = "string" === r || Array.isArray(t);
                    return "boolean" == typeof e && i ? e ? this.addClass(t) : this.removeClass(t) : C(t) ? this.each(function(r) { B(this).toggleClass(t.call(this, r, ge(this), e), e) }) : this.each(function() {
                        var e, s, n, a;
                        if (i)
                            for (s = 0, n = B(this), a = ye(t); e = a[s++];) n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                        else void 0 !== t && "boolean" !== r || ((e = ge(this)) && Q.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === t ? "" : Q.get(this, "__className__") || ""))
                    })
                },
                hasClass: function(t) {
                    var e, r, i = 0;
                    for (e = " " + t + " "; r = this[i++];)
                        if (1 === r.nodeType && (" " + pe(ge(r)) + " ").indexOf(e) > -1) return !0;
                    return !1
                }
            });
            var Ce = /\r/g;
            B.fn.extend({
                val: function(t) {
                    var e, r, i, s = this[0];
                    return arguments.length ? (i = C(t), this.each(function(r) {
                        var s;
                        1 === this.nodeType && (null == (s = i ? t.call(this, r, B(this).val()) : t) ? s = "" : "number" == typeof s ? s += "" : Array.isArray(s) && (s = B.map(s, function(t) { return null == t ? "" : t + "" })), (e = B.valHooks[this.type] || B.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, s, "value") || (this.value = s))
                    })) : s ? (e = B.valHooks[s.type] || B.valHooks[s.nodeName.toLowerCase()]) && "get" in e && void 0 !== (r = e.get(s, "value")) ? r : "string" == typeof(r = s.value) ? r.replace(Ce, "") : null == r ? "" : r : void 0
                }
            }), B.extend({
                valHooks: {
                    option: { get: function(t) { var e = B.find.attr(t, "value"); return null != e ? e : pe(B.text(t)) } },
                    select: {
                        get: function(t) {
                            var e, r, i, s = t.options,
                                n = t.selectedIndex,
                                a = "select-one" === t.type,
                                o = a ? null : [],
                                h = a ? n + 1 : s.length;
                            for (i = n < 0 ? h : a ? n : 0; i < h; i++)
                                if (((r = s[i]).selected || i === n) && !r.disabled && (!r.parentNode.disabled || !_(r.parentNode, "optgroup"))) {
                                    if (e = B(r).val(), a) return e;
                                    o.push(e)
                                }
                            return o
                        },
                        set: function(t, e) { for (var r, i, s = t.options, n = B.makeArray(e), a = s.length; a--;)((i = s[a]).selected = B.inArray(B.valHooks.option.get(i), n) > -1) && (r = !0); return r || (t.selectedIndex = -1), n }
                    }
                }
            }), B.each(["radio", "checkbox"], function() { B.valHooks[this] = { set: function(t, e) { if (Array.isArray(e)) return t.checked = B.inArray(B(t).val(), e) > -1 } }, y.checkOn || (B.valHooks[this].get = function(t) { return null === t.getAttribute("value") ? "on" : t.value }) }), y.focusin = "onfocusin" in r;
            var be = /^(?:focusinfocus|focusoutblur)$/,
                ve = function(t) { t.stopPropagation() };
            B.extend(B.event, {
                trigger: function(t, e, i, s) {
                    var n, o, h, u, l, c, f, d, p = [i || a],
                        g = m.call(t, "type") ? t.type : t,
                        y = m.call(t, "namespace") ? t.namespace.split(".") : [];
                    if (o = d = h = i = i || a, 3 !== i.nodeType && 8 !== i.nodeType && !be.test(g + B.event.triggered) && (g.indexOf(".") > -1 && (g = (y = g.split(".")).shift(), y.sort()), l = g.indexOf(":") < 0 && "on" + g, (t = t[B.expando] ? t : new B.Event(g, "object" == typeof t && t)).isTrigger = s ? 2 : 3, t.namespace = y.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), e = null == e ? [t] : B.makeArray(e, [t]), f = B.event.special[g] || {}, s || !f.trigger || !1 !== f.trigger.apply(i, e))) {
                        if (!s && !f.noBubble && !b(i)) {
                            for (u = f.delegateType || g, be.test(u + g) || (o = o.parentNode); o; o = o.parentNode) p.push(o), h = o;
                            h === (i.ownerDocument || a) && p.push(h.defaultView || h.parentWindow || r)
                        }
                        for (n = 0;
                            (o = p[n++]) && !t.isPropagationStopped();) d = o, t.type = n > 1 ? u : f.bindType || g, (c = (Q.get(o, "events") || {})[t.type] && Q.get(o, "handle")) && c.apply(o, e), (c = l && o[l]) && c.apply && X(o) && (t.result = c.apply(o, e), !1 === t.result && t.preventDefault());
                        return t.type = g, s || t.isDefaultPrevented() || f._default && !1 !== f._default.apply(p.pop(), e) || !X(i) || l && C(i[g]) && !b(i) && ((h = i[l]) && (i[l] = null), B.event.triggered = g, t.isPropagationStopped() && d.addEventListener(g, ve), i[g](), t.isPropagationStopped() && d.removeEventListener(g, ve), B.event.triggered = void 0, h && (i[l] = h)), t.result
                    }
                },
                simulate: function(t, e, r) {
                    var i = B.extend(new B.Event, r, { type: t, isSimulated: !0 });
                    B.event.trigger(i, null, e)
                }
            }), B.fn.extend({ trigger: function(t, e) { return this.each(function() { B.event.trigger(t, e, this) }) }, triggerHandler: function(t, e) { var r = this[0]; if (r) return B.event.trigger(t, e, r, !0) } }), y.focusin || B.each({ focus: "focusin", blur: "focusout" }, function(t, e) {
                var r = function(t) { B.event.simulate(e, t.target, B.event.fix(t)) };
                B.event.special[e] = {
                    setup: function() {
                        var i = this.ownerDocument || this,
                            s = Q.access(i, e);
                        s || i.addEventListener(t, r, !0), Q.access(i, e, (s || 0) + 1)
                    },
                    teardown: function() {
                        var i = this.ownerDocument || this,
                            s = Q.access(i, e) - 1;
                        s ? Q.access(i, e, s) : (i.removeEventListener(t, r, !0), Q.remove(i, e))
                    }
                }
            });
            var we = r.location,
                ke = Date.now(),
                Be = /\?/;
            B.parseXML = function(t) { var e; if (!t || "string" != typeof t) return null; try { e = (new r.DOMParser).parseFromString(t, "text/xml") } catch (t) { e = void 0 } return e && !e.getElementsByTagName("parsererror").length || B.error("Invalid XML: " + t), e };
            var Se = /\[\]$/,
                Re = /\r?\n/g,
                Te = /^(?:submit|button|image|reset|file)$/i,
                Ae = /^(?:input|select|textarea|keygen)/i;

            function Fe(t, e, r, i) {
                var s;
                if (Array.isArray(e)) B.each(e, function(e, s) { r || Se.test(t) ? i(t, s) : Fe(t + "[" + ("object" == typeof s && null != s ? e : "") + "]", s, r, i) });
                else if (r || "object" !== k(e)) i(t, e);
                else
                    for (s in e) Fe(t + "[" + s + "]", e[s], r, i)
            }
            B.param = function(t, e) {
                var r, i = [],
                    s = function(t, e) {
                        var r = C(e) ? e() : e;
                        i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == r ? "" : r)
                    };
                if (Array.isArray(t) || t.jquery && !B.isPlainObject(t)) B.each(t, function() { s(this.name, this.value) });
                else
                    for (r in t) Fe(r, t[r], e, s);
                return i.join("&")
            }, B.fn.extend({ serialize: function() { return B.param(this.serializeArray()) }, serializeArray: function() { return this.map(function() { var t = B.prop(this, "elements"); return t ? B.makeArray(t) : this }).filter(function() { var t = this.type; return this.name && !B(this).is(":disabled") && Ae.test(this.nodeName) && !Te.test(t) && (this.checked || !ft.test(t)) }).map(function(t, e) { var r = B(this).val(); return null == r ? null : Array.isArray(r) ? B.map(r, function(t) { return { name: e.name, value: t.replace(Re, "\r\n") } }) : { name: e.name, value: r.replace(Re, "\r\n") } }).get() } });
            var Le = /%20/g,
                _e = /#.*$/,
                xe = /([?&])_=[^&]*/,
                He = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                Ee = /^(?:GET|HEAD)$/,
                Me = /^\/\//,
                Pe = {},
                Oe = {},
                De = "*/".concat("*"),
                We = a.createElement("a");

            function Ie(t) {
                return function(e, r) {
                    "string" != typeof e && (r = e, e = "*");
                    var i, s = 0,
                        n = e.toLowerCase().match(W) || [];
                    if (C(r))
                        for (; i = n[s++];) "+" === i[0] ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(r)) : (t[i] = t[i] || []).push(r)
                }
            }

            function Ge(t, e, r, i) {
                var s = {},
                    n = t === Oe;

                function a(o) { var h; return s[o] = !0, B.each(t[o] || [], function(t, o) { var u = o(e, r, i); return "string" != typeof u || n || s[u] ? n ? !(h = u) : void 0 : (e.dataTypes.unshift(u), a(u), !1) }), h }
                return a(e.dataTypes[0]) || !s["*"] && a("*")
            }

            function Ne(t, e) { var r, i, s = B.ajaxSettings.flatOptions || {}; for (r in e) void 0 !== e[r] && ((s[r] ? t : i || (i = {}))[r] = e[r]); return i && B.extend(!0, t, i), t }
            We.href = we.href, B.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: { url: we.href, type: "GET", isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(we.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": De, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": B.parseXML }, flatOptions: { url: !0, context: !0 } },
                ajaxSetup: function(t, e) { return e ? Ne(Ne(t, B.ajaxSettings), e) : Ne(B.ajaxSettings, t) },
                ajaxPrefilter: Ie(Pe),
                ajaxTransport: Ie(Oe),
                ajax: function(t, e) {
                    "object" == typeof t && (e = t, t = void 0), e = e || {};
                    var i, s, n, o, h, u, l, c, f, d, m = B.ajaxSetup({}, e),
                        p = m.context || m,
                        g = m.context && (p.nodeType || p.jquery) ? B(p) : B.event,
                        y = B.Deferred(),
                        C = B.Callbacks("once memory"),
                        b = m.statusCode || {},
                        v = {},
                        w = {},
                        k = "canceled",
                        S = {
                            readyState: 0,
                            getResponseHeader: function(t) {
                                var e;
                                if (l) {
                                    if (!o)
                                        for (o = {}; e = He.exec(n);) o[e[1].toLowerCase()] = e[2];
                                    e = o[t.toLowerCase()]
                                }
                                return null == e ? null : e
                            },
                            getAllResponseHeaders: function() { return l ? n : null },
                            setRequestHeader: function(t, e) { return null == l && (t = w[t.toLowerCase()] = w[t.toLowerCase()] || t, v[t] = e), this },
                            overrideMimeType: function(t) { return null == l && (m.mimeType = t), this },
                            statusCode: function(t) {
                                var e;
                                if (t)
                                    if (l) S.always(t[S.status]);
                                    else
                                        for (e in t) b[e] = [b[e], t[e]];
                                return this
                            },
                            abort: function(t) { var e = t || k; return i && i.abort(e), R(0, e), this }
                        };
                    if (y.promise(S), m.url = ((t || m.url || we.href) + "").replace(Me, we.protocol + "//"), m.type = e.method || e.type || m.method || m.type, m.dataTypes = (m.dataType || "*").toLowerCase().match(W) || [""], null == m.crossDomain) { u = a.createElement("a"); try { u.href = m.url, u.href = u.href, m.crossDomain = We.protocol + "//" + We.host != u.protocol + "//" + u.host } catch (t) { m.crossDomain = !0 } }
                    if (m.data && m.processData && "string" != typeof m.data && (m.data = B.param(m.data, m.traditional)), Ge(Pe, m, e, S), l) return S;
                    for (f in (c = B.event && m.global) && 0 == B.active++ && B.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !Ee.test(m.type), s = m.url.replace(_e, ""), m.hasContent ? m.data && m.processData && 0 === (m.contentType || "").indexOf("application/x-www-form-urlencoded") && (m.data = m.data.replace(Le, "+")) : (d = m.url.slice(s.length), m.data && (m.processData || "string" == typeof m.data) && (s += (Be.test(s) ? "&" : "?") + m.data, delete m.data), !1 === m.cache && (s = s.replace(xe, "$1"), d = (Be.test(s) ? "&" : "?") + "_=" + ke++ + d), m.url = s + d), m.ifModified && (B.lastModified[s] && S.setRequestHeader("If-Modified-Since", B.lastModified[s]), B.etag[s] && S.setRequestHeader("If-None-Match", B.etag[s])), (m.data && m.hasContent && !1 !== m.contentType || e.contentType) && S.setRequestHeader("Content-Type", m.contentType), S.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + De + "; q=0.01" : "") : m.accepts["*"]), m.headers) S.setRequestHeader(f, m.headers[f]);
                    if (m.beforeSend && (!1 === m.beforeSend.call(p, S, m) || l)) return S.abort();
                    if (k = "abort", C.add(m.complete), S.done(m.success), S.fail(m.error), i = Ge(Oe, m, e, S)) {
                        if (S.readyState = 1, c && g.trigger("ajaxSend", [S, m]), l) return S;
                        m.async && m.timeout > 0 && (h = r.setTimeout(function() { S.abort("timeout") }, m.timeout));
                        try { l = !1, i.send(v, R) } catch (t) {
                            if (l) throw t;
                            R(-1, t)
                        }
                    } else R(-1, "No Transport");

                    function R(t, e, a, o) {
                        var u, f, d, v, w, k = e;
                        l || (l = !0, h && r.clearTimeout(h), i = void 0, n = o || "", S.readyState = t > 0 ? 4 : 0, u = t >= 200 && t < 300 || 304 === t, a && (v = function(t, e, r) {
                            for (var i, s, n, a, o = t.contents, h = t.dataTypes;
                                "*" === h[0];) h.shift(), void 0 === i && (i = t.mimeType || e.getResponseHeader("Content-Type"));
                            if (i)
                                for (s in o)
                                    if (o[s] && o[s].test(i)) { h.unshift(s); break }
                            if (h[0] in r) n = h[0];
                            else {
                                for (s in r) {
                                    if (!h[0] || t.converters[s + " " + h[0]]) { n = s; break }
                                    a || (a = s)
                                }
                                n = n || a
                            }
                            if (n) return n !== h[0] && h.unshift(n), r[n]
                        }(m, S, a)), v = function(t, e, r, i) {
                            var s, n, a, o, h, u = {},
                                l = t.dataTypes.slice();
                            if (l[1])
                                for (a in t.converters) u[a.toLowerCase()] = t.converters[a];
                            for (n = l.shift(); n;)
                                if (t.responseFields[n] && (r[t.responseFields[n]] = e), !h && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), h = n, n = l.shift())
                                    if ("*" === n) n = h;
                                    else if ("*" !== h && h !== n) {
                                if (!(a = u[h + " " + n] || u["* " + n]))
                                    for (s in u)
                                        if ((o = s.split(" "))[1] === n && (a = u[h + " " + o[0]] || u["* " + o[0]])) {!0 === a ? a = u[s] : !0 !== u[s] && (n = o[0], l.unshift(o[1])); break }
                                if (!0 !== a)
                                    if (a && t.throws) e = a(e);
                                    else try { e = a(e) } catch (t) { return { state: "parsererror", error: a ? t : "No conversion from " + h + " to " + n } }
                            }
                            return { state: "success", data: e }
                        }(m, v, S, u), u ? (m.ifModified && ((w = S.getResponseHeader("Last-Modified")) && (B.lastModified[s] = w), (w = S.getResponseHeader("etag")) && (B.etag[s] = w)), 204 === t || "HEAD" === m.type ? k = "nocontent" : 304 === t ? k = "notmodified" : (k = v.state, f = v.data, u = !(d = v.error))) : (d = k, !t && k || (k = "error", t < 0 && (t = 0))), S.status = t, S.statusText = (e || k) + "", u ? y.resolveWith(p, [f, k, S]) : y.rejectWith(p, [S, k, d]), S.statusCode(b), b = void 0, c && g.trigger(u ? "ajaxSuccess" : "ajaxError", [S, m, u ? f : d]), C.fireWith(p, [S, k]), c && (g.trigger("ajaxComplete", [S, m]), --B.active || B.event.trigger("ajaxStop")))
                    }
                    return S
                },
                getJSON: function(t, e, r) { return B.get(t, e, r, "json") },
                getScript: function(t, e) { return B.get(t, void 0, e, "script") }
            }), B.each(["get", "post"], function(t, e) { B[e] = function(t, r, i, s) { return C(r) && (s = s || i, i = r, r = void 0), B.ajax(B.extend({ url: t, type: e, dataType: s, data: r, success: i }, B.isPlainObject(t) && t)) } }), B._evalUrl = function(t) { return B.ajax({ url: t, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, throws: !0 }) }, B.fn.extend({
                wrapAll: function(t) { var e; return this[0] && (C(t) && (t = t.call(this[0])), e = B(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() { for (var t = this; t.firstElementChild;) t = t.firstElementChild; return t }).append(this)), this },
                wrapInner: function(t) {
                    return C(t) ? this.each(function(e) { B(this).wrapInner(t.call(this, e)) }) : this.each(function() {
                        var e = B(this),
                            r = e.contents();
                        r.length ? r.wrapAll(t) : e.append(t)
                    })
                },
                wrap: function(t) { var e = C(t); return this.each(function(r) { B(this).wrapAll(e ? t.call(this, r) : t) }) },
                unwrap: function(t) { return this.parent(t).not("body").each(function() { B(this).replaceWith(this.childNodes) }), this }
            }), B.expr.pseudos.hidden = function(t) { return !B.expr.pseudos.visible(t) }, B.expr.pseudos.visible = function(t) { return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length) }, B.ajaxSettings.xhr = function() { try { return new r.XMLHttpRequest } catch (t) {} };
            var ze = { 0: 200, 1223: 204 },
                je = B.ajaxSettings.xhr();
            y.cors = !!je && "withCredentials" in je, y.ajax = je = !!je, B.ajaxTransport(function(t) {
                var e, i;
                if (y.cors || je && !t.crossDomain) return {
                    send: function(s, n) {
                        var a, o = t.xhr();
                        if (o.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                            for (a in t.xhrFields) o[a] = t.xhrFields[a];
                        for (a in t.mimeType && o.overrideMimeType && o.overrideMimeType(t.mimeType), t.crossDomain || s["X-Requested-With"] || (s["X-Requested-With"] = "XMLHttpRequest"), s) o.setRequestHeader(a, s[a]);
                        e = function(t) { return function() { e && (e = i = o.onload = o.onerror = o.onabort = o.ontimeout = o.onreadystatechange = null, "abort" === t ? o.abort() : "error" === t ? "number" != typeof o.status ? n(0, "error") : n(o.status, o.statusText) : n(ze[o.status] || o.status, o.statusText, "text" !== (o.responseType || "text") || "string" != typeof o.responseText ? { binary: o.response } : { text: o.responseText }, o.getAllResponseHeaders())) } }, o.onload = e(), i = o.onerror = o.ontimeout = e("error"), void 0 !== o.onabort ? o.onabort = i : o.onreadystatechange = function() { 4 === o.readyState && r.setTimeout(function() { e && i() }) }, e = e("abort");
                        try { o.send(t.hasContent && t.data || null) } catch (t) { if (e) throw t }
                    },
                    abort: function() { e && e() }
                }
            }), B.ajaxPrefilter(function(t) { t.crossDomain && (t.contents.script = !1) }), B.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function(t) { return B.globalEval(t), t } } }), B.ajaxPrefilter("script", function(t) { void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET") }), B.ajaxTransport("script", function(t) { var e, r; if (t.crossDomain) return { send: function(i, s) { e = B("<script>").prop({ charset: t.scriptCharset, src: t.url }).on("load error", r = function(t) { e.remove(), r = null, t && s("error" === t.type ? 404 : 200, t.type) }), a.head.appendChild(e[0]) }, abort: function() { r && r() } } });
            var Ue, qe = [],
                Ze = /(=)\?(?=&|$)|\?\?/;
            B.ajaxSetup({ jsonp: "callback", jsonpCallback: function() { var t = qe.pop() || B.expando + "_" + ke++; return this[t] = !0, t } }), B.ajaxPrefilter("json jsonp", function(t, e, i) { var s, n, a, o = !1 !== t.jsonp && (Ze.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Ze.test(t.data) && "data"); if (o || "jsonp" === t.dataTypes[0]) return s = t.jsonpCallback = C(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, o ? t[o] = t[o].replace(Ze, "$1" + s) : !1 !== t.jsonp && (t.url += (Be.test(t.url) ? "&" : "?") + t.jsonp + "=" + s), t.converters["script json"] = function() { return a || B.error(s + " was not called"), a[0] }, t.dataTypes[0] = "json", n = r[s], r[s] = function() { a = arguments }, i.always(function() { void 0 === n ? B(r).removeProp(s) : r[s] = n, t[s] && (t.jsonpCallback = e.jsonpCallback, qe.push(s)), a && C(n) && n(a[0]), a = n = void 0 }), "script" }), y.createHTMLDocument = ((Ue = a.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Ue.childNodes.length), B.parseHTML = function(t, e, r) { return "string" != typeof t ? [] : ("boolean" == typeof e && (r = e, e = !1), e || (y.createHTMLDocument ? ((i = (e = a.implementation.createHTMLDocument("")).createElement("base")).href = a.location.href, e.head.appendChild(i)) : e = a), s = x.exec(t), n = !r && [], s ? [e.createElement(s[1])] : (s = wt([t], e, n), n && n.length && B(n).remove(), B.merge([], s.childNodes))); var i, s, n }, B.fn.load = function(t, e, r) {
                var i, s, n, a = this,
                    o = t.indexOf(" ");
                return o > -1 && (i = pe(t.slice(o)), t = t.slice(0, o)), C(e) ? (r = e, e = void 0) : e && "object" == typeof e && (s = "POST"), a.length > 0 && B.ajax({ url: t, type: s || "GET", dataType: "html", data: e }).done(function(t) { n = arguments, a.html(i ? B("<div>").append(B.parseHTML(t)).find(i) : t) }).always(r && function(t, e) { a.each(function() { r.apply(this, n || [t.responseText, e, t]) }) }), this
            }, B.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) { B.fn[e] = function(t) { return this.on(e, t) } }), B.expr.pseudos.animated = function(t) { return B.grep(B.timers, function(e) { return t === e.elem }).length }, B.offset = {
                setOffset: function(t, e, r) {
                    var i, s, n, a, o, h, u = B.css(t, "position"),
                        l = B(t),
                        c = {};
                    "static" === u && (t.style.position = "relative"), o = l.offset(), n = B.css(t, "top"), h = B.css(t, "left"), ("absolute" === u || "fixed" === u) && (n + h).indexOf("auto") > -1 ? (a = (i = l.position()).top, s = i.left) : (a = parseFloat(n) || 0, s = parseFloat(h) || 0), C(e) && (e = e.call(t, r, B.extend({}, o))), null != e.top && (c.top = e.top - o.top + a), null != e.left && (c.left = e.left - o.left + s), "using" in e ? e.using.call(t, c) : l.css(c)
                }
            }, B.fn.extend({
                offset: function(t) { if (arguments.length) return void 0 === t ? this : this.each(function(e) { B.offset.setOffset(this, t, e) }); var e, r, i = this[0]; return i ? i.getClientRects().length ? (e = i.getBoundingClientRect(), r = i.ownerDocument.defaultView, { top: e.top + r.pageYOffset, left: e.left + r.pageXOffset }) : { top: 0, left: 0 } : void 0 },
                position: function() {
                    if (this[0]) {
                        var t, e, r, i = this[0],
                            s = { top: 0, left: 0 };
                        if ("fixed" === B.css(i, "position")) e = i.getBoundingClientRect();
                        else {
                            for (e = this.offset(), r = i.ownerDocument, t = i.offsetParent || r.documentElement; t && (t === r.body || t === r.documentElement) && "static" === B.css(t, "position");) t = t.parentNode;
                            t && t !== i && 1 === t.nodeType && ((s = B(t).offset()).top += B.css(t, "borderTopWidth", !0), s.left += B.css(t, "borderLeftWidth", !0))
                        }
                        return { top: e.top - s.top - B.css(i, "marginTop", !0), left: e.left - s.left - B.css(i, "marginLeft", !0) }
                    }
                },
                offsetParent: function() { return this.map(function() { for (var t = this.offsetParent; t && "static" === B.css(t, "position");) t = t.offsetParent; return t || kt }) }
            }), B.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(t, e) {
                var r = "pageYOffset" === e;
                B.fn[t] = function(i) {
                    return q(this, function(t, i, s) {
                        var n;
                        if (b(t) ? n = t : 9 === t.nodeType && (n = t.defaultView), void 0 === s) return n ? n[e] : t[i];
                        n ? n.scrollTo(r ? n.pageXOffset : s, r ? s : n.pageYOffset) : t[i] = s
                    }, t, i, arguments.length)
                }
            }), B.each(["top", "left"], function(t, e) { B.cssHooks[e] = Ut(y.pixelPosition, function(t, r) { if (r) return r = jt(t, e), Gt.test(r) ? B(t).position()[e] + "px" : r }) }), B.each({ Height: "height", Width: "width" }, function(t, e) {
                B.each({ padding: "inner" + t, content: e, "": "outer" + t }, function(r, i) {
                    B.fn[i] = function(s, n) {
                        var a = arguments.length && (r || "boolean" != typeof s),
                            o = r || (!0 === s || !0 === n ? "margin" : "border");
                        return q(this, function(e, r, s) { var n; return b(e) ? 0 === i.indexOf("outer") ? e["inner" + t] : e.document.documentElement["client" + t] : 9 === e.nodeType ? (n = e.documentElement, Math.max(e.body["scroll" + t], n["scroll" + t], e.body["offset" + t], n["offset" + t], n["client" + t])) : void 0 === s ? B.css(e, r, o) : B.style(e, r, s, o) }, e, a ? s : void 0, a)
                    }
                })
            }), B.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(t, e) { B.fn[e] = function(t, r) { return arguments.length > 0 ? this.on(e, null, t, r) : this.trigger(e) } }), B.fn.extend({ hover: function(t, e) { return this.mouseenter(t).mouseleave(e || t) } }), B.fn.extend({ bind: function(t, e, r) { return this.on(t, null, e, r) }, unbind: function(t, e) { return this.off(t, null, e) }, delegate: function(t, e, r, i) { return this.on(e, t, r, i) }, undelegate: function(t, e, r) { return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", r) } }), B.proxy = function(t, e) { var r, i, s; if ("string" == typeof e && (r = t[e], e = t, t = r), C(t)) return i = h.call(arguments, 2), (s = function() { return t.apply(e || this, i.concat(h.call(arguments))) }).guid = t.guid = t.guid || B.guid++, s }, B.holdReady = function(t) { t ? B.readyWait++ : B.ready(!0) }, B.isArray = Array.isArray, B.parseJSON = JSON.parse, B.nodeName = _, B.isFunction = C, B.isWindow = b, B.camelCase = Y, B.type = k, B.now = Date.now, B.isNumeric = function(t) { var e = B.type(t); return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t)) }, void 0 === (i = function() { return B }.apply(e, [])) || (t.exports = i);
            var Ve = r.jQuery,
                Je = r.$;
            return B.noConflict = function(t) { return r.$ === B && (r.$ = Je), t && r.jQuery === B && (r.jQuery = Ve), B }, s || (r.jQuery = r.$ = B), B
        })
    }, function(t, e, r) {
        "use strict";
        var i = r(19),
            s = Object.keys || function(t) { var e = []; for (var r in t) e.push(r); return e };
        t.exports = c;
        var n = r(12);
        n.inherits = r(8);
        var a = r(55),
            o = r(26);
        n.inherits(c, a);
        for (var h = s(o.prototype), u = 0; u < h.length; u++) {
            var l = h[u];
            c.prototype[l] || (c.prototype[l] = o.prototype[l])
        }

        function c(t) {
            if (!(this instanceof c)) return new c(t);
            a.call(this, t), o.call(this, t), t && !1 === t.readable && (this.readable = !1), t && !1 === t.writable && (this.writable = !1), this.allowHalfOpen = !0, t && !1 === t.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", f)
        }

        function f() { this.allowHalfOpen || this._writableState.ended || i.nextTick(d, this) }

        function d(t) { t.end() }
        Object.defineProperty(c.prototype, "writableHighWaterMark", { enumerable: !1, get: function() { return this._writableState.highWaterMark } }), Object.defineProperty(c.prototype, "destroyed", { get: function() { return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed) }, set: function(t) { void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = t, this._writableState.destroyed = t) } }), c.prototype._destroy = function(t, e) { this.push(null), this.end(), i.nextTick(e, t) }
    }, function(t, e) {
        var r, i, s = t.exports = {};

        function n() { throw new Error("setTimeout has not been defined") }

        function a() { throw new Error("clearTimeout has not been defined") }

        function o(t) { if (r === setTimeout) return setTimeout(t, 0); if ((r === n || !r) && setTimeout) return r = setTimeout, setTimeout(t, 0); try { return r(t, 0) } catch (e) { try { return r.call(null, t, 0) } catch (e) { return r.call(this, t, 0) } } }! function() { try { r = "function" == typeof setTimeout ? setTimeout : n } catch (t) { r = n } try { i = "function" == typeof clearTimeout ? clearTimeout : a } catch (t) { i = a } }();
        var h, u = [],
            l = !1,
            c = -1;

        function f() { l && h && (l = !1, h.length ? u = h.concat(u) : c = -1, u.length && d()) }

        function d() {
            if (!l) {
                var t = o(f);
                l = !0;
                for (var e = u.length; e;) {
                    for (h = u, u = []; ++c < e;) h && h[c].run();
                    c = -1, e = u.length
                }
                h = null, l = !1,
                    function(t) { if (i === clearTimeout) return clearTimeout(t); if ((i === a || !i) && clearTimeout) return i = clearTimeout, clearTimeout(t); try { i(t) } catch (e) { try { return i.call(null, t) } catch (e) { return i.call(this, t) } } }(t)
            }
        }

        function m(t, e) { this.fun = t, this.array = e }

        function p() {}
        s.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
            u.push(new m(t, e)), 1 !== u.length || l || o(d)
        }, m.prototype.run = function() { this.fun.apply(null, this.array) }, s.title = "browser", s.browser = !0, s.env = {}, s.argv = [], s.version = "", s.versions = {}, s.on = p, s.addListener = p, s.once = p, s.off = p, s.removeListener = p, s.removeAllListeners = p, s.emit = p, s.prependListener = p, s.prependOnceListener = p, s.listeners = function(t) { return [] }, s.binding = function(t) { throw new Error("process.binding is not supported") }, s.cwd = function() { return "/" }, s.chdir = function(t) { throw new Error("process.chdir is not supported") }, s.umask = function() { return 0 }
    }, function(t, e) {
        "function" == typeof Object.create ? t.exports = function(t, e) { t.super_ = e, t.prototype = Object.create(e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }) } : t.exports = function(t, e) {
            t.super_ = e;
            var r = function() {};
            r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
        }
    }, function(t, e, r) {
        "use strict";
        for (var i = r(0), s = r(4), n = r(17), a = r(1), o = new Array(256), h = 0; h < 256; h++) o[h] = h >= 252 ? 6 : h >= 248 ? 5 : h >= 240 ? 4 : h >= 224 ? 3 : h >= 192 ? 2 : 1;
        o[254] = o[254] = 1;

        function u() { a.call(this, "utf-8 decode"), this.leftOver = null }

        function l() { a.call(this, "utf-8 encode") }
        e.utf8encode = function(t) {
            return s.nodebuffer ? n.newBufferFrom(t, "utf-8") : function(t) {
                var e, r, i, n, a, o = t.length,
                    h = 0;
                for (n = 0; n < o; n++) 55296 == (64512 & (r = t.charCodeAt(n))) && n + 1 < o && 56320 == (64512 & (i = t.charCodeAt(n + 1))) && (r = 65536 + (r - 55296 << 10) + (i - 56320), n++), h += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
                for (e = s.uint8array ? new Uint8Array(h) : new Array(h), a = 0, n = 0; a < h; n++) 55296 == (64512 & (r = t.charCodeAt(n))) && n + 1 < o && 56320 == (64512 & (i = t.charCodeAt(n + 1))) && (r = 65536 + (r - 55296 << 10) + (i - 56320), n++), r < 128 ? e[a++] = r : r < 2048 ? (e[a++] = 192 | r >>> 6, e[a++] = 128 | 63 & r) : r < 65536 ? (e[a++] = 224 | r >>> 12, e[a++] = 128 | r >>> 6 & 63, e[a++] = 128 | 63 & r) : (e[a++] = 240 | r >>> 18, e[a++] = 128 | r >>> 12 & 63, e[a++] = 128 | r >>> 6 & 63, e[a++] = 128 | 63 & r);
                return e
            }(t)
        }, e.utf8decode = function(t) {
            return s.nodebuffer ? i.transformTo("nodebuffer", t).toString("utf-8") : function(t) {
                var e, r, s, n, a = t.length,
                    h = new Array(2 * a);
                for (r = 0, e = 0; e < a;)
                    if ((s = t[e++]) < 128) h[r++] = s;
                    else if ((n = o[s]) > 4) h[r++] = 65533, e += n - 1;
                else {
                    for (s &= 2 === n ? 31 : 3 === n ? 15 : 7; n > 1 && e < a;) s = s << 6 | 63 & t[e++], n--;
                    n > 1 ? h[r++] = 65533 : s < 65536 ? h[r++] = s : (s -= 65536, h[r++] = 55296 | s >> 10 & 1023, h[r++] = 56320 | 1023 & s)
                }
                return h.length !== r && (h.subarray ? h = h.subarray(0, r) : h.length = r), i.applyFromCharCode(h)
            }(t = i.transformTo(s.uint8array ? "uint8array" : "array", t))
        }, i.inherits(u, a), u.prototype.processChunk = function(t) {
            var r = i.transformTo(s.uint8array ? "uint8array" : "array", t.data);
            if (this.leftOver && this.leftOver.length) {
                if (s.uint8array) {
                    var n = r;
                    (r = new Uint8Array(n.length + this.leftOver.length)).set(this.leftOver, 0), r.set(n, this.leftOver.length)
                } else r = this.leftOver.concat(r);
                this.leftOver = null
            }
            var a = function(t, e) { var r; for ((e = e || t.length) > t.length && (e = t.length), r = e - 1; r >= 0 && 128 == (192 & t[r]);) r--; return r < 0 ? e : 0 === r ? e : r + o[t[r]] > e ? r : e }(r),
                h = r;
            a !== r.length && (s.uint8array ? (h = r.subarray(0, a), this.leftOver = r.subarray(a, r.length)) : (h = r.slice(0, a), this.leftOver = r.slice(a, r.length))), this.push({ data: e.utf8decode(h), meta: t.meta })
        }, u.prototype.flush = function() { this.leftOver && this.leftOver.length && (this.push({ data: e.utf8decode(this.leftOver), meta: {} }), this.leftOver = null) }, e.Utf8DecodeWorker = u, i.inherits(l, a), l.prototype.processChunk = function(t) { this.push({ data: e.utf8encode(t.data), meta: t.meta }) }, e.Utf8EncodeWorker = l
    }, function(t, e, r) {
        "undefined" != typeof self && self, t.exports = function(t) {
            var e = {};

            function r(i) { if (e[i]) return e[i].exports; var s = e[i] = { i: i, l: !1, exports: {} }; return t[i].call(s.exports, s, s.exports, r), s.l = !0, s.exports }
            return r.m = t, r.c = e, r.d = function(t, e, i) { r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i }) }, r.r = function(t) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 }) }, r.t = function(t, e) {
                if (1 & e && (t = r(t)), 8 & e) return t;
                if (4 & e && "object" == typeof t && t && t.__esModule) return t;
                var i = Object.create(null);
                if (r.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t)
                    for (var s in t) r.d(i, s, function(e) { return t[e] }.bind(null, s));
                return i
            }, r.n = function(t) { var e = t && t.__esModule ? function() { return t.default } : function() { return t }; return r.d(e, "a", e), e }, r.o = function(t, e) { return Object.prototype.hasOwnProperty.call(t, e) }, r.p = "", r(r.s = 3)
        }([function(t, e) { t.exports = r(14) }, function(t, e) { t.exports = r(116) }, function(t, e) { t.exports = r(113) }, function(t, e, r) {
            "use strict";
            r.r(e);
            var i = {};
            r.r(i), r.d(i, "toTypedArray", function() { return u }), r.d(i, "fromTypedArray", function() { return l }), r.d(i, "getTypedArray", function() { return c }), r.d(i, "stringToArrayBuffer", function() { return f }), r.d(i, "fetchFileAsArrayBuffer", function() { return d }), r.d(i, "concatArrayBuffers", function() { return m }), r.d(i, "saveAs", function() { return p }), r.d(i, "readBlob", function() { return g }), r.d(i, "readCartridgeROM", function() { return y }), r.d(i, "hasExtension", function() { return C }), r.d(i, "debounce", function() { return b });
            var s = { soundOn: !0, bootBootRomFirst: !0, gbHasPriority: !1, soundVolume: .7, colorizeGBMode: !0, runInterval: 8, minAudioBufferSpanAmountOverXInterpreterIterations: 10, maxAudioBufferSpanAmountOverXInterpreterIterations: 20, alwaysAllowRWtoBanks: !1, forceGBBootRom: !1, enabledChannels: [!0, !0, !0, !0] },
                n = r(2),
                a = r.n(n),
                o = r(1),
                h = function(t, e, r, i) {
                    return new(r || (r = Promise))(function(s, n) {
                        function a(t) { try { h(i.next(t)) } catch (t) { n(t) } }

                        function o(t) { try { h(i.throw(t)) } catch (t) { n(t) } }

                        function h(t) { t.done ? s(t.value) : new r(function(e) { e(t.value) }).then(a, o) }
                        h((i = i.apply(t, e || [])).next())
                    })
                };

            function u(t, e) {
                try {
                    if (!(t && t.length < 1)) return [];
                    var r = t.length;
                    let s;
                    switch (e) {
                        case "uint8":
                            s = new Uint8Array(r);
                            break;
                        case "int8":
                            s = new Int8Array(r);
                            break;
                        case "int32":
                            s = new Int32Array(r);
                            break;
                        case "float32":
                            s = new Float32Array(r)
                    }
                    for (var i = 0; i < r; i++) s[i] = t[i];
                    return s
                } catch (e) { return console.log("Could not convert an array to a typed array: " + e.message, 1), t }
            }

            function l(t) { try { if (!t || !t.length) return []; for (var e = [], r = 0; r < t.length; ++r) e[r] = t[r]; return e } catch (e) { return console.log("Conversion from a typed array failed: " + e.message, 1), t } }

            function c(t, e, r) {
                let i;
                switch (r) {
                    case "int8":
                        i = new Int8Array(t);
                        break;
                    case "uint8":
                        i = new Uint8Array(t);
                        break;
                    case "int32":
                        i = new Int32Array(t);
                        break;
                    case "float32":
                        i = new Float32Array(t)
                }
                if (0 !== e) { let r = 0; for (; r < t;) i[r++] = e }
                return i
            }

            function f(t) { const e = new Uint8Array(t.length); for (let r = 0, i = t.length; r < i; r++) e[r] = t.charCodeAt(r); return e }

            function d(t) { return h(this, void 0, void 0, function*() { return yield(yield fetch(t)).arrayBuffer() }) }

            function m(...t) {
                let e = 0;
                for (let r = 0; r < t.length; r++) e += t[r].byteLength;
                const r = new Uint8Array(e);
                for (let e = 0; e < t.length; e++) {
                    const i = new Uint8Array(t[e]);
                    0 === e ? r.set(i) : r.set(i, t[e - 1].byteLength)
                }
                return r.buffer
            }

            function p(t, e) { t instanceof ArrayBuffer && (t = new Uint8Array(t)), t instanceof Uint8Array && (t = new Blob([t], { type: "application/octet-binary" })), o.saveAs(t, e) }

            function g(t) {
                return h(this, void 0, void 0, function*() {
                    return new Promise((e, r) => {
                        if (t) {
                            const r = new FileReader;
                            r.addEventListener("load", function() { 2 === this.readyState && e(this.result) }), r.readAsArrayBuffer(t)
                        } else r()
                    })
                })
            }

            function y(t, e = "") {
                return h(this, void 0, void 0, function*() {
                    let r = yield g(t);
                    if (C(e, "zip")) {
                        const t = yield a.a.loadAsync(r),
                            e = Object.keys(t.files).filter(t => C(t, "gbc") || C(t, "gb"));
                        r = e.length > 0 ? yield t.file(e[0]).async("arraybuffer") : null
                    }
                    return r
                })
            }

            function C(t, e) { return t = t.toLowerCase(), e = "." + e.toLowerCase(), t.lastIndexOf(e) === t.length - e.length }

            function b(t, e, r) {
                var i, s, n, a, o;

                function h() {
                    var u = Date.now() - a;
                    u < e && u >= 0 ? i = setTimeout(h, e - u) : (i = null, r || (o = t.apply(n, s), n = s = null))
                }
                null == e && (e = 100);
                var u = function() { n = this, s = arguments, a = Date.now(); var u = r && !i; return i || (i = setTimeout(h, e)), u && (o = t.apply(n, s), n = s = null), o };
                return u.clear = function() { i && (clearTimeout(i), i = null) }, u.flush = function() { i && (o = t.apply(n, s), n = s = null, clearTimeout(i), i = null) }, u
            }
            var v = function(t, e, r, i) {
                return new(r || (r = Promise))(function(s, n) {
                    function a(t) { try { h(i.next(t)) } catch (t) { n(t) } }

                    function o(t) { try { h(i.throw(t)) } catch (t) { n(t) } }

                    function h(t) { t.done ? s(t.value) : new r(function(e) { e(t.value) }).then(a, o) }
                    h((i = i.apply(t, e || [])).next())
                })
            };
            class w {
                findState(t) { return this.find("state-" + t) }
                findSRAM(t) { return this.find("sram-" + t) }
                findRTC(t) { return this.find("rtc-" + t) }
                setState(t, e) { return v(this, void 0, void 0, function*() { return yield this.set("state-" + t, e) }) }
                setSRAM(t, e) { return v(this, void 0, void 0, function*() { return yield this.set("sram-" + t, e) }) }
                setRTC(t, e) { return v(this, void 0, void 0, function*() { return yield this.set("rtc-" + t, e) }) }
                find(t) {
                    return function(t) {
                        if (!t || t.length <= 0) return null;
                        t = atob(t);
                        const e = new Uint8Array(t.length);
                        for (let r = 0; r < t.length; r++) e[r] = t.charCodeAt(r);
                        return e.buffer
                    }(window.localStorage.getItem(t))
                }
                set(t, e) {
                    const r = function(t) {
                        if (!t || t.length <= 0) return null;
                        t = new Uint8Array(t);
                        let e = "";
                        for (let r = 0; r < t.byteLength; r++) e += String.fromCharCode(t[r]);
                        return btoa(e)
                    }(e);
                    window.localStorage.setItem(t, r)
                }
            }
            class k {
                constructor(t) { t instanceof Uint8Array ? this.data = t : this.data = new Uint8Array(t) }
                getByte(t) { return this.data[t] }
                getChar(t) { return String.fromCharCode(this.getByte(t)) }
                getString(t, e) { let r = ""; for (let i = t; i <= e; i++) r += this.getChar(i); return r }
                get length() { return this.data.byteLength }
            }
            var B = r(0);
            class S extends B.EventEmitter {
                constructor(t) { super(), this.romSizes = [32768, 65536, 131072, 262144, 524288, 1048576, 2097152, 4194304, 8388608], this.ramSizes = [0, 8192, 8192, 32768, 131072, 65536], this.cartridge = t, this.MBCRAMBanksEnabled = !1, this.currentRAMBankPosition = -40960, this.currentMBCRAMBank = 0, this.ROMBankEdge = Math.floor(t.rom.length / 16384) }
                setupROM() { this.romSize = this.romSizes[this.cartridge.romSizeType], console.log("ROM size 0x" + this.romSize.toString(16)) }
                setupRAM() { this.ramSize = this.ramSizes[this.cartridge.ramSizeType], console.log("RAM size 0x" + this.ramSize.toString(16)), this.RAM = c(this.ramSize, 0, "uint8") }
                loadSRAM(t) { t.byteLength === this.ramSize && (this.RAM = t.slice(0)) }
                getSRAM() { return new Uint8Array(this.RAM.buffer.slice(0, this.ramSize)) }
                cutSRAMFromBatteryFileArray(t) { return new Uint8Array(t.slice(0, this.ramSize)) }
                saveState() { if (this.cartridge.hasBattery && 0 !== this.RAM.length) return l(this.RAM) }
                readRAM(t) { return this.MBCRAMBanksEnabled || s.alwaysAllowRWtoBanks ? this.RAM[t + this.currentRAMBankPosition] : 255 }
                writeRAM(t, e) {
                    (this.MBCRAMBanksEnabled || s.alwaysAllowRWtoBanks) && (this.emit("ramWrite"), this.RAM[t + this.currentRAMBankPosition] = e)
                }
                setCurrentROMBank() { this.currentROMBank = Math.max(this.ROMBank1Offset % this.ROMBankEdge - 1, 0) << 14 }
                writeEnable(t, e) { this.MBCRAMBanksEnabled = 10 == (15 & e) }
            }
            class R extends S {
                constructor() { super(...arguments), this.MBC1Mode = !1 }
                writeType(t, e) { this.MBC1Mode = 1 == (1 & e), this.MBC1Mode ? (this.ROMBank1Offset &= 31, this.setCurrentROMBank()) : (this.currentMBCRAMBank = 0, this.currentRAMBankPosition = -40960) }
                writeROMBank(t, e) { this.ROMBank1Offset = 96 & this.ROMBank1Offset | 31 & e, this.setCurrentROMBank() }
                writeRAMBank(t, e) { this.MBC1Mode ? (this.currentMBCRAMBank = 3 & e, this.currentRAMBankPosition = (this.currentMBCRAMBank << 13) - 40960) : (this.ROMBank1Offset = (3 & e) << 5 | 31 & this.ROMBank1Offset, this.setCurrentROMBank()) }
                setCurrentROMBank() {
                    switch (this.ROMBank1Offset) {
                        case 0:
                        case 32:
                        case 64:
                        case 96:
                            this.currentROMBank = this.ROMBank1Offset % this.ROMBankEdge << 14;
                            break;
                        default:
                            this.currentROMBank = this.ROMBank1Offset % this.ROMBankEdge - 1 << 14
                    }
                }
            }
            class T extends S { writeROMBank(t, e) { this.ROMBank1Offset = 15 & e, this.setCurrentROMBank() } }
            class A {
                constructor(t) { this.mbc = t }
                writeSeconds(t) { t < 60 ? this.RTCSeconds = t : console.log("(Bank #" + this.mbc.currentMBCRAMBank + ") RTC write out of range: " + t) }
                writeMinutes(t) { t < 60 ? this.RTCMinutes = t : console.log("(Bank #" + this.mbc.currentMBCRAMBank + ") RTC write out of range: " + t) }
                writeDaysLow(t) { this.RTCDays = 255 & t | 256 & this.RTCDays }
                writeDaysHigh(t) { this.RTCDayOverFlow = t > 127, this.RTCHalt = 64 == (64 & t), this.RTCDays = (1 & t) << 8 | 255 & this.RTCDays }
                writeHours(t) { t < 24 ? this.RTCHours = t : console.log("(Bank #" + this.mbc.currentMBCRAMBank + ") RTC write out of range: " + t) }
                readSeconds() { return this.latchedSeconds }
                readMinutes() { return this.latchedMinutes }
                readHours() { return this.latchedHours }
                readDaysLow() { return this.latchedLDays }
                readDaysHigh() { return (this.RTCDayOverFlow ? 128 : 0) + (this.RTCHalt ? 64 : 0) + this.latchedHDays }
                writeLatch(t, e) { 0 === e ? this.RTCisLatched = !1 : this.RTCisLatched || (this.RTCisLatched = !0, this.latchedSeconds = 0 | this.RTCSeconds, this.latchedMinutes = this.RTCMinutes, this.latchedHours = this.RTCHours, this.latchedLDays = 255 & this.RTCDays, this.latchedHDays = this.RTCDays >> 8) }
                get() {
                    const t = Math.round(this.lastTime / 1e3),
                        e = t >> 0 & 65535,
                        r = t >> 16 & 65535;
                    return new Uint32Array([this.RTCSeconds, this.RTCMinutes, this.RTCHours, this.RTCDays, this.RTCDayOverFlow, this.latchedSeconds, this.latchedMinutes, this.latchedHours, this.latchedLDays, this.latchedHDays, e, r])
                }
                load(t) {
                    const e = this.extract(t);
                    this.RTCSeconds = e.seconds, this.RTCMinutes = e.minutes, this.RTCHours = e.hours, this.RTCDays = e.daysLow, this.RTCDayOverFlow = e.daysHigh, this.latchedSeconds = e.latchedSeconds, this.latchedMinutes = e.latchedMinutes, this.latchedHours = e.latchedHours, this.latchedLDays = e.latchedDaysLow, this.latchedHDays = e.latchedDaysHigh, this.lastTime = e.lastTime
                }
                cutBatteryFileArray(t) { return new Uint32Array(t.slice(this.mbc.ramSize, this.mbc.ramSize + 48)) }
                extract(t) {
                    const e = t[0],
                        r = t[1],
                        i = t[2],
                        s = t[3],
                        n = t[4],
                        a = t[5],
                        o = t[6],
                        h = t[7],
                        u = t[8],
                        l = t[9],
                        c = t[10],
                        f = t[11];
                    let d = c;
                    return c && f && (d = f << 16 | c), { seconds: e, minutes: r, hours: i, daysLow: s, daysHigh: n, latchedSeconds: a, latchedMinutes: o, latchedHours: h, latchedDaysLow: u, latchedDaysHigh: l, lastTime: 1e3 * d }
                }
                saveState() { return [this.lastTime, this.RTCisLatched, this.latchedSeconds, this.latchedMinutes, this.latchedHours, this.latchedLDays, this.latchedHDays, this.RTCSeconds, this.RTCMinutes, this.RTCHours, this.RTCDays, this.RTCDayOverFlow, this.RTCHalt] }
                loadState(t) {
                    let e = 0;
                    this.lastTime = t[e++], this.RTCisLatched = t[e++], this.latchedSeconds = t[e++], this.latchedMinutes = t[e++], this.latchedHours = t[e++], this.latchedLDays = t[e++], this.latchedHDays = t[e++], this.RTCSeconds = t[e++], this.RTCMinutes = t[e++], this.RTCHours = t[e++], this.RTCDays = t[e++], this.RTCDayOverFlow = t[e++], this.RTCHalt = t[e]
                }
                updateClock() {
                    const t = (new Date).getTime(),
                        e = t - this.lastTime;
                    if (this.lastTime = t, !this.RTCHalt)
                        for (this.RTCSeconds += e / 1e3; this.RTCSeconds >= 60;) this.RTCSeconds -= 60, ++this.RTCMinutes, this.RTCMinutes >= 60 && (this.RTCMinutes -= 60, ++this.RTCHours, this.RTCHours >= 24 && (this.RTCHours -= 24, ++this.RTCDays, this.RTCDays >= 512 && (this.RTCDays -= 512, this.RTCDayOverFlow = !0)))
                }
            }
            class F extends S {
                constructor(t) { super(t), this.rtc = new A(this) }
                writeROMBank(t, e) { this.ROMBank1Offset = 127 & e, this.setCurrentROMBank() }
                writeRAMBank(t, e) { this.currentMBCRAMBank = e, e < 4 && (this.currentRAMBankPosition = (this.currentMBCRAMBank << 13) - 40960) }
                writeRAM(t, e) {
                    if (this.MBCRAMBanksEnabled || s.alwaysAllowRWtoBanks) switch (this.currentMBCRAMBank) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            this.emit("ramWrite"), this.RAM[t + this.currentRAMBankPosition] = e;
                            break;
                        case 8:
                            this.rtc && this.rtc.writeSeconds(e);
                            break;
                        case 9:
                            this.rtc && this.rtc.writeMinutes(e);
                            break;
                        case 10:
                            this.rtc && this.rtc.writeHours(e);
                            break;
                        case 11:
                            this.rtc && this.rtc.writeDaysLow(e);
                            break;
                        case 12:
                            this.rtc && this.rtc.writeDaysHigh(e);
                            break;
                        default:
                            console.log("Invalid MBC3 bank address selected: " + this.currentMBCRAMBank)
                    }
                }
                readRAM(t) {
                    if (this.MBCRAMBanksEnabled || s.alwaysAllowRWtoBanks) switch (this.currentMBCRAMBank) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            return this.RAM[t + this.currentRAMBankPosition];
                        case 8:
                            if (this.rtc) return this.rtc.readSeconds();
                            break;
                        case 9:
                            if (this.rtc) return this.rtc.readMinutes();
                            break;
                        case 10:
                            if (this.rtc) return this.rtc.readHours();
                            break;
                        case 11:
                            if (this.rtc) return this.rtc.readDaysLow();
                            break;
                        case 12:
                            if (this.rtc) return this.rtc.readDaysHigh()
                    }
                    return 255
                }
            }
            class L extends S {
                setCurrentROMBank() { this.currentROMBank = this.ROMBank1Offset % this.ROMBankEdge - 1 << 14 }
                writeROMBankLow(t, e) { this.ROMBank1Offset = 256 & this.ROMBank1Offset | e, this.setCurrentROMBank() }
                writeROMBankHigh(t, e) { this.ROMBank1Offset = (1 & e) << 8 | 255 & this.ROMBank1Offset, this.setCurrentROMBank() }
                writeRAMBank(t, e) { this.currentMBCRAMBank = 15 & e, this.currentRAMBankPosition = (this.currentMBCRAMBank << 13) - 40960 }
            }
            class _ extends S {
                constructor() { super(...arguments), this.highX = 127, this.lowX = 127, this.highY = 127, this.lowY = 127 }
                applyGyroEvent(t, e) { t *= -100, t += 2047, this.highX = t >> 8, this.lowX = 255 & t, e *= -100, e += 2047, this.highY = e >> 8, this.lowY = 255 & e }
                read(t) {
                    if (this.MBCRAMBanksEnabled || s.alwaysAllowRWtoBanks) switch (t) {
                        case 40960:
                        case 41056:
                        case 41072:
                        case 41088:
                            return 0;
                        case 41040:
                            return this.highY;
                        case 41024:
                            return this.lowY;
                        case 41008:
                            return this.highX;
                        case 40992:
                            return this.lowX;
                        default:
                            return this.RAM[t + this.currentRAMBankPosition]
                    }
                    return 255
                }
            }
            class x extends L { writeRAMBank(t, e) { 8 & e && this.emit("rumble"), e &= 7, super.writeRAMBank(t, e) } }
            const H = "Game and Watch 50";
            class E {
                constructor(t) { this.hasMBC1 = !1, this.hasMBC2 = !1, this.hasMBC3 = !1, this.hasMBC5 = !1, this.hasMBC7 = !1, this.hasSRAM = !1, this.hasRUMBLE = !1, this.hasCamera = !1, this.hasTAMA5 = !1, this.hasHuC3 = !1, this.hasHuC1 = !1, this.hasMMMO1 = !1, this.hasRTC = !1, this.hasBattery = !1, this.rom = t instanceof k ? t : new k(t) }
                connect(t) { this.gameboy = t }
                interpret() {
                    if (this.name = this.rom.getString(308, 318), this.gameCode = this.rom.getString(319, 322), this.colorCompatibilityByte = this.rom.getByte(323), this.type = this.rom.getByte(327), this.setTypeName(), this.name && console.log("Game Title: " + this.name), this.gameCode && console.log("Game Code: " + this.gameCode), this.colorCompatibilityByte && console.log("Color Compatibility Byte: " + this.colorCompatibilityByte), this.type && console.log("Cartridge Type: " + this.type), this.typeName && console.log("Cartridge Type Name: " + this.typeName), this.romSizeType = this.rom.getByte(328), this.ramSizeType = this.rom.getByte(329), this.gameboy.usedBootROM) console.log("used boot rom"), this.useGBCMode = this.gameboy.usedGBCBootROM;
                    else switch (this.colorCompatibilityByte) {
                        case 0:
                            this.useGBCMode = !1;
                            break;
                        case 50:
                            s.gbHasPriority || this.name + this.gameCode + this.colorCompatibilityByte !== H ? this.useGBCMode = !1 : (this.useGBCMode = !0, console.log("Created a boot exception for Game and Watch Gallery 2 (GBC ID byte is wrong on the cartridge)."));
                            break;
                        case 128:
                            this.useGBCMode = !s.gbHasPriority;
                            break;
                        case 192:
                            this.useGBCMode = !0;
                            break;
                        default:
                            this.useGBCMode = !1, console.warn("Unknown GameBoy game type code #" + this.colorCompatibilityByte + ", defaulting to GB mode (Old games don't have a type code).")
                    }
                    const t = this.rom.getByte(331),
                        e = 65280 & this.rom.getByte(324) | 255 & this.rom.getByte(325);
                    51 !== t ? (this.hasNewLicenseCode = !1, this.licenseCode = t) : (this.hasNewLicenseCode = !0, this.licenseCode = e)
                }
                setGBCMode(t) { this.useGBCMode = 0 == (1 & t), this.name + this.gameCode + this.colorCompatibilityByte === H && (this.useGBCMode = !0, console.log("Created a boot exception for Game and Watch Gallery 2 (GBC ID byte is wrong on the cartridge).")), console.log("Booted to GBC Mode: " + this.useGBCMode) }
                setTypeName() {
                    switch (this.type) {
                        case 0:
                            this.typeName = "ROM";
                            break;
                        case 1:
                            this.hasMBC1 = !0, this.typeName = "MBC1";
                            break;
                        case 2:
                            this.hasMBC1 = !0, this.hasSRAM = !0, this.typeName = "MBC1 + SRAM";
                            break;
                        case 3:
                            this.hasMBC1 = !0, this.hasSRAM = !0, this.hasBattery = !0, this.typeName = "MBC1 + SRAM + Battery";
                            break;
                        case 5:
                            this.hasMBC2 = !0, this.typeName = "MBC2";
                            break;
                        case 6:
                            this.hasMBC2 = !0, this.hasBattery = !0, this.typeName = "MBC2 + Battery";
                            break;
                        case 8:
                            this.hasSRAM = !0, this.typeName = "ROM + SRAM";
                            break;
                        case 9:
                            this.hasSRAM = !0, this.hasBattery = !0, this.typeName = "ROM + SRAM + Battery";
                            break;
                        case 11:
                            this.hasMMMO1 = !0, this.typeName = "MMMO1";
                            break;
                        case 12:
                            this.hasMMMO1 = !0, this.hasSRAM = !0, this.typeName = "MMMO1 + SRAM";
                            break;
                        case 13:
                            this.hasMMMO1 = !0, this.hasSRAM = !0, this.hasBattery = !0, this.typeName = "MMMO1 + SRAM + Battery";
                            break;
                        case 15:
                            this.hasMBC3 = !0, this.hasRTC = !0, this.hasBattery = !0, this.typeName = "MBC3 + RTC + Battery";
                            break;
                        case 16:
                            this.hasMBC3 = !0, this.hasRTC = !0, this.hasBattery = !0, this.hasSRAM = !0, this.typeName = "MBC3 + RTC + Battery + SRAM";
                            break;
                        case 17:
                            this.hasMBC3 = !0, this.typeName = "MBC3";
                            break;
                        case 18:
                            this.hasMBC3 = !0, this.hasSRAM = !0, this.typeName = "MBC3 + SRAM";
                            break;
                        case 19:
                            this.hasMBC3 = !0, this.hasSRAM = !0, this.hasBattery = !0, this.typeName = "MBC3 + SRAM + Battery";
                            break;
                        case 25:
                            this.hasMBC5 = !0, this.typeName = "MBC5";
                            break;
                        case 26:
                            this.hasMBC5 = !0, this.hasSRAM = !0, this.typeName = "MBC5 + SRAM";
                            break;
                        case 27:
                            this.hasMBC5 = !0, this.hasSRAM = !0, this.hasBattery = !0, this.typeName = "MBC5 + SRAM + Battery";
                            break;
                        case 28:
                            this.hasRUMBLE = !0, this.typeName = "RUMBLE";
                            break;
                        case 29:
                            this.hasRUMBLE = !0, this.hasSRAM = !0, this.typeName = "RUMBLE + SRAM";
                            break;
                        case 30:
                            this.hasRUMBLE = !0, this.hasSRAM = !0, this.hasBattery = !0, this.typeName = "RUMBLE + SRAM + Battery";
                            break;
                        case 31:
                            this.hasCamera = !0, this.typeName = "GameBoy Camera";
                            break;
                        case 34:
                            this.hasMBC7 = !0, this.hasSRAM = !0, this.hasBattery = !0, this.typeName = "MBC7 + SRAM + Battery";
                            break;
                        case 253:
                            this.hasTAMA5 = !0, this.typeName = "TAMA5";
                            break;
                        case 254:
                            this.hasHuC3 = !0, this.typeName = "HuC3";
                            break;
                        case 255:
                            this.hasHuC1 = !0, this.typeName = "HuC1";
                            break;
                        default:
                            throw new Error("Unknown Cartridge Type")
                    }
                    this.hasMBC1 && (this.mbc1 = new R(this)), this.hasMBC2 && (this.mbc2 = new T(this)), this.hasMBC3 && (this.mbc3 = new F(this)), this.hasMBC5 && (this.mbc5 = new L(this)), this.hasMBC7 && (this.mbc7 = new _(this)), this.hasRUMBLE && (this.mbc5 = this.rumble = new x(this)), this.mbc = this.mbc1 || this.mbc2 || this.mbc3 || this.mbc5 || this.mbc7 || this.rumble || null
                }
                setupRAM() { this.mbc && this.mbc.setupRAM(), this.gameboy.api.loadSRAM(), this.gameboy.api.loadRTC() }
            }
            class M extends B.EventEmitter {
                constructor() { super(...arguments), this.map = {} }
                register(t) { return this.map[t] = !0, this }
                getAll() { return Object.keys(this.map) }
                is(t) { return !!this.map[t] }
                down(t, e) { this.emit("down-" + t, e) }
                change(t, e) { this.emit("change-" + t, e) }
                up(t, e) { this.emit("up-" + t, e) }
            }
            var P = [4, 12, 8, 8, 4, 4, 8, 4, 20, 8, 8, 8, 4, 4, 8, 4, 4, 12, 8, 8, 4, 4, 8, 4, 12, 8, 8, 8, 4, 4, 8, 4, 8, 12, 8, 8, 4, 4, 8, 4, 8, 8, 8, 8, 4, 4, 8, 4, 8, 12, 8, 8, 12, 12, 12, 4, 8, 8, 8, 8, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 8, 8, 8, 8, 8, 8, 4, 8, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 4, 8, 12, 12, 16, 12, 16, 8, 16, 8, 16, 12, 0, 12, 24, 8, 16, 8, 12, 12, 4, 12, 16, 8, 16, 8, 16, 12, 4, 12, 4, 8, 16, 12, 12, 8, 4, 4, 16, 8, 16, 16, 4, 16, 4, 4, 4, 8, 16, 12, 12, 8, 4, 4, 16, 8, 16, 12, 8, 16, 4, 0, 4, 8, 16];
            class O {
                constructor(t, e, r, i, s) { this.fromSampleRate = t, this.toSampleRate = e, this.channels = 0 | r, this.outputBufferSize = i, this.noReturn = !!s, this.initialize() }
                initialize() {
                    if (!(this.fromSampleRate > 0 && this.toSampleRate > 0 && this.channels > 0)) throw new Error("Invalid settings specified for the resampler.");
                    this.fromSampleRate === this.toSampleRate ? (this.resampler = this.bypassResampler, this.ratioWeight = 1) : (this.ratioWeight = this.fromSampleRate / this.toSampleRate, this.fromSampleRate < this.toSampleRate ? (this.compileLinearInterpolationFunction(), this.lastWeight = 1) : (this.compileMultiTapFunction(), this.tailExists = !1, this.lastWeight = 0), this.initializeBuffers())
                }
                compileLinearInterpolationFunction() {
                    var t = "var bufferLength = buffer.length;\n  \tvar outLength = this.outputBufferSize;\n  \tif ((bufferLength % " + this.channels + ") === 0) {  \t\tif (bufferLength > 0) {  \t\t\tvar weight = this.lastWeight;  \t\t\tvar firstWeight = 0;  \t\t\tvar secondWeight = 0;  \t\t\tvar sourceOffset = 0;  \t\t\tvar outputOffset = 0;  \t\t\tvar outputBuffer = this.outputBuffer;  \t\t\tfor (; weight < 1; weight += " + this.ratioWeight + ") {  \t\t\t\tsecondWeight = weight % 1;  \t\t\t\tfirstWeight = 1 - secondWeight;";
                    for (let e = 0; e < this.channels; ++e) t += `outputBuffer[outputOffset++] = (this.lastOutput[${e}] * firstWeight) + (buffer[${e}] * secondWeight);`;
                    t += "}  \t\t\tweight -= 1;  \t\t\tfor (bufferLength -= " + this.channels + ", sourceOffset = Math.floor(weight) * " + this.channels + "; outputOffset < outLength && sourceOffset < bufferLength;) {  \t\t\t\tsecondWeight = weight % 1;  \t\t\t\tfirstWeight = 1 - secondWeight;";
                    for (let e = 0; e < this.channels; ++e) t += "outputBuffer[outputOffset++] = (buffer[sourceOffset" + (e > 0 ? " + " + e : "") + "] * firstWeight) + (buffer[sourceOffset + " + (this.channels + e) + "] * secondWeight);";
                    t += "weight += " + this.ratioWeight + ";  \t\t\t\tsourceOffset = Math.floor(weight) * " + this.channels + ";  \t\t\t}";
                    for (let e = 0; e < this.channels; ++e) t += "this.lastOutput[" + e + "] = buffer[sourceOffset++];";
                    t += 'this.lastWeight = weight % 1;  \t\t\treturn this.bufferSlice(outputOffset);  \t\t}  \t\telse {  \t\t\treturn (this.noReturn) ? 0 : [];  \t\t}  \t}  \telse {  \t\tthrow(new Error("Buffer was of incorrect sample length."));  \t}', this.resampler = Function("buffer", t)
                }
                compileMultiTapFunction() {
                    var t = "var bufferLength = buffer.length;  \tvar outLength = this.outputBufferSize;  \tif ((bufferLength % " + this.channels + ") === 0) {  \t\tif (bufferLength > 0) {  \t\t\tvar weight = 0;";
                    for (let e = 0; e < this.channels; ++e) t += "var output" + e + " = 0;";
                    t += "var actualPosition = 0;  \t\t\tvar amountToNext = 0;  \t\t\tvar alreadyProcessedTail = !this.tailExists;  \t\t\tthis.tailExists = false;  \t\t\tvar outputBuffer = this.outputBuffer;  \t\t\tvar outputOffset = 0;  \t\t\tvar currentPosition = 0;  \t\t\tdo {  \t\t\t\tif (alreadyProcessedTail) {  \t\t\t\t\tweight = " + this.ratioWeight + ";";
                    for (let e = 0; e < this.channels; ++e) t += "output" + e + " = 0;";
                    t += "}  \t\t\t\telse {  \t\t\t\t\tweight = this.lastWeight;";
                    for (let e = 0; e < this.channels; ++e) t += "output" + e + " = this.lastOutput[" + e + "];";
                    t += "alreadyProcessedTail = true;  \t\t\t\t}  \t\t\t\twhile (weight > 0 && actualPosition < bufferLength) {  \t\t\t\t\tamountToNext = 1 + actualPosition - currentPosition;  \t\t\t\t\tif (weight >= amountToNext) {";
                    for (let e = 0; e < this.channels; ++e) t += "output" + e + " += buffer[actualPosition++] * amountToNext;";
                    t += "currentPosition = actualPosition;  \t\t\t\t\t\tweight -= amountToNext;  \t\t\t\t\t}  \t\t\t\t\telse {";
                    for (let e = 0; e < this.channels; ++e) t += "output" + e + " += buffer[actualPosition" + (e > 0 ? " + " + e : "") + "] * weight;";
                    t += "currentPosition += weight;  \t\t\t\t\t\tweight = 0;  \t\t\t\t\t\tbreak;  \t\t\t\t\t}  \t\t\t\t}  \t\t\t\tif (weight <= 0) {";
                    for (let e = 0; e < this.channels; ++e) t += "outputBuffer[outputOffset++] = output" + e + " / " + this.ratioWeight + ";";
                    t += "      } else {  \t\t\tthis.lastWeight = weight;";
                    for (let e = 0; e < this.channels; ++e) t += "this.lastOutput[" + e + "] = output" + e + ";";
                    t += 'this.tailExists = true;  \t\t\t\t\tbreak;  \t\t\t\t}  \t\t\t} while (actualPosition < bufferLength && outputOffset < outLength);  \t\t\treturn this.bufferSlice(outputOffset);  \t\t}  \t\telse {  \t\t\treturn (this.noReturn) ? 0 : [];  \t\t}  \t}  \telse {  \t\tthrow(new Error("Buffer was of incorrect sample length."));  \t}', this.resampler = Function("buffer", t)
                }
                bypassResampler(t) { return this.noReturn ? (this.outputBuffer = t, t.length) : t }
                bufferSlice(t) { if (this.noReturn) return t; try { return this.outputBuffer.subarray(0, t) } catch (e) { try { return this.outputBuffer.length = t, this.outputBuffer } catch (e) { return this.outputBuffer.slice(0, t) } } }
                initializeBuffers() { this.outputBuffer = new Float32Array(this.outputBufferSize), this.lastOutput = new Float32Array(this.channels) }
            }
            var D = function(t, e, r, i) {
                return new(r || (r = Promise))(function(s, n) {
                    function a(t) { try { h(i.next(t)) } catch (t) { n(t) } }

                    function o(t) { try { h(i.throw(t)) } catch (t) { n(t) } }

                    function h(t) { t.done ? s(t.value) : new r(function(e) { e(t.value) }).then(a, o) }
                    h((i = i.apply(t, e || [])).next())
                })
            };
            const W = "undefined" != typeof window ? "undefined" != typeof AudioContext ? AudioContext : window.webkitAudioContext : null;
            class I {
                constructor({ context: t, channels: e, minBufferSize: r, volume: i }) { this.samplesPerCallback = 2048, this.context = t || new W, this.audioWorkletSupport = !!this.context.audioWorklet, this.channelsAllocated = Math.max(e, 1), this.bufferSize = this.samplesPerCallback * this.channelsAllocated, this.minBufferSize = r || this.bufferSize, this.setVolume(i) }
                setSampleRate(t) { this.sampleRate = Math.abs(t) }
                setMaxBufferSize(t) { this.maxBufferSize = Math.floor(t) > this.minBufferSize + this.channelsAllocated ? t & -this.channelsAllocated : this.minBufferSize * this.channelsAllocated }
                writeAudio(t) { let e = 0; for (; e < t.length && this.audioBufferSize < this.maxBufferSize;) this.audioContextSampleBuffer[this.audioBufferSize++] = t[e++] }
                remainingBuffer() { return Math.floor(this.resampledSamplesLeft() * this.resampleControl.ratioWeight / this.channelsAllocated) * this.channelsAllocated + this.audioBufferSize }
                initializeAudio() { return D(this, void 0, void 0, function*() { this.audioNode || (this.audioNode = this.context.createScriptProcessor(this.samplesPerCallback, 0, this.channelsAllocated), this.audioNode.onaudioprocess = (t => this.processAudio(t)), this.audioNode.connect(this.context.destination), this.resetAudioBuffer(this.context.sampleRate)) }) }
                processAudio(t) {
                    const e = [];
                    let r = 0;
                    for (; r < this.channelsAllocated;) e[r] = t.outputBuffer.getChannelData(r), ++r;
                    this.refillResampledBuffer();
                    let i = 0;
                    for (; i < this.samplesPerCallback && this.resampleBufferStart !== this.resampleBufferEnd;) {
                        for (r = 0; r < this.channelsAllocated;) e[r][i] = this.resampledBuffer[this.resampleBufferStart++] * this.volume, ++r;
                        this.resampleBufferStart === this.resampleBufferSize && (this.resampleBufferStart = 0), ++i
                    }
                    for (; i < this.samplesPerCallback;) { for (r = 0; r < this.channelsAllocated; ++r) e[r][i] = 0;++i }
                }
                setVolume(t) { this.volume = Math.max(0, Math.min(1, t)) }
                resetAudioBuffer(t) { this.audioBufferSize = this.resampleBufferEnd = this.resampleBufferStart = 0, this.initializeResampler(t), this.resampledBuffer = new Float32Array(this.resampleBufferSize) }
                refillResampledBuffer() {
                    if (this.audioBufferSize > 0) {
                        const t = this.resampleControl.resampler(this.getBufferSamples()),
                            e = this.resampleControl.outputBuffer;
                        for (let r = 0; r < t;) this.resampledBuffer[this.resampleBufferEnd++] = e[r++], this.resampleBufferEnd === this.resampleBufferSize && (this.resampleBufferEnd = 0), this.resampleBufferStart === this.resampleBufferEnd && (this.resampleBufferStart += this.channelsAllocated, this.resampleBufferStart === this.resampleBufferSize && (this.resampleBufferStart = 0));
                        this.audioBufferSize = 0
                    }
                }
                initializeResampler(t) { this.audioContextSampleBuffer = new Float32Array(this.maxBufferSize), this.resampleBufferSize = Math.max(this.maxBufferSize * Math.ceil(t / this.sampleRate) + this.channelsAllocated, this.bufferSize), this.resampleControl = new O(this.sampleRate, t, this.channelsAllocated, this.resampleBufferSize, !0) }
                resampledSamplesLeft() { return (this.resampleBufferStart <= this.resampleBufferEnd ? 0 : this.resampleBufferSize) + this.resampleBufferEnd - this.resampleBufferStart }
                getBufferSamples() { return this.audioContextSampleBuffer.subarray(0, this.audioBufferSize) }
            }
            var G = [
                [!1, !1, !1, !1, !1, !1, !1, !0],
                [!0, !1, !1, !1, !1, !1, !1, !0],
                [!0, !1, !1, !1, !1, !0, !0, !0],
                [!1, !0, !0, !0, !0, !0, !0, !1]
            ];
            class N {
                constructor({ cpu: t, gameboy: e }) { this.LSFR15Table = null, this.LSFR7Table = null, this.noiseSampleTable = null, this.bufferLength = 0, this.audioTicks = 0, this.audioIndex = 0, this.bufferContainAmount = 0, this.bufferPosition = 0, this.downsampleInput = 0, this.cpu = t, this.gameboy = e, this.generateWhiteNoise(), this.initStartState() }
                setMemory(t) { this.memory = t }
                initMemory() { this.channel3PCM = c(32, 0, "int8") }
                initStartState() { this.channel1FrequencyTracker = 8192, this.channel1DutyTracker = 0, this.channel1CachedDuty = G[2], this.channel1totalLength = 0, this.channel1envelopeVolume = 0, this.channel1envelopeType = !1, this.channel1envelopeSweeps = 0, this.channel1envelopeSweepsLast = 0, this.channel1consecutive = !0, this.channel1frequency = 0, this.channel1SweepFault = !1, this.channel1ShadowFrequency = 0, this.channel1timeSweep = 1, this.channel1lastTimeSweep = 0, this.channel1Swept = !1, this.channel1frequencySweepDivider = 0, this.channel1decreaseSweep = !1, this.channel2FrequencyTracker = 8192, this.channel2DutyTracker = 0, this.channel2CachedDuty = G[2], this.channel2totalLength = 0, this.channel2envelopeVolume = 0, this.channel2envelopeType = !1, this.channel2envelopeSweeps = 0, this.channel2envelopeSweepsLast = 0, this.channel2consecutive = !0, this.channel2frequency = 0, this.channel3canPlay = !1, this.channel3totalLength = 0, this.channel3patternType = 4, this.channel3frequency = 0, this.channel3consecutive = !0, this.channel3Counter = 2048, this.channel4FrequencyPeriod = 8, this.channel4totalLength = 0, this.channel4envelopeVolume = 0, this.channel4currentVolume = 0, this.channel4envelopeType = !1, this.channel4envelopeSweeps = 0, this.channel4envelopeSweepsLast = 0, this.channel4consecutive = !0, this.channel4BitRange = 32767, this.channel4VolumeShifter = 15, this.channel1FrequencyCounter = 8192, this.channel2FrequencyCounter = 8192, this.channel3Counter = 2048, this.channel3FrequencyPeriod = 2048, this.channel3lastSampleLookup = 0, this.channel4lastSampleLookup = 0, this.VinLeftChannelMasterVolume = 8, this.VinRightChannelMasterVolume = 8, this.mixerOutputCache = 0, this.sequencerClocks = 8192, this.sequencePosition = 0, this.channel4FrequencyPeriod = 8, this.channel4Counter = 8, this.cachedChannel3Sample = 0, this.cachedChannel4Sample = 0, this.channel1Enabled = !1, this.channel2Enabled = !1, this.channel3Enabled = !1, this.channel4Enabled = !1, this.channel1canPlay = !1, this.channel2canPlay = !1, this.channel4canPlay = !1, this.audioClocksUntilNextEvent = 1, this.audioClocksUntilNextEventCounter = 1, this.cacheChannel1OutputLevel(), this.cacheChannel2OutputLevel(), this.cacheChannel3OutputLevel(), this.cacheChannel4OutputLevel(), this.noiseSampleTable = this.LSFR15Table }
                generate(t) {
                    if (this.gameboy.soundMasterEnabled && !this.gameboy.CPUStopped)
                        for (let e = 0; t > 0;) {
                            for (e = Math.min(this.audioClocksUntilNextEventCounter, this.sequencerClocks, t), this.audioClocksUntilNextEventCounter -= e, this.sequencerClocks -= e, t -= e; e > 0;) {
                                const t = Math.min(e, this.resamplerFirstPassFactor - this.audioIndex);
                                e -= t, this.audioIndex += t, this.downsampleInput += this.mixerOutputCache * t, this.audioIndex === this.resamplerFirstPassFactor && (this.audioIndex = 0, this.outputAudio())
                            }
                            0 === this.sequencerClocks && (this.audioComputeSequencer(), this.sequencerClocks = 8192), 0 === this.audioClocksUntilNextEventCounter && this.computeChannels()
                        } else
                            for (; t > 0;) {
                                const e = Math.min(t, this.resamplerFirstPassFactor - this.audioIndex);
                                t -= e, this.audioIndex += e, this.audioIndex === this.resamplerFirstPassFactor && (this.audioIndex = 0, this.outputAudio())
                            }
                }
                generateFake(t) { if (this.gameboy.soundMasterEnabled && !this.gameboy.CPUStopped) { let e = 0; for (; t > 0;) e = Math.min(this.audioClocksUntilNextEventCounter, this.sequencerClocks, t), this.audioClocksUntilNextEventCounter -= e, this.sequencerClocks -= e, t -= e, 0 === this.sequencerClocks && (this.audioComputeSequencer(), this.sequencerClocks = 8192), 0 === this.audioClocksUntilNextEventCounter && this.computeChannels() } }
                runJIT() { s.soundOn ? this.generate(this.audioTicks) : this.generateFake(this.audioTicks), this.audioTicks = 0 }
                clockAudioEnvelope() { this.channel1envelopeSweepsLast > -1 && (this.channel1envelopeSweeps > 0 ? --this.channel1envelopeSweeps : this.channel1envelopeType ? this.channel1envelopeVolume < 15 ? (++this.channel1envelopeVolume, this.channel1envelopeSweeps = this.channel1envelopeSweepsLast, this.cacheChannel1OutputLevel()) : this.channel1envelopeSweepsLast = -1 : this.channel1envelopeVolume > 0 ? (--this.channel1envelopeVolume, this.channel1envelopeSweeps = this.channel1envelopeSweepsLast, this.cacheChannel1OutputLevel()) : this.channel1envelopeSweepsLast = -1), this.channel2envelopeSweepsLast > -1 && (this.channel2envelopeSweeps > 0 ? --this.channel2envelopeSweeps : this.channel2envelopeType ? this.channel2envelopeVolume < 15 ? (++this.channel2envelopeVolume, this.channel2envelopeSweeps = this.channel2envelopeSweepsLast, this.cacheChannel2OutputLevel()) : this.channel2envelopeSweepsLast = -1 : this.channel2envelopeVolume > 0 ? (--this.channel2envelopeVolume, this.channel2envelopeSweeps = this.channel2envelopeSweepsLast, this.cacheChannel2OutputLevel()) : this.channel2envelopeSweepsLast = -1), this.channel4envelopeSweepsLast > -1 && (this.channel4envelopeSweeps > 0 ? --this.channel4envelopeSweeps : this.channel4envelopeType ? this.channel4envelopeVolume < 15 ? (this.channel4currentVolume = ++this.channel4envelopeVolume << this.channel4VolumeShifter, this.channel4envelopeSweeps = this.channel4envelopeSweepsLast, this.cacheChannel4Update()) : this.channel4envelopeSweepsLast = -1 : this.channel4envelopeVolume > 0 ? (this.channel4currentVolume = --this.channel4envelopeVolume << this.channel4VolumeShifter, this.channel4envelopeSweeps = this.channel4envelopeSweepsLast, this.cacheChannel4Update()) : this.channel4envelopeSweepsLast = -1) }
                performChannel1AudioSweepDummy() {
                    if (this.channel1frequencySweepDivider > 0 && !this.channel1decreaseSweep) {
                        const t = this.channel1ShadowFrequency + (this.channel1ShadowFrequency >> this.channel1frequencySweepDivider);
                        t <= 2047 ? t + (t >> this.channel1frequencySweepDivider) > 2047 && (this.channel1SweepFault = !0, this.checkChannel1Enable(), this.memory[65318] &= 254) : (this.channel1SweepFault = !0, this.checkChannel1Enable(), this.memory[65318] &= 254)
                    }
                }
                audioComputeSequencer() {
                    switch (this.sequencePosition++) {
                        case 0:
                            this.clockAudioLength();
                            break;
                        case 2:
                            this.clockAudioLength(), this.clockAudioSweep();
                            break;
                        case 4:
                            this.clockAudioLength();
                            break;
                        case 6:
                            this.clockAudioLength(), this.clockAudioSweep();
                            break;
                        case 7:
                            this.clockAudioEnvelope(), this.sequencePosition = 0
                    }
                }
                clockAudioLength() { this.channel1totalLength > 1 ? --this.channel1totalLength : 1 === this.channel1totalLength && (this.channel1totalLength = 0, this.checkChannel1Enable(), this.memory[65318] &= 254), this.channel2totalLength > 1 ? --this.channel2totalLength : 1 === this.channel2totalLength && (this.channel2totalLength = 0, this.checkChannel2Enable(), this.memory[65318] &= 253), this.channel3totalLength > 1 ? --this.channel3totalLength : 1 === this.channel3totalLength && (this.channel3totalLength = 0, this.checkChannel3Enable(), this.memory[65318] &= 251), this.channel4totalLength > 1 ? --this.channel4totalLength : 1 === this.channel4totalLength && (this.channel4totalLength = 0, this.checkChannel4Enable(), this.memory[65318] &= 247) }
                clockAudioSweep() {!this.channel1SweepFault && this.channel1timeSweep > 0 && 0 == --this.channel1timeSweep && this.runAudioSweep() }
                runAudioSweep() { this.channel1lastTimeSweep > 0 && (this.channel1frequencySweepDivider > 0 ? (this.channel1Swept = !0, this.channel1decreaseSweep ? (this.channel1ShadowFrequency -= this.channel1ShadowFrequency >> this.channel1frequencySweepDivider, this.channel1frequency = 2047 & this.channel1ShadowFrequency, this.channel1FrequencyTracker = 2048 - this.channel1frequency << 2) : (this.channel1ShadowFrequency += this.channel1ShadowFrequency >> this.channel1frequencySweepDivider, this.channel1frequency = this.channel1ShadowFrequency, this.channel1ShadowFrequency <= 2047 ? (this.channel1FrequencyTracker = 2048 - this.channel1frequency << 2, this.channel1ShadowFrequency + (this.channel1ShadowFrequency >> this.channel1frequencySweepDivider) > 2047 && (this.channel1SweepFault = !0, this.checkChannel1Enable(), this.memory[65318] &= 254)) : (this.channel1frequency &= 2047, this.channel1SweepFault = !0, this.checkChannel1Enable(), this.memory[65318] &= 254)), this.channel1timeSweep = this.channel1lastTimeSweep) : (this.channel1SweepFault = !0, this.checkChannel1Enable())) }
                computeChannels() { this.channel1FrequencyCounter -= this.audioClocksUntilNextEvent, this.channel2FrequencyCounter -= this.audioClocksUntilNextEvent, this.channel3Counter -= this.audioClocksUntilNextEvent, this.channel4Counter -= this.audioClocksUntilNextEvent, 0 === this.channel1FrequencyCounter && (this.channel1FrequencyCounter = this.channel1FrequencyTracker, this.channel1DutyTracker = this.channel1DutyTracker + 1 & 7, this.cacheChannel1OutputLevelTrimary()), 0 === this.channel2FrequencyCounter && (this.channel2FrequencyCounter = this.channel2FrequencyTracker, this.channel2DutyTracker = this.channel2DutyTracker + 1 & 7, this.cacheChannel2OutputLevelTrimary()), 0 === this.channel3Counter && (this.channel3canPlay && (this.channel3lastSampleLookup = this.channel3lastSampleLookup + 1 & 31), this.channel3Counter = this.channel3FrequencyPeriod, this.cacheChannel3Update()), 0 === this.channel4Counter && (this.channel4lastSampleLookup = this.channel4lastSampleLookup + 1 & this.channel4BitRange, this.channel4Counter = this.channel4FrequencyPeriod, this.cacheChannel4Update()), this.audioClocksUntilNextEventCounter = this.audioClocksUntilNextEvent = Math.min(this.channel1FrequencyCounter, this.channel2FrequencyCounter, this.channel3Counter, this.channel4Counter) }
                checkChannel1Enable() { this.channel1Enabled = (this.channel1consecutive || this.channel1totalLength > 0) && !this.channel1SweepFault && this.channel1canPlay, this.cacheChannel1OutputLevelSecondary() }
                cacheChannel1OutputLevel() { this.channel1currentSampleLeft = this.leftChannel1 ? this.channel1envelopeVolume : 0, this.channel1currentSampleRight = this.rightChannel1 ? this.channel1envelopeVolume : 0, this.cacheChannel1OutputLevelSecondary() }
                checkChannel1VolumeEnable() { this.channel1canPlay = this.memory[65298] > 7, this.checkChannel1Enable(), this.cacheChannel1OutputLevelSecondary() }
                cacheChannel1OutputLevelSecondary() { this.channel1Enabled ? (this.channel1currentSampleLeftSecondary = this.channel1currentSampleLeft, this.channel1currentSampleRightSecondary = this.channel1currentSampleRight) : (this.channel1currentSampleLeftSecondary = 0, this.channel1currentSampleRightSecondary = 0), this.cacheChannel1OutputLevelTrimary() }
                cacheChannel1OutputLevelTrimary() { this.channel1CachedDuty[this.channel1DutyTracker] && s.enabledChannels[0] ? (this.channel1currentSampleLeftTrimary = this.channel1currentSampleLeftSecondary, this.channel1currentSampleRightTrimary = this.channel1currentSampleRightSecondary) : (this.channel1currentSampleLeftTrimary = 0, this.channel1currentSampleRightTrimary = 0), this.cacheMixerOutputLevel() }
                checkChannel2Enable() { this.channel2Enabled = (this.channel2consecutive || this.channel2totalLength > 0) && this.channel2canPlay, this.cacheChannel2OutputLevelSecondary() }
                cacheChannel2OutputLevel() { this.channel2currentSampleLeft = this.leftChannel2 ? this.channel2envelopeVolume : 0, this.channel2currentSampleRight = this.rightChannel2 ? this.channel2envelopeVolume : 0, this.cacheChannel2OutputLevelSecondary() }
                checkChannel2VolumeEnable() { this.channel2canPlay = this.memory[65303] > 7, this.checkChannel2Enable(), this.cacheChannel2OutputLevelSecondary() }
                cacheChannel2OutputLevelSecondary() { this.channel2Enabled ? (this.channel2currentSampleLeftSecondary = this.channel2currentSampleLeft, this.channel2currentSampleRightSecondary = this.channel2currentSampleRight) : (this.channel2currentSampleLeftSecondary = 0, this.channel2currentSampleRightSecondary = 0), this.cacheChannel2OutputLevelTrimary() }
                cacheChannel2OutputLevelTrimary() { this.channel2CachedDuty[this.channel2DutyTracker] && s.enabledChannels[1] ? (this.channel2currentSampleLeftTrimary = this.channel2currentSampleLeftSecondary, this.channel2currentSampleRightTrimary = this.channel2currentSampleRightSecondary) : (this.channel2currentSampleLeftTrimary = 0, this.channel2currentSampleRightTrimary = 0), this.cacheMixerOutputLevel() }
                cacheChannel3Update() { this.cachedChannel3Sample = this.channel3PCM[this.channel3lastSampleLookup] >> this.channel3patternType, this.cacheChannel3OutputLevel() }
                checkChannel3Enable() { this.channel3Enabled = this.channel3consecutive || this.channel3totalLength > 0, this.channel3OutputLevelSecondaryCache() }
                cacheChannel3OutputLevel() { this.channel3currentSampleLeft = this.leftChannel3 ? this.cachedChannel3Sample : 0, this.channel3currentSampleRight = this.rightChannel3 ? this.cachedChannel3Sample : 0, this.channel3OutputLevelSecondaryCache() }
                channel3OutputLevelSecondaryCache() { this.channel3Enabled && s.enabledChannels[2] ? (this.channel3currentSampleLeftSecondary = this.channel3currentSampleLeft, this.channel3currentSampleRightSecondary = this.channel3currentSampleRight) : (this.channel3currentSampleLeftSecondary = 0, this.channel3currentSampleRightSecondary = 0), this.cacheMixerOutputLevel() }
                checkChannel4Enable() { this.channel4Enabled = (this.channel4consecutive || this.channel4totalLength > 0) && this.channel4canPlay, this.cacheChannel4OutputLevelSecondary() }
                cacheChannel4Update() { this.cachedChannel4Sample = this.noiseSampleTable[this.channel4currentVolume | this.channel4lastSampleLookup], this.cacheChannel4OutputLevel() }
                cacheChannel4OutputLevel() { this.channel4currentSampleLeft = this.leftChannel4 ? this.cachedChannel4Sample : 0, this.channel4currentSampleRight = this.rightChannel4 ? this.cachedChannel4Sample : 0, this.cacheChannel4OutputLevelSecondary() }
                checkChannel4VolumeEnable() { this.channel4canPlay = this.memory[65313] > 7, this.checkChannel4Enable(), this.cacheChannel4OutputLevelSecondary() }
                cacheChannel4OutputLevelSecondary() { this.channel4Enabled && s.enabledChannels[3] ? (this.channel4currentSampleLeftSecondary = this.channel4currentSampleLeft, this.channel4currentSampleRightSecondary = this.channel4currentSampleRight) : (this.channel4currentSampleLeftSecondary = 0, this.channel4currentSampleRightSecondary = 0), this.cacheMixerOutputLevel() }
                cacheMixerOutputLevel() {
                    const t = this.channel1currentSampleLeftTrimary + this.channel2currentSampleLeftTrimary + this.channel3currentSampleLeftSecondary + this.channel4currentSampleLeftSecondary,
                        e = this.channel1currentSampleRightTrimary + this.channel2currentSampleRightTrimary + this.channel3currentSampleRightSecondary + this.channel4currentSampleRightSecondary;
                    this.mixerOutputCache = t * this.VinLeftChannelMasterVolume << 16 | e * this.VinRightChannelMasterVolume
                }
                connectDevice(t) {
                    this.resamplerFirstPassFactor = Math.max(Math.min(Math.floor(this.cpu.clocksPerSecond / 44100), Math.floor(136.53125)), 1), this.downSampleInputDivider = 1 / (240 * this.resamplerFirstPassFactor);
                    const e = this.cpu.clocksPerSecond / this.resamplerFirstPassFactor,
                        r = Math.max(this.cpu.baseCyclesPerIteration * s.maxAudioBufferSpanAmountOverXInterpreterIterations / this.resamplerFirstPassFactor, 8192) << 1;
                    t.setSampleRate(e), t.setMaxBufferSize(r), t.initializeAudio(), this.device = t
                }
                setVolume(t) { this.device && this.device.setVolume(t) }
                adjustUnderrun() { if (!s.soundOn) return; let t = this.device.remainingBuffer(); "number" == typeof t && (t = this.bufferContainAmount - Math.max(t, 0)) > 0 && this.recalculateIterationClockLimitForAudio((t >> 1) * this.resamplerFirstPassFactor) }
                recalculateIterationClockLimitForAudio(t) { this.cpu.cyclesTotal += Math.min(t >> 2 << 2, this.cpu.cyclesTotalBase << 1) }
                outputAudio() { this.fillBuffer(), this.bufferPosition === this.bufferLength && (this.device.writeAudio(this.buffer), this.bufferPosition = 0), this.downsampleInput = 0 }
                fillBuffer() { this.buffer[this.bufferPosition++] = (this.downsampleInput >>> 16) * this.downSampleInputDivider - 1, this.buffer[this.bufferPosition++] = (65535 & this.downsampleInput) * this.downSampleInputDivider - 1 }
                initBuffer() { this.audioIndex = 0, this.bufferPosition = 0, this.downsampleInput = 0, this.bufferContainAmount = Math.max(this.cpu.baseCyclesPerIteration * s.minAudioBufferSpanAmountOverXInterpreterIterations / this.resamplerFirstPassFactor, 4096) << 1, this.bufferLength = this.cpu.baseCyclesPerIteration / this.resamplerFirstPassFactor << 1, this.buffer = c(this.bufferLength, 0, "float32") }
                generateWhiteNoise() { this.LSFR7Table = this.generateLSFR7Table(), this.LSFR15Table = this.generateLSFR15Table(), this.noiseSampleTable = this.LSFR15Table }
                generateLSFR7Table() {
                    const t = c(2048, 0, "int8");
                    let e = 127;
                    for (let r = 0; r < 128; ++r) {
                        const i = 1 - (1 & e);
                        t[128 | r] = i, t[256 | r] = 2 * i, t[384 | r] = 3 * i, t[512 | r] = 4 * i, t[640 | r] = 5 * i, t[768 | r] = 6 * i, t[896 | r] = 7 * i, t[1024 | r] = 8 * i, t[1152 | r] = 9 * i, t[1280 | r] = 10 * i, t[1408 | r] = 11 * i, t[1536 | r] = 12 * i, t[1664 | r] = 13 * i, t[1792 | r] = 14 * i, t[1920 | r] = 15 * i;
                        const s = e >> 1;
                        e = s | (1 & (s ^ e)) << 6
                    }
                    return t
                }
                generateLSFR15Table() {
                    const t = c(524288, 0, "int8");
                    let e = 32767;
                    for (let r = 0; r < 32768; ++r) {
                        const i = 1 - (1 & e);
                        t[32768 | r] = i, t[65536 | r] = 2 * i, t[98304 | r] = 3 * i, t[131072 | r] = 4 * i, t[163840 | r] = 5 * i, t[196608 | r] = 6 * i, t[229376 | r] = 7 * i, t[262144 | r] = 8 * i, t[294912 | r] = 9 * i, t[327680 | r] = 10 * i, t[360448 | r] = 11 * i, t[393216 | r] = 12 * i, t[425984 | r] = 13 * i, t[458752 | r] = 14 * i, t[491520 | r] = 15 * i;
                        const s = e >> 1;
                        e = s | (1 & (s ^ e)) << 14
                    }
                    return t
                }
            }
            class z {
                constructor({ canvas: t, context: e, offscreenCanvas: r, offscreenContext: i, gameboy: s, width: n, height: a }) { if (this.canvas = t, this.context = e, this.offscreenCanvas = r, this.offscreenContext = i, this.gameboy = s, this.offscreenWidth = 160, this.offscreenHeight = 144, this.offscreenRGBCount = this.offscreenWidth * this.offscreenHeight * 3, this.offscreenRGBACount = this.offscreenWidth * this.offscreenHeight * 4, this.width = n || this.offscreenWidth, this.height = a || this.offscreenHeight, this.swizzledFrame = null, this.canvasBuffer = null, this.resizePathClear = !0, "undefined" != typeof document && (this.canvas || (this.canvas = document.createElement("canvas")), this.offscreenCanvas || (this.offscreenCanvas = document.createElement("canvas"))), this.canvas && (this.canvas.height = this.height, this.canvas.width = this.width, this.context || (this.context = this.canvas.getContext("2d"))), this.offscreenCanvas && (this.offscreenCanvas.height = this.offscreenHeight, this.offscreenCanvas.width = this.offscreenWidth, this.offscreenContext || (this.offscreenContext = this.offscreenCanvas.getContext("2d"))), !this.context) throw new Error("please provide a canvas context in the lcd options"); if (!this.offscreenContext) throw new Error("please provide a canvas offscreen context in the lcd options") }
                init() {
                    this.offscreenContext.msImageSmoothingEnabled = !1, this.offscreenContext.mozImageSmoothingEnabled = !1, this.offscreenContext.webkitImageSmoothingEnabled = !1, this.offscreenContext.imageSmoothingEnabled = !1, this.context.msImageSmoothingEnabled = !1, this.context.mozImageSmoothingEnabled = !1, this.context.webkitImageSmoothingEnabled = !1, this.context.imageSmoothingEnabled = !1, this.canvasBuffer = this.offscreenContext.createImageData(this.offscreenWidth, this.offscreenHeight);
                    let t = this.offscreenRGBACount;
                    for (; t > 0;) t -= 4, this.canvasBuffer.data[t] = 248, this.canvasBuffer.data[t + 1] = 248, this.canvasBuffer.data[t + 2] = 248, this.canvasBuffer.data[t + 3] = 255;
                    this.graphicsBlit(), this.swizzledFrame || (this.swizzledFrame = c(this.offscreenRGBCount, 255, "uint8")), this.drewFrame = !0, this.requestDraw()
                }
                graphicsBlit() { this.offscreenWidth === this.width && this.offscreenHeight === this.height ? this.context.putImageData(this.canvasBuffer, 0, 0) : (this.offscreenContext.putImageData(this.canvasBuffer, 0, 0), this.context.drawImage(this.offscreenCanvas, 0, 0, this.width, this.height)) }
                requestDraw() { this.drewFrame && this.dispatchDraw() }
                dispatchDraw() { this.offscreenRGBACount > 0 && 92160 === this.offscreenRGBACount && this.processDraw(this.swizzledFrame) }
                resizeFrameBuffer() { this.resizePathClear && (this.resizePathClear = !1, this.resizer.resize(this.swizzledFrame)) }
                processDraw(t) {
                    const e = this.canvasBuffer.data;
                    let r = 0,
                        i = 0;
                    for (; i < this.offscreenRGBACount;) e[i++] = t[r++], e[i++] = t[r++], e[i++] = t[r++], ++i;
                    this.graphicsBlit(), this.drewFrame = !1
                }
                prepareFrame() { this.swizzleFrameBuffer(), this.drewFrame = !0 }
                swizzleFrameBuffer() {
                    const t = this.gameboy.frameBuffer,
                        e = this.swizzledFrame;
                    let r = 0,
                        i = 0;
                    for (; i < this.offscreenRGBCount;) e[i++] = t[r] >> 16 & 255, e[i++] = t[r] >> 8 & 255, e[i++] = 255 & t[r], ++r
                }
                DisplayShowOff() { 0 === this.drewBlank && (this.clearFrameBuffer(), this.drewFrame = !0), this.drewBlank = 2 }
                clearFrameBuffer() {
                    const t = this.swizzledFrame;
                    let e = 0;
                    if (this.gameboy.cartridge.useGBCMode || this.colorizedGBPalettes)
                        for (; e < this.offscreenRGBCount;) t[e++] = 248;
                    else
                        for (; e < this.offscreenRGBCount;) t[e++] = 239, t[e++] = 255, t[e++] = 222
                }
            }
            class j { constructor() {} }
            var U = [function() { this.FCarry = this.registerB > 127, this.registerB = this.registerB << 1 & 255 | (this.FCarry ? 1 : 0), this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerB }, function() { this.FCarry = this.registerC > 127, this.registerC = this.registerC << 1 & 255 | (this.FCarry ? 1 : 0), this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerC }, function() { this.FCarry = this.registerD > 127, this.registerD = this.registerD << 1 & 255 | (this.FCarry ? 1 : 0), this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerD }, function() { this.FCarry = this.registerE > 127, this.registerE = this.registerE << 1 & 255 | (this.FCarry ? 1 : 0), this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerE }, function() { this.FCarry = this.registersHL > 32767, this.registersHL = this.registersHL << 1 & 65024 | (this.FCarry ? 256 : 0) | 255 & this.registersHL, this.FHalfCarry = this.FSubtract = !1, this.FZero = this.registersHL < 256 }, function() { this.FCarry = 128 == (128 & this.registersHL), this.registersHL = 65280 & this.registersHL | this.registersHL << 1 & 255 | (this.FCarry ? 1 : 0), this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 == (255 & this.registersHL) }, function() {
                    var t = this.memoryRead(this.registersHL);
                    this.FCarry = t > 127, t = t << 1 & 255 | (this.FCarry ? 1 : 0), this.memoryWriter[this.registersHL](this.registersHL, t), this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === t
                }, function() { this.FCarry = this.registerA > 127, this.registerA = this.registerA << 1 & 255 | (this.FCarry ? 1 : 0), this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerA }, function() { this.FCarry = 1 == (1 & this.registerB), this.registerB = (this.FCarry ? 128 : 0) | this.registerB >> 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerB }, function() { this.FCarry = 1 == (1 & this.registerC), this.registerC = (this.FCarry ? 128 : 0) | this.registerC >> 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerC }, function() { this.FCarry = 1 == (1 & this.registerD), this.registerD = (this.FCarry ? 128 : 0) | this.registerD >> 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerD }, function() { this.FCarry = 1 == (1 & this.registerE), this.registerE = (this.FCarry ? 128 : 0) | this.registerE >> 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerE }, function() { this.FCarry = 256 == (256 & this.registersHL), this.registersHL = (this.FCarry ? 32768 : 0) | this.registersHL >> 1 & 65280 | 255 & this.registersHL, this.FHalfCarry = this.FSubtract = !1, this.FZero = this.registersHL < 256 }, function() { this.FCarry = 1 == (1 & this.registersHL), this.registersHL = 65280 & this.registersHL | (this.FCarry ? 128 : 0) | (255 & this.registersHL) >> 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 == (255 & this.registersHL) }, function() {
                    var t = this.memoryRead(this.registersHL);
                    this.FCarry = 1 == (1 & t), t = (this.FCarry ? 128 : 0) | t >> 1, this.memoryWriter[this.registersHL](this.registersHL, t), this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === t
                }, function() { this.FCarry = 1 == (1 & this.registerA), this.registerA = (this.FCarry ? 128 : 0) | this.registerA >> 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerA }, function() {
                    var t = this.registerB > 127;
                    this.registerB = this.registerB << 1 & 255 | (this.FCarry ? 1 : 0), this.FCarry = t, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerB
                }, function() {
                    var t = this.registerC > 127;
                    this.registerC = this.registerC << 1 & 255 | (this.FCarry ? 1 : 0), this.FCarry = t, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerC
                }, function() {
                    var t = this.registerD > 127;
                    this.registerD = this.registerD << 1 & 255 | (this.FCarry ? 1 : 0), this.FCarry = t, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerD
                }, function() {
                    var t = this.registerE > 127;
                    this.registerE = this.registerE << 1 & 255 | (this.FCarry ? 1 : 0), this.FCarry = t, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerE
                }, function() {
                    var t = this.registersHL > 32767;
                    this.registersHL = this.registersHL << 1 & 65024 | (this.FCarry ? 256 : 0) | 255 & this.registersHL, this.FCarry = t, this.FHalfCarry = this.FSubtract = !1, this.FZero = this.registersHL < 256
                }, function() {
                    var t = 128 == (128 & this.registersHL);
                    this.registersHL = 65280 & this.registersHL | this.registersHL << 1 & 255 | (this.FCarry ? 1 : 0), this.FCarry = t, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 == (255 & this.registersHL)
                }, function() {
                    var t = this.memoryRead(this.registersHL),
                        e = t > 127;
                    t = t << 1 & 255 | (this.FCarry ? 1 : 0), this.FCarry = e, this.memoryWriter[this.registersHL](this.registersHL, t), this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === t
                }, function() {
                    var t = this.registerA > 127;
                    this.registerA = this.registerA << 1 & 255 | (this.FCarry ? 1 : 0), this.FCarry = t, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerA
                }, function() {
                    var t = 1 == (1 & this.registerB);
                    this.registerB = (this.FCarry ? 128 : 0) | this.registerB >> 1, this.FCarry = t, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerB
                }, function() {
                    var t = 1 == (1 & this.registerC);
                    this.registerC = (this.FCarry ? 128 : 0) | this.registerC >> 1, this.FCarry = t, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerC
                }, function() {
                    var t = 1 == (1 & this.registerD);
                    this.registerD = (this.FCarry ? 128 : 0) | this.registerD >> 1, this.FCarry = t, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerD
                }, function() {
                    var t = 1 == (1 & this.registerE);
                    this.registerE = (this.FCarry ? 128 : 0) | this.registerE >> 1, this.FCarry = t, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerE
                }, function() {
                    var t = 256 == (256 & this.registersHL);
                    this.registersHL = (this.FCarry ? 32768 : 0) | this.registersHL >> 1 & 65280 | 255 & this.registersHL, this.FCarry = t, this.FHalfCarry = this.FSubtract = !1, this.FZero = this.registersHL < 256
                }, function() {
                    var t = 1 == (1 & this.registersHL);
                    this.registersHL = 65280 & this.registersHL | (this.FCarry ? 128 : 0) | (255 & this.registersHL) >> 1, this.FCarry = t, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 == (255 & this.registersHL)
                }, function() {
                    var t = this.memoryRead(this.registersHL),
                        e = 1 == (1 & t);
                    t = (this.FCarry ? 128 : 0) | t >> 1, this.FCarry = e, this.memoryWriter[this.registersHL](this.registersHL, t), this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === t
                }, function() {
                    var t = 1 == (1 & this.registerA);
                    this.registerA = (this.FCarry ? 128 : 0) | this.registerA >> 1, this.FCarry = t, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerA
                }, function() { this.FCarry = this.registerB > 127, this.registerB = this.registerB << 1 & 255, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerB }, function() { this.FCarry = this.registerC > 127, this.registerC = this.registerC << 1 & 255, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerC }, function() { this.FCarry = this.registerD > 127, this.registerD = this.registerD << 1 & 255, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerD }, function() { this.FCarry = this.registerE > 127, this.registerE = this.registerE << 1 & 255, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerE }, function() { this.FCarry = this.registersHL > 32767, this.registersHL = this.registersHL << 1 & 65024 | 255 & this.registersHL, this.FHalfCarry = this.FSubtract = !1, this.FZero = this.registersHL < 256 }, function() { this.FCarry = 128 == (128 & this.registersHL), this.registersHL = 65280 & this.registersHL | this.registersHL << 1 & 255, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 == (255 & this.registersHL) }, function() {
                    var t = this.memoryRead(this.registersHL);
                    this.FCarry = t > 127, t = t << 1 & 255, this.memoryWriter[this.registersHL](this.registersHL, t), this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === t
                }, function() { this.FCarry = this.registerA > 127, this.registerA = this.registerA << 1 & 255, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerA }, function() { this.FCarry = 1 == (1 & this.registerB), this.registerB = 128 & this.registerB | this.registerB >> 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerB }, function() { this.FCarry = 1 == (1 & this.registerC), this.registerC = 128 & this.registerC | this.registerC >> 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerC }, function() { this.FCarry = 1 == (1 & this.registerD), this.registerD = 128 & this.registerD | this.registerD >> 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerD }, function() { this.FCarry = 1 == (1 & this.registerE), this.registerE = 128 & this.registerE | this.registerE >> 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerE }, function() { this.FCarry = 256 == (256 & this.registersHL), this.registersHL = this.registersHL >> 1 & 65280 | 33023 & this.registersHL, this.FHalfCarry = this.FSubtract = !1, this.FZero = this.registersHL < 256 }, function() { this.FCarry = 1 == (1 & this.registersHL), this.registersHL = 65408 & this.registersHL | (255 & this.registersHL) >> 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 == (255 & this.registersHL) }, function() {
                    var t = this.memoryRead(this.registersHL);
                    this.FCarry = 1 == (1 & t), t = 128 & t | t >> 1, this.memoryWriter[this.registersHL](this.registersHL, t), this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === t
                }, function() { this.FCarry = 1 == (1 & this.registerA), this.registerA = 128 & this.registerA | this.registerA >> 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerA }, function() { this.registerB = (15 & this.registerB) << 4 | this.registerB >> 4, this.FZero = 0 === this.registerB, this.FCarry = this.FHalfCarry = this.FSubtract = !1 }, function() { this.registerC = (15 & this.registerC) << 4 | this.registerC >> 4, this.FZero = 0 === this.registerC, this.FCarry = this.FHalfCarry = this.FSubtract = !1 }, function() { this.registerD = (15 & this.registerD) << 4 | this.registerD >> 4, this.FZero = 0 === this.registerD, this.FCarry = this.FHalfCarry = this.FSubtract = !1 }, function() { this.registerE = (15 & this.registerE) << 4 | this.registerE >> 4, this.FZero = 0 === this.registerE, this.FCarry = this.FHalfCarry = this.FSubtract = !1 }, function() { this.registersHL = (3840 & this.registersHL) << 4 | (61440 & this.registersHL) >> 4 | 255 & this.registersHL, this.FZero = this.registersHL < 256, this.FCarry = this.FHalfCarry = this.FSubtract = !1 }, function() { this.registersHL = 65280 & this.registersHL | (15 & this.registersHL) << 4 | (240 & this.registersHL) >> 4, this.FZero = 0 == (255 & this.registersHL), this.FCarry = this.FHalfCarry = this.FSubtract = !1 }, function() {
                    var t = this.memoryRead(this.registersHL);
                    t = (15 & t) << 4 | t >> 4, this.memoryWriter[this.registersHL](this.registersHL, t), this.FZero = 0 === t, this.FCarry = this.FHalfCarry = this.FSubtract = !1
                }, function() { this.registerA = (15 & this.registerA) << 4 | this.registerA >> 4, this.FZero = 0 === this.registerA, this.FCarry = this.FHalfCarry = this.FSubtract = !1 }, function() { this.FCarry = 1 == (1 & this.registerB), this.registerB >>= 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerB }, function() { this.FCarry = 1 == (1 & this.registerC), this.registerC >>= 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerC }, function() { this.FCarry = 1 == (1 & this.registerD), this.registerD >>= 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerD }, function() { this.FCarry = 1 == (1 & this.registerE), this.registerE >>= 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerE }, function() { this.FCarry = 256 == (256 & this.registersHL), this.registersHL = this.registersHL >> 1 & 65280 | 255 & this.registersHL, this.FHalfCarry = this.FSubtract = !1, this.FZero = this.registersHL < 256 }, function() { this.FCarry = 1 == (1 & this.registersHL), this.registersHL = 65280 & this.registersHL | (255 & this.registersHL) >> 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 == (255 & this.registersHL) }, function() {
                    var t = this.memoryRead(this.registersHL);
                    this.FCarry = 1 == (1 & t), this.memoryWriter[this.registersHL](this.registersHL, t >> 1), this.FHalfCarry = this.FSubtract = !1, this.FZero = t < 2
                }, function() { this.FCarry = 1 == (1 & this.registerA), this.registerA >>= 1, this.FHalfCarry = this.FSubtract = !1, this.FZero = 0 === this.registerA }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (1 & this.registerB) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (1 & this.registerC) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (1 & this.registerD) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (1 & this.registerE) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (256 & this.registersHL) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (1 & this.registersHL) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (1 & this.memoryRead(this.registersHL)) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (1 & this.registerA) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (2 & this.registerB) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (2 & this.registerC) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (2 & this.registerD) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (2 & this.registerE) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (512 & this.registersHL) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (2 & this.registersHL) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (2 & this.memoryRead(this.registersHL)) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (2 & this.registerA) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (4 & this.registerB) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (4 & this.registerC) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (4 & this.registerD) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (4 & this.registerE) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (1024 & this.registersHL) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (4 & this.registersHL) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (4 & this.memoryRead(this.registersHL)) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (4 & this.registerA) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (8 & this.registerB) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (8 & this.registerC) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (8 & this.registerD) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (8 & this.registerE) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (2048 & this.registersHL) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (8 & this.registersHL) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (8 & this.memoryRead(this.registersHL)) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (8 & this.registerA) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (16 & this.registerB) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (16 & this.registerC) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (16 & this.registerD) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (16 & this.registerE) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (4096 & this.registersHL) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (16 & this.registersHL) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (16 & this.memoryRead(this.registersHL)) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (16 & this.registerA) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (32 & this.registerB) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (32 & this.registerC) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (32 & this.registerD) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (32 & this.registerE) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (8192 & this.registersHL) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (32 & this.registersHL) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (32 & this.memoryRead(this.registersHL)) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (32 & this.registerA) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (64 & this.registerB) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (64 & this.registerC) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (64 & this.registerD) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (64 & this.registerE) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (16384 & this.registersHL) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (64 & this.registersHL) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (64 & this.memoryRead(this.registersHL)) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (64 & this.registerA) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (128 & this.registerB) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (128 & this.registerC) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (128 & this.registerD) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (128 & this.registerE) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (32768 & this.registersHL) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (128 & this.registersHL) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (128 & this.memoryRead(this.registersHL)) }, function() { this.FHalfCarry = !0, this.FSubtract = !1, this.FZero = 0 == (128 & this.registerA) }, function() { this.registerB &= 254 }, function() { this.registerC &= 254 }, function() { this.registerD &= 254 }, function() { this.registerE &= 254 }, function() { this.registersHL &= 65279 }, function() { this.registersHL &= 65534 }, function() { this.memoryWriter[this.registersHL](this.registersHL, 254 & this.memoryRead(this.registersHL)) }, function() { this.registerA &= 254 }, function() { this.registerB &= 253 }, function() { this.registerC &= 253 }, function() { this.registerD &= 253 }, function() { this.registerE &= 253 }, function() { this.registersHL &= 65023 }, function() { this.registersHL &= 65533 }, function() { this.memoryWriter[this.registersHL](this.registersHL, 253 & this.memoryRead(this.registersHL)) }, function() { this.registerA &= 253 }, function() { this.registerB &= 251 }, function() { this.registerC &= 251 }, function() { this.registerD &= 251 }, function() { this.registerE &= 251 }, function() { this.registersHL &= 64511 }, function() { this.registersHL &= 65531 }, function() { this.memoryWriter[this.registersHL](this.registersHL, 251 & this.memoryRead(this.registersHL)) }, function() { this.registerA &= 251 }, function() { this.registerB &= 247 }, function() { this.registerC &= 247 }, function() { this.registerD &= 247 }, function() { this.registerE &= 247 }, function() { this.registersHL &= 63487 }, function() { this.registersHL &= 65527 }, function() { this.memoryWriter[this.registersHL](this.registersHL, 247 & this.memoryRead(this.registersHL)) }, function() { this.registerA &= 247 }, function() { this.registerB &= 239 }, function() { this.registerC &= 239 }, function() { this.registerD &= 239 }, function() { this.registerE &= 239 }, function() { this.registersHL &= 61439 }, function() { this.registersHL &= 65519 }, function() { this.memoryWriter[this.registersHL](this.registersHL, 239 & this.memoryRead(this.registersHL)) }, function() { this.registerA &= 239 }, function() { this.registerB &= 223 }, function() { this.registerC &= 223 }, function() { this.registerD &= 223 }, function() { this.registerE &= 223 }, function() { this.registersHL &= 57343 }, function() { this.registersHL &= 65503 }, function() { this.memoryWriter[this.registersHL](this.registersHL, 223 & this.memoryRead(this.registersHL)) }, function() { this.registerA &= 223 }, function() { this.registerB &= 191 }, function() { this.registerC &= 191 }, function() { this.registerD &= 191 }, function() { this.registerE &= 191 }, function() { this.registersHL &= 49151 }, function() { this.registersHL &= 65471 }, function() { this.memoryWriter[this.registersHL](this.registersHL, 191 & this.memoryRead(this.registersHL)) }, function() { this.registerA &= 191 }, function() { this.registerB &= 127 }, function() { this.registerC &= 127 }, function() { this.registerD &= 127 }, function() { this.registerE &= 127 }, function() { this.registersHL &= 32767 }, function() { this.registersHL &= 65407 }, function() { this.memoryWriter[this.registersHL](this.registersHL, 127 & this.memoryRead(this.registersHL)) }, function() { this.registerA &= 127 }, function() { this.registerB |= 1 }, function() { this.registerC |= 1 }, function() { this.registerD |= 1 }, function() { this.registerE |= 1 }, function() { this.registersHL |= 256 }, function() { this.registersHL |= 1 }, function() { this.memoryWriter[this.registersHL](this.registersHL, 1 | this.memoryRead(this.registersHL)) }, function() { this.registerA |= 1 }, function() { this.registerB |= 2 }, function() { this.registerC |= 2 }, function() { this.registerD |= 2 }, function() { this.registerE |= 2 }, function() { this.registersHL |= 512 }, function() { this.registersHL |= 2 }, function() { this.memoryWriter[this.registersHL](this.registersHL, 2 | this.memoryRead(this.registersHL)) }, function() { this.registerA |= 2 }, function() { this.registerB |= 4 }, function() { this.registerC |= 4 }, function() { this.registerD |= 4 }, function() { this.registerE |= 4 }, function() { this.registersHL |= 1024 }, function() { this.registersHL |= 4 }, function() { this.memoryWriter[this.registersHL](this.registersHL, 4 | this.memoryRead(this.registersHL)) }, function() { this.registerA |= 4 }, function() { this.registerB |= 8 }, function() { this.registerC |= 8 }, function() { this.registerD |= 8 }, function() { this.registerE |= 8 }, function() { this.registersHL |= 2048 }, function() { this.registersHL |= 8 }, function() { this.memoryWriter[this.registersHL](this.registersHL, 8 | this.memoryRead(this.registersHL)) }, function() { this.registerA |= 8 }, function() { this.registerB |= 16 }, function() { this.registerC |= 16 }, function() { this.registerD |= 16 }, function() { this.registerE |= 16 }, function() { this.registersHL |= 4096 }, function() { this.registersHL |= 16 }, function() { this.memoryWriter[this.registersHL](this.registersHL, 16 | this.memoryRead(this.registersHL)) }, function() { this.registerA |= 16 }, function() { this.registerB |= 32 }, function() { this.registerC |= 32 }, function() { this.registerD |= 32 }, function() { this.registerE |= 32 }, function() { this.registersHL |= 8192 }, function() { this.registersHL |= 32 }, function() { this.memoryWriter[this.registersHL](this.registersHL, 32 | this.memoryRead(this.registersHL)) }, function() { this.registerA |= 32 }, function() { this.registerB |= 64 }, function() { this.registerC |= 64 }, function() { this.registerD |= 64 }, function() { this.registerE |= 64 }, function() { this.registersHL |= 16384 }, function() { this.registersHL |= 64 }, function() { this.memoryWriter[this.registersHL](this.registersHL, 64 | this.memoryRead(this.registersHL)) }, function() { this.registerA |= 64 }, function() { this.registerB |= 128 }, function() { this.registerC |= 128 }, function() { this.registerD |= 128 }, function() { this.registerE |= 128 }, function() { this.registersHL |= 32768 }, function() { this.registersHL |= 128 }, function() { this.memoryWriter[this.registersHL](this.registersHL, 128 | this.memoryRead(this.registersHL)) }, function() { this.registerA |= 128 }],
                q = [8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 12, 8, 8, 8, 8, 8, 8, 8, 12, 8, 8, 8, 8, 8, 8, 8, 12, 8, 8, 8, 8, 8, 8, 8, 12, 8, 8, 8, 8, 8, 8, 8, 12, 8, 8, 8, 8, 8, 8, 8, 12, 8, 8, 8, 8, 8, 8, 8, 12, 8, 8, 8, 8, 8, 8, 8, 12, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 8],
                Z = [() => {}, function() { this.registerC = this.memoryRead(this.programCounter), this.registerB = this.memoryRead(this.programCounter + 1 & 65535), this.programCounter = this.programCounter + 2 & 65535 }, function() { this.memoryWrite(this.registerB << 8 | this.registerC, this.registerA) }, function() {
                    var t = 1 + (this.registerB << 8 | this.registerC);
                    this.registerB = t >> 8 & 255, this.registerC = 255 & t
                }, function() { this.registerB = this.registerB + 1 & 255, this.FZero = 0 === this.registerB, this.FHalfCarry = 0 == (15 & this.registerB), this.FSubtract = !1 }, function() { this.registerB = this.registerB - 1 & 255, this.FZero = 0 === this.registerB, this.FHalfCarry = 15 == (15 & this.registerB), this.FSubtract = !0 }, function() { this.registerB = this.memoryRead(this.programCounter), this.programCounter = this.programCounter + 1 & 65535 }, function() { this.FCarry = this.registerA > 127, this.registerA = this.registerA << 1 & 255 | this.registerA >> 7, this.FZero = this.FSubtract = this.FHalfCarry = !1 }, function() {
                    var t = this.memoryRead(this.programCounter + 1 & 65535) << 8 | this.memoryRead(this.programCounter);
                    this.programCounter = this.programCounter + 2 & 65535, this.memoryWrite(t, 255 & this.stackPointer), this.memoryWrite(t + 1 & 65535, this.stackPointer >> 8)
                }, function() {
                    var t = this.registersHL + (this.registerB << 8 | this.registerC);
                    this.FHalfCarry = (4095 & this.registersHL) > (4095 & t), this.FCarry = t > 65535, this.registersHL = 65535 & t, this.FSubtract = !1
                }, function() { this.registerA = this.memoryRead(this.registerB << 8 | this.registerC) }, function() {
                    var t = (this.registerB << 8 | this.registerC) - 1 & 65535;
                    this.registerB = t >> 8, this.registerC = 255 & t
                }, function() { this.registerC = this.registerC + 1 & 255, this.FZero = 0 === this.registerC, this.FHalfCarry = 0 == (15 & this.registerC), this.FSubtract = !1 }, function() { this.registerC = this.registerC - 1 & 255, this.FZero = 0 === this.registerC, this.FHalfCarry = 15 == (15 & this.registerC), this.FSubtract = !0 }, function() { this.registerC = this.memoryRead(this.programCounter), this.programCounter = this.programCounter + 1 & 65535 }, function() { this.registerA = this.registerA >> 1 | (1 & this.registerA) << 7, this.FCarry = this.registerA > 127, this.FZero = this.FSubtract = this.FHalfCarry = !1 }, function() { this.cartridge.useGBCMode && 1 == (1 & this.memory[65357]) ? (this.memory[65357] > 127 ? (console.log("Going into single clock speed mode."), this.doubleSpeedShifter = 0, this.memory[65357] &= 127) : (console.log("Going into double clock speed mode."), this.doubleSpeedShifter = 1, this.memory[65357] |= 128), this.memory[65357] &= 254) : this.handleSTOP() }, function() { this.registerE = this.memoryRead(this.programCounter), this.registerD = this.memoryRead(this.programCounter + 1 & 65535), this.programCounter = this.programCounter + 2 & 65535 }, function() { this.memoryWrite(this.registerD << 8 | this.registerE, this.registerA) }, function() {
                    var t = 1 + (this.registerD << 8 | this.registerE);
                    this.registerD = t >> 8 & 255, this.registerE = 255 & t
                }, function() { this.registerD = this.registerD + 1 & 255, this.FZero = 0 === this.registerD, this.FHalfCarry = 0 == (15 & this.registerD), this.FSubtract = !1 }, function() { this.registerD = this.registerD - 1 & 255, this.FZero = 0 === this.registerD, this.FHalfCarry = 15 == (15 & this.registerD), this.FSubtract = !0 }, function() { this.registerD = this.memoryRead(this.programCounter), this.programCounter = this.programCounter + 1 & 65535 }, function() {
                    var t = this.FCarry ? 1 : 0;
                    this.FCarry = this.registerA > 127, this.registerA = this.registerA << 1 & 255 | t, this.FZero = this.FSubtract = this.FHalfCarry = !1
                }, function() { this.programCounter = this.programCounter + (this.memoryRead(this.programCounter) << 24 >> 24) + 1 & 65535 }, function() {
                    var t = this.registersHL + (this.registerD << 8 | this.registerE);
                    this.FHalfCarry = (4095 & this.registersHL) > (4095 & t), this.FCarry = t > 65535, this.registersHL = 65535 & t, this.FSubtract = !1
                }, function() { this.registerA = this.memoryRead(this.registerD << 8 | this.registerE) }, function() {
                    var t = (this.registerD << 8 | this.registerE) - 1 & 65535;
                    this.registerD = t >> 8, this.registerE = 255 & t
                }, function() { this.registerE = this.registerE + 1 & 255, this.FZero = 0 === this.registerE, this.FHalfCarry = 0 == (15 & this.registerE), this.FSubtract = !1 }, function() { this.registerE = this.registerE - 1 & 255, this.FZero = 0 === this.registerE, this.FHalfCarry = 15 == (15 & this.registerE), this.FSubtract = !0 }, function() { this.registerE = this.memoryRead(this.programCounter), this.programCounter = this.programCounter + 1 & 65535 }, function() {
                    var t = this.FCarry ? 128 : 0;
                    this.FCarry = 1 == (1 & this.registerA), this.registerA = this.registerA >> 1 | t, this.FZero = this.FSubtract = this.FHalfCarry = !1
                }, function() { this.FZero ? this.programCounter = this.programCounter + 1 & 65535 : (this.programCounter = this.programCounter + (this.memoryRead(this.programCounter) << 24 >> 24) + 1 & 65535, this.CPUTicks += 4) }, function() { this.registersHL = this.memoryRead(this.programCounter + 1 & 65535) << 8 | this.memoryRead(this.programCounter), this.programCounter = this.programCounter + 2 & 65535 }, function() { this.memoryWriter[this.registersHL].apply(this, [this.registersHL, this.registerA]), this.registersHL = this.registersHL + 1 & 65535 }, function() { this.registersHL = this.registersHL + 1 & 65535 }, function() {
                    var t = 1 + (this.registersHL >> 8) & 255;
                    this.FZero = 0 === t, this.FHalfCarry = 0 == (15 & t), this.FSubtract = !1, this.registersHL = t << 8 | 255 & this.registersHL
                }, function() {
                    var t = (this.registersHL >> 8) - 1 & 255;
                    this.FZero = 0 === t, this.FHalfCarry = 15 == (15 & t), this.FSubtract = !0, this.registersHL = t << 8 | 255 & this.registersHL
                }, function() { this.registersHL = this.memoryRead(this.programCounter) << 8 | 255 & this.registersHL, this.programCounter = this.programCounter + 1 & 65535 }, function() { this.FSubtract ? this.FCarry && this.FHalfCarry ? (this.registerA = this.registerA + 154 & 255, this.FHalfCarry = !1) : this.FCarry ? this.registerA = this.registerA + 160 & 255 : this.FHalfCarry && (this.registerA = this.registerA + 250 & 255, this.FHalfCarry = !1) : ((this.FCarry || this.registerA > 153) && (this.registerA = this.registerA + 96 & 255, this.FCarry = !0), (this.FHalfCarry || (15 & this.registerA) > 9) && (this.registerA = this.registerA + 6 & 255, this.FHalfCarry = !1)), this.FZero = 0 === this.registerA }, function() { this.FZero ? (this.programCounter = this.programCounter + (this.memoryRead(this.programCounter) << 24 >> 24) + 1 & 65535, this.CPUTicks += 4) : this.programCounter = this.programCounter + 1 & 65535 }, function() { this.FHalfCarry = (4095 & this.registersHL) > 2047, this.FCarry = this.registersHL > 32767, this.registersHL = this.registersHL << 1 & 65535, this.FSubtract = !1 }, function() { this.registerA = this.memoryRead(this.registersHL), this.registersHL = this.registersHL + 1 & 65535 }, function() { this.registersHL = this.registersHL - 1 & 65535 }, function() {
                    var t = this.registersHL + 1 & 255;
                    this.FZero = 0 === t, this.FHalfCarry = 0 == (15 & t), this.FSubtract = !1, this.registersHL = 65280 & this.registersHL | t
                }, function() {
                    var t = this.registersHL - 1 & 255;
                    this.FZero = 0 === t, this.FHalfCarry = 15 == (15 & t), this.FSubtract = !0, this.registersHL = 65280 & this.registersHL | t
                }, function() { this.registersHL = 65280 & this.registersHL | this.memoryRead(this.programCounter), this.programCounter = this.programCounter + 1 & 65535 }, function() { this.registerA ^= 255, this.FSubtract = this.FHalfCarry = !0 }, function() { this.FCarry ? this.programCounter = this.programCounter + 1 & 65535 : (this.programCounter = this.programCounter + (this.memoryRead(this.programCounter) << 24 >> 24) + 1 & 65535, this.CPUTicks += 4) }, function() { this.stackPointer = this.memoryRead(this.programCounter + 1 & 65535) << 8 | this.memoryRead(this.programCounter), this.programCounter = this.programCounter + 2 & 65535 }, function() { this.memoryWriter[this.registersHL].apply(this, [this.registersHL, this.registerA]), this.registersHL = this.registersHL - 1 & 65535 }, function() { this.stackPointer = this.stackPointer + 1 & 65535 }, function() {
                    var t = this.memoryRead(this.registersHL) + 1 & 255;
                    this.FZero = 0 === t, this.FHalfCarry = 0 == (15 & t), this.FSubtract = !1, this.memoryWriter[this.registersHL].apply(this, [this.registersHL, t])
                }, function() {
                    var t = this.memoryRead(this.registersHL) - 1 & 255;
                    this.FZero = 0 === t, this.FHalfCarry = 15 == (15 & t), this.FSubtract = !0, this.memoryWriter[this.registersHL].apply(this, [this.registersHL, t])
                }, function() { this.memoryWriter[this.registersHL].apply(this, [this.registersHL, this.memoryRead(this.programCounter)]), this.programCounter = this.programCounter + 1 & 65535 }, function() { this.FCarry = !0, this.FSubtract = this.FHalfCarry = !1 }, function() { this.FCarry ? (this.programCounter = this.programCounter + (this.memoryRead(this.programCounter) << 24 >> 24) + 1 & 65535, this.CPUTicks += 4) : this.programCounter = this.programCounter + 1 & 65535 }, function() {
                    var t = this.registersHL + this.stackPointer;
                    this.FHalfCarry = (4095 & this.registersHL) > (4095 & t), this.FCarry = t > 65535, this.registersHL = 65535 & t, this.FSubtract = !1
                }, function() { this.registerA = this.memoryRead(this.registersHL), this.registersHL = this.registersHL - 1 & 65535 }, function() { this.stackPointer = this.stackPointer - 1 & 65535 }, function() { this.registerA = this.registerA + 1 & 255, this.FZero = 0 === this.registerA, this.FHalfCarry = 0 == (15 & this.registerA), this.FSubtract = !1 }, function() { this.registerA = this.registerA - 1 & 255, this.FZero = 0 === this.registerA, this.FHalfCarry = 15 == (15 & this.registerA), this.FSubtract = !0 }, function() { this.registerA = this.memoryRead(this.programCounter), this.programCounter = this.programCounter + 1 & 65535 }, function() { this.FCarry = !this.FCarry, this.FSubtract = this.FHalfCarry = !1 }, function() {}, function() { this.registerB = this.registerC }, function() { this.registerB = this.registerD }, function() { this.registerB = this.registerE }, function() { this.registerB = this.registersHL >> 8 }, function() { this.registerB = 255 & this.registersHL }, function() { this.registerB = this.memoryRead(this.registersHL) }, function() { this.registerB = this.registerA }, function() { this.registerC = this.registerB }, function() {}, function() { this.registerC = this.registerD }, function() { this.registerC = this.registerE }, function() { this.registerC = this.registersHL >> 8 }, function() { this.registerC = 255 & this.registersHL }, function() { this.registerC = this.memoryRead(this.registersHL) }, function() { this.registerC = this.registerA }, function() { this.registerD = this.registerB }, function() { this.registerD = this.registerC }, function() {}, function() { this.registerD = this.registerE }, function() { this.registerD = this.registersHL >> 8 }, function() { this.registerD = 255 & this.registersHL }, function() { this.registerD = this.memoryRead(this.registersHL) }, function() { this.registerD = this.registerA }, function() { this.registerE = this.registerB }, function() { this.registerE = this.registerC }, function() { this.registerE = this.registerD }, function() {}, function() { this.registerE = this.registersHL >> 8 }, function() { this.registerE = 255 & this.registersHL }, function() { this.registerE = this.memoryRead(this.registersHL) }, function() { this.registerE = this.registerA }, function() { this.registersHL = this.registerB << 8 | 255 & this.registersHL }, function() { this.registersHL = this.registerC << 8 | 255 & this.registersHL }, function() { this.registersHL = this.registerD << 8 | 255 & this.registersHL }, function() { this.registersHL = this.registerE << 8 | 255 & this.registersHL }, function() {}, function() { this.registersHL = 257 * (255 & this.registersHL) }, function() { this.registersHL = this.memoryRead(this.registersHL) << 8 | 255 & this.registersHL }, function() { this.registersHL = this.registerA << 8 | 255 & this.registersHL }, function() { this.registersHL = 65280 & this.registersHL | this.registerB }, function() { this.registersHL = 65280 & this.registersHL | this.registerC }, function() { this.registersHL = 65280 & this.registersHL | this.registerD }, function() { this.registersHL = 65280 & this.registersHL | this.registerE }, function() { this.registersHL = 65280 & this.registersHL | this.registersHL >> 8 }, function() {}, function() { this.registersHL = 65280 & this.registersHL | this.memoryRead(this.registersHL) }, function() { this.registersHL = 65280 & this.registersHL | this.registerA }, function() { this.memoryWriter[this.registersHL].apply(this, [this.registersHL, this.registerB]) }, function() { this.memoryWriter[this.registersHL].apply(this, [this.registersHL, this.registerC]) }, function() { this.memoryWriter[this.registersHL].apply(this, [this.registersHL, this.registerD]) }, function() { this.memoryWriter[this.registersHL].apply(this, [this.registersHL, this.registerE]) }, function() { this.memoryWriter[this.registersHL].apply(this, [this.registersHL, this.registersHL >> 8]) }, function() { this.memoryWriter[this.registersHL].apply(this, [this.registersHL, 255 & this.registersHL]) }, function() {
                    (this.interruptsEnabled & this.interruptsRequested & 31) > 0 ? this.cartridge.useGBCMode || this.usedBootROM ? this.CPUTicks += 4 : this.skipPCIncrement = !0 : this.calculateHALTPeriod()
                }, function() { this.memoryWriter[this.registersHL].apply(this, [this.registersHL, this.registerA]) }, function() { this.registerA = this.registerB }, function() { this.registerA = this.registerC }, function() { this.registerA = this.registerD }, function() { this.registerA = this.registerE }, function() { this.registerA = this.registersHL >> 8 }, function() { this.registerA = 255 & this.registersHL }, function() { this.registerA = this.memoryRead(this.registersHL) }, function() {}, function() {
                    var t = this.registerA + this.registerB;
                    this.FHalfCarry = (15 & t) < (15 & this.registerA), this.FCarry = t > 255, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !1
                }, function() {
                    var t = this.registerA + this.registerC;
                    this.FHalfCarry = (15 & t) < (15 & this.registerA), this.FCarry = t > 255, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !1
                }, function() {
                    var t = this.registerA + this.registerD;
                    this.FHalfCarry = (15 & t) < (15 & this.registerA), this.FCarry = t > 255, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !1
                }, function() {
                    var t = this.registerA + this.registerE;
                    this.FHalfCarry = (15 & t) < (15 & this.registerA), this.FCarry = t > 255, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !1
                }, function() {
                    var t = this.registerA + (this.registersHL >> 8);
                    this.FHalfCarry = (15 & t) < (15 & this.registerA), this.FCarry = t > 255, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !1
                }, function() {
                    var t = this.registerA + (255 & this.registersHL);
                    this.FHalfCarry = (15 & t) < (15 & this.registerA), this.FCarry = t > 255, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !1
                }, function() {
                    var t = this.registerA + this.memoryRead(this.registersHL);
                    this.FHalfCarry = (15 & t) < (15 & this.registerA), this.FCarry = t > 255, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !1
                }, function() { this.FHalfCarry = 8 == (8 & this.registerA), this.FCarry = this.registerA > 127, this.registerA = this.registerA << 1 & 255, this.FZero = 0 === this.registerA, this.FSubtract = !1 }, function() {
                    var t = this.registerA + this.registerB + (this.FCarry ? 1 : 0);
                    this.FHalfCarry = (15 & this.registerA) + (15 & this.registerB) + (this.FCarry ? 1 : 0) > 15, this.FCarry = t > 255, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !1
                }, function() {
                    var t = this.registerA + this.registerC + (this.FCarry ? 1 : 0);
                    this.FHalfCarry = (15 & this.registerA) + (15 & this.registerC) + (this.FCarry ? 1 : 0) > 15, this.FCarry = t > 255, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !1
                }, function() {
                    var t = this.registerA + this.registerD + (this.FCarry ? 1 : 0);
                    this.FHalfCarry = (15 & this.registerA) + (15 & this.registerD) + (this.FCarry ? 1 : 0) > 15, this.FCarry = t > 255, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !1
                }, function() {
                    var t = this.registerA + this.registerE + (this.FCarry ? 1 : 0);
                    this.FHalfCarry = (15 & this.registerA) + (15 & this.registerE) + (this.FCarry ? 1 : 0) > 15, this.FCarry = t > 255, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !1
                }, function() {
                    var t = this.registersHL >> 8,
                        e = this.registerA + t + (this.FCarry ? 1 : 0);
                    this.FHalfCarry = (15 & this.registerA) + (15 & t) + (this.FCarry ? 1 : 0) > 15, this.FCarry = e > 255, this.registerA = 255 & e, this.FZero = 0 === this.registerA, this.FSubtract = !1
                }, function() {
                    var t = 255 & this.registersHL,
                        e = this.registerA + t + (this.FCarry ? 1 : 0);
                    this.FHalfCarry = (15 & this.registerA) + (15 & t) + (this.FCarry ? 1 : 0) > 15, this.FCarry = e > 255, this.registerA = 255 & e, this.FZero = 0 === this.registerA, this.FSubtract = !1
                }, function() {
                    var t = this.memoryRead(this.registersHL),
                        e = this.registerA + t + (this.FCarry ? 1 : 0);
                    this.FHalfCarry = (15 & this.registerA) + (15 & t) + (this.FCarry ? 1 : 0) > 15, this.FCarry = e > 255, this.registerA = 255 & e, this.FZero = 0 === this.registerA, this.FSubtract = !1
                }, function() {
                    var t = this.registerA << 1 | (this.FCarry ? 1 : 0);
                    this.FHalfCarry = (this.registerA << 1 & 30 | (this.FCarry ? 1 : 0)) > 15, this.FCarry = t > 255, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !1
                }, function() {
                    var t = this.registerA - this.registerB;
                    this.FHalfCarry = (15 & this.registerA) < (15 & t), this.FCarry = t < 0, this.registerA = 255 & t, this.FZero = 0 === t, this.FSubtract = !0
                }, function() {
                    var t = this.registerA - this.registerC;
                    this.FHalfCarry = (15 & this.registerA) < (15 & t), this.FCarry = t < 0, this.registerA = 255 & t, this.FZero = 0 === t, this.FSubtract = !0
                }, function() {
                    var t = this.registerA - this.registerD;
                    this.FHalfCarry = (15 & this.registerA) < (15 & t), this.FCarry = t < 0, this.registerA = 255 & t, this.FZero = 0 === t, this.FSubtract = !0
                }, function() {
                    var t = this.registerA - this.registerE;
                    this.FHalfCarry = (15 & this.registerA) < (15 & t), this.FCarry = t < 0, this.registerA = 255 & t, this.FZero = 0 === t, this.FSubtract = !0
                }, function() {
                    var t = this.registerA - (this.registersHL >> 8);
                    this.FHalfCarry = (15 & this.registerA) < (15 & t), this.FCarry = t < 0, this.registerA = 255 & t, this.FZero = 0 === t, this.FSubtract = !0
                }, function() {
                    var t = this.registerA - (255 & this.registersHL);
                    this.FHalfCarry = (15 & this.registerA) < (15 & t), this.FCarry = t < 0, this.registerA = 255 & t, this.FZero = 0 === t, this.FSubtract = !0
                }, function() {
                    var t = this.registerA - this.memoryRead(this.registersHL);
                    this.FHalfCarry = (15 & this.registerA) < (15 & t), this.FCarry = t < 0, this.registerA = 255 & t, this.FZero = 0 === t, this.FSubtract = !0
                }, function() { this.registerA = 0, this.FHalfCarry = this.FCarry = !1, this.FZero = this.FSubtract = !0 }, function() {
                    var t = this.registerA - this.registerB - (this.FCarry ? 1 : 0);
                    this.FHalfCarry = (15 & this.registerA) - (15 & this.registerB) - (this.FCarry ? 1 : 0) < 0, this.FCarry = t < 0, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !0
                }, function() {
                    var t = this.registerA - this.registerC - (this.FCarry ? 1 : 0);
                    this.FHalfCarry = (15 & this.registerA) - (15 & this.registerC) - (this.FCarry ? 1 : 0) < 0, this.FCarry = t < 0, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !0
                }, function() {
                    var t = this.registerA - this.registerD - (this.FCarry ? 1 : 0);
                    this.FHalfCarry = (15 & this.registerA) - (15 & this.registerD) - (this.FCarry ? 1 : 0) < 0, this.FCarry = t < 0, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !0
                }, function() {
                    var t = this.registerA - this.registerE - (this.FCarry ? 1 : 0);
                    this.FHalfCarry = (15 & this.registerA) - (15 & this.registerE) - (this.FCarry ? 1 : 0) < 0, this.FCarry = t < 0, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !0
                }, function() {
                    var t = this.registersHL >> 8,
                        e = this.registerA - t - (this.FCarry ? 1 : 0);
                    this.FHalfCarry = (15 & this.registerA) - (15 & t) - (this.FCarry ? 1 : 0) < 0, this.FCarry = e < 0, this.registerA = 255 & e, this.FZero = 0 === this.registerA, this.FSubtract = !0
                }, function() {
                    var t = this.registerA - (255 & this.registersHL) - (this.FCarry ? 1 : 0);
                    this.FHalfCarry = (15 & this.registerA) - (15 & this.registersHL) - (this.FCarry ? 1 : 0) < 0, this.FCarry = t < 0, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !0
                }, function() {
                    var t = this.memoryRead(this.registersHL),
                        e = this.registerA - t - (this.FCarry ? 1 : 0);
                    this.FHalfCarry = (15 & this.registerA) - (15 & t) - (this.FCarry ? 1 : 0) < 0, this.FCarry = e < 0, this.registerA = 255 & e, this.FZero = 0 === this.registerA, this.FSubtract = !0
                }, function() { this.FCarry ? (this.FZero = !1, this.FSubtract = this.FHalfCarry = this.FCarry = !0, this.registerA = 255) : (this.FHalfCarry = this.FCarry = !1, this.FSubtract = this.FZero = !0, this.registerA = 0) }, function() { this.registerA &= this.registerB, this.FZero = 0 === this.registerA, this.FHalfCarry = !0, this.FSubtract = this.FCarry = !1 }, function() { this.registerA &= this.registerC, this.FZero = 0 === this.registerA, this.FHalfCarry = !0, this.FSubtract = this.FCarry = !1 }, function() { this.registerA &= this.registerD, this.FZero = 0 === this.registerA, this.FHalfCarry = !0, this.FSubtract = this.FCarry = !1 }, function() { this.registerA &= this.registerE, this.FZero = 0 === this.registerA, this.FHalfCarry = !0, this.FSubtract = this.FCarry = !1 }, function() { this.registerA &= this.registersHL >> 8, this.FZero = 0 === this.registerA, this.FHalfCarry = !0, this.FSubtract = this.FCarry = !1 }, function() { this.registerA &= this.registersHL, this.FZero = 0 === this.registerA, this.FHalfCarry = !0, this.FSubtract = this.FCarry = !1 }, function() { this.registerA &= this.memoryRead(this.registersHL), this.FZero = 0 === this.registerA, this.FHalfCarry = !0, this.FSubtract = this.FCarry = !1 }, function() { this.FZero = 0 === this.registerA, this.FHalfCarry = !0, this.FSubtract = this.FCarry = !1 }, function() { this.registerA ^= this.registerB, this.FZero = 0 === this.registerA, this.FSubtract = this.FHalfCarry = this.FCarry = !1 }, function() { this.registerA ^= this.registerC, this.FZero = 0 === this.registerA, this.FSubtract = this.FHalfCarry = this.FCarry = !1 }, function() { this.registerA ^= this.registerD, this.FZero = 0 === this.registerA, this.FSubtract = this.FHalfCarry = this.FCarry = !1 }, function() { this.registerA ^= this.registerE, this.FZero = 0 === this.registerA, this.FSubtract = this.FHalfCarry = this.FCarry = !1 }, function() { this.registerA ^= this.registersHL >> 8, this.FZero = 0 === this.registerA, this.FSubtract = this.FHalfCarry = this.FCarry = !1 }, function() { this.registerA ^= 255 & this.registersHL, this.FZero = 0 === this.registerA, this.FSubtract = this.FHalfCarry = this.FCarry = !1 }, function() { this.registerA ^= this.memoryRead(this.registersHL), this.FZero = 0 === this.registerA, this.FSubtract = this.FHalfCarry = this.FCarry = !1 }, function() { this.registerA = 0, this.FZero = !0, this.FSubtract = this.FHalfCarry = this.FCarry = !1 }, function() { this.registerA |= this.registerB, this.FZero = 0 === this.registerA, this.FSubtract = this.FCarry = this.FHalfCarry = !1 }, function() { this.registerA |= this.registerC, this.FZero = 0 === this.registerA, this.FSubtract = this.FCarry = this.FHalfCarry = !1 }, function() { this.registerA |= this.registerD, this.FZero = 0 === this.registerA, this.FSubtract = this.FCarry = this.FHalfCarry = !1 }, function() { this.registerA |= this.registerE, this.FZero = 0 === this.registerA, this.FSubtract = this.FCarry = this.FHalfCarry = !1 }, function() { this.registerA |= this.registersHL >> 8, this.FZero = 0 === this.registerA, this.FSubtract = this.FCarry = this.FHalfCarry = !1 }, function() { this.registerA |= 255 & this.registersHL, this.FZero = 0 === this.registerA, this.FSubtract = this.FCarry = this.FHalfCarry = !1 }, function() { this.registerA |= this.memoryRead(this.registersHL), this.FZero = 0 === this.registerA, this.FSubtract = this.FCarry = this.FHalfCarry = !1 }, function() { this.FZero = 0 === this.registerA, this.FSubtract = this.FCarry = this.FHalfCarry = !1 }, function() {
                    var t = this.registerA - this.registerB;
                    this.FHalfCarry = (15 & t) > (15 & this.registerA), this.FCarry = t < 0, this.FZero = 0 === t, this.FSubtract = !0
                }, function() {
                    var t = this.registerA - this.registerC;
                    this.FHalfCarry = (15 & t) > (15 & this.registerA), this.FCarry = t < 0, this.FZero = 0 === t, this.FSubtract = !0
                }, function() {
                    var t = this.registerA - this.registerD;
                    this.FHalfCarry = (15 & t) > (15 & this.registerA), this.FCarry = t < 0, this.FZero = 0 === t, this.FSubtract = !0
                }, function() {
                    var t = this.registerA - this.registerE;
                    this.FHalfCarry = (15 & t) > (15 & this.registerA), this.FCarry = t < 0, this.FZero = 0 === t, this.FSubtract = !0
                }, function() {
                    var t = this.registerA - (this.registersHL >> 8);
                    this.FHalfCarry = (15 & t) > (15 & this.registerA), this.FCarry = t < 0, this.FZero = 0 === t, this.FSubtract = !0
                }, function() {
                    var t = this.registerA - (255 & this.registersHL);
                    this.FHalfCarry = (15 & t) > (15 & this.registerA), this.FCarry = t < 0, this.FZero = 0 === t, this.FSubtract = !0
                }, function() {
                    var t = this.registerA - this.memoryRead(this.registersHL);
                    this.FHalfCarry = (15 & t) > (15 & this.registerA), this.FCarry = t < 0, this.FZero = 0 === t, this.FSubtract = !0
                }, function() { this.FHalfCarry = this.FCarry = !1, this.FZero = this.FSubtract = !0 }, function() { this.FZero || (this.programCounter = this.memoryRead(this.stackPointer + 1 & 65535) << 8 | this.memoryRead(this.stackPointer), this.stackPointer = this.stackPointer + 2 & 65535, this.CPUTicks += 12) }, function() { this.registerC = this.memoryRead(this.stackPointer), this.registerB = this.memoryRead(this.stackPointer + 1 & 65535), this.stackPointer = this.stackPointer + 2 & 65535 }, function() { this.FZero ? this.programCounter = this.programCounter + 2 & 65535 : (this.programCounter = this.memoryRead(this.programCounter + 1 & 65535) << 8 | this.memoryRead(this.programCounter), this.CPUTicks += 4) }, function() { this.programCounter = this.memoryRead(this.programCounter + 1 & 65535) << 8 | this.memoryRead(this.programCounter) }, function() {
                    if (this.FZero) this.programCounter = this.programCounter + 2 & 65535;
                    else {
                        var t = this.memoryRead(this.programCounter + 1 & 65535) << 8 | this.memoryRead(this.programCounter);
                        this.programCounter = this.programCounter + 2 & 65535, this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.programCounter >> 8]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, 255 & this.programCounter]), this.programCounter = t, this.CPUTicks += 12
                    }
                }, function() { this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.registerB]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.registerC]) }, function() {
                    var t = this.registerA + this.memoryRead(this.programCounter);
                    this.programCounter = this.programCounter + 1 & 65535, this.FHalfCarry = (15 & t) < (15 & this.registerA), this.FCarry = t > 255, this.registerA = 255 & t, this.FZero = 0 === this.registerA, this.FSubtract = !1
                }, function() { this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.programCounter >> 8]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, 255 & this.programCounter]), this.programCounter = 0 }, function() { this.FZero && (this.programCounter = this.memoryRead(this.stackPointer + 1 & 65535) << 8 | this.memoryRead(this.stackPointer), this.stackPointer = this.stackPointer + 2 & 65535, this.CPUTicks += 12) }, function() { this.programCounter = this.memoryRead(this.stackPointer + 1 & 65535) << 8 | this.memoryRead(this.stackPointer), this.stackPointer = this.stackPointer + 2 & 65535 }, function() { this.FZero ? (this.programCounter = this.memoryRead(this.programCounter + 1 & 65535) << 8 | this.memoryRead(this.programCounter), this.CPUTicks += 4) : this.programCounter = this.programCounter + 2 & 65535 }, function() {
                    const t = this.memoryRead(this.programCounter);
                    this.programCounter = this.programCounter + 1 & 65535, this.CPUTicks += q[t], U[t].apply(this)
                }, function() {
                    if (this.FZero) {
                        var t = this.memoryRead(this.programCounter + 1 & 65535) << 8 | this.memoryRead(this.programCounter);
                        this.programCounter = this.programCounter + 2 & 65535, this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.programCounter >> 8]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, 255 & this.programCounter]), this.programCounter = t, this.CPUTicks += 12
                    } else this.programCounter = this.programCounter + 2 & 65535
                }, function() {
                    var t = this.memoryRead(this.programCounter + 1 & 65535) << 8 | this.memoryRead(this.programCounter);
                    this.programCounter = this.programCounter + 2 & 65535, this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.programCounter >> 8]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, 255 & this.programCounter]), this.programCounter = t
                }, function() {
                    var t = this.memoryRead(this.programCounter);
                    this.programCounter = this.programCounter + 1 & 65535;
                    var e = this.registerA + t + (this.FCarry ? 1 : 0);
                    this.FHalfCarry = (15 & this.registerA) + (15 & t) + (this.FCarry ? 1 : 0) > 15, this.FCarry = e > 255, this.registerA = 255 & e, this.FZero = 0 === this.registerA, this.FSubtract = !1
                }, function() { this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.programCounter >> 8]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, 255 & this.programCounter]), this.programCounter = 8 }, function() { this.FCarry || (this.programCounter = this.memoryRead(this.stackPointer + 1 & 65535) << 8 | this.memoryRead(this.stackPointer), this.stackPointer = this.stackPointer + 2 & 65535, this.CPUTicks += 12) }, function() { this.registerE = this.memoryRead(this.stackPointer), this.registerD = this.memoryRead(this.stackPointer + 1 & 65535), this.stackPointer = this.stackPointer + 2 & 65535 }, function() { this.FCarry ? this.programCounter = this.programCounter + 2 & 65535 : (this.programCounter = this.memoryRead(this.programCounter + 1 & 65535) << 8 | this.memoryRead(this.programCounter), this.CPUTicks += 4) }, function() { console.error("Illegal op code 0xD3 called, pausing emulation.") }, function() {
                    if (this.FCarry) this.programCounter = this.programCounter + 2 & 65535;
                    else {
                        var t = this.memoryRead(this.programCounter + 1 & 65535) << 8 | this.memoryRead(this.programCounter);
                        this.programCounter = this.programCounter + 2 & 65535, this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.programCounter >> 8]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, 255 & this.programCounter]), this.programCounter = t, this.CPUTicks += 12
                    }
                }, function() { this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.registerD]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.registerE]) }, function() {
                    var t = this.registerA - this.memoryRead(this.programCounter);
                    this.programCounter = this.programCounter + 1 & 65535, this.FHalfCarry = (15 & this.registerA) < (15 & t), this.FCarry = t < 0, this.registerA = 255 & t, this.FZero = 0 === t, this.FSubtract = !0
                }, function() { this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.programCounter >> 8]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, 255 & this.programCounter]), this.programCounter = 16 }, function() { this.FCarry && (this.programCounter = this.memoryRead(this.stackPointer + 1 & 65535) << 8 | this.memoryRead(this.stackPointer), this.stackPointer = this.stackPointer + 2 & 65535, this.CPUTicks += 12) }, function() { this.programCounter = this.memoryRead(this.stackPointer + 1 & 65535) << 8 | this.memoryRead(this.stackPointer), this.stackPointer = this.stackPointer + 2 & 65535, this.IRQEnableDelay = 2 === this.IRQEnableDelay || 118 === this.memoryRead(this.programCounter) ? 1 : 2 }, function() { this.FCarry ? (this.programCounter = this.memoryRead(this.programCounter + 1 & 65535) << 8 | this.memoryRead(this.programCounter), this.CPUTicks += 4) : this.programCounter = this.programCounter + 2 & 65535 }, function() { console.error("Illegal op code 0xDB called, pausing emulation.") }, function() {
                    if (this.FCarry) {
                        var t = this.memoryRead(this.programCounter + 1 & 65535) << 8 | this.memoryRead(this.programCounter);
                        this.programCounter = this.programCounter + 2 & 65535, this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.programCounter >> 8]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, 255 & this.programCounter]), this.programCounter = t, this.CPUTicks += 12
                    } else this.programCounter = this.programCounter + 2 & 65535
                }, function() { console.error("Illegal op code 0xDD called, pausing emulation.") }, function() {
                    var t = this.memoryRead(this.programCounter);
                    this.programCounter = this.programCounter + 1 & 65535;
                    var e = this.registerA - t - (this.FCarry ? 1 : 0);
                    this.FHalfCarry = (15 & this.registerA) - (15 & t) - (this.FCarry ? 1 : 0) < 0, this.FCarry = e < 0, this.registerA = 255 & e, this.FZero = 0 === this.registerA, this.FSubtract = !0
                }, function() { this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.programCounter >> 8]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, 255 & this.programCounter]), this.programCounter = 24 }, function() { this.memoryHighWrite(this.memoryRead(this.programCounter), this.registerA), this.programCounter = this.programCounter + 1 & 65535 }, function() { this.registersHL = this.memoryRead(this.stackPointer + 1 & 65535) << 8 | this.memoryRead(this.stackPointer), this.stackPointer = this.stackPointer + 2 & 65535 }, function() { this.memoryHighWriter[this.registerC].apply(this, [this.registerC, this.registerA]) }, function() { console.log("Illegal op code 0xE3 called, pausing emulation.") }, function() { console.log("Illegal op code 0xE4 called, pausing emulation.") }, function() { this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.registersHL >> 8]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, 255 & this.registersHL]) }, function() { this.registerA &= this.memoryRead(this.programCounter), this.programCounter = this.programCounter + 1 & 65535, this.FZero = 0 === this.registerA, this.FHalfCarry = !0, this.FSubtract = this.FCarry = !1 }, function() { this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.programCounter >> 8]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, 255 & this.programCounter]), this.programCounter = 32 }, function() {
                    var t = this.memoryRead(this.programCounter) << 24 >> 24;
                    this.programCounter = this.programCounter + 1 & 65535;
                    var e = this.stackPointer + t & 65535;
                    t = this.stackPointer ^ t ^ e, this.stackPointer = e, this.FCarry = 256 == (256 & t), this.FHalfCarry = 16 == (16 & t), this.FZero = this.FSubtract = !1
                }, function() { this.programCounter = this.registersHL }, function() { this.memoryWrite(this.memoryRead(this.programCounter + 1 & 65535) << 8 | this.memoryRead(this.programCounter), this.registerA), this.programCounter = this.programCounter + 2 & 65535 }, function() { console.error("Illegal op code 0xEB called, pausing emulation.") }, function() { console.error("Illegal op code 0xEC called, pausing emulation.") }, function() { console.error("Illegal op code 0xED called, pausing emulation.") }, function() { this.registerA ^= this.memoryRead(this.programCounter), this.programCounter = this.programCounter + 1 & 65535, this.FZero = 0 === this.registerA, this.FSubtract = this.FHalfCarry = this.FCarry = !1 }, function() { this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.programCounter >> 8]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, 255 & this.programCounter]), this.programCounter = 40 }, function() { this.registerA = this.memoryHighRead(this.memoryRead(this.programCounter)), this.programCounter = this.programCounter + 1 & 65535 }, function() {
                    var t = this.memoryRead(this.stackPointer);
                    this.FZero = t > 127, this.FSubtract = 64 == (64 & t), this.FHalfCarry = 32 == (32 & t), this.FCarry = 16 == (16 & t), this.registerA = this.memoryRead(this.stackPointer + 1 & 65535), this.stackPointer = this.stackPointer + 2 & 65535
                }, function() { this.registerA = this.memoryHighReader[this.registerC].apply(this, [this.registerC]) }, function() { this.IME = !1, this.IRQEnableDelay = 0 }, function() { console.error("Illegal op code 0xF4 called, pausing emulation.") }, function() { this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.registerA]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, (this.FZero ? 128 : 0) | (this.FSubtract ? 64 : 0) | (this.FHalfCarry ? 32 : 0) | (this.FCarry ? 16 : 0)]) }, function() { this.registerA |= this.memoryRead(this.programCounter), this.FZero = 0 === this.registerA, this.programCounter = this.programCounter + 1 & 65535, this.FSubtract = this.FCarry = this.FHalfCarry = !1 }, function() { this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.programCounter >> 8]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, 255 & this.programCounter]), this.programCounter = 48 }, function() {
                    var t = this.memoryRead(this.programCounter) << 24 >> 24;
                    this.programCounter = this.programCounter + 1 & 65535, this.registersHL = this.stackPointer + t & 65535, t = this.stackPointer ^ t ^ this.registersHL, this.FCarry = 256 == (256 & t), this.FHalfCarry = 16 == (16 & t), this.FZero = this.FSubtract = !1
                }, function() { this.stackPointer = this.registersHL }, function() { this.registerA = this.memoryRead(this.memoryRead(this.programCounter + 1 & 65535) << 8 | this.memoryRead(this.programCounter)), this.programCounter = this.programCounter + 2 & 65535 }, function() { this.IRQEnableDelay = 2 === this.IRQEnableDelay || 118 === this.memoryRead(this.programCounter) ? 1 : 2 }, () => console.error("Illegal op code 0xFC called, pausing emulation."), () => console.error("Illegal op code 0xFD called, pausing emulation."), function() {
                    var t = this.registerA - this.memoryRead(this.programCounter);
                    this.programCounter = this.programCounter + 1 & 65535, this.FHalfCarry = (15 & t) > (15 & this.registerA), this.FCarry = t < 0, this.FZero = 0 === t, this.FSubtract = !0
                }, function() { this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.programCounter >> 8]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, 255 & this.programCounter]), this.programCounter = 56 }],
                V = [15, 0, 124, 255, 0, 0, 0, 248, 255, 255, 255, 255, 255, 255, 255, 1, 128, 191, 243, 255, 191, 255, 63, 0, 255, 191, 127, 255, 159, 255, 191, 255, 255, 0, 0, 191, 119, 243, 241, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 0, 255, 145, 128, 0, 0, 0, 0, 0, 252, 0, 0, 0, 0, 255, 126, 255, 254, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 192, 255, 193, 0, 254, 255, 255, 255, 248, 255, 0, 0, 0, 143, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 206, 237, 102, 102, 204, 13, 0, 11, 3, 115, 0, 131, 0, 12, 0, 13, 0, 8, 17, 31, 136, 137, 0, 14, 220, 204, 110, 230, 221, 221, 217, 153, 187, 187, 103, 99, 110, 14, 236, 204, 221, 220, 153, 159, 187, 185, 51, 62, 69, 236, 82, 250, 8, 183, 7, 93, 1, 253, 192, 255, 8, 252, 0, 229, 11, 248, 194, 206, 244, 249, 15, 127, 69, 109, 61, 254, 70, 151, 51, 94, 8, 239, 241, 255, 134, 131, 36, 116, 18, 252, 0, 159, 180, 183, 6, 213, 208, 122, 0, 158, 4, 95, 65, 47, 29, 119, 54, 117, 129, 170, 112, 58, 152, 209, 113, 2, 77, 1, 193, 255, 13, 0, 211, 5, 249, 0, 11, 0],
                J = [!0, 1, !0, !1, !0, !0, 0, 19, 0, 216, 333, 65534, 256, !1, !0, !1, 0, 0, [],
                    [], 0, [], !1, 1, -53248, 0, 0, 0, !1, !1, !1, !1, !1, 0, !1, !1, !0, 0, 128, !1, 56, 60, 0, 1024, 0, 0, 0, 0, (new Date).getTime(), 0, [], !0, !0, 8192, 512, 0, 0, !1, 0, 0, !0, 0, !1, 0, 1, 0, !1, 0, !1, 8192, 512, 0, 0, !1, 0, 0, !0, 0, !1, 0, 4, 0, !0, null, 8, 0, 0, 0, 0, !1, 0, 0, !0, 32767, !1, 8, 8, !1, !1, !1, !1, !1, !1, !1, !1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, G[2], 0, G[2], !1, !1, !1, !1, 8192, 0, 2048, 8, 0, 0, 2048, 0, 144, 0, 0, !1, 0, 0, 0, 0, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, -61440, 0, 0, null, null, null, null, null, null, null, null, null, null, null, null, 0, 0, 0, 0, !1, 0, 0, !1, 1, 1
                ];
            class Y {
                constructor(t) { this.gameboy = t }
                init() { this.loadOld(J.slice(0)) }
                get() { const t = this.gameboy; return t.cartridge ? m(t.memory.buffer.slice(0), t.VRAM.buffer.slice(0)) : null }
                load(t) { this.gameboy }
                loadOld(t) {
                    let e = 0;
                    const r = this.gameboy;
                    r.inBootstrap = t[e++], r.registerA = t[e++], r.FZero = t[e++], r.FSubtract = t[e++], r.FHalfCarry = t[e++], r.FCarry = t[e++], r.registerB = t[e++], r.registerC = t[e++], r.registerD = t[e++], r.registerE = t[e++], r.registersHL = t[e++], r.stackPointer = t[e++], r.programCounter = t[e++], r.halt = t[e++], r.IME = t[e++], r.hdmaRunning = t[e++], r.CPUTicks = t[e++], r.doubleSpeedShifter = t[e++], r.memory = u(t[e++], "uint8"), r.VRAM = u(t[e++], "uint8"), r.currVRAMBank = t[e++], r.GBCMemory = u(t[e++], "uint8"), r.useGBCMode = t[e++], r.gbcRamBank = t[e++], r.gbcRamBankPosition = t[e++], r.ROMBank1Offset = t[e++], r.cartridge ? r.cartridge.mbc.currentROMBank = t[e++] : e++, r.modeSTAT = t[e++], r.LYCMatchTriggerSTAT = t[e++], r.mode2TriggerSTAT = t[e++], r.mode1TriggerSTAT = t[e++], r.mode0TriggerSTAT = t[e++], r.LCDisOn = t[e++], r.gfxWindowCHRBankPosition = t[e++], r.gfxWindowDisplay = t[e++], r.gfxSpriteShow = t[e++], r.gfxSpriteNormalHeight = t[e++], r.gfxBackgroundCHRBankPosition = t[e++], r.gfxBackgroundBankOffset = t[e++], r.TIMAEnabled = t[e++], r.DIVTicks = t[e++], r.LCDTicks = t[e++], r.timerTicks = t[e++], r.TACClocker = t[e++], r.serialTimer = t[e++], r.serialShiftTimer = t[e++], r.serialShiftTimerAllocated = t[e++], r.IRQEnableDelay = t[e++], r.cartridge && r.cartridge.hasRTC ? r.cartridge.mbc3.rtc.lastTime = t[e++] : e++, r.drewBlank = t[e++], r.frameBuffer = u(t[e++], "int32"), r.bgEnabled = t[e++], r.BGPriorityEnabled = t[e++], r.audioController.channel1FrequencyTracker = t[e++], r.channel1FrequencyCounter = t[e++], r.channel1totalLength = t[e++], r.channel1envelopeVolume = t[e++], r.channel1envelopeType = t[e++], r.channel1envelopeSweeps = t[e++], r.channel1envelopeSweepsLast = t[e++], r.channel1consecutive = t[e++], r.channel1frequency = t[e++], r.channel1SweepFault = t[e++], r.channel1ShadowFrequency = t[e++], r.channel1timeSweep = t[e++], r.channel1lastTimeSweep = t[e++], r.channel1Swept = t[e++], r.channel1frequencySweepDivider = t[e++], r.channel1decreaseSweep = t[e++], r.channel2FrequencyTracker = t[e++], r.channel2FrequencyCounter = t[e++], r.channel2totalLength = t[e++], r.channel2envelopeVolume = t[e++], r.channel2envelopeType = t[e++], r.channel2envelopeSweeps = t[e++], r.channel2envelopeSweepsLast = t[e++], r.channel2consecutive = t[e++], r.channel2frequency = t[e++], r.channel3canPlay = t[e++], r.channel3totalLength = t[e++], r.channel3patternType = t[e++], r.channel3frequency = t[e++], r.channel3consecutive = t[e++], r.channel3PCM = u(t[e++], "int8"), r.audioController.channel4FrequencyPeriod = t[e++], r.audioController.channel4lastSampleLookup = t[e++], r.channel4totalLength = t[e++], r.channel4envelopeVolume = t[e++], r.channel4currentVolume = t[e++], r.channel4envelopeType = t[e++], r.channel4envelopeSweeps = t[e++], r.channel4envelopeSweepsLast = t[e++], r.channel4consecutive = t[e++], r.channel4BitRange = t[e++], r.soundMasterEnabled = t[e++], r.audioController.VinLeftChannelMasterVolume = t[e++], r.audioController.VinRightChannelMasterVolume = t[e++], r.leftChannel1 = t[e++], r.leftChannel2 = t[e++], r.leftChannel3 = t[e++], r.leftChannel4 = t[e++], r.rightChannel1 = t[e++], r.rightChannel2 = t[e++], r.rightChannel3 = t[e++], r.rightChannel4 = t[e++], r.channel1currentSampleLeft = t[e++], r.channel1currentSampleRight = t[e++], r.channel2currentSampleLeft = t[e++], r.channel2currentSampleRight = t[e++], r.channel3currentSampleLeft = t[e++], r.channel3currentSampleRight = t[e++], r.channel4currentSampleLeft = t[e++], r.channel4currentSampleRight = t[e++], r.channel1currentSampleLeftSecondary = t[e++], r.channel1currentSampleRightSecondary = t[e++], r.channel2currentSampleLeftSecondary = t[e++], r.channel2currentSampleRightSecondary = t[e++], r.channel3currentSampleLeftSecondary = t[e++], r.channel3currentSampleRightSecondary = t[e++], r.channel4currentSampleLeftSecondary = t[e++], r.channel4currentSampleRightSecondary = t[e++], r.channel1currentSampleLeftTrimary = t[e++], r.channel1currentSampleRightTrimary = t[e++], r.channel2currentSampleLeftTrimary = t[e++], r.channel2currentSampleRightTrimary = t[e++], r.audioController.mixerOutputCache = t[e++], r.audioController.channel1DutyTracker = t[e++], r.audioController.channel1CachedDuty = t[e++], r.audioController.channel2DutyTracker = t[e++], r.audioController.channel2CachedDuty = t[e++], r.audioController.channel1Enabled = t[e++], r.audioController.channel2Enabled = t[e++], r.audioController.channel3Enabled = t[e++], r.audioController.channel4Enabled = t[e++], r.audioController.sequencerClocks = t[e++], r.audioController.sequencePosition = t[e++], r.channel3Counter = t[e++], r.audioController.channel4Counter = t[e++], r.audioController.cachedChannel3Sample = t[e++], r.audioController.cachedChannel4Sample = t[e++], r.channel3FrequencyPeriod = t[e++], r.channel3lastSampleLookup = t[e++], r.actualScanLine = t[e++], r.lastUnrenderedLine = t[e++], r.queuedScanLines = t[e++], r.cartridge && r.cartridge.hasRTC ? (r.cartridge.mbc3.rtc.RTCisLatched = t[e++], r.cartridge.mbc3.rtc.latchedSeconds = t[e++], r.cartridge.mbc3.rtc.latchedMinutes = t[e++], r.cartridge.mbc3.rtc.latchedHours = t[e++], r.cartridge.mbc3.rtc.latchedLDays = t[e++], r.cartridge.mbc3.rtc.latchedHDays = t[e++], r.cartridge.mbc3.rtc.RTCSeconds = t[e++], r.cartridge.mbc3.rtc.RTCMinutes = t[e++], r.cartridge.mbc3.rtc.RTCHours = t[e++], r.cartridge.mbc3.rtc.RTCDays = t[e++], r.cartridge.mbc3.rtc.RTCDayOverFlow = t[e++], r.cartridge.mbc3.rtc.RTCHalt = t[e++]) : e += 12, r.usedBootROM = t[e++], r.skipPCIncrement = t[e++], r.STATTracker = t[e++], r.gbcRamBankPositionECHO = t[e++], r.windowY = t[e++], r.windowX = t[e++], r.gbcOBJRawPalette = u(t[e++], "uint8"), r.gbcBGRawPalette = u(t[e++], "uint8"), r.gbOBJPalette = u(t[e++], "int32"), r.gbBGPalette = u(t[e++], "int32"), r.gbcOBJPalette = u(t[e++], "int32"), r.gbcBGPalette = u(t[e++], "int32"), r.gbBGColorizedPalette = u(t[e++], "int32"), r.gbOBJColorizedPalette = u(t[e++], "int32"), r.cachedBGPaletteConversion = u(t[e++], "int32"), r.cachedOBJPaletteConversion = u(t[e++], "int32"), r.BGCHRBank1 = u(t[e++], "uint8"), r.BGCHRBank2 = u(t[e++], "uint8"), r.haltPostClocks = t[e++], r.interruptsRequested = t[e++], r.interruptsEnabled = t[e++], r.checkIRQMatching(), r.remainingClocks = t[e++], r.colorizedGBPalettes = t[e++], r.backgroundY = t[e++], r.backgroundX = t[e++], r.CPUStopped = t[e++], r.audioController.audioClocksUntilNextEvent = t[e++], r.audioController.audioClocksUntilNextEventCounter = t[e]
                }
            }
            const X = 0,
                $ = 16383,
                Q = 16384,
                K = 32767,
                tt = 32768,
                et = 36863,
                rt = 38911,
                it = 40960,
                st = 49151,
                nt = 49152,
                at = 53247,
                ot = 53248,
                ht = 57343,
                ut = 57344,
                lt = 65023,
                ct = 65024,
                ft = 65183,
                dt = 65184,
                mt = 65279,
                pt = 65280,
                gt = 65281,
                yt = 65282,
                Ct = 65284,
                bt = 65285,
                vt = 65286,
                wt = 65287,
                kt = 65295,
                Bt = 65535;
            class St {
                constructor(t) { this.initialValue = 15, this.value = 255, this.gameboy = t }
                down(t) { this.value &= 255 ^ 1 << t, !this.gameboy.cartridge || this.gameboy.cartridge.useGBCMode || this.gameboy.usedBootROM && this.gameboy.usedGBCBootROM || (this.gameboy.interruptsRequested |= 16, this.gameboy.remainingClocks = 0, this.gameboy.checkIRQMatching()), this.writeToMemory() }
                up(t) { this.value |= 1 << t, this.writeToMemory() }
                writeToMemory() {
                    const t = this.gameboy.memory[pt];
                    this.gameboy.memory[pt] = (48 & t) + ((0 == (32 & t) ? this.value >> 4 : 15) & (0 == (16 & t) ? 15 & this.value : 15)), this.gameboy.CPUStopped = !1
                }
            }
            class Rt {
                constructor(t, e) { this.readers = [], this.highReaders = [], this.writers = [], this.data = c(65536, 0, "uint8"), this.gameboy = t, this.data = e }
                write(t, e) { return this.writers[t](t, e) }
                read(t) { const e = this.readers[t]; if (!e) throw new Error("no_reader"); return e(t) }
                readHigh(t) { t &= 255; const e = this.highReaders[t]; if (!e) throw new Error("no_high_reader"); return e(t) }
                hasReader(t) { return !!this.readers[t] }
                hasHighReader(t) { return t &= 255, !!this.highReaders[t] }
                setReaders(t, e, r) { for (let i = t; i <= e; i++) this.setReader(i, r) }
                setReader(t, e) { this.readers[t] = e }
                setHighReaders(t, e, r) { for (let i = t; i <= e; i++) this.setHighReader(i, r) }
                setHighReader(t, e) { t &= 255, this.highReaders[t] = e }
                setWriters(t, e, r) { for (let i = t; i <= e; i++) this.setWriter(i, r) }
                setWriter(t, e) { this.writers[t] = e }
                jumpCompile() {
                    this.setReaders(X, $, t => this.data[t]), this.setReaders(Q, K, t => this.gameboy.cartridge.rom.getByte(this.gameboy.cartridge.mbc.currentROMBank + t)), this.setReaders(tt, rt, this.gameboy.cartridge.useGBCMode ? this.gameboy.VRAMDATAReadCGBCPU : this.gameboy.VRAMDATAReadDMGCPU), this.setReaders(it, st, this.gameboy.cartridge.useGBCMode ? this.gameboy.VRAMCHRReadCGBCPU : this.gameboy.VRAMCHRReadDMGCPU), this.gameboy.cartridge.mbc && 0 === this.gameboy.cartridge.mbc.ramSize ? this.setReaders(it, st, this.gameboy.badMemoryRead) : this.gameboy.cartridge.hasMBC7 ? this.setReaders(it, st, this.gameboy.memoryReadMBC7) : this.gameboy.cartridge.hasMBC3 ? this.setReaders(it, st, this.gameboy.memoryReadMBC3) : this.setReaders(it, st, this.gameboy.memoryReadMBC), this.setReaders(nt, at, this.gameboy.memoryReadNormal), this.gameboy.cartridge.useGBCMode ? this.setReaders(ot, ht, this.gameboy.memoryReadGBCMemory) : this.setReaders(ot, ht, this.gameboy.memoryReadNormal), this.setReaders(ut, 61439, this.gameboy.memoryReadECHONormal), this.gameboy.cartridge.useGBCMode ? this.setReaders(61440, lt, this.gameboy.memoryReadECHOGBCMemory) : this.setReaders(61440, lt, this.gameboy.memoryReadECHONormal), this.setReaders(ct, ft, this.gameboy.memoryReadOAM), this.gameboy.cartridge.useGBCMode && this.setReaders(dt, mt, this.gameboy.memoryReadNormal);
                    const t = () => 192 | this.gameboy.memoryReadNormal(pt);
                    this.setReader(pt, t), this.setHighReader(pt, t);
                    const e = () => this.gameboy.memoryReadNormal(yt) < 128 ? this.gameboy.memoryReadNormal(gt) : 255;
                    this.setReader(gt, e), this.setHighReader(gt, e);
                    const r = this.gameboy.cartridge.useGBCMode ? () => (this.gameboy.serialTimer <= 0 ? 124 : 252) | this.gameboy.memoryReadNormal(yt) : () => (this.gameboy.serialTimer <= 0 ? 126 : 254) | this.gameboy.memoryReadNormal(yt);
                    this.setReader(yt, r), this.setHighReader(yt, r), this.setReader(65283, this.gameboy.badMemoryRead), this.setHighReader(65283, this.gameboy.badMemoryRead);
                    const i = () => (this.gameboy.memory[Ct] = this.gameboy.memoryReadNormal(Ct) + (this.gameboy.DIVTicks >> 8) & 255, this.gameboy.DIVTicks &= 255, this.gameboy.memoryReadNormal(Ct));
                    this.setReader(Ct, i), this.setHighReader(Ct, i), this.setReader(bt, this.gameboy.memoryReadNormal), this.setHighReader(bt, this.gameboy.memoryHighReadNormal), this.setReader(vt, this.gameboy.memoryReadNormal), this.setHighReader(vt, this.gameboy.memoryHighReadNormal);
                    const s = () => 248 | this.gameboy.memoryReadNormal(wt);
                    this.setReader(wt, s), this.setHighReader(wt, s), this.setReaders(65288, 65294, this.gameboy.badMemoryRead), this.setHighReaders(65288, 65294, this.gameboy.badMemoryRead);
                    const n = () => 224 | this.gameboy.interruptsRequested;
                    this.setReader(kt, n), this.setHighReader(kt, n), this.gameboy.memoryReadJumpCompile(), this.gameboy.memoryWriteJumpCompile()
                }
            }
            class Tt {
                constructor() { this.speed = 1, this.ticks = 0, this.cyclesTotal = 0, this.cyclesTotalBase = 0, this.cyclesTotalCurrent = 0, this.cyclesTotalRoundoff = 0, this.baseCyclesPerIteration = 0, this.totalLinesPassed = 0, this.calculateTimings() }
                calculateTimings() { this.clocksPerSecond = 4194304 * this.speed, this.baseCyclesPerIteration = this.clocksPerSecond / 1e3 * s.runInterval, this.cyclesTotalRoundoff = this.baseCyclesPerIteration % 4, this.cyclesTotalBase = this.cyclesTotal = this.baseCyclesPerIteration - this.cyclesTotalRoundoff | 0, this.cyclesTotalCurrent = 0 }
                setSpeed(t) { this.speed = t, this.calculateTimings() }
            }
            class At {
                constructor({ audio: t = {}, api: e, lcd: r = {} }) { this.api = e, this.events = new B.EventEmitter, r.gameboy = this, this.cpu = new Tt, this.audioDevice = new I({ context: t.context, channels: 2, volume: s.soundVolume }), this.audioController = new N({ cpu: this.cpu, gameboy: this }), this.joypad = new St(this), this.lcdDevice = new z(r), this.lcdController = new j, this.stateManager = new Y(this), this.stateManager.init(), this.GBBOOTROM = [], this.GBCBOOTROM = [], this.memoryReadNormal = this.memoryReadNormal.bind(this), this.memoryWriteNormal = this.memoryWriteNormal.bind(this), this.memoryWriteGBCRAM = this.memoryWriteGBCRAM.bind(this), this.memoryWriteMBCRAM = this.memoryWriteMBCRAM.bind(this), this.memoryWriteMBC3RAM = this.memoryWriteMBC3RAM.bind(this), this.memoryReadGBCMemory = this.memoryReadGBCMemory.bind(this), this.memoryReadROM = this.memoryReadROM.bind(this), this.memoryHighWriteNormal = this.memoryHighWriteNormal.bind(this), this.memoryHighReadNormal = this.memoryHighReadNormal.bind(this), this.MBC5WriteRAMBank = this.MBC5WriteRAMBank.bind(this), this.MBCWriteEnable = this.MBCWriteEnable.bind(this), this.RUMBLEWriteRAMBank = this.RUMBLEWriteRAMBank.bind(this), this.onRUMBLE = this.onRUMBLE.bind(this), this.memoryReadMBC = this.memoryReadMBC.bind(this), this.memoryReadMBC3 = this.memoryReadMBC3.bind(this), this.memoryReadMBC7 = this.memoryReadMBC7.bind(this), this.memoryReadECHONormal = this.memoryReadECHONormal.bind(this), this.memoryReadECHOGBCMemory = this.memoryReadECHOGBCMemory.bind(this), this.memoryWriteECHONormal = this.memoryWriteECHONormal.bind(this), this.VRAMDATAReadCGBCPU = this.VRAMDATAReadCGBCPU.bind(this), this.VRAMDATAReadDMGCPU = this.VRAMDATAReadDMGCPU.bind(this), this.VRAMCHRReadCGBCPU = this.VRAMCHRReadCGBCPU.bind(this), this.renderBGGBLayer = this.renderBGGBLayer.bind(this), this.renderWindowGBLayer = this.renderWindowGBLayer.bind(this), this.renderSpriteGBLayer = this.renderSpriteGBLayer.bind(this), this.renderSpriteGBCLayer = this.renderSpriteGBCLayer.bind(this), this.stopEmulator = 3, this.IRQLineMatched = 0, this.memoryReader = [], this.memoryWriter = [], this.memoryHighReader = [], this.memoryHighWriter = [], this.spriteCount = 252, this.LINECONTROL = [], this.DISPLAYOFFCONTROL = [function() {}], this.LCDCONTROL = null, this.initializeLCDController(), this.drewFrame = !1, this.midScanlineOffset = -1, this.pixelEnd = 0, this.currentX = 0, this.BGCHRCurrentBank = null, this.tileCache = null, this.colors = [15728606, 11392916, 5411443, 1586242], this.OBJPalette = null, this.BGPalette = null, this.updateGBBGPalette = this.updateGBRegularBGPalette, this.updateGBOBJPalette = this.updateGBRegularOBJPalette, this.renderBGLayer = null, this.renderWindowLayer = null, this.renderSpriteLayer = null, this.pixelStart = 0 }
                loadState(t) { this.stateManager.load(t), this.initializeReferencesFromSaveState(), this.jumpCompile(), this.lcdDevice.init(), this.initSound(), this.audioController.noiseSampleTable = 32767 === this.audioController.channel4BitRange ? this.audioController.LSFR15Table : this.audioController.LSFR7Table, this.audioController.channel4VolumeShifter = 32767 === this.audioController.channel4BitRange ? 15 : 7 }
                jumpCompile() { this.memoryNew.jumpCompile() }
                connectCartridge(t) { this.cartridge && this.cartridge.mbc && this.cartridge.mbc.removeListener("rumble", this.onRUMBLE), t.connect(this), this.cartridge = t, this.loadCartridgeRomIntoMemory(), this.cartridge.interpret(), this.cartridge && this.cartridge.mbc && this.cartridge.mbc.on("rumble", this.onRUMBLE) }
                onRUMBLE() { "undefined" != typeof window && "vibrate" in window.navigator && window.navigator.vibrate(200) }
                loadCartridgeRomIntoMemory() { for (let t = 0; t < 16384; t++) this.memory[t] = this.cartridge.rom.getByte(t) }
                start(t) { this.init(), this.connectCartridge(t), this.cartridge && this.cartridge.mbc && (this.cartridge.mbc.setupROM(), this.cartridge.mbc.on("ramWrite", () => { this.events.emit("sramWrite") })), this.usedBootROM ? (this.setupRAM(), this.initBootstrap()) : (this.inBootstrap = !1, this.setupRAM(), this.initSkipBootstrap()), this.checkIRQMatching() }
                init() { this.stateManager.init(), this.initMemory(), this.lcdDevice.init(), this.initSound() }
                setupRAM() { this.cartridge.setupRAM(), this.cartridge.useGBCMode && (this.VRAM = c(8192, 0, "uint8"), this.GBCMemory = c(28672, 0, "uint8")), this.jumpCompile(), this.initializeModeSpecificArrays() }
                initMemory() { this.memory = c(65536, 0, "uint8"), this.audioController.setMemory(this.memory), this.frameBuffer = c(23040, 16316664, "int32"), this.BGCHRBank1 = c(2048, 0, "uint8"), this.audioController.initMemory(), this.memoryNew = new Rt(this, this.memory) }
                generateCacheArray(t) { const e = []; let r = 0; for (; r < t;) e[r++] = c(64, 0, "uint8"); return e }
                initSkipBootstrap() {
                    for (var t = 255; t >= 0;) {
                        if (t >= 48 && t < 64) this.memoryWrite(65280 | t, V[t]);
                        else switch (t) {
                            case 0:
                            case 1:
                            case 2:
                            case 5:
                            case 7:
                            case 15:
                            case 255:
                                this.memoryWrite(65280 | t, V[t]);
                                break;
                            default:
                                this.memory[65280 | t] = V[t]
                        }--t
                    }
                    this.cartridge.useGBCMode ? (this.memory[65388] = 254, this.memory[65396] = 254) : (this.memory[65352] = 255, this.memory[65353] = 255, this.memory[65388] = 255, this.memory[65396] = 255), console.log("Starting without the GBC boot ROM."), this.registerA = this.cartridge.useGBCMode ? 17 : 1, this.registerB = 0, this.registerC = 19, this.registerD = 0, this.registerE = 216, this.FZero = !0, this.FSubtract = !1, this.FHalfCarry = !0, this.FCarry = !0, this.registersHL = 333, this.LCDCONTROL = this.LINECONTROL, this.IME = !1, this.IRQLineMatched = 0, this.interruptsRequested = 225, this.interruptsEnabled = 0, this.hdmaRunning = !1, this.CPUTicks = 12, this.STATTracker = 0, this.modeSTAT = 1, this.spriteCount = 252, this.LYCMatchTriggerSTAT = !1, this.mode2TriggerSTAT = !1, this.mode1TriggerSTAT = !1, this.mode0TriggerSTAT = !1, this.LCDisOn = !0, this.audioController.channel1FrequencyTracker = 8192, this.audioController.channel1DutyTracker = 0, this.audioController.channel1CachedDuty = G[2], this.audioController.channel1totalLength = 0, this.audioController.channel1envelopeVolume = 0, this.audioController.channel1envelopeType = !1, this.audioController.channel1envelopeSweeps = 0, this.audioController.channel1envelopeSweepsLast = 0, this.audioController.channel1consecutive = !0, this.audioController.channel1frequency = 1985, this.audioController.channel1SweepFault = !0, this.audioController.channel1ShadowFrequency = 1985, this.audioController.channel1timeSweep = 1, this.audioController.channel1lastTimeSweep = 0, this.audioController.channel1Swept = !1, this.audioController.channel1frequencySweepDivider = 0, this.audioController.channel1decreaseSweep = !1, this.audioController.channel2FrequencyTracker = 8192, this.audioController.channel2DutyTracker = 0, this.audioController.channel2CachedDuty = G[2], this.audioController.channel2totalLength = 0, this.audioController.channel2envelopeVolume = 0, this.audioController.channel2envelopeType = !1, this.audioController.channel2envelopeSweeps = 0, this.audioController.channel2envelopeSweepsLast = 0, this.audioController.channel2consecutive = !0, this.audioController.channel2frequency = 0, this.audioController.channel3canPlay = !1, this.audioController.channel3totalLength = 0, this.audioController.channel3patternType = 4, this.audioController.channel3frequency = 0, this.audioController.channel3consecutive = !0, this.audioController.channel3Counter = 1048, this.audioController.channel4FrequencyPeriod = 8, this.audioController.channel4totalLength = 0, this.audioController.channel4envelopeVolume = 0, this.audioController.channel4currentVolume = 0, this.audioController.channel4envelopeType = !1, this.audioController.channel4envelopeSweeps = 0, this.audioController.channel4envelopeSweepsLast = 0, this.audioController.channel4consecutive = !0, this.audioController.channel4BitRange = 32767, this.audioController.channel4VolumeShifter = 15, this.audioController.channel1FrequencyCounter = 512, this.audioController.channel2FrequencyCounter = 512, this.audioController.channel3Counter = 2048, this.audioController.channel3FrequencyPeriod = 2048, this.audioController.channel3lastSampleLookup = 0, this.audioController.channel4lastSampleLookup = 0, this.audioController.VinLeftChannelMasterVolume = 8, this.audioController.VinRightChannelMasterVolume = 8, this.audioController.leftChannel1 = !0, this.audioController.leftChannel2 = !0, this.audioController.leftChannel3 = !0, this.audioController.leftChannel4 = !0, this.audioController.rightChannel1 = !0, this.audioController.rightChannel2 = !0, this.audioController.rightChannel3 = !1, this.audioController.rightChannel4 = !1, this.soundMasterEnabled = !0, this.DIVTicks = 27044, this.LCDTicks = 160, this.timerTicks = 0, this.TIMAEnabled = !1, this.TACClocker = 1024, this.serialTimer = 0, this.serialShiftTimer = 0, this.serialShiftTimerAllocated = 0, this.IRQEnableDelay = 0, this.actualScanLine = 144, this.lastUnrenderedLine = 0, this.gfxWindowDisplay = !1, this.gfxSpriteShow = !1, this.gfxSpriteNormalHeight = !0, this.bgEnabled = !0, this.hasBGPriority = !0, this.gfxWindowCHRBankPosition = 0, this.gfxBackgroundCHRBankPosition = 0, this.gfxBackgroundBankOffset = 0, this.windowY = 0, this.windowX = 0, this.drewBlank = 0, this.midScanlineOffset = -1, this.currentX = 0
                }
                initBootstrap() { console.log("Starting selected boot ROM"), this.programCounter = 0, this.stackPointer = 0, this.IME = !1, this.LCDTicks = 0, this.DIVTicks = 0, this.registerA = 0, this.registerB = 0, this.registerC = 0, this.registerD = 0, this.registerE = 0, this.FZero = this.FSubtract = this.FHalfCarry = this.FCarry = !1, this.registersHL = 0, this.audioController.leftChannel1 = !1, this.audioController.leftChannel2 = !1, this.audioController.leftChannel3 = !1, this.audioController.leftChannel4 = !1, this.audioController.rightChannel1 = !1, this.audioController.rightChannel2 = !1, this.audioController.rightChannel3 = !1, this.audioController.rightChannel4 = !1, this.audioController.channel2frequency = this.audioController.channel1frequency = 0, this.audioController.channel4consecutive = this.audioController.channel2consecutive = this.audioController.channel1consecutive = !1, this.audioController.VinLeftChannelMasterVolume = 8, this.audioController.VinRightChannelMasterVolume = 8, this.memory[pt] = this.joypad.initialValue }
                disableBootROM() { this.loadCartridgeRomIntoMemory(), this.usedGBCBootROM ? this.cartridge.useGBCMode ? this.recompileBootIOWriteHandling() : this.adjustGBCtoGBMode() : this.recompileBootIOWriteHandling() }
                setSpeed(t) { this.cpu.setSpeed(t), this.initSound() }
                initSound() { this.audioController.connectDevice(this.audioDevice), this.audioController.setVolume(s.soundOn ? s.soundVolume : 0), this.audioController.initBuffer() }
                writeChannel3RAM(t, e) { this.audioController.channel3canPlay && this.audioController.runJIT(), this.memory[65328 | t] = e, t <<= 1, this.audioController.channel3PCM[t] = e >> 4, this.audioController.channel3PCM[1 | t] = 15 & e }
                run() { 0 == (2 & this.stopEmulator) && (1 == (1 & this.stopEmulator) ? this.CPUStopped ? (this.audioController.adjustUnderrun(), this.audioController.audioTicks += this.cpu.cyclesTotal, this.audioController.runJIT(), this.stopEmulator |= 1) : (this.stopEmulator = 0, this.audioController.adjustUnderrun(), this.cartridge.hasRTC && this.cartridge.mbc.rtc.updateClock(), this.halt ? (this.CPUTicks = 0, this.calculateHALTPeriod(), this.halt ? (this.updateCore(), this.iterationEndRoutine()) : this.executeIteration()) : this.executeIteration(), this.lcdDevice.requestDraw()) : console.error("Iterator restarted a faulted core.")) }
                executeIteration() {
                    for (; 0 === this.stopEmulator;) {
                        switch (this.IRQEnableDelay) {
                            case 1:
                                this.IME = !0, this.checkIRQMatching(), --this.IRQEnableDelay;
                                break;
                            case 2:
                                --this.IRQEnableDelay
                        }
                        this.IRQLineMatched > 0 && this.launchIRQ();
                        const t = this.memoryRead(this.programCounter);
                        this.programCounter = this.programCounter + 1 & 65535, this.skipPCIncrement && (this.programCounter = this.programCounter - 1 & 65535, this.skipPCIncrement = !1), this.CPUTicks = P[t], Z[t].apply(this);
                        const e = this.CPUTicks >> this.doubleSpeedShifter;
                        if (this.LCDTicks += e, this.LCDCONTROL[this.actualScanLine](this), this.audioController.audioTicks += e, this.cpu.ticks += e, this.DIVTicks += this.CPUTicks, this.TIMAEnabled)
                            for (this.timerTicks += this.CPUTicks; this.timerTicks >= this.TACClocker;) this.timerTicks -= this.TACClocker, 256 == ++this.memory[65285] && (this.memory[65285] = this.memory[65286], this.interruptsRequested |= 4, this.checkIRQMatching());
                        this.serialTimer > 0 && (this.serialTimer -= this.CPUTicks, this.serialTimer <= 0 && (this.interruptsRequested |= 8, this.checkIRQMatching()), this.serialShiftTimer -= this.CPUTicks, this.serialShiftTimer <= 0 && (this.serialShiftTimer = this.serialShiftTimerAllocated, this.memory[gt] = this.memory[gt] << 1 & 254 | 1)), this.cpu.ticks >= this.cpu.cyclesTotal && this.iterationEndRoutine()
                    }
                }
                iterationEndRoutine() { 0 == (1 & this.stopEmulator) && (this.audioController.runJIT(), this.memory[Ct] = this.memory[Ct] + (this.DIVTicks >> 8) & 255, this.DIVTicks &= 255, this.stopEmulator |= 1, this.cpu.ticks -= this.cpu.cyclesTotal, this.cpu.cyclesTotalCurrent += this.cpu.cyclesTotalRoundoff, this.recalculateIterationClockLimit()) }
                handleSTOP() { this.CPUStopped = !0, this.iterationEndRoutine(), this.cpu.ticks < 0 && (this.audioController.audioTicks -= this.cpu.ticks, this.audioController.runJIT()) }
                recalculateIterationClockLimit() {
                    const t = this.cpu.cyclesTotalCurrent % 4;
                    this.cpu.cyclesTotal = this.cpu.cyclesTotalBase + this.cpu.cyclesTotalCurrent - t, this.cpu.cyclesTotalCurrent = t
                }
                scanLineMode2() { 1 !== this.STATTracker && (this.mode2TriggerSTAT && (this.interruptsRequested |= 2, this.checkIRQMatching()), this.STATTracker = 1, this.modeSTAT = 2) }
                scanLineMode3() { 3 !== this.modeSTAT && (0 === this.STATTracker && this.mode2TriggerSTAT && (this.interruptsRequested |= 2, this.checkIRQMatching()), this.STATTracker = 1, this.modeSTAT = 3) }
                scanLineMode0() { 0 !== this.modeSTAT && (2 !== this.STATTracker && (0 === this.STATTracker && (this.mode2TriggerSTAT && (this.interruptsRequested |= 2, this.checkIRQMatching()), this.modeSTAT = 3), this.incrementScanLineQueue(), this.updateSpriteCount(this.actualScanLine), this.STATTracker = 2), this.LCDTicks >= this.spriteCount && (this.hdmaRunning && this.executeHDMA(), this.mode0TriggerSTAT && (this.interruptsRequested |= 2, this.checkIRQMatching()), this.STATTracker = 3, this.modeSTAT = 0)) }
                clocksUntilLYCMatch() { return 0 !== this.memory[65349] ? this.memory[65349] > this.actualScanLine ? 456 * (this.memory[65349] - this.actualScanLine) : 456 * (154 - this.actualScanLine + this.memory[65349]) : 456 * (153 === this.actualScanLine && 0 === this.memory[65348] ? 154 : 153 - this.actualScanLine) + 8 }
                clocksUntilMode0() {
                    switch (this.modeSTAT) {
                        case 0:
                            return 143 === this.actualScanLine ? (this.updateSpriteCount(0), this.spriteCount + 5016) : (this.updateSpriteCount(this.actualScanLine + 1), this.spriteCount + 456);
                        case 2:
                        case 3:
                            return this.updateSpriteCount(this.actualScanLine), this.spriteCount;
                        case 1:
                            return this.updateSpriteCount(0), this.spriteCount + 456 * (154 - this.actualScanLine)
                    }
                }
                updateSpriteCount(t) {
                    if (this.spriteCount = 252, this.cartridge.useGBCMode && this.gfxSpriteShow)
                        for (var e = t + 16, r = 0, i = this.gfxSpriteNormalHeight ? 8 : 16, s = 65024; s < 65184 && this.spriteCount < 312; s += 4)(r = e - this.memory[s]) > -1 && r < i && (this.spriteCount += 6)
                }
                matchLYC() { this.memory[65348] === this.memory[65349] ? (this.memory[65345] |= 4, this.LYCMatchTriggerSTAT && (this.interruptsRequested |= 2, this.checkIRQMatching())) : this.memory[65345] &= 123 }
                updateCore() {
                    this.LCDTicks += this.CPUTicks >> this.doubleSpeedShifter, this.LCDCONTROL[this.actualScanLine](this);
                    var t = this.CPUTicks >> this.doubleSpeedShifter;
                    if (this.audioController.audioTicks += t, this.cpu.ticks += t, this.DIVTicks += this.CPUTicks, this.TIMAEnabled)
                        for (this.timerTicks += this.CPUTicks; this.timerTicks >= this.TACClocker;) this.timerTicks -= this.TACClocker, 256 == ++this.memory[65285] && (this.memory[65285] = this.memory[65286], this.interruptsRequested |= 4, this.checkIRQMatching());
                    this.serialTimer > 0 && (this.serialTimer -= this.CPUTicks, this.serialTimer <= 0 && (this.interruptsRequested |= 8, this.checkIRQMatching()), this.serialShiftTimer -= this.CPUTicks, this.serialShiftTimer <= 0 && (this.serialShiftTimer = this.serialShiftTimerAllocated, this.memory[gt] = this.memory[gt] << 1 & 254 | 1))
                }
                updateCoreFull() { this.updateCore(), this.cpu.ticks >= this.cpu.cyclesTotal && this.iterationEndRoutine() }
                initializeLCDController() { for (var t = 0; t < 154;) t < 143 ? this.LINECONTROL[t] = (() => { this.LCDTicks < 80 ? this.scanLineMode2() : this.LCDTicks < 252 ? this.scanLineMode3() : this.LCDTicks < 456 ? this.scanLineMode0() : (this.LCDTicks -= 456, 3 != this.STATTracker && (2 != this.STATTracker && (0 === this.STATTracker && this.mode2TriggerSTAT && (this.interruptsRequested |= 2), this.incrementScanLineQueue()), this.hdmaRunning && this.executeHDMA(), this.mode0TriggerSTAT && (this.interruptsRequested |= 2)), this.actualScanLine = ++this.memory[65348], this.actualScanLine === this.memory[65349] ? (this.memory[65345] |= 4, this.LYCMatchTriggerSTAT && (this.interruptsRequested |= 2)) : this.memory[65345] &= 123, this.checkIRQMatching(), this.STATTracker = 0, this.modeSTAT = 2, this.LINECONTROL[this.actualScanLine].apply(this)) }) : 143 === t ? this.LINECONTROL[143] = (() => { this.LCDTicks < 80 ? this.scanLineMode2() : this.LCDTicks < 252 ? this.scanLineMode3() : this.LCDTicks < 456 ? this.scanLineMode0() : (this.LCDTicks -= 456, 3 != this.STATTracker && (2 != this.STATTracker && (0 === this.STATTracker && this.mode2TriggerSTAT && (this.interruptsRequested |= 2), this.incrementScanLineQueue()), this.hdmaRunning && this.executeHDMA(), this.mode0TriggerSTAT && (this.interruptsRequested |= 2)), this.actualScanLine = this.memory[65348] = 144, 144 === this.memory[65349] ? (this.memory[65345] |= 4, this.LYCMatchTriggerSTAT && (this.interruptsRequested |= 2)) : this.memory[65345] &= 123, this.STATTracker = 0, this.modeSTAT = 1, this.interruptsRequested |= this.mode1TriggerSTAT ? 3 : 1, this.checkIRQMatching(), 0 === this.drewBlank ? (this.cpu.totalLinesPassed < 144 || 144 === this.cpu.totalLinesPassed && this.midScanlineOffset > -1) && (this.graphicsJITVBlank(), this.lcdDevice.prepareFrame()) : --this.drewBlank, this.LINECONTROL[144].apply(this)) }) : t < 153 ? this.LINECONTROL[t] = (() => { this.LCDTicks >= 456 && (this.LCDTicks -= 456, this.actualScanLine = ++this.memory[65348], this.actualScanLine === this.memory[65349] ? (this.memory[65345] |= 4, this.LYCMatchTriggerSTAT && (this.interruptsRequested |= 2, this.checkIRQMatching())) : this.memory[65345] &= 123, this.LINECONTROL[this.actualScanLine].apply(this)) }) : this.LINECONTROL[153] = (() => { this.LCDTicks >= 8 && (4 != this.STATTracker && 153 === this.memory[65348] && (this.memory[65348] = 0, 0 === this.memory[65349] ? (this.memory[65345] |= 4, this.LYCMatchTriggerSTAT && (this.interruptsRequested |= 2, this.checkIRQMatching())) : this.memory[65345] &= 123, this.STATTracker = 4), this.LCDTicks >= 456 && (this.LCDTicks -= 456, this.STATTracker = this.actualScanLine = 0, this.LINECONTROL[0].apply(this))) }), ++t }
                executeHDMA() { this.DMAWrite(1), this.halt ? this.LCDTicks - this.spriteCount < (4 >> this.doubleSpeedShifter | 32) && (this.CPUTicks = 4 + (32 + this.spriteCount << this.doubleSpeedShifter), this.LCDTicks = this.spriteCount + (4 >> this.doubleSpeedShifter | 32)) : this.LCDTicks += 4 >> this.doubleSpeedShifter | 32, 0 === this.memory[65365] ? (this.hdmaRunning = !1, this.memory[65365] = 255) : --this.memory[65365] }
                updateClock() { this.cartridge.mbc && this.cartridge.mbc.rtc && this.cartridge.mbc.rtc.updateClock() }
                renderScanLine(t) {
                    if (this.pixelStart = 160 * t, this.bgEnabled) this.pixelEnd = 160, this.renderBGLayer(t), this.renderWindowLayer(t);
                    else {
                        const e = 160 * (t + 1),
                            r = this.cartridge.useGBCMode || this.colorizedGBPalettes ? 16316664 : 15728606;
                        for (let i = 160 * t + this.currentX; i < e; i++) this.frameBuffer[i] = r
                    }
                    this.renderSpriteLayer(t), this.currentX = 0, this.midScanlineOffset = -1
                }
                renderMidScanLine() {
                    if (this.actualScanLine < 144 && 3 === this.modeSTAT && (-1 === this.midScanlineOffset && (this.midScanlineOffset = 7 & this.backgroundX), this.LCDTicks >= 82)) {
                        if (this.pixelEnd = this.LCDTicks - 74, this.pixelEnd = Math.min(this.pixelEnd - this.midScanlineOffset - this.pixelEnd % 8, 160), this.bgEnabled) this.pixelStart = 160 * this.lastUnrenderedLine, this.renderBGLayer(this.lastUnrenderedLine), this.renderWindowLayer(this.lastUnrenderedLine);
                        else
                            for (var t = 160 * this.lastUnrenderedLine + this.pixelEnd, e = this.cartridge.useGBCMode || this.colorizedGBPalettes ? 16316664 : 15728606, r = 160 * this.lastUnrenderedLine + this.currentX; r < t; r++) this.frameBuffer[r] = e;
                        this.currentX = this.pixelEnd
                    }
                }
                initializeModeSpecificArrays() { this.LCDCONTROL = this.LCDisOn ? this.LINECONTROL : this.DISPLAYOFFCONTROL, this.cartridge.useGBCMode ? (this.gbcOBJRawPalette = c(64, 0, "uint8"), this.gbcBGRawPalette = c(64, 0, "uint8"), this.gbcOBJPalette = c(32, 16777216, "int32"), this.gbcBGPalette = c(64, 0, "int32"), this.BGCHRBank2 = c(2048, 0, "uint8"), this.BGCHRCurrentBank = this.currVRAMBank > 0 ? this.BGCHRBank2 : this.BGCHRBank1, this.tileCache = this.generateCacheArray(3968)) : (this.gbOBJPalette = c(8, 0, "int32"), this.gbBGPalette = c(4, 0, "int32"), this.BGPalette = this.gbBGPalette, this.OBJPalette = this.gbOBJPalette, this.tileCache = this.generateCacheArray(1792), this.sortBuffer = c(256, 0, "uint8"), this.OAMAddressCache = c(10, 0, "int32")), this.renderPathBuild() }
                adjustGBCtoGBMode() { console.log("Stepping down from GBC mode."), this.VRAM = this.GBCMemory = this.BGCHRCurrentBank = this.BGCHRBank2 = null, this.tileCache.length = 1792, s.colorizeGBMode ? (this.gbBGColorizedPalette = c(4, 0, "int32"), this.gbOBJColorizedPalette = c(8, 0, "int32"), this.cachedBGPaletteConversion = c(4, 0, "int32"), this.cachedOBJPaletteConversion = c(8, 0, "int32"), this.BGPalette = this.gbBGColorizedPalette, this.OBJPalette = this.gbOBJColorizedPalette, this.gbOBJPalette = this.gbBGPalette = null, this.getGBCColor()) : (this.gbOBJPalette = c(8, 0, "int32"), this.gbBGPalette = c(4, 0, "int32"), this.BGPalette = this.gbBGPalette, this.OBJPalette = this.gbOBJPalette), this.sortBuffer = c(256, 0, "uint8"), this.OAMAddressCache = c(10, 0, "int32"), this.renderPathBuild(), this.jumpCompile() }
                renderPathBuild() { this.cartridge.useGBCMode ? (this.priorityFlaggingPathRebuild(), this.renderSpriteLayer = this.renderSpriteGBCLayer) : (this.renderBGLayer = this.renderBGGBLayer, this.renderWindowLayer = this.renderWindowGBLayer, this.renderSpriteLayer = this.renderSpriteGBLayer) }
                priorityFlaggingPathRebuild() { this.hasBGPriority ? (this.renderBGLayer = this.BGGBCLayerRender, this.renderWindowLayer = this.WindowGBCLayerRender) : (this.renderBGLayer = this.BGGBCLayerRenderNoPriorityFlagging, this.renderWindowLayer = this.WindowGBCLayerRenderNoPriorityFlagging) }
                initializeReferencesFromSaveState() {
                    if (this.LCDCONTROL = this.LCDisOn ? this.LINECONTROL : this.DISPLAYOFFCONTROL, this.cartridge.useGBCMode) { this.BGCHRCurrentBank = this.currVRAMBank > 0 ? this.BGCHRBank2 : this.BGCHRBank1, this.tileCache = this.generateCacheArray(3968); for (let t = 0; t < 6144; t += 16) this.generateGBCTileBank1(t), this.generateGBCTileBank2(t) } else {
                        this.colorizedGBPalettes ? (this.BGPalette = this.gbBGColorizedPalette, this.OBJPalette = this.gbOBJColorizedPalette, this.updateGBBGPalette = this.updateGBColorizedBGPalette, this.updateGBOBJPalette = this.updateGBColorizedOBJPalette) : (this.BGPalette = this.gbBGPalette, this.OBJPalette = this.gbOBJPalette), this.tileCache = this.generateCacheArray(1792);
                        for (let t = 32768; t < 36864; t += 2) this.generateGBOAMTileLine(t);
                        for (let t = 36864; t < 38912; t += 2) this.generateGBTileLine(t);
                        this.sortBuffer = c(256, 0, "uint8"), this.OAMAddressCache = c(10, 0, "int32")
                    }
                    this.renderPathBuild()
                }
                adjustRGBTint(t) {
                    const e = 31 & t,
                        r = t >> 5 & 31,
                        i = t >> 10 & 31;
                    return 13 * e + 2 * r + i >> 1 << 16 | 3 * r + i << 9 | 3 * e + 2 * r + 11 * i >> 1
                }
                getGBCColor() {
                    for (let t = 0; t < 4; t++) {
                        const e = t << 1;
                        this.cachedBGPaletteConversion[t] = this.adjustRGBTint(this.gbcBGRawPalette[1 | e] << 8 | this.gbcBGRawPalette[e]), this.cachedOBJPaletteConversion[t] = this.adjustRGBTint(this.gbcOBJRawPalette[1 | e] << 8 | this.gbcOBJRawPalette[e])
                    }
                    for (let t = 4; t < 8; t++) {
                        const e = t << 1;
                        this.cachedOBJPaletteConversion[t] = this.adjustRGBTint(this.gbcOBJRawPalette[1 | e] << 8 | this.gbcOBJRawPalette[e])
                    }
                    this.updateGBBGPalette = this.updateGBColorizedBGPalette, this.updateGBOBJPalette = this.updateGBColorizedOBJPalette, this.updateGBBGPalette(this.memory[65351]), this.updateGBOBJPalette(0, this.memory[65352]), this.updateGBOBJPalette(1, this.memory[65353]), this.colorizedGBPalettes = !0
                }
                updateGBRegularBGPalette(t) { this.gbBGPalette[0] = 33554432 | this.colors[3 & t], this.gbBGPalette[1] = this.colors[t >> 2 & 3], this.gbBGPalette[2] = this.colors[t >> 4 & 3], this.gbBGPalette[3] = this.colors[t >> 6] }
                updateGBColorizedBGPalette(t) { this.gbBGColorizedPalette[0] = 33554432 | this.cachedBGPaletteConversion[3 & t], this.gbBGColorizedPalette[1] = this.cachedBGPaletteConversion[t >> 2 & 3], this.gbBGColorizedPalette[2] = this.cachedBGPaletteConversion[t >> 4 & 3], this.gbBGColorizedPalette[3] = this.cachedBGPaletteConversion[t >> 6] }
                updateGBRegularOBJPalette(t, e) { this.gbOBJPalette[1 | t] = this.colors[e >> 2 & 3], this.gbOBJPalette[2 | t] = this.colors[e >> 4 & 3], this.gbOBJPalette[3 | t] = this.colors[e >> 6] }
                updateGBColorizedOBJPalette(t, e) { this.gbOBJColorizedPalette[1 | t] = this.cachedOBJPaletteConversion[t | e >> 2 & 3], this.gbOBJColorizedPalette[2 | t] = this.cachedOBJPaletteConversion[t | e >> 4 & 3], this.gbOBJColorizedPalette[3 | t] = this.cachedOBJPaletteConversion[t | e >> 6] }
                updateGBCBGPalette(t, e) { this.gbcBGRawPalette[t] != e && (this.midScanLineJIT(), this.gbcBGRawPalette[t] = e, 0 == (6 & t) ? (e = 33554432 | this.adjustRGBTint(this.gbcBGRawPalette[1 | t] << 8 | this.gbcBGRawPalette[62 & t]), t >>= 1, this.gbcBGPalette[t] = e, this.gbcBGPalette[32 | t] = 16777216 | e) : (e = this.adjustRGBTint(this.gbcBGRawPalette[1 | t] << 8 | this.gbcBGRawPalette[62 & t]), t >>= 1, this.gbcBGPalette[t] = e, this.gbcBGPalette[32 | t] = 16777216 | e)) }
                updateGBCOBJPalette(t, e) { this.gbcOBJRawPalette[t] !== e && (this.gbcOBJRawPalette[t] = e, (6 & t) > 0 && (this.midScanLineJIT(), this.gbcOBJPalette[t >> 1] = 16777216 | this.adjustRGBTint(this.gbcOBJRawPalette[1 | t] << 8 | this.gbcOBJRawPalette[62 & t]))) }
                renderBGGBLayer(t) {
                    var e = this.backgroundY + t & 255,
                        r = (7 & e) << 3,
                        i = this.gfxBackgroundCHRBankPosition | (248 & e) << 2,
                        s = this.backgroundX + this.currentX & 255,
                        n = this.pixelStart + this.currentX,
                        a = this.pixelStart + (this.gfxWindowDisplay && t - this.windowY >= 0 ? Math.min(Math.max(this.windowX, 0) + this.currentX, this.pixelEnd) : this.pixelEnd),
                        o = i + (s >> 3),
                        h = this.BGCHRBank1[o];
                    h < this.gfxBackgroundBankOffset && (h |= 256);
                    for (var u = this.tileCache[h], l = 7 & s; l < 8 && n < a && s < 256; ++s) this.frameBuffer[n++] = this.BGPalette[u[r | l++]];
                    var c = Math.min(a - n, 256 - s) >> 3;
                    for (s += c << 3, c += o; o < c;)(h = this.BGCHRBank1[++o]) < this.gfxBackgroundBankOffset && (h |= 256), u = this.tileCache[h], l = r, this.frameBuffer[n++] = this.BGPalette[u[l++]], this.frameBuffer[n++] = this.BGPalette[u[l++]], this.frameBuffer[n++] = this.BGPalette[u[l++]], this.frameBuffer[n++] = this.BGPalette[u[l++]], this.frameBuffer[n++] = this.BGPalette[u[l++]], this.frameBuffer[n++] = this.BGPalette[u[l++]], this.frameBuffer[n++] = this.BGPalette[u[l++]], this.frameBuffer[n++] = this.BGPalette[u[l]];
                    if (n < a) {
                        if (s < 256)
                            for ((h = this.BGCHRBank1[++o]) < this.gfxBackgroundBankOffset && (h |= 256), u = this.tileCache[h], l = r - 1; n < a && s < 256; ++s) this.frameBuffer[n++] = this.BGPalette[u[++l]];
                        for (c = (a - n >> 3) + i; i < c;)(h = this.BGCHRBank1[i++]) < this.gfxBackgroundBankOffset && (h |= 256), u = this.tileCache[h], l = r, this.frameBuffer[n++] = this.BGPalette[u[l++]], this.frameBuffer[n++] = this.BGPalette[u[l++]], this.frameBuffer[n++] = this.BGPalette[u[l++]], this.frameBuffer[n++] = this.BGPalette[u[l++]], this.frameBuffer[n++] = this.BGPalette[u[l++]], this.frameBuffer[n++] = this.BGPalette[u[l++]], this.frameBuffer[n++] = this.BGPalette[u[l++]], this.frameBuffer[n++] = this.BGPalette[u[l]];
                        if (n < a) switch ((h = this.BGCHRBank1[i]) < this.gfxBackgroundBankOffset && (h |= 256), u = this.tileCache[h], a - n) {
                            case 7:
                                this.frameBuffer[n + 6] = this.BGPalette[u[6 | r]];
                            case 6:
                                this.frameBuffer[n + 5] = this.BGPalette[u[5 | r]];
                            case 5:
                                this.frameBuffer[n + 4] = this.BGPalette[u[4 | r]];
                            case 4:
                                this.frameBuffer[n + 3] = this.BGPalette[u[3 | r]];
                            case 3:
                                this.frameBuffer[n + 2] = this.BGPalette[u[2 | r]];
                            case 2:
                                this.frameBuffer[n + 1] = this.BGPalette[u[1 | r]];
                            case 1:
                                this.frameBuffer[n] = this.BGPalette[u[r]]
                        }
                    }
                }
                BGGBCLayerRender(t) {
                    var e = this.backgroundY + t & 255,
                        r = (7 & e) << 3,
                        i = this.gfxBackgroundCHRBankPosition | (248 & e) << 2,
                        s = this.backgroundX + this.currentX & 255,
                        n = this.pixelStart + this.currentX,
                        a = this.pixelStart + (this.gfxWindowDisplay && t - this.windowY >= 0 ? Math.min(Math.max(this.windowX, 0) + this.currentX, this.pixelEnd) : this.pixelEnd),
                        o = i + (s >> 3),
                        h = this.BGCHRBank1[o];
                    h < this.gfxBackgroundBankOffset && (h |= 256);
                    for (var u = this.BGCHRBank2[o], l = this.tileCache[(8 & u) << 8 | (96 & u) << 4 | h], c = (7 & u) << 2 | (128 & u) >> 2, f = 7 & s; f < 8 && n < a && s < 256; ++s) this.frameBuffer[n++] = this.gbcBGPalette[c | l[r | f++]];
                    var d = Math.min(a - n, 256 - s) >> 3;
                    for (s += d << 3, d += o; o < d;)(h = this.BGCHRBank1[++o]) < this.gfxBackgroundBankOffset && (h |= 256), u = this.BGCHRBank2[o], l = this.tileCache[(8 & u) << 8 | (96 & u) << 4 | h], c = (7 & u) << 2 | (128 & u) >> 2, f = r, this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f]];
                    if (n < a) {
                        if (s < 256)
                            for ((h = this.BGCHRBank1[++o]) < this.gfxBackgroundBankOffset && (h |= 256), u = this.BGCHRBank2[o], l = this.tileCache[(8 & u) << 8 | (96 & u) << 4 | h], c = (7 & u) << 2 | (128 & u) >> 2, f = r - 1; n < a && s < 256; ++s) this.frameBuffer[n++] = this.gbcBGPalette[c | l[++f]];
                        for (d = (a - n >> 3) + i; i < d;)(h = this.BGCHRBank1[i]) < this.gfxBackgroundBankOffset && (h |= 256), u = this.BGCHRBank2[i++], l = this.tileCache[(8 & u) << 8 | (96 & u) << 4 | h], c = (7 & u) << 2 | (128 & u) >> 2, f = r, this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f]];
                        if (n < a) switch ((h = this.BGCHRBank1[i]) < this.gfxBackgroundBankOffset && (h |= 256), u = this.BGCHRBank2[i], l = this.tileCache[(8 & u) << 8 | (96 & u) << 4 | h], c = (7 & u) << 2 | (128 & u) >> 2, a - n) {
                            case 7:
                                this.frameBuffer[n + 6] = this.gbcBGPalette[c | l[6 | r]];
                            case 6:
                                this.frameBuffer[n + 5] = this.gbcBGPalette[c | l[5 | r]];
                            case 5:
                                this.frameBuffer[n + 4] = this.gbcBGPalette[c | l[4 | r]];
                            case 4:
                                this.frameBuffer[n + 3] = this.gbcBGPalette[c | l[3 | r]];
                            case 3:
                                this.frameBuffer[n + 2] = this.gbcBGPalette[c | l[2 | r]];
                            case 2:
                                this.frameBuffer[n + 1] = this.gbcBGPalette[c | l[1 | r]];
                            case 1:
                                this.frameBuffer[n] = this.gbcBGPalette[c | l[r]]
                        }
                    }
                }
                BGGBCLayerRenderNoPriorityFlagging(t) {
                    var e = this.backgroundY + t & 255,
                        r = (7 & e) << 3,
                        i = this.gfxBackgroundCHRBankPosition | (248 & e) << 2,
                        s = this.backgroundX + this.currentX & 255,
                        n = this.pixelStart + this.currentX,
                        a = this.pixelStart + (this.gfxWindowDisplay && t - this.windowY >= 0 ? Math.min(Math.max(this.windowX, 0) + this.currentX, this.pixelEnd) : this.pixelEnd),
                        o = i + (s >> 3),
                        h = this.BGCHRBank1[o];
                    h < this.gfxBackgroundBankOffset && (h |= 256);
                    for (var u = this.BGCHRBank2[o], l = this.tileCache[(8 & u) << 8 | (96 & u) << 4 | h], c = (7 & u) << 2, f = 7 & s; f < 8 && n < a && s < 256; ++s) this.frameBuffer[n++] = this.gbcBGPalette[c | l[r | f++]];
                    var d = Math.min(a - n, 256 - s) >> 3;
                    for (s += d << 3, d += o; o < d;)(h = this.BGCHRBank1[++o]) < this.gfxBackgroundBankOffset && (h |= 256), u = this.BGCHRBank2[o], l = this.tileCache[(8 & u) << 8 | (96 & u) << 4 | h], c = (7 & u) << 2, f = r, this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f]];
                    if (n < a) {
                        if (s < 256)
                            for ((h = this.BGCHRBank1[++o]) < this.gfxBackgroundBankOffset && (h |= 256), u = this.BGCHRBank2[o], l = this.tileCache[(8 & u) << 8 | (96 & u) << 4 | h], c = (7 & u) << 2, f = r - 1; n < a && s < 256; ++s) this.frameBuffer[n++] = this.gbcBGPalette[c | l[++f]];
                        for (d = (a - n >> 3) + i; i < d;)(h = this.BGCHRBank1[i]) < this.gfxBackgroundBankOffset && (h |= 256), u = this.BGCHRBank2[i++], l = this.tileCache[(8 & u) << 8 | (96 & u) << 4 | h], c = (7 & u) << 2, f = r, this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f++]], this.frameBuffer[n++] = this.gbcBGPalette[c | l[f]];
                        if (n < a) switch ((h = this.BGCHRBank1[i]) < this.gfxBackgroundBankOffset && (h |= 256), u = this.BGCHRBank2[i], l = this.tileCache[(8 & u) << 8 | (96 & u) << 4 | h], c = (7 & u) << 2, a - n) {
                            case 7:
                                this.frameBuffer[n + 6] = this.gbcBGPalette[c | l[6 | r]];
                            case 6:
                                this.frameBuffer[n + 5] = this.gbcBGPalette[c | l[5 | r]];
                            case 5:
                                this.frameBuffer[n + 4] = this.gbcBGPalette[c | l[4 | r]];
                            case 4:
                                this.frameBuffer[n + 3] = this.gbcBGPalette[c | l[3 | r]];
                            case 3:
                                this.frameBuffer[n + 2] = this.gbcBGPalette[c | l[2 | r]];
                            case 2:
                                this.frameBuffer[n + 1] = this.gbcBGPalette[c | l[1 | r]];
                            case 1:
                                this.frameBuffer[n] = this.gbcBGPalette[c | l[r]]
                        }
                    }
                }
                renderWindowGBLayer(t) {
                    if (this.gfxWindowDisplay) {
                        var e = t - this.windowY;
                        if (e >= 0) {
                            var r = this.windowX > 0 ? this.windowX + this.currentX : this.currentX,
                                i = this.pixelStart + r,
                                s = this.pixelStart + this.pixelEnd;
                            if (i < s) {
                                var n = (7 & e) << 3,
                                    a = (this.gfxWindowCHRBankPosition | (248 & e) << 2) + (this.currentX >> 3),
                                    o = this.BGCHRBank1[a];
                                o < this.gfxBackgroundBankOffset && (o |= 256);
                                var h = this.tileCache[o],
                                    u = r - this.windowX & 7;
                                for (r = Math.min(8, u + s - i); u < r;) this.frameBuffer[i++] = this.BGPalette[h[n | u++]];
                                for (r = a + (s - i >> 3); a < r;)(o = this.BGCHRBank1[++a]) < this.gfxBackgroundBankOffset && (o |= 256), h = this.tileCache[o], u = n, this.frameBuffer[i++] = this.BGPalette[h[u++]], this.frameBuffer[i++] = this.BGPalette[h[u++]], this.frameBuffer[i++] = this.BGPalette[h[u++]], this.frameBuffer[i++] = this.BGPalette[h[u++]], this.frameBuffer[i++] = this.BGPalette[h[u++]], this.frameBuffer[i++] = this.BGPalette[h[u++]], this.frameBuffer[i++] = this.BGPalette[h[u++]], this.frameBuffer[i++] = this.BGPalette[h[u]];
                                if (i < s) switch ((o = this.BGCHRBank1[++a]) < this.gfxBackgroundBankOffset && (o |= 256), h = this.tileCache[o], s - i) {
                                    case 7:
                                        this.frameBuffer[i + 6] = this.BGPalette[h[6 | n]];
                                    case 6:
                                        this.frameBuffer[i + 5] = this.BGPalette[h[5 | n]];
                                    case 5:
                                        this.frameBuffer[i + 4] = this.BGPalette[h[4 | n]];
                                    case 4:
                                        this.frameBuffer[i + 3] = this.BGPalette[h[3 | n]];
                                    case 3:
                                        this.frameBuffer[i + 2] = this.BGPalette[h[2 | n]];
                                    case 2:
                                        this.frameBuffer[i + 1] = this.BGPalette[h[1 | n]];
                                    case 1:
                                        this.frameBuffer[i] = this.BGPalette[h[n]]
                                }
                            }
                        }
                    }
                }
                WindowGBCLayerRender(t) {
                    if (this.gfxWindowDisplay) {
                        var e = t - this.windowY;
                        if (e >= 0) {
                            var r = this.windowX > 0 ? this.windowX + this.currentX : this.currentX,
                                i = this.pixelStart + r,
                                s = this.pixelStart + this.pixelEnd;
                            if (i < s) {
                                var n = (7 & e) << 3,
                                    a = (this.gfxWindowCHRBankPosition | (248 & e) << 2) + (this.currentX >> 3),
                                    o = this.BGCHRBank1[a];
                                o < this.gfxBackgroundBankOffset && (o |= 256);
                                var h = this.BGCHRBank2[a],
                                    u = this.tileCache[(8 & h) << 8 | (96 & h) << 4 | o],
                                    l = (7 & h) << 2 | (128 & h) >> 2,
                                    c = r - this.windowX & 7;
                                for (r = Math.min(8, c + s - i); c < r;) this.frameBuffer[i++] = this.gbcBGPalette[l | u[n | c++]];
                                for (r = a + (s - i >> 3); a < r;)(o = this.BGCHRBank1[++a]) < this.gfxBackgroundBankOffset && (o |= 256), h = this.BGCHRBank2[a], u = this.tileCache[(8 & h) << 8 | (96 & h) << 4 | o], l = (7 & h) << 2 | (128 & h) >> 2, c = n, this.frameBuffer[i++] = this.gbcBGPalette[l | u[c++]], this.frameBuffer[i++] = this.gbcBGPalette[l | u[c++]], this.frameBuffer[i++] = this.gbcBGPalette[l | u[c++]], this.frameBuffer[i++] = this.gbcBGPalette[l | u[c++]], this.frameBuffer[i++] = this.gbcBGPalette[l | u[c++]], this.frameBuffer[i++] = this.gbcBGPalette[l | u[c++]], this.frameBuffer[i++] = this.gbcBGPalette[l | u[c++]], this.frameBuffer[i++] = this.gbcBGPalette[l | u[c]];
                                if (i < s) switch ((o = this.BGCHRBank1[++a]) < this.gfxBackgroundBankOffset && (o |= 256), h = this.BGCHRBank2[a], u = this.tileCache[(8 & h) << 8 | (96 & h) << 4 | o], l = (7 & h) << 2 | (128 & h) >> 2, s - i) {
                                    case 7:
                                        this.frameBuffer[i + 6] = this.gbcBGPalette[l | u[6 | n]];
                                    case 6:
                                        this.frameBuffer[i + 5] = this.gbcBGPalette[l | u[5 | n]];
                                    case 5:
                                        this.frameBuffer[i + 4] = this.gbcBGPalette[l | u[4 | n]];
                                    case 4:
                                        this.frameBuffer[i + 3] = this.gbcBGPalette[l | u[3 | n]];
                                    case 3:
                                        this.frameBuffer[i + 2] = this.gbcBGPalette[l | u[2 | n]];
                                    case 2:
                                        this.frameBuffer[i + 1] = this.gbcBGPalette[l | u[1 | n]];
                                    case 1:
                                        this.frameBuffer[i] = this.gbcBGPalette[l | u[n]]
                                }
                            }
                        }
                    }
                }
                WindowGBCLayerRenderNoPriorityFlagging(t) {
                    if (this.gfxWindowDisplay) {
                        var e = t - this.windowY;
                        if (e >= 0) {
                            var r = this.windowX > 0 ? this.windowX + this.currentX : this.currentX,
                                i = this.pixelStart + r,
                                s = this.pixelStart + this.pixelEnd;
                            if (i < s) {
                                var n = (7 & e) << 3,
                                    a = (this.gfxWindowCHRBankPosition | (248 & e) << 2) + (this.currentX >> 3),
                                    o = this.BGCHRBank1[a];
                                o < this.gfxBackgroundBankOffset && (o |= 256);
                                var h = this.BGCHRBank2[a],
                                    u = this.tileCache[(8 & h) << 8 | (96 & h) << 4 | o],
                                    l = (7 & h) << 2,
                                    c = r - this.windowX & 7;
                                for (r = Math.min(8, c + s - i); c < r;) this.frameBuffer[i++] = this.gbcBGPalette[l | u[n | c++]];
                                for (r = a + (s - i >> 3); a < r;)(o = this.BGCHRBank1[++a]) < this.gfxBackgroundBankOffset && (o |= 256), h = this.BGCHRBank2[a], u = this.tileCache[(8 & h) << 8 | (96 & h) << 4 | o], l = (7 & h) << 2, c = n, this.frameBuffer[i++] = this.gbcBGPalette[l | u[c++]], this.frameBuffer[i++] = this.gbcBGPalette[l | u[c++]], this.frameBuffer[i++] = this.gbcBGPalette[l | u[c++]], this.frameBuffer[i++] = this.gbcBGPalette[l | u[c++]], this.frameBuffer[i++] = this.gbcBGPalette[l | u[c++]], this.frameBuffer[i++] = this.gbcBGPalette[l | u[c++]], this.frameBuffer[i++] = this.gbcBGPalette[l | u[c++]], this.frameBuffer[i++] = this.gbcBGPalette[l | u[c]];
                                if (i < s) switch ((o = this.BGCHRBank1[++a]) < this.gfxBackgroundBankOffset && (o |= 256), h = this.BGCHRBank2[a], u = this.tileCache[(8 & h) << 8 | (96 & h) << 4 | o], l = (7 & h) << 2, s - i) {
                                    case 7:
                                        this.frameBuffer[i + 6] = this.gbcBGPalette[l | u[6 | n]];
                                    case 6:
                                        this.frameBuffer[i + 5] = this.gbcBGPalette[l | u[5 | n]];
                                    case 5:
                                        this.frameBuffer[i + 4] = this.gbcBGPalette[l | u[4 | n]];
                                    case 4:
                                        this.frameBuffer[i + 3] = this.gbcBGPalette[l | u[3 | n]];
                                    case 3:
                                        this.frameBuffer[i + 2] = this.gbcBGPalette[l | u[2 | n]];
                                    case 2:
                                        this.frameBuffer[i + 1] = this.gbcBGPalette[l | u[1 | n]];
                                    case 1:
                                        this.frameBuffer[i] = this.gbcBGPalette[l | u[n]]
                                }
                            }
                        }
                    }
                }
                renderSpriteGBLayer(t) {
                    if (this.gfxSpriteShow) {
                        for (var e = t + 16, r = 65024, i = 0, s = 1, n = 0, a = 0, o = 0, h = 0, u = null, l = 0, c = 0, f = 0, d = 0; s < 168;) this.sortBuffer[s++] = 255;
                        if (this.gfxSpriteNormalHeight)
                            for (let t = this.findLowestSpriteDrawable(e, 7); c < t; ++c)
                                for (r = this.OAMAddressCache[c], i = e - this.memory[r] << 3, h = (16 & (o = this.memory[3 | r])) >> 2, u = this.tileCache[(96 & o) << 4 | this.memory[2 | r]], d = n = this.memory[1 | r], a = Math.min(168 - d, 8), s = d > 7 ? 0 : 8 - d, f = this.pixelStart + (d > 8 ? d - 8 : 0); s < a; ++s, ++f, ++d) this.sortBuffer[d] > n && (this.frameBuffer[f] >= 33554432 ? (l = u[i | s]) > 0 && (this.frameBuffer[f] = this.OBJPalette[h | l], this.sortBuffer[d] = n) : this.frameBuffer[f] < 16777216 && (l = u[i | s]) > 0 && o < 128 && (this.frameBuffer[f] = this.OBJPalette[h | l], this.sortBuffer[d] = n));
                        else
                            for (let t = this.findLowestSpriteDrawable(e, 15); c < t; ++c)
                                for (r = this.OAMAddressCache[c], i = e - this.memory[r] << 3, h = (16 & (o = this.memory[3 | r])) >> 2, u = (64 & o) == (64 & i) ? this.tileCache[(96 & o) << 4 | 254 & this.memory[2 | r]] : this.tileCache[(96 & o) << 4 | this.memory[2 | r] | 1], i &= 63, d = n = this.memory[1 | r], a = Math.min(168 - d, 8), s = d > 7 ? 0 : 8 - d, f = this.pixelStart + (d > 8 ? d - 8 : 0); s < a; ++s, ++f, ++d) this.sortBuffer[d] > n && (this.frameBuffer[f] >= 33554432 ? (l = u[i | s]) > 0 && (this.frameBuffer[f] = this.OBJPalette[h | l], this.sortBuffer[d] = n) : this.frameBuffer[f] < 16777216 && (l = u[i | s]) > 0 && o < 128 && (this.frameBuffer[f] = this.OBJPalette[h | l], this.sortBuffer[d] = n))
                    }
                }
                findLowestSpriteDrawable(t, e) { for (var r = 65024, i = 0, s = 0; r < 65184 && i < 10;)((s = t - this.memory[r]) & e) === s && (this.OAMAddressCache[i++] = r), r += 4; return i }
                renderSpriteGBCLayer(t) {
                    if (this.gfxSpriteShow) {
                        var e = 65024,
                            r = t + 16,
                            i = 0,
                            s = 0,
                            n = 0,
                            a = 0,
                            o = 0,
                            h = 0,
                            u = null,
                            l = 0,
                            c = 0,
                            f = 0;
                        if (this.gfxSpriteNormalHeight) {
                            for (; e < 65184 && f < 10; e += 4)
                                if ((7 & (i = r - this.memory[e])) === i) { for (s = this.memory[1 | e] - 8, n = Math.min(160, s + 8), h = (7 & (o = this.memory[3 | e])) << 2, u = this.tileCache[(8 & o) << 8 | (96 & o) << 4 | this.memory[2 | e]], a = s > 0 ? s : 0, s -= i << 3, c = this.pixelStart + a; a < n; ++a, ++c) this.frameBuffer[c] >= 33554432 ? (l = u[a - s]) > 0 && (this.frameBuffer[c] = this.gbcOBJPalette[h | l]) : this.frameBuffer[c] < 16777216 && (l = u[a - s]) > 0 && o < 128 && (this.frameBuffer[c] = this.gbcOBJPalette[h | l]);++f }
                        } else
                            for (; e < 65184 && f < 10; e += 4)
                                if ((15 & (i = r - this.memory[e])) === i) { for (s = this.memory[1 | e] - 8, n = Math.min(160, s + 8), h = (7 & (o = this.memory[3 | e])) << 2, u = (64 & o) == (64 & i << 3) ? this.tileCache[(8 & o) << 8 | (96 & o) << 4 | 254 & this.memory[2 | e]] : this.tileCache[(8 & o) << 8 | (96 & o) << 4 | this.memory[2 | e] | 1], a = s > 0 ? s : 0, s -= (7 & i) << 3, c = this.pixelStart + a; a < n; ++a, ++c) this.frameBuffer[c] >= 33554432 ? (l = u[a - s]) > 0 && (this.frameBuffer[c] = this.gbcOBJPalette[h | l]) : this.frameBuffer[c] < 16777216 && (l = u[a - s]) > 0 && o < 128 && (this.frameBuffer[c] = this.gbcOBJPalette[h | l]);++f }
                    }
                }
                generateGBTileLine(t) {
                    var e = this.memory[1 | t] << 8 | this.memory[40958 & t],
                        r = this.tileCache[(8176 & t) >> 4];
                    r[7 | (t = (14 & t) << 2)] = (256 & e) >> 7 | 1 & e, r[6 | t] = (512 & e) >> 8 | (2 & e) >> 1, r[5 | t] = (1024 & e) >> 9 | (4 & e) >> 2, r[4 | t] = (2048 & e) >> 10 | (8 & e) >> 3, r[3 | t] = (4096 & e) >> 11 | (16 & e) >> 4, r[2 | t] = (8192 & e) >> 12 | (32 & e) >> 5, r[1 | t] = (16384 & e) >> 13 | (64 & e) >> 6, r[t] = (32768 & e) >> 14 | (128 & e) >> 7
                }
                generateGBCTileLineBank1(t) {
                    var e = this.memory[1 | t] << 8 | this.memory[40958 & t];
                    t &= 8190;
                    var r = this.tileCache[t >> 4],
                        i = this.tileCache[512 | t >> 4],
                        s = this.tileCache[1024 | t >> 4],
                        n = this.tileCache[1536 | t >> 4],
                        a = 56 - (t = (14 & t) << 2);
                    n[a] = i[t] = s[7 | a] = r[7 | t] = (256 & e) >> 7 | 1 & e, n[1 | a] = i[1 | t] = s[6 | a] = r[6 | t] = (512 & e) >> 8 | (2 & e) >> 1, n[2 | a] = i[2 | t] = s[5 | a] = r[5 | t] = (1024 & e) >> 9 | (4 & e) >> 2, n[3 | a] = i[3 | t] = s[4 | a] = r[4 | t] = (2048 & e) >> 10 | (8 & e) >> 3, n[4 | a] = i[4 | t] = s[3 | a] = r[3 | t] = (4096 & e) >> 11 | (16 & e) >> 4, n[5 | a] = i[5 | t] = s[2 | a] = r[2 | t] = (8192 & e) >> 12 | (32 & e) >> 5, n[6 | a] = i[6 | t] = s[1 | a] = r[1 | t] = (16384 & e) >> 13 | (64 & e) >> 6, n[7 | a] = i[7 | t] = s[a] = r[t] = (32768 & e) >> 14 | (128 & e) >> 7
                }
                generateGBCTileBank1(t) {
                    var e = t >> 4,
                        r = this.tileCache[e],
                        i = this.tileCache[512 | e],
                        s = this.tileCache[1024 | e],
                        n = this.tileCache[1536 | e],
                        a = 0;
                    t |= 32768, e = 0;
                    var o = 56;
                    do { a = this.memory[1 | t] << 8 | this.memory[t], n[o] = i[e] = s[7 | o] = r[7 | e] = (256 & a) >> 7 | 1 & a, n[1 | o] = i[1 | e] = s[6 | o] = r[6 | e] = (512 & a) >> 8 | (2 & a) >> 1, n[2 | o] = i[2 | e] = s[5 | o] = r[5 | e] = (1024 & a) >> 9 | (4 & a) >> 2, n[3 | o] = i[3 | e] = s[4 | o] = r[4 | e] = (2048 & a) >> 10 | (8 & a) >> 3, n[4 | o] = i[4 | e] = s[3 | o] = r[3 | e] = (4096 & a) >> 11 | (16 & a) >> 4, n[5 | o] = i[5 | e] = s[2 | o] = r[2 | e] = (8192 & a) >> 12 | (32 & a) >> 5, n[6 | o] = i[6 | e] = s[1 | o] = r[1 | e] = (16384 & a) >> 13 | (64 & a) >> 6, n[7 | o] = i[7 | e] = s[o] = r[e] = (32768 & a) >> 14 | (128 & a) >> 7, e += 8, o -= 8, t += 2 } while (o > -1)
                }
                generateGBCTileLineBank2(t) {
                    var e = this.VRAM[1 | t] << 8 | this.VRAM[8190 & t],
                        r = this.tileCache[2048 | t >> 4],
                        i = this.tileCache[2560 | t >> 4],
                        s = this.tileCache[3072 | t >> 4],
                        n = this.tileCache[3584 | t >> 4],
                        a = 56 - (t = (14 & t) << 2);
                    n[a] = i[t] = s[7 | a] = r[7 | t] = (256 & e) >> 7 | 1 & e, n[1 | a] = i[1 | t] = s[6 | a] = r[6 | t] = (512 & e) >> 8 | (2 & e) >> 1, n[2 | a] = i[2 | t] = s[5 | a] = r[5 | t] = (1024 & e) >> 9 | (4 & e) >> 2, n[3 | a] = i[3 | t] = s[4 | a] = r[4 | t] = (2048 & e) >> 10 | (8 & e) >> 3, n[4 | a] = i[4 | t] = s[3 | a] = r[3 | t] = (4096 & e) >> 11 | (16 & e) >> 4, n[5 | a] = i[5 | t] = s[2 | a] = r[2 | t] = (8192 & e) >> 12 | (32 & e) >> 5, n[6 | a] = i[6 | t] = s[1 | a] = r[1 | t] = (16384 & e) >> 13 | (64 & e) >> 6, n[7 | a] = i[7 | t] = s[a] = r[t] = (32768 & e) >> 14 | (128 & e) >> 7
                }
                generateGBCTileBank2(t) {
                    var e = t >> 4,
                        r = this.tileCache[2048 | e],
                        i = this.tileCache[2560 | e],
                        s = this.tileCache[3072 | e],
                        n = this.tileCache[3584 | e],
                        a = 0;
                    e = 0;
                    var o = 56;
                    do { a = this.VRAM[1 | t] << 8 | this.VRAM[t], n[o] = i[e] = s[7 | o] = r[7 | e] = (256 & a) >> 7 | 1 & a, n[1 | o] = i[1 | e] = s[6 | o] = r[6 | e] = (512 & a) >> 8 | (2 & a) >> 1, n[2 | o] = i[2 | e] = s[5 | o] = r[5 | e] = (1024 & a) >> 9 | (4 & a) >> 2, n[3 | o] = i[3 | e] = s[4 | o] = r[4 | e] = (2048 & a) >> 10 | (8 & a) >> 3, n[4 | o] = i[4 | e] = s[3 | o] = r[3 | e] = (4096 & a) >> 11 | (16 & a) >> 4, n[5 | o] = i[5 | e] = s[2 | o] = r[2 | e] = (8192 & a) >> 12 | (32 & a) >> 5, n[6 | o] = i[6 | e] = s[1 | o] = r[1 | e] = (16384 & a) >> 13 | (64 & a) >> 6, n[7 | o] = i[7 | e] = s[o] = r[e] = (32768 & a) >> 14 | (128 & a) >> 7, e += 8, o -= 8, t += 2 } while (o > -1)
                }
                generateGBOAMTileLine(t) {
                    var e = this.memory[1 | t] << 8 | this.memory[40958 & t];
                    t &= 8190;
                    var r = this.tileCache[t >> 4],
                        i = this.tileCache[512 | t >> 4],
                        s = this.tileCache[1024 | t >> 4],
                        n = this.tileCache[1536 | t >> 4],
                        a = 56 - (t = (14 & t) << 2);
                    n[a] = i[t] = s[7 | a] = r[7 | t] = (256 & e) >> 7 | 1 & e, n[1 | a] = i[1 | t] = s[6 | a] = r[6 | t] = (512 & e) >> 8 | (2 & e) >> 1, n[2 | a] = i[2 | t] = s[5 | a] = r[5 | t] = (1024 & e) >> 9 | (4 & e) >> 2, n[3 | a] = i[3 | t] = s[4 | a] = r[4 | t] = (2048 & e) >> 10 | (8 & e) >> 3, n[4 | a] = i[4 | t] = s[3 | a] = r[3 | t] = (4096 & e) >> 11 | (16 & e) >> 4, n[5 | a] = i[5 | t] = s[2 | a] = r[2 | t] = (8192 & e) >> 12 | (32 & e) >> 5, n[6 | a] = i[6 | t] = s[1 | a] = r[1 | t] = (16384 & e) >> 13 | (64 & e) >> 6, n[7 | a] = i[7 | t] = s[a] = r[t] = (32768 & e) >> 14 | (128 & e) >> 7
                }
                graphicsJIT() { this.LCDisOn && (this.cpu.totalLinesPassed = 0, this.graphicsJITScanlineGroup()) }
                graphicsJITVBlank() { this.cpu.totalLinesPassed += this.queuedScanLines, this.graphicsJITScanlineGroup() }
                graphicsJITScanlineGroup() { for (; this.queuedScanLines > 0;) this.renderScanLine(this.lastUnrenderedLine), this.lastUnrenderedLine < 143 ? ++this.lastUnrenderedLine : this.lastUnrenderedLine = 0, --this.queuedScanLines }
                incrementScanLineQueue() { this.queuedScanLines < 144 ? ++this.queuedScanLines : (this.currentX = 0, this.midScanlineOffset = -1, this.lastUnrenderedLine < 143 ? ++this.lastUnrenderedLine : this.lastUnrenderedLine = 0) }
                midScanLineJIT() { this.graphicsJIT(), this.renderMidScanLine() }
                launchIRQ() {
                    var t = 0,
                        e = 1;
                    do {
                        if ((e & this.IRQLineMatched) === e) return this.IME = !1, this.interruptsRequested -= e, this.IRQLineMatched = 0, this.CPUTicks = 20, this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, this.programCounter >> 8]), this.stackPointer = this.stackPointer - 1 & 65535, this.memoryWriter[this.stackPointer].apply(this, [this.stackPointer, 255 & this.programCounter]), this.programCounter = 64 | t << 3, void this.updateCore();
                        e = 1 << ++t
                    } while (t < 5)
                }
                checkIRQMatching() { this.IME && (this.IRQLineMatched = this.interruptsEnabled & this.interruptsRequested & 31) }
                calculateHALTPeriod() {
                    if (this.halt) t = this.remainingClocks;
                    else {
                        this.halt = !0;
                        var t = -1;
                        if (this.LCDisOn && (1 == (1 & this.interruptsEnabled) && (t = 456 * ((1 === this.modeSTAT ? 298 : 144) - this.actualScanLine) - this.LCDTicks << this.doubleSpeedShifter), 2 == (2 & this.interruptsEnabled))) {
                            if (this.mode0TriggerSTAT) {
                                const e = this.clocksUntilMode0() - this.LCDTicks << this.doubleSpeedShifter;
                                (e <= t || -1 === t) && (t = e)
                            }
                            if (this.mode1TriggerSTAT && 0 == (1 & this.interruptsEnabled)) {
                                const e = 456 * ((1 === this.modeSTAT ? 298 : 144) - this.actualScanLine) - this.LCDTicks << this.doubleSpeedShifter;
                                (e <= t || -1 === t) && (t = e)
                            }
                            if (this.mode2TriggerSTAT) {
                                const e = (this.actualScanLine >= 143 ? 456 * (154 - this.actualScanLine) : 456) - this.LCDTicks << this.doubleSpeedShifter;
                                (e <= t || -1 === t) && (t = e)
                            }
                            if (this.LYCMatchTriggerSTAT && this.memory[65349] <= 153) {
                                const e = this.clocksUntilLYCMatch() - this.LCDTicks << this.doubleSpeedShifter;
                                (e <= t || -1 === t) && (t = e)
                            }
                        }
                        if (this.TIMAEnabled && 4 == (4 & this.interruptsEnabled)) {
                            const e = (256 - this.memory[65285]) * this.TACClocker - this.timerTicks;
                            (e <= t || -1 === t) && (t = e)
                        }
                        this.serialTimer > 0 && 8 == (8 & this.interruptsEnabled) && (this.serialTimer <= t || -1 === t) && (t = this.serialTimer)
                    }
                    var e = this.cpu.cyclesTotal - this.cpu.ticks << this.doubleSpeedShifter;
                    t >= 0 ? t <= e ? (this.CPUTicks = Math.max(t, this.CPUTicks), this.updateCoreFull(), this.halt = !1, this.CPUTicks = 0) : (this.CPUTicks = Math.max(e, this.CPUTicks), this.remainingClocks = t - this.CPUTicks) : this.CPUTicks += e
                }
                memoryRead(t) { return this.memoryNew.hasReader(t) ? this.memoryNew.read(t) : this.memoryReader[t].apply(this, [t]) }
                memoryHighRead(t) { return this.memoryNew.hasHighReader(t) ? this.memoryNew.readHigh(t) : this.memoryHighReader[t].apply(this, [t]) }
                memoryReadJumpCompile() {
                    for (let t = 0; t <= 65535; t++)
                        if (t >= 65280) switch (t) {
                            case 65296:
                                this.memoryHighReader[16] = this.memoryReader[65296] = (t => 128 | this.memory[65296]);
                                break;
                            case 65297:
                                this.memoryHighReader[17] = this.memoryReader[65297] = (t => 63 | this.memory[65297]);
                                break;
                            case 65298:
                                this.memoryHighReader[18] = this.memoryHighReadNormal, this.memoryReader[65298] = this.memoryReadNormal;
                                break;
                            case 65299:
                                this.memoryHighReader[19] = this.memoryReader[65299] = this.badMemoryRead;
                                break;
                            case 65300:
                                this.memoryHighReader[20] = this.memoryReader[65300] = (t => 191 | this.memory[65300]);
                                break;
                            case 65301:
                                this.memoryHighReader[21] = this.badMemoryRead, this.memoryReader[65301] = this.badMemoryRead;
                                break;
                            case 65302:
                                this.memoryHighReader[22] = this.memoryReader[65302] = (t => 63 | this.memory[65302]);
                                break;
                            case 65303:
                                this.memoryHighReader[23] = this.memoryHighReadNormal, this.memoryReader[65303] = this.memoryReadNormal;
                                break;
                            case 65304:
                                this.memoryHighReader[24] = this.memoryReader[65304] = this.badMemoryRead;
                                break;
                            case 65305:
                                this.memoryHighReader[25] = this.memoryReader[65305] = (t => 191 | this.memory[65305]);
                                break;
                            case 65306:
                                this.memoryHighReader[26] = this.memoryReader[65306] = (t => 127 | this.memory[65306]);
                                break;
                            case 65307:
                                this.memoryHighReader[27] = this.memoryReader[65307] = this.badMemoryRead;
                                break;
                            case 65308:
                                this.memoryHighReader[28] = this.memoryReader[65308] = (t => 159 | this.memory[65308]);
                                break;
                            case 65309:
                                this.memoryHighReader[29] = this.memoryReader[65309] = this.badMemoryRead;
                                break;
                            case 65310:
                                this.memoryHighReader[30] = this.memoryReader[65310] = (t => 191 | this.memory[65310]);
                                break;
                            case 65311:
                            case 65312:
                                this.memoryHighReader[255 & t] = this.memoryReader[t] = this.badMemoryRead;
                                break;
                            case 65313:
                            case 65314:
                                this.memoryHighReader[255 & t] = this.memoryHighReadNormal, this.memoryReader[t] = this.memoryReadNormal;
                                break;
                            case 65315:
                                this.memoryHighReader[35] = this.memoryReader[65315] = (t => 191 | this.memory[65315]);
                                break;
                            case 65316:
                            case 65317:
                                this.memoryHighReader[255 & t] = this.memoryHighReadNormal, this.memoryReader[t] = this.memoryReadNormal;
                                break;
                            case 65318:
                                this.memoryHighReader[38] = this.memoryReader[65318] = (t => (this.audioController.runJIT(), 112 | this.memory[65318]));
                                break;
                            case 65319:
                            case 65320:
                            case 65321:
                            case 65322:
                            case 65323:
                            case 65324:
                            case 65325:
                            case 65326:
                            case 65327:
                                this.memoryHighReader[255 & t] = this.memoryReader[t] = this.badMemoryRead;
                                break;
                            case 65328:
                            case 65329:
                            case 65330:
                            case 65331:
                            case 65332:
                            case 65333:
                            case 65334:
                            case 65335:
                            case 65336:
                            case 65337:
                            case 65338:
                            case 65339:
                            case 65340:
                            case 65341:
                            case 65342:
                            case 65343:
                                this.memoryReader[t] = (t => this.audioController.channel3canPlay ? this.memory[65280 | this.audioController.channel3lastSampleLookup >> 1] : this.memory[t]), this.memoryHighReader[255 & t] = (t => this.audioController.channel3canPlay ? this.memory[65280 | this.audioController.channel3lastSampleLookup >> 1] : this.memory[65280 | t]);
                                break;
                            case 65344:
                                this.memoryHighReader[64] = this.memoryHighReadNormal, this.memoryReader[65344] = this.memoryReadNormal;
                                break;
                            case 65345:
                                this.memoryHighReader[65] = this.memoryReader[65345] = (t => 128 | this.memory[65345] | this.modeSTAT);
                                break;
                            case 65346:
                                this.memoryHighReader[66] = this.memoryReader[65346] = (t => this.backgroundY);
                                break;
                            case 65347:
                                this.memoryHighReader[67] = this.memoryReader[65347] = (t => this.backgroundX);
                                break;
                            case 65348:
                                this.memoryHighReader[68] = this.memoryReader[65348] = (t => this.LCDisOn ? this.memory[65348] : 0);
                                break;
                            case 65349:
                            case 65350:
                            case 65351:
                            case 65352:
                            case 65353:
                                this.memoryHighReader[255 & t] = this.memoryHighReadNormal, this.memoryReader[t] = this.memoryReadNormal;
                                break;
                            case 65354:
                                this.memoryHighReader[74] = this.memoryReader[65354] = (t => this.windowY);
                                break;
                            case 65355:
                                this.memoryHighReader[75] = this.memoryHighReadNormal, this.memoryReader[65355] = this.memoryReadNormal;
                                break;
                            case 65356:
                                this.memoryHighReader[76] = this.memoryReader[65356] = this.badMemoryRead;
                                break;
                            case 65357:
                                this.memoryHighReader[77] = this.memoryHighReadNormal, this.memoryReader[65357] = this.memoryReadNormal;
                                break;
                            case 65358:
                                this.memoryHighReader[78] = this.memoryReader[65358] = this.badMemoryRead;
                                break;
                            case 65359:
                                this.memoryHighReader[79] = this.memoryReader[65359] = (t => this.currVRAMBank);
                                break;
                            case 65360:
                            case 65361:
                            case 65362:
                            case 65363:
                            case 65364:
                                this.memoryHighReader[255 & t] = this.memoryHighReadNormal, this.memoryReader[t] = this.memoryReadNormal;
                                break;
                            case 65365:
                                this.cartridge.useGBCMode ? this.memoryHighReader[85] = this.memoryReader[65365] = (t => (!this.LCDisOn && this.hdmaRunning && (this.DMAWrite(1 + (127 & this.memory[65365])), this.memory[65365] = 255, this.hdmaRunning = !1), this.memory[65365])) : (this.memoryReader[65365] = this.memoryReadNormal, this.memoryHighReader[85] = this.memoryHighReadNormal);
                                break;
                            case 65366:
                                this.cartridge.useGBCMode ? this.memoryHighReader[86] = this.memoryReader[65366] = (t => 60 | (this.memory[65366] >= 192 ? 2 | 193 & this.memory[65366] : 195 & this.memory[65366])) : (this.memoryReader[65366] = this.memoryReadNormal, this.memoryHighReader[86] = this.memoryHighReadNormal);
                                break;
                            case 65367:
                            case 65368:
                            case 65369:
                            case 65370:
                            case 65371:
                            case 65372:
                            case 65373:
                            case 65374:
                            case 65375:
                            case 65376:
                            case 65377:
                            case 65378:
                            case 65379:
                            case 65380:
                            case 65381:
                            case 65382:
                            case 65383:
                                this.memoryHighReader[255 & t] = this.memoryReader[t] = this.badMemoryRead;
                                break;
                            case 65384:
                            case 65385:
                            case 65386:
                            case 65387:
                                this.memoryHighReader[255 & t] = this.memoryHighReadNormal, this.memoryReader[t] = this.memoryReadNormal;
                                break;
                            case 65388:
                                this.cartridge.useGBCMode ? this.memoryHighReader[108] = this.memoryReader[65388] = (t => 254 | this.memory[65388]) : this.memoryHighReader[108] = this.memoryReader[65388] = this.badMemoryRead;
                                break;
                            case 65389:
                            case 65390:
                            case 65391:
                                this.memoryHighReader[255 & t] = this.memoryReader[t] = this.badMemoryRead;
                                break;
                            case 65392:
                                this.cartridge.useGBCMode ? this.memoryHighReader[112] = this.memoryReader[65392] = (t => 64 | this.memory[65392]) : this.memoryHighReader[112] = this.memoryReader[65392] = this.badMemoryRead;
                                break;
                            case 65393:
                                this.memoryHighReader[113] = this.memoryReader[65393] = this.badMemoryRead;
                                break;
                            case 65394:
                            case 65395:
                                this.memoryHighReader[255 & t] = this.memoryReader[t] = this.memoryReadNormal;
                                break;
                            case 65396:
                                this.cartridge.useGBCMode ? this.memoryHighReader[116] = this.memoryReader[65396] = this.memoryReadNormal : this.memoryHighReader[116] = this.memoryReader[65396] = this.badMemoryRead;
                                break;
                            case 65397:
                                this.memoryHighReader[117] = this.memoryReader[65397] = (t => 143 | this.memory[65397]);
                                break;
                            case 65398:
                                this.memoryHighReader[118] = this.memoryReader[65398] = (t => (this.audioController.runJIT(), this.audioController.channel2envelopeVolume << 4 | this.audioController.channel1envelopeVolume));
                                break;
                            case 65399:
                                this.memoryHighReader[119] = this.memoryReader[65399] = (t => (this.audioController.runJIT(), this.audioController.channel4envelopeVolume << 4 | this.audioController.channel3envelopeVolume));
                                break;
                            case 65400:
                            case 65401:
                            case 65402:
                            case 65403:
                            case 65404:
                            case 65405:
                            case 65406:
                            case 65407:
                                this.memoryHighReader[255 & t] = this.memoryReader[t] = this.badMemoryRead;
                                break;
                            case Bt:
                                this.memoryHighReader[255] = this.memoryReader[Bt] = (t => this.interruptsEnabled);
                                break;
                            default:
                                this.memoryReader[t] = this.memoryReadNormal, this.memoryHighReader[255 & t] = this.memoryHighReadNormal
                        } else this.memoryReader[t] = this.badMemoryRead
                }
                memoryReadNormal(t) { return this.memory[t] }
                memoryHighReadNormal(t) { return this.memory[65280 | t] }
                memoryReadROM(t) { return this.cartridge.rom.getByte(this.cartridge.mbc.currentROMBank + t) }
                memoryReadMBC(t) { return this.cartridge.mbc.readRAM(t) }
                memoryReadMBC7(t) { return this.cartridge.mbc.readRAM(t) }
                memoryReadMBC3(t) { return this.cartridge.mbc.readRAM(t) }
                memoryReadGBCMemory(t) { return this.GBCMemory[t + this.gbcRamBankPosition] }
                memoryReadOAM(t) { return this.modeSTAT > 1 ? 255 : this.memory[t] }
                memoryReadECHOGBCMemory(t) { return this.GBCMemory[t + this.gbcRamBankPositionECHO] }
                memoryReadECHONormal(t) { return this.memory[t - 8192] }
                badMemoryRead(t) { return 255 }
                VRAMDATAReadCGBCPU(t) { return this.modeSTAT > 2 ? 255 : 0 === this.currVRAMBank ? this.memory[t] : this.VRAM[8191 & t] }
                VRAMDATAReadDMGCPU(t) { return this.modeSTAT > 2 ? 255 : this.memory[t] }
                VRAMCHRReadCGBCPU(t) { return this.modeSTAT > 2 ? 255 : this.BGCHRCurrentBank[2047 & t] }
                VRAMCHRReadDMGCPU(t) { return this.modeSTAT > 2 ? 255 : this.BGCHRBank1[2047 & t] }
                memoryWrite(t, e) { this.memoryWriter[t].apply(this, [t, e]) }
                memoryHighWrite(t, e) { this.memoryHighWriter[t].apply(this, [t, e]) }
                memoryWriteJumpCompile() {
                    for (var t = 0; t <= 65535; t++) t <= K ? this.cartridge.hasMBC1 ? this.memoryWriter[t] = t < 8192 ? this.MBCWriteEnable : t < 16384 ? this.MBC1WriteROMBank : t < 24576 ? this.MBC1WriteRAMBank : this.MBC1WriteType : this.cartridge.hasMBC2 ? this.memoryWriter[t] = t < 4096 ? this.MBCWriteEnable : t >= 8448 && t < 8704 ? this.MBC2WriteROMBank : this.onIllegalWrite : this.cartridge.hasMBC3 ? this.memoryWriter[t] = t < 8192 ? this.MBCWriteEnable : t < 16384 ? this.MBC3WriteROMBank : t < 24576 ? this.MBC3WriteRAMBank : this.MBC3WriteRTCLatch : this.cartridge.hasMBC5 || this.cartridge.hasRUMBLE || this.cartridge.hasMBC7 ? this.memoryWriter[t] = t < 8192 ? this.MBCWriteEnable : t < 12288 ? this.MBC5WriteROMBankLow : t < 16384 ? this.MBC5WriteROMBankHigh : t < 24576 ? this.cartridge.hasRUMBLE ? this.RUMBLEWriteRAMBank : this.MBC5WriteRAMBank : this.onIllegalWrite : this.cartridge.hasHuC3 ? this.memoryWriter[t] = t < 8192 ? this.MBCWriteEnable : t < 16384 ? this.MBC3WriteROMBank : t < 24576 ? this.HuC3WriteRAMBank : this.onIllegalWrite : this.memoryWriter[t] = this.onIllegalWrite : t <= et ? this.memoryWriter[t] = this.cartridge.useGBCMode ? this.VRAMGBCDATAWrite : this.VRAMGBDATAWrite : t < 38912 ? this.memoryWriter[t] = this.cartridge.useGBCMode ? this.VRAMGBCDATAWrite : this.VRAMGBDATAUpperWrite : t < 40960 ? this.memoryWriter[t] = this.cartridge.useGBCMode ? this.VRAMGBCCHRMAPWrite : this.VRAMGBCHRMAPWrite : t < 49152 ? this.cartridge.mbc && 0 !== this.cartridge.mbc.ramSize ? this.cartridge.hasMBC3 ? this.memoryWriter[t] = this.memoryWriteMBC3RAM : this.memoryWriter[t] = this.memoryWriteMBCRAM : this.memoryWriter[t] = this.onIllegalWrite : t < 57344 ? this.cartridge.useGBCMode && t >= 53248 ? this.memoryWriter[t] = this.memoryWriteGBCRAM : this.memoryWriter[t] = this.memoryWriteNormal : t < 65024 ? this.cartridge.useGBCMode && t >= 61440 ? this.memoryWriter[t] = this.memoryWriteECHOGBCRAM : this.memoryWriter[t] = this.memoryWriteECHONormal : t <= 65184 ? this.memoryWriter[t] = this.memoryWriteOAMRAM : t < 65280 ? this.cartridge.useGBCMode ? this.memoryWriter[t] = this.memoryWriteNormal : this.memoryWriter[t] = this.onIllegalWrite : (this.memoryWriter[t] = this.memoryWriteNormal, this.memoryHighWriter[255 & t] = this.memoryHighWriteNormal);
                    this.registerWriteJumpCompile()
                }
                MBCWriteEnable(t, e) { this.cartridge.mbc.writeEnable(t, e) }
                MBC1WriteROMBank(t, e) { this.cartridge.mbc1.writeROMBank(t, e) }
                MBC1WriteRAMBank(t, e) { this.cartridge.mbc1.writeRAMBank(t, e) }
                MBC1WriteType(t, e) { this.cartridge.mbc1.writeType(t, e) }
                MBC2WriteROMBank(t, e) { this.cartridge.mbc2.writeROMBank(t, e) }
                MBC3WriteROMBank(t, e) { return this.cartridge.mbc3.writeROMBank(t, e) }
                MBC3WriteRAMBank(t, e) { return this.cartridge.mbc3.writeRAMBank(t, e) }
                MBC3WriteRTCLatch(t, e) { return this.cartridge.mbc3.rtc.writeLatch(t, e) }
                MBC5WriteROMBankLow(t, e) { return this.cartridge.mbc5.writeROMBankLow(t, e) }
                MBC5WriteROMBankHigh(t, e) { return this.cartridge.mbc5.writeROMBankHigh(t, e) }
                MBC5WriteRAMBank(t, e) { return this.cartridge.mbc5.writeRAMBank(t, e) }
                RUMBLEWriteRAMBank(t, e) { return this.cartridge.rumble.writeRAMBank(t, e) }
                HuC3WriteRAMBank(t, e) { this.cartridge.mbc.currentMBCRAMBank = 3 & e, this.cartridge.mbc.currentRAMBankPosition = (this.cartridge.mbc.currentMBCRAMBank << 13) - 40960 }
                onIllegalWrite(t, e) {}
                memoryWriteNormal(t, e) { this.memory[t] = e }
                memoryHighWriteNormal(t, e) { this.memory[65280 | t] = e }
                memoryWriteMBCRAM(t, e) { this.cartridge.mbc.writeRAM(t, e) }
                memoryWriteMBC3RAM(t, e) { return this.cartridge.mbc.writeRAM(t, e) }
                memoryWriteGBCRAM(t, e) { this.GBCMemory[t + this.gbcRamBankPosition] = e }
                memoryWriteOAMRAM(t, e) { this.modeSTAT < 2 && this.memory[t] != e && (this.graphicsJIT(), this.memory[t] = e) }
                memoryWriteECHOGBCRAM(t, e) { this.GBCMemory[t + this.gbcRamBankPositionECHO] = e }
                memoryWriteECHONormal(t, e) { this.memory[t - 8192] = e }
                VRAMGBDATAWrite(t, e) { this.modeSTAT < 3 && this.memory[t] != e && (this.graphicsJIT(), this.memory[t] = e, this.generateGBOAMTileLine(t)) }
                VRAMGBDATAUpperWrite(t, e) { this.modeSTAT < 3 && this.memory[t] != e && (this.graphicsJIT(), this.memory[t] = e, this.generateGBTileLine(t)) }
                VRAMGBCDATAWrite(t, e) { this.modeSTAT < 3 && (0 === this.currVRAMBank ? this.memory[t] != e && (this.graphicsJIT(), this.memory[t] = e, this.generateGBCTileLineBank1(t)) : (t &= 8191, this.VRAM[t] != e && (this.graphicsJIT(), this.VRAM[t] = e, this.generateGBCTileLineBank2(t)))) }
                VRAMGBCHRMAPWrite(t, e) { this.modeSTAT < 3 && (t &= 2047, this.BGCHRBank1[t] != e && (this.graphicsJIT(), this.BGCHRBank1[t] = e)) }
                VRAMGBCCHRMAPWrite(t, e) { this.modeSTAT < 3 && (t &= 2047, this.BGCHRCurrentBank[t] != e && (this.graphicsJIT(), this.BGCHRCurrentBank[t] = e)) }
                DMAWrite(t) {
                    this.halt || (this.CPUTicks += 4 | t << 5 << this.doubleSpeedShifter);
                    var e = this.memory[65361] << 8 | this.memory[65362],
                        r = this.memory[65363] << 8 | this.memory[65364];
                    this.graphicsJIT();
                    var i = this.memory;
                    if (0 === this.currVRAMBank)
                        do { r < 6144 ? (i[32768 | r] = this.memoryRead(e++), i[32769 | r] = this.memoryRead(e++), i[32770 | r] = this.memoryRead(e++), i[32771 | r] = this.memoryRead(e++), i[32772 | r] = this.memoryRead(e++), i[32773 | r] = this.memoryRead(e++), i[32774 | r] = this.memoryRead(e++), i[32775 | r] = this.memoryRead(e++), i[32776 | r] = this.memoryRead(e++), i[32777 | r] = this.memoryRead(e++), i[32778 | r] = this.memoryRead(e++), i[32779 | r] = this.memoryRead(e++), i[32780 | r] = this.memoryRead(e++), i[32781 | r] = this.memoryRead(e++), i[32782 | r] = this.memoryRead(e++), i[32783 | r] = this.memoryRead(e++), this.generateGBCTileBank1(r), r += 16) : (r &= 2032, this.BGCHRBank1[r++] = this.memoryRead(e++), this.BGCHRBank1[r++] = this.memoryRead(e++), this.BGCHRBank1[r++] = this.memoryRead(e++), this.BGCHRBank1[r++] = this.memoryRead(e++), this.BGCHRBank1[r++] = this.memoryRead(e++), this.BGCHRBank1[r++] = this.memoryRead(e++), this.BGCHRBank1[r++] = this.memoryRead(e++), this.BGCHRBank1[r++] = this.memoryRead(e++), this.BGCHRBank1[r++] = this.memoryRead(e++), this.BGCHRBank1[r++] = this.memoryRead(e++), this.BGCHRBank1[r++] = this.memoryRead(e++), this.BGCHRBank1[r++] = this.memoryRead(e++), this.BGCHRBank1[r++] = this.memoryRead(e++), this.BGCHRBank1[r++] = this.memoryRead(e++), this.BGCHRBank1[r++] = this.memoryRead(e++), this.BGCHRBank1[r++] = this.memoryRead(e++), r = r + 6144 & 8176), e &= 65520, --t } while (t > 0);
                    else {
                        var s = this.VRAM;
                        do { r < 6144 ? (s[r] = this.memoryRead(e++), s[1 | r] = this.memoryRead(e++), s[2 | r] = this.memoryRead(e++), s[3 | r] = this.memoryRead(e++), s[4 | r] = this.memoryRead(e++), s[5 | r] = this.memoryRead(e++), s[6 | r] = this.memoryRead(e++), s[7 | r] = this.memoryRead(e++), s[8 | r] = this.memoryRead(e++), s[9 | r] = this.memoryRead(e++), s[10 | r] = this.memoryRead(e++), s[11 | r] = this.memoryRead(e++), s[12 | r] = this.memoryRead(e++), s[13 | r] = this.memoryRead(e++), s[14 | r] = this.memoryRead(e++), s[15 | r] = this.memoryRead(e++), this.generateGBCTileBank2(r), r += 16) : (r &= 2032, this.BGCHRBank2[r++] = this.memoryRead(e++), this.BGCHRBank2[r++] = this.memoryRead(e++), this.BGCHRBank2[r++] = this.memoryRead(e++), this.BGCHRBank2[r++] = this.memoryRead(e++), this.BGCHRBank2[r++] = this.memoryRead(e++), this.BGCHRBank2[r++] = this.memoryRead(e++), this.BGCHRBank2[r++] = this.memoryRead(e++), this.BGCHRBank2[r++] = this.memoryRead(e++), this.BGCHRBank2[r++] = this.memoryRead(e++), this.BGCHRBank2[r++] = this.memoryRead(e++), this.BGCHRBank2[r++] = this.memoryRead(e++), this.BGCHRBank2[r++] = this.memoryRead(e++), this.BGCHRBank2[r++] = this.memoryRead(e++), this.BGCHRBank2[r++] = this.memoryRead(e++), this.BGCHRBank2[r++] = this.memoryRead(e++), this.BGCHRBank2[r++] = this.memoryRead(e++), r = r + 6144 & 8176), e &= 65520, --t } while (t > 0)
                    }
                    i[65361] = e >> 8, i[65362] = 240 & e, i[65363] = r >> 8, i[65364] = 240 & r
                }
                registerWriteJumpCompile() {
                    this.memoryHighWriter[0] = this.memoryWriter[pt] = ((t, e) => { this.memory[pt] = 48 & e | (0 == (32 & e) ? this.joypad.value >> 4 : 15) & (0 == (16 & e) ? 15 & this.joypad.value : 15) }), this.memoryHighWriter[1] = this.memoryWriter[gt] = ((t, e) => { this.memory[yt] < 128 && (this.memory[gt] = e) }), this.memoryHighWriter[2] = this.memoryHighWriteNormal, this.memoryWriter[yt] = this.memoryWriteNormal, this.memoryHighWriter[3] = this.memoryWriter[65283] = this.onIllegalWrite, this.memoryHighWriter[4] = this.memoryWriter[Ct] = ((t, e) => { this.DIVTicks &= 255, this.memory[Ct] = 0 }), this.memoryHighWriter[5] = this.memoryWriter[65285] = ((t, e) => { this.memory[65285] = e }), this.memoryHighWriter[6] = this.memoryWriter[65286] = ((t, e) => { this.memory[65286] = e }), this.memoryHighWriter[7] = this.memoryWriter[65287] = ((t, e) => { this.memory[65287] = 7 & e, this.TIMAEnabled = 4 == (4 & e), this.TACClocker = Math.pow(4, 0 != (3 & e) ? 3 & e : 4) << 2 }), this.memoryHighWriter[8] = this.memoryWriter[65288] = this.onIllegalWrite, this.memoryHighWriter[9] = this.memoryWriter[65289] = this.onIllegalWrite, this.memoryHighWriter[10] = this.memoryWriter[65290] = this.onIllegalWrite, this.memoryHighWriter[11] = this.memoryWriter[65291] = this.onIllegalWrite, this.memoryHighWriter[12] = this.memoryWriter[65292] = this.onIllegalWrite, this.memoryHighWriter[13] = this.memoryWriter[65293] = this.onIllegalWrite, this.memoryHighWriter[14] = this.memoryWriter[65294] = this.onIllegalWrite, this.memoryHighWriter[15] = this.memoryWriter[65295] = ((t, e) => { this.interruptsRequested = e, this.checkIRQMatching() }), this.memoryHighWriter[16] = this.memoryWriter[65296] = ((t, e) => { this.soundMasterEnabled && (this.audioController.runJIT(), this.audioController.channel1decreaseSweep && 0 == (8 & e) && this.audioController.channel1Swept && (this.audioController.channel1SweepFault = !0), this.audioController.channel1lastTimeSweep = (112 & e) >> 4, this.audioController.channel1frequencySweepDivider = 7 & e, this.audioController.channel1decreaseSweep = 8 == (8 & e), this.memory[65296] = e, this.audioController.checkChannel1Enable()) }), this.memoryHighWriter[17] = this.memoryWriter[65297] = ((t, e) => {!this.soundMasterEnabled && this.cartridge.useGBCMode || (this.soundMasterEnabled ? this.audioController.runJIT() : e &= 63, this.audioController.channel1CachedDuty = G[e >> 6], this.audioController.channel1totalLength = 64 - (63 & e), this.memory[65297] = e, this.audioController.checkChannel1Enable()) }), this.memoryHighWriter[18] = this.memoryWriter[65298] = ((t, e) => { this.soundMasterEnabled && (this.audioController.runJIT(), this.audioController.channel1Enabled && 0 === this.audioController.channel1envelopeSweeps && (8 == (8 & (this.memory[65298] ^ e)) ? (0 == (8 & this.memory[65298]) && (7 == (7 & this.memory[65298]) ? this.audioController.channel1envelopeVolume += 2 : ++this.audioController.channel1envelopeVolume), this.audioController.channel1envelopeVolume = 16 - this.audioController.channel1envelopeVolume & 15) : 8 == (15 & this.memory[65298]) && (this.audioController.channel1envelopeVolume = 1 + this.audioController.channel1envelopeVolume & 15), this.audioController.cacheChannel1OutputLevel()), this.audioController.channel1envelopeType = 8 == (8 & e), this.memory[65298] = e, this.audioController.checkChannel1VolumeEnable()) }), this.memoryHighWriter[19] = this.memoryWriter[65299] = ((t, e) => { this.soundMasterEnabled && (this.audioController.runJIT(), this.audioController.channel1frequency = 1792 & this.audioController.channel1frequency | e, this.audioController.channel1FrequencyTracker = 2048 - this.audioController.channel1frequency << 2) }), this.memoryHighWriter[20] = this.memoryWriter[65300] = ((t, e) => {
                        if (this.soundMasterEnabled) {
                            if (this.audioController.runJIT(), this.audioController.channel1consecutive = 0 == (64 & e), this.audioController.channel1frequency = (7 & e) << 8 | 255 & this.audioController.channel1frequency, this.audioController.channel1FrequencyTracker = 2048 - this.audioController.channel1frequency << 2, e > 127) {
                                this.audioController.channel1timeSweep = this.audioController.channel1lastTimeSweep, this.audioController.channel1Swept = !1;
                                var r = this.memory[65298];
                                this.audioController.channel1envelopeVolume = r >> 4, this.audioController.cacheChannel1OutputLevel(), this.audioController.channel1envelopeSweepsLast = (7 & r) - 1, 0 === this.audioController.channel1totalLength && (this.audioController.channel1totalLength = 64), this.audioController.channel1lastTimeSweep > 0 || this.audioController.channel1frequencySweepDivider > 0 ? this.memory[65318] |= 1 : this.memory[65318] &= 254, 64 == (64 & e) && (this.memory[65318] |= 1), this.audioController.channel1ShadowFrequency = this.audioController.channel1frequency, this.audioController.channel1SweepFault = !1, this.audioController.performChannel1AudioSweepDummy()
                            }
                            this.audioController.checkChannel1Enable(), this.memory[65300] = e
                        }
                    }), this.memoryHighWriter[21] = this.memoryWriter[65301] = this.onIllegalWrite, this.memoryHighWriter[22] = this.memoryWriter[65302] = ((t, e) => {!this.soundMasterEnabled && this.cartridge.useGBCMode || (this.soundMasterEnabled ? this.audioController.runJIT() : e &= 63, this.audioController.channel2CachedDuty = G[e >> 6], this.audioController.channel2totalLength = 64 - (63 & e), this.memory[65302] = e, this.audioController.checkChannel2Enable()) }), this.memoryHighWriter[23] = this.memoryWriter[65303] = ((t, e) => { this.soundMasterEnabled && (this.audioController.runJIT(), this.audioController.channel2Enabled && 0 === this.audioController.channel2envelopeSweeps && (8 == (8 & (this.memory[65303] ^ e)) ? (0 == (8 & this.memory[65303]) && (7 == (7 & this.memory[65303]) ? this.audioController.channel2envelopeVolume += 2 : ++this.audioController.channel2envelopeVolume), this.audioController.channel2envelopeVolume = 16 - this.audioController.channel2envelopeVolume & 15) : 8 == (15 & this.memory[65303]) && (this.audioController.channel2envelopeVolume = 1 + this.audioController.channel2envelopeVolume & 15), this.audioController.cacheChannel2OutputLevel()), this.audioController.channel2envelopeType = 8 == (8 & e), this.memory[65303] = e, this.audioController.checkChannel2VolumeEnable()) }), this.memoryHighWriter[24] = this.memoryWriter[65304] = ((t, e) => { this.soundMasterEnabled && (this.audioController.runJIT(), this.audioController.channel2frequency = 1792 & this.audioController.channel2frequency | e, this.audioController.channel2FrequencyTracker = 2048 - this.audioController.channel2frequency << 2) }), this.memoryHighWriter[25] = this.memoryWriter[65305] = ((t, e) => {
                        if (this.soundMasterEnabled) {
                            if (this.audioController.runJIT(), e > 127) {
                                var r = this.memory[65303];
                                this.audioController.channel2envelopeVolume = r >> 4, this.audioController.cacheChannel2OutputLevel(), this.audioController.channel2envelopeSweepsLast = (7 & r) - 1, 0 === this.audioController.channel2totalLength && (this.audioController.channel2totalLength = 64), 64 == (64 & e) && (this.memory[65318] |= 2)
                            }
                            this.audioController.channel2consecutive = 0 == (64 & e), this.audioController.channel2frequency = (7 & e) << 8 | 255 & this.audioController.channel2frequency, this.audioController.channel2FrequencyTracker = 2048 - this.audioController.channel2frequency << 2, this.memory[65305] = e, this.audioController.checkChannel2Enable()
                        }
                    }), this.memoryHighWriter[26] = this.memoryWriter[65306] = ((t, e) => { this.soundMasterEnabled && (this.audioController.runJIT(), !this.audioController.channel3canPlay && e >= 128 && (this.audioController.channel3lastSampleLookup = 0, this.audioController.cacheChannel3Update()), this.audioController.channel3canPlay = e > 127, this.audioController.channel3canPlay && this.memory[65306] > 127 && !this.audioController.channel3consecutive && (this.memory[65318] |= 4), this.memory[65306] = e) }), this.memoryHighWriter[27] = this.memoryWriter[65307] = ((t, e) => {!this.soundMasterEnabled && this.cartridge.useGBCMode || (this.soundMasterEnabled && this.audioController.runJIT(), this.audioController.channel3totalLength = 256 - e, this.audioController.checkChannel3Enable()) }), this.memoryHighWriter[28] = this.memoryWriter[65308] = ((t, e) => { this.soundMasterEnabled && (this.audioController.runJIT(), e &= 96, this.memory[65308] = e, this.audioController.channel3patternType = 0 === e ? 4 : (e >> 5) - 1) }), this.memoryHighWriter[29] = this.memoryWriter[65309] = ((t, e) => { this.soundMasterEnabled && (this.audioController.runJIT(), this.audioController.channel3frequency = 1792 & this.audioController.channel3frequency | e, this.audioController.channel3FrequencyPeriod = 2048 - this.audioController.channel3frequency << 1) }), this.memoryHighWriter[30] = this.memoryWriter[65310] = ((t, e) => { this.soundMasterEnabled && (this.audioController.runJIT(), e > 127 && (0 === this.audioController.channel3totalLength && (this.audioController.channel3totalLength = 256), this.audioController.channel3lastSampleLookup = 0, 64 == (64 & e) && (this.memory[65318] |= 4)), this.audioController.channel3consecutive = 0 == (64 & e), this.audioController.channel3frequency = (7 & e) << 8 | 255 & this.audioController.channel3frequency, this.audioController.channel3FrequencyPeriod = 2048 - this.audioController.channel3frequency << 1, this.memory[65310] = e, this.audioController.checkChannel3Enable()) }), this.memoryHighWriter[31] = this.memoryWriter[65311] = this.onIllegalWrite, this.memoryHighWriter[32] = this.memoryWriter[65312] = ((t, e) => {!this.soundMasterEnabled && this.cartridge.useGBCMode || (this.soundMasterEnabled && this.audioController.runJIT(), this.audioController.channel4totalLength = 64 - (63 & e), this.audioController.checkChannel4Enable()) }), this.memoryHighWriter[33] = this.memoryWriter[65313] = ((t, e) => { this.soundMasterEnabled && (this.audioController.runJIT(), this.audioController.channel4Enabled && 0 === this.audioController.channel4envelopeSweeps && (8 == (8 & (this.memory[65313] ^ e)) ? (0 == (8 & this.memory[65313]) && (7 == (7 & this.memory[65313]) ? this.audioController.channel4envelopeVolume += 2 : ++this.audioController.channel4envelopeVolume), this.audioController.channel4envelopeVolume = 16 - this.audioController.channel4envelopeVolume & 15) : 8 == (15 & this.memory[65313]) && (this.audioController.channel4envelopeVolume = 1 + this.audioController.channel4envelopeVolume & 15), this.audioController.channel4currentVolume = this.audioController.channel4envelopeVolume << this.audioController.channel4VolumeShifter), this.audioController.channel4envelopeType = 8 == (8 & e), this.memory[65313] = e, this.audioController.cacheChannel4Update(), this.audioController.checkChannel4VolumeEnable()) }), this.memoryHighWriter[34] = this.memoryWriter[65314] = ((t, e) => {
                        if (this.soundMasterEnabled) {
                            this.audioController.runJIT(), this.audioController.channel4FrequencyPeriod = Math.max((7 & e) << 4, 8) << (e >> 4);
                            var r = 8 & e;
                            (8 === r && 32767 === this.audioController.channel4BitRange || 0 === r && 127 === this.audioController.channel4BitRange) && (this.audioController.channel4lastSampleLookup = 0, this.audioController.channel4BitRange = 8 === r ? 127 : 32767, this.audioController.channel4VolumeShifter = 8 === r ? 7 : 15, this.audioController.channel4currentVolume = this.audioController.channel4envelopeVolume << this.audioController.channel4VolumeShifter, this.audioController.noiseSampleTable = 8 === r ? this.audioController.LSFR7Table : this.audioController.LSFR15Table), this.memory[65314] = e, this.audioController.cacheChannel4Update()
                        }
                    }), this.memoryHighWriter[35] = this.memoryWriter[65315] = ((t, e) => {
                        if (this.soundMasterEnabled) {
                            if (this.audioController.runJIT(), this.memory[65315] = e, this.audioController.channel4consecutive = 0 == (64 & e), e > 127) {
                                var r = this.memory[65313];
                                this.audioController.channel4envelopeVolume = r >> 4, this.audioController.channel4currentVolume = this.audioController.channel4envelopeVolume << this.audioController.channel4VolumeShifter, this.audioController.channel4envelopeSweepsLast = (7 & r) - 1, 0 === this.audioController.channel4totalLength && (this.audioController.channel4totalLength = 64), 64 == (64 & e) && (this.memory[65318] |= 8)
                            }
                            this.audioController.checkChannel4Enable()
                        }
                    }), this.memoryHighWriter[36] = this.memoryWriter[65316] = ((t, e) => { this.soundMasterEnabled && this.memory[65316] != e && (this.audioController.runJIT(), this.memory[65316] = e, this.audioController.VinLeftChannelMasterVolume = 1 + (e >> 4 & 7), this.audioController.VinRightChannelMasterVolume = 1 + (7 & e), this.audioController.cacheMixerOutputLevel()) }), this.memoryHighWriter[37] = this.memoryWriter[65317] = ((t, e) => { this.soundMasterEnabled && this.memory[65317] != e && (this.audioController.runJIT(), this.memory[65317] = e, this.audioController.rightChannel1 = 1 == (1 & e), this.audioController.rightChannel2 = 2 == (2 & e), this.audioController.rightChannel3 = 4 == (4 & e), this.audioController.rightChannel4 = 8 == (8 & e), this.audioController.leftChannel1 = 16 == (16 & e), this.audioController.leftChannel2 = 32 == (32 & e), this.audioController.leftChannel3 = 64 == (64 & e), this.audioController.leftChannel4 = e > 127, this.audioController.cacheChannel1OutputLevel(), this.audioController.cacheChannel2OutputLevel(), this.audioController.cacheChannel3OutputLevel(), this.audioController.cacheChannel4OutputLevel()) }), this.memoryHighWriter[38] = this.memoryWriter[65318] = ((t, e) => {
                        if (this.audioController.runJIT(), !this.soundMasterEnabled && e > 127) this.memory[65318] = 128, this.soundMasterEnabled = !0, this.audioController.initStartState();
                        else if (this.soundMasterEnabled && e < 128) { this.memory[65318] = 0, this.soundMasterEnabled = !1; for (var r = 65296; r < 65318; r++) this.memoryWriter[r].apply(this, [r, 0]) }
                    }), this.memoryHighWriter[39] = this.memoryWriter[65319] = this.onIllegalWrite, this.memoryHighWriter[40] = this.memoryWriter[65320] = this.onIllegalWrite, this.memoryHighWriter[41] = this.memoryWriter[65321] = this.onIllegalWrite, this.memoryHighWriter[42] = this.memoryWriter[65322] = this.onIllegalWrite, this.memoryHighWriter[43] = this.memoryWriter[65323] = this.onIllegalWrite, this.memoryHighWriter[44] = this.memoryWriter[65324] = this.onIllegalWrite, this.memoryHighWriter[45] = this.memoryWriter[65325] = this.onIllegalWrite, this.memoryHighWriter[46] = this.memoryWriter[65326] = this.onIllegalWrite, this.memoryHighWriter[47] = this.memoryWriter[65327] = this.onIllegalWrite, this.memoryHighWriter[48] = this.memoryWriter[65328] = ((t, e) => { this.writeChannel3RAM(0, e) }), this.memoryHighWriter[49] = this.memoryWriter[65329] = ((t, e) => { this.writeChannel3RAM(1, e) }), this.memoryHighWriter[50] = this.memoryWriter[65330] = ((t, e) => { this.writeChannel3RAM(2, e) }), this.memoryHighWriter[51] = this.memoryWriter[65331] = ((t, e) => { this.writeChannel3RAM(3, e) }), this.memoryHighWriter[52] = this.memoryWriter[65332] = ((t, e) => { this.writeChannel3RAM(4, e) }), this.memoryHighWriter[53] = this.memoryWriter[65333] = ((t, e) => { this.writeChannel3RAM(5, e) }), this.memoryHighWriter[54] = this.memoryWriter[65334] = ((t, e) => { this.writeChannel3RAM(6, e) }), this.memoryHighWriter[55] = this.memoryWriter[65335] = ((t, e) => { this.writeChannel3RAM(7, e) }), this.memoryHighWriter[56] = this.memoryWriter[65336] = ((t, e) => { this.writeChannel3RAM(8, e) }), this.memoryHighWriter[57] = this.memoryWriter[65337] = ((t, e) => { this.writeChannel3RAM(9, e) }), this.memoryHighWriter[58] = this.memoryWriter[65338] = ((t, e) => { this.writeChannel3RAM(10, e) }), this.memoryHighWriter[59] = this.memoryWriter[65339] = ((t, e) => { this.writeChannel3RAM(11, e) }), this.memoryHighWriter[60] = this.memoryWriter[65340] = ((t, e) => { this.writeChannel3RAM(12, e) }), this.memoryHighWriter[61] = this.memoryWriter[65341] = ((t, e) => { this.writeChannel3RAM(13, e) }), this.memoryHighWriter[62] = this.memoryWriter[65342] = ((t, e) => { this.writeChannel3RAM(14, e) }), this.memoryHighWriter[63] = this.memoryWriter[65343] = ((t, e) => { this.writeChannel3RAM(15, e) }), this.memoryHighWriter[66] = this.memoryWriter[65346] = ((t, e) => { this.backgroundY != e && (this.midScanLineJIT(), this.backgroundY = e) }), this.memoryHighWriter[67] = this.memoryWriter[65347] = ((t, e) => { this.backgroundX != e && (this.midScanLineJIT(), this.backgroundX = e) }), this.memoryHighWriter[68] = this.memoryWriter[65348] = ((t, e) => { this.LCDisOn && (this.modeSTAT = 2, this.midScanlineOffset = -1, this.cpu.totalLinesPassed = this.currentX = this.queuedScanLines = this.lastUnrenderedLine = this.LCDTicks = this.STATTracker = this.actualScanLine = this.memory[65348] = 0) }), this.memoryHighWriter[69] = this.memoryWriter[65349] = ((t, e) => { this.memory[65349] != e && (this.memory[65349] = e, this.LCDisOn && this.matchLYC()) }), this.memoryHighWriter[74] = this.memoryWriter[65354] = ((t, e) => { this.windowY != e && (this.midScanLineJIT(), this.windowY = e) }), this.memoryHighWriter[75] = this.memoryWriter[65355] = ((t, e) => { this.memory[65355] != e && (this.midScanLineJIT(), this.memory[65355] = e, this.windowX = e - 7) }), this.memoryHighWriter[114] = this.memoryWriter[65394] = ((t, e) => { this.memory[65394] = e }), this.memoryHighWriter[115] = this.memoryWriter[65395] = ((t, e) => { this.memory[65395] = e }), this.memoryHighWriter[117] = this.memoryWriter[65397] = ((t, e) => { this.memory[65397] = e }), this.memoryHighWriter[118] = this.memoryWriter[65398] = this.onIllegalWrite, this.memoryHighWriter[119] = this.memoryWriter[65399] = this.onIllegalWrite, this.memoryHighWriter[255] = this.memoryWriter[Bt] = ((t, e) => { this.interruptsEnabled = e, this.checkIRQMatching() }), this.recompileModelSpecificIOWriteHandling(), this.recompileBootIOWriteHandling()
                }
                recompileModelSpecificIOWriteHandling() {
                    this.cartridge.useGBCMode ? (this.memoryHighWriter[2] = this.memoryWriter[yt] = ((t, e) => { 1 == (1 & e) ? (this.memory[yt] = 127 & e, this.serialTimer = 0 == (2 & e) ? 4096 : 128, this.serialShiftTimer = this.serialShiftTimerAllocated = 0 == (2 & e) ? 512 : 16) : (this.memory[yt] = e, this.serialShiftTimer = this.serialShiftTimerAllocated = this.serialTimer = 0) }), this.memoryHighWriter[64] = this.memoryWriter[65344] = ((t, e) => {
                        if (this.memory[65344] != e) {
                            this.midScanLineJIT();
                            var r = e > 127;
                            r != this.LCDisOn && (this.LCDisOn = r, this.memory[65345] &= 120, this.midScanlineOffset = -1, this.cpu.totalLinesPassed = this.currentX = this.queuedScanLines = this.lastUnrenderedLine = this.STATTracker = this.LCDTicks = this.actualScanLine = this.memory[65348] = 0, this.LCDisOn ? (this.modeSTAT = 2, this.matchLYC(), this.LCDCONTROL = this.LINECONTROL) : (this.modeSTAT = 0, this.LCDCONTROL = this.DISPLAYOFFCONTROL, this.lcdDevice.DisplayShowOff()), this.interruptsRequested &= 253), this.gfxWindowCHRBankPosition = 64 == (64 & e) ? 1024 : 0, this.gfxWindowDisplay = 32 == (32 & e), this.gfxBackgroundBankOffset = 16 == (16 & e) ? 0 : 128, this.gfxBackgroundCHRBankPosition = 8 == (8 & e) ? 1024 : 0, this.gfxSpriteNormalHeight = 0 == (4 & e), this.gfxSpriteShow = 2 == (2 & e), this.hasBGPriority = 1 == (1 & e), this.priorityFlaggingPathRebuild(), this.memory[65344] = e
                        }
                    }), this.memoryHighWriter[65] = this.memoryWriter[65345] = ((t, e) => { this.LYCMatchTriggerSTAT = 64 == (64 & e), this.mode2TriggerSTAT = 32 == (32 & e), this.mode1TriggerSTAT = 16 == (16 & e), this.mode0TriggerSTAT = 8 == (8 & e), this.memory[65345] = 120 & e }), this.memoryHighWriter[70] = this.memoryWriter[65350] = ((t, e) => {
                        if (this.memory[65350] = e, e < 224) {
                            e <<= 8, t = 65024;
                            var r = this.modeSTAT;
                            this.modeSTAT = 0;
                            var i = 0;
                            do { if ((i = this.memoryRead(e++)) != this.memory[t]) { this.modeSTAT = r, this.graphicsJIT(), this.modeSTAT = 0, this.memory[t++] = i; break } } while (++t < 65184);
                            if (t < 65184)
                                do { this.memory[t++] = this.memoryRead(e++), this.memory[t++] = this.memoryRead(e++), this.memory[t++] = this.memoryRead(e++), this.memory[t++] = this.memoryRead(e++) } while (t < 65184);
                            this.modeSTAT = r
                        }
                    }), this.memoryHighWriter[77] = this.memoryWriter[65357] = ((t, e) => { this.memory[65357] = 127 & e | 128 & this.memory[65357] }), this.memoryHighWriter[79] = this.memoryWriter[65359] = ((t, e) => { this.currVRAMBank = 1 & e, this.currVRAMBank > 0 ? this.BGCHRCurrentBank = this.BGCHRBank2 : this.BGCHRCurrentBank = this.BGCHRBank1 }), this.memoryHighWriter[81] = this.memoryWriter[65361] = ((t, e) => { this.hdmaRunning || (this.memory[65361] = e) }), this.memoryHighWriter[82] = this.memoryWriter[65362] = ((t, e) => { this.hdmaRunning || (this.memory[65362] = 240 & e) }), this.memoryHighWriter[83] = this.memoryWriter[65363] = ((t, e) => { this.hdmaRunning || (this.memory[65363] = 31 & e) }), this.memoryHighWriter[84] = this.memoryWriter[65364] = ((t, e) => { this.hdmaRunning || (this.memory[65364] = 240 & e) }), this.memoryHighWriter[85] = this.memoryWriter[65365] = ((t, e) => { this.hdmaRunning ? 0 == (128 & e) ? (this.hdmaRunning = !1, this.memory[65365] |= 128) : this.memory[65365] = 127 & e : 0 == (128 & e) ? (this.DMAWrite(1 + (127 & e)), this.memory[65365] = 255) : (this.hdmaRunning = !0, this.memory[65365] = 127 & e) }), this.memoryHighWriter[104] = this.memoryWriter[65384] = ((t, e) => { this.memory[65385] = this.gbcBGRawPalette[63 & e], this.memory[65384] = e }), this.memoryHighWriter[105] = this.memoryWriter[65385] = ((t, e) => {
                        if (this.updateGBCBGPalette(63 & this.memory[65384], e), this.memory[65384] > 127) {
                            var r = this.memory[65384] + 1 & 63;
                            this.memory[65384] = 128 | r, this.memory[65385] = this.gbcBGRawPalette[r]
                        } else this.memory[65385] = e
                    }), this.memoryHighWriter[106] = this.memoryWriter[65386] = ((t, e) => { this.memory[65387] = this.gbcOBJRawPalette[63 & e], this.memory[65386] = e }), this.memoryHighWriter[107] = this.memoryWriter[65387] = ((t, e) => {
                        if (this.updateGBCOBJPalette(63 & this.memory[65386], e), this.memory[65386] > 127) {
                            var r = this.memory[65386] + 1 & 63;
                            this.memory[65386] = 128 | r, this.memory[65387] = this.gbcOBJRawPalette[r]
                        } else this.memory[65387] = e
                    }), this.memoryHighWriter[112] = this.memoryWriter[65392] = ((t, e) => {
                        var r = this.memory[65361] << 8 | this.memory[65362];
                        (!this.hdmaRunning || r < 53248 || r >= 57344) && (this.gbcRamBank = Math.max(7 & e, 1), this.gbcRamBankPosition = (this.gbcRamBank - 1 << 12) - 53248, this.gbcRamBankPositionECHO = this.gbcRamBankPosition - 8192), this.memory[65392] = e
                    }), this.memoryHighWriter[116] = this.memoryWriter[65396] = ((t, e) => { this.memory[65396] = e })) : (this.memoryHighWriter[2] = this.memoryWriter[yt] = ((t, e) => { 1 == (1 & e) ? (this.memory[yt] = 127 & e, this.serialTimer = 4096, this.serialShiftTimer = this.serialShiftTimerAllocated = 512) : (this.memory[yt] = e, this.serialShiftTimer = this.serialShiftTimerAllocated = this.serialTimer = 0) }), this.memoryHighWriter[64] = this.memoryWriter[65344] = ((t, e) => {
                        if (this.memory[65344] != e) {
                            this.midScanLineJIT();
                            var r = e > 127;
                            r != this.LCDisOn && (this.LCDisOn = r, this.memory[65345] &= 120, this.midScanlineOffset = -1, this.cpu.totalLinesPassed = this.currentX = this.queuedScanLines = this.lastUnrenderedLine = this.STATTracker = this.LCDTicks = this.actualScanLine = this.memory[65348] = 0, this.LCDisOn ? (this.modeSTAT = 2, this.matchLYC(), this.LCDCONTROL = this.LINECONTROL) : (this.modeSTAT = 0, this.LCDCONTROL = this.DISPLAYOFFCONTROL, this.lcdDevice.DisplayShowOff()), this.interruptsRequested &= 253), this.gfxWindowCHRBankPosition = 64 == (64 & e) ? 1024 : 0, this.gfxWindowDisplay = 32 == (32 & e), this.gfxBackgroundBankOffset = 16 == (16 & e) ? 0 : 128, this.gfxBackgroundCHRBankPosition = 8 == (8 & e) ? 1024 : 0, this.gfxSpriteNormalHeight = 0 == (4 & e), this.gfxSpriteShow = 2 == (2 & e), this.bgEnabled = 1 == (1 & e), this.memory[65344] = e
                        }
                    }), this.memoryHighWriter[65] = this.memoryWriter[65345] = ((t, e) => { this.LYCMatchTriggerSTAT = 64 == (64 & e), this.mode2TriggerSTAT = 32 == (32 & e), this.mode1TriggerSTAT = 16 == (16 & e), this.mode0TriggerSTAT = 8 == (8 & e), this.memory[65345] = 120 & e, (!this.usedBootROM || !this.usedGBCBootROM) && this.LCDisOn && this.modeSTAT < 2 && (this.interruptsRequested |= 2, this.checkIRQMatching()) }), this.memoryHighWriter[70] = this.memoryWriter[65350] = ((t, e) => {
                        if (this.memory[65350] = e, e > 127 && e < 224) {
                            e <<= 8, t = 65024;
                            var r = this.modeSTAT;
                            this.modeSTAT = 0;
                            var i = 0;
                            do { if ((i = this.memoryRead(e++)) != this.memory[t]) { this.modeSTAT = r, this.graphicsJIT(), this.modeSTAT = 0, this.memory[t++] = i; break } } while (++t < 65184);
                            if (t < 65184)
                                do { this.memory[t++] = this.memoryRead(e++), this.memory[t++] = this.memoryRead(e++), this.memory[t++] = this.memoryRead(e++), this.memory[t++] = this.memoryRead(e++) } while (t < 65184);
                            this.modeSTAT = r
                        }
                    }), this.memoryHighWriter[71] = this.memoryWriter[65351] = ((t, e) => { this.memory[65351] != e && (this.midScanLineJIT(), this.updateGBBGPalette(e), this.memory[65351] = e) }), this.memoryHighWriter[72] = this.memoryWriter[65352] = ((t, e) => { this.memory[65352] != e && (this.midScanLineJIT(), this.updateGBOBJPalette(0, e), this.memory[65352] = e) }), this.memoryHighWriter[73] = this.memoryWriter[65353] = ((t, e) => { this.memory[65353] != e && (this.midScanLineJIT(), this.updateGBOBJPalette(4, e), this.memory[65353] = e) }), this.memoryHighWriter[77] = this.memoryWriter[65357] = ((t, e) => { this.memory[65357] = e }), this.memoryHighWriter[79] = this.memoryWriter[65359] = this.onIllegalWrite, this.memoryHighWriter[85] = this.memoryWriter[65365] = this.onIllegalWrite, this.memoryHighWriter[104] = this.memoryWriter[65384] = this.onIllegalWrite, this.memoryHighWriter[105] = this.memoryWriter[65385] = this.onIllegalWrite, this.memoryHighWriter[106] = this.memoryWriter[65386] = this.onIllegalWrite, this.memoryHighWriter[107] = this.memoryWriter[65387] = this.onIllegalWrite, this.memoryHighWriter[108] = this.memoryWriter[65388] = this.onIllegalWrite, this.memoryHighWriter[112] = this.memoryWriter[65392] = this.onIllegalWrite, this.memoryHighWriter[116] = this.memoryWriter[65396] = this.onIllegalWrite)
                }
                recompileBootIOWriteHandling() { this.inBootstrap ? (this.memoryHighWriter[80] = this.memoryWriter[65360] = ((t, e) => { console.log("Boot ROM reads blocked: Bootstrap process has ended.", 0), this.inBootstrap = !1, this.disableBootROM(), this.memory[65360] = e }), this.cartridge.useGBCMode && (this.memoryHighWriter[108] = this.memoryWriter[65388] = ((t, e) => { this.inBootstrap && this.cartridge.setGBCMode(e), this.memory[65388] = e }))) : this.memoryHighWriter[80] = this.memoryWriter[65360] = this.onIllegalWrite }
            }
            var Ft = function(t, e, r, i) {
                return new(r || (r = Promise))(function(s, n) {
                    function a(t) { try { h(i.next(t)) } catch (t) { n(t) } }

                    function o(t) { try { h(i.throw(t)) } catch (t) { n(t) } }

                    function h(t) { t.done ? s(t.value) : new r(function(e) { e(t.value) }).then(a, o) }
                    h((i = i.apply(t, e || [])).next())
                })
            };
            class Lt extends B.EventEmitter {
                constructor({ audio: t, isPaused: e, lcd: r, isSoundEnabled: i, bootRom: n } = {}) { super(), this.buttons = ["right", "left", "up", "down", "a", "b", "select", "start"], "boolean" == typeof i && (s.soundOn = i), e && (this.isPaused = e), this.core = new At({ audio: t, api: this, lcd: r, bootRom: n }), this.debouncedAutoSave = b(this.autoSave.bind(this), 100), this.core.events.on("sramWrite", () => { this.core.cartridge && this.debouncedAutoSave() }), this.isOn = !1, this.actions = new M, this.registerActions(), "undefined" != typeof document && (this.storage = new w) }
                isPaused() { return "undefined" != typeof document && document.hidden }
                setStorage(t) { this.storage = t }
                registerActions() { this.buttons.forEach((t, e) => { this.actions.register(t).on("down-" + t, () => { this.core.joypad.down(e) }).on("up-" + t, () => { this.core.joypad.up(e) }) }), this.actions.register("speed").on("down-speed", t => this.handleSpeed(t)).on("change-speed", t => this.handleSpeed(t)).on("up-speed", () => { this.setSpeed(1) }) }
                handleSpeed(t) {
                    let e = 2;
                    t && "number" == typeof t.value && (e = 2 * t.value + 1), this.setSpeed(e)
                }
                turnOn() {
                    if (this.isOn) return;
                    this.isOn = !0, this.core.start(this.cartridge), this.core.stopEmulator &= 1;
                    const t = e => { this.isPaused() || ((!this.lastRun || this.lastRun < e - s.runInterval) && (this.core.run(), this.lastRun = e), this.requestFrame(t)) };
                    this.requestFrame(t)
                }
                turnOff() { this.isOn && (this.isOn = !1, this.interval && (clearInterval(this.interval), this.interval = null)) }
                restart() { this.turnOff(), this.turnOn() }
                replaceCartridge(t) { this.turnOff(), this.removeCartridge(), this.insertCartridge(t), this.turnOn() }
                removeCartridge() { this.cartridge = null }
                insertCartridge(t) { t instanceof E || (t = new E(t)), this.cartridge = t }
                actionDown(t, e) { this.actions.down(t, e) }
                actionChange(t, e) { this.actions.change(t, e) }
                actionUp(t, e) { this.actions.up(t, e) }
                setSpeed(t) { this.core.setSpeed(t) }
                autoSave() { this.saveSRAM(), this.saveRTC() }
                saveState(t) {
                    return Ft(this, void 0, void 0, function*() {
                        if (!this.storage) return;
                        if (!this.core.cartridge) return;
                        const e = this.core.cartridge.name;
                        if (!t && !(t = this.core.stateManager.get())) return !1;
                        yield this.storage.setState(e, t), this.emit("stateSaved", { name: e, state: t })
                    })
                }
                saveSRAM(t) {
                    return Ft(this, void 0, void 0, function*() {
                        if (!this.storage) return;
                        if (!this.core.cartridge) return;
                        const e = this.core.cartridge.name;
                        if (!t && !(t = this.core.cartridge.mbc.getSRAM())) return !1;
                        yield this.storage.setSRAM(e, t.buffer), this.emit("sramSaved", { name: e, sram: t })
                    })
                }
                saveRTC(t) {
                    return Ft(this, void 0, void 0, function*() {
                        if (!this.storage) return;
                        if (!this.core.cartridge) return;
                        if (!this.core.cartridge.hasRTC) return;
                        const e = this.core.cartridge.name;
                        if (!t && !(t = this.core.cartridge.mbc.rtc.get())) return !1;
                        yield this.storage.setRTC(e, t.buffer), this.emit("rtcSaved", { name: e, rtc: t })
                    })
                }
                loadState(t) {
                    if (!this.storage) return;
                    if (!this.core.cartridge) return;
                    const e = this.core.cartridge.name;
                    if (!t && !(t = this.storage.findState(e))) return !1;
                    this.core.loadState(t), this.emit("stateLoaded", { name: e, state: t })
                }
                loadSRAM(t) {
                    if (!this.storage) return;
                    if (!this.core.cartridge) return;
                    const e = this.core.cartridge.name;
                    if (!t) {
                        if (!(t = this.storage.findSRAM(e))) return !1;
                        t = new Uint8Array(t)
                    }
                    this.core.cartridge.mbc.loadSRAM(t), this.emit("sramLoaded", { name: e, sram: t })
                }
                loadRTC(t) {
                    if (!this.storage) return;
                    if (!this.core.cartridge) return;
                    if (!this.core.cartridge.hasRTC) return;
                    const e = this.core.cartridge.name;
                    if (!t) {
                        if (!(t = this.storage.findRTC(e))) return !1;
                        t = new Uint32Array(t)
                    }
                    this.core.cartridge.mbc.rtc.load(t), this.emit("rtcLoaded", { name: e, rtc: t })
                }
                getBatteryFileArrayBuffer() { if (!this.core.cartridge) return null; const t = this.core.cartridge.mbc.getSRAM(); let e = null; return this.core.cartridge.mbc.rtc && (e = this.core.cartridge.mbc.rtc.get()), e ? m(t.buffer, e.buffer) : t.buffer }
                loadBatteryFileArrayBuffer(t) {
                    return Ft(this, void 0, void 0, function*() {
                        const e = this.core.cartridge.mbc.cutSRAMFromBatteryFileArray(t);
                        let r = null;
                        this.core.cartridge.hasRTC && (r = this.core.cartridge.mbc.rtc.cutBatteryFileArray(t)), this.core.cartridge.mbc.loadSRAM(e), r && this.core.cartridge.mbc.rtc.load(r), yield this.saveSRAM(e), r && (yield this.saveRTC(r)), this.restart()
                    })
                }
                requestFrame(t) {
                    if ("undefined" != typeof window && window.requestAnimationFrame) window.requestAnimationFrame(t);
                    else {
                        const e = ("undefined" != typeof performance ? performance : Date).now();
                        setTimeout(() => t(e), 0)
                    }
                }
            }
            r.d(e, "GameBoy", function() { return Lt }), r.d(e, "LocalStorage", function() { return w }), r.d(e, "util", function() { return i }), e.default = Lt
        }])
    }, function(t, e, r) {
        "use strict";
        var i = null;
        i = "undefined" != typeof Promise ? Promise : r(83), t.exports = { Promise: i }
    }, function(t, e, r) {
        (function(t) {
            function r(t) { return Object.prototype.toString.call(t) }
            e.isArray = function(t) { return Array.isArray ? Array.isArray(t) : "[object Array]" === r(t) }, e.isBoolean = function(t) { return "boolean" == typeof t }, e.isNull = function(t) { return null === t }, e.isNullOrUndefined = function(t) { return null == t }, e.isNumber = function(t) { return "number" == typeof t }, e.isString = function(t) { return "string" == typeof t }, e.isSymbol = function(t) { return "symbol" == typeof t }, e.isUndefined = function(t) { return void 0 === t }, e.isRegExp = function(t) { return "[object RegExp]" === r(t) }, e.isObject = function(t) { return "object" == typeof t && null !== t }, e.isDate = function(t) { return "[object Date]" === r(t) }, e.isError = function(t) { return "[object Error]" === r(t) || t instanceof Error }, e.isFunction = function(t) { return "function" == typeof t }, e.isPrimitive = function(t) { return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || void 0 === t }, e.isBuffer = t.isBuffer
        }).call(this, r(13).Buffer)
    }, function(t, e, r) {
        "use strict";
        (function(t) {
            /*!
             * The buffer module from node.js, for the browser.
             *
             * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
             * @license  MIT
             */
            var i = r(111),
                s = r(110),
                n = r(57);

            function a() { return h.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823 }

            function o(t, e) { if (a() < e) throw new RangeError("Invalid typed array length"); return h.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = h.prototype : (null === t && (t = new h(e)), t.length = e), t }

            function h(t, e, r) { if (!(h.TYPED_ARRAY_SUPPORT || this instanceof h)) return new h(t, e, r); if ("number" == typeof t) { if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string"); return c(this, t) } return u(this, t, e, r) }

            function u(t, e, r, i) {
                if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, r, i) {
                    if (e.byteLength, r < 0 || e.byteLength < r) throw new RangeError("'offset' is out of bounds");
                    if (e.byteLength < r + (i || 0)) throw new RangeError("'length' is out of bounds");
                    e = void 0 === r && void 0 === i ? new Uint8Array(e) : void 0 === i ? new Uint8Array(e, r) : new Uint8Array(e, r, i);
                    h.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = h.prototype : t = f(t, e);
                    return t
                }(t, e, r, i) : "string" == typeof e ? function(t, e, r) {
                    "string" == typeof r && "" !== r || (r = "utf8");
                    if (!h.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
                    var i = 0 | m(e, r),
                        s = (t = o(t, i)).write(e, r);
                    s !== i && (t = t.slice(0, s));
                    return t
                }(t, e, r) : function(t, e) { if (h.isBuffer(e)) { var r = 0 | d(e.length); return 0 === (t = o(t, r)).length ? t : (e.copy(t, 0, 0, r), t) } if (e) { if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (i = e.length) != i ? o(t, 0) : f(t, e); if ("Buffer" === e.type && n(e.data)) return f(t, e.data) } var i; throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.") }(t, e)
            }

            function l(t) { if ("number" != typeof t) throw new TypeError('"size" argument must be a number'); if (t < 0) throw new RangeError('"size" argument must not be negative') }

            function c(t, e) {
                if (l(e), t = o(t, e < 0 ? 0 : 0 | d(e)), !h.TYPED_ARRAY_SUPPORT)
                    for (var r = 0; r < e; ++r) t[r] = 0;
                return t
            }

            function f(t, e) {
                var r = e.length < 0 ? 0 : 0 | d(e.length);
                t = o(t, r);
                for (var i = 0; i < r; i += 1) t[i] = 255 & e[i];
                return t
            }

            function d(t) { if (t >= a()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes"); return 0 | t }

            function m(t, e) {
                if (h.isBuffer(t)) return t.length;
                if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                "string" != typeof t && (t = "" + t);
                var r = t.length;
                if (0 === r) return 0;
                for (var i = !1;;) switch (e) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return r;
                    case "utf8":
                    case "utf-8":
                    case void 0:
                        return G(t).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * r;
                    case "hex":
                        return r >>> 1;
                    case "base64":
                        return N(t).length;
                    default:
                        if (i) return G(t).length;
                        e = ("" + e).toLowerCase(), i = !0
                }
            }

            function p(t, e, r) {
                var i = t[e];
                t[e] = t[r], t[r] = i
            }

            function g(t, e, r, i, s) {
                if (0 === t.length) return -1;
                if ("string" == typeof r ? (i = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = s ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
                    if (s) return -1;
                    r = t.length - 1
                } else if (r < 0) {
                    if (!s) return -1;
                    r = 0
                }
                if ("string" == typeof e && (e = h.from(e, i)), h.isBuffer(e)) return 0 === e.length ? -1 : y(t, e, r, i, s);
                if ("number" == typeof e) return e &= 255, h.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? s ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : y(t, [e], r, i, s);
                throw new TypeError("val must be string, number or Buffer")
            }

            function y(t, e, r, i, s) {
                var n, a = 1,
                    o = t.length,
                    h = e.length;
                if (void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
                    if (t.length < 2 || e.length < 2) return -1;
                    a = 2, o /= 2, h /= 2, r /= 2
                }

                function u(t, e) { return 1 === a ? t[e] : t.readUInt16BE(e * a) }
                if (s) {
                    var l = -1;
                    for (n = r; n < o; n++)
                        if (u(t, n) === u(e, -1 === l ? 0 : n - l)) { if (-1 === l && (l = n), n - l + 1 === h) return l * a } else -1 !== l && (n -= n - l), l = -1
                } else
                    for (r + h > o && (r = o - h), n = r; n >= 0; n--) {
                        for (var c = !0, f = 0; f < h; f++)
                            if (u(t, n + f) !== u(e, f)) { c = !1; break }
                        if (c) return n
                    }
                return -1
            }

            function C(t, e, r, i) {
                r = Number(r) || 0;
                var s = t.length - r;
                i ? (i = Number(i)) > s && (i = s) : i = s;
                var n = e.length;
                if (n % 2 != 0) throw new TypeError("Invalid hex string");
                i > n / 2 && (i = n / 2);
                for (var a = 0; a < i; ++a) {
                    var o = parseInt(e.substr(2 * a, 2), 16);
                    if (isNaN(o)) return a;
                    t[r + a] = o
                }
                return a
            }

            function b(t, e, r, i) { return z(G(e, t.length - r), t, r, i) }

            function v(t, e, r, i) { return z(function(t) { for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r)); return e }(e), t, r, i) }

            function w(t, e, r, i) { return v(t, e, r, i) }

            function k(t, e, r, i) { return z(N(e), t, r, i) }

            function B(t, e, r, i) { return z(function(t, e) { for (var r, i, s, n = [], a = 0; a < t.length && !((e -= 2) < 0); ++a) r = t.charCodeAt(a), i = r >> 8, s = r % 256, n.push(s), n.push(i); return n }(e, t.length - r), t, r, i) }

            function S(t, e, r) { return 0 === e && r === t.length ? i.fromByteArray(t) : i.fromByteArray(t.slice(e, r)) }

            function R(t, e, r) {
                r = Math.min(t.length, r);
                for (var i = [], s = e; s < r;) {
                    var n, a, o, h, u = t[s],
                        l = null,
                        c = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                    if (s + c <= r) switch (c) {
                        case 1:
                            u < 128 && (l = u);
                            break;
                        case 2:
                            128 == (192 & (n = t[s + 1])) && (h = (31 & u) << 6 | 63 & n) > 127 && (l = h);
                            break;
                        case 3:
                            n = t[s + 1], a = t[s + 2], 128 == (192 & n) && 128 == (192 & a) && (h = (15 & u) << 12 | (63 & n) << 6 | 63 & a) > 2047 && (h < 55296 || h > 57343) && (l = h);
                            break;
                        case 4:
                            n = t[s + 1], a = t[s + 2], o = t[s + 3], 128 == (192 & n) && 128 == (192 & a) && 128 == (192 & o) && (h = (15 & u) << 18 | (63 & n) << 12 | (63 & a) << 6 | 63 & o) > 65535 && h < 1114112 && (l = h)
                    }
                    null === l ? (l = 65533, c = 1) : l > 65535 && (l -= 65536, i.push(l >>> 10 & 1023 | 55296), l = 56320 | 1023 & l), i.push(l), s += c
                }
                return function(t) {
                    var e = t.length;
                    if (e <= T) return String.fromCharCode.apply(String, t);
                    var r = "",
                        i = 0;
                    for (; i < e;) r += String.fromCharCode.apply(String, t.slice(i, i += T));
                    return r
                }(i)
            }
            e.Buffer = h, e.SlowBuffer = function(t) {+t != t && (t = 0); return h.alloc(+t) }, e.INSPECT_MAX_BYTES = 50, h.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() { try { var t = new Uint8Array(1); return t.__proto__ = { __proto__: Uint8Array.prototype, foo: function() { return 42 } }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength } catch (t) { return !1 } }(), e.kMaxLength = a(), h.poolSize = 8192, h._augment = function(t) { return t.__proto__ = h.prototype, t }, h.from = function(t, e, r) { return u(null, t, e, r) }, h.TYPED_ARRAY_SUPPORT && (h.prototype.__proto__ = Uint8Array.prototype, h.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && h[Symbol.species] === h && Object.defineProperty(h, Symbol.species, { value: null, configurable: !0 })), h.alloc = function(t, e, r) { return function(t, e, r, i) { return l(e), e <= 0 ? o(t, e) : void 0 !== r ? "string" == typeof i ? o(t, e).fill(r, i) : o(t, e).fill(r) : o(t, e) }(null, t, e, r) }, h.allocUnsafe = function(t) { return c(null, t) }, h.allocUnsafeSlow = function(t) { return c(null, t) }, h.isBuffer = function(t) { return !(null == t || !t._isBuffer) }, h.compare = function(t, e) {
                if (!h.isBuffer(t) || !h.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                if (t === e) return 0;
                for (var r = t.length, i = e.length, s = 0, n = Math.min(r, i); s < n; ++s)
                    if (t[s] !== e[s]) { r = t[s], i = e[s]; break }
                return r < i ? -1 : i < r ? 1 : 0
            }, h.isEncoding = function(t) {
                switch (String(t).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, h.concat = function(t, e) {
                if (!n(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === t.length) return h.alloc(0);
                var r;
                if (void 0 === e)
                    for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
                var i = h.allocUnsafe(e),
                    s = 0;
                for (r = 0; r < t.length; ++r) {
                    var a = t[r];
                    if (!h.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
                    a.copy(i, s), s += a.length
                }
                return i
            }, h.byteLength = m, h.prototype._isBuffer = !0, h.prototype.swap16 = function() { var t = this.length; if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits"); for (var e = 0; e < t; e += 2) p(this, e, e + 1); return this }, h.prototype.swap32 = function() { var t = this.length; if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits"); for (var e = 0; e < t; e += 4) p(this, e, e + 3), p(this, e + 1, e + 2); return this }, h.prototype.swap64 = function() { var t = this.length; if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits"); for (var e = 0; e < t; e += 8) p(this, e, e + 7), p(this, e + 1, e + 6), p(this, e + 2, e + 5), p(this, e + 3, e + 4); return this }, h.prototype.toString = function() {
                var t = 0 | this.length;
                return 0 === t ? "" : 0 === arguments.length ? R(this, 0, t) : function(t, e, r) {
                    var i = !1;
                    if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                    if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                    if ((r >>>= 0) <= (e >>>= 0)) return "";
                    for (t || (t = "utf8");;) switch (t) {
                        case "hex":
                            return L(this, e, r);
                        case "utf8":
                        case "utf-8":
                            return R(this, e, r);
                        case "ascii":
                            return A(this, e, r);
                        case "latin1":
                        case "binary":
                            return F(this, e, r);
                        case "base64":
                            return S(this, e, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return _(this, e, r);
                        default:
                            if (i) throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(), i = !0
                    }
                }.apply(this, arguments)
            }, h.prototype.equals = function(t) { if (!h.isBuffer(t)) throw new TypeError("Argument must be a Buffer"); return this === t || 0 === h.compare(this, t) }, h.prototype.inspect = function() {
                var t = "",
                    r = e.INSPECT_MAX_BYTES;
                return this.length > 0 && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (t += " ... ")), "<Buffer " + t + ">"
            }, h.prototype.compare = function(t, e, r, i, s) {
                if (!h.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === i && (i = 0), void 0 === s && (s = this.length), e < 0 || r > t.length || i < 0 || s > this.length) throw new RangeError("out of range index");
                if (i >= s && e >= r) return 0;
                if (i >= s) return -1;
                if (e >= r) return 1;
                if (e >>>= 0, r >>>= 0, i >>>= 0, s >>>= 0, this === t) return 0;
                for (var n = s - i, a = r - e, o = Math.min(n, a), u = this.slice(i, s), l = t.slice(e, r), c = 0; c < o; ++c)
                    if (u[c] !== l[c]) { n = u[c], a = l[c]; break }
                return n < a ? -1 : a < n ? 1 : 0
            }, h.prototype.includes = function(t, e, r) { return -1 !== this.indexOf(t, e, r) }, h.prototype.indexOf = function(t, e, r) { return g(this, t, e, r, !0) }, h.prototype.lastIndexOf = function(t, e, r) { return g(this, t, e, r, !1) }, h.prototype.write = function(t, e, r, i) {
                if (void 0 === e) i = "utf8", r = this.length, e = 0;
                else if (void 0 === r && "string" == typeof e) i = e, r = this.length, e = 0;
                else {
                    if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    e |= 0, isFinite(r) ? (r |= 0, void 0 === i && (i = "utf8")) : (i = r, r = void 0)
                }
                var s = this.length - e;
                if ((void 0 === r || r > s) && (r = s), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                i || (i = "utf8");
                for (var n = !1;;) switch (i) {
                    case "hex":
                        return C(this, t, e, r);
                    case "utf8":
                    case "utf-8":
                        return b(this, t, e, r);
                    case "ascii":
                        return v(this, t, e, r);
                    case "latin1":
                    case "binary":
                        return w(this, t, e, r);
                    case "base64":
                        return k(this, t, e, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return B(this, t, e, r);
                    default:
                        if (n) throw new TypeError("Unknown encoding: " + i);
                        i = ("" + i).toLowerCase(), n = !0
                }
            }, h.prototype.toJSON = function() { return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) } };
            var T = 4096;

            function A(t, e, r) {
                var i = "";
                r = Math.min(t.length, r);
                for (var s = e; s < r; ++s) i += String.fromCharCode(127 & t[s]);
                return i
            }

            function F(t, e, r) {
                var i = "";
                r = Math.min(t.length, r);
                for (var s = e; s < r; ++s) i += String.fromCharCode(t[s]);
                return i
            }

            function L(t, e, r) {
                var i = t.length;
                (!e || e < 0) && (e = 0), (!r || r < 0 || r > i) && (r = i);
                for (var s = "", n = e; n < r; ++n) s += I(t[n]);
                return s
            }

            function _(t, e, r) { for (var i = t.slice(e, r), s = "", n = 0; n < i.length; n += 2) s += String.fromCharCode(i[n] + 256 * i[n + 1]); return s }

            function x(t, e, r) { if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint"); if (t + e > r) throw new RangeError("Trying to access beyond buffer length") }

            function H(t, e, r, i, s, n) { if (!h.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance'); if (e > s || e < n) throw new RangeError('"value" argument is out of bounds'); if (r + i > t.length) throw new RangeError("Index out of range") }

            function E(t, e, r, i) { e < 0 && (e = 65535 + e + 1); for (var s = 0, n = Math.min(t.length - r, 2); s < n; ++s) t[r + s] = (e & 255 << 8 * (i ? s : 1 - s)) >>> 8 * (i ? s : 1 - s) }

            function M(t, e, r, i) { e < 0 && (e = 4294967295 + e + 1); for (var s = 0, n = Math.min(t.length - r, 4); s < n; ++s) t[r + s] = e >>> 8 * (i ? s : 3 - s) & 255 }

            function P(t, e, r, i, s, n) { if (r + i > t.length) throw new RangeError("Index out of range"); if (r < 0) throw new RangeError("Index out of range") }

            function O(t, e, r, i, n) { return n || P(t, 0, r, 4), s.write(t, e, r, i, 23, 4), r + 4 }

            function D(t, e, r, i, n) { return n || P(t, 0, r, 8), s.write(t, e, r, i, 52, 8), r + 8 }
            h.prototype.slice = function(t, e) {
                var r, i = this.length;
                if (t = ~~t, e = void 0 === e ? i : ~~e, t < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i), e < 0 ? (e += i) < 0 && (e = 0) : e > i && (e = i), e < t && (e = t), h.TYPED_ARRAY_SUPPORT)(r = this.subarray(t, e)).__proto__ = h.prototype;
                else {
                    var s = e - t;
                    r = new h(s, void 0);
                    for (var n = 0; n < s; ++n) r[n] = this[n + t]
                }
                return r
            }, h.prototype.readUIntLE = function(t, e, r) { t |= 0, e |= 0, r || x(t, e, this.length); for (var i = this[t], s = 1, n = 0; ++n < e && (s *= 256);) i += this[t + n] * s; return i }, h.prototype.readUIntBE = function(t, e, r) { t |= 0, e |= 0, r || x(t, e, this.length); for (var i = this[t + --e], s = 1; e > 0 && (s *= 256);) i += this[t + --e] * s; return i }, h.prototype.readUInt8 = function(t, e) { return e || x(t, 1, this.length), this[t] }, h.prototype.readUInt16LE = function(t, e) { return e || x(t, 2, this.length), this[t] | this[t + 1] << 8 }, h.prototype.readUInt16BE = function(t, e) { return e || x(t, 2, this.length), this[t] << 8 | this[t + 1] }, h.prototype.readUInt32LE = function(t, e) { return e || x(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3] }, h.prototype.readUInt32BE = function(t, e) { return e || x(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]) }, h.prototype.readIntLE = function(t, e, r) { t |= 0, e |= 0, r || x(t, e, this.length); for (var i = this[t], s = 1, n = 0; ++n < e && (s *= 256);) i += this[t + n] * s; return i >= (s *= 128) && (i -= Math.pow(2, 8 * e)), i }, h.prototype.readIntBE = function(t, e, r) { t |= 0, e |= 0, r || x(t, e, this.length); for (var i = e, s = 1, n = this[t + --i]; i > 0 && (s *= 256);) n += this[t + --i] * s; return n >= (s *= 128) && (n -= Math.pow(2, 8 * e)), n }, h.prototype.readInt8 = function(t, e) { return e || x(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t] }, h.prototype.readInt16LE = function(t, e) { e || x(t, 2, this.length); var r = this[t] | this[t + 1] << 8; return 32768 & r ? 4294901760 | r : r }, h.prototype.readInt16BE = function(t, e) { e || x(t, 2, this.length); var r = this[t + 1] | this[t] << 8; return 32768 & r ? 4294901760 | r : r }, h.prototype.readInt32LE = function(t, e) { return e || x(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24 }, h.prototype.readInt32BE = function(t, e) { return e || x(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3] }, h.prototype.readFloatLE = function(t, e) { return e || x(t, 4, this.length), s.read(this, t, !0, 23, 4) }, h.prototype.readFloatBE = function(t, e) { return e || x(t, 4, this.length), s.read(this, t, !1, 23, 4) }, h.prototype.readDoubleLE = function(t, e) { return e || x(t, 8, this.length), s.read(this, t, !0, 52, 8) }, h.prototype.readDoubleBE = function(t, e) { return e || x(t, 8, this.length), s.read(this, t, !1, 52, 8) }, h.prototype.writeUIntLE = function(t, e, r, i) {
                (t = +t, e |= 0, r |= 0, i) || H(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                var s = 1,
                    n = 0;
                for (this[e] = 255 & t; ++n < r && (s *= 256);) this[e + n] = t / s & 255;
                return e + r
            }, h.prototype.writeUIntBE = function(t, e, r, i) {
                (t = +t, e |= 0, r |= 0, i) || H(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                var s = r - 1,
                    n = 1;
                for (this[e + s] = 255 & t; --s >= 0 && (n *= 256);) this[e + s] = t / n & 255;
                return e + r
            }, h.prototype.writeUInt8 = function(t, e, r) { return t = +t, e |= 0, r || H(this, t, e, 1, 255, 0), h.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1 }, h.prototype.writeUInt16LE = function(t, e, r) { return t = +t, e |= 0, r || H(this, t, e, 2, 65535, 0), h.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : E(this, t, e, !0), e + 2 }, h.prototype.writeUInt16BE = function(t, e, r) { return t = +t, e |= 0, r || H(this, t, e, 2, 65535, 0), h.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : E(this, t, e, !1), e + 2 }, h.prototype.writeUInt32LE = function(t, e, r) { return t = +t, e |= 0, r || H(this, t, e, 4, 4294967295, 0), h.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : M(this, t, e, !0), e + 4 }, h.prototype.writeUInt32BE = function(t, e, r) { return t = +t, e |= 0, r || H(this, t, e, 4, 4294967295, 0), h.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : M(this, t, e, !1), e + 4 }, h.prototype.writeIntLE = function(t, e, r, i) {
                if (t = +t, e |= 0, !i) {
                    var s = Math.pow(2, 8 * r - 1);
                    H(this, t, e, r, s - 1, -s)
                }
                var n = 0,
                    a = 1,
                    o = 0;
                for (this[e] = 255 & t; ++n < r && (a *= 256);) t < 0 && 0 === o && 0 !== this[e + n - 1] && (o = 1), this[e + n] = (t / a >> 0) - o & 255;
                return e + r
            }, h.prototype.writeIntBE = function(t, e, r, i) {
                if (t = +t, e |= 0, !i) {
                    var s = Math.pow(2, 8 * r - 1);
                    H(this, t, e, r, s - 1, -s)
                }
                var n = r - 1,
                    a = 1,
                    o = 0;
                for (this[e + n] = 255 & t; --n >= 0 && (a *= 256);) t < 0 && 0 === o && 0 !== this[e + n + 1] && (o = 1), this[e + n] = (t / a >> 0) - o & 255;
                return e + r
            }, h.prototype.writeInt8 = function(t, e, r) { return t = +t, e |= 0, r || H(this, t, e, 1, 127, -128), h.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1 }, h.prototype.writeInt16LE = function(t, e, r) { return t = +t, e |= 0, r || H(this, t, e, 2, 32767, -32768), h.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : E(this, t, e, !0), e + 2 }, h.prototype.writeInt16BE = function(t, e, r) { return t = +t, e |= 0, r || H(this, t, e, 2, 32767, -32768), h.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : E(this, t, e, !1), e + 2 }, h.prototype.writeInt32LE = function(t, e, r) { return t = +t, e |= 0, r || H(this, t, e, 4, 2147483647, -2147483648), h.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : M(this, t, e, !0), e + 4 }, h.prototype.writeInt32BE = function(t, e, r) { return t = +t, e |= 0, r || H(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), h.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : M(this, t, e, !1), e + 4 }, h.prototype.writeFloatLE = function(t, e, r) { return O(this, t, e, !0, r) }, h.prototype.writeFloatBE = function(t, e, r) { return O(this, t, e, !1, r) }, h.prototype.writeDoubleLE = function(t, e, r) { return D(this, t, e, !0, r) }, h.prototype.writeDoubleBE = function(t, e, r) { return D(this, t, e, !1, r) }, h.prototype.copy = function(t, e, r, i) {
                if (r || (r = 0), i || 0 === i || (i = this.length), e >= t.length && (e = t.length), e || (e = 0), i > 0 && i < r && (i = r), i === r) return 0;
                if (0 === t.length || 0 === this.length) return 0;
                if (e < 0) throw new RangeError("targetStart out of bounds");
                if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
                if (i < 0) throw new RangeError("sourceEnd out of bounds");
                i > this.length && (i = this.length), t.length - e < i - r && (i = t.length - e + r);
                var s, n = i - r;
                if (this === t && r < e && e < i)
                    for (s = n - 1; s >= 0; --s) t[s + e] = this[s + r];
                else if (n < 1e3 || !h.TYPED_ARRAY_SUPPORT)
                    for (s = 0; s < n; ++s) t[s + e] = this[s + r];
                else Uint8Array.prototype.set.call(t, this.subarray(r, r + n), e);
                return n
            }, h.prototype.fill = function(t, e, r, i) {
                if ("string" == typeof t) {
                    if ("string" == typeof e ? (i = e, e = 0, r = this.length) : "string" == typeof r && (i = r, r = this.length), 1 === t.length) {
                        var s = t.charCodeAt(0);
                        s < 256 && (t = s)
                    }
                    if (void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
                    if ("string" == typeof i && !h.isEncoding(i)) throw new TypeError("Unknown encoding: " + i)
                } else "number" == typeof t && (t &= 255);
                if (e < 0 || this.length < e || this.length < r) throw new RangeError("Out of range index");
                if (r <= e) return this;
                var n;
                if (e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0), "number" == typeof t)
                    for (n = e; n < r; ++n) this[n] = t;
                else {
                    var a = h.isBuffer(t) ? t : G(new h(t, i).toString()),
                        o = a.length;
                    for (n = 0; n < r - e; ++n) this[n + e] = a[n % o]
                }
                return this
            };
            var W = /[^+\/0-9A-Za-z-_]/g;

            function I(t) { return t < 16 ? "0" + t.toString(16) : t.toString(16) }

            function G(t, e) {
                var r;
                e = e || 1 / 0;
                for (var i = t.length, s = null, n = [], a = 0; a < i; ++a) {
                    if ((r = t.charCodeAt(a)) > 55295 && r < 57344) {
                        if (!s) {
                            if (r > 56319) {
                                (e -= 3) > -1 && n.push(239, 191, 189);
                                continue
                            }
                            if (a + 1 === i) {
                                (e -= 3) > -1 && n.push(239, 191, 189);
                                continue
                            }
                            s = r;
                            continue
                        }
                        if (r < 56320) {
                            (e -= 3) > -1 && n.push(239, 191, 189), s = r;
                            continue
                        }
                        r = 65536 + (s - 55296 << 10 | r - 56320)
                    } else s && (e -= 3) > -1 && n.push(239, 191, 189);
                    if (s = null, r < 128) {
                        if ((e -= 1) < 0) break;
                        n.push(r)
                    } else if (r < 2048) {
                        if ((e -= 2) < 0) break;
                        n.push(r >> 6 | 192, 63 & r | 128)
                    } else if (r < 65536) {
                        if ((e -= 3) < 0) break;
                        n.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                    } else {
                        if (!(r < 1114112)) throw new Error("Invalid code point");
                        if ((e -= 4) < 0) break;
                        n.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                    }
                }
                return n
            }

            function N(t) { return i.toByteArray(function(t) { if ((t = function(t) { return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "") }(t).replace(W, "")).length < 2) return ""; for (; t.length % 4 != 0;) t += "="; return t }(t)) }

            function z(t, e, r, i) { for (var s = 0; s < i && !(s + r >= e.length || s >= t.length); ++s) e[s + r] = t[s]; return s }
        }).call(this, r(2))
    }, function(t, e) {
        function r() { this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0 }

        function i(t) { return "function" == typeof t }

        function s(t) { return "object" == typeof t && null !== t }

        function n(t) { return void 0 === t }
        t.exports = r, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function(t) { if ("number" != typeof t || t < 0 || isNaN(t)) throw TypeError("n must be a positive number"); return this._maxListeners = t, this }, r.prototype.emit = function(t) {
            var e, r, a, o, h, u;
            if (this._events || (this._events = {}), "error" === t && (!this._events.error || s(this._events.error) && !this._events.error.length)) { if ((e = arguments[1]) instanceof Error) throw e; var l = new Error('Uncaught, unspecified "error" event. (' + e + ")"); throw l.context = e, l }
            if (n(r = this._events[t])) return !1;
            if (i(r)) switch (arguments.length) {
                    case 1:
                        r.call(this);
                        break;
                    case 2:
                        r.call(this, arguments[1]);
                        break;
                    case 3:
                        r.call(this, arguments[1], arguments[2]);
                        break;
                    default:
                        o = Array.prototype.slice.call(arguments, 1), r.apply(this, o)
                } else if (s(r))
                    for (o = Array.prototype.slice.call(arguments, 1), a = (u = r.slice()).length, h = 0; h < a; h++) u[h].apply(this, o);
            return !0
        }, r.prototype.addListener = function(t, e) { var a; if (!i(e)) throw TypeError("listener must be a function"); return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, i(e.listener) ? e.listener : e), this._events[t] ? s(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, s(this._events[t]) && !this._events[t].warned && (a = n(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners) && a > 0 && this._events[t].length > a && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace()), this }, r.prototype.on = r.prototype.addListener, r.prototype.once = function(t, e) {
            if (!i(e)) throw TypeError("listener must be a function");
            var r = !1;

            function s() { this.removeListener(t, s), r || (r = !0, e.apply(this, arguments)) }
            return s.listener = e, this.on(t, s), this
        }, r.prototype.removeListener = function(t, e) {
            var r, n, a, o;
            if (!i(e)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[t]) return this;
            if (a = (r = this._events[t]).length, n = -1, r === e || i(r.listener) && r.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e);
            else if (s(r)) {
                for (o = a; o-- > 0;)
                    if (r[o] === e || r[o].listener && r[o].listener === e) { n = o; break }
                if (n < 0) return this;
                1 === r.length ? (r.length = 0, delete this._events[t]) : r.splice(n, 1), this._events.removeListener && this.emit("removeListener", t, e)
            }
            return this
        }, r.prototype.removeAllListeners = function(t) {
            var e, r;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
            if (0 === arguments.length) { for (e in this._events) "removeListener" !== e && this.removeAllListeners(e); return this.removeAllListeners("removeListener"), this._events = {}, this }
            if (i(r = this._events[t])) this.removeListener(t, r);
            else if (r)
                for (; r.length;) this.removeListener(t, r[r.length - 1]);
            return delete this._events[t], this
        }, r.prototype.listeners = function(t) { return this._events && this._events[t] ? i(this._events[t]) ? [this._events[t]] : this._events[t].slice() : [] }, r.prototype.listenerCount = function(t) { if (this._events) { var e = this._events[t]; if (i(e)) return 1; if (e) return e.length } return 0 }, r.listenerCount = function(t, e) { return t.listenerCount(e) }
    }, function(t, e, r) {
        (function(i, s, n) {
            var a, o, h;
            ! function(t) {
                function e(t) { Object.defineProperty(this, t, { enumerable: !0, get: function() { return this[p][t] } }) }

                function i(t) {
                    var e;
                    if (t && t.__esModule) {
                        for (var r in e = {}, t) Object.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                        e.default = t
                    } else {
                        if ("[object Module]" === Object.prototype.toString.call(t) || s.isModule && s.isModule(t)) return t;
                        e = { default: t, __useDefault: !0 }
                    }
                    return new a(e)
                }

                function a(t) { Object.defineProperty(this, p, { value: t }), Object.keys(t).forEach(e, this) }

                function o(t) { return "@node/" === t.substr(0, 6) ? d(t, i(g(t.substr(6)))) : m[t] }

                function h(t) {
                    var e = o(t);
                    if (!e) throw new Error('Module "' + t + '" expected, but not contained in build.');
                    if (e.module) return e.module;
                    var r = e.linkRecord;
                    return function t(e, r) {
                        if (!r.depLoads) {
                            r.declare && u(e, r), r.depLoads = [];
                            for (var i = 0; i < r.deps.length; i++) {
                                var s = o(r.deps[i]);
                                r.depLoads.push(s), s.linkRecord && t(s, s.linkRecord);
                                var n = r.setters && r.setters[i];
                                n && (n(s.module || s.linkRecord.moduleObj), s.importerSetters.push(n))
                            }
                            return e
                        }
                    }(e, r), f(e, r, []), e.module
                }

                function u(e, r) {
                    var i = r.moduleObj,
                        s = e.importerSetters,
                        n = !1,
                        a = r.declare.call(t, function(t, e) {
                            if (!n) {
                                if ("object" == typeof t)
                                    for (var r in t) "__useDefault" !== r && (i[r] = t[r]);
                                else i[t] = e;
                                n = !0;
                                for (var a = 0; a < s.length; a++) s[a](i);
                                return n = !1, e
                            }
                        }, { id: e.key });
                    "function" != typeof a ? (r.setters = a.setters, r.execute = a.execute) : (r.setters = [], r.execute = a)
                }

                function l(t, e, r) { return m[t] = { key: t, module: void 0, importerSetters: [], linkRecord: { deps: e, depLoads: void 0, declare: r, setters: void 0, execute: void 0, moduleObj: {} } } }

                function c(t, e, r, i) { return m[t] = { key: t, module: void 0, importerSetters: [], linkRecord: { deps: e, depLoads: void 0, declare: void 0, execute: i, executingRequire: r, moduleObj: { default: {}, __useDefault: !0 }, setters: void 0 } } }

                function f(e, r, i) {
                    if (i.push(e), e.module) return e.module;
                    if (r.setters) {
                        for (var s = 0; s < r.deps.length; s++) {
                            var n = r.depLoads[s],
                                o = n.linkRecord;
                            o && -1 === i.indexOf(n) && f(n, o, o.setters ? i : [])
                        }
                        r.execute.call(y)
                    } else {
                        var h = { id: e.key },
                            u = r.moduleObj;
                        Object.defineProperty(h, "exports", { configurable: !0, set: function(t) { u.default = t }, get: function() { return u.default } });
                        var l = function(t, e, r) {
                            return function(i) {
                                for (var s = 0; s < t.length; s++)
                                    if (t[s] === i) { var n, a = e[s]; return (n = -1 === r.indexOf(a) ? f(a, a.linkRecord, r) : a.linkRecord.moduleObj).__useDefault ? n.default : n }
                            }
                        }(r.deps, r.depLoads, i);
                        if (!r.executingRequire)
                            for (s = 0; s < r.deps.length; s++) l(r.deps[s]);
                        var c = r.execute.call(t, l, u.default, h);
                        if (void 0 !== c ? u.default = c : h.exports !== u.default && (u.default = h.exports), u.default && u.default.__esModule)
                            for (var d in u.default) Object.hasOwnProperty.call(u.default, d) && "default" !== d && (u[d] = u.default[d])
                    }
                    h = e.module = new a(r.moduleObj);
                    if (!r.setters)
                        for (s = 0; s < e.importerSetters.length; s++) e.importerSetters[s](h);
                    return h
                }

                function d(t, e) { return m[t] = { key: t, module: e, importerSetters: [], linkRecord: void 0 } }
                var m = {},
                    p = "undefined" != typeof Symbol ? Symbol() : "@@baseObject";
                a.prototype = Object.create(null), "undefined" != typeof Symbol && Symbol.toStringTag && (a.prototype[Symbol.toStringTag] = "Module");
                var g = s._nodeRequire || void 0 !== n && n.platform && r(60),
                    y = {};
                return Object.freeze && Object.freeze(y),
                    function(t, e, r, s) {
                        return function(n) {
                            n(function(n) {
                                var o = { _nodeRequire: g, register: l, registerDynamic: c, registry: { get: function(t) { return m[t].module }, set: d }, newModule: function(t) { return new a(t) } };
                                d("@empty", new a({}));
                                for (var u = 0; u < e.length; u++) d(e[u], i(arguments[u]));
                                s(o);
                                var f = h(t[0]);
                                if (t.length > 1)
                                    for (u = 1; u < t.length; u++) h(t[u]);
                                return r ? f.default : (f instanceof a && Object.defineProperty(f, "__esModule", { value: !0 }), f)
                            })
                        }
                    }
            }("undefined" != typeof self ? self : i)(["a"], ["c"], !1, function(t) {
                this.require, this.exports, this.module, t.registerDynamic("b", [], !0, function(t, e, r) {
                    function i() { this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0 }

                    function s(t) { return "function" == typeof t }

                    function n(t) { return "object" == typeof t && null !== t }

                    function a(t) { return void 0 === t }
                    this || self, r.exports = i, i.EventEmitter = i, i.prototype._events = void 0, i.prototype._maxListeners = void 0, i.defaultMaxListeners = 10, i.prototype.setMaxListeners = function(t) { if (! function(t) { return "number" == typeof t }(t) || t < 0 || isNaN(t)) throw TypeError("n must be a positive number"); return this._maxListeners = t, this }, i.prototype.emit = function(t) {
                        var e, r, i, o, h, u;
                        if (this._events || (this._events = {}), "error" === t && (!this._events.error || n(this._events.error) && !this._events.error.length)) { if ((e = arguments[1]) instanceof Error) throw e; throw TypeError('Uncaught, unspecified "error" event.') }
                        if (a(r = this._events[t])) return !1;
                        if (s(r)) switch (arguments.length) {
                                case 1:
                                    r.call(this);
                                    break;
                                case 2:
                                    r.call(this, arguments[1]);
                                    break;
                                case 3:
                                    r.call(this, arguments[1], arguments[2]);
                                    break;
                                default:
                                    o = Array.prototype.slice.call(arguments, 1), r.apply(this, o)
                            } else if (n(r))
                                for (o = Array.prototype.slice.call(arguments, 1), i = (u = r.slice()).length, h = 0; h < i; h++) u[h].apply(this, o);
                        return !0
                    }, i.prototype.addListener = function(t, e) { var r; if (!s(e)) throw TypeError("listener must be a function"); return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, s(e.listener) ? e.listener : e), this._events[t] ? n(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, n(this._events[t]) && !this._events[t].warned && ((r = a(this._maxListeners) ? i.defaultMaxListeners : this._maxListeners) && r > 0 && this._events[t].length > r && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace())), this }, i.prototype.on = i.prototype.addListener, i.prototype.once = function(t, e) {
                        function r() { this.removeListener(t, r), i || (i = !0, e.apply(this, arguments)) }
                        if (!s(e)) throw TypeError("listener must be a function");
                        var i = !1;
                        return r.listener = e, this.on(t, r), this
                    }, i.prototype.removeListener = function(t, e) {
                        var r, i, a, o;
                        if (!s(e)) throw TypeError("listener must be a function");
                        if (!this._events || !this._events[t]) return this;
                        if (a = (r = this._events[t]).length, i = -1, r === e || s(r.listener) && r.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e);
                        else if (n(r)) {
                            for (o = a; o-- > 0;)
                                if (r[o] === e || r[o].listener && r[o].listener === e) { i = o; break }
                            if (i < 0) return this;
                            1 === r.length ? (r.length = 0, delete this._events[t]) : r.splice(i, 1), this._events.removeListener && this.emit("removeListener", t, e)
                        }
                        return this
                    }, i.prototype.removeAllListeners = function(t) {
                        var e, r;
                        if (!this._events) return this;
                        if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
                        if (0 === arguments.length) { for (e in this._events) "removeListener" !== e && this.removeAllListeners(e); return this.removeAllListeners("removeListener"), this._events = {}, this }
                        if (s(r = this._events[t])) this.removeListener(t, r);
                        else if (r)
                            for (; r.length;) this.removeListener(t, r[r.length - 1]);
                        return delete this._events[t], this
                    }, i.prototype.listeners = function(t) { return this._events && this._events[t] ? s(this._events[t]) ? [this._events[t]] : this._events[t].slice() : [] }, i.prototype.listenerCount = function(t) { if (this._events) { var e = this._events[t]; if (s(e)) return 1; if (e) return e.length } return 0 }, i.listenerCount = function(t, e) { return t.listenerCount(e) }
                }), t.register("a", ["b", "c"], function(t, e) {
                    "use strict";
                    var r, i, s, n, a, o, h, u, l;
                    return {
                        setters: [function(t) { r = t.default }, function(t) { i = t.default }],
                        execute: function() {
                            s = function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }, n = function() {
                                function t(t, e) {
                                    for (var r = 0; r < e.length; r++) {
                                        var i = e[r];
                                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                    }
                                }
                                return function(e, r, i) { return r && t(e.prototype, r), i && t(e, i), e }
                            }(), a = function(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }, o = function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }, h = window.requestAnimationFrame ? window.requestAnimationFrame : window.webkitRequestAnimationFrame ? window.webkitRequestAnimationFrame : window.mozRequestAnimationFrame ? window.mozRequestAnimationFrame : window.msRequestAnimationFrame ? window.msRequestAnimationFrame : window.oRequestAnimationFrame ? window.oRequestAnimationFrame : function(t) { setTimeout(t, 0) }, u = function(t) {
                                function e() { s(this, e); var t = a(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this)); return t.gamepads = t.emptyGamepadList, t.activeButtons = {}, t.activeAxes = {}, i(window).on("gamepadconnected webkitgamepadconnected mozgamepadconnected", function() { t.scanGamepads() }).on("gamepaddisconnected webkitgamepaddisconnected mozgamepaddisconnected", function() { t.scanGamepads() }), t }
                                return o(e, r), n(e, [{ key: "watch", value: function() { this.isWatching || (this.isWatching = !0, this.watchLoop()) } }, {
                                    key: "watchLoop",
                                    value: function() {
                                        var t = this;
                                        this.scanGamepads(), this.isWatching && h(function() { return t.watchLoop() })
                                    }
                                }, { key: "unwatch", value: function() { this.isWatching && (this.isWatching = !1) } }, {
                                    key: "scanGamepads",
                                    value: function() {
                                        var t = this,
                                            e = this.getGamepads();
                                        Object.keys(e).forEach(function(r) {
                                            var i = e[r];
                                            if (i) t.gamepads[r] ? (t.scanButtons(i), t.scanAxes(i)) : (t.gamepads = t.snapshotGamepadList(e), t.emit("connected", i));
                                            else if (t.gamepads[r]) {
                                                var s = t.gamepads[r];
                                                t.gamepads = t.snapshotGamepadList(e), t.emit("disconnected", s)
                                            }
                                        })
                                    }
                                }, {
                                    key: "scanButtons",
                                    value: function(t) {
                                        var e = this,
                                            r = this.activeButtons[t.index] = this.activeButtons[t.index] || {};
                                        t.buttons.forEach(function(i, s) {
                                            i = e.snapshotButton(e.mapButton(i));
                                            var n = r[s],
                                                a = { button: i, buttonIndex: s, gamepad: t };
                                            !i.pressed || n && n.pressed || e.emit("buttonPressed", a), n && i.value !== n.value && e.emit("buttonChanged", a), !i.pressed && n && n.pressed && e.emit("buttonReleased", a), r[s] = i
                                        })
                                    }
                                }, {
                                    key: "scanAxes",
                                    value: function(t) {
                                        var e = this,
                                            r = this.activeAxes[t.index] = this.activeAxes[t.index] || {};
                                        t.axes.forEach(function(i, s) {
                                            var n = r[s],
                                                a = { axis: i, axisIndex: s, gamepad: t };
                                            n && i !== n && e.emit("axisChanged", a), r[s] = i
                                        })
                                    }
                                }, { key: "getGamepads", value: function() { return navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : this.emptyGamepadList } }, { key: "snapshotGamepadList", value: function(t) { var e = {}; return Object.keys(t).forEach(function(r) { e[r] = t[r] }), e.length = t.length, e } }, { key: "snapshotButton", value: function(t) { return { pressed: !!t.pressed, touched: !!t.touched, value: t.value } } }, { key: "mapButton", value: function(t) { return "object" == typeof t ? t : { pressed: 1 === t, touched: 0 !== t, value: t } } }, { key: "emptyGamepadList", get: function() { return { 0: null, 1: null, 2: null, 3: null, length: 4 } } }]), e
                            }(), t("gamepad", l = new u), t("gamepad", l), t("default", l)
                        }
                    }
                })
            })(function(i) { o = [r(5)], void 0 === (h = "function" == typeof(a = i) ? a.apply(e, o) : a) || (t.exports = h) })
        }).call(this, r(2), r(29), r(7))
    }, function(t, e) { var r = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(); "number" == typeof __g && (__g = r) }, function(t, e, r) {
        "use strict";
        (function(e) { t.exports = { isNode: void 0 !== e, newBufferFrom: function(t, r) { return new e(t, r) }, allocBuffer: function(t) { return e.alloc ? e.alloc(t) : new e(t) }, isBuffer: function(t) { return e.isBuffer(t) }, isStream: function(t) { return t && "function" == typeof t.on && "function" == typeof t.pause && "function" == typeof t.resume } } }).call(this, r(13).Buffer)
    }, function(t, e, r) {
        var i = r(13),
            s = i.Buffer;

        function n(t, e) { for (var r in t) e[r] = t[r] }

        function a(t, e, r) { return s(t, e, r) }
        s.from && s.alloc && s.allocUnsafe && s.allocUnsafeSlow ? t.exports = i : (n(i, e), e.Buffer = a), n(s, a), a.from = function(t, e, r) { if ("number" == typeof t) throw new TypeError("Argument must not be a number"); return s(t, e, r) }, a.alloc = function(t, e, r) { if ("number" != typeof t) throw new TypeError("Argument must be a number"); var i = s(t); return void 0 !== e ? "string" == typeof r ? i.fill(e, r) : i.fill(e) : i.fill(0), i }, a.allocUnsafe = function(t) { if ("number" != typeof t) throw new TypeError("Argument must be a number"); return s(t) }, a.allocUnsafeSlow = function(t) { if ("number" != typeof t) throw new TypeError("Argument must be a number"); return i.SlowBuffer(t) }
    }, function(t, e, r) {
        "use strict";
        (function(e) {
            !e.version || 0 === e.version.indexOf("v0.") || 0 === e.version.indexOf("v1.") && 0 !== e.version.indexOf("v1.8.") ? t.exports = {
                nextTick: function(t, r, i, s) {
                    if ("function" != typeof t) throw new TypeError('"callback" argument must be a function');
                    var n, a, o = arguments.length;
                    switch (o) {
                        case 0:
                        case 1:
                            return e.nextTick(t);
                        case 2:
                            return e.nextTick(function() { t.call(null, r) });
                        case 3:
                            return e.nextTick(function() { t.call(null, r, i) });
                        case 4:
                            return e.nextTick(function() { t.call(null, r, i, s) });
                        default:
                            for (n = new Array(o - 1), a = 0; a < n.length;) n[a++] = arguments[a];
                            return e.nextTick(function() { t.apply(null, n) })
                    }
                }
            } : t.exports = e
        }).call(this, r(7))
    }, function(t, e, r) {
        ! function(t, e, r) {
            "use strict";
            e = "default" in e ? e.default : e, r = "default" in r ? r.default : r;
            var i = function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") },
                s = function() {
                    function t(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function(e, r, i) { return r && t(e.prototype, r), i && t(e, i), e }
                }(),
                n = function(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e },
                a = function(t) {
                    function e(t) { i(this, e); var s = n(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this)); return s.$element = r(t), s.element = s.$element.get(0), r(document).on("pointerlockchange mozpointerlockchange webkitpointerlockchange", s.pointerLockChange.bind(s)).on("pointerlockerror mozpointerlockerror webkitpointerlockerror", s.pointerLockError.bind(s)), setTimeout(function() { e.isSupported || s.emit("unsupported") }, 0), s }
                    return function(t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                        t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                    }(e, t), s(e, [{ key: "requestPointerLock", value: function() { var t = this.element; return t.requestPointerLock ? t.requestPointerLock() : t.mozRequestPointerLock ? t.mozRequestPointerLock() : t.webkitRequestPointerLock ? t.webkitRequestPointerLock() : void 0 } }, { key: "pointerLockChange", value: function(t) { this.emit("change", this.isLocked, t) } }, { key: "pointerLockError", value: function(t) { this.emit("error", new Error("pointer lock failed"), t) } }, { key: "isLocked", get: function() { return e.pointerLockElement === this.element } }], [{ key: "exitPointerLock", value: function() { return document.exitPointerLock ? document.exitPointerLock() : document.mozExitPointerLock ? document.mozExitPointerLock() : document.webkitExitPointerLock ? document.webkitExitPointerLock() : void 0 } }, { key: "pointerLockElement", get: function() { return document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || null } }, { key: "isSupported", get: function() { return "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document } }]), e
                }(e);
            t.default = a, t.PointerLock = a, Object.defineProperty(t, "__esModule", { value: !0 })
        }(e, r(14), r(5))
    }, function(t, e, r) {
        "use strict";
        t.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" }
    }, function(t, e, r) {
        "use strict";
        var i = r(0);
        var s = function() {
            for (var t, e = [], r = 0; r < 256; r++) {
                t = r;
                for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
                e[r] = t
            }
            return e
        }();
        t.exports = function(t, e) {
            return void 0 !== t && t.length ? "string" !== i.getTypeOf(t) ? function(t, e, r, i) {
                var n = s,
                    a = i + r;
                t ^= -1;
                for (var o = i; o < a; o++) t = t >>> 8 ^ n[255 & (t ^ e[o])];
                return -1 ^ t
            }(0 | e, t, t.length, 0) : function(t, e, r, i) {
                var n = s,
                    a = i + r;
                t ^= -1;
                for (var o = i; o < a; o++) t = t >>> 8 ^ n[255 & (t ^ e.charCodeAt(o))];
                return -1 ^ t
            }(0 | e, t, t.length, 0) : 0
        }
    }, function(t, e, r) {
        "use strict";
        var i = r(11),
            s = r(43),
            n = r(42),
            a = r(41);
        n = r(42);

        function o(t, e, r, i, s) { this.compressedSize = t, this.uncompressedSize = e, this.crc32 = r, this.compression = i, this.compressedContent = s }
        o.prototype = {
            getContentWorker: function() {
                var t = new s(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new n("data_length")),
                    e = this;
                return t.on("end", function() { if (this.streamInfo.data_length !== e.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch") }), t
            },
            getCompressedWorker: function() { return new s(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression) }
        }, o.createWorkerFrom = function(t, e, r) { return t.pipe(new a).pipe(new n("uncompressedSize")).pipe(e.compressWorker(r)).pipe(new n("compressedSize")).withStreamInfo("compression", e) }, t.exports = o
    }, function(t, e, r) { t.exports = !r(47)(function() { return 7 != Object.defineProperty({}, "a", { get: function() { return 7 } }).a }) }, function(t, e) { t.exports = function(t) { return "object" == typeof t ? null !== t : "function" == typeof t } }, function(t, e, r) {
        "use strict";
        (function(e, i, s) {
            var n = r(19);

            function a(t) {
                var e = this;
                this.next = null, this.entry = null, this.finish = function() {
                    ! function(t, e, r) {
                        var i = t.entry;
                        t.entry = null;
                        for (; i;) {
                            var s = i.callback;
                            e.pendingcb--, s(r), i = i.next
                        }
                        e.corkedRequestsFree ? e.corkedRequestsFree.next = t : e.corkedRequestsFree = t
                    }(e, t)
                }
            }
            t.exports = C;
            var o, h = !e.browser && ["v0.10", "v0.9."].indexOf(e.version.slice(0, 5)) > -1 ? i : n.nextTick;
            C.WritableState = y;
            var u = r(12);
            u.inherits = r(8);
            var l = { deprecate: r(103) },
                c = r(54),
                f = r(18).Buffer,
                d = s.Uint8Array || function() {};
            var m, p = r(53);

            function g() {}

            function y(t, e) {
                o = o || r(6), t = t || {};
                var i = e instanceof o;
                this.objectMode = !!t.objectMode, i && (this.objectMode = this.objectMode || !!t.writableObjectMode);
                var s = t.highWaterMark,
                    u = t.writableHighWaterMark,
                    l = this.objectMode ? 16 : 16384;
                this.highWaterMark = s || 0 === s ? s : i && (u || 0 === u) ? u : l, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
                var c = !1 === t.decodeStrings;
                this.decodeStrings = !c, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(t) {
                    ! function(t, e) {
                        var r = t._writableState,
                            i = r.sync,
                            s = r.writecb;
                        if (function(t) { t.writing = !1, t.writecb = null, t.length -= t.writelen, t.writelen = 0 }(r), e) ! function(t, e, r, i, s) {--e.pendingcb, r ? (n.nextTick(s, i), n.nextTick(S, t, e), t._writableState.errorEmitted = !0, t.emit("error", i)) : (s(i), t._writableState.errorEmitted = !0, t.emit("error", i), S(t, e)) }(t, r, i, e, s);
                        else {
                            var a = k(r);
                            a || r.corked || r.bufferProcessing || !r.bufferedRequest || w(t, r), i ? h(v, t, r, a, s) : v(t, r, a, s)
                        }
                    }(e, t)
                }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new a(this)
            }

            function C(t) {
                if (o = o || r(6), !(m.call(C, this) || this instanceof o)) return new C(t);
                this._writableState = new y(t, this), this.writable = !0, t && ("function" == typeof t.write && (this._write = t.write), "function" == typeof t.writev && (this._writev = t.writev), "function" == typeof t.destroy && (this._destroy = t.destroy), "function" == typeof t.final && (this._final = t.final)), c.call(this)
            }

            function b(t, e, r, i, s, n, a) { e.writelen = i, e.writecb = a, e.writing = !0, e.sync = !0, r ? t._writev(s, e.onwrite) : t._write(s, n, e.onwrite), e.sync = !1 }

            function v(t, e, r, i) { r || function(t, e) { 0 === e.length && e.needDrain && (e.needDrain = !1, t.emit("drain")) }(t, e), e.pendingcb--, i(), S(t, e) }

            function w(t, e) {
                e.bufferProcessing = !0;
                var r = e.bufferedRequest;
                if (t._writev && r && r.next) {
                    var i = e.bufferedRequestCount,
                        s = new Array(i),
                        n = e.corkedRequestsFree;
                    n.entry = r;
                    for (var o = 0, h = !0; r;) s[o] = r, r.isBuf || (h = !1), r = r.next, o += 1;
                    s.allBuffers = h, b(t, e, !0, e.length, s, "", n.finish), e.pendingcb++, e.lastBufferedRequest = null, n.next ? (e.corkedRequestsFree = n.next, n.next = null) : e.corkedRequestsFree = new a(e), e.bufferedRequestCount = 0
                } else {
                    for (; r;) {
                        var u = r.chunk,
                            l = r.encoding,
                            c = r.callback;
                        if (b(t, e, !1, e.objectMode ? 1 : u.length, u, l, c), r = r.next, e.bufferedRequestCount--, e.writing) break
                    }
                    null === r && (e.lastBufferedRequest = null)
                }
                e.bufferedRequest = r, e.bufferProcessing = !1
            }

            function k(t) { return t.ending && 0 === t.length && null === t.bufferedRequest && !t.finished && !t.writing }

            function B(t, e) { t._final(function(r) { e.pendingcb--, r && t.emit("error", r), e.prefinished = !0, t.emit("prefinish"), S(t, e) }) }

            function S(t, e) { var r = k(e); return r && (! function(t, e) { e.prefinished || e.finalCalled || ("function" == typeof t._final ? (e.pendingcb++, e.finalCalled = !0, n.nextTick(B, t, e)) : (e.prefinished = !0, t.emit("prefinish"))) }(t, e), 0 === e.pendingcb && (e.finished = !0, t.emit("finish"))), r }
            u.inherits(C, c), y.prototype.getBuffer = function() { for (var t = this.bufferedRequest, e = []; t;) e.push(t), t = t.next; return e },
                function() { try { Object.defineProperty(y.prototype, "buffer", { get: l.deprecate(function() { return this.getBuffer() }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") }) } catch (t) {} }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (m = Function.prototype[Symbol.hasInstance], Object.defineProperty(C, Symbol.hasInstance, { value: function(t) { return !!m.call(this, t) || this === C && (t && t._writableState instanceof y) } })) : m = function(t) { return t instanceof this }, C.prototype.pipe = function() { this.emit("error", new Error("Cannot pipe, not readable")) }, C.prototype.write = function(t, e, r) {
                    var i, s = this._writableState,
                        a = !1,
                        o = !s.objectMode && (i = t, f.isBuffer(i) || i instanceof d);
                    return o && !f.isBuffer(t) && (t = function(t) { return f.from(t) }(t)), "function" == typeof e && (r = e, e = null), o ? e = "buffer" : e || (e = s.defaultEncoding), "function" != typeof r && (r = g), s.ended ? function(t, e) {
                        var r = new Error("write after end");
                        t.emit("error", r), n.nextTick(e, r)
                    }(this, r) : (o || function(t, e, r, i) {
                        var s = !0,
                            a = !1;
                        return null === r ? a = new TypeError("May not write null values to stream") : "string" == typeof r || void 0 === r || e.objectMode || (a = new TypeError("Invalid non-string/buffer chunk")), a && (t.emit("error", a), n.nextTick(i, a), s = !1), s
                    }(this, s, t, r)) && (s.pendingcb++, a = function(t, e, r, i, s, n) {
                        if (!r) {
                            var a = function(t, e, r) { t.objectMode || !1 === t.decodeStrings || "string" != typeof e || (e = f.from(e, r)); return e }(e, i, s);
                            i !== a && (r = !0, s = "buffer", i = a)
                        }
                        var o = e.objectMode ? 1 : i.length;
                        e.length += o;
                        var h = e.length < e.highWaterMark;
                        h || (e.needDrain = !0);
                        if (e.writing || e.corked) {
                            var u = e.lastBufferedRequest;
                            e.lastBufferedRequest = { chunk: i, encoding: s, isBuf: r, callback: n, next: null }, u ? u.next = e.lastBufferedRequest : e.bufferedRequest = e.lastBufferedRequest, e.bufferedRequestCount += 1
                        } else b(t, e, !1, o, i, s, n);
                        return h
                    }(this, s, o, t, e, r)), a
                }, C.prototype.cork = function() { this._writableState.corked++ }, C.prototype.uncork = function() {
                    var t = this._writableState;
                    t.corked && (t.corked--, t.writing || t.corked || t.finished || t.bufferProcessing || !t.bufferedRequest || w(this, t))
                }, C.prototype.setDefaultEncoding = function(t) { if ("string" == typeof t && (t = t.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((t + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + t); return this._writableState.defaultEncoding = t, this }, Object.defineProperty(C.prototype, "writableHighWaterMark", { enumerable: !1, get: function() { return this._writableState.highWaterMark } }), C.prototype._write = function(t, e, r) { r(new Error("_write() is not implemented")) }, C.prototype._writev = null, C.prototype.end = function(t, e, r) {
                    var i = this._writableState;
                    "function" == typeof t ? (r = t, t = null, e = null) : "function" == typeof e && (r = e, e = null), null !== t && void 0 !== t && this.write(t, e), i.corked && (i.corked = 1, this.uncork()), i.ending || i.finished || function(t, e, r) {
                        e.ending = !0, S(t, e), r && (e.finished ? n.nextTick(r) : t.once("finish", r));
                        e.ended = !0, t.writable = !1
                    }(this, i, r)
                }, Object.defineProperty(C.prototype, "destroyed", { get: function() { return void 0 !== this._writableState && this._writableState.destroyed }, set: function(t) { this._writableState && (this._writableState.destroyed = t) } }), C.prototype.destroy = p.destroy, C.prototype._undestroy = p.undestroy, C.prototype._destroy = function(t, e) { this.end(), e(t) }
        }).call(this, r(7), r(105).setImmediate, r(2))
    }, function(t, e, r) {
        (e = t.exports = r(55)).Stream = e, e.Readable = e, e.Writable = r(26), e.Duplex = r(6), e.Transform = r(51), e.PassThrough = r(102)
    }, function(t, e, r) {
        (function(i, s, n) {
            var a, o, h;
            ! function(t) {
                function e(t) { Object.defineProperty(this, t, { enumerable: !0, get: function() { return this[p][t] } }) }

                function i(t) {
                    var e;
                    if (t && t.__esModule) {
                        for (var r in e = {}, t) Object.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                        e.default = t
                    } else {
                        if ("[object Module]" === Object.prototype.toString.call(t) || s.isModule && s.isModule(t)) return t;
                        e = { default: t, __useDefault: !0 }
                    }
                    return new a(e)
                }

                function a(t) { Object.defineProperty(this, p, { value: t }), Object.keys(t).forEach(e, this) }

                function o(t) { return "@node/" === t.substr(0, 6) ? d(t, i(g(t.substr(6)))) : m[t] }

                function h(t) {
                    var e = o(t);
                    if (!e) throw new Error('Module "' + t + '" expected, but not contained in build.');
                    if (e.module) return e.module;
                    var r = e.linkRecord;
                    return function t(e, r) {
                        if (!r.depLoads) {
                            r.declare && u(e, r), r.depLoads = [];
                            for (var i = 0; i < r.deps.length; i++) {
                                var s = o(r.deps[i]);
                                r.depLoads.push(s), s.linkRecord && t(s, s.linkRecord);
                                var n = r.setters && r.setters[i];
                                n && (n(s.module || s.linkRecord.moduleObj), s.importerSetters.push(n))
                            }
                            return e
                        }
                    }(e, r), f(e, r, []), e.module
                }

                function u(e, r) {
                    var i = r.moduleObj,
                        s = e.importerSetters,
                        n = !1,
                        a = r.declare.call(t, function(t, e) {
                            if (!n) {
                                if ("object" == typeof t)
                                    for (var r in t) "__useDefault" !== r && (i[r] = t[r]);
                                else i[t] = e;
                                n = !0;
                                for (var a = 0; a < s.length; a++) s[a](i);
                                return n = !1, e
                            }
                        }, { id: e.key });
                    "function" != typeof a ? (r.setters = a.setters, r.execute = a.execute) : (r.setters = [], r.execute = a)
                }

                function l(t, e, r) { return m[t] = { key: t, module: void 0, importerSetters: [], linkRecord: { deps: e, depLoads: void 0, declare: r, setters: void 0, execute: void 0, moduleObj: {} } } }

                function c(t, e, r, i) { return m[t] = { key: t, module: void 0, importerSetters: [], linkRecord: { deps: e, depLoads: void 0, declare: void 0, execute: i, executingRequire: r, moduleObj: { default: {}, __useDefault: !0 }, setters: void 0 } } }

                function f(e, r, i) {
                    if (i.push(e), e.module) return e.module;
                    if (r.setters) {
                        for (var s = 0; s < r.deps.length; s++) {
                            var n = r.depLoads[s],
                                o = n.linkRecord;
                            o && -1 === i.indexOf(n) && f(n, o, o.setters ? i : [])
                        }
                        r.execute.call(y)
                    } else {
                        var h = { id: e.key },
                            u = r.moduleObj;
                        Object.defineProperty(h, "exports", { configurable: !0, set: function(t) { u.default = t }, get: function() { return u.default } });
                        var l = function(t, e, r) {
                            return function(i) {
                                for (var s = 0; s < t.length; s++)
                                    if (t[s] === i) { var n, a = e[s]; return (n = -1 === r.indexOf(a) ? f(a, a.linkRecord, r) : a.linkRecord.moduleObj).__useDefault ? n.default : n }
                            }
                        }(r.deps, r.depLoads, i);
                        if (!r.executingRequire)
                            for (s = 0; s < r.deps.length; s++) l(r.deps[s]);
                        var c = r.execute.call(t, l, u.default, h);
                        if (void 0 !== c ? u.default = c : h.exports !== u.default && (u.default = h.exports), u.default && u.default.__esModule)
                            for (var d in u.default) Object.hasOwnProperty.call(u.default, d) && "default" !== d && (u[d] = u.default[d])
                    }
                    h = e.module = new a(r.moduleObj);
                    if (!r.setters)
                        for (s = 0; s < e.importerSetters.length; s++) e.importerSetters[s](h);
                    return h
                }

                function d(t, e) { return m[t] = { key: t, module: e, importerSetters: [], linkRecord: void 0 } }
                var m = {},
                    p = "undefined" != typeof Symbol ? Symbol() : "@@baseObject";
                a.prototype = Object.create(null), "undefined" != typeof Symbol && Symbol.toStringTag && (a.prototype[Symbol.toStringTag] = "Module");
                var g = s._nodeRequire || void 0 !== n && n.platform && r(59),
                    y = {};
                return Object.freeze && Object.freeze(y),
                    function(t, e, r, s) {
                        return function(n) {
                            n(function(n) {
                                var o = { _nodeRequire: g, register: l, registerDynamic: c, registry: { get: function(t) { return m[t].module }, set: d }, newModule: function(t) { return new a(t) } };
                                d("@empty", new a({}));
                                for (var u = 0; u < e.length; u++) d(e[u], i(arguments[u]));
                                s(o);
                                var f = h(t[0]);
                                if (t.length > 1)
                                    for (u = 1; u < t.length; u++) h(t[u]);
                                return r ? f.default : (f instanceof a && Object.defineProperty(f, "__esModule", { value: !0 }), f)
                            })
                        }
                    }
            }("undefined" != typeof self ? self : i)(["a"], ["c"], !1, function(t) {
                this.require, this.exports, this.module, t.registerDynamic("b", [], !0, function(t, e, r) {
                    function i() { this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0 }

                    function s(t) { return "function" == typeof t }

                    function n(t) { return "object" == typeof t && null !== t }

                    function a(t) { return void 0 === t }
                    this || self, r.exports = i, i.EventEmitter = i, i.prototype._events = void 0, i.prototype._maxListeners = void 0, i.defaultMaxListeners = 10, i.prototype.setMaxListeners = function(t) { if (! function(t) { return "number" == typeof t }(t) || t < 0 || isNaN(t)) throw TypeError("n must be a positive number"); return this._maxListeners = t, this }, i.prototype.emit = function(t) {
                        var e, r, i, o, h, u;
                        if (this._events || (this._events = {}), "error" === t && (!this._events.error || n(this._events.error) && !this._events.error.length)) { if ((e = arguments[1]) instanceof Error) throw e; throw TypeError('Uncaught, unspecified "error" event.') }
                        if (a(r = this._events[t])) return !1;
                        if (s(r)) switch (arguments.length) {
                                case 1:
                                    r.call(this);
                                    break;
                                case 2:
                                    r.call(this, arguments[1]);
                                    break;
                                case 3:
                                    r.call(this, arguments[1], arguments[2]);
                                    break;
                                default:
                                    o = Array.prototype.slice.call(arguments, 1), r.apply(this, o)
                            } else if (n(r))
                                for (o = Array.prototype.slice.call(arguments, 1), i = (u = r.slice()).length, h = 0; h < i; h++) u[h].apply(this, o);
                        return !0
                    }, i.prototype.addListener = function(t, e) { var r; if (!s(e)) throw TypeError("listener must be a function"); return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, s(e.listener) ? e.listener : e), this._events[t] ? n(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, n(this._events[t]) && !this._events[t].warned && ((r = a(this._maxListeners) ? i.defaultMaxListeners : this._maxListeners) && r > 0 && this._events[t].length > r && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace())), this }, i.prototype.on = i.prototype.addListener, i.prototype.once = function(t, e) {
                        function r() { this.removeListener(t, r), i || (i = !0, e.apply(this, arguments)) }
                        if (!s(e)) throw TypeError("listener must be a function");
                        var i = !1;
                        return r.listener = e, this.on(t, r), this
                    }, i.prototype.removeListener = function(t, e) {
                        var r, i, a, o;
                        if (!s(e)) throw TypeError("listener must be a function");
                        if (!this._events || !this._events[t]) return this;
                        if (a = (r = this._events[t]).length, i = -1, r === e || s(r.listener) && r.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e);
                        else if (n(r)) {
                            for (o = a; o-- > 0;)
                                if (r[o] === e || r[o].listener && r[o].listener === e) { i = o; break }
                            if (i < 0) return this;
                            1 === r.length ? (r.length = 0, delete this._events[t]) : r.splice(i, 1), this._events.removeListener && this.emit("removeListener", t, e)
                        }
                        return this
                    }, i.prototype.removeAllListeners = function(t) {
                        var e, r;
                        if (!this._events) return this;
                        if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
                        if (0 === arguments.length) { for (e in this._events) "removeListener" !== e && this.removeAllListeners(e); return this.removeAllListeners("removeListener"), this._events = {}, this }
                        if (s(r = this._events[t])) this.removeListener(t, r);
                        else if (r)
                            for (; r.length;) this.removeListener(t, r[r.length - 1]);
                        return delete this._events[t], this
                    }, i.prototype.listeners = function(t) { return this._events && this._events[t] ? s(this._events[t]) ? [this._events[t]] : this._events[t].slice() : [] }, i.prototype.listenerCount = function(t) { if (this._events) { var e = this._events[t]; if (s(e)) return 1; if (e) return e.length } return 0 }, i.listenerCount = function(t, e) { return t.listenerCount(e) }
                }), t.register("a", ["b", "c"], function(t, e) {
                    "use strict";
                    var r, i, s, n, a, o, h;
                    return {
                        setters: [function(t) { r = t.default }, function(t) { i = t.default }],
                        execute: function() {
                            s = function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }, n = function() {
                                function t(t, e) {
                                    for (var r = 0; r < e.length; r++) {
                                        var i = e[r];
                                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                    }
                                }
                                return function(e, r, i) { return r && t(e.prototype, r), i && t(e, i), e }
                            }(), a = function(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }, o = function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }, t("Fullscreen", h = function(t) {
                                function e(t) { s(this, e); var r = a(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this)); return r.$element = i(t), r.element = r.$element.get(0), i(document).on("fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange", r.fullscreenChange.bind(r)).on("fullscreenerror webkitfullscreenerror mozfullscreenerror msfullscreenerror", r.fullscreenError.bind(r)), setTimeout(function() { e.isSupported || r.emit("unsupported") }, 0), r }
                                return o(e, r), n(e, [{ key: "requestFullscreen", value: function() { var t = this.element; return t.requestFullscreen ? t.requestFullscreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.msRequestFullscreen ? t.msRequestFullscreen() : void 0 } }, {
                                    key: "fullscreenChange",
                                    value: function(t) {
                                        var e = this.isActive;
                                        this.emit("change", e, t), this.emit("fullscreenchange", e, t)
                                    }
                                }, {
                                    key: "fullscreenError",
                                    value: function(t) {
                                        var e = new Error("fullscreen failed");
                                        this.emit("error", e, t), this.emit("fullscreenerror", e, t)
                                    }
                                }, { key: "isActive", get: function() { return e.fullscreenElement === this.element } }], [{ key: "exitFullscreen", value: function() { return document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen ? document.msExitFullscreen() : void 0 } }, { key: "fullscreenElement", get: function() { return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null } }, { key: "fullscreenEnabled", get: function() { return document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || !1 } }, { key: "isSupported", get: function() { return e.fullscreenEnabled } }]), e
                            }()), t("Fullscreen", h), t("default", h)
                        }
                    }
                })
            })(function(i) { o = [r(5)], void 0 === (h = "function" == typeof(a = i) ? a.apply(e, o) : a) || (t.exports = h) })
        }).call(this, r(2), r(29), r(7))
    }, function(t, e) { t.exports = { import: function() { throw new Error("System.import cannot be used indirectly") } } }, function(t, e, r) {
        "use strict";
        var i = r(32);

        function s(t) { i.call(this, t) }
        r(0).inherits(s, i), s.prototype.readData = function(t) { if (this.checkOffset(t), 0 === t) return new Uint8Array(0); var e = this.data.subarray(this.zero + this.index, this.zero + this.index + t); return this.index += t, e }, t.exports = s
    }, function(t, e, r) {
        "use strict";
        var i = r(0);

        function s(t) { this.data = t, this.length = t.length, this.index = 0, this.zero = 0 }
        s.prototype = { checkOffset: function(t) { this.checkIndex(this.index + t) }, checkIndex: function(t) { if (this.length < this.zero + t || t < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + t + "). Corrupted zip ?") }, setIndex: function(t) { this.checkIndex(t), this.index = t }, skip: function(t) { this.setIndex(this.index + t) }, byteAt: function(t) {}, readInt: function(t) { var e, r = 0; for (this.checkOffset(t), e = this.index + t - 1; e >= this.index; e--) r = (r << 8) + this.byteAt(e); return this.index += t, r }, readString: function(t) { return i.transformTo("string", this.readData(t)) }, readData: function(t) {}, lastIndexOfSignature: function(t) {}, readAndCheckSignature: function(t) {}, readDate: function() { var t = this.readInt(4); return new Date(Date.UTC(1980 + (t >> 25 & 127), (t >> 21 & 15) - 1, t >> 16 & 31, t >> 11 & 31, t >> 5 & 63, (31 & t) << 1)) } }, t.exports = s
    }, function(t, e, r) {
        "use strict";
        var i = r(31);

        function s(t) { i.call(this, t); for (var e = 0; e < this.data.length; e++) t[e] = 255 & t[e] }
        r(0).inherits(s, i), s.prototype.byteAt = function(t) { return this.data[this.zero + t] }, s.prototype.lastIndexOfSignature = function(t) {
            for (var e = t.charCodeAt(0), r = t.charCodeAt(1), i = t.charCodeAt(2), s = t.charCodeAt(3), n = this.length - 4; n >= 0; --n)
                if (this.data[n] === e && this.data[n + 1] === r && this.data[n + 2] === i && this.data[n + 3] === s) return n - this.zero;
            return -1
        }, s.prototype.readAndCheckSignature = function(t) {
            var e = t.charCodeAt(0),
                r = t.charCodeAt(1),
                i = t.charCodeAt(2),
                s = t.charCodeAt(3),
                n = this.readData(4);
            return e === n[0] && r === n[1] && i === n[2] && s === n[3]
        }, s.prototype.readData = function(t) { if (this.checkOffset(t), 0 === t) return []; var e = this.data.slice(this.zero + this.index, this.zero + this.index + t); return this.index += t, e }, t.exports = s
    }, function(t, e, r) {
        "use strict";
        var i = r(0),
            s = r(4),
            n = r(32),
            a = r(63),
            o = r(62),
            h = r(30);
        t.exports = function(t) { var e = i.getTypeOf(t); return i.checkSupport(e), "string" !== e || s.uint8array ? "nodebuffer" === e ? new o(t) : s.uint8array ? new h(i.transformTo("uint8array", t)) : new n(i.transformTo("array", t)) : new a(t) }
    }, function(t, e, r) {
        "use strict";
        e.LOCAL_FILE_HEADER = "PK", e.CENTRAL_FILE_HEADER = "PK", e.CENTRAL_DIRECTORY_END = "PK", e.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK", e.ZIP64_CENTRAL_DIRECTORY_END = "PK", e.DATA_DESCRIPTOR = "PK\b"
    }, function(t, e, r) {
        "use strict";
        t.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 }
    }, function(t, e, r) {
        "use strict";
        t.exports = function() { this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0 }
    }, function(t, e, r) {
        "use strict";
        var i = r(3),
            s = !0,
            n = !0;
        try { String.fromCharCode.apply(null, [0]) } catch (t) { s = !1 }
        try { String.fromCharCode.apply(null, new Uint8Array(1)) } catch (t) { n = !1 }
        for (var a = new i.Buf8(256), o = 0; o < 256; o++) a[o] = o >= 252 ? 6 : o >= 248 ? 5 : o >= 240 ? 4 : o >= 224 ? 3 : o >= 192 ? 2 : 1;

        function h(t, e) { if (e < 65537 && (t.subarray && n || !t.subarray && s)) return String.fromCharCode.apply(null, i.shrinkBuf(t, e)); for (var r = "", a = 0; a < e; a++) r += String.fromCharCode(t[a]); return r }
        a[254] = a[254] = 1, e.string2buf = function(t) {
            var e, r, s, n, a, o = t.length,
                h = 0;
            for (n = 0; n < o; n++) 55296 == (64512 & (r = t.charCodeAt(n))) && n + 1 < o && 56320 == (64512 & (s = t.charCodeAt(n + 1))) && (r = 65536 + (r - 55296 << 10) + (s - 56320), n++), h += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
            for (e = new i.Buf8(h), a = 0, n = 0; a < h; n++) 55296 == (64512 & (r = t.charCodeAt(n))) && n + 1 < o && 56320 == (64512 & (s = t.charCodeAt(n + 1))) && (r = 65536 + (r - 55296 << 10) + (s - 56320), n++), r < 128 ? e[a++] = r : r < 2048 ? (e[a++] = 192 | r >>> 6, e[a++] = 128 | 63 & r) : r < 65536 ? (e[a++] = 224 | r >>> 12, e[a++] = 128 | r >>> 6 & 63, e[a++] = 128 | 63 & r) : (e[a++] = 240 | r >>> 18, e[a++] = 128 | r >>> 12 & 63, e[a++] = 128 | r >>> 6 & 63, e[a++] = 128 | 63 & r);
            return e
        }, e.buf2binstring = function(t) { return h(t, t.length) }, e.binstring2buf = function(t) { for (var e = new i.Buf8(t.length), r = 0, s = e.length; r < s; r++) e[r] = t.charCodeAt(r); return e }, e.buf2string = function(t, e) {
            var r, i, s, n, o = e || t.length,
                u = new Array(2 * o);
            for (i = 0, r = 0; r < o;)
                if ((s = t[r++]) < 128) u[i++] = s;
                else if ((n = a[s]) > 4) u[i++] = 65533, r += n - 1;
            else {
                for (s &= 2 === n ? 31 : 3 === n ? 15 : 7; n > 1 && r < o;) s = s << 6 | 63 & t[r++], n--;
                n > 1 ? u[i++] = 65533 : s < 65536 ? u[i++] = s : (s -= 65536, u[i++] = 55296 | s >> 10 & 1023, u[i++] = 56320 | 1023 & s)
            }
            return h(u, i)
        }, e.utf8border = function(t, e) { var r; for ((e = e || t.length) > t.length && (e = t.length), r = e - 1; r >= 0 && 128 == (192 & t[r]);) r--; return r < 0 ? e : 0 === r ? e : r + a[t[r]] > e ? r : e }
    }, function(t, e, r) {
        "use strict";
        var i = function() {
            for (var t, e = [], r = 0; r < 256; r++) {
                t = r;
                for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
                e[r] = t
            }
            return e
        }();
        t.exports = function(t, e, r, s) {
            var n = i,
                a = s + r;
            t ^= -1;
            for (var o = s; o < a; o++) t = t >>> 8 ^ n[255 & (t ^ e[o])];
            return -1 ^ t
        }
    }, function(t, e, r) {
        "use strict";
        t.exports = function(t, e, r, i) {
            for (var s = 65535 & t | 0, n = t >>> 16 & 65535 | 0, a = 0; 0 !== r;) {
                r -= a = r > 2e3 ? 2e3 : r;
                do { n = n + (s = s + e[i++] | 0) | 0 } while (--a);
                s %= 65521, n %= 65521
            }
            return s | n << 16 | 0
        }
    }, function(t, e, r) {
        "use strict";
        var i = r(1);
        e.STORE = { magic: "\0\0", compressWorker: function(t) { return new i("STORE compression") }, uncompressWorker: function() { return new i("STORE decompression") } }, e.DEFLATE = r(77)
    }, function(t, e, r) {
        "use strict";
        var i = r(1),
            s = r(22);

        function n() { i.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0) }
        r(0).inherits(n, i), n.prototype.processChunk = function(t) { this.streamInfo.crc32 = s(t.data, this.streamInfo.crc32 || 0), this.push(t) }, t.exports = n
    }, function(t, e, r) {
        "use strict";
        var i = r(0),
            s = r(1);

        function n(t) { s.call(this, "DataLengthProbe for " + t), this.propName = t, this.withStreamInfo(t, 0) }
        i.inherits(n, s), n.prototype.processChunk = function(t) {
            if (t) {
                var e = this.streamInfo[this.propName] || 0;
                this.streamInfo[this.propName] = e + t.data.length
            }
            s.prototype.processChunk.call(this, t)
        }, t.exports = n
    }, function(t, e, r) {
        "use strict";
        var i = r(0),
            s = r(1);

        function n(t) {
            s.call(this, "DataWorker");
            var e = this;
            this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, t.then(function(t) { e.dataIsReady = !0, e.data = t, e.max = t && t.length || 0, e.type = i.getTypeOf(t), e.isPaused || e._tickAndRepeat() }, function(t) { e.error(t) })
        }
        i.inherits(n, s), n.prototype.cleanUp = function() { s.prototype.cleanUp.call(this), this.data = null }, n.prototype.resume = function() { return !!s.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, i.delay(this._tickAndRepeat, [], this)), !0) }, n.prototype._tickAndRepeat = function() { this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (i.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0)) }, n.prototype._tick = function() {
            if (this.isPaused || this.isFinished) return !1;
            var t = null,
                e = Math.min(this.max, this.index + 16384);
            if (this.index >= this.max) return this.end();
            switch (this.type) {
                case "string":
                    t = this.data.substring(this.index, e);
                    break;
                case "uint8array":
                    t = this.data.subarray(this.index, e);
                    break;
                case "array":
                case "nodebuffer":
                    t = this.data.slice(this.index, e)
            }
            return this.index = e, this.push({ data: t, meta: { percent: this.max ? this.index / this.max * 100 : 0 } })
        }, t.exports = n
    }, function(t, e, r) {
        "use strict";
        e.base64 = !1, e.binary = !1, e.dir = !1, e.createFolders = !0, e.date = null, e.compression = null, e.compressionOptions = null, e.comment = null, e.unixPermissions = null, e.dosPermissions = null
    }, function(t, e, r) {
        "use strict";
        (function(e) {
            var i = r(0),
                s = r(81),
                n = r(1),
                a = r(50),
                o = r(4),
                h = r(11),
                u = null;
            if (o.nodestream) try { u = r(80) } catch (t) {}

            function l(t, r) {
                return new h.Promise(function(s, n) {
                    var o = [],
                        h = t._internalType,
                        u = t._outputType,
                        l = t._mimeType;
                    t.on("data", function(t, e) { o.push(t), r && r(e) }).on("error", function(t) { o = [], n(t) }).on("end", function() {
                        try {
                            var t = function(t, e, r) {
                                switch (t) {
                                    case "blob":
                                        return i.newBlob(i.transformTo("arraybuffer", e), r);
                                    case "base64":
                                        return a.encode(e);
                                    default:
                                        return i.transformTo(t, e)
                                }
                            }(u, function(t, r) {
                                var i, s = 0,
                                    n = null,
                                    a = 0;
                                for (i = 0; i < r.length; i++) a += r[i].length;
                                switch (t) {
                                    case "string":
                                        return r.join("");
                                    case "array":
                                        return Array.prototype.concat.apply([], r);
                                    case "uint8array":
                                        for (n = new Uint8Array(a), i = 0; i < r.length; i++) n.set(r[i], s), s += r[i].length;
                                        return n;
                                    case "nodebuffer":
                                        return e.concat(r);
                                    default:
                                        throw new Error("concat : unsupported type '" + t + "'")
                                }
                            }(h, o), l);
                            s(t)
                        } catch (t) { n(t) }
                        o = []
                    }).resume()
                })
            }

            function c(t, e, r) {
                var a = e;
                switch (e) {
                    case "blob":
                    case "arraybuffer":
                        a = "uint8array";
                        break;
                    case "base64":
                        a = "string"
                }
                try { this._internalType = a, this._outputType = e, this._mimeType = r, i.checkSupport(a), this._worker = t.pipe(new s(a)), t.lock() } catch (t) { this._worker = new n("error"), this._worker.error(t) }
            }
            c.prototype = { accumulate: function(t) { return l(this, t) }, on: function(t, e) { var r = this; return "data" === t ? this._worker.on(t, function(t) { e.call(r, t.data, t.meta) }) : this._worker.on(t, function() { i.delay(e, arguments, r) }), this }, resume: function() { return i.delay(this._worker.resume, [], this._worker), this }, pause: function() { return this._worker.pause(), this }, toNodejsStream: function(t) { if (i.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method"); return new u(this, { objectMode: "nodebuffer" !== this._outputType }, t) } }, t.exports = c
        }).call(this, r(13).Buffer)
    }, function(t, e, r) {
        var i = r(25),
            s = r(16).document,
            n = i(s) && i(s.createElement);
        t.exports = function(t) { return n ? s.createElement(t) : {} }
    }, function(t, e) { t.exports = function(t) { try { return !!t() } catch (t) { return !0 } } }, function(t, e, r) {
        var i = r(94);
        t.exports = function(t, e, r) {
            if (i(t), void 0 === e) return t;
            switch (r) {
                case 1:
                    return function(r) { return t.call(e, r) };
                case 2:
                    return function(r, i) { return t.call(e, r, i) };
                case 3:
                    return function(r, i, s) { return t.call(e, r, i, s) }
            }
            return function() { return t.apply(e, arguments) }
        }
    }, function(t, e) { var r = t.exports = { version: "2.3.0" }; "number" == typeof __e && (__e = r) }, function(t, e, r) {
        "use strict";
        var i = r(0),
            s = r(4),
            n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        e.encode = function(t) { for (var e, r, s, a, o, h, u, l = [], c = 0, f = t.length, d = f, m = "string" !== i.getTypeOf(t); c < t.length;) d = f - c, m ? (e = t[c++], r = c < f ? t[c++] : 0, s = c < f ? t[c++] : 0) : (e = t.charCodeAt(c++), r = c < f ? t.charCodeAt(c++) : 0, s = c < f ? t.charCodeAt(c++) : 0), a = e >> 2, o = (3 & e) << 4 | r >> 4, h = d > 1 ? (15 & r) << 2 | s >> 6 : 64, u = d > 2 ? 63 & s : 64, l.push(n.charAt(a) + n.charAt(o) + n.charAt(h) + n.charAt(u)); return l.join("") }, e.decode = function(t) {
            var e, r, i, a, o, h, u = 0,
                l = 0;
            if ("data:" === t.substr(0, "data:".length)) throw new Error("Invalid base64 input, it looks like a data url.");
            var c, f = 3 * (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, "")).length / 4;
            if (t.charAt(t.length - 1) === n.charAt(64) && f--, t.charAt(t.length - 2) === n.charAt(64) && f--, f % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
            for (c = s.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); u < t.length;) e = n.indexOf(t.charAt(u++)) << 2 | (a = n.indexOf(t.charAt(u++))) >> 4, r = (15 & a) << 4 | (o = n.indexOf(t.charAt(u++))) >> 2, i = (3 & o) << 6 | (h = n.indexOf(t.charAt(u++))), c[l++] = e, 64 !== o && (c[l++] = r), 64 !== h && (c[l++] = i);
            return c
        }
    }, function(t, e, r) {
        "use strict";
        t.exports = n;
        var i = r(6),
            s = r(12);

        function n(t) {
            if (!(this instanceof n)) return new n(t);
            i.call(this, t), this._transformState = {
                afterTransform: function(t, e) {
                    var r = this._transformState;
                    r.transforming = !1;
                    var i = r.writecb;
                    if (!i) return this.emit("error", new Error("write callback called multiple times"));
                    r.writechunk = null, r.writecb = null, null != e && this.push(e), i(t);
                    var s = this._readableState;
                    s.reading = !1, (s.needReadable || s.length < s.highWaterMark) && this._read(s.highWaterMark)
                }.bind(this),
                needTransform: !1,
                transforming: !1,
                writecb: null,
                writechunk: null,
                writeencoding: null
            }, this._readableState.needReadable = !0, this._readableState.sync = !1, t && ("function" == typeof t.transform && (this._transform = t.transform), "function" == typeof t.flush && (this._flush = t.flush)), this.on("prefinish", a)
        }

        function a() { var t = this; "function" == typeof this._flush ? this._flush(function(e, r) { o(t, e, r) }) : o(this, null, null) }

        function o(t, e, r) { if (e) return t.emit("error", e); if (null != r && t.push(r), t._writableState.length) throw new Error("Calling transform done when ws.length != 0"); if (t._transformState.transforming) throw new Error("Calling transform done when still transforming"); return t.push(null) }
        s.inherits = r(8), s.inherits(n, i), n.prototype.push = function(t, e) { return this._transformState.needTransform = !1, i.prototype.push.call(this, t, e) }, n.prototype._transform = function(t, e, r) { throw new Error("_transform() is not implemented") }, n.prototype._write = function(t, e, r) {
            var i = this._transformState;
            if (i.writecb = r, i.writechunk = t, i.writeencoding = e, !i.transforming) {
                var s = this._readableState;
                (i.needTransform || s.needReadable || s.length < s.highWaterMark) && this._read(s.highWaterMark)
            }
        }, n.prototype._read = function(t) {
            var e = this._transformState;
            null !== e.writechunk && e.writecb && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0
        }, n.prototype._destroy = function(t, e) {
            var r = this;
            i.prototype._destroy.call(this, t, function(t) { e(t), r.emit("close") })
        }
    }, function(t, e, r) {
        "use strict";
        var i = r(18).Buffer,
            s = i.isEncoding || function(t) {
                switch ((t = "" + t) && t.toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                    case "raw":
                        return !0;
                    default:
                        return !1
                }
            };

        function n(t) {
            var e;
            switch (this.encoding = function(t) {
                var e = function(t) {
                    if (!t) return "utf8";
                    for (var e;;) switch (t) {
                        case "utf8":
                        case "utf-8":
                            return "utf8";
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return "utf16le";
                        case "latin1":
                        case "binary":
                            return "latin1";
                        case "base64":
                        case "ascii":
                        case "hex":
                            return t;
                        default:
                            if (e) return;
                            t = ("" + t).toLowerCase(), e = !0
                    }
                }(t);
                if ("string" != typeof e && (i.isEncoding === s || !s(t))) throw new Error("Unknown encoding: " + t);
                return e || t
            }(t), this.encoding) {
                case "utf16le":
                    this.text = h, this.end = u, e = 4;
                    break;
                case "utf8":
                    this.fillLast = o, e = 4;
                    break;
                case "base64":
                    this.text = l, this.end = c, e = 3;
                    break;
                default:
                    return this.write = f, void(this.end = d)
            }
            this.lastNeed = 0, this.lastTotal = 0, this.lastChar = i.allocUnsafe(e)
        }

        function a(t) { return t <= 127 ? 0 : t >> 5 == 6 ? 2 : t >> 4 == 14 ? 3 : t >> 3 == 30 ? 4 : t >> 6 == 2 ? -1 : -2 }

        function o(t) {
            var e = this.lastTotal - this.lastNeed,
                r = function(t, e, r) { if (128 != (192 & e[0])) return t.lastNeed = 0, "�"; if (t.lastNeed > 1 && e.length > 1) { if (128 != (192 & e[1])) return t.lastNeed = 1, "�"; if (t.lastNeed > 2 && e.length > 2 && 128 != (192 & e[2])) return t.lastNeed = 2, "�" } }(this, t);
            return void 0 !== r ? r : this.lastNeed <= t.length ? (t.copy(this.lastChar, e, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (t.copy(this.lastChar, e, 0, t.length), void(this.lastNeed -= t.length))
        }

        function h(t, e) { if ((t.length - e) % 2 == 0) { var r = t.toString("utf16le", e); if (r) { var i = r.charCodeAt(r.length - 1); if (i >= 55296 && i <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1], r.slice(0, -1) } return r } return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = t[t.length - 1], t.toString("utf16le", e, t.length - 1) }

        function u(t) { var e = t && t.length ? this.write(t) : ""; if (this.lastNeed) { var r = this.lastTotal - this.lastNeed; return e + this.lastChar.toString("utf16le", 0, r) } return e }

        function l(t, e) { var r = (t.length - e) % 3; return 0 === r ? t.toString("base64", e) : (this.lastNeed = 3 - r, this.lastTotal = 3, 1 === r ? this.lastChar[0] = t[t.length - 1] : (this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1]), t.toString("base64", e, t.length - r)) }

        function c(t) { var e = t && t.length ? this.write(t) : ""; return this.lastNeed ? e + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : e }

        function f(t) { return t.toString(this.encoding) }

        function d(t) { return t && t.length ? this.write(t) : "" }
        e.StringDecoder = n, n.prototype.write = function(t) {
            if (0 === t.length) return "";
            var e, r;
            if (this.lastNeed) {
                if (void 0 === (e = this.fillLast(t))) return "";
                r = this.lastNeed, this.lastNeed = 0
            } else r = 0;
            return r < t.length ? e ? e + this.text(t, r) : this.text(t, r) : e || ""
        }, n.prototype.end = function(t) { var e = t && t.length ? this.write(t) : ""; return this.lastNeed ? e + "�" : e }, n.prototype.text = function(t, e) {
            var r = function(t, e, r) { var i = e.length - 1; if (i < r) return 0; var s = a(e[i]); if (s >= 0) return s > 0 && (t.lastNeed = s - 1), s; if (--i < r || -2 === s) return 0; if ((s = a(e[i])) >= 0) return s > 0 && (t.lastNeed = s - 2), s; if (--i < r || -2 === s) return 0; if ((s = a(e[i])) >= 0) return s > 0 && (2 === s ? s = 0 : t.lastNeed = s - 3), s; return 0 }(this, t, e);
            if (!this.lastNeed) return t.toString("utf8", e);
            this.lastTotal = r;
            var i = t.length - (r - this.lastNeed);
            return t.copy(this.lastChar, 0, i), t.toString("utf8", e, i)
        }, n.prototype.fillLast = function(t) {
            if (this.lastNeed <= t.length) return t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
            t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length), this.lastNeed -= t.length
        }
    }, function(t, e, r) {
        "use strict";
        var i = r(19);

        function s(t, e) { t.emit("error", e) }
        t.exports = {
            destroy: function(t, e) {
                var r = this,
                    n = this._readableState && this._readableState.destroyed,
                    a = this._writableState && this._writableState.destroyed;
                return n || a ? (e ? e(t) : !t || this._writableState && this._writableState.errorEmitted || i.nextTick(s, this, t), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(t || null, function(t) {!e && t ? (i.nextTick(s, r, t), r._writableState && (r._writableState.errorEmitted = !0)) : e && e(t) }), this)
            },
            undestroy: function() { this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1) }
        }
    }, function(t, e, r) { t.exports = r(14).EventEmitter }, function(t, e, r) {
        "use strict";
        (function(e, i) {
            var s = r(19);
            t.exports = b;
            var n, a = r(57);
            b.ReadableState = C;
            r(14).EventEmitter;
            var o = function(t, e) { return t.listeners(e).length },
                h = r(54),
                u = r(18).Buffer,
                l = e.Uint8Array || function() {};
            var c = r(12);
            c.inherits = r(8);
            var f = r(108),
                d = void 0;
            d = f && f.debuglog ? f.debuglog("stream") : function() {};
            var m, p = r(107),
                g = r(53);
            c.inherits(b, h);
            var y = ["error", "close", "destroy", "pause", "resume"];

            function C(t, e) {
                n = n || r(6), t = t || {};
                var i = e instanceof n;
                this.objectMode = !!t.objectMode, i && (this.objectMode = this.objectMode || !!t.readableObjectMode);
                var s = t.highWaterMark,
                    a = t.readableHighWaterMark,
                    o = this.objectMode ? 16 : 16384;
                this.highWaterMark = s || 0 === s ? s : i && (a || 0 === a) ? a : o, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new p, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (m || (m = r(52).StringDecoder), this.decoder = new m(t.encoding), this.encoding = t.encoding)
            }

            function b(t) {
                if (n = n || r(6), !(this instanceof b)) return new b(t);
                this._readableState = new C(t, this), this.readable = !0, t && ("function" == typeof t.read && (this._read = t.read), "function" == typeof t.destroy && (this._destroy = t.destroy)), h.call(this)
            }

            function v(t, e, r, i, s) {
                var n, a = t._readableState;
                null === e ? (a.reading = !1, function(t, e) {
                    if (e.ended) return;
                    if (e.decoder) {
                        var r = e.decoder.end();
                        r && r.length && (e.buffer.push(r), e.length += e.objectMode ? 1 : r.length)
                    }
                    e.ended = !0, S(t)
                }(t, a)) : (s || (n = function(t, e) {
                    var r;
                    i = e, u.isBuffer(i) || i instanceof l || "string" == typeof e || void 0 === e || t.objectMode || (r = new TypeError("Invalid non-string/buffer chunk"));
                    var i;
                    return r
                }(a, e)), n ? t.emit("error", n) : a.objectMode || e && e.length > 0 ? ("string" == typeof e || a.objectMode || Object.getPrototypeOf(e) === u.prototype || (e = function(t) { return u.from(t) }(e)), i ? a.endEmitted ? t.emit("error", new Error("stream.unshift() after end event")) : w(t, a, e, !0) : a.ended ? t.emit("error", new Error("stream.push() after EOF")) : (a.reading = !1, a.decoder && !r ? (e = a.decoder.write(e), a.objectMode || 0 !== e.length ? w(t, a, e, !1) : T(t, a)) : w(t, a, e, !1))) : i || (a.reading = !1));
                return function(t) { return !t.ended && (t.needReadable || t.length < t.highWaterMark || 0 === t.length) }(a)
            }

            function w(t, e, r, i) { e.flowing && 0 === e.length && !e.sync ? (t.emit("data", r), t.read(0)) : (e.length += e.objectMode ? 1 : r.length, i ? e.buffer.unshift(r) : e.buffer.push(r), e.needReadable && S(t)), T(t, e) }
            Object.defineProperty(b.prototype, "destroyed", { get: function() { return void 0 !== this._readableState && this._readableState.destroyed }, set: function(t) { this._readableState && (this._readableState.destroyed = t) } }), b.prototype.destroy = g.destroy, b.prototype._undestroy = g.undestroy, b.prototype._destroy = function(t, e) { this.push(null), e(t) }, b.prototype.push = function(t, e) { var r, i = this._readableState; return i.objectMode ? r = !0 : "string" == typeof t && ((e = e || i.defaultEncoding) !== i.encoding && (t = u.from(t, e), e = ""), r = !0), v(this, t, e, !1, r) }, b.prototype.unshift = function(t) { return v(this, t, null, !0, !1) }, b.prototype.isPaused = function() { return !1 === this._readableState.flowing }, b.prototype.setEncoding = function(t) { return m || (m = r(52).StringDecoder), this._readableState.decoder = new m(t), this._readableState.encoding = t, this };
            var k = 8388608;

            function B(t, e) { return t <= 0 || 0 === e.length && e.ended ? 0 : e.objectMode ? 1 : t != t ? e.flowing && e.length ? e.buffer.head.data.length : e.length : (t > e.highWaterMark && (e.highWaterMark = function(t) { return t >= k ? t = k : (t--, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t++), t }(t)), t <= e.length ? t : e.ended ? e.length : (e.needReadable = !0, 0)) }

            function S(t) {
                var e = t._readableState;
                e.needReadable = !1, e.emittedReadable || (d("emitReadable", e.flowing), e.emittedReadable = !0, e.sync ? s.nextTick(R, t) : R(t))
            }

            function R(t) { d("emit readable"), t.emit("readable"), _(t) }

            function T(t, e) { e.readingMore || (e.readingMore = !0, s.nextTick(A, t, e)) }

            function A(t, e) {
                for (var r = e.length; !e.reading && !e.flowing && !e.ended && e.length < e.highWaterMark && (d("maybeReadMore read 0"), t.read(0), r !== e.length);) r = e.length;
                e.readingMore = !1
            }

            function F(t) { d("readable nexttick read 0"), t.read(0) }

            function L(t, e) { e.reading || (d("resume read 0"), t.read(0)), e.resumeScheduled = !1, e.awaitDrain = 0, t.emit("resume"), _(t), e.flowing && !e.reading && t.read(0) }

            function _(t) { var e = t._readableState; for (d("flow", e.flowing); e.flowing && null !== t.read();); }

            function x(t, e) {
                return 0 === e.length ? null : (e.objectMode ? r = e.buffer.shift() : !t || t >= e.length ? (r = e.decoder ? e.buffer.join("") : 1 === e.buffer.length ? e.buffer.head.data : e.buffer.concat(e.length), e.buffer.clear()) : r = function(t, e, r) {
                    var i;
                    t < e.head.data.length ? (i = e.head.data.slice(0, t), e.head.data = e.head.data.slice(t)) : i = t === e.head.data.length ? e.shift() : r ? function(t, e) {
                        var r = e.head,
                            i = 1,
                            s = r.data;
                        t -= s.length;
                        for (; r = r.next;) {
                            var n = r.data,
                                a = t > n.length ? n.length : t;
                            if (a === n.length ? s += n : s += n.slice(0, t), 0 === (t -= a)) { a === n.length ? (++i, r.next ? e.head = r.next : e.head = e.tail = null) : (e.head = r, r.data = n.slice(a)); break }++i
                        }
                        return e.length -= i, s
                    }(t, e) : function(t, e) {
                        var r = u.allocUnsafe(t),
                            i = e.head,
                            s = 1;
                        i.data.copy(r), t -= i.data.length;
                        for (; i = i.next;) {
                            var n = i.data,
                                a = t > n.length ? n.length : t;
                            if (n.copy(r, r.length - t, 0, a), 0 === (t -= a)) { a === n.length ? (++s, i.next ? e.head = i.next : e.head = e.tail = null) : (e.head = i, i.data = n.slice(a)); break }++s
                        }
                        return e.length -= s, r
                    }(t, e);
                    return i
                }(t, e.buffer, e.decoder), r);
                var r
            }

            function H(t) {
                var e = t._readableState;
                if (e.length > 0) throw new Error('"endReadable()" called on non-empty stream');
                e.endEmitted || (e.ended = !0, s.nextTick(E, e, t))
            }

            function E(t, e) { t.endEmitted || 0 !== t.length || (t.endEmitted = !0, e.readable = !1, e.emit("end")) }

            function M(t, e) {
                for (var r = 0, i = t.length; r < i; r++)
                    if (t[r] === e) return r;
                return -1
            }
            b.prototype.read = function(t) {
                d("read", t), t = parseInt(t, 10);
                var e = this._readableState,
                    r = t;
                if (0 !== t && (e.emittedReadable = !1), 0 === t && e.needReadable && (e.length >= e.highWaterMark || e.ended)) return d("read: emitReadable", e.length, e.ended), 0 === e.length && e.ended ? H(this) : S(this), null;
                if (0 === (t = B(t, e)) && e.ended) return 0 === e.length && H(this), null;
                var i, s = e.needReadable;
                return d("need readable", s), (0 === e.length || e.length - t < e.highWaterMark) && d("length less than watermark", s = !0), e.ended || e.reading ? d("reading or ended", s = !1) : s && (d("do read"), e.reading = !0, e.sync = !0, 0 === e.length && (e.needReadable = !0), this._read(e.highWaterMark), e.sync = !1, e.reading || (t = B(r, e))), null === (i = t > 0 ? x(t, e) : null) ? (e.needReadable = !0, t = 0) : e.length -= t, 0 === e.length && (e.ended || (e.needReadable = !0), r !== t && e.ended && H(this)), null !== i && this.emit("data", i), i
            }, b.prototype._read = function(t) { this.emit("error", new Error("_read() is not implemented")) }, b.prototype.pipe = function(t, e) {
                var r = this,
                    n = this._readableState;
                switch (n.pipesCount) {
                    case 0:
                        n.pipes = t;
                        break;
                    case 1:
                        n.pipes = [n.pipes, t];
                        break;
                    default:
                        n.pipes.push(t)
                }
                n.pipesCount += 1, d("pipe count=%d opts=%j", n.pipesCount, e);
                var h = (!e || !1 !== e.end) && t !== i.stdout && t !== i.stderr ? l : b;

                function u(e, i) { d("onunpipe"), e === r && i && !1 === i.hasUnpiped && (i.hasUnpiped = !0, d("cleanup"), t.removeListener("close", y), t.removeListener("finish", C), t.removeListener("drain", c), t.removeListener("error", g), t.removeListener("unpipe", u), r.removeListener("end", l), r.removeListener("end", b), r.removeListener("data", p), f = !0, !n.awaitDrain || t._writableState && !t._writableState.needDrain || c()) }

                function l() { d("onend"), t.end() }
                n.endEmitted ? s.nextTick(h) : r.once("end", h), t.on("unpipe", u);
                var c = function(t) {
                    return function() {
                        var e = t._readableState;
                        d("pipeOnDrain", e.awaitDrain), e.awaitDrain && e.awaitDrain--, 0 === e.awaitDrain && o(t, "data") && (e.flowing = !0, _(t))
                    }
                }(r);
                t.on("drain", c);
                var f = !1;
                var m = !1;

                function p(e) { d("ondata"), m = !1, !1 !== t.write(e) || m || ((1 === n.pipesCount && n.pipes === t || n.pipesCount > 1 && -1 !== M(n.pipes, t)) && !f && (d("false write response, pause", r._readableState.awaitDrain), r._readableState.awaitDrain++, m = !0), r.pause()) }

                function g(e) { d("onerror", e), b(), t.removeListener("error", g), 0 === o(t, "error") && t.emit("error", e) }

                function y() { t.removeListener("finish", C), b() }

                function C() { d("onfinish"), t.removeListener("close", y), b() }

                function b() { d("unpipe"), r.unpipe(t) }
                return r.on("data", p),
                    function(t, e, r) {
                        if ("function" == typeof t.prependListener) return t.prependListener(e, r);
                        t._events && t._events[e] ? a(t._events[e]) ? t._events[e].unshift(r) : t._events[e] = [r, t._events[e]] : t.on(e, r)
                    }(t, "error", g), t.once("close", y), t.once("finish", C), t.emit("pipe", r), n.flowing || (d("pipe resume"), r.resume()), t
            }, b.prototype.unpipe = function(t) {
                var e = this._readableState,
                    r = { hasUnpiped: !1 };
                if (0 === e.pipesCount) return this;
                if (1 === e.pipesCount) return t && t !== e.pipes ? this : (t || (t = e.pipes), e.pipes = null, e.pipesCount = 0, e.flowing = !1, t && t.emit("unpipe", this, r), this);
                if (!t) {
                    var i = e.pipes,
                        s = e.pipesCount;
                    e.pipes = null, e.pipesCount = 0, e.flowing = !1;
                    for (var n = 0; n < s; n++) i[n].emit("unpipe", this, r);
                    return this
                }
                var a = M(e.pipes, t);
                return -1 === a ? this : (e.pipes.splice(a, 1), e.pipesCount -= 1, 1 === e.pipesCount && (e.pipes = e.pipes[0]), t.emit("unpipe", this, r), this)
            }, b.prototype.on = function(t, e) {
                var r = h.prototype.on.call(this, t, e);
                if ("data" === t) !1 !== this._readableState.flowing && this.resume();
                else if ("readable" === t) {
                    var i = this._readableState;
                    i.endEmitted || i.readableListening || (i.readableListening = i.needReadable = !0, i.emittedReadable = !1, i.reading ? i.length && S(this) : s.nextTick(F, this))
                }
                return r
            }, b.prototype.addListener = b.prototype.on, b.prototype.resume = function() { var t = this._readableState; return t.flowing || (d("resume"), t.flowing = !0, function(t, e) { e.resumeScheduled || (e.resumeScheduled = !0, s.nextTick(L, t, e)) }(this, t)), this }, b.prototype.pause = function() { return d("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (d("pause"), this._readableState.flowing = !1, this.emit("pause")), this }, b.prototype.wrap = function(t) {
                var e = this,
                    r = this._readableState,
                    i = !1;
                for (var s in t.on("end", function() {
                        if (d("wrapped end"), r.decoder && !r.ended) {
                            var t = r.decoder.end();
                            t && t.length && e.push(t)
                        }
                        e.push(null)
                    }), t.on("data", function(s) {
                        (d("wrapped data"), r.decoder && (s = r.decoder.write(s)), !r.objectMode || null !== s && void 0 !== s) && ((r.objectMode || s && s.length) && (e.push(s) || (i = !0, t.pause())))
                    }), t) void 0 === this[s] && "function" == typeof t[s] && (this[s] = function(e) { return function() { return t[e].apply(t, arguments) } }(s));
                for (var n = 0; n < y.length; n++) t.on(y[n], this.emit.bind(this, y[n]));
                return this._read = function(e) { d("wrapped _read", e), i && (i = !1, t.resume()) }, this
            }, Object.defineProperty(b.prototype, "readableHighWaterMark", { enumerable: !1, get: function() { return this._readableState.highWaterMark } }), b._fromList = x
        }).call(this, r(2), r(7))
    }, function(t, e, r) { t.exports = r(109) }, function(t, e) {
        var r = {}.toString;
        t.exports = Array.isArray || function(t) { return "[object Array]" == r.call(t) }
    }, function(t, e, r) {
        "use strict";
        r.r(e);
        var i = r(5),
            s = r(10),
            n = r.n(s),
            a = new(function() {
                function t() {}
                return t.prototype.bind = function(t, e) {
                    e.addEventListener("down", function(e) {
                        var r = e.detail;
                        t.actionDown(r.button)
                    }), e.addEventListener("up", function(e) {
                        var r = e.detail;
                        t.actionUp(r.button)
                    })
                }, t
            }()),
            o = { 13: "start", 16: "select", 38: "up", 87: "up", 39: "right", 68: "right", 40: "down", 83: "down", 37: "left", 65: "left", 76: "a", 86: "a", 88: "b", 75: "b", 49: "save", 48: "load", 80: "speed" },
            h = new(function() {
                function t() {}
                return t.prototype.bind = function(t) { window.addEventListener("keydown", function(e) { t.actions.is(o[e.keyCode]) && (t.actionDown(o[e.keyCode]), e.preventDefault(), e.stopPropagation()) }), window.addEventListener("keyup", function(e) { t.actions.is(o[e.keyCode]) && (t.actionUp(o[e.keyCode]), e.preventDefault(), e.stopPropagation()) }) }, t
            }()),
            u = r(15),
            l = r.n(u),
            c = { 0: "b", 1: "a", 4: "load", 5: "save", 7: "speed", 8: "select", 9: "start", 12: "up", 13: "down", 14: "left", 15: "right" },
            f = new(function() {
                function t() {}
                return t.prototype.bind = function(t) {
                    l.a.on("buttonPressed", function(e) {
                        var r = e.buttonIndex;
                        e.button, e.gamepad;
                        t.actionDown(c[r])
                    }), l.a.on("buttonChanged", function(e) {
                        var r = e.buttonIndex,
                            i = e.button;
                        e.gamepad;
                        t.actionChange(c[r], { value: i.value })
                    }), l.a.on("buttonReleased", function(e) {
                        var r = e.buttonIndex;
                        e.button, e.gamepad;
                        t.actionUp(c[r])
                    }), l.a.watch()
                }, t
            }()),
            d = r(28),
            m = r.n(d),
            p = r(20),
            g = r.n(p),
            y = function(t, e, r, i) {
                return new(r || (r = Promise))(function(s, n) {
                    function a(t) { try { h(i.next(t)) } catch (t) { n(t) } }

                    function o(t) { try { h(i.throw(t)) } catch (t) { n(t) } }

                    function h(t) { t.done ? s(t.value) : new r(function(e) { e(t.value) }).then(a, o) }
                    h((i = i.apply(t, e || [])).next())
                })
            },
            C = function(t, e) {
                var r, i, s, n, a = { label: 0, sent: function() { if (1 & s[0]) throw s[1]; return s[1] }, trys: [], ops: [] };
                return n = { next: o(0), throw: o(1), return: o(2) }, "function" == typeof Symbol && (n[Symbol.iterator] = function() { return this }), n;

                function o(n) {
                    return function(o) {
                        return function(n) {
                            if (r) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (r = 1, i && (s = i[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(s = s.call(i, n[1])).done) return s;
                                switch (i = 0, s && (n = [0, s.value]), n[0]) {
                                    case 0:
                                    case 1:
                                        s = n;
                                        break;
                                    case 4:
                                        return a.label++, { value: n[1], done: !1 };
                                    case 5:
                                        a.label++, i = n[1], n = [0];
                                        continue;
                                    case 7:
                                        n = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(s = (s = a.trys).length > 0 && s[s.length - 1]) && (6 === n[0] || 2 === n[0])) { a = 0; continue }
                                        if (3 === n[0] && (!s || n[1] > s[0] && n[1] < s[3])) { a.label = n[1]; break }
                                        if (6 === n[0] && a.label < s[1]) { a.label = s[1], s = n; break }
                                        if (s && a.label < s[2]) { a.label = s[2], a.ops.push(n); break }
                                        s[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                n = e.call(t, a)
                            } catch (t) { n = [6, t], i = 0 } finally { r = s = 0 }
                            if (5 & n[0]) throw n[1];
                            return { value: n[0] ? n[1] : void 0, done: !0 }
                        }([n, o])
                    }
                }
            },
            b = new(function() {
                function t() {}
                return t.prototype.bind = function(t) {
                    var e = this;
                    this.gameboy = t;
                    var r = document.querySelector("#insert-cartridge"),
                        i = document.querySelector("#download-save"),
                        n = document.querySelector("#upload-save"),
                        a = r.querySelector("input"),
                        o = n.querySelector("input");
                    a.addEventListener("change", function() {
                        return y(e, void 0, void 0, function() {
                            var e, r;
                            return C(this, function(o) {
                                switch (o.label) {
                                    case 0:
                                        return i.classList.remove("disabled"), n.classList.remove("disabled"), e = a.files[0], [4, s.util.readCartridgeROM(e, e.name)];
                                    case 1:
                                        return r = o.sent(), t.replaceCartridge(r), [2]
                                }
                            })
                        })
                    }), i.addEventListener("click", function() { t.core.cartridge && s.util.saveAs(t.getBatteryFileArrayBuffer(), t.core.cartridge.name + ".sav") }), o.addEventListener("change", function() {
                        return y(e, void 0, void 0, function() {
                            var e, r;
                            return C(this, function(i) {
                                switch (i.label) {
                                    case 0:
                                        return t.core.cartridge ? (e = o.files[0], [4, s.util.readBlob(e)]) : [2];
                                    case 1:
                                        return r = i.sent(), [4, t.loadBatteryFileArrayBuffer(r)];
                                    case 2:
                                        return i.sent(), [2]
                                }
                            })
                        })
                    })
                }, t
            }()),
            v = new(function() {
                function t() { this.$element = i("<div />").css({ display: "none", position: "absolute", top: "5px", right: "5px", fontSize: "25px", color: "red" }), this.hide = this.hide.bind(this) }
                return t.prototype.bind = function(t) {
                    var e = this;
                    t.on("stateLoaded", function(t) {
                        var r = t.filename;
                        e.notify("Loaded " + r)
                    }).on("stateSaved", function(t) {
                        var r = t.filename;
                        e.notify("Saved  " + r)
                    })
                }, t.prototype.notify = function(t) { this.timeout && clearTimeout(this.timeout), this.timeout = window.setTimeout(this.hide, 500), this.$element.text(t), this.$element.show() }, t.prototype.hide = function() { this.timeout = null, this.$element.hide() }, t.prototype.appendTo = function(t) { this.$element.appendTo(t) }, t
            }()),
            w = function(t, e, r, i) {
                return new(r || (r = Promise))(function(s, n) {
                    function a(t) { try { h(i.next(t)) } catch (t) { n(t) } }

                    function o(t) { try { h(i.throw(t)) } catch (t) { n(t) } }

                    function h(t) { t.done ? s(t.value) : new r(function(e) { e(t.value) }).then(a, o) }
                    h((i = i.apply(t, e || [])).next())
                })
            },
            k = function(t, e) {
                var r, i, s, n, a = { label: 0, sent: function() { if (1 & s[0]) throw s[1]; return s[1] }, trys: [], ops: [] };
                return n = { next: o(0), throw: o(1), return: o(2) }, "function" == typeof Symbol && (n[Symbol.iterator] = function() { return this }), n;

                function o(n) {
                    return function(o) {
                        return function(n) {
                            if (r) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (r = 1, i && (s = i[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(s = s.call(i, n[1])).done) return s;
                                switch (i = 0, s && (n = [0, s.value]), n[0]) {
                                    case 0:
                                    case 1:
                                        s = n;
                                        break;
                                    case 4:
                                        return a.label++, { value: n[1], done: !1 };
                                    case 5:
                                        a.label++, i = n[1], n = [0];
                                        continue;
                                    case 7:
                                        n = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(s = (s = a.trys).length > 0 && s[s.length - 1]) && (6 === n[0] || 2 === n[0])) { a = 0; continue }
                                        if (3 === n[0] && (!s || n[1] > s[0] && n[1] < s[3])) { a.label = n[1]; break }
                                        if (6 === n[0] && a.label < s[1]) { a.label = s[1], s = n; break }
                                        if (s && a.label < s[2]) { a.label = s[2], a.ops.push(n); break }
                                        s[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                n = e.call(t, a)
                            } catch (t) { n = [6, t], i = 0 } finally { r = s = 0 }
                            if (5 & n[0]) throw n[1];
                            return { value: n[0] ? n[1] : void 0, done: !0 }
                        }([n, o])
                    }
                }
            },
            B = new(function() {
                function t() {}
                return t.prototype.bind = function() {
                    return w(this, void 0, void 0, function() {
                        var t, e = this;
                        return k(this, function(r) {
                            switch (r.label) {
                                case 0:
                                    if (!("serviceWorker" in navigator)) return [3, 4];
                                    r.label = 1;
                                case 1:
                                    return r.trys.push([1, 3, , 4]), [4, navigator.serviceWorker.register("/jsGBC-web/service-worker.js", { scope: "/jsGBC-web/" })];
                                case 2:
                                    return r.sent(), [3, 4];
                                case 3:
                                    return t = r.sent(), console.log("No it didnt. This happened: ", t), [3, 4];
                                case 4:
                                    return [2, new Promise(function(t) { window.addEventListener("beforeinstallprompt", function(r) { r.preventDefault(), e.promptEvent = r, t() }) })]
                            }
                        })
                    })
                }, t.prototype.prompt = function() {
                    return w(this, void 0, void 0, function() {
                        return k(this, function(t) {
                            switch (t.label) {
                                case 0:
                                    return this.promptEvent.prompt(), [4, this.promptEvent.userChoice];
                                case 1:
                                    return [2, t.sent()]
                            }
                        })
                    })
                }, t
            }()),
            S = function(t, e, r, i) {
                return new(r || (r = Promise))(function(s, n) {
                    function a(t) { try { h(i.next(t)) } catch (t) { n(t) } }

                    function o(t) { try { h(i.throw(t)) } catch (t) { n(t) } }

                    function h(t) { t.done ? s(t.value) : new r(function(e) { e(t.value) }).then(a, o) }
                    h((i = i.apply(t, e || [])).next())
                })
            },
            R = function(t, e) {
                var r, i, s, n, a = { label: 0, sent: function() { if (1 & s[0]) throw s[1]; return s[1] }, trys: [], ops: [] };
                return n = { next: o(0), throw: o(1), return: o(2) }, "function" == typeof Symbol && (n[Symbol.iterator] = function() { return this }), n;

                function o(n) {
                    return function(o) {
                        return function(n) {
                            if (r) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (r = 1, i && (s = i[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(s = s.call(i, n[1])).done) return s;
                                switch (i = 0, s && (n = [0, s.value]), n[0]) {
                                    case 0:
                                    case 1:
                                        s = n;
                                        break;
                                    case 4:
                                        return a.label++, { value: n[1], done: !1 };
                                    case 5:
                                        a.label++, i = n[1], n = [0];
                                        continue;
                                    case 7:
                                        n = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(s = (s = a.trys).length > 0 && s[s.length - 1]) && (6 === n[0] || 2 === n[0])) { a = 0; continue }
                                        if (3 === n[0] && (!s || n[1] > s[0] && n[1] < s[3])) { a.label = n[1]; break }
                                        if (6 === n[0] && a.label < s[1]) { a.label = s[1], s = n; break }
                                        if (s && a.label < s[2]) { a.label = s[2], a.ops.push(n); break }
                                        s[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                n = e.call(t, a)
                            } catch (t) { n = [6, t], i = 0 } finally { r = s = 0 }
                            if (5 & n[0]) throw n[1];
                            return { value: n[0] ? n[1] : void 0, done: !0 }
                        }([n, o])
                    }
                }
            };

        function T() {
            return S(this, void 0, void 0, function() {
                function t(e) {
                    return S(this, void 0, void 0, function() {
                        return R(this, function(r) {
                            switch (r.label) {
                                case 0:
                                    return e.preventDefault(), [4, B.prompt()];
                                case 1:
                                    return r.sent(), c.textContent = d, c.removeEventListener("click", t), c.classList.remove("highlighted"), [2]
                            }
                        })
                    })
                }
                var e, r, s, o, u, l, c, d;
                return R(this, function(p) { return e = i("jsgbc-ui"), r = e.get(0), s = i(r.screenElement), o = new n.a({ lcd: { canvas: r.lcdElement } }), u = new m.a(s), l = new g.a(s), u.on("change", function() { u.isActive ? r.fullscreen = !0 : (g.a.exitPointerLock(), r.fullscreen = !1) }), s.on("dblclick", function() { u.isActive ? (m.a.exitFullscreen(), g.a.exitPointerLock()) : (u.requestFullscreen(), l.requestPointerLock()) }), h.bind(o), a.bind(o, r), f.bind(o), b.bind(o), v.bind(o), v.appendTo(r.screenElement), r.loading = !1, B.bind().then(function() { c.textContent = "Add to Homescreen", c.addEventListener("click", t), c.classList.add("highlighted") }), c = document.querySelector(".ribbon"), d = c.textContent, [2] })
            })
        }
        window.WebComponentsReady ? T() : window.addEventListener("WebComponentsReady", T)
    }, function(t, e) {
        function r(t) { var e = new Error('Cannot find module "' + t + '".'); throw e.code = "MODULE_NOT_FOUND", e }
        r.keys = function() { return [] }, r.resolve = r, t.exports = r, r.id = 59
    }, function(t, e) {
        function r(t) { var e = new Error('Cannot find module "' + t + '".'); throw e.code = "MODULE_NOT_FOUND", e }
        r.keys = function() { return [] }, r.resolve = r, t.exports = r, r.id = 60
    }, function(t, e, r) {
        "use strict";
        var i = r(33),
            s = r(0),
            n = r(23),
            a = r(22),
            o = r(9),
            h = r(40),
            u = r(4);

        function l(t, e) { this.options = t, this.loadOptions = e }
        l.prototype = {
            isEncrypted: function() { return 1 == (1 & this.bitFlag) },
            useUTF8: function() { return 2048 == (2048 & this.bitFlag) },
            readLocalPart: function(t) {
                var e, r;
                if (t.skip(22), this.fileNameLength = t.readInt(2), r = t.readInt(2), this.fileName = t.readData(this.fileNameLength), t.skip(r), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize === -1 || uncompressedSize === -1)");
                if (null === (e = function(t) {
                        for (var e in h)
                            if (h.hasOwnProperty(e) && h[e].magic === t) return h[e];
                        return null
                    }(this.compressionMethod))) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
                this.decompressed = new n(this.compressedSize, this.uncompressedSize, this.crc32, e, t.readData(this.compressedSize))
            },
            readCentralPart: function(t) {
                this.versionMadeBy = t.readInt(2), t.skip(2), this.bitFlag = t.readInt(2), this.compressionMethod = t.readString(2), this.date = t.readDate(), this.crc32 = t.readInt(4), this.compressedSize = t.readInt(4), this.uncompressedSize = t.readInt(4);
                var e = t.readInt(2);
                if (this.extraFieldsLength = t.readInt(2), this.fileCommentLength = t.readInt(2), this.diskNumberStart = t.readInt(2), this.internalFileAttributes = t.readInt(2), this.externalFileAttributes = t.readInt(4), this.localHeaderOffset = t.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
                t.skip(e), this.readExtraFields(t), this.parseZIP64ExtraField(t), this.fileComment = t.readData(this.fileCommentLength)
            },
            processAttributes: function() {
                this.unixPermissions = null, this.dosPermissions = null;
                var t = this.versionMadeBy >> 8;
                this.dir = !!(16 & this.externalFileAttributes), 0 === t && (this.dosPermissions = 63 & this.externalFileAttributes), 3 === t && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = !0)
            },
            parseZIP64ExtraField: function(t) {
                if (this.extraFields[1]) {
                    var e = i(this.extraFields[1].value);
                    this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4))
                }
            },
            readExtraFields: function(t) { var e, r, i, s = t.index + this.extraFieldsLength; for (this.extraFields || (this.extraFields = {}); t.index < s;) e = t.readInt(2), r = t.readInt(2), i = t.readData(r), this.extraFields[e] = { id: e, length: r, value: i } },
            handleUTF8: function() {
                var t = u.uint8array ? "uint8array" : "array";
                if (this.useUTF8()) this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment);
                else {
                    var e = this.findExtraFieldUnicodePath();
                    if (null !== e) this.fileNameStr = e;
                    else {
                        var r = s.transformTo(t, this.fileName);
                        this.fileNameStr = this.loadOptions.decodeFileName(r)
                    }
                    var i = this.findExtraFieldUnicodeComment();
                    if (null !== i) this.fileCommentStr = i;
                    else {
                        var n = s.transformTo(t, this.fileComment);
                        this.fileCommentStr = this.loadOptions.decodeFileName(n)
                    }
                }
            },
            findExtraFieldUnicodePath: function() { var t = this.extraFields[28789]; if (t) { var e = i(t.value); return 1 !== e.readInt(1) ? null : a(this.fileName) !== e.readInt(4) ? null : o.utf8decode(e.readData(t.length - 5)) } return null },
            findExtraFieldUnicodeComment: function() { var t = this.extraFields[25461]; if (t) { var e = i(t.value); return 1 !== e.readInt(1) ? null : a(this.fileComment) !== e.readInt(4) ? null : o.utf8decode(e.readData(t.length - 5)) } return null }
        }, t.exports = l
    }, function(t, e, r) {
        "use strict";
        var i = r(30);

        function s(t) { i.call(this, t) }
        r(0).inherits(s, i), s.prototype.readData = function(t) { this.checkOffset(t); var e = this.data.slice(this.zero + this.index, this.zero + this.index + t); return this.index += t, e }, t.exports = s
    }, function(t, e, r) {
        "use strict";
        var i = r(31);

        function s(t) { i.call(this, t) }
        r(0).inherits(s, i), s.prototype.byteAt = function(t) { return this.data.charCodeAt(this.zero + t) }, s.prototype.lastIndexOfSignature = function(t) { return this.data.lastIndexOf(t) - this.zero }, s.prototype.readAndCheckSignature = function(t) { return t === this.readData(4) }, s.prototype.readData = function(t) { this.checkOffset(t); var e = this.data.slice(this.zero + this.index, this.zero + this.index + t); return this.index += t, e }, t.exports = s
    }, function(t, e, r) {
        "use strict";
        var i = r(33),
            s = r(0),
            n = r(34),
            a = r(61),
            o = (r(9), r(4));

        function h(t) { this.files = [], this.loadOptions = t }
        h.prototype = {
            checkSignature: function(t) { if (!this.reader.readAndCheckSignature(t)) { this.reader.index -= 4; var e = this.reader.readString(4); throw new Error("Corrupted zip or bug: unexpected signature (" + s.pretty(e) + ", expected " + s.pretty(t) + ")") } },
            isSignature: function(t, e) {
                var r = this.reader.index;
                this.reader.setIndex(t);
                var i = this.reader.readString(4) === e;
                return this.reader.setIndex(r), i
            },
            readBlockEndOfCentral: function() {
                this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
                var t = this.reader.readData(this.zipCommentLength),
                    e = o.uint8array ? "uint8array" : "array",
                    r = s.transformTo(e, t);
                this.zipComment = this.loadOptions.decodeFileName(r)
            },
            readBlockZip64EndOfCentral: function() { this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {}; for (var t, e, r, i = this.zip64EndOfCentralSize - 44; 0 < i;) t = this.reader.readInt(2), e = this.reader.readInt(4), r = this.reader.readData(e), this.zip64ExtensibleData[t] = { id: t, length: e, value: r } },
            readBlockZip64EndOfCentralLocator: function() { if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), this.disksCount > 1) throw new Error("Multi-volumes zip are not supported") },
            readLocalFiles: function() { var t, e; for (t = 0; t < this.files.length; t++) e = this.files[t], this.reader.setIndex(e.localHeaderOffset), this.checkSignature(n.LOCAL_FILE_HEADER), e.readLocalPart(this.reader), e.handleUTF8(), e.processAttributes() },
            readCentralDir: function() { var t; for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(n.CENTRAL_FILE_HEADER);)(t = new a({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(t); if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length) },
            readEndOfCentral: function() {
                var t = this.reader.lastIndexOfSignature(n.CENTRAL_DIRECTORY_END);
                if (t < 0) throw !this.isSignature(0, n.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
                this.reader.setIndex(t);
                var e = t;
                if (this.checkSignature(n.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === s.MAX_VALUE_16BITS || this.diskWithCentralDirStart === s.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === s.MAX_VALUE_16BITS || this.centralDirRecords === s.MAX_VALUE_16BITS || this.centralDirSize === s.MAX_VALUE_32BITS || this.centralDirOffset === s.MAX_VALUE_32BITS) {
                    if (this.zip64 = !0, (t = this.reader.lastIndexOfSignature(n.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
                    if (this.reader.setIndex(t), this.checkSignature(n.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, n.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(n.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                    this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(n.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral()
                }
                var r = this.centralDirOffset + this.centralDirSize;
                this.zip64 && (r += 20, r += 12 + this.zip64EndOfCentralSize);
                var i = e - r;
                if (i > 0) this.isSignature(e, n.CENTRAL_FILE_HEADER) || (this.reader.zero = i);
                else if (i < 0) throw new Error("Corrupted zip: missing " + Math.abs(i) + " bytes.")
            },
            prepareReader: function(t) { this.reader = i(t) },
            load: function(t) { this.prepareReader(t), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles() }
        }, t.exports = h
    }, function(t, e, r) {
        "use strict";
        var i = r(0),
            s = r(11),
            n = r(9),
            a = (i = r(0), r(64)),
            o = r(41),
            h = r(17);

        function u(t) {
            return new s.Promise(function(e, r) {
                var i = t.decompressed.getContentWorker().pipe(new o);
                i.on("error", function(t) { r(t) }).on("end", function() { i.streamInfo.crc32 !== t.decompressed.crc32 ? r(new Error("Corrupted zip : CRC32 mismatch")) : e() }).resume()
            })
        }
        t.exports = function(t, e) {
            var r = this;
            return e = i.extend(e || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: n.utf8decode }), h.isNode && h.isStream(t) ? s.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : i.prepareContent("the loaded zip file", t, !0, e.optimizedBinaryString, e.base64).then(function(t) { var r = new a(e); return r.load(t), r }).then(function(t) {
                var r = [s.Promise.resolve(t)],
                    i = t.files;
                if (e.checkCRC32)
                    for (var n = 0; n < i.length; n++) r.push(u(i[n]));
                return s.Promise.all(r)
            }).then(function(t) {
                for (var i = t.shift(), s = i.files, n = 0; n < s.length; n++) {
                    var a = s[n];
                    r.file(a.fileNameStr, a.decompressed, { binary: !0, optimizedBinaryString: !0, date: a.date, dir: a.dir, comment: a.fileCommentStr.length ? a.fileCommentStr : null, unixPermissions: a.unixPermissions, dosPermissions: a.dosPermissions, createFolders: e.createFolders })
                }
                return i.zipComment.length && (r.comment = i.zipComment), r
            })
        }
    }, function(t, e, r) {
        "use strict";
        var i = r(0),
            s = r(1);

        function n(t, e) { s.call(this, "Nodejs stream input adapter for " + t), this._upstreamEnded = !1, this._bindStream(e) }
        i.inherits(n, s), n.prototype._bindStream = function(t) {
            var e = this;
            this._stream = t, t.pause(), t.on("data", function(t) { e.push({ data: t, meta: { percent: 0 } }) }).on("error", function(t) { e.isPaused ? this.generatedError = t : e.error(t) }).on("end", function() { e.isPaused ? e._upstreamEnded = !0 : e.end() })
        }, n.prototype.pause = function() { return !!s.prototype.pause.call(this) && (this._stream.pause(), !0) }, n.prototype.resume = function() { return !!s.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0) }, t.exports = n
    }, function(t, e, r) {
        "use strict";
        var i = r(0),
            s = r(1),
            n = r(9),
            a = r(22),
            o = r(34),
            h = function(t, e) { var r, i = ""; for (r = 0; r < e; r++) i += String.fromCharCode(255 & t), t >>>= 8; return i },
            u = function(t, e, r, s, u, l) {
                var c, f, d = t.file,
                    m = t.compression,
                    p = l !== n.utf8encode,
                    g = i.transformTo("string", l(d.name)),
                    y = i.transformTo("string", n.utf8encode(d.name)),
                    C = d.comment,
                    b = i.transformTo("string", l(C)),
                    v = i.transformTo("string", n.utf8encode(C)),
                    w = y.length !== d.name.length,
                    k = v.length !== C.length,
                    B = "",
                    S = "",
                    R = "",
                    T = d.dir,
                    A = d.date,
                    F = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
                e && !r || (F.crc32 = t.crc32, F.compressedSize = t.compressedSize, F.uncompressedSize = t.uncompressedSize);
                var L = 0;
                e && (L |= 8), p || !w && !k || (L |= 2048);
                var _, x, H = 0,
                    E = 0;
                T && (H |= 16), "UNIX" === u ? (E = 798, H |= (_ = d.unixPermissions, x = _, _ || (x = T ? 16893 : 33204), (65535 & x) << 16)) : (E = 20, H |= 63 & (d.dosPermissions || 0)), c = A.getUTCHours(), c <<= 6, c |= A.getUTCMinutes(), c <<= 5, c |= A.getUTCSeconds() / 2, f = A.getUTCFullYear() - 1980, f <<= 4, f |= A.getUTCMonth() + 1, f <<= 5, f |= A.getUTCDate(), w && (S = h(1, 1) + h(a(g), 4) + y, B += "up" + h(S.length, 2) + S), k && (R = h(1, 1) + h(a(b), 4) + v, B += "uc" + h(R.length, 2) + R);
                var M = "";
                return M += "\n\0", M += h(L, 2), M += m.magic, M += h(c, 2), M += h(f, 2), M += h(F.crc32, 4), M += h(F.compressedSize, 4), M += h(F.uncompressedSize, 4), M += h(g.length, 2), M += h(B.length, 2), { fileRecord: o.LOCAL_FILE_HEADER + M + g + B, dirRecord: o.CENTRAL_FILE_HEADER + h(E, 2) + M + h(b.length, 2) + "\0\0\0\0" + h(H, 4) + h(s, 4) + g + B + b }
            };

        function l(t, e, r, i) { s.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = e, this.zipPlatform = r, this.encodeFileName = i, this.streamFiles = t, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [] }
        i.inherits(l, s), l.prototype.push = function(t) {
            var e = t.meta.percent || 0,
                r = this.entriesCount,
                i = this._sources.length;
            this.accumulate ? this.contentBuffer.push(t) : (this.bytesWritten += t.data.length, s.prototype.push.call(this, { data: t.data, meta: { currentFile: this.currentFile, percent: r ? (e + 100 * (r - i - 1)) / r : 100 } }))
        }, l.prototype.openedSource = function(t) {
            this.currentSourceOffset = this.bytesWritten, this.currentFile = t.file.name;
            var e = this.streamFiles && !t.file.dir;
            if (e) {
                var r = u(t, e, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                this.push({ data: r.fileRecord, meta: { percent: 0 } })
            } else this.accumulate = !0
        }, l.prototype.closedSource = function(t) {
            this.accumulate = !1;
            var e = this.streamFiles && !t.file.dir,
                r = u(t, e, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            if (this.dirRecords.push(r.dirRecord), e) this.push({ data: function(t) { return o.DATA_DESCRIPTOR + h(t.crc32, 4) + h(t.compressedSize, 4) + h(t.uncompressedSize, 4) }(t), meta: { percent: 100 } });
            else
                for (this.push({ data: r.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
            this.currentFile = null
        }, l.prototype.flush = function() {
            for (var t = this.bytesWritten, e = 0; e < this.dirRecords.length; e++) this.push({ data: this.dirRecords[e], meta: { percent: 100 } });
            var r = this.bytesWritten - t,
                s = function(t, e, r, s, n) { var a = i.transformTo("string", n(s)); return o.CENTRAL_DIRECTORY_END + "\0\0\0\0" + h(t, 2) + h(t, 2) + h(e, 4) + h(r, 4) + h(a.length, 2) + a }(this.dirRecords.length, r, t, this.zipComment, this.encodeFileName);
            this.push({ data: s, meta: { percent: 100 } })
        }, l.prototype.prepareNextSource = function() { this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume() }, l.prototype.registerPrevious = function(t) { this._sources.push(t); var e = this; return t.on("data", function(t) { e.processChunk(t) }), t.on("end", function() { e.closedSource(e.previous.streamInfo), e._sources.length ? e.prepareNextSource() : e.end() }), t.on("error", function(t) { e.error(t) }), this }, l.prototype.resume = function() { return !!s.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0)) }, l.prototype.error = function(t) {
            var e = this._sources;
            if (!s.prototype.error.call(this, t)) return !1;
            for (var r = 0; r < e.length; r++) try { e[r].error(t) } catch (t) {}
            return !0
        }, l.prototype.lock = function() { s.prototype.lock.call(this); for (var t = this._sources, e = 0; e < t.length; e++) t[e].lock() }, t.exports = l
    }, function(t, e, r) {
        "use strict";
        t.exports = function() { this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1 }
    }, function(t, e, r) {
        "use strict";
        var i = r(3),
            s = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
            n = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
            a = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
            o = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
        t.exports = function(t, e, r, h, u, l, c, f) {
            var d, m, p, g, y, C, b, v, w, k = f.bits,
                B = 0,
                S = 0,
                R = 0,
                T = 0,
                A = 0,
                F = 0,
                L = 0,
                _ = 0,
                x = 0,
                H = 0,
                E = null,
                M = 0,
                P = new i.Buf16(16),
                O = new i.Buf16(16),
                D = null,
                W = 0;
            for (B = 0; B <= 15; B++) P[B] = 0;
            for (S = 0; S < h; S++) P[e[r + S]]++;
            for (A = k, T = 15; T >= 1 && 0 === P[T]; T--);
            if (A > T && (A = T), 0 === T) return u[l++] = 20971520, u[l++] = 20971520, f.bits = 1, 0;
            for (R = 1; R < T && 0 === P[R]; R++);
            for (A < R && (A = R), _ = 1, B = 1; B <= 15; B++)
                if (_ <<= 1, (_ -= P[B]) < 0) return -1;
            if (_ > 0 && (0 === t || 1 !== T)) return -1;
            for (O[1] = 0, B = 1; B < 15; B++) O[B + 1] = O[B] + P[B];
            for (S = 0; S < h; S++) 0 !== e[r + S] && (c[O[e[r + S]]++] = S);
            if (0 === t ? (E = D = c, C = 19) : 1 === t ? (E = s, M -= 257, D = n, W -= 257, C = 256) : (E = a, D = o, C = -1), H = 0, S = 0, B = R, y = l, F = A, L = 0, p = -1, g = (x = 1 << A) - 1, 1 === t && x > 852 || 2 === t && x > 592) return 1;
            for (;;) {
                b = B - L, c[S] < C ? (v = 0, w = c[S]) : c[S] > C ? (v = D[W + c[S]], w = E[M + c[S]]) : (v = 96, w = 0), d = 1 << B - L, R = m = 1 << F;
                do { u[y + (H >> L) + (m -= d)] = b << 24 | v << 16 | w | 0 } while (0 !== m);
                for (d = 1 << B - 1; H & d;) d >>= 1;
                if (0 !== d ? (H &= d - 1, H += d) : H = 0, S++, 0 == --P[B]) {
                    if (B === T) break;
                    B = e[r + c[S]]
                }
                if (B > A && (H & g) !== p) {
                    for (0 === L && (L = A), y += R, _ = 1 << (F = B - L); F + L < T && !((_ -= P[F + L]) <= 0);) F++, _ <<= 1;
                    if (x += 1 << F, 1 === t && x > 852 || 2 === t && x > 592) return 1;
                    u[p = H & g] = A << 24 | F << 16 | y - l | 0
                }
            }
            return 0 !== H && (u[y + H] = B - L << 24 | 64 << 16 | 0), f.bits = A, 0
        }
    }, function(t, e, r) {
        "use strict";
        t.exports = function(t, e) {
            var r, i, s, n, a, o, h, u, l, c, f, d, m, p, g, y, C, b, v, w, k, B, S, R, T;
            r = t.state, i = t.next_in, R = t.input, s = i + (t.avail_in - 5), n = t.next_out, T = t.output, a = n - (e - t.avail_out), o = n + (t.avail_out - 257), h = r.dmax, u = r.wsize, l = r.whave, c = r.wnext, f = r.window, d = r.hold, m = r.bits, p = r.lencode, g = r.distcode, y = (1 << r.lenbits) - 1, C = (1 << r.distbits) - 1;
            t: do {
                m < 15 && (d += R[i++] << m, m += 8, d += R[i++] << m, m += 8), b = p[d & y];
                e: for (;;) {
                    if (d >>>= v = b >>> 24, m -= v, 0 === (v = b >>> 16 & 255)) T[n++] = 65535 & b;
                    else {
                        if (!(16 & v)) {
                            if (0 == (64 & v)) { b = p[(65535 & b) + (d & (1 << v) - 1)]; continue e }
                            if (32 & v) { r.mode = 12; break t }
                            t.msg = "invalid literal/length code", r.mode = 30;
                            break t
                        }
                        w = 65535 & b, (v &= 15) && (m < v && (d += R[i++] << m, m += 8), w += d & (1 << v) - 1, d >>>= v, m -= v), m < 15 && (d += R[i++] << m, m += 8, d += R[i++] << m, m += 8), b = g[d & C];
                        r: for (;;) {
                            if (d >>>= v = b >>> 24, m -= v, !(16 & (v = b >>> 16 & 255))) {
                                if (0 == (64 & v)) { b = g[(65535 & b) + (d & (1 << v) - 1)]; continue r }
                                t.msg = "invalid distance code", r.mode = 30;
                                break t
                            }
                            if (k = 65535 & b, m < (v &= 15) && (d += R[i++] << m, (m += 8) < v && (d += R[i++] << m, m += 8)), (k += d & (1 << v) - 1) > h) { t.msg = "invalid distance too far back", r.mode = 30; break t }
                            if (d >>>= v, m -= v, k > (v = n - a)) {
                                if ((v = k - v) > l && r.sane) { t.msg = "invalid distance too far back", r.mode = 30; break t }
                                if (B = 0, S = f, 0 === c) {
                                    if (B += u - v, v < w) {
                                        w -= v;
                                        do { T[n++] = f[B++] } while (--v);
                                        B = n - k, S = T
                                    }
                                } else if (c < v) {
                                    if (B += u + c - v, (v -= c) < w) {
                                        w -= v;
                                        do { T[n++] = f[B++] } while (--v);
                                        if (B = 0, c < w) {
                                            w -= v = c;
                                            do { T[n++] = f[B++] } while (--v);
                                            B = n - k, S = T
                                        }
                                    }
                                } else if (B += c - v, v < w) {
                                    w -= v;
                                    do { T[n++] = f[B++] } while (--v);
                                    B = n - k, S = T
                                }
                                for (; w > 2;) T[n++] = S[B++], T[n++] = S[B++], T[n++] = S[B++], w -= 3;
                                w && (T[n++] = S[B++], w > 1 && (T[n++] = S[B++]))
                            } else {
                                B = n - k;
                                do { T[n++] = T[B++], T[n++] = T[B++], T[n++] = T[B++], w -= 3 } while (w > 2);
                                w && (T[n++] = T[B++], w > 1 && (T[n++] = T[B++]))
                            }
                            break
                        }
                    }
                    break
                }
            } while (i < s && n < o);
            i -= w = m >> 3, d &= (1 << (m -= w << 3)) - 1, t.next_in = i, t.next_out = n, t.avail_in = i < s ? s - i + 5 : 5 - (i - s), t.avail_out = n < o ? o - n + 257 : 257 - (n - o), r.hold = d, r.bits = m
        }
    }, function(t, e, r) {
        "use strict";
        var i = r(3),
            s = r(39),
            n = r(38),
            a = r(70),
            o = r(69),
            h = 0,
            u = 1,
            l = 2,
            c = 4,
            f = 5,
            d = 6,
            m = 0,
            p = 1,
            g = 2,
            y = -2,
            C = -3,
            b = -4,
            v = -5,
            w = 8,
            k = 1,
            B = 2,
            S = 3,
            R = 4,
            T = 5,
            A = 6,
            F = 7,
            L = 8,
            _ = 9,
            x = 10,
            H = 11,
            E = 12,
            M = 13,
            P = 14,
            O = 15,
            D = 16,
            W = 17,
            I = 18,
            G = 19,
            N = 20,
            z = 21,
            j = 22,
            U = 23,
            q = 24,
            Z = 25,
            V = 26,
            J = 27,
            Y = 28,
            X = 29,
            $ = 30,
            Q = 31,
            K = 32,
            tt = 852,
            et = 592,
            rt = 15;

        function it(t) { return (t >>> 24 & 255) + (t >>> 8 & 65280) + ((65280 & t) << 8) + ((255 & t) << 24) }

        function st(t) { var e; return t && t.state ? (e = t.state, t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = 1 & e.wrap), e.mode = k, e.last = 0, e.havedict = 0, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new i.Buf32(tt), e.distcode = e.distdyn = new i.Buf32(et), e.sane = 1, e.back = -1, m) : y }

        function nt(t) { var e; return t && t.state ? ((e = t.state).wsize = 0, e.whave = 0, e.wnext = 0, st(t)) : y }

        function at(t, e) { var r, i; return t && t.state ? (i = t.state, e < 0 ? (r = 0, e = -e) : (r = 1 + (e >> 4), e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? y : (null !== i.window && i.wbits !== e && (i.window = null), i.wrap = r, i.wbits = e, nt(t))) : y }

        function ot(t, e) { var r, s; return t ? (s = new function() { this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new i.Buf16(320), this.work = new i.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0 }, t.state = s, s.window = null, (r = at(t, e)) !== m && (t.state = null), r) : y }
        var ht, ut, lt = !0;

        function ct(t) {
            if (lt) {
                var e;
                for (ht = new i.Buf32(512), ut = new i.Buf32(32), e = 0; e < 144;) t.lens[e++] = 8;
                for (; e < 256;) t.lens[e++] = 9;
                for (; e < 280;) t.lens[e++] = 7;
                for (; e < 288;) t.lens[e++] = 8;
                for (o(u, t.lens, 0, 288, ht, 0, t.work, { bits: 9 }), e = 0; e < 32;) t.lens[e++] = 5;
                o(l, t.lens, 0, 32, ut, 0, t.work, { bits: 5 }), lt = !1
            }
            t.lencode = ht, t.lenbits = 9, t.distcode = ut, t.distbits = 5
        }

        function ft(t, e, r, s) { var n, a = t.state; return null === a.window && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new i.Buf8(a.wsize)), s >= a.wsize ? (i.arraySet(a.window, e, r - a.wsize, a.wsize, 0), a.wnext = 0, a.whave = a.wsize) : ((n = a.wsize - a.wnext) > s && (n = s), i.arraySet(a.window, e, r - s, n, a.wnext), (s -= n) ? (i.arraySet(a.window, e, r - s, s, 0), a.wnext = s, a.whave = a.wsize) : (a.wnext += n, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += n))), 0 }
        e.inflateReset = nt, e.inflateReset2 = at, e.inflateResetKeep = st, e.inflateInit = function(t) { return ot(t, rt) }, e.inflateInit2 = ot, e.inflate = function(t, e) {
            var r, tt, et, rt, st, nt, at, ot, ht, ut, lt, dt, mt, pt, gt, yt, Ct, bt, vt, wt, kt, Bt, St, Rt, Tt = 0,
                At = new i.Buf8(4),
                Ft = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
            if (!t || !t.state || !t.output || !t.input && 0 !== t.avail_in) return y;
            (r = t.state).mode === E && (r.mode = M), st = t.next_out, et = t.output, at = t.avail_out, rt = t.next_in, tt = t.input, nt = t.avail_in, ot = r.hold, ht = r.bits, ut = nt, lt = at, Bt = m;
            t: for (;;) switch (r.mode) {
                case k:
                    if (0 === r.wrap) { r.mode = M; break }
                    for (; ht < 16;) {
                        if (0 === nt) break t;
                        nt--, ot += tt[rt++] << ht, ht += 8
                    }
                    if (2 & r.wrap && 35615 === ot) { r.check = 0, At[0] = 255 & ot, At[1] = ot >>> 8 & 255, r.check = n(r.check, At, 2, 0), ot = 0, ht = 0, r.mode = B; break }
                    if (r.flags = 0, r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & ot) << 8) + (ot >> 8)) % 31) { t.msg = "incorrect header check", r.mode = $; break }
                    if ((15 & ot) !== w) { t.msg = "unknown compression method", r.mode = $; break }
                    if (ht -= 4, kt = 8 + (15 & (ot >>>= 4)), 0 === r.wbits) r.wbits = kt;
                    else if (kt > r.wbits) { t.msg = "invalid window size", r.mode = $; break }
                    r.dmax = 1 << kt, t.adler = r.check = 1, r.mode = 512 & ot ? x : E, ot = 0, ht = 0;
                    break;
                case B:
                    for (; ht < 16;) {
                        if (0 === nt) break t;
                        nt--, ot += tt[rt++] << ht, ht += 8
                    }
                    if (r.flags = ot, (255 & r.flags) !== w) { t.msg = "unknown compression method", r.mode = $; break }
                    if (57344 & r.flags) { t.msg = "unknown header flags set", r.mode = $; break }
                    r.head && (r.head.text = ot >> 8 & 1), 512 & r.flags && (At[0] = 255 & ot, At[1] = ot >>> 8 & 255, r.check = n(r.check, At, 2, 0)), ot = 0, ht = 0, r.mode = S;
                case S:
                    for (; ht < 32;) {
                        if (0 === nt) break t;
                        nt--, ot += tt[rt++] << ht, ht += 8
                    }
                    r.head && (r.head.time = ot), 512 & r.flags && (At[0] = 255 & ot, At[1] = ot >>> 8 & 255, At[2] = ot >>> 16 & 255, At[3] = ot >>> 24 & 255, r.check = n(r.check, At, 4, 0)), ot = 0, ht = 0, r.mode = R;
                case R:
                    for (; ht < 16;) {
                        if (0 === nt) break t;
                        nt--, ot += tt[rt++] << ht, ht += 8
                    }
                    r.head && (r.head.xflags = 255 & ot, r.head.os = ot >> 8), 512 & r.flags && (At[0] = 255 & ot, At[1] = ot >>> 8 & 255, r.check = n(r.check, At, 2, 0)), ot = 0, ht = 0, r.mode = T;
                case T:
                    if (1024 & r.flags) {
                        for (; ht < 16;) {
                            if (0 === nt) break t;
                            nt--, ot += tt[rt++] << ht, ht += 8
                        }
                        r.length = ot, r.head && (r.head.extra_len = ot), 512 & r.flags && (At[0] = 255 & ot, At[1] = ot >>> 8 & 255, r.check = n(r.check, At, 2, 0)), ot = 0, ht = 0
                    } else r.head && (r.head.extra = null);
                    r.mode = A;
                case A:
                    if (1024 & r.flags && ((dt = r.length) > nt && (dt = nt), dt && (r.head && (kt = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Array(r.head.extra_len)), i.arraySet(r.head.extra, tt, rt, dt, kt)), 512 & r.flags && (r.check = n(r.check, tt, dt, rt)), nt -= dt, rt += dt, r.length -= dt), r.length)) break t;
                    r.length = 0, r.mode = F;
                case F:
                    if (2048 & r.flags) {
                        if (0 === nt) break t;
                        dt = 0;
                        do { kt = tt[rt + dt++], r.head && kt && r.length < 65536 && (r.head.name += String.fromCharCode(kt)) } while (kt && dt < nt);
                        if (512 & r.flags && (r.check = n(r.check, tt, dt, rt)), nt -= dt, rt += dt, kt) break t
                    } else r.head && (r.head.name = null);
                    r.length = 0, r.mode = L;
                case L:
                    if (4096 & r.flags) {
                        if (0 === nt) break t;
                        dt = 0;
                        do { kt = tt[rt + dt++], r.head && kt && r.length < 65536 && (r.head.comment += String.fromCharCode(kt)) } while (kt && dt < nt);
                        if (512 & r.flags && (r.check = n(r.check, tt, dt, rt)), nt -= dt, rt += dt, kt) break t
                    } else r.head && (r.head.comment = null);
                    r.mode = _;
                case _:
                    if (512 & r.flags) {
                        for (; ht < 16;) {
                            if (0 === nt) break t;
                            nt--, ot += tt[rt++] << ht, ht += 8
                        }
                        if (ot !== (65535 & r.check)) { t.msg = "header crc mismatch", r.mode = $; break }
                        ot = 0, ht = 0
                    }
                    r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), t.adler = r.check = 0, r.mode = E;
                    break;
                case x:
                    for (; ht < 32;) {
                        if (0 === nt) break t;
                        nt--, ot += tt[rt++] << ht, ht += 8
                    }
                    t.adler = r.check = it(ot), ot = 0, ht = 0, r.mode = H;
                case H:
                    if (0 === r.havedict) return t.next_out = st, t.avail_out = at, t.next_in = rt, t.avail_in = nt, r.hold = ot, r.bits = ht, g;
                    t.adler = r.check = 1, r.mode = E;
                case E:
                    if (e === f || e === d) break t;
                case M:
                    if (r.last) { ot >>>= 7 & ht, ht -= 7 & ht, r.mode = J; break }
                    for (; ht < 3;) {
                        if (0 === nt) break t;
                        nt--, ot += tt[rt++] << ht, ht += 8
                    }
                    switch (r.last = 1 & ot, ht -= 1, 3 & (ot >>>= 1)) {
                        case 0:
                            r.mode = P;
                            break;
                        case 1:
                            if (ct(r), r.mode = N, e === d) { ot >>>= 2, ht -= 2; break t }
                            break;
                        case 2:
                            r.mode = W;
                            break;
                        case 3:
                            t.msg = "invalid block type", r.mode = $
                    }
                    ot >>>= 2, ht -= 2;
                    break;
                case P:
                    for (ot >>>= 7 & ht, ht -= 7 & ht; ht < 32;) {
                        if (0 === nt) break t;
                        nt--, ot += tt[rt++] << ht, ht += 8
                    }
                    if ((65535 & ot) != (ot >>> 16 ^ 65535)) { t.msg = "invalid stored block lengths", r.mode = $; break }
                    if (r.length = 65535 & ot, ot = 0, ht = 0, r.mode = O, e === d) break t;
                case O:
                    r.mode = D;
                case D:
                    if (dt = r.length) {
                        if (dt > nt && (dt = nt), dt > at && (dt = at), 0 === dt) break t;
                        i.arraySet(et, tt, rt, dt, st), nt -= dt, rt += dt, at -= dt, st += dt, r.length -= dt;
                        break
                    }
                    r.mode = E;
                    break;
                case W:
                    for (; ht < 14;) {
                        if (0 === nt) break t;
                        nt--, ot += tt[rt++] << ht, ht += 8
                    }
                    if (r.nlen = 257 + (31 & ot), ot >>>= 5, ht -= 5, r.ndist = 1 + (31 & ot), ot >>>= 5, ht -= 5, r.ncode = 4 + (15 & ot), ot >>>= 4, ht -= 4, r.nlen > 286 || r.ndist > 30) { t.msg = "too many length or distance symbols", r.mode = $; break }
                    r.have = 0, r.mode = I;
                case I:
                    for (; r.have < r.ncode;) {
                        for (; ht < 3;) {
                            if (0 === nt) break t;
                            nt--, ot += tt[rt++] << ht, ht += 8
                        }
                        r.lens[Ft[r.have++]] = 7 & ot, ot >>>= 3, ht -= 3
                    }
                    for (; r.have < 19;) r.lens[Ft[r.have++]] = 0;
                    if (r.lencode = r.lendyn, r.lenbits = 7, St = { bits: r.lenbits }, Bt = o(h, r.lens, 0, 19, r.lencode, 0, r.work, St), r.lenbits = St.bits, Bt) { t.msg = "invalid code lengths set", r.mode = $; break }
                    r.have = 0, r.mode = G;
                case G:
                    for (; r.have < r.nlen + r.ndist;) {
                        for (; yt = (Tt = r.lencode[ot & (1 << r.lenbits) - 1]) >>> 16 & 255, Ct = 65535 & Tt, !((gt = Tt >>> 24) <= ht);) {
                            if (0 === nt) break t;
                            nt--, ot += tt[rt++] << ht, ht += 8
                        }
                        if (Ct < 16) ot >>>= gt, ht -= gt, r.lens[r.have++] = Ct;
                        else {
                            if (16 === Ct) {
                                for (Rt = gt + 2; ht < Rt;) {
                                    if (0 === nt) break t;
                                    nt--, ot += tt[rt++] << ht, ht += 8
                                }
                                if (ot >>>= gt, ht -= gt, 0 === r.have) { t.msg = "invalid bit length repeat", r.mode = $; break }
                                kt = r.lens[r.have - 1], dt = 3 + (3 & ot), ot >>>= 2, ht -= 2
                            } else if (17 === Ct) {
                                for (Rt = gt + 3; ht < Rt;) {
                                    if (0 === nt) break t;
                                    nt--, ot += tt[rt++] << ht, ht += 8
                                }
                                ht -= gt, kt = 0, dt = 3 + (7 & (ot >>>= gt)), ot >>>= 3, ht -= 3
                            } else {
                                for (Rt = gt + 7; ht < Rt;) {
                                    if (0 === nt) break t;
                                    nt--, ot += tt[rt++] << ht, ht += 8
                                }
                                ht -= gt, kt = 0, dt = 11 + (127 & (ot >>>= gt)), ot >>>= 7, ht -= 7
                            }
                            if (r.have + dt > r.nlen + r.ndist) { t.msg = "invalid bit length repeat", r.mode = $; break }
                            for (; dt--;) r.lens[r.have++] = kt
                        }
                    }
                    if (r.mode === $) break;
                    if (0 === r.lens[256]) { t.msg = "invalid code -- missing end-of-block", r.mode = $; break }
                    if (r.lenbits = 9, St = { bits: r.lenbits }, Bt = o(u, r.lens, 0, r.nlen, r.lencode, 0, r.work, St), r.lenbits = St.bits, Bt) { t.msg = "invalid literal/lengths set", r.mode = $; break }
                    if (r.distbits = 6, r.distcode = r.distdyn, St = { bits: r.distbits }, Bt = o(l, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, St), r.distbits = St.bits, Bt) { t.msg = "invalid distances set", r.mode = $; break }
                    if (r.mode = N, e === d) break t;
                case N:
                    r.mode = z;
                case z:
                    if (nt >= 6 && at >= 258) { t.next_out = st, t.avail_out = at, t.next_in = rt, t.avail_in = nt, r.hold = ot, r.bits = ht, a(t, lt), st = t.next_out, et = t.output, at = t.avail_out, rt = t.next_in, tt = t.input, nt = t.avail_in, ot = r.hold, ht = r.bits, r.mode === E && (r.back = -1); break }
                    for (r.back = 0; yt = (Tt = r.lencode[ot & (1 << r.lenbits) - 1]) >>> 16 & 255, Ct = 65535 & Tt, !((gt = Tt >>> 24) <= ht);) {
                        if (0 === nt) break t;
                        nt--, ot += tt[rt++] << ht, ht += 8
                    }
                    if (yt && 0 == (240 & yt)) {
                        for (bt = gt, vt = yt, wt = Ct; yt = (Tt = r.lencode[wt + ((ot & (1 << bt + vt) - 1) >> bt)]) >>> 16 & 255, Ct = 65535 & Tt, !(bt + (gt = Tt >>> 24) <= ht);) {
                            if (0 === nt) break t;
                            nt--, ot += tt[rt++] << ht, ht += 8
                        }
                        ot >>>= bt, ht -= bt, r.back += bt
                    }
                    if (ot >>>= gt, ht -= gt, r.back += gt, r.length = Ct, 0 === yt) { r.mode = V; break }
                    if (32 & yt) { r.back = -1, r.mode = E; break }
                    if (64 & yt) { t.msg = "invalid literal/length code", r.mode = $; break }
                    r.extra = 15 & yt, r.mode = j;
                case j:
                    if (r.extra) {
                        for (Rt = r.extra; ht < Rt;) {
                            if (0 === nt) break t;
                            nt--, ot += tt[rt++] << ht, ht += 8
                        }
                        r.length += ot & (1 << r.extra) - 1, ot >>>= r.extra, ht -= r.extra, r.back += r.extra
                    }
                    r.was = r.length, r.mode = U;
                case U:
                    for (; yt = (Tt = r.distcode[ot & (1 << r.distbits) - 1]) >>> 16 & 255, Ct = 65535 & Tt, !((gt = Tt >>> 24) <= ht);) {
                        if (0 === nt) break t;
                        nt--, ot += tt[rt++] << ht, ht += 8
                    }
                    if (0 == (240 & yt)) {
                        for (bt = gt, vt = yt, wt = Ct; yt = (Tt = r.distcode[wt + ((ot & (1 << bt + vt) - 1) >> bt)]) >>> 16 & 255, Ct = 65535 & Tt, !(bt + (gt = Tt >>> 24) <= ht);) {
                            if (0 === nt) break t;
                            nt--, ot += tt[rt++] << ht, ht += 8
                        }
                        ot >>>= bt, ht -= bt, r.back += bt
                    }
                    if (ot >>>= gt, ht -= gt, r.back += gt, 64 & yt) { t.msg = "invalid distance code", r.mode = $; break }
                    r.offset = Ct, r.extra = 15 & yt, r.mode = q;
                case q:
                    if (r.extra) {
                        for (Rt = r.extra; ht < Rt;) {
                            if (0 === nt) break t;
                            nt--, ot += tt[rt++] << ht, ht += 8
                        }
                        r.offset += ot & (1 << r.extra) - 1, ot >>>= r.extra, ht -= r.extra, r.back += r.extra
                    }
                    if (r.offset > r.dmax) { t.msg = "invalid distance too far back", r.mode = $; break }
                    r.mode = Z;
                case Z:
                    if (0 === at) break t;
                    if (dt = lt - at, r.offset > dt) {
                        if ((dt = r.offset - dt) > r.whave && r.sane) { t.msg = "invalid distance too far back", r.mode = $; break }
                        dt > r.wnext ? (dt -= r.wnext, mt = r.wsize - dt) : mt = r.wnext - dt, dt > r.length && (dt = r.length), pt = r.window
                    } else pt = et, mt = st - r.offset, dt = r.length;
                    dt > at && (dt = at), at -= dt, r.length -= dt;
                    do { et[st++] = pt[mt++] } while (--dt);
                    0 === r.length && (r.mode = z);
                    break;
                case V:
                    if (0 === at) break t;
                    et[st++] = r.length, at--, r.mode = z;
                    break;
                case J:
                    if (r.wrap) {
                        for (; ht < 32;) {
                            if (0 === nt) break t;
                            nt--, ot |= tt[rt++] << ht, ht += 8
                        }
                        if (lt -= at, t.total_out += lt, r.total += lt, lt && (t.adler = r.check = r.flags ? n(r.check, et, lt, st - lt) : s(r.check, et, lt, st - lt)), lt = at, (r.flags ? ot : it(ot)) !== r.check) { t.msg = "incorrect data check", r.mode = $; break }
                        ot = 0, ht = 0
                    }
                    r.mode = Y;
                case Y:
                    if (r.wrap && r.flags) {
                        for (; ht < 32;) {
                            if (0 === nt) break t;
                            nt--, ot += tt[rt++] << ht, ht += 8
                        }
                        if (ot !== (4294967295 & r.total)) { t.msg = "incorrect length check", r.mode = $; break }
                        ot = 0, ht = 0
                    }
                    r.mode = X;
                case X:
                    Bt = p;
                    break t;
                case $:
                    Bt = C;
                    break t;
                case Q:
                    return b;
                case K:
                default:
                    return y
            }
            return t.next_out = st, t.avail_out = at, t.next_in = rt, t.avail_in = nt, r.hold = ot, r.bits = ht, (r.wsize || lt !== t.avail_out && r.mode < $ && (r.mode < J || e !== c)) && ft(t, t.output, t.next_out, lt - t.avail_out) ? (r.mode = Q, b) : (ut -= t.avail_in, lt -= t.avail_out, t.total_in += ut, t.total_out += lt, r.total += lt, r.wrap && lt && (t.adler = r.check = r.flags ? n(r.check, et, lt, t.next_out - lt) : s(r.check, et, lt, t.next_out - lt)), t.data_type = r.bits + (r.last ? 64 : 0) + (r.mode === E ? 128 : 0) + (r.mode === N || r.mode === O ? 256 : 0), (0 === ut && 0 === lt || e === c) && Bt === m && (Bt = v), Bt)
        }, e.inflateEnd = function(t) { if (!t || !t.state) return y; var e = t.state; return e.window && (e.window = null), t.state = null, m }, e.inflateGetHeader = function(t, e) { var r; return t && t.state ? 0 == (2 & (r = t.state).wrap) ? y : (r.head = e, e.done = !1, m) : y }, e.inflateSetDictionary = function(t, e) { var r, i = e.length; return t && t.state ? 0 !== (r = t.state).wrap && r.mode !== H ? y : r.mode === H && s(1, e, i, 0) !== r.check ? C : ft(t, e, i, i) ? (r.mode = Q, b) : (r.havedict = 1, m) : y }, e.inflateInfo = "pako inflate (from Nodeca project)"
    }, function(t, e, r) {
        "use strict";
        var i = r(71),
            s = r(3),
            n = r(37),
            a = r(35),
            o = r(21),
            h = r(36),
            u = r(68),
            l = Object.prototype.toString;

        function c(t) {
            if (!(this instanceof c)) return new c(t);
            this.options = s.assign({ chunkSize: 16384, windowBits: 0, to: "" }, t || {});
            var e = this.options;
            e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = -e.windowBits, 0 === e.windowBits && (e.windowBits = -15)), !(e.windowBits >= 0 && e.windowBits < 16) || t && t.windowBits || (e.windowBits += 32), e.windowBits > 15 && e.windowBits < 48 && 0 == (15 & e.windowBits) && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new h, this.strm.avail_out = 0;
            var r = i.inflateInit2(this.strm, e.windowBits);
            if (r !== a.Z_OK) throw new Error(o[r]);
            this.header = new u, i.inflateGetHeader(this.strm, this.header)
        }

        function f(t, e) { var r = new c(e); if (r.push(t, !0), r.err) throw r.msg || o[r.err]; return r.result }
        c.prototype.push = function(t, e) {
            var r, o, h, u, c, f, d = this.strm,
                m = this.options.chunkSize,
                p = this.options.dictionary,
                g = !1;
            if (this.ended) return !1;
            o = e === ~~e ? e : !0 === e ? a.Z_FINISH : a.Z_NO_FLUSH, "string" == typeof t ? d.input = n.binstring2buf(t) : "[object ArrayBuffer]" === l.call(t) ? d.input = new Uint8Array(t) : d.input = t, d.next_in = 0, d.avail_in = d.input.length;
            do {
                if (0 === d.avail_out && (d.output = new s.Buf8(m), d.next_out = 0, d.avail_out = m), (r = i.inflate(d, a.Z_NO_FLUSH)) === a.Z_NEED_DICT && p && (f = "string" == typeof p ? n.string2buf(p) : "[object ArrayBuffer]" === l.call(p) ? new Uint8Array(p) : p, r = i.inflateSetDictionary(this.strm, f)), r === a.Z_BUF_ERROR && !0 === g && (r = a.Z_OK, g = !1), r !== a.Z_STREAM_END && r !== a.Z_OK) return this.onEnd(r), this.ended = !0, !1;
                d.next_out && (0 !== d.avail_out && r !== a.Z_STREAM_END && (0 !== d.avail_in || o !== a.Z_FINISH && o !== a.Z_SYNC_FLUSH) || ("string" === this.options.to ? (h = n.utf8border(d.output, d.next_out), u = d.next_out - h, c = n.buf2string(d.output, h), d.next_out = u, d.avail_out = m - u, u && s.arraySet(d.output, d.output, h, u, 0), this.onData(c)) : this.onData(s.shrinkBuf(d.output, d.next_out)))), 0 === d.avail_in && 0 === d.avail_out && (g = !0)
            } while ((d.avail_in > 0 || 0 === d.avail_out) && r !== a.Z_STREAM_END);
            return r === a.Z_STREAM_END && (o = a.Z_FINISH), o === a.Z_FINISH ? (r = i.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === a.Z_OK) : o !== a.Z_SYNC_FLUSH || (this.onEnd(a.Z_OK), d.avail_out = 0, !0)
        }, c.prototype.onData = function(t) { this.chunks.push(t) }, c.prototype.onEnd = function(t) { t === a.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg }, e.Inflate = c, e.inflate = f, e.inflateRaw = function(t, e) { return (e = e || {}).raw = !0, f(t, e) }, e.ungzip = f
    }, function(t, e, r) {
        "use strict";
        var i = r(3),
            s = 4,
            n = 0,
            a = 1,
            o = 2;

        function h(t) { for (var e = t.length; --e >= 0;) t[e] = 0 }
        var u = 0,
            l = 1,
            c = 2,
            f = 29,
            d = 256,
            m = d + 1 + f,
            p = 30,
            g = 19,
            y = 2 * m + 1,
            C = 15,
            b = 16,
            v = 7,
            w = 256,
            k = 16,
            B = 17,
            S = 18,
            R = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
            T = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
            A = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
            F = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
            L = new Array(2 * (m + 2));
        h(L);
        var _ = new Array(2 * p);
        h(_);
        var x = new Array(512);
        h(x);
        var H = new Array(256);
        h(H);
        var E = new Array(f);
        h(E);
        var M, P, O, D = new Array(p);

        function W(t, e, r, i, s) { this.static_tree = t, this.extra_bits = e, this.extra_base = r, this.elems = i, this.max_length = s, this.has_stree = t && t.length }

        function I(t, e) { this.dyn_tree = t, this.max_code = 0, this.stat_desc = e }

        function G(t) { return t < 256 ? x[t] : x[256 + (t >>> 7)] }

        function N(t, e) { t.pending_buf[t.pending++] = 255 & e, t.pending_buf[t.pending++] = e >>> 8 & 255 }

        function z(t, e, r) { t.bi_valid > b - r ? (t.bi_buf |= e << t.bi_valid & 65535, N(t, t.bi_buf), t.bi_buf = e >> b - t.bi_valid, t.bi_valid += r - b) : (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += r) }

        function j(t, e, r) { z(t, r[2 * e], r[2 * e + 1]) }

        function U(t, e) {
            var r = 0;
            do { r |= 1 & t, t >>>= 1, r <<= 1 } while (--e > 0);
            return r >>> 1
        }

        function q(t, e, r) {
            var i, s, n = new Array(C + 1),
                a = 0;
            for (i = 1; i <= C; i++) n[i] = a = a + r[i - 1] << 1;
            for (s = 0; s <= e; s++) {
                var o = t[2 * s + 1];
                0 !== o && (t[2 * s] = U(n[o]++, o))
            }
        }

        function Z(t) {
            var e;
            for (e = 0; e < m; e++) t.dyn_ltree[2 * e] = 0;
            for (e = 0; e < p; e++) t.dyn_dtree[2 * e] = 0;
            for (e = 0; e < g; e++) t.bl_tree[2 * e] = 0;
            t.dyn_ltree[2 * w] = 1, t.opt_len = t.static_len = 0, t.last_lit = t.matches = 0
        }

        function V(t) { t.bi_valid > 8 ? N(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0 }

        function J(t, e, r, i) {
            var s = 2 * e,
                n = 2 * r;
            return t[s] < t[n] || t[s] === t[n] && i[e] <= i[r]
        }

        function Y(t, e, r) {
            for (var i = t.heap[r], s = r << 1; s <= t.heap_len && (s < t.heap_len && J(e, t.heap[s + 1], t.heap[s], t.depth) && s++, !J(e, i, t.heap[s], t.depth));) t.heap[r] = t.heap[s], r = s, s <<= 1;
            t.heap[r] = i
        }

        function X(t, e, r) {
            var i, s, n, a, o = 0;
            if (0 !== t.last_lit)
                do { i = t.pending_buf[t.d_buf + 2 * o] << 8 | t.pending_buf[t.d_buf + 2 * o + 1], s = t.pending_buf[t.l_buf + o], o++, 0 === i ? j(t, s, e) : (j(t, (n = H[s]) + d + 1, e), 0 !== (a = R[n]) && z(t, s -= E[n], a), j(t, n = G(--i), r), 0 !== (a = T[n]) && z(t, i -= D[n], a)) } while (o < t.last_lit);
            j(t, w, e)
        }

        function $(t, e) {
            var r, i, s, n = e.dyn_tree,
                a = e.stat_desc.static_tree,
                o = e.stat_desc.has_stree,
                h = e.stat_desc.elems,
                u = -1;
            for (t.heap_len = 0, t.heap_max = y, r = 0; r < h; r++) 0 !== n[2 * r] ? (t.heap[++t.heap_len] = u = r, t.depth[r] = 0) : n[2 * r + 1] = 0;
            for (; t.heap_len < 2;) n[2 * (s = t.heap[++t.heap_len] = u < 2 ? ++u : 0)] = 1, t.depth[s] = 0, t.opt_len--, o && (t.static_len -= a[2 * s + 1]);
            for (e.max_code = u, r = t.heap_len >> 1; r >= 1; r--) Y(t, n, r);
            s = h;
            do { r = t.heap[1], t.heap[1] = t.heap[t.heap_len--], Y(t, n, 1), i = t.heap[1], t.heap[--t.heap_max] = r, t.heap[--t.heap_max] = i, n[2 * s] = n[2 * r] + n[2 * i], t.depth[s] = (t.depth[r] >= t.depth[i] ? t.depth[r] : t.depth[i]) + 1, n[2 * r + 1] = n[2 * i + 1] = s, t.heap[1] = s++, Y(t, n, 1) } while (t.heap_len >= 2);
            t.heap[--t.heap_max] = t.heap[1],
                function(t, e) {
                    var r, i, s, n, a, o, h = e.dyn_tree,
                        u = e.max_code,
                        l = e.stat_desc.static_tree,
                        c = e.stat_desc.has_stree,
                        f = e.stat_desc.extra_bits,
                        d = e.stat_desc.extra_base,
                        m = e.stat_desc.max_length,
                        p = 0;
                    for (n = 0; n <= C; n++) t.bl_count[n] = 0;
                    for (h[2 * t.heap[t.heap_max] + 1] = 0, r = t.heap_max + 1; r < y; r++)(n = h[2 * h[2 * (i = t.heap[r]) + 1] + 1] + 1) > m && (n = m, p++), h[2 * i + 1] = n, i > u || (t.bl_count[n]++, a = 0, i >= d && (a = f[i - d]), o = h[2 * i], t.opt_len += o * (n + a), c && (t.static_len += o * (l[2 * i + 1] + a)));
                    if (0 !== p) {
                        do {
                            for (n = m - 1; 0 === t.bl_count[n];) n--;
                            t.bl_count[n]--, t.bl_count[n + 1] += 2, t.bl_count[m]--, p -= 2
                        } while (p > 0);
                        for (n = m; 0 !== n; n--)
                            for (i = t.bl_count[n]; 0 !== i;)(s = t.heap[--r]) > u || (h[2 * s + 1] !== n && (t.opt_len += (n - h[2 * s + 1]) * h[2 * s], h[2 * s + 1] = n), i--)
                    }
                }(t, e), q(n, u, t.bl_count)
        }

        function Q(t, e, r) {
            var i, s, n = -1,
                a = e[1],
                o = 0,
                h = 7,
                u = 4;
            for (0 === a && (h = 138, u = 3), e[2 * (r + 1) + 1] = 65535, i = 0; i <= r; i++) s = a, a = e[2 * (i + 1) + 1], ++o < h && s === a || (o < u ? t.bl_tree[2 * s] += o : 0 !== s ? (s !== n && t.bl_tree[2 * s]++, t.bl_tree[2 * k]++) : o <= 10 ? t.bl_tree[2 * B]++ : t.bl_tree[2 * S]++, o = 0, n = s, 0 === a ? (h = 138, u = 3) : s === a ? (h = 6, u = 3) : (h = 7, u = 4))
        }

        function K(t, e, r) {
            var i, s, n = -1,
                a = e[1],
                o = 0,
                h = 7,
                u = 4;
            for (0 === a && (h = 138, u = 3), i = 0; i <= r; i++)
                if (s = a, a = e[2 * (i + 1) + 1], !(++o < h && s === a)) {
                    if (o < u)
                        do { j(t, s, t.bl_tree) } while (0 != --o);
                    else 0 !== s ? (s !== n && (j(t, s, t.bl_tree), o--), j(t, k, t.bl_tree), z(t, o - 3, 2)) : o <= 10 ? (j(t, B, t.bl_tree), z(t, o - 3, 3)) : (j(t, S, t.bl_tree), z(t, o - 11, 7));
                    o = 0, n = s, 0 === a ? (h = 138, u = 3) : s === a ? (h = 6, u = 3) : (h = 7, u = 4)
                }
        }
        h(D);
        var tt = !1;

        function et(t, e, r, s) {
            z(t, (u << 1) + (s ? 1 : 0), 3),
                function(t, e, r, s) { V(t), s && (N(t, r), N(t, ~r)), i.arraySet(t.pending_buf, t.window, e, r, t.pending), t.pending += r }(t, e, r, !0)
        }
        e._tr_init = function(t) {
            tt || (function() {
                var t, e, r, i, s, n = new Array(C + 1);
                for (r = 0, i = 0; i < f - 1; i++)
                    for (E[i] = r, t = 0; t < 1 << R[i]; t++) H[r++] = i;
                for (H[r - 1] = i, s = 0, i = 0; i < 16; i++)
                    for (D[i] = s, t = 0; t < 1 << T[i]; t++) x[s++] = i;
                for (s >>= 7; i < p; i++)
                    for (D[i] = s << 7, t = 0; t < 1 << T[i] - 7; t++) x[256 + s++] = i;
                for (e = 0; e <= C; e++) n[e] = 0;
                for (t = 0; t <= 143;) L[2 * t + 1] = 8, t++, n[8]++;
                for (; t <= 255;) L[2 * t + 1] = 9, t++, n[9]++;
                for (; t <= 279;) L[2 * t + 1] = 7, t++, n[7]++;
                for (; t <= 287;) L[2 * t + 1] = 8, t++, n[8]++;
                for (q(L, m + 1, n), t = 0; t < p; t++) _[2 * t + 1] = 5, _[2 * t] = U(t, 5);
                M = new W(L, R, d + 1, m, C), P = new W(_, T, 0, p, C), O = new W(new Array(0), A, 0, g, v)
            }(), tt = !0), t.l_desc = new I(t.dyn_ltree, M), t.d_desc = new I(t.dyn_dtree, P), t.bl_desc = new I(t.bl_tree, O), t.bi_buf = 0, t.bi_valid = 0, Z(t)
        }, e._tr_stored_block = et, e._tr_flush_block = function(t, e, r, i) {
            var h, u, f = 0;
            t.level > 0 ? (t.strm.data_type === o && (t.strm.data_type = function(t) {
                var e, r = 4093624447;
                for (e = 0; e <= 31; e++, r >>>= 1)
                    if (1 & r && 0 !== t.dyn_ltree[2 * e]) return n;
                if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return a;
                for (e = 32; e < d; e++)
                    if (0 !== t.dyn_ltree[2 * e]) return a;
                return n
            }(t)), $(t, t.l_desc), $(t, t.d_desc), f = function(t) { var e; for (Q(t, t.dyn_ltree, t.l_desc.max_code), Q(t, t.dyn_dtree, t.d_desc.max_code), $(t, t.bl_desc), e = g - 1; e >= 3 && 0 === t.bl_tree[2 * F[e] + 1]; e--); return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e }(t), h = t.opt_len + 3 + 7 >>> 3, (u = t.static_len + 3 + 7 >>> 3) <= h && (h = u)) : h = u = r + 5, r + 4 <= h && -1 !== e ? et(t, e, r, i) : t.strategy === s || u === h ? (z(t, (l << 1) + (i ? 1 : 0), 3), X(t, L, _)) : (z(t, (c << 1) + (i ? 1 : 0), 3), function(t, e, r, i) {
                var s;
                for (z(t, e - 257, 5), z(t, r - 1, 5), z(t, i - 4, 4), s = 0; s < i; s++) z(t, t.bl_tree[2 * F[s] + 1], 3);
                K(t, t.dyn_ltree, e - 1), K(t, t.dyn_dtree, r - 1)
            }(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, f + 1), X(t, t.dyn_ltree, t.dyn_dtree)), Z(t), i && V(t)
        }, e._tr_tally = function(t, e, r) { return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255, t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e, t.pending_buf[t.l_buf + t.last_lit] = 255 & r, t.last_lit++, 0 === e ? t.dyn_ltree[2 * r]++ : (t.matches++, e--, t.dyn_ltree[2 * (H[r] + d + 1)]++, t.dyn_dtree[2 * G(e)]++), t.last_lit === t.lit_bufsize - 1 }, e._tr_align = function(t) {
            z(t, l << 1, 3), j(t, w, L),
                function(t) { 16 === t.bi_valid ? (N(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = 255 & t.bi_buf, t.bi_buf >>= 8, t.bi_valid -= 8) }(t)
        }
    }, function(t, e, r) {
        "use strict";
        var i, s = r(3),
            n = r(73),
            a = r(39),
            o = r(38),
            h = r(21),
            u = 0,
            l = 1,
            c = 3,
            f = 4,
            d = 5,
            m = 0,
            p = 1,
            g = -2,
            y = -3,
            C = -5,
            b = -1,
            v = 1,
            w = 2,
            k = 3,
            B = 4,
            S = 0,
            R = 2,
            T = 8,
            A = 9,
            F = 15,
            L = 8,
            _ = 286,
            x = 30,
            H = 19,
            E = 2 * _ + 1,
            M = 15,
            P = 3,
            O = 258,
            D = O + P + 1,
            W = 32,
            I = 42,
            G = 69,
            N = 73,
            z = 91,
            j = 103,
            U = 113,
            q = 666,
            Z = 1,
            V = 2,
            J = 3,
            Y = 4,
            X = 3;

        function $(t, e) { return t.msg = h[e], e }

        function Q(t) { return (t << 1) - (t > 4 ? 9 : 0) }

        function K(t) { for (var e = t.length; --e >= 0;) t[e] = 0 }

        function tt(t) {
            var e = t.state,
                r = e.pending;
            r > t.avail_out && (r = t.avail_out), 0 !== r && (s.arraySet(t.output, e.pending_buf, e.pending_out, r, t.next_out), t.next_out += r, e.pending_out += r, t.total_out += r, t.avail_out -= r, e.pending -= r, 0 === e.pending && (e.pending_out = 0))
        }

        function et(t, e) { n._tr_flush_block(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e), t.block_start = t.strstart, tt(t.strm) }

        function rt(t, e) { t.pending_buf[t.pending++] = e }

        function it(t, e) { t.pending_buf[t.pending++] = e >>> 8 & 255, t.pending_buf[t.pending++] = 255 & e }

        function st(t, e) {
            var r, i, s = t.max_chain_length,
                n = t.strstart,
                a = t.prev_length,
                o = t.nice_match,
                h = t.strstart > t.w_size - D ? t.strstart - (t.w_size - D) : 0,
                u = t.window,
                l = t.w_mask,
                c = t.prev,
                f = t.strstart + O,
                d = u[n + a - 1],
                m = u[n + a];
            t.prev_length >= t.good_match && (s >>= 2), o > t.lookahead && (o = t.lookahead);
            do {
                if (u[(r = e) + a] === m && u[r + a - 1] === d && u[r] === u[n] && u[++r] === u[n + 1]) {
                    n += 2, r++;
                    do {} while (u[++n] === u[++r] && u[++n] === u[++r] && u[++n] === u[++r] && u[++n] === u[++r] && u[++n] === u[++r] && u[++n] === u[++r] && u[++n] === u[++r] && u[++n] === u[++r] && n < f);
                    if (i = O - (f - n), n = f - O, i > a) {
                        if (t.match_start = e, a = i, i >= o) break;
                        d = u[n + a - 1], m = u[n + a]
                    }
                }
            } while ((e = c[e & l]) > h && 0 != --s);
            return a <= t.lookahead ? a : t.lookahead
        }

        function nt(t) {
            var e, r, i, n, h, u, l, c, f, d, m = t.w_size;
            do {
                if (n = t.window_size - t.lookahead - t.strstart, t.strstart >= m + (m - D)) {
                    s.arraySet(t.window, t.window, m, m, 0), t.match_start -= m, t.strstart -= m, t.block_start -= m, e = r = t.hash_size;
                    do { i = t.head[--e], t.head[e] = i >= m ? i - m : 0 } while (--r);
                    e = r = m;
                    do { i = t.prev[--e], t.prev[e] = i >= m ? i - m : 0 } while (--r);
                    n += m
                }
                if (0 === t.strm.avail_in) break;
                if (u = t.strm, l = t.window, c = t.strstart + t.lookahead, f = n, d = void 0, (d = u.avail_in) > f && (d = f), r = 0 === d ? 0 : (u.avail_in -= d, s.arraySet(l, u.input, u.next_in, d, c), 1 === u.state.wrap ? u.adler = a(u.adler, l, d, c) : 2 === u.state.wrap && (u.adler = o(u.adler, l, d, c)), u.next_in += d, u.total_in += d, d), t.lookahead += r, t.lookahead + t.insert >= P)
                    for (h = t.strstart - t.insert, t.ins_h = t.window[h], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[h + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[h + P - 1]) & t.hash_mask, t.prev[h & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = h, h++, t.insert--, !(t.lookahead + t.insert < P)););
            } while (t.lookahead < D && 0 !== t.strm.avail_in)
        }

        function at(t, e) {
            for (var r, i;;) {
                if (t.lookahead < D) { if (nt(t), t.lookahead < D && e === u) return Z; if (0 === t.lookahead) break }
                if (r = 0, t.lookahead >= P && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + P - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 !== r && t.strstart - r <= t.w_size - D && (t.match_length = st(t, r)), t.match_length >= P)
                    if (i = n._tr_tally(t, t.strstart - t.match_start, t.match_length - P), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= P) {
                        t.match_length--;
                        do { t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + P - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart } while (0 != --t.match_length);
                        t.strstart++
                    } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
                else i = n._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
                if (i && (et(t, !1), 0 === t.strm.avail_out)) return Z
            }
            return t.insert = t.strstart < P - 1 ? t.strstart : P - 1, e === f ? (et(t, !0), 0 === t.strm.avail_out ? J : Y) : t.last_lit && (et(t, !1), 0 === t.strm.avail_out) ? Z : V
        }

        function ot(t, e) {
            for (var r, i, s;;) {
                if (t.lookahead < D) { if (nt(t), t.lookahead < D && e === u) return Z; if (0 === t.lookahead) break }
                if (r = 0, t.lookahead >= P && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + P - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = P - 1, 0 !== r && t.prev_length < t.max_lazy_match && t.strstart - r <= t.w_size - D && (t.match_length = st(t, r), t.match_length <= 5 && (t.strategy === v || t.match_length === P && t.strstart - t.match_start > 4096) && (t.match_length = P - 1)), t.prev_length >= P && t.match_length <= t.prev_length) {
                    s = t.strstart + t.lookahead - P, i = n._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - P), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
                    do {++t.strstart <= s && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + P - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart) } while (0 != --t.prev_length);
                    if (t.match_available = 0, t.match_length = P - 1, t.strstart++, i && (et(t, !1), 0 === t.strm.avail_out)) return Z
                } else if (t.match_available) { if ((i = n._tr_tally(t, 0, t.window[t.strstart - 1])) && et(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out) return Z } else t.match_available = 1, t.strstart++, t.lookahead--
            }
            return t.match_available && (i = n._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < P - 1 ? t.strstart : P - 1, e === f ? (et(t, !0), 0 === t.strm.avail_out ? J : Y) : t.last_lit && (et(t, !1), 0 === t.strm.avail_out) ? Z : V
        }

        function ht(t, e, r, i, s) { this.good_length = t, this.max_lazy = e, this.nice_length = r, this.max_chain = i, this.func = s }

        function ut(t) { var e; return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = R, (e = t.state).pending = 0, e.pending_out = 0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = e.wrap ? I : U, t.adler = 2 === e.wrap ? 0 : 1, e.last_flush = u, n._tr_init(e), m) : $(t, g) }

        function lt(t) { var e, r = ut(t); return r === m && ((e = t.state).window_size = 2 * e.w_size, K(e.head), e.max_lazy_match = i[e.level].max_lazy, e.good_match = i[e.level].good_length, e.nice_match = i[e.level].nice_length, e.max_chain_length = i[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = P - 1, e.match_available = 0, e.ins_h = 0), r }

        function ct(t, e, r, i, n, a) {
            if (!t) return g;
            var o = 1;
            if (e === b && (e = 6), i < 0 ? (o = 0, i = -i) : i > 15 && (o = 2, i -= 16), n < 1 || n > A || r !== T || i < 8 || i > 15 || e < 0 || e > 9 || a < 0 || a > B) return $(t, g);
            8 === i && (i = 9);
            var h = new function() { this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = T, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new s.Buf16(2 * E), this.dyn_dtree = new s.Buf16(2 * (2 * x + 1)), this.bl_tree = new s.Buf16(2 * (2 * H + 1)), K(this.dyn_ltree), K(this.dyn_dtree), K(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new s.Buf16(M + 1), this.heap = new s.Buf16(2 * _ + 1), K(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new s.Buf16(2 * _ + 1), K(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0 };
            return t.state = h, h.strm = t, h.wrap = o, h.gzhead = null, h.w_bits = i, h.w_size = 1 << h.w_bits, h.w_mask = h.w_size - 1, h.hash_bits = n + 7, h.hash_size = 1 << h.hash_bits, h.hash_mask = h.hash_size - 1, h.hash_shift = ~~((h.hash_bits + P - 1) / P), h.window = new s.Buf8(2 * h.w_size), h.head = new s.Buf16(h.hash_size), h.prev = new s.Buf16(h.w_size), h.lit_bufsize = 1 << n + 6, h.pending_buf_size = 4 * h.lit_bufsize, h.pending_buf = new s.Buf8(h.pending_buf_size), h.d_buf = 1 * h.lit_bufsize, h.l_buf = 3 * h.lit_bufsize, h.level = e, h.strategy = a, h.method = r, lt(t)
        }
        i = [new ht(0, 0, 0, 0, function(t, e) {
            var r = 65535;
            for (r > t.pending_buf_size - 5 && (r = t.pending_buf_size - 5);;) {
                if (t.lookahead <= 1) { if (nt(t), 0 === t.lookahead && e === u) return Z; if (0 === t.lookahead) break }
                t.strstart += t.lookahead, t.lookahead = 0;
                var i = t.block_start + r;
                if ((0 === t.strstart || t.strstart >= i) && (t.lookahead = t.strstart - i, t.strstart = i, et(t, !1), 0 === t.strm.avail_out)) return Z;
                if (t.strstart - t.block_start >= t.w_size - D && (et(t, !1), 0 === t.strm.avail_out)) return Z
            }
            return t.insert = 0, e === f ? (et(t, !0), 0 === t.strm.avail_out ? J : Y) : (t.strstart > t.block_start && (et(t, !1), t.strm.avail_out), Z)
        }), new ht(4, 4, 8, 4, at), new ht(4, 5, 16, 8, at), new ht(4, 6, 32, 32, at), new ht(4, 4, 16, 16, ot), new ht(8, 16, 32, 32, ot), new ht(8, 16, 128, 128, ot), new ht(8, 32, 128, 256, ot), new ht(32, 128, 258, 1024, ot), new ht(32, 258, 258, 4096, ot)], e.deflateInit = function(t, e) { return ct(t, e, T, F, L, S) }, e.deflateInit2 = ct, e.deflateReset = lt, e.deflateResetKeep = ut, e.deflateSetHeader = function(t, e) { return t && t.state ? 2 !== t.state.wrap ? g : (t.state.gzhead = e, m) : g }, e.deflate = function(t, e) {
            var r, s, a, h;
            if (!t || !t.state || e > d || e < 0) return t ? $(t, g) : g;
            if (s = t.state, !t.output || !t.input && 0 !== t.avail_in || s.status === q && e !== f) return $(t, 0 === t.avail_out ? C : g);
            if (s.strm = t, r = s.last_flush, s.last_flush = e, s.status === I)
                if (2 === s.wrap) t.adler = 0, rt(s, 31), rt(s, 139), rt(s, 8), s.gzhead ? (rt(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (s.gzhead.extra ? 4 : 0) + (s.gzhead.name ? 8 : 0) + (s.gzhead.comment ? 16 : 0)), rt(s, 255 & s.gzhead.time), rt(s, s.gzhead.time >> 8 & 255), rt(s, s.gzhead.time >> 16 & 255), rt(s, s.gzhead.time >> 24 & 255), rt(s, 9 === s.level ? 2 : s.strategy >= w || s.level < 2 ? 4 : 0), rt(s, 255 & s.gzhead.os), s.gzhead.extra && s.gzhead.extra.length && (rt(s, 255 & s.gzhead.extra.length), rt(s, s.gzhead.extra.length >> 8 & 255)), s.gzhead.hcrc && (t.adler = o(t.adler, s.pending_buf, s.pending, 0)), s.gzindex = 0, s.status = G) : (rt(s, 0), rt(s, 0), rt(s, 0), rt(s, 0), rt(s, 0), rt(s, 9 === s.level ? 2 : s.strategy >= w || s.level < 2 ? 4 : 0), rt(s, X), s.status = U);
                else {
                    var y = T + (s.w_bits - 8 << 4) << 8;
                    y |= (s.strategy >= w || s.level < 2 ? 0 : s.level < 6 ? 1 : 6 === s.level ? 2 : 3) << 6, 0 !== s.strstart && (y |= W), y += 31 - y % 31, s.status = U, it(s, y), 0 !== s.strstart && (it(s, t.adler >>> 16), it(s, 65535 & t.adler)), t.adler = 1
                }
            if (s.status === G)
                if (s.gzhead.extra) {
                    for (a = s.pending; s.gzindex < (65535 & s.gzhead.extra.length) && (s.pending !== s.pending_buf_size || (s.gzhead.hcrc && s.pending > a && (t.adler = o(t.adler, s.pending_buf, s.pending - a, a)), tt(t), a = s.pending, s.pending !== s.pending_buf_size));) rt(s, 255 & s.gzhead.extra[s.gzindex]), s.gzindex++;
                    s.gzhead.hcrc && s.pending > a && (t.adler = o(t.adler, s.pending_buf, s.pending - a, a)), s.gzindex === s.gzhead.extra.length && (s.gzindex = 0, s.status = N)
                } else s.status = N;
            if (s.status === N)
                if (s.gzhead.name) {
                    a = s.pending;
                    do {
                        if (s.pending === s.pending_buf_size && (s.gzhead.hcrc && s.pending > a && (t.adler = o(t.adler, s.pending_buf, s.pending - a, a)), tt(t), a = s.pending, s.pending === s.pending_buf_size)) { h = 1; break }
                        h = s.gzindex < s.gzhead.name.length ? 255 & s.gzhead.name.charCodeAt(s.gzindex++) : 0, rt(s, h)
                    } while (0 !== h);
                    s.gzhead.hcrc && s.pending > a && (t.adler = o(t.adler, s.pending_buf, s.pending - a, a)), 0 === h && (s.gzindex = 0, s.status = z)
                } else s.status = z;
            if (s.status === z)
                if (s.gzhead.comment) {
                    a = s.pending;
                    do {
                        if (s.pending === s.pending_buf_size && (s.gzhead.hcrc && s.pending > a && (t.adler = o(t.adler, s.pending_buf, s.pending - a, a)), tt(t), a = s.pending, s.pending === s.pending_buf_size)) { h = 1; break }
                        h = s.gzindex < s.gzhead.comment.length ? 255 & s.gzhead.comment.charCodeAt(s.gzindex++) : 0, rt(s, h)
                    } while (0 !== h);
                    s.gzhead.hcrc && s.pending > a && (t.adler = o(t.adler, s.pending_buf, s.pending - a, a)), 0 === h && (s.status = j)
                } else s.status = j;
            if (s.status === j && (s.gzhead.hcrc ? (s.pending + 2 > s.pending_buf_size && tt(t), s.pending + 2 <= s.pending_buf_size && (rt(s, 255 & t.adler), rt(s, t.adler >> 8 & 255), t.adler = 0, s.status = U)) : s.status = U), 0 !== s.pending) { if (tt(t), 0 === t.avail_out) return s.last_flush = -1, m } else if (0 === t.avail_in && Q(e) <= Q(r) && e !== f) return $(t, C);
            if (s.status === q && 0 !== t.avail_in) return $(t, C);
            if (0 !== t.avail_in || 0 !== s.lookahead || e !== u && s.status !== q) {
                var b = s.strategy === w ? function(t, e) { for (var r;;) { if (0 === t.lookahead && (nt(t), 0 === t.lookahead)) { if (e === u) return Z; break } if (t.match_length = 0, r = n._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, r && (et(t, !1), 0 === t.strm.avail_out)) return Z } return t.insert = 0, e === f ? (et(t, !0), 0 === t.strm.avail_out ? J : Y) : t.last_lit && (et(t, !1), 0 === t.strm.avail_out) ? Z : V }(s, e) : s.strategy === k ? function(t, e) {
                    for (var r, i, s, a, o = t.window;;) {
                        if (t.lookahead <= O) { if (nt(t), t.lookahead <= O && e === u) return Z; if (0 === t.lookahead) break }
                        if (t.match_length = 0, t.lookahead >= P && t.strstart > 0 && (i = o[s = t.strstart - 1]) === o[++s] && i === o[++s] && i === o[++s]) {
                            a = t.strstart + O;
                            do {} while (i === o[++s] && i === o[++s] && i === o[++s] && i === o[++s] && i === o[++s] && i === o[++s] && i === o[++s] && i === o[++s] && s < a);
                            t.match_length = O - (a - s), t.match_length > t.lookahead && (t.match_length = t.lookahead)
                        }
                        if (t.match_length >= P ? (r = n._tr_tally(t, 1, t.match_length - P), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (r = n._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), r && (et(t, !1), 0 === t.strm.avail_out)) return Z
                    }
                    return t.insert = 0, e === f ? (et(t, !0), 0 === t.strm.avail_out ? J : Y) : t.last_lit && (et(t, !1), 0 === t.strm.avail_out) ? Z : V
                }(s, e) : i[s.level].func(s, e);
                if (b !== J && b !== Y || (s.status = q), b === Z || b === J) return 0 === t.avail_out && (s.last_flush = -1), m;
                if (b === V && (e === l ? n._tr_align(s) : e !== d && (n._tr_stored_block(s, 0, 0, !1), e === c && (K(s.head), 0 === s.lookahead && (s.strstart = 0, s.block_start = 0, s.insert = 0))), tt(t), 0 === t.avail_out)) return s.last_flush = -1, m
            }
            return e !== f ? m : s.wrap <= 0 ? p : (2 === s.wrap ? (rt(s, 255 & t.adler), rt(s, t.adler >> 8 & 255), rt(s, t.adler >> 16 & 255), rt(s, t.adler >> 24 & 255), rt(s, 255 & t.total_in), rt(s, t.total_in >> 8 & 255), rt(s, t.total_in >> 16 & 255), rt(s, t.total_in >> 24 & 255)) : (it(s, t.adler >>> 16), it(s, 65535 & t.adler)), tt(t), s.wrap > 0 && (s.wrap = -s.wrap), 0 !== s.pending ? m : p)
        }, e.deflateEnd = function(t) { var e; return t && t.state ? (e = t.state.status) !== I && e !== G && e !== N && e !== z && e !== j && e !== U && e !== q ? $(t, g) : (t.state = null, e === U ? $(t, y) : m) : g }, e.deflateSetDictionary = function(t, e) {
            var r, i, n, o, h, u, l, c, f = e.length;
            if (!t || !t.state) return g;
            if (2 === (o = (r = t.state).wrap) || 1 === o && r.status !== I || r.lookahead) return g;
            for (1 === o && (t.adler = a(t.adler, e, f, 0)), r.wrap = 0, f >= r.w_size && (0 === o && (K(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0), c = new s.Buf8(r.w_size), s.arraySet(c, e, f - r.w_size, r.w_size, 0), e = c, f = r.w_size), h = t.avail_in, u = t.next_in, l = t.input, t.avail_in = f, t.next_in = 0, t.input = e, nt(r); r.lookahead >= P;) {
                i = r.strstart, n = r.lookahead - (P - 1);
                do { r.ins_h = (r.ins_h << r.hash_shift ^ r.window[i + P - 1]) & r.hash_mask, r.prev[i & r.w_mask] = r.head[r.ins_h], r.head[r.ins_h] = i, i++ } while (--n);
                r.strstart = i, r.lookahead = P - 1, nt(r)
            }
            return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = P - 1, r.match_available = 0, t.next_in = u, t.input = l, t.avail_in = h, r.wrap = o, m
        }, e.deflateInfo = "pako deflate (from Nodeca project)"
    }, function(t, e, r) {
        "use strict";
        var i = r(74),
            s = r(3),
            n = r(37),
            a = r(21),
            o = r(36),
            h = Object.prototype.toString,
            u = 0,
            l = -1,
            c = 0,
            f = 8;

        function d(t) {
            if (!(this instanceof d)) return new d(t);
            this.options = s.assign({ level: l, method: f, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: c, to: "" }, t || {});
            var e = this.options;
            e.raw && e.windowBits > 0 ? e.windowBits = -e.windowBits : e.gzip && e.windowBits > 0 && e.windowBits < 16 && (e.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new o, this.strm.avail_out = 0;
            var r = i.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
            if (r !== u) throw new Error(a[r]);
            if (e.header && i.deflateSetHeader(this.strm, e.header), e.dictionary) {
                var m;
                if (m = "string" == typeof e.dictionary ? n.string2buf(e.dictionary) : "[object ArrayBuffer]" === h.call(e.dictionary) ? new Uint8Array(e.dictionary) : e.dictionary, (r = i.deflateSetDictionary(this.strm, m)) !== u) throw new Error(a[r]);
                this._dict_set = !0
            }
        }

        function m(t, e) { var r = new d(e); if (r.push(t, !0), r.err) throw r.msg || a[r.err]; return r.result }
        d.prototype.push = function(t, e) {
            var r, a, o = this.strm,
                l = this.options.chunkSize;
            if (this.ended) return !1;
            a = e === ~~e ? e : !0 === e ? 4 : 0, "string" == typeof t ? o.input = n.string2buf(t) : "[object ArrayBuffer]" === h.call(t) ? o.input = new Uint8Array(t) : o.input = t, o.next_in = 0, o.avail_in = o.input.length;
            do {
                if (0 === o.avail_out && (o.output = new s.Buf8(l), o.next_out = 0, o.avail_out = l), 1 !== (r = i.deflate(o, a)) && r !== u) return this.onEnd(r), this.ended = !0, !1;
                0 !== o.avail_out && (0 !== o.avail_in || 4 !== a && 2 !== a) || ("string" === this.options.to ? this.onData(n.buf2binstring(s.shrinkBuf(o.output, o.next_out))) : this.onData(s.shrinkBuf(o.output, o.next_out)))
            } while ((o.avail_in > 0 || 0 === o.avail_out) && 1 !== r);
            return 4 === a ? (r = i.deflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === u) : 2 !== a || (this.onEnd(u), o.avail_out = 0, !0)
        }, d.prototype.onData = function(t) { this.chunks.push(t) }, d.prototype.onEnd = function(t) { t === u && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg }, e.Deflate = d, e.deflate = m, e.deflateRaw = function(t, e) { return (e = e || {}).raw = !0, m(t, e) }, e.gzip = function(t, e) { return (e = e || {}).gzip = !0, m(t, e) }
    }, function(t, e, r) {
        "use strict";
        var i = {};
        (0, r(3).assign)(i, r(75), r(72), r(35)), t.exports = i
    }, function(t, e, r) {
        "use strict";
        var i = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array,
            s = r(76),
            n = r(0),
            a = r(1),
            o = i ? "uint8array" : "array";

        function h(t, e) { a.call(this, "FlateWorker/" + t), this._pako = null, this._pakoAction = t, this._pakoOptions = e, this.meta = {} }
        e.magic = "\b\0", n.inherits(h, a), h.prototype.processChunk = function(t) { this.meta = t.meta, null === this._pako && this._createPako(), this._pako.push(n.transformTo(o, t.data), !1) }, h.prototype.flush = function() { a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], !0) }, h.prototype.cleanUp = function() { a.prototype.cleanUp.call(this), this._pako = null }, h.prototype._createPako = function() {
            this._pako = new s[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
            var t = this;
            this._pako.onData = function(e) { t.push({ data: e, meta: t.meta }) }
        }, e.compressWorker = function(t) { return new h("Deflate", t) }, e.uncompressWorker = function() { return new h("Inflate", {}) }
    }, function(t, e, r) {
        "use strict";
        var i = r(40),
            s = r(67);
        e.generateWorker = function(t, e, r) {
            var n = new s(e.streamFiles, r, e.platform, e.encodeFileName),
                a = 0;
            try {
                t.forEach(function(t, r) {
                    a++;
                    var s = function(t, e) {
                            var r = t || e,
                                s = i[r];
                            if (!s) throw new Error(r + " is not a valid compression method !");
                            return s
                        }(r.options.compression, e.compression),
                        o = r.options.compressionOptions || e.compressionOptions || {},
                        h = r.dir,
                        u = r.date;
                    r._compressWorker(s, o).withStreamInfo("file", { name: t, dir: h, date: u, comment: r.comment || "", unixPermissions: r.unixPermissions, dosPermissions: r.dosPermissions }).pipe(n)
                }), n.entriesCount = a
            } catch (t) { n.error(t) }
            return n
        }
    }, function(t, e, r) {
        "use strict";
        var i = r(45),
            s = r(43),
            n = r(9),
            a = r(23),
            o = r(1),
            h = function(t, e, r) { this.name = t, this.dir = r.dir, this.date = r.date, this.comment = r.comment, this.unixPermissions = r.unixPermissions, this.dosPermissions = r.dosPermissions, this._data = e, this._dataBinary = r.binary, this.options = { compression: r.compression, compressionOptions: r.compressionOptions } };
        h.prototype = {
            internalStream: function(t) {
                var e = null,
                    r = "string";
                try {
                    if (!t) throw new Error("No output type specified.");
                    var s = "string" === (r = t.toLowerCase()) || "text" === r;
                    "binarystring" !== r && "text" !== r || (r = "string"), e = this._decompressWorker();
                    var a = !this._dataBinary;
                    a && !s && (e = e.pipe(new n.Utf8EncodeWorker)), !a && s && (e = e.pipe(new n.Utf8DecodeWorker))
                } catch (t) {
                    (e = new o("error")).error(t)
                }
                return new i(e, r, "")
            },
            async: function(t, e) { return this.internalStream(t).accumulate(e) },
            nodeStream: function(t, e) { return this.internalStream(t || "nodebuffer").toNodejsStream(e) },
            _compressWorker: function(t, e) { if (this._data instanceof a && this._data.compression.magic === t.magic) return this._data.getCompressedWorker(); var r = this._decompressWorker(); return this._dataBinary || (r = r.pipe(new n.Utf8EncodeWorker)), a.createWorkerFrom(r, t, e) },
            _decompressWorker: function() { return this._data instanceof a ? this._data.getContentWorker() : this._data instanceof o ? this._data : new s(this._data) }
        };
        for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l = function() { throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.") }, c = 0; c < u.length; c++) h.prototype[u[c]] = l;
        t.exports = h
    }, function(t, e, r) {
        "use strict";
        var i = r(56).Readable;

        function s(t, e, r) {
            i.call(this, e), this._helper = t;
            var s = this;
            t.on("data", function(t, e) { s.push(t) || s._helper.pause(), r && r(e) }).on("error", function(t) { s.emit("error", t) }).on("end", function() { s.push(null) })
        }
        r(0).inherits(s, i), s.prototype._read = function() { this._helper.resume() }, t.exports = s
    }, function(t, e, r) {
        "use strict";
        var i = r(1),
            s = r(0);

        function n(t) { i.call(this, "ConvertWorker to " + t), this.destType = t }
        s.inherits(n, i), n.prototype.processChunk = function(t) { this.push({ data: s.transformTo(this.destType, t.data), meta: t.meta }) }, t.exports = n
    }, function(t, e, r) {
        "use strict";
        (function(e) {
            var r, i, s = e.MutationObserver || e.WebKitMutationObserver;
            if (s) {
                var n = 0,
                    a = new s(l),
                    o = e.document.createTextNode("");
                a.observe(o, { characterData: !0 }), r = function() { o.data = n = ++n % 2 }
            } else if (e.setImmediate || void 0 === e.MessageChannel) r = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function() {
                var t = e.document.createElement("script");
                t.onreadystatechange = function() { l(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null }, e.document.documentElement.appendChild(t)
            } : function() { setTimeout(l, 0) };
            else {
                var h = new e.MessageChannel;
                h.port1.onmessage = l, r = function() { h.port2.postMessage(0) }
            }
            var u = [];

            function l() {
                var t, e;
                i = !0;
                for (var r = u.length; r;) {
                    for (e = u, u = [], t = -1; ++t < r;) e[t]();
                    r = u.length
                }
                i = !1
            }
            t.exports = function(t) { 1 !== u.push(t) || i || r() }
        }).call(this, r(2))
    }, function(t, e, r) {
        "use strict";
        var i = r(82);

        function s() {}
        var n = {},
            a = ["REJECTED"],
            o = ["FULFILLED"],
            h = ["PENDING"];

        function u(t) {
            if ("function" != typeof t) throw new TypeError("resolver must be a function");
            this.state = h, this.queue = [], this.outcome = void 0, t !== s && d(this, t)
        }

        function l(t, e, r) { this.promise = t, "function" == typeof e && (this.onFulfilled = e, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r && (this.onRejected = r, this.callRejected = this.otherCallRejected) }

        function c(t, e, r) {
            i(function() {
                var i;
                try { i = e(r) } catch (e) { return n.reject(t, e) }
                i === t ? n.reject(t, new TypeError("Cannot resolve promise with itself")) : n.resolve(t, i)
            })
        }

        function f(t) { var e = t && t.then; if (t && ("object" == typeof t || "function" == typeof t) && "function" == typeof e) return function() { e.apply(t, arguments) } }

        function d(t, e) {
            var r = !1;

            function i(e) { r || (r = !0, n.reject(t, e)) }

            function s(e) { r || (r = !0, n.resolve(t, e)) }
            var a = m(function() { e(s, i) });
            "error" === a.status && i(a.value)
        }

        function m(t, e) { var r = {}; try { r.value = t(e), r.status = "success" } catch (t) { r.status = "error", r.value = t } return r }
        t.exports = u, u.prototype.catch = function(t) { return this.then(null, t) }, u.prototype.then = function(t, e) {
            if ("function" != typeof t && this.state === o || "function" != typeof e && this.state === a) return this;
            var r = new this.constructor(s);
            this.state !== h ? c(r, this.state === o ? t : e, this.outcome) : this.queue.push(new l(r, t, e));
            return r
        }, l.prototype.callFulfilled = function(t) { n.resolve(this.promise, t) }, l.prototype.otherCallFulfilled = function(t) { c(this.promise, this.onFulfilled, t) }, l.prototype.callRejected = function(t) { n.reject(this.promise, t) }, l.prototype.otherCallRejected = function(t) { c(this.promise, this.onRejected, t) }, n.resolve = function(t, e) {
            var r = m(f, e);
            if ("error" === r.status) return n.reject(t, r.value);
            var i = r.value;
            if (i) d(t, i);
            else { t.state = o, t.outcome = e; for (var s = -1, a = t.queue.length; ++s < a;) t.queue[s].callFulfilled(e) }
            return t
        }, n.reject = function(t, e) { t.state = a, t.outcome = e; for (var r = -1, i = t.queue.length; ++r < i;) t.queue[r].callRejected(e); return t }, u.resolve = function(t) { if (t instanceof this) return t; return n.resolve(new this(s), t) }, u.reject = function(t) { var e = new this(s); return n.reject(e, t) }, u.all = function(t) {
            var e = this;
            if ("[object Array]" !== Object.prototype.toString.call(t)) return this.reject(new TypeError("must be an array"));
            var r = t.length,
                i = !1;
            if (!r) return this.resolve([]);
            var a = new Array(r),
                o = 0,
                h = -1,
                u = new this(s);
            for (; ++h < r;) l(t[h], h);
            return u;

            function l(t, s) { e.resolve(t).then(function(t) { a[s] = t, ++o !== r || i || (i = !0, n.resolve(u, a)) }, function(t) { i || (i = !0, n.reject(u, t)) }) }
        }, u.race = function(t) {
            var e = this;
            if ("[object Array]" !== Object.prototype.toString.call(t)) return this.reject(new TypeError("must be an array"));
            var r = t.length,
                i = !1;
            if (!r) return this.resolve([]);
            var a = -1,
                o = new this(s);
            for (; ++a < r;) h = t[a], e.resolve(h).then(function(t) { i || (i = !0, n.resolve(o, t)) }, function(t) { i || (i = !0, n.reject(o, t)) });
            var h;
            return o
        }
    }, function(t, e) {
        var r = {}.toString;
        t.exports = function(t) { return r.call(t).slice(8, -1) }
    }, function(t, e, r) { t.exports = r(16).document && document.documentElement }, function(t, e) {
        t.exports = function(t, e, r) {
            var i = void 0 === r;
            switch (e.length) {
                case 0:
                    return i ? t() : t.call(r);
                case 1:
                    return i ? t(e[0]) : t.call(r, e[0]);
                case 2:
                    return i ? t(e[0], e[1]) : t.call(r, e[0], e[1]);
                case 3:
                    return i ? t(e[0], e[1], e[2]) : t.call(r, e[0], e[1], e[2]);
                case 4:
                    return i ? t(e[0], e[1], e[2], e[3]) : t.call(r, e[0], e[1], e[2], e[3])
            }
            return t.apply(r, e)
        }
    }, function(t, e, r) {
        var i, s, n, a = r(48),
            o = r(86),
            h = r(85),
            u = r(46),
            l = r(16),
            c = l.process,
            f = l.setImmediate,
            d = l.clearImmediate,
            m = l.MessageChannel,
            p = 0,
            g = {},
            y = function() {
                var t = +this;
                if (g.hasOwnProperty(t)) {
                    var e = g[t];
                    delete g[t], e()
                }
            },
            C = function(t) { y.call(t.data) };
        f && d || (f = function(t) { for (var e = [], r = 1; arguments.length > r;) e.push(arguments[r++]); return g[++p] = function() { o("function" == typeof t ? t : Function(t), e) }, i(p), p }, d = function(t) { delete g[t] }, "process" == r(84)(c) ? i = function(t) { c.nextTick(a(y, t, 1)) } : m ? (n = (s = new m).port2, s.port1.onmessage = C, i = a(n.postMessage, n, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (i = function(t) { l.postMessage(t + "", "*") }, l.addEventListener("message", C, !1)) : i = "onreadystatechange" in u("script") ? function(t) { h.appendChild(u("script")).onreadystatechange = function() { h.removeChild(this), y.call(t) } } : function(t) { setTimeout(a(y, t, 1), 0) }), t.exports = { set: f, clear: d }
    }, function(t, e) { t.exports = function(t, e) { return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e } } }, function(t, e, r) {
        var i = r(25);
        t.exports = function(t, e) { if (!i(t)) return t; var r, s; if (e && "function" == typeof(r = t.toString) && !i(s = r.call(t))) return s; if ("function" == typeof(r = t.valueOf) && !i(s = r.call(t))) return s; if (!e && "function" == typeof(r = t.toString) && !i(s = r.call(t))) return s; throw TypeError("Can't convert object to primitive value") }
    }, function(t, e, r) { t.exports = !r(24) && !r(47)(function() { return 7 != Object.defineProperty(r(46)("div"), "a", { get: function() { return 7 } }).a }) }, function(t, e, r) {
        var i = r(25);
        t.exports = function(t) { if (!i(t)) throw TypeError(t + " is not an object!"); return t }
    }, function(t, e, r) {
        var i = r(91),
            s = r(90),
            n = r(89),
            a = Object.defineProperty;
        e.f = r(24) ? Object.defineProperty : function(t, e, r) {
            if (i(t), e = n(e, !0), i(r), s) try { return a(t, e, r) } catch (t) {}
            if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");
            return "value" in r && (t[e] = r.value), t
        }
    }, function(t, e, r) {
        var i = r(92),
            s = r(88);
        t.exports = r(24) ? function(t, e, r) { return i.f(t, e, s(1, r)) } : function(t, e, r) { return t[e] = r, t }
    }, function(t, e) { t.exports = function(t) { if ("function" != typeof t) throw TypeError(t + " is not a function!"); return t } }, function(t, e, r) {
        var i = r(16),
            s = r(49),
            n = r(48),
            a = r(93),
            o = function(t, e, r) {
                var h, u, l, c = t & o.F,
                    f = t & o.G,
                    d = t & o.S,
                    m = t & o.P,
                    p = t & o.B,
                    g = t & o.W,
                    y = f ? s : s[e] || (s[e] = {}),
                    C = y.prototype,
                    b = f ? i : d ? i[e] : (i[e] || {}).prototype;
                for (h in f && (r = e), r)(u = !c && b && void 0 !== b[h]) && h in y || (l = u ? b[h] : r[h], y[h] = f && "function" != typeof b[h] ? r[h] : p && u ? n(l, i) : g && b[h] == l ? function(t) {
                    var e = function(e, r, i) {
                        if (this instanceof t) {
                            switch (arguments.length) {
                                case 0:
                                    return new t;
                                case 1:
                                    return new t(e);
                                case 2:
                                    return new t(e, r)
                            }
                            return new t(e, r, i)
                        }
                        return t.apply(this, arguments)
                    };
                    return e.prototype = t.prototype, e
                }(l) : m && "function" == typeof l ? n(Function.call, l) : l, m && ((y.virtual || (y.virtual = {}))[h] = l, t & o.R && C && !C[h] && a(C, h, l)))
            };
        o.F = 1, o.G = 2, o.S = 4, o.P = 8, o.B = 16, o.W = 32, o.U = 64, o.R = 128, t.exports = o
    }, function(t, e, r) {
        var i = r(95),
            s = r(87);
        i(i.G + i.B, { setImmediate: s.set, clearImmediate: s.clear })
    }, function(t, e, r) { r(96), t.exports = r(49).setImmediate }, function(t, e, r) { t.exports = r(27).PassThrough }, function(t, e, r) { t.exports = r(27).Transform }, function(t, e, r) { t.exports = r(6) }, function(t, e, r) { t.exports = r(26) }, function(t, e, r) {
        "use strict";
        t.exports = n;
        var i = r(51),
            s = r(12);

        function n(t) {
            if (!(this instanceof n)) return new n(t);
            i.call(this, t)
        }
        s.inherits = r(8), s.inherits(n, i), n.prototype._transform = function(t, e, r) { r(null, t) }
    }, function(t, e, r) {
        (function(e) {
            function r(t) { try { if (!e.localStorage) return !1 } catch (t) { return !1 } var r = e.localStorage[t]; return null != r && "true" === String(r).toLowerCase() }
            t.exports = function(t, e) {
                if (r("noDeprecation")) return t;
                var i = !1;
                return function() {
                    if (!i) {
                        if (r("throwDeprecation")) throw new Error(e);
                        r("traceDeprecation") ? console.trace(e) : console.warn(e), i = !0
                    }
                    return t.apply(this, arguments)
                }
            }
        }).call(this, r(2))
    }, function(t, e, r) {
        (function(t, e) {
            ! function(t, r) {
                "use strict";
                if (!t.setImmediate) {
                    var i, s, n, a, o, h = 1,
                        u = {},
                        l = !1,
                        c = t.document,
                        f = Object.getPrototypeOf && Object.getPrototypeOf(t);
                    f = f && f.setTimeout ? f : t, "[object process]" === {}.toString.call(t.process) ? i = function(t) { e.nextTick(function() { m(t) }) } : ! function() {
                        if (t.postMessage && !t.importScripts) {
                            var e = !0,
                                r = t.onmessage;
                            return t.onmessage = function() { e = !1 }, t.postMessage("", "*"), t.onmessage = r, e
                        }
                    }() ? t.MessageChannel ? ((n = new MessageChannel).port1.onmessage = function(t) { m(t.data) }, i = function(t) { n.port2.postMessage(t) }) : c && "onreadystatechange" in c.createElement("script") ? (s = c.documentElement, i = function(t) {
                        var e = c.createElement("script");
                        e.onreadystatechange = function() { m(t), e.onreadystatechange = null, s.removeChild(e), e = null }, s.appendChild(e)
                    }) : i = function(t) { setTimeout(m, 0, t) } : (a = "setImmediate$" + Math.random() + "$", o = function(e) { e.source === t && "string" == typeof e.data && 0 === e.data.indexOf(a) && m(+e.data.slice(a.length)) }, t.addEventListener ? t.addEventListener("message", o, !1) : t.attachEvent("onmessage", o), i = function(e) { t.postMessage(a + e, "*") }), f.setImmediate = function(t) { "function" != typeof t && (t = new Function("" + t)); for (var e = new Array(arguments.length - 1), r = 0; r < e.length; r++) e[r] = arguments[r + 1]; var s = { callback: t, args: e }; return u[h] = s, i(h), h++ }, f.clearImmediate = d
                }

                function d(t) { delete u[t] }

                function m(t) {
                    if (l) setTimeout(m, 0, t);
                    else {
                        var e = u[t];
                        if (e) {
                            l = !0;
                            try {
                                ! function(t) {
                                    var e = t.callback,
                                        i = t.args;
                                    switch (i.length) {
                                        case 0:
                                            e();
                                            break;
                                        case 1:
                                            e(i[0]);
                                            break;
                                        case 2:
                                            e(i[0], i[1]);
                                            break;
                                        case 3:
                                            e(i[0], i[1], i[2]);
                                            break;
                                        default:
                                            e.apply(r, i)
                                    }
                                }(e)
                            } finally { d(t), l = !1 }
                        }
                    }
                }
            }("undefined" == typeof self ? void 0 === t ? this : t : self)
        }).call(this, r(2), r(7))
    }, function(t, e, r) {
        (function(t) {
            var i = void 0 !== t && t || "undefined" != typeof self && self || window,
                s = Function.prototype.apply;

            function n(t, e) { this._id = t, this._clearFn = e }
            e.setTimeout = function() { return new n(s.call(setTimeout, i, arguments), clearTimeout) }, e.setInterval = function() { return new n(s.call(setInterval, i, arguments), clearInterval) }, e.clearTimeout = e.clearInterval = function(t) { t && t.close() }, n.prototype.unref = n.prototype.ref = function() {}, n.prototype.close = function() { this._clearFn.call(i, this._id) }, e.enroll = function(t, e) { clearTimeout(t._idleTimeoutId), t._idleTimeout = e }, e.unenroll = function(t) { clearTimeout(t._idleTimeoutId), t._idleTimeout = -1 }, e._unrefActive = e.active = function(t) {
                clearTimeout(t._idleTimeoutId);
                var e = t._idleTimeout;
                e >= 0 && (t._idleTimeoutId = setTimeout(function() { t._onTimeout && t._onTimeout() }, e))
            }, r(104), e.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== t && t.setImmediate || this && this.setImmediate, e.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== t && t.clearImmediate || this && this.clearImmediate
        }).call(this, r(2))
    }, function(t, e) {}, function(t, e, r) {
        "use strict";
        var i = r(18).Buffer,
            s = r(106);
        t.exports = function() {
            function t() {! function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, t), this.head = null, this.tail = null, this.length = 0 }
            return t.prototype.push = function(t) {
                var e = { data: t, next: null };
                this.length > 0 ? this.tail.next = e : this.head = e, this.tail = e, ++this.length
            }, t.prototype.unshift = function(t) {
                var e = { data: t, next: this.head };
                0 === this.length && (this.tail = e), this.head = e, ++this.length
            }, t.prototype.shift = function() { if (0 !== this.length) { var t = this.head.data; return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, t } }, t.prototype.clear = function() { this.head = this.tail = null, this.length = 0 }, t.prototype.join = function(t) { if (0 === this.length) return ""; for (var e = this.head, r = "" + e.data; e = e.next;) r += t + e.data; return r }, t.prototype.concat = function(t) { if (0 === this.length) return i.alloc(0); if (1 === this.length) return this.head.data; for (var e, r, s, n = i.allocUnsafe(t >>> 0), a = this.head, o = 0; a;) e = a.data, r = n, s = o, e.copy(r, s), o += a.data.length, a = a.next; return n }, t
        }(), s && s.inspect && s.inspect.custom && (t.exports.prototype[s.inspect.custom] = function() { var t = s.inspect({ length: this.length }); return this.constructor.name + " " + t })
    }, function(t, e) {}, function(t, e, r) {
        t.exports = s;
        var i = r(14).EventEmitter;

        function s() { i.call(this) }
        r(8)(s, i), s.Readable = r(27), s.Writable = r(101), s.Duplex = r(100), s.Transform = r(99), s.PassThrough = r(98), s.Stream = s, s.prototype.pipe = function(t, e) {
            var r = this;

            function s(e) { t.writable && !1 === t.write(e) && r.pause && r.pause() }

            function n() { r.readable && r.resume && r.resume() }
            r.on("data", s), t.on("drain", n), t._isStdio || e && !1 === e.end || (r.on("end", o), r.on("close", h));
            var a = !1;

            function o() { a || (a = !0, t.end()) }

            function h() { a || (a = !0, "function" == typeof t.destroy && t.destroy()) }

            function u(t) { if (l(), 0 === i.listenerCount(this, "error")) throw t }

            function l() { r.removeListener("data", s), t.removeListener("drain", n), r.removeListener("end", o), r.removeListener("close", h), r.removeListener("error", u), t.removeListener("error", u), r.removeListener("end", l), r.removeListener("close", l), t.removeListener("close", l) }
            return r.on("error", u), t.on("error", u), r.on("end", l), r.on("close", l), t.on("close", l), t.emit("pipe", r), t
        }
    }, function(t, e) {
        e.read = function(t, e, r, i, s) {
            var n, a, o = 8 * s - i - 1,
                h = (1 << o) - 1,
                u = h >> 1,
                l = -7,
                c = r ? s - 1 : 0,
                f = r ? -1 : 1,
                d = t[e + c];
            for (c += f, n = d & (1 << -l) - 1, d >>= -l, l += o; l > 0; n = 256 * n + t[e + c], c += f, l -= 8);
            for (a = n & (1 << -l) - 1, n >>= -l, l += i; l > 0; a = 256 * a + t[e + c], c += f, l -= 8);
            if (0 === n) n = 1 - u;
            else {
                if (n === h) return a ? NaN : 1 / 0 * (d ? -1 : 1);
                a += Math.pow(2, i), n -= u
            }
            return (d ? -1 : 1) * a * Math.pow(2, n - i)
        }, e.write = function(t, e, r, i, s, n) {
            var a, o, h, u = 8 * n - s - 1,
                l = (1 << u) - 1,
                c = l >> 1,
                f = 23 === s ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                d = i ? 0 : n - 1,
                m = i ? 1 : -1,
                p = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
            for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (o = isNaN(e) ? 1 : 0, a = l) : (a = Math.floor(Math.log(e) / Math.LN2), e * (h = Math.pow(2, -a)) < 1 && (a--, h *= 2), (e += a + c >= 1 ? f / h : f * Math.pow(2, 1 - c)) * h >= 2 && (a++, h /= 2), a + c >= l ? (o = 0, a = l) : a + c >= 1 ? (o = (e * h - 1) * Math.pow(2, s), a += c) : (o = e * Math.pow(2, c - 1) * Math.pow(2, s), a = 0)); s >= 8; t[r + d] = 255 & o, d += m, o /= 256, s -= 8);
            for (a = a << s | o, u += s; u > 0; t[r + d] = 255 & a, d += m, a /= 256, u -= 8);
            t[r + d - m] |= 128 * p
        }
    }, function(t, e, r) {
        "use strict";
        e.byteLength = function(t) {
            var e = u(t),
                r = e[0],
                i = e[1];
            return 3 * (r + i) / 4 - i
        }, e.toByteArray = function(t) {
            for (var e, r = u(t), i = r[0], a = r[1], o = new n(function(t, e, r) { return 3 * (e + r) / 4 - r }(0, i, a)), h = 0, l = a > 0 ? i - 4 : i, c = 0; c < l; c += 4) e = s[t.charCodeAt(c)] << 18 | s[t.charCodeAt(c + 1)] << 12 | s[t.charCodeAt(c + 2)] << 6 | s[t.charCodeAt(c + 3)], o[h++] = e >> 16 & 255, o[h++] = e >> 8 & 255, o[h++] = 255 & e;
            2 === a && (e = s[t.charCodeAt(c)] << 2 | s[t.charCodeAt(c + 1)] >> 4, o[h++] = 255 & e);
            1 === a && (e = s[t.charCodeAt(c)] << 10 | s[t.charCodeAt(c + 1)] << 4 | s[t.charCodeAt(c + 2)] >> 2, o[h++] = e >> 8 & 255, o[h++] = 255 & e);
            return o
        }, e.fromByteArray = function(t) {
            for (var e, r = t.length, s = r % 3, n = [], a = 0, o = r - s; a < o; a += 16383) n.push(l(t, a, a + 16383 > o ? o : a + 16383));
            1 === s ? (e = t[r - 1], n.push(i[e >> 2] + i[e << 4 & 63] + "==")) : 2 === s && (e = (t[r - 2] << 8) + t[r - 1], n.push(i[e >> 10] + i[e >> 4 & 63] + i[e << 2 & 63] + "="));
            return n.join("")
        };
        for (var i = [], s = [], n = "undefined" != typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, h = a.length; o < h; ++o) i[o] = a[o], s[a.charCodeAt(o)] = o;

        function u(t) { var e = t.length; if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4"); var r = t.indexOf("="); return -1 === r && (r = e), [r, r === e ? 0 : 4 - r % 4] }

        function l(t, e, r) { for (var s, n, a = [], o = e; o < r; o += 3) s = (t[o] << 16 & 16711680) + (t[o + 1] << 8 & 65280) + (255 & t[o + 2]), a.push(i[(n = s) >> 18 & 63] + i[n >> 12 & 63] + i[n >> 6 & 63] + i[63 & n]); return a.join("") }
        s["-".charCodeAt(0)] = 62, s["_".charCodeAt(0)] = 63
    }, function(t, e, r) {
        "use strict";
        var i = r(9),
            s = r(0),
            n = r(1),
            a = r(45),
            o = r(44),
            h = r(23),
            u = r(79),
            l = r(78),
            c = r(17),
            f = r(66),
            d = function(t, e, r) {
                var i, a = s.getTypeOf(e),
                    l = s.extend(r || {}, o);
                l.date = l.date || new Date, null !== l.compression && (l.compression = l.compression.toUpperCase()), "string" == typeof l.unixPermissions && (l.unixPermissions = parseInt(l.unixPermissions, 8)), l.unixPermissions && 16384 & l.unixPermissions && (l.dir = !0), l.dosPermissions && 16 & l.dosPermissions && (l.dir = !0), l.dir && (t = p(t)), l.createFolders && (i = m(t)) && g.call(this, i, !0);
                var d = "string" === a && !1 === l.binary && !1 === l.base64;
                r && void 0 !== r.binary || (l.binary = !d), (e instanceof h && 0 === e.uncompressedSize || l.dir || !e || 0 === e.length) && (l.base64 = !1, l.binary = !0, e = "", l.compression = "STORE", a = "string");
                var y = null;
                y = e instanceof h || e instanceof n ? e : c.isNode && c.isStream(e) ? new f(t, e) : s.prepareContent(t, e, l.binary, l.optimizedBinaryString, l.base64);
                var C = new u(t, y, l);
                this.files[t] = C
            },
            m = function(t) { "/" === t.slice(-1) && (t = t.substring(0, t.length - 1)); var e = t.lastIndexOf("/"); return e > 0 ? t.substring(0, e) : "" },
            p = function(t) { return "/" !== t.slice(-1) && (t += "/"), t },
            g = function(t, e) { return e = void 0 !== e ? e : o.createFolders, t = p(t), this.files[t] || d.call(this, t, null, { dir: !0, createFolders: e }), this.files[t] };

        function y(t) { return "[object RegExp]" === Object.prototype.toString.call(t) }
        var C = {
            load: function() { throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.") },
            forEach: function(t) { var e, r, i; for (e in this.files) this.files.hasOwnProperty(e) && (i = this.files[e], (r = e.slice(this.root.length, e.length)) && e.slice(0, this.root.length) === this.root && t(r, i)) },
            filter: function(t) { var e = []; return this.forEach(function(r, i) { t(r, i) && e.push(i) }), e },
            file: function(t, e, r) { if (1 === arguments.length) { if (y(t)) { var i = t; return this.filter(function(t, e) { return !e.dir && i.test(t) }) } var s = this.files[this.root + t]; return s && !s.dir ? s : null } return t = this.root + t, d.call(this, t, e, r), this },
            folder: function(t) {
                if (!t) return this;
                if (y(t)) return this.filter(function(e, r) { return r.dir && t.test(e) });
                var e = this.root + t,
                    r = g.call(this, e),
                    i = this.clone();
                return i.root = r.name, i
            },
            remove: function(t) {
                t = this.root + t;
                var e = this.files[t];
                if (e || ("/" !== t.slice(-1) && (t += "/"), e = this.files[t]), e && !e.dir) delete this.files[t];
                else
                    for (var r = this.filter(function(e, r) { return r.name.slice(0, t.length) === t }), i = 0; i < r.length; i++) delete this.files[r[i].name];
                return this
            },
            generate: function(t) { throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.") },
            generateInternalStream: function(t) {
                var e, r = {};
                try {
                    if ((r = s.extend(t || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: i.utf8encode })).type = r.type.toLowerCase(), r.compression = r.compression.toUpperCase(), "binarystring" === r.type && (r.type = "string"), !r.type) throw new Error("No output type specified.");
                    s.checkSupport(r.type), "darwin" !== r.platform && "freebsd" !== r.platform && "linux" !== r.platform && "sunos" !== r.platform || (r.platform = "UNIX"), "win32" === r.platform && (r.platform = "DOS");
                    var o = r.comment || this.comment || "";
                    e = l.generateWorker(this, r, o)
                } catch (t) {
                    (e = new n("error")).error(t)
                }
                return new a(e, r.type || "string", r.mimeType)
            },
            generateAsync: function(t, e) { return this.generateInternalStream(t).accumulate(e) },
            generateNodeStream: function(t, e) { return (t = t || {}).type || (t.type = "nodebuffer"), this.generateInternalStream(t).toNodejsStream(e) }
        };
        t.exports = C
    }, function(t, e, r) {
        "use strict";

        function i() {
            if (!(this instanceof i)) return new i;
            if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
            this.files = {}, this.comment = null, this.root = "", this.clone = function() { var t = new i; for (var e in this) "function" != typeof this[e] && (t[e] = this[e]); return t }
        }
        i.prototype = r(112), i.prototype.loadAsync = r(65), i.support = r(4), i.defaults = r(44), i.version = "3.1.5", i.loadAsync = function(t, e) { return (new i).loadAsync(t, e) }, i.external = r(11), t.exports = i
    }, function(t, e) {
        (function(e) { t.exports = e }).call(this, {})
    }, function(t, e) { t.exports = function() { throw new Error("define cannot be used indirect") } }, function(t, e, r) {
        var i, s = s || function(t) {
            "use strict";
            if (!(void 0 === t || "undefined" != typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent))) {
                var e = function() { return t.URL || t.webkitURL || t },
                    r = t.document.createElementNS("http://www.w3.org/1999/xhtml", "a"),
                    i = "download" in r,
                    s = /constructor/i.test(t.HTMLElement) || t.safari,
                    n = /CriOS\/[\d]+/.test(navigator.userAgent),
                    a = function(e) {
                        (t.setImmediate || t.setTimeout)(function() { throw e }, 0)
                    },
                    o = function(t) { setTimeout(function() { "string" == typeof t ? e().revokeObjectURL(t) : t.remove() }, 4e4) },
                    h = function(t) { return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type) ? new Blob([String.fromCharCode(65279), t], { type: t.type }) : t },
                    u = function(u, l, c) {
                        c || (u = h(u));
                        var f, d = this,
                            m = "application/octet-stream" === u.type,
                            p = function() {! function(t, e, r) { for (var i = (e = [].concat(e)).length; i--;) { var s = t["on" + e[i]]; if ("function" == typeof s) try { s.call(t, r || t) } catch (t) { a(t) } } }(d, "writestart progress write writeend".split(" ")) };
                        if (d.readyState = d.INIT, i) return f = e().createObjectURL(u), void setTimeout(function() {
                            var t, e;
                            r.href = f, r.download = l, t = r, e = new MouseEvent("click"), t.dispatchEvent(e), p(), o(f), d.readyState = d.DONE
                        });
                        ! function() {
                            if ((n || m && s) && t.FileReader) {
                                var r = new FileReader;
                                return r.onloadend = function() {
                                    var e = n ? r.result : r.result.replace(/^data:[^;]*;/, "data:attachment/file;");
                                    t.open(e, "_blank") || (t.location.href = e), e = void 0, d.readyState = d.DONE, p()
                                }, r.readAsDataURL(u), void(d.readyState = d.INIT)
                            }
                            f || (f = e().createObjectURL(u)), m ? t.location.href = f : t.open(f, "_blank") || (t.location.href = f);
                            d.readyState = d.DONE, p(), o(f)
                        }()
                    },
                    l = u.prototype;
                return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ? function(t, e, r) { return e = e || t.name || "download", r || (t = h(t)), navigator.msSaveOrOpenBlob(t, e) } : (l.abort = function() {}, l.readyState = l.INIT = 0, l.WRITING = 1, l.DONE = 2, l.error = l.onwritestart = l.onprogress = l.onwrite = l.onabort = l.onerror = l.onwriteend = null, function(t, e, r) { return new u(t, e || t.name || "download", r) })
            }
        }("undefined" != typeof self && self || "undefined" != typeof window && window || this.content);
        /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
        void 0 !== t && t.exports ? t.exports.saveAs = s : null !== r(115) && null !== r(114) && (void 0 === (i = function() { return s }.call(e, r, e, t)) || (t.exports = i))
    }])
});