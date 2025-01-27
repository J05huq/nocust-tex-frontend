webpackJsonp([26], {
  821: function(e, t, i) {
    'use strict'
    function n(e, t) {
      var i, n, o, d, f, h, m, g, v, w, O, b, P, x, N, T, y, S, j, I, _, R, k, B
      for (
        void 0 === t && (t = {}),
          n = Object.assign({}, p, t),
          o = { schema: [], data: [] },
          d = e.timeScale().points(),
          f = e.mainSeries(),
          h = c(e, n.includedStudies),
          m = l(d, [f.bars()], n.from, n.to),
          g = m.firstBar(),
          v = m.lastBar(),
          n.includeTime && o.schema.push({ type: 'time' }),
          w = o.schema.length,
          n.includeSeries &&
            (o.schema.push(r('open')),
            o.schema.push(r('high')),
            o.schema.push(r('low')),
            o.schema.push(r('close'))),
          O = o.schema.length,
          b = [],
          P = 0,
          x = h;
        P < x.length;
        P++
      )
        (N = x[P]), (T = s(N)), b.push(T), (i = o.schema).push.apply(i, T.fields)
      if (0 === (y = o.schema.length)) return o
      for (S = g; S <= v; ++S) (j = new Float64Array(y)), j.fill(NaN), o.data.push(j)
      if (n.includeTime)
        for (S = g; S <= v; ++S) o.data[S - g][0] = Object(u.ensureNotNull)(d.valueAt(S))
      for (
        n.includeSeries &&
          ((I = f.bars().range(g, v)),
          I.each(function(e, t) {
            var i = o.data[e - g]
            return (
              (i[w] = a(t[1])), (i[w + 1] = a(t[2])), (i[w + 2] = a(t[3])), (i[w + 3] = a(t[4])), !1
            )
          })),
          _ = 0;
        _ < h.length;
        ++_
      ) {
        for (
          N = h[_],
            R = b[_],
            k = function(e) {
              var t = R.fieldPlotOffsets[e],
                i = R.fieldToPlotIndex[e],
                n = g - t,
                l = v - t,
                s = O + e
              N.data()
                .range(n, l)
                .each(function(e, t) {
                  return (o.data[e - n][s] = a(t[i])), !1
                })
            },
            B = 0;
          B < R.fields.length;
          ++B
        )
          k(B)
        O += R.fields.length
      }
      return o
    }
    function l(e, t, i, n) {
      var l,
        s,
        o,
        r,
        a,
        c = Object(u.ensureNotNull)(void 0 !== i ? e.indexOf(i, !0) : e.firstIndex()),
        h = Object(u.ensureNotNull)(void 0 !== n ? e.indexOf(n, !0) : e.lastIndex()),
        p = h,
        m = c
      for (l = 0, s = t; l < s.length; l++)
        (o = s[l]),
          (r = o.search(c, f.PlotRowSearchMode.NearestRight)),
          null !== r && r.index < p && (p = r.index),
          null !== (a = o.search(h, f.PlotRowSearchMode.NearestLeft)) &&
            a.index > m &&
            (m = a.index)
      return (
        Object(u.assert)(p <= m, 'Range must contain at least 1 time point'), new d.BarsRange(p, m)
      )
    }
    function s(e) {
      var t,
        i,
        n,
        l,
        s,
        r = e.metaInfo(),
        a = { fieldToPlotIndex: [], fieldPlotOffsets: [], fields: [] },
        c = e.id(),
        u = e.title(!1, void 0, !1)
      for (t = 0; t < r.plots.length; ++t) {
        if (((i = r.plots[t]), (n = void 0), (l = ''), Object(h.isLinePlot)(i))) n = r.styles[i.id]
        else if (Object(h.isOhlcPlot)(i))
          switch (((n = r.ohlcPlots && r.ohlcPlots[i.target]), i.type)) {
            case 'ohlc_open':
              l = ' (' + window.t('Open') + ')'
              break
            case 'ohlc_high':
              l = ' (' + window.t('High')
              break
            case 'ohlc_low':
              l = ' (' + window.t('Low') + ')'
              break
            case 'ohlc_close':
              l = ' (' + window.t('Close') + ')'
          }
        void 0 === n ||
          n.isHidden ||
          void 0 === n.title ||
          ((s = '' + n.title + l),
          a.fields.push(o(c, u, s)),
          a.fieldToPlotIndex.push(t + 1),
          a.fieldPlotOffsets.push(e.offset(i.id)))
      }
      return a
    }
    function o(e, t, i) {
      return { type: 'value', sourceType: 'study', sourceId: e, sourceTitle: t, plotTitle: i }
    }
    function r(e) {
      return { type: 'value', sourceType: 'series', plotTitle: e }
    }
    function a(e) {
      return null != e ? e : NaN
    }
    function c(e, t) {
      var i = e.allStudies().filter(function(e) {
        return e.showInObjectTree()
      })
      return 'all' === t
        ? i
        : i.filter(function(e) {
            return t.includes(e.id())
          })
    }
    var u, d, f, h, p
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.exportData = n),
      i(11),
      (u = i(7)),
      i.n(u),
      (d = i(214)),
      (f = i(17)),
      (h = i(86)),
      (p = { includeTime: !0, includeSeries: !0, includedStudies: 'all' })
  },
})
