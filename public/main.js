!(function (e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var t;
        (t =
            "undefined" != typeof window
                ? window
                : "undefined" != typeof global
                ? global
                : "undefined" != typeof self
                ? self
                : this),
            (t.hCard = e());
    }
})(function () {
    return (function e(t, n, r) {
        function i(s, a) {
            if (!n[s]) {
                if (!t[s]) {
                    var l = "function" == typeof require && require;
                    if (!a && l) return l(s, !0);
                    if (o) return o(s, !0);
                    var u = new Error("Cannot find module '" + s + "'");
                    throw ((u.code = "MODULE_NOT_FOUND"), u);
                }
                var c = (n[s] = { exports: {} });
                t[s][0].call(
                    c.exports,
                    function (e) {
                        var n = t[s][1][e];
                        return i(n ? n : e);
                    },
                    c,
                    c.exports,
                    e,
                    t,
                    n,
                    r
                );
            }
            return n[s].exports;
        }
        for (
            var o = "function" == typeof require && require, s = 0;
            s < r.length;
            s++
        )
            i(r[s]);
        return i;
    })(
        {
            1: [
                function (e, t, n) {
                    function r() {
                        (this._events = this._events || {}),
                            (this._maxListeners = this._maxListeners || void 0);
                    }
                    function i(e) {
                        return "function" == typeof e;
                    }
                    function o(e) {
                        return "number" == typeof e;
                    }
                    function s(e) {
                        return "object" == typeof e && null !== e;
                    }
                    function a(e) {
                        return void 0 === e;
                    }
                    (t.exports = r),
                        (r.EventEmitter = r),
                        (r.prototype._events = void 0),
                        (r.prototype._maxListeners = void 0),
                        (r.defaultMaxListeners = 10),
                        (r.prototype.setMaxListeners = function (e) {
                            if (!o(e) || e < 0 || isNaN(e))
                                throw TypeError("n must be a positive number");
                            return (this._maxListeners = e), this;
                        }),
                        (r.prototype.emit = function (e) {
                            var t, n, r, o, l, u;
                            if (
                                (this._events || (this._events = {}),
                                "error" === e &&
                                    (!this._events.error ||
                                        (s(this._events.error) &&
                                            !this._events.error.length)))
                            ) {
                                if (((t = arguments[1]), t instanceof Error))
                                    throw t;
                                var c = new Error(
                                    'Uncaught, unspecified "error" event. (' +
                                        t +
                                        ")"
                                );
                                throw ((c.context = t), c);
                            }
                            if (((n = this._events[e]), a(n))) return !1;
                            if (i(n))
                                switch (arguments.length) {
                                    case 1:
                                        n.call(this);
                                        break;
                                    case 2:
                                        n.call(this, arguments[1]);
                                        break;
                                    case 3:
                                        n.call(
                                            this,
                                            arguments[1],
                                            arguments[2]
                                        );
                                        break;
                                    default:
                                        (o = Array.prototype.slice.call(
                                            arguments,
                                            1
                                        )),
                                            n.apply(this, o);
                                }
                            else if (s(n))
                                for (
                                    o = Array.prototype.slice.call(
                                        arguments,
                                        1
                                    ),
                                        u = n.slice(),
                                        r = u.length,
                                        l = 0;
                                    l < r;
                                    l++
                                )
                                    u[l].apply(this, o);
                            return !0;
                        }),
                        (r.prototype.addListener = function (e, t) {
                            var n;
                            if (!i(t))
                                throw TypeError("listener must be a function");
                            return (
                                this._events || (this._events = {}),
                                this._events.newListener &&
                                    this.emit(
                                        "newListener",
                                        e,
                                        i(t.listener) ? t.listener : t
                                    ),
                                this._events[e]
                                    ? s(this._events[e])
                                        ? this._events[e].push(t)
                                        : (this._events[e] = [
                                              this._events[e],
                                              t,
                                          ])
                                    : (this._events[e] = t),
                                s(this._events[e]) &&
                                    !this._events[e].warned &&
                                    ((n = a(this._maxListeners)
                                        ? r.defaultMaxListeners
                                        : this._maxListeners),
                                    n &&
                                        n > 0 &&
                                        this._events[e].length > n &&
                                        ((this._events[e].warned = !0),
                                        console.error(
                                            "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
                                            this._events[e].length
                                        ),
                                        "function" == typeof console.trace &&
                                            console.trace())),
                                this
                            );
                        }),
                        (r.prototype.on = r.prototype.addListener),
                        (r.prototype.once = function (e, t) {
                            function n() {
                                this.removeListener(e, n),
                                    r || ((r = !0), t.apply(this, arguments));
                            }
                            if (!i(t))
                                throw TypeError("listener must be a function");
                            var r = !1;
                            return (n.listener = t), this.on(e, n), this;
                        }),
                        (r.prototype.removeListener = function (e, t) {
                            var n, r, o, a;
                            if (!i(t))
                                throw TypeError("listener must be a function");
                            if (!this._events || !this._events[e]) return this;
                            if (
                                ((n = this._events[e]),
                                (o = n.length),
                                (r = -1),
                                n === t || (i(n.listener) && n.listener === t))
                            )
                                delete this._events[e],
                                    this._events.removeListener &&
                                        this.emit("removeListener", e, t);
                            else if (s(n)) {
                                for (a = o; a-- > 0; )
                                    if (
                                        n[a] === t ||
                                        (n[a].listener && n[a].listener === t)
                                    ) {
                                        r = a;
                                        break;
                                    }
                                if (r < 0) return this;
                                1 === n.length
                                    ? ((n.length = 0), delete this._events[e])
                                    : n.splice(r, 1),
                                    this._events.removeListener &&
                                        this.emit("removeListener", e, t);
                            }
                            return this;
                        }),
                        (r.prototype.removeAllListeners = function (e) {
                            var t, n;
                            if (!this._events) return this;
                            if (!this._events.removeListener)
                                return (
                                    0 === arguments.length
                                        ? (this._events = {})
                                        : this._events[e] &&
                                          delete this._events[e],
                                    this
                                );
                            if (0 === arguments.length) {
                                for (t in this._events)
                                    "removeListener" !== t &&
                                        this.removeAllListeners(t);
                                return (
                                    this.removeAllListeners("removeListener"),
                                    (this._events = {}),
                                    this
                                );
                            }
                            if (((n = this._events[e]), i(n)))
                                this.removeListener(e, n);
                            else if (n)
                                for (; n.length; )
                                    this.removeListener(e, n[n.length - 1]);
                            return delete this._events[e], this;
                        }),
                        (r.prototype.listeners = function (e) {
                            var t;
                            return (t =
                                this._events && this._events[e]
                                    ? i(this._events[e])
                                        ? [this._events[e]]
                                        : this._events[e].slice()
                                    : []);
                        }),
                        (r.prototype.listenerCount = function (e) {
                            if (this._events) {
                                var t = this._events[e];
                                if (i(t)) return 1;
                                if (t) return t.length;
                            }
                            return 0;
                        }),
                        (r.listenerCount = function (e, t) {
                            return e.listenerCount(t);
                        });
                },
                {},
            ],
            2: [
                function (e, t, n) {
                    t.exports.Dispatcher = e("./lib/Dispatcher");
                },
                { "./lib/Dispatcher": 3 },
            ],
            3: [
                function (e, t, n) {
                    (function (r) {
                        "use strict";
                        function i(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError(
                                    "Cannot call a class as a function"
                                );
                        }
                        n.__esModule = !0;
                        var o = e("fbjs/lib/invariant"),
                            s = "ID_",
                            a = (function () {
                                function e() {
                                    i(this, e),
                                        (this._callbacks = {}),
                                        (this._isDispatching = !1),
                                        (this._isHandled = {}),
                                        (this._isPending = {}),
                                        (this._lastID = 1);
                                }
                                return (
                                    (e.prototype.register = function (e) {
                                        var t = s + this._lastID++;
                                        return (this._callbacks[t] = e), t;
                                    }),
                                    (e.prototype.unregister = function (e) {
                                        this._callbacks[e]
                                            ? void 0
                                            : "production" !== r.env.NODE_ENV
                                            ? o(
                                                  !1,
                                                  "Dispatcher.unregister(...): `%s` does not map to a registered callback.",
                                                  e
                                              )
                                            : o(!1),
                                            delete this._callbacks[e];
                                    }),
                                    (e.prototype.waitFor = function (e) {
                                        this._isDispatching
                                            ? void 0
                                            : "production" !== r.env.NODE_ENV
                                            ? o(
                                                  !1,
                                                  "Dispatcher.waitFor(...): Must be invoked while dispatching."
                                              )
                                            : o(!1);
                                        for (var t = 0; t < e.length; t++) {
                                            var n = e[t];
                                            this._isPending[n]
                                                ? this._isHandled[n]
                                                    ? void 0
                                                    : "production" !==
                                                      r.env.NODE_ENV
                                                    ? o(
                                                          !1,
                                                          "Dispatcher.waitFor(...): Circular dependency detected while waiting for `%s`.",
                                                          n
                                                      )
                                                    : o(!1)
                                                : (this._callbacks[n]
                                                      ? void 0
                                                      : "production" !==
                                                        r.env.NODE_ENV
                                                      ? o(
                                                            !1,
                                                            "Dispatcher.waitFor(...): `%s` does not map to a registered callback.",
                                                            n
                                                        )
                                                      : o(!1),
                                                  this._invokeCallback(n));
                                        }
                                    }),
                                    (e.prototype.dispatch = function (e) {
                                        this._isDispatching
                                            ? "production" !== r.env.NODE_ENV
                                                ? o(
                                                      !1,
                                                      "Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch."
                                                  )
                                                : o(!1)
                                            : void 0,
                                            this._startDispatching(e);
                                        try {
                                            for (var t in this._callbacks)
                                                this._isPending[t] ||
                                                    this._invokeCallback(t);
                                        } finally {
                                            this._stopDispatching();
                                        }
                                    }),
                                    (e.prototype.isDispatching = function () {
                                        return this._isDispatching;
                                    }),
                                    (e.prototype._invokeCallback = function (
                                        e
                                    ) {
                                        (this._isPending[e] = !0),
                                            this._callbacks[e](
                                                this._pendingPayload
                                            ),
                                            (this._isHandled[e] = !0);
                                    }),
                                    (e.prototype._startDispatching = function (
                                        e
                                    ) {
                                        for (var t in this._callbacks)
                                            (this._isPending[t] = !1),
                                                (this._isHandled[t] = !1);
                                        (this._pendingPayload = e),
                                            (this._isDispatching = !0);
                                    }),
                                    (e.prototype._stopDispatching =
                                        function () {
                                            delete this._pendingPayload,
                                                (this._isDispatching = !1);
                                        }),
                                    e
                                );
                            })();
                        t.exports = a;
                    }.call(this, e("_process")));
                },
                { _process: 5, "fbjs/lib/invariant": 4 },
            ],
            4: [
                function (e, t, n) {
                    (function (e) {
                        "use strict";
                        var n = function (t, n, r, i, o, s, a, l) {
                            if ("production" !== e.env.NODE_ENV && void 0 === n)
                                throw new Error(
                                    "invariant requires an error message argument"
                                );
                            if (!t) {
                                var u;
                                if (void 0 === n)
                                    u = new Error(
                                        "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
                                    );
                                else {
                                    var c = [r, i, o, s, a, l],
                                        f = 0;
                                    u = new Error(
                                        "Invariant Violation: " +
                                            n.replace(/%s/g, function () {
                                                return c[f++];
                                            })
                                    );
                                }
                                throw ((u.framesToPop = 1), u);
                            }
                        };
                        t.exports = n;
                    }.call(this, e("_process")));
                },
                { _process: 5 },
            ],
            5: [
                function (e, t, n) {
                    function r() {
                        throw new Error("setTimeout has not been defined");
                    }
                    function i() {
                        throw new Error("clearTimeout has not been defined");
                    }
                    function o(e) {
                        if (f === setTimeout) return setTimeout(e, 0);
                        if ((f === r || !f) && setTimeout)
                            return (f = setTimeout), setTimeout(e, 0);
                        try {
                            return f(e, 0);
                        } catch (t) {
                            try {
                                return f.call(null, e, 0);
                            } catch (t) {
                                return f.call(this, e, 0);
                            }
                        }
                    }
                    function s(e) {
                        if (d === clearTimeout) return clearTimeout(e);
                        if ((d === i || !d) && clearTimeout)
                            return (d = clearTimeout), clearTimeout(e);
                        try {
                            return d(e);
                        } catch (t) {
                            try {
                                return d.call(null, e);
                            } catch (t) {
                                return d.call(this, e);
                            }
                        }
                    }
                    function a() {
                        _ &&
                            h &&
                            ((_ = !1),
                            h.length ? (v = h.concat(v)) : (y = -1),
                            v.length && l());
                    }
                    function l() {
                        if (!_) {
                            var e = o(a);
                            _ = !0;
                            for (var t = v.length; t; ) {
                                for (h = v, v = []; ++y < t; ) h && h[y].run();
                                (y = -1), (t = v.length);
                            }
                            (h = null), (_ = !1), s(e);
                        }
                    }
                    function u(e, t) {
                        (this.fun = e), (this.array = t);
                    }
                    function c() {}
                    var f,
                        d,
                        p = (t.exports = {});
                    !(function () {
                        try {
                            f =
                                "function" == typeof setTimeout
                                    ? setTimeout
                                    : r;
                        } catch (e) {
                            f = r;
                        }
                        try {
                            d =
                                "function" == typeof clearTimeout
                                    ? clearTimeout
                                    : i;
                        } catch (e) {
                            d = i;
                        }
                    })();
                    var h,
                        v = [],
                        _ = !1,
                        y = -1;
                    (p.nextTick = function (e) {
                        var t = new Array(arguments.length - 1);
                        if (arguments.length > 1)
                            for (var n = 1; n < arguments.length; n++)
                                t[n - 1] = arguments[n];
                        v.push(new u(e, t)), 1 !== v.length || _ || o(l);
                    }),
                        (u.prototype.run = function () {
                            this.fun.apply(null, this.array);
                        }),
                        (p.title = "browser"),
                        (p.browser = !0),
                        (p.env = {}),
                        (p.argv = []),
                        (p.version = ""),
                        (p.versions = {}),
                        (p.on = c),
                        (p.addListener = c),
                        (p.once = c),
                        (p.off = c),
                        (p.removeListener = c),
                        (p.removeAllListeners = c),
                        (p.emit = c),
                        (p.binding = function (e) {
                            throw new Error("process.binding is not supported");
                        }),
                        (p.cwd = function () {
                            return "/";
                        }),
                        (p.chdir = function (e) {
                            throw new Error("process.chdir is not supported");
                        }),
                        (p.umask = function () {
                            return 0;
                        });
                },
                {},
            ],
            6: [
                function (e, t, n) {
                    "use strict";
                    function r(e) {
                        if (e && e.__esModule) return e;
                        var t = {};
                        if (null != e)
                            for (var n in e)
                                Object.prototype.hasOwnProperty.call(e, n) &&
                                    (t[n] = e[n]);
                        return (t.default = e), t;
                    }
                    function i(e) {
                        return e && e.__esModule ? e : { default: e };
                    }
                    Object.defineProperty(n, "__esModule", { value: !0 });
                    var o = e("../dispatcher/Dispatcher.js"),
                        s = i(o),
                        a = e("../constants/Constants.js"),
                        l = r(a),
                        u = {
                            updateFields: function (e, t) {
                                s.default.dispatch({
                                    actions: l.UPDATE_FIELD,
                                    field_id: e,
                                    value: t,
                                });
                            },
                            blurField: function (e) {
                                console.log("blurField"),
                                    s.default.dispatch({
                                        actions: l.BLUR_FIELD,
                                        field: e,
                                        value: "hi",
                                    });
                            },
                        };
                    n.default = u;
                },
                {
                    "../constants/Constants.js": 13,
                    "../dispatcher/Dispatcher.js": 14,
                },
            ],
            7: [
                function (e, t, n) {
                    (function (t) {
                        "use strict";
                        function r(e) {
                            return e && e.__esModule ? e : { default: e };
                        }
                        function i(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError(
                                    "Cannot call a class as a function"
                                );
                        }
                        function o(e, t) {
                            if (!e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return !t ||
                                ("object" != typeof t && "function" != typeof t)
                                ? e
                                : t;
                        }
                        function s(e, t) {
                            if ("function" != typeof t && null !== t)
                                throw new TypeError(
                                    "Super expression must either be null or a function, not " +
                                        typeof t
                                );
                            (e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0,
                                },
                            })),
                                t &&
                                    (Object.setPrototypeOf
                                        ? Object.setPrototypeOf(e, t)
                                        : (e.__proto__ = t));
                        }
                        Object.defineProperty(n, "__esModule", { value: !0 });
                        var a = (function () {
                                function e(e, t) {
                                    for (var n = 0; n < t.length; n++) {
                                        var r = t[n];
                                        (r.enumerable = r.enumerable || !1),
                                            (r.configurable = !0),
                                            "value" in r && (r.writable = !0),
                                            Object.defineProperty(e, r.key, r);
                                    }
                                }
                                return function (t, n, r) {
                                    return (
                                        n && e(t.prototype, n), r && e(t, r), t
                                    );
                                };
                            })(),
                            l =
                                "undefined" != typeof window
                                    ? window.React
                                    : "undefined" != typeof t
                                    ? t.React
                                    : null,
                            u = r(l),
                            c = e("./stores/HcardStore.js"),
                            f = r(c),
                            d = e("./components/HcardForm.js"),
                            p = r(d),
                            h = e("./components/HcardPreview.js"),
                            v = r(h),
                            _ = (function (e) {
                                function t(e) {
                                    i(this, t);
                                    var n = o(
                                        this,
                                        (
                                            t.__proto__ ||
                                            Object.getPrototypeOf(t)
                                        ).call(this, e)
                                    );
                                    return (
                                        f.default.setFields(e),
                                        (n.state = {
                                            fields: f.default.fields,
                                        }),
                                        (n.stateUpdated = function () {
                                            n.setState({
                                                fields: f.default.fields,
                                            });
                                        }),
                                        (n.onBlur = function (e) {
                                            fetch("/update", {
                                                method: "POST",
                                                body:
                                                    e +
                                                    "=" +
                                                    encodeURIComponent(
                                                        f.default.fields[e]
                                                            .value
                                                    ),
                                                headers: {
                                                    "content-type":
                                                        "application/x-www-form-urlencoded",
                                                },
                                            }).catch(function (e) {
                                                return console.error(e);
                                            });
                                        }),
                                        n
                                    );
                                }
                                return (
                                    s(t, e),
                                    a(t, [
                                        {
                                            key: "render",
                                            value: function () {
                                                return u.default.createElement(
                                                    "div",
                                                    { className: "container" },
                                                    u.default.createElement(
                                                        "div",
                                                        {
                                                            className:
                                                                "hcardForm col-md-6",
                                                        },
                                                        u.default.createElement(
                                                            p.default,
                                                            {
                                                                fields: this
                                                                    .state
                                                                    .fields,
                                                                onBlur: this
                                                                    .onBlur,
                                                            }
                                                        )
                                                    ),
                                                    u.default.createElement(
                                                        "div",
                                                        {
                                                            className:
                                                                "hcardPreview col-md-6",
                                                        },
                                                        u.default.createElement(
                                                            v.default,
                                                            {
                                                                fields: this
                                                                    .state
                                                                    .fields,
                                                            }
                                                        )
                                                    )
                                                );
                                            },
                                        },
                                    ]),
                                    t
                                );
                            })(u.default.Component);
                        n.default = _;
                    }.call(
                        this,
                        "undefined" != typeof global
                            ? global
                            : "undefined" != typeof self
                            ? self
                            : "undefined" != typeof window
                            ? window
                            : {}
                    ));
                },
                {
                    "./components/HcardForm.js": 8,
                    "./components/HcardPreview.js": 12,
                    "./stores/HcardStore.js": 15,
                },
            ],
            8: [
                function (e, t, n) {
                    (function (t) {
                        "use strict";
                        function r(e) {
                            return e && e.__esModule ? e : { default: e };
                        }
                        function i(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError(
                                    "Cannot call a class as a function"
                                );
                        }
                        function o(e, t) {
                            if (!e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return !t ||
                                ("object" != typeof t && "function" != typeof t)
                                ? e
                                : t;
                        }
                        function s(e, t) {
                            if ("function" != typeof t && null !== t)
                                throw new TypeError(
                                    "Super expression must either be null or a function, not " +
                                        typeof t
                                );
                            (e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0,
                                },
                            })),
                                t &&
                                    (Object.setPrototypeOf
                                        ? Object.setPrototypeOf(e, t)
                                        : (e.__proto__ = t));
                        }
                        Object.defineProperty(n, "__esModule", { value: !0 });
                        var a = (function () {
                                function e(e, t) {
                                    for (var n = 0; n < t.length; n++) {
                                        var r = t[n];
                                        (r.enumerable = r.enumerable || !1),
                                            (r.configurable = !0),
                                            "value" in r && (r.writable = !0),
                                            Object.defineProperty(e, r.key, r);
                                    }
                                }
                                return function (t, n, r) {
                                    return (
                                        n && e(t.prototype, n), r && e(t, r), t
                                    );
                                };
                            })(),
                            l =
                                "undefined" != typeof window
                                    ? window.React
                                    : "undefined" != typeof t
                                    ? t.React
                                    : null,
                            u = r(l),
                            c = e("./HcardForm/FormSection.js"),
                            f = r(c),
                            d = e("../actions/Actions.js"),
                            p = r(d),
                            h = (function (e) {
                                function t(e, n) {
                                    i(this, t);
                                    var r = o(
                                        this,
                                        (
                                            t.__proto__ ||
                                            Object.getPrototypeOf(t)
                                        ).call(this, e, n)
                                    );
                                    return (
                                        (r.personalDetailsFields = [
                                            "givenName",
                                            "surname",
                                            "email",
                                            "phone",
                                        ]),
                                        (r.addressFields = [
                                            "houseNumber",
                                            "street",
                                            "suburb",
                                            "state",
                                            "postcode",
                                            "country",
                                        ]),
                                        (r.uploadAvatar = function (e) {
                                            var t = e.target;
                                            if (t.files && t.files[0]) {
                                                var n = new FileReader();
                                                (n.onload = function (e) {
                                                    p.default.updateFields(
                                                        "avatar",
                                                        e.target.result
                                                    );
                                                }),
                                                    n.readAsDataURL(t.files[0]);
                                            }
                                        }),
                                        r
                                    );
                                }
                                return (
                                    s(t, e),
                                    a(t, [
                                        {
                                            key: "render",
                                            value: function () {
                                                return u.default.createElement(
                                                    "div",
                                                    null,
                                                    u.default.createElement(
                                                        "div",
                                                        { className: "title" },
                                                        "hCard Builder"
                                                    ),
                                                    u.default.createElement(
                                                        "form",
                                                        {
                                                            action: "/submit",
                                                            method: "post",
                                                        },
                                                        u.default.createElement(
                                                            f.default,
                                                            {
                                                                fieldKeys:
                                                                    this
                                                                        .personalDetailsFields,
                                                                fields: this
                                                                    .props
                                                                    .fields,
                                                                onBlur: this
                                                                    .props
                                                                    .onBlur,
                                                                title: "Personal Details",
                                                            }
                                                        ),
                                                        u.default.createElement(
                                                            f.default,
                                                            {
                                                                fieldKeys:
                                                                    this
                                                                        .addressFields,
                                                                onBlur: this
                                                                    .props
                                                                    .onBlur,
                                                                fields: this
                                                                    .props
                                                                    .fields,
                                                                title: "Address",
                                                            }
                                                        ),
                                                        u.default.createElement(
                                                            "div",
                                                            {
                                                                className:
                                                                    "hcardForm__section",
                                                            },
                                                            u.default.createElement(
                                                                "div",
                                                                {
                                                                    className:
                                                                        "row",
                                                                },
                                                                u.default.createElement(
                                                                    "div",
                                                                    {
                                                                        className:
                                                                            "col-md-6",
                                                                    },
                                                                    u.default.createElement(
                                                                        "span",
                                                                        {
                                                                            className:
                                                                                "btn btn-xl btn-primary btn-file",
                                                                        },
                                                                        "Upload Avatar ",
                                                                        u.default.createElement(
                                                                            "input",
                                                                            {
                                                                                className:
                                                                                    "avatarUpload",
                                                                                onChange:
                                                                                    this
                                                                                        .uploadAvatar,
                                                                                type: "file",
                                                                            }
                                                                        )
                                                                    )
                                                                ),
                                                                u.default.createElement(
                                                                    "div",
                                                                    {
                                                                        className:
                                                                            "col-md-6",
                                                                    },
                                                                    u.default.createElement(
                                                                        "button",
                                                                        {
                                                                            className:
                                                                                "btn btn-xl btn-primary btn-submit",
                                                                            type: "submit",
                                                                        },
                                                                        "Create hCard"
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    )
                                                );
                                            },
                                        },
                                    ]),
                                    t
                                );
                            })(u.default.Component);
                        (n.default = h),
                            (h.propTypes = {
                                fields: u.default.PropTypes.object.isRequired,
                            });
                    }.call(
                        this,
                        "undefined" != typeof global
                            ? global
                            : "undefined" != typeof self
                            ? self
                            : "undefined" != typeof window
                            ? window
                            : {}
                    ));
                },
                {
                    "../actions/Actions.js": 6,
                    "./HcardForm/FormSection.js": 10,
                },
            ],
            9: [
                function (e, t, n) {
                    (function (t) {
                        "use strict";
                        function r(e) {
                            return e && e.__esModule ? e : { default: e };
                        }
                        function i(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError(
                                    "Cannot call a class as a function"
                                );
                        }
                        function o(e, t) {
                            if (!e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return !t ||
                                ("object" != typeof t && "function" != typeof t)
                                ? e
                                : t;
                        }
                        function s(e, t) {
                            if ("function" != typeof t && null !== t)
                                throw new TypeError(
                                    "Super expression must either be null or a function, not " +
                                        typeof t
                                );
                            (e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0,
                                },
                            })),
                                t &&
                                    (Object.setPrototypeOf
                                        ? Object.setPrototypeOf(e, t)
                                        : (e.__proto__ = t));
                        }
                        Object.defineProperty(n, "__esModule", { value: !0 });
                        var a = (function () {
                                function e(e, t) {
                                    for (var n = 0; n < t.length; n++) {
                                        var r = t[n];
                                        (r.enumerable = r.enumerable || !1),
                                            (r.configurable = !0),
                                            "value" in r && (r.writable = !0),
                                            Object.defineProperty(e, r.key, r);
                                    }
                                }
                                return function (t, n, r) {
                                    return (
                                        n && e(t.prototype, n), r && e(t, r), t
                                    );
                                };
                            })(),
                            l =
                                "undefined" != typeof window
                                    ? window.React
                                    : "undefined" != typeof t
                                    ? t.React
                                    : null,
                            u = r(l),
                            c = e("./TextInput.js"),
                            f = r(c),
                            d = (function (e) {
                                function t() {
                                    return (
                                        i(this, t),
                                        o(
                                            this,
                                            (
                                                t.__proto__ ||
                                                Object.getPrototypeOf(t)
                                            ).apply(this, arguments)
                                        )
                                    );
                                }
                                return (
                                    s(t, e),
                                    a(t, [
                                        {
                                            key: "render",
                                            value: function () {
                                                var e = this.props.fieldKeys[0],
                                                    t =
                                                        this.props.fields[e]
                                                            .label,
                                                    n =
                                                        this.props.fields[e]
                                                            .value,
                                                    r = this.props.fieldKeys[1],
                                                    i =
                                                        this.props.fields[r]
                                                            .label,
                                                    o =
                                                        this.props.fields[r]
                                                            .value;
                                                return u.default.createElement(
                                                    "div",
                                                    { className: "row" },
                                                    u.default.createElement(
                                                        "div",
                                                        {
                                                            className:
                                                                "col-md-6",
                                                        },
                                                        u.default.createElement(
                                                            f.default,
                                                            {
                                                                onBlur: this
                                                                    .props
                                                                    .onBlur,
                                                                field_id: e,
                                                                label: t,
                                                                value: n,
                                                            }
                                                        )
                                                    ),
                                                    u.default.createElement(
                                                        "div",
                                                        {
                                                            className:
                                                                "col-md-6",
                                                        },
                                                        u.default.createElement(
                                                            f.default,
                                                            {
                                                                onBlur: this
                                                                    .props
                                                                    .onBlur,
                                                                field_id: r,
                                                                label: i,
                                                                value: o,
                                                            }
                                                        )
                                                    )
                                                );
                                            },
                                        },
                                    ]),
                                    t
                                );
                            })(u.default.Component);
                        (n.default = d),
                            (d.propTypes = {
                                fieldKeys: u.default.PropTypes.array.isRequired,
                                fields: u.default.PropTypes.object.isRequired,
                            });
                    }.call(
                        this,
                        "undefined" != typeof global
                            ? global
                            : "undefined" != typeof self
                            ? self
                            : "undefined" != typeof window
                            ? window
                            : {}
                    ));
                },
                { "./TextInput.js": 11 },
            ],
            10: [
                function (e, t, n) {
                    (function (t) {
                        "use strict";
                        function r(e) {
                            return e && e.__esModule ? e : { default: e };
                        }
                        function i(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError(
                                    "Cannot call a class as a function"
                                );
                        }
                        function o(e, t) {
                            if (!e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return !t ||
                                ("object" != typeof t && "function" != typeof t)
                                ? e
                                : t;
                        }
                        function s(e, t) {
                            if ("function" != typeof t && null !== t)
                                throw new TypeError(
                                    "Super expression must either be null or a function, not " +
                                        typeof t
                                );
                            (e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0,
                                },
                            })),
                                t &&
                                    (Object.setPrototypeOf
                                        ? Object.setPrototypeOf(e, t)
                                        : (e.__proto__ = t));
                        }
                        Object.defineProperty(n, "__esModule", { value: !0 });
                        var a = (function () {
                                function e(e, t) {
                                    for (var n = 0; n < t.length; n++) {
                                        var r = t[n];
                                        (r.enumerable = r.enumerable || !1),
                                            (r.configurable = !0),
                                            "value" in r && (r.writable = !0),
                                            Object.defineProperty(e, r.key, r);
                                    }
                                }
                                return function (t, n, r) {
                                    return (
                                        n && e(t.prototype, n), r && e(t, r), t
                                    );
                                };
                            })(),
                            l =
                                "undefined" != typeof window
                                    ? window.React
                                    : "undefined" != typeof t
                                    ? t.React
                                    : null,
                            u = r(l),
                            c = e("./FormRow.js"),
                            f = r(c),
                            d = (function (e) {
                                function t() {
                                    return (
                                        i(this, t),
                                        o(
                                            this,
                                            (
                                                t.__proto__ ||
                                                Object.getPrototypeOf(t)
                                            ).apply(this, arguments)
                                        )
                                    );
                                }
                                return (
                                    s(t, e),
                                    a(t, [
                                        {
                                            key: "rows",
                                            value: function e(t) {
                                                for (
                                                    var e = [], n = 0;
                                                    n < t.length;
                                                    n += 2
                                                )
                                                    e.push(
                                                        u.default.createElement(
                                                            f.default,
                                                            {
                                                                fieldKeys:
                                                                    t.slice(
                                                                        n,
                                                                        n + 2
                                                                    ),
                                                                fields: this
                                                                    .props
                                                                    .fields,
                                                                onBlur: this
                                                                    .props
                                                                    .onBlur,
                                                                key: n / 2,
                                                            }
                                                        )
                                                    );
                                                return e;
                                            },
                                        },
                                        {
                                            key: "render",
                                            value: function () {
                                                return u.default.createElement(
                                                    "div",
                                                    {
                                                        className:
                                                            "hcardForm__section",
                                                    },
                                                    u.default.createElement(
                                                        "div",
                                                        {
                                                            className:
                                                                "hcardForm__subtitle",
                                                        },
                                                        this.props.title
                                                    ),
                                                    this.rows(
                                                        this.props.fieldKeys
                                                    )
                                                );
                                            },
                                        },
                                    ]),
                                    t
                                );
                            })(u.default.Component);
                        (n.default = d),
                            (d.propTypes = {
                                fieldKeys: u.default.PropTypes.array.isRequired,
                                fields: u.default.PropTypes.object.isRequired,
                                title: u.default.PropTypes.string.isRequired,
                            });
                    }.call(
                        this,
                        "undefined" != typeof global
                            ? global
                            : "undefined" != typeof self
                            ? self
                            : "undefined" != typeof window
                            ? window
                            : {}
                    ));
                },
                { "./FormRow.js": 9 },
            ],
            11: [
                function (e, t, n) {
                    (function (t) {
                        "use strict";
                        function r(e) {
                            return e && e.__esModule ? e : { default: e };
                        }
                        function i(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError(
                                    "Cannot call a class as a function"
                                );
                        }
                        function o(e, t) {
                            if (!e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return !t ||
                                ("object" != typeof t && "function" != typeof t)
                                ? e
                                : t;
                        }
                        function s(e, t) {
                            if ("function" != typeof t && null !== t)
                                throw new TypeError(
                                    "Super expression must either be null or a function, not " +
                                        typeof t
                                );
                            (e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0,
                                },
                            })),
                                t &&
                                    (Object.setPrototypeOf
                                        ? Object.setPrototypeOf(e, t)
                                        : (e.__proto__ = t));
                        }
                        Object.defineProperty(n, "__esModule", { value: !0 });
                        var a = (function () {
                                function e(e, t) {
                                    for (var n = 0; n < t.length; n++) {
                                        var r = t[n];
                                        (r.enumerable = r.enumerable || !1),
                                            (r.configurable = !0),
                                            "value" in r && (r.writable = !0),
                                            Object.defineProperty(e, r.key, r);
                                    }
                                }
                                return function (t, n, r) {
                                    return (
                                        n && e(t.prototype, n), r && e(t, r), t
                                    );
                                };
                            })(),
                            l =
                                "undefined" != typeof window
                                    ? window.React
                                    : "undefined" != typeof t
                                    ? t.React
                                    : null,
                            u = r(l),
                            c = e("../../actions/Actions.js"),
                            f = r(c),
                            d = (function (e) {
                                function t(e, n) {
                                    i(this, t);
                                    var r = o(
                                        this,
                                        (
                                            t.__proto__ ||
                                            Object.getPrototypeOf(t)
                                        ).call(this, e, n)
                                    );
                                    return (
                                        (r.state = { value: r.props.value }),
                                        (r.onChange = function (e) {
                                            r.setState({
                                                value: e.target.value,
                                            }),
                                                f.default.updateFields(
                                                    r.props.field_id,
                                                    e.target.value
                                                );
                                        }),
                                        (r.onBlur = function (t) {
                                            console.log("onBlur"),
                                                e.onBlur(r.props.field_id);
                                        }),
                                        r
                                    );
                                }
                                return (
                                    s(t, e),
                                    a(t, [
                                        {
                                            key: "render",
                                            value: function () {
                                                return u.default.createElement(
                                                    "div",
                                                    { className: "form-group" },
                                                    u.default.createElement(
                                                        "label",
                                                        {
                                                            className:
                                                                "hcardForm__label",
                                                            htmlFor:
                                                                this.props
                                                                    .field_id,
                                                        },
                                                        this.props.label
                                                    ),
                                                    u.default.createElement(
                                                        "input",
                                                        {
                                                            className:
                                                                "form-control hcardForm__input",
                                                            name: this.props
                                                                .field_id,
                                                            id: this.props
                                                                .field_id,
                                                            onChange:
                                                                this.onChange,
                                                            onBlur: this.onBlur,
                                                            type: "text",
                                                            value: this.state
                                                                .value,
                                                        }
                                                    )
                                                );
                                            },
                                        },
                                    ]),
                                    t
                                );
                            })(u.default.Component);
                        (n.default = d),
                            (d.propTypes = {
                                field_id: u.default.PropTypes.string.isRequired,
                                label: u.default.PropTypes.string.isRequired,
                                value: u.default.PropTypes.string.isRequired,
                            });
                    }.call(
                        this,
                        "undefined" != typeof global
                            ? global
                            : "undefined" != typeof self
                            ? self
                            : "undefined" != typeof window
                            ? window
                            : {}
                    ));
                },
                { "../../actions/Actions.js": 6 },
            ],
            12: [
                function (e, t, n) {
                    (function (e) {
                        "use strict";
                        function t(e) {
                            return e && e.__esModule ? e : { default: e };
                        }
                        function r(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError(
                                    "Cannot call a class as a function"
                                );
                        }
                        function i(e, t) {
                            if (!e)
                                throw new ReferenceError(
                                    "this hasn't been initialised - super() hasn't been called"
                                );
                            return !t ||
                                ("object" != typeof t && "function" != typeof t)
                                ? e
                                : t;
                        }
                        function o(e, t) {
                            if ("function" != typeof t && null !== t)
                                throw new TypeError(
                                    "Super expression must either be null or a function, not " +
                                        typeof t
                                );
                            (e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0,
                                },
                            })),
                                t &&
                                    (Object.setPrototypeOf
                                        ? Object.setPrototypeOf(e, t)
                                        : (e.__proto__ = t));
                        }
                        Object.defineProperty(n, "__esModule", { value: !0 });
                        var s = (function () {
                                function e(e, t) {
                                    for (var n = 0; n < t.length; n++) {
                                        var r = t[n];
                                        (r.enumerable = r.enumerable || !1),
                                            (r.configurable = !0),
                                            "value" in r && (r.writable = !0),
                                            Object.defineProperty(e, r.key, r);
                                    }
                                }
                                return function (t, n, r) {
                                    return (
                                        n && e(t.prototype, n), r && e(t, r), t
                                    );
                                };
                            })(),
                            a =
                                "undefined" != typeof window
                                    ? window.React
                                    : "undefined" != typeof e
                                    ? e.React
                                    : null,
                            l = t(a),
                            u = (function (e) {
                                function t(e, n) {
                                    return (
                                        r(this, t),
                                        i(
                                            this,
                                            (
                                                t.__proto__ ||
                                                Object.getPrototypeOf(t)
                                            ).call(this, e, n)
                                        )
                                    );
                                }
                                return (
                                    o(t, e),
                                    s(t, [
                                        {
                                            key: "fullName",
                                            value: function () {
                                                return (
                                                    this.props.fields.givenName
                                                        .value +
                                                    " " +
                                                    this.props.fields.surname
                                                        .value
                                                );
                                            },
                                        },
                                        {
                                            key: "addressLineOne",
                                            value: function () {
                                                return (
                                                    this.props.fields
                                                        .houseNumber.value +
                                                    " " +
                                                    this.props.fields.street
                                                        .value
                                                );
                                            },
                                        },
                                        {
                                            key: "addressLineTwo",
                                            value: function () {
                                                return (
                                                    this.props.fields.suburb
                                                        .value +
                                                    ", " +
                                                    this.props.fields.state
                                                        .value
                                                );
                                            },
                                        },
                                        {
                                            key: "render",
                                            value: function () {
                                                return l.default.createElement(
                                                    "div",
                                                    null,
                                                    l.default.createElement(
                                                        "div",
                                                        {
                                                            className:
                                                                "preview",
                                                        },
                                                        l.default.createElement(
                                                            "div",
                                                            {
                                                                className:
                                                                    "preview__title",
                                                            },
                                                            "HCARD PREVIEW"
                                                        ),
                                                        l.default.createElement(
                                                            "div",
                                                            {
                                                                className:
                                                                    "float-reset",
                                                            }
                                                        ),
                                                        l.default.createElement(
                                                            "div",
                                                            null,
                                                            l.default.createElement(
                                                                "div",
                                                                {
                                                                    className:
                                                                        "preview__name",
                                                                },
                                                                l.default.createElement(
                                                                    "span",
                                                                    {
                                                                        className:
                                                                            "preview__name__text",
                                                                    },
                                                                    this.fullName()
                                                                )
                                                            ),
                                                            l.default.createElement(
                                                                "img",
                                                                {
                                                                    className:
                                                                        "preview__photo",
                                                                    src: this
                                                                        .props
                                                                        .fields
                                                                        .avatar
                                                                        .value,
                                                                }
                                                            ),
                                                            l.default.createElement(
                                                                "div",
                                                                {
                                                                    className:
                                                                        "preview__details",
                                                                },
                                                                l.default.createElement(
                                                                    "div",
                                                                    {
                                                                        className:
                                                                            "preview__details__row",
                                                                    },
                                                                    l.default.createElement(
                                                                        "span",
                                                                        {
                                                                            className:
                                                                                "preview__descriptor",
                                                                        },
                                                                        "Email"
                                                                    ),
                                                                    l.default.createElement(
                                                                        "span",
                                                                        {
                                                                            className:
                                                                                "preview__content preview__content--left",
                                                                        },
                                                                        this
                                                                            .props
                                                                            .fields
                                                                            .email
                                                                            .value
                                                                    )
                                                                ),
                                                                l.default.createElement(
                                                                    "div",
                                                                    {
                                                                        className:
                                                                            "preview__details__row",
                                                                    },
                                                                    l.default.createElement(
                                                                        "span",
                                                                        {
                                                                            className:
                                                                                "preview__descriptor",
                                                                        },
                                                                        "Phone"
                                                                    ),
                                                                    l.default.createElement(
                                                                        "span",
                                                                        {
                                                                            className:
                                                                                "preview__content preview__content--left",
                                                                        },
                                                                        this
                                                                            .props
                                                                            .fields
                                                                            .phone
                                                                            .value
                                                                    )
                                                                ),
                                                                l.default.createElement(
                                                                    "div",
                                                                    {
                                                                        className:
                                                                            "preview__details__row",
                                                                    },
                                                                    l.default.createElement(
                                                                        "span",
                                                                        {
                                                                            className:
                                                                                "preview__descriptor",
                                                                        },
                                                                        "Address"
                                                                    ),
                                                                    l.default.createElement(
                                                                        "span",
                                                                        {
                                                                            className:
                                                                                "preview__content preview__content--left",
                                                                        },
                                                                        this.addressLineOne()
                                                                    )
                                                                ),
                                                                l.default.createElement(
                                                                    "div",
                                                                    {
                                                                        className:
                                                                            "preview__details__row",
                                                                    },
                                                                    l.default.createElement(
                                                                        "span",
                                                                        {
                                                                            className:
                                                                                "preview__descriptor",
                                                                        },
                                                                        " "
                                                                    ),
                                                                    l.default.createElement(
                                                                        "span",
                                                                        {
                                                                            className:
                                                                                "preview__content preview__content--left",
                                                                        },
                                                                        this.addressLineTwo()
                                                                    )
                                                                ),
                                                                l.default.createElement(
                                                                    "div",
                                                                    {
                                                                        className:
                                                                            "preview__details__row",
                                                                    },
                                                                    l.default.createElement(
                                                                        "span",
                                                                        {
                                                                            className:
                                                                                "preview__descriptor",
                                                                        },
                                                                        "Postcode"
                                                                    ),
                                                                    l.default.createElement(
                                                                        "span",
                                                                        {
                                                                            className:
                                                                                "preview__content preview__content--left",
                                                                        },
                                                                        this
                                                                            .props
                                                                            .fields
                                                                            .postcode
                                                                            .value
                                                                    ),
                                                                    l.default.createElement(
                                                                        "span",
                                                                        {
                                                                            className:
                                                                                "preview__descriptor preview__descriptor--right",
                                                                        },
                                                                        "Country"
                                                                    ),
                                                                    l.default.createElement(
                                                                        "span",
                                                                        {
                                                                            className:
                                                                                "preview__content preview__content--right",
                                                                        },
                                                                        this
                                                                            .props
                                                                            .fields
                                                                            .country
                                                                            .value
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    )
                                                );
                                            },
                                        },
                                    ]),
                                    t
                                );
                            })(l.default.Component);
                        (n.default = u),
                            (u.propTypes = {
                                fields: l.default.PropTypes.object.isRequired,
                            });
                    }.call(
                        this,
                        "undefined" != typeof global
                            ? global
                            : "undefined" != typeof self
                            ? self
                            : "undefined" != typeof window
                            ? window
                            : {}
                    ));
                },
                {},
            ],
            13: [
                function (e, t, n) {
                    "use strict";
                    Object.defineProperty(n, "__esModule", { value: !0 });
                    (n.UPDATE_FIELD = "update"), (n.BLUR_FIELD = "blur");
                },
                {},
            ],
            14: [
                function (e, t, n) {
                    "use strict";
                    Object.defineProperty(n, "__esModule", { value: !0 });
                    var r = e("flux");
                    n.default = new r.Dispatcher();
                },
                { flux: 2 },
            ],
            15: [
                function (e, t, n) {
                    "use strict";
                    function r(e) {
                        if (e && e.__esModule) return e;
                        var t = {};
                        if (null != e)
                            for (var n in e)
                                Object.prototype.hasOwnProperty.call(e, n) &&
                                    (t[n] = e[n]);
                        return (t.default = e), t;
                    }
                    function i(e) {
                        return e && e.__esModule ? e : { default: e };
                    }
                    function o(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError(
                                "Cannot call a class as a function"
                            );
                    }
                    function s(e, t) {
                        if (!e)
                            throw new ReferenceError(
                                "this hasn't been initialised - super() hasn't been called"
                            );
                        return !t ||
                            ("object" != typeof t && "function" != typeof t)
                            ? e
                            : t;
                    }
                    function a(e, t) {
                        if ("function" != typeof t && null !== t)
                            throw new TypeError(
                                "Super expression must either be null or a function, not " +
                                    typeof t
                            );
                        (e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0,
                            },
                        })),
                            t &&
                                (Object.setPrototypeOf
                                    ? Object.setPrototypeOf(e, t)
                                    : (e.__proto__ = t));
                    }
                    Object.defineProperty(n, "__esModule", { value: !0 });
                    var l = (function () {
                            function e(e, t) {
                                for (var n = 0; n < t.length; n++) {
                                    var r = t[n];
                                    (r.enumerable = r.enumerable || !1),
                                        (r.configurable = !0),
                                        "value" in r && (r.writable = !0),
                                        Object.defineProperty(e, r.key, r);
                                }
                            }
                            return function (t, n, r) {
                                return n && e(t.prototype, n), r && e(t, r), t;
                            };
                        })(),
                        u = e("./Store"),
                        c = i(u),
                        f = e("../dispatcher/Dispatcher"),
                        d = i(f),
                        p = e("../constants/Constants"),
                        h = r(p),
                        v = (function (e) {
                            function t() {
                                o(this, t);
                                var e = s(
                                    this,
                                    (
                                        t.__proto__ || Object.getPrototypeOf(t)
                                    ).call(this)
                                );
                                return (
                                    (e.fields = {
                                        givenName: {
                                            label: "Given Name",
                                            value: "",
                                        },
                                        surname: {
                                            label: "Surname",
                                            value: "",
                                        },
                                        email: { label: "Email", value: "" },
                                        phone: { label: "Phone", value: "" },
                                        houseNumber: {
                                            label: "House Name or #",
                                            value: "",
                                        },
                                        street: { label: "Street", value: "" },
                                        suburb: { label: "Suburb", value: "" },
                                        state: { label: "State", value: "" },
                                        postcode: {
                                            label: "Postcode",
                                            value: "",
                                        },
                                        country: {
                                            label: "Country",
                                            value: "",
                                        },
                                        avatar: { value: "img/avatar.png" },
                                    }),
                                    e
                                );
                            }
                            return (
                                a(t, e),
                                l(t, [
                                    {
                                        key: "setFields",
                                        value: function (e) {
                                            var t = this;
                                            Object.keys(e)
                                                .filter(function (e) {
                                                    return t.fields[e];
                                                })
                                                .forEach(function (n) {
                                                    t.fields[n].value = e[n];
                                                });
                                        },
                                    },
                                ]),
                                t
                            );
                        })(c.default),
                        _ = new v();
                    (n.default = _),
                        d.default.register(function (e) {
                            console.log("dispatcher", e, h.BLUR_FIELD),
                                e.actions === h.UPDATE_FIELD
                                    ? ((_.fields[e.field_id].value = e.value),
                                      _.emitChange())
                                    : e.actions === h.BLUR_FIELD &&
                                      (console.log("BLUR_FIELD"), _.emitBlur());
                        });
                },
                {
                    "../constants/Constants": 13,
                    "../dispatcher/Dispatcher": 14,
                    "./Store": 16,
                },
            ],
            16: [
                function (e, t, n) {
                    "use strict";
                    function r(e) {
                        return e && e.__esModule ? e : { default: e };
                    }
                    function i(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError(
                                "Cannot call a class as a function"
                            );
                    }
                    function o(e, t) {
                        if (!e)
                            throw new ReferenceError(
                                "this hasn't been initialised - super() hasn't been called"
                            );
                        return !t ||
                            ("object" != typeof t && "function" != typeof t)
                            ? e
                            : t;
                    }
                    function s(e, t) {
                        if ("function" != typeof t && null !== t)
                            throw new TypeError(
                                "Super expression must either be null or a function, not " +
                                    typeof t
                            );
                        (e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0,
                            },
                        })),
                            t &&
                                (Object.setPrototypeOf
                                    ? Object.setPrototypeOf(e, t)
                                    : (e.__proto__ = t));
                    }
                    Object.defineProperty(n, "__esModule", { value: !0 });
                    var a = (function () {
                            function e(e, t) {
                                for (var n = 0; n < t.length; n++) {
                                    var r = t[n];
                                    (r.enumerable = r.enumerable || !1),
                                        (r.configurable = !0),
                                        "value" in r && (r.writable = !0),
                                        Object.defineProperty(e, r.key, r);
                                }
                            }
                            return function (t, n, r) {
                                return n && e(t.prototype, n), r && e(t, r), t;
                            };
                        })(),
                        l = e("events"),
                        u = r(l),
                        c = "change",
                        f = "blur",
                        d = (function (e) {
                            function t() {
                                return (
                                    i(this, t),
                                    o(
                                        this,
                                        (
                                            t.__proto__ ||
                                            Object.getPrototypeOf(t)
                                        ).apply(this, arguments)
                                    )
                                );
                            }
                            return (
                                s(t, e),
                                a(t, [
                                    {
                                        key: "emitChange",
                                        value: function () {
                                            this.emit(c);
                                        },
                                    },
                                    {
                                        key: "emitBlur",
                                        value: function () {
                                            console.log("emitBlur"),
                                                this.emit(f);
                                        },
                                    },
                                    {
                                        key: "addChangeListener",
                                        value: function (e) {
                                            this.on(c, e);
                                        },
                                    },
                                    {
                                        key: "addBlurListener",
                                        value: function (e) {
                                            console.log("addBlurListener"),
                                                this.on(f, e);
                                        },
                                    },
                                ]),
                                t
                            );
                        })(u.default);
                    (d.dispatchToken = null), (n.default = d);
                },
                { events: 1 },
            ],
        },
        {},
        [7]
    )(7);
});
