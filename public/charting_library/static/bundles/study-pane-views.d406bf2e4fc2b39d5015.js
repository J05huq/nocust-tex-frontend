webpackJsonp([24], {
  703: function(e, t, i) {
    'use strict'
    var n, r, s, d, a, o, l, h
    Object.defineProperty(t, '__esModule', { value: !0 }),
      i.d(t, 'VertLinePaneView', function() {
        return h
      }),
      (n = i(7)),
      i.n(n),
      (r = i(6)),
      i.n(r),
      (s = i(17)),
      (d = i(9)),
      (a = i(69)),
      (o = i(103)),
      (l = i(185)),
      i.n(l),
      (h = (function() {
        function e(e, t) {
          ;(this._data = []), (this._invalidated = !0), (this._study = e), (this._model = t)
        }
        return (
          (e.prototype.update = function() {
            this._invalidated = !0
          }),
          (e.prototype.renderer = function() {
            var e, t, i, n, r
            for (
              this._invalidated && (this._updateViewInternal(), (this._invalidated = !1)),
                e = new a.CompositeRenderer(),
                t = 0,
                i = this._data;
              t < i.length;
              t++
            )
              (n = i[t]),
                (r = new l.TrendLineRenderer()),
                r.setData(n),
                r.setHitTest(new d.HitTestResult(d.HitTestResult.REGULAR)),
                e.append(r)
            return e
          }),
          (e.prototype._updateViewInternal = function() {
            var e,
              t,
              i,
              d,
              a,
              l,
              h,
              u = this
            ;(this._data = []),
              (e = this._study.priceScale()),
              (t = this._model.timeScale()),
              !e ||
                e.isEmpty() ||
                t.isEmpty() ||
                ((i = this._study.graphics().vertlines()),
                0 !== i.size &&
                  null !== (d = this._model.timeScale().visibleBars()) &&
                  null != (a = this._study.firstValue()) &&
                  ((l = d.firstBar()),
                  (h = d.lastBar()),
                  i.forEach(function(i, d) {
                    var p,
                      c,
                      _,
                      f,
                      v,
                      m,
                      w,
                      y,
                      g,
                      E,
                      x,
                      T,
                      R,
                      b = u._study.properties().graphics.vertlines[d]
                    if (b.visible.value())
                      for (p = 0, c = i; p < c.length; p++)
                        for (_ = c[p], f = _.indexes, v = 0, m = _.items; v < m.length; v++)
                          (w = m[v]),
                            (y = f[w.index]) === s.REMOVE_INDEX_MAGIC_NUMBER ||
                              y < l ||
                              h < y ||
                              ((g = t.indexToCoordinate(y) + 1),
                              (E = w.extendBottom
                                ? e.height()
                                : e.priceToCoordinate(Object(n.ensureDefined)(w.startPrice), a)),
                              (x = w.extendTop
                                ? 0
                                : e.priceToCoordinate(Object(n.ensureDefined)(w.endPrice), a)),
                              (T = new r.Point(g, E)),
                              (R = new r.Point(g, x)),
                              u._data.push({
                                points: [T, R],
                                extendleft: w.extendBottom,
                                extendright: w.extendTop,
                                leftend: o.LineEnd.Normal,
                                rightend: o.LineEnd.Normal,
                                width: t.width(),
                                height: e.height(),
                                color: b.color.value(),
                                linewidth: b.width.value(),
                                linestyle: b.style.value(),
                              }))
                  })))
          }),
          e
        )
      })())
  },
})
