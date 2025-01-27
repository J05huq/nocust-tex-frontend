webpackJsonp([16, 2], {
  188: function(t, e, i) {
    'use strict'
    function o(t) {
      var e = t.type || 'popup'
      return delete t.type, 'modal' === e ? new n.TVModal(t) : new s.TVPopup(t)
    }
    var n, s
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (n = i(837)),
      (s = i(843)),
      (e.createDialog = o)
  },
  690: function(t, e, i) {
    'use strict'
    var o
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (o = i(839)),
      i.n(o),
      i.o(o, 'TVDialogAbstract') &&
        i.d(e, 'TVDialogAbstract', function() {
          return o.TVDialogAbstract
        }),
      i.o(o, 'closeAllDialogs') &&
        i.d(e, 'closeAllDialogs', function() {
          return o.closeAllDialogs
        })
  },
  692: function(t, e, i) {
    ;(function(t) {
      function o(t, e, i, o, n) {
        h.call(this, t, e),
          (this._study = i),
          (this._showOnlyConfirmInputs = o),
          (this._symbolSearchZindex = n),
          this.prepareLayout(),
          (this._$symbolSearchPopup = null)
      }
      var n = i(823),
        s = n.UppercaseTransformer,
        r = n.SymbolBinder,
        a = n.BarTimeBinder,
        l = n.SessionBinder,
        h = n.PropertyPage,
        c = n.GreateTransformer,
        u = n.LessTransformer,
        d = n.ToIntTransformer,
        p = n.ToFloatTransformer,
        f = n.SymbolInfoSymbolTransformer,
        _ = n.SimpleComboBinder,
        v = n.BooleanBinder,
        g = n.SimpleStringBinder,
        y = i(128).bindToInput,
        m = i(105).NumericFormatter,
        b = i(26),
        C = i(4).getLogger('Chart.Study.PropertyPage.Inputs')
      inherit(o, h),
        (o.prototype._addSessionEditor = function(t, e, i, o) {
          var n, s, r, a, h, c
          if ('session' !== i.type)
            return void C.logError('Session editor adding FAILED: wrong input type.')
          ;(n = function(t, e) {
            var i,
              o = $('<td/>')
            o.appendTo(t),
              o.css('padding-left', '0px'),
              o.css('padding-right', '0px'),
              (i = $('<input>')),
              i.attr('type', 'text'),
              i.addClass('ticker'),
              i.css('width', '40px'),
              i.attr('id', e),
              i.appendTo(o)
          }),
            (s = function(t, e, i) {
              var o,
                n = $('<td/>')
              n.css('padding-left', i),
                n.css('padding-right', i),
                n.appendTo(t),
                (o = $('<div/>')),
                o.appendTo(n),
                o.append(e),
                o.css('font-size', '150%')
            }),
            (r = $('<table/>')),
            r.appendTo(t),
            (a = $('<tr/>')),
            a.appendTo(r),
            (h = ['start_hours', 'start_minutes', 'end_hours', 'end_minutes']),
            n.call(this, a, h[0]),
            s.call(this, a, ':', 0),
            n.call(this, a, h[1]),
            s.call(this, a, '-', 4),
            n.call(this, a, h[2]),
            s.call(this, a, ':', 0),
            n.call(this, a, h[3]),
            (c = !1),
            this.bindControl(new l(a, h, e, c, this.model(), o))
        }),
        (o.prototype.prepareControl = function(e, i, o) {
          function n(t) {
            return function(e) {
              var i,
                o,
                n,
                s = this,
                r = null
              if (0 === e.indexOf('#')) {
                if (
                  ((i = e.slice(1, e.indexOf('$'))),
                  null === (o = I._model.model().getStudyById(i)))
                )
                  return void C.logError('Can not get Study by id ' + i)
                if ((o.isStarted() || o.start(null, !0), !(n = o.sourceId())))
                  return void C.logError('Can not get source id for ' + o.metaInfo().id)
                r = e.replace(/^[^\$]+/, n)
              }
              ;(!~e.indexOf('$') && !~e.indexOf('#')) ||
                I._study.isStarted() ||
                I._study.start(null, !0),
                I._study.testInputValue(t, e)
                  ? s.setValueToProperty(r || s.value())
                  : s.setValue(I._property.inputs[t.id].value())
            }
          }
          function s(t) {
            return function(e) {
              var i, o, n, s
              if (t.hasOwnProperty(e) || 0 === e.indexOf('#') || !~e.indexOf('$')) return e
              for (
                i = e.slice(0, e.indexOf('$')), o = I._model.model().allStudies(), n = 0;
                n < o.length;
                ++n
              )
                if (((s = o[n]), s.sourceId() === i)) {
                  e = e.replace(/^[^\$]+/, '#' + s.id())
                  break
                }
              return e
            }
          }
          var r,
            a,
            l,
            h,
            c,
            u,
            d,
            p,
            f,
            _,
            v,
            g,
            m,
            w,
            T,
            k,
            x,
            S,
            O,
            M,
            P,
            I = this,
            V = null,
            E = null,
            B = null
          if ('resolution' === e.type)
            V = $(
              '<select><option value="1">1</option><option value="3">3</option><option value="5">5</option><option value="15">15</option><option value="30">30</option><option value="45">45</option><option value="60">1' +
                window.t('h', { context: 'interval_short' }) +
                '</option><option value="120">2' +
                window.t('h', { context: 'interval_short' }) +
                '</option><option value="180">3' +
                window.t('h', { context: 'interval_short' }) +
                '</option><option value="D">1' +
                window.t('D', { context: 'interval_short' }) +
                '</option><option value="W">1' +
                window.t('W', { context: 'interval_short' }) +
                '</option></select>',
            )
          else if ('symbol' === e.type)
            (V = $('<input class="symbol-edit single">')),
              y(V, {
                onPopupOpen: function(t) {
                  ;(this._$symbolSearchPopup = t),
                    this._symbolSearchZindex && t.css('z-index', this._symbolSearchZindex)
                }.bind(this),
                onPopupClose: function() {
                  this._$symbolSearchPopup = null
                }.bind(this),
              }),
              i.attr('colspan', 5)
          else if ('session' === e.type)
            this._addSessionEditor(i, this._property.inputs[e.id], e, o)
          else if ('source' === e.type) {
            for (
              r = {},
                a = {
                  open: window.t('open'),
                  high: window.t('high'),
                  low: window.t('low'),
                  close: window.t('close'),
                  hl2: window.t('hl2'),
                  hlc3: window.t('hlc3'),
                  ohlc4: window.t('ohlc4'),
                },
                l = Object.keys(a),
                h = 0;
              h < l.length;
              ++h
            )
              r[l[h]] || (r[l[h]] = l[h])
            if ((c = this._study && this._study.isChildStudy())) {
              ;(u = this._study.source()),
                (d = u.title(!0, null, !0)),
                (p = b.getChildSourceInputTitles(e, this._study.source().metaInfo(), d))
              for (f in r) p[f] && (r[f] = 1 === Object.keys(p).length ? d : p[f])
            }
            if (
              t.enabled('study_on_study') &&
              this._study &&
              b.isSourceInput(e) &&
              (c || b.canBeChild(this._study.metaInfo()))
            ) {
              for (
                _ = [this._study],
                  _ = _.concat(this._study.getAllChildren()),
                  v = this._model.model().allStudies(),
                  g = 0;
                g < v.length;
                ++g
              )
                if (((m = v[g]), -1 === _.indexOf(m) && m.canHaveChildren()))
                  if (
                    ((w = m.title(!0, null, !0)),
                    (T = m.sourceId() || '#' + m.id()),
                    (k = m.metaInfo()),
                    (x = k.styles),
                    (S = k.plots || []),
                    1 === S.length)
                  )
                    r[T + '$0'] = w
                  else
                    for (h = 0; h < S.length; ++h)
                      (O = S[h]),
                        ~b.CHILD_STUDY_ALLOWED_PLOT_TYPES.indexOf(O.type) &&
                          (r[T + '$' + h] = w + ': ' + ((x && x[O.id] && x[O.id].title) || O.id))
              ;(E = n(e)), (B = s(r))
            }
            V = $(document.createElement('select'))
            for (M in r)
              (P = a[M] || r[M]),
                $('<option>')
                  .attr('value', M)
                  .text(P)
                  .appendTo(V)
            i.addClass('js-value-cell')
          } else if (e.options)
            for (V = $('<select/>'), g = 0; g < e.options.length; g++)
              (M = e.options[g]), $("<option value='" + M + "'>" + M + '</option>').appendTo(V)
          else
            (V = $('<input/>')),
              'bool' === e.type ? V.attr('type', 'checkbox') : V.attr('type', 'text')
          return (
            V &&
              (V.appendTo(i), V.is(':checkbox') || 'symbol' === e.type || V.css('width', '100px')),
            { valueEditor: V, valueSetter: E, propertyChangedHook: B }
          )
        }),
        (o.prototype._symbolInfoBySymbolProperty = function(t) {
          return this._study.resolvedSymbolInfoBySymbol(t.value())
        }),
        (o.prototype._sortInputs = function(t) {
          return t
        }),
        (o.prototype.prepareLayoutImpl = function(t, e) {
          function i(t) {
            return new m().format(t)
          }
          var o,
            n,
            l,
            h,
            y,
            b,
            C,
            w,
            T,
            k,
            x,
            S,
            O,
            M,
            P,
            I,
            V,
            E,
            B = this._sortInputs(t.inputs)
          for (o = 0; o < B.length; o++)
            (n = B[o]),
              'first_visible_bar_time' !== (l = n.id) &&
                'last_visible_bar_time' !== l &&
                'time' !== n.type &&
                (n.isHidden ||
                  (this._showOnlyConfirmInputs && !n.confirm) ||
                  (void 0 === n.groupId &&
                    ((h =
                      n.name ||
                      l.toLowerCase().replace(/\b\w/g, function(t) {
                        return t.toUpperCase()
                      })),
                    (y = 'Change ' + h),
                    (b = $('<tr/>')),
                    b.appendTo(e),
                    (C = $('<td/>')),
                    C.appendTo(b),
                    C.addClass('propertypage-name-label'),
                    C.text(window.t(h, { context: 'input' })),
                    (w = $('<td/>')),
                    w.appendTo(b),
                    (T = this.prepareControl(n, w, y)),
                    (k = T.valueEditor),
                    (x = T.valueSetter),
                    (S = T.propertyChangedHook),
                    n.options
                      ? this.bindControl(
                          new _(k, this._property.inputs[l], null, !0, this.model(), y, x, S),
                        )
                      : 'bar_time' === n.type
                      ? ((O = 10),
                        this.bindControl(
                          new a(
                            k,
                            this._property.inputs[l],
                            !0,
                            this.model(),
                            y,
                            this.model().mainSeries(),
                            O,
                          ),
                        ),
                        k.addClass('ticker'))
                      : 'integer' === n.type
                      ? ((M = [d(n.defval)]),
                        (0 === n.min || n.min) && M.push(c(n.min)),
                        (0 === n.max || n.max) && M.push(u(n.max)),
                        this.bindControl(
                          new g(k, this._property.inputs[l], M, !1, this.model(), y),
                        ),
                        k.addClass('ticker'),
                        isFinite(n.step) && n.step > 0 && k.attr('data-step', n.step))
                      : 'float' === n.type
                      ? ((M = [p(n.defval)]),
                        (0 === n.min || n.min) && M.push(c(n.min)),
                        (0 === n.max || n.max) && M.push(u(n.max)),
                        (P = new g(k, this._property.inputs[l], M, !1, this.model(), y)),
                        P.addFormatter(i),
                        this.bindControl(P),
                        k.addClass('ticker'),
                        isFinite(n.step) && n.step > 0 && k.attr('data-step', n.step))
                      : 'text' === n.type
                      ? this.bindControl(
                          new g(k, this._property.inputs[l], null, !1, this.model(), y),
                        )
                      : 'bool' === n.type
                      ? this.bindControl(new v(k, this._property.inputs[l], !0, this.model(), y))
                      : 'resolution' === n.type
                      ? this.bindControl(
                          new _(
                            k,
                            this._property.inputs[l],
                            s,
                            !0,
                            this.model(),
                            'Change Interval',
                          ),
                        )
                      : 'symbol' === n.type &&
                        ((I = this._symbolInfoBySymbolProperty.bind(
                          this,
                          this._property.inputs[l],
                        )),
                        (V = f(I, this._property.inputs[l])),
                        (E = new r(
                          k,
                          this._property.inputs[l],
                          !0,
                          this.model(),
                          'Change Symbol',
                          V,
                          this._study.symbolsResolved(),
                        )),
                        this.bindControl(E)))))
          this._property.offset &&
            ((h = this._property.offset.title
              ? this._property.offset.title.value()
              : window.t('Offset')),
            (k = this.addOffsetEditorRow(e, h)),
            (M = [d(this._property.offset.val)]),
            M.push(c(this._property.offset.min)),
            M.push(u(this._property.offset.max)),
            this.bindControl(
              new g(k, this._property.offset.val, M, !1, this.model(), 'Undo ' + h),
            )),
            this._property.offsets &&
              $.each(
                t.plots,
                function(t, i) {
                  var o, n, s
                  this._property.offsets[i.id] &&
                    ((o = this._property.offsets[i.id]),
                    (void 0 !== o.isHidden && o.isHidden.value()) ||
                      ((n = o.title.value()),
                      (k = this.addOffsetEditorRow(e, n)),
                      (s = [d(o.val)]),
                      s.push(c(o.min)),
                      s.push(u(o.max)),
                      this.bindControl(new g(k, o.val, s, !1, this.model(), 'Undo ' + n))))
                }.bind(this),
              )
        }),
        (o.prototype.prepareLayout = function() {
          ;(this._table = $('<table/>')),
            this._table.addClass('property-page'),
            this._table.attr('cellspacing', '0'),
            this._table.attr('cellpadding', '2')
          var t = this._study.metaInfo()
          this.prepareLayoutImpl(t, this._table), this.loadData()
        }),
        (o.prototype.symbolSearchPopup = function() {
          return this._$symbolSearchPopup
        }),
        (o.prototype.widget = function() {
          return this._table
        }),
        (e.StudyInputsPropertyPage = o)
    }.call(e, i(5)))
  },
  695: function(t, e, i) {
    'use strict'
    function o(t) {
      return t && t.__esModule ? t : { default: t }
    }
    function n(t, e) {
      var i,
        o,
        n,
        s,
        h,
        p,
        f,
        _,
        v,
        g,
        y,
        m = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
      for (
        m = $.extend({}, { title: $.t('Confirm Inputs'), callback: function(t) {} }, m),
          i = null,
          o = (0, r.createDialog)({
            title: m.title,
            contentWrapTemplate:
              '<div class="tv-dialog__section tv-dialog__section--no-border"></div>',
            width: u,
            closeOnClickAtOtherDialogs: !0,
            destroyOnClose: !0,
            actionsWrapTemplate:
              '<div class="tv-dialog__section tv-dialog__section--actions tv-dialog__section--actions-adaptive tv-dialog__section--no-border">',
            isClickOutFn: function(t) {
              var e = i.symbolSearchPopup()
              if (e) return e[0] !== t.target && !e[0].contains(t.target) && void 0
            },
            actions: [{ name: 'apply', type: 'primary', text: $.t('Apply'), key: 13 }],
          }),
          d = o,
          n = (0, l.merge)({}, e.defaults.inputs),
          s = 0;
        s < e.inputs.length;
        ++s
      )
        (h = e.inputs[s]), h.confirm || delete n[h.id]
      ;(p = new c.default({ inputs: n })),
        (f = {
          metaInfo: function() {
            return e
          },
          symbolsResolved: function() {
            return null
          },
          resolvedSymbolInfoBySymbol: function() {
            return null
          },
        }),
        (_ = o.$content),
        o.open(),
        (i = new a.StudyInputsPropertyPage(p, t.model(), f, !0, o.zIndex)),
        (v = i.widget()),
        _.append(v),
        Array.prototype.forEach.call(_.find('select'), function(t) {
          var e = $(t),
            i = 'tv-select-container dialog'
          e.hasClass('tv-select-container-fontsize') && (i += ' tv-select-container-fontsize'),
            e.selectbox({ speed: 100, classHolder: i })
        }),
        $('input[type="text"]', _).addClass('tv-text-input inset dialog'),
        $('input.ticker', _).TVTicker(),
        o.on('action:apply', function() {
          ;(0, m.callback)(p.state()), o.close()
        }),
        (g = o.$content.innerWidth() - o.$content.width()),
        (y = v.width() + g),
        y > u && o.$el.css('max-width', y),
        _.find('input,select')
          .first()
          .focus()
    }
    function s() {
      return d
    }
    var r, a, l, h, c, u, d
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.show = n),
      (e.instance = s),
      (r = i(188)),
      (a = i(692)),
      (l = i(12)),
      (h = i(13)),
      (c = o(h)),
      i(845),
      (u = 450),
      (d = null)
  },
  823: function(t, e, i) {
    'use strict'
    ;(function(t) {
      function o(t, e) {
        return '<label for="' + e + '">' + t + '</label>'
      }
      function n(t, e) {
        ;(this._model = e),
          (this._bindings = []),
          (this._property = t),
          (this.supportThemeSwitcher = !1)
      }
      function s(t) {
        return t.toUpperCase()
      }
      function r(t) {
        return function(e) {
          return e < t ? t : e
        }
      }
      function a(t) {
        return function(e) {
          return e > t ? t : e
        }
      }
      function l(t) {
        return function(e) {
          var i = parseInt(e, 10)
          return B(i) ? t : i
        }
      }
      function h(t) {
        var e = new D()
        return function(i) {
          var o = e.parse(i)
          return B(o) ? t : o
        }
      }
      function c(t) {
        var e = new D()
        return function(i) {
          var o = e.parse(i)
          return B(o) ? t() : o
        }
      }
      function u(t, e) {
        var i = new z(e)
        return function(e) {
          var o = i.format(e)
          return B(o) ? t : o
        }
      }
      function d() {
        return function(t) {
          for (var e = t, i = t.replace(/[^\u0000-\u007F]/, ''); i.length !== e.length; )
            (e = i), (i = e.replace(/[^\u0000-\u007F]/, ''))
          return i
        }
      }
      function p(t) {
        return function(e) {
          return 0 === e.length ? t : e
        }
      }
      function f(t, e) {
        return function(i) {
          var o = t()
          return i === e.value() && o && (o.ticker || o.full_name) ? o.ticker || o.full_name : i
        }
      }
      function _(t, e, i, o, n, s, r) {
        U.call(this, t, e, o, n, s),
          (this._transformFunction = i),
          (this._setter = r),
          this._attachToControl(t, o)
      }
      function v(t, e, i, o, n) {
        _.call(this, t, e, h(e.value()), i, o, n),
          this.addFormatter(function(t) {
            return new D().format(t)
          })
      }
      function g(t, e, i, o, n, s) {
        ;(this._subControlIds = e),
          U.call(this, t, i, o, n, s),
          this._forEachSubControl(function(t) {
            this._attachToControl(t, o)
          })
      }
      function y(t, e, i, o, n, s, r) {
        ;(this._model = o),
          (this._mainSeries = s),
          (this._toIntTransformer = l(r)),
          (this._disabled = !1),
          U.call(this, t, e, i, o, n)
        var a = this
        i &&
          t.change(function() {
            a.setValueToProperty(a.value())
          }),
          this._mainSeries
            .dataEvents()
            .barReceived()
            .subscribe(this, function() {
              a.setValue(this.property().value())
            })
      }
      function m(t, e, i, o, n, s, r) {
        U.call(this, t, e, i, o, n),
          (this._transform = s),
          i &&
            t.on(
              'accept-symbol',
              function(t, e) {
                this.setValueToProperty(e), this.setValue(e)
              }.bind(this),
            ),
          r && (r.subscribe(this, this._updateDisplayedSymbol), (this._updateDelegate = r))
      }
      function b(t, e, i, o, n, s, r, a) {
        U.call(this, t, e, o, n, s),
          (this._transformFunction = i),
          (this._propertyChangedHook = a),
          (this._setter = r)
        var l = this
        o &&
          t.change(function() {
            l._setter ? l._setter.call(l, l.value()) : l.setValueToProperty(l.value())
          })
      }
      function C(t, e) {
        U.call(this, t, e)
      }
      function w(t, e, i, o, n, s) {
        if (!t.is(':checkbox, :radio')) return new k(t, e, i, o, n)
        U.call(this, t, e, i, o, n), (this._setter = s)
        var r = this
        i &&
          t.change(function() {
            r._setter ? r._setter.call(r, r.value()) : r.setValueToProperty(r.value())
          })
      }
      function T(t, e, i, o, n, s) {
        U.call(this, t, e, i, o, n), (this._inverted = !0 === s)
      }
      function k(t, e, i, o, n) {
        U.call(this, t, e, i, o, n)
        var s = this
        i &&
          t.click(function() {
            var t = $(this)
              .toggleClass('active')
              .hasClass('active')
            s.setValueToProperty(t)
          })
      }
      function x(t, e, i, o, n, s) {
        var r, a
        ;(r = t.is('input') ? t : t.find('input')),
          U.call(this, r, e, i, o, n),
          (this._transparencyProperty = s),
          this.applyOldTransparency(),
          (a = this),
          i &&
            r.change(function() {
              a.setValueToProperty(a.value())
            })
      }
      function S(e, i, o, n, s, r) {
        function a(t, e) {
          var i = h.control().slider('option', 'min'),
            o = h.control().slider('option', 'max'),
            n = h._property.value()
          ;((i <= n && n <= o) || (i < e.value && e.value < o)) && h.setValueToProperty(e.value)
        }
        function l(t, e) {
          h.setValueToProperty(e.value)
        }
        isNumber(i.value()) ||
          (N.logWarn(
            'Property cannot be binded to control, bad value (expect number): ' + i.value(),
          ),
          (i = new t())),
          U.call(this, e, i, o, n, s)
        var h = this
        o &&
          (r
            ? (e.bind('slidechange', a), e.bind('slide', a))
            : (e.bind('slidechange', l), e.bind('slide', l))),
          e.bind('slidestart', function(t, e) {
            n.beginUndoMacro(s)
          }),
          e.bind('slidestop', function(t, e) {
            n.endUndoMacro()
          })
      }
      function O(t, e, i, o, n, s) {
        w.call(this, t, e, o, n, s),
          (this._intervalProperty = i),
          this._intervalProperty.listeners().subscribe(this, this.onIntervalChanged),
          this.onIntervalChanged()
      }
      function M(t, e, i, o, n) {
        ;(this._control = t),
          (this._wv = e),
          (this._transformFunction = i),
          (this._undoModel = o),
          (this._undoText = n),
          this._attachToControl(this._control),
          (this._setValueBinded = this.setValue.bind(this))
      }
      function P(t, e, i, o, n, s) {
        ;(this._not = !!s), M.apply(this, arguments)
      }
      function I(t, e, i, o, n, s, r, a) {
        ;(this._propFrom = e[0]),
          (this._propTo = e[1]),
          (this._control = t),
          (this._applyOnFly = o),
          (this._undoModel = n),
          (this._undoText = r),
          (this._properties = e),
          (this._inputsText = s),
          (this._transformers = i)
        var l = this
        t.slider({
          range: !0,
          min: i[0],
          max: i[1],
          values: [l._propFrom.value(), l._propTo.value()],
        }),
          (this.$rangeHandleFrom = $(t.find('.ui-slider-handle')[0]).addClass('from')),
          (this.$rangeHandleTo = $(t.find('.ui-slider-handle')[1]).addClass('to')),
          this.setValue(this._propFrom, 0),
          this.setValue(this._propTo, 1),
          a &&
            ($(a).on('change', function(t) {
              $(this).is(':checked')
                ? (l._control.slider('enable'),
                  $(l._inputsText[0]).prop('disabled', !1),
                  $(l._inputsText[1]).prop('disabled', !1))
                : (l._control.slider('disable'),
                  $(l._inputsText[0]).prop('disabled', !0),
                  $(l._inputsText[1]).prop('disabled', !0))
            }),
            $(a).is(':checked')
              ? (l._control.slider('enable'),
                $(l._inputsText[0]).prop('disabled', !1),
                $(l._inputsText[1]).prop('disabled', !1))
              : (l._control.slider('disable'),
                $(l._inputsText[0]).prop('disabled', !0),
                $(l._inputsText[1]).prop('disabled', !0))),
          s &&
            ($(s[0]).val(this._control.slider('values', 0)),
            $(s[1]).val(this._control.slider('values', 1)),
            t.slider({
              slide: function(t, e) {
                $(s[0]).val(e.values[0]), $(s[1]).val(e.values[1])
              },
            }),
            $(s).each(function() {
              $(this).on('keydown', function(t) {
                parseInt($(s[0]).val()) < l._transformers[0]
                  ? $(s[0]).val(l._transformers[0])
                  : parseInt($(s[1]).val()) > l._transformers[1] && $(s[1]).val(l._transformers[1]),
                  -1 !== $.inArray(t.keyCode, [46, 8, 9, 27, 13, 110, 190]) ||
                    (65 === t.keyCode && !0 === t.ctrlKey) ||
                    (67 === t.keyCode && !0 === t.ctrlKey) ||
                    (88 === t.keyCode && !0 === t.ctrlKey) ||
                    (t.keyCode >= 35 && t.keyCode <= 39) ||
                    ((t.shiftKey || t.keyCode < 48 || t.keyCode > 57) &&
                      (t.keyCode < 96 || t.keyCode > 105) &&
                      t.preventDefault())
              })
            }),
            $(s[0]).on('keyup', function(t) {
              parseInt($(this).val()) < l._transformers[0]
                ? $(this).val(l._transformers[0])
                : parseInt($(this).val()) > l._transformers[1] && $(this).val(l._transformers[1]),
                parseInt($(this).val()) > parseInt($(s[1]).val()) && $(this).val(s[1].val()),
                l._control.slider('values', 0, $(this).val()),
                I.prototype.setValueToProperty.call(l, l._control.slider('values'), 'from')
            }),
            $(s[1]).on('keyup', function(t) {
              parseInt($(this).val()) < l._transformers[0]
                ? $(this).val(l._transformers[0])
                : parseInt($(this).val()) > l._transformers[1] && $(this).val(l._transformers[1]),
                parseInt($(this).val()) < $(s[0]).val() && $(this).val(s[0].val()),
                l._control.slider('values', 1, $(this).val()),
                I.prototype.setValueToProperty.call(l, l._control.slider('values'), 'to')
            })),
          this._propFrom.listeners().subscribe(this, I.prototype.propertyChanged),
          this._propTo.listeners().subscribe(this, I.prototype.propertyChanged),
          o &&
            t.on('slide', function(t, e) {
              l.setValueToProperty(l._control.slider('values'), e.handle)
            }),
          t.slider({
            stop: function(t, e) {
              s &&
                ($(s[0]).val(l._control.slider('values', 0)),
                $(s[1]).val(l._control.slider('values', 1))),
                l.setValueToProperty(l._control.slider('values'), e.handle)
            },
            start: function(t, e) {
              s &&
                ($(s[0]).val(l._control.slider('values', 0)),
                $(s[1]).val(l._control.slider('values', 1))),
                l.setValueToProperty(l._control.slider('values'), e.handle)
            },
          })
      }
      function V(t, e, i, o, n, s) {
        U.call(this, t, e, i, o, n), (this._separator = s || ' ')
        var r = this
        i &&
          t.change(function() {
            r.setValueToProperty(r.value())
          })
      }
      var E, B, j, H, A, F, W, D, z, L, R, U, N
      i(866),
        (E = i(7).ensureNotNull),
        (B = i(83).isNaN),
        (j = i(24)),
        (H = j.rgba),
        (A = j.rgbaToString),
        (F = j.parseRgb),
        (W = i(72).TimePointIndexSearchMode),
        (D = i(105).NumericFormatter),
        (z = i(193).LimitedPrecisionNumericFormatter),
        (L = i(29)),
        (R = i(829).addColorPicker),
        (U = i(317).Binding),
        (N = i(4).getLogger('Chart.PropertyPage')),
        (n.prototype.model = function() {
          return this._model
        }),
        (n.prototype.bindControl = function(t) {
          return this._bindings.push(t), t
        }),
        (n.prototype.unbindControl = function(t) {
          var e = this._bindings.indexOf(t)
          ;-1 !== e && this._bindings.splice(e, 1)
        }),
        (n.prototype.loadData = function() {
          var t, e, i
          for (t = 0; t < this._bindings.length; t++)
            (e = this._bindings[t]),
              e.properties
                ? ((i = e.properties()), e.setValue(i[0], 0), e.setValue(i[1], 1))
                : e.property &&
                  (e.transparencyProperty && e.transparencyProperty()
                    ? e.applyOldTransparency()
                    : e.setValue(e.property().value()))
        }),
        (n.prototype.saveData = function() {
          var t, e
          for (this._model.beginUndoMacro(), t = 0; t < this._bindings.length; t++)
            (e = this._bindings[t]), e.changed() && this._model.setProperty(e.property(), e.value())
          this._model.endUndoMacro()
        }),
        (n.prototype.createLineWidthEditor = function() {
          var t = this._model._chartWidget.widget().prop('ownerDocument')
          return $('<div class="linewidth-slider">', t).slider({ max: 4, min: 1, step: 1 })
        }),
        (n.prototype.createColorPicker = function(t) {
          return R(null, t)
        }),
        (n.prototype.createTextEditor = function(t, e) {
          var i = {}
          return (
            t && (i.width = t),
            e && (i.height = e),
            $(document.createElement('textarea'))
              .css(i)
              .addClass('tv-control-input')
          )
        }),
        (n.prototype.createCombo = function(t) {
          var e = $(document.createElement('select')),
            i = t.reduce(function(t, e) {
              return t.add($(document.createElement('option')).prop({ value: e, text: e }))
            }, $())
          return e.append(i)
        }),
        (n.prototype.createKeyCombo = function(t) {
          var e = $(document.createElement('select'))
          return (
            $.each(t || [], function(t, i) {
              $(document.createElement('option'))
                .prop({ value: t, text: i })
                .appendTo(e)
            }),
            e
          )
        }),
        (n.prototype.createFontEditor = function(t) {
          var e = t || TradingView.factoryDefaults('chartproperties.editorFontsList')
          return this.createCombo(e)
        }),
        (n.prototype.createFontSizeEditor = function(t) {
          var e = t || [10, 11, 12, 14, 16, 20, 24, 28, 32, 40]
          return this.createCombo(e).addClass('tv-select-container-fontsize')
        }),
        (n.prototype.createSeriesMinTickEditor = function() {
          var t,
            e,
            i,
            o,
            n = "<select><option value='default'>" + $.t('Default') + '</option>',
            s = [
              { priceScale: 1, minMove: 1, frac: !1 },
              { priceScale: 10, minMove: 1, frac: !1 },
              { priceScale: 100, minMove: 1, frac: !1 },
              { priceScale: 1e3, minMove: 1, frac: !1 },
              { priceScale: 1e4, minMove: 1, frac: !1 },
              { priceScale: 1e5, minMove: 1, frac: !1 },
              { priceScale: 1e6, minMove: 1, frac: !1 },
              { priceScale: 1e7, minMove: 1, frac: !1 },
              { priceScale: 1e8, minMove: 1, frac: !1 },
              { priceScale: 2, minMove: 1, frac: !0 },
              { priceScale: 4, minMove: 1, frac: !0 },
              { priceScale: 8, minMove: 1, frac: !0 },
              { priceScale: 16, minMove: 1, frac: !0 },
              { priceScale: 32, minMove: 1, frac: !0 },
              { priceScale: 64, minMove: 1, frac: !0 },
              { priceScale: 128, minMove: 1, frac: !0 },
              { priceScale: 320, minMove: 1, frac: !0 },
            ]
          for (t in s)
            (e = s[t]),
              (i = e.priceScale + ',' + e.minMove + ',' + e.frac),
              (o = e.minMove + '/' + e.priceScale),
              (n += "<option value='" + i + "'>" + o + '</option>')
          return (n += '</select>'), $(n)
        }),
        (n.prototype.createPrecisionEditor = function() {
          var t,
            e = "<select><option value='default'>" + $.t('Default') + '</option>'
          for (t = 0; t <= 8; t++) e += "<option value='" + t + "'>" + t + '</option>'
          return (e += '</select>'), $(e)
        }),
        (n.prototype.createLabeledCell = function(t, e, i) {
          var o,
            n,
            s,
            r,
            a = null
          return (
            'number' == typeof t.valueOf() ? ((a = t), (o = e), (n = i)) : ((o = t), (n = e)),
            (o += ''),
            (s = this._labelToId(o)),
            (r = $('<td>')),
            $('<label>')
              .html(o.length > 0 ? $.t(o) : '')
              .attr('for', s)
              .appendTo(r),
            a && r.attr('colspan', a),
            n && n.attr('id', s),
            r
          )
        }),
        (n.prototype.createTableInTable = function(t) {
          var e = $('<tr>').appendTo(t),
            i = $('<td>').appendTo(e)
          return $('<table cellpadding="0" cellspacing="0">').appendTo(i)
        }),
        (n.prototype._labelToId = function(t) {
          return (
            'control' +
            t.replace(/(^| )\w/g, function(t) {
              return '-' + t.trim().toLowerCase()
            }) +
            Math.floor(1e3 * Math.random())
          )
        }),
        (n.prototype.addRow = function(t) {
          return $(document.createElement('tr')).appendTo(t)
        }),
        (n.prototype.addLabeledRow = function(t, e, i, n) {
          var s,
            r = e && e.length > 0 ? $.t(e) : '',
            a = $(document.createElement('tr')),
            l = $(document.createElement('td')).html(r)
          return (
            n && ((n = parseInt(n)), B(n) && (n = 2), l.attr('colspan', n)),
            i && ((s = this._labelToId(e)), i.attr('id', s), l.html(o(r, s))),
            a.append(l).appendTo(t)
          )
        }),
        (n.prototype.addEditorRow = function(t, e, i, o) {
          var n = $(document.createElement('td'))
          return (i.row = this.addLabeledRow(t, e, i, o)), i.appendTo(n.appendTo(i.row)), i
        }),
        (n.prototype.addColorPickerRow = function(t, e) {
          return this.addEditorRow(t, e, this.createColorPicker())
        }),
        (n.prototype.addOffsetEditorRow = function(t, e) {
          var i = $('<input/>')
          return (
            i.attr('type', 'text'),
            i.css('width', '100px'),
            i.addClass('ticker'),
            this.addEditorRow(t, e, i)
          )
        }),
        (n.prototype.addFontEditorRow = function(t, e) {
          return this.addEditorRow(t, e, this.createFontEditor())
        }),
        (n.prototype.refreshStateControls = function(t, e, i) {
          var o, n, s
          for (o = 0; o < e.length; o++) {
            ;(n = e[o]), (s = t[n.id])
            try {
              s.toggle(this.parseRule(n.visible, e, i))
            } catch (t) {
              continue
            }
            s.attr('disabled', !this.parseRule(n.visible, e, i))
          }
        }),
        (n.prototype.parseRule = function(t, e, i) {
          if (!t) return !0
          var o = t.split('==')
          return !(o.length < 2) && i[o[0]].value() === o[1]
        }),
        (n.prototype.destroy = function() {
          for (var t = this._bindings.length; t--; ) this._bindings[t].destroy()
          this._bindings.length = 0
        }),
        (n.prototype.bindInteger = function(t, e, i, o, n) {
          var s = [l(e.value())]
          void 0 !== o && s.push(r(1)),
            void 0 !== n && s.push(a(1e3)),
            this.bindControl(new _(t, e, s, !1, this.model(), i))
        }),
        (n.prototype.bindColor = function(t, e, i) {
          this.bindControl(new x(t, e, !0, this.model(), i))
        }),
        (n.prototype.bindBoolean = function(t, e, i) {
          this.bindControl(new w(t, e, !0, this.model(), i))
        }),
        inherit(_, U),
        (_.prototype.value = function() {
          var t,
            e = this._control.val()
          if (this._transformFunction)
            if (Array.isArray(this._transformFunction))
              for (t = 0; t < this._transformFunction.length; t++) e = this._transformFunction[t](e)
            else e = this._transformFunction(e)
          return e
        }),
        (_.prototype.setValue = function(t) {
          var e = this._control.val(),
            i = this._formatValue(t)
          e !== i && this._control.val(i)
        }),
        (_.prototype.setValueToProperty = function(t) {
          this._setter
            ? this._setter.call(this, this.value())
            : this._undoModel.setProperty(this._property, t, this._undoText),
            (this._changed = !1)
        }),
        inherit(v, _),
        inherit(g, U),
        (g.prototype._forEachSubControl = function(t) {
          this._subControlIds.forEach(function(e) {
            var i = '#' + e,
              o = this.control().find(i)
            t.call(this, o)
          }, this)
        }),
        (g.prototype._parseSessions = function(t) {
          var e,
            i,
            o = t.split('-', 2)
          return (
            2 !== o.length && (o = ['0', '0']),
            (e = parseInt(o[0])),
            (i = parseInt(o[1])),
            [Math.floor(e / 100), e % 100, Math.floor(i / 100), i % 100]
          )
        }),
        (g.prototype.value = function() {
          var t,
            e,
            i,
            o = []
          return (
            this._forEachSubControl(function(t) {
              o.push(t.val())
            }),
            (t = function(t, e) {
              return (
                e.forEach(function(e) {
                  t = e(t)
                }),
                ('0' + t).slice(-2)
              )
            }),
            (e = [l(0), r(0), a(23)]),
            (i = [l(0), r(0), a(59)]),
            t(o[0], e) + t(o[1], i) + '-' + t(o[2], e) + t(o[3], i)
          )
        }),
        (g.prototype.setValue = function(t) {
          var e = this._parseSessions(t)
          this._forEachSubControl(function(t) {
            var i = t.val(),
              o = ('0' + e[0]).slice(-2)
            e.shift(), i !== o && t.val(o)
          })
        }),
        inherit(y, U),
        (y.prototype.value = function() {
          var t, e, i
          return this._disabled
            ? (this._control.attr('disabled', !0), null)
            : ((t = this._control.val()),
              (e = this._toIntTransformer(t)),
              e < 0 && (e = 0),
              (i = this._mainSeries.bars().size()),
              i <= e && (e = i - 1),
              1e3 *
                E(this._mainSeries.bars().valueAt(E(this._mainSeries.bars().lastIndex()) - e))[
                  TradingView.TIME_PLOT
                ])
        }),
        (y.prototype.setValue = function(t) {
          var e, i, o
          return this._disabled || null == t
            ? void this._control.attr('disabled', !0)
            : t < 0
            ? (this._control.val(-t), void this._property.setValue(this.value()))
            : null ===
              (e = this._mainSeries
                .data()
                .plotValueToTimePointIndex(t / 1e3, TradingView.TIME_PLOT, W.FromRight))
            ? void (this._disabled = !0)
            : ((i = E(this._mainSeries.bars().lastIndex())),
              (o = i - e),
              void (this._control.val() !== '' + o && this._control.val(o)))
        }),
        inherit(m, U),
        (m.prototype.value = function() {
          return this._control.val()
        }),
        (m.prototype.setValue = function(t) {
          var e = this.value()
          this._transform && (t = this._transform(t)), t && e !== t && this._control.val(t)
        }),
        (m.prototype._updateDisplayedSymbol = function() {
          this.setValue(this._property.value())
        }),
        (m.prototype.destroy = function() {
          U.prototype.destroy.call(this),
            this._updateDelegate &&
              this._updateDelegate.unsubscribe(this, this._updateDisplayedSymbol)
        }),
        inherit(b, U),
        (b.prototype.value = function() {
          var t = this._control.val()
          return this._transformFunction && (t = this._transformFunction(t)), t
        }),
        (b.prototype.setValue = function(t) {
          var e, i
          if ((this._control.val(t), this._control.selectbox))
            try {
              ;(e = this._control.find("[value='" + t + "']")),
                e.length > 0 && ((i = e[0]), this._control.selectbox('change', i.value, i.text))
            } catch (t) {}
        }),
        (b.prototype.propertyChanged = function(t) {
          var e = t.value()
          'function' == typeof this._propertyChangedHook && (e = this._propertyChangedHook(e)),
            this.setValue(e)
        }),
        inherit(C, U),
        (C.prototype.value = function() {
          return this._property.value()
        }),
        (C.prototype.setValue = function(t) {
          return this._control.html(t)
        }),
        inherit(w, U),
        (w.prototype.value = function() {
          return this.control().is(':checked')
        }),
        (w.prototype.setValue = function(t) {
          var e, i, o, n
          return (
            this.control().is('.visibility-checker') &&
              (t
                ? (this.control()
                    .closest('tr')
                    .find('.slider-range')
                    .slider('enable'),
                  this.control()
                    .closest('tr')
                    .find('input[type="text"]')
                    .each(function() {
                      $(this).prop('disabled', !1)
                    }))
                : (this.control()
                    .closest('tr')
                    .find('.slider-range')
                    .slider('disable'),
                  this.control()
                    .closest('tr')
                    .find('input[type="text"]')
                    .each(function() {
                      $(this).prop('disabled', !0)
                    }))),
            this.control().is('.visibility-switch') &&
              ((e = { opacity: t ? 1 : 0.5 }),
              (i = t ? 'enable' : 'disable'),
              (o = this.control().data('hides')),
              o
                ? o.closest('td').css(e)
                : ((n = this.control()),
                  n
                    .parent()
                    .parent()
                    .data('visible', t)
                    .find('td')
                    .filter(function() {
                      var t = $(this)
                      return (
                        !t.find('label').length && t.find(':checkbox').attr('id') !== n.attr('id')
                      )
                    })
                    .each(function() {
                      var o = $(this)
                      o.children().each(function() {
                        var n = $(this)
                        n.is('.ui-slider')
                          ? n.slider(i)
                          : n.is('select')
                          ? (n.selectbox(i), o.css(e))
                          : n.is('.custom-select')
                          ? (n.data(i)(), o.css(e))
                          : n.is('.tvcolorpicker-container')
                          ? (n.find('input').prop('disabled', !t), o.css(e))
                          : (n.prop('disabled', !t), o.css(e))
                      })
                    }))),
            this.control().attr('checked', !!t)
          )
        }),
        (w.prototype.destroy = function() {
          U.prototype.destroy.call(this), this._control.off('change')
        }),
        inherit(T, U),
        (T.prototype.value = function() {
          return this.control().is(':disabled')
        }),
        (T.prototype.setValue = function(t) {
          return (
            (t = !!t),
            this._inverted && (t = !t),
            this.control()
              .parents('label')
              .toggleClass('disabled', t),
            this.control().attr('disabled', t)
          )
        }),
        inherit(k, U),
        (k.prototype.value = function() {
          return this.control().hasClass('active')
        }),
        (k.prototype.setValue = function(t) {
          return this.control().toggleClass('active', !!t)
        }),
        inherit(x, U),
        (x.prototype.applyOldTransparency = function() {
          var t, e, i
          this.transparencyProperty() &&
            (L.isHexColor(this.property().value())
              ? ((t = this.transparencyProperty().value
                  ? this.transparencyProperty().value()
                  : this.transparencyProperty()),
                (e = F(this.property().value())),
                (i = (100 - t) / 100),
                this.control().val(A(H(e, i))))
              : this.control().val(this.property().value()),
            this.control().change())
        }),
        (x.prototype.transparencyProperty = function() {
          return this._transparencyProperty
        }),
        (x.prototype.value = function() {
          return this._control.val()
        }),
        (x.prototype.setValue = function(t) {
          this._control.val(t),
            this._control.change(),
            this._control.color && this._control.color.fromString(t)
        }),
        inherit(S, U),
        (S.prototype.value = function() {
          return this._control.slider('option', 'value')
        }),
        (S.prototype.setValue = function(t) {
          this._control.slider('option', 'value', t)
        }),
        inherit(O, w),
        (O.prototype.onIntervalChanged = function() {
          ;+this._intervalProperty.value() < 1440
            ? this._control.attr({ disabled: !1, checked: !!this._property.value() })
            : this._control.attr({ disabled: !0, checked: !1 })
        }),
        (O.prototype.value = function() {
          return this._control.is(':disabled')
            ? this._property.value()
            : w.prototype.value.call(this)
        }),
        (O.prototype.setValue = function(t) {
          if (!this._control.is(':disabled')) return w.prototype.setValue.call(this, t)
        }),
        (O.prototype.destroy = function() {
          this._intervalProperty.listeners().unsubscribe(this, this.onIntervalChanged),
            delete this._intervalProperty,
            w.prototype.destroy.call(this, arguments)
        }),
        (M.prototype._attachToControl = function(t) {
          var e = this
          this._wv.subscribe(this._setValueBinded, { callWithLast: !0 }),
            $(this._control).on('change', function() {
              e.setValueToProperty(e.value())
            })
        }),
        (M.prototype.control = function() {
          return this._control
        }),
        (M.prototype.value = function() {
          var t = $(this._control).val()
          return this._transformFunction && (t = this._transformFunction(t)), t
        }),
        (M.prototype.setValue = function(t) {
          $(this._control).val(t)
        }),
        (M.prototype.setValueToProperty = function(t) {
          this._undoModel.undoHistory.setWatchedValue(this._wv, t, this._undoText)
        }),
        (M.prototype.watchedValue = function() {
          return this._wv
        }),
        (M.prototype.destroy = function() {
          this._wv.unsubscribe(this._setValueBinded)
        }),
        inherit(P, M),
        (P.prototype._attachToControl = function(t) {
          var e = this
          this._wv.subscribe(this.setValue.bind(this), { callWithLast: !0 }),
            $(this._control).on('click', function() {
              e.setValueToProperty(e.value())
            })
        }),
        (P.prototype.value = function() {
          var t = $(this._control).attr('checked')
          return (
            this._not && (t = !t), this._transformFunction && (t = this._transformFunction(t)), t
          )
        }),
        (P.prototype.setValue = function(t) {
          this._not && (t = !t), $(this._control).attr('checked', !!t)
        }),
        (I.prototype.properties = function() {
          return this._properties
        }),
        (I.prototype.value = function(t) {
          return this._control.slider('values', t)
        }),
        (I.prototype.setValue = function(t, e) {
          this._control.slider('values', e, t.value()),
            this._inputsText && $(this._inputsText[e]).val(t.value())
        }),
        (I.prototype.propertyChanged = function(t) {
          this.setValue(t)
        }),
        (I.prototype.setValueToProperty = function(t, e) {
          ;($(e).hasClass('from') || 'from' === e) &&
            (this._undoModel.beginUndoMacro(this._undoText[0]),
            this._undoModel.setProperty(this._propFrom, t[0], this._undoText[0]),
            this._propFrom.setValue(t[0], 0),
            this._undoModel.endUndoMacro()),
            ($(e).hasClass('to') || 'to' === e) &&
              (this._undoModel.beginUndoMacro(this._undoText[1]),
              this._undoModel.setProperty(this._propTo, t[1], this._undoText[1]),
              this._propTo.setValue(t[1], 1),
              this._undoModel.endUndoMacro())
        }),
        (I.prototype.destroy = function() {
          this._propFrom &&
            this._propTo &&
            (this._propFrom.listeners().unsubscribe(this, U.prototype.propertyChanged),
            this._propTo.listeners().unsubscribe(this, U.prototype.propertyChanged))
        }),
        inherit(V, U),
        (V.prototype.value = function() {
          var t = []
          return (
            this._control.each(function() {
              var e = $(this)
              e.is(':checked') && t.push(e.attr('value'))
            }),
            t.join(this._separator)
          )
        }),
        (V.prototype.setValue = function(t) {
          var e = t.split(this._separator).filter(Boolean)
          this._control.each(function() {
            var t = $(this),
              i = -1 !== e.indexOf(t.attr('value'))
            t.attr('checked', i), t.parents('label').toggleClass('active', i)
          })
        }),
        (e.PropertyPage = n),
        (e.UppercaseTransformer = s),
        (e.GreateTransformer = r),
        (e.LessTransformer = a),
        (e.ToIntTransformer = l),
        (e.ToFloatTransformer = h),
        (e.ToFloatTransformerWithDynamicDefaultValue = c),
        (e.ToFloatLimitedPrecisionTransformer = u),
        (e.ToAsciiTransformer = d),
        (e.ReplaceEmptyTransformer = p),
        (e.SymbolInfoSymbolTransformer = f),
        (e.SimpleStringBinder = _),
        (e.FloatBinder = v),
        (e.SessionBinder = g),
        (e.BarTimeBinder = y),
        (e.SymbolBinder = m),
        (e.SimpleComboBinder = b),
        (e.StaticContentBinder = C),
        (e.BooleanBinder = w),
        (e.DisabledBinder = T),
        (e.ColorBinding = x),
        (e.SliderBinder = S),
        (e.CheckboxWVBinding = P),
        (e.RangeBinder = I),
        (e.generateLabelElementStr = o)
    }.call(e, i(13)))
  },
  827: function(t, e, i) {
    'use strict'
    function o(t) {
      return t in $.fn
        ? Promise.resolve()
        : (r ||
            (r = new Promise(function(t) {
              i.e(31)
                .then(
                  function(e) {
                    i(831), t()
                  }.bind(null, i),
                )
                .catch(i.oe)
            })),
          r)
    }
    function n(t) {
      return new a(t)
    }
    var s, r, a
    Object.defineProperty(e, '__esModule', { value: !0 }),
      i.d(e, 'LazyJqueryUI', function() {
        return a
      }),
      (e.lazyJqueryUI = n),
      (s = i(14)),
      i.n(s),
      (a = (function() {
        function t(t) {
          this._$elem = t
        }
        return (
          (t.prototype.draggable = function() {
            var t = arguments,
              e = this._$elem
            return o('draggable').then(function() {
              return e.draggable.apply(e, t)
            })
          }),
          (t.prototype.resizable = function() {
            var t = arguments,
              e = this._$elem
            return o('resizable').then(function() {
              return e.resizable.apply(e, t)
            })
          }),
          (t.prototype.sortable = function() {
            var t = arguments,
              e = this._$elem
            return o('sortable').then(function() {
              return e.sortable.apply(e, t)
            })
          }),
          (t.prototype.datepicker = function() {
            var t = arguments,
              e = this._$elem
            return o('datepicker').then(function() {
              return e.datepicker.apply(e, t)
            })
          }),
          t
        )
      })())
  },
  828: function(t, e) {
    t.exports =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" width="13" height="13"><path d="M5.182 6.596l-3.889-3.889-.707-.707 1.414-1.414.707.707 3.889 3.889 3.889-3.889.707-.707 1.414 1.414-.707.707-3.889 3.889 3.889 3.889.707.707-1.414 1.414-.707-.707-3.889-3.889-3.889 3.889-.707.707-1.414-1.414.707-.707 3.889-3.889z"/></svg>'
  },
  829: function(t, e, i) {
    'use strict'
    function o(t) {
      var e = Object(l.parseRgb)(t),
        i = e.map(function(t) {
          return t > 50 ? t - 50 : 0
        })
      return Object(l.rgbToString)(i)
    }
    function n(t) {
      var e,
        i,
        o,
        n = []
      for (e = 0, i = t; e < i.length; e++)
        (o = i[e]), null !== Object(l.tryParseRgb)(o) && n.push(o)
      return n
    }
    function s(t, e) {
      void 0 === e && (e = {})
      var i = $('<span class="tvcolorpicker-container">')
      return (
        null !== t && i.appendTo(t),
        void 0 !== e.addClass && i.addClass(e.addClass),
        $('<div class="tvcolorpicker-transparency">').appendTo(i),
        $('<input class="colorpicker-widget">')
          .tvcolorpicker({
            customColors: n(Object(h.getJSON)('pickerCustomColors', [])),
            direction: e.direction,
            hideTransparency: !!e.hideTransparency,
          })
          .on('change', function() {
            $(this).css('border-color', o($(this).val() || c))
          })
          .bind('customcolorchange', function(t, e) {
            Object(h.setJSON)('pickerCustomColors', e)
          })
          .appendTo(i),
        i
      )
    }
    var r, a, l, h, c
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.addColorPicker = s),
      (r = i(14)),
      i.n(r),
      (a = i(316)),
      i.n(a),
      (l = i(24)),
      i.n(l),
      (h = i(49)),
      i.n(h),
      (c = '#727272')
  },
  832: function(t, e, i) {
    'use strict'
    ;(function(o) {
      function n(t) {
        return t && t.__esModule ? t : { default: t }
      }
      function s() {
        var t,
          e,
          i = c.width()
        for (d.width = i, d.height = c.height(), t = 0; t < p.length; t++)
          if (i <= d.breakpoints[p[t]]) {
            d.device !== p[t] &&
              ((e = d.device), (d.device = p[t]), d.trigger('changeDevice', [p[t], e]))
            break
          }
        return d
      }
      var r, a, l, h, c, u, d, p
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (r = i(301)),
        (a = n(r)),
        (l = i(838)),
        (h = $('body')),
        (c = $(window)),
        (u = 0),
        (d = {
          width: null,
          height: null,
          device: null,
          checkDevice: s,
          isMobileSafari:
            !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) ||
            !!navigator.userAgent.match('CriOS'),
          getScrollbarWidth: (function() {
            var t = void 0
            return function() {
              var e, i, o, n
              return (
                void 0 === t &&
                  ((e = document.createElement('div')),
                  (e.style.visibility = 'hidden'),
                  (e.style.width = '100px'),
                  (e.style.msOverflowStyle = 'scrollbar'),
                  document.body.appendChild(e),
                  (i = e.offsetWidth),
                  (e.style.overflow = 'scroll'),
                  (o = document.createElement('div')),
                  (o.style.width = '100%'),
                  e.appendChild(o),
                  (n = o.offsetWidth),
                  e.parentNode.removeChild(e),
                  (t = i - n)),
                t
              )
            }
          })(),
          hasScroll: function(t) {
            return t.get(0).scrollHeight > t.height()
          },
          breakpoints: l.breakpoints,
          widgetbarBreakpoint: 1064,
          setFixedBodyState: function(t) {
            var e, i
            t && 1 == ++u
              ? ('hidden' !==
                  $(document.body)
                    .css('overflow')
                    .toLowerCase() &&
                  document.body.scrollHeight > document.body.offsetHeight &&
                  ($('.widgetbar-wrap').css('right', d.getScrollbarWidth()),
                  h
                    .css(
                      'padding-right',
                      parseInt(h.css('padding-right').replace('px', '')) +
                        d.getScrollbarWidth() +
                        'px',
                    )
                    .data('wasScroll', !0)),
                h.addClass('i-no-scroll'))
              : !t &&
                u > 0 &&
                0 == --u &&
                (h.removeClass('i-no-scroll'),
                h.data('wasScroll') &&
                  ((e = h.get(0)),
                  $('.widgetbar-wrap').css('right', 0),
                  (i = $('.widgetbar-wrap').width() || 0),
                  e.scrollHeight <= e.clientHeight && (i -= d.getScrollbarWidth()),
                  h.css('padding-right', (i < 0 ? 0 : i) + 'px').data('wasScroll', void 0)))
          },
        }),
        (p = Object.keys(d.breakpoints).sort(function(t, e) {
          return d.breakpoints[t] - d.breakpoints[e]
        })),
        o.extend(d, a.default.prototype),
        s(),
        $(s),
        c.on('resize', s),
        (e.default = d),
        (t.exports = e.default)
    }.call(e, i(187)))
  },
  833: function(t, e, i) {
    'use strict'
    ;(function(t) {
      function o(e, i, o) {
        var n,
          s,
          r,
          a,
          l,
          h,
          c = this
        if (
          ((this._options = $.extend({}, this._defaultOptions, o || {})),
          (this._$wrapper = e),
          (this._$content = i),
          (this._scroll_speed = 40),
          (this._shadow_offset = 10),
          (this._header_height = this._options.headerHeight),
          (this._scroll_margin_top = this._options.scrollMarginTop),
          (this.scrolled = new t()),
          (this.scrolltoend = new t()),
          (this.scrolltostart = new t()),
          (this.visibilityCallbacks = []),
          (n = navigator.platform.toLowerCase()),
          (s = navigator.userAgent.toLowerCase()),
          (r = s.indexOf('firefox') > -1),
          (a = n.indexOf('android') > -1 || s.indexOf('android') > -1),
          (this._touch = Modernizr.touch || navigator.msMaxTouchPoints || (r && a)),
          this._touch)
        )
          return (
            this._$content.css('position', 'relative'),
            void this._$wrapper
              .css({
                'overflow-y': 'auto',
                '-webkit-overflow-scrolling': 'touch',
                '-ms-overflow-style': '-ms-autohiding-scrollbar',
              })
              .scroll(this._onScroll.bind(this))
          )
        this._$wrapper.css('overflow', 'hidden'),
          this._$wrapper
            .on('mouseenter.sidebar-scroll', function() {
              c._bottomFixed ||
                c._dragging ||
                (c._options.alwaysVisible || c._$scrollBar.addClass('active'), c._onScroll())
            })
            .on('mouseleave.sidebar-scroll', function() {
              c._bottomFixed ||
                c._dragging ||
                (c._options.alwaysVisible || c._$scrollBar.removeClass('active'), c._onScroll())
            })
            .on('mousewheel.sidebar-scroll', function(t, e) {
              if (!t.isDefaultPrevented())
                return c.scroll(e, 'MozMousePixelScroll' === t.originalEvent.type ? 2 : null)
            }),
          !1 !== this._options.showTopShadow &&
            (this._$shadowTop = $('<div class="sb-inner-shadow top i-invisible">').appendTo(
              this._$wrapper,
            )),
          !1 !== this._options.showBottomShadow &&
            (this._$shadowBottom = $('<div class="sb-inner-shadow">').appendTo(this._$wrapper)),
          this._$shadowTop &&
            this._header_height &&
            this._$shadowTop.css('top', this._header_height - this._shadow_offset),
          (l = this._options.additionalClass ? ' ' + this._options.additionalClass : ''),
          (h = this._options.alwaysVisible ? ' active-always' : ''),
          (this._$scrollBarWrapper = $('<div class="sb-scrollbar-wrap">').appendTo(this._$wrapper)),
          (this._$scrollBar = $(
            '<div class="sb-scrollbar sb-scrollbar-body' + l + h + '"></div>',
          ).appendTo(this._$scrollBarWrapper)),
          this._onScroll()
      }
      var n = i(827).lazyJqueryUI
      ;(o.prototype.isTouch = function() {
        return this._touch
      }),
        (o.prototype.getScrollBar = function() {
          return this._$scrollBar
        }),
        (o.prototype._defaultOptions = {
          headerHeight: 0,
          additionalClass: '',
          alwaysVisible: !1,
          showBottomShadow: !0,
          scrollMarginTop: 1,
          bubbleScrollEvent: !1,
        }),
        (o.prototype.initDraggable = function() {
          if (this._dragInitialized) return this
          var t = this
          return (
            n(this._$scrollBar).draggable({
              axis: 'y',
              containment: this._$scrollBarWrapper,
              start: function() {
                t._dragging = !0
              },
              stop: function() {
                t._dragging = !1
              },
              drag: function(e, i) {
                t.updateScroll()
              },
            }),
            (this._dragInitialized = !0),
            this
          )
        }),
        (o.prototype.updateScroll = function() {
          var t, e, i, o, n
          return this._touch
            ? this
            : ((t = 1),
              (e = Math.ceil(
                this._$scrollBar.position().top - this._scroll_margin_top - this._header_height,
              )),
              (i = this.getContainerHeightWithoutHeader()),
              (o = this._$content.outerHeight()),
              (n = o - i - t),
              i <= 0
                ? this
                : ((this._scroll_target_top =
                    n <= 0
                      ? this._header_height
                      : Math.min((-e * o) / i + this._header_height, this._header_height)),
                  e + this._$scrollBar.height() + 2 >= i
                    ? this.scrollToEnd()
                    : (this._$content.css('top', this._scroll_target_top + 'px'), this._onScroll()),
                  this))
        }),
        (o.prototype.getContainerHeightWithoutHeader = function() {
          return this._$wrapper[0].getBoundingClientRect().height - this._header_height
        }),
        (o.prototype.getContainerHeight = function() {
          return this._$wrapper[0].getBoundingClientRect().height
        }),
        (o.prototype.getContentHeight = function() {
          return this._$content[0].getBoundingClientRect().height
        }),
        (o.prototype.updateScrollBar = function() {
          var t, e, i, o, n, s, r, a, l
          return this._touch
            ? this
            : ((t = 1),
              (e = this._$content.position().top),
              (i = this.getContentHeight()),
              (o = this.getContainerHeight()),
              (n = this.getContainerHeightWithoutHeader()),
              (s = t + this._header_height),
              (r = n - 2 * t),
              (a = ((Math.abs(e) - this._header_height) * r) / i),
              (l = (o * o) / i),
              this.isContentShort()
                ? (this._$scrollBar.addClass('js-hidden'),
                  this._$wrapper.removeClass('sb-scroll-active'))
                : (this._$scrollBar
                    .removeClass('js-hidden')
                    .height(l)
                    .css('top', s + a),
                  this._$wrapper.addClass('sb-scroll-active'),
                  this.initDraggable()),
              this)
        }),
        (o.prototype.scroll = function(t, e) {
          var i, o, n, s, r
          return this._touch
            ? this
            : ((i = this._$content.position().top),
              (o = this._$content.outerHeight()),
              (n = this.getContainerHeightWithoutHeader()),
              (s = o - n - 1),
              (r = e || this._scroll_speed),
              s <= 0 ||
                ((this._scroll_target_top = Math.max(
                  -s + this._header_height,
                  Math.min(this._header_height, i + t * r),
                )),
                this.setContentTop(this._scroll_target_top),
                this._onScroll()))
        }),
        (o.prototype.animateTo = function(t) {
          var e, i, o
          return this._touch
            ? this
            : ((e = this._$content.outerHeight()),
              (i = this.getContainerHeightWithoutHeader()),
              (o = e - i - 1) <= 0 ||
                ((this._scroll_target_top = Math.max(
                  -o + this._header_height,
                  Math.min(this._header_height, -t),
                )),
                void this._$content.animate(
                  { top: this._scroll_target_top },
                  500,
                  function() {
                    this._onScroll()
                  }.bind(this),
                )))
        }),
        (o.prototype.resize = function() {
          var t, e
          if (!this._bottomFixed) {
            if (
              ((t = this._$content.outerHeight()),
              (e = this._$wrapper.outerHeight()),
              !this._options.vAlignBottom && t < e)
            )
              return void (this.atStart() || this.scrollToStart())
            this.atEnd()
              ? this.scrollToEnd()
              : 'number' == typeof this._stickyBottom &&
                this.setContentTop(
                  Math.min(
                    0,
                    this._stickyBottom +
                      this._$wrapper.outerHeight() -
                      this._$content.outerHeight(),
                  ),
                )
          }
        }),
        (o.prototype.resizeHeader = function(t) {
          var e = t - this._header_height
          ;(this._header_height = t),
            (this._scroll_target_top += e),
            this._$shadowTop &&
              this._$shadowTop.css('top', this._header_height - this._shadow_offset),
            this.resize()
        }),
        (o.prototype.scrollTo = function(t, e) {
          var i, o, n, s, r, a
          if (
            ((e = $.extend(
              { position: 'visible', areaHeight: t instanceof $ ? t.height() : 0 },
              e,
            )),
            t instanceof $ && (t = e.offsetTop || t.position().top),
            (i = this._$content.position().top),
            (o = this._$content.outerHeight()),
            (n = this.getContainerHeightWithoutHeader()),
            o - n - 1 <= 0)
          )
            return !0
          if (
            ((s = -1 * (i - this._header_height)), (r = s + n), (a = 0), 'visible' === e.position)
          ) {
            if (t > s && t + e.areaHeight < r) return !1
            a = t + e.areaHeight > r ? r - t - e.areaHeight : s - t
          } else 'top' === e.position && (a = s - t)
          return this.scroll(a, 1), this._onScroll(), !1
        }),
        (o.prototype.scrollToEnd = function() {
          var t = this._$content.position().top,
            e = this._$content.outerHeight(),
            i = this._$wrapper.outerHeight(),
            o = e + t
          return this.setContentTop(t + (i - o) + 1), this._onScroll(), this
        }),
        (o.prototype.scrollToStart = function() {
          return this.setContentTop(this._header_height), this._onScroll(), this
        }),
        (o.prototype.currentPosition = function() {
          return Math.round(this._$content.position().top)
        }),
        (o.prototype.atStart = function() {
          return Math.round(this._$content.position().top) >= this._header_height
        }),
        (o.prototype.atEnd = function(t) {
          var e, i, o, n
          return (
            ('number' == typeof t && isFinite(t)) || (t = 0),
            (e = 1),
            (i = Math.round(this._$content.position().top)),
            (o = this._$content.outerHeight()),
            (n = this._$wrapper.outerHeight()),
            o - Math.abs(i) - e <= n + t
          )
        }),
        (o.prototype._onScroll = function(t) {
          var e, i
          return (
            this._touch || this._$content.css('bottom', 'auto'),
            this.scrolled.fire(),
            (this._dragging && !0 !== t) || this.updateScrollBar(),
            (e = this.atStart()),
            (i = this.atEnd()),
            this._$shadowTop && this._$shadowTop.toggleClass('i-invisible', !!e),
            this._$shadowBottom && this._$shadowBottom.toggleClass('i-invisible', !!i),
            this._onContentVisible(),
            !this._atStart && e
              ? ((this._atStart = !0), this.scrolltostart.fire())
              : this._atStart && !e && delete this._atStart,
            !this._atEnd && i
              ? ((this._atEnd = !0), this.scrolltoend.fire())
              : this._atEnd && !i && delete this._atEnd,
            this._options.vAlignBottom &&
              (this._stickyBottom =
                this._$content.outerHeight() -
                Math.abs(this._$content.position().top) -
                this._$wrapper.outerHeight()),
            !(
              (!this._atStart && !this._atEnd) ||
              ('function' == typeof this._options.bubbleScrollEvent
                ? !this._options.bubbleScrollEvent()
                : !this._options.bubbleScrollEvent)
            )
          )
        }),
        (o.prototype.checkContentVisibility = function() {
          this._onContentVisible()
        }),
        (o.prototype.subscribeToContentVisible = function(t, e, i) {
          this.visibilityCallbacks.push({ id: t, $el: e, callback: i })
        }),
        (o.prototype.triggerVisibilityCallbacks = function(t) {
          this._onContentVisible(t)
        }),
        (o.prototype._contentIsVisible = function(t) {
          return t.$el.position().top > -1 * this.currentPosition()
        }),
        (o.prototype._onContentVisible = function(t) {
          var e, i, o
          this.visibilityCallbacks.length &&
            ((e = t || this._contentIsVisible.bind(this)),
            (i = []),
            (o = this.visibilityCallbacks.filter(function(t, o) {
              if (!$.contains(this._$content, t.$el[0])) return !1
              var n = e(t)
              return n && i.push(o), !n
            }, this)),
            i.forEach(function(e) {
              this.visibilityCallbacks[e].callback(!!t)
            }, this),
            delete this.visibilityCallbacks,
            (this.visibilityCallbacks = o))
        }),
        (o.prototype.save = function() {
          return (
            (this._saved = {
              top: this._$content.position().top,
              height: this._$content.outerHeight(),
            }),
            this
          )
        }),
        (o.prototype.restore = function() {
          if (this._saved) {
            if (
              this._saved.top === this._$content.position().top &&
              this._saved.height === this._$content.outerHeight()
            )
              return delete this._saved, this
            this._options.vAlignBottom &&
              ((this._saved.top -= this._$content.outerHeight() - this._saved.height),
              this._saved.top > this._header_height && (this._saved.top = this._header_height)),
              this.setContentTop(this._saved.top),
              delete this._saved,
              this._onScroll(!0)
          }
          return this
        }),
        (o.prototype.fixBottom = function() {
          var t, e
          return this._bottomFixed
            ? this
            : (this._touch
                ? ((t = this._$content.outerHeight()),
                  (e = this._$wrapper.scrollTop()),
                  (this._tempIntervalID = setInterval(
                    function() {
                      this._$wrapper.scrollTop(e + (this._$content.outerHeight() - t))
                    }.bind(this),
                    0,
                  )))
                : this._$content.css({
                    top: 'auto',
                    bottom:
                      this._$wrapper.outerHeight() -
                      this._$content.position().top -
                      this._$content.outerHeight(),
                  }),
              (this._bottomFixed = !0),
              this)
        }),
        (o.prototype.releaseBottom = function() {
          return this._bottomFixed
            ? (this._touch
                ? clearInterval(this._tempIntervalID)
                : this._$content.css({ top: this._$content.position().top, bottom: 'auto' }),
              delete this._bottomFixed,
              this._onScroll(),
              this)
            : this
        }),
        (o.prototype.setContentTop = function(t) {
          return (
            this._touch
              ? this._options.vAlignBottom &&
                this._$content.outerHeight() < this._$wrapper.outerHeight()
                ? (this._$wrapper.css('overflow-y', 'visible'),
                  this._$content.css({ position: 'absolute', bottom: 0 }))
                : (this._$content.css({ position: 'relative', bottom: 'auto' }),
                  this._$wrapper.css('overflow-y', 'auto'),
                  this._$wrapper.scrollTop(-t))
              : this._$content.css('top', t),
            this
          )
        }),
        (o.prototype.isContentShort = function() {
          return this.getContentHeight() <= this.getContainerHeightWithoutHeader()
        }),
        (o.prototype.destroy = function() {
          this._$scrollBarWrapper.remove(),
            this._$shadowBottom && this._$shadowBottom.remove(),
            this._$shadowTop && this._$shadowTop.remove(),
            this._$wrapper
              .attr('style', '')
              .off('mouseenter.sidebar-scroll')
              .off('mouseleave.sidebar-scroll')
              .off('mousewheel.sidebar-scroll'),
            this._$content.attr('style', '')
        }),
        (e.SidebarCustomScroll = o)
    }.call(e, i(8)))
  },
  834: function(t, e) {},
  836: function(t, e) {
    t.exports =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 8" width="16" height="8"><path d="M0 1.475l7.396 6.04.596.485.593-.49L16 1.39 14.807 0 7.393 6.122 8.58 6.12 1.186.08z"/></svg>'
  },
  837: function(t, e, i) {
    'use strict'
    ;(function(t) {
      function o(t) {
        return t && t.__esModule ? t : { default: t }
      }
      function n(t) {
        var e, i
        if (t && t.__esModule) return t
        if (((e = {}), null != t))
          for (i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
        return (e.default = t), e
      }
      function s(t, e) {
        if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function')
      }
      function r(t, e) {
        if (!t)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
        return !e || ('object' != typeof e && 'function' != typeof e) ? t : e
      }
      function a(t, e) {
        if ('function' != typeof e && null !== e)
          throw new TypeError('Super expression must either be null or a function, not ' + typeof e)
        ;(t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
        })),
          e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e))
      }
      function l() {
        return 0 !== C.length
      }
      var h, c, u, d, p, f, _, v, g, y, m, b, C, w
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.TVModal = void 0),
        (h =
          Object.assign ||
          function(t) {
            var e, i, o
            for (e = 1; e < arguments.length; e++) {
              i = arguments[e]
              for (o in i) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o])
            }
            return t
          }),
        (c = (function() {
          function t(t, e) {
            var i, o
            for (i = 0; i < e.length; i++)
              (o = e[i]),
                (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                'value' in o && (o.writable = !0),
                Object.defineProperty(t, o.key, o)
          }
          return function(e, i, o) {
            return i && t(e.prototype, i), o && t(e, o), e
          }
        })()),
        (e.isOpenedModals = l),
        (u = i(184)),
        (d = n(u)),
        (p = i(832)),
        (f = o(p)),
        (_ = i(690)),
        (v = i(305)),
        (g = i(189)),
        (y = n(g)),
        (m = i(307)),
        (b = n(m)),
        (C = []),
        (w = {
          ajax: {},
          closingDuration: d.dur / 2,
          overlayTemplate: '<div class="tv-dialog__overlay"></div>',
          containerTemplate:
            '<div class="tv-dialog__modal-wrap"><div class="tv-dialog__modal-container"><div class="tv-dialog__modal-body"></div></div></div>',
          ajaxErrorTemplate:
            '<div class="tv-dialog__error js-dialog__close">' + $.t('Error') + '</div>',
        }),
        (e.TVModal = (function(e) {
          function i() {
            var t,
              e,
              o,
              n,
              a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
            return (
              s(this, i),
              (t = r(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, h({}, w, a)))),
              (t.$overlay = $(t.options.overlayTemplate)),
              (t.$modalWrap = $(t.options.containerTemplate)),
              (t.$body = t.$modalWrap.find('.tv-dialog__modal-body').append(t.$el)),
              t.options.closeOnOutsideClick &&
                t.$overlay.add(t.$modalWrap).click(function(e) {
                  t.isEventOut(e) && t.close()
                }),
              t.on('change:zIndex', function() {
                t.$overlay.css('z-index', t.zIndex), t.$modalWrap.css('z-index', t.zIndex)
              }),
              t.on('destroy', function() {
                var e = function() {
                  t.$overlay.remove(), t.$modalWrap.remove()
                }
                t.opened ? (t.close(), setTimeout(e, t.options.closingDuration)) : e()
              }),
              t.on('beforeOpen', function() {
                C.push(t)
              }),
              t.options.ajax.url &&
                ((e = t.options.ajax.beforeSend || $.noop),
                (o = t.options.ajax.success || !1),
                (n = t.options.ajax.error || $.noop),
                $.extend(t.options.ajax, {
                  beforeSend: function() {
                    t.trigger('beforeLoading', [t]), t.startSpinner(), e(t)
                  },
                  success: function(e) {
                    t.trigger('afterLoading', [t]),
                      t.renderContent(o ? o(t, e) : e).showContent(),
                      t.trigger('afterLoadingShow', [t])
                  },
                  error: function() {
                    t.renderContent(t.options.ajaxErrorTemplate),
                      n(t),
                      t.trigger('errorLoading', [t])
                  },
                })),
              t.on('error', function(e, i) {
                t.$modalWrap[0].getBoundingClientRect().height <
                  t.$content[0].getBoundingClientRect().height &&
                  i.addClass('i-fixed').css({ width: t.$el.width() })
              }),
              (t._shortCutsLockId = null),
              (t._keyboardBinderLockId = null),
              t
            )
          }
          return (
            a(i, e),
            c(i, [
              {
                key: 'open',
                value: function() {
                  var t,
                    e = this
                  if (!this.opened)
                    return (
                      (this.opened = !0),
                      (this._shortCutsLockId = y.disable()),
                      (this._keyboardBinderLockId = b.disable()),
                      f.default.setFixedBodyState(!0),
                      (t = function() {
                        e.focus(),
                          e.toTop(),
                          $('body')
                            .append(
                              e.$overlay.addClass('i-hidden i-closed').css('z-index', e.zIndex),
                            )
                            .append(
                              e.$modalWrap.addClass('i-hidden i-closed').css('z-index', e.zIndex),
                            ),
                          e.trigger('beforeOpen', [e]),
                          e.$overlay.removeClass('i-hidden'),
                          setTimeout(function() {
                            e.$overlay.removeClass('i-closed')
                          }, 20),
                          e.options.ajax.url
                            ? (e.ajaxRequest = $.ajax(e.options.ajax))
                            : e.showContent()
                      }),
                      f.default.isMobileSafari
                        ? setTimeout(function() {
                            return t()
                          }, 50)
                        : t(),
                      this
                    )
                },
              },
              {
                key: 'close',
                value: function() {
                  var e = this
                  if (this.opened)
                    return (
                      (this.opened = !1),
                      this._shortCutsLockId && y.enable(this._shortCutsLockId),
                      this._keyboardBinderLockId && b.enable(this._keyboardBinderLockId),
                      this.trigger('beforeClose', [this]),
                      this.ajaxRequest && (this.ajaxRequest.abort(), delete this.ajaxRequest),
                      this.hideContent(),
                      this.$overlay.addClass('i-closed'),
                      setTimeout(function() {
                        e.$modalWrap.addClass('i-hidden').detach(),
                          e.$overlay.addClass('i-hidden').detach(),
                          (C = t.without(C, e)),
                          f.default.setFixedBodyState(!1),
                          e.trigger('afterClose', [e]),
                          e.unfocus(),
                          C.length > 0 && C[C.length - 1].focus(),
                          e.options.destroyOnClose && e.destroy()
                      }, this.options.closingDuration),
                      this
                    )
                },
              },
              {
                key: 'showContent',
                value: function() {
                  var t = this
                  return (
                    this.$modalWrap.removeClass('i-hidden'),
                    setTimeout(function() {
                      t.$modalWrap.removeClass('i-closed')
                    }, 20),
                    setTimeout(function() {
                      t.trigger('afterOpen', [t]), t.spinner && t.stopSpinner()
                    }, 0.75 * d.dur + 20),
                    this
                  )
                },
              },
              {
                key: 'hideContent',
                value: function() {
                  if (this.$el) return this.$modalWrap.addClass('i-closed'), this.unfocus(), this
                },
              },
              {
                key: 'startSpinner',
                value: function() {
                  return (
                    (this.spinner = new v.Spinner('large')),
                    this.spinner.spin(this.$overlay[0]),
                    this
                  )
                },
              },
              {
                key: 'stopSpinner',
                value: function() {
                  if (this.spinner) return this.spinner.stop(), delete this.spinner, this
                },
              },
            ]),
            i
          )
        })(_.TVDialogAbstract))
    }.call(e, i(187)))
  },
  838: function(t, e, i) {
    'use strict'
    Object.defineProperty(e, '__esModule', { value: !0 }),
      i.d(e, 'breakpoints', function() {
        return o
      })
    var o = { desktop: 1 / 0, desktopHd: 1919, phone: 767, 'phone-vertical': 479, tablet: 1019 }
  },
  839: function(t, e, i) {
    'use strict'
    ;(function(t, o) {
      function n(t) {
        return t && t.__esModule ? t : { default: t }
      }
      function s(t) {
        var e, i
        if (t && t.__esModule) return t
        if (((e = {}), null != t))
          for (i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
        return (e.default = t), e
      }
      function r(t, e) {
        if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function')
      }
      function a(t, e) {
        if (!t)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
        return !e || ('object' != typeof e && 'function' != typeof e) ? t : e
      }
      function l(t, e) {
        if ('function' != typeof e && null !== e)
          throw new TypeError('Super expression must either be null or a function, not ' + typeof e)
        ;(t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
        })),
          e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e))
      }
      function h() {
        m.forEach(function(t) {
          return t.close()
        })
      }
      var c, u, d, p, f, _, v, g, y, m, b, C, w, T, k, x, S
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.TVDialogAbstract = void 0),
        (c =
          Object.assign ||
          function(t) {
            var e, i, o
            for (e = 1; e < arguments.length; e++) {
              i = arguments[e]
              for (o in i) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o])
            }
            return t
          }),
        (u = (function() {
          function t(t, e) {
            var i, o
            for (i = 0; i < e.length; i++)
              (o = e[i]),
                (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                'value' in o && (o.writable = !0),
                Object.defineProperty(t, o.key, o)
          }
          return function(e, i, o) {
            return i && t(e.prototype, i), o && t(e, o), e
          }
        })()),
        (e.closeAllDialogs = h),
        (d = i(184)),
        (p = s(d)),
        i(840),
        (f = i(308)),
        (_ = n(f)),
        i(841),
        i(842),
        i(834),
        (v = i(301)),
        (g = n(v)),
        (y = 0),
        (m = []),
        (b = void 0),
        (C = 110),
        (w = $(document)),
        (T = {
          closeOnEsc: !0,
          closeButton: !0,
          focusFirstControl: !0,
          closeOnOutsideClick: !0,
          closeButtonAddClass: '',
          focusClass: 'i-focused',
          template: '<div class="tv-dialog">',
          errorTemplate:
            '<div class="tv-dialog__error i-slided{{# errorMod }} tv-dialog__error--{{ errorMod }}{{/ errorMod }}">{{{ error }}}</div>',
          titleTemplate:
            '<div class="tv-dialog__section tv-dialog__section--title js-dialog__drag"><div class="js-title-text tv-dialog__title">{{{ title }}}</div></div>',
          contentWrapTemplate: '<div class="tv-dialog__section tv-dialog__section--no-border">',
          actionsWrapTemplate:
            '<div class="tv-dialog__section tv-dialog__section--actions tv-dialog__section--no-border">',
          closeButtonTemplate:
            '<div class="tv-dialog__close js-dialog__close">' + i(828) + '</div>',
          helpButtonTemplate:
            '<a href="{{{ link }}}" target="_blank" class="tv-dialog__help apply-common-tooltip" title="{{{ title }}}"></a>',
          helpActionsMod: 'tv-dialog__section--actions_with-help',
        }),
        (k = {
          default: 'tv-button tv-button--default',
          primary: 'tv-button tv-button--primary',
          success: 'tv-button tv-button--success',
          danger: 'tv-button tv-button--danger',
          warning: 'tv-button tv-button--warning',
          link: 'tv-button tv-button--link',
          checkbox: 'tv-control-checkbox tv-control-checkbox--in-actions',
          'default-ghost': 'tv-button tv-button--default_ghost',
          'primary-ghost': 'tv-button tv-button--primary_ghost',
          'success-ghost': 'tv-button tv-button--success_ghost',
          'danger-ghost': 'tv-button tv-button--danger_ghost',
          'warning-ghost': 'tv-button tv-button--warning_ghost',
        }),
        (x = {
          _default:
            '<div data-name="{{ name }}" class="js-dialog__action-click js-dialog__no-drag {{ class }}">{{ text }}</div>',
          'submit-success':
            '<button type="submit" class="tv-button tv-button--success">{{ text }}</button>',
        }),
        $(function() {
          T.$wrap = $(document.all && !document.querySelector ? 'html' : 'body')
        }),
        (S = (function(e) {
          function i() {
            var e,
              o,
              n,
              s,
              l,
              h = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
            for (
              r(this, i),
                e = a(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this)),
                e._id = y++,
                e.loadingActions = [],
                e.disabledActions = [],
                e.firstFocusControl = null,
                e.options = c({}, T, h),
                e.$el = $(
                  t.render(e.options.template, {
                    title: e.options.title,
                    closeButton: e.options.closeButton,
                  }),
                ),
                e.$el.addClass('js-dialog'),
                e.el = e.$el[0],
                e.options.addClass && e.$el.addClass(e.options.addClass),
                e.options.width && e.$el.css({ width: '100%', 'max-width': e.options.width }),
                e.options.title &&
                  (e.$title = $(
                    t.render(e.options.titleTemplate, { title: e.options.title }),
                  ).appendTo(e.$el)),
                e.$content = $(e.options.contentWrapTemplate).appendTo(e.$el),
                e.$contentIn = e.$content;
              e.$contentIn.length;

            )
              e.$contentIn = e.$contentIn.children()
            if (
              ((e.$contentIn = e.$contentIn.end()),
              e.options.content && e.renderContent(e.options.content),
              (e.options.actions || e.options.help) &&
                (e.$content.hasClass('tv-dialog__section') &&
                  e.$content.addClass('tv-dialog__section--no-padding_bottom'),
                (e.$actions = $(e.options.actionsWrapTemplate).appendTo(e.$el))),
              e.options.actions)
            )
              for (
                e.actions = {},
                  e.$el.on('click touchend', '.js-dialog__action-click', function(t) {
                    t.preventDefault(), e.actionDispatcher($(t.currentTarget).data('name'))
                  }),
                  o = function(i) {
                    var o,
                      n,
                      s,
                      r,
                      a,
                      l,
                      h = e.options.actions[i]
                    h.type || (h.type = 'default'),
                      h.class || (h.class = k[h.type] ? k[h.type] : k.default),
                      'checkbox' === h.type
                        ? ((o = new _.default({
                            labelRight: h.text,
                            name: h.name,
                            checked: h.checked,
                          })),
                          (e.actions[h.name] = o.$el.appendTo(e.$actions)),
                          e.actions[h.name].on('change', function() {
                            setTimeout(function() {
                              return e.actionDispatcher(h.name, o.checked)
                            })
                          }))
                        : (e.actions[h.name] = $(
                            t.render(h.template ? h.template : x[h.type] || x._default, h, h),
                          ).appendTo(e.$actions)),
                      h.method &&
                        'function' == typeof e[h.method] &&
                        e.on('action:' + h.name, e[h.method].bind(e)),
                      h.addClass && e.actions[h.name].addClass(h.addClass),
                      h.key &&
                        ((n = void 0),
                        'string' == typeof h.key && h.key.split('+').length > 1
                          ? ((s = []),
                            (r = h.key.split('+')),
                            (n = function(t) {
                              s = []
                            }),
                            (a = function(t) {
                              var i = '' + t.keyCode
                              ;-1 !== r.indexOf(i) && s.indexOf(i) && s.push(i),
                                e._focused &&
                                  s.length === r.length &&
                                  ((s = []), e.actionDispatcher(h.name))
                            }),
                            e.on('afterOpen', function() {
                              w.on('keydown', a), w.on('keyup', n)
                            }),
                            e.on('beforeClose', function() {
                              w.off('keydown', a), w.off('keyup', n)
                            }))
                          : ((l = $.isArray(h.key) ? h.key : [h.key]),
                            (n = function(t) {
                              !t.isDefaultPrevented() &&
                                e._focused &&
                                -1 !== l.indexOf(t.keyCode) &&
                                e.actionDispatcher(h.name)
                            }),
                            e.on('afterOpen', function() {
                              return w.on('keyup', n)
                            }),
                            e.on('beforeClose', function() {
                              return w.off('keyup', n)
                            })))
                  },
                  n = e.options.actions.length - 1;
                n >= 0;
                n--
              )
                o(n)
            return (
              e.options.help &&
                $(t.render(e.options.helpButtonTemplate, e.options.help)).prependTo(
                  e.$actions.addClass(e.options.helpActionsMod),
                ),
              e.options.closeButton &&
                ((s = $(e.options.closeButtonTemplate)),
                s.addClass(e.options.closeButtonAddClass || ''),
                (l = e.$el),
                1 === e.$el.find('.js-close-button-place').length &&
                  (l = e.$el.find('.js-close-button-place')),
                s.appendTo(l)),
              e.setZIndex(C + m.length),
              h.errorMod && (e.errorMod = h.errorMod),
              e.on('afterOpen', function() {
                e.options.focusFirstControl &&
                  !Modernizr.touch &&
                  (
                    e.firstFocusControl ||
                    e.$el.find('input:not([type="hidden"]), textarea').first()
                  ).focus()
              }),
              e.$el.on('click touchend', '.js-dialog__close', e.close.bind(e)),
              e.$el.on('mousedown touchstart', e.focus.bind(e)),
              m.push(e),
              e
            )
          }
          return (
            l(i, e),
            u(i, [
              {
                key: 'renderContent',
                value: function(t) {
                  return this.$contentIn.html('function' == typeof t ? t(this) : t), this
                },
              },
              {
                key: 'setDestroyOnClose',
                value: function(t) {
                  this.options.destroyOnClose = t
                },
              },
              {
                key: 'setZIndex',
                value: function(t) {
                  return (this.zIndex = t), this.trigger('change:zIndex', [this]), this
                },
              },
              {
                key: 'toTop',
                value: function() {
                  for (var t = m.length - 1; t >= 0; t--)
                    m[t].zIndex > this.zIndex && m[t].setZIndex(m[t].zIndex - 1)
                  return this.setZIndex(C + m.length), this
                },
              },
              {
                key: 'isEventOut',
                value: function(t) {
                  var e, i, o
                  return this.options.isClickOutFn && void 0 !== (e = this.options.isClickOutFn(t))
                    ? e
                    : ((i = !0),
                      (o = $(t.target)),
                      o.get(0) !== this.$el.get(0) &&
                        ($('>*', this.$el).each(function() {
                          o.get(0) === $(this).get(0) && (i = !1),
                            0 === o.closest('HTML', $(this).get(0)).length && (i = !1)
                        }),
                        i))
                },
              },
              {
                key: 'focus',
                value: function() {
                  var t = this
                  b && b !== this && b.unfocus(),
                    this._setFocused(),
                    (this._focused = !0),
                    this.$el.addClass(this.options.focusClass),
                    this.trigger('focus', [this]),
                    setTimeout(function() {
                      w.on('mousedown.tv-dialog-unfocus-' + t._id, function(e) {
                        t.isEventOut(e) &&
                          (t.unfocus(), w.off('mousedown.tv-dialog-unfocus-' + t._id))
                      })
                    }, 20)
                },
              },
              {
                key: '_setFocused',
                value: function() {
                  b !== this && (b = this)
                },
              },
              {
                key: '_setUnfocused',
                value: function() {
                  b === this && (b = void 0)
                },
              },
              {
                key: 'unfocus',
                value: function() {
                  b === this &&
                    (this._setUnfocused(),
                    (this._focused = !1),
                    this.$el
                      .removeClass(this.options.focusClass)
                      .find(':focus')
                      .blur(),
                    this.trigger('unfocus', [this]))
                },
              },
              {
                key: 'isFocused',
                value: function() {
                  return this._focused
                },
              },
              {
                key: 'setTitle',
                value: function(t) {
                  var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                  return (
                    this.$title.toggleClass(
                      'tv-dialog__section--one-line apply-overflow-tooltip',
                      e,
                    ),
                    this.$title.html(t),
                    this
                  )
                },
              },
              {
                key: 'setTitleText',
                value: function(t) {
                  this.$title.find('.js-title-text').text(t)
                },
              },
              {
                key: 'actionDispatcher',
                value: function(t) {
                  if (!this.disabledActions.includes(t) && !this.loadingActions.includes(t)) {
                    for (var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), o = 1; o < e; o++)
                      i[o - 1] = arguments[o]
                    this.trigger('action:' + t, [this].concat(i))
                  }
                },
              },
              {
                key: 'toggleAction',
                value: function(t, e) {
                  return (
                    !e && this.disabledActions.includes(t)
                      ? this.disabledActions.push(t)
                      : e &&
                        this.disabledActions.includes(t) &&
                        (this.disabledActions = o.without(this.disabledActions, t)),
                    this.actions[t].toggleClass('i-disabled', !e),
                    this
                  )
                },
              },
              {
                key: 'actionLoader',
                value: function(t) {
                  var e = this,
                    i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'init'
                  return (
                    this.actions[t].tvButtonLoader(i),
                    'init' === i &&
                      (this.actions[t]
                        .off('tv-button-loader:start.dialog-action')
                        .on('tv-button-loader:start.dialog-action', function() {
                          e.loadingActions.push(t)
                        }),
                      this.actions[t]
                        .off('tv-button-loader:stop.dialog-action')
                        .on('tv-button-loader:stop.dialog-action', function() {
                          e.loadingActions = o.without(e.loadingActions, t)
                        })),
                    this
                  )
                },
              },
              {
                key: 'error',
                value: function(e) {
                  var i = $(
                      t.render(this.options.errorTemplate, { error: e, errorMod: this.errorMod }),
                    ).appendTo(this.$el),
                    o = function() {
                      i.addClass('i-slided'),
                        setTimeout(function() {
                          return i.remove()
                        }, 0.75 * p.dur)
                    }
                  return (
                    setTimeout(function() {
                      return i.removeClass('i-slided')
                    }, 20),
                    w.one('touchstart mousedown keydown', o),
                    this.trigger('error', [this, i]),
                    this
                  )
                },
              },
              {
                key: 'destroy',
                value: function() {
                  m = o.without(m, this)
                  for (var t = 0; t < m.length; t++) m[t].setZIndex(C + t)
                  this.trigger('destroy', [this])
                },
              },
              {
                key: 'isOpened',
                value: function() {
                  return !!this.opened
                },
              },
            ]),
            i
          )
        })(g.default)),
        (e.TVDialogAbstract = S),
        w.on('keyup.tv-dialog-esc', function(t) {
          b &&
            b.options.closeOnEsc &&
            !$('.tv-dropdown__body.i-opened').length &&
            !$(t.target).closest('.js-dialog-skip-escape').length &&
            27 === t.keyCode &&
            b.close()
        })
    }.call(e, i(126), i(187)))
  },
  840: function(t, e, i) {
    'use strict'
    function o(t) {
      var e, i
      if (t && t.__esModule) return t
      if (((e = {}), null != t))
        for (i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
      return (e.default = t), e
    }
    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function')
    }
    var s, r, a, l, h
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.ButtonLoader = void 0),
      (s = (function() {
        function t(t, e) {
          var i, o
          for (i = 0; i < e.length; i++)
            (o = e[i]),
              (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              'value' in o && (o.writable = !0),
              Object.defineProperty(t, o.key, o)
        }
        return function(e, i, o) {
          return i && t(e.prototype, i), o && t(e, o), e
        }
      })()),
      (r = i(309)),
      (a = i(184)),
      (l = o(a)),
      ($.fn.tvButtonLoader = (0, r.createTvBlockWithInstance)('tv-button-loader', function(t, e) {
        return new h(t, e)
      })),
      (h = e.ButtonLoader = (function() {
        function t(e, i) {
          n(this, t),
            (this.$btn = $(e).addClass('tv-button--loader')),
            0 === this.$btn.find('.tv-button__loader').length &&
              this.$btn.html(
                '<span class="tv-button__text">' +
                  this.$btn.html() +
                  '</span><span class="tv-button__loader"><span class="tv-button__loader-item"></span><span class="tv-button__loader-item"></span><span class="tv-button__loader-item"></span></span>',
              ),
            (this.loading = this.$btn.hasClass('i-loading'))
        }
        return (
          s(t, [
            {
              key: '_start',
              value: function() {
                var t = this
                ;(this.starting = !0),
                  this.$btn.addClass('i-start-load'),
                  this.$btn.trigger('tv-button-loader:start'),
                  setTimeout(function() {
                    ;(t.loading = !0),
                      (t.starting = !1),
                      (t._startPromise = !1),
                      t.$btn.addClass('i-loading'),
                      t.$btn.removeClass('i-start-load'),
                      t._stopPromise && t._stop()
                  }, 2 * l.dur)
              },
            },
            {
              key: 'start',
              value: function() {
                this.starting || (this.stopping ? (this._startPromise = !0) : this._start())
              },
            },
            {
              key: '_stop',
              value: function() {
                var t = this
                ;(this.stopping = !0),
                  this.$btn.addClass('i-stop-load'),
                  this.$btn.trigger('tv-button-loader:stop'),
                  setTimeout(function() {
                    ;(t.loading = !1),
                      (t.stopping = !1),
                      (t._stopPromise = !1),
                      t.$btn.removeClass('i-loading i-start-load i-stop-load'),
                      t._startPromise && t._start()
                  }, l.dur)
              },
            },
            {
              key: 'stop',
              value: function() {
                this.stopping || (this.starting ? (this._stopPromise = !0) : this._stop())
              },
            },
            {
              key: 'toggle',
              value: function() {
                this.loading ? this.stop() : this.start()
              },
            },
            {
              key: 'contentHtml',
              value: function(t) {
                return t
                  ? (this.$btn.find('.tv-button__text').html(t), t)
                  : this.$btn.find('.tv-button__text').html()
              },
            },
            {
              key: 'contentNojQuery',
              value: function() {
                return this.$btn.get(0)
              },
            },
            {
              key: 'disable',
              value: function() {
                this.stop(), this.$btn.addClass('i-disabled')
              },
            },
            {
              key: 'enable',
              value: function() {
                this.$btn.removeClass('i-disabled')
              },
            },
          ]),
          t
        )
      })())
  },
  841: function(t, e) {},
  842: function(t, e) {},
  843: function(t, e, i) {
    'use strict'
    function o(t) {
      return t && t.__esModule ? t : { default: t }
    }
    function n(t) {
      var e, i
      if (t && t.__esModule) return t
      if (((e = {}), null != t))
        for (i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
      return (e.default = t), e
    }
    function s(t, e) {
      if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function')
    }
    function r(t, e) {
      if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      return !e || ('object' != typeof e && 'function' != typeof e) ? t : e
    }
    function a(t, e) {
      if ('function' != typeof e && null !== e)
        throw new TypeError('Super expression must either be null or a function, not ' + typeof e)
      ;(t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
      })),
        e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e))
    }
    var l, h, c, u, d, p, f, _, v, g, y, m, b
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.TVPopup = void 0),
      (l =
        Object.assign ||
        function(t) {
          var e, i, o
          for (e = 1; e < arguments.length; e++) {
            i = arguments[e]
            for (o in i) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o])
          }
          return t
        }),
      (h = (function() {
        function t(t, e) {
          var i, o
          for (i = 0; i < e.length; i++)
            (o = e[i]),
              (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              'value' in o && (o.writable = !0),
              Object.defineProperty(t, o.key, o)
        }
        return function(e, i, o) {
          return i && t(e.prototype, i), o && t(e, o), e
        }
      })()),
      (c = i(184)),
      (u = n(c)),
      (d = i(832)),
      (p = o(d)),
      (f = i(690)),
      (_ = i(833)),
      (v = i(827)),
      (g = $('body')),
      (y = $(window)),
      (m = {
        closeOnClickAtOtherDialogs: !0,
        draggable: !0,
        scrollWrap: '<div class="tv-dialog__scroll-wrap">',
        scrollWrapInner: '<div class="tv-dialog__scroll-wrap-inner">',
        withScroll: !0,
      }),
      (b = 'js-dialog__scroll-wrap'),
      (e.TVPopup = (function(t) {
        function e() {
          var t,
            i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
          return (
            s(this, e),
            (t = r(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, l({}, m, i)))),
            (t.$scrollWrap = t.$content.hasClass(b) ? t.$content : t.$content.find('.' + b)),
            t.$scrollWrap.length
              ? (t.$scrollWrapInner = t.$scrollWrap.children().first())
              : ((t.$scrollWrap = t.$content.wrap($(t.options.scrollWrap)).parent()),
                (t.$scrollWrapInner = t.$content.wrap($(t.options.scrollWrapInner)).parent())),
            t.$actions && t.$scrollWrap.addClass('i-with-actions'),
            t.options.withScroll &&
              ((t.scroll = new _.SidebarCustomScroll(t.$scrollWrap, t.$scrollWrapInner)),
              t.scroll.scrolled.subscribe(null, function() {
                return t.trigger('scroll')
              })),
            t.$scrollWrap.css('overflow', ''),
            t.$el.addClass('tv-dialog--popup i-closed i-hidden'),
            t.options.width &&
              t.$el.css({ width: 'calc(100% - 20px)', 'max-width': t.options.width }),
            t.$el.on('mousedown touchstart', t.toTop.bind(t)),
            t.options.closeOnOutsideClick &&
              (t.on('beforeOpen', function() {
                setTimeout(function() {
                  t.opened &&
                    $(document).on('click.tv-popup-' + t.id, function(e) {
                      var i = $(e.target).closest('.js-dialog')
                      ;(t.options.closeOnClickAtOtherDialogs || 0 === i.length) &&
                        t.isEventOut(e) &&
                        t.close()
                    })
                }, 0)
              }),
              t.on('beforeClose', function() {
                return $(document).off('click.tv-popup-' + t.id)
              })),
            t.on('change:zIndex', function() {
              t.$el.css('z-index', t.zIndex)
            }),
            t.on('destroy', function() {
              var e = function() {
                t.$el.remove()
              }
              t.opened ? (t.close(), setTimeout(e, u.dur / 2)) : e()
            }),
            t
          )
        }
        return (
          a(e, t),
          h(e, [
            {
              key: 'open',
              value: function() {
                var t = this
                return this.opened
                  ? this
                  : ((this.opened = !0),
                    this.trigger('beforeOpen', [this]),
                    this.$el
                      .appendTo(this.options.$wrap)
                      .removeClass('i-hidden')
                      .css(
                        (function() {
                          var e, i, o, n, s
                          return (
                            t.calcHeight(),
                            (e = y.height()),
                            (i = y.width()),
                            (o = t.$el.height()),
                            (n = t.$el.width()),
                            (s = t.options.position),
                            s || (s = { top: e / 2 - o / 2, left: i / 2 - n / 2 }),
                            s.top > e - o && (s.top = e - o),
                            s.left > i - n && (s.left = i - n),
                            s
                          )
                        })(),
                      ),
                    this.focus(),
                    this.toTop(),
                    this._doOpenAnimation().then(function() {
                      t.opened &&
                        (t.$el.removeClass('i-closed'),
                        t.options.draggable &&
                          ((0, v.lazyJqueryUI)(t.$el).draggable({
                            handle: '.js-dialog__drag',
                            cancel:
                              'input, textarea, button, select, option, .js-dialog__no-drag, .js-dialog__close',
                            containment: 'window',
                            cursor: '-webkit-grabbing',
                          }),
                          t.$el.find('.js-dialog__drag').addClass('tv-dialog__grab')),
                        t.trigger('afterOpen', [t]))
                    }),
                    y.on('resize.tv-popup-' + this.id, function() {
                      t.calcHeight(), t.fixPos()
                    }),
                    this)
              },
            },
            {
              key: 'close',
              value: function() {
                var t = this
                if (this.opened)
                  return (
                    this.trigger('beforeClose', [this]),
                    this.$el.addClass('i-closed'),
                    (this.opened = !1),
                    this._doCloseAnimation().then(function() {
                      t.opened ||
                        ((0, v.lazyJqueryUI)(t.$el)
                          .draggable('instance')
                          .then(function(t) {
                            t && t.destroy()
                          }),
                        t.$el.addClass('i-hidden').detach(),
                        g.css('cursor', 'auto'),
                        t.trigger('afterClose', [t]),
                        t.options.destroyOnClose && t.destroy())
                    }),
                    y.off('resize.tv-popup-' + this.id),
                    this
                  )
              },
            },
            {
              key: 'hide',
              value: function() {
                this.$el.addClass('i-hidden')
              },
            },
            {
              key: 'show',
              value: function() {
                this.$el.removeClass('i-hidden')
              },
            },
            {
              key: 'fixPos',
              value: function() {
                var t = this.$el[0].getBoundingClientRect(),
                  e = {}
                t.bottom > p.default.height - 10 &&
                  ((e.top = p.default.height - 10 - t.height), e.top < 10 && (e.top = 10)),
                  t.right > p.default.width - 10 &&
                    ((e.left = p.default.width - 10 - t.width), e.left < 10 && (e.left = 10)),
                  (e.top || e.left) && this.$el.css(e)
              },
            },
            {
              key: 'calcHeight',
              value: function() {
                var t,
                  e,
                  i = this.$el[0].getBoundingClientRect(),
                  o = this.$scrollWrapInner[0].getBoundingClientRect(),
                  n = this.$scrollWrap[0].getBoundingClientRect(),
                  s =
                    this.options.height && this.options.height < p.default.height - 20
                      ? this.options.height
                      : p.default.height - 20
                this.$scrollWrap.css({ height: '' }).removeClass('i-scrollable'),
                  (t = this.$el[0].getBoundingClientRect()),
                  (this.options.height || t.height > s) &&
                    ((s -= i.height - n.height),
                    s < 60 && (s = 60),
                    this.$scrollWrap.css({ height: s })),
                  this.options.withScroll && this.scroll.resize(),
                  (e = s < o.height),
                  e || this.$scrollWrapInner.css('top', 0),
                  this.$scrollWrap.toggleClass('i-scrollable', e),
                  this.$actions &&
                    this.$actions.toggleClass('tv-dialog__section--actions_with-border', e)
              },
            },
            {
              key: 'updateScroll',
              value: function() {
                this.scroll && (this.scroll.updateScroll(), this.scroll.updateScrollBar())
              },
            },
            {
              key: 'scrollToStart',
              value: function() {
                this.scroll && this.scroll.scrollToStart()
              },
            },
            {
              key: '_doOpenAnimation',
              value: function() {
                return Promise.resolve()
              },
            },
            {
              key: '_doCloseAnimation',
              value: function() {
                return Promise.resolve()
              },
            },
          ]),
          e
        )
      })(f.TVDialogAbstract))
  },
  845: function(t, e, i) {
    'use strict'
    function o(t) {
      var e,
        i,
        o = (t + '').match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)
      return null === o
        ? 0
        : ((e = o[1] ? o[1].length : 0), (i = o[2] ? parseInt(o[2], 0) : 0), Math.max(0, e - i))
    }
    function n(t) {
      return (
        (t = Math.abs(t)),
        !Object(c.isInteger)(t) && t > 1 && (t = parseFloat(('' + t).replace(/^.+\./, '0.'))),
        0 < t && t < 1 ? Math.pow(10, o(t)) : 1
      )
    }
    function s(t, e) {
      var i, o, s, r, a, l
      t.trigger('tvticker-beforechange'),
        (i = t.data('TVTicker')),
        (o = i && i.step),
        (s = 0),
        (s = i.parser
          ? i.parser(t.val())
          : Object(c.isInteger)(o)
          ? parseInt(t.val(), 10)
          : parseFloat(t.val())),
        isNaN(s) && (s = 0),
        (r = n(o)),
        (a = Math.max(r, n(s))),
        (l = e(s, a)),
        i.formatter && (l = i.formatter(l)),
        t.val(l),
        t.change()
    }
    function r(t) {
      var e = t.data('TVTicker'),
        i = e && e.step,
        o = e && e.max
      s(t, function(t, e) {
        var n = (Math.round(t * e) + Math.round(i * e)) / e
        return void 0 !== o && null !== o && o < n && (n = t), n
      })
    }
    function a(t) {
      var e = t.data('TVTicker'),
        i = e && e.step,
        o = e && e.min
      s(t, function(t, e) {
        var n = (Math.round(t * e) - Math.round(i * e)) / e
        return void 0 !== o && null !== o && n < o && (n = t), n
      })
    }
    var l, h, c, u
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (l = i(14)),
      i.n(l),
      (h = i(314)),
      i.n(h),
      (c = i(12)),
      i.n(c),
      (u = i(836)),
      i.n(u),
      ($.fn.TVTicker = function(t) {
        return (
          void 0 === t && (t = {}),
          this.each(function() {
            var e,
              i,
              o,
              n = !1,
              s = $(this),
              l = s.data('TVTicker')
            l ? (n = !0) : (l = { step: +s.data('step') || 1 }),
              'step' in t && (l.step = +t.step || l.step),
              'min' in t && (l.min = t.min),
              'max' in t && (l.max = t.max),
              'formatter' in t && (l.formatter = t.formatter),
              'parser' in t && (l.parser = t.parser),
              s.data('TVTicker', l),
              n ||
                ((e = $('<div class="tv-ticker">').appendTo(s.parent())),
                (i = $('<div class="tv-ticker__btn tv-ticker__btn--up">')
                  .html(u)
                  .appendTo(e)),
                (o = $('<div class="tv-ticker__btn tv-ticker__btn--down">')
                  .html(u)
                  .appendTo(e)),
                e.on('mousedown', function(t) {
                  t.preventDefault(), s.focus()
                }),
                i.click(function() {
                  s.is(':disabled') || r(s)
                }),
                o.click(function() {
                  s.is(':disabled') || a(s)
                }),
                s.keydown(function(t) {
                  s.is(':disabled') ||
                    (38 === t.keyCode
                      ? i.addClass('i-active')
                      : 40 === t.keyCode && o.addClass('i-active'))
                }),
                s.keyup(function(t) {
                  s.is(':disabled') ||
                    (38 === t.keyCode
                      ? (r(s), i.removeClass('i-active'))
                      : 40 === t.keyCode && (a(s), o.removeClass('i-active')))
                }),
                s.mousewheel(function(t, e) {
                  e > 0 ? i.click() : o.click()
                }))
          })
        )
      })
  },
  850: function(t, e, i) {
    var o, n, s
    !(function(r) {
      ;(n = [i(14), i(80)]),
        (o = r),
        void 0 !== (s = 'function' == typeof o ? o.apply(e, n) : o) && (t.exports = s)
    })(function(t) {
      return (t.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
      })
    })
  },
  851: function(t, e) {},
  866: function(t, e, i) {
    var o, n, s
    !(function(r) {
      ;(n = [i(14), i(310), i(850), i(80), i(191)]),
        (o = r),
        void 0 !== (s = 'function' == typeof o ? o.apply(e, n) : o) && (t.exports = s)
    })(function(t) {
      return t.widget('ui.slider', t.ui.mouse, {
        version: '1.12.1',
        widgetEventPrefix: 'slide',
        options: {
          animate: !1,
          classes: {
            'ui-slider': 'ui-corner-all',
            'ui-slider-handle': 'ui-corner-all',
            'ui-slider-range': 'ui-corner-all ui-widget-header',
          },
          distance: 0,
          max: 100,
          min: 0,
          orientation: 'horizontal',
          range: !1,
          step: 1,
          value: 0,
          values: null,
          change: null,
          slide: null,
          start: null,
          stop: null,
        },
        numPages: 5,
        _create: function() {
          ;(this._keySliding = !1),
            (this._mouseSliding = !1),
            (this._animateOff = !0),
            (this._handleIndex = null),
            this._detectOrientation(),
            this._mouseInit(),
            this._calculateNewMax(),
            this._addClass(
              'ui-slider ui-slider-' + this.orientation,
              'ui-widget ui-widget-content',
            ),
            this._refresh(),
            (this._animateOff = !1)
        },
        _refresh: function() {
          this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
        },
        _createHandles: function() {
          var e,
            i,
            o = this.options,
            n = this.element.find('.ui-slider-handle'),
            s = []
          for (
            i = (o.values && o.values.length) || 1,
              n.length > i && (n.slice(i).remove(), (n = n.slice(0, i))),
              e = n.length;
            e < i;
            e++
          )
            s.push("<span tabindex='0'></span>")
          ;(this.handles = n.add(t(s.join('')).appendTo(this.element))),
            this._addClass(this.handles, 'ui-slider-handle', 'ui-state-default'),
            (this.handle = this.handles.eq(0)),
            this.handles.each(function(e) {
              t(this)
                .data('ui-slider-handle-index', e)
                .attr('tabIndex', 0)
            })
        },
        _createRange: function() {
          var e = this.options
          e.range
            ? (!0 === e.range &&
                (e.values
                  ? e.values.length && 2 !== e.values.length
                    ? (e.values = [e.values[0], e.values[0]])
                    : t.isArray(e.values) && (e.values = e.values.slice(0))
                  : (e.values = [this._valueMin(), this._valueMin()])),
              this.range && this.range.length
                ? (this._removeClass(this.range, 'ui-slider-range-min ui-slider-range-max'),
                  this.range.css({ left: '', bottom: '' }))
                : ((this.range = t('<div>').appendTo(this.element)),
                  this._addClass(this.range, 'ui-slider-range')),
              ('min' !== e.range && 'max' !== e.range) ||
                this._addClass(this.range, 'ui-slider-range-' + e.range))
            : (this.range && this.range.remove(), (this.range = null))
        },
        _setupEvents: function() {
          this._off(this.handles),
            this._on(this.handles, this._handleEvents),
            this._hoverable(this.handles),
            this._focusable(this.handles)
        },
        _destroy: function() {
          this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy()
        },
        _mouseCapture: function(e) {
          var i,
            o,
            n,
            s,
            r,
            a,
            l,
            h = this,
            c = this.options
          return (
            !c.disabled &&
            ((this.elementSize = {
              width: this.element.outerWidth(),
              height: this.element.outerHeight(),
            }),
            (this.elementOffset = this.element.offset()),
            (i = { x: e.pageX, y: e.pageY }),
            (o = this._normValueFromMouse(i)),
            (n = this._valueMax() - this._valueMin() + 1),
            this.handles.each(function(e) {
              var i = Math.abs(o - h.values(e))
              ;(n > i || (n === i && (e === h._lastChangedValue || h.values(e) === c.min))) &&
                ((n = i), (s = t(this)), (r = e))
            }),
            !1 !== this._start(e, r) &&
              ((this._mouseSliding = !0),
              (this._handleIndex = r),
              this._addClass(s, null, 'ui-state-active'),
              s.trigger('focus'),
              (a = s.offset()),
              (l = !t(e.target)
                .parents()
                .addBack()
                .is('.ui-slider-handle')),
              (this._clickOffset = l
                ? { left: 0, top: 0 }
                : {
                    left: e.pageX - a.left - s.width() / 2,
                    top:
                      e.pageY -
                      a.top -
                      s.height() / 2 -
                      (parseInt(s.css('borderTopWidth'), 10) || 0) -
                      (parseInt(s.css('borderBottomWidth'), 10) || 0) +
                      (parseInt(s.css('marginTop'), 10) || 0),
                  }),
              this.handles.hasClass('ui-state-hover') || this._slide(e, r, o),
              (this._animateOff = !0),
              !0))
          )
        },
        _mouseStart: function() {
          return !0
        },
        _mouseDrag: function(t) {
          var e = { x: t.pageX, y: t.pageY },
            i = this._normValueFromMouse(e)
          return this._slide(t, this._handleIndex, i), !1
        },
        _mouseStop: function(t) {
          return (
            this._removeClass(this.handles, null, 'ui-state-active'),
            (this._mouseSliding = !1),
            this._stop(t, this._handleIndex),
            this._change(t, this._handleIndex),
            (this._handleIndex = null),
            (this._clickOffset = null),
            (this._animateOff = !1),
            !1
          )
        },
        _detectOrientation: function() {
          this.orientation = 'vertical' === this.options.orientation ? 'vertical' : 'horizontal'
        },
        _normValueFromMouse: function(t) {
          var e, i, o, n, s
          return (
            'horizontal' === this.orientation
              ? ((e = this.elementSize.width),
                (i =
                  t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)))
              : ((e = this.elementSize.height),
                (i =
                  t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0))),
            (o = i / e),
            o > 1 && (o = 1),
            o < 0 && (o = 0),
            'vertical' === this.orientation && (o = 1 - o),
            (n = this._valueMax() - this._valueMin()),
            (s = this._valueMin() + o * n),
            this._trimAlignValue(s)
          )
        },
        _uiHash: function(t, e, i) {
          var o = {
            handle: this.handles[t],
            handleIndex: t,
            value: void 0 !== e ? e : this.value(),
          }
          return (
            this._hasMultipleValues() &&
              ((o.value = void 0 !== e ? e : this.values(t)), (o.values = i || this.values())),
            o
          )
        },
        _hasMultipleValues: function() {
          return this.options.values && this.options.values.length
        },
        _start: function(t, e) {
          return this._trigger('start', t, this._uiHash(e))
        },
        _slide: function(t, e, i) {
          var o,
            n = this.value(),
            s = this.values()
          this._hasMultipleValues() &&
            ((o = this.values(e ? 0 : 1)),
            (n = this.values(e)),
            2 === this.options.values.length &&
              !0 === this.options.range &&
              (i = 0 === e ? Math.min(o, i) : Math.max(o, i)),
            (s[e] = i)),
            i !== n &&
              !1 !== this._trigger('slide', t, this._uiHash(e, i, s)) &&
              (this._hasMultipleValues() ? this.values(e, i) : this.value(i))
        },
        _stop: function(t, e) {
          this._trigger('stop', t, this._uiHash(e))
        },
        _change: function(t, e) {
          this._keySliding ||
            this._mouseSliding ||
            ((this._lastChangedValue = e), this._trigger('change', t, this._uiHash(e)))
        },
        value: function(t) {
          return arguments.length
            ? ((this.options.value = this._trimAlignValue(t)),
              this._refreshValue(),
              void this._change(null, 0))
            : this._value()
        },
        values: function(e, i) {
          var o, n, s
          if (arguments.length > 1)
            return (
              (this.options.values[e] = this._trimAlignValue(i)),
              this._refreshValue(),
              void this._change(null, e)
            )
          if (!arguments.length) return this._values()
          if (!t.isArray(arguments[0]))
            return this._hasMultipleValues() ? this._values(e) : this.value()
          for (o = this.options.values, n = arguments[0], s = 0; s < o.length; s += 1)
            (o[s] = this._trimAlignValue(n[s])), this._change(null, s)
          this._refreshValue()
        },
        _setOption: function(e, i) {
          var o,
            n = 0
          switch (
            ('range' === e &&
              !0 === this.options.range &&
              ('min' === i
                ? ((this.options.value = this._values(0)), (this.options.values = null))
                : 'max' === i &&
                  ((this.options.value = this._values(this.options.values.length - 1)),
                  (this.options.values = null))),
            t.isArray(this.options.values) && (n = this.options.values.length),
            this._super(e, i),
            e)
          ) {
            case 'orientation':
              this._detectOrientation(),
                this._removeClass('ui-slider-horizontal ui-slider-vertical')._addClass(
                  'ui-slider-' + this.orientation,
                ),
                this._refreshValue(),
                this.options.range && this._refreshRange(i),
                this.handles.css('horizontal' === i ? 'bottom' : 'left', '')
              break
            case 'value':
              ;(this._animateOff = !0),
                this._refreshValue(),
                this._change(null, 0),
                (this._animateOff = !1)
              break
            case 'values':
              for (this._animateOff = !0, this._refreshValue(), o = n - 1; o >= 0; o--)
                this._change(null, o)
              this._animateOff = !1
              break
            case 'step':
            case 'min':
            case 'max':
              ;(this._animateOff = !0),
                this._calculateNewMax(),
                this._refreshValue(),
                (this._animateOff = !1)
              break
            case 'range':
              ;(this._animateOff = !0), this._refresh(), (this._animateOff = !1)
          }
        },
        _setOptionDisabled: function(t) {
          this._super(t), this._toggleClass(null, 'ui-state-disabled', !!t)
        },
        _value: function() {
          var t = this.options.value
          return (t = this._trimAlignValue(t))
        },
        _values: function(t) {
          var e, i, o
          if (arguments.length) return (e = this.options.values[t]), (e = this._trimAlignValue(e))
          if (this._hasMultipleValues()) {
            for (i = this.options.values.slice(), o = 0; o < i.length; o += 1)
              i[o] = this._trimAlignValue(i[o])
            return i
          }
          return []
        },
        _trimAlignValue: function(t) {
          if (t <= this._valueMin()) return this._valueMin()
          if (t >= this._valueMax()) return this._valueMax()
          var e = this.options.step > 0 ? this.options.step : 1,
            i = (t - this._valueMin()) % e,
            o = t - i
          return 2 * Math.abs(i) >= e && (o += i > 0 ? e : -e), parseFloat(o.toFixed(5))
        },
        _calculateNewMax: function() {
          var t = this.options.max,
            e = this._valueMin(),
            i = this.options.step
          ;(t = Math.round((t - e) / i) * i + e),
            t > this.options.max && (t -= i),
            (this.max = parseFloat(t.toFixed(this._precision())))
        },
        _precision: function() {
          var t = this._precisionOf(this.options.step)
          return (
            null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
          )
        },
        _precisionOf: function(t) {
          var e = '' + t,
            i = e.indexOf('.')
          return -1 === i ? 0 : e.length - i - 1
        },
        _valueMin: function() {
          return this.options.min
        },
        _valueMax: function() {
          return this.max
        },
        _refreshRange: function(t) {
          'vertical' === t && this.range.css({ width: '', left: '' }),
            'horizontal' === t && this.range.css({ height: '', bottom: '' })
        },
        _refreshValue: function() {
          var e,
            i,
            o,
            n,
            s,
            r = this.options.range,
            a = this.options,
            l = this,
            h = !this._animateOff && a.animate,
            c = {}
          this._hasMultipleValues()
            ? this.handles.each(function(o) {
                ;(i = ((l.values(o) - l._valueMin()) / (l._valueMax() - l._valueMin())) * 100),
                  (c['horizontal' === l.orientation ? 'left' : 'bottom'] = i + '%'),
                  t(this)
                    .stop(1, 1)
                    [h ? 'animate' : 'css'](c, a.animate),
                  !0 === l.options.range &&
                    ('horizontal' === l.orientation
                      ? (0 === o &&
                          l.range.stop(1, 1)[h ? 'animate' : 'css']({ left: i + '%' }, a.animate),
                        1 === o &&
                          l.range[h ? 'animate' : 'css'](
                            { width: i - e + '%' },
                            { queue: !1, duration: a.animate },
                          ))
                      : (0 === o &&
                          l.range.stop(1, 1)[h ? 'animate' : 'css']({ bottom: i + '%' }, a.animate),
                        1 === o &&
                          l.range[h ? 'animate' : 'css'](
                            { height: i - e + '%' },
                            { queue: !1, duration: a.animate },
                          ))),
                  (e = i)
              })
            : ((o = this.value()),
              (n = this._valueMin()),
              (s = this._valueMax()),
              (i = s !== n ? ((o - n) / (s - n)) * 100 : 0),
              (c['horizontal' === this.orientation ? 'left' : 'bottom'] = i + '%'),
              this.handle.stop(1, 1)[h ? 'animate' : 'css'](c, a.animate),
              'min' === r &&
                'horizontal' === this.orientation &&
                this.range.stop(1, 1)[h ? 'animate' : 'css']({ width: i + '%' }, a.animate),
              'max' === r &&
                'horizontal' === this.orientation &&
                this.range.stop(1, 1)[h ? 'animate' : 'css']({ width: 100 - i + '%' }, a.animate),
              'min' === r &&
                'vertical' === this.orientation &&
                this.range.stop(1, 1)[h ? 'animate' : 'css']({ height: i + '%' }, a.animate),
              'max' === r &&
                'vertical' === this.orientation &&
                this.range.stop(1, 1)[h ? 'animate' : 'css']({ height: 100 - i + '%' }, a.animate))
        },
        _handleEvents: {
          keydown: function(e) {
            var i,
              o,
              n,
              s = t(e.target).data('ui-slider-handle-index')
            switch (e.keyCode) {
              case t.ui.keyCode.HOME:
              case t.ui.keyCode.END:
              case t.ui.keyCode.PAGE_UP:
              case t.ui.keyCode.PAGE_DOWN:
              case t.ui.keyCode.UP:
              case t.ui.keyCode.RIGHT:
              case t.ui.keyCode.DOWN:
              case t.ui.keyCode.LEFT:
                if (
                  (e.preventDefault(),
                  !this._keySliding &&
                    ((this._keySliding = !0),
                    this._addClass(t(e.target), null, 'ui-state-active'),
                    !1 === this._start(e, s)))
                )
                  return
            }
            switch (
              ((n = this.options.step),
              (i = o = this._hasMultipleValues() ? this.values(s) : this.value()),
              e.keyCode)
            ) {
              case t.ui.keyCode.HOME:
                o = this._valueMin()
                break
              case t.ui.keyCode.END:
                o = this._valueMax()
                break
              case t.ui.keyCode.PAGE_UP:
                o = this._trimAlignValue(i + (this._valueMax() - this._valueMin()) / this.numPages)
                break
              case t.ui.keyCode.PAGE_DOWN:
                o = this._trimAlignValue(i - (this._valueMax() - this._valueMin()) / this.numPages)
                break
              case t.ui.keyCode.UP:
              case t.ui.keyCode.RIGHT:
                if (i === this._valueMax()) return
                o = this._trimAlignValue(i + n)
                break
              case t.ui.keyCode.DOWN:
              case t.ui.keyCode.LEFT:
                if (i === this._valueMin()) return
                o = this._trimAlignValue(i - n)
            }
            this._slide(e, s, o)
          },
          keyup: function(e) {
            var i = t(e.target).data('ui-slider-handle-index')
            this._keySliding &&
              ((this._keySliding = !1),
              this._stop(e, i),
              this._change(e, i),
              this._removeClass(t(e.target), null, 'ui-state-active'))
          },
        },
      })
    })
  },
})
