webpackJsonp([8, 2, 27], {
  1015: function(t, e) {
    t.exports =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 12"><path fill-rule="evenodd" d="M0 0h2v2H0V0zm4 0h2v2H4V0zM0 5h2v2H0V5zm4 0h2v2H4V5zm-4 5h2v2H0v-2zm4 0h2v2H4v-2z"/></svg>'
  },
  1023: function(t, e) {
    t.exports =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 16" width="12px" height="16px"><path fill-rule="evenodd" d="M10.5 5.333h-.75V3.81C9.75 1.707 8.07 0 6 0 3.93 0 2.25 1.707 2.25 3.81v1.523H1.5c-.825 0-1.5.686-1.5 1.524v7.62C0 15.313.675 16 1.5 16h9c.825 0 1.5-.686 1.5-1.524V6.857c0-.838-.675-1.524-1.5-1.524zM6 12c-.825 0-1.5-.675-1.5-1.5S5.175 9 6 9s1.5.675 1.5 1.5S6.825 12 6 12zm2.325-6.75h-4.65v-1.5A2.326 2.326 0 0 1 6 1.425 2.326 2.326 0 0 1 8.325 3.75v1.5z"/></svg>'
  },
  1024: function(t, e, o) {
    'use strict'
    ;(function(t) {
      function i(e) {
        var o, i, c, d, h, u, p, _, f, g, v
        if (
          ((e = $.extend({}, l, e)),
          (o = $(
            t.render(
              r,
              {
                tabs: e.tabs,
                customControls: e.customControls,
                customControlsAddClass: e.customControlsContainerAddClass,
              },
              { additionalHeaderContent: e.additionalHeaderContent },
            ),
          )),
          (i = $(a)),
          (c = i),
          e.contentAddClass && i.addClass(e.contentAddClass),
          !1 !== e.withScroll &&
            (i = $('<div class="js-dialog__scroll-wrap tv-dialog__scroll-wrap">').append(
              c.addClass('tv-dialog__scroll-wrap-inner'),
            )),
          (d = $('<div class="tv-tabbed-dialog">')
            .append(o)
            .append(i)),
          e.customControls && o.find('.js-custom-controls').append(e.customControls),
          !0 !== e.doNotCreatePages)
        )
          for (h = 0; h < e.tabs.length; ++h)
            c.append($('<div class="tv-tabbed-dialog__tab-page">').append(e.tabs[h].page))
        return (
          (u = e.tabStateSaveKey),
          (p = e.activeTab),
          (_ = e.tabsScrollBoxAddClass),
          (f = e.tabAddClass),
          delete e.tabs,
          delete e.activeTab,
          delete e.customControls,
          delete e.tabStateSaveKey,
          delete e.customControlsContainerAddClass,
          delete e.tabsScrollBoxAddClass,
          delete e.tabAddClass,
          (e.closeButtonAddClass = 'tv-tabbed-dialog__close'),
          (e.contentWrapTemplate = d),
          (g = (0, n.createDialog)(e)),
          (v = new s.Tabs(o.find('.tv-tabs').get(0), c.get(0), {
            addLeftArrowsClass: 'tv-tabbed-dialog__tabs-arrow-left',
            addRightArrowsClass: 'tv-tabbed-dialog__tabs-arrow-right',
            addScrollBoxClass: _,
            tabClass: f,
            saveTab: u,
            activeTab: p,
          })),
          g.on('afterOpen', function() {
            v.setActivePage(v.index(), !0, !0)
          }),
          { dialog: g, tabs: v }
        )
      }
      var s, n, r, a, l
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.createTabbedDialog = i),
        (s = o(1025)),
        (n = o(188)),
        o(1027),
        (r =
          '<div class="tv-dialog__section tv-dialog__section--title tv-tabbed-dialog__header js-dialog__drag js-close-button-place"><div class="tv-tabs tv-tabbed-dialog__tabs js-dialog__drag">{{#tabs}}<div class="tv-tabs__tab">{{name}}</div>{{/tabs}}</div>{{#customControls}}<div class="js-custom-controls tv-tabbed-dialog__custom-controls {{#customControlsAddClass}}{{customControlsAddClass}}{{/customControlsAddClass}}"></div>{{/customControls}}<div class="tv-tabbed-dialog__bottom-border"></div></div>{{>additionalHeaderContent}}'),
        (a = '<div class="tv-tabbed-dialog__pages-container"></div>'),
        (l = { tabs: [] })
    }.call(e, o(126)))
  },
  1025: function(t, e, o) {
    'use strict'
    function i(t) {
      var e,
        o = []
      for (e = 1; e < arguments.length; e++) o[e - 1] = arguments[e]
      return t && 'object' == typeof t
        ? 0 === o.length
          ? t
          : (o.forEach(function(e) {
              void 0 !== e &&
                null !== e &&
                'object' == typeof e &&
                Object.keys(e).forEach(function(o) {
                  var n,
                    r,
                    a = t[o],
                    l = e[o]
                  l === t ||
                    ((n = Array.isArray(l)),
                    l && (s(l) || n)
                      ? ((r = void 0),
                        (r = n ? (a && Array.isArray(a) ? a : []) : a && s(a) ? a : {}),
                        (t[o] = i(r, l)))
                      : void 0 !== l && (t[o] = l))
                })
            }),
            t)
        : t
    }
    function s(t) {
      var e, o, i
      return (
        !(!t || '[object Object]' !== Object.prototype.toString.call(t)) &&
        (!(e = Object.getPrototypeOf(t)) ||
          ((o = Object.hasOwnProperty.toString),
          'function' == typeof (i = e.hasOwnProperty('constructor') && e.constructor) &&
            o.call(i) === o.call(Object)))
      )
    }
    var n, r, a, l, c, d, h, u, p, _, f, g, v, b
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (n = o(1026)),
      (r = o(319)),
      (a = o(127)),
      (l = o(184)),
      (c = o(8)),
      (d = o.n(c)),
      (h = o(873)),
      (u = o(973)),
      (p = o(49)),
      (_ = o(38)),
      o.d(e, 'Tabs', function() {
        return b
      }),
      (function(t) {
        ;(t[(t.Left = 0)] = 'Left'), (t[(t.Right = 1)] = 'Right')
      })(f || (f = {})),
      (g = {
        saveTab: '',
        noSlider: !1,
        onTabClick: !1,
        loadedClass: 'i-loaded',
        tabsContainerClass: 'tv-tabs',
        tabClass: 'tv-tabs__tab',
        tabDisabledClass: 'disabled',
        activeTabClass: 'i-active',
        activePageClass: 'active',
        sliderClass: 'tv-tabs__slider',
        scrollBoxClass: 'tv-tabs__scroll-box',
        scrollWrapClass: 'tv-tabs__scroll-wrap',
        lArrowClass: 'tv-tabs__left-arrow',
        rArrowClass: 'tv-tabs__right-arrow',
      }),
      (v = { leftArrow: h, rightArrow: u }),
      (b = (function() {
        function t(t, e, o) {
          void 0 === o && (o = {}),
            (this._animating = !1),
            (this._prevWidth = -1),
            (this._bindings = []),
            (this._options = i({}, g, o)),
            (this.tabChanged = new d.a()),
            (this._elTabs = t),
            (this._elPages = e),
            (this._elScrollWrap = this._findOrCreateElement(
              this._options.scrollWrapClass || '',
              this._elTabs,
              'wrapInner',
            )),
            (this._elScrollBox = this._findOrCreateElement(
              this._options.scrollBoxClass || '',
              this._elScrollWrap,
              'wrapInner',
            )),
            (this._elArrowLeft = this._findOrCreateElement(
              this._options.lArrowClass || '',
              this._elTabs,
              'append',
              '<div class="' +
                (this._options.lArrowClass || '') +
                ' i-slided">' +
                v.leftArrow +
                '</div>',
            )),
            (this._elArrowRight = this._findOrCreateElement(
              this._options.rArrowClass || '',
              this._elTabs,
              'append',
              '<div class="' +
                (this._options.rArrowClass || '') +
                ' i-slided">' +
                v.rightArrow +
                '</div>',
            )),
            this._options.noSlider ||
              (this._elSlider = this._findOrCreateElement(
                this._options.sliderClass || '',
                this._elScrollBox,
                'append',
              )),
            this._addClass(this._elArrowLeft, this._options.addLeftArrowsClass),
            this._addClass(this._elArrowRight, this._options.addRightArrowsClass),
            this._addClass(this._elScrollBox, this._options.addScrollBoxClass),
            this._addClass(this._elSlider, this._options.addSliderClass),
            this._addClass(this._elTabs, this._options.tabsContainerClass),
            this._addClass(this.getTabsArray(), this._options.tabClass),
            this._addClass(this._elTabs, this._options.loadedClass),
            this.checkScrollArrows(!0),
            this._initActivePage(),
            this._bindEvents()
        }
        return (
          (t.prototype.getTabsArray = function() {
            var t,
              e,
              o,
              i = this._elScrollBox.children
            if (!this._options.sliderClass) return Array.prototype.slice.call(i)
            for (t = [], e = 0; e < i.length; e++)
              (o = i[e]), o.classList.contains(this._options.sliderClass) || t.push(o)
            return t
          }),
          (t.prototype.getPagesArray = function() {
            return this._elPages ? Array.prototype.slice.call(this._elPages.children) : []
          }),
          (t.prototype.getElTabs = function() {
            return this._elTabs
          }),
          (t.prototype.getElPages = function() {
            return this._elPages
          }),
          (t.prototype.checkScrollArrows = function(t) {
            function e(t) {
              t.classList.remove('i-slided'),
                $.Velocity &&
                  $.Velocity.animate(
                    t,
                    { translateX: '0%' },
                    { duration: l.dur / 2, easing: 'easeOutCubic', queue: !1 },
                  )
            }
            function o(e, o) {
              if (t) return e.classList.add('i-slided'), void e.setAttribute('style', '')
              var i = o === f.Left ? '-100%' : '100%'
              Object(r.lazyVelocity)().then(function() {
                $.Velocity.animate(
                  e,
                  { translateX: i },
                  {
                    complete: function() {
                      return e.classList.add('i-slided')
                    },
                    duration: l.dur / 2,
                    easing: 'easeOutCubic',
                    queue: !1,
                  },
                )
              })
            }
            var i, s, n, a
            void 0 === t && (t = !1),
              (i = Math.ceil(this._elScrollWrap.scrollLeft)),
              (s = this._getElWidth(this._elScrollWrap)),
              (n = 10),
              (a = this._elScrollWrap.scrollWidth - s),
              i >= n
                ? e(this._elArrowLeft)
                : (i <= n || this._elScrollWrap.scrollWidth <= s) && o(this._elArrowLeft, f.Left),
              a - i > 1
                ? e(this._elArrowRight)
                : (i >= a || this._elScrollWrap.scrollWidth <= s) && o(this._elArrowRight, f.Right)
          }),
          (t.prototype.index = function() {
            var t = this.getElActiveTab()
            return t ? this.getTabsArray().indexOf(t) : -1
          }),
          (t.prototype.getElActiveTab = function() {
            return this._getActiveElement(
              this.getTabsArray(),
              this._options.activeTabClass || '',
              this._options.inactiveTabClass,
            )
          }),
          (t.prototype.getElActivePage = function() {
            return this._getActiveElement(
              this.getPagesArray(),
              this._options.activePageClass || '',
              this._options.inactivePageClass,
            )
          }),
          (t.prototype.setActivePage = function(t, e, o) {
            function i(e, o, i) {
              e.forEach(function(e, s) {
                var n = t === s,
                  r = e.classList
                o && r.toggle(o, n), i && r.toggle(i, !n)
              })
            }
            if (-1 !== t && (t !== this.index() || o)) {
              var s = this.index()
              i(this.getTabsArray(), this._options.activeTabClass, this._options.inactiveTabClass),
                i(
                  this.getPagesArray(),
                  this._options.activePageClass,
                  this._options.inactivePageClass,
                ),
                this._options.noSlider || this.updateSlider(s, t, e),
                this._options.saveTab && p.setValue(this._options.saveTab, t),
                this.tabChanged.fire(t)
            }
          }),
          (t.prototype.updateSlider = function(t, e, o) {
            var i,
              s,
              n,
              a,
              c,
              d,
              h = this
            this._options.noSlider ||
              ((i = this.getTabsArray()[e]),
              0 === i.clientWidth ||
                0 === i.clientHeight ||
                'none' === window.getComputedStyle(i).getPropertyValue('display') ||
                ((s = window.getComputedStyle(i)),
                (n = i.offsetLeft + parseInt(s.getPropertyValue('padding-left'))),
                (a = this._getElWidth(i)),
                (c = i.querySelector('.js-tabs__slider-pos')),
                c &&
                  ((d = window.getComputedStyle(c)),
                  (n += parseInt(d.getPropertyValue('padding-left')) + c.offsetLeft),
                  (a -= a - this._getElWidth(c))),
                (o = o || -1 === t || (document.all && !window.atob)),
                o
                  ? ((this._elSlider.style.left = n + 'px'),
                    (this._elSlider.style.width = a + 'px'))
                  : ((this._animating = !0),
                    Object(r.lazyVelocity)().then(function() {
                      $.Velocity.animate(
                        h._elSlider,
                        { left: n },
                        { duration: l.dur, easing: 'easeOutCubic', queue: !1 },
                      ),
                        $.Velocity.animate(
                          h._elSlider,
                          { width: a },
                          {
                            complete: function() {
                              h._animating = !1
                            },
                            duration: l.dur,
                            easing: 'easeOutCubic',
                            queue: !1,
                          },
                        )
                    }))))
          }),
          (t.prototype.onTabClick = function(t) {
            var e = t.currentTarget || t.target,
              o = this.getTabsArray().indexOf(e)
            ;-1 === o || this._isTabDisabled(e) || this.setActivePage(o),
              document.activeElement.blur(),
              t.preventDefault()
          }),
          (t.prototype.resizeSlider = function() {
            var t, e
            this._options.noSlider ||
              ((t = this._elTabs.offsetWidth) !== this._prevWidth &&
                ((this._prevWidth = t), (e = this.index()), this.updateSlider(e, e, !0)))
          }),
          (t.prototype.count = function() {
            return this.getTabsArray().length
          }),
          (t.prototype.add = function(t, e) {
            this._elScrollBox.appendChild(t),
              this._elPages && e && this._elPages.appendChild(e),
              this._bindTabEvents(t),
              this.checkScrollArrows(!0)
          }),
          (t.prototype.remove = function(t) {
            function e(t) {
              t.parentElement && t.parentElement.removeChild(t)
            }
            var o,
              i,
              s = this.tabAt(t)
            s && (this._unbindTabEvents(s), e(s)),
              (o = this.pageAt(t)),
              o && e(o),
              (i = t - 1 >= 0 ? t - 1 : 0),
              this.setActivePage(i),
              this.checkScrollArrows(!0)
          }),
          (t.prototype.indexOfTab = function(t) {
            return this.getTabsArray().indexOf(t)
          }),
          (t.prototype.indexOfPage = function(t) {
            return this.getPagesArray().indexOf(t)
          }),
          (t.prototype.pageAt = function(t) {
            return this.getPagesArray()[t] || null
          }),
          (t.prototype.tabAt = function(t) {
            return this.getTabsArray()[t] || null
          }),
          (t.prototype.deselect = function(t) {
            var e,
              o = this.getElActiveTab()
            return (
              this._options.activeTabClass && o && o.classList.remove(this._options.activeTabClass),
              (e = this.getElActivePage()),
              this._options.activePageClass &&
                e &&
                e.classList.remove(this._options.activePageClass),
              this._elSlider &&
                ((this._elSlider.style.left = ''), (this._elSlider.style.width = '')),
              this
            )
          }),
          (t.prototype.stop = function() {
            this._unbindEvents({})
          }),
          (t.prototype._getElWidth = function(t) {
            if (0 === t.offsetWidth) return 0
            var e = window.getComputedStyle(t)
            return (
              t.offsetWidth -
              parseFloat(e.getPropertyValue('padding-left')) -
              parseFloat(e.getPropertyValue('padding-right')) -
              parseFloat(e.getPropertyValue('border-left-width')) -
              parseFloat(e.getPropertyValue('border-right-width'))
            )
          }),
          (t.prototype._findOrCreateElement = function(t, e, o, i) {
            var s,
              n,
              r,
              a = e.querySelector('.' + t)
            if (!a)
              if (
                ((s = document.createElement('div')),
                (s.innerHTML = i || '<div class="' + t + '"></div>'),
                (a = s.firstElementChild),
                'append' === o)
              )
                e.appendChild(a)
              else {
                if ('wrapInner' !== o) throw Error('Unknown insertMethod')
                for (n = Array.prototype.slice.call(e.childNodes), r = 0; r < n.length; r++)
                  a.appendChild(n[r])
                e.appendChild(a)
              }
            return a
          }),
          (t.prototype._addClass = function(t, e) {
            if ('string' == typeof e) {
              Array.isArray(t) || (t = [t])
              var o = e.split(/\s+/)
              t.forEach(function(t) {
                o.forEach(function(e) {
                  t.classList.add(e)
                })
              })
            }
          }),
          (t.prototype._initActivePage = function() {
            var t,
              e = 0
            this._options.saveTab && (e = p.getInt(this._options.saveTab, 0)),
              (t = this.index()),
              -1 !== t && (e = t),
              void 0 !== this._options.activeTab && (e = this._options.activeTab),
              this.setActivePage(e, !0, !0)
          }),
          (t.prototype._bindEvents = function() {
            var t,
              e = this
            this.getTabsArray().forEach(this._bindTabEvents.bind(this)),
              this._bindOneEvent({
                eventName: 'scroll',
                listener: this.checkScrollArrows.bind(this, !1),
                target: this._elScrollWrap,
              }),
              this._bindOneEvent({
                eventName: 'click',
                listener: function(t) {
                  var o = e.getTabsArray(),
                    i = 0,
                    s = !1,
                    n = e._elScrollWrap.scrollLeft
                  _.IS_RTL && o.reverse(),
                    o.forEach(function(t) {
                      if (!s) {
                        var e = t.offsetLeft + t.offsetWidth
                        e > n ? (s = !0) : (i = e)
                      }
                    }),
                    Object(r.lazyVelocity)().then(function() {
                      $.Velocity.animate(e._elScrollWrap, 'scroll', {
                        axis: 'x',
                        container: $(e._elScrollWrap),
                        duration: l.dur / 2,
                        easing: 'easeInOutCubic',
                        offset: Math.floor(i - n - e._getElWidth(e._elArrowLeft)),
                        queue: !1,
                      })
                    })
                },
                target: this._elArrowLeft,
              }),
              this._bindOneEvent({
                eventName: 'click',
                listener: function(t) {
                  var o = e.getTabsArray(),
                    i = 0,
                    s = _.IS_RTL ? 0 : e._elScrollWrap.scrollLeft + e._getElWidth(e._elScrollWrap)
                  _.IS_RTL && o.reverse(),
                    o.forEach(function(t) {
                      if (0 === i) {
                        var e = t.offsetLeft + t.offsetWidth
                        e > s && (i = e)
                      }
                    }),
                    Object(r.lazyVelocity)().then(function() {
                      $.Velocity.animate(e._elScrollWrap, 'scroll', {
                        axis: 'x',
                        container: $(e._elScrollWrap),
                        duration: l.dur / 2,
                        easing: 'easeInOutCubic',
                        offset: Math.ceil(i - s + e._getElWidth(e._elArrowRight)),
                        queue: !1,
                      })
                    })
                },
                target: this._elArrowRight,
              }),
              (t = Array.prototype.slice.call(
                this._elTabs.querySelectorAll('.js-tabs__slider-hover') || [],
              )),
              t.length &&
                t.forEach(function(t) {
                  return e._bindOneEvent({
                    eventName: 'mouseenter',
                    listener: function(t) {
                      if (!e._animating) {
                        var o = t.currentTarget
                        o &&
                          e._options.activeTabClass &&
                          o.classList &&
                          o.classList.contains(e._options.activeTabClass) &&
                          e._hoverSlider(o)
                      }
                    },
                    target: t,
                  })
                }),
              this._bindOneEvent({
                eventName: 'resize',
                listener: function() {
                  e.checkScrollArrows(!0), e._options.noSlider || e.resizeSlider()
                },
                target: window,
              })
          }),
          (t.prototype._bindTabEvents = function(t) {
            var e = this
            this._bindOneEvent({
              eventName: 'click',
              listener: function(t) {
                'function' == typeof e._options.onTabClick
                  ? e._options.onTabClick(t)
                  : e.onTabClick(t)
              },
              target: t,
            })
          }),
          (t.prototype._unbindTabEvents = function(t) {
            this._unbindEvents({ target: t })
          }),
          (t.prototype._bindOneEvent = function(t) {
            t.target.addEventListener(t.eventName, t.listener), this._bindings.push(t)
          }),
          (t.prototype._unbindEvents = function(t) {
            var e = function(e) {
              return !(
                (void 0 !== e.eventName && e.eventName !== t.eventName) ||
                (void 0 !== e.target && e.target !== t.target) ||
                (void 0 !== e.listener && e.listener !== t.listener)
              )
            }
            this._bindings.filter(e).forEach(function(t) {
              return t.target.removeEventListener(t.eventName, t.listener)
            }),
              (this._bindings = this._bindings.filter(function(t) {
                return !e(t)
              }))
          }),
          (t.prototype._getActiveElement = function(t, e, o) {
            var i = function(t, i, s) {
              return e ? t.classList.contains(e) : !!o && !t.classList.contains(o)
            }
            return t.filter(i)[0] || null
          }),
          (t.prototype._isTabDisabled = function(t) {
            return (
              t.classList.contains('i-disabled') ||
              (this._options.tabDisabledClass &&
                t.classList.contains(this._options.tabDisabledClass)) ||
              t.hasAttribute('disabled')
            )
          }),
          (t.prototype._hoverSlider = function(t) {
            var e,
              o = this,
              i = this._getElWidth(t),
              s = window.getComputedStyle(t),
              n =
                t.offsetLeft +
                parseInt(s.getPropertyValue('padding-left')) +
                parseInt(s.getPropertyValue('margin-left')),
              a = { duration: l.dur / 4, easing: 'easeOutCubic', queue: !1 }
            Object(r.lazyVelocity)().then(function() {
              $.Velocity.animate(o._elSlider, { left: n }, a),
                $.Velocity.animate(o._elSlider, { width: i }, a)
            }),
              (e = function() {
                o.getElActiveTab() === t && o._unhoverSlider(t),
                  t.removeEventListener('mousleave', e)
              }),
              t.addEventListener('mouseleave', e)
          }),
          (t.prototype._unhoverSlider = function(t) {
            var e = this,
              o = window.getComputedStyle(t),
              i = t.querySelector('.js-tabs__slider-pos'),
              s = window.getComputedStyle(i),
              n =
                t.offsetLeft +
                parseInt(o.getPropertyValue('padding-left')) +
                parseInt(o.getPropertyValue('margin-left')) +
                parseInt(s.getPropertyValue('padding-left')) +
                i.offsetLeft,
              a = this._getElWidth(t),
              c = a - (a - this._getElWidth(i)),
              d = { duration: l.dur / 2, easing: 'easeInSine', queue: !1 }
            Object(r.lazyVelocity)().then(function() {
              $.Velocity.animate(e._elSlider, { left: n }, d),
                $.Velocity.animate(e._elSlider, { width: c }, d)
            })
          }),
          t
        )
      })())
  },
  1026: function(t, e) {},
  1027: function(t, e) {},
  1042: function(t, e, o) {
    'use strict'
    function i(t, e, o, i) {
      ;(this._sourcesPropertiesGetter = t),
        (this._chartModel = o),
        (this._items = null),
        (this._scroll = null),
        (this._selectedItemId = ''),
        (this._$tabContainer = i.addClass('tv-objects-tree-dialog-tab')),
        (this._$contentWrapper = $('<div class="tv-objects-tree-dialog-tab__content">').appendTo(
          this._$tabContainer,
        )),
        (this._list = new n(this._chartModel, e)),
        this._list.setItemActivateListener(this._onActiveSourceChanged.bind(this)),
        (this._sourceRemovedHandler = this._onSourceRemoved.bind(this)),
        (this._sourcesRemovedHandler = this._onSourcesRemoved.bind(this)),
        (this._icons = null),
        (this._destroyed = !1)
      var s = l.getAllSourcesIcons()
      null !== s
        ? this.setIcons(s)
        : l.loadAllSourcesIcons().then(
            function(t) {
              this._destroyed || (this.setIcons(t), null !== this._items && this._updateView())
            }.bind(this),
          )
    }
    var s = o(833).SidebarCustomScroll,
      n = o(1192).ObjectTreeItemsController,
      r = o(18),
      a = o(305).Spinner,
      l = o(1199)
    o(1200),
      (i.prototype._removeSourceFromView = function(t) {}),
      (i.prototype._removeSourcesFromView = function(t) {}),
      (i.prototype._renderViewInternal = function(t) {}),
      (i.prototype._updateView = function() {}),
      (i.prototype.destroy = function() {
        this._unsubscribeListeners(), (this._destroyed = !0)
      }),
      (i.prototype.setIcons = function(t) {
        this._icons = t
      }),
      (i.prototype.getIcon = function(t) {
        var e, o
        return null !== t && 'loadSvg' === t.type
          ? null === this._icons
            ? null
            : ((e = t.svgId.split('.')),
              (o = this._icons[e[0]][e[1]]),
              o ? { type: 'svg', svgCode: o } : null)
          : t
      }),
      (i.prototype.initView = function() {
        this._chartModel.selectedSource() &&
          (this._selectedItemId = this._chartModel.selectedSource().id()),
          this._subscribeListeners(),
          this._renderView(null),
          this._addScroll()
      }),
      (i.prototype._sourceForId = function(t) {
        return this._chartModel.dataSourceForId(t)
      }),
      (i.prototype._selectedSourceId = function() {
        return this._selectedItemId
      }),
      (i.prototype._onActiveSourceChanged = function(t) {
        if (!t) return void (this._selectedItemId = '')
        ;(this._selectedItemId = t.id()),
          this._chartModel.setSelectedSource(t),
          this._chartModel.invalidate(new r(r.LIGHT_UPDATE))
      }),
      (i.prototype._getItemForSourceId = function(t) {
        return this._$contentWrapper.find('#' + t)
      }),
      (i.prototype._markItemForSource = function(t, e) {
        t.attr('id', e.id())
      }),
      (i.prototype._getSourceIdForItem = function(t) {
        return t.attr('id')
      }),
      (i.prototype._getSourceForItem = function(t) {
        return this._sourceForId(this._getSourceIdForItem(t))
      }),
      (i.prototype._listAccessor = function() {
        return this._list
      }),
      (i.prototype._showSpinner = function() {
        ;(this.spinner = new a().spin(this._$tabContainer.get(0))),
          this._$contentWrapper.css('visibility', 'hidden')
      }),
      (i.prototype._hideSpinner = function() {
        this.spinner && (this.spinner.stop(), this._$contentWrapper.css('visibility', 'visible'))
      }),
      (i.prototype._onSourceRemoved = function(t) {
        t && (this._removeSourceFromView(t), this._scroll.updateScrollBar())
      }),
      (i.prototype._onSourcesRemoved = function(t) {
        Array.isArray(t) && (this._removeSourcesFromView(t), this._scroll.updateScrollBar())
      }),
      (i.prototype._subscribeListeners = function() {
        this._chartModel.on('removeSource', this._sourceRemovedHandler),
          this._chartModel.on('removeSources', this._sourcesRemovedHandler)
      }),
      (i.prototype._unsubscribeListeners = function() {
        this._chartModel.removeListener('removeSource', this._sourceRemovedHandler),
          this._chartModel.removeListener('removeSources', this._sourcesRemovedHandler)
      }),
      (i.prototype._getItems = function() {
        return this._items
      }),
      (i.prototype._reloadItems = function() {
        this._items = this._sourcesPropertiesGetter()
      }),
      (i.prototype._renderView = function(t) {
        this._$contentWrapper.empty(),
          this._hideSpinner(),
          this._showSpinner(),
          this._reloadItems(),
          this._renderViewInternal(
            function() {
              this._hideSpinner(), t && t()
            }.bind(this),
          )
      }),
      (i.prototype._addScroll = function() {
        this._scroll = new s(this._$tabContainer, this._$contentWrapper, {
          showTopShadow: !1,
          showBottomShadow: !1,
          scrollMarginTop: 0,
        })
      }),
      (t.exports = i)
  },
  1186: function(t, e, o) {
    'use strict'
    function i(t, e, o, i, s) {
      n.call(this, t, e, o, i),
        (this._delayedRenderIntervals = {}),
        (this._$filterContainer = s),
        (this._boundUpdateView = this._updateView.bind(this)),
        (this._boundRenderView = this._renderView.bind(this, null)),
        (this._zorderChangedHandler = this._onZorderChanged.bind(this))
    }
    var s = o(1187).ObjectsTreeTabFilter,
      n = o(1042)
    o(1201),
      inherit(i, n),
      (i.prototype.destroy = function() {
        Object.keys(this._delayedRenderIntervals).forEach(function(t) {
          clearInterval(t)
        }),
          (this._delayedRenderIntervals = null),
          n.prototype.destroy.call(this)
      }),
      (i.prototype.initView = function() {
        ;(this._filter = new s(this._$filterContainer)),
          this._filter.onChange.subscribe(
            this,
            function() {
              this._renderView(this._scroll.scrollToStart.bind(this._scroll))
            }.bind(this),
          ),
          n.prototype.initView.call(this)
      }),
      (i.prototype._addSortableToList = function(t, e) {
        var o = 0
        this._listAccessor().createSortableForItemsList(
          t,
          function(t, e) {
            o = e.item.index()
          },
          function(t, i) {
            var s,
              n,
              r,
              a,
              l,
              c,
              d,
              h,
              u,
              p = i.item.index()
            if (o !== p) {
              for (
                s = o > p ? i.item.next() : i.item.prev(),
                  n = this._getSourceIdForItem(i.item),
                  r = this._getSourceIdForItem(s),
                  a = -1,
                  l = -1,
                  c = 0;
                c < e.length;
                ++c
              )
                (d = e[c]), d.datasource.id() === n ? (a = c) : d.datasource.id() === r && (l = c)
              for (
                h = this._chartModel.dataSourceForId(n),
                  this._chartModel.removeListener('changeZOrder', this._zorderChangedHandler),
                  this._chartModel.beginUndoMacro('Change ' + h.title() + ' Z order'),
                  u = a > l ? 1 : -1,
                  c = 0;
                c < Math.abs(a - l);
                c++
              )
                this._chartModel.changeZOrder(h, u)
              this._chartModel.endUndoMacro(),
                this._chartModel.on('changeZOrder', this._zorderChangedHandler)
            }
          }.bind(this),
        )
      }),
      (i.prototype._getNewSelectedIdOnRemoval = function(t) {
        var e = t.next()
        0 === e.length && (e = t.prev()),
          this._listAccessor().activateItem(e, this._getSourceForItem(e))
      }),
      (i.prototype._moveItemUp = function(t) {
        var e = t.prev()
        e.length && (t.insertBefore(e), this._scroll.scrollTo(t))
      }),
      (i.prototype._moveItemDown = function(t) {
        var e = t.next()
        e.length && (t.insertAfter(e), this._scroll.scrollTo(t))
      }),
      (i.prototype._removeSourceFromView = function(t) {
        var e,
          o = this._getItemForSourceId(t.id()),
          i = t.id() === this._selectedSourceId()
        i && this._getNewSelectedIdOnRemoval(o),
          (e = o.parent()),
          1 === e.children().length ? e.remove() : o.remove(),
          this._selectedSourceId() &&
            i &&
            this._scroll.scrollTo(this._getItemForSourceId(this._selectedSourceId()))
      }),
      (i.prototype._removeSourcesFromView = function(t) {
        this._renderView(
          function() {
            this._scroll.scrollToStart()
          }.bind(this),
        )
      }),
      (i.prototype._onZorderChanged = function(t, e) {
        if (t)
          if (e) {
            var o = this._getItemForSourceId(t.id())
            1 === e ? this._moveItemUp(o) : this._moveItemDown(o)
          } else
            this._renderView(
              function() {
                this._scroll.scrollTo(this._getItemForSourceId(t.id()))
              }.bind(this),
            )
      }),
      (i.prototype._subscribeListeners = function() {
        n.prototype._subscribeListeners.call(this),
          this._chartModel.on('setProperty', this._boundUpdateView),
          this._chartModel.on('cloneLineTool', this._boundRenderView),
          this._chartModel.on('setChartStyleProperty', this._boundUpdateView),
          this._chartModel.on('changeZOrder', this._zorderChangedHandler),
          this._chartModel.on('moveSource', this._boundRenderView)
      }),
      (i.prototype._unsubscribeListeners = function() {
        n.prototype._unsubscribeListeners.call(this),
          this._chartModel.removeListener('setProperty', this._boundUpdateView),
          this._chartModel.removeListener('cloneLineTool', this._boundRenderView),
          this._chartModel.removeListener('setChartStyleProperty', this._boundUpdateView),
          this._chartModel.removeListener('changeZOrder', this._zorderChangedHandler),
          this._chartModel.removeListener('moveSource', this._boundRenderView)
      }),
      (i.prototype._updateView = function() {
        var t, e, o, i, s, n, r
        for (this._reloadItems(), t = this._getItems().groups, e = 0; e < t.length; ++e)
          if (((o = t[e]), o.children.length))
            for (i = o.children.length - 1; i >= 0; --i)
              (s = o.children[i]),
                (n = this._getItemForSourceId(s.datasource.id())),
                0 !== n.length &&
                  ((r = this.getIcon(s.datasource.getSourceIcon())),
                  this._listAccessor().updateItem(n, s, r))
      }),
      (i._groupRenderSize = 50),
      (i.prototype._renderGroup = function(t) {
        var e, o
        ;(t = t || {}),
          (e = 0),
          (o = setInterval(
            function() {
              var s = t.items.slice(e, e + i._groupRenderSize)
              s.forEach(
                function(e) {
                  var o = this.getIcon(e.datasource.getSourceIcon()),
                    i = this._list.createItem(
                      e,
                      { lockUnlock: t.showLocks, showHide: !0, draggable: !0, addContextMenu: !0 },
                      o,
                    )
                  this._markItemForSource(i, e.datasource),
                    e.datasource.id() === this._selectedSourceId() &&
                      this._listAccessor().activateItem(i, e.datasource),
                    t.$group.append(i)
                }.bind(this),
              ),
                (e += i._groupRenderSize),
                s.length ||
                  (clearInterval(o),
                  delete this._delayedRenderIntervals[o],
                  0 === --this._fillListGroupsCount && t.callback())
            }.bind(this),
            100,
          )),
          (this._delayedRenderIntervals[o] = !0)
      }),
      (i.prototype._renderViewInternal = function(t) {
        var e,
          o,
          i,
          s,
          n = 'studies' !== this._filter.value() && this._items.drawings.length
        for (this._fillListGroupsCount = 0, e = this._getItems().groups, o = 0; o < e.length; o++)
          (i = this._filter.applyToGroup(e[o].children)),
            i.length &&
              ((s = $('<div class="tv-objects-tree-tab__group">').appendTo(this._$contentWrapper)),
              this._addSortableToList(s, e[o].children),
              i.reverse(),
              this._renderGroup({ showLocks: n, callback: t, items: i, $group: s }),
              this._fillListGroupsCount++)
      }),
      (t.exports = i)
  },
  1187: function(t, e, o) {
    'use strict'
    ;(function(e, i) {
      function s(t) {
        this._$filter = $(e.render(n, { filters: this._getActions() }))
          .appendTo(t)
          .tvDropdown()
        var o = this
        this._$filter.on(Modernizr.touch ? 'touchend' : 'click', '.js-dropdown-item', function(t) {
          o._$filter.tvDropdown('close'),
            o._$filter.find('.js-dropdown-item.i-active').removeClass('i-active'),
            $(this).addClass('i-active')
        }),
          this._$filter.on('afterCloseMenu', function() {
            o.setValue(o._$filter.find('.js-dropdown-item.i-active').attr('data-name'))
          }),
          this._$filter.on('beforeOpenMenu', function() {
            o._$filter.find('.js-dropdown-item').each(function() {
              var t = $(this)
              t.toggleClass('i-active', t.attr('data-name') === o._value)
            })
          }),
          (this.onChange = new i()),
          this.setValue('all'),
          this._$filter
            .find('.js-dropdown-item[data-name="' + this._value + '"]')
            .addClass('i-active')
      }
      var n,
        r = o(34).Study,
        a = o(63).Series,
        l = o(0).LineDataSource
      o(876),
        o(1188),
        o(1189),
        o(1190),
        (n =
          '<div class="tv-dropdown tv-dropdown-behavior"><div class="tv-dropdown-behavior__button js-dropdown-toggle tv-objects-tree-tab-filter__button"><span class="js-filter-title"></span><span class="tv-caret"></span></div><div class="tv-dropdown__body tv-dropdown-behavior__body i-hidden">{{#filters}}<div class="tv-dropdown-behavior__item"><div class="tv-dropdown__item js-dropdown-item" data-name="{{name}}">{{title}}</div></div>{{/filters}}</div></div>'),
        (s.prototype.value = function() {
          return this._value
        }),
        (s.prototype.setValue = function(t) {
          if (t !== this._value) {
            this._value = t
            var e = this._getActions().filter(function(e) {
              return e.name === t
            })[0]
            this._$filter.find('.js-filter-title').text(e.title), this.onChange.fire(t)
          }
        }),
        (s.prototype.applyToGroup = function(t) {
          var e, o, i, s, n
          if ('all' === this._value) return t
          for (e = [], o = 0; o < t.length; o++)
            (i = t[o]),
              (s = TradingView.isInherited(i.datasource.constructor, a)),
              (n = TradingView.isInherited(
                i.datasource.constructor,
                'drawings' === this._value ? r : l,
              )),
              (!s && n) || e.push(i)
          return e
        }),
        (s.prototype._getActions = function() {
          return [
            { name: 'all', title: $.t('All') },
            { name: 'drawings', title: $.t('Drawings') },
            { name: 'studies', title: $.t('Studies') },
          ]
        }),
        (t.exports.ObjectsTreeTabFilter = s)
    }.call(e, o(126), o(8)))
  },
  1188: function(t, e) {},
  1189: function(t, e) {},
  1190: function(t, e, o) {
    'use strict'
    function i(t) {
      var e, o
      if (t && t.__esModule) return t
      if (((e = {}), null != t))
        for (o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
      return (e.default = t), e
    }
    function s(t, e) {
      if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function')
    }
    var n, r, a, l, c, d
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.DropdownView = void 0),
      (n = (function() {
        function t(t, e) {
          var o, i
          for (o = 0; o < e.length; o++)
            (i = e[o]),
              (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              'value' in i && (i.writable = !0),
              Object.defineProperty(t, i.key, i)
        }
        return function(e, o, i) {
          return o && t(e.prototype, o), i && t(e, i), e
        }
      })()),
      o(1191),
      (r = o(309)),
      (a = o(833)),
      (l = o(192)),
      (c = i(l)),
      (d = e.DropdownView = (function() {
        function t(e) {
          var o = this,
            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          s(this, t),
            (this.$el = e),
            (this.$wrap = i.$wrap || e.find('.tv-dropdown-behavior__button')),
            (this.$body = i.$body || e.find('.tv-dropdown-behavior__body')),
            (this.notCloseWithCtrl = !!i.notCloseWithCtrl && i.notCloseWithCtrl),
            (this.closeWithEsc = void 0 === i.closeWithEsc || i.closeWithEsc),
            this.closeWithEsc && this.$el.attr('tabIndex', 0),
            (e.data('scroll') || i.scroll) &&
              ((this.$scroll = this.$body.find('.tv-dropdown-behavior__scroll')),
              (this.$inScroll = this.$scroll.find('.tv-dropdown-behavior__inscroll')),
              (this.scroll = new a.SidebarCustomScroll(this.$scroll, this.$inScroll, {
                showTopShadow: !1,
                showBottomShadow: !1,
              })),
              (this.$scrollBar = this.scroll.getScrollBar()),
              this.$scrollBar &&
                this.$scrollBar.on('mousedown.tv-dropdown-view-scroll', function() {
                  o.offClickOutside(),
                    $(document).on('mouseup.tv-dropdown-view-scroll', function() {
                      o.onClickOutside(), $(document).off('mouseup.tv-dropdown-view-scroll')
                    })
                })),
            (e.data('adaptBody') || i.adaptBody) && (this._adaptBody = !0),
            (this._fitScreen = e.data('fitScreen') || i.fitScreen),
            this.$wrap.add(e.find('.js-dropdown-toggle')).on('click', function(t) {
              $(t.currentTarget).hasClass('js-prevent-dropdown') || o.toggle()
            })
        }
        return (
          n(t, [
            {
              key: 'toggle',
              value: function() {
                this.opened ? this.close(!0) : this.open()
              },
            },
            {
              key: 'open',
              value: function() {
                var t = this
                this.opened ||
                  this.disabled ||
                  this.readonly ||
                  (this.$el.trigger('beforeOpenMenu'),
                  this.$body.removeClass('i-hidden').addClass('i-opened'),
                  this.$wrap.addClass('i-dropped'),
                  this.$el.addClass('i-opened'),
                  'horz' === this._fitScreen && this.fitHorizontally(),
                  this._adaptBody && this.adaptBody(),
                  this.onClickOutside(),
                  this.$el.trigger('updateScroll'),
                  this.$el.trigger('afterOpenMenu'),
                  (this.opened = !0),
                  this.closeWithEsc &&
                    this.$el.on('keypress keyup', function(e) {
                      e.keyCode === c.ESC && t.close(!0)
                    }))
              },
            },
            {
              key: 'onClickOutside',
              value: function() {
                var t = this
                setTimeout(function() {
                  t.$body.on('clickoutside', function() {
                    t.close(!0)
                  })
                }, 0)
              },
            },
            {
              key: 'offClickOutside',
              value: function() {
                this.$body.off('clickoutside')
              },
            },
            {
              key: 'close',
              value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                !this.opened ||
                  this.disabled ||
                  this.readonly ||
                  (!t && this.notCloseWithCtrl && (window.event.ctrlKey || window.event.metaKey)) ||
                  (this.offClickOutside(),
                  this.$wrap.removeClass('i-dropped'),
                  this.$el.trigger('beforeCloseMenu'),
                  this.$body.removeClass('i-opened').addClass('i-hidden'),
                  this.$el.removeClass('i-opened'),
                  this.closeWithEsc && this.$el.off('keypress keyup'),
                  (this.opened = !1),
                  this.$el.trigger('afterCloseMenu'))
              },
            },
            {
              key: 'isOpened',
              value: function() {
                return this.opened
              },
            },
            {
              key: 'updateScroll',
              value: function() {
                this.scroll && (this.scroll.updateScrollBar(), this.scroll.scrollToStart())
              },
            },
            {
              key: 'enable',
              value: function() {
                this.$wrap.removeClass('i-disabled'), (this.disabled = !1)
              },
            },
            {
              key: 'disable',
              value: function() {
                this.$wrap.addClass('i-disabled'), (this.disabled = !0)
              },
            },
            {
              key: 'setReadonly',
              value: function(t) {
                this.readonly = t
              },
            },
            {
              key: 'adaptBody',
              value: function() {
                function t() {
                  r.height('auto')
                }
                var e,
                  o,
                  i,
                  s,
                  n = 15,
                  r = this.$body,
                  a = this.$wrap.get(0).getBoundingClientRect(),
                  l = window.innerHeight,
                  c = this.$inScroll.outerHeight(!0),
                  d = parseFloat(r.css('padding-top'))
                ;(c += d),
                  (e = parseFloat(r.css('padding-bottom'))),
                  (c += e),
                  (o = a.top + c + n <= l),
                  (i = c + n <= a.bottom),
                  (s = void 0),
                  o
                    ? ((s = 0 - d), t())
                    : i
                    ? ((s = -c + e), t())
                    : ((s = -a.top + n), l <= c && r.height(l - 2 * n)),
                  r.css('top', s)
              },
            },
            {
              key: 'fitHorizontally',
              value: function() {
                var t, e, o, i
                this.$body.css('marginLeft', 0),
                  (t = document.body.getBoundingClientRect()),
                  (e = parseFloat($(document.body).css('paddingRight'))),
                  (o = this.$body.offset()),
                  (o.right = o.left + this.$body.outerWidth()),
                  (i = Math.max(Math.min(0, t.right - e - o.right), t.left - o.left)) &&
                    this.$body.css('marginLeft', i)
              },
            },
            {
              key: 'destroy',
              value: function() {
                this.scroll && this.scroll.destroy(),
                  this.offClickOutside(),
                  this.$el.find('.js-dropdown-toggle').off('click'),
                  this.$wrap.off('click')
              },
            },
          ]),
          t
        )
      })()),
      ($.fn.tvDropdown = (0, r.createTvBlockWithInstance)('tv-dropdown', function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
        return new d(t, e)
      }))
  },
  1191: function(t, e) {},
  1192: function(t, e, o) {
    'use strict'
    ;(function(e, i) {
      function s(t, e) {
        ;(this._chartWidget = e),
          (this._chartModel = t),
          (this._$activeItem = null),
          (this._nodeExpandCollapseCallback = null),
          (this._nodeRemoveCallback = null),
          (this._itemActivateCallback = null)
      }
      var n,
        r,
        a,
        l,
        c,
        d,
        h,
        u,
        p = o(0).LineDataSource,
        _ = o(693),
        f = o(197).showEditObjectDialog,
        g = o(827).lazyJqueryUI
      o(1193),
        (n = o(1015)),
        (r = o(1194)),
        (a = o(1195)),
        (l = o(1023)),
        (c = o(1196)),
        (d = o(1197)),
        (h = o(1198)),
        (u =
          '<div class="tv-objects-tree-item {{#largeLeftPadding}}tv-objects-tree-item--large-left-padding{{/largeLeftPadding}}">{{#draggable}}<div class="tv-objects-tree-item__drag-icon js-drag-icon">' +
          n +
          '</div>{{/draggable}}{{#treeNode}}<div class="tv-objects-tree-item__control-buttons tv-objects-tree-item__control-buttons--left"><span class="tv-objects-tree-item__button tv-objects-tree-item__button--expand">' +
          r +
          '</span><span class="tv-objects-tree-item__button tv-objects-tree-item__button--collapse">' +
          a +
          '</span></div>{{/treeNode}}{{^treeNode}}<div class="tv-objects-tree-item__icon js-icon-container"></div>{{/treeNode}}<div class="tv-objects-tree-item__title {{#wideTitle}}tv-objects-tree-item__title--wide{{/wideTitle}} js-title-container"></div><div class="tv-objects-tree-item__control-buttons">{{#lockUnlockIcon}}<span class="tv-objects-tree-item__button tv-objects-tree-item__button--lock js-lock-unlock-btn">' +
          l +
          '</span>{{/lockUnlockIcon}}{{#showHideIcon}}<span class="tv-objects-tree-item__button js-show-hide-btn">' +
          c +
          '</span>{{/showHideIcon}}{{^treeNode}}' +
          (e.enabled('property_pages')
            ? '<span class="tv-objects-tree-item__button js-format-btn">' + d + '</span>'
            : '') +
          '{{/treeNode}}<span class="tv-objects-tree-item__button js-remove-btn">' +
          h +
          '</span></div></div>'),
        (s.prototype.setItemActivateListener = function(t) {
          this._itemActivateCallback = t
        }),
        (s.prototype.setNodeExpandCollapseCallback = function(t) {
          this._nodeExpandCollapseCallback = t
        }),
        (s.prototype.setNodeRemoveCallback = function(t) {
          this._nodeRemoveCallback = t
        }),
        (s.prototype.activateItem = function(t, e, o) {
          ;(o && o.originalEvent.defaultPrevented) ||
            (this._$activeItem &&
              0 !== this._$activeItem.length &&
              this._$activeItem.removeClass('i-active'),
            (this._$activeItem = t),
            this._$activeItem &&
              0 !== this._$activeItem.length &&
              this._$activeItem.addClass('i-active'),
            this._itemActivateCallback && this._itemActivateCallback(e))
        }),
        (s.prototype.createSortableForItemsList = function(t, e, o) {
          g(t).sortable({
            scroll: !0,
            scrollSensitivity: 100,
            scrollSpeed: 100,
            axis: 'y',
            handle: '.js-drag-icon',
            placeholder: 'tv-objects-tree-item tv-objects-tree-item--placeholder',
            start: e,
            stop: o,
          })
        }),
        (s.prototype.createTreeNodeItem = function(t, e, o) {
          var s,
            n = $(
              i.render(u, {
                draggable: !1,
                lockUnlockIcon: !1,
                formatIcon: !1,
                showHideIcon: !1,
                treeNode: !0,
                title: t,
                wideTitle: !0,
              }),
            )
          return (
            this.updateNodeItem(n, t, e, o),
            n.click(this._onNodeToggleExpandCollapse.bind(this, n, t)),
            (s = n.find('.js-remove-btn').attr('title', $.t('Delete all drawing for this symbol'))),
            s.click(
              function(e) {
                e.preventDefault(), this._nodeRemoveCallback && this._nodeRemoveCallback(n, t)
              }.bind(this),
            ),
            n
          )
        }),
        (s.prototype.createItem = function(t, e, o) {
          var s, n, r
          return (
            (e = e || {}),
            (s = t.datasource),
            (n = !1),
            (r = $(
              i.render(u, {
                draggable: e.draggable,
                lockUnlockIcon: e.lockUnlock,
                showHideIcon: e.showHide,
                editAlert: n,
                treeNode: !1,
                largeLeftPadding: e.largeLeftPadding,
              }),
            )),
            this.updateItem(r, t, o),
            r.click(this.activateItem.bind(this, r, s)),
            s.userEditEnabled() &&
              (e.lockUnlock && this._setupLockUnlockButton(r.find('.js-lock-unlock-btn'), s),
              e.showHide &&
                this._setupItemPropertyButton(
                  r.find('.js-show-hide-btn'),
                  s,
                  'visible',
                  $.t('Show/Hide'),
                  'Show/Hide ',
                  !0,
                ),
              n && this._setupEditAlertButton(r.find('.js-edit-alert-btn'), s),
              this._setupFormatButton(r.find('.js-format-btn'), s),
              this._canShowEditObjectDialog(s) &&
                (r.dblclick(
                  function() {
                    f(s, this._chartModel)
                  }.bind(this),
                ),
                e.addContextMenu &&
                  r.on(
                    'contextmenu',
                    function(t) {
                      this._showContextMenu(t, s), t.preventDefault()
                    }.bind(this),
                  )),
              this._setupItemRemoveButton(r.find('.js-remove-btn'), s)),
            r
          )
        }),
        (s.prototype.updateNodeItem = function(t, e, o, i) {
          var s = t.find('.js-title-container')
          s.toggleClass('i-bold', i.isCurrent), (s[0].innerHTML = e + ' (' + o.length + ')')
        }),
        (s.prototype.updateItem = function(t, e, o) {
          ;(t.find('.js-title-container')[0].innerHTML = TradingView.clean($.t(e.name))),
            this._setDataSourceIcon(t, o),
            this._setItemVisible(t, e.datasource)
        }),
        (s.prototype._showContextMenu = function(t, o) {
          if (e.enabled('objects_tree_context_menu')) {
            this._chartWidget
              .paneByState(this._chartModel.paneForSource(o))
              .showContextMenuForSource(o, t)
          }
        }),
        (s.prototype._canShowEditObjectDialog = function(t) {
          return (
            !(t instanceof p && !t.isActualSymbol()) &&
            ((t !== this._chartModel.mainSeries() ||
              !this._chartWidget ||
              !this._chartWidget.onWidget()) &&
              (_.hasStylesPropertyPage(t) || _.hasInputsPropertyPage(t)))
          )
        }),
        (s.prototype._setupLockUnlockButton = function(t, e) {
          TradingView.isInherited(e.constructor, p)
            ? this._setupItemPropertyButton(t, e, 'frozen', $.t('Lock/Unlock'), 'Lock/Unlock ', !1)
            : t.addClass('i-hidden')
        }),
        (s.prototype._setupEditAlertButton = function(t, e) {}),
        (s.prototype._setupFormatButton = function(t, e) {
          if (!this._canShowEditObjectDialog(e)) return void t.addClass('i-hidden')
          t.attr('title', $.t('Format')).click(
            function() {
              f(e, this._chartModel)
            }.bind(this),
          )
        }),
        (s.prototype._setItemVisible = function(t, e) {
          var o = e.properties().visible.value()
          t.toggleClass('i-prop-hidden', !o)
        }),
        (s.prototype._setDataSourceIcon = function(t, e) {
          var o = t.find('.js-icon-container').empty()
          o.removeClass('i-text-icon i-empty'),
            null === e
              ? o.addClass('i-empty')
              : 'svg' === e.type
              ? $(e.svgCode)
                  .attr({ width: 20, height: 20 })
                  .appendTo(o)
              : 'text' === e.type && (o.addClass('i-text-icon'), o.text(e.text)),
            t.prepend(o)
        }),
        (s.prototype._onItemPropertyButtonClicked = function(t, e) {
          this._chartModel.setProperty(t, !t.value(), e)
        }),
        (s.prototype._onItemPropertyChanged = function(t, e, o) {
          t.toggleClass('i-active', e ? !o.value() : o.value())
        }),
        (s.prototype._syncStateAndSubscribe = function(t, e, o) {
          e.subscribe(null, this._onItemPropertyChanged.bind(this, t, o)),
            this._onItemPropertyChanged(t, o, e)
        }),
        (s.prototype._setupItemPropertyButton = function(t, e, o, i, s, n) {
          t.attr('title', i).click(
            function(t) {
              this._onItemPropertyButtonClicked(e.properties()[o], s + e.title())
            }.bind(this),
          ),
            this._syncStateAndSubscribe(t, e.properties()[o], n)
        }),
        (s.prototype._setupItemRemoveButton = function(t, e) {
          e !== this._chartModel.mainSeries() && e.isUserDeletable()
            ? t.attr('title', $.t('Delete')).click(
                function(t) {
                  t.preventDefault(), this._chartModel.removeSource(e)
                }.bind(this),
              )
            : t.addClass('i-transparent')
        }),
        (s.prototype._onNodeToggleExpandCollapse = function(t, e) {
          var o = 'i-expanded',
            i = t.hasClass(o)
          t.toggleClass(o, !i),
            this._nodeExpandCollapseCallback && this._nodeExpandCollapseCallback(t, e, !i)
        }),
        (t.exports.ObjectTreeItemsController = s)
    }.call(e, o(5), o(126)))
  },
  1193: function(t, e) {},
  1194: function(t, e) {
    t.exports =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M0 2.006C0 .898.897 0 2.006 0h9.988C13.102 0 14 .897 14 2.006v9.988A2.005 2.005 0 0 1 11.994 14H2.006A2.005 2.005 0 0 1 0 11.994V2.006zm8 1.19H6v3H3v2h3v3h2v-3h3v-2H8v-3z"/></svg>'
  },
  1195: function(t, e) {
    t.exports =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M0 2.006C0 .898.897 0 2.006 0h9.988C13.102 0 14 .897 14 2.006v9.988A2.005 2.005 0 0 1 11.994 14H2.006A2.005 2.005 0 0 1 0 11.994V2.006zM6 6H3v2h8V6H6z"/></svg>'
  },
  1196: function(t, e) {
    t.exports =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M0 2.006C0 .898.897 0 2.006 0h9.988C13.102 0 14 .897 14 2.006v9.988A2.005 2.005 0 0 1 11.994 14H2.006A2.005 2.005 0 0 1 0 11.994V2.006zM7 11c3.314 0 6-4 6-4s-2.686-4-6-4-6 4-6 4 2.686 4 6 4zm0-2c-1.111 0-2-.889-2-2s.889-2 2-2 2 .889 2 2-.906 2-2 2z"/></svg>'
  },
  1197: function(t, e) {
    t.exports =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M0 2.006C0 .898.897 0 2.006 0h9.988C13.102 0 14 .897 14 2.006v9.988A2.005 2.005 0 0 1 11.994 14H2.006A2.005 2.005 0 0 1 0 11.994V2.006zm11.119 4.28s-.357 0-.452-.334a3.415 3.415 0 0 0-.334-.81c-.143-.309.096-.547.096-.547l.357-.357c.143-.143.143-.38 0-.548l-.476-.476c-.143-.143-.381-.143-.548 0l-.357.357s-.238.239-.548.096a3.415 3.415 0 0 0-.81-.334c-.333-.095-.333-.452-.333-.452v-.5A.376.376 0 0 0 7.334 2h-.667a.376.376 0 0 0-.381.381v.5s0 .357-.334.452c-.285.072-.547.19-.81.334-.309.143-.547-.096-.547-.096l-.357-.357c-.143-.143-.38-.143-.548 0l-.476.476c-.143.143-.143.381 0 .548l.357.357s.239.238.096.548a3.415 3.415 0 0 0-.334.81c-.095.309-.452.333-.452.333h-.5a.376.376 0 0 0-.381.38v.667c0 .215.167.381.381.381h.5s.357 0 .452.334c.072.285.19.547.334.81.143.309-.096.547-.096.547l-.357.357c-.143.143-.143.38 0 .548l.476.476c.143.143.381.143.548 0l.357-.357s.238-.239.548-.096c.262.143.524.262.81.334.309.095.333.452.333.452v.5c0 .214.166.381.38.381h.667a.376.376 0 0 0 .381-.381v-.5s0-.357.334-.452c.285-.072.547-.19.81-.334.309-.143.547.096.547.096l.357.357c.143.143.38.143.548 0l.476-.476c.143-.143.143-.381 0-.548l-.357-.357s-.239-.238-.096-.548c.143-.262.262-.524.334-.81.095-.309.452-.333.452-.333h.5a.376.376 0 0 0 .381-.38v-.667a.376.376 0 0 0-.381-.381h-.5zM7 9c-1.111 0-2-.889-2-2s.889-2 2-2 2 .889 2 2-.906 2-2 2z"/></svg>'
  },
  1198: function(t, e) {
    t.exports =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M0 2.006C0 .898.897 0 2.006 0h9.988C13.102 0 14 .897 14 2.006v9.988A2.005 2.005 0 0 1 11.994 14H2.006A2.005 2.005 0 0 1 0 11.994V2.006zM5.586 7L3.293 4.707 2.586 4 4 2.586l.707.707L7 5.586l2.293-2.293.707-.707L11.414 4l-.707.707L8.414 7l2.293 2.293.707.707L10 11.414l-.707-.707L7 8.414l-2.293 2.293-.707.707L2.586 10l.707-.707L5.586 7z"/></svg>'
  },
  1199: function(t, e, o) {
    'use strict'
    function i() {
      var t = o.c[875]
      return t
        ? Promise.resolve(t.exports.lineToolsIcons)
        : o
            .e(30)
            .then(o.bind(null, 875))
            .then(function(t) {
              return t.lineToolsIcons
            })
    }
    function s() {
      var t = o.c[974]
      return t
        ? Promise.resolve(t.exports.SERIES_ICONS)
        : o
            .e(32)
            .then(o.bind(null, 974))
            .then(function(t) {
              return t.SERIES_ICONS
            })
    }
    function n() {
      var t = Object(l.retries)(i, 2)
          .then(function(t) {
            return t
          })
          .catch(function(t) {
            return d.logWarn(t), {}
          }),
        e = Object(l.retries)(s, 2)
          .then(function(t) {
            return t
          })
          .catch(function(t) {
            return d.logWarn(t), {}
          })
      return Promise.all([t, e])
    }
    function r() {
      return (
        null === u && (u = n()),
        u.then(function(t) {
          return (h = { linetool: t[0], series: t[1] })
        })
      )
    }
    function a() {
      return h
    }
    var l, c, d, h, u
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.loadAllSourcesIcons = r),
      (e.getAllSourcesIcons = a),
      (l = o(134)),
      (c = o(4)),
      (d = Object(c.getLogger)('DataSourcesIcons')),
      (h = null),
      (u = null)
  },
  1200: function(t, e) {},
  1201: function(t, e) {},
  1202: function(t, e, o) {
    'use strict'
    function i(t, e, o, i, n) {
      s.call(this, t, e, o, i),
        (this._clearRemoveNodeTimerId = null),
        (this._$emptyListMessage = $('<div class="tv-manage-drawings-tab__empty-drawings">').text(
          $.t('No drawings yet'),
        )),
        this._$emptyListMessage.appendTo(this._$tabContainer),
        (this._$totalValueContainer = $('<div>').appendTo(n))
    }
    var s = o(1042)
    o(1203),
      inherit(i, s),
      (i.prototype.destroy = function() {
        this._clearRemoveNodeTimer(), s.prototype.destroy.call(this)
      }),
      (i.prototype.initView = function() {
        this._listAccessor().setNodeExpandCollapseCallback(this._renderViewForSymbol.bind(this)),
          this._listAccessor().setNodeRemoveCallback(this._onNodeRemoveClick.bind(this)),
          s.prototype.initView.call(this)
      }),
      (i.prototype._clearRemoveNodeTimer = function() {
        clearInterval(this._clearRemoveNodeTimerId), (this._clearRemoveNodeTimerId = null)
      }),
      (i.prototype._renderViewForSymbol = function(t, e, o) {
        var i,
          s,
          n,
          r,
          a,
          l,
          c = 'tv-manage-drawings-tab__symbol-drawings'
        if (t.next().hasClass(c))
          return t.next().toggleClass('i-expanded', o), void this._scroll.updateScrollBar()
        for (
          i = $('<div class="i-expanded ' + c + '">'), s = this._symbolDrawingsMap[e], n = 0;
          n < s.length;
          ++n
        )
          (r = s[n]),
            (a = this.getIcon(r.datasource.getSourceIcon())),
            (l = this._listAccessor().createItem(
              r,
              {
                showHide: !1,
                lockUnlock: !1,
                draggable: !1,
                largeLeftPadding: !0,
                addContextMenu: !1,
              },
              a,
            )),
            this._markItemForSource(l, r.datasource),
            i.append(l)
        i.insertAfter(t), this._scroll.updateScrollBar()
      }),
      (i.prototype._createSymbolItem = function(t) {
        var e = this._list.createTreeNodeItem(t, this._symbolDrawingsMap[t], {
          isCurrent: this._getItems().currentSymbol === t,
        })
        e.attr('data-symbol', t), this._$contentWrapper.append(e)
      }),
      (i.prototype._updateView = function() {
        var t, e, o, i, s
        for (this._reloadItems(), t = this._getItems().drawings, e = 0; e < t.length; ++e)
          (o = t[e]),
            (i = this.getIcon(o.datasource.getSourceIcon())),
            (s = this._getItemForSourceId(o.datasource.id())),
            this._listAccessor().updateItem(s, o, i)
      }),
      (i.prototype._renderViewInternal = function(t) {
        var e, o, i
        for (this._symbolDrawingsMap = {}, e = this._getItems().drawings, o = 0; o < e.length; o++)
          (i = e[o]),
            (this._symbolDrawingsMap[i.symbol] = this._symbolDrawingsMap[i.symbol] || []),
            this._symbolDrawingsMap[i.symbol].push(i)
        Object.keys(this._symbolDrawingsMap)
          .sort(
            function(t, e) {
              return this._symbolDrawingsMap[t].length < this._symbolDrawingsMap[e].length ? 1 : -1
            }.bind(this),
          )
          .forEach(this._createSymbolItem.bind(this)),
          this._renderEmptyListMessageIfNeeded(),
          this._updateTotalCounter(),
          t()
      }),
      (i.prototype._updateTotalCounter = function() {
        var t = 0
        Object.keys(this._symbolDrawingsMap).forEach(
          function(e) {
            t += 0 | this._symbolDrawingsMap[e].length
          }.bind(this),
        ),
          this._$totalValueContainer.text($.t('Total') + ': ' + t),
          this._$totalValueContainer.toggleClass('i-hidden', 0 === t)
      }),
      (i.prototype._renderEmptyListMessageIfNeeded = function() {
        this._$emptyListMessage.toggleClass(
          'js-hidden',
          0 !== Object.keys(this._symbolDrawingsMap).length,
        )
      }),
      (i.prototype._removeSourceFromView = function(t) {
        var e,
          o,
          i,
          s = this._getItemForSourceId(t.id())
        if (0 === s.length) return void this._renderView(null)
        t.id() === this._selectedSourceId() && this._listAccessor().activateItem(null, null),
          (e = s.parent()),
          (o = e.prev()),
          (i = o.attr('data-symbol')),
          (this._symbolDrawingsMap[i] = this._symbolDrawingsMap[i].filter(function(e) {
            return e.datasource !== t
          })),
          0 === this._symbolDrawingsMap[i].length
            ? (e.remove(),
              o.remove(),
              delete this._symbolDrawingsMap[i],
              this._renderEmptyListMessageIfNeeded())
            : (s.remove(),
              this._listAccessor().updateNodeItem(o, i, this._symbolDrawingsMap[i], {
                isCurrent: this._getItems().currentSymbol === i,
              })),
          this._updateTotalCounter()
      }),
      (i.prototype._onNodeRemoveClick = function(t, e) {
        if (!this._clearRemoveNodeTimerId) {
          var e = t.attr('data-symbol')
          this._chartModel.beginUndoMacro($.t('Remove all line tools for ') + e),
            (this._clearRemoveNodeTimerId = setInterval(
              function() {
                var t = this._symbolDrawingsMap[e],
                  o = t.splice(0, 200).map(function(t) {
                    return t.datasource
                  })
                this._chartModel.removeLineTools(o),
                  0 === t.length && (this._chartModel.endUndoMacro(), this._clearRemoveNodeTimer())
              }.bind(this),
              50,
            ))
        }
      }),
      (i.prototype._removeSourcesFromView = function(t) {
        this._renderView(
          function() {
            this._scroll.scrollToStart()
          }.bind(this),
        )
      }),
      (t.exports = i)
  },
  1203: function(t, e) {},
  1204: function(t, e) {},
  188: function(t, e, o) {
    'use strict'
    function i(t) {
      var e = t.type || 'popup'
      return delete t.type, 'modal' === e ? new s.TVModal(t) : new n.TVPopup(t)
    }
    var s, n
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (s = o(837)),
      (n = o(843)),
      (e.createDialog = i)
  },
  690: function(t, e, o) {
    'use strict'
    var i
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (i = o(839)),
      o.n(i),
      o.o(i, 'TVDialogAbstract') &&
        o.d(e, 'TVDialogAbstract', function() {
          return i.TVDialogAbstract
        }),
      o.o(i, 'closeAllDialogs') &&
        o.d(e, 'closeAllDialogs', function() {
          return i.closeAllDialogs
        })
  },
  693: function(t, e, o) {
    'use strict'
    ;(e.createInputsPropertyPage = function(t, e) {
      var o = t.getInputsPropertyPage()
      return null == o ? null : new o(t.properties(), e, t)
    }),
      (e.createStudyStrategyPropertyPage = function(t, e) {
        var o = t.getStrategyPropertyPage()
        return null == o ? null : new o(t.properties(), e, t)
      }),
      (e.createStylesPropertyPage = function(t, e) {
        var o = t.getStylesPropertyPage()
        return null == o ? null : new o(t.properties(), e, t)
      }),
      (e.createDisplayPropertyPage = function(t, e) {
        var o = t.getDisplayPropertyPage()
        return null == o ? null : new o(t.properties(), e, t)
      }),
      (e.createVisibilitiesPropertyPage = function(t, e) {
        var o = t.getVisibilitiesPropertyPage()
        return null == o ? null : new o(t.properties(), e, t)
      }),
      (e.hasInputsPropertyPage = function(t) {
        return null !== t.getInputsPropertyPage()
      }),
      (e.hasStylesPropertyPage = function(t) {
        return null !== t.getStylesPropertyPage()
      })
  },
  819: function(t, e, o) {
    'use strict'
    ;(function(e) {
      function i(t, e) {
        ;(this.options = t || {}), (this._chartWidget = t.chartWidget), (this._model = e)
      }
      function s(t, e) {
        e.__init || (t.initView(), (e.__init = !0))
      }
      function n(t) {
        switch (t) {
          case 'manage-drawings':
            return 1
          case 'objects-tree':
          default:
            return 0
        }
      }
      var r,
        a = o(1186),
        l = o(1202),
        c = o(0).LineDataSource,
        d = o(1024).createTabbedDialog,
        h = o(39).trackEvent
      o(1204),
        (r = null),
        (i.prototype.getSourceProperties = function() {
          var t,
            e,
            o,
            i,
            s,
            n,
            r,
            a = { groups: [], drawings: [], currentSymbol: this._model.mainSeries().symbol() }
          for (t = 0; t < this._model.panes().length; t++) {
            for (
              e = this._model.panes()[t], o = [], i = e.orderedSources(), s = 0;
              s < i.length;
              s++
            )
              (n = i[s]), n.showInObjectTree() && o.push({ datasource: n, name: n.title() })
            for (r = e.dataSources(), s = 0; s < r.length; s++)
              (n = r[s]) instanceof c &&
                n.showInObjectTree() &&
                a.drawings.push({ datasource: n, name: n.title(), symbol: n.symbol() })
            o.length && a.groups.push({ children: o })
          }
          return a
        }),
        (i.prototype.show = function() {
          var t, o, i, c, u, p, _, f, g, v
          h('GUI', 'Objects Tree'),
            (t = []),
            (o = $()),
            (i = $('<div>')),
            (c = this.getSourceProperties.bind(this)),
            (u = $('<div>')),
            (p = new a(c, this._chartWidget, this._model, u, i)),
            (o = o.add(i)),
            t.push({
              customControl: i,
              name: $.t('Objects Tree'),
              page: u,
              onActivate: s.bind(null, p),
            }),
            (_ = null),
            e.enabled('support_manage_drawings') &&
              ((f = $('<div>')),
              (g = $('<div>')),
              (_ = new l(c, this._chartWidget, this._model, g, f)),
              (o = o.add(f)),
              t.push({
                customControl: f,
                name: $.t('Manage Drawings'),
                page: g,
                onActivate: s.bind(null, _),
              })),
            (v = d({
              tabs: t,
              width: 520,
              tabStateSaveKey: 'ObjectsTreeDialog.tab',
              activeTab: n(this.options.activeTab),
              customControlsContainerAddClass: 'tv-objects-tree-dialog__custom-controls-container',
              customControls: o,
              destroyOnClose: !0,
              height: 480,
              withScroll: !1,
              contentAddClass: 'js-dialog__scroll-wrap',
              isClickOutFn: function(t) {
                if (
                  $(t.target)
                    .parents()
                    .andSelf()
                    .is(
                      '._tv-dialog, .colorpicker, .tvcolorpicker-popup, .symbol-edit-popup, .context-menu, .js-dialog',
                    )
                )
                  return !1
              },
            })),
            v.tabs.tabChanged.subscribe(null, function(e) {
              t[e].onActivate(t[e])
              for (var o = 0; o < t.length; ++o) t[o].customControl.toggleClass('i-hidden', e !== o)
              v.tabs.checkScrollArrows(!0)
            }),
            t[v.tabs.index()].onActivate(t[v.tabs.index()]),
            v.dialog.on('beforeClose', function() {
              p.destroy(), _ && _.destroy(), (r = null)
            }),
            r && r.close(),
            (r = v.dialog),
            v.dialog.open()
        }),
        (t.exports.ObjectTreeDialog = i)
    }.call(e, o(5)))
  },
  827: function(t, e, o) {
    'use strict'
    function i(t) {
      return t in $.fn
        ? Promise.resolve()
        : (r ||
            (r = new Promise(function(t) {
              o.e(31)
                .then(
                  function(e) {
                    o(831), t()
                  }.bind(null, o),
                )
                .catch(o.oe)
            })),
          r)
    }
    function s(t) {
      return new a(t)
    }
    var n, r, a
    Object.defineProperty(e, '__esModule', { value: !0 }),
      o.d(e, 'LazyJqueryUI', function() {
        return a
      }),
      (e.lazyJqueryUI = s),
      (n = o(14)),
      o.n(n),
      (a = (function() {
        function t(t) {
          this._$elem = t
        }
        return (
          (t.prototype.draggable = function() {
            var t = arguments,
              e = this._$elem
            return i('draggable').then(function() {
              return e.draggable.apply(e, t)
            })
          }),
          (t.prototype.resizable = function() {
            var t = arguments,
              e = this._$elem
            return i('resizable').then(function() {
              return e.resizable.apply(e, t)
            })
          }),
          (t.prototype.sortable = function() {
            var t = arguments,
              e = this._$elem
            return i('sortable').then(function() {
              return e.sortable.apply(e, t)
            })
          }),
          (t.prototype.datepicker = function() {
            var t = arguments,
              e = this._$elem
            return i('datepicker').then(function() {
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
  832: function(t, e, o) {
    'use strict'
    ;(function(i) {
      function s(t) {
        return t && t.__esModule ? t : { default: t }
      }
      function n() {
        var t,
          e,
          o = d.width()
        for (u.width = o, u.height = d.height(), t = 0; t < p.length; t++)
          if (o <= u.breakpoints[p[t]]) {
            u.device !== p[t] &&
              ((e = u.device), (u.device = p[t]), u.trigger('changeDevice', [p[t], e]))
            break
          }
        return u
      }
      var r, a, l, c, d, h, u, p
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (r = o(301)),
        (a = s(r)),
        (l = o(838)),
        (c = $('body')),
        (d = $(window)),
        (h = 0),
        (u = {
          width: null,
          height: null,
          device: null,
          checkDevice: n,
          isMobileSafari:
            !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) ||
            !!navigator.userAgent.match('CriOS'),
          getScrollbarWidth: (function() {
            var t = void 0
            return function() {
              var e, o, i, s
              return (
                void 0 === t &&
                  ((e = document.createElement('div')),
                  (e.style.visibility = 'hidden'),
                  (e.style.width = '100px'),
                  (e.style.msOverflowStyle = 'scrollbar'),
                  document.body.appendChild(e),
                  (o = e.offsetWidth),
                  (e.style.overflow = 'scroll'),
                  (i = document.createElement('div')),
                  (i.style.width = '100%'),
                  e.appendChild(i),
                  (s = i.offsetWidth),
                  e.parentNode.removeChild(e),
                  (t = o - s)),
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
            var e, o
            t && 1 == ++h
              ? ('hidden' !==
                  $(document.body)
                    .css('overflow')
                    .toLowerCase() &&
                  document.body.scrollHeight > document.body.offsetHeight &&
                  ($('.widgetbar-wrap').css('right', u.getScrollbarWidth()),
                  c
                    .css(
                      'padding-right',
                      parseInt(c.css('padding-right').replace('px', '')) +
                        u.getScrollbarWidth() +
                        'px',
                    )
                    .data('wasScroll', !0)),
                c.addClass('i-no-scroll'))
              : !t &&
                h > 0 &&
                0 == --h &&
                (c.removeClass('i-no-scroll'),
                c.data('wasScroll') &&
                  ((e = c.get(0)),
                  $('.widgetbar-wrap').css('right', 0),
                  (o = $('.widgetbar-wrap').width() || 0),
                  e.scrollHeight <= e.clientHeight && (o -= u.getScrollbarWidth()),
                  c.css('padding-right', (o < 0 ? 0 : o) + 'px').data('wasScroll', void 0)))
          },
        }),
        (p = Object.keys(u.breakpoints).sort(function(t, e) {
          return u.breakpoints[t] - u.breakpoints[e]
        })),
        i.extend(u, a.default.prototype),
        n(),
        $(n),
        d.on('resize', n),
        (e.default = u),
        (t.exports = e.default)
    }.call(e, o(187)))
  },
  833: function(t, e, o) {
    'use strict'
    ;(function(t) {
      function i(e, o, i) {
        var s,
          n,
          r,
          a,
          l,
          c,
          d = this
        if (
          ((this._options = $.extend({}, this._defaultOptions, i || {})),
          (this._$wrapper = e),
          (this._$content = o),
          (this._scroll_speed = 40),
          (this._shadow_offset = 10),
          (this._header_height = this._options.headerHeight),
          (this._scroll_margin_top = this._options.scrollMarginTop),
          (this.scrolled = new t()),
          (this.scrolltoend = new t()),
          (this.scrolltostart = new t()),
          (this.visibilityCallbacks = []),
          (s = navigator.platform.toLowerCase()),
          (n = navigator.userAgent.toLowerCase()),
          (r = n.indexOf('firefox') > -1),
          (a = s.indexOf('android') > -1 || n.indexOf('android') > -1),
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
              d._bottomFixed ||
                d._dragging ||
                (d._options.alwaysVisible || d._$scrollBar.addClass('active'), d._onScroll())
            })
            .on('mouseleave.sidebar-scroll', function() {
              d._bottomFixed ||
                d._dragging ||
                (d._options.alwaysVisible || d._$scrollBar.removeClass('active'), d._onScroll())
            })
            .on('mousewheel.sidebar-scroll', function(t, e) {
              if (!t.isDefaultPrevented())
                return d.scroll(e, 'MozMousePixelScroll' === t.originalEvent.type ? 2 : null)
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
          (c = this._options.alwaysVisible ? ' active-always' : ''),
          (this._$scrollBarWrapper = $('<div class="sb-scrollbar-wrap">').appendTo(this._$wrapper)),
          (this._$scrollBar = $(
            '<div class="sb-scrollbar sb-scrollbar-body' + l + c + '"></div>',
          ).appendTo(this._$scrollBarWrapper)),
          this._onScroll()
      }
      var s = o(827).lazyJqueryUI
      ;(i.prototype.isTouch = function() {
        return this._touch
      }),
        (i.prototype.getScrollBar = function() {
          return this._$scrollBar
        }),
        (i.prototype._defaultOptions = {
          headerHeight: 0,
          additionalClass: '',
          alwaysVisible: !1,
          showBottomShadow: !0,
          scrollMarginTop: 1,
          bubbleScrollEvent: !1,
        }),
        (i.prototype.initDraggable = function() {
          if (this._dragInitialized) return this
          var t = this
          return (
            s(this._$scrollBar).draggable({
              axis: 'y',
              containment: this._$scrollBarWrapper,
              start: function() {
                t._dragging = !0
              },
              stop: function() {
                t._dragging = !1
              },
              drag: function(e, o) {
                t.updateScroll()
              },
            }),
            (this._dragInitialized = !0),
            this
          )
        }),
        (i.prototype.updateScroll = function() {
          var t, e, o, i, s
          return this._touch
            ? this
            : ((t = 1),
              (e = Math.ceil(
                this._$scrollBar.position().top - this._scroll_margin_top - this._header_height,
              )),
              (o = this.getContainerHeightWithoutHeader()),
              (i = this._$content.outerHeight()),
              (s = i - o - t),
              o <= 0
                ? this
                : ((this._scroll_target_top =
                    s <= 0
                      ? this._header_height
                      : Math.min((-e * i) / o + this._header_height, this._header_height)),
                  e + this._$scrollBar.height() + 2 >= o
                    ? this.scrollToEnd()
                    : (this._$content.css('top', this._scroll_target_top + 'px'), this._onScroll()),
                  this))
        }),
        (i.prototype.getContainerHeightWithoutHeader = function() {
          return this._$wrapper[0].getBoundingClientRect().height - this._header_height
        }),
        (i.prototype.getContainerHeight = function() {
          return this._$wrapper[0].getBoundingClientRect().height
        }),
        (i.prototype.getContentHeight = function() {
          return this._$content[0].getBoundingClientRect().height
        }),
        (i.prototype.updateScrollBar = function() {
          var t, e, o, i, s, n, r, a, l
          return this._touch
            ? this
            : ((t = 1),
              (e = this._$content.position().top),
              (o = this.getContentHeight()),
              (i = this.getContainerHeight()),
              (s = this.getContainerHeightWithoutHeader()),
              (n = t + this._header_height),
              (r = s - 2 * t),
              (a = ((Math.abs(e) - this._header_height) * r) / o),
              (l = (i * i) / o),
              this.isContentShort()
                ? (this._$scrollBar.addClass('js-hidden'),
                  this._$wrapper.removeClass('sb-scroll-active'))
                : (this._$scrollBar
                    .removeClass('js-hidden')
                    .height(l)
                    .css('top', n + a),
                  this._$wrapper.addClass('sb-scroll-active'),
                  this.initDraggable()),
              this)
        }),
        (i.prototype.scroll = function(t, e) {
          var o, i, s, n, r
          return this._touch
            ? this
            : ((o = this._$content.position().top),
              (i = this._$content.outerHeight()),
              (s = this.getContainerHeightWithoutHeader()),
              (n = i - s - 1),
              (r = e || this._scroll_speed),
              n <= 0 ||
                ((this._scroll_target_top = Math.max(
                  -n + this._header_height,
                  Math.min(this._header_height, o + t * r),
                )),
                this.setContentTop(this._scroll_target_top),
                this._onScroll()))
        }),
        (i.prototype.animateTo = function(t) {
          var e, o, i
          return this._touch
            ? this
            : ((e = this._$content.outerHeight()),
              (o = this.getContainerHeightWithoutHeader()),
              (i = e - o - 1) <= 0 ||
                ((this._scroll_target_top = Math.max(
                  -i + this._header_height,
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
        (i.prototype.resize = function() {
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
        (i.prototype.resizeHeader = function(t) {
          var e = t - this._header_height
          ;(this._header_height = t),
            (this._scroll_target_top += e),
            this._$shadowTop &&
              this._$shadowTop.css('top', this._header_height - this._shadow_offset),
            this.resize()
        }),
        (i.prototype.scrollTo = function(t, e) {
          var o, i, s, n, r, a
          if (
            ((e = $.extend(
              { position: 'visible', areaHeight: t instanceof $ ? t.height() : 0 },
              e,
            )),
            t instanceof $ && (t = e.offsetTop || t.position().top),
            (o = this._$content.position().top),
            (i = this._$content.outerHeight()),
            (s = this.getContainerHeightWithoutHeader()),
            i - s - 1 <= 0)
          )
            return !0
          if (
            ((n = -1 * (o - this._header_height)), (r = n + s), (a = 0), 'visible' === e.position)
          ) {
            if (t > n && t + e.areaHeight < r) return !1
            a = t + e.areaHeight > r ? r - t - e.areaHeight : n - t
          } else 'top' === e.position && (a = n - t)
          return this.scroll(a, 1), this._onScroll(), !1
        }),
        (i.prototype.scrollToEnd = function() {
          var t = this._$content.position().top,
            e = this._$content.outerHeight(),
            o = this._$wrapper.outerHeight(),
            i = e + t
          return this.setContentTop(t + (o - i) + 1), this._onScroll(), this
        }),
        (i.prototype.scrollToStart = function() {
          return this.setContentTop(this._header_height), this._onScroll(), this
        }),
        (i.prototype.currentPosition = function() {
          return Math.round(this._$content.position().top)
        }),
        (i.prototype.atStart = function() {
          return Math.round(this._$content.position().top) >= this._header_height
        }),
        (i.prototype.atEnd = function(t) {
          var e, o, i, s
          return (
            ('number' == typeof t && isFinite(t)) || (t = 0),
            (e = 1),
            (o = Math.round(this._$content.position().top)),
            (i = this._$content.outerHeight()),
            (s = this._$wrapper.outerHeight()),
            i - Math.abs(o) - e <= s + t
          )
        }),
        (i.prototype._onScroll = function(t) {
          var e, o
          return (
            this._touch || this._$content.css('bottom', 'auto'),
            this.scrolled.fire(),
            (this._dragging && !0 !== t) || this.updateScrollBar(),
            (e = this.atStart()),
            (o = this.atEnd()),
            this._$shadowTop && this._$shadowTop.toggleClass('i-invisible', !!e),
            this._$shadowBottom && this._$shadowBottom.toggleClass('i-invisible', !!o),
            this._onContentVisible(),
            !this._atStart && e
              ? ((this._atStart = !0), this.scrolltostart.fire())
              : this._atStart && !e && delete this._atStart,
            !this._atEnd && o
              ? ((this._atEnd = !0), this.scrolltoend.fire())
              : this._atEnd && !o && delete this._atEnd,
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
        (i.prototype.checkContentVisibility = function() {
          this._onContentVisible()
        }),
        (i.prototype.subscribeToContentVisible = function(t, e, o) {
          this.visibilityCallbacks.push({ id: t, $el: e, callback: o })
        }),
        (i.prototype.triggerVisibilityCallbacks = function(t) {
          this._onContentVisible(t)
        }),
        (i.prototype._contentIsVisible = function(t) {
          return t.$el.position().top > -1 * this.currentPosition()
        }),
        (i.prototype._onContentVisible = function(t) {
          var e, o, i
          this.visibilityCallbacks.length &&
            ((e = t || this._contentIsVisible.bind(this)),
            (o = []),
            (i = this.visibilityCallbacks.filter(function(t, i) {
              if (!$.contains(this._$content, t.$el[0])) return !1
              var s = e(t)
              return s && o.push(i), !s
            }, this)),
            o.forEach(function(e) {
              this.visibilityCallbacks[e].callback(!!t)
            }, this),
            delete this.visibilityCallbacks,
            (this.visibilityCallbacks = i))
        }),
        (i.prototype.save = function() {
          return (
            (this._saved = {
              top: this._$content.position().top,
              height: this._$content.outerHeight(),
            }),
            this
          )
        }),
        (i.prototype.restore = function() {
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
        (i.prototype.fixBottom = function() {
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
        (i.prototype.releaseBottom = function() {
          return this._bottomFixed
            ? (this._touch
                ? clearInterval(this._tempIntervalID)
                : this._$content.css({ top: this._$content.position().top, bottom: 'auto' }),
              delete this._bottomFixed,
              this._onScroll(),
              this)
            : this
        }),
        (i.prototype.setContentTop = function(t) {
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
        (i.prototype.isContentShort = function() {
          return this.getContentHeight() <= this.getContainerHeightWithoutHeader()
        }),
        (i.prototype.destroy = function() {
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
        (e.SidebarCustomScroll = i)
    }.call(e, o(8)))
  },
  834: function(t, e) {},
  837: function(t, e, o) {
    'use strict'
    ;(function(t) {
      function i(t) {
        return t && t.__esModule ? t : { default: t }
      }
      function s(t) {
        var e, o
        if (t && t.__esModule) return t
        if (((e = {}), null != t))
          for (o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
        return (e.default = t), e
      }
      function n(t, e) {
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
        return 0 !== w.length
      }
      var c, d, h, u, p, _, f, g, v, b, y, m, w, C
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.TVModal = void 0),
        (c =
          Object.assign ||
          function(t) {
            var e, o, i
            for (e = 1; e < arguments.length; e++) {
              o = arguments[e]
              for (i in o) Object.prototype.hasOwnProperty.call(o, i) && (t[i] = o[i])
            }
            return t
          }),
        (d = (function() {
          function t(t, e) {
            var o, i
            for (o = 0; o < e.length; o++)
              (i = e[o]),
                (i.enumerable = i.enumerable || !1),
                (i.configurable = !0),
                'value' in i && (i.writable = !0),
                Object.defineProperty(t, i.key, i)
          }
          return function(e, o, i) {
            return o && t(e.prototype, o), i && t(e, i), e
          }
        })()),
        (e.isOpenedModals = l),
        (h = o(184)),
        (u = s(h)),
        (p = o(832)),
        (_ = i(p)),
        (f = o(690)),
        (g = o(305)),
        (v = o(189)),
        (b = s(v)),
        (y = o(307)),
        (m = s(y)),
        (w = []),
        (C = {
          ajax: {},
          closingDuration: u.dur / 2,
          overlayTemplate: '<div class="tv-dialog__overlay"></div>',
          containerTemplate:
            '<div class="tv-dialog__modal-wrap"><div class="tv-dialog__modal-container"><div class="tv-dialog__modal-body"></div></div></div>',
          ajaxErrorTemplate:
            '<div class="tv-dialog__error js-dialog__close">' + $.t('Error') + '</div>',
        }),
        (e.TVModal = (function(e) {
          function o() {
            var t,
              e,
              i,
              s,
              a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
            return (
              n(this, o),
              (t = r(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, c({}, C, a)))),
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
                w.push(t)
              }),
              t.options.ajax.url &&
                ((e = t.options.ajax.beforeSend || $.noop),
                (i = t.options.ajax.success || !1),
                (s = t.options.ajax.error || $.noop),
                $.extend(t.options.ajax, {
                  beforeSend: function() {
                    t.trigger('beforeLoading', [t]), t.startSpinner(), e(t)
                  },
                  success: function(e) {
                    t.trigger('afterLoading', [t]),
                      t.renderContent(i ? i(t, e) : e).showContent(),
                      t.trigger('afterLoadingShow', [t])
                  },
                  error: function() {
                    t.renderContent(t.options.ajaxErrorTemplate),
                      s(t),
                      t.trigger('errorLoading', [t])
                  },
                })),
              t.on('error', function(e, o) {
                t.$modalWrap[0].getBoundingClientRect().height <
                  t.$content[0].getBoundingClientRect().height &&
                  o.addClass('i-fixed').css({ width: t.$el.width() })
              }),
              (t._shortCutsLockId = null),
              (t._keyboardBinderLockId = null),
              t
            )
          }
          return (
            a(o, e),
            d(o, [
              {
                key: 'open',
                value: function() {
                  var t,
                    e = this
                  if (!this.opened)
                    return (
                      (this.opened = !0),
                      (this._shortCutsLockId = b.disable()),
                      (this._keyboardBinderLockId = m.disable()),
                      _.default.setFixedBodyState(!0),
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
                      _.default.isMobileSafari
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
                      this._shortCutsLockId && b.enable(this._shortCutsLockId),
                      this._keyboardBinderLockId && m.enable(this._keyboardBinderLockId),
                      this.trigger('beforeClose', [this]),
                      this.ajaxRequest && (this.ajaxRequest.abort(), delete this.ajaxRequest),
                      this.hideContent(),
                      this.$overlay.addClass('i-closed'),
                      setTimeout(function() {
                        e.$modalWrap.addClass('i-hidden').detach(),
                          e.$overlay.addClass('i-hidden').detach(),
                          (w = t.without(w, e)),
                          _.default.setFixedBodyState(!1),
                          e.trigger('afterClose', [e]),
                          e.unfocus(),
                          w.length > 0 && w[w.length - 1].focus(),
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
                    }, 0.75 * u.dur + 20),
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
                    (this.spinner = new g.Spinner('large')),
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
            o
          )
        })(f.TVDialogAbstract))
    }.call(e, o(187)))
  },
  838: function(t, e, o) {
    'use strict'
    Object.defineProperty(e, '__esModule', { value: !0 }),
      o.d(e, 'breakpoints', function() {
        return i
      })
    var i = { desktop: 1 / 0, desktopHd: 1919, phone: 767, 'phone-vertical': 479, tablet: 1019 }
  },
  839: function(t, e, o) {
    'use strict'
    ;(function(t, i) {
      function s(t) {
        return t && t.__esModule ? t : { default: t }
      }
      function n(t) {
        var e, o
        if (t && t.__esModule) return t
        if (((e = {}), null != t))
          for (o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
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
      function c() {
        y.forEach(function(t) {
          return t.close()
        })
      }
      var d, h, u, p, _, f, g, v, b, y, m, w, C, S, k, I, T
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.TVDialogAbstract = void 0),
        (d =
          Object.assign ||
          function(t) {
            var e, o, i
            for (e = 1; e < arguments.length; e++) {
              o = arguments[e]
              for (i in o) Object.prototype.hasOwnProperty.call(o, i) && (t[i] = o[i])
            }
            return t
          }),
        (h = (function() {
          function t(t, e) {
            var o, i
            for (o = 0; o < e.length; o++)
              (i = e[o]),
                (i.enumerable = i.enumerable || !1),
                (i.configurable = !0),
                'value' in i && (i.writable = !0),
                Object.defineProperty(t, i.key, i)
          }
          return function(e, o, i) {
            return o && t(e.prototype, o), i && t(e, i), e
          }
        })()),
        (e.closeAllDialogs = c),
        (u = o(184)),
        (p = n(u)),
        o(840),
        (_ = o(308)),
        (f = s(_)),
        o(841),
        o(842),
        o(834),
        (g = o(301)),
        (v = s(g)),
        (b = 0),
        (y = []),
        (m = void 0),
        (w = 110),
        (C = $(document)),
        (S = {
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
            '<div class="tv-dialog__close js-dialog__close">' + o(828) + '</div>',
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
        (I = {
          _default:
            '<div data-name="{{ name }}" class="js-dialog__action-click js-dialog__no-drag {{ class }}">{{ text }}</div>',
          'submit-success':
            '<button type="submit" class="tv-button tv-button--success">{{ text }}</button>',
        }),
        $(function() {
          S.$wrap = $(document.all && !document.querySelector ? 'html' : 'body')
        }),
        (T = (function(e) {
          function o() {
            var e,
              i,
              s,
              n,
              l,
              c = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
            for (
              r(this, o),
                e = a(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this)),
                e._id = b++,
                e.loadingActions = [],
                e.disabledActions = [],
                e.firstFocusControl = null,
                e.options = d({}, S, c),
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
                  i = function(o) {
                    var i,
                      s,
                      n,
                      r,
                      a,
                      l,
                      c = e.options.actions[o]
                    c.type || (c.type = 'default'),
                      c.class || (c.class = k[c.type] ? k[c.type] : k.default),
                      'checkbox' === c.type
                        ? ((i = new f.default({
                            labelRight: c.text,
                            name: c.name,
                            checked: c.checked,
                          })),
                          (e.actions[c.name] = i.$el.appendTo(e.$actions)),
                          e.actions[c.name].on('change', function() {
                            setTimeout(function() {
                              return e.actionDispatcher(c.name, i.checked)
                            })
                          }))
                        : (e.actions[c.name] = $(
                            t.render(c.template ? c.template : I[c.type] || I._default, c, c),
                          ).appendTo(e.$actions)),
                      c.method &&
                        'function' == typeof e[c.method] &&
                        e.on('action:' + c.name, e[c.method].bind(e)),
                      c.addClass && e.actions[c.name].addClass(c.addClass),
                      c.key &&
                        ((s = void 0),
                        'string' == typeof c.key && c.key.split('+').length > 1
                          ? ((n = []),
                            (r = c.key.split('+')),
                            (s = function(t) {
                              n = []
                            }),
                            (a = function(t) {
                              var o = '' + t.keyCode
                              ;-1 !== r.indexOf(o) && n.indexOf(o) && n.push(o),
                                e._focused &&
                                  n.length === r.length &&
                                  ((n = []), e.actionDispatcher(c.name))
                            }),
                            e.on('afterOpen', function() {
                              C.on('keydown', a), C.on('keyup', s)
                            }),
                            e.on('beforeClose', function() {
                              C.off('keydown', a), C.off('keyup', s)
                            }))
                          : ((l = $.isArray(c.key) ? c.key : [c.key]),
                            (s = function(t) {
                              !t.isDefaultPrevented() &&
                                e._focused &&
                                -1 !== l.indexOf(t.keyCode) &&
                                e.actionDispatcher(c.name)
                            }),
                            e.on('afterOpen', function() {
                              return C.on('keyup', s)
                            }),
                            e.on('beforeClose', function() {
                              return C.off('keyup', s)
                            })))
                  },
                  s = e.options.actions.length - 1;
                s >= 0;
                s--
              )
                i(s)
            return (
              e.options.help &&
                $(t.render(e.options.helpButtonTemplate, e.options.help)).prependTo(
                  e.$actions.addClass(e.options.helpActionsMod),
                ),
              e.options.closeButton &&
                ((n = $(e.options.closeButtonTemplate)),
                n.addClass(e.options.closeButtonAddClass || ''),
                (l = e.$el),
                1 === e.$el.find('.js-close-button-place').length &&
                  (l = e.$el.find('.js-close-button-place')),
                n.appendTo(l)),
              e.setZIndex(w + y.length),
              c.errorMod && (e.errorMod = c.errorMod),
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
              y.push(e),
              e
            )
          }
          return (
            l(o, e),
            h(o, [
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
                  for (var t = y.length - 1; t >= 0; t--)
                    y[t].zIndex > this.zIndex && y[t].setZIndex(y[t].zIndex - 1)
                  return this.setZIndex(w + y.length), this
                },
              },
              {
                key: 'isEventOut',
                value: function(t) {
                  var e, o, i
                  return this.options.isClickOutFn && void 0 !== (e = this.options.isClickOutFn(t))
                    ? e
                    : ((o = !0),
                      (i = $(t.target)),
                      i.get(0) !== this.$el.get(0) &&
                        ($('>*', this.$el).each(function() {
                          i.get(0) === $(this).get(0) && (o = !1),
                            0 === i.closest('HTML', $(this).get(0)).length && (o = !1)
                        }),
                        o))
                },
              },
              {
                key: 'focus',
                value: function() {
                  var t = this
                  m && m !== this && m.unfocus(),
                    this._setFocused(),
                    (this._focused = !0),
                    this.$el.addClass(this.options.focusClass),
                    this.trigger('focus', [this]),
                    setTimeout(function() {
                      C.on('mousedown.tv-dialog-unfocus-' + t._id, function(e) {
                        t.isEventOut(e) &&
                          (t.unfocus(), C.off('mousedown.tv-dialog-unfocus-' + t._id))
                      })
                    }, 20)
                },
              },
              {
                key: '_setFocused',
                value: function() {
                  m !== this && (m = this)
                },
              },
              {
                key: '_setUnfocused',
                value: function() {
                  m === this && (m = void 0)
                },
              },
              {
                key: 'unfocus',
                value: function() {
                  m === this &&
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
                    for (var e = arguments.length, o = Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
                      o[i - 1] = arguments[i]
                    this.trigger('action:' + t, [this].concat(o))
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
                        (this.disabledActions = i.without(this.disabledActions, t)),
                    this.actions[t].toggleClass('i-disabled', !e),
                    this
                  )
                },
              },
              {
                key: 'actionLoader',
                value: function(t) {
                  var e = this,
                    o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'init'
                  return (
                    this.actions[t].tvButtonLoader(o),
                    'init' === o &&
                      (this.actions[t]
                        .off('tv-button-loader:start.dialog-action')
                        .on('tv-button-loader:start.dialog-action', function() {
                          e.loadingActions.push(t)
                        }),
                      this.actions[t]
                        .off('tv-button-loader:stop.dialog-action')
                        .on('tv-button-loader:stop.dialog-action', function() {
                          e.loadingActions = i.without(e.loadingActions, t)
                        })),
                    this
                  )
                },
              },
              {
                key: 'error',
                value: function(e) {
                  var o = $(
                      t.render(this.options.errorTemplate, { error: e, errorMod: this.errorMod }),
                    ).appendTo(this.$el),
                    i = function() {
                      o.addClass('i-slided'),
                        setTimeout(function() {
                          return o.remove()
                        }, 0.75 * p.dur)
                    }
                  return (
                    setTimeout(function() {
                      return o.removeClass('i-slided')
                    }, 20),
                    C.one('touchstart mousedown keydown', i),
                    this.trigger('error', [this, o]),
                    this
                  )
                },
              },
              {
                key: 'destroy',
                value: function() {
                  y = i.without(y, this)
                  for (var t = 0; t < y.length; t++) y[t].setZIndex(w + t)
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
            o
          )
        })(v.default)),
        (e.TVDialogAbstract = T),
        C.on('keyup.tv-dialog-esc', function(t) {
          m &&
            m.options.closeOnEsc &&
            !$('.tv-dropdown__body.i-opened').length &&
            !$(t.target).closest('.js-dialog-skip-escape').length &&
            27 === t.keyCode &&
            m.close()
        })
    }.call(e, o(126), o(187)))
  },
  840: function(t, e, o) {
    'use strict'
    function i(t) {
      var e, o
      if (t && t.__esModule) return t
      if (((e = {}), null != t))
        for (o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
      return (e.default = t), e
    }
    function s(t, e) {
      if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function')
    }
    var n, r, a, l, c
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.ButtonLoader = void 0),
      (n = (function() {
        function t(t, e) {
          var o, i
          for (o = 0; o < e.length; o++)
            (i = e[o]),
              (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              'value' in i && (i.writable = !0),
              Object.defineProperty(t, i.key, i)
        }
        return function(e, o, i) {
          return o && t(e.prototype, o), i && t(e, i), e
        }
      })()),
      (r = o(309)),
      (a = o(184)),
      (l = i(a)),
      ($.fn.tvButtonLoader = (0, r.createTvBlockWithInstance)('tv-button-loader', function(t, e) {
        return new c(t, e)
      })),
      (c = e.ButtonLoader = (function() {
        function t(e, o) {
          s(this, t),
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
          n(t, [
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
  843: function(t, e, o) {
    'use strict'
    function i(t) {
      return t && t.__esModule ? t : { default: t }
    }
    function s(t) {
      var e, o
      if (t && t.__esModule) return t
      if (((e = {}), null != t))
        for (o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
      return (e.default = t), e
    }
    function n(t, e) {
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
    var l, c, d, h, u, p, _, f, g, v, b, y, m
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.TVPopup = void 0),
      (l =
        Object.assign ||
        function(t) {
          var e, o, i
          for (e = 1; e < arguments.length; e++) {
            o = arguments[e]
            for (i in o) Object.prototype.hasOwnProperty.call(o, i) && (t[i] = o[i])
          }
          return t
        }),
      (c = (function() {
        function t(t, e) {
          var o, i
          for (o = 0; o < e.length; o++)
            (i = e[o]),
              (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              'value' in i && (i.writable = !0),
              Object.defineProperty(t, i.key, i)
        }
        return function(e, o, i) {
          return o && t(e.prototype, o), i && t(e, i), e
        }
      })()),
      (d = o(184)),
      (h = s(d)),
      (u = o(832)),
      (p = i(u)),
      (_ = o(690)),
      (f = o(833)),
      (g = o(827)),
      (v = $('body')),
      (b = $(window)),
      (y = {
        closeOnClickAtOtherDialogs: !0,
        draggable: !0,
        scrollWrap: '<div class="tv-dialog__scroll-wrap">',
        scrollWrapInner: '<div class="tv-dialog__scroll-wrap-inner">',
        withScroll: !0,
      }),
      (m = 'js-dialog__scroll-wrap'),
      (e.TVPopup = (function(t) {
        function e() {
          var t,
            o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
          return (
            n(this, e),
            (t = r(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, l({}, y, o)))),
            (t.$scrollWrap = t.$content.hasClass(m) ? t.$content : t.$content.find('.' + m)),
            t.$scrollWrap.length
              ? (t.$scrollWrapInner = t.$scrollWrap.children().first())
              : ((t.$scrollWrap = t.$content.wrap($(t.options.scrollWrap)).parent()),
                (t.$scrollWrapInner = t.$content.wrap($(t.options.scrollWrapInner)).parent())),
            t.$actions && t.$scrollWrap.addClass('i-with-actions'),
            t.options.withScroll &&
              ((t.scroll = new f.SidebarCustomScroll(t.$scrollWrap, t.$scrollWrapInner)),
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
                      var o = $(e.target).closest('.js-dialog')
                      ;(t.options.closeOnClickAtOtherDialogs || 0 === o.length) &&
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
              t.opened ? (t.close(), setTimeout(e, h.dur / 2)) : e()
            }),
            t
          )
        }
        return (
          a(e, t),
          c(e, [
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
                          var e, o, i, s, n
                          return (
                            t.calcHeight(),
                            (e = b.height()),
                            (o = b.width()),
                            (i = t.$el.height()),
                            (s = t.$el.width()),
                            (n = t.options.position),
                            n || (n = { top: e / 2 - i / 2, left: o / 2 - s / 2 }),
                            n.top > e - i && (n.top = e - i),
                            n.left > o - s && (n.left = o - s),
                            n
                          )
                        })(),
                      ),
                    this.focus(),
                    this.toTop(),
                    this._doOpenAnimation().then(function() {
                      t.opened &&
                        (t.$el.removeClass('i-closed'),
                        t.options.draggable &&
                          ((0, g.lazyJqueryUI)(t.$el).draggable({
                            handle: '.js-dialog__drag',
                            cancel:
                              'input, textarea, button, select, option, .js-dialog__no-drag, .js-dialog__close',
                            containment: 'window',
                            cursor: '-webkit-grabbing',
                          }),
                          t.$el.find('.js-dialog__drag').addClass('tv-dialog__grab')),
                        t.trigger('afterOpen', [t]))
                    }),
                    b.on('resize.tv-popup-' + this.id, function() {
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
                        ((0, g.lazyJqueryUI)(t.$el)
                          .draggable('instance')
                          .then(function(t) {
                            t && t.destroy()
                          }),
                        t.$el.addClass('i-hidden').detach(),
                        v.css('cursor', 'auto'),
                        t.trigger('afterClose', [t]),
                        t.options.destroyOnClose && t.destroy())
                    }),
                    b.off('resize.tv-popup-' + this.id),
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
                  o = this.$el[0].getBoundingClientRect(),
                  i = this.$scrollWrapInner[0].getBoundingClientRect(),
                  s = this.$scrollWrap[0].getBoundingClientRect(),
                  n =
                    this.options.height && this.options.height < p.default.height - 20
                      ? this.options.height
                      : p.default.height - 20
                this.$scrollWrap.css({ height: '' }).removeClass('i-scrollable'),
                  (t = this.$el[0].getBoundingClientRect()),
                  (this.options.height || t.height > n) &&
                    ((n -= o.height - s.height),
                    n < 60 && (n = 60),
                    this.$scrollWrap.css({ height: n })),
                  this.options.withScroll && this.scroll.resize(),
                  (e = n < i.height),
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
      })(_.TVDialogAbstract))
  },
  873: function(t, e) {
    t.exports =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8.5 1.5L3.5 7l5 5.5"/></svg>'
  },
  876: function(t, e) {},
  973: function(t, e) {
    t.exports =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5.5 1.5l5 5.5-5 5.5"/></svg>'
  },
})
