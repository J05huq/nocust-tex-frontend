webpackJsonp([28], {
  812: function(t, e, n) {
    var i
    !(function(s, r, o, a) {
      'use strict'
      function h(t, e, n) {
        return setTimeout(f(t, n), e)
      }
      function u(t, e, n) {
        return !!Array.isArray(t) && (c(t, n[e], n), !0)
      }
      function c(t, e, n) {
        var i
        if (t)
          if (t.forEach) t.forEach(e, n)
          else if (t.length !== a) for (i = 0; i < t.length; ) e.call(n, t[i], i, t), i++
          else for (i in t) t.hasOwnProperty(i) && e.call(n, t[i], i, t)
      }
      function l(t, e, n) {
        var i = 'DEPRECATED METHOD: ' + e + '\n' + n + ' AT \n'
        return function() {
          var e = Error('get-stack-trace'),
            n =
              e && e.stack
                ? e.stack
                    .replace(/^[^\(]+?[\n$]/gm, '')
                    .replace(/^\s+at\s+/gm, '')
                    .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
                : 'Unknown Stack Trace',
            r = s.console && (s.console.warn || s.console.log)
          return r && r.call(s.console, i, n), t.apply(this, arguments)
        }
      }
      function p(t, e, n) {
        var i,
          s = e.prototype
        ;(i = t.prototype = Object.create(s)), (i.constructor = t), (i._super = s), n && vt(i, n)
      }
      function f(t, e) {
        return function() {
          return t.apply(e, arguments)
        }
      }
      function d(t, e) {
        return typeof t == _e ? t.apply(e ? e[0] || a : a, e) : t
      }
      function v(t, e) {
        return t === a ? e : t
      }
      function m(t, e, n) {
        c(E(e), function(e) {
          t.addEventListener(e, n, !1)
        })
      }
      function g(t, e, n) {
        c(E(e), function(e) {
          t.removeEventListener(e, n, !1)
        })
      }
      function T(t, e) {
        for (; t; ) {
          if (t == e) return !0
          t = t.parentNode
        }
        return !1
      }
      function y(t, e) {
        return t.indexOf(e) > -1
      }
      function E(t) {
        return t.trim().split(/\s+/g)
      }
      function I(t, e, n) {
        if (t.indexOf && !n) return t.indexOf(e)
        for (var i = 0; i < t.length; ) {
          if ((n && t[i][n] == e) || (!n && t[i] === e)) return i
          i++
        }
        return -1
      }
      function A(t) {
        return Array.prototype.slice.call(t, 0)
      }
      function _(t, e, n) {
        for (var i, s = [], r = [], o = 0; o < t.length; )
          (i = e ? t[o][e] : t[o]), I(r, i) < 0 && s.push(t[o]), (r[o] = i), o++
        return (
          n &&
            (s = e
              ? s.sort(function(t, n) {
                  return t[e] > n[e]
                })
              : s.sort()),
          s
        )
      }
      function b(t, e) {
        for (var n, i, s = e[0].toUpperCase() + e.slice(1), r = 0; r < Ie.length; ) {
          if (((n = Ie[r]), (i = n ? n + s : e) in t)) return i
          r++
        }
        return a
      }
      function C() {
        return Tt++
      }
      function S(t) {
        var e = t.ownerDocument || t
        return e.defaultView || e.parentWindow || s
      }
      function P(t, e) {
        var n = this
        ;(this.manager = t),
          (this.callback = e),
          (this.element = t.element),
          (this.target = t.options.inputTarget),
          (this.domHandler = function(e) {
            d(t.options.enable, [t]) && n.handler(e)
          }),
          this.init()
      }
      function D(t) {
        var e = t.options.inputClass
        return new (e || (It ? L : At ? V : Et ? G : k))(t, x)
      }
      function x(t, e, n) {
        var i = n.pointers.length,
          s = n.changedPointers.length,
          r = e & Dt && i - s == 0,
          o = e & (wt | Ot) && i - s == 0
        ;(n.isFirst = !!r),
          (n.isFinal = !!o),
          r && (t.session = {}),
          (n.eventType = e),
          w(t, n),
          t.emit('hammer.input', n),
          t.recognize(n),
          (t.session.prevInput = n)
      }
      function w(t, e) {
        var n,
          i,
          s,
          r,
          o,
          a,
          h = t.session,
          u = e.pointers,
          c = u.length
        h.firstInput || (h.firstInput = M(e)),
          c > 1 && !h.firstMultiple ? (h.firstMultiple = M(e)) : 1 === c && (h.firstMultiple = !1),
          (n = h.firstInput),
          (i = h.firstMultiple),
          (s = i ? i.center : n.center),
          (r = e.center = z(u)),
          (e.timeStamp = Se()),
          (e.deltaTime = e.timeStamp - n.timeStamp),
          (e.angle = F(s, r)),
          (e.distance = Y(s, r)),
          O(h, e),
          (e.offsetDirection = X(e.deltaX, e.deltaY)),
          (o = N(e.deltaTime, e.deltaX, e.deltaY)),
          (e.overallVelocityX = o.x),
          (e.overallVelocityY = o.y),
          (e.overallVelocity = Ce(o.x) > Ce(o.y) ? o.x : o.y),
          (e.scale = i ? q(i.pointers, u) : 1),
          (e.rotation = i ? W(i.pointers, u) : 0),
          (e.maxPointers = h.prevInput
            ? e.pointers.length > h.prevInput.maxPointers
              ? e.pointers.length
              : h.prevInput.maxPointers
            : e.pointers.length),
          R(h, e),
          (a = t.element),
          T(e.srcEvent.target, a) && (a = e.srcEvent.target),
          (e.target = a)
      }
      function O(t, e) {
        var n = e.center,
          i = t.offsetDelta || {},
          s = t.prevDelta || {},
          r = t.prevInput || {}
        ;(e.eventType !== Dt && r.eventType !== wt) ||
          ((s = t.prevDelta = { x: r.deltaX || 0, y: r.deltaY || 0 }),
          (i = t.offsetDelta = { x: n.x, y: n.y })),
          (e.deltaX = s.x + (n.x - i.x)),
          (e.deltaY = s.y + (n.y - i.y))
      }
      function R(t, e) {
        var n,
          i,
          s,
          r,
          o,
          h,
          u,
          c = t.lastInterval || e,
          l = e.timeStamp - c.timeStamp
        e.eventType != Ot && (l > Pt || c.velocity === a)
          ? ((o = e.deltaX - c.deltaX),
            (h = e.deltaY - c.deltaY),
            (u = N(l, o, h)),
            (i = u.x),
            (s = u.y),
            (n = Ce(u.x) > Ce(u.y) ? u.x : u.y),
            (r = X(o, h)),
            (t.lastInterval = e))
          : ((n = c.velocity), (i = c.velocityX), (s = c.velocityY), (r = c.direction)),
          (e.velocity = n),
          (e.velocityX = i),
          (e.velocityY = s),
          (e.direction = r)
      }
      function M(t) {
        for (var e = [], n = 0; n < t.pointers.length; )
          (e[n] = { clientX: be(t.pointers[n].clientX), clientY: be(t.pointers[n].clientY) }), n++
        return { timeStamp: Se(), pointers: e, center: z(e), deltaX: t.deltaX, deltaY: t.deltaY }
      }
      function z(t) {
        var e,
          n,
          i,
          s = t.length
        if (1 === s) return { x: be(t[0].clientX), y: be(t[0].clientY) }
        for (e = 0, n = 0, i = 0; i < s; ) (e += t[i].clientX), (n += t[i].clientY), i++
        return { x: be(e / s), y: be(n / s) }
      }
      function N(t, e, n) {
        return { x: e / t || 0, y: n / t || 0 }
      }
      function X(t, e) {
        return t === e ? Rt : Ce(t) >= Ce(e) ? (t < 0 ? Mt : zt) : e < 0 ? Nt : Xt
      }
      function Y(t, e, n) {
        n || (n = qt)
        var i = e[n[0]] - t[n[0]],
          s = e[n[1]] - t[n[1]]
        return Math.sqrt(i * i + s * s)
      }
      function F(t, e, n) {
        n || (n = qt)
        var i = e[n[0]] - t[n[0]],
          s = e[n[1]] - t[n[1]]
        return (180 * Math.atan2(s, i)) / Math.PI
      }
      function W(t, e) {
        return F(e[1], e[0], kt) + F(t[1], t[0], kt)
      }
      function q(t, e) {
        return Y(e[0], e[1], kt) / Y(t[0], t[1], kt)
      }
      function k() {
        ;(this.evEl = Ht), (this.evWin = Ut), (this.pressed = !1), P.apply(this, arguments)
      }
      function L() {
        ;(this.evEl = Gt),
          (this.evWin = Zt),
          P.apply(this, arguments),
          (this.store = this.manager.session.pointerEvents = [])
      }
      function H() {
        ;(this.evTarget = Jt), (this.evWin = $t), (this.started = !1), P.apply(this, arguments)
      }
      function U(t, e) {
        var n = A(t.touches),
          i = A(t.changedTouches)
        return e & (wt | Ot) && (n = _(n.concat(i), 'identifier', !0)), [n, i]
      }
      function V() {
        ;(this.evTarget = Qt), (this.targetIds = {}), P.apply(this, arguments)
      }
      function j(t, e) {
        var n,
          i,
          s,
          r,
          o,
          h = A(t.touches),
          u = this.targetIds
        if (e & (Dt | xt) && 1 === h.length) return (u[h[0].identifier] = !0), [h, h]
        if (
          ((s = A(t.changedTouches)),
          (r = []),
          (o = this.target),
          (i = h.filter(function(t) {
            return T(t.target, o)
          })),
          e === Dt)
        )
          for (n = 0; n < i.length; ) (u[i[n].identifier] = !0), n++
        for (n = 0; n < s.length; )
          u[s[n].identifier] && r.push(s[n]), e & (wt | Ot) && delete u[s[n].identifier], n++
        return r.length ? [_(i.concat(r), 'identifier', !0), r] : a
      }
      function G() {
        P.apply(this, arguments)
        var t = f(this.handler, this)
        ;(this.touch = new V(this.manager, t)),
          (this.mouse = new k(this.manager, t)),
          (this.primaryTouch = null),
          (this.lastTouches = [])
      }
      function Z(t, e) {
        t & Dt
          ? ((this.primaryTouch = e.changedPointers[0].identifier), B.call(this, e))
          : t & (wt | Ot) && B.call(this, e)
      }
      function B(t) {
        var e,
          n,
          i,
          s = t.changedPointers[0]
        s.identifier === this.primaryTouch &&
          ((e = { x: s.clientX, y: s.clientY }),
          this.lastTouches.push(e),
          (n = this.lastTouches),
          (i = function() {
            var t = n.indexOf(e)
            t > -1 && n.splice(t, 1)
          }),
          setTimeout(i, te))
      }
      function J(t) {
        var e,
          n,
          i,
          s,
          r = t.srcEvent.clientX,
          o = t.srcEvent.clientY
        for (e = 0; e < this.lastTouches.length; e++)
          if (
            ((n = this.lastTouches[e]),
            (i = Math.abs(r - n.x)),
            (s = Math.abs(o - n.y)),
            i <= ee && s <= ee)
          )
            return !0
        return !1
      }
      function $(t, e) {
        ;(this.manager = t), this.set(e)
      }
      function K(t) {
        var e, n
        return y(t, ae)
          ? ae
          : ((e = y(t, he)),
            (n = y(t, ue)),
            e && n ? ae : e || n ? (e ? he : ue) : y(t, oe) ? oe : re)
      }
      function Q() {
        var t, e
        return (
          !!ie &&
          ((t = {}),
          (e = s.CSS && s.CSS.supports),
          ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(n) {
            t[n] = !e || s.CSS.supports('touch-action', n)
          }),
          t)
        )
      }
      function tt(t) {
        ;(this.options = vt({}, this.defaults, t || {})),
          (this.id = C()),
          (this.manager = null),
          (this.options.enable = v(this.options.enable, !0)),
          (this.state = le),
          (this.simultaneous = {}),
          (this.requireFail = [])
      }
      function et(t) {
        return t & me ? 'cancel' : t & de ? 'end' : t & fe ? 'move' : t & pe ? 'start' : ''
      }
      function nt(t) {
        return t == Xt ? 'down' : t == Nt ? 'up' : t == Mt ? 'left' : t == zt ? 'right' : ''
      }
      function it(t, e) {
        var n = e.manager
        return n ? n.get(t) : t
      }
      function st() {
        tt.apply(this, arguments)
      }
      function rt() {
        st.apply(this, arguments), (this.pX = null), (this.pY = null)
      }
      function ot() {
        st.apply(this, arguments)
      }
      function at() {
        tt.apply(this, arguments), (this._timer = null), (this._input = null)
      }
      function ht() {
        st.apply(this, arguments)
      }
      function ut() {
        st.apply(this, arguments)
      }
      function ct() {
        tt.apply(this, arguments),
          (this.pTime = !1),
          (this.pCenter = !1),
          (this._timer = null),
          (this._input = null),
          (this.count = 0)
      }
      function lt(t, e) {
        return (e = e || {}), (e.recognizers = v(e.recognizers, lt.defaults.preset)), new pt(t, e)
      }
      function pt(t, e) {
        ;(this.options = vt({}, lt.defaults, e || {})),
          (this.options.inputTarget = this.options.inputTarget || t),
          (this.handlers = {}),
          (this.session = {}),
          (this.recognizers = []),
          (this.oldCssProps = {}),
          (this.element = t),
          (this.input = D(this)),
          (this.touchAction = new $(this, this.options.touchAction)),
          ft(this, !0),
          c(
            this.options.recognizers,
            function(t) {
              var e = this.add(new t[0](t[1]))
              t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3])
            },
            this,
          )
      }
      function ft(t, e) {
        var n,
          i = t.element
        i.style &&
          (c(t.options.cssProps, function(s, r) {
            ;(n = b(i.style, r)),
              e
                ? ((t.oldCssProps[n] = i.style[n]), (i.style[n] = s))
                : (i.style[n] = t.oldCssProps[n] || '')
          }),
          e || (t.oldCssProps = {}))
      }
      function dt(t, e) {
        var n = r.createEvent('Event')
        n.initEvent(t, !0, !0), (n.gesture = e), e.target.dispatchEvent(n)
      }
      var vt,
        mt,
        gt,
        Tt,
        yt,
        Et,
        It,
        At,
        _t,
        bt,
        Ct,
        St,
        Pt,
        Dt,
        xt,
        wt,
        Ot,
        Rt,
        Mt,
        zt,
        Nt,
        Xt,
        Yt,
        Ft,
        Wt,
        qt,
        kt,
        Lt,
        Ht,
        Ut,
        Vt,
        jt,
        Gt,
        Zt,
        Bt,
        Jt,
        $t,
        Kt,
        Qt,
        te,
        ee,
        ne,
        ie,
        se,
        re,
        oe,
        ae,
        he,
        ue,
        ce,
        le,
        pe,
        fe,
        de,
        ve,
        me,
        ge,
        Te,
        ye,
        Ee,
        Ie = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'],
        Ae = r.createElement('div'),
        _e = 'function',
        be = Math.round,
        Ce = Math.abs,
        Se = Date.now
      ;(vt =
        'function' != typeof Object.assign
          ? function(t) {
              var e, n, i, s
              if (t === a || null === t)
                throw new TypeError('Cannot convert undefined or null to object')
              for (e = Object(t), n = 1; n < arguments.length; n++)
                if ((i = arguments[n]) !== a && null !== i)
                  for (s in i) i.hasOwnProperty(s) && (e[s] = i[s])
              return e
            }
          : Object.assign),
        (mt = l(
          function(t, e, n) {
            for (var i = Object.keys(e), s = 0; s < i.length; )
              (!n || (n && t[i[s]] === a)) && (t[i[s]] = e[i[s]]), s++
            return t
          },
          'extend',
          'Use `assign`.',
        )),
        (gt = l(
          function(t, e) {
            return mt(t, e, !0)
          },
          'merge',
          'Use `assign`.',
        )),
        (Tt = 1),
        (yt = /mobile|tablet|ip(ad|hone|od)|android/i),
        (Et = 'ontouchstart' in s),
        (It = b(s, 'PointerEvent') !== a),
        (At = Et && yt.test(navigator.userAgent)),
        (_t = 'touch'),
        (bt = 'pen'),
        (Ct = 'mouse'),
        (St = 'kinect'),
        (Pt = 25),
        (Dt = 1),
        (xt = 2),
        (wt = 4),
        (Ot = 8),
        (Rt = 1),
        (Mt = 2),
        (zt = 4),
        (Nt = 8),
        (Xt = 16),
        (Yt = Mt | zt),
        (Ft = Nt | Xt),
        (Wt = Yt | Ft),
        (qt = ['x', 'y']),
        (kt = ['clientX', 'clientY']),
        (P.prototype = {
          handler: function() {},
          init: function() {
            this.evEl && m(this.element, this.evEl, this.domHandler),
              this.evTarget && m(this.target, this.evTarget, this.domHandler),
              this.evWin && m(S(this.element), this.evWin, this.domHandler)
          },
          destroy: function() {
            this.evEl && g(this.element, this.evEl, this.domHandler),
              this.evTarget && g(this.target, this.evTarget, this.domHandler),
              this.evWin && g(S(this.element), this.evWin, this.domHandler)
          },
        }),
        (Lt = { mousedown: Dt, mousemove: xt, mouseup: wt }),
        (Ht = 'mousedown'),
        (Ut = 'mousemove mouseup'),
        p(k, P, {
          handler: function(t) {
            var e = Lt[t.type]
            e & Dt && 0 === t.button && (this.pressed = !0),
              e & xt && 1 !== t.which && (e = wt),
              this.pressed &&
                (e & wt && (this.pressed = !1),
                this.callback(this.manager, e, {
                  pointers: [t],
                  changedPointers: [t],
                  pointerType: Ct,
                  srcEvent: t,
                }))
          },
        }),
        (Vt = {
          pointerdown: Dt,
          pointermove: xt,
          pointerup: wt,
          pointercancel: Ot,
          pointerout: Ot,
        }),
        (jt = { 2: _t, 3: bt, 4: Ct, 5: St }),
        (Gt = 'pointerdown'),
        (Zt = 'pointermove pointerup pointercancel'),
        s.MSPointerEvent &&
          !s.PointerEvent &&
          ((Gt = 'MSPointerDown'), (Zt = 'MSPointerMove MSPointerUp MSPointerCancel')),
        p(L, P, {
          handler: function(t) {
            var e = this.store,
              n = !1,
              i = t.type.toLowerCase().replace('ms', ''),
              s = Vt[i],
              r = jt[t.pointerType] || t.pointerType,
              o = r == _t,
              a = I(e, t.pointerId, 'pointerId')
            s & Dt && (0 === t.button || o)
              ? a < 0 && (e.push(t), (a = e.length - 1))
              : s & (wt | Ot) && (n = !0),
              a < 0 ||
                ((e[a] = t),
                this.callback(this.manager, s, {
                  pointers: e,
                  changedPointers: [t],
                  pointerType: r,
                  srcEvent: t,
                }),
                n && e.splice(a, 1))
          },
        }),
        (Bt = { touchstart: Dt, touchmove: xt, touchend: wt, touchcancel: Ot }),
        (Jt = 'touchstart'),
        ($t = 'touchstart touchmove touchend touchcancel'),
        p(H, P, {
          handler: function(t) {
            var e,
              n = Bt[t.type]
            n === Dt && (this.started = !0),
              this.started &&
                ((e = U.call(this, t, n)),
                n & (wt | Ot) && e[0].length - e[1].length == 0 && (this.started = !1),
                this.callback(this.manager, n, {
                  pointers: e[0],
                  changedPointers: e[1],
                  pointerType: _t,
                  srcEvent: t,
                }))
          },
        }),
        (Kt = { touchstart: Dt, touchmove: xt, touchend: wt, touchcancel: Ot }),
        (Qt = 'touchstart touchmove touchend touchcancel'),
        p(V, P, {
          handler: function(t) {
            var e = Kt[t.type],
              n = j.call(this, t, e)
            n &&
              this.callback(this.manager, e, {
                pointers: n[0],
                changedPointers: n[1],
                pointerType: _t,
                srcEvent: t,
              })
          },
        }),
        (te = 2500),
        (ee = 25),
        p(G, P, {
          handler: function(t, e, n) {
            var i = n.pointerType == _t,
              s = n.pointerType == Ct
            if (!(s && n.sourceCapabilities && n.sourceCapabilities.firesTouchEvents)) {
              if (i) Z.call(this, e, n)
              else if (s && J.call(this, n)) return
              this.callback(t, e, n)
            }
          },
          destroy: function() {
            this.touch.destroy(), this.mouse.destroy()
          },
        }),
        (ne = b(Ae.style, 'touchAction')),
        (ie = ne !== a),
        (se = 'compute'),
        (re = 'auto'),
        (oe = 'manipulation'),
        (ae = 'none'),
        (he = 'pan-x'),
        (ue = 'pan-y'),
        (ce = Q()),
        ($.prototype = {
          set: function(t) {
            t == se && (t = this.compute()),
              ie && this.manager.element.style && ce[t] && (this.manager.element.style[ne] = t),
              (this.actions = t.toLowerCase().trim())
          },
          update: function() {
            this.set(this.manager.options.touchAction)
          },
          compute: function() {
            var t = []
            return (
              c(this.manager.recognizers, function(e) {
                d(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
              }),
              K(t.join(' '))
            )
          },
          preventDefaults: function(t) {
            var e,
              n,
              i,
              s,
              r,
              o,
              h,
              u = t.srcEvent,
              c = t.offsetDirection
            return this.manager.session.prevented
              ? void u.preventDefault()
              : ((e = this.actions),
                (n = y(e, ae) && !ce[ae]),
                (i = y(e, ue) && !ce[ue]),
                (s = y(e, he) && !ce[he]),
                (n &&
                  ((r = 1 === t.pointers.length),
                  (o = t.distance < 2),
                  (h = t.deltaTime < 250),
                  r && o && h)) ||
                (s && i)
                  ? a
                  : n || (i && c & Yt) || (s && c & Ft)
                  ? this.preventSrc(u)
                  : a)
          },
          preventSrc: function(t) {
            ;(this.manager.session.prevented = !0), t.preventDefault()
          },
        }),
        (le = 1),
        (pe = 2),
        (fe = 4),
        (de = 8),
        (ve = de),
        (me = 16),
        (ge = 32),
        (tt.prototype = {
          defaults: {},
          set: function(t) {
            return vt(this.options, t), this.manager && this.manager.touchAction.update(), this
          },
          recognizeWith: function(t) {
            if (u(t, 'recognizeWith', this)) return this
            var e = this.simultaneous
            return (t = it(t, this)), e[t.id] || ((e[t.id] = t), t.recognizeWith(this)), this
          },
          dropRecognizeWith: function(t) {
            return u(t, 'dropRecognizeWith', this)
              ? this
              : ((t = it(t, this)), delete this.simultaneous[t.id], this)
          },
          requireFailure: function(t) {
            if (u(t, 'requireFailure', this)) return this
            var e = this.requireFail
            return (t = it(t, this)), -1 === I(e, t) && (e.push(t), t.requireFailure(this)), this
          },
          dropRequireFailure: function(t) {
            if (u(t, 'dropRequireFailure', this)) return this
            t = it(t, this)
            var e = I(this.requireFail, t)
            return e > -1 && this.requireFail.splice(e, 1), this
          },
          hasRequireFailures: function() {
            return this.requireFail.length > 0
          },
          canRecognizeWith: function(t) {
            return !!this.simultaneous[t.id]
          },
          emit: function(t) {
            function e(e) {
              n.manager.emit(e, t)
            }
            var n = this,
              i = this.state
            i < de && e(n.options.event + et(i)),
              e(n.options.event),
              t.additionalEvent && e(t.additionalEvent),
              i >= de && e(n.options.event + et(i))
          },
          tryEmit: function(t) {
            if (this.canEmit()) return this.emit(t)
            this.state = ge
          },
          canEmit: function() {
            for (var t = 0; t < this.requireFail.length; ) {
              if (!(this.requireFail[t].state & (ge | le))) return !1
              t++
            }
            return !0
          },
          recognize: function(t) {
            var e = vt({}, t)
            if (!d(this.options.enable, [this, e])) return this.reset(), void (this.state = ge)
            this.state & (ve | me | ge) && (this.state = le),
              (this.state = this.process(e)),
              this.state & (pe | fe | de | me) && this.tryEmit(e)
          },
          process: function(t) {},
          getTouchAction: function() {},
          reset: function() {},
        }),
        p(st, tt, {
          defaults: { pointers: 1 },
          attrTest: function(t) {
            var e = this.options.pointers
            return 0 === e || t.pointers.length === e
          },
          process: function(t) {
            var e = this.state,
              n = t.eventType,
              i = e & (pe | fe),
              s = this.attrTest(t)
            return i && (n & Ot || !s)
              ? e | me
              : i || s
              ? n & wt
                ? e | de
                : e & pe
                ? e | fe
                : pe
              : ge
          },
        }),
        p(rt, st, {
          defaults: { event: 'pan', threshold: 10, pointers: 1, direction: Wt },
          getTouchAction: function() {
            var t = this.options.direction,
              e = []
            return t & Yt && e.push(ue), t & Ft && e.push(he), e
          },
          directionTest: function(t) {
            var e = this.options,
              n = !0,
              i = t.distance,
              s = t.direction,
              r = t.deltaX,
              o = t.deltaY
            return (
              s & e.direction ||
                (e.direction & Yt
                  ? ((s = 0 === r ? Rt : r < 0 ? Mt : zt),
                    (n = r != this.pX),
                    (i = Math.abs(t.deltaX)))
                  : ((s = 0 === o ? Rt : o < 0 ? Nt : Xt),
                    (n = o != this.pY),
                    (i = Math.abs(t.deltaY)))),
              (t.direction = s),
              n && i > e.threshold && s & e.direction
            )
          },
          attrTest: function(t) {
            return (
              st.prototype.attrTest.call(this, t) &&
              (this.state & pe || (!(this.state & pe) && this.directionTest(t)))
            )
          },
          emit: function(t) {
            ;(this.pX = t.deltaX), (this.pY = t.deltaY)
            var e = nt(t.direction)
            e && (t.additionalEvent = this.options.event + e), this._super.emit.call(this, t)
          },
        }),
        p(ot, st, {
          defaults: { event: 'pinch', threshold: 0, pointers: 2 },
          getTouchAction: function() {
            return [ae]
          },
          attrTest: function(t) {
            return (
              this._super.attrTest.call(this, t) &&
              (Math.abs(t.scale - 1) > this.options.threshold || this.state & pe)
            )
          },
          emit: function(t) {
            if (1 !== t.scale) {
              var e = t.scale < 1 ? 'in' : 'out'
              t.additionalEvent = this.options.event + e
            }
            this._super.emit.call(this, t)
          },
        }),
        p(at, tt, {
          defaults: { event: 'press', pointers: 1, time: 251, threshold: 9 },
          getTouchAction: function() {
            return [re]
          },
          process: function(t) {
            var e = this.options,
              n = t.pointers.length === e.pointers,
              i = t.distance < e.threshold,
              s = t.deltaTime > e.time
            if (((this._input = t), !i || !n || (t.eventType & (wt | Ot) && !s))) this.reset()
            else if (t.eventType & Dt)
              this.reset(),
                (this._timer = h(
                  function() {
                    ;(this.state = ve), this.tryEmit()
                  },
                  e.time,
                  this,
                ))
            else if (t.eventType & wt) return ve
            return ge
          },
          reset: function() {
            clearTimeout(this._timer)
          },
          emit: function(t) {
            this.state === ve &&
              (t && t.eventType & wt
                ? this.manager.emit(this.options.event + 'up', t)
                : ((this._input.timeStamp = Se()),
                  this.manager.emit(this.options.event, this._input)))
          },
        }),
        p(ht, st, {
          defaults: { event: 'rotate', threshold: 0, pointers: 2 },
          getTouchAction: function() {
            return [ae]
          },
          attrTest: function(t) {
            return (
              this._super.attrTest.call(this, t) &&
              (Math.abs(t.rotation) > this.options.threshold || this.state & pe)
            )
          },
        }),
        p(ut, st, {
          defaults: {
            event: 'swipe',
            threshold: 10,
            velocity: 0.3,
            direction: Yt | Ft,
            pointers: 1,
          },
          getTouchAction: function() {
            return rt.prototype.getTouchAction.call(this)
          },
          attrTest: function(t) {
            var e,
              n = this.options.direction
            return (
              n & (Yt | Ft)
                ? (e = t.overallVelocity)
                : n & Yt
                ? (e = t.overallVelocityX)
                : n & Ft && (e = t.overallVelocityY),
              this._super.attrTest.call(this, t) &&
                n & t.offsetDirection &&
                t.distance > this.options.threshold &&
                t.maxPointers == this.options.pointers &&
                Ce(e) > this.options.velocity &&
                t.eventType & wt
            )
          },
          emit: function(t) {
            var e = nt(t.offsetDirection)
            e && this.manager.emit(this.options.event + e, t),
              this.manager.emit(this.options.event, t)
          },
        }),
        p(ct, tt, {
          defaults: {
            event: 'tap',
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 9,
            posThreshold: 10,
          },
          getTouchAction: function() {
            return [oe]
          },
          process: function(t) {
            var e,
              n,
              i = this.options,
              s = t.pointers.length === i.pointers,
              r = t.distance < i.threshold,
              o = t.deltaTime < i.time
            if ((this.reset(), t.eventType & Dt && 0 === this.count)) return this.failTimeout()
            if (r && o && s) {
              if (t.eventType != wt) return this.failTimeout()
              if (
                ((e = !this.pTime || t.timeStamp - this.pTime < i.interval),
                (n = !this.pCenter || Y(this.pCenter, t.center) < i.posThreshold),
                (this.pTime = t.timeStamp),
                (this.pCenter = t.center),
                n && e ? (this.count += 1) : (this.count = 1),
                (this._input = t),
                0 === this.count % i.taps)
              )
                return this.hasRequireFailures()
                  ? ((this._timer = h(
                      function() {
                        ;(this.state = ve), this.tryEmit()
                      },
                      i.interval,
                      this,
                    )),
                    pe)
                  : ve
            }
            return ge
          },
          failTimeout: function() {
            return (
              (this._timer = h(
                function() {
                  this.state = ge
                },
                this.options.interval,
                this,
              )),
              ge
            )
          },
          reset: function() {
            clearTimeout(this._timer)
          },
          emit: function() {
            this.state == ve &&
              ((this._input.tapCount = this.count),
              this.manager.emit(this.options.event, this._input))
          },
        }),
        (lt.VERSION = '2.0.7'),
        (lt.defaults = {
          domEvents: !1,
          touchAction: se,
          enable: !0,
          inputTarget: null,
          inputClass: null,
          preset: [
            [ht, { enable: !1 }],
            [ot, { enable: !1 }, ['rotate']],
            [ut, { direction: Yt }],
            [rt, { direction: Yt }, ['swipe']],
            [ct],
            [ct, { event: 'doubletap', taps: 2 }, ['tap']],
            [at],
          ],
          cssProps: {
            userSelect: 'none',
            touchSelect: 'none',
            touchCallout: 'none',
            contentZooming: 'none',
            userDrag: 'none',
            tapHighlightColor: 'rgba(0,0,0,0)',
          },
        }),
        (Te = 1),
        (ye = 2),
        (pt.prototype = {
          set: function(t) {
            return (
              vt(this.options, t),
              t.touchAction && this.touchAction.update(),
              t.inputTarget &&
                (this.input.destroy(), (this.input.target = t.inputTarget), this.input.init()),
              this
            )
          },
          stop: function(t) {
            this.session.stopped = t ? ye : Te
          },
          recognize: function(t) {
            var e,
              n,
              i,
              s,
              r = this.session
            if (!r.stopped)
              for (
                this.touchAction.preventDefaults(t),
                  n = this.recognizers,
                  i = r.curRecognizer,
                  (!i || (i && i.state & ve)) && (i = r.curRecognizer = null),
                  s = 0;
                s < n.length;

              )
                (e = n[s]),
                  r.stopped === ye || (i && e != i && !e.canRecognizeWith(i))
                    ? e.reset()
                    : e.recognize(t),
                  !i && e.state & (pe | fe | de) && (i = r.curRecognizer = e),
                  s++
          },
          get: function(t) {
            var e, n
            if (t instanceof tt) return t
            for (e = this.recognizers, n = 0; n < e.length; n++)
              if (e[n].options.event == t) return e[n]
            return null
          },
          add: function(t) {
            if (u(t, 'add', this)) return this
            var e = this.get(t.options.event)
            return (
              e && this.remove(e),
              this.recognizers.push(t),
              (t.manager = this),
              this.touchAction.update(),
              t
            )
          },
          remove: function(t) {
            var e, n
            return u(t, 'remove', this)
              ? this
              : ((t = this.get(t)),
                t &&
                  ((e = this.recognizers),
                  -1 !== (n = I(e, t)) && (e.splice(n, 1), this.touchAction.update())),
                this)
          },
          on: function(t, e) {
            if (t !== a && e !== a) {
              var n = this.handlers
              return (
                c(E(t), function(t) {
                  ;(n[t] = n[t] || []), n[t].push(e)
                }),
                this
              )
            }
          },
          off: function(t, e) {
            if (t !== a) {
              var n = this.handlers
              return (
                c(E(t), function(t) {
                  e ? n[t] && n[t].splice(I(n[t], e), 1) : delete n[t]
                }),
                this
              )
            }
          },
          emit: function(t, e) {
            var n, i
            if (
              (this.options.domEvents && dt(t, e),
              (n = this.handlers[t] && this.handlers[t].slice()) && n.length)
            )
              for (
                e.type = t,
                  e.preventDefault = function() {
                    e.srcEvent.preventDefault()
                  },
                  i = 0;
                i < n.length;

              )
                n[i](e), i++
          },
          destroy: function() {
            this.element && ft(this, !1),
              (this.handlers = {}),
              (this.session = {}),
              this.input.destroy(),
              (this.element = null)
          },
        }),
        vt(lt, {
          INPUT_START: Dt,
          INPUT_MOVE: xt,
          INPUT_END: wt,
          INPUT_CANCEL: Ot,
          STATE_POSSIBLE: le,
          STATE_BEGAN: pe,
          STATE_CHANGED: fe,
          STATE_ENDED: de,
          STATE_RECOGNIZED: ve,
          STATE_CANCELLED: me,
          STATE_FAILED: ge,
          DIRECTION_NONE: Rt,
          DIRECTION_LEFT: Mt,
          DIRECTION_RIGHT: zt,
          DIRECTION_UP: Nt,
          DIRECTION_DOWN: Xt,
          DIRECTION_HORIZONTAL: Yt,
          DIRECTION_VERTICAL: Ft,
          DIRECTION_ALL: Wt,
          Manager: pt,
          Input: P,
          TouchAction: $,
          TouchInput: V,
          MouseInput: k,
          PointerEventInput: L,
          TouchMouseInput: G,
          SingleTouchInput: H,
          Recognizer: tt,
          AttrRecognizer: st,
          Tap: ct,
          Pan: rt,
          Swipe: ut,
          Pinch: ot,
          Rotate: ht,
          Press: at,
          on: m,
          off: g,
          each: c,
          merge: gt,
          extend: mt,
          assign: vt,
          inherit: p,
          bindFn: f,
          prefixed: b,
        }),
        (Ee = a !== s ? s : 'undefined' != typeof self ? self : {}),
        (Ee.Hammer = lt),
        (i = function() {
          return lt
        }.call(e, n, e, t)) !== a && (t.exports = i)
    })(window, document)
  },
})
