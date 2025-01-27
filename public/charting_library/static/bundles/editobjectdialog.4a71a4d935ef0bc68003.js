webpackJsonp([17, 27], {
  357: function(t, e, i) {
    'use strict'
    ;(function(e) {
      function o(t, e, i) {
        ;(this._source = t), (this._model = e), (this._undoCheckpoint = i)
      }
      var n = i(0).LineDataSource,
        a = i(34).Study,
        s = i(63).Series,
        r = i(28).DataSource,
        l = i(31),
        c = i(847).bindPopupMenu,
        p = i(874),
        u = i(883).TVOldDialogs,
        d = i(39).trackEvent,
        h = i(73).isLineTool
      i(845),
        (o.prototype.hide = function(t) {
          u.destroy(this._dialogTitle, { undoChanges: !!t })
        }),
        (o.prototype._onDestroy = function(t, e) {
          var i,
            o,
            n = (e || {}).undoChanges
          $(window).unbind('keyup.hidePropertyDialog'),
            n
              ? (i = this._undoCheckpoint ? this._undoCheckpoint : this._undoCheckpointOnShow) &&
                this._model.undoToCheckpoint(i)
              : this._source.hasAlert.value() &&
                ((o = this._source),
                setTimeout(function() {
                  o.localAndServerAlersMismatch && o.synchronizeAlert(!0)
                })),
            this._undoCheckpointOnShow && delete this._undoCheckpointOnShow,
            window.lineToolPropertiesToolbar && window.lineToolPropertiesToolbar.refresh()
        }),
        (o.prototype.isVisible = function() {
          return this._dialog && this._dialog.is(':visible')
        }),
        (o.prototype.focusOnText = function() {
          this._dialog
            .find('input[type="text"]')
            .focus()
            .select()
        }),
        (o.prototype.switchTab = function(t, e) {
          var i, o
          if (this._tabs)
            return (
              (i = null),
              t ? (t = t.valueOf()) : null === t && (t = void 0),
              'string' == typeof t &&
                $.each(this._tabs, function(e, o) {
                  if (o.name === t) return (i = o), !1
                }),
              'object' == typeof t &&
                $.each(this._tabs, function(e, o) {
                  if (t === o || $(o.labelObject).is(t) || $(o.wrapperObject).is(t))
                    return (i = o), !1
                }),
              i || (i = this._tabs[~~t]),
              !!i &&
                ($.each(this._tabs, function(t, e) {
                  var o = e === i
                  $(e.wrapperObject)[o ? 'show' : 'hide'](),
                    $(e.labelObject)[o ? 'addClass' : 'removeClass']('active')
                }),
                e && (o = this.activeTabSettingsName()) && TVSettings.setValue(o, i.name),
                this._dialog.height() + 100 > $(window).height() &&
                  !i.isScrollable &&
                  this.makeScrollable(i),
                $(':focus').blur(),
                !0)
            )
        }),
        (o.prototype.makeScrollable = function(t) {
          var e = t.wrapperObject,
            i = $(t.objects[0]),
            o = i.width()
          e.css({ height: $(window).height() / 1.4, overflow: 'auto' }),
            i.css('width', o + 20),
            (t.isScrollable = !0)
        }),
        (o.prototype.appendToTab = function(t, e, i, o, n, a) {
          var s, r
          ;($(t).is('table') &&
            !$(t)
              .find('tr')
              .size()) ||
            (this._tabs || (this._tabs = []),
            $.each(this._tabs, function(t, i) {
              if (i.name === e) return (s = t), !1
            }),
            void 0 === s &&
              (this._tabs.push({
                name: e,
                localizedName: $.t(e),
                objects: $(),
                displayPriority: 0,
                defaultOpen: 0,
                isButton: !!n,
                callback: n ? a || function() {} : null,
              }),
              (s = this._tabs.length - 1)),
            (r = this._tabs[s]),
            (r.objects = r.objects.add(t)),
            (r.displayPriority = Math.max(r.displayPriority || 0, i || 0)),
            (r.defaultOpen = Math.max(r.defaultOpen || 0, o || 0)))
        }),
        (o.prototype.insertTabs = function() {
          function t(t) {
            a &&
              a === t.name &&
              (t.defaultOpen = Math.max(~~t.defaultOpen, p.TabOpenFrom.UserSave)),
              (!o || ~~o.defaultOpen < ~~t.defaultOpen) && (o = t),
              (t.labelObject = $('<a href="#" class="properties-tabs-label tv-tabs__tab"></a>')
                .text(t.localizedName)
                .appendTo(i._tabContainer)),
              t.labelObject.on('mousedown', function(t) {
                function e(t) {
                  var e = 5
                  return Math.abs(n - t.pageX) > e || Math.abs(a - t.pageY) > e
                }
                function o(t) {
                  s = s || e(t)
                }
                var n = t.pageX,
                  a = t.pageY,
                  s = !1,
                  r = this
                $(r).on('mousemove', o),
                  $(r).one('mouseup', function() {
                    s || i.switchTab(r, !0), $(r).off('mousemove', o)
                  })
              })
            var e = $('<div class="main-properties"></div>')
            ;(t.wrapperObject = $().add(e)),
              t.objects.each(function(i, o) {
                var n = $(o)
                n.is('table')
                  ? (n.data('layout-separated') &&
                      ((t.wrapperObject = t.wrapperObject
                        .add('<div class="properties-separator"></div>')
                        .add((e = $('<div class="main-properties"></div>')))),
                      n.removeData('layout-separated')),
                    e.append(n),
                    n.children('tbody').each(function(i, n) {
                      if (0 !== i && $(n).data('layout-separated')) {
                        t.wrapperObject = t.wrapperObject
                          .add('<div class="properties-separator"></div>')
                          .add((e = $('<div class="main-properties"></div>')))
                        var a = $(o)
                          .clone(!0, !1)
                          .appendTo(e)
                        a.children().remove(), a.append(n), $(n).removeData('layout-separated')
                      }
                    }))
                  : e.append(n)
              }),
              t.wrapperObject.appendTo(i._container)
          }
          function e(t) {
            ;(t.labelObject = $('<a href="#" class="properties-tabs-label tv-tabs__tab"></a>')
              .text(t.localizedName)
              .appendTo(i._tabContainer)),
              t.labelObject.bind('click', t.callback)
          }
          var i, o, n, a
          this._tabs &&
            (this._tabs.sort(function(t, e) {
              return (e.displayPriority || 0) - (t.displayPriority || 0)
            }),
            (i = this),
            (o = null),
            (n = this.activeTabSettingsName()),
            n && (a = TVSettings.getValue(n)),
            $.each(this._tabs, function(i, o) {
              o.isButton ? e(o) : t(o)
            }),
            this.switchTab(o))
        }),
        (o.prototype.activeTabSettingsName = function() {
          var t = this._source
          if (t)
            return t instanceof s
              ? 'properties_dialog.active_tab.chart'
              : t instanceof n
              ? 'properties_dialog.active_tab.drawing'
              : t instanceof a
              ? 'properties_dialog.active_tab.study'
              : void 0
        }),
        (o.prototype.show = function(t) {
          function o(t, e) {
            C.hide(!!e)
          }
          var f, v, g, _, m, y, b, T, C, w, x, k, D, P, S, M, O, I, V, E, N, A, F, B, z, L, R
          if (
            e.enabled('property_pages') &&
            ((f = i(693)),
            (t = t || {}),
            (v = t.onWidget || !1),
            TradingView.isInherited(this._source.constructor, s) && d('GUI', 'Series Properties'),
            TradingView.isInherited(this._source.constructor, a) &&
              ((g =
                !this._source.isPine() || this._source.isStandardPine()
                  ? this._source.metaInfo().description
                  : 'Custom Pine'),
              d('GUI', 'Study Properties', g)),
            h(this._source) && d('GUI', 'Drawing Properties', this._source.name()),
            TradingView.isInherited(this._source.constructor, r) &&
              this._model.setSelectedSource(this._source),
            (_ = f.createStudyStrategyPropertyPage(this._source, this._model)),
            (m = f.createInputsPropertyPage(this._source, this._model)),
            (y = f.createStylesPropertyPage(this._source, this._model)),
            (b = f.createVisibilitiesPropertyPage(this._source, this._model)),
            (T = f.createDisplayPropertyPage(this._source, this._model)),
            (m && !m.widget().is(':empty')) || y || _)
          )
            return (
              (C = this),
              (w = null !== m),
              (x = this._source.title()),
              (k = t.ownerDocument || this._model._chartWidget.widget().prop('ownerDocument')),
              (D = u.createDialog(x, {
                hideTitle: !0,
                dragHandle: '.properties-tabs',
                ownerDocument: k,
              })),
              (P = D.find('._tv-dialog-content')),
              (S = $('<div class="properties-tabs tv-tabs"></div>').appendTo(P)),
              (O = []),
              (I = 400),
              (this._tabs = O),
              (this._dialog = D),
              (this._dialogTitle = x),
              (this._container = P),
              (this._tabContainer = S),
              (this._undoCheckpointOnShow = this._model.createUndoCheckpoint()),
              D.on('destroy', function(t, e) {
                var e = e || {}
                M && (e.undoChanges ? M.restore() : M.applyTheme()),
                  m && m.destroy(),
                  _ && _.destroy(),
                  y && y.destroy(),
                  T && T.destroy(),
                  b && b.destroy(),
                  $('select', P).each(function() {
                    $(this).selectbox('detach')
                  }),
                  C._onDestroy(t, e)
              }),
              t.selectScales && y.setScalesOpenTab && y.setScalesOpenTab(),
              t.selectTmz && y.setTmzOpenTab && y.setTmzOpenTab(),
              !this._model.readOnly() &&
                _ &&
                _.widget().each(function(t, e) {
                  var i,
                    o,
                    n = +$(e).data('layout-tab-priority')
                  isNaN(n) && (n = p.TabPriority.Properties),
                    (i = ~~$(e).data('layout-tab-open')),
                    (o = $(e).data('layout-tab')),
                    void 0 === o && (o = p.TabNames.properties),
                    C.appendToTab(e, o, n, i)
                }),
              this._model.readOnly() ||
                !w ||
                m.widget().is(':empty') ||
                m.widget().each(function(t, e) {
                  var o,
                    n,
                    a = i(691),
                    s = m instanceof a,
                    r = +$(e).data('layout-tab-priority')
                  TradingView.isNaN(r) &&
                    (r = s ? p.TabPriority.Coordinates : p.TabPriority.Inputs),
                    (o = ~~$(e).data('layout-tab-open')),
                    (n = $(e).data('layout-tab')),
                    void 0 === n && (n = s ? p.TabNames.coordinates : p.TabNames.inputs),
                    C.appendToTab(e, n, r, o)
                }),
              y &&
                y.widget().each(function(t, e) {
                  var o,
                    n,
                    a,
                    s = +$(e).data('layout-tab-priority')
                  TradingView.isNaN(s) && (s = p.TabPriority.Style),
                    (o = ~~$(e).data('layout-tab-open')),
                    (n = i(825)),
                    !o && y instanceof n && (o = p.TabOpenFrom.Default),
                    (a = $(e).data('layout-tab')),
                    void 0 === a && (a = p.TabNames.style),
                    C.appendToTab(e, a, s, o)
                }),
              T &&
                T.widget().each(function(t, e) {
                  var i,
                    o,
                    n = +$(e).data('layout-tab-priority')
                  TradingView.isNaN(n) && (n = p.TabPriority.Display),
                    (i = ~~$(e).data('layout-tab-open')),
                    (o = $(e).data('layout-tab')),
                    void 0 === o && (o = p.TabNames.properties),
                    C.appendToTab(e, o, n, i)
                }),
              b &&
                b.widget().each(function(t, e) {
                  C.appendToTab(e, p.TabNames.visibility, p.TabPriority.Display, !1)
                }),
              (N = this._source instanceof a && !!this._source.metaInfo().pine),
              N && this._source.metaInfo(),
              this.insertTabs(),
              this._helpItemRequired() && this._createHelp(),
              (A = 110),
              $('.js-dialog').each(function() {
                var t = parseInt($(this).css('z-index'), 10)
                t > A && (A = t)
              }),
              D.css('z-index', A),
              (V = $('<div class="main-properties main-properties-aftertabs"></div>').appendTo(P)),
              (E = $('<div class="dialog-buttons">').appendTo(V)),
              (F = function() {
                function t(e) {
                  e._childs &&
                    e._childs.length &&
                    $.each(e._childs, function(i, o) {
                      'percentage' === o ? e.percentage.listeners().fire(e.percentage) : t(e[o])
                    })
                }
                var e,
                  i,
                  o = []
                y &&
                  'function' == typeof y.defaultProperties &&
                  (o = o.concat(y.defaultProperties())),
                  m &&
                    'function' == typeof m.defaultProperties &&
                    (o = o.concat(m.defaultProperties())),
                  0 === o.length && C._source.properties
                    ? (o = [C._source.properties()])
                    : C._source._sessionsStudy &&
                      (o = o.concat(C._source._sessionsStudy.properties())),
                  o.length &&
                    ((e = C._source.priceScale().mode()),
                    $.each(o, function(e, i) {
                      C._model.restoreFactoryDefaults(i),
                        C._source.calcIsActualSymbol && C._source.calcIsActualSymbol(),
                        t(i)
                    }),
                    (i = C._source.priceScale()),
                    i && i.modeChanged().fire(e, i.mode()),
                    C._source.properties().minTick &&
                      C._source
                        .properties()
                        .minTick.listeners()
                        .fire(C._source.properties().minTick),
                    C._source.properties().precision &&
                      C._source
                        .properties()
                        .precision.listeners()
                        .fire(C._source.properties().precision),
                    m && m.loadData(),
                    _ && _.loadData(),
                    y.onResoreDefaults && y.onResoreDefaults(),
                    y && y.loadData(),
                    b && b.loadData())
              }),
              (B = function() {
                b && b.loadData(), m && m.loadData()
              }),
              (!v || window.is_authenticated) &&
              y &&
              'function' == typeof y.createTemplateButton &&
              e.enabled('linetoolpropertieswidget_template_button')
                ? (M && E[0].appendChild(M.domNode),
                  (C._templateButton = y
                    .createTemplateButton({
                      popupZIndex: A,
                      defaultsCallback: F,
                      loadTemplateCallback: B,
                    })
                    .addClass('tv-left')
                    .appendTo(E)))
                : TradingView.isInherited(this._source.constructor, a)
                ? ((z = [
                    { title: $.t('Reset Settings'), action: F },
                    {
                      title: $.t('Save As Default'),
                      action: function() {
                        C._source.properties().saveDefaults()
                      },
                    },
                  ]),
                  (L = $(
                    '<a href="#" class="_tv-button tv-left">' +
                      $.t('Defaults') +
                      '<span class="icon-dropdown"></span></a>',
                  )),
                  L.on('click', function(t) {
                    t.preventDefault()
                    var e = $(this)
                    e.is('.active') || e.trigger('button-popup', [z, !0])
                  }).appendTo(E),
                  c(L, null, {
                    direction: 'down',
                    event: 'button-popup',
                    notCloseOnButtons: !0,
                    zIndex: A,
                  }))
                : $('<a class="_tv-button tv-left">' + $.t('Defaults') + '</a>')
                    .appendTo(E)
                    .click(F),
              $('<a class="_tv-button ok">' + $.t('OK') + '</a>')
                .appendTo(E)
                .click(function() {
                  C.hide()
                }),
              $('<a class="_tv-button cancel">' + $.t('Cancel') + '</a>')
                .appendTo(E)
                .on('click', function(t) {
                  o(t, !0)
                }),
              D.find('._tv-dialog-title a').on('click', o),
              $(window).bind('keyup.hidePropertyDialog', function(t) {
                13 === t.keyCode &&
                  'textarea' !== t.target.tagName.toLowerCase() &&
                  (C._templateButton && C._templateButton.trigger('hide-popup'), C.hide())
              }),
              $('select', P).each(function() {
                var t = $(this),
                  e = 'tv-select-container dialog'
                t.hasClass('tv-select-container-fontsize') &&
                  (e += ' tv-select-container-fontsize'),
                  t.selectbox({ speed: 100, classHolder: e })
              }),
              $('input[type="text"]', P).addClass('tv-text-input inset dialog'),
              $('input.ticker', P).TVTicker(),
              D.css('min-width', I + 'px'),
              u.applyHandlers(D, t),
              (R = {
                top: ($(window).height() - D.height()) / 2,
                left: ($(window).width() - D.width()) / 2,
              }),
              y && 'function' == typeof y.dialogPosition && (R = y.dialogPosition(R, D) || R),
              u.positionDialog(D, R),
              window.lineToolPropertiesToolbar && window.lineToolPropertiesToolbar.hide(),
              l.emit('edit_object_dialog', {
                objectType:
                  this._source === this._model.mainSeries()
                    ? 'mainSeries'
                    : this._source instanceof n
                    ? 'drawing'
                    : this._source instanceof a
                    ? 'study'
                    : 'other',
                scriptTitle: this._source.title(),
              }),
              D
            )
        }),
        (o.prototype._helpItemRequired = function() {
          return this._source._metaInfo && !!this._source._metaInfo.helpURL
        }),
        (o.prototype._createHelp = function() {
          var t = $('<a class="help" href="#" target="_blank" title="' + $.t('Help') + '"></a>')
          t.attr('href', this._source._metaInfo.helpURL), this._tabContainer.prepend(t)
        }),
        (t.exports = o)
    }.call(e, i(5)))
  },
  691: function(t, e, i) {
    'use strict'
    function o(t, e, i) {
      a.call(this, t, e), (this._linetool = i), this.prepareLayout()
    }
    var n = i(823),
      a = n.PropertyPage,
      s = n.GreateTransformer,
      r = n.LessTransformer,
      l = n.ToIntTransformer,
      c = n.SimpleStringBinder
    i(845),
      inherit(o, a),
      (o.BarIndexPastLimit = -5e4),
      (o.BarIndexFutureLimit = 15e3),
      (o.prototype.bindBarIndex = function(t, e, i, n) {
        var a = [l(t.value()), s(o.BarIndexPastLimit), r(o.BarIndexFutureLimit)]
        this.bindControl(this.createStringBinder(e, t, a, !0, i, n))
      }),
      (o.prototype.createPriceEditor = function(t) {
        var e,
          i,
          o,
          n = this._linetool,
          a = n.ownerSource().formatter(),
          s = function(t) {
            return a.format(t)
          },
          r = function(t) {
            var e = a.parse(t)
            if (e.res) return e.price ? e.price : e.value
          },
          l = $("<input type='text'>")
        return (
          l.TVTicker({ step: a._minMove / a._priceScale || 1, formatter: s, parser: r }),
          t &&
            ((e = [
              function(e) {
                var i = r(e)
                return void 0 === i ? t.value() : i
              },
            ]),
            (i = 'Change ' + n.title() + ' point price'),
            (o = this.createStringBinder(l, t, e, !1, this.model(), i)),
            o.addFormatter(function(t) {
              return a.format(t)
            }),
            this.bindControl(o)),
          l
        )
      }),
      (o.prototype._createPointRow = function(t, e, i) {
        var o,
          n,
          a,
          s,
          r,
          l = $('<tr>'),
          c = $('<td>')
        return (
          c.html($.t('Price') + i),
          c.appendTo(l),
          (o = $('<td>')),
          o.appendTo(l),
          (n = this.createPriceEditor(e.price)),
          n.appendTo(o),
          (a = $('<td>')),
          a.html($.t('Bar #')),
          a.appendTo(l),
          (s = $('<td>')),
          s.appendTo(l),
          (r = $("<input type='text'>")),
          r.appendTo(s),
          r.addClass('ticker'),
          this.bindBarIndex(
            e.bar,
            r,
            this.model(),
            'Change ' + this._linetool.title() + ' point bar index',
          ),
          l
        )
      }),
      (o.prototype.prepareLayoutForTable = function(t) {
        var e,
          i,
          o,
          n,
          a,
          s = this._linetool.points(),
          r = s.length
        for (e = 0; e < s.length; e++)
          (i = s[e]),
            (o = this._linetool.properties().points[e]) &&
              ((n = e || r > 1 ? ' ' + (e + 1) : ''),
              (a = this._createPointRow(i, o, n)),
              a.appendTo(t))
      }),
      (o.prototype.prepareLayout = function() {
        ;(this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          this.prepareLayoutForTable(this._table),
          this.loadData()
      }),
      (o.prototype.widget = function() {
        return this._table
      }),
      (o.prototype.createStringBinder = function(t, e, i, o, n, a) {
        return new c(t, e, i, o, n, a)
      }),
      (t.exports = o)
  },
  693: function(t, e, i) {
    'use strict'
    ;(e.createInputsPropertyPage = function(t, e) {
      var i = t.getInputsPropertyPage()
      return null == i ? null : new i(t.properties(), e, t)
    }),
      (e.createStudyStrategyPropertyPage = function(t, e) {
        var i = t.getStrategyPropertyPage()
        return null == i ? null : new i(t.properties(), e, t)
      }),
      (e.createStylesPropertyPage = function(t, e) {
        var i = t.getStylesPropertyPage()
        return null == i ? null : new i(t.properties(), e, t)
      }),
      (e.createDisplayPropertyPage = function(t, e) {
        var i = t.getDisplayPropertyPage()
        return null == i ? null : new i(t.properties(), e, t)
      }),
      (e.createVisibilitiesPropertyPage = function(t, e) {
        var i = t.getVisibilitiesPropertyPage()
        return null == i ? null : new i(t.properties(), e, t)
      }),
      (e.hasInputsPropertyPage = function(t) {
        return null !== t.getInputsPropertyPage()
      }),
      (e.hasStylesPropertyPage = function(t) {
        return null !== t.getStylesPropertyPage()
      })
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
      function a(t) {
        return t.toUpperCase()
      }
      function s(t) {
        return function(e) {
          return e < t ? t : e
        }
      }
      function r(t) {
        return function(e) {
          return e > t ? t : e
        }
      }
      function l(t) {
        return function(e) {
          var i = parseInt(e, 10)
          return E(i) ? t : i
        }
      }
      function c(t) {
        var e = new L()
        return function(i) {
          var o = e.parse(i)
          return E(o) ? t : o
        }
      }
      function p(t) {
        var e = new L()
        return function(i) {
          var o = e.parse(i)
          return E(o) ? t() : o
        }
      }
      function u(t, e) {
        var i = new R(e)
        return function(e) {
          var o = i.format(e)
          return E(o) ? t : o
        }
      }
      function d() {
        return function(t) {
          for (var e = t, i = t.replace(/[^\u0000-\u007F]/, ''); i.length !== e.length; )
            (e = i), (i = e.replace(/[^\u0000-\u007F]/, ''))
          return i
        }
      }
      function h(t) {
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
      function v(t, e, i, o, n, a, s) {
        U.call(this, t, e, o, n, a),
          (this._transformFunction = i),
          (this._setter = s),
          this._attachToControl(t, o)
      }
      function g(t, e, i, o, n) {
        v.call(this, t, e, c(e.value()), i, o, n),
          this.addFormatter(function(t) {
            return new L().format(t)
          })
      }
      function _(t, e, i, o, n, a) {
        ;(this._subControlIds = e),
          U.call(this, t, i, o, n, a),
          this._forEachSubControl(function(t) {
            this._attachToControl(t, o)
          })
      }
      function m(t, e, i, o, n, a, s) {
        ;(this._model = o),
          (this._mainSeries = a),
          (this._toIntTransformer = l(s)),
          (this._disabled = !1),
          U.call(this, t, e, i, o, n)
        var r = this
        i &&
          t.change(function() {
            r.setValueToProperty(r.value())
          }),
          this._mainSeries
            .dataEvents()
            .barReceived()
            .subscribe(this, function() {
              r.setValue(this.property().value())
            })
      }
      function y(t, e, i, o, n, a, s) {
        U.call(this, t, e, i, o, n),
          (this._transform = a),
          i &&
            t.on(
              'accept-symbol',
              function(t, e) {
                this.setValueToProperty(e), this.setValue(e)
              }.bind(this),
            ),
          s && (s.subscribe(this, this._updateDisplayedSymbol), (this._updateDelegate = s))
      }
      function b(t, e, i, o, n, a, s, r) {
        U.call(this, t, e, o, n, a),
          (this._transformFunction = i),
          (this._propertyChangedHook = r),
          (this._setter = s)
        var l = this
        o &&
          t.change(function() {
            l._setter ? l._setter.call(l, l.value()) : l.setValueToProperty(l.value())
          })
      }
      function T(t, e) {
        U.call(this, t, e)
      }
      function C(t, e, i, o, n, a) {
        if (!t.is(':checkbox, :radio')) return new x(t, e, i, o, n)
        U.call(this, t, e, i, o, n), (this._setter = a)
        var s = this
        i &&
          t.change(function() {
            s._setter ? s._setter.call(s, s.value()) : s.setValueToProperty(s.value())
          })
      }
      function w(t, e, i, o, n, a) {
        U.call(this, t, e, i, o, n), (this._inverted = !0 === a)
      }
      function x(t, e, i, o, n) {
        U.call(this, t, e, i, o, n)
        var a = this
        i &&
          t.click(function() {
            var t = $(this)
              .toggleClass('active')
              .hasClass('active')
            a.setValueToProperty(t)
          })
      }
      function k(t, e, i, o, n, a) {
        var s, r
        ;(s = t.is('input') ? t : t.find('input')),
          U.call(this, s, e, i, o, n),
          (this._transparencyProperty = a),
          this.applyOldTransparency(),
          (r = this),
          i &&
            s.change(function() {
              r.setValueToProperty(r.value())
            })
      }
      function D(e, i, o, n, a, s) {
        function r(t, e) {
          var i = c.control().slider('option', 'min'),
            o = c.control().slider('option', 'max'),
            n = c._property.value()
          ;((i <= n && n <= o) || (i < e.value && e.value < o)) && c.setValueToProperty(e.value)
        }
        function l(t, e) {
          c.setValueToProperty(e.value)
        }
        isNumber(i.value()) ||
          (W.logWarn(
            'Property cannot be binded to control, bad value (expect number): ' + i.value(),
          ),
          (i = new t())),
          U.call(this, e, i, o, n, a)
        var c = this
        o &&
          (s
            ? (e.bind('slidechange', r), e.bind('slide', r))
            : (e.bind('slidechange', l), e.bind('slide', l))),
          e.bind('slidestart', function(t, e) {
            n.beginUndoMacro(a)
          }),
          e.bind('slidestop', function(t, e) {
            n.endUndoMacro()
          })
      }
      function P(t, e, i, o, n, a) {
        C.call(this, t, e, o, n, a),
          (this._intervalProperty = i),
          this._intervalProperty.listeners().subscribe(this, this.onIntervalChanged),
          this.onIntervalChanged()
      }
      function S(t, e, i, o, n) {
        ;(this._control = t),
          (this._wv = e),
          (this._transformFunction = i),
          (this._undoModel = o),
          (this._undoText = n),
          this._attachToControl(this._control),
          (this._setValueBinded = this.setValue.bind(this))
      }
      function M(t, e, i, o, n, a) {
        ;(this._not = !!a), S.apply(this, arguments)
      }
      function O(t, e, i, o, n, a, s, r) {
        ;(this._propFrom = e[0]),
          (this._propTo = e[1]),
          (this._control = t),
          (this._applyOnFly = o),
          (this._undoModel = n),
          (this._undoText = s),
          (this._properties = e),
          (this._inputsText = a),
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
          r &&
            ($(r).on('change', function(t) {
              $(this).is(':checked')
                ? (l._control.slider('enable'),
                  $(l._inputsText[0]).prop('disabled', !1),
                  $(l._inputsText[1]).prop('disabled', !1))
                : (l._control.slider('disable'),
                  $(l._inputsText[0]).prop('disabled', !0),
                  $(l._inputsText[1]).prop('disabled', !0))
            }),
            $(r).is(':checked')
              ? (l._control.slider('enable'),
                $(l._inputsText[0]).prop('disabled', !1),
                $(l._inputsText[1]).prop('disabled', !1))
              : (l._control.slider('disable'),
                $(l._inputsText[0]).prop('disabled', !0),
                $(l._inputsText[1]).prop('disabled', !0))),
          a &&
            ($(a[0]).val(this._control.slider('values', 0)),
            $(a[1]).val(this._control.slider('values', 1)),
            t.slider({
              slide: function(t, e) {
                $(a[0]).val(e.values[0]), $(a[1]).val(e.values[1])
              },
            }),
            $(a).each(function() {
              $(this).on('keydown', function(t) {
                parseInt($(a[0]).val()) < l._transformers[0]
                  ? $(a[0]).val(l._transformers[0])
                  : parseInt($(a[1]).val()) > l._transformers[1] && $(a[1]).val(l._transformers[1]),
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
            $(a[0]).on('keyup', function(t) {
              parseInt($(this).val()) < l._transformers[0]
                ? $(this).val(l._transformers[0])
                : parseInt($(this).val()) > l._transformers[1] && $(this).val(l._transformers[1]),
                parseInt($(this).val()) > parseInt($(a[1]).val()) && $(this).val(a[1].val()),
                l._control.slider('values', 0, $(this).val()),
                O.prototype.setValueToProperty.call(l, l._control.slider('values'), 'from')
            }),
            $(a[1]).on('keyup', function(t) {
              parseInt($(this).val()) < l._transformers[0]
                ? $(this).val(l._transformers[0])
                : parseInt($(this).val()) > l._transformers[1] && $(this).val(l._transformers[1]),
                parseInt($(this).val()) < $(a[0]).val() && $(this).val(a[0].val()),
                l._control.slider('values', 1, $(this).val()),
                O.prototype.setValueToProperty.call(l, l._control.slider('values'), 'to')
            })),
          this._propFrom.listeners().subscribe(this, O.prototype.propertyChanged),
          this._propTo.listeners().subscribe(this, O.prototype.propertyChanged),
          o &&
            t.on('slide', function(t, e) {
              l.setValueToProperty(l._control.slider('values'), e.handle)
            }),
          t.slider({
            stop: function(t, e) {
              a &&
                ($(a[0]).val(l._control.slider('values', 0)),
                $(a[1]).val(l._control.slider('values', 1))),
                l.setValueToProperty(l._control.slider('values'), e.handle)
            },
            start: function(t, e) {
              a &&
                ($(a[0]).val(l._control.slider('values', 0)),
                $(a[1]).val(l._control.slider('values', 1))),
                l.setValueToProperty(l._control.slider('values'), e.handle)
            },
          })
      }
      function I(t, e, i, o, n, a) {
        U.call(this, t, e, i, o, n), (this._separator = a || ' ')
        var s = this
        i &&
          t.change(function() {
            s.setValueToProperty(s.value())
          })
      }
      var V, E, N, A, F, B, z, L, R, H, j, U, W
      i(866),
        (V = i(7).ensureNotNull),
        (E = i(83).isNaN),
        (N = i(24)),
        (A = N.rgba),
        (F = N.rgbaToString),
        (B = N.parseRgb),
        (z = i(72).TimePointIndexSearchMode),
        (L = i(105).NumericFormatter),
        (R = i(193).LimitedPrecisionNumericFormatter),
        (H = i(29)),
        (j = i(829).addColorPicker),
        (U = i(317).Binding),
        (W = i(4).getLogger('Chart.PropertyPage')),
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
          return j(null, t)
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
            a = [
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
          for (t in a)
            (e = a[t]),
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
            a,
            s,
            r = null
          return (
            'number' == typeof t.valueOf() ? ((r = t), (o = e), (n = i)) : ((o = t), (n = e)),
            (o += ''),
            (a = this._labelToId(o)),
            (s = $('<td>')),
            $('<label>')
              .html(o.length > 0 ? $.t(o) : '')
              .attr('for', a)
              .appendTo(s),
            r && s.attr('colspan', r),
            n && n.attr('id', a),
            s
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
          var a,
            s = e && e.length > 0 ? $.t(e) : '',
            r = $(document.createElement('tr')),
            l = $(document.createElement('td')).html(s)
          return (
            n && ((n = parseInt(n)), E(n) && (n = 2), l.attr('colspan', n)),
            i && ((a = this._labelToId(e)), i.attr('id', a), l.html(o(s, a))),
            r.append(l).appendTo(t)
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
          var o, n, a
          for (o = 0; o < e.length; o++) {
            ;(n = e[o]), (a = t[n.id])
            try {
              a.toggle(this.parseRule(n.visible, e, i))
            } catch (t) {
              continue
            }
            a.attr('disabled', !this.parseRule(n.visible, e, i))
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
          var a = [l(e.value())]
          void 0 !== o && a.push(s(1)),
            void 0 !== n && a.push(r(1e3)),
            this.bindControl(new v(t, e, a, !1, this.model(), i))
        }),
        (n.prototype.bindColor = function(t, e, i) {
          this.bindControl(new k(t, e, !0, this.model(), i))
        }),
        (n.prototype.bindBoolean = function(t, e, i) {
          this.bindControl(new C(t, e, !0, this.model(), i))
        }),
        inherit(v, U),
        (v.prototype.value = function() {
          var t,
            e = this._control.val()
          if (this._transformFunction)
            if (Array.isArray(this._transformFunction))
              for (t = 0; t < this._transformFunction.length; t++) e = this._transformFunction[t](e)
            else e = this._transformFunction(e)
          return e
        }),
        (v.prototype.setValue = function(t) {
          var e = this._control.val(),
            i = this._formatValue(t)
          e !== i && this._control.val(i)
        }),
        (v.prototype.setValueToProperty = function(t) {
          this._setter
            ? this._setter.call(this, this.value())
            : this._undoModel.setProperty(this._property, t, this._undoText),
            (this._changed = !1)
        }),
        inherit(g, v),
        inherit(_, U),
        (_.prototype._forEachSubControl = function(t) {
          this._subControlIds.forEach(function(e) {
            var i = '#' + e,
              o = this.control().find(i)
            t.call(this, o)
          }, this)
        }),
        (_.prototype._parseSessions = function(t) {
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
        (_.prototype.value = function() {
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
            (e = [l(0), s(0), r(23)]),
            (i = [l(0), s(0), r(59)]),
            t(o[0], e) + t(o[1], i) + '-' + t(o[2], e) + t(o[3], i)
          )
        }),
        (_.prototype.setValue = function(t) {
          var e = this._parseSessions(t)
          this._forEachSubControl(function(t) {
            var i = t.val(),
              o = ('0' + e[0]).slice(-2)
            e.shift(), i !== o && t.val(o)
          })
        }),
        inherit(m, U),
        (m.prototype.value = function() {
          var t, e, i
          return this._disabled
            ? (this._control.attr('disabled', !0), null)
            : ((t = this._control.val()),
              (e = this._toIntTransformer(t)),
              e < 0 && (e = 0),
              (i = this._mainSeries.bars().size()),
              i <= e && (e = i - 1),
              1e3 *
                V(this._mainSeries.bars().valueAt(V(this._mainSeries.bars().lastIndex()) - e))[
                  TradingView.TIME_PLOT
                ])
        }),
        (m.prototype.setValue = function(t) {
          var e, i, o
          return this._disabled || null == t
            ? void this._control.attr('disabled', !0)
            : t < 0
            ? (this._control.val(-t), void this._property.setValue(this.value()))
            : null ===
              (e = this._mainSeries
                .data()
                .plotValueToTimePointIndex(t / 1e3, TradingView.TIME_PLOT, z.FromRight))
            ? void (this._disabled = !0)
            : ((i = V(this._mainSeries.bars().lastIndex())),
              (o = i - e),
              void (this._control.val() !== '' + o && this._control.val(o)))
        }),
        inherit(y, U),
        (y.prototype.value = function() {
          return this._control.val()
        }),
        (y.prototype.setValue = function(t) {
          var e = this.value()
          this._transform && (t = this._transform(t)), t && e !== t && this._control.val(t)
        }),
        (y.prototype._updateDisplayedSymbol = function() {
          this.setValue(this._property.value())
        }),
        (y.prototype.destroy = function() {
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
        inherit(T, U),
        (T.prototype.value = function() {
          return this._property.value()
        }),
        (T.prototype.setValue = function(t) {
          return this._control.html(t)
        }),
        inherit(C, U),
        (C.prototype.value = function() {
          return this.control().is(':checked')
        }),
        (C.prototype.setValue = function(t) {
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
        (C.prototype.destroy = function() {
          U.prototype.destroy.call(this), this._control.off('change')
        }),
        inherit(w, U),
        (w.prototype.value = function() {
          return this.control().is(':disabled')
        }),
        (w.prototype.setValue = function(t) {
          return (
            (t = !!t),
            this._inverted && (t = !t),
            this.control()
              .parents('label')
              .toggleClass('disabled', t),
            this.control().attr('disabled', t)
          )
        }),
        inherit(x, U),
        (x.prototype.value = function() {
          return this.control().hasClass('active')
        }),
        (x.prototype.setValue = function(t) {
          return this.control().toggleClass('active', !!t)
        }),
        inherit(k, U),
        (k.prototype.applyOldTransparency = function() {
          var t, e, i
          this.transparencyProperty() &&
            (H.isHexColor(this.property().value())
              ? ((t = this.transparencyProperty().value
                  ? this.transparencyProperty().value()
                  : this.transparencyProperty()),
                (e = B(this.property().value())),
                (i = (100 - t) / 100),
                this.control().val(F(A(e, i))))
              : this.control().val(this.property().value()),
            this.control().change())
        }),
        (k.prototype.transparencyProperty = function() {
          return this._transparencyProperty
        }),
        (k.prototype.value = function() {
          return this._control.val()
        }),
        (k.prototype.setValue = function(t) {
          this._control.val(t),
            this._control.change(),
            this._control.color && this._control.color.fromString(t)
        }),
        inherit(D, U),
        (D.prototype.value = function() {
          return this._control.slider('option', 'value')
        }),
        (D.prototype.setValue = function(t) {
          this._control.slider('option', 'value', t)
        }),
        inherit(P, C),
        (P.prototype.onIntervalChanged = function() {
          ;+this._intervalProperty.value() < 1440
            ? this._control.attr({ disabled: !1, checked: !!this._property.value() })
            : this._control.attr({ disabled: !0, checked: !1 })
        }),
        (P.prototype.value = function() {
          return this._control.is(':disabled')
            ? this._property.value()
            : C.prototype.value.call(this)
        }),
        (P.prototype.setValue = function(t) {
          if (!this._control.is(':disabled')) return C.prototype.setValue.call(this, t)
        }),
        (P.prototype.destroy = function() {
          this._intervalProperty.listeners().unsubscribe(this, this.onIntervalChanged),
            delete this._intervalProperty,
            C.prototype.destroy.call(this, arguments)
        }),
        (S.prototype._attachToControl = function(t) {
          var e = this
          this._wv.subscribe(this._setValueBinded, { callWithLast: !0 }),
            $(this._control).on('change', function() {
              e.setValueToProperty(e.value())
            })
        }),
        (S.prototype.control = function() {
          return this._control
        }),
        (S.prototype.value = function() {
          var t = $(this._control).val()
          return this._transformFunction && (t = this._transformFunction(t)), t
        }),
        (S.prototype.setValue = function(t) {
          $(this._control).val(t)
        }),
        (S.prototype.setValueToProperty = function(t) {
          this._undoModel.undoHistory.setWatchedValue(this._wv, t, this._undoText)
        }),
        (S.prototype.watchedValue = function() {
          return this._wv
        }),
        (S.prototype.destroy = function() {
          this._wv.unsubscribe(this._setValueBinded)
        }),
        inherit(M, S),
        (M.prototype._attachToControl = function(t) {
          var e = this
          this._wv.subscribe(this.setValue.bind(this), { callWithLast: !0 }),
            $(this._control).on('click', function() {
              e.setValueToProperty(e.value())
            })
        }),
        (M.prototype.value = function() {
          var t = $(this._control).attr('checked')
          return (
            this._not && (t = !t), this._transformFunction && (t = this._transformFunction(t)), t
          )
        }),
        (M.prototype.setValue = function(t) {
          this._not && (t = !t), $(this._control).attr('checked', !!t)
        }),
        (O.prototype.properties = function() {
          return this._properties
        }),
        (O.prototype.value = function(t) {
          return this._control.slider('values', t)
        }),
        (O.prototype.setValue = function(t, e) {
          this._control.slider('values', e, t.value()),
            this._inputsText && $(this._inputsText[e]).val(t.value())
        }),
        (O.prototype.propertyChanged = function(t) {
          this.setValue(t)
        }),
        (O.prototype.setValueToProperty = function(t, e) {
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
        (O.prototype.destroy = function() {
          this._propFrom &&
            this._propTo &&
            (this._propFrom.listeners().unsubscribe(this, U.prototype.propertyChanged),
            this._propTo.listeners().unsubscribe(this, U.prototype.propertyChanged))
        }),
        inherit(I, U),
        (I.prototype.value = function() {
          var t = []
          return (
            this._control.each(function() {
              var e = $(this)
              e.is(':checked') && t.push(e.attr('value'))
            }),
            t.join(this._separator)
          )
        }),
        (I.prototype.setValue = function(t) {
          var e = t.split(this._separator).filter(Boolean)
          this._control.each(function() {
            var t = $(this),
              i = -1 !== e.indexOf(t.attr('value'))
            t.attr('checked', i), t.parents('label').toggleClass('active', i)
          })
        }),
        (e.PropertyPage = n),
        (e.UppercaseTransformer = a),
        (e.GreateTransformer = s),
        (e.LessTransformer = r),
        (e.ToIntTransformer = l),
        (e.ToFloatTransformer = c),
        (e.ToFloatTransformerWithDynamicDefaultValue = p),
        (e.ToFloatLimitedPrecisionTransformer = u),
        (e.ToAsciiTransformer = d),
        (e.ReplaceEmptyTransformer = h),
        (e.SymbolInfoSymbolTransformer = f),
        (e.SimpleStringBinder = v),
        (e.FloatBinder = g),
        (e.SessionBinder = _),
        (e.BarTimeBinder = m),
        (e.SymbolBinder = y),
        (e.SimpleComboBinder = b),
        (e.StaticContentBinder = T),
        (e.BooleanBinder = C),
        (e.DisabledBinder = w),
        (e.ColorBinding = k),
        (e.SliderBinder = D),
        (e.CheckboxWVBinding = M),
        (e.RangeBinder = O),
        (e.generateLabelElementStr = o)
    }.call(e, i(13)))
  },
  825: function(t, e, i) {
    'use strict'
    function o(t) {
      function e(e, i, o) {
        t.call(this, e, i, o),
          (this._linetool = o),
          (this._templateList = new c(this._linetool._constructor, this.applyTemplate.bind(this)))
      }
      return (
        inherit(e, t),
        (e.prototype.applyTemplate = function(t) {
          this.model().applyLineToolTemplate(this._linetool, t, 'Apply Drawing Template'),
            this.loadData()
        }),
        (e.prototype.createTemplateButton = function(t) {
          var e = this
          return (
            (t = $.extend({}, t, {
              getDataForSaveAs: function() {
                return e._linetool.template()
              },
            })),
            this._templateList.createButton(t)
          )
        }),
        e
      )
    }
    function n(t, e, i) {
      s.call(this, t, e), (this._linetool = i)
    }
    var a = i(823),
      s = a.PropertyPage,
      r = a.ColorBinding,
      l = i(829).addColorPicker,
      c = i(964)
    inherit(n, s),
      (n.prototype.createOneColorForAllLinesWidget = function() {
        var t = $("<td class='colorpicker-cell'>")
        return (
          this.bindControl(
            new r(
              l(t),
              this._linetool.properties().collectibleColors,
              !0,
              this.model(),
              'Change All Lines Color',
              0,
            ),
          ),
          { label: $('<td>' + $.t('Use one color') + '</td>'), editor: t }
        )
      }),
      (n.prototype.addOneColorPropertyWidget = function(t) {
        var e = this.createOneColorForAllLinesWidget(),
          i = $('<tr>')
        i
          .append($('<td>'))
          .append(e.label)
          .append(e.editor),
          i.appendTo(t)
      }),
      (n = o(n)),
      (n.createTemplatesPropertyPage = o),
      (t.exports = n)
  },
  827: function(t, e, i) {
    'use strict'
    function o(t) {
      return t in $.fn
        ? Promise.resolve()
        : (s ||
            (s = new Promise(function(t) {
              i.e(31)
                .then(
                  function(e) {
                    i(831), t()
                  }.bind(null, i),
                )
                .catch(i.oe)
            })),
          s)
    }
    function n(t) {
      return new r(t)
    }
    var a, s, r
    Object.defineProperty(e, '__esModule', { value: !0 }),
      i.d(e, 'LazyJqueryUI', function() {
        return r
      }),
      (e.lazyJqueryUI = n),
      (a = i(14)),
      i.n(a),
      (r = (function() {
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
    function a(t, e) {
      void 0 === e && (e = {})
      var i = $('<span class="tvcolorpicker-container">')
      return (
        null !== t && i.appendTo(t),
        void 0 !== e.addClass && i.addClass(e.addClass),
        $('<div class="tvcolorpicker-transparency">').appendTo(i),
        $('<input class="colorpicker-widget">')
          .tvcolorpicker({
            customColors: n(Object(c.getJSON)('pickerCustomColors', [])),
            direction: e.direction,
            hideTransparency: !!e.hideTransparency,
          })
          .on('change', function() {
            $(this).css('border-color', o($(this).val() || p))
          })
          .bind('customcolorchange', function(t, e) {
            Object(c.setJSON)('pickerCustomColors', e)
          })
          .appendTo(i),
        i
      )
    }
    var s, r, l, c, p
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.addColorPicker = a),
      (s = i(14)),
      i.n(s),
      (r = i(316)),
      i.n(r),
      (l = i(24)),
      i.n(l),
      (c = i(49)),
      i.n(c),
      (p = '#727272')
  },
  836: function(t, e) {
    t.exports =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 8" width="16" height="8"><path d="M0 1.475l7.396 6.04.596.485.593-.49L16 1.39 14.807 0 7.393 6.122 8.58 6.12 1.186.08z"/></svg>'
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
        !Object(p.isInteger)(t) && t > 1 && (t = parseFloat(('' + t).replace(/^.+\./, '0.'))),
        0 < t && t < 1 ? Math.pow(10, o(t)) : 1
      )
    }
    function a(t, e) {
      var i, o, a, s, r, l
      t.trigger('tvticker-beforechange'),
        (i = t.data('TVTicker')),
        (o = i && i.step),
        (a = 0),
        (a = i.parser
          ? i.parser(t.val())
          : Object(p.isInteger)(o)
          ? parseInt(t.val(), 10)
          : parseFloat(t.val())),
        isNaN(a) && (a = 0),
        (s = n(o)),
        (r = Math.max(s, n(a))),
        (l = e(a, r)),
        i.formatter && (l = i.formatter(l)),
        t.val(l),
        t.change()
    }
    function s(t) {
      var e = t.data('TVTicker'),
        i = e && e.step,
        o = e && e.max
      a(t, function(t, e) {
        var n = (Math.round(t * e) + Math.round(i * e)) / e
        return void 0 !== o && null !== o && o < n && (n = t), n
      })
    }
    function r(t) {
      var e = t.data('TVTicker'),
        i = e && e.step,
        o = e && e.min
      a(t, function(t, e) {
        var n = (Math.round(t * e) - Math.round(i * e)) / e
        return void 0 !== o && null !== o && n < o && (n = t), n
      })
    }
    var l, c, p, u
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (l = i(14)),
      i.n(l),
      (c = i(314)),
      i.n(c),
      (p = i(12)),
      i.n(p),
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
              a = $(this),
              l = a.data('TVTicker')
            l ? (n = !0) : (l = { step: +a.data('step') || 1 }),
              'step' in t && (l.step = +t.step || l.step),
              'min' in t && (l.min = t.min),
              'max' in t && (l.max = t.max),
              'formatter' in t && (l.formatter = t.formatter),
              'parser' in t && (l.parser = t.parser),
              a.data('TVTicker', l),
              n ||
                ((e = $('<div class="tv-ticker">').appendTo(a.parent())),
                (i = $('<div class="tv-ticker__btn tv-ticker__btn--up">')
                  .html(u)
                  .appendTo(e)),
                (o = $('<div class="tv-ticker__btn tv-ticker__btn--down">')
                  .html(u)
                  .appendTo(e)),
                e.on('mousedown', function(t) {
                  t.preventDefault(), a.focus()
                }),
                i.click(function() {
                  a.is(':disabled') || s(a)
                }),
                o.click(function() {
                  a.is(':disabled') || r(a)
                }),
                a.keydown(function(t) {
                  a.is(':disabled') ||
                    (38 === t.keyCode
                      ? i.addClass('i-active')
                      : 40 === t.keyCode && o.addClass('i-active'))
                }),
                a.keyup(function(t) {
                  a.is(':disabled') ||
                    (38 === t.keyCode
                      ? (s(a), i.removeClass('i-active'))
                      : 40 === t.keyCode && (r(a), o.removeClass('i-active')))
                }),
                a.mousewheel(function(t, e) {
                  e > 0 ? i.click() : o.click()
                }))
          })
        )
      })
  },
  847: function(t, e, i) {
    'use strict'
    var o,
      n = i(192).ESC,
      a = function(t, e, o) {
        var s,
          r,
          l,
          c,
          p,
          u,
          d = '.popup-menu'
        ;(t = $(t)),
          (o = o || {}),
          (o.activeClass = o.activeClass || ''),
          (s = (o.event || 'click') + d),
          o.hideEvent && (r = o.hideEvent + d),
          (l = function() {}),
          (c = l),
          (p = {}),
          (u = function(s, u, h) {
            function f(e) {
              var i = $(e.target)
                .parents()
                .andSelf()
              i.is(y) ||
                i.is(t) ||
                i.is('.charts-popup-tab-headers, .charts-popup-itemheader') ||
                c()
            }
            function v(t) {
              if (p.preventFirstProcessClick) return void (p.preventFirstProcessClick = !1)
              var e = $(t.target)
                .parents()
                .andSelf()
              e.is('.charts-popup-tab-headers, .charts-popup-itemheader') ||
                (o.notCloseOnButtons && e.is('.icon-delete')) ||
                c()
            }
            function g(t) {
              t.keyCode === n && c()
            }
            function _(e, n, s) {
              var r, l, c, p, u, d, h, f, v, g, m, b, T, C, w, x
              if (e instanceof a.TabGroup) {
                if (!e.tabs || !e.tabs.length) return
                return 1 !== e.tabs.length || e.tabs[0].title
                  ? ((r = $('<div class="charts-popup-tab-group"></div>').appendTo(s)),
                    (l = $('<div class="charts-popup-tab-headers"></div>').appendTo(r)),
                    (c = null),
                    void $.each(e.tabs || [], function(t, i) {
                      var o, n
                      i.items &&
                        i.items.length &&
                        ((o = $('<div class="charts-popup-tab"></div>')
                          .hide()
                          .appendTo(r)),
                        $.each(i.items, function() {
                          _(this, void 0, o)
                        }),
                        (n = $('<span class="charts-popup-tab-header">')
                          .append(
                            $(
                              '<a href="javascript://" class="charts-popup-tab-header-label">',
                            ).text(i.name),
                          )
                          .appendTo(l)),
                        n.on('click', function(t) {
                          n.is('.active') ||
                            (l.find('.charts-popup-tab-header.active').removeClass('active'),
                            n.addClass('active'),
                            r.find('.charts-popup-tab').hide(),
                            o.show(),
                            t && t.preventDefault(),
                            'function' == typeof e.onChange && e.onChange.call(e, i.name))
                        }),
                        (c && !i.active) ||
                          ((c = n),
                          l.find('.charts-popup-tab-header.active').removeClass('active'),
                          n.addClass('active'),
                          r.find('.charts-popup-tab').hide(),
                          o.show()))
                    }))
                  : void $.each(e.tabs[0].items, function() {
                      _(this, void 0, s)
                    })
              }
              return e instanceof a.Group
                ? ((p = $('<div class="charts-popup-group"></div>').appendTo(s)),
                  e.title &&
                    ((u = $('<div class="charts-popup-itemheader"></div>')
                      .text(e.title)
                      .prepend($('<span class="charts-popup-itemheader-icon"></span>'))),
                    e.collapsible &&
                      (p.addClass('charts-popup-group-collapsible'),
                      p.toggleClass('collapsed', e.collapsed),
                      u.on('click', function() {
                        p.toggleClass('collapsed'),
                          'function' == typeof e.onChange && e.onChange(p.hasClass('collapsed')),
                          y.height() === parseInt(y.css('max-height'))
                            ? y.addClass('popup-menu-scroll-y')
                            : y.height() < parseInt(y.css('max-height')) &&
                              y.removeClass('popup-menu-scroll-y')
                      })),
                    p.append(u)),
                  void $.each(e.items, function(t) {
                    _(this, 1, p)
                  }))
                : e instanceof a.Header
                ? void s.append($('<div class="charts-popup-itemheader"></div>').text(e.title))
                : e.separator
                ? ((d = $('<span class="separator"></span>')), void s.append(d))
                : ((d = $('<a class="item">')),
                  e.url && d.attr('href', e.url),
                  e.target && d.attr('target', e.target),
                  n || d.addClass('first'),
                  'function' == typeof e.active
                    ? e.active(e) && d.addClass('active')
                    : e.active && d.addClass('active'),
                  e.addClass && d.addClass(e.addClass),
                  e.addData && d.data(e.addData),
                  e.disabled && d.addClass('disabled'),
                  'function' == typeof e.action &&
                    ((h = e.action),
                    (f = function(t) {
                      $(t.target)
                        .parents()
                        .andSelf()
                        .is(C) ||
                        (h.apply(d, arguments),
                        !e.url && t && 'function' == typeof t.preventDefault && t.preventDefault())
                    }),
                    o.upAction ? d.bind('mouseup', f) : d.bind('click', f)),
                  e.date
                    ? ((v = $('<span class="title"></span>').appendTo(d)),
                      $('<span class="date"></span>')
                        .text(e.date || '')
                        .appendTo(d))
                    : e.icon && !o.svg
                    ? ((g = $('<span class="icon"></span>').appendTo(d)),
                      g.css('background-image', e.icon.image || ''),
                      e.icon.offset &&
                        g.css(
                          'background-position',
                          'string' == typeof e.icon.offset
                            ? e.icon.offset
                            : e.icon.offset.x + 'px ' + e.icon.offset.y + 'px',
                        ),
                      (v = $('<span class="title"></span>').appendTo(d)))
                    : !0 === o.svg && e.svg
                    ? (o.wrapIcon
                        ? d.append(
                            $('<span class="icon-wrap">')
                              .addClass(e.iconClass)
                              .append(e.svg),
                          )
                        : d.append(e.svg),
                      (v = $('<span class="title"></span>').appendTo(d)))
                    : e.iconClass
                    ? (d.append($('<span class="icon"></span>').addClass(e.iconClass)),
                      (v = $('<span class="title"></span>').appendTo(d)))
                    : (v = $('<span class="title-expanded"></span>').appendTo(d)),
                  e.html ? v.html(e.html) : v.text(TradingView.clean(e.title, !0) || ''),
                  (m = $('<span class="shortcut"></span>').appendTo(d)),
                  e.shortcut && m.text(e.shortcut.keys),
                  'function' == typeof e.deleteAction &&
                    ((b = e.deleteAction),
                    (T = e.deleteAction.title || $.t('Delete')),
                    (C = $('<span class="icon-delete">')),
                    C.html(i(828)),
                    C.attr('title', T),
                    C.on('click', function(t) {
                      b.apply(d, arguments), t.preventDefault()
                    }),
                    d.append(C)),
                  e.buttons instanceof Array &&
                    e.buttons.length &&
                    e.buttons.forEach(function(t) {
                      t.el instanceof $ || (t.el = $(t.el)),
                        t.el.appendTo(d),
                        t.handler &&
                          t.el.on('click', function(e) {
                            t.handler.apply(d, arguments)
                          })
                    }),
                  void 0 !== e.counter &&
                    ('function' == typeof e.counter
                      ? ((w = $('<span class="counter"></span>').html(e.counter())), w.appendTo(d))
                      : ((x = e.counterBlue ? 'blue' : ''),
                        $('<span class="counter"></span>')
                          .text(e.counter + '')
                          .addClass(x)
                          .appendTo(d))),
                  s.append(d),
                  void t.data('popup-menu', s))
            }
            var m,
              y,
              b,
              T,
              C,
              w,
              x,
              k,
              D,
              P,
              S,
              M,
              O,
              I,
              V,
              E,
              N,
              A,
              F,
              B,
              z,
              L,
              R,
              H,
              j,
              U,
              W = s.target.ownerDocument,
              G = W.defaultView,
              q = u || e
            if (
              ('function' == typeof q && (q = q()),
              $(this).hasClass('open') || $(this).hasClass('active'))
            )
              return s.preventDefault(), c(), void (m = p.scrollTop)
            switch (
              ((c = function() {
                ;(p.scrollTop = y.scrollTop()),
                  y.remove(),
                  t.removeClass('active open ' + o.activeClass),
                  t.data('popup-menu', null),
                  $(W).off('click', v),
                  $(W).off('mousedown', f),
                  Modernizr.touch && $(W).off('touchstart.chartgui', f),
                  $(W).off('selectstart.' + d),
                  W.removeEventListener('keydown', g, !1),
                  (c = l),
                  o.onRemove && o.onRemove()
              }),
              t.addClass('active open ' + o.activeClass),
              (y = $('<div class="charts-popup-list">')),
              o.addClass && y.addClass(o.addClass),
              o.zIndex && y.css('z-index', o.zIndex),
              (b = y),
              o.listInner && (b = $('<div class="list-inner">').appendTo(b)),
              o.listTable && (b = $('<div class="list-table">').appendTo(b)),
              $.each(q, function(t) {
                _(this, t, b)
              }),
              r || (p.preventFirstProcessClick = !0),
              $(W).on('click', v),
              $(W).on('mousedown', f),
              W.addEventListener('keydown', g, !1),
              Modernizr.touch && $(W).on('touchstart.chartgui', f),
              o.upAction &&
                $(W).on('selectstart.popup-menu', function() {
                  return !1
                }),
              y.appendTo(W.body),
              (T = $(G).width()),
              (C = Math.min($(G).height(), $('body').height())),
              (w = t.outerWidth()),
              (x = t.outerHeight()),
              (k = t.offset()),
              (m = $(G).scrollTop() || 0),
              (k.top -= m),
              (k.top = Math.round(k.top)),
              (k.left = Math.round(k.left)),
              (D = y.outerWidth()),
              (P = y.outerHeight()),
              (S = void 0 !== o.viewportSpacing ? o.viewportSpacing : 10),
              (M = o.popupSpacing ? ~~o.popupSpacing : 1),
              (O = o.popupDrift ? ~~o.popupDrift : 0),
              (I = P - y.height()),
              (V = 'down'),
              o.direction && (V = 'function' == typeof o.direction ? o.direction() : o.direction),
              (E = !!o.reverse),
              'down' === V
                ? ((N = C - k.top - x - M - S - I),
                  (A = k.top - M - S - I),
                  N < Math.max(P || 0, 100) && A > N && (V = 'up'))
                : 'right' === V &&
                  ((F = T - k.left - w - M - S - I),
                  (B = k.left - M - S - I),
                  F < Math.max(D || 0, 100) && B > F && (V = 'left')),
              V)
            ) {
              case 'down':
              case 'up':
                'down' === V
                  ? y.css('top', k.top + x + M + 'px')
                  : y.css('bottom', C - k.top + M + 'px').css('top', 'auto'),
                  E
                    ? y.css('left', Math.max(k.left + O + w - D, S) + 'px').css('right', 'auto')
                    : y.css('left', k.left + O + 'px').css('right', 'auto')
                break
              case 'right':
              case 'left':
                ;(M = Math.max(M, 4)),
                  'right' === V
                    ? y.css('left', Math.floor(k.left + w + M) + 'px').css('right', 'auto')
                    : y
                        .css('left', Math.floor(Math.max(k.left - D - M, S)) + 'px')
                        .css('right', 'auto'),
                  E
                    ? y.css('top', Math.floor(Math.max(k.top + O + x - P, S)) + 'px')
                    : y.css('top', Math.floor(k.top + O) + 'px')
            }
            for (
              y.show(),
                z = k.top,
                'up' === V || ({ left: 1, right: 1 }[V] && E)
                  ? 'up' !== V
                    ? (z += x)
                    : (z -= x + M + I + S)
                  : (z = C - z - x - 2 * M - I),
                y.height() > z && y.addClass('popup-menu-scroll-y'),
                y.css('max-height', z + 'px'),
                o.careRightBorder &&
                  ((L = T + $(G).scrollLeft()),
                  parseInt(y.css('left')) + y.width() + S > L &&
                    y.css('left', L - y.width() - S + 'px').css('right', 'auto')),
                o.careBottomBorder &&
                  parseInt(y.css('top')) + y.height() + S > C + m &&
                  y.css('top', C - y.height() - S + m + 'px'),
                H = t.parents().andSelf(),
                j = H.size();
              j--;

            )
              if ('fixed' === H.eq(j).css('position')) {
                R = H.eq(j)
                break
              }
            R &&
              ((U = y.offset()),
              y.css({ position: 'fixed', left: U.left - $(W).scrollLeft(), right: 'auto' })),
              y[0].scrollHeight > y.height() && y.addClass('popup-with-scroll'),
              s && s.preventDefault()
          }),
          s && t.bind(s, u),
          r &&
            t.bind(r, function() {
              c()
            }),
          o.runOpened && u()
      }
    ;(a.TabGroup = function t(e) {
      if (!(this instanceof t)) return new t(e)
      ;(e = e || {}),
        (this.tabs = []),
        'function' == typeof e.onChange && (this.onChange = e.onChange)
    }),
      (a.TabGroup.prototype.appendTab = function(t, e, i) {
        if ((null == t ? (t = '') : (t += ''), e || (e = []), i || (i = {}), !Array.isArray(e)))
          throw new TypeError('items must be an array')
        return this.tabs.push({ name: t, items: e, active: !!i.active }), e
      }),
      (a.Header = function t(e) {
        if (!(this instanceof t)) return new t(e)
        this.title = e
      }),
      (a.Group = function t(e) {
        if (!(this instanceof t)) return new t(e)
        ;(e = e || {}),
          (this.items = []),
          (this.title = null == e.title ? '' : e.title + ''),
          (this.collapsible = !!e.collapsible),
          (this.collapsed = !!e.collapsed),
          'function' == typeof e.onChange && (this.onChange = e.onChange)
      }),
      (a.Group.prototype.push = function() {
        this.items.push.apply(this.items, arguments)
      }),
      (e.bindPopupMenu = a),
      (o = function(t) {
        ;(t = $(t)), t.unbind('.popup-menu'), t.removeData('popup-menu')
      }),
      (e.unbindPopupMenu = o)
  },
  850: function(t, e, i) {
    var o, n, a
    !(function(s) {
      ;(n = [i(14), i(80)]),
        (o = s),
        void 0 !== (a = 'function' == typeof o ? o.apply(e, n) : o) && (t.exports = a)
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
    var o, n, a
    !(function(s) {
      ;(n = [i(14), i(310), i(850), i(80), i(191)]),
        (o = s),
        void 0 !== (a = 'function' == typeof o ? o.apply(e, n) : o) && (t.exports = a)
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
            a = []
          for (
            i = (o.values && o.values.length) || 1,
              n.length > i && (n.slice(i).remove(), (n = n.slice(0, i))),
              e = n.length;
            e < i;
            e++
          )
            a.push("<span tabindex='0'></span>")
          ;(this.handles = n.add(t(a.join('')).appendTo(this.element))),
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
            a,
            s,
            r,
            l,
            c = this,
            p = this.options
          return (
            !p.disabled &&
            ((this.elementSize = {
              width: this.element.outerWidth(),
              height: this.element.outerHeight(),
            }),
            (this.elementOffset = this.element.offset()),
            (i = { x: e.pageX, y: e.pageY }),
            (o = this._normValueFromMouse(i)),
            (n = this._valueMax() - this._valueMin() + 1),
            this.handles.each(function(e) {
              var i = Math.abs(o - c.values(e))
              ;(n > i || (n === i && (e === c._lastChangedValue || c.values(e) === p.min))) &&
                ((n = i), (a = t(this)), (s = e))
            }),
            !1 !== this._start(e, s) &&
              ((this._mouseSliding = !0),
              (this._handleIndex = s),
              this._addClass(a, null, 'ui-state-active'),
              a.trigger('focus'),
              (r = a.offset()),
              (l = !t(e.target)
                .parents()
                .addBack()
                .is('.ui-slider-handle')),
              (this._clickOffset = l
                ? { left: 0, top: 0 }
                : {
                    left: e.pageX - r.left - a.width() / 2,
                    top:
                      e.pageY -
                      r.top -
                      a.height() / 2 -
                      (parseInt(a.css('borderTopWidth'), 10) || 0) -
                      (parseInt(a.css('borderBottomWidth'), 10) || 0) +
                      (parseInt(a.css('marginTop'), 10) || 0),
                  }),
              this.handles.hasClass('ui-state-hover') || this._slide(e, s, o),
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
          var e, i, o, n, a
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
            (a = this._valueMin() + o * n),
            this._trimAlignValue(a)
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
            a = this.values()
          this._hasMultipleValues() &&
            ((o = this.values(e ? 0 : 1)),
            (n = this.values(e)),
            2 === this.options.values.length &&
              !0 === this.options.range &&
              (i = 0 === e ? Math.min(o, i) : Math.max(o, i)),
            (a[e] = i)),
            i !== n &&
              !1 !== this._trigger('slide', t, this._uiHash(e, i, a)) &&
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
          var o, n, a
          if (arguments.length > 1)
            return (
              (this.options.values[e] = this._trimAlignValue(i)),
              this._refreshValue(),
              void this._change(null, e)
            )
          if (!arguments.length) return this._values()
          if (!t.isArray(arguments[0]))
            return this._hasMultipleValues() ? this._values(e) : this.value()
          for (o = this.options.values, n = arguments[0], a = 0; a < o.length; a += 1)
            (o[a] = this._trimAlignValue(n[a])), this._change(null, a)
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
            a,
            s = this.options.range,
            r = this.options,
            l = this,
            c = !this._animateOff && r.animate,
            p = {}
          this._hasMultipleValues()
            ? this.handles.each(function(o) {
                ;(i = ((l.values(o) - l._valueMin()) / (l._valueMax() - l._valueMin())) * 100),
                  (p['horizontal' === l.orientation ? 'left' : 'bottom'] = i + '%'),
                  t(this)
                    .stop(1, 1)
                    [c ? 'animate' : 'css'](p, r.animate),
                  !0 === l.options.range &&
                    ('horizontal' === l.orientation
                      ? (0 === o &&
                          l.range.stop(1, 1)[c ? 'animate' : 'css']({ left: i + '%' }, r.animate),
                        1 === o &&
                          l.range[c ? 'animate' : 'css'](
                            { width: i - e + '%' },
                            { queue: !1, duration: r.animate },
                          ))
                      : (0 === o &&
                          l.range.stop(1, 1)[c ? 'animate' : 'css']({ bottom: i + '%' }, r.animate),
                        1 === o &&
                          l.range[c ? 'animate' : 'css'](
                            { height: i - e + '%' },
                            { queue: !1, duration: r.animate },
                          ))),
                  (e = i)
              })
            : ((o = this.value()),
              (n = this._valueMin()),
              (a = this._valueMax()),
              (i = a !== n ? ((o - n) / (a - n)) * 100 : 0),
              (p['horizontal' === this.orientation ? 'left' : 'bottom'] = i + '%'),
              this.handle.stop(1, 1)[c ? 'animate' : 'css'](p, r.animate),
              'min' === s &&
                'horizontal' === this.orientation &&
                this.range.stop(1, 1)[c ? 'animate' : 'css']({ width: i + '%' }, r.animate),
              'max' === s &&
                'horizontal' === this.orientation &&
                this.range.stop(1, 1)[c ? 'animate' : 'css']({ width: 100 - i + '%' }, r.animate),
              'min' === s &&
                'vertical' === this.orientation &&
                this.range.stop(1, 1)[c ? 'animate' : 'css']({ height: i + '%' }, r.animate),
              'max' === s &&
                'vertical' === this.orientation &&
                this.range.stop(1, 1)[c ? 'animate' : 'css']({ height: 100 - i + '%' }, r.animate))
        },
        _handleEvents: {
          keydown: function(e) {
            var i,
              o,
              n,
              a = t(e.target).data('ui-slider-handle-index')
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
                    !1 === this._start(e, a)))
                )
                  return
            }
            switch (
              ((n = this.options.step),
              (i = o = this._hasMultipleValues() ? this.values(a) : this.value()),
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
            this._slide(e, a, o)
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
  874: function(t, e, i) {
    'use strict'
    var o, n, a
    Object.defineProperty(e, '__esModule', { value: !0 }),
      i.d(e, 'TabPriority', function() {
        return o
      }),
      i.d(e, 'TabNames', function() {
        return n
      }),
      i.d(e, 'TabOpenFrom', function() {
        return a
      }),
      (function(t) {
        ;(t[(t.Coordinates = 100)] = 'Coordinates'),
          (t[(t.Display = 100)] = 'Display'),
          (t[(t.Style = 200)] = 'Style'),
          (t[(t.Inputs = 300)] = 'Inputs'),
          (t[(t.Properties = 250)] = 'Properties')
      })(o || (o = {})),
      (function(t) {
        ;(t.background = 'Background'),
          (t.coordinates = 'Coordinates'),
          (t.drawings = 'Drawings'),
          (t.events = 'Events'),
          (t.eventsAndAlerts = 'Events & Alerts'),
          (t.inputs = 'Inputs'),
          (t.properties = 'Properties'),
          (t.scales = 'Scales'),
          (t.sourceCode = 'Source Code'),
          (t.style = 'Style'),
          (t.timezoneSessions = 'Timezone/Sessions'),
          (t.trading = 'Trading'),
          (t.visibility = 'Visibility')
      })(n || (n = {})),
      (function(t) {
        ;(t[(t.Default = 100)] = 'Default'),
          (t[(t.UserSave = 200)] = 'UserSave'),
          (t[(t.Override = 300)] = 'Override')
      })(a || (a = {}))
  },
  883: function(t, e, i) {
    'use strict'
    ;(function(e, o) {
      var n,
        a = i(50).max,
        s = i(827).lazyJqueryUI
      i(845),
        (n = {
          modalDialog: null,
          dialogs: [],
          NOTIFICATION_ANIMATION_START_OFFSET: '-33px',
          _constrainDraggableOptionsIfNeeded: function(t) {
            return e.enabled('constraint_dialogs_movement') && (t.containment = '.chart-page'), t
          },
          showNotice: function(t, e, i) {
            var a, s, r, l, c, p
            return (
              'object' == typeof e && ((i = e), (e = '')),
              (i = i || {}),
              (a = i.doNotCloseOnBgClick || !1),
              (s = i.html || ''),
              (r = i.width || '400px'),
              (l = {}),
              (l.noClose = i.noClose || null),
              (l.addClass = i.modalDialogClass || null),
              n.createModalDialog(t, l),
              (c = i.centerCaption ? 'caption-big-center' : 'caption-big'),
              n.modalDialog.find('._tv-dialog').css('width', r),
              (p = i.customButtonCaption ? i.customButtonCaption : $.t('OK')),
              n.modalDialog
                .find('._tv-dialog-content')
                .html(
                  o.render(
                    '<div class="main"><div class="{{captionClassName}} {{classSuffix}}">{{text}}' +
                      s +
                      '</div>{{^removeOkButton}}<div class="buttons"><input type="button" class="_tv-button ok" value="' +
                      p +
                      '"/></div>{{/removeOkButton}}</div>',
                    {
                      captionClassName: c,
                      classSuffix: i.classSuffix || '',
                      text: e,
                      removeOkButton: i && i.removeOkButton,
                    },
                  ),
                ),
              n.modalDialog.find('._tv-button.ok').on('click', function() {
                n.destroy(), i.onOkButtonClick && i.onOkButtonClick()
              }),
              n.positionDialog(),
              n.applyHandlers(!1, { doNotCloseOnBgClickIfShadowbox: a, beforeDestroy: i.onClose }),
              n.modalDialog
            )
          },
          showCustomDialog: function(t) {
            function e(t) {
              n.destroy(), t.preventDefault()
            }
            return (
              n.createModalDialog(t.title || $.t('Dialog'), { addClass: '' }),
              n.modalDialog.find('._tv-dialog').css('width', t.width || '400px'),
              n.modalDialog
                .find('._tv-dialog-content')
                .html('<div class="main">' + (t.html || $.t('Content')) + '</div>'),
              n.modalDialog.find('.ok').click(e),
              n.modalDialog.find('form').submit(e),
              n.modalDialog.find('.cancel').click(e),
              n.modalDialog.find('._tv-dialog-title-close').click(e),
              n.positionDialog(),
              n.applyHandlers(),
              n.modalDialog
            )
          },
          createModalDialog: function(t, e) {
            var i, o
            return (
              (e = e || {}),
              null !== n.modalDialog && n.destroy(),
              (n.modalDialog = $(
                '<div class="_tv-dialog-shadowbox"><div class="_tv-dialog _tv-dialog-modal' +
                  (e.addClass ? ' ' + e.addClass : '') +
                  '">' +
                  (e.noHeader
                    ? ''
                    : '<div class="_tv-dialog-title">' +
                      (e.noClose ? '' : '<a class="_tv-dialog-title-close"></a>') +
                      '<span class="_tv-dialog-title-text">' +
                      t +
                      '</span></div>') +
                  '<div class="_tv-dialog-error"><span class="message"></span></div><div class="_tv-dialog-message"><span class="message"></span></div><div class="_tv-dialog-content"></div></div></div>',
              )
                .appendTo($('body'))
                .data('title', t)),
              n._addMessageCloseButton(n.modalDialog.find('._tv-dialog-error')),
              n._addMessageCloseButton(n.modalDialog.find('._tv-dialog-message')),
              e.noShadowBox && n.modalDialog.addClass('transparent'),
              e.addClass && n.modalDialog.addClass(e.addClass),
              e.width && n.modalDialog.find('._tv-dialog').css({ width: e.width }),
              e.content && n.modalDialog.find('._tv-dialog-content').html(e.content),
              (i = $('.fancybox-overlay')),
              i.length &&
                ((o = i.css('z-index')), $('._tv-dialog-shadowbox').css('z-index', o + 1)),
              e.draggable &&
                s(n.modalDialog).draggable(
                  n._constrainDraggableOptionsIfNeeded({
                    handle: n.modalDialog.find('._tv-dialog-title'),
                  }),
                ),
              e.zIndex && n.modalDialog.css('z-index', e.zIndex),
              n.modalDialog
            )
          },
          _addMessageCloseButton: function(t) {
            var e = $(i(884)).attr({ class: 'close', title: $.t('Close message') })
            t.append(e),
              $(e).on('click', function() {
                t.animate(
                  { marginTop: n.NOTIFICATION_ANIMATION_START_OFFSET, opacity: 0 },
                  'fast',
                  function() {
                    t.hide()
                  },
                )
              })
          },
          createDialog: function(t, e) {
            var i, r, l, c
            return n.isOpen(t)
              ? ((i = n.get(t)), i.find('._tv-dialog-content').html(''), i.data('new', !1), i)
              : ((e = e || {}),
                (r = e.ownerDocument || document),
                (i = $(
                  o.render(
                    '<div class="_tv-dialog _tv-dialog-nonmodal {{&addClass}}"><div class="_tv-dialog-title{{#hideTitle}} _tv-dialog-title-hidden{{/hideTitle}}{{#hideCloseCross}} _tv-dialog-title-no-close{{/hideCloseCross}}">{{^hideTitle}} {{&title}}{{/hideTitle}}{{^hideCloseCross}}<a class="_tv-dialog-title-close"></a>{{/hideCloseCross}}</div><div class="_tv-dialog-error"><span class="message"></span></div><div class="_tv-dialog-message"><span class="message"></span></div><div class="_tv-dialog-content"></div></div>',
                    {
                      addClass: e.addClass || '',
                      hideTitle: e.hideTitle,
                      hideCloseCross: e.hideCloseCross,
                      title: t,
                    },
                  ),
                  r,
                ).appendTo(r.body)),
                n._addMessageCloseButton(i.find('._tv-dialog-error')),
                n._addMessageCloseButton(i.find('._tv-dialog-message')),
                e.width && i.css({ width: e.width }),
                e.content && i.find('._tv-dialog-content').html(e.content),
                (l = 0),
                (l = e.zIndex
                  ? e.zIndex
                  : n.dialogs && n.dialogs.length
                  ? a(
                      $.map(n.dialogs, function(t) {
                        return parseInt((t.dialog || t).css('z-index'), 10)
                      }),
                    ) + 1
                  : 110),
                i.css('z-index', l),
                i.data('new', !0),
                i.data('title', t),
                i.data('id', n.dialogs.length + 1),
                n.dialogs.push({ title: t, dialog: i, id: n.dialogs.length + 1 }),
                (c = {
                  start: function(t, e) {
                    var i,
                      o,
                      a = e.helper.css('z-index'),
                      s = 0,
                      r = null
                    for (i = 0; i < n.dialogs.length; i++)
                      (o = n.dialogs[i].dialog.css('z-index')) > s &&
                        ((s = o), (r = n.dialogs[i].dialog))
                    e.helper.css('z-index', s), r.css('z-index', a)
                  },
                }),
                e.dragHandle
                  ? (c.handle = e.dragHandle)
                  : e.hideTitle || (c.handle = '._tv-dialog-title'),
                e.dragOptions && $.extend(c, e.dragOptions),
                s(i).draggable(n._constrainDraggableOptionsIfNeeded(c)),
                i)
          },
          positionDialog: function(t, e, i) {
            function o() {
              a.css('margin-left', -Math.round(a.outerWidth() / 2) + 'px'),
                a.css('margin-top', -Math.round(a.outerHeight() / 2) + 'px')
            }
            var a, s, r, l, c, p, u, d, h, f
            ;(i = i || {}),
              (e = e || i.position),
              t
                ? ((s = t.prop('ownerDocument')),
                  (r = s.defaultView),
                  (l = t.width()),
                  (c = t.height()),
                  (p = $(r).width()),
                  (u = $(r).height()),
                  e && e.top && e.left
                    ? ((h = i.forcePosition
                        ? e.left
                        : Math.max(2, Math.min(p - l - 4, e.left)) + 'px'),
                      (d = i.forcePosition
                        ? e.top
                        : Math.max(2, Math.min(u - c - 4, e.top)) + 'px'))
                    : e && e.considerScroll
                    ? ((f = $(s)),
                      (h = Math.round((p - l) / 2 + f.scrollLeft()) + 'px'),
                      (d = Math.round((u - c) / 2 + f.scrollTop()) + 'px'))
                    : ((h = Math.round((p - l) / 2) + 'px'), (d = Math.round((u - c) / 2) + 'px')),
                  i.fadeIn
                    ? t
                        .css({ left: h, top: d })
                        .hide()
                        .fadeIn('fast')
                    : i.smooth
                    ? t.animate({ left: h, top: d })
                    : t.css({ left: h, top: d }))
                : ((t = n.modalDialog), (a = t.find('._tv-dialog')), o(), a.resize(o))
          },
          applyHandlers: function(t, e) {
            var i,
              o,
              a,
              s = !t || t === this.modalDialog
            ;(e = e || {}),
              (i = s
                ? function() {
                    n.destroy()
                  }
                : function() {
                    n.destroy(t.data('title'))
                  }),
              (t = t || n.modalDialog.find('._tv-dialog')),
              (o = t.prop('ownerDocument')),
              e.beforeDestroy && t.on('destroy', e.beforeDestroy),
              t
                .find('._tv-dialog-title ._tv-dialog-title-close, .js-dialog-close')
                .on('click', function(t) {
                  e.closeHandler && 'function' == typeof e.closeHandler ? e.closeHandler(t) : i()
                }),
              e.doNotCloseOnBgClick ||
                setTimeout(function() {
                  $(o).on('mousedown.closeDialog', function(n) {
                    var a = $(n.target)
                      .parents()
                      .andSelf()
                    a.is(t) ||
                      (e.doNotCloseOnBgClickIfShadowbox &&
                        a.is('._tv-dialog-shadowbox, .tv-dialog__modal-wrap')) ||
                      a.is(
                        '.colorpicker, .charts-popup-list, ._tv-dialog, .tvcolorpicker-popup, .symbol-edit-popup, .ui-datepicker, .clockpicker-popover, .pac-container',
                      ) ||
                      ($(o).off('mousedown.closeDialog'), i())
                  })
                }, 0),
              t.find('input[type="checkbox"]').change(function() {
                var t = $(this)
                t.next('._tv-dialog-checkbox-mask')
                  .toggleClass('disabled', t.prop('disabled'))
                  .toggleClass('_tv-dialog-checkbox-mask-active', t.is(':checked'))
              }),
              (a = t
                .find('input[type="text"]')
                .focus(function() {
                  $(this).addClass('_tv-dialog-content-textactive')
                })
                .blur(function() {
                  $(this).removeClass('_tv-dialog-content-textactive')
                })
                .first()),
              Modernizr.touch || e.notFocusFirst || a.focus(),
              t
                .find('input[type="password"]')
                .focus(function() {
                  $(this).addClass('_tv-dialog-content-textactive')
                })
                .blur(function() {
                  $(this).removeClass('_tv-dialog-content-textactive')
                }),
              t
                .find('textarea')
                .focus(function() {
                  $(this).addClass('_tv-dialog-content-textareaactive')
                })
                .blur(function() {
                  $(this).removeClass('_tv-dialog-content-textareaactive')
                }),
              t.find('._tv-dialog-checkbox-mask').click(function() {
                var t = $(this).prev()
                t.prop('disabled') || (t.prop('checked', !t[0].checked), t.change())
              }),
              e.doNotCloseOnEsc ||
                $(o).bind('keyup.hideDialog', function(e) {
                  if (27 === e.keyCode) return t ? n.destroy(t.data('title')) : n.destroy(), !1
                }),
              e.processEnterButton &&
                $(o).bind('keyup.confirmAndCloseDialog', function(t) {
                  13 === t.keyCode &&
                    'textarea' !== t.target.tagName.toLowerCase() &&
                    (e.processEnterButton.click(), $(o).unbind('keyup.confirmAndCloseDialog'))
                })
          },
          showError: function(t, e, i) {
            n.showMessage(t, e, $.extend(i || {}, { isError: !0 }))
          },
          showMessage: function(t, e, i) {
            var o, a, s
            e || (e = $('._tv-dialog')),
              (i = i || {}),
              (o = (i.isError && '_tv-dialog-error') || '_tv-dialog-message'),
              (a = e.find('.' + o)),
              (s = a.find('.message')),
              i.html ? s.html('string' == typeof i.html ? i.html : t) : s.text(t),
              s.css('width', e.width()).toggleClass('selectable', !!i.selectable),
              a
                .toggleClass('with-close', !!i.withClose)
                .css({ marginTop: n.NOTIFICATION_ANIMATION_START_OFFSET, opacity: '0' })
                .show()
                .animate({ marginTop: 0, opacity: 1 }, 'fast'),
              i.withClose ||
                (i.hideWithoutAnimation
                  ? a.on('touchstartoutside mousedownoutside keydownoutside', function t() {
                      a.hide(), a.off('touchstartoutside mousedownoutside keydownoutside', t)
                    })
                  : a.on('touchstartoutside mousedownoutside keydownoutside', function t() {
                      a.animate(
                        { marginTop: n.NOTIFICATION_ANIMATION_START_OFFSET, opacity: 0 },
                        'fast',
                        function() {
                          a.hide()
                        },
                      ),
                        a.off('touchstartoutside mousedownoutside keydownoutside', t)
                    }))
          },
          isOpen: function(t) {
            for (var e = 0; e < n.dialogs.length; e++) if (n.dialogs[e].title === t) return !0
            return !1
          },
          get: function(t) {
            for (var e = 0; e < n.dialogs.length; e++)
              if (n.dialogs[e].title === t) return n.dialogs[e].dialog
          },
          destroy: function(t, e) {
            var i,
              o = null
            if (t && 'string' == typeof t)
              for (i = 0; i < n.dialogs.length; i++)
                n.dialogs[i].title === t &&
                  ((o = n.dialogs[i].dialog.prop('ownerDocument')),
                  n.dialogs[i].dialog.find('.apply-common-tooltip').mouseout(),
                  n.dialogs[i].dialog.trigger('destroy', e),
                  $(document).unbind('mouseup.hideDialog' + n.dialogs[i].id),
                  $('input', n.dialogs[i].dialog).blur(),
                  n.dialogs[i].dialog.remove(),
                  n.dialogs.splice(i, 1))
            else
              n.modalDialog &&
                ((o = n.modalDialog.prop('ownerDocument')),
                n.modalDialog.find('.apply-common-tooltip').mouseout(),
                n.modalDialog.find('._tv-dialog').trigger('destroy'),
                n.modalDialog.remove(),
                (n.modalDialog = null))
            $(o).unbind('keyup.hideDialog'), $(o).unbind('keyup.confirmAndCloseDialog')
          },
          resizeContent: function(t, e, i) {
            var o, n
            null == i && (i = 20),
              (t += i),
              (o = parseInt($('body').height(), 10)),
              (n = e.height()),
              t > o && ((n -= t - o), (n = Math.max(0, n)), e.height(n))
          },
        }),
        (t.exports.TVOldDialogs = n)
    }.call(e, i(5), i(126)))
  },
  884: function(t, e) {
    t.exports =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 9" width="9px" height="9px"><path d="M2 1L1 2l2.5 2.5L1 7l1 1 2.5-2.5L7 8l1-1-2.5-2.5L8 2 7 1 4.5 3.5z"/></svg>'
  },
  964: function(t, e, i) {
    'use strict'
    ;(function(e) {
      function o(t, i, o) {
        var n = { saveAsText: $.t('Save As...'), applyDefaultText: $.t('Apply Defaults') }
        ;(this._toolName = t),
          (this._applyTemplate = i),
          (this._options = $.extend(n, o || {})),
          (this._list = []),
          e.enabled('charting_library_base') || (this.templatesDeferred = this.loadData())
      }
      var n = i(847).bindPopupMenu,
        a = i(196),
        s = a.SaveRenameDialog,
        r = a.InputField,
        l = i(82).createConfirmDialog,
        c = i(4).getLogger('Chart.LineToolTemplatesList')
      ;(o._cache = {}),
        (o.prototype.getData = function() {
          return this._list
        }),
        (o.prototype.loadData = function() {
          var t = this
          return this._toolName in o._cache
            ? ((this._list = o._cache[this._toolName]), $.Deferred().resolve())
            : $.get('/drawing-templates/' + this._toolName + '/', function(e) {
                ;(t._list = e), (o._cache[t._toolName] = e)
              }).error(function() {
                c.logWarn('Failed to load drawing template: ' + t._toolName)
              })
        }),
        (o.prototype.templatesLoaded = function() {
          return this.templatesDeferred
        }),
        (o.prototype.invalidateToolCache = function() {
          delete o._cache[this._toolName]
        }),
        (o.prototype.createButton = function(t) {
          var e,
            i = this
          return (
            (t = $.extend({}, t, i._options)),
            (e = $('<a></span></a>')
              .addClass(t.buttonClass ? t.buttonClass : '_tv-button')
              .html(
                t.buttonInner ? t.buttonInner : $.t('Template') + '<span class="icon-dropdown">',
              )),
            n(e, null, {
              event: 'button-popup',
              hideEvent: 'hide-popup',
              zIndex: t.popupZIndex,
              activeClass: t.popupActiveClass,
              direction: t.popupDirection,
            }),
            e.bind('click', function(e) {
              var o, n, a
              e.stopPropagation(),
                $(this).is('active') ||
                  ((o = []),
                  'function' == typeof t.getDataForSaveAs &&
                    ((n = function(e) {
                      var o = JSON.stringify(t.getDataForSaveAs())
                      i.saveTemplate(e, o)
                    }),
                    o.push({
                      title: t.saveAsText,
                      action: i.showSaveDialog.bind(i, n),
                      addClass: 'special',
                    })),
                  'function' == typeof t.defaultsCallback &&
                    o.push({
                      title: t.applyDefaultText,
                      action: t.defaultsCallback,
                      addClass: 'special',
                    }),
                  (a = []),
                  $.each(i._list, function(e, o) {
                    a.push({
                      title: o,
                      action: function() {
                        i.loadTemplate.call(i, o, t.loadTemplateCallback)
                      },
                      deleteAction: function() {
                        runOrSignIn(
                          function() {
                            var t = $.t(
                              "Do you really want to delete Drawing Template '{0}' ?",
                            ).format(o)
                            l({ type: 'modal', content: t }).then(function(t) {
                              t.on('action:yes', function(t) {
                                i.removeTemplate.call(i, o), t.close()
                              }),
                                t.open()
                            })
                          },
                          { source: 'Delete line tool template' },
                        )
                      },
                    })
                  }),
                  a.length &&
                    (a.sort(function(t, e) {
                      return (
                        (t = t.title.toUpperCase()),
                        (e = e.title.toUpperCase()),
                        t === e ? 0 : t > e ? 1 : -1
                      )
                    }),
                    o.push({ separator: !0 }),
                    (o = o.concat(a))),
                  $(this).trigger('button-popup', [o]))
            }),
            e
          )
        }),
        (o.prototype.loadTemplate = function(t, e) {
          var i = this
          return $.get(
            '/drawing-template/' + this._toolName + '/?templateName=' + encodeURIComponent(t),
            function(t) {
              i._applyTemplate(JSON.parse(t.content)), e && e()
            },
          ).error(function(t) {
            c.logWarn(t.responseText)
          })
        }),
        (o.prototype.removeTemplate = function(t) {
          if (t) {
            var e = this
            $.post('/remove-drawing-template/', { name: t, tool: e._toolName }).error(function(t) {
              c.logWarn(t.responseText)
            }),
              e.invalidateToolCache(),
              (e._list = $.grep(e._list, function(e) {
                return e !== t
              }))
          }
        }),
        (o.prototype.saveTemplate = function(t, e) {
          var i,
            o = this
          t &&
            e &&
            ((t = TradingView.clean(t)),
            (i = -1 !== $.inArray(t, o._list)),
            (function() {
              var n = { name: t, tool: o._toolName, content: e },
                a = function() {
                  i || o._list.push(t)
                }
              $.post('/save-drawing-template/', n, a).error(function(t) {
                c.logWarn(t.responseText)
              }),
                o.invalidateToolCache()
            })())
        }),
        (o.prototype.deleteAction = function(t) {
          var e = t,
            i = this
          runOrSignIn(
            function() {
              var t = $.t(" Do you really want to delete Drawing Template '{0}' ?").format(e)
              l({ type: 'modal', content: t }).then(function(t) {
                t.on('action:yes', function(t) {
                  i.removeTemplate.call(i, e), t.close()
                }),
                  t.open()
              })
            },
            { source: 'Delete line tool template' },
          )
        }),
        (o.prototype.showSaveDialog = function(t) {
          var e = this,
            i = 'text',
            o = function(t) {
              return TradingView.clean(t[i])
            },
            n = new s({
              fields: [
                new r({
                  name: i,
                  label: $.t('Template name') + ':',
                  maxLength: 64,
                  error: $.t('Please enter template name'),
                }),
              ],
              title: $.t('Save Drawing Template As'),
              confirm: {
                shouldShowDialog: function(t) {
                  return -1 !== e._list.indexOf(o(t))
                },
                getMessage: function(t) {
                  return $.t(
                    "Drawing Template '{0}' already exists. Do you really want to replace it?",
                  ).format(o(t))
                },
              },
            })
          runOrSignIn(
            function() {
              n.show().then(function(e) {
                t(e[i])
              })
            },
            {
              source: 'Save line tool template',
              sourceMeta: 'Chart',
            },
          )
        }),
        (t.exports = o)
    }.call(e, i(5)))
  },
})
