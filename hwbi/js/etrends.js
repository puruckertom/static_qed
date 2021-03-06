/*! etrends 18-08-2016 */ ! function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], function(c) {
        return b(c, a, a.document, a.Math)
    }) : "undefined" != typeof exports ? module.exports = b(require("jquery"), a, a.document, a.Math) : b(jQuery, a, a.document, a.Math)
}


("undefined" != typeof window ? window : this, function(a, b, c, d, e) {
    "use strict";
    var f, g = "fullpage-wrapper",
        h = "." + g,
        i = "fp-scrollable",
        j = "." + i,
        k = ".slimScrollBar",
        l = ".slimScrollRail",
        m = "fp-responsive",
        n = "fp-notransition",
        o = "fp-destroyed",
        p = "fp-enabled",
        q = "fp-viewing",
        r = "active",
        s = "." + r,
        t = "fp-completely",
        u = "." + t,
        v = ".section",
        w = "fp-section",
        x = "." + w,
        y = x + s,
        z = x + ":first",
        A = x + ":last",
        B = "fp-tableCell",
        C = "." + B,
        D = "fp-auto-height",
        E = "fp-normal-scroll",
        F = "fp-nav",
        G = "#" + F,
        H = "fp-tooltip",
        I = "." + H,
        J = "fp-show-active",
        K = ".slide",
        L = "fp-slide",
        M = "." + L,
        N = M + s,
        O = "fp-slides",
        P = "." + O,
        Q = "fp-slidesContainer",
        R = "." + Q,
        S = "fp-table",
        T = "fp-slidesNav",
        U = "." + T,
        V = U + " a",
        W = "fp-controlArrow",
        X = "." + W,
        Y = "fp-prev",
        Z = "." + Y,
        $ = W + " " + Y,
        _ = X + Z,
        aa = "fp-next",
        ba = "." + aa,
        ca = W + " " + aa,
        da = X + ba,
        ea = a(b),
        fa = a(c);
    a.fn.fullpage = function(i) {
        function j() {
            i.css3 && (i.css3 = rb()), i.scrollBar = i.scrollBar || i.hybrid, l(), W(), Kb.setAllowScrolling(!0), Kb.setAutoScrolling(i.autoScrolling, "internal");
            var b = a(y).find(N);
            b.length && (0 !== a(y).index(x) || 0 === a(y).index(x) && 0 !== b.index()) && Ab(b), Xa(), qb(), ea.on("load", function() {
                Ia()
            })
        }

        function k() {
            ea.on("scroll", la).on("hashchange", Ja).blur(Qa).resize(Wa), fa.keydown(Ka).keyup(Ma).on("click touchstart", G + " a", Ra).on("click touchstart", V, Sa).on("click", I, La), a(x).on("click touchstart", X, Pa), i.normalScrollElements && (fa.on("mouseenter", i.normalScrollElements, function() {
                Kb.setMouseWheelScrolling(!1)
            }), fa.on("mouseleave", i.normalScrollElements, function() {
                Kb.setMouseWheelScrolling(!0)
            }))
        }

        function l() {
            i.anchors.length || (i.anchors = a(i.sectionSelector + "[data-anchor]").map(function() {
                return a(this).data("anchor").toString()
            }).get()), i.navigationTooltips.length || (i.navigationTooltips = a(i.sectionSelector + "[data-tooltip]").map(function() {
                return a(this).data("tooltip").toString()
            }).get())
        }

        function W() {
            Rb.css({
                height: "100%",
                position: "relative"
            }), Rb.addClass(g), a("html").addClass(p), Sb = ea.height(), Rb.removeClass(o), ga(), a(x).each(function(b) {
                var c = a(this),
                    d = c.find(M),
                    e = d.length;
                aa(c, b), ba(c, b), e > 0 ? Z(c, d, e) : i.verticalCentered && fb(c)
            }), i.fixedElements && i.css3 && a(i.fixedElements).appendTo(Jb), i.navigation && ia(), i.scrollOverflow ? ("complete" === c.readyState && ja(), ea.on("load", ja)) : ka()
        }

        function Z(b, c, d) {
            var e = 100 * d,
                f = 100 / d;
            c.wrapAll('<div class="' + Q + '" />'), c.parent().wrap('<div class="' + O + '" />'), b.find(R).css("width", e + "%"), d > 1 && (i.controlArrows && ha(b), i.slidesNavigation && mb(b, d)), c.each(function(b) {
                a(this).css("width", f + "%"), i.verticalCentered && fb(a(this))
            });
            var g = b.find(N);
            g.length && (0 !== a(y).index(x) || 0 === a(y).index(x) && 0 !== g.index()) ? Ab(g) : c.eq(0).addClass(r)
        }

        function aa(b, c) {
            c || 0 !== a(y).length || b.addClass(r), b.css("height", Sb + "px"), i.paddingTop && b.css("padding-top", i.paddingTop), i.paddingBottom && b.css("padding-bottom", i.paddingBottom), "undefined" != typeof i.sectionsColor[c] && b.css("background-color", i.sectionsColor[c]), "undefined" != typeof i.anchors[c] && b.attr("data-anchor", i.anchors[c])
        }

        function ba(b, c) {
            "undefined" != typeof i.anchors[c] && b.hasClass(r) && bb(i.anchors[c], c), i.menu && i.css3 && a(i.menu).closest(h).length && a(i.menu).appendTo(Jb)
        }

        function ga() {
            a(i.sectionSelector).each(function() {
                a(this).addClass(w)
            }), a(i.slideSelector).each(function() {
                a(this).addClass(L)
            })
        }

        function ha(a) {
            a.find(P).after('<div class="' + $ + '"></div><div class="' + ca + '"></div>'), "#fff" != i.controlArrowColor && (a.find(da).css("border-color", "transparent transparent transparent " + i.controlArrowColor), a.find(_).css("border-color", "transparent " + i.controlArrowColor + " transparent transparent")), i.loopHorizontal || a.find(_).hide()
        }

        function ia() {
            Jb.append('<div id="' + F + '"><ul></ul></div>');
            var b = a(G);
            b.addClass(function() {
                return i.showActiveTooltip ? J + " " + i.navigationPosition : i.navigationPosition
            });
            for (var c = 0; c < a(x).length; c++) {
                var d = "";
                i.anchors.length && (d = i.anchors[c]);
                var e = '<li><a href="#' + d + '"><span></span></a>',
                    f = i.navigationTooltips[c];
                "undefined" != typeof f && "" !== f && (e += '<div class="' + H + " " + i.navigationPosition + '">' + f + "</div>"), e += "</li>", b.find("ul").append(e)
            }
            a(G).css("margin-top", "-" + a(G).height() / 2 + "px"), a(G).find("li").eq(a(y).index(x)).find("a").addClass(r)
        }

        function ja() {
            a(x).each(function() {
                var b = a(this).find(M);
                b.length ? b.each(function() {
                    eb(a(this))
                }) : eb(a(this))
            }), ka()
        }

        function ka() {
            var b = a(y);
            b.addClass(t), i.scrollOverflowHandler.afterRender && i.scrollOverflowHandler.afterRender(b), Ea(b), Fa(b), a.isFunction(i.afterLoad) && i.afterLoad.call(b, b.data("anchor"), b.index(x) + 1), a.isFunction(i.afterRender) && i.afterRender.call(Rb)
        }

        function la() {
            var b;
            if (!i.autoScrolling || i.scrollBar) {
                for (var d = ea.scrollTop(), e = na(d), f = 0, g = d + ea.height() / 2, h = c.querySelectorAll(x), j = 0; j < h.length; ++j) {
                    var k = h[j];
                    k.offsetTop <= g && (f = j)
                }
                if (ma(e) && (a(y).hasClass(t) || a(y).addClass(t).siblings().removeClass(t)), b = a(h).eq(f), !b.hasClass(r)) {
                    dc = !0;
                    var l = a(y),
                        m = l.index(x) + 1,
                        n = cb(b),
                        o = b.data("anchor"),
                        p = b.index(x) + 1,
                        q = b.find(N);
                    if (q.length) var s = q.data("anchor"),
                        u = q.index();
                    Vb && (b.addClass(r).siblings().removeClass(r), a.isFunction(i.onLeave) && i.onLeave.call(l, m, p, n), a.isFunction(i.afterLoad) && i.afterLoad.call(b, o, p), Ea(b), bb(o, p - 1), i.anchors.length && (Lb = o, nb(u, s, o, p))), clearTimeout(_b), _b = setTimeout(function() {
                        dc = !1
                    }, 100)
                }
                i.fitToSection && (clearTimeout(ac), ac = setTimeout(function() {
                    Vb && i.fitToSection && (a(y).is(b) && (Tb = !0), ya(a(y)), Tb = !1)
                }, i.fitToSectionDelay))
            }
        }

        function ma(b) {
            var c = a(y).position().top,
                d = c + ea.height();
            return "up" == b ? d >= ea.scrollTop() + ea.height() : c <= ea.scrollTop()
        }

        function na(a) {
            var b = a > ec ? "down" : "up";
            return ec = a, b
        }

        function oa(a, b) {
            if (Xb.m[a]) {
                var c, d;
                if ("down" == a ? (c = "bottom", d = Kb.moveSectionDown) : (c = "top", d = Kb.moveSectionUp), b.length > 0) {
                    if (!i.scrollOverflowHandler.isScrolled(c, b)) return !0;
                    d()
                } else d()
            }
        }

        function pa(b) {
            var c = b.originalEvent;
            if (!qa(b.target) && ra(c)) {
                i.autoScrolling && b.preventDefault();
                var e = a(y),
                    f = i.scrollOverflowHandler.scrollable(e);
                if (Vb && !Ob) {
                    var g = zb(c);
                    hc = g.y, ic = g.x, e.find(P).length && d.abs(gc - ic) > d.abs(fc - hc) ? d.abs(gc - ic) > ea.outerWidth() / 100 * i.touchSensitivity && (gc > ic ? Xb.m.right && Kb.moveSlideRight() : Xb.m.left && Kb.moveSlideLeft()) : i.autoScrolling && d.abs(fc - hc) > ea.height() / 100 * i.touchSensitivity && (fc > hc ? oa("down", f) : hc > fc && oa("up", f))
                }
            }
        }

        function qa(b, c) {
            c = c || 0;
            var d = a(b).parent();
            return !!(c < i.normalScrollElementTouchThreshold && d.is(i.normalScrollElements)) || c != i.normalScrollElementTouchThreshold && qa(d, ++c)
        }

        function ra(a) {
            return "undefined" == typeof a.pointerType || "mouse" != a.pointerType
        }

        function sa(a) {
            var b = a.originalEvent;
            if (i.fitToSection && Ib.stop(), ra(b)) {
                var c = zb(b);
                fc = c.y, gc = c.x
            }
        }

        function ta(a, b) {
            for (var c = 0, e = a.slice(d.max(a.length - b, 1)), f = 0; f < e.length; f++) c += e[f];
            return d.ceil(c / b)
        }

        function ua(c) {
            var e = (new Date).getTime(),
                f = a(u).hasClass(E);
            if (i.autoScrolling && !Nb && !f) {
                c = c || b.event;
                var g = c.wheelDelta || -c.deltaY || -c.detail,
                    h = d.max(-1, d.min(1, g)),
                    j = "undefined" != typeof c.wheelDeltaX || "undefined" != typeof c.deltaX,
                    k = d.abs(c.wheelDeltaX) < d.abs(c.wheelDelta) || d.abs(c.deltaX) < d.abs(c.deltaY) || !j;
                Wb.length > 149 && Wb.shift(), Wb.push(d.abs(g)), i.scrollBar && (c.preventDefault ? c.preventDefault() : c.returnValue = !1);
                var l = a(y),
                    m = i.scrollOverflowHandler.scrollable(l),
                    n = e - jc;
                if (jc = e, n > 200 && (Wb = []), Vb) {
                    var o = ta(Wb, 10),
                        p = ta(Wb, 70),
                        q = o >= p;
                    q && k && (h < 0 ? oa("down", m) : oa("up", m))
                }
                return !1
            }
            i.fitToSection && Ib.stop()
        }

        function va(b, c) {
            var d = "undefined" == typeof c ? a(y) : c,
                e = d.find(P),
                f = e.find(M).length;
            if (!(!e.length || Ob || f < 2)) {
                var g = e.find(N),
                    h = null;
                if (h = "prev" === b ? g.prev(M) : g.next(M), !h.length) {
                    if (!i.loopHorizontal) return;
                    h = "prev" === b ? g.siblings(":last") : g.siblings(":first")
                }
                Ob = !0, Va(e, h)
            }
        }

        function wa() {
            a(N).each(function() {
                Ab(a(this), "internal")
            })
        }

        function xa(a) {
            var b = a.position(),
                c = b.top,
                d = b.top > kc,
                e = c - Sb + a.outerHeight();
            return a.outerHeight() > Sb ? d || (c = e) : (d || Tb && a.is(":last-child")) && (c = e), kc = c, c
        }

        function ya(b, c, d) {
            if ("undefined" != typeof b) {
                var e = xa(b),
                    f = {
                        element: b,
                        callback: c,
                        isMovementUp: d,
                        dtop: e,
                        yMovement: cb(b),
                        anchorLink: b.data("anchor"),
                        sectionIndex: b.index(x),
                        activeSlide: b.find(N),
                        activeSection: a(y),
                        leavingSection: a(y).index(x) + 1,
                        localIsResizing: Tb
                    };
                if (!(f.activeSection.is(b) && !Tb || i.scrollBar && ea.scrollTop() === f.dtop && !b.hasClass(D))) {
                    if (f.activeSlide.length) var g = f.activeSlide.data("anchor"),
                        h = f.activeSlide.index();
                    i.autoScrolling && i.continuousVertical && "undefined" != typeof f.isMovementUp && (!f.isMovementUp && "up" == f.yMovement || f.isMovementUp && "down" == f.yMovement) && (f = Ba(f)), a.isFunction(i.onLeave) && !f.localIsResizing && i.onLeave.call(f.activeSection, f.leavingSection, f.sectionIndex + 1, f.yMovement) === !1 || (Ga(f.activeSection), b.addClass(r).siblings().removeClass(r), Ea(b), Vb = !1, nb(h, g, f.anchorLink, f.sectionIndex), za(f), Lb = f.anchorLink, bb(f.anchorLink, f.sectionIndex))
                }
            }
        }

        function za(b) {
            if (i.css3 && i.autoScrolling && !i.scrollBar) {
                var c = "translate3d(0px, -" + b.dtop + "px, 0px)";
                hb(c, !0), i.scrollingSpeed ? Zb = setTimeout(function() {
                    Da(b)
                }, i.scrollingSpeed) : Da(b)
            } else {
                var d = Aa(b);
                a(d.element).animate(d.options, i.scrollingSpeed, i.easing).promise().done(function() {
                    i.scrollBar ? setTimeout(function() {
                        Da(b)
                    }, 30) : Da(b)
                })
            }
        }

        function Aa(a) {
            var b = {};
            return i.autoScrolling && !i.scrollBar ? (b.options = {
                top: -a.dtop
            }, b.element = h) : (b.options = {
                scrollTop: a.dtop
            }, b.element = "html, body"), b
        }

        function Ba(b) {
            return b.isMovementUp ? a(y).before(b.activeSection.nextAll(x)) : a(y).after(b.activeSection.prevAll(x).get().reverse()), Bb(a(y).position().top), wa(), b.wrapAroundElements = b.activeSection, b.dtop = b.element.position().top, b.yMovement = cb(b.element), b
        }

        function Ca(b) {
            b.wrapAroundElements && b.wrapAroundElements.length && (b.isMovementUp ? a(z).before(b.wrapAroundElements) : a(A).after(b.wrapAroundElements), Bb(a(y).position().top), wa())
        }

        function Da(b) {
            Ca(b), b.element.find(".fp-scrollable").mouseover(), a.isFunction(i.afterLoad) && !b.localIsResizing && i.afterLoad.call(b.element, b.anchorLink, b.sectionIndex + 1), Fa(b.element), b.element.addClass(t).siblings().removeClass(t), Vb = !0, a.isFunction(b.callback) && b.callback.call(this)
        }

        function Ea(b) {
            var b = Ha(b);
            b.find("img[data-src], source[data-src], audio[data-src]").each(function() {
                a(this).attr("src", a(this).data("src")), a(this).removeAttr("data-src"), a(this).is("source") && a(this).closest("video").get(0).load()
            })
        }

        function Fa(b) {
            var b = Ha(b);
            b.find("video, audio").each(function() {
                var b = a(this).get(0);
                b.hasAttribute("autoplay") && "function" == typeof b.play && b.play()
            })
        }

        function Ga(b) {
            var b = Ha(b);
            b.find("video, audio").each(function() {
                var b = a(this).get(0);
                b.hasAttribute("data-ignore") || "function" != typeof b.pause || b.pause()
            })
        }

        function Ha(b) {
            var c = b.find(N);
            return c.length && (b = a(c)), b
        }

        function Ia() {
            var a = b.location.hash.replace("#", "").split("/"),
                c = a[0],
                d = a[1];
            c && (i.animateAnchor ? kb(c, d) : Kb.silentMoveTo(c, d))
        }

        function Ja() {
            if (!dc && !i.lockAnchors) {
                var a = b.location.hash.replace("#", "").split("/"),
                    c = a[0],
                    d = a[1],
                    e = "undefined" == typeof Lb,
                    f = "undefined" == typeof Lb && "undefined" == typeof d && !Ob;
                c.length && (c && c !== Lb && !e || f || !Ob && Mb != d) && kb(c, d)
            }
        }

        function Ka(b) {
            clearTimeout(bc);
            var c = a(":focus");
            if (!c.is("textarea") && !c.is("input") && !c.is("select") && "true" !== c.attr("contentEditable") && "" !== c.attr("contentEditable") && i.keyboardScrolling && i.autoScrolling) {
                var d = b.which,
                    e = [40, 38, 32, 33, 34];
                a.inArray(d, e) > -1 && b.preventDefault(), Nb = b.ctrlKey, bc = setTimeout(function() {
                    Ta(b)
                }, 150)
            }
        }

        function La() {
            a(this).prev().trigger("click")
        }

        function Ma(a) {
            Ub && (Nb = a.ctrlKey)
        }

        function Na(a) {
            2 == a.which && (lc = a.pageY, Rb.on("mousemove", Ua))
        }

        function Oa(a) {
            2 == a.which && Rb.off("mousemove")
        }

        function Pa() {
            var b = a(this).closest(x);
            a(this).hasClass(Y) ? Xb.m.left && Kb.moveSlideLeft(b) : Xb.m.right && Kb.moveSlideRight(b)
        }

        function Qa() {
            Ub = !1, Nb = !1
        }

        function Ra(b) {
            b.preventDefault();
            var c = a(this).parent().index();
            ya(a(x).eq(c))
        }

        function Sa(b) {
            b.preventDefault();
            var c = a(this).closest(x).find(P),
                d = c.find(M).eq(a(this).closest("li").index());
            Va(c, d)
        }

        function Ta(b) {
            var c = b.shiftKey;
            switch (b.which) {
                case 38:
                case 33:
                    Xb.k.up && Kb.moveSectionUp();
                    break;
                case 32:
                    if (c && Xb.k.up) {
                        Kb.moveSectionUp();
                        break
                    }
                case 40:
                case 34:
                    Xb.k.down && Kb.moveSectionDown();
                    break;
                case 36:
                    Xb.k.up && Kb.moveTo(1);
                    break;
                case 35:
                    Xb.k.down && Kb.moveTo(a(x).length);
                    break;
                case 37:
                    Xb.k.left && Kb.moveSlideLeft();
                    break;
                case 39:
                    Xb.k.right && Kb.moveSlideRight();
                    break;
                default:
                    return
            }
        }

        function Ua(a) {
            Vb && (a.pageY < lc && Xb.m.up ? Kb.moveSectionUp() : a.pageY > lc && Xb.m.down && Kb.moveSectionDown()), lc = a.pageY
        }

        function Va(b, c) {
            var e = c.position(),
                f = c.index(),
                g = b.closest(x),
                h = g.index(x),
                j = g.data("anchor"),
                k = g.find(U),
                l = pb(c),
                m = g.find(N),
                n = Tb;
            if (i.onSlideLeave) {
                var o = m.index(),
                    p = db(o, f);
                if (!n && "none" !== p && a.isFunction(i.onSlideLeave) && i.onSlideLeave.call(m, j, h + 1, o, p, f) === !1) return void(Ob = !1)
            }
            Ga(m), c.addClass(r).siblings().removeClass(r), n || Ea(c), !i.loopHorizontal && i.controlArrows && (g.find(_).toggle(0 !== f), g.find(da).toggle(!c.is(":last-child"))), g.hasClass(r) && nb(f, l, j, h);
            var q = function() {
                n || a.isFunction(i.afterSlideLoad) && i.afterSlideLoad.call(c, j, h + 1, l, f), Fa(c), Ob = !1
            };
            if (i.css3) {
                var t = "translate3d(-" + d.round(e.left) + "px, 0px, 0px)";
                Ya(b.find(R), i.scrollingSpeed > 0).css(Cb(t)), $b = setTimeout(function() {
                    q()
                }, i.scrollingSpeed, i.easing)
            } else b.animate({
                scrollLeft: d.round(e.left)
            }, i.scrollingSpeed, i.easing, function() {
                q()
            });
            k.find(s).removeClass(r), k.find("li").eq(f).find("a").addClass(r)
        }

        function Wa() {
            if (Xa(), Pb) {
                var b = a(c.activeElement);
                if (!b.is("textarea") && !b.is("input") && !b.is("select")) {
                    var e = ea.height();
                    d.abs(e - mc) > 20 * d.max(mc, e) / 100 && (Kb.reBuild(!0), mc = e)
                }
            } else clearTimeout(Yb), Yb = setTimeout(function() {
                Kb.reBuild(!0)
            }, 350)
        }

        function Xa() {
            var a = i.responsive || i.responsiveWidth,
                b = i.responsiveHeight,
                c = a && ea.outerWidth() < a,
                d = b && ea.height() < b;
            a && b ? Kb.setResponsive(c || d) : a ? Kb.setResponsive(c) : b && Kb.setResponsive(d)
        }

        function Ya(a) {
            var b = "all " + i.scrollingSpeed + "ms " + i.easingcss3;
            return a.removeClass(n), a.css({
                "-webkit-transition": b,
                transition: b
            })
        }

        function Za(a) {
            return a.addClass(n)
        }

        function $a(a, b) {
            var c = 825,
                e = 900;
            if (a < c || b < e) {
                var f = 100 * a / c,
                    g = 100 * b / e,
                    h = d.min(f, g),
                    i = h.toFixed(2);
                Jb.css("font-size", i + "%")
            } else Jb.css("font-size", "100%")
        }

        function _a(b, c) {
            i.navigation && (a(G).find(s).removeClass(r), b ? a(G).find('a[href="#' + b + '"]').addClass(r) : a(G).find("li").eq(c).find("a").addClass(r))
        }

        function ab(b) {
            i.menu && (a(i.menu).find(s).removeClass(r), a(i.menu).find('[data-menuanchor="' + b + '"]').addClass(r))
        }

        function bb(a, b) {
            ab(a), _a(a, b)
        }

        function cb(b) {
            var c = a(y).index(x),
                d = b.index(x);
            return c == d ? "none" : c > d ? "up" : "down"
        }

        function db(a, b) {
            return a == b ? "none" : a > b ? "left" : "right"
        }

        function eb(a) {
            a.css("overflow", "hidden");
            var b, c = i.scrollOverflowHandler,
                d = c.wrapContent(),
                e = a.closest(x),
                f = c.scrollable(a);
            f.length ? b = c.scrollHeight(a) : (b = a.get(0).scrollHeight, i.verticalCentered && (b = a.find(C).get(0).scrollHeight));
            var g = Sb - parseInt(e.css("padding-bottom")) - parseInt(e.css("padding-top"));
            b > g ? f.length ? c.update(a, g) : (i.verticalCentered ? a.find(C).wrapInner(d) : a.wrapInner(d), c.create(a, g)) : c.remove(a), a.css("overflow", "")
        }

        function fb(a) {
            a.addClass(S).wrapInner('<div class="' + B + '" style="height:' + gb(a) + 'px;" />')
        }

        function gb(a) {
            var b = Sb;
            if (i.paddingTop || i.paddingBottom) {
                var c = a;
                c.hasClass(w) || (c = a.closest(x));
                var d = parseInt(c.css("padding-top")) + parseInt(c.css("padding-bottom"));
                b = Sb - d
            }
            return b
        }

        function hb(a, b) {
            b ? Ya(Rb) : Za(Rb), Rb.css(Cb(a)), setTimeout(function() {
                Rb.removeClass(n)
            }, 10)
        }

        function ib(b) {
            var c = Rb.find(x + '[data-anchor="' + b + '"]');
            return c.length || (c = a(x).eq(b - 1)), c
        }

        function jb(a, b) {
            var c = b.find(P),
                d = c.find(M + '[data-anchor="' + a + '"]');
            return d.length || (d = c.find(M).eq(a)), d
        }

        function kb(a, b) {
            var c = ib(a);
            "undefined" == typeof b && (b = 0), a === Lb || c.hasClass(r) ? lb(c, b) : ya(c, function() {
                lb(c, b)
            })
        }

        function lb(a, b) {
            if ("undefined" != typeof b) {
                var c = a.find(P),
                    d = jb(b, a);
                d.length && Va(c, d)
            }
        }

        function mb(a, b) {
            a.append('<div class="' + T + '"><ul></ul></div>');
            var c = a.find(U);
            c.addClass(i.slidesNavPosition);
            for (var d = 0; d < b; d++) c.find("ul").append('<li><a href="#"><span></span></a></li>');
            c.css("margin-left", "-" + c.width() / 2 + "px"), c.find("li").first().find("a").addClass(r)
        }

        function nb(a, b, c, d) {
            var e = "";
            i.anchors.length && !i.lockAnchors && (a ? ("undefined" != typeof c && (e = c), "undefined" == typeof b && (b = a), Mb = b, ob(e + "/" + b)) : "undefined" != typeof a ? (Mb = b, ob(c)) : ob(c)), qb()
        }

        function ob(a) {
            if (i.recordHistory) location.hash = a;
            else if (Pb || Qb) b.history.replaceState(e, e, "#" + a);
            else {
                var c = b.location.href.split("#")[0];
                b.location.replace(c + "#" + a)
            }
        }

        function pb(a) {
            var b = a.data("anchor"),
                c = a.index();
            return "undefined" == typeof b && (b = c), b
        }

        function qb() {
            var b = a(y),
                c = b.find(N),
                d = pb(b),
                e = pb(c),
                f = (b.index(x), String(d));
            c.length && (f = f + "-" + e), f = f.replace("/", "-").replace("#", "");
            var g = new RegExp("\\b\\s?" + q + "-[^\\s]+\\b", "g");
            Jb[0].className = Jb[0].className.replace(g, ""), Jb.addClass(q + "-" + f)
        }

        function rb() {
            var a, d = c.createElement("p"),
                f = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            c.body.insertBefore(d, null);
            for (var g in f) d.style[g] !== e && (d.style[g] = "translate3d(1px,1px,1px)", a = b.getComputedStyle(d).getPropertyValue(f[g]));
            return c.body.removeChild(d), a !== e && a.length > 0 && "none" !== a
        }

        function sb() {
            c.addEventListener ? (c.removeEventListener("mousewheel", ua, !1), c.removeEventListener("wheel", ua, !1), c.removeEventListener("MozMousePixelScroll", ua, !1)) : c.detachEvent("onmousewheel", ua)
        }

        function tb() {
            var a, d = "";
            b.addEventListener ? a = "addEventListener" : (a = "attachEvent", d = "on");
            var f = "onwheel" in c.createElement("div") ? "wheel" : c.onmousewheel !== e ? "mousewheel" : "DOMMouseScroll";
            "DOMMouseScroll" == f ? c[a](d + "MozMousePixelScroll", ua, !1) : c[a](d + f, ua, !1)
        }

        function ub() {
            Rb.on("mousedown", Na).on("mouseup", Oa)
        }

        function vb() {
            Rb.off("mousedown", Na).off("mouseup", Oa)
        }

        function wb() {
            if (Pb || Qb) {
                var b = yb();
                a(h).off("touchstart " + b.down).on("touchstart " + b.down, sa), a(h).off("touchmove " + b.move).on("touchmove " + b.move, pa)
            }
        }

        function xb() {
            if (Pb || Qb) {
                var b = yb();
                a(h).off("touchstart " + b.down), a(h).off("touchmove " + b.move)
            }
        }

        function yb() {
            var a;
            return a = b.PointerEvent ? {
                down: "pointerdown",
                move: "pointermove"
            } : {
                down: "MSPointerDown",
                move: "MSPointerMove"
            }
        }

        function zb(a) {
            var b = [];
            return b.y = "undefined" != typeof a.pageY && (a.pageY || a.pageX) ? a.pageY : a.touches[0].pageY, b.x = "undefined" != typeof a.pageX && (a.pageY || a.pageX) ? a.pageX : a.touches[0].pageX, Qb && ra(a) && i.scrollBar && (b.y = a.touches[0].pageY, b.x = a.touches[0].pageX), b
        }

        function Ab(a, b) {
            Kb.setScrollingSpeed(0, "internal"), "undefined" != typeof b && (Tb = !0), Va(a.closest(P), a), "undefined" != typeof b && (Tb = !1), Kb.setScrollingSpeed(cc.scrollingSpeed, "internal")
        }

        function Bb(a) {
            if (i.scrollBar) Rb.scrollTop(a);
            else if (i.css3) {
                var b = "translate3d(0px, -" + a + "px, 0px)";
                hb(b, !1)
            } else Rb.css("top", -a)
        }

        function Cb(a) {
            return {
                "-webkit-transform": a,
                "-moz-transform": a,
                "-ms-transform": a,
                transform: a
            }
        }

        function Db(a, b, c) {
            switch (b) {
                case "up":
                    Xb[c].up = a;
                    break;
                case "down":
                    Xb[c].down = a;
                    break;
                case "left":
                    Xb[c].left = a;
                    break;
                case "right":
                    Xb[c].right = a;
                    break;
                case "all":
                    "m" == c ? Kb.setAllowScrolling(a) : Kb.setKeyboardScrolling(a)
            }
        }

        function Eb() {
            Bb(0), a(G + ", " + U + ", " + X).remove(), a(x).css({
                height: "",
                "background-color": "",
                padding: ""
            }), a(M).css({
                width: ""
            }), Rb.css({
                height: "",
                position: "",
                "-ms-touch-action": "",
                "touch-action": ""
            }), Ib.css({
                overflow: "",
                height: ""
            }), a("html").removeClass(p), a.each(Jb.get(0).className.split(/\s+/), function(a, b) {
                0 === b.indexOf(q) && Jb.removeClass(b)
            }), a(x + ", " + M).each(function() {
                i.scrollOverflowHandler.remove(a(this)), a(this).removeClass(S + " " + r)
            }), Za(Rb), Rb.find(C + ", " + R + ", " + P).each(function() {
                a(this).replaceWith(this.childNodes)
            }), Ib.scrollTop(0);
            var b = [w, L, Q];
            a.each(b, function(b, c) {
                a("." + c).removeClass(c)
            })
        }

        function Fb(a, b, c) {
            i[a] = b, "internal" !== c && (cc[a] = b)
        }

        function Gb() {
            return a("html").hasClass(p) ? void Hb("error", "Fullpage.js can only be initialized once and you are doing it multiple times!") : (i.continuousVertical && (i.loopTop || i.loopBottom) && (i.continuousVertical = !1, Hb("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), i.scrollBar && i.scrollOverflow && Hb("warn", "Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox"), i.continuousVertical && i.scrollBar && (i.continuousVertical = !1, Hb("warn", "Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), void a.each(i.anchors, function(b, c) {
                var d = fa.find("[name]").filter(function() {
                        return a(this).attr("name") && a(this).attr("name").toLowerCase() == c.toLowerCase()
                    }),
                    e = fa.find("[id]").filter(function() {
                        return a(this).attr("id") && a(this).attr("id").toLowerCase() == c.toLowerCase()
                    });
                (e.length || d.length) && (Hb("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."), e.length && Hb("error", '"' + c + '" is is being used by another element `id` property'), d.length && Hb("error", '"' + c + '" is is being used by another element `name` property'))
            }))
        }

        function Hb(a, b) {
            console && console[a] && console[a]("fullPage: " + b)
        }
        if (a("html").hasClass(p)) return void Gb();
        var Ib = a("html, body"),
            Jb = a("body"),
            Kb = a.fn.fullpage;
        i = a.extend({
            menu: !1,
            anchors: [],
            lockAnchors: !1,
            navigation: !1,
            navigationPosition: "right",
            navigationTooltips: [],
            showActiveTooltip: !1,
            slidesNavigation: !1,
            slidesNavPosition: "bottom",
            scrollBar: !1,
            hybrid: !1,
            css3: !0,
            scrollingSpeed: 700,
            autoScrolling: !0,
            fitToSection: !0,
            fitToSectionDelay: 1e3,
            easing: "easeInOutCubic",
            easingcss3: "ease",
            loopBottom: !1,
            loopTop: !1,
            loopHorizontal: !0,
            continuousVertical: !1,
            normalScrollElements: null,
            scrollOverflow: !1,
            scrollOverflowHandler: f,
            touchSensitivity: 5,
            normalScrollElementTouchThreshold: 5,
            keyboardScrolling: !0,
            animateAnchor: !0,
            recordHistory: !0,
            controlArrows: !0,
            controlArrowColor: "#fff",
            verticalCentered: !0,
            resize: !1,
            sectionsColor: [],
            paddingTop: 0,
            paddingBottom: 0,
            fixedElements: null,
            responsive: 0,
            responsiveWidth: 0,
            responsiveHeight: 0,
            sectionSelector: v,
            slideSelector: K,
            afterLoad: null,
            onLeave: null,
            afterRender: null,
            afterResize: null,
            afterReBuild: null,
            afterSlideLoad: null,
            onSlideLeave: null
        }, i), Gb(), a.extend(a.easing, {
            easeInOutCubic: function(a, b, c, d, e) {
                return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
            }
        }), Kb.setAutoScrolling = function(b, c) {
            Fb("autoScrolling", b, c);
            var d = a(y);
            i.autoScrolling && !i.scrollBar ? (Ib.css({
                overflow: "hidden",
                height: "100%"
            }), Kb.setRecordHistory(cc.recordHistory, "internal"), Rb.css({
                "-ms-touch-action": "none",
                "touch-action": "none"
            }), d.length && Bb(d.position().top)) : (Ib.css({
                overflow: "visible",
                height: "initial"
            }), Kb.setRecordHistory(!1, "internal"), Rb.css({
                "-ms-touch-action": "",
                "touch-action": ""
            }), Bb(0), d.length && Ib.scrollTop(d.position().top))
        }, Kb.setRecordHistory = function(a, b) {
            Fb("recordHistory", a, b)
        }, Kb.setScrollingSpeed = function(a, b) {
            Fb("scrollingSpeed", a, b)
        }, Kb.setFitToSection = function(a, b) {
            Fb("fitToSection", a, b)
        }, Kb.setLockAnchors = function(a) {
            i.lockAnchors = a
        }, Kb.setMouseWheelScrolling = function(a) {
            a ? (tb(), ub()) : (sb(), vb())
        }, Kb.setAllowScrolling = function(b, c) {
            "undefined" != typeof c ? (c = c.replace(/ /g, "").split(","), a.each(c, function(a, c) {
                Db(b, c, "m")
            })) : b ? (Kb.setMouseWheelScrolling(!0), wb()) : (Kb.setMouseWheelScrolling(!1), xb())
        }, Kb.setKeyboardScrolling = function(b, c) {
            "undefined" != typeof c ? (c = c.replace(/ /g, "").split(","), a.each(c, function(a, c) {
                Db(b, c, "k")
            })) : i.keyboardScrolling = b
        }, Kb.moveSectionUp = function() {
            var b = a(y).prev(x);
            b.length || !i.loopTop && !i.continuousVertical || (b = a(x).last()), b.length && ya(b, null, !0)
        }, Kb.moveSectionDown = function() {
            var b = a(y).next(x);
            b.length || !i.loopBottom && !i.continuousVertical || (b = a(x).first()), b.length && ya(b, null, !1)
        }, Kb.silentMoveTo = function(a, b) {
            Kb.setScrollingSpeed(0, "internal"), Kb.moveTo(a, b), Kb.setScrollingSpeed(cc.scrollingSpeed, "internal")
        }, Kb.moveTo = function(a, b) {
            var c = ib(a);
            "undefined" != typeof b ? kb(a, b) : c.length > 0 && ya(c)
        }, Kb.moveSlideRight = function(a) {
            va("next", a)
        }, Kb.moveSlideLeft = function(a) {
            va("prev", a)
        }, Kb.reBuild = function(b) {
            if (!Rb.hasClass(o)) {
                Tb = !0;
                var c = ea.outerWidth();
                Sb = ea.height(), i.resize && $a(Sb, c), a(x).each(function() {
                    var b = a(this).find(P),
                        c = a(this).find(M);
                    i.verticalCentered && a(this).find(C).css("height", gb(a(this)) + "px"), a(this).css("height", Sb + "px"), i.scrollOverflow && (c.length ? c.each(function() {
                        eb(a(this))
                    }) : eb(a(this))), c.length > 1 && Va(b, b.find(N))
                });
                var d = a(y),
                    e = d.index(x);
                e && Kb.silentMoveTo(e + 1), Tb = !1, a.isFunction(i.afterResize) && b && i.afterResize.call(Rb), a.isFunction(i.afterReBuild) && !b && i.afterReBuild.call(Rb)
            }
        }, Kb.setResponsive = function(b) {
            var c = Jb.hasClass(m);
            b ? c || (Kb.setAutoScrolling(!1, "internal"), Kb.setFitToSection(!1, "internal"), a(G).hide(), Jb.addClass(m)) : c && (Kb.setAutoScrolling(cc.autoScrolling, "internal"), Kb.setFitToSection(cc.autoScrolling, "internal"), a(G).show(), Jb.removeClass(m))
        };
        var Lb, Mb, Nb, Ob = !1,
            Pb = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
            Qb = "ontouchstart" in b || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints,
            Rb = a(this),
            Sb = ea.height(),
            Tb = !1,
            Ub = !0,
            Vb = !0,
            Wb = [],
            Xb = {};
        Xb.m = {
            up: !0,
            down: !0,
            left: !0,
            right: !0
        }, Xb.k = a.extend(!0, {}, Xb.m);
        var Yb, Zb, $b, _b, ac, bc, cc = a.extend(!0, {}, i);
        a(this).length && (j(), k());
        var dc = !1,
            ec = 0,
            fc = 0,
            gc = 0,
            hc = 0,
            ic = 0,
            jc = (new Date).getTime(),
            kc = 0,
            lc = 0,
            mc = Sb;
        Kb.destroy = function(b) {
            Kb.setAutoScrolling(!1, "internal"), Kb.setAllowScrolling(!1), Kb.setKeyboardScrolling(!1), Rb.addClass(o), clearTimeout($b), clearTimeout(Zb), clearTimeout(Yb), clearTimeout(_b), clearTimeout(ac), ea.off("scroll", la).off("hashchange", Ja).off("resize", Wa), fa.off("click", G + " a").off("mouseenter", G + " li").off("mouseleave", G + " li").off("click", V).off("mouseover", i.normalScrollElements).off("mouseout", i.normalScrollElements), a(x).off("click", X), clearTimeout($b), clearTimeout(Zb), b && Eb()
        }
    };
    var ga = {
        afterRender: function(a) {
            var b = a.find(O),
                c = a.find(j);
            b.length && (c = b.find(N)), c.mouseover()
        },
        create: function(a, b) {
            a.find(j).slimScroll({
                allowPageScroll: !0,
                height: b + "px",
                size: "10px",
                alwaysVisible: !0
            })
        },
        isScrolled: function(a, b) {
            return "top" === a ? !b.scrollTop() : "bottom" === a ? b.scrollTop() + 1 + b.innerHeight() >= b[0].scrollHeight : void 0
        },
        scrollable: function(a) {
            return a.find(P).length ? a.find(N).find(j) : a.find(j)
        },
        scrollHeight: function(a) {
            return a.find(j).get(0).scrollHeight
        },
        remove: function(a) {
            a.find(j).children().first().unwrap().unwrap(), a.find(k).remove(), a.find(l).remove()
        },
        update: function(a, b) {
            a.find(j).css("height", b + "px").parent().css("height", b + "px")
        },
        wrapContent: function() {
            return '<div class="' + i + '"></div>'
        }
    };
    f = ga
}),


function(a) {
    a.easing.jswing = a.easing.swing, a.extend(a.easing, {
        def: "easeOutQuad",
        swing: function(b, c, d, e, f) {
            return a.easing[a.easing.def](b, c, d, e, f)
        },
        easeInQuad: function(a, b, c, d, e) {
            return d * (b /= e) * b + c
        },
        easeOutQuad: function(a, b, c, d, e) {
            return -d * (b /= e) * (b - 2) + c
        },
        easeInOutQuad: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
        },
        easeInCubic: function(a, b, c, d, e) {
            return d * (b /= e) * b * b + c
        },
        easeOutCubic: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b + 1) + c
        },
        easeInOutCubic: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
        },
        easeInQuart: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b + c
        },
        easeOutQuart: function(a, b, c, d, e) {
            return -d * ((b = b / e - 1) * b * b * b - 1) + c
        },
        easeInOutQuart: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
        },
        easeInQuint: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b * b + c
        },
        easeOutQuint: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b * b * b + 1) + c
        },
        easeInOutQuint: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
        },
        easeInSine: function(a, b, c, d, e) {
            return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
        },
        easeOutSine: function(a, b, c, d, e) {
            return d * Math.sin(b / e * (Math.PI / 2)) + c
        },
        easeInOutSine: function(a, b, c, d, e) {
            return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
        },
        easeInExpo: function(a, b, c, d, e) {
            return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
        },
        easeOutExpo: function(a, b, c, d, e) {
            return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
        },
        easeInOutExpo: function(a, b, c, d, e) {
            return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
        },
        easeInCirc: function(a, b, c, d, e) {
            return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
        },
        easeOutCirc: function(a, b, c, d, e) {
            return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
        },
        easeInOutCirc: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
        },
        easeInElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (1 == (b /= e)) return c + d;
            if (g || (g = .3 * e), h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g)) + c
        },
        easeOutElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (1 == (b /= e)) return c + d;
            if (g || (g = .3 * e), h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * (2 * Math.PI) / g) + d + c
        },
        easeInOutElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (2 == (b /= e / 2)) return c + d;
            if (g || (g = e * (.3 * 1.5)), h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return b < 1 ? -.5 * (h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g)) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g) * .5 + d + c
        },
        easeInBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c
        },
        easeOutBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
        },
        easeInOutBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * (b * b * (((f *= 1.525) + 1) * b - f)) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
        },
        easeInBounce: function(b, c, d, e, f) {
            return e - a.easing.easeOutBounce(b, f - c, 0, e, f) + d
        },
        easeOutBounce: function(a, b, c, d, e) {
            return (b /= e) < 1 / 2.75 ? d * (7.5625 * b * b) + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
        },
        easeInOutBounce: function(b, c, d, e, f) {
            return c < f / 2 ? .5 * a.easing.easeInBounce(b, 2 * c, 0, e, f) + d : .5 * a.easing.easeOutBounce(b, 2 * c - f, 0, e, f) + .5 * e + d
        }
    })
}



(jQuery), $(window).scroll(function() {
        $(".navbar").offset().top > 50 ? $(".navbar-fixed-top").addClass("top-nav-collapse") : $(".navbar-fixed-top").removeClass("top-nav-collapse")
    }),

     $(function() {
        $("a.page-scroll").bind("click", function(a) {
            var b = $(this);
            $("html, body").stop().animate({
                scrollTop: $(b.attr("href")).offset().top
            }, 1500, "easeInOutExpo"), a.preventDefault()
        })
    }), $(".navbar-collapse ul li a").click(function() {
        $(".navbar-toggle:visible").click()
    }),
    
    function() {
        var a, b, c, d, e, f = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            },
            g = [].indexOf || function(a) {
                for (var b = 0, c = this.length; c > b; b++)
                    if (b in this && this[b] === a) return b;
                return -1
            };
        b = function() {
            function a() {}
            return a.prototype.extend = function(a, b) {
                var c, d;
                for (c in b) d = b[c], null == a[c] && (a[c] = d);
                return a
            }, a.prototype.isMobile = function(a) {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
            }, a.prototype.createEvent = function(a, b, c, d) {
                var e;
                return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
            }, a.prototype.emitEvent = function(a, b) {
                return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0
            }, a.prototype.addEvent = function(a, b, c) {
                return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
            }, a.prototype.removeEvent = function(a, b, c) {
                return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
            }, a.prototype.innerHeight = function() {
                return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
            }, a
        }(), c = this.WeakMap || this.MozWeakMap || (c = function() {
            function a() {
                this.keys = [], this.values = []
            }
            return a.prototype.get = function(a) {
                var b, c, d, e, f;
                for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
                    if (c = f[b], c === a) return this.values[b]
            }, a.prototype.set = function(a, b) {
                var c, d, e, f, g;
                for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
                    if (d = g[c], d === a) return void(this.values[c] = b);
                return this.keys.push(a), this.values.push(b)
            }, a
        }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function() {
            function a() {
                "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
            }
            return a.notSupported = !0,
                a.prototype.observe = function() {}, a
        }()), d = this.getComputedStyle || function(a) {
            return this.getPropertyValue = function(b) {
                var c;
                return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function(a, b) {
                    return b.toUpperCase()
                }), (null != (c = a.currentStyle) ? c[b] : void 0) || null
            }, this
        }, e = /(\-([a-z]){1})/g, this.WOW = function() {
            function e(a) {
                null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), this.animationNameCache = new c, this.wowEvent = this.util().createEvent(this.config.boxClass)
            }
            return e.prototype.defaults = {
                boxClass: "wow",
                animateClass: "animated",
                offset: 0,
                mobile: !0,
                live: !0,
                callback: null
            }, e.prototype.init = function() {
                var a;
                return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
            }, e.prototype.start = function() {
                var b, c, d, e;
                if (this.stopped = !1, this.boxes = function() {
                        var a, c, d, e;
                        for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                        return e
                    }.call(this), this.all = function() {
                        var a, c, d, e;
                        for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                        return e
                    }.call(this), this.boxes.length)
                    if (this.disabled()) this.resetStyle();
                    else
                        for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
                return this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function(a) {
                    return function(b) {
                        var c, d, e, f, g;
                        for (g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function() {
                            var a, b, c, d;
                            for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], d.push(this.doSync(e));
                            return d
                        }.call(a));
                        return g
                    }
                }(this)).observe(document.body, {
                    childList: !0,
                    subtree: !0
                }) : void 0
            }, e.prototype.stop = function() {
                return this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
            }, e.prototype.sync = function() {
                return a.notSupported ? this.doSync(this.element) : void 0
            }, e.prototype.doSync = function(a) {
                var b, c, d, e, f;
                if (null == a && (a = this.element), 1 === a.nodeType) {
                    for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
                    return f
                }
            }, e.prototype.show = function(a) {
                return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a
            }, e.prototype.applyStyle = function(a, b) {
                var c, d, e;
                return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function(f) {
                    return function() {
                        return f.customStyle(a, b, d, c, e)
                    }
                }(this))
            }, e.prototype.animate = function() {
                return "requestAnimationFrame" in window ? function(a) {
                    return window.requestAnimationFrame(a)
                } : function(a) {
                    return a()
                }
            }(), e.prototype.resetStyle = function() {
                var a, b, c, d, e;
                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
                return e
            }, e.prototype.resetAnimation = function(a) {
                var b;
                return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0
            }, e.prototype.customStyle = function(a, b, c, d, e) {
                return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
                    animationDuration: c
                }), d && this.vendorSet(a.style, {
                    animationDelay: d
                }), e && this.vendorSet(a.style, {
                    animationIterationCount: e
                }), this.vendorSet(a.style, {
                    animationName: b ? "none" : this.cachedAnimationName(a)
                }), a
            }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function(a, b) {
                var c, d, e, f;
                d = [];
                for (c in b) e = b[c], a["" + c] = e, d.push(function() {
                    var b, d, g, h;
                    for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
                    return h
                }.call(this));
                return d
            }, e.prototype.vendorCSS = function(a, b) {
                var c, e, f, g, h, i;
                for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b);
                return g
            }, e.prototype.animationName = function(a) {
                var b;
                try {
                    b = this.vendorCSS(a, "animation-name").cssText
                } catch (c) {
                    b = d(a).getPropertyValue("animation-name")
                }
                return "none" === b ? "" : b
            }, e.prototype.cacheAnimationName = function(a) {
                return this.animationNameCache.set(a, this.animationName(a))
            }, e.prototype.cachedAnimationName = function(a) {
                return this.animationNameCache.get(a)
            }, e.prototype.scrollHandler = function() {
                return this.scrolled = !0
            }, e.prototype.scrollCallback = function() {
                var a;
                return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
                    var b, c, d, e;
                    for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
                    return e
                }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
            }, e.prototype.offsetTop = function(a) {
                for (var b; void 0 === a.offsetTop;) a = a.parentNode;
                for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
                return b
            }, e.prototype.isVisible = function(a) {
                var b, c, d, e, f;
                return c = a.getAttribute("data-wow-offset") || this.config.offset, f = window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
            }, e.prototype.util = function() {
                return null != this._util ? this._util : this._util = new b
            }, e.prototype.disabled = function() {
                return !this.config.mobile && this.util().isMobile(navigator.userAgent)
            }, e
        }()
    }

    .call(this),
    function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j
                }
                var k = c[g] = {
                    exports: {}
                };
                b[g][0].call(k.exports, function(a) {
                    var c = b[g][1][a];
                    return e(c ? c : a)
                }, k, k.exports, a, b, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
    }

    ({
        1: [function(a, b, c) {
            var d = a("./svg-pan-zoom.js");
            ! function(a, c) {
                "function" == typeof define && define.amd ? define("svg-pan-zoom", function() {
                    return d
                }) : "undefined" != typeof b && b.exports && (b.exports = d, a.svgPanZoom = d)
            }(window, document)
        }, {
            "./svg-pan-zoom.js": 4
        }],
        2: [function(a, b, c) {
            var d = a("./svg-utilities");
            b.exports = {
                enable: function(a) {
                    var b = a.svg.querySelector("defs");
                    b || (b = document.createElementNS(d.svgNS, "defs"), a.svg.appendChild(b));
                    var c = document.createElementNS(d.svgNS, "style");
                    c.setAttribute("type", "text/css"), c.textContent = ".svg-pan-zoom-control { cursor: pointer; fill: gray; fill-opacity: 1; } .svg-pan-zoom-control:hover { fill-opacity: 0.8; } .svg-pan-zoom-control-background { fill: black; fill-opacity: 0.5; } .svg-pan-zoom-control-background { fill-opacity: 0.8; }", b.appendChild(c);
                    var e = document.createElementNS(d.svgNS, "g");
                    e.setAttribute("id", "svg-pan-zoom-controls"), e.setAttribute("transform", "translate(" + (a.width - 60) + " " + (a.height - 65) + ") scale(0.65)"), e.setAttribute("class", "svg-pan-zoom-control"), e.appendChild(this._createZoomIn(a)), e.appendChild(this._createZoomReset(a)), e.appendChild(this._createZoomOut(a)), a.svg.appendChild(e), a.controlIcons = e
                },
                _createZoomIn: function(a) {
                    var b = document.createElementNS(d.svgNS, "g");
                    b.setAttribute("id", "svg-pan-zoom-zoom-in"), b.setAttribute("transform", "translate(30.5 5) scale(0.015)"), b.setAttribute("class", "svg-pan-zoom-control"), b.addEventListener("click", function() {
                        a.getPublicInstance().zoomIn()
                    }, !1), b.addEventListener("touchstart", function() {
                        a.getPublicInstance().zoomIn()
                    }, !1);
                    var c = document.createElementNS(d.svgNS, "rect");
                    c.setAttribute("x", "0"), c.setAttribute("y", "0"), c.setAttribute("width", "1500"), c.setAttribute("height", "1400"), c.setAttribute("class", "svg-pan-zoom-control-background"), b.appendChild(c);
                    var e = document.createElementNS(d.svgNS, "path");
                    return e.setAttribute("d", "M1280 576v128q0 26 -19 45t-45 19h-320v320q0 26 -19 45t-45 19h-128q-26 0 -45 -19t-19 -45v-320h-320q-26 0 -45 -19t-19 -45v-128q0 -26 19 -45t45 -19h320v-320q0 -26 19 -45t45 -19h128q26 0 45 19t19 45v320h320q26 0 45 19t19 45zM1536 1120v-960 q0 -119 -84.5 -203.5t-203.5 -84.5h-960q-119 0 -203.5 84.5t-84.5 203.5v960q0 119 84.5 203.5t203.5 84.5h960q119 0 203.5 -84.5t84.5 -203.5z"), e.setAttribute("class", "svg-pan-zoom-control-element"), b.appendChild(e), b
                },
                _createZoomReset: function(a) {
                    var b = document.createElementNS(d.svgNS, "g");
                    b.setAttribute("id", "svg-pan-zoom-reset-pan-zoom"), b.setAttribute("transform", "translate(5 35) scale(0.4)"), b.setAttribute("class", "svg-pan-zoom-control"), b.addEventListener("click", function() {
                        a.getPublicInstance().reset()
                    }, !1), b.addEventListener("touchstart", function() {
                        a.getPublicInstance().reset()
                    }, !1);
                    var c = document.createElementNS(d.svgNS, "rect");
                    c.setAttribute("x", "2"), c.setAttribute("y", "2"), c.setAttribute("width", "182"), c.setAttribute("height", "58"), c.setAttribute("class", "svg-pan-zoom-control-background"), b.appendChild(c);
                    var e = document.createElementNS(d.svgNS, "path");
                    e.setAttribute("d", "M33.051,20.632c-0.742-0.406-1.854-0.609-3.338-0.609h-7.969v9.281h7.769c1.543,0,2.701-0.188,3.473-0.562c1.365-0.656,2.048-1.953,2.048-3.891C35.032,22.757,34.372,21.351,33.051,20.632z"), e.setAttribute("class", "svg-pan-zoom-control-element"), b.appendChild(e);
                    var f = document.createElementNS(d.svgNS, "path");
                    return f.setAttribute("d", "M170.231,0.5H15.847C7.102,0.5,0.5,5.708,0.5,11.84v38.861C0.5,56.833,7.102,61.5,15.847,61.5h154.384c8.745,0,15.269-4.667,15.269-10.798V11.84C185.5,5.708,178.976,0.5,170.231,0.5z M42.837,48.569h-7.969c-0.219-0.766-0.375-1.383-0.469-1.852c-0.188-0.969-0.289-1.961-0.305-2.977l-0.047-3.211c-0.03-2.203-0.41-3.672-1.142-4.406c-0.732-0.734-2.103-1.102-4.113-1.102h-7.05v13.547h-7.055V14.022h16.524c2.361,0.047,4.178,0.344,5.45,0.891c1.272,0.547,2.351,1.352,3.234,2.414c0.731,0.875,1.31,1.844,1.737,2.906s0.64,2.273,0.64,3.633c0,1.641-0.414,3.254-1.242,4.84s-2.195,2.707-4.102,3.363c1.594,0.641,2.723,1.551,3.387,2.73s0.996,2.98,0.996,5.402v2.32c0,1.578,0.063,2.648,0.19,3.211c0.19,0.891,0.635,1.547,1.333,1.969V48.569z M75.579,48.569h-26.18V14.022h25.336v6.117H56.454v7.336h16.781v6H56.454v8.883h19.125V48.569z M104.497,46.331c-2.44,2.086-5.887,3.129-10.34,3.129c-4.548,0-8.125-1.027-10.731-3.082s-3.909-4.879-3.909-8.473h6.891c0.224,1.578,0.662,2.758,1.316,3.539c1.196,1.422,3.246,2.133,6.15,2.133c1.739,0,3.151-0.188,4.236-0.562c2.058-0.719,3.087-2.055,3.087-4.008c0-1.141-0.504-2.023-1.512-2.648c-1.008-0.609-2.607-1.148-4.796-1.617l-3.74-0.82c-3.676-0.812-6.201-1.695-7.576-2.648c-2.328-1.594-3.492-4.086-3.492-7.477c0-3.094,1.139-5.664,3.417-7.711s5.623-3.07,10.036-3.07c3.685,0,6.829,0.965,9.431,2.895c2.602,1.93,3.966,4.73,4.093,8.402h-6.938c-0.128-2.078-1.057-3.555-2.787-4.43c-1.154-0.578-2.587-0.867-4.301-0.867c-1.907,0-3.428,0.375-4.565,1.125c-1.138,0.75-1.706,1.797-1.706,3.141c0,1.234,0.561,2.156,1.682,2.766c0.721,0.406,2.25,0.883,4.589,1.43l6.063,1.43c2.657,0.625,4.648,1.461,5.975,2.508c2.059,1.625,3.089,3.977,3.089,7.055C108.157,41.624,106.937,44.245,104.497,46.331z M139.61,48.569h-26.18V14.022h25.336v6.117h-18.281v7.336h16.781v6h-16.781v8.883h19.125V48.569z M170.337,20.14h-10.336v28.43h-7.266V20.14h-10.383v-6.117h27.984V20.14z"), f.setAttribute("class", "svg-pan-zoom-control-element"), b.appendChild(f), b
                },
                _createZoomOut: function(a) {
                    var b = document.createElementNS(d.svgNS, "g");
                    b.setAttribute("id", "svg-pan-zoom-zoom-out"), b.setAttribute("transform", "translate(30.5 70) scale(0.015)"), b.setAttribute("class", "svg-pan-zoom-control"), b.addEventListener("click", function() {
                        a.getPublicInstance().zoomOut()
                    }, !1), b.addEventListener("touchstart", function() {
                        a.getPublicInstance().zoomOut()
                    }, !1);
                    var c = document.createElementNS(d.svgNS, "rect");
                    c.setAttribute("x", "0"), c.setAttribute("y", "0"), c.setAttribute("width", "1500"), c.setAttribute("height", "1400"), c.setAttribute("class", "svg-pan-zoom-control-background"), b.appendChild(c);
                    var e = document.createElementNS(d.svgNS, "path");
                    return e.setAttribute("d", "M1280 576v128q0 26 -19 45t-45 19h-896q-26 0 -45 -19t-19 -45v-128q0 -26 19 -45t45 -19h896q26 0 45 19t19 45zM1536 1120v-960q0 -119 -84.5 -203.5t-203.5 -84.5h-960q-119 0 -203.5 84.5t-84.5 203.5v960q0 119 84.5 203.5t203.5 84.5h960q119 0 203.5 -84.5 t84.5 -203.5z"), e.setAttribute("class", "svg-pan-zoom-control-element"), b.appendChild(e), b
                },
                disable: function(a) {
                    a.controlIcons && (a.controlIcons.parentNode.removeChild(a.controlIcons), a.controlIcons = null)
                }
            }
        }, {
            "./svg-utilities": 5
        }],
        3: [function(a, b, c) {
            var d = a("./svg-utilities"),
                e = a("./utilities"),
                f = function(a, b) {
                    this.init(a, b)
                };
            f.prototype.init = function(a, b) {
                this.viewport = a, this.options = b, this.originalState = {
                    zoom: 1,
                    x: 0,
                    y: 0
                }, this.activeState = {
                    zoom: 1,
                    x: 0,
                    y: 0
                }, this.updateCTMCached = e.proxy(this.updateCTM, this), this.requestAnimationFrame = e.createRequestAnimationFrame(this.options.refreshRate), this.viewBox = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }, this.cacheViewBox(), this.processCTM(), this.updateCTM()
            }, f.prototype.cacheViewBox = function() {
                var a = this.options.svg.getAttribute("viewBox");
                if (a) {
                    var b = a.split(/[\s\,]/).filter(function(a) {
                        return a
                    }).map(parseFloat);
                    this.viewBox.x = b[0], this.viewBox.y = b[1], this.viewBox.width = b[2], this.viewBox.height = b[3];
                    var c = Math.min(this.options.width / this.viewBox.width, this.options.height / this.viewBox.height);
                    this.activeState.zoom = c, this.activeState.x = (this.options.width - this.viewBox.width * c) / 2, this.activeState.y = (this.options.height - this.viewBox.height * c) / 2, this.updateCTMOnNextFrame(), this.options.svg.removeAttribute("viewBox")
                } else {
                    var d = this.viewport.getBBox();
                    this.viewBox.x = d.x, this.viewBox.y = d.y, this.viewBox.width = d.width, this.viewBox.height = d.height
                }
            }, f.prototype.recacheViewBox = function() {
                var a = this.viewport.getBoundingClientRect(),
                    b = a.width / this.getZoom(),
                    c = a.height / this.getZoom();
                this.viewBox.x = 0, this.viewBox.y = 0, this.viewBox.width = b, this.viewBox.height = c
            }, f.prototype.getViewBox = function() {
                return e.extend({}, this.viewBox)
            }, f.prototype.processCTM = function() {
                var a = this.getCTM();
                if (this.options.fit || this.options.contain) {
                    var b;
                    b = this.options.fit ? Math.min(this.options.width / this.viewBox.width, this.options.height / this.viewBox.height) : Math.max(this.options.width / this.viewBox.width, this.options.height / this.viewBox.height), a.a = b, a.d = b, a.e = -this.viewBox.x * b, a.f = -this.viewBox.y * b
                }
                if (this.options.center) {
                    var c = .5 * (this.options.width - (this.viewBox.width + 2 * this.viewBox.x) * a.a),
                        d = .5 * (this.options.height - (this.viewBox.height + 2 * this.viewBox.y) * a.a);
                    a.e = c, a.f = d
                }
                this.originalState.zoom = a.a, this.originalState.x = a.e, this.originalState.y = a.f, this.setCTM(a)
            }, f.prototype.getOriginalState = function() {
                return e.extend({}, this.originalState)
            }, f.prototype.getState = function() {
                return e.extend({}, this.activeState)
            }, f.prototype.getZoom = function() {
                return this.activeState.zoom
            }, f.prototype.getRelativeZoom = function() {
                return this.activeState.zoom / this.originalState.zoom
            }, f.prototype.computeRelativeZoom = function(a) {
                return a / this.originalState.zoom
            }, f.prototype.getPan = function() {
                return {
                    x: this.activeState.x,
                    y: this.activeState.y
                }
            }, f.prototype.getCTM = function() {
                var a = this.options.svg.createSVGMatrix();
                return a.a = this.activeState.zoom, a.b = 0, a.c = 0, a.d = this.activeState.zoom, a.e = this.activeState.x, a.f = this.activeState.y, a
            }, f.prototype.setCTM = function(a) {
                var b = this.isZoomDifferent(a),
                    c = this.isPanDifferent(a);
                if (b || c) {
                    if (b && this.options.beforeZoom(this.getRelativeZoom(), this.computeRelativeZoom(a.a)) === !1 && (a.a = a.d = this.activeState.zoom, b = !1), c) {
                        var d = this.options.beforePan(this.getPan(), {
                                x: a.e,
                                y: a.f
                            }),
                            f = !1,
                            g = !1;
                        d === !1 ? (a.e = this.getPan().x, a.f = this.getPan().y, f = g = !0) : e.isObject(d) && (d.x === !1 ? (a.e = this.getPan().x, f = !0) : e.isNumber(d.x) && (a.e = d.x), d.y === !1 ? (a.f = this.getPan().y, g = !0) : e.isNumber(d.y) && (a.f = d.y)), f && g && (c = !1)
                    }(b || c) && (this.updateCache(a), this.updateCTMOnNextFrame(), b && this.options.onZoom(this.getRelativeZoom()), c && this.options.onPan(this.getPan()))
                }
            }, f.prototype.isZoomDifferent = function(a) {
                return this.activeState.zoom !== a.a
            }, f.prototype.isPanDifferent = function(a) {
                return this.activeState.x !== a.e || this.activeState.y !== a.f
            }, f.prototype.updateCache = function(a) {
                this.activeState.zoom = a.a, this.activeState.x = a.e, this.activeState.y = a.f
            }, f.prototype.pendingUpdate = !1, f.prototype.updateCTMOnNextFrame = function() {
                this.pendingUpdate || (this.pendingUpdate = !0, this.requestAnimationFrame.call(window, this.updateCTMCached))
            }, f.prototype.updateCTM = function() {
                d.setCTM(this.viewport, this.getCTM(), this.defs), this.pendingUpdate = !1
            }, b.exports = function(a, b) {
                return new f(a, b)
            }
        }, {
            "./svg-utilities": 5,
            "./utilities": 7
        }],
        4: [function(a, b, c) {
            var d = a("./uniwheel"),
                e = a("./control-icons"),
                f = a("./utilities"),
                g = a("./svg-utilities"),
                h = a("./shadow-viewport"),
                i = function(a, b) {
                    this.init(a, b)
                },
                j = {
                    viewportSelector: ".svg-pan-zoom_viewport",
                    panEnabled: !0,
                    controlIconsEnabled: !1,
                    zoomEnabled: !0,
                    dblClickZoomEnabled: !0,
                    mouseWheelZoomEnabled: !0,
                    preventMouseEventsDefault: !0,
                    zoomScaleSensitivity: .1,
                    minZoom: .5,
                    maxZoom: 10,
                    fit: !0,
                    contain: !1,
                    center: !0,
                    refreshRate: "auto",
                    beforeZoom: null,
                    onZoom: null,
                    beforePan: null,
                    onPan: null,
                    customEventsHandler: null,
                    eventsListenerElement: null
                };
            i.prototype.init = function(a, b) {
                var c = this;
                this.svg = a, this.defs = a.querySelector("defs"), g.setupSvgAttributes(this.svg), this.options = f.extend(f.extend({}, j), b), this.state = "none";
                var d = g.getBoundingClientRectNormalized(a);
                this.width = d.width, this.height = d.height, this.viewport = h(g.getOrCreateViewport(this.svg, this.options.viewportSelector), {
                    svg: this.svg,
                    width: this.width,
                    height: this.height,
                    fit: this.options.fit,
                    contain: this.options.contain,
                    center: this.options.center,
                    refreshRate: this.options.refreshRate,
                    beforeZoom: function(a, b) {
                        if (c.viewport && c.options.beforeZoom) return c.options.beforeZoom(a, b)
                    },
                    onZoom: function(a) {
                        if (c.viewport && c.options.onZoom) return c.options.onZoom(a)
                    },
                    beforePan: function(a, b) {
                        if (c.viewport && c.options.beforePan) return c.options.beforePan(a, b)
                    },
                    onPan: function(a) {
                        if (c.viewport && c.options.onPan) return c.options.onPan(a)
                    }
                });
                var i = this.getPublicInstance();
                i.setBeforeZoom(this.options.beforeZoom), i.setOnZoom(this.options.onZoom), i.setBeforePan(this.options.beforePan), i.setOnPan(this.options.onPan), this.options.controlIconsEnabled && e.enable(this), this.lastMouseWheelEventTime = Date.now(), this.setupHandlers()
            }, i.prototype.setupHandlers = function() {
                var a = this,
                    b = null;
                if (this.eventListeners = {
                        mousedown: function(b) {
                            return a.handleMouseDown(b, null)
                        },
                        touchstart: function(c) {
                            var d = a.handleMouseDown(c, b);
                            return b = c, d
                        },
                        mouseup: function(b) {
                            return a.handleMouseUp(b)
                        },
                        touchend: function(b) {
                            return a.handleMouseUp(b)
                        },
                        mousemove: function(b) {
                            return a.handleMouseMove(b)
                        },
                        touchmove: function(b) {
                            return a.handleMouseMove(b)
                        },
                        mouseleave: function(b) {
                            return a.handleMouseUp(b)
                        },
                        touchleave: function(b) {
                            return a.handleMouseUp(b)
                        },
                        touchcancel: function(b) {
                            return a.handleMouseUp(b)
                        }
                    }, null != this.options.customEventsHandler) {
                    this.options.customEventsHandler.init({
                        svgElement: this.svg,
                        eventsListenerElement: this.options.eventsListenerElement,
                        instance: this.getPublicInstance()
                    });
                    var c = this.options.customEventsHandler.haltEventListeners;
                    if (c && c.length)
                        for (var d = c.length - 1; d >= 0; d--) this.eventListeners.hasOwnProperty(c[d]) && delete this.eventListeners[c[d]]
                }
                for (var e in this.eventListeners)(this.options.eventsListenerElement || this.svg).addEventListener(e, this.eventListeners[e], !1);
                this.options.mouseWheelZoomEnabled && (this.options.mouseWheelZoomEnabled = !1, this.enableMouseWheelZoom())
            }, i.prototype.enableMouseWheelZoom = function() {
                if (!this.options.mouseWheelZoomEnabled) {
                    var a = this;
                    this.wheelListener = function(b) {
                        return a.handleMouseWheel(b)
                    }, d.on(this.options.eventsListenerElement || this.svg, this.wheelListener, !1), this.options.mouseWheelZoomEnabled = !0
                }
            }, i.prototype.disableMouseWheelZoom = function() {
                this.options.mouseWheelZoomEnabled && (d.off(this.options.eventsListenerElement || this.svg, this.wheelListener, !1), this.options.mouseWheelZoomEnabled = !1)
            }, i.prototype.handleMouseWheel = function(a) {
                if (this.options.zoomEnabled && "none" === this.state) {
                    this.options.preventMouseEventsDefault && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
                    var b = a.deltaY || 1,
                        c = Date.now() - this.lastMouseWheelEventTime,
                        d = 3 + Math.max(0, 30 - c);
                    this.lastMouseWheelEventTime = Date.now(), "deltaMode" in a && 0 === a.deltaMode && a.wheelDelta && (b = 0 === a.deltaY ? 0 : Math.abs(a.wheelDelta) / a.deltaY), b = -.3 < b && b < .3 ? b : (b > 0 ? 1 : -1) * Math.log(Math.abs(b) + 10) / d;
                    var e = this.svg.getScreenCTM().inverse(),
                        f = g.getEventPoint(a, this.svg).matrixTransform(e),
                        h = Math.pow(1 + this.options.zoomScaleSensitivity, -1 * b);
                    this.zoomAtPoint(h, f)
                }
            }, i.prototype.zoomAtPoint = function(a, b, c) {
                var d = this.viewport.getOriginalState();
                c ? (a = Math.max(this.options.minZoom * d.zoom, Math.min(this.options.maxZoom * d.zoom, a)), a /= this.getZoom()) : this.getZoom() * a < this.options.minZoom * d.zoom ? a = this.options.minZoom * d.zoom / this.getZoom() : this.getZoom() * a > this.options.maxZoom * d.zoom && (a = this.options.maxZoom * d.zoom / this.getZoom());
                var e = this.viewport.getCTM(),
                    f = b.matrixTransform(e.inverse()),
                    g = this.svg.createSVGMatrix().translate(f.x, f.y).scale(a).translate(-f.x, -f.y),
                    h = e.multiply(g);
                h.a !== e.a && this.viewport.setCTM(h)
            }, i.prototype.zoom = function(a, b) {
                this.zoomAtPoint(a, g.getSvgCenterPoint(this.svg, this.width, this.height), b)
            }, i.prototype.publicZoom = function(a, b) {
                b && (a = this.computeFromRelativeZoom(a)), this.zoom(a, b)
            }, i.prototype.publicZoomAtPoint = function(a, b, c) {
                if (c && (a = this.computeFromRelativeZoom(a)), "SVGPoint" !== f.getType(b)) {
                    if (!("x" in b && "y" in b)) throw new Error("Given point is invalid");
                    b = g.createSVGPoint(this.svg, b.x, b.y)
                }
                this.zoomAtPoint(a, b, c)
            }, i.prototype.getZoom = function() {
                return this.viewport.getZoom()
            }, i.prototype.getRelativeZoom = function() {
                return this.viewport.getRelativeZoom()
            }, i.prototype.computeFromRelativeZoom = function(a) {
                return a * this.viewport.getOriginalState().zoom
            }, i.prototype.resetZoom = function() {
                var a = this.viewport.getOriginalState();
                this.zoom(a.zoom, !0)
            }, i.prototype.resetPan = function() {
                this.pan(this.viewport.getOriginalState())
            }, i.prototype.reset = function() {
                this.resetZoom(), this.resetPan()
            }, i.prototype.handleDblClick = function(a) {
                if (this.options.preventMouseEventsDefault && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), this.options.controlIconsEnabled) {
                    var b = a.target.getAttribute("class") || "";
                    if (b.indexOf("svg-pan-zoom-control") > -1) return !1
                }
                var c;
                c = a.shiftKey ? 1 / (2 * (1 + this.options.zoomScaleSensitivity)) : 2 * (1 + this.options.zoomScaleSensitivity);
                var d = g.getEventPoint(a, this.svg).matrixTransform(this.svg.getScreenCTM().inverse());
                this.zoomAtPoint(c, d)
            }, i.prototype.handleMouseDown = function(a, b) {
                this.options.preventMouseEventsDefault && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), f.mouseAndTouchNormalize(a, this.svg), this.options.dblClickZoomEnabled && f.isDblClick(a, b) ? this.handleDblClick(a) : (this.state = "pan", this.firstEventCTM = this.viewport.getCTM(), this.stateOrigin = g.getEventPoint(a, this.svg).matrixTransform(this.firstEventCTM.inverse()))
            }, i.prototype.handleMouseMove = function(a) {
                if (this.options.preventMouseEventsDefault && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), "pan" === this.state && this.options.panEnabled) {
                    var b = g.getEventPoint(a, this.svg).matrixTransform(this.firstEventCTM.inverse()),
                        c = this.firstEventCTM.translate(b.x - this.stateOrigin.x, b.y - this.stateOrigin.y);
                    this.viewport.setCTM(c)
                }
            }, i.prototype.handleMouseUp = function(a) {
                this.options.preventMouseEventsDefault && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), "pan" === this.state && (this.state = "none")
            }, i.prototype.fit = function() {
                var a = this.viewport.getViewBox(),
                    b = Math.min(this.width / a.width, this.height / a.height);
                this.zoom(b, !0)
            }, i.prototype.contain = function() {
                var a = this.viewport.getViewBox(),
                    b = Math.max(this.width / a.width, this.height / a.height);
                this.zoom(b, !0)
            }, i.prototype.center = function() {
                var a = this.viewport.getViewBox(),
                    b = .5 * (this.width - (a.width + 2 * a.x) * this.getZoom()),
                    c = .5 * (this.height - (a.height + 2 * a.y) * this.getZoom());
                this.getPublicInstance().pan({
                    x: b,
                    y: c
                })
            }, i.prototype.updateBBox = function() {
                this.viewport.recacheViewBox()
            }, i.prototype.pan = function(a) {
                var b = this.viewport.getCTM();
                b.e = a.x, b.f = a.y, this.viewport.setCTM(b)
            }, i.prototype.panBy = function(a) {
                var b = this.viewport.getCTM();
                b.e += a.x, b.f += a.y, this.viewport.setCTM(b)
            }, i.prototype.getPan = function() {
                var a = this.viewport.getState();
                return {
                    x: a.x,
                    y: a.y
                }
            }, i.prototype.resize = function() {
                var a = g.getBoundingClientRectNormalized(this.svg);
                this.width = a.width, this.height = a.height, this.options.controlIconsEnabled && (this.getPublicInstance().disableControlIcons(), this.getPublicInstance().enableControlIcons())
            }, i.prototype.destroy = function() {
                var a = this;
                this.beforeZoom = null, this.onZoom = null, this.beforePan = null, this.onPan = null, null != this.options.customEventsHandler && this.options.customEventsHandler.destroy({
                    svgElement: this.svg,
                    eventsListenerElement: this.options.eventsListenerElement,
                    instance: this.getPublicInstance()
                });
                for (var b in this.eventListeners)(this.options.eventsListenerElement || this.svg).removeEventListener(b, this.eventListeners[b], !1);
                this.disableMouseWheelZoom(), this.getPublicInstance().disableControlIcons(), this.reset(), k = k.filter(function(b) {
                    return b.svg !== a.svg
                }), delete this.options, delete this.publicInstance, delete this.pi, this.getPublicInstance = function() {
                    return null
                }
            }, i.prototype.getPublicInstance = function() {
                var a = this;
                return this.publicInstance || (this.publicInstance = this.pi = {
                    enablePan: function() {
                        return a.options.panEnabled = !0, a.pi
                    },
                    disablePan: function() {
                        return a.options.panEnabled = !1, a.pi
                    },
                    isPanEnabled: function() {
                        return !!a.options.panEnabled
                    },
                    pan: function(b) {
                        return a.pan(b), a.pi
                    },
                    panBy: function(b) {
                        return a.panBy(b), a.pi
                    },
                    getPan: function() {
                        return a.getPan()
                    },
                    setBeforePan: function(b) {
                        return a.options.beforePan = null === b ? null : f.proxy(b, a.publicInstance), a.pi
                    },
                    setOnPan: function(b) {
                        return a.options.onPan = null === b ? null : f.proxy(b, a.publicInstance), a.pi
                    },
                    enableZoom: function() {
                        return a.options.zoomEnabled = !0, a.pi
                    },
                    disableZoom: function() {
                        return a.options.zoomEnabled = !1, a.pi
                    },
                    isZoomEnabled: function() {
                        return !!a.options.zoomEnabled
                    },
                    enableControlIcons: function() {
                        return a.options.controlIconsEnabled || (a.options.controlIconsEnabled = !0, e.enable(a)), a.pi
                    },
                    disableControlIcons: function() {
                        return a.options.controlIconsEnabled && (a.options.controlIconsEnabled = !1, e.disable(a)), a.pi
                    },
                    isControlIconsEnabled: function() {
                        return !!a.options.controlIconsEnabled
                    },
                    enableDblClickZoom: function() {
                        return a.options.dblClickZoomEnabled = !0, a.pi
                    },
                    disableDblClickZoom: function() {
                        return a.options.dblClickZoomEnabled = !1, a.pi
                    },
                    isDblClickZoomEnabled: function() {
                        return !!a.options.dblClickZoomEnabled
                    },
                    enableMouseWheelZoom: function() {
                        return a.enableMouseWheelZoom(), a.pi
                    },
                    disableMouseWheelZoom: function() {
                        return a.disableMouseWheelZoom(), a.pi
                    },
                    isMouseWheelZoomEnabled: function() {
                        return !!a.options.mouseWheelZoomEnabled
                    },
                    setZoomScaleSensitivity: function(b) {
                        return a.options.zoomScaleSensitivity = b, a.pi
                    },
                    setMinZoom: function(b) {
                        return a.options.minZoom = b, a.pi
                    },
                    setMaxZoom: function(b) {
                        return a.options.maxZoom = b, a.pi
                    },
                    setBeforeZoom: function(b) {
                        return a.options.beforeZoom = null === b ? null : f.proxy(b, a.publicInstance), a.pi
                    },
                    setOnZoom: function(b) {
                        return a.options.onZoom = null === b ? null : f.proxy(b, a.publicInstance), a.pi
                    },
                    zoom: function(b) {
                        return a.publicZoom(b, !0), a.pi
                    },
                    zoomBy: function(b) {
                        return a.publicZoom(b, !1), a.pi
                    },
                    zoomAtPoint: function(b, c) {
                        return a.publicZoomAtPoint(b, c, !0), a.pi
                    },
                    zoomAtPointBy: function(b, c) {
                        return a.publicZoomAtPoint(b, c, !1), a.pi
                    },
                    zoomIn: function() {
                        return this.zoomBy(1 + a.options.zoomScaleSensitivity), a.pi
                    },
                    zoomOut: function() {
                        return this.zoomBy(1 / (1 + a.options.zoomScaleSensitivity)), a.pi
                    },
                    getZoom: function() {
                        return a.getRelativeZoom()
                    },
                    resetZoom: function() {
                        return a.resetZoom(), a.pi
                    },
                    resetPan: function() {
                        return a.resetPan(), a.pi
                    },
                    reset: function() {
                        return a.reset(), a.pi
                    },
                    fit: function() {
                        return a.fit(), a.pi
                    },
                    contain: function() {
                        return a.contain(), a.pi
                    },
                    center: function() {
                        return a.center(), a.pi
                    },
                    updateBBox: function() {
                        return a.updateBBox(), a.pi
                    },
                    resize: function() {
                        return a.resize(), a.pi
                    },
                    getSizes: function() {
                        return {
                            width: a.width,
                            height: a.height,
                            realZoom: a.getZoom(),
                            viewBox: a.viewport.getViewBox()
                        }
                    },
                    destroy: function() {
                        return a.destroy(), a.pi
                    }
                }), this.publicInstance
            };
            var k = [],
                l = function(a, b) {
                    var c = f.getSvg(a);
                    if (null === c) return null;
                    for (var d = k.length - 1; d >= 0; d--)
                        if (k[d].svg === c) return k[d].instance.getPublicInstance();
                    return k.push({
                        svg: c,
                        instance: new i(c, b)
                    }), k[k.length - 1].instance.getPublicInstance()
                };
            b.exports = l
        }, {
            "./control-icons": 2,
            "./shadow-viewport": 3,
            "./svg-utilities": 5,
            "./uniwheel": 6,
            "./utilities": 7
        }],
        5: [function(a, b, c) {
            var d = a("./utilities"),
                e = "unknown";
            document.documentMode && (e = "ie"), b.exports = {
                svgNS: "http://www.w3.org/2000/svg",
                xmlNS: "http://www.w3.org/XML/1998/namespace",
                xmlnsNS: "http://www.w3.org/2000/xmlns/",
                xlinkNS: "http://www.w3.org/1999/xlink",
                evNS: "http://www.w3.org/2001/xml-events",
                getBoundingClientRectNormalized: function(a) {
                    if (a.clientWidth && a.clientHeight) return {
                        width: a.clientWidth,
                        height: a.clientHeight
                    };
                    if (a.getBoundingClientRect()) return a.getBoundingClientRect();
                    throw new Error("Cannot get BoundingClientRect for SVG.")
                },
                getOrCreateViewport: function(a, b) {
                    var c = null;
                    if (c = d.isElement(b) ? b : a.querySelector(b), !c) {
                        var e = Array.prototype.slice.call(a.childNodes || a.children).filter(function(a) {
                            return "defs" !== a.nodeName && "#text" !== a.nodeName
                        });
                        1 === e.length && "g" === e[0].nodeName && null === e[0].getAttribute("transform") && (c = e[0])
                    }
                    if (!c) {
                        var f = "viewport-" + (new Date).toISOString().replace(/\D/g, "");
                        c = document.createElementNS(this.svgNS, "g"), c.setAttribute("id", f);
                        var g = a.childNodes || a.children;
                        if (g && g.length > 0)
                            for (var h = g.length; h > 0; h--) "defs" !== g[g.length - h].nodeName && c.appendChild(g[g.length - h]);
                        a.appendChild(c)
                    }
                    var i = [];
                    return c.getAttribute("class") && (i = c.getAttribute("class").split(" ")), ~i.indexOf("svg-pan-zoom_viewport") || (i.push("svg-pan-zoom_viewport"), c.setAttribute("class", i.join(" "))), c
                },
                setupSvgAttributes: function(a) {
                    if (a.setAttribute("xmlns", this.svgNS), a.setAttributeNS(this.xmlnsNS, "xmlns:xlink", this.xlinkNS), a.setAttributeNS(this.xmlnsNS, "xmlns:ev", this.evNS), null !== a.parentNode) {
                        var b = a.getAttribute("style") || "";
                        b.toLowerCase().indexOf("overflow") === -1 && a.setAttribute("style", "overflow: hidden; " + b)
                    }
                },
                internetExplorerRedisplayInterval: 300,
                refreshDefsGlobal: d.throttle(function() {
                    for (var a = document.querySelectorAll("defs"), b = a.length, c = 0; c < b; c++) {
                        var d = a[c];
                        d.parentNode.insertBefore(d, d)
                    }
                }, this.internetExplorerRedisplayInterval),
                setCTM: function(a, b, c) {
                    var d = this,
                        f = "matrix(" + b.a + "," + b.b + "," + b.c + "," + b.d + "," + b.e + "," + b.f + ")";
                    a.setAttributeNS(null, "transform", f), "ie" === e && c && (c.parentNode.insertBefore(c, c), window.setTimeout(function() {
                        d.refreshDefsGlobal()
                    }, d.internetExplorerRedisplayInterval))
                },
                getEventPoint: function(a, b) {
                    var c = b.createSVGPoint();
                    return d.mouseAndTouchNormalize(a, b), c.x = a.clientX, c.y = a.clientY, c
                },
                getSvgCenterPoint: function(a, b, c) {
                    return this.createSVGPoint(a, b / 2, c / 2)
                },
                createSVGPoint: function(a, b, c) {
                    var d = a.createSVGPoint();
                    return d.x = b, d.y = c, d
                }
            }
        }, {
            "./utilities": 7
        }],
        6: [function(a, b, c) {
            b.exports = function() {
                function a(a, b, c) {
                    var d = function(a) {
                        !a && (a = window.event);
                        var c = {
                            originalEvent: a,
                            target: a.target || a.srcElement,
                            type: "wheel",
                            deltaMode: "MozMousePixelScroll" == a.type ? 0 : 1,
                            deltaX: 0,
                            delatZ: 0,
                            preventDefault: function() {
                                a.preventDefault ? a.preventDefault() : a.returnValue = !1
                            }
                        };
                        return "mousewheel" == j ? (c.deltaY = -.025 * a.wheelDelta, a.wheelDeltaX && (c.deltaX = -.025 * a.wheelDeltaX)) : c.deltaY = a.detail, b(c)
                    };
                    return l.push({
                        element: a,
                        fn: d,
                        capture: c
                    }), d
                }

                function b(a, b) {
                    for (var c = 0; c < l.length; c++)
                        if (l[c].element === a && l[c].capture === b) return l[c].fn;
                    return function() {}
                }

                function c(a, b) {
                    for (var c = 0; c < l.length; c++)
                        if (l[c].element === a && l[c].capture === b) return l.splice(c, 1)
                }

                function d(b, c, d, e) {
                    var f;
                    f = "wheel" === j ? d : a(b, d, e), b[h](k + c, f, e || !1)
                }

                function e(a, d, e, f) {
                    "wheel" === j ? cb = e : cb = b(a, f), a[i](k + d, cb, f || !1), c(a, f)
                }

                function f(a, b, c) {
                    d(a, j, b, c), "DOMMouseScroll" == j && d(a, "MozMousePixelScroll", b, c)
                }

                function g(a, b, c) {
                    e(a, j, b, c), "DOMMouseScroll" == j && e(a, "MozMousePixelScroll", b, c);
                }
                var h, i, j, k = "",
                    l = [];
                return window.addEventListener ? (h = "addEventListener", i = "removeEventListener") : (h = "attachEvent", i = "detachEvent", k = "on"), j = "onwheel" in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll", {
                    on: f,
                    off: g
                }
            }()
        }, {}],
        7: [function(a, b, c) {
            function d(a) {
                return function(b) {
                    window.setTimeout(b, a)
                }
            }
            b.exports = {
                extend: function(a, b) {
                    a = a || {};
                    for (var c in b) this.isObject(b[c]) ? a[c] = this.extend(a[c], b[c]) : a[c] = b[c];
                    return a
                },
                isElement: function(a) {
                    return a instanceof HTMLElement || a instanceof SVGElement || a instanceof SVGSVGElement || a && "object" == typeof a && null !== a && 1 === a.nodeType && "string" == typeof a.nodeName
                },
                isObject: function(a) {
                    return "[object Object]" === Object.prototype.toString.call(a)
                },
                isNumber: function(a) {
                    return !isNaN(parseFloat(a)) && isFinite(a)
                },
                getSvg: function(a) {
                    var b, c;
                    if (this.isElement(a)) b = a;
                    else {
                        if (!("string" == typeof a || a instanceof String)) throw new Error("Provided selector is not an HTML object nor String");
                        if (b = document.querySelector(a), !b) throw new Error("Provided selector did not find any elements. Selector: " + a)
                    }
                    if ("svg" === b.tagName.toLowerCase()) c = b;
                    else if ("object" === b.tagName.toLowerCase()) c = b.contentDocument.documentElement;
                    else {
                        if ("embed" !== b.tagName.toLowerCase()) throw "img" === b.tagName.toLowerCase() ? new Error('Cannot script an SVG in an "img" element. Please use an "object" element or an in-line SVG.') : new Error("Cannot get SVG.");
                        c = b.getSVGDocument().documentElement
                    }
                    return c
                },
                proxy: function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                getType: function(a) {
                    return Object.prototype.toString.apply(a).replace(/^\[object\s/, "").replace(/\]$/, "")
                },
                mouseAndTouchNormalize: function(a, b) {
                    if (void 0 === a.clientX || null === a.clientX)
                        if (a.clientX = 0, a.clientY = 0, void 0 !== a.changedTouches && a.changedTouches.length) {
                            if (void 0 !== a.changedTouches[0].clientX) a.clientX = a.changedTouches[0].clientX, a.clientY = a.changedTouches[0].clientY;
                            else if (void 0 !== a.changedTouches[0].pageX) {
                                var c = b.getBoundingClientRect();
                                a.clientX = a.changedTouches[0].pageX - c.left, a.clientY = a.changedTouches[0].pageY - c.top
                            }
                        } else void 0 !== a.originalEvent && void 0 !== a.originalEvent.clientX && (a.clientX = a.originalEvent.clientX, a.clientY = a.originalEvent.clientY)
                },
                isDblClick: function(a, b) {
                    if (2 === a.detail) return !0;
                    if (void 0 !== b && null !== b) {
                        var c = a.timeStamp - b.timeStamp,
                            d = Math.sqrt(Math.pow(a.clientX - b.clientX, 2) + Math.pow(a.clientY - b.clientY, 2));
                        return c < 250 && d < 10
                    }
                    return !1
                },
                now: Date.now || function() {
                    return (new Date).getTime()
                },
                throttle: function(a, b, c) {
                    var d, e, f, g = this,
                        h = null,
                        i = 0;
                    c || (c = {});
                    var j = function() {
                        i = c.leading === !1 ? 0 : g.now(), h = null, f = a.apply(d, e), h || (d = e = null)
                    };
                    return function() {
                        var k = g.now();
                        i || c.leading !== !1 || (i = k);
                        var l = b - (k - i);
                        return d = this, e = arguments, l <= 0 || l > b ? (clearTimeout(h), h = null, i = k, f = a.apply(d, e), h || (d = e = null)) : h || c.trailing === !1 || (h = setTimeout(j, l)), f
                    }
                },
                createRequestAnimationFrame: function(a) {
                    var b = null;
                    return "auto" !== a && a < 60 && a > 1 && (b = Math.floor(1e3 / a)), null === b ? window.requestAnimationFrame || d(33) : d(b)
                }
            }
        }, {}]
    }, {}, [1]),

    function(a, b, c, d) {
        "use strict";

        function e(a, b, c) {
            return setTimeout(j(a, c), b)
        }

        function f(a, b, c) {
            return !!Array.isArray(a) && (g(a, c[b], c), !0)
        }

        function g(a, b, c) {
            var e;
            if (a)
                if (a.forEach) a.forEach(b, c);
                else if (a.length !== d)
                for (e = 0; e < a.length;) b.call(c, a[e], e, a), e++;
            else
                for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a)
        }

        function h(b, c, d) {
            var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n";
            return function() {
                var c = new Error("get-stack-trace"),
                    d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
                    f = a.console && (a.console.warn || a.console.log);
                return f && f.call(a.console, e, d), b.apply(this, arguments)
            }
        }

        function i(a, b, c) {
            var d, e = b.prototype;
            d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && ha(d, c)
        }

        function j(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        }

        function k(a, b) {
            return typeof a == ka ? a.apply(b ? b[0] || d : d, b) : a
        }

        function l(a, b) {
            return a === d ? b : a
        }

        function m(a, b, c) {
            g(q(b), function(b) {
                a.addEventListener(b, c, !1)
            })
        }

        function n(a, b, c) {
            g(q(b), function(b) {
                a.removeEventListener(b, c, !1)
            })
        }

        function o(a, b) {
            for (; a;) {
                if (a == b) return !0;
                a = a.parentNode
            }
            return !1
        }

        function p(a, b) {
            return a.indexOf(b) > -1
        }

        function q(a) {
            return a.trim().split(/\s+/g)
        }

        function r(a, b, c) {
            if (a.indexOf && !c) return a.indexOf(b);
            for (var d = 0; d < a.length;) {
                if (c && a[d][c] == b || !c && a[d] === b) return d;
                d++
            }
            return -1
        }

        function s(a) {
            return Array.prototype.slice.call(a, 0)
        }

        function t(a, b, c) {
            for (var d = [], e = [], f = 0; f < a.length;) {
                var g = b ? a[f][b] : a[f];
                r(e, g) < 0 && d.push(a[f]), e[f] = g, f++
            }
            return c && (d = b ? d.sort(function(a, c) {
                return a[b] > c[b]
            }) : d.sort()), d
        }

        function u(a, b) {
            for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ia.length;) {
                if (c = ia[g], e = c ? c + f : b, e in a) return e;
                g++
            }
            return d
        }

        function v() {
            return qa++
        }

        function w(b) {
            var c = b.ownerDocument || b;
            return c.defaultView || c.parentWindow || a
        }

        function x(a, b) {
            var c = this;
            this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function(b) {
                k(a.options.enable, [a]) && c.handler(b)
            }, this.init()
        }

        function y(a) {
            var b, c = a.options.inputClass;
            return new(b = c ? c : ta ? M : ua ? P : sa ? R : L)(a, z)
        }

        function z(a, b, c) {
            var d = c.pointers.length,
                e = c.changedPointers.length,
                f = b & Aa && d - e === 0,
                g = b & (Ca | Da) && d - e === 0;
            c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c
        }

        function A(a, b) {
            var c = a.session,
                d = b.pointers,
                e = d.length;
            c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1);
            var f = c.firstInput,
                g = c.firstMultiple,
                h = g ? g.center : f.center,
                i = b.center = E(d);
            b.timeStamp = na(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY);
            var j = F(b.deltaTime, b.deltaX, b.deltaY);
            b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = ma(j.x) > ma(j.y) ? j.x : j.y, b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, C(c, b);
            var k = a.element;
            o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k
        }

        function B(a, b) {
            var c = b.center,
                d = a.offsetDelta || {},
                e = a.prevDelta || {},
                f = a.prevInput || {};
            b.eventType !== Aa && f.eventType !== Ca || (e = a.prevDelta = {
                x: f.deltaX || 0,
                y: f.deltaY || 0
            }, d = a.offsetDelta = {
                x: c.x,
                y: c.y
            }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y)
        }

        function C(a, b) {
            var c, e, f, g, h = a.lastInterval || b,
                i = b.timeStamp - h.timeStamp;
            if (b.eventType != Da && (i > za || h.velocity === d)) {
                var j = b.deltaX - h.deltaX,
                    k = b.deltaY - h.deltaY,
                    l = F(i, j, k);
                e = l.x, f = l.y, c = ma(l.x) > ma(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b
            } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
            b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g
        }

        function D(a) {
            for (var b = [], c = 0; c < a.pointers.length;) b[c] = {
                clientX: la(a.pointers[c].clientX),
                clientY: la(a.pointers[c].clientY)
            }, c++;
            return {
                timeStamp: na(),
                pointers: b,
                center: E(b),
                deltaX: a.deltaX,
                deltaY: a.deltaY
            }
        }

        function E(a) {
            var b = a.length;
            if (1 === b) return {
                x: la(a[0].clientX),
                y: la(a[0].clientY)
            };
            for (var c = 0, d = 0, e = 0; e < b;) c += a[e].clientX, d += a[e].clientY, e++;
            return {
                x: la(c / b),
                y: la(d / b)
            }
        }

        function F(a, b, c) {
            return {
                x: b / a || 0,
                y: c / a || 0
            }
        }

        function G(a, b) {
            return a === b ? Ea : ma(a) >= ma(b) ? a < 0 ? Fa : Ga : b < 0 ? Ha : Ia
        }

        function H(a, b, c) {
            c || (c = Ma);
            var d = b[c[0]] - a[c[0]],
                e = b[c[1]] - a[c[1]];
            return Math.sqrt(d * d + e * e)
        }

        function I(a, b, c) {
            c || (c = Ma);
            var d = b[c[0]] - a[c[0]],
                e = b[c[1]] - a[c[1]];
            return 180 * Math.atan2(e, d) / Math.PI
        }

        function J(a, b) {
            return I(b[1], b[0], Na) + I(a[1], a[0], Na)
        }

        function K(a, b) {
            return H(b[0], b[1], Na) / H(a[0], a[1], Na)
        }

        function L() {
            this.evEl = Pa, this.evWin = Qa, this.allow = !0, this.pressed = !1, x.apply(this, arguments)
        }

        function M() {
            this.evEl = Ta, this.evWin = Ua, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
        }

        function N() {
            this.evTarget = Wa, this.evWin = Xa, this.started = !1, x.apply(this, arguments)
        }

        function O(a, b) {
            var c = s(a.touches),
                d = s(a.changedTouches);
            return b & (Ca | Da) && (c = t(c.concat(d), "identifier", !0)), [c, d]
        }

        function P() {
            this.evTarget = Za, this.targetIds = {}, x.apply(this, arguments)
        }

        function Q(a, b) {
            var c = s(a.touches),
                d = this.targetIds;
            if (b & (Aa | Ba) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];
            var e, f, g = s(a.changedTouches),
                h = [],
                i = this.target;
            if (f = c.filter(function(a) {
                    return o(a.target, i)
                }), b === Aa)
                for (e = 0; e < f.length;) d[f[e].identifier] = !0, e++;
            for (e = 0; e < g.length;) d[g[e].identifier] && h.push(g[e]), b & (Ca | Da) && delete d[g[e].identifier], e++;
            return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0
        }

        function R() {
            x.apply(this, arguments);
            var a = j(this.handler, this);
            this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a)
        }

        function S(a, b) {
            this.manager = a, this.set(b)
        }

        function T(a) {
            if (p(a, db)) return db;
            var b = p(a, eb),
                c = p(a, fb);
            return b && c ? db : b || c ? b ? eb : fb : p(a, cb) ? cb : bb
        }

        function U(a) {
            this.options = ha({}, this.defaults, a || {}), this.id = v(), this.manager = null, this.options.enable = l(this.options.enable, !0), this.state = gb, this.simultaneous = {}, this.requireFail = []
        }

        function V(a) {
            return a & lb ? "cancel" : a & jb ? "end" : a & ib ? "move" : a & hb ? "start" : ""
        }

        function W(a) {
            return a == Ia ? "down" : a == Ha ? "up" : a == Fa ? "left" : a == Ga ? "right" : ""
        }

        function X(a, b) {
            var c = b.manager;
            return c ? c.get(a) : a
        }

        function Y() {
            U.apply(this, arguments)
        }

        function Z() {
            Y.apply(this, arguments), this.pX = null, this.pY = null
        }

        function $() {
            Y.apply(this, arguments)
        }

        function _() {
            U.apply(this, arguments), this._timer = null, this._input = null
        }

        function aa() {
            Y.apply(this, arguments)
        }

        function ba() {
            Y.apply(this, arguments)
        }

        function ca() {
            U.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
        }

        function da(a, b) {
            return b = b || {}, b.recognizers = l(b.recognizers, da.defaults.preset), new ea(a, b)
        }

        function ea(a, b) {
            this.options = ha({}, da.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, this.input = y(this), this.touchAction = new S(this, this.options.touchAction), fa(this, !0), g(this.options.recognizers, function(a) {
                var b = this.add(new a[0](a[1]));
                a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3])
            }, this)
        }

        function fa(a, b) {
            var c = a.element;
            c.style && g(a.options.cssProps, function(a, d) {
                c.style[u(c.style, d)] = b ? a : ""
            })
        }

        function ga(a, c) {
            var d = b.createEvent("Event");
            d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d)
        }
        var ha, ia = ["", "webkit", "Moz", "MS", "ms", "o"],
            ja = b.createElement("div"),
            ka = "function",
            la = Math.round,
            ma = Math.abs,
            na = Date.now;
        ha = "function" != typeof Object.assign ? function(a) {
            if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object");
            for (var b = Object(a), c = 1; c < arguments.length; c++) {
                var e = arguments[c];
                if (e !== d && null !== e)
                    for (var f in e) e.hasOwnProperty(f) && (b[f] = e[f])
            }
            return b
        } : Object.assign;
        var oa = h(function(a, b, c) {
                for (var e = Object.keys(b), f = 0; f < e.length;)(!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
                return a
            }, "extend", "Use `assign`."),
            pa = h(function(a, b) {
                return oa(a, b, !0)
            }, "merge", "Use `assign`."),
            qa = 1,
            ra = /mobile|tablet|ip(ad|hone|od)|android/i,
            sa = "ontouchstart" in a,
            ta = u(a, "PointerEvent") !== d,
            ua = sa && ra.test(navigator.userAgent),
            va = "touch",
            wa = "pen",
            xa = "mouse",
            ya = "kinect",
            za = 25,
            Aa = 1,
            Ba = 2,
            Ca = 4,
            Da = 8,
            Ea = 1,
            Fa = 2,
            Ga = 4,
            Ha = 8,
            Ia = 16,
            Ja = Fa | Ga,
            Ka = Ha | Ia,
            La = Ja | Ka,
            Ma = ["x", "y"],
            Na = ["clientX", "clientY"];
        x.prototype = {
            handler: function() {},
            init: function() {
                this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler)
            },
            destroy: function() {
                this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler)
            }
        };
        var Oa = {
                mousedown: Aa,
                mousemove: Ba,
                mouseup: Ca
            },
            Pa = "mousedown",
            Qa = "mousemove mouseup";
        i(L, x, {
            handler: function(a) {
                var b = Oa[a.type];
                b & Aa && 0 === a.button && (this.pressed = !0), b & Ba && 1 !== a.which && (b = Ca), this.pressed && this.allow && (b & Ca && (this.pressed = !1), this.callback(this.manager, b, {
                    pointers: [a],
                    changedPointers: [a],
                    pointerType: xa,
                    srcEvent: a
                }))
            }
        });
        var Ra = {
                pointerdown: Aa,
                pointermove: Ba,
                pointerup: Ca,
                pointercancel: Da,
                pointerout: Da
            },
            Sa = {
                2: va,
                3: wa,
                4: xa,
                5: ya
            },
            Ta = "pointerdown",
            Ua = "pointermove pointerup pointercancel";
        a.MSPointerEvent && !a.PointerEvent && (Ta = "MSPointerDown", Ua = "MSPointerMove MSPointerUp MSPointerCancel"), i(M, x, {
            handler: function(a) {
                var b = this.store,
                    c = !1,
                    d = a.type.toLowerCase().replace("ms", ""),
                    e = Ra[d],
                    f = Sa[a.pointerType] || a.pointerType,
                    g = f == va,
                    h = r(b, a.pointerId, "pointerId");
                e & Aa && (0 === a.button || g) ? h < 0 && (b.push(a), h = b.length - 1) : e & (Ca | Da) && (c = !0), h < 0 || (b[h] = a, this.callback(this.manager, e, {
                    pointers: b,
                    changedPointers: [a],
                    pointerType: f,
                    srcEvent: a
                }), c && b.splice(h, 1))
            }
        });
        var Va = {
                touchstart: Aa,
                touchmove: Ba,
                touchend: Ca,
                touchcancel: Da
            },
            Wa = "touchstart",
            Xa = "touchstart touchmove touchend touchcancel";
        i(N, x, {
            handler: function(a) {
                var b = Va[a.type];
                if (b === Aa && (this.started = !0), this.started) {
                    var c = O.call(this, a, b);
                    b & (Ca | Da) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, {
                        pointers: c[0],
                        changedPointers: c[1],
                        pointerType: va,
                        srcEvent: a
                    })
                }
            }
        });
        var Ya = {
                touchstart: Aa,
                touchmove: Ba,
                touchend: Ca,
                touchcancel: Da
            },
            Za = "touchstart touchmove touchend touchcancel";
        i(P, x, {
            handler: function(a) {
                var b = Ya[a.type],
                    c = Q.call(this, a, b);
                c && this.callback(this.manager, b, {
                    pointers: c[0],
                    changedPointers: c[1],
                    pointerType: va,
                    srcEvent: a
                })
            }
        }), i(R, x, {
            handler: function(a, b, c) {
                var d = c.pointerType == va,
                    e = c.pointerType == xa;
                if (d) this.mouse.allow = !1;
                else if (e && !this.mouse.allow) return;
                b & (Ca | Da) && (this.mouse.allow = !0), this.callback(a, b, c)
            },
            destroy: function() {
                this.touch.destroy(), this.mouse.destroy()
            }
        });
        var $a = u(ja.style, "touchAction"),
            _a = $a !== d,
            ab = "compute",
            bb = "auto",
            cb = "manipulation",
            db = "none",
            eb = "pan-x",
            fb = "pan-y";
        S.prototype = {
            set: function(a) {
                a == ab && (a = this.compute()), _a && this.manager.element.style && (this.manager.element.style[$a] = a), this.actions = a.toLowerCase().trim()
            },
            update: function() {
                this.set(this.manager.options.touchAction)
            },
            compute: function() {
                var a = [];
                return g(this.manager.recognizers, function(b) {
                    k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()))
                }), T(a.join(" "))
            },
            preventDefaults: function(a) {
                if (!_a) {
                    var b = a.srcEvent,
                        c = a.offsetDirection;
                    if (this.manager.session.prevented) return void b.preventDefault();
                    var d = this.actions,
                        e = p(d, db),
                        f = p(d, fb),
                        g = p(d, eb);
                    if (e) {
                        var h = 1 === a.pointers.length,
                            i = a.distance < 2,
                            j = a.deltaTime < 250;
                        if (h && i && j) return
                    }
                    if (!g || !f) return e || f && c & Ja || g && c & Ka ? this.preventSrc(b) : void 0
                }
            },
            preventSrc: function(a) {
                this.manager.session.prevented = !0, a.preventDefault()
            }
        };
        var gb = 1,
            hb = 2,
            ib = 4,
            jb = 8,
            kb = jb,
            lb = 16,
            mb = 32;
        U.prototype = {
            defaults: {},
            set: function(a) {
                return ha(this.options, a), this.manager && this.manager.touchAction.update(), this
            },
            recognizeWith: function(a) {
                if (f(a, "recognizeWith", this)) return this;
                var b = this.simultaneous;
                return a = X(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this
            },
            dropRecognizeWith: function(a) {
                return f(a, "dropRecognizeWith", this) ? this : (a = X(a, this), delete this.simultaneous[a.id], this)
            },
            requireFailure: function(a) {
                if (f(a, "requireFailure", this)) return this;
                var b = this.requireFail;
                return a = X(a, this), r(b, a) === -1 && (b.push(a), a.requireFailure(this)), this
            },
            dropRequireFailure: function(a) {
                if (f(a, "dropRequireFailure", this)) return this;
                a = X(a, this);
                var b = r(this.requireFail, a);
                return b > -1 && this.requireFail.splice(b, 1), this
            },
            hasRequireFailures: function() {
                return this.requireFail.length > 0
            },
            canRecognizeWith: function(a) {
                return !!this.simultaneous[a.id]
            },
            emit: function(a) {
                function b(b) {
                    c.manager.emit(b, a)
                }
                var c = this,
                    d = this.state;
                d < jb && b(c.options.event + V(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= jb && b(c.options.event + V(d))
            },
            tryEmit: function(a) {
                return this.canEmit() ? this.emit(a) : void(this.state = mb)
            },
            canEmit: function() {
                for (var a = 0; a < this.requireFail.length;) {
                    if (!(this.requireFail[a].state & (mb | gb))) return !1;
                    a++
                }
                return !0
            },
            recognize: function(a) {
                var b = ha({}, a);
                return k(this.options.enable, [this, b]) ? (this.state & (kb | lb | mb) && (this.state = gb), this.state = this.process(b), void(this.state & (hb | ib | jb | lb) && this.tryEmit(b))) : (this.reset(), void(this.state = mb))
            },
            process: function(a) {},
            getTouchAction: function() {},
            reset: function() {}
        }, i(Y, U, {
            defaults: {
                pointers: 1
            },
            attrTest: function(a) {
                var b = this.options.pointers;
                return 0 === b || a.pointers.length === b
            },
            process: function(a) {
                var b = this.state,
                    c = a.eventType,
                    d = b & (hb | ib),
                    e = this.attrTest(a);
                return d && (c & Da || !e) ? b | lb : d || e ? c & Ca ? b | jb : b & hb ? b | ib : hb : mb
            }
        }), i(Z, Y, {
            defaults: {
                event: "pan",
                threshold: 10,
                pointers: 1,
                direction: La
            },
            getTouchAction: function() {
                var a = this.options.direction,
                    b = [];
                return a & Ja && b.push(fb), a & Ka && b.push(eb), b
            },
            directionTest: function(a) {
                var b = this.options,
                    c = !0,
                    d = a.distance,
                    e = a.direction,
                    f = a.deltaX,
                    g = a.deltaY;
                return e & b.direction || (b.direction & Ja ? (e = 0 === f ? Ea : f < 0 ? Fa : Ga, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ea : g < 0 ? Ha : Ia, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction
            },
            attrTest: function(a) {
                return Y.prototype.attrTest.call(this, a) && (this.state & hb || !(this.state & hb) && this.directionTest(a))
            },
            emit: function(a) {
                this.pX = a.deltaX, this.pY = a.deltaY;
                var b = W(a.direction);
                b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a)
            }
        }), i($, Y, {
            defaults: {
                event: "pinch",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [db]
            },
            attrTest: function(a) {
                return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & hb)
            },
            emit: function(a) {
                if (1 !== a.scale) {
                    var b = a.scale < 1 ? "in" : "out";
                    a.additionalEvent = this.options.event + b
                }
                this._super.emit.call(this, a)
            }
        }), i(_, U, {
            defaults: {
                event: "press",
                pointers: 1,
                time: 251,
                threshold: 9
            },
            getTouchAction: function() {
                return [bb]
            },
            process: function(a) {
                var b = this.options,
                    c = a.pointers.length === b.pointers,
                    d = a.distance < b.threshold,
                    f = a.deltaTime > b.time;
                if (this._input = a, !d || !c || a.eventType & (Ca | Da) && !f) this.reset();
                else if (a.eventType & Aa) this.reset(), this._timer = e(function() {
                    this.state = kb, this.tryEmit()
                }, b.time, this);
                else if (a.eventType & Ca) return kb;
                return mb
            },
            reset: function() {
                clearTimeout(this._timer)
            },
            emit: function(a) {
                this.state === kb && (a && a.eventType & Ca ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = na(), this.manager.emit(this.options.event, this._input)))
            }
        }), i(aa, Y, {
            defaults: {
                event: "rotate",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [db]
            },
            attrTest: function(a) {
                return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & hb)
            }
        }), i(ba, Y, {
            defaults: {
                event: "swipe",
                threshold: 10,
                velocity: .3,
                direction: Ja | Ka,
                pointers: 1
            },
            getTouchAction: function() {
                return Z.prototype.getTouchAction.call(this)
            },
            attrTest: function(a) {
                var b, c = this.options.direction;
                return c & (Ja | Ka) ? b = a.overallVelocity : c & Ja ? b = a.overallVelocityX : c & Ka && (b = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && ma(b) > this.options.velocity && a.eventType & Ca
            },
            emit: function(a) {
                var b = W(a.offsetDirection);
                b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a)
            }
        }), i(ca, U, {
            defaults: {
                event: "tap",
                pointers: 1,
                taps: 1,
                interval: 300,
                time: 250,
                threshold: 9,
                posThreshold: 10
            },
            getTouchAction: function() {
                return [cb]
            },
            process: function(a) {
                var b = this.options,
                    c = a.pointers.length === b.pointers,
                    d = a.distance < b.threshold,
                    f = a.deltaTime < b.time;
                if (this.reset(), a.eventType & Aa && 0 === this.count) return this.failTimeout();
                if (d && f && c) {
                    if (a.eventType != Ca) return this.failTimeout();
                    var g = !this.pTime || a.timeStamp - this.pTime < b.interval,
                        h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold;
                    this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;
                    var i = this.count % b.taps;
                    if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function() {
                        this.state = kb, this.tryEmit()
                    }, b.interval, this), hb) : kb
                }
                return mb
            },
            failTimeout: function() {
                return this._timer = e(function() {
                    this.state = mb
                }, this.options.interval, this), mb
            },
            reset: function() {
                clearTimeout(this._timer)
            },
            emit: function() {
                this.state == kb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
            }
        }), da.VERSION = "2.0.6", da.defaults = {
            domEvents: !1,
            touchAction: ab,
            enable: !0,
            inputTarget: null,
            inputClass: null,
            preset: [
                [aa, {
                    enable: !1
                }],
                [$, {
                        enable: !1
                    },
                    ["rotate"]
                ],
                [ba, {
                    direction: Ja
                }],
                [Z, {
                        direction: Ja
                    },
                    ["swipe"]
                ],
                [ca],
                [ca, {
                        event: "doubletap",
                        taps: 2
                    },
                    ["tap"]
                ],
                [_]
            ],
            cssProps: {
                userSelect: "none",
                touchSelect: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        };
        var nb = 1,
            ob = 2;
        ea.prototype = {
            set: function(a) {
                return ha(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this
            },
            stop: function(a) {
                this.session.stopped = a ? ob : nb
            },
            recognize: function(a) {
                var b = this.session;
                if (!b.stopped) {
                    this.touchAction.preventDefaults(a);
                    var c, d = this.recognizers,
                        e = b.curRecognizer;
                    (!e || e && e.state & kb) && (e = b.curRecognizer = null);
                    for (var f = 0; f < d.length;) c = d[f], b.stopped === ob || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (hb | ib | jb) && (e = b.curRecognizer = c), f++
                }
            },
            get: function(a) {
                if (a instanceof U) return a;
                for (var b = this.recognizers, c = 0; c < b.length; c++)
                    if (b[c].options.event == a) return b[c];
                return null
            },
            add: function(a) {
                if (f(a, "add", this)) return this;
                var b = this.get(a.options.event);
                return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a
            },
            remove: function(a) {
                if (f(a, "remove", this)) return this;
                if (a = this.get(a)) {
                    var b = this.recognizers,
                        c = r(b, a);
                    c !== -1 && (b.splice(c, 1), this.touchAction.update())
                }
                return this
            },
            on: function(a, b) {
                var c = this.handlers;
                return g(q(a), function(a) {
                    c[a] = c[a] || [], c[a].push(b)
                }), this
            },
            off: function(a, b) {
                var c = this.handlers;
                return g(q(a), function(a) {
                    b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a]
                }), this
            },
            emit: function(a, b) {
                this.options.domEvents && ga(a, b);
                var c = this.handlers[a] && this.handlers[a].slice();
                if (c && c.length) {
                    b.type = a, b.preventDefault = function() {
                        b.srcEvent.preventDefault()
                    };
                    for (var d = 0; d < c.length;) c[d](b), d++
                }
            },
            destroy: function() {
                this.element && fa(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
            }
        }, ha(da, {
            INPUT_START: Aa,
            INPUT_MOVE: Ba,
            INPUT_END: Ca,
            INPUT_CANCEL: Da,
            STATE_POSSIBLE: gb,
            STATE_BEGAN: hb,
            STATE_CHANGED: ib,
            STATE_ENDED: jb,
            STATE_RECOGNIZED: kb,
            STATE_CANCELLED: lb,
            STATE_FAILED: mb,
            DIRECTION_NONE: Ea,
            DIRECTION_LEFT: Fa,
            DIRECTION_RIGHT: Ga,
            DIRECTION_UP: Ha,
            DIRECTION_DOWN: Ia,
            DIRECTION_HORIZONTAL: Ja,
            DIRECTION_VERTICAL: Ka,
            DIRECTION_ALL: La,
            Manager: ea,
            Input: x,
            TouchAction: S,
            TouchInput: P,
            MouseInput: L,
            PointerEventInput: M,
            TouchMouseInput: R,
            SingleTouchInput: N,
            Recognizer: U,
            AttrRecognizer: Y,
            Tap: ca,
            Pan: Z,
            Swipe: ba,
            Pinch: $,
            Rotate: aa,
            Press: _,
            on: m,
            off: n,
            each: g,
            merge: pa,
            extend: oa,
            assign: ha,
            inherit: i,
            bindFn: j,
            prefixed: u
        });
        var pb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {};
        pb.Hammer = da, "function" == typeof define && define.amd ? define(function() {
            return da
        }) : "undefined" != typeof module && module.exports ? module.exports = da : a[c] = da
    }




    (window, document, "Hammer"),
    

    function(a, b) {
        "object" == typeof module && module.exports ? module.exports = a.document ? b(a) : b : a.Highcharts = b(a)
    }

    ("undefined" != typeof window ? window : this, function(a) {
        function b(b, c) {
            var d = "Highcharts error #" + b + ": www.highcharts.com/errors/" + b;
            if (c) throw Error(d);
            a.console && console.log(d)
        }

        function c(a, b, c) {
            this.options = b, this.elem = a, this.prop = c
        }

        function d() {
            var a, b, c = arguments,
                d = {},
                e = function(a, b) {
                    var c, d;
                    "object" != typeof a && (a = {});
                    for (d in b) b.hasOwnProperty(d) && (c = b[d], a[d] = c && "object" == typeof c && "[object Array]" !== Object.prototype.toString.call(c) && "renderTo" !== d && "number" != typeof c.nodeType ? e(a[d] || {}, c) : b[d]);
                    return a
                };
            for (c[0] === !0 && (d = c[1], c = Array.prototype.slice.call(c, 2)), b = c.length, a = 0; a < b; a++) d = e(d, c[a]);
            return d
        }

        function e(a, b) {
            return parseInt(a, b || 10)
        }

        function f(a) {
            return "string" == typeof a
        }

        function g(a) {
            return a && "object" == typeof a
        }

        function h(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }

        function i(a, b) {
            for (var c = a.length; c--;)
                if (a[c] === b) {
                    a.splice(c, 1);
                    break
                }
        }

        function j(a) {
            return a !== K && null !== a
        }

        function k(a, b, c) {
            var d, e;
            if (f(b)) j(c) ? a.setAttribute(b, c) : a && a.getAttribute && (e = a.getAttribute(b));
            else if (j(b) && g(b))
                for (d in b) a.setAttribute(d, b[d]);
            return e
        }

        function l(a) {
            return h(a) ? a : [a]
        }

        function m(a, b, c) {
            return b ? setTimeout(a, b, c) : void a.call(0, c)
        }

        function n(a, b) {
            va && !Ba && b && b.opacity !== K && (b.filter = "alpha(opacity=" + 100 * b.opacity + ")"), Za(a.style, b)
        }

        function o(a, b, c, d, e) {
            return a = ha.createElement(a), b && Za(a, b), e && n(a, {
                padding: 0,
                border: "none",
                margin: 0
            }), c && n(a, c), d && d.appendChild(a), a
        }

        function p(a, b) {
            var c = function() {};
            return c.prototype = new a, Za(c.prototype, b), c
        }

        function q(a, b, c) {
            return Array((b || 2) + 1 - String(a).length).join(c || 0) + a
        }

        function r(a) {
            return 6e4 * (U && U(a) || T || 0)
        }

        function s(a, b) {
            for (var c, d, e, f, g, h = "{", i = !1, j = [];
                (h = a.indexOf(h)) !== -1;) {
                if (c = a.slice(0, h), i) {
                    for (d = c.split(":"), e = d.shift().split("."), g = e.length, c = b, f = 0; f < g; f++) c = c[e[f]];
                    d.length && (d = d.join(":"), e = /\.([0-9])/, f = O.lang, g = void 0, /f$/.test(d) ? (g = (g = d.match(e)) ? g[1] : -1, null !== c && (c = ga.numberFormat(c, g, f.decimalPoint, d.indexOf(",") > -1 ? f.thousandsSep : ""))) : c = P(d, c))
                }
                j.push(c), a = a.slice(h + 1), h = (i = !i) ? "}" : "{"
            }
            return j.push(a), j.join("")
        }

        function t(a) {
            return ia.pow(10, ka(ia.log(a) / ia.LN10))
        }

        function u(a, b, c, d, e) {
            var f, g = a,
                c = _a(c, 1);
            for (f = a / c, b || (b = [1, 2, 2.5, 5, 10], d === !1 && (1 === c ? b = [1, 2, 5, 10] : c <= .1 && (b = [1 / c]))), d = 0; d < b.length && (g = b[d], !(e && g * c >= a || !e && f <= (b[d] + (b[d + 1] || b[d])) / 2)); d++);
            return g *= c
        }

        function v(a, b) {
            var c, d, e = a.length;
            for (d = 0; d < e; d++) a[d].safeI = d;
            for (a.sort(function(a, d) {
                    return c = b(a, d), 0 === c ? a.safeI - d.safeI : c
                }), d = 0; d < e; d++) delete a[d].safeI
        }

        function w(a) {
            for (var b = a.length, c = a[0]; b--;) a[b] < c && (c = a[b]);
            return c
        }

        function x(a) {
            for (var b = a.length, c = a[0]; b--;) a[b] > c && (c = a[b]);
            return c
        }

        function y(a, b) {
            for (var c in a) a[c] && a[c] !== b && a[c].destroy && a[c].destroy(), delete a[c]
        }

        function z(a) {
            N || (N = o(Ja)), a && N.appendChild(a), N.innerHTML = ""
        }

        function A(a, b) {
            return parseFloat(a.toPrecision(b || 14))
        }

        function B(a, b) {
            b.renderer.globalAnimation = _a(a, b.animation)
        }

        function C(a) {
            return g(a) ? d(a) : {
                duration: a ? 500 : 0
            }
        }

        function D() {
            var b = O.global,
                c = b.useUTC,
                d = c ? "getUTC" : "get",
                e = c ? "setUTC" : "set";
            R = b.Date || a.Date, T = c && b.timezoneOffset, U = c && b.getTimezoneOffset, S = function(a, b, d, e, f, g) {
                var h;
                return c ? (h = R.UTC.apply(0, arguments), h += r(h)) : h = new R(a, b, _a(d, 1), _a(e, 0), _a(f, 0), _a(g, 0)).getTime(), h
            }, V = d + "Minutes", W = d + "Hours", X = d + "Day", Y = d + "Date", Z = d + "Month", $ = d + "FullYear", _ = e + "Milliseconds", aa = e + "Seconds", ba = e + "Minutes", ca = e + "Hours", da = e + "Date", ea = e + "Month", fa = e + "FullYear"
        }

        function E(a) {
            return this instanceof E ? void this.init(a) : new E(a)
        }

        function F() {}

        function G(a, b, c, d) {
            this.axis = a, this.pos = b, this.type = c || "", this.isNew = !0, !c && !d && this.addLabel()
        }

        function H(a, b, c, d, e) {
            var f = a.chart.inverted;
            this.axis = a, this.isNegative = c, this.options = b, this.x = d, this.total = null, this.points = {}, this.stack = e, this.rightCliff = this.leftCliff = 0, this.alignOptions = {
                align: b.align || (f ? c ? "left" : "right" : "center"),
                verticalAlign: b.verticalAlign || (f ? "middle" : c ? "bottom" : "top"),
                y: _a(b.y, f ? 4 : c ? 14 : -6),
                x: _a(b.x, f ? c ? -6 : 6 : 0)
            }, this.textAlign = b.textAlign || (f ? c ? "right" : "left" : "center")
        }

        function I(a) {
            var b = a.options,
                c = b.navigator,
                d = c.enabled,
                b = b.scrollbar,
                e = b.enabled,
                f = d ? c.height : 0,
                g = e ? b.height : 0;
            this.handles = [], this.scrollbarButtons = [], this.elementsToDestroy = [], this.chart = a, this.setBaseSeries(), this.height = f, this.scrollbarHeight = g, this.scrollbarEnabled = e, this.navigatorEnabled = d, this.navigatorOptions = c, this.scrollbarOptions = b, this.outlineHeight = f + g, this.init()
        }

        function J(a) {
            this.init(a)
        }
        var K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca, da, ea, fa, ga, ha = a.document,
            ia = Math,
            ja = ia.round,
            ka = ia.floor,
            la = ia.ceil,
            ma = ia.max,
            na = ia.min,
            oa = ia.abs,
            pa = ia.cos,
            qa = ia.sin,
            ra = ia.PI,
            sa = 2 * ra / 360,
            ta = a.navigator && a.navigator.userAgent || "",
            ua = a.opera,
            va = /(msie|trident|edge)/i.test(ta) && !ua,
            wa = ha && 8 === ha.documentMode,
            xa = !va && /AppleWebKit/.test(ta),
            ya = /Firefox/.test(ta),
            za = /(Mobile|Android|Windows Phone)/.test(ta),
            Aa = "http://www.w3.org/2000/svg",
            Ba = ha && ha.createElementNS && !!ha.createElementNS(Aa, "svg").createSVGRect,
            Ca = ya && parseInt(ta.split("Firefox/")[1], 10) < 4,
            Da = ha && !Ba && !va && !!ha.createElement("canvas").getContext,
            Ea = {},
            Fa = 0,
            Ga = function() {},
            Ha = [],
            Ia = 0,
            Ja = "div",
            Ka = /^[0-9]+$/,
            La = ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            Ma = {};
        ga = a.Highcharts ? b(16, !0) : {
            win: a
        }, ga.seriesTypes = Ma;
        var Na, Oa, Pa, Qa, Ra, Sa, Ta, Ua, Va, Wa, Xa, Ya = [];
        c.prototype = {
            dSetter: function() {
                var a, b = this.paths[0],
                    c = this.paths[1],
                    d = [],
                    e = this.now,
                    f = b.length;
                if (1 === e) d = this.toD;
                else if (f === c.length && e < 1)
                    for (; f--;) a = parseFloat(b[f]), d[f] = isNaN(a) ? b[f] : e * parseFloat(c[f] - a) + a;
                else d = c;
                this.elem.attr("d", d)
            },
            update: function() {
                var a = this.elem,
                    b = this.prop,
                    c = this.now,
                    d = this.options.step;
                this[b + "Setter"] ? this[b + "Setter"]() : a.attr ? a.element && a.attr(b, c) : a.style[b] = c + this.unit, d && d.call(a, c, this)
            },
            run: function(a, b, c) {
                var d, e = this,
                    f = function(a) {
                        return !f.stopped && e.step(a)
                    };
                this.startTime = +new R, this.start = a, this.end = b, this.unit = c, this.now = this.start, this.pos = 0, f.elem = this.elem, f() && 1 === Ya.push(f) && (f.timerId = setInterval(function() {
                    for (d = 0; d < Ya.length; d++) Ya[d]() || Ya.splice(d--, 1);
                    Ya.length || clearInterval(f.timerId)
                }, 13))
            },
            step: function(a) {
                var b, c = +new R,
                    d = this.options;
                b = this.elem;
                var e, f = d.complete,
                    g = d.duration,
                    h = d.curAnim;
                if (b.attr && !b.element) b = !1;
                else if (a || c >= g + this.startTime) {
                    this.now = this.end, this.pos = 1, this.update(), a = h[this.prop] = !0;
                    for (e in h) h[e] !== !0 && (a = !1);
                    a && f && f.call(b), b = !1
                } else this.pos = d.easing((c - this.startTime) / g), this.now = this.start + (this.end - this.start) * this.pos, this.update(), b = !0;
                return b
            },
            initPath: function(a, b, c) {
                var d, b = b || "",
                    e = a.shift,
                    f = b.indexOf("C") > -1,
                    g = f ? 7 : 3,
                    b = b.split(" "),
                    c = [].concat(c),
                    h = a.isArea,
                    i = h ? 2 : 1,
                    j = function(a) {
                        for (d = a.length; d--;)("M" === a[d] || "L" === a[d]) && a.splice(d + 1, 0, a[d + 1], a[d + 2], a[d + 1], a[d + 2])
                    };
                if (f && (j(b), j(c)), e <= c.length / g && b.length === c.length)
                    for (; e--;) c = c.slice(0, g).concat(c), h && (c = c.concat(c.slice(c.length - g)));
                if (a.shift = 0, b.length)
                    for (a = c.length; b.length < a;) e = b.slice().splice(b.length / i - g, g * i), f && (e[g - 6] = e[g - 2], e[g - 5] = e[g - 1]), [].splice.apply(b, [b.length / i, 0].concat(e));
                return [b, c]
            }
        };
        var Za = ga.extend = function(a, b) {
                var c;
                a || (a = {});
                for (c in b) a[c] = b[c];
                return a
            },
            $a = ga.isNumber = function(a) {
                return "number" == typeof a && !isNaN(a)
            },
            _a = ga.pick = function() {
                var a, b, c = arguments,
                    d = c.length;
                for (a = 0; a < d; a++)
                    if (b = c[a], b !== K && null !== b) return b
            },
            ab = ga.wrap = function(a, b, c) {
                var d = a[b];
                a[b] = function() {
                    var a = Array.prototype.slice.call(arguments);
                    return a.unshift(d), c.apply(this, a)
                }
            };
        P = function(a, b, c) {
            if (!$a(b)) return O.lang.invalidDate || "";
            var d, a = _a(a, "%Y-%m-%d %H:%M:%S"),
                e = new R(b - r(b)),
                f = e[W](),
                g = e[X](),
                h = e[Y](),
                i = e[Z](),
                j = e[$](),
                k = O.lang,
                l = k.weekdays,
                m = k.shortWeekdays,
                e = Za({
                    a: m ? m[g] : l[g].substr(0, 3),
                    A: l[g],
                    d: q(h),
                    e: q(h, 2, " "),
                    w: g,
                    b: k.shortMonths[i],
                    B: k.months[i],
                    m: q(i + 1),
                    y: j.toString().substr(2, 2),
                    Y: j,
                    H: q(f),
                    k: f,
                    I: q(f % 12 || 12),
                    l: f % 12 || 12,
                    M: q(e[V]()),
                    p: f < 12 ? "AM" : "PM",
                    P: f < 12 ? "am" : "pm",
                    S: q(e.getSeconds()),
                    L: q(ja(b % 1e3), 3)
                }, ga.dateFormats);
            for (d in e)
                for (; a.indexOf("%" + d) !== -1;) a = a.replace("%" + d, "function" == typeof e[d] ? e[d](b) : e[d]);
            return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a
        }, Q = {
            millisecond: 1,
            second: 1e3,
            minute: 6e4,
            hour: 36e5,
            day: 864e5,
            week: 6048e5,
            month: 24192e5,
            year: 314496e5
        }, ga.numberFormat = function(a, b, c, d) {
            var f, g, a = +a || 0,
                b = +b,
                h = O.lang,
                i = (a.toString().split(".")[1] || "").length,
                j = Math.abs(a);
            return b === -1 ? b = Math.min(i, 20) : $a(b) || (b = 2), f = String(e(j.toFixed(b))), g = f.length > 3 ? f.length % 3 : 0, c = _a(c, h.decimalPoint), d = _a(d, h.thousandsSep), a = a < 0 ? "-" : "", a += g ? f.substr(0, g) + d : "", a += f.substr(g).replace(/(\d{3})(?=\d)/g, "$1" + d), b && (d = Math.abs(j - f + Math.pow(10, -Math.max(b, i) - 1)), a += c + d.toFixed(b).slice(2)), a
        }, Math.easeInOutSine = function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        }, Na = function(b, c) {
            var d;
            return "width" === c ? Math.min(b.offsetWidth, b.scrollWidth) - Na(b, "padding-left") - Na(b, "padding-right") : "height" === c ? Math.min(b.offsetHeight, b.scrollHeight) - Na(b, "padding-top") - Na(b, "padding-bottom") : (d = a.getComputedStyle(b, void 0)) && e(d.getPropertyValue(c))
        }, Oa = function(a, b) {
            return b.indexOf ? b.indexOf(a) : [].indexOf.call(b, a)
        }, Qa = function(a, b) {
            return [].filter.call(a, b)
        }, Sa = function(a, b) {
            for (var c = [], d = 0, e = a.length; d < e; d++) c[d] = b.call(a[d], a[d], d, a);
            return c
        }, Ra = function(b) {
            var c = ha.documentElement,
                b = b.getBoundingClientRect();
            return {
                top: b.top + (a.pageYOffset || c.scrollTop) - (c.clientTop || 0),
                left: b.left + (a.pageXOffset || c.scrollLeft) - (c.clientLeft || 0)
            }
        }, Xa = function(a) {
            for (var b = Ya.length; b--;) Ya[b].elem === a && (Ya[b].stopped = !0)
        }, Pa = function(a, b) {
            return Array.prototype.forEach.call(a, b)
        }, Ta = function(b, c, d) {
            function e(c) {
                c.target = c.srcElement || a, d.call(b, c)
            }
            var f = b.hcEvents = b.hcEvents || {};
            b.addEventListener ? b.addEventListener(c, d, !1) : b.attachEvent && (b.hcEventsIE || (b.hcEventsIE = {}), b.hcEventsIE[d.toString()] = e, b.attachEvent("on" + c, e)), f[c] || (f[c] = []), f[c].push(d)
        }, Ua = function(a, b, c) {
            function d(b, c) {
                a.removeEventListener ? a.removeEventListener(b, c, !1) : a.attachEvent && (c = a.hcEventsIE[c.toString()], a.detachEvent("on" + b, c))
            }

            function e() {
                var c, e, f;
                if (a.nodeName)
                    for (f in b ? (c = {}, c[b] = !0) : c = h, c)
                        if (h[f])
                            for (e = h[f].length; e--;) d(f, h[f][e])
            }
            var f, g, h = a.hcEvents;
            h && (b ? (f = h[b] || [], c ? (g = Oa(c, f), g > -1 && (f.splice(g, 1), h[b] = f), d(b, c)) : (e(), h[b] = [])) : (e(), a.hcEvents = {}))
        }, Va = function(a, b, c, d) {
            var e;
            e = a.hcEvents;
            var f, g, c = c || {};
            if (ha.createEvent && (a.dispatchEvent || a.fireEvent)) e = ha.createEvent("Events"), e.initEvent(b, !0, !0), e.target = a, Za(e, c), a.dispatchEvent ? a.dispatchEvent(e) : a.fireEvent(b, e);
            else if (e)
                for (e = e[b] || [], f = e.length, c.preventDefault || (c.preventDefault = function() {
                        c.defaultPrevented = !0
                    }), c.target = a, c.type || (c.type = b), b = 0; b < f; b++) g = e[b], g.call(a, c) === !1 && c.preventDefault();
            d && !c.defaultPrevented && d(c)
        }, Wa = function(a, b, e) {
            var f, h, i, j, k = "";
            g(e) || (f = arguments, e = {
                duration: f[2],
                easing: f[3],
                complete: f[4]
            }), $a(e.duration) || (e.duration = 400), e.easing = "function" == typeof e.easing ? e.easing : Math[e.easing] || Math.easeInOutSine, e.curAnim = d(b);
            for (j in b) i = new c(a, e, j), h = null, "d" === j ? (i.paths = i.initPath(a, a.d, b.d), i.toD = b.d, f = 0, h = 1) : a.attr ? f = a.attr(j) : (f = parseFloat(Na(a, j)) || 0, "opacity" !== j && (k = "px")), h || (h = b[j]), h.match && h.match("px") && (h = h.replace(/px/g, "")), i.run(f, h, k)
        }, a.jQuery && (a.jQuery.fn.highcharts = function() {
            var a = [].slice.call(arguments);
            if (this[0]) return a[0] ? (new(ga[f(a[0]) ? a.shift() : "Chart"])(this[0], a[0], a[1]), this) : Ha[k(this[0], "data-highcharts-chart")]
        }), ha && !ha.defaultView && (Na = function(a, b) {
            var c;
            return c = {
                width: "clientWidth",
                height: "clientHeight"
            }[b], a.style[b] ? e(a.style[b]) : ("opacity" === b && (b = "filter"), c ? (a.style.zoom = 1, Math.max(a[c] - 2 * Na(a, "padding"), 0)) : (c = a.currentStyle[b.replace(/\-(\w)/g, function(a, b) {
                return b.toUpperCase()
            })], "filter" === b && (c = c.replace(/alpha\(opacity=([0-9]+)\)/, function(a, b) {
                return b / 100
            })), "" === c ? 1 : e(c)))
        }), Array.prototype.forEach || (Pa = function(a, b) {
            for (var c = 0, d = a.length; c < d; c++)
                if (b.call(a[c], a[c], c, a) === !1) return c
        }), Array.prototype.indexOf || (Oa = function(a, b) {
            var c, d = 0;
            if (b)
                for (c = b.length; d < c; d++)
                    if (b[d] === a) return d;
            return -1
        }), Array.prototype.filter || (Qa = function(a, b) {
            for (var c = [], d = 0, e = a.length; d < e; d++) b(a[d], d) && c.push(a[d]);
            return c
        }), ga.Fx = c, ga.inArray = Oa, ga.each = Pa, ga.grep = Qa, ga.offset = Ra, ga.map = Sa, ga.addEvent = Ta, ga.removeEvent = Ua, ga.fireEvent = Va, ga.animate = Wa, ga.animObject = C, ga.stop = Xa, O = {
            colors: "#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#2b908f,#f45b5b,#91e8e1".split(","),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                decimalPoint: ".",
                numericSymbols: "k,M,G,T,P,E".split(","),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {
                useUTC: !0,
                canvasToolsURL: "https://code.highcharts.com/modules/canvas-tools.js",
                VMLRadialGradientURL: "https://code.highcharts.com/stock/4.2.5/gfx/vml-radial-gradient.png"
            },
            chart: {
                borderColor: "#4572A7",
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                backgroundColor: "#FFFFFF",
                plotBorderColor: "#C0C0C0",
                resetZoomButton: {
                    theme: {
                        zIndex: 20
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                }
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                style: {
                    color: "#333333",
                    fontSize: "18px"
                },
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                style: {
                    color: "#555555"
                },
                widthAdjust: -44
            },
            plotOptions: {
                line: {
                    allowPointSelect: !1,
                    showCheckbox: !1,
                    animation: {
                        duration: 1e3
                    },
                    events: {},
                    lineWidth: 2,
                    marker: {
                        lineWidth: 0,
                        radius: 4,
                        lineColor: "#FFFFFF",
                        states: {
                            hover: {
                                enabled: !0,
                                lineWidthPlus: 1,
                                radiusPlus: 2
                            },
                            select: {
                                fillColor: "#FFFFFF",
                                lineColor: "#000000",
                                lineWidth: 2
                            }
                        }
                    },
                    point: {
                        events: {}
                    },
                    dataLabels: {
                        align: "center",
                        formatter: function() {
                            return null === this.y ? "" : ga.numberFormat(this.y, -1)
                        },
                        style: {
                            color: "contrast",
                            fontSize: "11px",
                            fontWeight: "bold",
                            textShadow: "0 0 6px contrast, 0 0 3px contrast"
                        },
                        verticalAlign: "bottom",
                        x: 0,
                        y: 0,
                        padding: 5
                    },
                    cropThreshold: 300,
                    pointRange: 0,
                    softThreshold: !0,
                    states: {
                        hover: {
                            lineWidthPlus: 1,
                            marker: {},
                            halo: {
                                size: 10,
                                opacity: .25
                            }
                        },
                        select: {
                            marker: {}
                        }
                    },
                    stickyTracking: !0,
                    turboThreshold: 1e3
                }
            },
            labels: {
                style: {
                    position: "absolute",
                    color: "#3E576F"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: "#909090",
                borderRadius: 0,
                navigation: {
                    activeColor: "#274b6d",
                    inactiveColor: "#CCC"
                },
                shadow: !1,
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold"
                },
                itemHoverStyle: {
                    color: "#000"
                },
                itemHiddenStyle: {
                    color: "#CCC"
                },
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "white",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: Ba,
                backgroundColor: "rgba(249, 249, 249, .85)",
                borderWidth: 1,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
                shadow: !0,
                snap: za ? 25 : 10,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    padding: "8px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                text: "Highcharts.com",
                href: "https://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#909090",
                    fontSize: "9px"
                }
            }
        };
        var bb = O.plotOptions,
            cb = bb.line;
        D(), E.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(a) {
                    return [e(a[1]), e(a[2]), e(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
                parse: function(a) {
                    return [e(a[1], 16), e(a[2], 16), e(a[3], 16), 1]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function(a) {
                    return [e(a[1]), e(a[2]), e(a[3]), 1]
                }
            }],
            init: function(a) {
                var b, c, d, e;
                if ((this.input = a) && a.stops) this.stops = Sa(a.stops, function(a) {
                    return new E(a[1])
                });
                else
                    for (d = this.parsers.length; d-- && !c;) e = this.parsers[d], (b = e.regex.exec(a)) && (c = e.parse(b));
                this.rgba = c || []
            },
            get: function(a) {
                var b, c = this.input,
                    e = this.rgba;
                return this.stops ? (b = d(c), b.stops = [].concat(b.stops), Pa(this.stops, function(c, d) {
                    b.stops[d] = [b.stops[d][0], c.get(a)]
                })) : b = e && $a(e[0]) ? "rgb" === a || !a && 1 === e[3] ? "rgb(" + e[0] + "," + e[1] + "," + e[2] + ")" : "a" === a ? e[3] : "rgba(" + e.join(",") + ")" : c, b
            },
            brighten: function(a) {
                var b, c = this.rgba;
                if (this.stops) Pa(this.stops, function(b) {
                    b.brighten(a)
                });
                else if ($a(a) && 0 !== a)
                    for (b = 0; b < 3; b++) c[b] += e(255 * a), c[b] < 0 && (c[b] = 0), c[b] > 255 && (c[b] = 255);
                return this
            },
            setOpacity: function(a) {
                return this.rgba[3] = a, this
            }
        }, F.prototype = {
            opacity: 1,
            textProps: "direction,fontSize,fontWeight,fontFamily,fontStyle,color,lineHeight,width,textDecoration,textOverflow,textShadow".split(","),
            init: function(a, b) {
                this.element = "span" === b ? o(b) : ha.createElementNS(Aa, b), this.renderer = a
            },
            animate: function(a, b, c) {
                return b = _a(b, this.renderer.globalAnimation, !0), Xa(this), b ? (c && (b.complete = c), Wa(this, a, b)) : this.attr(a, null, c), this
            },
            colorGradient: function(a, b, c) {
                var e, f, g, i, k, l, m, n, o, p, q, r, s = this.renderer,
                    t = [];
                if (a.linearGradient ? f = "linearGradient" : a.radialGradient && (f = "radialGradient"), f) {
                    g = a[f], k = s.gradients, m = a.stops, p = c.radialReference, h(g) && (a[f] = g = {
                        x1: g[0],
                        y1: g[1],
                        x2: g[2],
                        y2: g[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === f && p && !j(g.gradientUnits) && (i = g, g = d(g, s.getRadialAttr(p, i), {
                        gradientUnits: "userSpaceOnUse"
                    }));
                    for (q in g) "id" !== q && t.push(q, g[q]);
                    for (q in m) t.push(m[q]);
                    t = t.join(","), k[t] ? p = k[t].attr("id") : (g.id = p = "highcharts-" + Fa++, k[t] = l = s.createElement(f).attr(g).add(s.defs), l.radAttr = i, l.stops = [], Pa(m, function(a) {
                        0 === a[1].indexOf("rgba") ? (e = E(a[1]), n = e.get("rgb"), o = e.get("a")) : (n = a[1], o = 1), a = s.createElement("stop").attr({
                            offset: a[0],
                            "stop-color": n,
                            "stop-opacity": o
                        }).add(l), l.stops.push(a)
                    })), r = "url(" + s.url + "#" + p + ")", c.setAttribute(b, r), c.gradient = t, a.toString = function() {
                        return r
                    }
                }
            },
            applyTextShadow: function(a) {
                var b, c = this.element,
                    d = a.indexOf("contrast") !== -1,
                    f = {},
                    g = this.renderer.forExport,
                    h = g || c.style.textShadow !== K && !va;
                d && (f.textShadow = a = a.replace(/contrast/g, this.renderer.getContrast(c.style.fill))), (xa || g) && (f.textRendering = "geometricPrecision"), h ? this.css(f) : (this.fakeTS = !0, this.ySetter = this.xSetter, b = [].slice.call(c.getElementsByTagName("tspan")), Pa(a.split(/\s?,\s?/g), function(a) {
                    var d, f, g = c.firstChild,
                        a = a.split(" ");
                    d = a[a.length - 1], (f = a[a.length - 2]) && Pa(b, function(a, b) {
                        var h;
                        0 === b && (a.setAttribute("x", c.getAttribute("x")), b = c.getAttribute("y"), a.setAttribute("y", b || 0), null === b && c.setAttribute("y", 0)), h = a.cloneNode(1), k(h, {
                            "class": "highcharts-text-shadow",
                            fill: d,
                            stroke: d,
                            "stroke-opacity": 1 / ma(e(f), 3),
                            "stroke-width": f,
                            "stroke-linejoin": "round"
                        }), c.insertBefore(h, g)
                    })
                }))
            },
            attr: function(a, b, c) {
                var d, e, f, g = this.element,
                    h = this;
                if ("string" == typeof a && b !== K && (d = a, a = {}, a[d] = b), "string" == typeof a) h = (this[a + "Getter"] || this._defaultGetter).call(this, a, g);
                else {
                    for (d in a) b = a[d], f = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(d) && (e || (this.symbolAttr(a), e = !0), f = !0), !this.rotation || "x" !== d && "y" !== d || (this.doTransform = !0), f || (f = this[d + "Setter"] || this._defaultSetter, f.call(this, b, d, g), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(d) && this.updateShadows(d, b, f));
                    this.doTransform && (this.updateTransform(), this.doTransform = !1)
                }
                return c && c(), h
            },
            updateShadows: function(a, b, c) {
                for (var d = this.shadows, e = d.length; e--;) c.call(d[e], "height" === a ? Math.max(b - (d[e].cutHeight || 0), 0) : "d" === a ? this.d : b, a, d[e])
            },
            addClass: function(a) {
                var b = this.element,
                    c = k(b, "class") || "";
                return c.indexOf(a) === -1 && k(b, "class", c + " " + a), this
            },
            symbolAttr: function(a) {
                var b = this;
                Pa("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","), function(c) {
                    b[c] = _a(a[c], b[c])
                }), b.attr({
                    d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)
                })
            },
            clip: function(a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function(a) {
                var b, c, d = {},
                    e = this.strokeWidth || 0;
                c = ja(e) % 2 / 2, a.x = ka(a.x || this.x || 0) + c, a.y = ka(a.y || this.y || 0) + c, a.width = ka((a.width || this.width || 0) - 2 * c), a.height = ka((a.height || this.height || 0) - 2 * c), a.strokeWidth = e;
                for (b in a) this[b] !== a[b] && (this[b] = d[b] = a[b]);
                return d
            },
            css: function(a) {
                var b, c, d = this.styles,
                    f = {},
                    g = this.element,
                    h = "";
                if (b = !d, a && a.color && (a.fill = a.color), d)
                    for (c in a) a[c] !== d[c] && (f[c] = a[c], b = !0);
                if (b) {
                    if (b = this.textWidth = a && a.width && "text" === g.nodeName.toLowerCase() && e(a.width) || this.textWidth, d && (a = Za(d, f)), this.styles = a, b && (Da || !Ba && this.renderer.forExport) && delete a.width, va && !Ba) n(this.element, a);
                    else {
                        d = function(a, b) {
                            return "-" + b.toLowerCase()
                        };
                        for (c in a) h += c.replace(/([A-Z])/g, d) + ":" + a[c] + ";";
                        k(g, "style", h)
                    }
                    b && this.added && this.renderer.buildText(this)
                }
                return this
            },
            on: function(a, b) {
                var c = this,
                    d = c.element;
                return M && "click" === a ? (d.ontouchstart = function(a) {
                    c.touchEventFired = R.now(), a.preventDefault(), b.call(d, a)
                }, d.onclick = function(a) {
                    (ta.indexOf("Android") === -1 || R.now() - (c.touchEventFired || 0) > 1100) && b.call(d, a)
                }) : d["on" + a] = b, this
            },
            setRadialReference: function(a) {
                var b = this.renderer.gradients[this.element.gradient];
                return this.element.radialReference = a, b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr)), this
            },
            translate: function(a, b) {
                return this.attr({
                    translateX: a,
                    translateY: b
                })
            },
            invert: function() {
                return this.inverted = !0, this.updateTransform(), this
            },
            updateTransform: function() {
                var a = this.translateX || 0,
                    b = this.translateY || 0,
                    c = this.scaleX,
                    d = this.scaleY,
                    e = this.inverted,
                    f = this.rotation,
                    g = this.element;
                e && (a += this.attr("width"), b += this.attr("height")), a = ["translate(" + a + "," + b + ")"], e ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + (g.getAttribute("x") || 0) + " " + (g.getAttribute("y") || 0) + ")"), (j(c) || j(d)) && a.push("scale(" + _a(c, 1) + " " + _a(d, 1) + ")"), a.length && g.setAttribute("transform", a.join(" "))
            },
            toFront: function() {
                var a = this.element;
                return a.parentNode.appendChild(a), this
            },
            align: function(a, b, c) {
                var d, e, g, h, j = {};
                return e = this.renderer, g = e.alignedObjects, a ? (this.alignOptions = a, this.alignByTranslate = b, (!c || f(c)) && (this.alignTo = d = c || "renderer", i(g, this), g.push(this), c = null)) : (a = this.alignOptions, b = this.alignByTranslate, d = this.alignTo), c = _a(c, e[d], e), d = a.align, e = a.verticalAlign, g = (c.x || 0) + (a.x || 0), h = (c.y || 0) + (a.y || 0), "right" !== d && "center" !== d || (g += (c.width - (a.width || 0)) / {
                    right: 1,
                    center: 2
                }[d]), j[b ? "translateX" : "x"] = ja(g), "bottom" !== e && "middle" !== e || (h += (c.height - (a.height || 0)) / ({
                    bottom: 1,
                    middle: 2
                }[e] || 1)), j[b ? "translateY" : "y"] = ja(h), this[this.placed ? "animate" : "attr"](j), this.placed = !0, this.alignAttr = j, this
            },
            getBBox: function(a, b) {
                var c, d, e, f, g = this.renderer,
                    h = this.element,
                    i = this.styles;
                d = this.textStr;
                var j, k, l, m = h.style,
                    n = g.cache,
                    o = g.cacheKeys;
                if (e = _a(b, this.rotation), f = e * sa, d !== K && (l = ["", e || 0, i && i.fontSize, h.style.width].join(","), l = "" === d || Ka.test(d) ? "num:" + d.toString().length + l : d + l), l && !a && (c = n[l]), !c) {
                    if (h.namespaceURI === Aa || g.forExport) {
                        try {
                            k = this.fakeTS && function(a) {
                                Pa(h.querySelectorAll(".highcharts-text-shadow"), function(b) {
                                    b.style.display = a
                                })
                            }, ya && m.textShadow ? (j = m.textShadow, m.textShadow = "") : k && k("none"), c = h.getBBox ? Za({}, h.getBBox()) : {
                                width: h.offsetWidth,
                                height: h.offsetHeight
                            }, j ? m.textShadow = j : k && k("")
                        } catch (p) {}(!c || c.width < 0) && (c = {
                            width: 0,
                            height: 0
                        })
                    } else c = this.htmlGetBBox();
                    if (g.isSVG && (g = c.width, d = c.height, va && i && "11px" === i.fontSize && "16.9" === d.toPrecision(3) && (c.height = d = 14), e && (c.width = oa(d * qa(f)) + oa(g * pa(f)), c.height = oa(d * pa(f)) + oa(g * qa(f)))), l) {
                        for (; o.length > 250;) delete n[o.shift()];
                        n[l] || o.push(l), n[l] = c
                    }
                }
                return c
            },
            show: function(a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function() {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function(a) {
                var b = this;
                b.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function() {
                        b.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function(a) {
                var b, c = this.renderer,
                    d = this.element;
                return a && (this.parentGroup = a), this.parentInverted = a && a.inverted, void 0 !== this.textStr && c.buildText(this), this.added = !0, (!a || a.handleZ || this.zIndex) && (b = this.zIndexSetter()), b || (a ? a.element : c.box).appendChild(d), this.onAdd && this.onAdd(), this
            },
            safeRemoveChild: function(a) {
                var b = a.parentNode;
                b && b.removeChild(a)
            },
            destroy: function() {
                var a, b, c = this,
                    d = c.element || {},
                    e = c.shadows,
                    f = c.renderer.isSVG && "SPAN" === d.nodeName && c.parentGroup;
                if (d.onclick = d.onmouseout = d.onmouseover = d.onmousemove = d.point = null, Xa(c), c.clipPath && (c.clipPath = c.clipPath.destroy()), c.stops) {
                    for (b = 0; b < c.stops.length; b++) c.stops[b] = c.stops[b].destroy();
                    c.stops = null
                }
                for (c.safeRemoveChild(d), e && Pa(e, function(a) {
                        c.safeRemoveChild(a)
                    }); f && f.div && 0 === f.div.childNodes.length;) d = f.parentGroup, c.safeRemoveChild(f.div), delete f.div, f = d;
                c.alignTo && i(c.renderer.alignedObjects, c);
                for (a in c) delete c[a];
                return null
            },
            shadow: function(a, b, c) {
                var d, e, f, g, h, i, j = [],
                    l = this.element;
                if (a) {
                    for (g = _a(a.width, 3), h = (a.opacity || .15) / g, i = this.parentInverted ? "(-1,-1)" : "(" + _a(a.offsetX, 1) + ", " + _a(a.offsetY, 1) + ")", d = 1; d <= g; d++) e = l.cloneNode(0), f = 2 * g + 1 - 2 * d, k(e, {
                        isShadow: "true",
                        stroke: a.color || "black",
                        "stroke-opacity": h * d,
                        "stroke-width": f,
                        transform: "translate" + i,
                        fill: "none"
                    }), c && (k(e, "height", ma(k(e, "height") - f, 0)), e.cutHeight = f), b ? b.element.appendChild(e) : l.parentNode.insertBefore(e, l), j.push(e);
                    this.shadows = j
                }
                return this
            },
            xGetter: function(a) {
                return "circle" === this.element.nodeName && (a = {
                    x: "cx",
                    y: "cy"
                }[a] || a), this._defaultGetter(a)
            },
            _defaultGetter: function(a) {
                return a = _a(this[a], this.element ? this.element.getAttribute(a) : null, 0), /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a)), a
            },
            dSetter: function(a, b, c) {
                a && a.join && (a = a.join(" ")), /(NaN| {2}|^$)/.test(a) && (a = "M 0 0"), c.setAttribute(b, a), this[b] = a
            },
            dashstyleSetter: function(a) {
                var b, c = this["stroke-width"];
                if ("inherit" === c && (c = 1), a = a && a.toLowerCase()) {
                    for (a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","), b = a.length; b--;) a[b] = e(a[b]) * c;
                    a = a.join(",").replace(/NaN/g, "none"), this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function(a) {
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[a])
            },
            opacitySetter: function(a, b, c) {
                this[b] = a, c.setAttribute(b, a)
            },
            titleSetter: function(a) {
                var b = this.element.getElementsByTagName("title")[0];
                b || (b = ha.createElementNS(Aa, "title"), this.element.appendChild(b)), b.firstChild && b.removeChild(b.firstChild), b.appendChild(ha.createTextNode(String(_a(a), "").replace(/<[^>]*>/g, "")))
            },
            textSetter: function(a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function(a, b, c) {
                "string" == typeof a ? c.setAttribute(b, a) : a && this.colorGradient(a, b, c)
            },
            visibilitySetter: function(a, b, c) {
                "inherit" === a ? c.removeAttribute(b) : c.setAttribute(b, a)
            },
            zIndexSetter: function(a, b) {
                var c, d, f, g = this.renderer,
                    h = this.parentGroup,
                    g = (h || g).element || g.box,
                    i = this.element;
                c = this.added;
                var k;
                if (j(a) && (i.zIndex = a, a = +a, this[b] === a && (c = !1), this[b] = a), c) {
                    for ((a = this.zIndex) && h && (h.handleZ = !0), h = g.childNodes, k = 0; k < h.length && !f; k++) c = h[k], d = c.zIndex, c !== i && (e(d) > a || !j(a) && j(d)) && (g.insertBefore(i, c), f = !0);
                    f || g.appendChild(i)
                }
                return f
            },
            _defaultSetter: function(a, b, c) {
                c.setAttribute(b, a)
            }
        }, F.prototype.yGetter = F.prototype.xGetter, F.prototype.translateXSetter = F.prototype.translateYSetter = F.prototype.rotationSetter = F.prototype.verticalAlignSetter = F.prototype.scaleXSetter = F.prototype.scaleYSetter = function(a, b) {
            this[b] = a, this.doTransform = !0
        }, F.prototype["stroke-widthSetter"] = F.prototype.strokeSetter = function(a, b, c) {
            this[b] = a, this.stroke && this["stroke-width"] ? (this.strokeWidth = this["stroke-width"], F.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke && (c.removeAttribute("stroke"), this.hasStroke = !1)
        };
        var db = function() {
            this.init.apply(this, arguments)
        };
        db.prototype = {
            Element: F,
            init: function(b, c, d, e, f, g) {
                var h, e = this.createElement("svg").attr({
                    version: "1.1"
                }).css(this.getStyle(e));
                h = e.element, b.appendChild(h), b.innerHTML.indexOf("xmlns") === -1 && k(h, "xmlns", Aa), this.isSVG = !0, this.box = h, this.boxWrapper = e, this.alignedObjects = [], this.url = (ya || xa) && ha.getElementsByTagName("base").length ? a.location.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "", this.createElement("desc").add().element.appendChild(ha.createTextNode("Created with Highstock 4.2.5")), this.defs = this.createElement("defs").add(), this.allowHTML = g, this.forExport = f, this.gradients = {}, this.cache = {}, this.cacheKeys = [], this.imgCount = 0, this.setSize(c, d, !1);
                var i;
                ya && b.getBoundingClientRect && (this.subPixelFix = c = function() {
                    n(b, {
                        left: 0,
                        top: 0
                    }), i = b.getBoundingClientRect(), n(b, {
                        left: la(i.left) - i.left + "px",
                        top: la(i.top) - i.top + "px"
                    })
                }, c(), Ta(a, "resize", c))
            },
            getStyle: function(a) {
                return this.style = Za({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var b = this.defs;
                return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), y(this.gradients || {}), this.gradients = null, b && (this.defs = b.destroy()), this.subPixelFix && Ua(a, "resize", this.subPixelFix), this.alignedObjects = null
            },
            createElement: function(a) {
                var b = new this.Element;
                return b.init(this, a), b
            },
            draw: function() {},
            getRadialAttr: function(a, b) {
                return {
                    cx: a[0] - a[2] / 2 + b.cx * a[2],
                    cy: a[1] - a[2] / 2 + b.cy * a[2],
                    r: b.r * a[2]
                }
            },
            buildText: function(a) {
                for (var b, c, d, f = a.element, g = this, h = g.forExport, i = _a(a.textStr, "").toString(), j = i.indexOf("<") !== -1, l = f.childNodes, m = k(f, "x"), o = a.styles, p = a.textWidth, q = o && o.lineHeight, r = o && o.textShadow, s = o && "ellipsis" === o.textOverflow, t = l.length, u = p && !a.added && this.box, v = function(a) {
                        return q ? e(q) : g.fontMetrics(/(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : o && o.fontSize || g.style.fontSize || 12, a).h
                    }, w = function(a) {
                        return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
                    }; t--;) f.removeChild(l[t]);
                j || r || s || i.indexOf(" ") !== -1 ? (b = /<.*style="([^"]+)".*>/, c = /<.*href="(http[^"]+)".*>/, u && u.appendChild(f), i = j ? i.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [i], i = Qa(i, function(a) {
                    return "" !== a
                }), Pa(i, function(e, i) {
                    var j, l = 0,
                        e = e.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                    j = e.split("|||"), Pa(j, function(e) {
                        if ("" !== e || 1 === j.length) {
                            var q, r = {},
                                t = ha.createElementNS(Aa, "tspan");
                            if (b.test(e) && (q = e.match(b)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), k(t, "style", q)), c.test(e) && !h && (k(t, "onclick", 'location.href="' + e.match(c)[1] + '"'), n(t, {
                                    cursor: "pointer"
                                })), e = w(e.replace(/<(.|\n)*?>/g, "") || " "), " " !== e) {
                                if (t.appendChild(ha.createTextNode(e)), l ? r.dx = 0 : i && null !== m && (r.x = m), k(t, r), f.appendChild(t), !l && i && (!Ba && h && n(t, {
                                        display: "block"
                                    }), k(t, "dy", v(t))), p) {
                                    for (var u, x, r = e.replace(/([^\^])-/g, "$1- ").split(" "), y = j.length > 1 || i || r.length > 1 && "nowrap" !== o.whiteSpace, z = [], A = v(t), B = 1, C = a.rotation, D = e, E = D.length;
                                        (y || s) && (r.length || z.length);) a.rotation = 0, u = a.getBBox(!0), x = u.width, !Ba && g.forExport && (x = g.measureSpanWidth(t.firstChild.data, a.styles)), u = x > p, void 0 === d && (d = u), s && d ? (E /= 2, "" === D || !u && E < .5 ? r = [] : (D = e.substring(0, D.length + (u ? -1 : 1) * la(E)), r = [D + (p > 3 ? "…" : "")], t.removeChild(t.firstChild))) : u && 1 !== r.length ? (t.removeChild(t.firstChild), z.unshift(r.pop())) : (r = z, z = [], r.length && (B++, t = ha.createElementNS(Aa, "tspan"), k(t, {
                                        dy: A,
                                        x: m
                                    }), q && k(t, "style", q), f.appendChild(t)), x > p && (p = x)), r.length && t.appendChild(ha.createTextNode(r.join(" ").replace(/- /g, "-")));
                                    a.rotation = C
                                }
                                l++
                            }
                        }
                    })
                }), d && a.attr("title", a.textStr), u && u.removeChild(f), r && a.applyTextShadow && a.applyTextShadow(r)) : f.appendChild(ha.createTextNode(w(i)))
            },
            getContrast: function(a) {
                return a = E(a).rgba, a[0] + a[1] + a[2] > 384 ? "#000000" : "#FFFFFF"
            },
            button: function(a, b, c, e, f, g, h, i, j) {
                var k, l, m, n, o, p, q = this.label(a, b, c, j, null, null, null, null, "button"),
                    r = 0,
                    a = {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    f = d({
                        "stroke-width": 1,
                        stroke: "#CCCCCC",
                        fill: {
                            linearGradient: a,
                            stops: [
                                [0, "#FEFEFE"],
                                [1, "#F6F6F6"]
                            ]
                        },
                        r: 2,
                        padding: 5,
                        style: {
                            color: "black"
                        }
                    }, f);
                return m = f.style, delete f.style, g = d(f, {
                    stroke: "#68A",
                    fill: {
                        linearGradient: a,
                        stops: [
                            [0, "#FFF"],
                            [1, "#ACF"]
                        ]
                    }
                }, g), n = g.style, delete g.style, h = d(f, {
                    stroke: "#68A",
                    fill: {
                        linearGradient: a,
                        stops: [
                            [0, "#9BD"],
                            [1, "#CDF"]
                        ]
                    }
                }, h), o = h.style, delete h.style, i = d(f, {
                    style: {
                        color: "#CCC"
                    }
                }, i), p = i.style, delete i.style, Ta(q.element, va ? "mouseover" : "mouseenter", function() {
                    3 !== r && q.attr(g).css(n)
                }), Ta(q.element, va ? "mouseout" : "mouseleave", function() {
                    3 !== r && (k = [f, g, h][r], l = [m, n, o][r], q.attr(k).css(l))
                }), q.setState = function(a) {
                    (q.state = r = a) ? 2 === a ? q.attr(h).css(o) : 3 === a && q.attr(i).css(p): q.attr(f).css(m)
                }, q.on("click", function(a) {
                    3 !== r && e.call(q, a)
                }).attr(f).css(Za({
                    cursor: "default"
                }, m))
            },
            crispLine: function(a, b) {
                return a[1] === a[4] && (a[1] = a[4] = ja(a[1]) - b % 2 / 2), a[2] === a[5] && (a[2] = a[5] = ja(a[2]) + b % 2 / 2), a
            },
            path: function(a) {
                var b = {
                    fill: "none"
                };
                return h(a) ? b.d = a : g(a) && Za(b, a), this.createElement("path").attr(b)
            },
            circle: function(a, b, c) {
                return a = g(a) ? a : {
                    x: a,
                    y: b,
                    r: c
                }, b = this.createElement("circle"), b.xSetter = b.ySetter = function(a, b, c) {
                    c.setAttribute("c" + b, a)
                }, b.attr(a)
            },
            arc: function(a, b, c, d, e, f) {
                return g(a) && (b = a.y, c = a.r, d = a.innerR, e = a.start, f = a.end, a = a.x), a = this.symbol("arc", a || 0, b || 0, c || 0, c || 0, {
                    innerR: d || 0,
                    start: e || 0,
                    end: f || 0
                }), a.r = c, a
            },
            rect: function(a, b, c, d, e, f) {
                var e = g(a) ? a.r : e,
                    h = this.createElement("rect"),
                    a = g(a) ? a : a === K ? {} : {
                        x: a,
                        y: b,
                        width: ma(c, 0),
                        height: ma(d, 0)
                    };
                return f !== K && (h.strokeWidth = f, a = h.crisp(a)), e && (a.r = e), h.rSetter = function(a, b, c) {
                    k(c, {
                        rx: a,
                        ry: a
                    })
                }, h.attr(a)
            },
            setSize: function(a, b, c) {
                var d = this.alignedObjects,
                    e = d.length;
                for (this.width = a, this.height = b, this.boxWrapper[_a(c, !0) ? "animate" : "attr"]({
                        width: a,
                        height: b
                    }); e--;) d[e].align()
            },
            g: function(a) {
                var b = this.createElement("g");
                return j(a) ? b.attr({
                    "class": "highcharts-" + a
                }) : b
            },
            image: function(a, b, c, d, e) {
                var f = {
                    preserveAspectRatio: "none"
                };
                return arguments.length > 1 && Za(f, {
                    x: b,
                    y: c,
                    width: d,
                    height: e
                }), f = this.createElement("image").attr(f), f.element.setAttributeNS ? f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : f.element.setAttribute("hc-svg-href", a), f
            },
            symbol: function(a, b, c, d, e, f) {
                var g, h, i, j = this,
                    k = this.symbols[a],
                    k = k && k(ja(b), ja(c), d, e, f),
                    l = /^url\((.*?)\)$/;
                return k ? (g = this.path(k), Za(g, {
                    symbolName: a,
                    x: b,
                    y: c,
                    width: d,
                    height: e
                }), f && Za(g, f)) : l.test(a) && (i = function(a, b) {
                    a.element && (a.attr({
                        width: b[0],
                        height: b[1]
                    }), a.alignByTranslate || a.translate(ja((d - b[0]) / 2), ja((e - b[1]) / 2)))
                }, h = a.match(l)[1], a = Ea[h] || f && f.width && f.height && [f.width, f.height], g = this.image(h).attr({
                    x: b,
                    y: c
                }), g.isImg = !0, a ? i(g, a) : (g.attr({
                    width: 0,
                    height: 0
                }), o("img", {
                    onload: function() {
                        0 === this.width && (n(this, {
                            position: "absolute",
                            top: "-999em"
                        }), ha.body.appendChild(this)), i(g, Ea[h] = [this.width, this.height]), this.parentNode && this.parentNode.removeChild(this), j.imgCount--, !j.imgCount && Ha[j.chartIndex].onload && Ha[j.chartIndex].onload()
                    },
                    src: h
                }), this.imgCount++)), g
            },
            symbols: {
                circle: function(a, b, c, d) {
                    var e = .166 * c;
                    return ["M", a + c / 2, b, "C", a + c + e, b, a + c + e, b + d, a + c / 2, b + d, "C", a - e, b + d, a - e, b, a + c / 2, b, "Z"]
                },
                square: function(a, b, c, d) {
                    return ["M", a, b, "L", a + c, b, a + c, b + d, a, b + d, "Z"]
                },
                triangle: function(a, b, c, d) {
                    return ["M", a + c / 2, b, "L", a + c, b + d, a, b + d, "Z"]
                },
                "triangle-down": function(a, b, c, d) {
                    return ["M", a, b, "L", a + c, b, a + c / 2, b + d, "Z"]
                },
                diamond: function(a, b, c, d) {
                    return ["M", a + c / 2, b, "L", a + c, b + d / 2, a + c / 2, b + d, a, b + d / 2, "Z"]
                },
                arc: function(a, b, c, d, e) {
                    var f = e.start,
                        c = e.r || c || d,
                        g = e.end - .001,
                        d = e.innerR,
                        h = e.open,
                        i = pa(f),
                        j = qa(f),
                        k = pa(g),
                        g = qa(g),
                        e = e.end - f < ra ? 0 : 1;
                    return ["M", a + c * i, b + c * j, "A", c, c, 0, e, 1, a + c * k, b + c * g, h ? "M" : "L", a + d * k, b + d * g, "A", d, d, 0, e, 0, a + d * i, b + d * j, h ? "" : "Z"]
                },
                callout: function(a, b, c, d, e) {
                    var f, g = na(e && e.r || 0, c, d),
                        h = g + 6,
                        i = e && e.anchorX,
                        e = e && e.anchorY;
                    return f = ["M", a + g, b, "L", a + c - g, b, "C", a + c, b, a + c, b, a + c, b + g, "L", a + c, b + d - g, "C", a + c, b + d, a + c, b + d, a + c - g, b + d, "L", a + g, b + d, "C", a, b + d, a, b + d, a, b + d - g, "L", a, b + g, "C", a, b, a, b, a + g, b], i && i > c && e > b + h && e < b + d - h ? f.splice(13, 3, "L", a + c, e - 6, a + c + 6, e, a + c, e + 6, a + c, b + d - g) : i && i < 0 && e > b + h && e < b + d - h ? f.splice(33, 3, "L", a, e + 6, a - 6, e, a, e - 6, a, b + g) : e && e > d && i > a + h && i < a + c - h ? f.splice(23, 3, "L", i + 6, b + d, i, b + d + 6, i - 6, b + d, a + g, b + d) : e && e < 0 && i > a + h && i < a + c - h && f.splice(3, 3, "L", i - 6, b, i, b - 6, i + 6, b, c - g, b), f
                }
            },
            clipRect: function(a, b, c, d) {
                var e = "highcharts-" + Fa++,
                    f = this.createElement("clipPath").attr({
                        id: e
                    }).add(this.defs),
                    a = this.rect(a, b, c, d, 0).add(f);
                return a.id = e, a.clipPath = f, a.count = 0, a
            },
            text: function(a, b, c, d) {
                var e = Da || !Ba && this.forExport,
                    f = {};
                return !d || !this.allowHTML && this.forExport ? (f.x = Math.round(b || 0), c && (f.y = Math.round(c)), (a || 0 === a) && (f.text = a), a = this.createElement("text").attr(f), e && a.css({
                    position: "absolute"
                }), d || (a.xSetter = function(a, b, c) {
                    var d, e, f = c.getElementsByTagName("tspan"),
                        g = c.getAttribute(b);
                    for (e = 0; e < f.length; e++) d = f[e], d.getAttribute(b) === g && d.setAttribute(b, a);
                    c.setAttribute(b, a)
                }), a) : this.html(a, b, c)
            },
            fontMetrics: function(b, c) {
                var d, f, b = b || this.style.fontSize;
                return !b && c && a.getComputedStyle && (c = c.element || c, b = (d = a.getComputedStyle(c, "")) && d.fontSize), b = /px/.test(b) ? e(b) : /em/.test(b) ? 12 * parseFloat(b) : 12, d = b < 24 ? b + 3 : ja(1.2 * b), f = ja(.8 * d), {
                    h: d,
                    b: f,
                    f: b
                }
            },
            rotCorr: function(a, b, c) {
                var d = a;
                return b && c && (d = ma(d * pa(b * sa), 4)), {
                    x: -a / 3 * qa(b * sa),
                    y: d
                }
            },
            label: function(a, b, c, e, f, g, h, i, k) {
                var l, m, n, o, p, q, r, s, t, u, v, w = this,
                    x = w.g(k),
                    y = w.text("", 0, 0, h).attr({
                        zIndex: 1
                    }),
                    z = 0,
                    A = 3,
                    B = 0,
                    C = 0,
                    D = {};
                t = function() {
                    var a, b;
                    a = y.element.style, m = (void 0 === n || void 0 === o || x.styles.textAlign) && j(y.textStr) && y.getBBox(), x.width = (n || m.width || 0) + 2 * A + B, x.height = (o || m.height || 0) + 2 * A, r = A + w.fontMetrics(a && a.fontSize, y).b, s && (l || (a = C, b = (i ? -r : 0) + C, x.box = l = e ? w.symbol(e, a, b, x.width, x.height, D) : w.rect(a, b, x.width, x.height, 0, D["stroke-width"]), l.isImg || l.attr("fill", "none"), l.add(x)), l.isImg || l.attr(Za({
                        width: ja(x.width),
                        height: ja(x.height)
                    }, D)), D = null)
                }, u = function() {
                    var a, b = x.styles,
                        b = b && b.textAlign,
                        c = B + A;
                    a = i ? 0 : r, j(n) && m && ("center" === b || "right" === b) && (c += {
                        center: .5,
                        right: 1
                    }[b] * (n - m.width)), c === y.x && a === y.y || (y.attr("x", c), a !== K && y.attr("y", a)), y.x = c, y.y = a
                }, v = function(a, b) {
                    l ? l.attr(a, b) : D[a] = b
                }, x.onAdd = function() {
                    y.add(x), x.attr({
                        text: a || 0 === a ? a : "",
                        x: b,
                        y: c
                    }), l && j(f) && x.attr({
                        anchorX: f,
                        anchorY: g
                    })
                }, x.widthSetter = function(a) {
                    n = a
                }, x.heightSetter = function(a) {
                    o = a
                }, x.paddingSetter = function(a) {
                    j(a) && a !== A && (A = x.padding = a, u())
                }, x.paddingLeftSetter = function(a) {
                    j(a) && a !== B && (B = a, u())
                }, x.alignSetter = function(a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a], a !== z && (z = a, m && x.attr({
                        x: p
                    }))
                }, x.textSetter = function(a) {
                    a !== K && y.textSetter(a), t(), u()
                }, x["stroke-widthSetter"] = function(a, b) {
                    a && (s = !0), C = a % 2 / 2, v(b, a)
                }, x.strokeSetter = x.fillSetter = x.rSetter = function(a, b) {
                    "fill" === b && a && (s = !0), v(b, a)
                }, x.anchorXSetter = function(a, b) {
                    f = a, v(b, ja(a) - C - p)
                }, x.anchorYSetter = function(a, b) {
                    g = a, v(b, a - q)
                }, x.xSetter = function(a) {
                    x.x = a, z && (a -= z * ((n || m.width) + 2 * A)), p = ja(a), x.attr("translateX", p)
                }, x.ySetter = function(a) {
                    q = x.y = ja(a), x.attr("translateY", q)
                };
                var E = x.css;
                return Za(x, {
                    css: function(a) {
                        if (a) {
                            var b = {},
                                a = d(a);
                            Pa(x.textProps, function(c) {
                                a[c] !== K && (b[c] = a[c], delete a[c])
                            }), y.css(b)
                        }
                        return E.call(x, a)
                    },
                    getBBox: function() {
                        return {
                            width: m.width + 2 * A,
                            height: m.height + 2 * A,
                            x: m.x - A,
                            y: m.y - A
                        }
                    },
                    shadow: function(a) {
                        return l && l.shadow(a), x
                    },
                    destroy: function() {
                        Ua(x.element, "mouseenter"), Ua(x.element, "mouseleave"), y && (y = y.destroy()), l && (l = l.destroy()), F.prototype.destroy.call(x), x = w = t = u = v = null
                    }
                })
            }
        }, L = db, Za(F.prototype, {
            htmlCss: function(a) {
                var b = this.element;
                return (b = a && "SPAN" === b.tagName && a.width) && (delete a.width, this.textWidth = b, this.updateTransform()), a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden"), this.styles = Za(this.styles, a), n(this.element, a), this
            },
            htmlGetBBox: function() {
                var a = this.element;
                return "text" === a.nodeName && (a.style.position = "absolute"), {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var a = this.renderer,
                        b = this.element,
                        c = this.translateX || 0,
                        d = this.translateY || 0,
                        f = this.x || 0,
                        g = this.y || 0,
                        h = this.textAlign || "left",
                        i = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[h],
                        k = this.shadows,
                        l = this.styles;
                    if (n(b, {
                            marginLeft: c,
                            marginTop: d
                        }), k && Pa(k, function(a) {
                            n(a, {
                                marginLeft: c + 1,
                                marginTop: d + 1
                            })
                        }), this.inverted && Pa(b.childNodes, function(c) {
                            a.invertChild(c, b)
                        }), "SPAN" === b.tagName) {
                        var k = this.rotation,
                            m = e(this.textWidth),
                            o = l && l.whiteSpace,
                            p = [k, h, b.innerHTML, this.textWidth, this.textAlign].join(",");
                        p !== this.cTT && (l = a.fontMetrics(b.style.fontSize).b, j(k) && this.setSpanRotation(k, i, l), b.offsetWidth > m && /[ \-]/.test(b.textContent || b.innerText) ? (n(b, {
                            width: m + "px",
                            display: "block",
                            whiteSpace: o || "normal"
                        }), this.hasTextWidth = !0) : this.hasTextWidth && (n(b, {
                            width: "",
                            display: "",
                            whiteSpace: o || "nowrap"
                        }), this.hasTextWidth = !1), this.getSpanCorrection(this.hasTextWidth ? m : b.offsetWidth, l, i, k, h)), n(b, {
                            left: f + (this.xCorr || 0) + "px",
                            top: g + (this.yCorr || 0) + "px"
                        }), xa && (l = b.offsetHeight), this.cTT = p
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(a, b, c) {
                var d = {},
                    e = va ? "-ms-transform" : xa ? "-webkit-transform" : ya ? "MozTransform" : ua ? "-o-transform" : "";
                d[e] = d.transform = "rotate(" + a + "deg)", d[e + (ya ? "Origin" : "-origin")] = d.transformOrigin = 100 * b + "% " + c + "px", n(this.element, d)
            },
            getSpanCorrection: function(a, b, c) {
                this.xCorr = -a * c, this.yCorr = -b
            }
        }), Za(db.prototype, {
            html: function(a, b, c) {
                var d = this.createElement("span"),
                    e = d.element,
                    f = d.renderer,
                    g = f.isSVG,
                    h = function(a, b) {
                        Pa(["opacity", "visibility"], function(c) {
                            ab(a, c + "Setter", function(a, c, d, e) {
                                a.call(this, c, d, e), b[d] = c
                            })
                        })
                    };
                return d.textSetter = function(a) {
                    a !== e.innerHTML && delete this.bBox, e.innerHTML = this.textStr = a, d.htmlUpdateTransform()
                }, g && h(d, d.element.style), d.xSetter = d.ySetter = d.alignSetter = d.rotationSetter = function(a, b) {
                    "align" === b && (b = "textAlign"), d[b] = a, d.htmlUpdateTransform()
                }, d.attr({
                    text: a,
                    x: ja(b),
                    y: ja(c)
                }).css({
                    position: "absolute",
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize
                }), e.style.whiteSpace = "nowrap", d.css = d.htmlCss, g && (d.add = function(a) {
                    var b, c = f.box.parentNode,
                        g = [];
                    if (this.parentGroup = a) {
                        if (b = a.div, !b) {
                            for (; a;) g.push(a), a = a.parentGroup;
                            Pa(g.reverse(), function(a) {
                                var d, e = k(a.element, "class");
                                e && (e = {
                                    className: e
                                }), b = a.div = a.div || o(Ja, e, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    opacity: a.opacity
                                }, b || c), d = b.style, Za(a, {
                                    translateXSetter: function(b, c) {
                                        d.left = b + "px", a[c] = b, a.doTransform = !0
                                    },
                                    translateYSetter: function(b, c) {
                                        d.top = b + "px", a[c] = b, a.doTransform = !0
                                    }
                                }), h(a, d)
                            })
                        }
                    } else b = c;
                    return b.appendChild(e), d.added = !0, d.alignOnAdd && d.htmlUpdateTransform(), d
                }), d
            }
        });
        var eb, fb;
        Ba || Da || (fb = {
            init: function(a, b) {
                var c = ["<", b, ' filled="f" stroked="f"'],
                    d = ["position: ", "absolute", ";"],
                    e = b === Ja;
                ("shape" === b || e) && d.push("left:0;top:0;width:1px;height:1px;"), d.push("visibility: ", e ? "hidden" : "visible"), c.push(' style="', d.join(""), '"/>'), b && (c = e || "span" === b || "img" === b ? c.join("") : a.prepVML(c), this.element = o(c)), this.renderer = a
            },
            add: function(a) {
                var b = this.renderer,
                    c = this.element,
                    d = b.box,
                    e = a && a.inverted,
                    d = a ? a.element || a : d;
                return a && (this.parentGroup = a), e && b.invertChild(c, d), d.appendChild(c), this.added = !0, this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform(), this.onAdd && this.onAdd(), this
            },
            updateTransform: F.prototype.htmlUpdateTransform,
            setSpanRotation: function() {
                var a = this.rotation,
                    b = pa(a * sa),
                    c = qa(a * sa);
                n(this.element, {
                    filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", b, ", M12=", -c, ", M21=", c, ", M22=", b, ", sizingMethod='auto expand')"].join("") : "none"
                })
            },
            getSpanCorrection: function(a, b, c, d, e) {
                var f, g = d ? pa(d * sa) : 1,
                    h = d ? qa(d * sa) : 0,
                    i = _a(this.elemHeight, this.element.offsetHeight);
                this.xCorr = g < 0 && -a, this.yCorr = h < 0 && -i, f = g * h < 0, this.xCorr += h * b * (f ? 1 - c : c), this.yCorr -= g * b * (d ? f ? c : 1 - c : 1), e && "left" !== e && (this.xCorr -= a * c * (g < 0 ? -1 : 1), d && (this.yCorr -= i * c * (h < 0 ? -1 : 1)), n(this.element, {
                    textAlign: e
                }))
            },
            pathToVML: function(a) {
                for (var b = a.length, c = []; b--;) $a(a[b]) ? c[b] = ja(10 * a[b]) - 5 : "Z" === a[b] ? c[b] = "x" : (c[b] = a[b], !a.isArc || "wa" !== a[b] && "at" !== a[b] || (c[b + 5] === c[b + 7] && (c[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1)));
                return c.join(" ") || "x"
            },
            clip: function(a) {
                var b, c = this;
                return a ? (b = a.members, i(b, c), b.push(c), c.destroyClip = function() {
                    i(b, c)
                }, a = a.getCSS(c)) : (c.destroyClip && c.destroyClip(), a = {
                    clip: wa ? "inherit" : "rect(auto)"
                }), c.css(a)
            },
            css: F.prototype.htmlCss,
            safeRemoveChild: function(a) {
                a.parentNode && z(a)
            },
            destroy: function() {
                return this.destroyClip && this.destroyClip(), F.prototype.destroy.apply(this)
            },
            on: function(b, c) {
                return this.element["on" + b] = function() {
                    var b = a.event;
                    b.target = b.srcElement, c(b)
                }, this
            },
            cutOffPath: function(a, b) {
                var c, a = a.split(/[ ,]/);
                return c = a.length, 9 !== c && 11 !== c || (a[c - 4] = a[c - 2] = e(a[c - 2]) - 10 * b), a.join(" ")
            },
            shadow: function(a, b, c) {
                var d, f, g, h, i, j, k, l = [],
                    m = this.element,
                    n = this.renderer,
                    p = m.style,
                    q = m.path;
                if (q && "string" != typeof q.value && (q = "x"), i = q, a) {
                    for (j = _a(a.width, 3), k = (a.opacity || .15) / j, d = 1; d <= 3; d++) h = 2 * j + 1 - 2 * d, c && (i = this.cutOffPath(q.value, h + .5)), g = ['<shape isShadow="true" strokeweight="', h, '" filled="false" path="', i, '" coordsize="10 10" style="', m.style.cssText, '" />'], f = o(n.prepVML(g), null, {
                        left: e(p.left) + _a(a.offsetX, 1),
                        top: e(p.top) + _a(a.offsetY, 1)
                    }), c && (f.cutOff = h + 1), g = ['<stroke color="', a.color || "black", '" opacity="', k * d, '"/>'], o(n.prepVML(g), null, null, f), b ? b.element.appendChild(f) : m.parentNode.insertBefore(f, m), l.push(f);
                    this.shadows = l
                }
                return this
            },
            updateShadows: Ga,
            setAttr: function(a, b) {
                wa ? this.element[a] = b : this.element.setAttribute(a, b)
            },
            classSetter: function(a) {
                this.element.className = a
            },
            dashstyleSetter: function(a, b, c) {
                (c.getElementsByTagName("stroke")[0] || o(this.renderer.prepVML(["<stroke/>"]), null, null, c))[b] = a || "solid", this[b] = a
            },
            dSetter: function(a, b, c) {
                var d = this.shadows,
                    a = a || [];
                if (this.d = a.join && a.join(" "), c.path = a = this.pathToVML(a), d)
                    for (c = d.length; c--;) d[c].path = d[c].cutOff ? this.cutOffPath(a, d[c].cutOff) : a;
                this.setAttr(b, a)
            },
            fillSetter: function(a, b, c) {
                var d = c.nodeName;
                "SPAN" === d ? c.style.color = a : "IMG" !== d && (c.filled = "none" !== a, this.setAttr("fillcolor", this.renderer.color(a, c, b, this)))
            },
            "fill-opacitySetter": function(a, b, c) {
                o(this.renderer.prepVML(["<", b.split("-")[0], ' opacity="', a, '"/>']), null, null, c)
            },
            opacitySetter: Ga,
            rotationSetter: function(a, b, c) {
                c = c.style, this[b] = c[b] = a, c.left = -ja(qa(a * sa) + 1) + "px", c.top = ja(pa(a * sa)) + "px"
            },
            strokeSetter: function(a, b, c) {
                this.setAttr("strokecolor", this.renderer.color(a, c, b, this))
            },
            "stroke-widthSetter": function(a, b, c) {
                c.stroked = !!a, this[b] = a, $a(a) && (a += "px"), this.setAttr("strokeweight", a)
            },
            titleSetter: function(a, b) {
                this.setAttr(b, a)
            },
            visibilitySetter: function(a, b, c) {
                "inherit" === a && (a = "visible"), this.shadows && Pa(this.shadows, function(c) {
                    c.style[b] = a
                }), "DIV" === c.nodeName && (a = "hidden" === a ? "-999em" : 0, wa || (c.style[b] = a ? "visible" : "hidden"), b = "top"), c.style[b] = a
            },
            xSetter: function(a, b, c) {
                this[b] = a, "x" === b ? b = "left" : "y" === b && (b = "top"), this.updateClipping ? (this[b] = a, this.updateClipping()) : c.style[b] = a
            },
            zIndexSetter: function(a, b, c) {
                c.style[b] = a
            }
        }, fb["stroke-opacitySetter"] = fb["fill-opacitySetter"], ga.VMLElement = fb = p(F, fb), fb.prototype.ySetter = fb.prototype.widthSetter = fb.prototype.heightSetter = fb.prototype.xSetter, fb = {
            Element: fb,
            isIE8: ta.indexOf("MSIE 8.0") > -1,
            init: function(a, b, c, d) {
                var e;
                if (this.alignedObjects = [], d = this.createElement(Ja).css(Za(this.getStyle(d), {
                        position: "relative"
                    })), e = d.element, a.appendChild(d.element), this.isVML = !0, this.box = e, this.boxWrapper = d, this.gradients = {}, this.cache = {}, this.cacheKeys = [], this.imgCount = 0, this.setSize(b, c, !1), !ha.namespaces.hcv) {
                    ha.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                    try {
                        ha.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    } catch (f) {
                        ha.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    }
                }
            },
            isHidden: function() {
                return !this.box.offsetWidth
            },
            clipRect: function(a, b, c, d) {
                var e = this.createElement(),
                    f = g(a);
                return Za(e, {
                    members: [],
                    count: 0,
                    left: (f ? a.x : a) + 1,
                    top: (f ? a.y : b) + 1,
                    width: (f ? a.width : c) - 1,
                    height: (f ? a.height : d) - 1,
                    getCSS: function(a) {
                        var b = a.element,
                            c = b.nodeName,
                            a = a.inverted,
                            d = this.top - ("shape" === c ? b.offsetTop : 0),
                            e = this.left,
                            b = e + this.width,
                            f = d + this.height,
                            d = {
                                clip: "rect(" + ja(a ? e : d) + "px," + ja(a ? f : b) + "px," + ja(a ? b : f) + "px," + ja(a ? d : e) + "px)"
                            };
                        return !a && wa && "DIV" === c && Za(d, {
                            width: b + "px",
                            height: f + "px"
                        }), d
                    },
                    updateClipping: function() {
                        Pa(e.members, function(a) {
                            a.element && a.css(e.getCSS(a))
                        })
                    }
                })
            },
            color: function(a, b, c, d) {
                var e, f, g, h = this,
                    i = /^rgba/,
                    j = "none";
                if (a && a.linearGradient ? g = "gradient" : a && a.radialGradient && (g = "pattern"), g) {
                    var k, l, m, n, p, q, r, s, t = a.linearGradient || a.radialGradient,
                        u = "",
                        a = a.stops,
                        v = [],
                        w = function() {
                            f = ['<fill colors="' + v.join(",") + '" opacity="', p, '" o:opacity2="', n, '" type="', g, '" ', u, 'focus="100%" method="any" />'], o(h.prepVML(f), null, null, b)
                        };
                    if (m = a[0], s = a[a.length - 1], m[0] > 0 && a.unshift([0, m[1]]), s[0] < 1 && a.push([1, s[1]]), Pa(a, function(a, b) {
                            i.test(a[1]) ? (e = E(a[1]), k = e.get("rgb"), l = e.get("a")) : (k = a[1], l = 1), v.push(100 * a[0] + "% " + k), b ? (p = l, q = k) : (n = l, r = k)
                        }), "fill" === c)
                        if ("gradient" === g) c = t.x1 || t[0] || 0, a = t.y1 || t[1] || 0, m = t.x2 || t[2] || 0, t = t.y2 || t[3] || 0, u = 'angle="' + (90 - 180 * ia.atan((t - a) / (m - c)) / ra) + '"', w();
                        else {
                            var x, j = t.r,
                                y = 2 * j,
                                z = 2 * j,
                                A = t.cx,
                                B = t.cy,
                                C = b.radialReference,
                                j = function() {
                                    C && (x = d.getBBox(), A += (C[0] - x.x) / x.width - .5, B += (C[1] - x.y) / x.height - .5, y *= C[2] / x.width, z *= C[2] / x.height), u = 'src="' + O.global.VMLRadialGradientURL + '" size="' + y + "," + z + '" origin="0.5,0.5" position="' + A + "," + B + '" color2="' + r + '" ', w()
                                };
                            d.added ? j() : d.onAdd = j, j = q
                        } else j = k
                } else i.test(a) && "IMG" !== b.tagName ? (e = E(a), d[c + "-opacitySetter"](e.get("a"), c, b), j = e.get("rgb")) : (j = b.getElementsByTagName(c), j.length && (j[0].opacity = 1, j[0].type = "solid"), j = a);
                return j
            },
            prepVML: function(a) {
                var b = this.isIE8,
                    a = a.join("");
                return b ? (a = a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), a = a.indexOf('style="') === -1 ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : a = a.replace("<", "<hcv:"), a
            },
            text: db.prototype.html,
            path: function(a) {
                var b = {
                    coordsize: "10 10"
                };
                return h(a) ? b.d = a : g(a) && Za(b, a), this.createElement("shape").attr(b)
            },
            circle: function(a, b, c) {
                var d = this.symbol("circle");
                return g(a) && (c = a.r, b = a.y, a = a.x), d.isCircle = !0, d.r = c, d.attr({
                    x: a,
                    y: b
                })
            },
            g: function(a) {
                var b;
                return a && (b = {
                    className: "highcharts-" + a,
                    "class": "highcharts-" + a
                }), this.createElement(Ja).attr(b)
            },
            image: function(a, b, c, d, e) {
                var f = this.createElement("img").attr({
                    src: a
                });
                return arguments.length > 1 && f.attr({
                    x: b,
                    y: c,
                    width: d,
                    height: e
                }), f
            },
            createElement: function(a) {
                return "rect" === a ? this.symbol(a) : db.prototype.createElement.call(this, a)
            },
            invertChild: function(a, b) {
                var c = this,
                    d = b.style,
                    f = "IMG" === a.tagName && a.style;
                n(a, {
                    flip: "x",
                    left: e(d.width) - (f ? e(f.top) : 1),
                    top: e(d.height) - (f ? e(f.left) : 1),
                    rotation: -90
                }), Pa(a.childNodes, function(b) {
                    c.invertChild(b, a)
                })
            },
            symbols: {
                arc: function(a, b, c, d, e) {
                    var f = e.start,
                        g = e.end,
                        h = e.r || c || d,
                        c = e.innerR,
                        d = pa(f),
                        i = qa(f),
                        j = pa(g),
                        k = qa(g);
                    return g - f === 0 ? ["x"] : (f = ["wa", a - h, b - h, a + h, b + h, a + h * d, b + h * i, a + h * j, b + h * k], e.open && !c && f.push("e", "M", a, b), f.push("at", a - c, b - c, a + c, b + c, a + c * j, b + c * k, a + c * d, b + c * i, "x", "e"), f.isArc = !0, f)
                },
                circle: function(a, b, c, d, e) {
                    return e && (c = d = 2 * e.r), e && e.isCircle && (a -= c / 2, b -= d / 2), ["wa", a, b, a + c, b + d, a + c, b + d / 2, a + c, b + d / 2, "e"]
                },
                rect: function(a, b, c, d, e) {
                    return db.prototype.symbols[j(e) && e.r ? "callout" : "square"].call(0, a, b, c, d, e)
                }
            }
        }, ga.VMLRenderer = eb = function() {
            this.init.apply(this, arguments)
        }, eb.prototype = d(db.prototype, fb), L = eb), db.prototype.measureSpanWidth = function(a, b) {
            var c, d = ha.createElement("span");
            return c = ha.createTextNode(a), d.appendChild(c), n(d, b), this.box.appendChild(d), c = d.offsetWidth, z(d), c
        };
        var gb;
        Da && (ga.CanVGRenderer = fb = function() {
            Aa = "http://www.w3.org/1999/xhtml"
        }, fb.prototype.symbols = {}, gb = function() {
            function a() {
                var a, c = b.length;
                for (a = 0; a < c; a++) b[a]();
                b = []
            }
            var b = [];
            return {
                push: function(c, d) {
                    if (0 === b.length) {
                        var e = ha.getElementsByTagName("head")[0],
                            f = ha.createElement("script");
                        f.type = "text/javascript", f.src = d, f.onload = a, e.appendChild(f)
                    }
                    b.push(c)
                }
            }
        }(), L = fb), G.prototype = {
            addLabel: function() {
                var a, b = this.axis,
                    c = b.options,
                    e = b.chart,
                    f = b.categories,
                    g = b.names,
                    h = this.pos,
                    i = c.labels,
                    k = b.tickPositions,
                    l = h === k[0],
                    m = h === k[k.length - 1],
                    g = f ? _a(f[h], g[h], h) : h,
                    f = this.label,
                    k = k.info;
                b.isDatetimeAxis && k && (a = c.dateTimeLabelFormats[k.higherRanks[h] || k.unitName]), this.isFirst = l, this.isLast = m, c = b.labelFormatter.call({
                    axis: b,
                    chart: e,
                    isFirst: l,
                    isLast: m,
                    dateTimeLabelFormat: a,
                    value: b.isLog ? A(b.lin2log(g)) : g
                }), j(f) ? f && f.attr({
                    text: c
                }) : (this.labelLength = (this.label = f = j(c) && i.enabled ? e.renderer.text(c, 0, 0, i.useHTML).css(d(i.style)).add(b.labelGroup) : null) && f.getBBox().width, this.rotation = 0)
            },
            getLabelSize: function() {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function(a) {
                var b, c = this.axis,
                    d = a.x,
                    e = c.chart.chartWidth,
                    f = c.chart.spacing,
                    g = _a(c.labelLeft, na(c.pos, f[3])),
                    f = _a(c.labelRight, ma(c.pos + c.len, e - f[1])),
                    h = this.label,
                    i = this.rotation,
                    j = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[c.labelAlign],
                    k = h.getBBox().width,
                    l = c.getSlotWidth(),
                    m = l,
                    n = 1,
                    o = {};
                i ? i < 0 && d - j * k < g ? b = ja(d / pa(i * sa) - g) : i > 0 && d + j * k > f && (b = ja((e - d) / pa(i * sa))) : (e = d + (1 - j) * k, d - j * k < g ? m = a.x + m * (1 - j) - g : e > f && (m = f - a.x + m * j, n = -1), m = na(l, m), m < l && "center" === c.labelAlign && (a.x += n * (l - m - j * (l - na(k, m)))), (k > m || c.autoRotation && h.styles.width) && (b = m)), b && (o.width = b, c.options.labels.style.textOverflow || (o.textOverflow = "ellipsis"), h.css(o))
            },
            getPosition: function(a, b, c, d) {
                var e = this.axis,
                    f = e.chart,
                    g = d && f.oldChartHeight || f.chartHeight;
                return {
                    x: a ? e.translate(b + c, null, null, d) + e.transB : e.left + e.offset + (e.opposite ? (d && f.oldChartWidth || f.chartWidth) - e.right - e.left : 0),
                    y: a ? g - e.bottom + e.offset - (e.opposite ? e.height : 0) : g - e.translate(b + c, null, null, d) - e.transB
                }
            },
            getLabelPosition: function(a, b, c, d, e, f, g, h) {
                var i = this.axis,
                    k = i.transA,
                    l = i.reversed,
                    m = i.staggerLines,
                    n = i.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    o = e.y;
                return j(o) || (o = 0 === i.side ? c.rotation ? -8 : -c.getBBox().height : 2 === i.side ? n.y + 8 : pa(c.rotation * sa) * (n.y - c.getBBox(!1, 0).height / 2)), a = a + e.x + n.x - (f && d ? f * k * (l ? -1 : 1) : 0), b = b + o - (f && !d ? f * k * (l ? 1 : -1) : 0), m && (c = g / (h || 1) % m, i.opposite && (c = m - c - 1), b += c * (i.labelOffset / m)), {
                    x: a,
                    y: ja(b)
                }
            },
            getMarkPath: function(a, b, c, d, e, f) {
                return f.crispLine(["M", a, b, "L", a + (e ? 0 : -c), b + (e ? c : 0)], d)
            },
            render: function(a, b, c) {
                var d = this.axis,
                    e = d.options,
                    f = d.chart.renderer,
                    g = d.horiz,
                    h = this.type,
                    i = this.label,
                    j = this.pos,
                    k = e.labels,
                    l = this.gridLine,
                    m = h ? h + "Grid" : "grid",
                    n = h ? h + "Tick" : "tick",
                    o = e[m + "LineWidth"],
                    p = e[m + "LineColor"],
                    q = e[m + "LineDashStyle"],
                    m = d.tickSize(n),
                    n = e[n + "Color"],
                    r = this.mark,
                    s = k.step,
                    t = !0,
                    u = d.tickmarkOffset,
                    v = this.getPosition(g, j, u, b),
                    w = v.x,
                    v = v.y,
                    x = g && w === d.pos + d.len || !g && v === d.pos ? -1 : 1,
                    c = _a(c, 1);
                this.isActive = !0, o && (j = d.getPlotLinePath(j + u, o * x, b, !0), l === K && (l = {
                    stroke: p,
                    "stroke-width": o
                }, q && (l.dashstyle = q), h || (l.zIndex = 1), b && (l.opacity = 0), this.gridLine = l = o ? f.path(j).attr(l).add(d.gridGroup) : null), !b && l && j && l[this.isNew ? "attr" : "animate"]({
                    d: j,
                    opacity: c
                })), m && (d.opposite && (m[0] = -m[0]), h = this.getMarkPath(w, v, m[0], m[1] * x, g, f), r ? r.animate({
                    d: h,
                    opacity: c
                }) : this.mark = f.path(h).attr({
                    stroke: n,
                    "stroke-width": m[1],
                    opacity: c
                }).add(d.axisGroup)), i && $a(w) && (i.xy = v = this.getLabelPosition(w, v, i, g, k, u, a, s), this.isFirst && !this.isLast && !_a(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !_a(e.showLastLabel, 1) ? t = !1 : g && !d.isRadial && !k.step && !k.rotation && !b && 0 !== c && this.handleOverflow(v), s && a % s && (t = !1), t && $a(v.y) ? (v.opacity = c, i[this.isNew ? "attr" : "animate"](v), this.isNew = !1) : i.attr("y", -9999))
            },
            destroy: function() {
                y(this, this.axis)
            }
        }, ga.PlotLineOrBand = function(a, b) {
            this.axis = a, b && (this.options = b, this.id = b.id)
        }, ga.PlotLineOrBand.prototype = {
            render: function() {
                var a, b = this,
                    c = b.axis,
                    e = c.horiz,
                    f = b.options,
                    g = f.label,
                    h = b.label,
                    i = f.width,
                    k = f.to,
                    l = f.from,
                    m = j(l) && j(k),
                    n = f.value,
                    o = f.dashStyle,
                    p = b.svgElem,
                    q = [],
                    r = f.color,
                    s = _a(f.zIndex, 0),
                    t = f.events,
                    u = {},
                    v = c.chart.renderer,
                    q = c.log2lin;
                if (c.isLog && (l = q(l), k = q(k), n = q(n)), i) q = c.getPlotLinePath(n, i), u = {
                    stroke: r,
                    "stroke-width": i
                }, o && (u.dashstyle = o);
                else {
                    if (!m) return;
                    q = c.getPlotBandPath(l, k, f), r && (u.fill = r), f.borderWidth && (u.stroke = f.borderColor, u["stroke-width"] = f.borderWidth)
                }
                if (u.zIndex = s, p) q ? (p.show(), p.animate({
                    d: q
                })) : (p.hide(), h && (b.label = h = h.destroy()));
                else if (q && q.length && (b.svgElem = p = v.path(q).attr(u).add(), t))
                    for (a in f = function(a) {
                            p.on(a, function(c) {
                                t[a].apply(b, [c])
                            })
                        }, t) f(a);
                return g && j(g.text) && q && q.length && c.width > 0 && c.height > 0 && !q.flat ? (g = d({
                    align: e && m && "center",
                    x: e ? !m && 4 : 10,
                    verticalAlign: !e && m && "middle",
                    y: e ? m ? 16 : 10 : m ? 6 : -4,
                    rotation: e && !m && 90
                }, g), this.renderLabel(g, q, m, s)) : h && h.hide(), b
            },
            renderLabel: function(a, b, c, d) {
                var e = this.label,
                    f = this.axis.chart.renderer;
                e || (e = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation
                }, e.zIndex = d, this.label = e = f.text(a.text, 0, 0, a.useHTML).attr(e).css(a.style).add()), d = [b[1], b[4], c ? b[6] : b[1]], b = [b[2], b[5], c ? b[7] : b[2]], c = w(d), f = w(b), e.align(a, !1, {
                    x: c,
                    y: f,
                    width: x(d) - c,
                    height: x(b) - f
                }), e.show()
            },
            destroy: function() {
                i(this.axis.plotLinesAndBands, this), delete this.axis, y(this)
            }
        };
        var hb = ga.Axis = function() {
            this.init.apply(this, arguments)
        };
        hb.prototype = {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                gridLineColor: "#D8D8D8",
                labels: {
                    enabled: !0,
                    style: {
                        color: "#606060",
                        cursor: "default",
                        fontSize: "11px"
                    },
                    x: 0
                },
                lineColor: "#C0D0E0",
                lineWidth: 1,
                minPadding: .01,
                maxPadding: .01,
                minorGridLineColor: "#E0E0E0",
                minorGridLineWidth: 1,
                minorTickColor: "#A0A0A0",
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickColor: "#C0D0E0",
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#707070"
                    }
                },
                type: "linear"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                lineWidth: 0,
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    enabled: !1,
                    formatter: function() {
                        return ga.numberFormat(this.total, -1)
                    },
                    style: d(bb.line.dataLabels.style, {
                        color: "#000000"
                    })
                }
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function(a, b) {
                var c = b.isX;
                this.chart = a, this.horiz = a.inverted ? !c : c, this.coll = (this.isXAxis = c) ? "xAxis" : "yAxis", this.opposite = b.opposite, this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3), this.setOptions(b);
                var d = this.options,
                    e = d.type;
                this.labelFormatter = d.labels.formatter || this.defaultLabelFormatter, this.userOptions = b, this.minPixelPadding = 0, this.reversed = d.reversed, this.visible = d.visible !== !1, this.zoomEnabled = d.zoomEnabled !== !1, this.categories = d.categories || "category" === e, this.names = this.names || [], this.isLog = "logarithmic" === e, this.isDatetimeAxis = "datetime" === e, this.isLinked = j(d.linkedTo), this.ticks = {}, this.labelEdge = [], this.minorTicks = {}, this.plotLinesAndBands = [], this.alternateBands = {}, this.len = 0, this.minRange = this.userMinRange = d.minRange || d.maxZoom, this.range = d.range, this.offset = d.offset || 0, this.stacks = {}, this.oldStacks = {}, this.stacksTouched = 0, this.min = this.max = null, this.crosshair = _a(d.crosshair, l(a.options.tooltip.crosshairs)[c ? 0 : 1], !1);
                var f, d = this.options.events;
                Oa(this, a.axes) === -1 && (c && !this.isColorAxis ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this)), this.series = this.series || [], a.inverted && c && this.reversed === K && (this.reversed = !0), this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
                for (f in d) Ta(this, f, d[f]);
                this.isLog && (this.val2lin = this.log2lin, this.lin2val = this.lin2log)
            },
            setOptions: function(a) {
                this.options = d(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], d(O[this.coll], a))
            },
            defaultLabelFormatter: function() {
                var a, b = this.axis,
                    c = this.value,
                    d = b.categories,
                    e = this.dateTimeLabelFormat,
                    f = O.lang.numericSymbols,
                    g = f && f.length,
                    h = b.options.labels.format,
                    b = b.isLog ? c : b.tickInterval;
                if (h) a = s(h, this);
                else if (d) a = c;
                else if (e) a = P(e, c);
                else if (g && b >= 1e3)
                    for (; g-- && a === K;) d = Math.pow(1e3, g + 1), b >= d && 10 * c % d === 0 && null !== f[g] && (a = ga.numberFormat(c / d, -1) + f[g]);
                return a === K && (a = oa(c) >= 1e4 ? ga.numberFormat(c, -1) : ga.numberFormat(c, -1, K, "")), a
            },
            getSeriesExtremes: function() {
                var a = this,
                    b = a.chart;
                a.hasVisibleSeries = !1, a.dataMin = a.dataMax = a.threshold = null, a.softThreshold = !a.isXAxis, a.buildStacks && a.buildStacks(), Pa(a.series, function(c) {
                    if (c.visible || !b.options.chart.ignoreHiddenSeries) {
                        var d, e = c.options,
                            f = e.threshold;
                        a.hasVisibleSeries = !0, a.isLog && f <= 0 && (f = null), a.isXAxis ? (e = c.xData, e.length && (c = w(e), !$a(c) && !(c instanceof R) && (e = Qa(e, function(a) {
                            return $a(a)
                        }), c = w(e)), a.dataMin = na(_a(a.dataMin, e[0]), c), a.dataMax = ma(_a(a.dataMax, e[0]), x(e)))) : (c.getExtremes(), d = c.dataMax, c = c.dataMin, j(c) && j(d) && (a.dataMin = na(_a(a.dataMin, c), c), a.dataMax = ma(_a(a.dataMax, d), d)), j(f) && (a.threshold = f), e.softThreshold && !a.isLog || (a.softThreshold = !1))
                    }
                })
            },
            translate: function(a, b, c, d, e, f) {
                var g = this.linkedParent || this,
                    h = 1,
                    i = 0,
                    j = d ? g.oldTransA : g.transA,
                    d = d ? g.oldMin : g.min,
                    k = g.minPixelPadding,
                    e = (g.isOrdinal || g.isBroken || g.isLog && e) && g.lin2val;
                return j || (j = g.transA), c && (h *= -1, i = g.len), g.reversed && (h *= -1, i -= h * (g.sector || g.len)), b ? (a = a * h + i, a -= k, a = a / j + d, e && (a = g.lin2val(a))) : (e && (a = g.val2lin(a)), "between" === f && (f = .5), a = h * (a - d) * j + i + h * k + ($a(f) ? j * f * g.pointRange : 0)), a
            },
            toPixels: function(a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function(a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function(a, b, c, d, e) {
                var f, g, h, i = this.chart,
                    j = this.left,
                    k = this.top,
                    l = c && i.oldChartHeight || i.chartHeight,
                    m = c && i.oldChartWidth || i.chartWidth;
                f = this.transB;
                var n = function(a, b, c) {
                        return (a < b || a > c) && (d ? a = na(ma(b, a), c) : h = !0), a
                    },
                    e = _a(e, this.translate(a, null, null, c)),
                    a = c = ja(e + f);
                return f = g = ja(l - e - f), $a(e) ? this.horiz ? (f = k, g = l - this.bottom, a = c = n(a, j, j + this.width)) : (a = j, c = m - this.right, f = g = n(f, k, k + this.height)) : h = !0, h && !d ? null : i.renderer.crispLine(["M", a, f, "L", c, g], b || 1)
            },
            getLinearTickPositions: function(a, b, c) {
                var d, e = A(ka(b / a) * a),
                    f = A(la(c / a) * a),
                    g = [];
                if (b === c && $a(b)) return [b];
                for (b = e; b <= f && (g.push(b), b = A(b + a), b !== d);) d = b;
                return g
            },
            getMinorTickPositions: function() {
                var a, b = this.options,
                    c = this.tickPositions,
                    d = this.minorTickInterval,
                    e = [],
                    f = this.pointRangePadding || 0;
                a = this.min - f;
                var f = this.max + f,
                    g = f - a;
                if (g && g / d < this.len / 3)
                    if (this.isLog)
                        for (f = c.length, a = 1; a < f; a++) e = e.concat(this.getLogTickPositions(d, c[a - 1], c[a], !0));
                    else if (this.isDatetimeAxis && "auto" === b.minorTickInterval) e = e.concat(this.getTimeTicks(this.normalizeTimeTickInterval(d), a, f, b.startOfWeek));
                else
                    for (c = a + (c[0] - a) % d; c <= f; c += d) e.push(c);
                return 0 !== e.length && this.trimTicks(e, b.startOnTick, b.endOnTick), e
            },
            adjustForMinRange: function() {
                var a, b, c, d, e, f, g, h = this.options,
                    i = this.min,
                    k = this.max,
                    l = this.dataMax - this.dataMin >= this.minRange;
                this.isXAxis && this.minRange === K && !this.isLog && (j(h.min) || j(h.max) ? this.minRange = null : (Pa(this.series, function(a) {
                    for (e = a.xData, c = f = a.xIncrement ? 1 : e.length - 1; c > 0; c--) d = e[c] - e[c - 1], (b === K || d < b) && (b = d)
                }), this.minRange = na(5 * b, this.dataMax - this.dataMin))), k - i < this.minRange && (g = this.minRange, a = (g - k + i) / 2, a = [i - a, _a(h.min, i - a)], l && (a[2] = this.dataMin), i = x(a), k = [i + g, _a(h.max, i + g)], l && (k[2] = this.dataMax), k = w(k), k - i < g && (a[0] = k - g, a[1] = _a(h.min, k - g), i = x(a))), this.min = i, this.max = k
            },
            getClosest: function() {
                var a;
                return Pa(this.series, function(b) {
                    var c = b.closestPointRange;
                    !b.noSharedTooltip && j(c) && (a = j(a) ? na(a, c) : c)
                }), a
            },
            setAxisTranslation: function(a) {
                var b, c = this,
                    d = c.max - c.min,
                    e = c.axisPointRange || 0,
                    g = 0,
                    h = 0,
                    i = c.linkedParent,
                    j = !!c.categories,
                    k = c.transA,
                    l = c.isXAxis;
                (l || j || e) && (i ? (g = i.minPointOffset, h = i.pointRangePadding) : (b = c.getClosest(), Pa(c.series, function(a) {
                    var d = j ? 1 : l ? _a(a.options.pointRange, b, 0) : c.axisPointRange || 0,
                        a = a.options.pointPlacement;
                    e = ma(e, d), c.single || (g = ma(g, f(a) ? 0 : d / 2), h = ma(h, "on" === a ? 0 : d))
                })), i = c.ordinalSlope && b ? c.ordinalSlope / b : 1, c.minPointOffset = g *= i, c.pointRangePadding = h *= i, c.pointRange = na(e, d), l && (c.closestPointRange = b)), a && (c.oldTransA = k), c.translationSlope = c.transA = k = c.len / (d + h || 1), c.transB = c.horiz ? c.left : c.bottom, c.minPixelPadding = k * g
            },
            minFromRange: function() {
                return this.max - this.range
            },
            setTickInterval: function(a) {
                var c, d, e, f, g = this,
                    h = g.chart,
                    i = g.options,
                    k = g.isLog,
                    l = g.log2lin,
                    m = g.isDatetimeAxis,
                    n = g.isXAxis,
                    o = g.isLinked,
                    p = i.maxPadding,
                    q = i.minPadding,
                    r = i.tickInterval,
                    s = i.tickPixelInterval,
                    v = g.categories,
                    w = g.threshold,
                    x = g.softThreshold;
                !m && !v && !o && this.getTickAmount(), e = _a(g.userMin, i.min), f = _a(g.userMax, i.max), o ? (g.linkedParent = h[g.coll][i.linkedTo], h = g.linkedParent.getExtremes(), g.min = _a(h.min, h.dataMin), g.max = _a(h.max, h.dataMax), i.type !== g.linkedParent.options.type && b(11, 1)) : (!x && j(w) && (g.dataMin >= w ? (c = w, q = 0) : g.dataMax <= w && (d = w, p = 0)), g.min = _a(e, c, g.dataMin), g.max = _a(f, d, g.dataMax)), k && (!a && na(g.min, _a(g.dataMin, g.min)) <= 0 && b(10, 1), g.min = A(l(g.min), 15), g.max = A(l(g.max), 15)), g.range && j(g.max) && (g.userMin = g.min = e = ma(g.min, g.minFromRange()), g.userMax = f = g.max, g.range = null), Va(g, "foundExtremes"), g.beforePadding && g.beforePadding(), g.adjustForMinRange(), v || g.axisPointRange || g.usePercentage || o || !j(g.min) || !j(g.max) || !(l = g.max - g.min) || (!j(e) && q && (g.min -= l * q), !j(f) && p && (g.max += l * p)), $a(i.floor) && (g.min = ma(g.min, i.floor)), $a(i.ceiling) && (g.max = na(g.max, i.ceiling)), x && j(g.dataMin) && (w = w || 0, !j(e) && g.min < w && g.dataMin >= w ? g.min = w : !j(f) && g.max > w && g.dataMax <= w && (g.max = w)), g.tickInterval = g.min === g.max || void 0 === g.min || void 0 === g.max ? 1 : o && !r && s === g.linkedParent.options.tickPixelInterval ? r = g.linkedParent.tickInterval : _a(r, this.tickAmount ? (g.max - g.min) / ma(this.tickAmount - 1, 1) : void 0, v ? 1 : (g.max - g.min) * s / ma(g.len, s)), n && !a && Pa(g.series, function(a) {
                    a.processData(g.min !== g.oldMin || g.max !== g.oldMax)
                }), g.setAxisTranslation(!0), g.beforeSetTickPositions && g.beforeSetTickPositions(), g.postProcessTickInterval && (g.tickInterval = g.postProcessTickInterval(g.tickInterval)), g.pointRange && !r && (g.tickInterval = ma(g.pointRange, g.tickInterval)), a = _a(i.minTickInterval, g.isDatetimeAxis && g.closestPointRange), !r && g.tickInterval < a && (g.tickInterval = a), m || k || r || (g.tickInterval = u(g.tickInterval, null, t(g.tickInterval), _a(i.allowDecimals, !(g.tickInterval > .5 && g.tickInterval < 5 && g.max > 1e3 && g.max < 9999)), !!this.tickAmount)), !this.tickAmount && this.len && (g.tickInterval = g.unsquish()), this.setTickPositions()
            },
            setTickPositions: function() {
                var a, b, c = this.options,
                    d = c.tickPositions,
                    e = c.tickPositioner,
                    f = c.startOnTick,
                    g = c.endOnTick;
                this.tickmarkOffset = this.categories && "between" === c.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0, this.minorTickInterval = "auto" === c.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : c.minorTickInterval, this.tickPositions = a = d && d.slice(), !a && (a = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, c.units), this.min, this.max, c.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), a.length > this.len && (a = [a[0], a.pop()]), this.tickPositions = a, e && (e = e.apply(this, [this.min, this.max]))) && (this.tickPositions = a = e), this.isLinked || (this.trimTicks(a, f, g), this.min === this.max && j(this.min) && !this.tickAmount && (b = !0, this.min -= .5, this.max += .5), this.single = b, !d && !e && this.adjustTickAmount())
            },
            trimTicks: function(a, b, c) {
                var d = a[0],
                    e = a[a.length - 1],
                    f = this.minPointOffset || 0;
                if (b) this.min = d;
                else
                    for (; this.min - f > a[0];) a.shift();
                if (c) this.max = e;
                else
                    for (; this.max + f < a[a.length - 1];) a.pop();
                0 === a.length && j(d) && a.push((e + d) / 2)
            },
            alignToOthers: function() {
                var a, b = {},
                    c = this.options;
                return this.chart.options.chart.alignTicks !== !1 && c.alignTicks !== !1 && Pa(this.chart[this.coll], function(c) {
                    var d = c.options,
                        d = [c.horiz ? d.left : d.top, d.width, d.height, d.pane].join(",");
                    c.series.length && (b[d] ? a = !0 : b[d] = 1)
                }), a
            },
            getTickAmount: function() {
                var a = this.options,
                    b = a.tickAmount,
                    c = a.tickPixelInterval;
                !j(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2), !b && this.alignToOthers() && (b = la(this.len / c) + 1), b < 4 && (this.finalTickAmt = b, b = 5), this.tickAmount = b
            },
            adjustTickAmount: function() {
                var a = this.tickInterval,
                    b = this.tickPositions,
                    c = this.tickAmount,
                    d = this.finalTickAmt,
                    e = b && b.length;
                if (e < c) {
                    for (; b.length < c;) b.push(A(b[b.length - 1] + a));
                    this.transA *= (e - 1) / (c - 1), this.max = b[b.length - 1]
                } else e > c && (this.tickInterval *= 2, this.setTickPositions());
                if (j(d)) {
                    for (a = c = b.length; a--;)(3 === d && a % 2 === 1 || d <= 2 && a > 0 && a < c - 1) && b.splice(a, 1);
                    this.finalTickAmt = K
                }
            },
            setScale: function() {
                var a, b;
                this.oldMin = this.min, this.oldMax = this.max, this.oldAxisLength = this.len, this.setAxisSize(), b = this.len !== this.oldAxisLength, Pa(this.series, function(b) {
                    (b.isDirtyData || b.isDirty || b.xAxis.isDirty) && (a = !0)
                }), b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function(a, b, c, d, e) {
                var f = this,
                    g = f.chart,
                    c = _a(c, !0);
                Pa(f.series, function(a) {
                    delete a.kdTree
                }), e = Za(e, {
                    min: a,
                    max: b
                }), Va(f, "setExtremes", e, function() {
                    f.userMin = a, f.userMax = b, f.eventArgs = e, c && g.redraw(d)
                })
            },
            zoom: function(a, b) {
                var c = this.dataMin,
                    d = this.dataMax,
                    e = this.options,
                    f = na(c, _a(e.min, c)),
                    e = ma(d, _a(e.max, d));
                return this.allowZoomOutside || (j(c) && a <= f && (a = f), j(d) && b >= e && (b = e)), this.displayBtn = a !== K || b !== K, this.setExtremes(a, b, !1, K, {
                    trigger: "zoom"
                }), !0
            },
            setAxisSize: function() {
                var a = this.chart,
                    b = this.options,
                    c = b.offsetLeft || 0,
                    d = this.horiz,
                    e = _a(b.width, a.plotWidth - c + (b.offsetRight || 0)),
                    f = _a(b.height, a.plotHeight),
                    g = _a(b.top, a.plotTop),
                    b = _a(b.left, a.plotLeft + c),
                    c = /%$/;
                c.test(f) && (f = Math.round(parseFloat(f) / 100 * a.plotHeight)), c.test(g) && (g = Math.round(parseFloat(g) / 100 * a.plotHeight + a.plotTop)), this.left = b, this.top = g, this.width = e, this.height = f, this.bottom = a.chartHeight - f - g, this.right = a.chartWidth - e - b, this.len = ma(d ? e : f, 0), this.pos = d ? b : g
            },
            getExtremes: function() {
                var a = this.isLog,
                    b = this.lin2log;
                return {
                    min: a ? A(b(this.min)) : this.min,
                    max: a ? A(b(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function(a) {
                var b = this.isLog,
                    c = this.lin2log,
                    d = b ? c(this.min) : this.min,
                    b = b ? c(this.max) : this.max;
                return null === a ? a = b < 0 ? b : d : d > a ? a = d : b < a && (a = b), this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function(a) {
                return a = (_a(a, 0) - 90 * this.side + 720) % 360, a > 15 && a < 165 ? "right" : a > 195 && a < 345 ? "left" : "center"
            },
            tickSize: function(a) {
                var b = this.options,
                    c = b[a + "Length"],
                    d = _a(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (d && c) return "inside" === b[a + "Position"] && (c = -c), [c, d]
            },
            labelMetrics: function() {
                return this.chart.renderer.fontMetrics(this.options.labels.style.fontSize, this.ticks[0] && this.ticks[0].label)
            },
            unsquish: function() {
                var a, b, c, d = this.options.labels,
                    e = this.horiz,
                    f = this.tickInterval,
                    g = f,
                    h = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / f),
                    i = d.rotation,
                    k = this.labelMetrics(),
                    l = Number.MAX_VALUE,
                    m = function(a) {
                        return a /= h || 1, a = a > 1 ? la(a) : 1, a * f
                    };
                return e ? (c = !d.staggerLines && !d.step && (j(i) ? [i] : h < _a(d.autoRotationLimit, 80) && d.autoRotation)) && Pa(c, function(c) {
                    var d;
                    (c === i || c && c >= -90 && c <= 90) && (b = m(oa(k.h / qa(sa * c))), d = b + oa(c / 360), d < l && (l = d, a = c, g = b))
                }) : d.step || (g = m(k.h)), this.autoRotation = c, this.labelRotation = _a(a, i), g
            },
            getSlotWidth: function() {
                var a = this.chart,
                    b = this.horiz,
                    c = this.options.labels,
                    d = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    e = a.margin[3];
                return b && (c.step || 0) < 2 && !c.rotation && (this.staggerLines || 1) * a.plotWidth / d || !b && (e && e - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function() {
                var a, b, c, e = this.chart,
                    g = e.renderer,
                    h = this.tickPositions,
                    i = this.ticks,
                    j = this.options.labels,
                    k = this.horiz,
                    l = this.getSlotWidth(),
                    m = ma(1, ja(l - 2 * (j.padding || 5))),
                    n = {},
                    o = this.labelMetrics(),
                    p = j.style.textOverflow,
                    q = 0;
                if (f(j.rotation) || (n.rotation = j.rotation || 0), this.autoRotation) Pa(h, function(a) {
                    (a = i[a]) && a.labelLength > q && (q = a.labelLength)
                }), q > m && q > o.h ? n.rotation = this.labelRotation : this.labelRotation = 0;
                else if (l && (a = {
                        width: m + "px"
                    }, !p))
                    for (a.textOverflow = "clip", b = h.length; !k && b--;) c = h[b], (m = i[c].label) && ("ellipsis" === m.styles.textOverflow ? m.css({
                        textOverflow: "clip"
                    }) : i[c].labelLength > l && m.css({
                        width: l + "px"
                    }), m.getBBox().height > this.len / h.length - (o.h - o.f) && (m.specCss = {
                        textOverflow: "ellipsis"
                    }));
                n.rotation && (a = {
                    width: (q > .5 * e.chartHeight ? .33 * e.chartHeight : e.chartHeight) + "px"
                }, !p) && (a.textOverflow = "ellipsis"), (this.labelAlign = j.align || this.autoLabelAlign(this.labelRotation)) && (n.align = this.labelAlign), Pa(h, function(b) {
                    var c = (b = i[b]) && b.label;
                    c && (c.attr(n), a && c.css(d(a, c.specCss)), delete c.specCss, b.rotation = n.rotation)
                }), this.tickRotCorr = g.rotCorr(o.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function() {
                return this.hasVisibleSeries || j(this.min) && j(this.max) && !!this.tickPositions
            },
            getOffset: function() {
                var a, b, c, d, e = this,
                    f = e.chart,
                    g = f.renderer,
                    h = e.options,
                    i = e.tickPositions,
                    k = e.ticks,
                    l = e.horiz,
                    m = e.side,
                    n = f.inverted ? [1, 0, 3, 2][m] : m,
                    o = 0,
                    p = 0,
                    q = h.title,
                    r = h.labels,
                    s = 0,
                    t = e.opposite,
                    u = f.axisOffset,
                    f = f.clipOffset,
                    v = [-1, 1, 1, -1][m],
                    w = e.axisParent,
                    x = this.tickSize("tick");
                if (a = e.hasData(), e.showAxis = b = a || _a(h.showEmpty, !0), e.staggerLines = e.horiz && r.staggerLines, e.axisGroup || (e.gridGroup = g.g("grid").attr({
                        zIndex: h.gridZIndex || 1
                    }).add(w), e.axisGroup = g.g("axis").attr({
                        zIndex: h.zIndex || 2
                    }).add(w), e.labelGroup = g.g("axis-labels").attr({
                        zIndex: r.zIndex || 7
                    }).addClass("highcharts-" + e.coll.toLowerCase() + "-labels").add(w)), a || e.isLinked) Pa(i, function(a) {
                    k[a] ? k[a].addLabel() : k[a] = new G(e, a)
                }), e.renderUnsquish(), r.reserveSpace !== !1 && (0 === m || 2 === m || {
                    1: "left",
                    3: "right"
                }[m] === e.labelAlign || "center" === e.labelAlign) && Pa(i, function(a) {
                    s = ma(k[a].getLabelSize(), s)
                }), e.staggerLines && (s *= e.staggerLines, e.labelOffset = s * (e.opposite ? -1 : 1));
                else
                    for (d in k) k[d].destroy(), delete k[d];
                q && q.text && q.enabled !== !1 && (e.axisTitle || ((d = q.textAlign) || (d = (l ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: t ? "right" : "left",
                    middle: "center",
                    high: t ? "left" : "right"
                })[q.align]), e.axisTitle = g.text(q.text, 0, 0, q.useHTML).attr({
                    zIndex: 7,
                    rotation: q.rotation || 0,
                    align: d
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(q.style).add(e.axisGroup), e.axisTitle.isNew = !0), b && (o = e.axisTitle.getBBox()[l ? "height" : "width"], c = q.offset, p = j(c) ? 0 : _a(q.margin, l ? 5 : 10)), e.axisTitle[b ? "show" : "hide"](!0)), e.offset = v * _a(h.offset, u[m]), e.tickRotCorr = e.tickRotCorr || {
                    x: 0,
                    y: 0
                }, g = 0 === m ? -e.labelMetrics().h : 2 === m ? e.tickRotCorr.y : 0, p = Math.abs(s) + p, s && (p -= g, p += v * (l ? _a(r.y, e.tickRotCorr.y + 8 * v) : r.x)), e.axisTitleMargin = _a(c, p), u[m] = ma(u[m], e.axisTitleMargin + o + v * e.offset, p, a && i.length && x ? x[0] : 0), h = h.offset ? 0 : 2 * ka(h.lineWidth / 2), f[n] = ma(f[n], h)
            },
            getLinePath: function(a) {
                var b = this.chart,
                    c = this.opposite,
                    d = this.offset,
                    e = this.horiz,
                    f = this.left + (c ? this.width : 0) + d,
                    d = b.chartHeight - this.bottom - (c ? this.height : 0) + d;
                return c && (a *= -1), b.renderer.crispLine(["M", e ? this.left : f, e ? d : this.top, "L", e ? b.chartWidth - this.right : f, e ? d : b.chartHeight - this.bottom], a)
            },
            getTitlePosition: function() {
                var a = this.horiz,
                    b = this.left,
                    c = this.top,
                    d = this.len,
                    f = this.options.title,
                    g = a ? b : c,
                    h = this.opposite,
                    i = this.offset,
                    j = f.x || 0,
                    k = f.y || 0,
                    l = e(f.style.fontSize || 12),
                    d = {
                        low: g + (a ? 0 : d),
                        middle: g + d / 2,
                        high: g + (a ? d : 0)
                    }[f.align],
                    b = (a ? c + this.height : b) + (a ? 1 : -1) * (h ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? l : 0);
                return {
                    x: a ? d + j : b + (h ? this.width : 0) + i + j,
                    y: a ? b + k - (h ? this.height : 0) + i : d + k
                }
            },
            render: function() {
                var a, b, c, d = this,
                    e = d.chart,
                    f = e.renderer,
                    g = d.options,
                    h = d.isLog,
                    i = d.lin2log,
                    j = d.isLinked,
                    k = d.tickPositions,
                    l = d.axisTitle,
                    n = d.ticks,
                    o = d.minorTicks,
                    p = d.alternateBands,
                    q = g.stackLabels,
                    r = g.alternateGridColor,
                    s = d.tickmarkOffset,
                    t = g.lineWidth,
                    u = e.hasRendered && $a(d.oldMin),
                    v = d.showAxis,
                    w = C(f.globalAnimation);
                d.labelEdge.length = 0, d.overlap = !1, Pa([n, o, p], function(a) {
                    for (var b in a) a[b].isActive = !1
                }), (d.hasData() || j) && (d.minorTickInterval && !d.categories && Pa(d.getMinorTickPositions(), function(a) {
                    o[a] || (o[a] = new G(d, a, "minor")), u && o[a].isNew && o[a].render(null, !0), o[a].render(null, !1, 1)
                }), k.length && (Pa(k, function(a, b) {
                    (!j || a >= d.min && a <= d.max) && (n[a] || (n[a] = new G(d, a)), u && n[a].isNew && n[a].render(b, !0, .1), n[a].render(b))
                }), s && (0 === d.min || d.single)) && (n[-1] || (n[-1] = new G(d, (-1), null, (!0))), n[-1].render(-1)), r && Pa(k, function(a, f) {
                    c = k[f + 1] !== K ? k[f + 1] + s : d.max - s, f % 2 === 0 && a < d.max && c <= d.max + (e.polar ? -s : s) && (p[a] || (p[a] = new ga.PlotLineOrBand(d)), b = a + s, p[a].options = {
                        from: h ? i(b) : b,
                        to: h ? i(c) : c,
                        color: r
                    }, p[a].render(), p[a].isActive = !0)
                }), d._addedPlotLB || (Pa((g.plotLines || []).concat(g.plotBands || []), function(a) {
                    d.addPlotBandOrLine(a)
                }), d._addedPlotLB = !0)), Pa([n, o, p], function(a) {
                    var b, c, d = [],
                        f = w.duration;
                    for (b in a) a[b].isActive || (a[b].render(b, !1, 0), a[b].isActive = !1, d.push(b));
                    m(function() {
                        for (c = d.length; c--;) a[d[c]] && !a[d[c]].isActive && (a[d[c]].destroy(), delete a[d[c]])
                    }, a !== p && e.hasRendered && f ? f : 0)
                }), t && (a = d.getLinePath(t), d.axisLine ? d.axisLine.animate({
                    d: a
                }) : d.axisLine = f.path(a).attr({
                    stroke: g.lineColor,
                    "stroke-width": t,
                    zIndex: 7
                }).add(d.axisGroup), d.axisLine[v ? "show" : "hide"](!0)), l && v && (l[l.isNew ? "attr" : "animate"](d.getTitlePosition()), l.isNew = !1), q && q.enabled && d.renderStackTotals(), d.isDirty = !1
            },
            redraw: function() {
                this.visible && (this.render(), Pa(this.plotLinesAndBands, function(a) {
                    a.render()
                })), Pa(this.series, function(a) {
                    a.isDirty = !0
                })
            },
            destroy: function(a) {
                var b, c = this,
                    d = c.stacks,
                    e = c.plotLinesAndBands;
                a || Ua(c);
                for (b in d) y(d[b]), d[b] = null;
                for (Pa([c.ticks, c.minorTicks, c.alternateBands], function(a) {
                        y(a)
                    }), a = e.length; a--;) e[a].destroy();
                Pa("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","), function(a) {
                    c[a] && (c[a] = c[a].destroy())
                }), this.cross && this.cross.destroy()
            },
            drawCrosshair: function(a, b) {
                var c, d, e, f = this.crosshair;
                this.crosshair && (j(b) || !_a(f.snap, !0)) !== !1 ? (_a(f.snap, !0) ? j(b) && (c = this.isXAxis ? b.plotX : this.len - b.plotY) : c = this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos, c = this.isRadial ? this.getPlotLinePath(this.isXAxis ? b.x : _a(b.stackY, b.y)) || null : this.getPlotLinePath(null, null, null, null, c) || null, null === c ? this.hideCrosshair() : (d = this.categories && !this.isRadial, e = _a(f.width, d ? this.transA : 1), this.cross ? this.cross.attr({
                    d: c,
                    visibility: "visible",
                    "stroke-width": e
                }) : (d = {
                    "pointer-events": "none",
                    "stroke-width": e,
                    stroke: f.color || (d ? "rgba(155,200,255,0.2)" : "#C0C0C0"),
                    zIndex: _a(f.zIndex, 2)
                }, f.dashStyle && (d.dashstyle = f.dashStyle), this.cross = this.chart.renderer.path(c).attr(d).add()))) : this.hideCrosshair()
            },
            hideCrosshair: function() {
                this.cross && this.cross.hide()
            }
        }, Za(hb.prototype, {
            getPlotBandPath: function(a, b) {
                var c = this.getPlotLinePath(b, null, null, !0),
                    d = this.getPlotLinePath(a, null, null, !0);
                return d && c ? (d.flat = d.toString() === c.toString(), d.push(c[4], c[5], c[1], c[2])) : d = null, d
            },
            addPlotBand: function(a) {
                return this.addPlotBandOrLine(a, "plotBands")
            },
            addPlotLine: function(a) {
                return this.addPlotBandOrLine(a, "plotLines")
            },
            addPlotBandOrLine: function(a, b) {
                var c = new ga.PlotLineOrBand(this, a).render(),
                    d = this.userOptions;
                return c && (b && (d[b] = d[b] || [], d[b].push(a)), this.plotLinesAndBands.push(c)), c
            },
            removePlotBandOrLine: function(a) {
                for (var b = this.plotLinesAndBands, c = this.options, d = this.userOptions, e = b.length; e--;) b[e].id === a && b[e].destroy();
                Pa([c.plotLines || [], d.plotLines || [], c.plotBands || [], d.plotBands || []], function(b) {
                    for (e = b.length; e--;) b[e].id === a && i(b, b[e])
                })
            }
        }), hb.prototype.getTimeTicks = function(a, b, c, d) {
            var e, f = [],
                g = {},
                h = O.global.useUTC,
                i = new R(b - r(b)),
                k = a.unitRange,
                l = a.count;
            if (j(b)) {
                i[_](k >= Q.second ? 0 : l * ka(i.getMilliseconds() / l)), k >= Q.second && i[aa](k >= Q.minute ? 0 : l * ka(i.getSeconds() / l)), k >= Q.minute && i[ba](k >= Q.hour ? 0 : l * ka(i[V]() / l)), k >= Q.hour && i[ca](k >= Q.day ? 0 : l * ka(i[W]() / l)), k >= Q.day && i[da](k >= Q.month ? 1 : l * ka(i[Y]() / l)), k >= Q.month && (i[ea](k >= Q.year ? 0 : l * ka(i[Z]() / l)), e = i[$]()), k >= Q.year && (e -= e % l, i[fa](e)), k === Q.week && i[da](i[Y]() - i[X]() + _a(d, 1)), b = 1, (T || U) && (i = i.getTime(), i = new R(i + r(i))), e = i[$]();
                for (var d = i.getTime(), m = i[Z](), n = i[Y](), o = !h || !!U, p = (Q.day + (h ? r(i) : 6e4 * i.getTimezoneOffset())) % Q.day; d < c;) f.push(d), k === Q.year ? d = S(e + b * l, 0) : k === Q.month ? d = S(e, m + b * l) : !o || k !== Q.day && k !== Q.week ? d += k * l : d = S(e, m, n + b * l * (k === Q.day ? 1 : 7)), b++;
                f.push(d), Pa(Qa(f, function(a) {
                    return k <= Q.hour && a % Q.day === p
                }), function(a) {
                    g[a] = "day"
                })
            }
            return f.info = Za(a, {
                higherRanks: g,
                totalRange: k * l
            }), f
        }, hb.prototype.normalizeTimeTickInterval = function(a, b) {
            var c, d = b || [
                    ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                    ["second", [1, 2, 5, 10, 15, 30]],
                    ["minute", [1, 2, 5, 10, 15, 30]],
                    ["hour", [1, 2, 3, 4, 6, 8, 12]],
                    ["day", [1, 2]],
                    ["week", [1, 2]],
                    ["month", [1, 2, 3, 4, 6]],
                    ["year", null]
                ],
                e = d[d.length - 1],
                f = Q[e[0]],
                g = e[1];
            for (c = 0; c < d.length && (e = d[c], f = Q[e[0]], g = e[1], !(d[c + 1] && a <= (f * g[g.length - 1] + Q[d[c + 1][0]]) / 2)); c++);
            return f === Q.year && a < 5 * f && (g = [1, 2, 5]), d = u(a / f, g, "year" === e[0] ? ma(t(a / f), 1) : 1), {
                unitRange: f,
                count: d,
                unitName: e[0]
            }
        }, hb.prototype.getLogTickPositions = function(a, b, c, d) {
            var e = this.options,
                f = this.len,
                g = this.lin2log,
                h = this.log2lin,
                i = [];
            if (d || (this._minorAutoInterval = null), a >= .5) a = ja(a), i = this.getLinearTickPositions(a, b, c);
            else if (a >= .08)
                for (var j, k, l, m, n, f = ka(b), e = a > .3 ? [1, 2, 4] : a > .15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; f < c + 1 && !n; f++)
                    for (k = e.length, j = 0; j < k && !n; j++) l = h(g(f) * e[j]), l > b && (!d || m <= c) && m !== K && i.push(m), m > c && (n = !0), m = l;
            else b = g(b), c = g(c), a = e[d ? "minorTickInterval" : "tickInterval"], a = _a("auto" === a ? null : a, this._minorAutoInterval, (c - b) * (e.tickPixelInterval / (d ? 5 : 1)) / ((d ? f / this.tickPositions.length : f) || 1)), a = u(a, null, t(a)), i = Sa(this.getLinearTickPositions(a, b, c), h), d || (this._minorAutoInterval = a / 5);
            return d || (this.tickInterval = a), i
        }, hb.prototype.log2lin = function(a) {
            return ia.log(a) / ia.LN10
        }, hb.prototype.lin2log = function(a) {
            return ia.pow(10, a)
        };
        var ib = ga.Tooltip = function() {
            this.init.apply(this, arguments)
        };
        ib.prototype = {
            init: function(a, b) {
                var c = b.borderWidth,
                    d = b.style,
                    f = e(d.padding);
                this.chart = a, this.options = b, this.crosshairs = [], this.now = {
                    x: 0,
                    y: 0
                }, this.isHidden = !0, this.label = a.renderer.label("", 0, 0, b.shape || "callout", null, null, b.useHTML, null, "tooltip").attr({
                    padding: f,
                    fill: b.backgroundColor,
                    "stroke-width": c,
                    r: b.borderRadius,
                    zIndex: 8
                }).css(d).css({
                    padding: 0
                }).add().attr({
                    y: -9999
                }), Da || this.label.shadow(b.shadow), this.shared = b.shared
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy()), clearTimeout(this.hideTimer), clearTimeout(this.tooltipTimeout)
            },
            move: function(a, b, c, d) {
                var e = this,
                    f = e.now,
                    g = e.options.animation !== !1 && !e.isHidden && (oa(a - f.x) > 1 || oa(b - f.y) > 1),
                    h = e.followPointer || e.len > 1;
                Za(f, {
                    x: g ? (2 * f.x + a) / 3 : a,
                    y: g ? (f.y + b) / 2 : b,
                    anchorX: h ? K : g ? (2 * f.anchorX + c) / 3 : c,
                    anchorY: h ? K : g ? (f.anchorY + d) / 2 : d
                }), e.label.attr(f), g && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                    e && e.move(a, b, c, d)
                }, 32))
            },
            hide: function(a) {
                var b = this;
                clearTimeout(this.hideTimer), a = _a(a, this.options.hideDelay, 500), this.isHidden || (this.hideTimer = m(function() {
                    b.label[a ? "fadeOut" : "hide"](), b.isHidden = !0
                }, a))
            },
            getAnchor: function(a, b) {
                var c, d, e, f = this.chart,
                    g = f.inverted,
                    h = f.plotTop,
                    i = f.plotLeft,
                    j = 0,
                    k = 0,
                    a = l(a);
                return c = a[0].tooltipPos, this.followPointer && b && (b.chartX === K && (b = f.pointer.normalize(b)), c = [b.chartX - f.plotLeft, b.chartY - h]), c || (Pa(a, function(a) {
                    d = a.series.yAxis, e = a.series.xAxis, j += a.plotX + (!g && e ? e.left - i : 0), k += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!g && d ? d.top - h : 0)
                }), j /= a.length, k /= a.length, c = [g ? f.plotWidth - k : j, this.shared && !g && a.length > 1 && b ? b.chartY - h : g ? f.plotHeight - j : k]), Sa(c, ja)
            },
            getPosition: function(a, b, c) {
                var d, e = this.chart,
                    f = this.distance,
                    g = {},
                    h = c.h || 0,
                    i = ["y", e.chartHeight, b, c.plotY + e.plotTop, e.plotTop, e.plotTop + e.plotHeight],
                    j = ["x", e.chartWidth, a, c.plotX + e.plotLeft, e.plotLeft, e.plotLeft + e.plotWidth],
                    k = !this.followPointer && _a(c.ttBelow, !e.inverted == !!c.negative),
                    l = function(a, b, c, d, e, i) {
                        var j = c < d - f,
                            l = d + f + c < b,
                            m = d - f - c;
                        if (d += f, k && l) g[a] = d;
                        else if (!k && j) g[a] = m;
                        else if (j) g[a] = na(i - c, m - h < 0 ? m : m - h);
                        else {
                            if (!l) return !1;
                            g[a] = ma(e, d + h + c > b ? d : d + h)
                        }
                    },
                    m = function(a, b, c, d) {
                        var e;
                        return d < f || d > b - f ? e = !1 : g[a] = d < c / 2 ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2, e
                    },
                    n = function(a) {
                        var b = i;
                        i = j, j = b, d = a
                    },
                    o = function() {
                        l.apply(0, i) !== !1 ? m.apply(0, j) === !1 && !d && (n(!0), o()) : d ? g.x = g.y = 0 : (n(!0), o())
                    };
                return (e.inverted || this.len > 1) && n(), o(), g
            },
            defaultFormatter: function(a) {
                var b, c = this.points || l(this);
                return b = [a.tooltipFooterHeaderFormatter(c[0])], b = b.concat(a.bodyFormatter(c)), b.push(a.tooltipFooterHeaderFormatter(c[0], !0)), b.join("")
            },
            refresh: function(a, b) {
                var c, d, e, f, g = this.chart,
                    h = this.label,
                    i = this.options,
                    j = {},
                    k = [];
                f = i.formatter || this.defaultFormatter;
                var m, j = g.hoverPoints,
                    n = this.shared;
                clearTimeout(this.hideTimer), this.followPointer = l(a)[0].series.tooltipOptions.followPointer, e = this.getAnchor(a, b), c = e[0], d = e[1], !n || a.series && a.series.noSharedTooltip ? j = a.getLabelConfig() : (g.hoverPoints = a, j && Pa(j, function(a) {
                    a.setState()
                }), Pa(a, function(a) {
                    a.setState("hover"), k.push(a.getLabelConfig())
                }), j = {
                    x: a[0].category,
                    y: a[0].y
                }, j.points = k, this.len = k.length, a = a[0]), f = f.call(j, this), j = a.series, this.distance = _a(j.tooltipOptions.distance, 16), f === !1 ? this.hide() : (this.isHidden && (Xa(h), h.attr("opacity", 1).show()), h.attr({
                    text: f
                }), m = i.borderColor || a.color || j.color || "#606060", h.attr({
                    stroke: m
                }), this.updatePosition({
                    plotX: c,
                    plotY: d,
                    negative: a.negative,
                    ttBelow: a.ttBelow,
                    h: e[2] || 0
                }), this.isHidden = !1), Va(g, "tooltipRefresh", {
                    text: f,
                    x: c + g.plotLeft,
                    y: d + g.plotTop,
                    borderColor: m
                })
            },
            updatePosition: function(a) {
                var b = this.chart,
                    c = this.label,
                    c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
                this.move(ja(c.x), ja(c.y || 0), a.plotX + b.plotLeft, a.plotY + b.plotTop)
            },
            getXDateFormat: function(a, b, c) {
                var d, e, f, b = b.dateTimeLabelFormats,
                    g = c && c.closestPointRange,
                    h = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    i = "millisecond";
                if (g) {
                    f = P("%m-%d %H:%M:%S.%L", a.x);
                    for (e in Q) {
                        if (g === Q.week && +P("%w", a.x) === c.options.startOfWeek && "00:00:00.000" === f.substr(6)) {
                            e = "week";
                            break
                        }
                        if (Q[e] > g) {
                            e = i;
                            break
                        }
                        if (h[e] && f.substr(h[e]) !== "01-01 00:00:00.000".substr(h[e])) break;
                        "week" !== e && (i = e)
                    }
                    e && (d = b[e])
                } else d = b.day;
                return d || b.year
            },
            tooltipFooterHeaderFormatter: function(a, b) {
                var c = b ? "footer" : "header",
                    d = a.series,
                    e = d.tooltipOptions,
                    f = e.xDateFormat,
                    g = d.xAxis,
                    h = g && "datetime" === g.options.type && $a(a.key),
                    c = e[c + "Format"];
                return h && !f && (f = this.getXDateFormat(a, e, g)), h && f && (c = c.replace("{point.key}", "{point.key:" + f + "}")), s(c, {
                    point: a,
                    series: d
                })
            },
            bodyFormatter: function(a) {
                return Sa(a, function(a) {
                    var b = a.series.tooltipOptions;
                    return (b.pointFormatter || a.point.tooltipFormatter).call(a.point, b.pointFormat)
                })
            }
        };
        var jb;
        M = ha && ha.documentElement.ontouchstart !== K;
        var kb = ga.Pointer = function(a, b) {
            this.init(a, b)
        };
        if (kb.prototype = {
                init: function(a, b) {
                    var c, d = b.chart,
                        e = d.events,
                        f = Da ? "" : d.zoomType,
                        d = a.inverted;
                    this.options = b, this.chart = a, this.zoomX = c = /x/.test(f), this.zoomY = f = /y/.test(f), this.zoomHor = c && !d || f && d, this.zoomVert = f && !d || c && d, this.hasZoom = c || f, this.runChartClick = e && !!e.click, this.pinchDown = [], this.lastValidTouch = {}, ga.Tooltip && b.tooltip.enabled && (a.tooltip = new ib(a, b.tooltip), this.followTouchMove = _a(b.tooltip.followTouchMove, !0)), this.setDOMEvents()
                },
                normalize: function(b, c) {
                    var d, e, b = b || a.event;
                    return b.target || (b.target = b.srcElement), e = b.touches ? b.touches.length ? b.touches.item(0) : b.changedTouches[0] : b, c || (this.chartPosition = c = Ra(this.chart.container)), e.pageX === K ? (d = ma(b.x, b.clientX - c.left), e = b.y) : (d = e.pageX - c.left, e = e.pageY - c.top), Za(b, {
                        chartX: ja(d),
                        chartY: ja(e)
                    })
                },
                getCoordinates: function(a) {
                    var b = {
                        xAxis: [],
                        yAxis: []
                    };
                    return Pa(this.chart.axes, function(c) {
                        b[c.isXAxis ? "xAxis" : "yAxis"].push({
                            axis: c,
                            value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
                        })
                    }), b
                },
                runPointActions: function(a) {
                    var b, c, d, e, f = this.chart,
                        g = f.series,
                        h = f.tooltip,
                        i = !!h && h.shared,
                        j = f.hoverPoint,
                        k = f.hoverSeries,
                        l = [Number.MAX_VALUE, Number.MAX_VALUE],
                        m = [],
                        n = [];
                    if (!i && !k)
                        for (b = 0; b < g.length; b++) !g[b].directTouch && g[b].options.stickyTracking || (g = []);
                    if (k && (i ? k.noSharedTooltip : k.directTouch) && j ? n = [j] : (Pa(g, function(b) {
                            c = b.noSharedTooltip && i, d = !i && b.directTouch, b.visible && !c && !d && _a(b.options.enableMouseTracking, !0) && (e = b.searchPoint(a, !c && 1 === b.kdDimensions)) && m.push(e)
                        }), Pa(m, function(a) {
                            a && Pa(["dist", "distX"], function(b, c) {
                                if ($a(a[b])) {
                                    var d = a[b] === l[c] && a.series.group.zIndex >= n[c].series.group.zIndex;
                                    (a[b] < l[c] || d) && (l[c] = a[b], n[c] = a)
                                }
                            })
                        })), i)
                        for (b = m.length; b--;)(m[b].clientX !== n[1].clientX || m[b].series.noSharedTooltip) && m.splice(b, 1);
                    n[0] && (n[0] !== this.prevKDPoint || h && h.isHidden) ? i && !n[0].series.noSharedTooltip ? (m.length && h && h.refresh(m, a), Pa(m, function(b) {
                        b.onMouseOver(a, b !== (k && k.directTouch && j || n[0]))
                    }), this.prevKDPoint = n[1]) : (h && h.refresh(n[0], a), k && k.directTouch || n[0].onMouseOver(a), this.prevKDPoint = n[0]) : (g = k && k.tooltipOptions.followPointer, h && g && !h.isHidden && (g = h.getAnchor([{}], a), h.updatePosition({
                        plotX: g[0],
                        plotY: g[1]
                    }))), this._onDocumentMouseMove || (this._onDocumentMouseMove = function(a) {
                        Ha[jb] && Ha[jb].pointer.onDocumentMouseMove(a)
                    }, Ta(ha, "mousemove", this._onDocumentMouseMove)), Pa(i ? m : [_a(j, n[1])], function(b) {
                        Pa(f.axes, function(c) {
                            (!b || b.series[c.coll] === c) && c.drawCrosshair(a, b)
                        })
                    })
                },
                reset: function(a, b) {
                    var c = this.chart,
                        d = c.hoverSeries,
                        e = c.hoverPoint,
                        f = c.hoverPoints,
                        g = c.tooltip,
                        h = g && g.shared ? f : e;
                    a && h && Pa(l(h), function(b) {
                        b.series.isCartesian && void 0 === b.plotX && (a = !1)
                    }), a ? g && h && (g.refresh(h), e && (e.setState(e.state, !0), Pa(c.axes, function(a) {
                        _a(a.crosshair && a.crosshair.snap, !0) ? a.drawCrosshair(null, e) : a.hideCrosshair()
                    }))) : (e && e.onMouseOut(), f && Pa(f, function(a) {
                        a.setState()
                    }), d && d.onMouseOut(), g && g.hide(b), this._onDocumentMouseMove && (Ua(ha, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null), Pa(c.axes, function(a) {
                        a.hideCrosshair()
                    }), this.hoverX = c.hoverPoints = c.hoverPoint = null)
                },
                scaleGroups: function(a, b) {
                    var c, d = this.chart;
                    Pa(d.series, function(e) {
                        c = a || e.getPlotBox(), e.xAxis && e.xAxis.zoomEnabled && (e.group.attr(c), e.markerGroup && (e.markerGroup.attr(c), e.markerGroup.clip(b ? d.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(c))
                    }), d.clipRect.attr(b || d.clipBox)
                },
                dragStart: function(a) {
                    var b = this.chart;
                    b.mouseIsDown = a.type, b.cancelClick = !1, b.mouseDownX = this.mouseDownX = a.chartX, b.mouseDownY = this.mouseDownY = a.chartY
                },
                drag: function(a) {
                    var b, c = this.chart,
                        d = c.options.chart,
                        e = a.chartX,
                        f = a.chartY,
                        g = this.zoomHor,
                        h = this.zoomVert,
                        i = c.plotLeft,
                        j = c.plotTop,
                        k = c.plotWidth,
                        l = c.plotHeight,
                        m = this.selectionMarker,
                        n = this.mouseDownX,
                        o = this.mouseDownY,
                        p = d.panKey && a[d.panKey + "Key"];
                    m && m.touch || (e < i ? e = i : e > i + k && (e = i + k), f < j ? f = j : f > j + l && (f = j + l), this.hasDragged = Math.sqrt(Math.pow(n - e, 2) + Math.pow(o - f, 2)), this.hasDragged > 10 && (b = c.isInsidePlot(n - i, o - j), c.hasCartesianSeries && (this.zoomX || this.zoomY) && b && !p && !m && (this.selectionMarker = m = c.renderer.rect(i, j, g ? 1 : k, h ? 1 : l, 0).attr({
                        fill: d.selectionMarkerFill || "rgba(69,114,167,0.25)",
                        zIndex: 7
                    }).add()), m && g && (e -= n, m.attr({
                        width: oa(e),
                        x: (e > 0 ? 0 : e) + n
                    })), m && h && (e = f - o, m.attr({
                        height: oa(e),
                        y: (e > 0 ? 0 : e) + o
                    })), b && !m && d.panning && c.pan(a, d.panning)))
                },
                drop: function(a) {
                    var b = this,
                        c = this.chart,
                        d = this.hasPinched;
                    if (this.selectionMarker) {
                        var e, f = {
                                originalEvent: a,
                                xAxis: [],
                                yAxis: []
                            },
                            g = this.selectionMarker,
                            h = g.attr ? g.attr("x") : g.x,
                            i = g.attr ? g.attr("y") : g.y,
                            k = g.attr ? g.attr("width") : g.width,
                            l = g.attr ? g.attr("height") : g.height;
                        (this.hasDragged || d) && (Pa(c.axes, function(c) {
                            if (c.zoomEnabled && j(c.min) && (d || b[{
                                    xAxis: "zoomX",
                                    yAxis: "zoomY"
                                }[c.coll]])) {
                                var g = c.horiz,
                                    m = "touchend" === a.type ? c.minPixelPadding : 0,
                                    n = c.toValue((g ? h : i) + m),
                                    g = c.toValue((g ? h + k : i + l) - m);
                                f[c.coll].push({
                                    axis: c,
                                    min: na(n, g),
                                    max: ma(n, g)
                                }), e = !0
                            }
                        }), e && Va(c, "selection", f, function(a) {
                            c.zoom(Za(a, d ? {
                                animation: !1
                            } : null))
                        })), this.selectionMarker = this.selectionMarker.destroy(), d && this.scaleGroups()
                    }
                    c && (n(c.container, {
                        cursor: c._cursor
                    }), c.cancelClick = this.hasDragged > 10, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
                },
                onContainerMouseDown: function(a) {
                    a = this.normalize(a), a.preventDefault && a.preventDefault(), this.dragStart(a)
                },
                onDocumentMouseUp: function(a) {
                    Ha[jb] && Ha[jb].pointer.drop(a)
                },
                onDocumentMouseMove: function(a) {
                    var b = this.chart,
                        c = this.chartPosition,
                        a = this.normalize(a, c);
                    c && !this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && this.reset()
                },
                onContainerMouseLeave: function(a) {
                    var b = Ha[jb];
                    b && (a.relatedTarget || a.toElement) && (b.pointer.reset(), b.pointer.chartPosition = null)
                },
                onContainerMouseMove: function(a) {
                    var b = this.chart;
                    j(jb) && Ha[jb] && Ha[jb].mouseIsDown || (jb = b.index), a = this.normalize(a), a.returnValue = !1, "mousedown" === b.mouseIsDown && this.drag(a), (this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop)) && !b.openMenu && this.runPointActions(a)
                },
                inClass: function(a, b) {
                    for (var c; a;) {
                        if (c = k(a, "class")) {
                            if (c.indexOf(b) !== -1) return !0;
                            if (c.indexOf("highcharts-container") !== -1) return !1
                        }
                        a = a.parentNode
                    }
                },
                onTrackerMouseOut: function(a) {
                    var b = this.chart.hoverSeries,
                        a = a.relatedTarget || a.toElement;
                    !b || !a || b.options.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) || b.onMouseOut()
                },
                onContainerClick: function(a) {
                    var b = this.chart,
                        c = b.hoverPoint,
                        d = b.plotLeft,
                        e = b.plotTop,
                        a = this.normalize(a);
                    b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (Va(c.series, "click", Za(a, {
                        point: c
                    })), b.hoverPoint && c.firePointEvent("click", a)) : (Za(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && Va(b, "click", a)))
                },
                setDOMEvents: function() {
                    var a = this,
                        b = a.chart.container;
                    b.onmousedown = function(b) {
                        a.onContainerMouseDown(b)
                    }, b.onmousemove = function(b) {
                        a.onContainerMouseMove(b)
                    }, b.onclick = function(b) {
                        a.onContainerClick(b)
                    }, Ta(b, "mouseleave", a.onContainerMouseLeave), 1 === Ia && Ta(ha, "mouseup", a.onDocumentMouseUp), M && (b.ontouchstart = function(b) {
                        a.onContainerTouchStart(b)
                    }, b.ontouchmove = function(b) {
                        a.onContainerTouchMove(b)
                    }, 1 === Ia && Ta(ha, "touchend", a.onDocumentTouchEnd))
                },
                destroy: function() {
                    var a;
                    Ua(this.chart.container, "mouseleave", this.onContainerMouseLeave), Ia || (Ua(ha, "mouseup", this.onDocumentMouseUp), Ua(ha, "touchend", this.onDocumentTouchEnd)), clearInterval(this.tooltipTimeout);
                    for (a in this) this[a] = null
                }
            }, Za(ga.Pointer.prototype, {
                pinchTranslate: function(a, b, c, d, e, f) {
                    (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, a, b, c, d, e, f), (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, a, b, c, d, e, f)
                },
                pinchTranslateDirection: function(a, b, c, d, e, f, g, h) {
                    var i, j, k, l = this.chart,
                        m = a ? "x" : "y",
                        n = a ? "X" : "Y",
                        o = "chart" + n,
                        p = a ? "width" : "height",
                        q = l["plot" + (a ? "Left" : "Top")],
                        r = h || 1,
                        s = l.inverted,
                        t = l.bounds[a ? "h" : "v"],
                        u = 1 === b.length,
                        v = b[0][o],
                        w = c[0][o],
                        x = !u && b[1][o],
                        y = !u && c[1][o],
                        c = function() {
                            !u && oa(v - x) > 20 && (r = h || oa(w - y) / oa(v - x)), j = (q - w) / r + v, i = l["plot" + (a ? "Width" : "Height")] / r
                        };
                    c(), b = j, b < t.min ? (b = t.min, k = !0) : b + i > t.max && (b = t.max - i, k = !0), k ? (w -= .8 * (w - g[m][0]), u || (y -= .8 * (y - g[m][1])), c()) : g[m] = [w, y], s || (f[m] = j - q, f[p] = i), f = s ? 1 / r : r, e[p] = i, e[m] = b, d[s ? a ? "scaleY" : "scaleX" : "scale" + n] = r, d["translate" + n] = f * q + (w - f * v)
                },
                pinch: function(a) {
                    var b = this,
                        c = b.chart,
                        d = b.pinchDown,
                        e = a.touches,
                        f = e.length,
                        g = b.lastValidTouch,
                        h = b.hasZoom,
                        i = b.selectionMarker,
                        j = {},
                        k = 1 === f && (b.inClass(a.target, "highcharts-tracker") && c.runTrackerClick || b.runChartClick),
                        l = {};
                    f > 1 && (b.initiated = !0), h && b.initiated && !k && a.preventDefault(), Sa(e, function(a) {
                        return b.normalize(a)
                    }), "touchstart" === a.type ? (Pa(e, function(a, b) {
                        d[b] = {
                            chartX: a.chartX,
                            chartY: a.chartY
                        }
                    }), g.x = [d[0].chartX, d[1] && d[1].chartX], g.y = [d[0].chartY, d[1] && d[1].chartY], Pa(c.axes, function(a) {
                        if (a.zoomEnabled) {
                            var b = c.bounds[a.horiz ? "h" : "v"],
                                d = a.minPixelPadding,
                                e = a.toPixels(_a(a.options.min, a.dataMin)),
                                f = a.toPixels(_a(a.options.max, a.dataMax)),
                                g = na(e, f),
                                e = ma(e, f);
                            b.min = na(a.pos, g - d), b.max = ma(a.pos + a.len, e + d)
                        }
                    }), b.res = !0) : d.length && (i || (b.selectionMarker = i = Za({
                        destroy: Ga,
                        touch: !0
                    }, c.plotBox)), b.pinchTranslate(d, e, j, i, l, g), b.hasPinched = h, b.scaleGroups(j, l), !h && b.followTouchMove && 1 === f ? this.runPointActions(b.normalize(a)) : b.res && (b.res = !1, this.reset(!1, 0)))
                },
                touch: function(a, b) {
                    var c, d = this.chart;
                    jb = d.index, 1 === a.touches.length ? (a = this.normalize(a), d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop) && !d.openMenu ? (b && this.runPointActions(a), "touchmove" === a.type && (d = this.pinchDown, c = !!d[0] && Math.sqrt(Math.pow(d[0].chartX - a.chartX, 2) + Math.pow(d[0].chartY - a.chartY, 2)) >= 4), _a(c, !0) && this.pinch(a)) : b && this.reset()) : 2 === a.touches.length && this.pinch(a)
                },
                onContainerTouchStart: function(a) {
                    this.touch(a, !0)
                },
                onContainerTouchMove: function(a) {
                    this.touch(a)
                },
                onDocumentTouchEnd: function(a) {
                    Ha[jb] && Ha[jb].pointer.drop(a)
                }
            }), a.PointerEvent || a.MSPointerEvent) {
            var lb = {},
                mb = !!a.PointerEvent,
                nb = function() {
                    var a, b = [];
                    b.item = function(a) {
                        return this[a]
                    };
                    for (a in lb) lb.hasOwnProperty(a) && b.push({
                        pageX: lb[a].pageX,
                        pageY: lb[a].pageY,
                        target: lb[a].target
                    });
                    return b
                },
                ob = function(a, b, c, d) {
                    "touch" !== a.pointerType && a.pointerType !== a.MSPOINTER_TYPE_TOUCH || !Ha[jb] || (d(a), d = Ha[jb].pointer, d[b]({
                        type: c,
                        target: a.currentTarget,
                        preventDefault: Ga,
                        touches: nb()
                    }))
                };
            Za(kb.prototype, {
                onContainerPointerDown: function(a) {
                    ob(a, "onContainerTouchStart", "touchstart", function(a) {
                        lb[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function(a) {
                    ob(a, "onContainerTouchMove", "touchmove", function(a) {
                        lb[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        }, lb[a.pointerId].target || (lb[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function(a) {
                    ob(a, "onDocumentTouchEnd", "touchend", function(a) {
                        delete lb[a.pointerId]
                    })
                },
                batchMSEvents: function(a) {
                    a(this.chart.container, mb ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown), a(this.chart.container, mb ? "pointermove" : "MSPointerMove", this.onContainerPointerMove), a(ha, mb ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            }), ab(kb.prototype, "init", function(a, b, c) {
                a.call(this, b, c), this.hasZoom && n(b.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            }), ab(kb.prototype, "setDOMEvents", function(a) {
                a.apply(this), (this.hasZoom || this.followTouchMove) && this.batchMSEvents(Ta)
            }), ab(kb.prototype, "destroy", function(a) {
                this.batchMSEvents(Ua), a.call(this)
            })
        }
        var pb = ga.Legend = function(a, b) {
            this.init(a, b)
        };
        pb.prototype = {
            init: function(a, b) {
                var c = this,
                    e = b.itemStyle,
                    f = b.itemMarginTop || 0;
                this.options = b, b.enabled && (c.itemStyle = e, c.itemHiddenStyle = d(e, b.itemHiddenStyle), c.itemMarginTop = f, c.padding = e = _a(b.padding, 8), c.initialItemX = e, c.initialItemY = e - 5, c.maxItemWidth = 0, c.chart = a, c.itemHeight = 0, c.symbolWidth = _a(b.symbolWidth, 16), c.pages = [], c.render(), Ta(c.chart, "endResize", function() {
                    c.positionCheckboxes()
                }))
            },
            colorizeItem: function(a, b) {
                var c, d = this.options,
                    e = a.legendItem,
                    f = a.legendLine,
                    g = a.legendSymbol,
                    h = this.itemHiddenStyle.color,
                    d = b ? d.itemStyle.color : h,
                    i = b ? a.legendColor || a.color || "#CCC" : h,
                    h = a.options && a.options.marker,
                    j = {
                        fill: i
                    };
                if (e && e.css({
                        fill: d,
                        color: d
                    }), f && f.attr({
                        stroke: i
                    }), g) {
                    if (h && g.isMarker)
                        for (c in j.stroke = i, h = a.convertAttribs(h)) e = h[c], e !== K && (j[c] = e);
                    g.attr(j)
                }
            },
            positionItem: function(a) {
                var b = this.options,
                    c = b.symbolPadding,
                    b = !b.rtl,
                    d = a._legendItemPos,
                    e = d[0],
                    d = d[1],
                    f = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(b ? e : this.legendWidth - e - 2 * c - 4, d), f && (f.x = e, f.y = d)
            },
            destroyItem: function(a) {
                var b = a.checkbox;
                Pa(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(b) {
                    a[b] && (a[b] = a[b].destroy())
                }), b && z(a.checkbox)
            },
            destroy: function() {
                var a = this.group,
                    b = this.box;
                b && (this.box = b.destroy()), a && (this.group = a.destroy())
            },
            positionCheckboxes: function(a) {
                var b, c = this.group.alignAttr,
                    d = this.clipHeight || this.legendHeight,
                    e = this.titleHeight;
                c && (b = c.translateY, Pa(this.allItems, function(f) {
                    var g, h = f.checkbox;
                    h && (g = b + e + h.y + (a || 0) + 3, n(h, {
                        left: c.translateX + f.checkboxOffset + h.x - 20 + "px",
                        top: g + "px",
                        display: g > b - 6 && g < b + d - 6 ? "" : "none"
                    }))
                }))
            },
            renderTitle: function() {
                var a = this.padding,
                    b = this.options.title,
                    c = 0;
                b.text && (this.title || (this.title = this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({
                    zIndex: 1
                }).css(b.style).add(this.group)), a = this.title.getBBox(), c = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: c
                })), this.titleHeight = c
            },
            setText: function(a) {
                var b = this.options;
                a.legendItem.attr({
                    text: b.labelFormat ? s(b.labelFormat, a) : b.labelFormatter.call(a)
                })
            },
            renderItem: function(a) {
                var b = this.chart,
                    c = b.renderer,
                    e = this.options,
                    f = "horizontal" === e.layout,
                    g = this.symbolWidth,
                    h = e.symbolPadding,
                    i = this.itemStyle,
                    j = this.itemHiddenStyle,
                    k = this.padding,
                    l = f ? _a(e.itemDistance, 20) : 0,
                    m = !e.rtl,
                    n = e.width,
                    o = e.itemMarginBottom || 0,
                    p = this.itemMarginTop,
                    q = this.initialItemX,
                    r = a.legendItem,
                    s = a.series && a.series.drawLegendSymbol ? a.series : a,
                    t = s.options,
                    t = this.createCheckboxForItem && t && t.showCheckbox,
                    u = e.useHTML;
                r || (a.legendGroup = c.g("legend-item").attr({
                    zIndex: 1
                }).add(this.scrollGroup), a.legendItem = r = c.text("", m ? g + h : -h, this.baseline || 0, u).css(d(a.visible ? i : j)).attr({
                    align: m ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (this.fontMetrics = c.fontMetrics(i.fontSize, r), this.baseline = this.fontMetrics.f + 3 + p, r.attr("y", this.baseline)), s.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, r, u, i, j), t && this.createCheckboxForItem(a)), this.colorizeItem(a, a.visible), this.setText(a), c = r.getBBox(), g = a.checkboxOffset = e.itemWidth || a.legendItemWidth || g + h + c.width + l + (t ? 20 : 0), this.itemHeight = h = ja(a.legendItemHeight || c.height), f && this.itemX - q + g > (n || b.chartWidth - 2 * k - q - e.x) && (this.itemX = q, this.itemY += p + this.lastLineHeight + o, this.lastLineHeight = 0), this.maxItemWidth = ma(this.maxItemWidth, g), this.lastItemY = p + this.itemY + o, this.lastLineHeight = ma(h, this.lastLineHeight), a._legendItemPos = [this.itemX, this.itemY], f ? this.itemX += g : (this.itemY += p + h + o, this.lastLineHeight = h), this.offsetWidth = n || ma((f ? this.itemX - q - l : g) + k, this.offsetWidth)
            },
            getAllItems: function() {
                var a = [];
                return Pa(this.chart.series, function(b) {
                    var c = b.options;
                    _a(c.showInLegend, !j(c.linkedTo) && K, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
                }), a
            },
            adjustMargins: function(a, b) {
                var c = this.chart,
                    d = this.options,
                    e = d.align.charAt(0) + d.verticalAlign.charAt(0) + d.layout.charAt(0);
                this.display && !d.floating && Pa([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(f, g) {
                    f.test(e) && !j(a[g]) && (c[La[g]] = ma(c[La[g]], c.legend[(g + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][g] * d[g % 2 ? "x" : "y"] + _a(d.margin, 12) + b[g]))
                })
            },
            render: function() {
                var a, b, c, d, e = this,
                    f = e.chart,
                    g = f.renderer,
                    h = e.group,
                    i = e.box,
                    j = e.options,
                    k = e.padding,
                    l = j.borderWidth,
                    m = j.backgroundColor;
                e.itemX = e.initialItemX, e.itemY = e.initialItemY, e.offsetWidth = 0, e.lastItemY = 0, h || (e.group = h = g.g("legend").attr({
                    zIndex: 7
                }).add(), e.contentGroup = g.g().attr({
                    zIndex: 1
                }).add(h), e.scrollGroup = g.g().add(e.contentGroup)), e.renderTitle(), a = e.getAllItems(), v(a, function(a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                }), j.reversed && a.reverse(), e.allItems = a, e.display = b = !!a.length, e.lastLineHeight = 0, Pa(a, function(a) {
                    e.renderItem(a)
                }), c = (j.width || e.offsetWidth) + k, d = e.lastItemY + e.lastLineHeight + e.titleHeight, d = e.handleOverflow(d), d += k, (l || m) && (i ? c > 0 && d > 0 && (i[i.isNew ? "attr" : "animate"](i.crisp({
                    width: c,
                    height: d
                })), i.isNew = !1) : (e.box = i = g.rect(0, 0, c, d, j.borderRadius, l || 0).attr({
                    stroke: j.borderColor,
                    "stroke-width": l || 0,
                    fill: m || "none"
                }).add(h).shadow(j.shadow), i.isNew = !0), i[b ? "show" : "hide"]()), e.legendWidth = c, e.legendHeight = d, Pa(a, function(a) {
                    e.positionItem(a)
                }), b && h.align(Za({
                    width: c,
                    height: d
                }, j), !0, "spacingBox"), f.isResizing || this.positionCheckboxes()
            },
            handleOverflow: function(a) {
                var b, c, d = this,
                    e = this.chart,
                    f = e.renderer,
                    g = this.options,
                    h = g.y,
                    h = e.spacingBox.height + ("top" === g.verticalAlign ? -h : h) - this.padding,
                    i = g.maxHeight,
                    j = this.clipRect,
                    k = g.navigation,
                    l = _a(k.animation, !0),
                    m = k.arrowSize || 12,
                    n = this.nav,
                    o = this.pages,
                    p = this.padding,
                    q = this.allItems,
                    r = function(a) {
                        j.attr({
                            height: a
                        }), d.contentGroup.div && (d.contentGroup.div.style.clip = "rect(" + p + "px,9999px," + (p + a) + "px,0)")
                    };
                return "horizontal" === g.layout && (h /= 2), i && (h = na(h, i)), o.length = 0, a > h && k.enabled !== !1 ? (this.clipHeight = b = ma(h - 20 - this.titleHeight - p, 0), this.currentPage = _a(this.currentPage, 1), this.fullHeight = a, Pa(q, function(a, d) {
                    var e = a._legendItemPos[1],
                        f = ja(a.legendItem.getBBox().height),
                        g = o.length;
                    (!g || e - o[g - 1] > b && (c || e) !== o[g - 1]) && (o.push(c || e), g++), d === q.length - 1 && e + f - o[g - 1] > b && o.push(e), e !== c && (c = e)
                }), j || (j = d.clipRect = f.clipRect(0, p, 9999, 0), d.contentGroup.clip(j)), r(b), n || (this.nav = n = f.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = f.symbol("triangle", 0, 0, m, m).on("click", function() {
                    d.scroll(-1, l)
                }).add(n), this.pager = f.text("", 15, 10).css(k.style).add(n), this.down = f.symbol("triangle-down", 0, 0, m, m).on("click", function() {
                    d.scroll(1, l)
                }).add(n)), d.scroll(0), a = h) : n && (r(e.chartHeight), n.hide(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0), a
            },
            scroll: function(a, b) {
                var c = this.pages,
                    d = c.length,
                    e = this.currentPage + a,
                    f = this.clipHeight,
                    g = this.options.navigation,
                    h = g.activeColor,
                    g = g.inactiveColor,
                    i = this.pager,
                    j = this.padding;
                e > d && (e = d), e > 0 && (b !== K && B(b, this.chart), this.nav.attr({
                    translateX: j,
                    translateY: f + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), this.up.attr({
                    fill: 1 === e ? g : h
                }).css({
                    cursor: 1 === e ? "default" : "pointer"
                }), i.attr({
                    text: e + "/" + d
                }), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    fill: e === d ? g : h
                }).css({
                    cursor: e === d ? "default" : "pointer"
                }), c = -c[e - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: c
                }), this.currentPage = e, this.positionCheckboxes(c))
            }
        }, fb = ga.LegendSymbolMixin = {
            drawRectangle: function(a, b) {
                var c = a.options.symbolHeight || a.fontMetrics.f;
                b.legendSymbol = this.chart.renderer.rect(0, a.baseline - c + 1, a.symbolWidth, c, a.options.symbolRadius || 0).attr({
                    zIndex: 3
                }).add(b.legendGroup)
            },
            drawLineMarker: function(a) {
                var b, c = this.options,
                    d = c.marker,
                    e = a.symbolWidth,
                    f = this.chart.renderer,
                    g = this.legendGroup,
                    a = a.baseline - ja(.3 * a.fontMetrics.b);
                c.lineWidth && (b = {
                    "stroke-width": c.lineWidth
                }, c.dashStyle && (b.dashstyle = c.dashStyle), this.legendLine = f.path(["M", 0, a, "L", e, a]).attr(b).add(g)), d && d.enabled !== !1 && (c = d.radius, this.legendSymbol = d = f.symbol(this.symbol, e / 2 - c, a - c, 2 * c, 2 * c, d).add(g), d.isMarker = !0)
            }
        }, (/Trident\/7\.0/.test(ta) || ya) && ab(pb.prototype, "positionItem", function(a, b) {
            var c = this,
                d = function() {
                    b._legendItemPos && a.call(c, b)
                };
            d(), setTimeout(d)
        });
        var qb = ga.Chart = function() {
            this.getArgs.apply(this, arguments)
        };
        ga.chart = function(a, b, c) {
            return new qb(a, b, c)
        }, qb.prototype = {
            callbacks: [],
            getArgs: function() {
                var a = [].slice.call(arguments);
                (f(a[0]) || a[0].nodeName) && (this.renderTo = a.shift()), this.init(a[0], a[1])
            },
            init: function(a, b) {
                var c, e = a.series;
                a.series = null, c = d(O, a), c.series = a.series = e, this.userOptions = a, e = c.chart, this.margin = this.splashArray("margin", e), this.spacing = this.splashArray("spacing", e);
                var f = e.events;
                this.bounds = {
                    h: {},
                    v: {}
                }, this.callback = b, this.isResizing = 0, this.options = c, this.axes = [], this.series = [], this.hasCartesianSeries = e.showAxes;
                var g, h = this;
                if (h.index = Ha.length, Ha.push(h), Ia++, e.reflow !== !1 && Ta(h, "load", function() {
                        h.initReflow();
                    }), f)
                    for (g in f) Ta(h, g, f[g]);
                h.xAxis = [], h.yAxis = [], h.animation = !Da && _a(e.animation, !0), h.pointCount = h.colorCounter = h.symbolCounter = 0, h.firstRender()
            },
            initSeries: function(a) {
                var c = this.options.chart;
                return (c = Ma[a.type || c.type || c.defaultSeriesType]) || b(17, !0), c = new c, c.init(this, a), c
            },
            isInsidePlot: function(a, b, c) {
                var d = c ? b : a,
                    a = c ? a : b;
                return d >= 0 && d <= this.plotWidth && a >= 0 && a <= this.plotHeight
            },
            redraw: function(a) {
                var b, c, d = this.axes,
                    e = this.series,
                    f = this.pointer,
                    g = this.legend,
                    h = this.isDirtyLegend,
                    i = this.hasCartesianSeries,
                    j = this.isDirtyBox,
                    k = e.length,
                    l = k,
                    m = this.renderer,
                    n = m.isHidden(),
                    o = [];
                for (B(a, this), n && this.cloneRenderTo(), this.layOutTitles(); l--;)
                    if (a = e[l], a.options.stacking && (b = !0, a.isDirty)) {
                        c = !0;
                        break
                    }
                if (c)
                    for (l = k; l--;) a = e[l], a.options.stacking && (a.isDirty = !0);
                Pa(e, function(a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), h = !0), a.isDirtyData && Va(a, "updatedData")
                }), h && g.options.enabled && (g.render(), this.isDirtyLegend = !1), b && this.getStacks(), i && !this.isResizing && (this.maxTicks = null, Pa(d, function(a) {
                    a.setScale()
                })), this.getMargins(), i && (Pa(d, function(a) {
                    a.isDirty && (j = !0)
                }), Pa(d, function(a) {
                    var c = a.min + "," + a.max;
                    a.extKey !== c && (a.extKey = c, o.push(function() {
                        Va(a, "afterSetExtremes", Za(a.eventArgs, a.getExtremes())), delete a.eventArgs
                    })), (j || b) && a.redraw()
                })), j && this.drawChartBox(), Pa(e, function(a) {
                    a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw()
                }), f && f.reset(!0), m.draw(), Va(this, "redraw"), n && this.cloneRenderTo(!0), Pa(o, function(a) {
                    a.call()
                })
            },
            get: function(a) {
                var b, c, d = this.axes,
                    e = this.series;
                for (b = 0; b < d.length; b++)
                    if (d[b].options.id === a) return d[b];
                for (b = 0; b < e.length; b++)
                    if (e[b].options.id === a) return e[b];
                for (b = 0; b < e.length; b++)
                    for (c = e[b].points || [], d = 0; d < c.length; d++)
                        if (c[d].id === a) return c[d];
                return null
            },
            getAxes: function() {
                var a = this,
                    b = this.options,
                    c = b.xAxis = l(b.xAxis || {}),
                    b = b.yAxis = l(b.yAxis || {});
                Pa(c, function(a, b) {
                    a.index = b, a.isX = !0
                }), Pa(b, function(a, b) {
                    a.index = b
                }), c = c.concat(b), Pa(c, function(b) {
                    new hb(a, b)
                })
            },
            getSelectedPoints: function() {
                var a = [];
                return Pa(this.series, function(b) {
                    a = a.concat(Qa(b.points || [], function(a) {
                        return a.selected
                    }))
                }), a
            },
            getSelectedSeries: function() {
                return Qa(this.series, function(a) {
                    return a.selected
                })
            },
            setTitle: function(a, b, c) {
                var e, f, g = this,
                    h = g.options;
                f = h.title = d(h.title, a), e = h.subtitle = d(h.subtitle, b), h = e, Pa([
                    ["title", a, f],
                    ["subtitle", b, h]
                ], function(a) {
                    var b = a[0],
                        c = g[b],
                        d = a[1],
                        a = a[2];
                    c && d && (g[b] = c = c.destroy()), a && a.text && !c && (g[b] = g.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + b,
                        zIndex: a.zIndex || 4
                    }).css(a.style).add())
                }), g.layOutTitles(c)
            },
            layOutTitles: function(a) {
                var b = 0,
                    c = this.title,
                    d = this.subtitle,
                    e = this.options,
                    f = e.title,
                    e = e.subtitle,
                    g = this.renderer,
                    h = this.spacingBox;
                !c || (c.css({
                    width: (f.width || h.width + f.widthAdjust) + "px"
                }).align(Za({
                    y: g.fontMetrics(f.style.fontSize, c).b - 3
                }, f), !1, h), f.floating || f.verticalAlign) || (b = c.getBBox().height), d && (d.css({
                    width: (e.width || h.width + e.widthAdjust) + "px"
                }).align(Za({
                    y: b + (f.margin - 13) + g.fontMetrics(e.style.fontSize, c).b
                }, e), !1, h), !e.floating && !e.verticalAlign && (b = la(b + d.getBBox().height))), c = this.titleOffset !== b, this.titleOffset = b, !this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && _a(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var a = this.options.chart,
                    b = a.width,
                    a = a.height,
                    c = this.renderToClone || this.renderTo;
                j(b) || (this.containerWidth = Na(c, "width")), j(a) || (this.containerHeight = Na(c, "height")), this.chartWidth = ma(0, b || this.containerWidth || 600), this.chartHeight = ma(0, _a(a, this.containerHeight > 19 ? this.containerHeight : 400))
            },
            cloneRenderTo: function(a) {
                var b = this.renderToClone,
                    c = this.container;
                a ? b && (this.renderTo.appendChild(c), z(b), delete this.renderToClone) : (c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), n(b, {
                    position: "absolute",
                    top: "-9999px",
                    display: "block"
                }), b.style.setProperty && b.style.setProperty("display", "block", "important"), ha.body.appendChild(b), c && b.appendChild(c))
            },
            getContainer: function() {
                var a, c, d, g = this.options,
                    h = g.chart;
                a = this.renderTo;
                var i = "highcharts-" + Fa++;
                a || (this.renderTo = a = h.renderTo), f(a) && (this.renderTo = a = ha.getElementById(a)), a || b(13, !0), c = e(k(a, "data-highcharts-chart")), $a(c) && Ha[c] && Ha[c].hasRendered && Ha[c].destroy(), k(a, "data-highcharts-chart", this.index), a.innerHTML = "", !h.skipClone && !a.offsetWidth && this.cloneRenderTo(), this.getChartSize(), c = this.chartWidth, d = this.chartHeight, this.container = a = o(Ja, {
                    className: "highcharts-container" + (h.className ? " " + h.className : ""),
                    id: i
                }, Za({
                    position: "relative",
                    overflow: "hidden",
                    width: c + "px",
                    height: d + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, h.style), this.renderToClone || a), this._cursor = a.style.cursor, this.renderer = new(ga[h.renderer] || L)(a, c, d, h.style, h.forExport, g.exporting && g.exporting.allowHTML), Da && this.renderer.create(this, a, c, d), this.renderer.chartIndex = this.index
            },
            getMargins: function(a) {
                var b = this.spacing,
                    c = this.margin,
                    d = this.titleOffset;
                this.resetMargins(), d && !j(c[0]) && (this.plotTop = ma(this.plotTop, d + this.options.title.margin + b[0])), this.legend.adjustMargins(c, b), this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin), this.extraTopMargin && (this.plotTop += this.extraTopMargin), a || this.getAxisMargins()
            },
            getAxisMargins: function() {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    c = a.margin;
                a.hasCartesianSeries && Pa(a.axes, function(a) {
                    a.visible && a.getOffset()
                }), Pa(La, function(d, e) {
                    j(c[e]) || (a[d] += b[e])
                }), a.setChartSize()
            },
            reflow: function(b) {
                var c = this,
                    d = c.options.chart,
                    e = c.renderTo,
                    f = d.width || Na(e, "width"),
                    g = d.height || Na(e, "height"),
                    d = b ? b.target : a;
                c.hasUserSize || c.isPrinting || !f || !g || d !== a && d !== ha || (f === c.containerWidth && g === c.containerHeight || (clearTimeout(c.reflowTimeout), c.reflowTimeout = m(function() {
                    c.container && (c.setSize(f, g, !1), c.hasUserSize = null)
                }, b ? 100 : 0)), c.containerWidth = f, c.containerHeight = g)
            },
            initReflow: function() {
                var b = this,
                    c = function(a) {
                        b.reflow(a)
                    };
                Ta(a, "resize", c), Ta(b, "destroy", function() {
                    Ua(a, "resize", c)
                })
            },
            setSize: function(a, b, c) {
                var d, e, f = this,
                    g = f.renderer;
                f.isResizing += 1, B(c, f), f.oldChartHeight = f.chartHeight, f.oldChartWidth = f.chartWidth, j(a) && (f.chartWidth = d = ma(0, ja(a)), f.hasUserSize = !!d), j(b) && (f.chartHeight = e = ma(0, ja(b))), a = g.globalAnimation, (a ? Wa : n)(f.container, {
                    width: d + "px",
                    height: e + "px"
                }, a), f.setChartSize(!0), g.setSize(d, e, c), f.maxTicks = null, Pa(f.axes, function(a) {
                    a.isDirty = !0, a.setScale()
                }), Pa(f.series, function(a) {
                    a.isDirty = !0
                }), f.isDirtyLegend = !0, f.isDirtyBox = !0, f.layOutTitles(), f.getMargins(), f.redraw(c), f.oldChartHeight = null, Va(f, "resize"), m(function() {
                    f && Va(f, "endResize", null, function() {
                        f.isResizing -= 1
                    })
                }, C(a).duration)
            },
            setChartSize: function(a) {
                var b, c, d, e, f = this.inverted,
                    g = this.renderer,
                    h = this.chartWidth,
                    i = this.chartHeight,
                    j = this.options.chart,
                    k = this.spacing,
                    l = this.clipOffset;
                this.plotLeft = b = ja(this.plotLeft), this.plotTop = c = ja(this.plotTop), this.plotWidth = d = ma(0, ja(h - b - this.marginRight)), this.plotHeight = e = ma(0, ja(i - c - this.marginBottom)), this.plotSizeX = f ? e : d, this.plotSizeY = f ? d : e, this.plotBorderWidth = j.plotBorderWidth || 0, this.spacingBox = g.spacingBox = {
                    x: k[3],
                    y: k[0],
                    width: h - k[3] - k[1],
                    height: i - k[0] - k[2]
                }, this.plotBox = g.plotBox = {
                    x: b,
                    y: c,
                    width: d,
                    height: e
                }, h = 2 * ka(this.plotBorderWidth / 2), f = la(ma(h, l[3]) / 2), g = la(ma(h, l[0]) / 2), this.clipBox = {
                    x: f,
                    y: g,
                    width: ka(this.plotSizeX - ma(h, l[1]) / 2 - f),
                    height: ma(0, ka(this.plotSizeY - ma(h, l[2]) / 2 - g))
                }, a || Pa(this.axes, function(a) {
                    a.setAxisSize(), a.setAxisTranslation()
                })
            },
            resetMargins: function() {
                var a = this;
                Pa(La, function(b, c) {
                    a[b] = _a(a.margin[c], a.spacing[c])
                }), a.axisOffset = [0, 0, 0, 0], a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var a, b = this.options.chart,
                    c = this.renderer,
                    d = this.chartWidth,
                    e = this.chartHeight,
                    f = this.chartBackground,
                    g = this.plotBackground,
                    h = this.plotBorder,
                    i = this.plotBGImage,
                    j = b.borderWidth || 0,
                    k = b.backgroundColor,
                    l = b.plotBackgroundColor,
                    m = b.plotBackgroundImage,
                    n = b.plotBorderWidth || 0,
                    o = this.plotLeft,
                    p = this.plotTop,
                    q = this.plotWidth,
                    r = this.plotHeight,
                    s = this.plotBox,
                    t = this.clipRect,
                    u = this.clipBox;
                a = j + (b.shadow ? 8 : 0), (j || k) && (f ? f.animate(f.crisp({
                    width: d - a,
                    height: e - a
                })) : (f = {
                    fill: k || "none"
                }, j && (f.stroke = b.borderColor, f["stroke-width"] = j), this.chartBackground = c.rect(a / 2, a / 2, d - a, e - a, b.borderRadius, j).attr(f).addClass("highcharts-background").add().shadow(b.shadow))), l && (g ? g.animate(s) : this.plotBackground = c.rect(o, p, q, r, 0).attr({
                    fill: l
                }).add().shadow(b.plotShadow)), m && (i ? i.animate(s) : this.plotBGImage = c.image(m, o, p, q, r).add()), t ? t.animate({
                    width: u.width,
                    height: u.height
                }) : this.clipRect = c.clipRect(u), n && (h ? (h.strokeWidth = -n, h.animate(h.crisp({
                    x: o,
                    y: p,
                    width: q,
                    height: r
                }))) : this.plotBorder = c.rect(o, p, q, r, 0, -n).attr({
                    stroke: b.plotBorderColor,
                    "stroke-width": n,
                    fill: "none",
                    zIndex: 1
                }).add()), this.isDirtyBox = !1
            },
            propFromSeries: function() {
                var a, b, c, d = this,
                    e = d.options.chart,
                    f = d.options.series;
                Pa(["inverted", "angular", "polar"], function(g) {
                    for (a = Ma[e.type || e.defaultSeriesType], c = d[g] || e[g] || a && a.prototype[g], b = f && f.length; !c && b--;)(a = Ma[f[b].type]) && a.prototype[g] && (c = !0);
                    d[g] = c
                })
            },
            linkSeries: function() {
                var a = this,
                    b = a.series;
                Pa(b, function(a) {
                    a.linkedSeries.length = 0
                }), Pa(b, function(b) {
                    var c = b.options.linkedTo;
                    f(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = _a(b.options.visible, c.options.visible, b.visible))
                })
            },
            renderSeries: function() {
                Pa(this.series, function(a) {
                    a.translate(), a.render()
                })
            },
            renderLabels: function() {
                var a = this,
                    b = a.options.labels;
                b.items && Pa(b.items, function(c) {
                    var d = Za(b.style, c.style),
                        f = e(d.left) + a.plotLeft,
                        g = e(d.top) + a.plotTop + 12;
                    delete d.left, delete d.top, a.renderer.text(c.html, f, g).attr({
                        zIndex: 2
                    }).css(d).add()
                })
            },
            render: function() {
                var a, b, c, d, e = this.axes,
                    f = this.renderer,
                    g = this.options;
                this.setTitle(), this.legend = new pb(this, g.legend), this.getStacks && this.getStacks(), this.getMargins(!0), this.setChartSize(), a = this.plotWidth, b = this.plotHeight -= 21, Pa(e, function(a) {
                    a.setScale()
                }), this.getAxisMargins(), c = a / this.plotWidth > 1.1, d = b / this.plotHeight > 1.05, (c || d) && (this.maxTicks = null, Pa(e, function(a) {
                    (a.horiz && c || !a.horiz && d) && a.setTickInterval(!0)
                }), this.getMargins()), this.drawChartBox(), this.hasCartesianSeries && Pa(e, function(a) {
                    a.visible && a.render()
                }), this.seriesGroup || (this.seriesGroup = f.g("series-group").attr({
                    zIndex: 3
                }).add()), this.renderSeries(), this.renderLabels(), this.showCredits(g.credits), this.hasRendered = !0
            },
            showCredits: function(b) {
                b.enabled && !this.credits && (this.credits = this.renderer.text(b.text, 0, 0).on("click", function() {
                    b.href && (a.location.href = b.href)
                }).attr({
                    align: b.position.align,
                    zIndex: 8
                }).css(b.style).add().align(b.position))
            },
            destroy: function() {
                var a, b = this,
                    c = b.axes,
                    d = b.series,
                    e = b.container,
                    f = e && e.parentNode;
                for (Va(b, "destroy"), Ha[b.index] = K, Ia--, b.renderTo.removeAttribute("data-highcharts-chart"), Ua(b), a = c.length; a--;) c[a] = c[a].destroy();
                for (a = d.length; a--;) d[a] = d[a].destroy();
                Pa("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","), function(a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                }), e && (e.innerHTML = "", Ua(e), f && z(e));
                for (a in b) delete b[a]
            },
            isReadyToRender: function() {
                var b = this;
                return !(!Ba && a == a.top && "complete" !== ha.readyState || Da && !a.canvg) || (Da ? gb.push(function() {
                    b.firstRender()
                }, b.options.global.canvasToolsURL) : ha.attachEvent("onreadystatechange", function() {
                    ha.detachEvent("onreadystatechange", b.firstRender), "complete" === ha.readyState && b.firstRender()
                }), !1)
            },
            firstRender: function() {
                var a = this,
                    b = a.options;
                a.isReadyToRender() && (a.getContainer(), Va(a, "init"), a.resetMargins(), a.setChartSize(), a.propFromSeries(), a.getAxes(), Pa(b.series || [], function(b) {
                    a.initSeries(b)
                }), a.linkSeries(), Va(a, "beforeRender"), ga.Pointer && (a.pointer = new kb(a, b)), a.render(), a.renderer.draw(), !a.renderer.imgCount && a.onload && a.onload(), a.cloneRenderTo(!0))
            },
            onload: function() {
                var a = this;
                Pa([this.callback].concat(this.callbacks), function(b) {
                    b && void 0 !== a.index && b.apply(a, [a])
                }), Va(a, "load"), this.onload = null
            },
            splashArray: function(a, b) {
                var c = b[a],
                    c = g(c) ? c : [c, c, c, c];
                return [_a(b[a + "Top"], c[0]), _a(b[a + "Right"], c[1]), _a(b[a + "Bottom"], c[2]), _a(b[a + "Left"], c[3])]
            }
        };
        var rb = ga.CenteredSeriesMixin = {
                getCenter: function() {
                    var a, b, c = this.options,
                        d = this.chart,
                        e = 2 * (c.slicedOffset || 0),
                        f = d.plotWidth - 2 * e,
                        d = d.plotHeight - 2 * e,
                        g = c.center,
                        g = [_a(g[0], "50%"), _a(g[1], "50%"), c.size || "100%", c.innerSize || 0],
                        h = na(f, d);
                    for (a = 0; a < 4; ++a) b = g[a], c = a < 2 || 2 === a && /%$/.test(b), g[a] = (/%$/.test(b) ? [f, d, h, g[2]][a] * parseFloat(b) / 100 : parseFloat(b)) + (c ? e : 0);
                    return g[3] > g[2] && (g[3] = g[2]), g
                }
            },
            sb = function() {};
        sb.prototype = {
            init: function(a, b, c) {
                return this.series = a, this.color = a.color, this.applyOptions(b, c), this.pointAttr = {}, a.options.colorByPoint && (b = a.options.colors || a.chart.options.colors, this.color = this.color || b[a.colorCounter++], a.colorCounter === b.length) && (a.colorCounter = 0), a.chart.pointCount++, this
            },
            applyOptions: function(a, b) {
                var c = this.series,
                    d = c.options.pointValKey || c.pointValKey,
                    a = sb.prototype.optionsToObject.call(this, a);
                return Za(this, a), this.options = this.options ? Za(this.options, a) : a, d && (this.y = this[d]), this.isNull = null === this.x || null === this.y, void 0 === this.x && c && (this.x = void 0 === b ? c.autoIncrement() : b), this
            },
            optionsToObject: function(a) {
                var b = {},
                    c = this.series,
                    d = c.options.keys,
                    e = d || c.pointArrayMap || ["y"],
                    f = e.length,
                    g = 0,
                    i = 0;
                if ($a(a) || null === a) b[e[0]] = a;
                else if (h(a))
                    for (!d && a.length > f && (c = typeof a[0], "string" === c ? b.name = a[0] : "number" === c && (b.x = a[0]), g++); i < f;) d && void 0 === a[g] || (b[e[i]] = a[g]), g++, i++;
                else "object" == typeof a && (b = a, a.dataLabels && (c._hasPointLabels = !0), a.marker && (c._hasPointMarkers = !0));
                return b
            },
            destroy: function() {
                var a, b = this.series.chart,
                    c = b.hoverPoints;
                b.pointCount--, c && (this.setState(), i(c, this), !c.length) && (b.hoverPoints = null), this === b.hoverPoint && this.onMouseOut(), (this.graphic || this.dataLabel) && (Ua(this), this.destroyElements()), this.legendItem && b.legend.destroyItem(this);
                for (a in this) this[a] = null
            },
            destroyElements: function() {
                for (var a, b = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], c = 6; c--;) a = b[c], this[a] && (this[a] = this[a].destroy())
            },
            getLabelConfig: function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function(a) {
                var b = this.series,
                    c = b.tooltipOptions,
                    d = _a(c.valueDecimals, ""),
                    e = c.valuePrefix || "",
                    f = c.valueSuffix || "";
                return Pa(b.pointArrayMap || ["y"], function(b) {
                    b = "{point." + b, (e || f) && (a = a.replace(b + "}", e + b + "}" + f)), a = a.replace(b + "}", b + ":,." + d + "f}")
                }), s(a, {
                    point: this,
                    series: this.series
                })
            },
            firePointEvent: function(a, b, c) {
                var d = this,
                    e = this.series.options;
                (e.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents(), "click" === a && e.allowPointSelect && (c = function(a) {
                    d.select && d.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                }), Va(this, a, b, c)
            },
            visible: !0
        };
        var tb = ga.Series = function() {};
        tb.prototype = {
            isCartesian: !0,
            type: "line",
            pointClass: sb,
            sorted: !0,
            requireSorting: !0,
            pointAttrToOptions: {
                stroke: "lineColor",
                "stroke-width": "lineWidth",
                fill: "fillColor",
                r: "radius"
            },
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            init: function(a, b) {
                var c, d, e = this,
                    f = a.series,
                    g = function(a, b) {
                        return _a(a.options.index, a._i) - _a(b.options.index, b._i)
                    };
                e.chart = a, e.options = b = e.setOptions(b), e.linkedSeries = [], e.bindAxes(), Za(e, {
                    name: b.name,
                    state: "",
                    pointAttr: {},
                    visible: b.visible !== !1,
                    selected: b.selected === !0
                }), Da && (b.animation = !1), d = b.events;
                for (c in d) Ta(e, c, d[c]);
                (d && d.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) && (a.runTrackerClick = !0), e.getColor(), e.getSymbol(), Pa(e.parallelArrays, function(a) {
                    e[a + "Data"] = []
                }), e.setData(b.data, !1), e.isCartesian && (a.hasCartesianSeries = !0), f.push(e), e._i = f.length - 1, v(f, g), this.yAxis && v(this.yAxis.series, g), Pa(f, function(a, b) {
                    a.index = b, a.name = a.name || "Series " + (b + 1)
                })
            },
            bindAxes: function() {
                var a, c = this,
                    d = c.options,
                    e = c.chart;
                Pa(c.axisTypes || [], function(f) {
                    Pa(e[f], function(b) {
                        a = b.options, (d[f] === a.index || d[f] !== K && d[f] === a.id || d[f] === K && 0 === a.index) && (b.series.push(c), c[f] = b, b.isDirty = !0)
                    }), !c[f] && c.optionalAxis !== f && b(18, !0)
                })
            },
            updateParallelArrays: function(a, b) {
                var c = a.series,
                    d = arguments,
                    e = $a(b) ? function(d) {
                        var e = "y" === d && c.toYData ? c.toYData(a) : a[d];
                        c[d + "Data"][b] = e
                    } : function(a) {
                        Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
                    };
                Pa(c.parallelArrays, e)
            },
            autoIncrement: function() {
                var a, b = this.options,
                    c = this.xIncrement,
                    d = b.pointIntervalUnit,
                    c = _a(c, b.pointStart, 0);
                return this.pointInterval = a = _a(this.pointInterval, b.pointInterval, 1), d && (b = new R(c), "day" === d ? b = +b[da](b[Y]() + a) : "month" === d ? b = +b[ea](b[Z]() + a) : "year" === d && (b = +b[fa](b[$]() + a)), a = b - c), this.xIncrement = c + a, c
            },
            setOptions: function(a) {
                var b = this.chart,
                    c = b.options.plotOptions,
                    b = b.userOptions || {},
                    e = b.plotOptions || {},
                    f = c[this.type];
                return this.userOptions = a, c = d(f, c.series, a), this.tooltipOptions = d(O.tooltip, O.plotOptions[this.type].tooltip, b.tooltip, e.series && e.series.tooltip, e[this.type] && e[this.type].tooltip, a.tooltip), null === f.marker && delete c.marker, this.zoneAxis = c.zoneAxis, a = this.zones = (c.zones || []).slice(), !c.negativeColor && !c.negativeFillColor || c.zones || a.push({
                    value: c[this.zoneAxis + "Threshold"] || c.threshold || 0,
                    color: c.negativeColor,
                    fillColor: c.negativeFillColor
                }), a.length && j(a[a.length - 1].value) && a.push({
                    color: this.color,
                    fillColor: this.fillColor
                }), c
            },
            getCyclic: function(a, b, c) {
                var d = this.userOptions,
                    e = "_" + a + "Index",
                    f = a + "Counter";
                b || (j(d[e]) ? b = d[e] : (d[e] = b = this.chart[f] % c.length, this.chart[f] += 1), b = c[b]), this[a] = b
            },
            getColor: function() {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || bb[this.type].color, this.chart.options.colors)
            },
            getSymbol: function() {
                var a = this.options.marker;
                this.getCyclic("symbol", a.symbol, this.chart.options.symbols), /^url/.test(this.symbol) && (a.radius = 0)
            },
            drawLegendSymbol: fb.drawLineMarker,
            setData: function(a, c, d, e) {
                var g, i = this,
                    k = i.points,
                    l = k && k.length || 0,
                    m = i.options,
                    n = i.chart,
                    o = null,
                    p = i.xAxis,
                    q = p && !!p.categories,
                    r = m.turboThreshold,
                    s = this.xData,
                    t = this.yData,
                    u = (g = i.pointArrayMap) && g.length,
                    a = a || [];
                if (g = a.length, c = _a(c, !0), e !== !1 && g && l === g && !i.cropped && !i.hasGroupedData && i.visible) Pa(a, function(a, b) {
                    k[b].update && a !== m.data[b] && k[b].update(a, !1, null, !1)
                });
                else {
                    if (i.xIncrement = null, i.colorCounter = 0, Pa(this.parallelArrays, function(a) {
                            i[a + "Data"].length = 0
                        }), r && g > r) {
                        for (d = 0; null === o && d < g;) o = a[d], d++;
                        if ($a(o)) {
                            for (q = _a(m.pointStart, 0), o = _a(m.pointInterval, 1), d = 0; d < g; d++) s[d] = q, t[d] = a[d], q += o;
                            i.xIncrement = q
                        } else if (h(o))
                            if (u)
                                for (d = 0; d < g; d++) o = a[d], s[d] = o[0], t[d] = o.slice(1, u + 1);
                            else
                                for (d = 0; d < g; d++) o = a[d], s[d] = o[0], t[d] = o[1];
                        else b(12)
                    } else
                        for (d = 0; d < g; d++) a[d] !== K && (o = {
                            series: i
                        }, i.pointClass.prototype.applyOptions.apply(o, [a[d]]), i.updateParallelArrays(o, d), q && j(o.name)) && (p.names[o.x] = o.name);
                    for (f(t[0]) && b(14, !0), i.data = [], i.options.data = i.userOptions.data = a, d = l; d--;) k[d] && k[d].destroy && k[d].destroy();
                    p && (p.minRange = p.userMinRange), i.isDirty = i.isDirtyData = n.isDirtyBox = !0, d = !1
                }
                "point" === m.legendType && (this.processData(), this.generatePoints()), c && n.redraw(d)
            },
            processData: function(a) {
                var c, d = this.xData,
                    e = this.yData,
                    f = d.length;
                c = 0;
                var g, h, i, j = this.xAxis,
                    k = this.options;
                i = k.cropThreshold;
                var l, m, n = this.getExtremesFromAll || k.getExtremesFromAll,
                    o = this.isCartesian,
                    k = j && j.val2lin,
                    p = j && j.isLog;
                if (o && !this.isDirty && !j.isDirty && !this.yAxis.isDirty && !a) return !1;
                for (j && (a = j.getExtremes(), l = a.min, m = a.max), o && this.sorted && !n && (!i || f > i || this.forceCrop) && (d[f - 1] < l || d[0] > m ? (d = [], e = []) : (d[0] < l || d[f - 1] > m) && (c = this.cropData(this.xData, this.yData, l, m), d = c.xData, e = c.yData, c = c.start, g = !0)), i = d.length || 1; --i;) f = p ? k(d[i]) - k(d[i - 1]) : d[i] - d[i - 1], f > 0 && (h === K || f < h) ? h = f : f < 0 && this.requireSorting && b(15);
                this.cropped = g, this.cropStart = c, this.processedXData = d, this.processedYData = e, this.closestPointRange = h
            },
            cropData: function(a, b, c, d) {
                var e, f = a.length,
                    g = 0,
                    h = f,
                    i = _a(this.cropShoulder, 1);
                for (e = 0; e < f; e++)
                    if (a[e] >= c) {
                        g = ma(0, e - i);
                        break
                    }
                for (c = e; c < f; c++)
                    if (a[c] > d) {
                        h = c + i;
                        break
                    }
                return {
                    xData: a.slice(g, h),
                    yData: b.slice(g, h),
                    start: g,
                    end: h
                }
            },
            generatePoints: function() {
                var a, b, c, d, e = this.options.data,
                    f = this.data,
                    g = this.processedXData,
                    h = this.processedYData,
                    i = this.pointClass,
                    j = g.length,
                    k = this.cropStart || 0,
                    m = this.hasGroupedData,
                    n = [];
                for (f || m || (f = [], f.length = e.length, f = this.data = f), d = 0; d < j; d++) b = k + d, m ? (n[d] = (new i).init(this, [g[d]].concat(l(h[d]))), n[d].dataGroup = this.groupMap[d]) : (f[b] ? c = f[b] : e[b] !== K && (f[b] = c = (new i).init(this, e[b], g[d])), n[d] = c), n[d].index = b;
                if (f && (j !== (a = f.length) || m))
                    for (d = 0; d < a; d++) d === k && !m && (d += j), f[d] && (f[d].destroyElements(), f[d].plotX = K);
                this.data = f, this.points = n
            },
            getExtremes: function(a) {
                var b, c = this.yAxis,
                    d = this.processedXData,
                    e = [],
                    f = 0;
                b = this.xAxis.getExtremes();
                var g, h, i, j, k = b.min,
                    l = b.max,
                    a = a || this.stackedYData || this.processedYData || [];
                for (b = a.length, j = 0; j < b; j++)
                    if (h = d[j], i = a[j], g = null !== i && i !== K && (!c.isLog || i.length || i > 0), h = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (d[j + 1] || h) >= k && (d[j - 1] || h) <= l, g && h)
                        if (g = i.length)
                            for (; g--;) null !== i[g] && (e[f++] = i[g]);
                        else e[f++] = i;
                this.dataMin = w(e), this.dataMax = x(e)
            },
            translate: function() {
                this.processedXData || this.processData(), this.generatePoints();
                for (var a, c, d, e, f = this.options, g = f.stacking, h = this.xAxis, i = h.categories, k = this.yAxis, l = this.points, m = l.length, n = !!this.modifyValue, o = f.pointPlacement, p = "between" === o || $a(o), q = f.threshold, r = f.startFromThreshold ? q : 0, s = Number.MAX_VALUE, f = 0; f < m; f++) {
                    var t = l[f],
                        u = t.x,
                        v = t.y;
                    c = t.low;
                    var w = g && k.stacks[(this.negStacks && v < (r ? 0 : q) ? "-" : "") + this.stackKey];
                    k.isLog && null !== v && v <= 0 && (t.y = v = null, b(10)), t.plotX = a = A(na(ma(-1e5, h.translate(u, 0, 0, 0, 1, o, "flags" === this.type)), 1e5)), g && this.visible && !t.isNull && w && w[u] && (e = this.getStackIndicator(e, u, this.index), w = w[u], v = w.points[e.key], c = v[0], v = v[1], c === r && (c = _a(q, k.min)), k.isLog && c <= 0 && (c = null), t.total = t.stackTotal = w.total, t.percentage = w.total && t.y / w.total * 100, t.stackY = v, w.setOffset(this.pointXOffset || 0, this.barW || 0)), t.yBottom = j(c) ? k.translate(c, 0, 1, 0, 1) : null, n && (v = this.modifyValue(v, t)), t.plotY = c = "number" == typeof v && v !== 1 / 0 ? na(ma(-1e5, k.translate(v, 0, 1, 0, 1)), 1e5) : K, t.isInside = c !== K && c >= 0 && c <= k.len && a >= 0 && a <= h.len, t.clientX = p ? h.translate(u, 0, 0, 0, 1) : a, t.negative = t.y < (q || 0), t.category = i && i[t.x] !== K ? i[t.x] : t.x, t.isNull || (void 0 !== d && (s = na(s, oa(a - d))), d = a)
                }
                this.closestPointRangePx = s
            },
            getValidPoints: function(a, b) {
                var c = this.chart;
                return Qa(a || this.points || [], function(a) {
                    return !(b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted)) && !a.isNull
                })
            },
            setClip: function(a) {
                var b = this.chart,
                    c = this.options,
                    d = b.renderer,
                    e = b.inverted,
                    f = this.clipBox,
                    g = f || b.clipBox,
                    h = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join(","),
                    i = b[h],
                    j = b[h + "m"];
                i || (a && (g.width = 0, b[h + "m"] = j = d.clipRect(-99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)), b[h] = i = d.clipRect(g)), a && (i.count += 1), c.clip !== !1 && (this.group.clip(a || f ? i : b.clipRect), this.markerGroup.clip(j), this.sharedClipKey = h), a || (i.count -= 1, i.count <= 0 && h && b[h] && (f || (b[h] = b[h].destroy()), b[h + "m"] && (b[h + "m"] = b[h + "m"].destroy())))
            },
            animate: function(a) {
                var b, c = this.chart,
                    d = this.options.animation;
                d && !g(d) && (d = bb[this.type].animation), a ? this.setClip(d) : (b = this.sharedClipKey, (a = c[b]) && a.animate({
                    width: c.plotSizeX
                }, d), c[b + "m"] && c[b + "m"].animate({
                    width: c.plotSizeX + 99
                }, d), this.animate = null)
            },
            afterAnimate: function() {
                this.setClip(), Va(this, "afterAnimate")
            },
            drawPoints: function() {
                var a, b, c, d, e, f, g, h, i, j, k, l, m = this.points,
                    n = this.chart,
                    o = this.options.marker,
                    p = this.pointAttr[""],
                    q = this.markerGroup,
                    r = _a(o.enabled, this.xAxis.isRadial, this.closestPointRangePx > 2 * o.radius);
                if (o.enabled !== !1 || this._hasPointMarkers)
                    for (d = m.length; d--;) e = m[d], b = ka(e.plotX), c = e.plotY, i = e.graphic, j = e.marker || {}, k = !!e.marker, a = r && j.enabled === K || j.enabled, l = e.isInside, a && $a(c) && null !== e.y ? (a = e.pointAttr[e.selected ? "select" : ""] || p, f = a.r, g = _a(j.symbol, this.symbol), h = 0 === g.indexOf("url"), i ? i[l ? "show" : "hide"](!0).attr(a).animate(Za({
                        x: b - f,
                        y: c - f
                    }, i.symbolName ? {
                        width: 2 * f,
                        height: 2 * f
                    } : {})) : l && (f > 0 || h) && (e.graphic = n.renderer.symbol(g, b - f, c - f, 2 * f, 2 * f, k ? j : o).attr(a).add(q))) : i && (e.graphic = i.destroy())
            },
            convertAttribs: function(a, b, c, d) {
                var e, f, g = this.pointAttrToOptions,
                    h = {},
                    a = a || {},
                    b = b || {},
                    c = c || {},
                    d = d || {};
                for (e in g) f = g[e], h[e] = _a(a[f], b[e], c[e], d[e]);
                return h
            },
            getAttribs: function() {
                var a, b, c, d = this,
                    e = d.options,
                    f = bb[d.type].marker ? e.marker : e,
                    g = f.states,
                    h = g.hover,
                    i = d.color,
                    k = d.options.negativeColor,
                    l = {
                        stroke: i,
                        fill: i
                    },
                    m = d.points || [],
                    n = [],
                    o = d.pointAttrToOptions;
                a = d.hasPointSpecificOptions;
                var p = f.lineColor,
                    q = f.fillColor;
                b = e.turboThreshold;
                var r, s, t = d.zones,
                    u = d.zoneAxis || "y";
                if (e.marker ? (h.radius = h.radius || f.radius + h.radiusPlus, h.lineWidth = h.lineWidth || f.lineWidth + h.lineWidthPlus) : (h.color = h.color || E(h.color || i).brighten(h.brightness).get(), h.negativeColor = h.negativeColor || E(h.negativeColor || k).brighten(h.brightness).get()), n[""] = d.convertAttribs(f, l), Pa(["hover", "select"], function(a) {
                        n[a] = d.convertAttribs(g[a], n[""])
                    }), d.pointAttr = n, i = m.length, !b || i < b || a)
                    for (; i--;) {
                        if (b = m[i], (f = b.options && b.options.marker || b.options) && f.enabled === !1 && (f.radius = 0), l = null, t.length) {
                            for (a = 0, l = t[a]; b[u] >= l.value;) l = t[++a];
                            b.color = b.fillColor = l = _a(l.color, d.color)
                        }
                        if (a = e.colorByPoint || b.color, b.options)
                            for (s in o) j(f[o[s]]) && (a = !0);
                        a ? (f = f || {}, c = [], g = f.states || {}, a = g.hover = g.hover || {}, e.marker && (!b.negative || a.fillColor || h.fillColor) || (a[d.pointAttrToOptions.fill] = a.color || !b.options.color && h[b.negative && k ? "negativeColor" : "color"] || E(b.color).brighten(a.brightness || h.brightness).get()), r = {
                            color: b.color
                        }, q || (r.fillColor = b.color), p || (r.lineColor = b.color), f.hasOwnProperty("color") && !f.color && delete f.color, l && !h.fillColor && (a.fillColor = l), c[""] = d.convertAttribs(Za(r, f), n[""]), c.hover = d.convertAttribs(g.hover, n.hover, c[""]), c.select = d.convertAttribs(g.select, n.select, c[""])) : c = n, b.pointAttr = c
                    }
            },
            destroy: function() {
                var a, b, c, d, e = this,
                    f = e.chart,
                    g = /AppleWebKit\/533/.test(ta),
                    h = e.data || [];
                for (Va(e, "destroy"), Ua(e), Pa(e.axisTypes || [], function(a) {
                        (d = e[a]) && (i(d.series, e), d.isDirty = d.forceRedraw = !0)
                    }), e.legendItem && e.chart.legend.destroyItem(e), a = h.length; a--;)(b = h[a]) && b.destroy && b.destroy();
                e.points = null, clearTimeout(e.animationTimeout);
                for (c in e) e[c] instanceof F && !e[c].survive && (a = g && "group" === c ? "hide" : "destroy", e[c][a]());
                f.hoverSeries === e && (f.hoverSeries = null), i(f.series, e);
                for (c in e) delete e[c]
            },
            getGraphPath: function(a, b, c) {
                var d, e, f = this,
                    g = f.options,
                    h = g.step,
                    i = [],
                    a = a || f.points;
                return (d = a.reversed) && a.reverse(), (h = {
                    right: 1,
                    center: 2
                }[h] || h && 3) && d && (h = 4 - h), g.connectNulls && !b && !c && (a = this.getValidPoints(a)), Pa(a, function(d, k) {
                    var l = d.plotX,
                        m = d.plotY,
                        n = a[k - 1];
                    (d.leftCliff || n && n.rightCliff) && !c && (e = !0), d.isNull && !j(b) && k > 0 ? e = !g.connectNulls : d.isNull && !b ? e = !0 : (0 === k || e ? n = ["M", d.plotX, d.plotY] : f.getPointSpline ? n = f.getPointSpline(a, d, k) : h ? (n = 1 === h ? ["L", n.plotX, m] : 2 === h ? ["L", (n.plotX + l) / 2, n.plotY, "L", (n.plotX + l) / 2, m] : ["L", l, n.plotY], n.push("L", l, m)) : n = ["L", l, m], i.push.apply(i, n), e = !1)
                }), f.graphPath = i
            },
            drawGraph: function() {
                var a = this,
                    b = this.options,
                    c = [
                        ["graph", b.lineColor || this.color, b.dashStyle]
                    ],
                    d = b.lineWidth,
                    e = "square" !== b.linecap,
                    f = (this.gappedPath || this.getGraphPath).call(this),
                    g = this.fillGraph && this.color || "none";
                Pa(this.zones, function(d, e) {
                    c.push(["zoneGraph" + e, d.color || a.color, d.dashStyle || b.dashStyle])
                }), Pa(c, function(c, h) {
                    var i = c[0],
                        j = a[i];
                    j ? j.animate({
                        d: f
                    }) : (d || g) && f.length && (j = {
                        stroke: c[1],
                        "stroke-width": d,
                        fill: g,
                        zIndex: 1
                    }, c[2] ? j.dashstyle = c[2] : e && (j["stroke-linecap"] = j["stroke-linejoin"] = "round"), a[i] = a.chart.renderer.path(f).attr(j).add(a.group).shadow(h < 2 && b.shadow))
                })
            },
            applyZones: function() {
                var a, b, c, d, e, f, g, h = this,
                    i = this.chart,
                    j = i.renderer,
                    k = this.zones,
                    l = this.clips || [],
                    m = this.graph,
                    n = this.area,
                    o = ma(i.chartWidth, i.chartHeight),
                    p = this[(this.zoneAxis || "y") + "Axis"],
                    q = p.reversed,
                    r = i.inverted,
                    s = p.horiz,
                    t = !1;
                k.length && (m || n) && p.min !== K && (m && m.hide(), n && n.hide(), d = p.getExtremes(), Pa(k, function(k, u) {
                    a = q ? s ? i.plotWidth : 0 : s ? 0 : p.toPixels(d.min), a = na(ma(_a(b, a), 0), o), b = na(ma(ja(p.toPixels(_a(k.value, d.max), !0)), 0), o), t && (a = b = p.toPixels(d.max)), e = Math.abs(a - b), f = na(a, b), g = ma(a, b), p.isXAxis ? (c = {
                        x: r ? g : f,
                        y: 0,
                        width: e,
                        height: o
                    }, s || (c.x = i.plotHeight - c.x)) : (c = {
                        x: 0,
                        y: r ? g : f,
                        width: o,
                        height: e
                    }, s && (c.y = i.plotWidth - c.y)), i.inverted && j.isVML && (c = p.isXAxis ? {
                        x: 0,
                        y: q ? f : g,
                        height: c.width,
                        width: i.chartWidth
                    } : {
                        x: c.y - i.plotLeft - i.spacingBox.x,
                        y: 0,
                        width: c.height,
                        height: i.chartHeight
                    }), l[u] ? l[u].animate(c) : (l[u] = j.clipRect(c), m && h["zoneGraph" + u].clip(l[u]), n && h["zoneArea" + u].clip(l[u])), t = k.value > d.max
                }), this.clips = l)
            },
            invertGroups: function() {
                function a() {
                    var a = {
                        width: b.yAxis.len,
                        height: b.xAxis.len
                    };
                    Pa(["group", "markerGroup"], function(c) {
                        b[c] && b[c].attr(a).invert()
                    })
                }
                var b = this,
                    c = b.chart;
                b.xAxis && (Ta(c, "resize", a), Ta(b, "destroy", function() {
                    Ua(c, "resize", a)
                }), a(), b.invertGroups = a)
            },
            plotGroup: function(a, b, c, d, e) {
                var f = this[a],
                    g = !f;
                return g && (this[a] = f = this.chart.renderer.g(b).attr({
                    zIndex: d || .1
                }).add(e), f.addClass("highcharts-series-" + this.index)), f.attr({
                    visibility: c
                })[g ? "attr" : "animate"](this.getPlotBox()), f
            },
            getPlotBox: function() {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                return a.inverted && (b = c, c = this.xAxis), {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ? c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function() {
                var a, b = this,
                    c = b.chart,
                    d = b.options,
                    e = !!b.animate && c.renderer.isSVG && C(d.animation).duration,
                    f = b.visible ? "inherit" : "hidden",
                    g = d.zIndex,
                    h = b.hasRendered,
                    i = c.seriesGroup;
                a = b.plotGroup("group", "series", f, g, i), b.markerGroup = b.plotGroup("markerGroup", "markers", f, g, i), e && b.animate(!0), b.getAttribs(), a.inverted = !!b.isCartesian && c.inverted, b.drawGraph && (b.drawGraph(), b.applyZones()), Pa(b.points, function(a) {
                    a.redraw && a.redraw()
                }), b.drawDataLabels && b.drawDataLabels(), b.visible && b.drawPoints(), b.drawTracker && b.options.enableMouseTracking !== !1 && b.drawTracker(), c.inverted && b.invertGroups(), d.clip !== !1 && !b.sharedClipKey && !h && a.clip(c.clipRect), e && b.animate(), h || (b.animationTimeout = m(function() {
                    b.afterAnimate()
                }, e)), b.isDirty = b.isDirtyData = !1, b.hasRendered = !0
            },
            redraw: function() {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    c = this.group,
                    d = this.xAxis,
                    e = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({
                    translateX: _a(d && d.left, a.plotLeft),
                    translateY: _a(e && e.top, a.plotTop)
                })), this.translate(), this.render(), b && delete this.kdTree
            },
            kdDimensions: 1,
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function(a, b) {
                var c = this.xAxis,
                    d = this.yAxis,
                    e = this.chart.inverted;
                return this.searchKDTree({
                    clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos
                }, b)
            },
            buildKDTree: function() {
                function a(c, d, e) {
                    var f, g;
                    if (g = c && c.length) return f = b.kdAxisArray[d % e], c.sort(function(a, b) {
                        return a[f] - b[f]
                    }), g = Math.floor(g / 2), {
                        point: c[g],
                        left: a(c.slice(0, g), d + 1, e),
                        right: a(c.slice(g + 1), d + 1, e)
                    }
                }
                var b = this,
                    c = b.kdDimensions;
                delete b.kdTree, m(function() {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c)
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function(a, b) {
                function c(a, b, h, i) {
                    var k, l, m = b.point,
                        n = d.kdAxisArray[h % i],
                        o = m;
                    return l = j(a[e]) && j(m[e]) ? Math.pow(a[e] - m[e], 2) : null, k = j(a[f]) && j(m[f]) ? Math.pow(a[f] - m[f], 2) : null, k = (l || 0) + (k || 0), m.dist = j(k) ? Math.sqrt(k) : Number.MAX_VALUE, m.distX = j(l) ? Math.sqrt(l) : Number.MAX_VALUE, n = a[n] - m[n], k = n < 0 ? "left" : "right", l = n < 0 ? "right" : "left", b[k] && (k = c(a, b[k], h + 1, i), o = k[g] < o[g] ? k : m), b[l] && Math.sqrt(n * n) < o[g] && (a = c(a, b[l], h + 1, i), o = a[g] < o[g] ? a : o), o
                }
                var d = this,
                    e = this.kdAxisArray[0],
                    f = this.kdAxisArray[1],
                    g = b ? "distX" : "dist";
                if (this.kdTree || this.buildKDTree(), this.kdTree) return c(a, this.kdTree, this.kdDimensions, this.kdDimensions)
            }
        }, H.prototype = {
            destroy: function() {
                y(this, this.axis)
            },
            render: function(a) {
                var b = this.options,
                    c = b.format,
                    c = c ? s(c, this) : b.formatter.call(this);
                this.label ? this.label.attr({
                    text: c,
                    visibility: "hidden"
                }) : this.label = this.axis.chart.renderer.text(c, null, null, b.useHTML).css(b.style).attr({
                    align: this.textAlign,
                    rotation: b.rotation,
                    visibility: "hidden"
                }).add(a)
            },
            setOffset: function(a, b) {
                var c = this.axis,
                    d = c.chart,
                    e = d.inverted,
                    f = c.reversed,
                    f = this.isNegative && !f || !this.isNegative && f,
                    g = c.translate(c.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    c = c.translate(0),
                    c = oa(g - c),
                    h = d.xAxis[0].translate(this.x) + a,
                    i = d.plotHeight,
                    f = {
                        x: e ? f ? g : g - c : h,
                        y: e ? i - h - b : f ? i - g - c : i - g,
                        width: e ? c : b,
                        height: e ? b : c
                    };
                (e = this.label) && (e.align(this.alignOptions, null, f), f = e.alignAttr, e[this.options.crop === !1 || d.isInsidePlot(f.x, f.y) ? "show" : "hide"](!0));
            }
        }, qb.prototype.getStacks = function() {
            var a = this;
            Pa(a.yAxis, function(a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            }), Pa(a.series, function(b) {
                !b.options.stacking || b.visible !== !0 && a.options.chart.ignoreHiddenSeries !== !1 || (b.stackKey = b.type + _a(b.options.stack, ""))
            })
        }, hb.prototype.buildStacks = function() {
            var a, b, c = this.series,
                d = _a(this.options.reversedStacks, !0),
                e = c.length;
            if (!this.isXAxis) {
                for (this.usePercentage = !1, b = e; b--;) c[d ? b : e - b - 1].setStackedPoints();
                for (b = e; b--;) a = c[d ? b : e - b - 1], a.setStackCliffs && a.setStackCliffs();
                if (this.usePercentage)
                    for (b = 0; b < e; b++) c[b].setPercentStacks()
            }
        }, hb.prototype.renderStackTotals = function() {
            var a, b, c = this.chart,
                d = c.renderer,
                e = this.stacks,
                f = this.stackTotalGroup;
            f || (this.stackTotalGroup = f = d.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add()), f.translate(c.plotLeft, c.plotTop);
            for (a in e)
                for (b in c = e[a]) c[b].render(f)
        }, hb.prototype.resetStacks = function() {
            var a, b, c = this.stacks;
            if (!this.isXAxis)
                for (a in c)
                    for (b in c[a]) c[a][b].touched < this.stacksTouched ? (c[a][b].destroy(), delete c[a][b]) : (c[a][b].total = null, c[a][b].cum = 0)
        }, hb.prototype.cleanStacks = function() {
            var a, b, c;
            if (!this.isXAxis) {
                this.oldStacks && (a = this.stacks = this.oldStacks);
                for (b in a)
                    for (c in a[b]) a[b][c].cum = a[b][c].total
            }
        }, tb.prototype.setStackedPoints = function() {
            if (this.options.stacking && (this.visible === !0 || this.chart.options.chart.ignoreHiddenSeries === !1)) {
                var a, b, c, d, e, f, g, h = this.processedXData,
                    i = this.processedYData,
                    j = [],
                    k = i.length,
                    l = this.options,
                    m = l.threshold,
                    n = l.startFromThreshold ? m : 0,
                    o = l.stack,
                    l = l.stacking,
                    p = this.stackKey,
                    q = "-" + p,
                    r = this.negStacks,
                    s = this.yAxis,
                    t = s.stacks,
                    u = s.oldStacks;
                for (s.stacksTouched += 1, e = 0; e < k; e++) f = h[e], g = i[e], a = this.getStackIndicator(a, f, this.index), d = a.key, c = (b = r && g < (n ? 0 : m)) ? q : p, t[c] || (t[c] = {}), t[c][f] || (u[c] && u[c][f] ? (t[c][f] = u[c][f], t[c][f].total = null) : t[c][f] = new H(s, s.options.stackLabels, b, f, o)), c = t[c][f], null !== g && (c.points[d] = c.points[this.index] = [_a(c.cum, n)], c.touched = s.stacksTouched, a.index > 0 && this.singleStacks === !1 && (c.points[d][0] = c.points[this.index + "," + f + ",0"][0])), "percent" === l ? (b = b ? p : q, r && t[b] && t[b][f] ? (b = t[b][f], c.total = b.total = ma(b.total, c.total) + oa(g) || 0) : c.total = A(c.total + (oa(g) || 0))) : c.total = A(c.total + (g || 0)), c.cum = _a(c.cum, n) + (g || 0), null !== g && (c.points[d].push(c.cum), j[e] = c.cum);
                "percent" === l && (s.usePercentage = !0), this.stackedYData = j, s.oldStacks = {}
            }
        }, tb.prototype.setPercentStacks = function() {
            var a, b = this,
                c = b.stackKey,
                d = b.yAxis.stacks,
                e = b.processedXData;
            Pa([c, "-" + c], function(c) {
                for (var f, g, h, i = e.length; i--;) g = e[i], a = b.getStackIndicator(a, g, b.index), f = (h = d[c] && d[c][g]) && h.points[a.key], (g = f) && (h = h.total ? 100 / h.total : 0, g[0] = A(g[0] * h), g[1] = A(g[1] * h), b.stackedYData[i] = g[1])
            })
        }, tb.prototype.getStackIndicator = function(a, b, c) {
            return j(a) && a.x === b ? a.index++ : a = {
                x: b,
                index: 0
            }, a.key = [c, b, a.index].join(","), a
        }, Za(qb.prototype, {
            addSeries: function(a, b, c) {
                var d, e = this;
                return a && (b = _a(b, !0), Va(e, "addSeries", {
                    options: a
                }, function() {
                    d = e.initSeries(a), e.isDirtyLegend = !0, e.linkSeries(), b && e.redraw(c)
                })), d
            },
            addAxis: function(a, b, c, e) {
                var f = b ? "xAxis" : "yAxis",
                    g = this.options,
                    a = d(a, {
                        index: this[f].length,
                        isX: b
                    });
                new hb(this, a), g[f] = l(g[f] || {}), g[f].push(a), _a(c, !0) && this.redraw(e)
            },
            showLoading: function(a) {
                var b = this,
                    c = b.options,
                    d = b.loadingDiv,
                    e = c.loading,
                    f = function() {
                        d && n(d, {
                            left: b.plotLeft + "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                d || (b.loadingDiv = d = o(Ja, {
                    className: "highcharts-loading"
                }, Za(e.style, {
                    zIndex: 10,
                    display: "none"
                }), b.container), b.loadingSpan = o("span", null, e.labelStyle, d), Ta(b, "redraw", f)), b.loadingSpan.innerHTML = a || c.lang.loading, b.loadingShown || (n(d, {
                    opacity: 0,
                    display: ""
                }), Wa(d, {
                    opacity: e.style.opacity
                }, {
                    duration: e.showDuration || 0
                }), b.loadingShown = !0), f()
            },
            hideLoading: function() {
                var a = this.options,
                    b = this.loadingDiv;
                b && Wa(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function() {
                        n(b, {
                            display: "none"
                        })
                    }
                }), this.loadingShown = !1
            }
        }), Za(sb.prototype, {
            update: function(a, b, c, d) {
                function e() {
                    i.applyOptions(a), null === i.y && k && (i.graphic = k.destroy()), g(a) && !h(a) && (i.redraw = function() {
                        k && k.element && a && a.marker && a.marker.symbol && (i.graphic = k.destroy()), a && a.dataLabels && i.dataLabel && (i.dataLabel = i.dataLabel.destroy()), i.redraw = null
                    }), f = i.index, j.updateParallelArrays(i, f), n && i.name && (n[i.x] = i.name), m.data[f] = g(m.data[f]) && !h(m.data[f]) ? i.options : a, j.isDirty = j.isDirtyData = !0, !j.fixedBox && j.hasCartesianSeries && (l.isDirtyBox = !0), "point" === m.legendType && (l.isDirtyLegend = !0), b && l.redraw(c)
                }
                var f, i = this,
                    j = i.series,
                    k = i.graphic,
                    l = j.chart,
                    m = j.options,
                    n = j.xAxis && j.xAxis.names,
                    b = _a(b, !0);
                d === !1 ? e() : i.firePointEvent("update", {
                    options: a
                }, e)
            },
            remove: function(a, b) {
                this.series.removePoint(Oa(this, this.series.data), a, b)
            }
        }), Za(tb.prototype, {
            addPoint: function(a, b, c, d) {
                var e, f = this,
                    g = f.options,
                    h = f.data,
                    i = f.graph,
                    j = f.area,
                    k = f.chart,
                    l = f.xAxis && f.xAxis.names,
                    m = i && i.shift || 0,
                    n = ["graph", "area"],
                    i = g.data,
                    o = f.xData;
                if (B(d, k), c) {
                    for (d = f.zones.length; d--;) n.push("zoneGraph" + d, "zoneArea" + d);
                    Pa(n, function(a) {
                        f[a] && (f[a].shift = m + (g.step ? 2 : 1))
                    })
                }
                if (j && (j.isArea = !0), b = _a(b, !0), j = {
                        series: f
                    }, f.pointClass.prototype.applyOptions.apply(j, [a]), n = j.x, d = o.length, f.requireSorting && n < o[d - 1])
                    for (e = !0; d && o[d - 1] > n;) d--;
                f.updateParallelArrays(j, "splice", d, 0, 0), f.updateParallelArrays(j, d), l && j.name && (l[n] = j.name), i.splice(d, 0, a), e && (f.data.splice(d, 0, null), f.processData()), "point" === g.legendType && f.generatePoints(), c && (h[0] && h[0].remove ? h[0].remove(!1) : (h.shift(), f.updateParallelArrays(j, "shift"), i.shift())), f.isDirty = !0, f.isDirtyData = !0, b && (f.getAttribs(), k.redraw())
            },
            removePoint: function(a, b, c) {
                var d = this,
                    e = d.data,
                    f = e[a],
                    g = d.points,
                    h = d.chart,
                    i = function() {
                        g && g.length === e.length && g.splice(a, 1), e.splice(a, 1), d.options.data.splice(a, 1), d.updateParallelArrays(f || {
                            series: d
                        }, "splice", a, 1), f && f.destroy(), d.isDirty = !0, d.isDirtyData = !0, b && h.redraw()
                    };
                B(c, h), b = _a(b, !0), f ? f.firePointEvent("remove", null, i) : i()
            },
            remove: function(a, b) {
                var c = this,
                    d = c.chart;
                Va(c, "remove", null, function() {
                    c.destroy(), d.isDirtyLegend = d.isDirtyBox = !0, d.linkSeries(), _a(a, !0) && d.redraw(b)
                })
            },
            update: function(a, b) {
                var c, e = this,
                    f = this.chart,
                    g = this.userOptions,
                    h = this.type,
                    i = Ma[h].prototype,
                    j = ["group", "markerGroup", "dataLabelsGroup"];
                (a.type && a.type !== h || void 0 !== a.zIndex) && (j.length = 0), Pa(j, function(a) {
                    j[a] = e[a], delete e[a]
                }), a = d(g, {
                    animation: !1,
                    index: this.index,
                    pointStart: this.xData[0]
                }, {
                    data: this.options.data
                }, a), this.remove(!1);
                for (c in i) this[c] = K;
                Za(this, Ma[a.type || h].prototype), Pa(j, function(a) {
                    e[a] = j[a]
                }), this.init(f, a), f.linkSeries(), _a(b, !0) && f.redraw(!1)
            }
        }), Za(hb.prototype, {
            update: function(a, b) {
                var c = this.chart,
                    a = c.options[this.coll][this.options.index] = d(this.userOptions, a);
                this.destroy(!0), this._addedPlotLB = this.chart._labelPanes = K, this.init(c, Za(a, {
                    events: K
                })), c.isDirtyBox = !0, _a(b, !0) && c.redraw()
            },
            remove: function(a) {
                for (var b = this.chart, c = this.coll, d = this.series, e = d.length; e--;) d[e] && d[e].remove(!1);
                i(b.axes, this), i(b[c], this), b.options[c].splice(this.options.index, 1), Pa(b[c], function(a, b) {
                    a.options.index = b
                }), this.destroy(), b.isDirtyBox = !0, _a(a, !0) && b.redraw()
            },
            setTitle: function(a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function(a, b) {
                this.update({
                    categories: a
                }, b)
            }
        });
        var ub = p(tb);
        Ma.line = ub, bb.area = d(cb, {
            softThreshold: !1,
            threshold: 0
        });
        var vb = p(tb, {
            type: "area",
            singleStacks: !1,
            getStackPoints: function() {
                var a, b, c, d = [],
                    e = [],
                    f = this.xAxis,
                    g = this.yAxis,
                    h = g.stacks[this.stackKey],
                    i = {},
                    j = this.points,
                    k = this.index,
                    l = g.series,
                    m = l.length,
                    n = _a(g.options.reversedStacks, !0) ? 1 : -1;
                if (this.options.stacking) {
                    for (b = 0; b < j.length; b++) i[j[b].x] = j[b];
                    for (c in h) null !== h[c].total && e.push(c);
                    e.sort(function(a, b) {
                        return a - b
                    }), a = Sa(l, function() {
                        return this.visible
                    }), Pa(e, function(c, j) {
                        var l, o, p = 0;
                        if (i[c] && !i[c].isNull) d.push(i[c]), Pa([-1, 1], function(d) {
                            var f = 1 === d ? "rightNull" : "leftNull",
                                g = 0,
                                p = h[e[j + d]];
                            if (p)
                                for (b = k; b >= 0 && b < m;) l = p.points[b], l || (b === k ? i[c][f] = !0 : a[b] && (o = h[c].points[b]) && (g -= o[1] - o[0])), b += n;
                            i[c][1 === d ? "rightCliff" : "leftCliff"] = g
                        });
                        else {
                            for (b = k; b >= 0 && b < m;) {
                                if (l = h[c].points[b]) {
                                    p = l[1];
                                    break
                                }
                                b += n
                            }
                            p = g.toPixels(p, !0), d.push({
                                isNull: !0,
                                plotX: f.toPixels(c, !0),
                                plotY: p,
                                yBottom: p
                            })
                        }
                    })
                }
                return d
            },
            getGraphPath: function(a) {
                var b, c, d, e, f = tb.prototype.getGraphPath,
                    g = this.options,
                    h = g.stacking,
                    i = this.yAxis,
                    j = [],
                    k = [],
                    l = this.index,
                    m = i.stacks[this.stackKey],
                    n = g.threshold,
                    o = i.getThreshold(g.threshold),
                    g = g.connectNulls || "percent" === h,
                    p = function(b, c, e) {
                        var f, g, p = a[b],
                            b = h && m[p.x].points[l],
                            q = p[e + "Null"] || 0,
                            e = p[e + "Cliff"] || 0,
                            p = !0;
                        e || q ? (f = (q ? b[0] : b[1]) + e, g = b[0] + e, p = !!q) : !h && a[c] && a[c].isNull && (f = g = n), void 0 !== f && (k.push({
                            plotX: d,
                            plotY: null === f ? o : i.getThreshold(f),
                            isNull: p
                        }), j.push({
                            plotX: d,
                            plotY: null === g ? o : i.getThreshold(g)
                        }))
                    },
                    a = a || this.points;
                for (h && (a = this.getStackPoints()), b = 0; b < a.length; b++) c = a[b].isNull, d = _a(a[b].rectPlotX, a[b].plotX), e = _a(a[b].yBottom, o), (!c || g) && (g || p(b, b - 1, "left"), c && !h && g || (k.push(a[b]), j.push({
                    x: b,
                    plotX: d,
                    plotY: e
                })), g || p(b, b + 1, "right"));
                return b = f.call(this, k, !0, !0), j.reversed = !0, c = f.call(this, j, !0, !0), c.length && (c[0] = "L"), b = b.concat(c), f = f.call(this, k, !1, g), this.areaPath = b, f
            },
            drawGraph: function() {
                this.areaPath = [], tb.prototype.drawGraph.apply(this);
                var a = this,
                    b = this.areaPath,
                    c = this.options,
                    d = [
                        ["area", this.color, c.fillColor]
                    ];
                Pa(this.zones, function(b, e) {
                    d.push(["zoneArea" + e, b.color || a.color, b.fillColor || c.fillColor])
                }), Pa(d, function(d) {
                    var e = d[0],
                        f = a[e];
                    f ? f.animate({
                        d: b
                    }) : (f = {
                        fill: d[2] || d[1],
                        zIndex: 0
                    }, d[2] || (f["fill-opacity"] = _a(c.fillOpacity, .75)), a[e] = a.chart.renderer.path(b).attr(f).add(a.group))
                })
            },
            drawLegendSymbol: fb.drawRectangle
        });
        Ma.area = vb, bb.spline = d(cb), ub = p(tb, {
                type: "spline",
                getPointSpline: function(a, b, c) {
                    var d, e, f, g, h = b.plotX,
                        i = b.plotY,
                        j = a[c - 1],
                        c = a[c + 1];
                    if (j && !j.isNull && c && !c.isNull) {
                        a = j.plotY, f = c.plotX;
                        var c = c.plotY,
                            k = 0;
                        d = (1.5 * h + j.plotX) / 2.5, e = (1.5 * i + a) / 2.5, f = (1.5 * h + f) / 2.5, g = (1.5 * i + c) / 2.5, f !== d && (k = (g - e) * (f - h) / (f - d) + i - g), e += k, g += k, e > a && e > i ? (e = ma(a, i), g = 2 * i - e) : e < a && e < i && (e = na(a, i), g = 2 * i - e), g > c && g > i ? (g = ma(c, i), e = 2 * i - g) : g < c && g < i && (g = na(c, i), e = 2 * i - g), b.rightContX = f, b.rightContY = g
                    }
                    return b = ["C", _a(j.rightContX, j.plotX), _a(j.rightContY, j.plotY), _a(d, h), _a(e, i), h, i], j.rightContX = j.rightContY = null, b
                }
            }), Ma.spline = ub, bb.areaspline = d(bb.area), vb = vb.prototype, ub = p(ub, {
                type: "areaspline",
                getStackPoints: vb.getStackPoints,
                getGraphPath: vb.getGraphPath,
                setStackCliffs: vb.setStackCliffs,
                drawGraph: vb.drawGraph,
                drawLegendSymbol: fb.drawRectangle
            }), Ma.areaspline = ub, bb.column = d(cb, {
                borderColor: "#FFFFFF",
                borderRadius: 0,
                groupPadding: .2,
                marker: null,
                pointPadding: .1,
                minPointLength: 0,
                cropThreshold: 50,
                pointRange: null,
                states: {
                    hover: {
                        brightness: .1,
                        shadow: !1,
                        halo: !1
                    },
                    select: {
                        color: "#C0C0C0",
                        borderColor: "#000000",
                        shadow: !1
                    }
                },
                dataLabels: {
                    align: null,
                    verticalAlign: null,
                    y: null
                },
                softThreshold: !1,
                startFromThreshold: !0,
                stickyTracking: !1,
                tooltip: {
                    distance: 6
                },
                threshold: 0
            }), ub = p(tb, {
                type: "column",
                pointAttrToOptions: {
                    stroke: "borderColor",
                    fill: "color",
                    r: "borderRadius"
                },
                cropShoulder: 0,
                directTouch: !0,
                trackerGroups: ["group", "dataLabelsGroup"],
                negStacks: !0,
                init: function() {
                    tb.prototype.init.apply(this, arguments);
                    var a = this,
                        b = a.chart;
                    b.hasRendered && Pa(b.series, function(b) {
                        b.type === a.type && (b.isDirty = !0)
                    })
                },
                getColumnMetrics: function() {
                    var a, b = this,
                        c = b.options,
                        d = b.xAxis,
                        e = b.yAxis,
                        f = d.reversed,
                        g = {},
                        h = 0;
                    c.grouping === !1 ? h = 1 : Pa(b.chart.series, function(c) {
                        var d, f = c.options,
                            i = c.yAxis;
                        c.type === b.type && c.visible && e.len === i.len && e.pos === i.pos && (f.stacking ? (a = c.stackKey, g[a] === K && (g[a] = h++), d = g[a]) : f.grouping !== !1 && (d = h++), c.columnIndex = d)
                    });
                    var i = na(oa(d.transA) * (d.ordinalSlope || c.pointRange || d.closestPointRange || d.tickInterval || 1), d.len),
                        j = i * c.groupPadding,
                        k = (i - 2 * j) / h,
                        c = na(c.maxPointWidth || d.len, _a(c.pointWidth, k * (1 - 2 * c.pointPadding)));
                    return b.columnMetrics = {
                        width: c,
                        offset: (k - c) / 2 + (j + ((b.columnIndex || 0) + (f ? 1 : 0)) * k - i / 2) * (f ? -1 : 1)
                    }, b.columnMetrics
                },
                crispCol: function(a, b, c, d) {
                    var e = this.chart,
                        f = this.borderWidth,
                        g = -(f % 2 ? .5 : 0),
                        f = f % 2 ? .5 : 1;
                    return e.inverted && e.renderer.isVML && (f += 1), c = Math.round(a + c) + g, a = Math.round(a) + g, c -= a, d = Math.round(b + d) + f, g = oa(b) <= .5 && d > .5, b = Math.round(b) + f, d -= b, g && d && (b -= 1, d += 1), {
                        x: a,
                        y: b,
                        width: c,
                        height: d
                    }
                },
                translate: function() {
                    var a = this,
                        b = a.chart,
                        c = a.options,
                        d = a.borderWidth = _a(c.borderWidth, a.closestPointRange * a.xAxis.transA < 2 ? 0 : 1),
                        e = a.yAxis,
                        f = a.translatedThreshold = e.getThreshold(c.threshold),
                        g = _a(c.minPointLength, 5),
                        h = a.getColumnMetrics(),
                        i = h.width,
                        j = a.barW = ma(i, 1 + 2 * d),
                        k = a.pointXOffset = h.offset;
                    b.inverted && (f -= .5), c.pointPadding && (j = la(j)), tb.prototype.translate.apply(a), Pa(a.points, function(c) {
                        var d, h = na(_a(c.yBottom, f), 9e4),
                            l = 999 + oa(h),
                            l = na(ma(-l, c.plotY), e.len + l),
                            m = c.plotX + k,
                            n = j,
                            o = na(l, h),
                            p = ma(l, h) - o;
                        oa(p) < g && g && (p = g, d = !e.reversed && !c.negative || e.reversed && c.negative, o = oa(o - f) > g ? h - g : f - (d ? g : 0)), c.barX = m, c.pointWidth = i, c.tooltipPos = b.inverted ? [e.len + e.pos - b.plotLeft - l, a.xAxis.len - m - n / 2, p] : [m + n / 2, l + e.pos - b.plotTop, p], c.shapeType = "rect", c.shapeArgs = a.crispCol(m, o, n, p)
                    })
                },
                getSymbol: Ga,
                drawLegendSymbol: fb.drawRectangle,
                drawGraph: Ga,
                drawPoints: function() {
                    var a, b, c = this,
                        e = this.chart,
                        f = c.options,
                        g = e.renderer,
                        h = f.animationLimit || 250;
                    Pa(c.points, function(i) {
                        var k, l = i.graphic;
                        $a(i.plotY) && null !== i.y ? (a = i.shapeArgs, k = j(c.borderWidth) ? {
                            "stroke-width": c.borderWidth
                        } : {}, b = i.pointAttr[i.selected ? "select" : ""] || c.pointAttr[""], l ? (Xa(l), l.attr(k).attr(b)[e.pointCount < h ? "animate" : "attr"](d(a))) : i.graphic = g[i.shapeType](a).attr(k).attr(b).add(i.group || c.group).shadow(f.shadow, null, f.stacking && !f.borderRadius)) : l && (i.graphic = l.destroy())
                    })
                },
                animate: function(a) {
                    var b = this,
                        c = this.yAxis,
                        d = b.options,
                        e = this.chart.inverted,
                        f = {};
                    Ba && (a ? (f.scaleY = .001, a = na(c.pos + c.len, ma(c.pos, c.toPixels(d.threshold))), e ? f.translateX = a - c.len : f.translateY = a, b.group.attr(f)) : (f[e ? "translateX" : "translateY"] = c.pos, b.group.animate(f, Za(C(b.options.animation), {
                        step: function(a, c) {
                            b.group.attr({
                                scaleY: ma(.001, c.pos)
                            })
                        }
                    })), b.animate = null))
                },
                remove: function() {
                    var a = this,
                        b = a.chart;
                    b.hasRendered && Pa(b.series, function(b) {
                        b.type === a.type && (b.isDirty = !0)
                    }), tb.prototype.remove.apply(a, arguments)
                }
            }), Ma.column = ub, bb.bar = d(bb.column), vb = p(ub, {
                type: "bar",
                inverted: !0
            }), Ma.bar = vb, bb.scatter = d(cb, {
                lineWidth: 0,
                marker: {
                    enabled: !0
                },
                tooltip: {
                    headerFormat: '<span style="color:{point.color}">●</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
                    pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
                }
            }), vb = p(tb, {
                type: "scatter",
                sorted: !1,
                requireSorting: !1,
                noSharedTooltip: !0,
                trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                takeOrdinalPosition: !1,
                kdDimensions: 2,
                drawGraph: function() {
                    this.options.lineWidth && tb.prototype.drawGraph.call(this)
                }
            }), Ma.scatter = vb, bb.pie = d(cb, {
                borderColor: "#FFFFFF",
                borderWidth: 1,
                center: [null, null],
                clip: !1,
                colorByPoint: !0,
                dataLabels: {
                    distance: 30,
                    enabled: !0,
                    formatter: function() {
                        return null === this.y ? void 0 : this.point.name
                    },
                    x: 0
                },
                ignoreHiddenPoint: !0,
                legendType: "point",
                marker: null,
                size: null,
                showInLegend: !1,
                slicedOffset: 10,
                states: {
                    hover: {
                        brightness: .1,
                        shadow: !1
                    }
                },
                stickyTracking: !1,
                tooltip: {
                    followPointer: !0
                }
            }), cb = {
                type: "pie",
                isCartesian: !1,
                pointClass: p(sb, {
                    init: function() {
                        sb.prototype.init.apply(this, arguments);
                        var a, b = this;
                        return b.name = _a(b.name, "Slice"), a = function(a) {
                            b.slice("select" === a.type)
                        }, Ta(b, "select", a), Ta(b, "unselect", a), b
                    },
                    setVisible: function(a, b) {
                        var c = this,
                            d = c.series,
                            e = d.chart,
                            f = d.options.ignoreHiddenPoint,
                            b = _a(b, f);
                        a !== c.visible && (c.visible = c.options.visible = a = a === K ? !c.visible : a, d.options.data[Oa(c, d.data)] = c.options, Pa(["graphic", "dataLabel", "connector", "shadowGroup"], function(b) {
                            c[b] && c[b][a ? "show" : "hide"](!0)
                        }), c.legendItem && e.legend.colorizeItem(c, a), !a && "hover" === c.state && c.setState(""), f && (d.isDirty = !0), b && e.redraw())
                    },
                    slice: function(a, b, c) {
                        var d = this.series;
                        B(c, d.chart), _a(b, !0), this.sliced = this.options.sliced = a = j(a) ? a : !this.sliced, d.options.data[Oa(this, d.data)] = this.options, a = a ? this.slicedTranslation : {
                            translateX: 0,
                            translateY: 0
                        }, this.graphic.animate(a), this.shadowGroup && this.shadowGroup.animate(a)
                    },
                    haloPath: function(a) {
                        var b = this.shapeArgs,
                            c = this.series.chart;
                        return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.plotLeft + b.x, c.plotTop + b.y, b.r + a, b.r + a, {
                            innerR: this.shapeArgs.r,
                            start: b.start,
                            end: b.end
                        })
                    }
                }),
                requireSorting: !1,
                directTouch: !0,
                noSharedTooltip: !0,
                trackerGroups: ["group", "dataLabelsGroup"],
                axisTypes: [],
                pointAttrToOptions: {
                    stroke: "borderColor",
                    "stroke-width": "borderWidth",
                    fill: "color"
                },
                animate: function(a) {
                    var b = this,
                        c = b.points,
                        d = b.startAngleRad;
                    a || (Pa(c, function(a) {
                        var c = a.graphic,
                            e = a.shapeArgs;
                        c && (c.attr({
                            r: a.startR || b.center[3] / 2,
                            start: d,
                            end: d
                        }), c.animate({
                            r: e.r,
                            start: e.start,
                            end: e.end
                        }, b.options.animation))
                    }), b.animate = null)
                },
                updateTotals: function() {
                    var a, b, c = 0,
                        d = this.points,
                        e = d.length,
                        f = this.options.ignoreHiddenPoint;
                    for (a = 0; a < e; a++) b = d[a], c += f && !b.visible ? 0 : b.y;
                    for (this.total = c, a = 0; a < e; a++) b = d[a], b.percentage = c > 0 && (b.visible || !f) ? b.y / c * 100 : 0, b.total = c
                },
                generatePoints: function() {
                    tb.prototype.generatePoints.call(this), this.updateTotals()
                },
                translate: function(a) {
                    this.generatePoints();
                    var b, c, d, e, f, g = 0,
                        h = this.options,
                        i = h.slicedOffset,
                        j = i + h.borderWidth,
                        k = h.startAngle || 0,
                        l = this.startAngleRad = ra / 180 * (k - 90),
                        k = (this.endAngleRad = ra / 180 * (_a(h.endAngle, k + 360) - 90)) - l,
                        m = this.points,
                        n = h.dataLabels.distance,
                        h = h.ignoreHiddenPoint,
                        o = m.length;
                    for (a || (this.center = a = this.getCenter()), this.getX = function(b, c) {
                            return d = ia.asin(na((b - a[1]) / (a[2] / 2 + n), 1)), a[0] + (c ? -1 : 1) * pa(d) * (a[2] / 2 + n)
                        }, e = 0; e < o; e++) f = m[e], b = l + g * k, h && !f.visible || (g += f.percentage / 100), c = l + g * k, f.shapeType = "arc", f.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: ja(1e3 * b) / 1e3,
                        end: ja(1e3 * c) / 1e3
                    }, d = (c + b) / 2, d > 1.5 * ra ? d -= 2 * ra : d < -ra / 2 && (d += 2 * ra), f.slicedTranslation = {
                        translateX: ja(pa(d) * i),
                        translateY: ja(qa(d) * i)
                    }, b = pa(d) * a[2] / 2, c = qa(d) * a[2] / 2, f.tooltipPos = [a[0] + .7 * b, a[1] + .7 * c], f.half = d < -ra / 2 || d > ra / 2 ? 1 : 0, f.angle = d, j = na(j, n / 2), f.labelPos = [a[0] + b + pa(d) * n, a[1] + c + qa(d) * n, a[0] + b + pa(d) * j, a[1] + c + qa(d) * j, a[0] + b, a[1] + c, n < 0 ? "center" : f.half ? "right" : "left", d]
                },
                drawGraph: null,
                drawPoints: function() {
                    var a, b, c, d, e, f, g = this,
                        h = g.chart.renderer,
                        i = g.options.shadow;
                    i && !g.shadowGroup && (g.shadowGroup = h.g("shadow").add(g.group)), Pa(g.points, function(j) {
                        null !== j.y && (b = j.graphic, e = j.shapeArgs, c = j.shadowGroup, d = j.pointAttr[j.selected ? "select" : ""], d.stroke || (d.stroke = d.fill), i && !c && (c = j.shadowGroup = h.g("shadow").add(g.shadowGroup)), a = j.sliced ? j.slicedTranslation : {
                            translateX: 0,
                            translateY: 0
                        }, c && c.attr(a), b ? b.setRadialReference(g.center).attr(d).animate(Za(e, a)) : (f = {
                            "stroke-linejoin": "round"
                        }, j.visible || (f.visibility = "hidden"), j.graphic = b = h[j.shapeType](e).setRadialReference(g.center).attr(d).attr(f).attr(a).add(g.group).shadow(i, c)))
                    })
                },
                searchPoint: Ga,
                sortByAngle: function(a, b) {
                    a.sort(function(a, c) {
                        return void 0 !== a.angle && (c.angle - a.angle) * b
                    })
                },
                drawLegendSymbol: fb.drawRectangle,
                getCenter: rb.getCenter,
                getSymbol: Ga
            }, cb = p(tb, cb), Ma.pie = cb, tb.prototype.drawDataLabels = function() {
                var a, b, c, e, f = this,
                    g = f.options,
                    h = g.cursor,
                    i = g.dataLabels,
                    k = f.points,
                    l = f.hasRendered || 0,
                    m = _a(i.defer, !0),
                    n = f.chart.renderer;
                (i.enabled || f._hasPointLabels) && (f.dlProcessOptions && f.dlProcessOptions(i), e = f.plotGroup("dataLabelsGroup", "data-labels", m && !l ? "hidden" : "visible", i.zIndex || 6), m && (e.attr({
                    opacity: +l
                }), l || Ta(f, "afterAnimate", function() {
                    f.visible && e.show(), e[g.animation ? "animate" : "attr"]({
                        opacity: 1
                    }, {
                        duration: 200
                    })
                })), b = i, Pa(k, function(k) {
                    var l, m, o, p, q = k.dataLabel,
                        r = k.connector,
                        t = !0,
                        u = {};
                    if (a = k.dlOptions || k.options && k.options.dataLabels, l = _a(a && a.enabled, b.enabled) && null !== k.y, q && !l) k.dataLabel = q.destroy();
                    else if (l) {
                        if (i = d(b, a), p = i.style, l = i.rotation, m = k.getLabelConfig(), c = i.format ? s(i.format, m) : i.formatter.call(m, i), p.color = _a(i.color, p.color, f.color, "black"), q) j(c) ? (q.attr({
                            text: c
                        }), t = !1) : (k.dataLabel = q = q.destroy(), r && (k.connector = r.destroy()));
                        else if (j(c)) {
                            q = {
                                fill: i.backgroundColor,
                                stroke: i.borderColor,
                                "stroke-width": i.borderWidth,
                                r: i.borderRadius || 0,
                                rotation: l,
                                padding: i.padding,
                                zIndex: 1
                            }, "contrast" === p.color && (u.color = i.inside || i.distance < 0 || g.stacking ? n.getContrast(k.color || f.color) : "#000000"), h && (u.cursor = h);
                            for (o in q) q[o] === K && delete q[o];
                            q = k.dataLabel = n[l ? "text" : "label"](c, 0, -9999, i.shape, null, null, i.useHTML).attr(q).css(Za(p, u)).add(e).shadow(i.shadow)
                        }
                        q && f.alignDataLabel(k, q, i, null, t)
                    }
                }))
            }, tb.prototype.alignDataLabel = function(a, b, c, d, e) {
                var f = this.chart,
                    g = f.inverted,
                    h = _a(a.plotX, -9999),
                    i = _a(a.plotY, -9999),
                    j = b.getBBox(),
                    k = f.renderer.fontMetrics(c.style.fontSize).b,
                    l = c.rotation,
                    m = c.align,
                    n = this.visible && (a.series.forceDL || f.isInsidePlot(h, ja(i), g) || d && f.isInsidePlot(h, g ? d.x + 1 : d.y + d.height - 1, g)),
                    o = "justify" === _a(c.overflow, "justify");
                n && (d = Za({
                    x: g ? f.plotWidth - i : h,
                    y: ja(g ? f.plotHeight - h : i),
                    width: 0,
                    height: 0
                }, d), Za(c, {
                    width: j.width,
                    height: j.height
                }), l ? (o = !1, g = f.renderer.rotCorr(k, l), g = {
                    x: d.x + c.x + d.width / 2 + g.x,
                    y: d.y + c.y + {
                        top: 0,
                        middle: .5,
                        bottom: 1
                    }[c.verticalAlign] * d.height
                }, b[e ? "attr" : "animate"](g).attr({
                    align: m
                }), h = (l + 720) % 360, h = h > 180 && h < 360, "left" === m ? g.y -= h ? j.height : 0 : "center" === m ? (g.x -= j.width / 2, g.y -= j.height / 2) : "right" === m && (g.x -= j.width, g.y -= h ? 0 : j.height)) : (b.align(c, null, d), g = b.alignAttr), o ? this.justifyDataLabel(b, c, g, j, d, e) : _a(c.crop, !0) && (n = f.isInsidePlot(g.x, g.y) && f.isInsidePlot(g.x + j.width, g.y + j.height)), c.shape && !l && b.attr({
                    anchorX: a.plotX,
                    anchorY: a.plotY
                })), n || (Xa(b), b.attr({
                    y: -9999
                }), b.placed = !1)
            }, tb.prototype.justifyDataLabel = function(a, b, c, d, e, f) {
                var g, h, i = this.chart,
                    j = b.align,
                    k = b.verticalAlign,
                    l = a.box ? 0 : a.padding || 0;
                g = c.x + l, g < 0 && ("right" === j ? b.align = "left" : b.x = -g, h = !0), g = c.x + d.width - l, g > i.plotWidth && ("left" === j ? b.align = "right" : b.x = i.plotWidth - g, h = !0), g = c.y + l, g < 0 && ("bottom" === k ? b.verticalAlign = "top" : b.y = -g, h = !0), g = c.y + d.height - l, g > i.plotHeight && ("top" === k ? b.verticalAlign = "bottom" : b.y = i.plotHeight - g, h = !0), h && (a.placed = !f, a.align(b, null, e))
            }, Ma.pie && (Ma.pie.prototype.drawDataLabels = function() {
                var a, b, c, d, e, f, g, h, i, j, k, l = this,
                    m = l.data,
                    n = l.chart,
                    o = l.options.dataLabels,
                    p = _a(o.connectorPadding, 10),
                    q = _a(o.connectorWidth, 1),
                    r = n.plotWidth,
                    s = n.plotHeight,
                    t = _a(o.softConnector, !0),
                    u = o.distance,
                    v = l.center,
                    w = v[2] / 2,
                    y = v[1],
                    z = u > 0,
                    A = [
                        [],
                        []
                    ],
                    B = [0, 0, 0, 0],
                    C = function(a, b) {
                        return b.y - a.y
                    };
                if (l.visible && (o.enabled || l._hasPointLabels)) {
                    for (tb.prototype.drawDataLabels.apply(l), Pa(m, function(a) {
                            a.dataLabel && a.visible && (A[a.half].push(a), a.dataLabel._pos = null)
                        }), j = 2; j--;) {
                        var D, E = [],
                            F = [],
                            G = A[j],
                            H = G.length;
                        if (H) {
                            for (l.sortByAngle(G, j - .5), k = m = 0; !m && G[k];) m = G[k] && G[k].dataLabel && (G[k].dataLabel.getBBox().height || 21), k++;
                            if (u > 0) {
                                for (e = na(y + w + u, n.plotHeight), k = ma(0, y - w - u); k <= e; k += m) E.push(k);
                                if (e = E.length, H > e) {
                                    for (a = [].concat(G), a.sort(C), k = H; k--;) a[k].rank = k;
                                    for (k = H; k--;) G[k].rank >= e && G.splice(k, 1);
                                    H = G.length
                                }
                                for (k = 0; k < H; k++) {
                                    a = G[k], f = a.labelPos, a = 9999;
                                    var I, J;
                                    for (J = 0; J < e; J++) I = oa(E[J] - f[1]), I < a && (a = I, D = J);
                                    if (D < k && null !== E[k]) D = k;
                                    else
                                        for (e < H - k + D && null !== E[k] && (D = e - H + k); null === E[D];) D++;
                                    F.push({
                                        i: D,
                                        y: E[D]
                                    }), E[D] = null
                                }
                                F.sort(C)
                            }
                            for (k = 0; k < H; k++) a = G[k], f = a.labelPos, d = a.dataLabel, i = a.visible === !1 ? "hidden" : "inherit", a = f[1], u > 0 ? (e = F.pop(), D = e.i, h = e.y, (a > h && null !== E[D + 1] || a < h && null !== E[D - 1]) && (h = na(ma(0, a), n.plotHeight))) : h = a, g = o.justify ? v[0] + (j ? -1 : 1) * (w + u) : l.getX(h === y - w - u || h === y + w + u ? a : h, j), d._attr = {
                                visibility: i,
                                align: f[6]
                            }, d._pos = {
                                x: g + o.x + ({
                                    left: p,
                                    right: -p
                                }[f[6]] || 0),
                                y: h + o.y - 10
                            }, d.connX = g, d.connY = h, null === this.options.size && (e = d.width, g - e < p ? B[3] = ma(ja(e - g + p), B[3]) : g + e > r - p && (B[1] = ma(ja(g + e - r + p), B[1])), h - m / 2 < 0 ? B[0] = ma(ja(-h + m / 2), B[0]) : h + m / 2 > s && (B[2] = ma(ja(h + m / 2 - s), B[2])))
                        }
                    }(0 === x(B) || this.verifyDataLabelOverflow(B)) && (this.placeDataLabels(), z && q && Pa(this.points, function(a) {
                        b = a.connector, f = a.labelPos, (d = a.dataLabel) && d._pos && a.visible ? (i = d._attr.visibility, g = d.connX, h = d.connY, c = t ? ["M", g + ("left" === f[6] ? 5 : -5), h, "C", g, h, 2 * f[2] - f[4], 2 * f[3] - f[5], f[2], f[3], "L", f[4], f[5]] : ["M", g + ("left" === f[6] ? 5 : -5), h, "L", f[2], f[3], "L", f[4], f[5]], b ? (b.animate({
                            d: c
                        }), b.attr("visibility", i)) : a.connector = b = l.chart.renderer.path(c).attr({
                            "stroke-width": q,
                            stroke: o.connectorColor || a.color || "#606060",
                            visibility: i
                        }).add(l.dataLabelsGroup)) : b && (a.connector = b.destroy())
                    }))
                }
            }, Ma.pie.prototype.placeDataLabels = function() {
                Pa(this.points, function(a) {
                    var b = a.dataLabel;
                    b && a.visible && ((a = b._pos) ? (b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({
                        y: -9999
                    }))
                })
            }, Ma.pie.prototype.alignDataLabel = Ga, Ma.pie.prototype.verifyDataLabelOverflow = function(a) {
                var b, c = this.center,
                    d = this.options,
                    e = d.center,
                    f = d.minSize || 80,
                    g = f;
                return null !== e[0] ? g = ma(c[2] - ma(a[1], a[3]), f) : (g = ma(c[2] - a[1] - a[3], f), c[0] += (a[3] - a[1]) / 2), null !== e[1] ? g = ma(na(g, c[2] - ma(a[0], a[2])), f) : (g = ma(na(g, c[2] - a[0] - a[2]), f), c[1] += (a[0] - a[2]) / 2), g < c[2] ? (c[2] = g, c[3] = Math.min(/%$/.test(d.innerSize || 0) ? g * parseFloat(d.innerSize || 0) / 100 : parseFloat(d.innerSize || 0), g), this.translate(c), this.drawDataLabels && this.drawDataLabels()) : b = !0, b
            }), Ma.column && (Ma.column.prototype.alignDataLabel = function(a, b, c, e, f) {
                var g = this.chart.inverted,
                    h = a.series,
                    i = a.dlBox || a.shapeArgs,
                    j = _a(a.below, a.plotY > _a(this.translatedThreshold, h.yAxis.len)),
                    k = _a(c.inside, !!this.options.stacking);
                i && (e = d(i), e.y < 0 && (e.height += e.y, e.y = 0), i = e.y + e.height - h.yAxis.len, i > 0 && (e.height -= i), g && (e = {
                    x: h.yAxis.len - e.y - e.height,
                    y: h.xAxis.len - e.x - e.width,
                    width: e.height,
                    height: e.width
                }), k || (g ? (e.x += j ? 0 : e.width, e.width = 0) : (e.y += j ? e.height : 0, e.height = 0))), c.align = _a(c.align, !g || k ? "center" : j ? "right" : "left"), c.verticalAlign = _a(c.verticalAlign, g || k ? "middle" : j ? "top" : "bottom"), tb.prototype.alignDataLabel.call(this, a, b, c, e, f)
            }),
            function(a) {
                var b = a.Chart,
                    c = a.each,
                    d = a.pick,
                    e = a.addEvent;
                b.prototype.callbacks.push(function(a) {
                    function b() {
                        var b = [];
                        c(a.series, function(a) {
                            var e = a.options.dataLabels,
                                f = a.dataLabelCollections || ["dataLabel"];
                            (e.enabled || a._hasPointLabels) && !e.allowOverlap && a.visible && c(f, function(e) {
                                c(a.points, function(a) {
                                    a[e] && (a[e].labelrank = d(a.labelrank, a.shapeArgs && a.shapeArgs.height), b.push(a[e]))
                                })
                            })
                        }), a.hideOverlappingLabels(b)
                    }
                    b(), e(a, "redraw", b)
                }), b.prototype.hideOverlappingLabels = function(a) {
                    var b, d, e, f, g, h, i, j, k, l = a.length;
                    for (d = 0; d < l; d++)(b = a[d]) && (b.oldOpacity = b.opacity, b.newOpacity = 1);
                    for (a.sort(function(a, b) {
                            return (b.labelrank || 0) - (a.labelrank || 0)
                        }), d = 0; d < l; d++)
                        for (e = a[d], b = d + 1; b < l; ++b) f = a[b], e && f && e.placed && f.placed && 0 !== e.newOpacity && 0 !== f.newOpacity && (g = e.alignAttr, h = f.alignAttr, i = e.parentGroup, j = f.parentGroup, k = 2 * (e.box ? 0 : e.padding), g = !(h.x + j.translateX > g.x + i.translateX + (e.width - k) || h.x + j.translateX + (f.width - k) < g.x + i.translateX || h.y + j.translateY > g.y + i.translateY + (e.height - k) || h.y + j.translateY + (f.height - k) < g.y + i.translateY)) && ((e.labelrank < f.labelrank ? e : f).newOpacity = 0);
                    c(a, function(a) {
                        var b, c;
                        a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function() {
                            a.hide()
                        }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
                    })
                }
            }(ga);
        var wb = ga.TrackerMixin = {
            drawTrackerPoint: function() {
                var a = this,
                    b = a.chart,
                    c = b.pointer,
                    d = a.options.cursor,
                    e = d && {
                        cursor: d
                    },
                    f = function(a) {
                        for (var c, d = a.target; d && !c;) c = d.point, d = d.parentNode;
                        c !== K && c !== b.hoverPoint && c.onMouseOver(a)
                    };
                Pa(a.points, function(a) {
                    a.graphic && (a.graphic.element.point = a), a.dataLabel && (a.dataLabel.element.point = a)
                }), a._hasTracking || (Pa(a.trackerGroups, function(b) {
                    a[b] && (a[b].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function(a) {
                        c.onTrackerMouseOut(a)
                    }).css(e), M) && a[b].on("touchstart", f)
                }), a._hasTracking = !0)
            },
            drawTrackerGraph: function() {
                var a = this,
                    b = a.options,
                    c = b.trackByArea,
                    d = [].concat(c ? a.areaPath : a.graphPath),
                    e = d.length,
                    f = a.chart,
                    g = f.pointer,
                    h = f.renderer,
                    i = f.options.tooltip.snap,
                    j = a.tracker,
                    k = b.cursor,
                    l = k && {
                        cursor: k
                    },
                    m = function() {
                        f.hoverSeries !== a && a.onMouseOver()
                    },
                    n = "rgba(192,192,192," + (Ba ? 1e-4 : .002) + ")";
                if (e && !c)
                    for (k = e + 1; k--;) "M" === d[k] && d.splice(k + 1, 0, d[k + 1] - i, d[k + 2], "L"), (k && "M" === d[k] || k === e) && d.splice(k, 0, "L", d[k - 2] + i, d[k - 1]);
                j ? j.attr({
                    d: d
                }) : (a.tracker = h.path(d).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: n,
                    fill: c ? n : "none",
                    "stroke-width": b.lineWidth + (c ? 0 : 2 * i),
                    zIndex: 2
                }).add(a.group), Pa([a.tracker, a.markerGroup], function(a) {
                    a.addClass("highcharts-tracker").on("mouseover", m).on("mouseout", function(a) {
                        g.onTrackerMouseOut(a)
                    }).css(l), M && a.on("touchstart", m)
                }))
            }
        };
        Ma.column && (ub.prototype.drawTracker = wb.drawTrackerPoint), Ma.pie && (Ma.pie.prototype.drawTracker = wb.drawTrackerPoint), Ma.scatter && (vb.prototype.drawTracker = wb.drawTrackerPoint), Za(pb.prototype, {
                setItemEvents: function(a, b, c, d, e) {
                    var f = this;
                    (c ? b : a.legendGroup).on("mouseover", function() {
                        a.setState("hover"), b.css(f.options.itemHoverStyle)
                    }).on("mouseout", function() {
                        b.css(a.visible ? d : e), a.setState()
                    }).on("click", function(b) {
                        var c = function() {
                                a.setVisible && a.setVisible()
                            },
                            b = {
                                browserEvent: b
                            };
                        a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : Va(a, "legendItemClick", b, c)
                    })
                },
                createCheckboxForItem: function(a) {
                    a.checkbox = o("input", {
                        type: "checkbox",
                        checked: a.selected,
                        defaultChecked: a.selected
                    }, this.options.itemCheckboxStyle, this.chart.container), Ta(a.checkbox, "click", function(b) {
                        Va(a.series || a, "checkboxClick", {
                            checked: b.target.checked,
                            item: a
                        }, function() {
                            a.select()
                        })
                    })
                }
            }), O.legend.itemStyle.cursor = "pointer", Za(qb.prototype, {
                showResetZoom: function() {
                    var a = this,
                        b = O.lang,
                        c = a.options.chart.resetZoomButton,
                        d = c.theme,
                        e = d.states,
                        f = "chart" === c.relativeTo ? null : "plotBox";
                    this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function() {
                        a.zoomOut()
                    }, d, e && e.hover).attr({
                        align: c.position.align,
                        title: b.resetZoomTitle
                    }).add().align(c.position, !1, f)
                },
                zoomOut: function() {
                    var a = this;
                    Va(a, "selection", {
                        resetSelection: !0
                    }, function() {
                        a.zoom()
                    })
                },
                zoom: function(a) {
                    var b, c, d = this.pointer,
                        e = !1;
                    !a || a.resetSelection ? Pa(this.axes, function(a) {
                        b = a.zoom()
                    }) : Pa(a.xAxis.concat(a.yAxis), function(a) {
                        var c = a.axis,
                            f = c.isXAxis;
                        (d[f ? "zoomX" : "zoomY"] || d[f ? "pinchX" : "pinchY"]) && (b = c.zoom(a.min, a.max), c.displayBtn && (e = !0))
                    }), c = this.resetZoomButton, e && !c ? this.showResetZoom() : !e && g(c) && (this.resetZoomButton = c.destroy()), b && this.redraw(_a(this.options.chart.animation, a && a.animation, this.pointCount < 100))
                },
                pan: function(a, b) {
                    var c, d = this,
                        e = d.hoverPoints;
                    e && Pa(e, function(a) {
                        a.setState()
                    }), Pa("xy" === b ? [1, 0] : [1], function(b) {
                        var b = d[b ? "xAxis" : "yAxis"][0],
                            e = b.horiz,
                            f = a[e ? "chartX" : "chartY"],
                            e = e ? "mouseDownX" : "mouseDownY",
                            g = d[e],
                            h = (b.pointRange || 0) / 2,
                            i = b.getExtremes(),
                            j = b.toValue(g - f, !0) + h,
                            h = b.toValue(g + b.len - f, !0) - h,
                            g = g > f;
                        b.series.length && (g || j > na(i.dataMin, i.min)) && (!g || h < ma(i.dataMax, i.max)) && (b.setExtremes(j, h, !1, !1, {
                            trigger: "pan"
                        }), c = !0), d[e] = f
                    }), c && d.redraw(!1), n(d.container, {
                        cursor: "move"
                    })
                }
            }), Za(sb.prototype, {
                select: function(a, b) {
                    var c = this,
                        d = c.series,
                        e = d.chart,
                        a = _a(a, !c.selected);
                    c.firePointEvent(a ? "select" : "unselect", {
                        accumulate: b
                    }, function() {
                        c.selected = c.options.selected = a, d.options.data[Oa(c, d.data)] = c.options, c.setState(a && "select"), b || Pa(e.getSelectedPoints(), function(a) {
                            a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[Oa(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                        })
                    })
                },
                onMouseOver: function(a, b) {
                    var c = this.series,
                        d = c.chart,
                        e = d.tooltip,
                        f = d.hoverPoint;
                    d.hoverSeries !== c && c.onMouseOver(), f && f !== this && f.onMouseOut(), this.series && (this.firePointEvent("mouseOver"), e && (!e.shared || c.noSharedTooltip) && e.refresh(this, a), this.setState("hover"), !b) && (d.hoverPoint = this)
                },
                onMouseOut: function() {
                    var a = this.series.chart,
                        b = a.hoverPoints;
                    this.firePointEvent("mouseOut"), b && Oa(this, b) !== -1 || (this.setState(), a.hoverPoint = null)
                },
                importEvents: function() {
                    if (!this.hasImportedEvents) {
                        var a, b = d(this.series.options.point, this.options).events;
                        this.events = b;
                        for (a in b) Ta(this, a, b[a]);
                        this.hasImportedEvents = !0
                    }
                },
                setState: function(a, b) {
                    var c, e = ka(this.plotX),
                        f = this.plotY,
                        g = this.series,
                        h = g.options.states,
                        i = bb[g.type].marker && g.options.marker,
                        j = i && !i.enabled,
                        k = i && i.states[a],
                        l = k && k.enabled === !1,
                        m = g.stateMarkerGraphic,
                        n = this.marker || {},
                        o = g.chart,
                        p = g.halo,
                        a = a || "";
                    c = this.pointAttr[a] || g.pointAttr[a], a === this.state && !b || this.selected && "select" !== a || h[a] && h[a].enabled === !1 || a && (l || j && k.enabled === !1) || a && n.states && n.states[a] && n.states[a].enabled === !1 || (this.graphic ? (i = i && this.graphic.symbolName && c.r, this.graphic.attr(d(c, i ? {
                        x: e - i,
                        y: f - i,
                        width: 2 * i,
                        height: 2 * i
                    } : {})), m && m.hide()) : (a && k && (i = k.radius, n = n.symbol || g.symbol, m && m.currentSymbol !== n && (m = m.destroy()), m ? m[b ? "animate" : "attr"]({
                        x: e - i,
                        y: f - i
                    }) : n && (g.stateMarkerGraphic = m = o.renderer.symbol(n, e - i, f - i, 2 * i, 2 * i).attr(c).add(g.markerGroup), m.currentSymbol = n)), m && (m[a && o.isInsidePlot(e, f, o.inverted) ? "show" : "hide"](), m.element.point = this)), (e = h[a] && h[a].halo) && e.size ? (p || (g.halo = p = o.renderer.path().add(o.seriesGroup)), p.attr(Za({
                        fill: this.color || g.color,
                        "fill-opacity": e.opacity,
                        zIndex: -1
                    }, e.attributes))[b ? "animate" : "attr"]({
                        d: this.haloPath(e.size)
                    })) : p && p.attr({
                        d: []
                    }), this.state = a);
                },
                haloPath: function(a) {
                    var b = this.series,
                        c = b.chart,
                        d = b.getPlotBox(),
                        e = c.inverted,
                        f = Math.floor(this.plotX);
                    return c.renderer.symbols.circle(d.translateX + (e ? b.yAxis.len - this.plotY : f) - a, d.translateY + (e ? b.xAxis.len - f : this.plotY) - a, 2 * a, 2 * a)
                }
            }), Za(tb.prototype, {
                onMouseOver: function() {
                    var a = this.chart,
                        b = a.hoverSeries;
                    b && b !== this && b.onMouseOut(), this.options.events.mouseOver && Va(this, "mouseOver"), this.setState("hover"), a.hoverSeries = this
                },
                onMouseOut: function() {
                    var a = this.options,
                        b = this.chart,
                        c = b.tooltip,
                        d = b.hoverPoint;
                    b.hoverSeries = null, d && d.onMouseOut(), this && a.events.mouseOut && Va(this, "mouseOut"), c && !a.stickyTracking && (!c.shared || this.noSharedTooltip) && c.hide(), this.setState()
                },
                setState: function(a) {
                    var b = this.options,
                        c = this.graph,
                        d = b.states,
                        e = b.lineWidth,
                        b = 0,
                        a = a || "";
                    if (this.state !== a && (this.state = a, !(d[a] && d[a].enabled === !1) && (a && (e = d[a].lineWidth || e + (d[a].lineWidthPlus || 0)), c && !c.dashstyle)))
                        for (a = {
                                "stroke-width": e
                            }, c.attr(a); this["zoneGraph" + b];) this["zoneGraph" + b].attr(a), b += 1
                },
                setVisible: function(a, b) {
                    var c, d = this,
                        e = d.chart,
                        f = d.legendItem,
                        g = e.options.chart.ignoreHiddenSeries,
                        h = d.visible;
                    c = (d.visible = a = d.userOptions.visible = a === K ? !h : a) ? "show" : "hide", Pa(["group", "dataLabelsGroup", "markerGroup", "tracker"], function(a) {
                        d[a] && d[a][c]()
                    }), e.hoverSeries !== d && (e.hoverPoint && e.hoverPoint.series) !== d || d.onMouseOut(), f && e.legend.colorizeItem(d, a), d.isDirty = !0, d.options.stacking && Pa(e.series, function(a) {
                        a.options.stacking && a.visible && (a.isDirty = !0)
                    }), Pa(d.linkedSeries, function(b) {
                        b.setVisible(a, !1)
                    }), g && (e.isDirtyBox = !0), b !== !1 && e.redraw(), Va(d, c)
                },
                show: function() {
                    this.setVisible(!0)
                },
                hide: function() {
                    this.setVisible(!1)
                },
                select: function(a) {
                    this.selected = a = a === K ? !this.selected : a, this.checkbox && (this.checkbox.checked = a), Va(this, a ? "select" : "unselect")
                },
                drawTracker: wb.drawTrackerGraph
            }), ab(tb.prototype, "init", function(a) {
                var b;
                a.apply(this, Array.prototype.slice.call(arguments, 1)), (b = this.xAxis) && b.options.ordinal && Ta(this, "updatedData", function() {
                    delete b.ordinalIndex
                })
            }), ab(hb.prototype, "getTimeTicks", function(a, b, c, d, e, f, g, h) {
                var i, k, l, m, n, o = 0,
                    p = {},
                    q = [],
                    r = -Number.MAX_VALUE,
                    s = this.options.tickPixelInterval;
                if (!this.options.ordinal && !this.options.breaks || !f || f.length < 3 || c === K) return a.call(this, b, c, d, e);
                for (m = f.length, i = 0; i < m; i++) {
                    if (n = i && f[i - 1] > d, f[i] < c && (o = i), i === m - 1 || f[i + 1] - f[i] > 5 * g || n) {
                        if (f[i] > r) {
                            for (k = a.call(this, b, f[o], f[i], e); k.length && k[0] <= r;) k.shift();
                            k.length && (r = k[k.length - 1]), q = q.concat(k)
                        }
                        o = i + 1
                    }
                    if (n) break
                }
                if (a = k.info, h && a.unitRange <= Q.hour) {
                    for (i = q.length - 1, o = 1; o < i; o++) P("%d", q[o]) !== P("%d", q[o - 1]) && (p[q[o]] = "day", l = !0);
                    l && (p[q[0]] = "day"), a.higherRanks = p
                }
                if (q.info = a, h && j(s)) {
                    h = a = q.length, i = [];
                    var t;
                    for (l = []; h--;) o = this.translate(q[h]), t && (l[h] = t - o), i[h] = t = o;
                    for (l.sort(), l = l[ka(l.length / 2)], l < .6 * s && (l = null), h = q[a - 1] > d ? a - 1 : a, t = void 0; h--;) o = i[h], d = t - o, t && d < .8 * s && (null === l || d < .8 * l) ? (p[q[h]] && !p[q[h + 1]] ? (d = h + 1, t = o) : d = h, q.splice(d, 1)) : t = o
                }
                return q
            }), Za(hb.prototype, {
                beforeSetTickPositions: function() {
                    var a, b, c, d = [],
                        e = !1,
                        f = this.getExtremes(),
                        g = f.min,
                        h = f.max,
                        i = this.isXAxis && !!this.options.breaks;
                    if ((f = this.options.ordinal) || i) {
                        if (Pa(this.series, function(b, c) {
                                if (b.visible !== !1 && (b.takeOrdinalPosition !== !1 || i) && (d = d.concat(b.processedXData), a = d.length, d.sort(function(a, b) {
                                        return a - b
                                    }), a))
                                    for (c = a - 1; c--;) d[c] === d[c + 1] && d.splice(c, 1)
                            }), a = d.length, a > 2) {
                            for (b = d[1] - d[0], c = a - 1; c-- && !e;) d[c + 1] - d[c] !== b && (e = !0);
                            !this.options.keepOrdinalPadding && (d[0] - g > b || h - d[d.length - 1] > b) && (e = !0)
                        }
                        e ? (this.ordinalPositions = d, b = this.val2lin(ma(g, d[0]), !0), c = ma(this.val2lin(na(h, d[d.length - 1]), !0), 1), this.ordinalSlope = h = (h - g) / (c - b), this.ordinalOffset = g - b * h) : this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = K
                    }
                    this.isOrdinal = f && e, this.groupIntervalFactor = null
                },
                val2lin: function(a, b) {
                    var c, d = this.ordinalPositions;
                    if (d) {
                        var e, f = d.length;
                        for (c = f; c--;)
                            if (d[c] === a) {
                                e = c;
                                break
                            }
                        for (c = f - 1; c--;)
                            if (a > d[c] || 0 === c) {
                                d = (a - d[c]) / (d[c + 1] - d[c]), e = c + d;
                                break
                            }
                        c = b ? e : this.ordinalSlope * (e || 0) + this.ordinalOffset
                    } else c = a;
                    return c
                },
                lin2val: function(a, b) {
                    var c = this.ordinalPositions;
                    if (c) {
                        var d, e, f = this.ordinalSlope,
                            g = this.ordinalOffset,
                            h = c.length - 1;
                        if (b) a < 0 ? a = c[0] : a > h ? a = c[h] : (h = ka(a), e = a - h);
                        else
                            for (; h--;)
                                if (d = f * h + g, a >= d) {
                                    f = f * (h + 1) + g, e = (a - d) / (f - d);
                                    break
                                }
                        c = e !== K && c[h] !== K ? c[h] + (e ? e * (c[h + 1] - c[h]) : 0) : a
                    } else c = a;
                    return c
                },
                getExtendedPositions: function() {
                    var a, b, c = this.chart,
                        d = this.series[0].currentDataGrouping,
                        e = this.ordinalIndex,
                        f = d ? d.count + d.unitName : "raw",
                        g = this.getExtremes();
                    return e || (e = this.ordinalIndex = {}), e[f] || (a = {
                        series: [],
                        getExtremes: function() {
                            return {
                                min: g.dataMin,
                                max: g.dataMax
                            }
                        },
                        options: {
                            ordinal: !0
                        },
                        val2lin: hb.prototype.val2lin
                    }, Pa(this.series, function(e) {
                        b = {
                            xAxis: a,
                            xData: e.xData,
                            chart: c,
                            destroyGroupedData: Ga
                        }, b.options = {
                            dataGrouping: d ? {
                                enabled: !0,
                                forced: !0,
                                approximation: "open",
                                units: [
                                    [d.unitName, [d.count]]
                                ]
                            } : {
                                enabled: !1
                            }
                        }, e.processData.apply(b), a.series.push(b)
                    }), this.beforeSetTickPositions.apply(a), e[f] = a.ordinalPositions), e[f]
                },
                getGroupIntervalFactor: function(a, b, c) {
                    var d, c = c.processedXData,
                        e = c.length,
                        f = [];
                    if (d = this.groupIntervalFactor, !d) {
                        for (d = 0; d < e - 1; d++) f[d] = c[d + 1] - c[d];
                        f.sort(function(a, b) {
                            return a - b
                        }), f = f[ka(e / 2)], a = ma(a, c[0]), b = na(b, c[e - 1]), this.groupIntervalFactor = d = e * f / (b - a)
                    }
                    return d
                },
                postProcessTickInterval: function(a) {
                    var b = this.ordinalSlope;
                    return b ? this.options.breaks ? this.closestPointRange : a / (b / this.closestPointRange) : a
                }
            }), ab(qb.prototype, "pan", function(a, b) {
                var c = this.xAxis[0],
                    d = b.chartX,
                    e = !1;
                if (c.options.ordinal && c.series.length) {
                    var f, g = this.mouseDownX,
                        h = c.getExtremes(),
                        i = h.dataMax,
                        j = h.min,
                        k = h.max,
                        l = this.hoverPoints,
                        m = c.closestPointRange,
                        g = (g - d) / (c.translationSlope * (c.ordinalSlope || m)),
                        o = {
                            ordinalPositions: c.getExtendedPositions()
                        },
                        m = c.lin2val,
                        p = c.val2lin;
                    o.ordinalPositions ? oa(g) > 1 && (l && Pa(l, function(a) {
                        a.setState()
                    }), g < 0 ? (l = o, f = c.ordinalPositions ? c : o) : (l = c.ordinalPositions ? c : o, f = o), o = f.ordinalPositions, i > o[o.length - 1] && o.push(i), this.fixedRange = k - j, g = c.toFixedRange(null, null, m.apply(l, [p.apply(l, [j, !0]) + g, !0]), m.apply(f, [p.apply(f, [k, !0]) + g, !0])), g.min >= na(h.dataMin, j) && g.max <= ma(i, k) && c.setExtremes(g.min, g.max, !0, !1, {
                        trigger: "pan"
                    }), this.mouseDownX = d, n(this.container, {
                        cursor: "move"
                    })) : e = !0
                } else e = !0;
                e && a.apply(this, Array.prototype.slice.call(arguments, 1))
            }), tb.prototype.gappedPath = function() {
                var a = this.options.gapSize,
                    b = this.points.slice(),
                    c = b.length - 1;
                if (a && c > 0)
                    for (; c--;) b[c + 1].x - b[c].x > this.closestPointRange * a && b.splice(c + 1, 0, {
                        isNull: !0
                    });
                return this.getGraphPath(b)
            },
            function(a) {
                a(ga)
            }(function(a) {
                function b() {
                    return Array.prototype.slice.call(arguments, 1)
                }

                function c(a) {
                    a.apply(this), this.drawBreaks(this.xAxis, ["x"]), this.drawBreaks(this.yAxis, d(this.pointArrayMap, ["y"]))
                }
                var d = a.pick,
                    e = a.wrap,
                    f = a.each,
                    g = a.extend,
                    h = a.fireEvent,
                    i = a.Axis,
                    j = a.Series;
                g(i.prototype, {
                    isInBreak: function(a, b) {
                        var c = a.repeat || 1 / 0,
                            d = a.from,
                            e = a.to - a.from,
                            c = b >= d ? (b - d) % c : c - (d - b) % c;
                        return a.inclusive ? c <= e : c < e && 0 !== c
                    },
                    isInAnyBreak: function(a, b) {
                        var c, e, f, g = this.options.breaks,
                            h = g && g.length;
                        if (h) {
                            for (; h--;) this.isInBreak(g[h], a) && (c = !0, e || (e = d(g[h].showPoints, !this.isXAxis)));
                            f = c && b ? c && !e : c
                        }
                        return f
                    }
                }), e(i.prototype, "setTickPositions", function(a) {
                    if (a.apply(this, Array.prototype.slice.call(arguments, 1)), this.options.breaks) {
                        var b, c = this.tickPositions,
                            d = this.tickPositions.info,
                            e = [];
                        for (b = 0; b < c.length; b++) this.isInAnyBreak(c[b]) || e.push(c[b]);
                        this.tickPositions = e, this.tickPositions.info = d
                    }
                }), e(i.prototype, "init", function(a, b, c) {
                    if (c.breaks && c.breaks.length && (c.ordinal = !1), a.call(this, b, c), this.options.breaks) {
                        var d = this;
                        d.isBroken = !0, this.val2lin = function(a) {
                            var b, c, e = a;
                            for (c = 0; c < d.breakArray.length; c++)
                                if (b = d.breakArray[c], b.to <= a) e -= b.len;
                                else {
                                    if (b.from >= a) break;
                                    if (d.isInBreak(b, a)) {
                                        e -= a - b.from;
                                        break
                                    }
                                }
                            return e
                        }, this.lin2val = function(a) {
                            var b, c;
                            for (c = 0; c < d.breakArray.length && (b = d.breakArray[c], !(b.from >= a)); c++) b.to < a ? a += b.len : d.isInBreak(b, a) && (a += b.len);
                            return a
                        }, this.setExtremes = function(a, b, c, d, e) {
                            for (; this.isInAnyBreak(a);) a -= this.closestPointRange;
                            for (; this.isInAnyBreak(b);) b -= this.closestPointRange;
                            i.prototype.setExtremes.call(this, a, b, c, d, e)
                        }, this.setAxisTranslation = function(a) {
                            i.prototype.setAxisTranslation.call(this, a);
                            var b, c, e, f, g = d.options.breaks,
                                a = [],
                                j = [],
                                k = 0,
                                l = d.userMin || d.min,
                                m = d.userMax || d.max;
                            for (f in g) c = g[f], b = c.repeat || 1 / 0, d.isInBreak(c, l) && (l += c.to % b - l % b), d.isInBreak(c, m) && (m -= m % b - c.from % b);
                            for (f in g) {
                                for (c = g[f], e = c.from, b = c.repeat || 1 / 0; e - b > l;) e -= b;
                                for (; e < l;) e += b;
                                for (; e < m; e += b) a.push({
                                    value: e,
                                    move: "in"
                                }), a.push({
                                    value: e + (c.to - c.from),
                                    move: "out",
                                    size: c.breakSize
                                })
                            }
                            a.sort(function(a, b) {
                                return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value
                            }), g = 0, e = l;
                            for (f in a) c = a[f], g += "in" === c.move ? 1 : -1, 1 === g && "in" === c.move && (e = c.value), 0 === g && (j.push({
                                from: e,
                                to: c.value,
                                len: c.value - e - (c.size || 0)
                            }), k += c.value - e - (c.size || 0));
                            d.breakArray = j, h(d, "afterBreaks"), d.transA *= (m - d.min) / (m - l - k), d.min = l, d.max = m
                        }
                    }
                }), e(j.prototype, "generatePoints", function(a) {
                    a.apply(this, b(arguments));
                    var c, d, e = this.xAxis,
                        f = this.yAxis,
                        g = this.points,
                        h = g.length,
                        i = this.options.connectNulls;
                    if (e && f && (e.options.breaks || f.options.breaks))
                        for (; h--;) c = g[h], d = null === c.y && i === !1, d || !e.isInAnyBreak(c.x, !0) && !f.isInAnyBreak(c.y, !0) || (g.splice(h, 1), this.data[h] && this.data[h].destroyElements())
                }), a.Series.prototype.drawBreaks = function(a, b) {
                    var c, e, g, i, j = this,
                        k = j.points;
                    f(b, function(b) {
                        c = a.breakArray || [], e = a.isXAxis ? a.min : d(j.options.threshold, a.min), f(k, function(j) {
                            i = d(j["stack" + b.toUpperCase()], j[b]), f(c, function(b) {
                                g = !1, e < b.from && i > b.to || e > b.from && i < b.from ? g = "pointBreak" : (e < b.from && i > b.from && i < b.to || e > b.from && i > b.to && i < b.from) && (g = "pointInBreak"), g && h(a, g, {
                                    point: j,
                                    brk: b
                                })
                            })
                        })
                    })
                }, e(a.seriesTypes.column.prototype, "drawPoints", c), e(a.Series.prototype, "drawPoints", c)
            });
        var xb = tb.prototype,
            yb = xb.processData,
            zb = xb.generatePoints,
            Ab = xb.destroy,
            Bb = {
                approximation: "average",
                groupPixelWidth: 2,
                dateTimeLabelFormats: {
                    millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"],
                    second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
                    minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    month: ["%B %Y", "%B", "-%B %Y"],
                    year: ["%Y", "%Y", "-%Y"]
                }
            },
            Cb = {
                line: {},
                spline: {},
                area: {},
                areaspline: {},
                column: {
                    approximation: "sum",
                    groupPixelWidth: 10
                },
                arearange: {
                    approximation: "range"
                },
                areasplinerange: {
                    approximation: "range"
                },
                columnrange: {
                    approximation: "range",
                    groupPixelWidth: 10
                },
                candlestick: {
                    approximation: "ohlc",
                    groupPixelWidth: 10
                },
                ohlc: {
                    approximation: "ohlc",
                    groupPixelWidth: 5
                }
            },
            Db = [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1]],
                ["week", [1]],
                ["month", [1, 3, 6]],
                ["year", null]
            ],
            Eb = {
                sum: function(a) {
                    var b, c = a.length;
                    if (!c && a.hasNulls) b = null;
                    else if (c)
                        for (b = 0; c--;) b += a[c];
                    return b
                },
                average: function(a) {
                    var b = a.length,
                        a = Eb.sum(a);
                    return $a(a) && b && (a /= b), a
                },
                open: function(a) {
                    return a.length ? a[0] : a.hasNulls ? null : K
                },
                high: function(a) {
                    return a.length ? x(a) : a.hasNulls ? null : K
                },
                low: function(a) {
                    return a.length ? w(a) : a.hasNulls ? null : K
                },
                close: function(a) {
                    return a.length ? a[a.length - 1] : a.hasNulls ? null : K
                },
                ohlc: function(a, b, c, d) {
                    if (a = Eb.open(a), b = Eb.high(b), c = Eb.low(c), d = Eb.close(d), $a(a) || $a(b) || $a(c) || $a(d)) return [a, b, c, d]
                },
                range: function(a, b) {
                    if (a = Eb.low(a), b = Eb.high(b), $a(a) || $a(b)) return [a, b]
                }
            };
        xb.groupData = function(a, b, c, d) {
            var e, f, g, h = this.data,
                i = this.options.data,
                j = [],
                k = [],
                l = [],
                m = a.length,
                n = !!b,
                o = [
                    [],
                    [],
                    [],
                    []
                ],
                d = "function" == typeof d ? d : Eb[d],
                p = this.pointArrayMap,
                q = p && p.length,
                r = 0;
            for (g = 0; g <= m && !(a[g] >= c[0]); g++);
            for (; g <= m; g++) {
                for (;
                    (c[1] !== K && a[g] >= c[1] || g === m) && (e = c.shift(), f = d.apply(0, o), f !== K && (j.push(e), k.push(f), l.push({
                        start: r,
                        length: o[0].length
                    })), r = g, o[0] = [], o[1] = [], o[2] = [], o[3] = [], g !== m););
                if (g === m) break;
                if (p) {
                    e = this.cropStart + g, e = h && h[e] || this.pointClass.prototype.applyOptions.apply({
                        series: this
                    }, [i[e]]);
                    var s;
                    for (f = 0; f < q; f++) s = e[p[f]], $a(s) ? o[f].push(s) : null === s && (o[f].hasNulls = !0)
                } else e = n ? b[g] : null, $a(e) ? o[0].push(e) : null === e && (o[0].hasNulls = !0)
            }
            return [j, k, l]
        }, xb.processData = function() {
            var a, b = this.chart,
                c = this.options.dataGrouping,
                d = this.allowDG !== !1 && c && _a(c.enabled, b.options._stock);
            if (this.forceCrop = d, this.groupPixelWidth = null, this.hasProcessed = !0, yb.apply(this, arguments) !== !1 && d) {
                this.destroyGroupedData();
                var e = this.processedXData,
                    f = this.processedYData,
                    g = b.plotSizeX,
                    b = this.xAxis,
                    h = b.options.ordinal,
                    i = this.groupPixelWidth = b.getGroupPixelWidth && b.getGroupPixelWidth();
                if (i) {
                    a = !0, this.points = null;
                    var k = b.getExtremes(),
                        d = k.min,
                        k = k.max,
                        h = h && b.getGroupIntervalFactor(d, k, this) || 1,
                        g = i * (k - d) / g * h,
                        i = b.getTimeTicks(b.normalizeTimeTickInterval(g, c.units || Db), Math.min(d, e[0]), Math.max(k, e[e.length - 1]), b.options.startOfWeek, e, this.closestPointRange),
                        e = xb.groupData.apply(this, [e, f, i, c.approximation]),
                        f = e[0],
                        h = e[1];
                    if (c.smoothed) {
                        for (c = f.length - 1, f[c] = Math.min(f[c], k); c-- && c > 0;) f[c] += g / 2;
                        f[0] = Math.max(f[0], d)
                    }
                    this.currentDataGrouping = i.info, this.closestPointRange = i.info.totalRange, this.groupMap = e[2], j(f[0]) && f[0] < b.dataMin && (b.min === b.dataMin && (b.min = f[0]), b.dataMin = f[0]), this.processedXData = f, this.processedYData = h
                } else this.currentDataGrouping = this.groupMap = null;
                this.hasGroupedData = a
            }
        }, xb.destroyGroupedData = function() {
            var a = this.groupedData;
            Pa(a || [], function(b, c) {
                b && (a[c] = b.destroy ? b.destroy() : null)
            }), this.groupedData = null
        }, xb.generatePoints = function() {
            zb.apply(this), this.destroyGroupedData(), this.groupedData = this.hasGroupedData ? this.points : null
        }, ab(ib.prototype, "tooltipFooterHeaderFormatter", function(a, b, c) {
            var d, e = b.series,
                f = e.tooltipOptions,
                g = e.options.dataGrouping,
                h = f.xDateFormat,
                i = e.xAxis;
            return i && "datetime" === i.options.type && g && $a(b.key) ? (a = e.currentDataGrouping, g = g.dateTimeLabelFormats, a ? (i = g[a.unitName], 1 === a.count ? h = i[0] : (h = i[1], d = i[2])) : !h && g && (h = this.getXDateFormat(b, f, i)), h = P(h, b.key), d && (h += P(d, b.key + a.totalRange - 1)), s(f[(c ? "footer" : "header") + "Format"], {
                point: Za(b, {
                    key: h
                }),
                series: e
            })) : a.call(this, b, c)
        }), xb.destroy = function() {
            for (var a = this.groupedData || [], b = a.length; b--;) a[b] && a[b].destroy();
            Ab.apply(this)
        }, ab(xb, "setOptions", function(a, b) {
            var c = a.call(this, b),
                e = this.type,
                f = this.chart.options.plotOptions,
                g = bb[e].dataGrouping;
            return Cb[e] && (g || (g = d(Bb, Cb[e])), c.dataGrouping = d(g, f.series && f.series.dataGrouping, f[e].dataGrouping, b.dataGrouping)), this.chart.options._stock && (this.requireSorting = !0), c
        }), ab(hb.prototype, "setScale", function(a) {
            a.call(this), Pa(this.series, function(a) {
                a.hasProcessed = !1
            })
        }), hb.prototype.getGroupPixelWidth = function() {
            var a, b, c = this.series,
                d = c.length,
                e = 0,
                f = !1;
            for (a = d; a--;)(b = c[a].options.dataGrouping) && (e = ma(e, b.groupPixelWidth));
            for (a = d; a--;)(b = c[a].options.dataGrouping) && c[a].hasProcessed && (d = (c[a].processedXData || c[a].data).length, (c[a].groupPixelWidth || d > this.chart.plotSizeX / e || d && b.forced) && (f = !0));
            return f ? e : 0
        }, hb.prototype.setDataGrouping = function(a, b) {
            var c, b = _a(b, !0);
            if (a || (a = {
                    forced: !1,
                    units: null
                }), this instanceof hb)
                for (c = this.series.length; c--;) this.series[c].update({
                    dataGrouping: a
                }, !1);
            else Pa(this.chart.options.series, function(b) {
                b.dataGrouping = a
            }, !1);
            b && this.chart.redraw()
        }, bb.ohlc = d(bb.column, {
            lineWidth: 1,
            tooltip: {
                pointFormat: '<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>'
            },
            states: {
                hover: {
                    lineWidth: 3
                }
            },
            threshold: null
        }), cb = p(Ma.column, {
            type: "ohlc",
            pointArrayMap: ["open", "high", "low", "close"],
            toYData: function(a) {
                return [a.open, a.high, a.low, a.close]
            },
            pointValKey: "high",
            pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth"
            },
            upColorProp: "stroke",
            getAttribs: function() {
                Ma.column.prototype.getAttribs.apply(this, arguments);
                var a = this.options,
                    b = a.states,
                    a = a.upColor || this.color,
                    c = d(this.pointAttr),
                    e = this.upColorProp;
                c[""][e] = a, c.hover[e] = b.hover.upColor || a, c.select[e] = b.select.upColor || a, Pa(this.points, function(a) {
                    a.open < a.close && !a.options.color && (a.pointAttr = c)
                })
            },
            translate: function() {
                var a = this.yAxis;
                Ma.column.prototype.translate.apply(this), Pa(this.points, function(b) {
                    null !== b.open && (b.plotOpen = a.translate(b.open, 0, 1, 0, 1)), null !== b.close && (b.plotClose = a.translate(b.close, 0, 1, 0, 1))
                })
            },
            drawPoints: function() {
                var a, b, c, d, e, f, g, h, i = this,
                    j = i.chart;
                Pa(i.points, function(k) {
                    k.plotY !== K && (g = k.graphic, a = k.pointAttr[k.selected ? "selected" : ""] || i.pointAttr[""], d = a["stroke-width"] % 2 / 2, h = ja(k.plotX) - d, e = ja(k.shapeArgs.width / 2), f = ["M", h, ja(k.yBottom), "L", h, ja(k.plotY)], null !== k.open && (b = ja(k.plotOpen) + d, f.push("M", h, b, "L", h - e, b)), null !== k.close && (c = ja(k.plotClose) + d, f.push("M", h, c, "L", h + e, c)), g ? g.attr(a).animate({
                        d: f
                    }) : k.graphic = j.renderer.path(f).attr(a).add(i.group))
                })
            },
            animate: null
        }), Ma.ohlc = cb, bb.candlestick = d(bb.column, {
            lineColor: "black",
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 2
                }
            },
            tooltip: bb.ohlc.tooltip,
            threshold: null,
            upColor: "white"
        }), cb = p(cb, {
            type: "candlestick",
            pointAttrToOptions: {
                fill: "color",
                stroke: "lineColor",
                "stroke-width": "lineWidth"
            },
            upColorProp: "fill",
            getAttribs: function() {
                Ma.ohlc.prototype.getAttribs.apply(this, arguments);
                var a = this.options,
                    b = a.states,
                    c = a.upLineColor || a.lineColor,
                    e = b.hover.upLineColor || c,
                    f = b.select.upLineColor || c;
                Pa(this.points, function(a) {
                    a.open < a.close && (a.lineColor && (a.pointAttr = d(a.pointAttr), c = a.lineColor), a.pointAttr[""].stroke = c, a.pointAttr.hover.stroke = e, a.pointAttr.select.stroke = f)
                })
            },
            drawPoints: function() {
                var a, b, c, d, e, f, g, h, i, j, k, l, m = this,
                    n = m.chart,
                    o = m.pointAttr[""];
                Pa(m.points, function(p) {
                    j = p.graphic, p.plotY !== K && (a = p.pointAttr[p.selected ? "selected" : ""] || o, h = a["stroke-width"] % 2 / 2, i = ja(p.plotX) - h, b = p.plotOpen, c = p.plotClose, d = ia.min(b, c), e = ia.max(b, c), l = ja(p.shapeArgs.width / 2), f = ja(d) !== ja(p.plotY), g = e !== p.yBottom, d = ja(d) + h, e = ja(e) + h, k = [], k.push("M", i - l, e, "L", i - l, d, "L", i + l, d, "L", i + l, e, "Z", "M", i, d, "L", i, f ? ja(p.plotY) : d, "M", i, e, "L", i, g ? ja(p.yBottom) : e), j ? j.attr(a).animate({
                        d: k
                    }) : p.graphic = n.renderer.path(k).attr(a).add(m.group).shadow(m.options.shadow))
                })
            }
        }), Ma.candlestick = cb;
        var Fb = db.prototype.symbols;
        bb.flags = d(bb.column, {
            fillColor: "white",
            lineWidth: 1,
            pointRange: 0,
            shape: "flag",
            stackDistance: 12,
            states: {
                hover: {
                    lineColor: "black",
                    fillColor: "#FCFFC5"
                }
            },
            style: {
                fontSize: "11px",
                fontWeight: "bold",
                textAlign: "center"
            },
            tooltip: {
                pointFormat: "{point.text}<br/>"
            },
            threshold: null,
            y: -30
        }), Ma.flags = p(Ma.column, {
            type: "flags",
            sorted: !1,
            noSharedTooltip: !0,
            allowDG: !1,
            takeOrdinalPosition: !1,
            trackerGroups: ["markerGroup"],
            forceCrop: !0,
            init: tb.prototype.init,
            pointAttrToOptions: {
                fill: "fillColor",
                stroke: "color",
                "stroke-width": "lineWidth",
                r: "radius"
            },
            translate: function() {
                Ma.column.prototype.translate.apply(this);
                var a, b, c = this.options,
                    d = this.chart,
                    e = this.points,
                    f = e.length - 1,
                    g = c.onSeries;
                a = g && d.get(g);
                var h, i, j, c = c.onKey || "y",
                    g = a && a.options.step,
                    k = a && a.points,
                    l = k && k.length,
                    m = this.xAxis,
                    n = m.getExtremes();
                if (a && a.visible && l)
                    for (a = a.currentDataGrouping, i = k[l - 1].x + (a ? a.totalRange : 0), e.sort(function(a, b) {
                            return a.x - b.x
                        }), c = "plot" + c[0].toUpperCase() + c.substr(1); l-- && e[f] && (a = e[f], h = k[l], !(h.x <= a.x && void 0 !== h[c] && (a.x <= i && (a.plotY = h[c], h.x < a.x && !g && (j = k[l + 1]) && j[c] !== K && (a.plotY += (a.x - h.x) / (j.x - h.x) * (j[c] - h[c]))), f--, l++, f < 0))););
                Pa(e, function(a, c) {
                    var f;
                    a.plotY === K && (a.x >= n.min && a.x <= n.max ? a.plotY = d.chartHeight - m.bottom - (m.opposite ? m.height : 0) + m.offset - d.plotTop : a.shapeArgs = {}), (b = e[c - 1]) && b.plotX === a.plotX && (b.stackIndex === K && (b.stackIndex = 0), f = b.stackIndex + 1), a.stackIndex = f
                })
            },
            drawPoints: function() {
                var a, b, c, e, f, g, h, i, j, k = this.pointAttr[""],
                    l = this.points,
                    m = this.chart,
                    n = m.renderer,
                    o = this.options,
                    p = o.y,
                    q = this.yAxis;
                for (f = l.length; f--;) g = l[f], a = g.plotX > this.xAxis.len, b = g.plotX, b > 0 && (b -= _a(g.lineWidth, o.lineWidth) % 2), h = g.stackIndex, e = g.options.shape || o.shape, c = g.plotY, c !== K && (c = g.plotY + p - (h !== K && h * o.stackDistance)), i = h ? K : g.plotX, j = h ? K : g.plotY, h = g.graphic, c !== K && b >= 0 && !a ? (a = g.pointAttr[g.selected ? "select" : ""] || k, h ? h.attr({
                    x: b,
                    y: c,
                    r: a.r,
                    anchorX: i,
                    anchorY: j
                }) : g.graphic = n.label(g.options.title || o.title || "A", b, c, e, i, j, o.useHTML).css(d(o.style, g.style)).attr(a).attr({
                    align: "flag" === e ? "left" : "center",
                    width: o.width,
                    height: o.height
                }).add(this.markerGroup).shadow(o.shadow), g.tooltipPos = m.inverted ? [q.len + q.pos - m.plotLeft - c, this.xAxis.len - b] : [b, c]) : h && (g.graphic = h.destroy())
            },
            drawTracker: function() {
                var a = this.points;
                wb.drawTrackerPoint.apply(this), Pa(a, function(b) {
                    var c = b.graphic;
                    c && Ta(c.element, "mouseover", function() {
                        b.stackIndex > 0 && !b.raised && (b._y = c.y, c.attr({
                            y: b._y - 8
                        }), b.raised = !0), Pa(a, function(a) {
                            a !== b && a.raised && a.graphic && (a.graphic.attr({
                                y: a._y
                            }), a.raised = !1)
                        })
                    })
                })
            },
            animate: Ga,
            buildKDTree: Ga,
            setClip: Ga
        }), Fb.flag = function(a, b, c, d, e) {
            return ["M", e && e.anchorX || a, e && e.anchorY || b, "L", a, b + d, a, b, a + c, b, a + c, b + d, a, b + d, "Z"]
        }, Pa(["circle", "square"], function(a) {
            Fb[a + "pin"] = function(b, c, d, e, f) {
                var g = f && f.anchorX,
                    f = f && f.anchorY;
                return "circle" === a && e > d && (b -= ja((e - d) / 2), d = e), b = Fb[a](b, c, d, e), g && f && b.push("M", g, c > f ? c : c + e, "L", g, f), b
            }
        }), L === ga.VMLRenderer && Pa(["flag", "circlepin", "squarepin"], function(a) {
            eb.prototype.symbols[a] = Fb[a]
        });
        var cb = [].concat(Db),
            Gb = function(a) {
                var b = Qa(arguments, function(a) {
                    return $a(a)
                });
                if (b.length) return Math[a].apply(0, b)
            };
        cb[4] = ["day", [1, 2, 3, 4]], cb[5] = ["week", [1, 2, 3]], Za(O, {
            navigator: {
                handles: {
                    backgroundColor: "#ebe7e8",
                    borderColor: "#b2b1b6"
                },
                height: 40,
                margin: 25,
                maskFill: "rgba(128,179,236,0.3)",
                maskInside: !0,
                outlineColor: "#b2b1b6",
                outlineWidth: 1,
                series: {
                    type: Ma.areaspline === K ? "line" : "areaspline",
                    color: "#4572A7",
                    compare: null,
                    fillOpacity: .05,
                    dataGrouping: {
                        approximation: "average",
                        enabled: !0,
                        groupPixelWidth: 2,
                        smoothed: !0,
                        units: cb
                    },
                    dataLabels: {
                        enabled: !1,
                        zIndex: 2
                    },
                    id: "highcharts-navigator-series",
                    lineColor: null,
                    lineWidth: 1,
                    marker: {
                        enabled: !1
                    },
                    pointRange: 0,
                    shadow: !1,
                    threshold: null
                },
                xAxis: {
                    tickWidth: 0,
                    lineWidth: 0,
                    gridLineColor: "#EEE",
                    gridLineWidth: 1,
                    tickPixelInterval: 200,
                    labels: {
                        align: "left",
                        style: {
                            color: "#888"
                        },
                        x: 3,
                        y: -4
                    },
                    crosshair: !1
                },
                yAxis: {
                    gridLineWidth: 0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: .1,
                    maxPadding: .1,
                    labels: {
                        enabled: !1
                    },
                    crosshair: !1,
                    title: {
                        text: null
                    },
                    tickWidth: 0
                }
            },
            scrollbar: {
                height: za ? 20 : 14,
                barBackgroundColor: "#bfc8d1",
                barBorderRadius: 0,
                barBorderWidth: 1,
                barBorderColor: "#bfc8d1",
                buttonArrowColor: "#666",
                buttonBackgroundColor: "#ebe7e8",
                buttonBorderColor: "#bbb",
                buttonBorderRadius: 0,
                buttonBorderWidth: 1,
                minWidth: 6,
                rifleColor: "#666",
                trackBackgroundColor: "#eeeeee",
                trackBorderColor: "#eeeeee",
                trackBorderWidth: 1,
                liveRedraw: Ba && !za
            }
        }), I.prototype = {
            drawHandle: function(a, b) {
                var c, d = this.chart.renderer,
                    e = this.elementsToDestroy,
                    f = this.handles,
                    g = this.navigatorOptions.handles,
                    g = {
                        fill: g.backgroundColor,
                        stroke: g.borderColor,
                        "stroke-width": 1
                    };
                this.rendered || (f[b] = d.g("navigator-handle-" + ["left", "right"][b]).css({
                    cursor: "ew-resize"
                }).attr({
                    zIndex: 10 - b
                }).add(), c = d.rect(-4.5, 0, 9, 16, 0, 1).attr(g).add(f[b]), e.push(c), c = d.path(["M", -1.5, 4, "L", -1.5, 12, "M", .5, 4, "L", .5, 12]).attr(g).add(f[b]), e.push(c)), f[b][this.rendered ? "animate" : "attr"]({
                    translateX: this.scrollerLeft + this.scrollbarHeight + parseInt(a, 10),
                    translateY: this.top + this.height / 2 - 8
                })
            },
            drawScrollbarButton: function(a) {
                var b, c = this.chart.renderer,
                    d = this.elementsToDestroy,
                    e = this.scrollbarButtons,
                    f = this.scrollbarHeight,
                    g = this.scrollbarOptions;
                this.rendered || (e[a] = c.g().add(this.scrollbarGroup), b = c.rect(-.5, -.5, f + 1, f + 1, g.buttonBorderRadius, g.buttonBorderWidth).attr({
                    stroke: g.buttonBorderColor,
                    "stroke-width": g.buttonBorderWidth,
                    fill: g.buttonBackgroundColor
                }).add(e[a]), d.push(b), b = c.path(["M", f / 2 + (a ? -1 : 1), f / 2 - 3, "L", f / 2 + (a ? -1 : 1), f / 2 + 3, f / 2 + (a ? 2 : -2), f / 2]).attr({
                    fill: g.buttonArrowColor
                }).add(e[a]), d.push(b)), a && e[a].attr({
                    translateX: this.scrollerWidth - f
                })
            },
            render: function(a, b, c, d) {
                var e, f, g, h, i = this.chart,
                    k = i.renderer,
                    l = this.scrollbarGroup,
                    m = this.navigatorGroup,
                    n = this.scrollbar,
                    m = this.xAxis,
                    o = this.scrollbarTrack,
                    p = this.scrollbarHeight,
                    q = this.scrollbarEnabled,
                    r = this.navigatorOptions,
                    s = this.scrollbarOptions,
                    t = s.minWidth,
                    u = this.height,
                    v = this.top,
                    w = this.navigatorEnabled,
                    x = r.outlineWidth,
                    y = x / 2,
                    z = 0,
                    A = this.outlineHeight,
                    B = s.barBorderRadius,
                    C = s.barBorderWidth,
                    D = v + y,
                    E = this.rendered;
                $a(a) && $a(b) && (!this.hasDragged || j(c)) && (this.navigatorLeft = e = _a(m.left, i.plotLeft + p), this.navigatorWidth = f = _a(m.len, i.plotWidth - 2 * p), this.scrollerLeft = g = e - p, this.scrollerWidth = h = h = f + 2 * p, c = _a(c, m.translate(a)), d = _a(d, m.translate(b)), $a(c) && oa(c) !== 1 / 0 || (c = 0, d = h), m.translate(d, !0) - m.translate(c, !0) < i.xAxis[0].minRange || (this.zoomedMax = na(ma(c, d, 0), f), this.zoomedMin = na(ma(this.fixedWidth ? this.zoomedMax - this.fixedWidth : na(c, d), 0), f), this.range = this.zoomedMax - this.zoomedMin, c = ja(this.zoomedMax), b = ja(this.zoomedMin), a = c - b, E || (w && (this.navigatorGroup = m = k.g("navigator").attr({
                    zIndex: 3
                }).add(), this.leftShade = k.rect().attr({
                    fill: r.maskFill
                }).add(m), r.maskInside ? this.leftShade.css({
                    cursor: "ew-resize"
                }) : this.rightShade = k.rect().attr({
                    fill: r.maskFill
                }).add(m), this.outline = k.path().attr({
                    "stroke-width": x,
                    stroke: r.outlineColor
                }).add(m)), q && (this.scrollbarGroup = l = k.g("scrollbar").add(), n = s.trackBorderWidth, this.scrollbarTrack = o = k.rect().attr({
                    x: 0,
                    y: -n % 2 / 2,
                    fill: s.trackBackgroundColor,
                    stroke: s.trackBorderColor,
                    "stroke-width": n,
                    r: s.trackBorderRadius || 0,
                    height: p
                }).add(l), this.scrollbar = n = k.rect().attr({
                    y: -C % 2 / 2,
                    height: p,
                    fill: s.barBackgroundColor,
                    stroke: s.barBorderColor,
                    "stroke-width": C,
                    r: B
                }).add(l), this.scrollbarRifles = k.path().attr({
                    stroke: s.rifleColor,
                    "stroke-width": 1
                }).add(l))), k = E ? "animate" : "attr", w && (this.leftShade[k](r.maskInside ? {
                    x: e + b,
                    y: v,
                    width: c - b,
                    height: u
                } : {
                    x: e,
                    y: v,
                    width: b,
                    height: u
                }), this.rightShade && this.rightShade[k]({
                    x: e + c,
                    y: v,
                    width: f - c,
                    height: u
                }), this.outline[k]({
                    d: ["M", g, D, "L", e + b - y, D, e + b - y, D + A, "L", e + c - y, D + A, "L", e + c - y, D, g + h, D].concat(r.maskInside ? ["M", e + b + y, D, "L", e + c - y, D] : [])
                }), this.drawHandle(b + y, 0), this.drawHandle(c + y, 1)), q && l && (this.drawScrollbarButton(0), this.drawScrollbarButton(1), l[k]({
                    translateX: g,
                    translateY: ja(D + u)
                }), o[k]({
                    width: h
                }), e = p + b, f = a - C, f < t && (z = (t - f) / 2, f = t, e -= z), this.scrollbarPad = z, n[k]({
                    x: ka(e) + C % 2 / 2,
                    width: f
                }), t = p + b + a / 2 - .5, this.scrollbarRifles.attr({
                    visibility: a > 12 ? "visible" : "hidden"
                })[k]({
                    d: ["M", t - 3, p / 4, "L", t - 3, 2 * p / 3, "M", t, p / 4, "L", t, 2 * p / 3, "M", t + 3, p / 4, "L", t + 3, 2 * p / 3]
                })), this.scrollbarPad = z, this.rendered = !0))
            },
            addEvents: function() {
                var a, b = this.chart,
                    c = b.container,
                    d = this.mouseDownHandler,
                    e = this.mouseMoveHandler,
                    f = this.mouseUpHandler;
                a = [
                    [c, "mousedown", d],
                    [c, "mousemove", e],
                    [ha, "mouseup", f]
                ], M && a.push([c, "touchstart", d], [c, "touchmove", e], [ha, "touchend", f]), Pa(a, function(a) {
                    Ta.apply(null, a)
                }), this._events = a, this.series && Ta(this.series.xAxis, "foundExtremes", function() {
                    b.scroller.modifyNavigatorAxisExtremes()
                }), Ta(b, "redraw", function() {
                    var a, b = this.scroller;
                    b && (a = b.baseSeries.xAxis) && b.render(a.min, a.max)
                })
            },
            removeEvents: function() {
                Pa(this._events, function(a) {
                    Ua.apply(null, a)
                }), this._events = K, this.navigatorEnabled && this.baseSeries && Ua(this.baseSeries, "updatedData", this.updatedDataHandler)
            },
            init: function() {
                var a, b, c, e = this,
                    f = e.chart,
                    g = e.scrollbarHeight,
                    h = e.navigatorOptions,
                    i = e.height,
                    k = e.top,
                    l = e.baseSeries;
                e.mouseDownHandler = function(b) {
                    var d, b = f.pointer.normalize(b),
                        g = e.zoomedMin,
                        h = e.zoomedMax,
                        j = e.top,
                        k = e.scrollbarHeight,
                        l = e.scrollerLeft,
                        m = e.scrollerWidth,
                        n = e.navigatorLeft,
                        o = e.navigatorWidth,
                        p = e.scrollbarPad,
                        q = e.range,
                        r = b.chartX,
                        s = b.chartY,
                        b = f.xAxis[0],
                        t = za ? 10 : 7;
                    s > j && s < j + i + k && ((j = !e.scrollbarEnabled || s < j + i) && ia.abs(r - g - n) < t ? (e.grabbedLeft = !0, e.otherHandlePos = h, e.fixedExtreme = b.max, f.fixedRange = null) : j && ia.abs(r - h - n) < t ? (e.grabbedRight = !0, e.otherHandlePos = g, e.fixedExtreme = b.min, f.fixedRange = null) : r > n + g - p && r < n + h + p ? (e.grabbedCenter = r, e.fixedWidth = q, c = r - g) : r > l && r < l + m && (h = j ? r - n - q / 2 : r < n ? g - .2 * q : r > l + m - k ? g + .2 * q : r < n + g ? g - q : h, h < 0 ? h = 0 : h + q >= o && (h = o - q, d = e.getUnionExtremes().dataMax), h !== g && (e.fixedWidth = q, g = a.toFixedRange(h, h + q, null, d), b.setExtremes(g.min, g.max, !0, !1, {
                        trigger: "navigator"
                    }))))
                }, e.mouseMoveHandler = function(a) {
                    var b, d, g = e.scrollbarHeight,
                        h = e.navigatorLeft,
                        i = e.navigatorWidth,
                        j = e.scrollerLeft,
                        k = e.scrollerWidth,
                        l = e.range;
                    a.touches && 0 === a.touches[0].pageX || (a = f.pointer.normalize(a), b = a.chartX, b < h ? b = h : b > j + k - g && (b = j + k - g), e.grabbedLeft ? (d = !0, e.render(0, 0, b - h, e.otherHandlePos)) : e.grabbedRight ? (d = !0, e.render(0, 0, e.otherHandlePos, b - h)) : e.grabbedCenter && (d = !0, b < c ? b = c : b > i + c - l && (b = i + c - l), e.render(0, 0, b - c, b - c + l)), d && e.scrollbarOptions.liveRedraw && setTimeout(function() {
                        e.mouseUpHandler(a)
                    }, 0), e.hasDragged = d)
                }, e.mouseUpHandler = function(b) {
                    var d, g;
                    e.hasDragged && (e.zoomedMin === e.otherHandlePos ? d = e.fixedExtreme : e.zoomedMax === e.otherHandlePos && (g = e.fixedExtreme), e.zoomedMax === e.navigatorWidth && (g = e.getUnionExtremes().dataMax), d = a.toFixedRange(e.zoomedMin, e.zoomedMax, d, g), j(d.min) && f.xAxis[0].setExtremes(d.min, d.max, !0, !1, {
                        trigger: "navigator",
                        triggerOp: "navigator-drag",
                        DOMEvent: b
                    })), "mousemove" !== b.type && (e.grabbedLeft = e.grabbedRight = e.grabbedCenter = e.fixedWidth = e.fixedExtreme = e.otherHandlePos = e.hasDragged = c = null)
                };
                var m = f.xAxis.length,
                    n = f.yAxis.length;
                f.extraBottomMargin = e.outlineHeight + h.margin, e.navigatorEnabled ? (e.xAxis = a = new hb(f, d({
                    breaks: l && l.xAxis.options.breaks,
                    ordinal: l && l.xAxis.options.ordinal
                }, h.xAxis, {
                    id: "navigator-x-axis",
                    isX: !0,
                    type: "datetime",
                    index: m,
                    height: i,
                    offset: 0,
                    offsetLeft: g,
                    offsetRight: -g,
                    keepOrdinalPadding: !0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    zoomEnabled: !1
                })), e.yAxis = b = new hb(f, d(h.yAxis, {
                    id: "navigator-y-axis",
                    alignTicks: !1,
                    height: i,
                    offset: 0,
                    index: n,
                    zoomEnabled: !1
                })), l || h.series.data ? e.addBaseSeries() : 0 === f.series.length && ab(f, "redraw", function(a, b) {
                    f.series.length > 0 && !e.series && (e.setBaseSeries(), f.redraw = a), a.call(f, b)
                })) : e.xAxis = a = {
                    translate: function(a, b) {
                        var c = f.xAxis[0],
                            d = c.getExtremes(),
                            e = f.plotWidth - 2 * g,
                            h = Gb("min", c.options.min, d.dataMin),
                            c = Gb("max", c.options.max, d.dataMax) - h;
                        return b ? a * c / e + h : e * (a - h) / c
                    },
                    toFixedRange: hb.prototype.toFixedRange
                }, l && l.xAxis && this.navigatorOptions.adaptToUpdatedData !== !1 && (Ta(l, "updatedData", this.updatedDataHandler), Ta(l.xAxis, "foundExtremes", function() {
                    l.xAxis && this.chart.scroller.modifyBaseAxisExtremes()
                }), l.userOptions.events = Za(l.userOptions.event, {
                    updatedData: this.updatedDataHandler
                })), ab(f, "getMargins", function(c) {
                    var d = this.legend,
                        f = d.options;
                    c.apply(this, [].slice.call(arguments, 1)), e.top = k = e.navigatorOptions.top || this.chartHeight - e.height - e.scrollbarHeight - this.spacing[2] - ("bottom" === f.verticalAlign && f.enabled && !f.floating ? d.legendHeight + _a(f.margin, 10) : 0), a && b && (a.options.top = b.options.top = k, a.setAxisSize(), b.setAxisSize())
                }), e.addEvents()
            },
            getUnionExtremes: function(a) {
                var b, c = this.chart.xAxis[0],
                    d = this.xAxis,
                    e = d.options,
                    f = c.options;
                return a && null === c.dataMin || (b = {
                    dataMin: _a(e && e.min, Gb("min", f.min, c.dataMin, d.dataMin, d.min)),
                    dataMax: _a(e && e.max, Gb("max", f.max, c.dataMax, d.dataMax, d.max))
                }), b
            },
            setBaseSeries: function(a) {
                var b = this.chart,
                    a = a || b.options.navigator.baseSeries;
                this.series && this.series.remove(), this.baseSeries = b.series[a] || "string" == typeof a && b.get(a) || b.series[0], this.xAxis && this.addBaseSeries()
            },
            addBaseSeries: function() {
                var a, b = this.baseSeries,
                    c = b ? b.options : {},
                    b = c.data,
                    e = this.navigatorOptions.series;
                a = e.data, this.hasNavigatorData = !!a, c = d(c, e, {
                    enableMouseTracking: !1,
                    group: "nav",
                    padXAxis: !1,
                    xAxis: "navigator-x-axis",
                    yAxis: "navigator-y-axis",
                    name: "Navigator",
                    showInLegend: !1,
                    stacking: !1,
                    isInternal: !0,
                    visible: !0
                }), c.data = a || b.slice(0), this.series = this.chart.initSeries(c)
            },
            modifyNavigatorAxisExtremes: function() {
                var a, b = this.xAxis;
                b.getExtremes && (a = this.getUnionExtremes(!0)) && (a.dataMin !== b.min || a.dataMax !== b.max) && (b.min = a.dataMin, b.max = a.dataMax)
            },
            modifyBaseAxisExtremes: function() {
                var a, b, c = this.baseSeries.xAxis,
                    d = c.getExtremes(),
                    e = d.dataMin,
                    f = d.dataMax,
                    d = d.max - d.min,
                    g = this.stickToMin,
                    h = this.stickToMax,
                    i = this.series,
                    j = !!c.setExtremes;
                g && (b = e, a = b + d), h && (a = f, g || (b = ma(a - d, i ? i.xData[0] : -Number.MAX_VALUE))), j && (g || h) && $a(b) && (c.min = c.userMin = b, c.max = c.userMax = a), this.stickToMin = this.stickToMax = null
            },
            updatedDataHandler: function() {
                var a = this.chart.scroller,
                    b = a.baseSeries,
                    c = a.series;
                a.stickToMin = b.xAxis.min <= b.xData[0], a.stickToMax = a.zoomedMax >= a.navigatorWidth, c && !a.hasNavigatorData && (c.options.pointStart = b.xData[0], c.setData(b.options.data, !1), c.graph && b.graph) && (c.graph.shift = b.graph.shift)
            },
            destroy: function() {
                this.removeEvents(), Pa([this.xAxis, this.yAxis, this.leftShade, this.rightShade, this.outline, this.scrollbarTrack, this.scrollbarRifles, this.scrollbarGroup, this.scrollbar], function(a) {
                    a && a.destroy && a.destroy()
                }), this.xAxis = this.yAxis = this.leftShade = this.rightShade = this.outline = this.scrollbarTrack = this.scrollbarRifles = this.scrollbarGroup = this.scrollbar = null, Pa([this.scrollbarButtons, this.handles, this.elementsToDestroy], function(a) {
                    y(a)
                })
            }
        }, ga.Scroller = I, ab(hb.prototype, "zoom", function(a, b, c) {
            var d, e = this.chart,
                f = e.options,
                g = f.chart.zoomType,
                h = f.navigator,
                f = f.rangeSelector;
            return this.isXAxis && (h && h.enabled || f && f.enabled) && ("x" === g ? e.resetZoomButton = "blocked" : "y" === g ? d = !1 : "xy" === g && (e = this.previousZoom, j(b) ? this.previousZoom = [this.min, this.max] : e && (b = e[0], c = e[1], delete this.previousZoom))), d !== K ? d : a.call(this, b, c)
        }), ab(qb.prototype, "init", function(a, b, c) {
            Ta(this, "beforeRender", function() {
                var a = this.options;
                (a.navigator.enabled || a.scrollbar.enabled) && (this.scroller = new I(this))
            }), a.call(this, b, c)
        }), ab(tb.prototype, "addPoint", function(a, c, d, e, f) {
            var i = this.options.turboThreshold;
            i && this.xData.length > i && g(c) && !h(c) && this.chart.scroller && b(20, !0), a.call(this, c, d, e, f)
        }), Za(O, {
            rangeSelector: {
                buttonTheme: {
                    width: 28,
                    height: 18,
                    fill: "#f7f7f7",
                    padding: 2,
                    r: 0,
                    "stroke-width": 0,
                    style: {
                        color: "#444",
                        cursor: "pointer",
                        fontWeight: "normal"
                    },
                    zIndex: 7,
                    states: {
                        hover: {
                            fill: "#e7e7e7"
                        },
                        select: {
                            fill: "#e7f0f9",
                            style: {
                                color: "black",
                                fontWeight: "bold"
                            }
                        }
                    }
                },
                height: 35,
                inputPosition: {
                    align: "right"
                },
                labelStyle: {
                    color: "#666"
                }
            }
        }), O.lang = d(O.lang, {
            rangeSelectorZoom: "Zoom",
            rangeSelectorFrom: "From",
            rangeSelectorTo: "To"
        }), J.prototype = {
            clickButton: function(a, b) {
                var c, d, e, f, g, h = this,
                    i = h.selected,
                    j = h.chart,
                    k = h.buttons,
                    l = h.buttonOptions[a],
                    m = j.xAxis[0],
                    n = j.scroller && j.scroller.getUnionExtremes() || m || {},
                    o = n.dataMin,
                    p = n.dataMax,
                    q = m && ja(na(m.max, _a(p, m.max))),
                    r = l.type,
                    n = l._range,
                    s = l.dataGrouping;
                if (null !== o && null !== p && a !== h.selected) {
                    if (j.fixedRange = n, s && (this.forcedDataGrouping = !0, hb.prototype.setDataGrouping.call(m || {
                            chart: this.chart
                        }, s, !1)), "month" === r || "year" === r) m ? (r = {
                        range: l,
                        max: q,
                        dataMin: o,
                        dataMax: p
                    }, c = m.minFromRange.call(r), $a(r.newMax) && (q = r.newMax)) : n = l;
                    else if (n) c = ma(q - n, o), q = na(c + n, p);
                    else if ("ytd" === r) {
                        if (!m) return void Ta(j, "beforeRender", function() {
                            h.clickButton(a)
                        });
                        p === K && (o = Number.MAX_VALUE, p = Number.MIN_VALUE, Pa(j.series, function(a) {
                            a = a.xData, o = na(a[0], o), p = ma(a[a.length - 1], p)
                        }), b = !1), q = new R(p), c = q.getFullYear(), c = e = ma(o || 0, R.UTC(c, 0, 1)), q = q.getTime(), q = na(p || q, q)
                    } else "all" === r && m && (c = o, q = p);
                    k[i] && k[i].setState(0), k[a] && (k[a].setState(2), h.lastSelected = a), m ? (m.setExtremes(c, q, _a(b, 1), 0, {
                        trigger: "rangeSelectorButton",
                        rangeSelectorButton: l
                    }), h.setSelected(a)) : (d = j.options.xAxis[0], g = d.range, d.range = n, f = d.min, d.min = e, h.setSelected(a), Ta(j, "load", function() {
                        d.range = g, d.min = f
                    }))
                }
            },
            setSelected: function(a) {
                this.selected = this.options.selected = a
            },
            defaultButtons: [{
                type: "month",
                count: 1,
                text: "1m"
            }, {
                type: "month",
                count: 3,
                text: "3m"
            }, {
                type: "month",
                count: 6,
                text: "6m"
            }, {
                type: "ytd",
                text: "YTD"
            }, {
                type: "year",
                count: 1,
                text: "1y"
            }, {
                type: "all",
                text: "All"
            }],
            init: function(a) {
                var b = this,
                    c = a.options.rangeSelector,
                    d = c.buttons || [].concat(b.defaultButtons),
                    e = c.selected,
                    f = b.blurInputs = function() {
                        var a = b.minInput,
                            c = b.maxInput;
                        a && a.blur && Va(a, "blur"), c && c.blur && Va(c, "blur")
                    };
                b.chart = a, b.options = c, b.buttons = [], a.extraTopMargin = c.height, b.buttonOptions = d, Ta(a.container, "mousedown", f), Ta(a, "resize", f), Pa(d, b.computeButtonRange), e !== K && d[e] && this.clickButton(e, !1), Ta(a, "load", function() {
                    Ta(a.xAxis[0], "setExtremes", function(c) {
                        this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger && b.forcedDataGrouping && this.setDataGrouping(!1, !1)
                    }), Ta(a.xAxis[0], "afterSetExtremes", function() {
                        b.updateButtonStates(!0)
                    })
                })
            },
            updateButtonStates: function(a) {
                var b = this,
                    c = this.chart,
                    d = c.xAxis[0],
                    e = c.scroller && c.scroller.getUnionExtremes() || d,
                    f = e.dataMin,
                    g = e.dataMax,
                    h = b.selected,
                    i = b.options.allButtonsEnabled,
                    j = b.buttons;
                a && c.fixedRange !== ja(d.max - d.min) && (j[h] && j[h].setState(0), b.setSelected(null)), Pa(b.buttonOptions, function(a, e) {
                    var k = ja(d.max - d.min),
                        l = a._range,
                        m = a.type,
                        n = a.count || 1,
                        o = l > g - f,
                        p = l < d.minRange,
                        q = "all" === a.type && d.max - d.min >= g - f && 2 !== j[e].state,
                        r = "ytd" === a.type && P("%Y", f) === P("%Y", g),
                        s = c.renderer.forExport && e === h,
                        l = l === k,
                        t = !d.hasVisibleSeries;
                    ("month" === m || "year" === m) && k >= 864e5 * {
                        month: 28,
                        year: 365
                    }[m] * n && k <= 864e5 * {
                        month: 31,
                        year: 366
                    }[m] * n && (l = !0), s || l && e !== h && e === b.lastSelected ? (b.setSelected(e), j[e].setState(2)) : !i && (o || p || q || r || t) ? j[e].setState(3) : 3 === j[e].state && j[e].setState(0)
                })
            },
            computeButtonRange: function(a) {
                var b = a.type,
                    c = a.count || 1,
                    d = {
                        millisecond: 1,
                        second: 1e3,
                        minute: 6e4,
                        hour: 36e5,
                        day: 864e5,
                        week: 6048e5
                    };
                d[b] ? a._range = d[b] * c : "month" !== b && "year" !== b || (a._range = 864e5 * {
                    month: 30,
                    year: 365
                }[b] * c)
            },
            setInputValue: function(a, b) {
                var c = this.chart.options.rangeSelector;
                j(b) && (this[a + "Input"].HCTime = b), this[a + "Input"].value = P(c.inputEditDateFormat || "%Y-%m-%d", this[a + "Input"].HCTime), this[a + "DateBox"].attr({
                    text: P(c.inputDateFormat || "%b %e, %Y", this[a + "Input"].HCTime)
                })
            },
            showInput: function(a) {
                var b = this.inputGroup,
                    c = this[a + "DateBox"];
                n(this[a + "Input"], {
                    left: b.translateX + c.x + "px",
                    top: b.translateY + "px",
                    width: c.width - 2 + "px",
                    height: c.height - 2 + "px",
                    border: "2px solid silver"
                })
            },
            hideInput: function(a) {
                n(this[a + "Input"], {
                    border: 0,
                    width: "1px",
                    height: "1px"
                }), this.setInputValue(a)
            },
            drawInput: function(a) {
                function b() {
                    var a = c.value,
                        b = (k.inputDateParser || R.parse)(a),
                        d = h.xAxis[0],
                        f = d.dataMin,
                        i = d.dataMax;
                    b !== c.previousValue && (c.previousValue = b, $a(b) || (b = a.split("-"), b = R.UTC(e(b[0]), e(b[1]) - 1, e(b[2]))), $a(b) && (O.global.useUTC || (b += 6e4 * (new R).getTimezoneOffset()), m ? b > g.maxInput.HCTime ? b = K : b < f && (b = f) : b < g.minInput.HCTime ? b = K : b > i && (b = i), b !== K && h.xAxis[0].setExtremes(m ? b : d.min, m ? d.max : b, K, K, {
                        trigger: "rangeSelectorInput"
                    })))
                }
                var c, f, g = this,
                    h = g.chart,
                    i = h.renderer.style,
                    j = h.renderer,
                    k = h.options.rangeSelector,
                    l = g.div,
                    m = "min" === a,
                    n = this.inputGroup;
                this[a + "Label"] = f = j.label(O.lang[m ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).attr({
                    padding: 2
                }).css(d(i, k.labelStyle)).add(n), n.offset += f.width + 5, this[a + "DateBox"] = j = j.label("", n.offset).attr({
                    padding: 2,
                    width: k.inputBoxWidth || 90,
                    height: k.inputBoxHeight || 17,
                    stroke: k.inputBoxBorderColor || "silver",
                    "stroke-width": 1
                }).css(d({
                    textAlign: "center",
                    color: "#444"
                }, i, k.inputStyle)).on("click", function() {
                    g.showInput(a), g[a + "Input"].focus()
                }).add(n), n.offset += j.width + (m ? 10 : 0), this[a + "Input"] = c = o("input", {
                    name: a,
                    className: "highcharts-range-selector",
                    type: "text"
                }, Za({
                    position: "absolute",
                    border: 0,
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    textAlign: "center",
                    fontSize: i.fontSize,
                    fontFamily: i.fontFamily,
                    left: "-9em",
                    top: h.plotTop + "px"
                }, k.inputStyle), l), c.onfocus = function() {
                    g.showInput(a)
                }, c.onblur = function() {
                    g.hideInput(a)
                }, c.onchange = b, c.onkeypress = function(a) {
                    13 === a.keyCode && b()
                }
            },
            getPosition: function() {
                var a = this.chart,
                    b = a.options.rangeSelector,
                    a = _a((b.buttonPosition || {}).y, a.plotTop - a.axisOffset[0] - b.height);
                return {
                    buttonTop: a,
                    inputTop: a - 10
                }
            },
            render: function(a, b) {
                var c, d = this,
                    e = d.chart,
                    f = e.renderer,
                    g = e.container,
                    h = e.options,
                    i = h.exporting && h.exporting.enabled !== !1 && h.navigation && h.navigation.buttonOptions,
                    k = h.rangeSelector,
                    l = d.buttons,
                    h = O.lang,
                    m = d.div,
                    m = d.inputGroup,
                    n = k.buttonTheme,
                    p = k.buttonPosition || {},
                    q = k.inputEnabled,
                    r = n && n.states,
                    s = e.plotLeft,
                    t = this.getPosition(),
                    u = d.group,
                    v = d.rendered;
                v || (d.group = u = f.g("range-selector-buttons").add(), d.zoomText = f.text(h.rangeSelectorZoom, _a(p.x, s), 15).css(k.labelStyle).add(u), c = _a(p.x, s) + d.zoomText.getBBox().width + 5, Pa(d.buttonOptions, function(a, b) {
                    l[b] = f.button(a.text, c, 0, function() {
                        d.clickButton(b), d.isActive = !0
                    }, n, r && r.hover, r && r.select, r && r.disabled).css({
                        textAlign: "center"
                    }).add(u), c += l[b].width + _a(k.buttonSpacing, 5), d.selected === b && l[b].setState(2)
                }), d.updateButtonStates(), q === !1) || (d.div = m = o("div", null, {
                    position: "relative",
                    height: 0,
                    zIndex: 1
                }), g.parentNode.insertBefore(m, g), d.inputGroup = m = f.g("input-group").add(), m.offset = 0, d.drawInput("min"), d.drawInput("max")), u[v ? "animate" : "attr"]({
                    translateY: t.buttonTop
                }), q !== !1 && (m.align(Za({
                    y: t.inputTop,
                    width: m.offset,
                    x: i && t.inputTop < (i.y || 0) + i.height - e.spacing[0] ? -40 : 0
                }, k.inputPosition), !0, e.spacingBox), j(q) || (e = u.getBBox(), m[m.translateX < e.x + e.width + 10 ? "hide" : "show"]()), d.setInputValue("min", a), d.setInputValue("max", b)), d.rendered = !0
            },
            destroy: function() {
                var a, b = this.minInput,
                    c = this.maxInput,
                    d = this.chart,
                    e = this.blurInputs;
                Ua(d.container, "mousedown", e), Ua(d, "resize", e), y(this.buttons), b && (b.onfocus = b.onblur = b.onchange = null), c && (c.onfocus = c.onblur = c.onchange = null);
                for (a in this) this[a] && "chart" !== a && (this[a].destroy ? this[a].destroy() : this[a].nodeType && z(this[a])), this[a] = null
            }
        }, hb.prototype.toFixedRange = function(a, b, c, d) {
            var e = this.chart && this.chart.fixedRange,
                a = _a(c, this.translate(a, !0)),
                b = _a(d, this.translate(b, !0)),
                c = e && (b - a) / e;
            return c > .7 && c < 1.3 && (d ? a = b - e : b = a + e), $a(a) || (a = b = void 0), {
                min: a,
                max: b
            }
        }, hb.prototype.minFromRange = function() {
            var a, b, c, d = this.range,
                e = {
                    month: "Month",
                    year: "FullYear"
                }[d.type],
                f = this.max,
                g = function(a, b) {
                    var c = new R(a);
                    return c["set" + e](c["get" + e]() + b), c.getTime() - a
                };
            return $a(d) ? (a = this.max - d, c = d) : a = f + g(f, -d.count), b = _a(this.dataMin, Number.MIN_VALUE), $a(a) || (a = b), a <= b && (a = b, void 0 === c && (c = g(a, d.count)), this.newMax = na(a + c, this.dataMax)), $a(f) || (a = void 0), a
        }, ab(qb.prototype, "init", function(a, b, c) {
            Ta(this, "init", function() {
                this.options.rangeSelector.enabled && (this.rangeSelector = new J(this))
            }), a.call(this, b, c)
        }), ga.RangeSelector = J, qb.prototype.callbacks.push(function(a) {
            function b() {
                d = a.xAxis[0].getExtremes(), $a(d.min) && f.render(d.min, d.max)
            }

            function c(a) {
                f.render(a.min, a.max)
            }
            var d, e = a.scroller,
                f = a.rangeSelector;
            e && (d = a.xAxis[0].getExtremes(), e.render(d.min, d.max)), f && (Ta(a.xAxis[0], "afterSetExtremes", c), Ta(a, "resize", b), b()), Ta(a, "destroy", function() {
                f && (Ua(a, "resize", b), Ua(a.xAxis[0], "afterSetExtremes", c))
            })
        }), ga.StockChart = ga.stockChart = function(a, b, c) {
            var e, g = f(a) || a.nodeName,
                h = arguments[g ? 1 : 0],
                i = h.series,
                j = _a(h.navigator && h.navigator.enabled, !0) ? {
                    startOnTick: !1,
                    endOnTick: !1
                } : null,
                k = {
                    marker: {
                        enabled: !1,
                        radius: 2
                    }
                },
                m = {
                    shadow: !1,
                    borderWidth: 0
                };
            return h.xAxis = Sa(l(h.xAxis || {}), function(a) {
                return d({
                    minPadding: 0,
                    maxPadding: 0,
                    ordinal: !0,
                    title: {
                        text: null
                    },
                    labels: {
                        overflow: "justify"
                    },
                    showLastLabel: !0
                }, a, {
                    type: "datetime",
                    categories: null
                }, j)
            }), h.yAxis = Sa(l(h.yAxis || {}), function(a) {
                return e = _a(a.opposite, !0), d({
                    labels: {
                        y: -2
                    },
                    opposite: e,
                    showLastLabel: !1,
                    title: {
                        text: null
                    }
                }, a)
            }), h.series = null, h = d({
                chart: {
                    panning: !0,
                    pinchType: "x"
                },
                navigator: {
                    enabled: !0
                },
                scrollbar: {
                    enabled: !0
                },
                rangeSelector: {
                    enabled: !0
                },
                title: {
                    text: null,
                    style: {
                        fontSize: "16px"
                    }
                },
                tooltip: {
                    shared: !0,
                    crosshairs: !0
                },
                legend: {
                    enabled: !1
                },
                plotOptions: {
                    line: k,
                    spline: k,
                    area: k,
                    areaspline: k,
                    arearange: k,
                    areasplinerange: k,
                    column: m,
                    columnrange: m,
                    candlestick: m,
                    ohlc: m
                }
            }, h, {
                _stock: !0,
                chart: {
                    inverted: !1
                }
            }), h.series = i, g ? new qb(a, h, c) : new qb(h, b)
        }, ab(kb.prototype, "init", function(a, b, c) {
            var d = c.chart.pinchType || "";
            a.call(this, b, c), this.pinchX = this.pinchHor = d.indexOf("x") !== -1, this.pinchY = this.pinchVert = d.indexOf("y") !== -1, this.hasZoom = this.hasZoom || this.pinchHor || this.pinchVert
        }), ab(hb.prototype, "autoLabelAlign", function(a) {
            var b = this.chart,
                c = this.options,
                b = b._labelPanes = b._labelPanes || {},
                d = this.options.labels;
            return this.chart.options._stock && "yAxis" === this.coll && (c = c.top + "," + c.height, !b[c] && d.enabled) ? (15 === d.x && (d.x = 0), void 0 === d.align && (d.align = "right"), b[c] = 1, "right") : a.call(this, [].slice.call(arguments, 1))
        }), ab(hb.prototype, "getPlotLinePath", function(a, b, c, d, e, f) {
            var g, h, i, k, l, m, n = this,
                o = this.isLinked && !this.series ? this.linkedParent.series : this.series,
                p = n.chart,
                q = p.renderer,
                r = n.left,
                s = n.top,
                t = [],
                u = [];
            return "colorAxis" === n.coll ? a.apply(this, [].slice.call(arguments, 1)) : (u = n.isXAxis ? j(n.options.yAxis) ? [p.yAxis[n.options.yAxis]] : Sa(o, function(a) {
                return a.yAxis
            }) : j(n.options.xAxis) ? [p.xAxis[n.options.xAxis]] : Sa(o, function(a) {
                return a.xAxis
            }), Pa(n.isXAxis ? p.yAxis : p.xAxis, function(a) {
                if (j(a.options.id) ? a.options.id.indexOf("navigator") === -1 : 1) {
                    var b = a.isXAxis ? "yAxis" : "xAxis",
                        b = j(a.options[b]) ? p[b][a.options[b]] : p[b][0];
                    n === b && u.push(a)
                }
            }), l = u.length ? [] : [n.isXAxis ? p.yAxis[0] : p.xAxis[0]], Pa(u, function(a) {
                Oa(a, l) === -1 && l.push(a)
            }), m = _a(f, n.translate(b, null, null, d)), $a(m) && (n.horiz ? Pa(l, function(a) {
                var b;
                h = a.pos, k = h + a.len, g = i = ja(m + n.transB), (g < r || g > r + n.width) && (e ? g = i = na(ma(r, g), r + n.width) : b = !0), b || t.push("M", g, h, "L", i, k)
            }) : Pa(l, function(a) {
                var b;
                g = a.pos, i = g + a.len, h = k = ja(s + n.height - m), (h < s || h > s + n.height) && (e ? h = k = na(ma(s, h), n.top + n.height) : b = !0), b || t.push("M", g, h, "L", i, k)
            })), t.length > 0 ? q.crispPolyLine(t, c || 1) : null)
        }), hb.prototype.getPlotBandPath = function(a, b) {
            var c, d = this.getPlotLinePath(b, null, null, !0),
                e = this.getPlotLinePath(a, null, null, !0),
                f = [];
            if (e && d && e.toString() !== d.toString())
                for (c = 0; c < e.length; c += 6) f.push("M", e[c + 1], e[c + 2], "L", e[c + 4], e[c + 5], d[c + 4], d[c + 5], d[c + 1], d[c + 2]);
            else f = null;
            return f
        }, db.prototype.crispPolyLine = function(a, b) {
            var c;
            for (c = 0; c < a.length; c += 6) a[c + 1] === a[c + 4] && (a[c + 1] = a[c + 4] = ja(a[c + 1]) - b % 2 / 2), a[c + 2] === a[c + 5] && (a[c + 2] = a[c + 5] = ja(a[c + 2]) + b % 2 / 2);
            return a
        }, L === ga.VMLRenderer && (eb.prototype.crispPolyLine = db.prototype.crispPolyLine), ab(hb.prototype, "hideCrosshair", function(a, b) {
            a.call(this, b), this.crossLabel && (this.crossLabel = this.crossLabel.hide())
        }), ab(hb.prototype, "drawCrosshair", function(a, b, c) {
            var d, e;
            if (a.call(this, b, c), j(this.crosshair.label) && this.crosshair.label.enabled) {
                var f, a = this.chart,
                    g = this.options.crosshair.label,
                    h = this.horiz,
                    i = this.opposite,
                    k = this.left,
                    l = this.top,
                    m = this.crossLabel,
                    n = g.format,
                    o = "",
                    p = "inside" === this.options.tickPosition,
                    q = this.crosshair.snap !== !1;
                f = h ? "center" : i ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center", m || (m = this.crossLabel = a.renderer.label(null, null, null, g.shape || "callout").attr({
                    align: g.align || f,
                    zIndex: 12,
                    fill: g.backgroundColor || this.series[0] && this.series[0].color || "gray",
                    padding: _a(g.padding, 8),
                    stroke: g.borderColor || "",
                    "stroke-width": g.borderWidth || 0,
                    r: _a(g.borderRadius, 3)
                }).css(Za({
                    color: "white",
                    fontWeight: "normal",
                    fontSize: "11px",
                    textAlign: "center"
                }, g.style)).add()), h ? (f = q ? c.plotX + k : b.chartX, l += i ? 0 : this.height) : (f = i ? this.width + k : 0, l = q ? c.plotY + l : b.chartY), !n && !g.formatter && (this.isDatetimeAxis && (o = "%b %d, %Y"), n = "{value" + (o ? ":" + o : "") + "}"), b = q ? c[this.isXAxis ? "x" : "y"] : this.toValue(h ? b.chartX : b.chartY), m.attr({
                    text: n ? s(n, {
                        value: b
                    }) : g.formatter.call(this, b),
                    anchorX: h ? f : this.opposite ? 0 : a.chartWidth,
                    anchorY: h ? this.opposite ? a.chartHeight : 0 : l,
                    x: f,
                    y: l,
                    visibility: "visible"
                }), b = m.getBBox(), h ? (p && !i || !p && i) && (l = m.y - b.height) : l = m.y - b.height / 2, h ? (d = k - b.x, e = k + this.width - b.x) : (d = "left" === this.labelAlign ? k : 0, e = "right" === this.labelAlign ? k + this.width : a.chartWidth), m.translateX < d && (f += d - m.translateX), m.translateX + b.width >= e && (f -= m.translateX + b.width - e), m.attr({
                    x: f,
                    y: l,
                    visibility: "visible"
                })
            }
        });
        var Hb = xb.init,
            Ib = xb.processData,
            Jb = sb.prototype.tooltipFormatter;
        return xb.init = function() {
            Hb.apply(this, arguments), this.setCompare(this.options.compare)
        }, xb.setCompare = function(a) {
            this.modifyValue = "value" === a || "percent" === a ? function(b, c) {
                var d = this.compareValue;
                return b !== K && (b = "value" === a ? b - d : b = 100 * (b / d) - 100, c) && (c.change = b), b
            } : null, this.chart.hasRendered && (this.isDirty = !0)
        }, xb.processData = function() {
            var a, b, c, d, e, f = -1;
            if (Ib.apply(this, arguments), this.xAxis && this.processedYData)
                for (b = this.processedXData, c = this.processedYData, d = c.length, this.pointArrayMap && (f = Oa(this.pointValKey || "y", this.pointArrayMap)), a = 0; a < d; a++)
                    if (e = f > -1 ? c[a][f] : c[a], $a(e) && b[a] >= this.xAxis.min && 0 !== e) {
                        this.compareValue = e;
                        break
                    }
        }, ab(xb, "getExtremes", function(a) {
            var b;
            a.apply(this, [].slice.call(arguments, 1)), this.modifyValue && (b = [this.modifyValue(this.dataMin), this.modifyValue(this.dataMax)], this.dataMin = w(b), this.dataMax = x(b))
        }), hb.prototype.setCompare = function(a, b) {
            this.isXAxis || (Pa(this.series, function(b) {
                b.setCompare(a)
            }), _a(b, !0) && this.chart.redraw())
        }, sb.prototype.tooltipFormatter = function(a) {
            return a = a.replace("{point.change}", (this.change > 0 ? "+" : "") + ga.numberFormat(this.change, _a(this.series.tooltipOptions.changeDecimals, 2))), Jb.apply(this, [a])
        }, ab(tb.prototype, "render", function(a) {
            this.chart.options._stock && this.xAxis && (!this.clipBox && this.animate ? (this.clipBox = d(this.chart.clipBox), this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len) : this.chart[this.sharedClipKey] && (Xa(this.chart[this.sharedClipKey]), this.chart[this.sharedClipKey].attr({
                width: this.xAxis.len,
                height: this.yAxis.len
            }))), a.call(this)
        }), Za(ga, {
            Color: E,
            Point: sb,
            Tick: G,
            Renderer: L,
            SVGElement: F,
            SVGRenderer: db,
            arrayMin: w,
            arrayMax: x,
            charts: Ha,
            correctFloat: A,
            dateFormat: P,
            error: b,
            format: s,
            pathAnim: void 0,
            getOptions: function() {
                return O
            },
            hasBidiBug: Ca,
            isTouchDevice: za,
            setOptions: function(a) {
                return O = d(!0, O, a), D(), O
            },
            addEvent: Ta,
            removeEvent: Ua,
            createElement: o,
            discardElement: z,
            css: n,
            each: Pa,
            map: Sa,
            merge: d,
            splat: l,
            stableSort: v,
            extendClass: p,
            pInt: e,
            svg: Ba,
            canvas: Da,
            vml: !Ba && !Da,
            product: "Highstock",
            version: "4.2.5"
        }), ga
    }),



    function(a) {
        "object" == typeof module && module.exports ? module.exports = a : a(Highcharts)
    }

    (function(a) {
        var b, c = a.win.document,
            d = a.each,
            e = a.pick,
            f = a.inArray,
            g = a.isNumber,
            h = a.splat,
            i = function(a, b) {
                this.init(a, b)
            };
        a.extend(i.prototype, {
            init: function(a, b) {
                this.options = a, this.chartOptions = b, this.columns = a.columns || this.rowsToColumns(a.rows) || [], this.firstRowAsNames = e(a.firstRowAsNames, !0), this.decimalRegex = a.decimalPoint && RegExp("^(-?[0-9]+)" + a.decimalPoint + "([0-9]+)$"), this.rawColumns = [], this.columns.length ? this.dataFound() : (this.parseCSV(), this.parseTable(), this.parseGoogleSpreadsheet())
            },
            getColumnDistribution: function() {
                var c, e = this.chartOptions,
                    f = this.options,
                    g = [],
                    h = function(b) {
                        return (a.seriesTypes[b || "line"].prototype.pointArrayMap || [0]).length
                    },
                    i = e && e.chart && e.chart.type,
                    j = [],
                    k = [],
                    l = 0;
                d(e && e.series || [], function(a) {
                    j.push(h(a.type || i))
                }), d(f && f.seriesMapping || [], function(a) {
                    g.push(a.x || 0)
                }), 0 === g.length && g.push(0), d(f && f.seriesMapping || [], function(d) {
                    var f, g = new b,
                        m = j[l] || h(i),
                        n = a.seriesTypes[((e && e.series || [])[l] || {}).type || i || "line"].prototype.pointArrayMap || ["y"];
                    g.addColumnReader(d.x, "x");
                    for (f in d) d.hasOwnProperty(f) && "x" !== f && g.addColumnReader(d[f], f);
                    for (c = 0; c < m; c++) g.hasReader(n[c]) || g.addColumnReader(void 0, n[c]);
                    k.push(g), l++
                }), f = a.seriesTypes[i || "line"].prototype.pointArrayMap, void 0 === f && (f = ["y"]), this.valueCount = {
                    global: h(i),
                    xColumns: g,
                    individual: j,
                    seriesBuilders: k,
                    globalPointArrayMap: f
                }
            },
            dataFound: function() {
                this.options.switchRowsAndColumns && (this.columns = this.rowsToColumns(this.columns)), this.getColumnDistribution(), this.parseTypes(), this.parsed() !== !1 && this.complete()
            },
            parseCSV: function() {
                var a, b, c = this,
                    e = this.options,
                    f = e.csv,
                    g = this.columns,
                    h = e.startRow || 0,
                    i = e.endRow || Number.MAX_VALUE,
                    j = e.startColumn || 0,
                    k = e.endColumn || Number.MAX_VALUE,
                    l = 0;
                f && (b = f.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split(e.lineDelimiter || "\n"), a = e.itemDelimiter || (f.indexOf("\t") !== -1 ? "\t" : ","), d(b, function(b, e) {
                    var f = c.trim(b),
                        m = 0 === f.indexOf("#");
                    e >= h && e <= i && !m && "" !== f && (f = b.split(a), d(f, function(a, b) {
                        b >= j && b <= k && (g[b - j] || (g[b - j] = []), g[b - j][l] = a)
                    }), l += 1)
                }), this.dataFound())
            },
            parseTable: function() {
                var a = this.options,
                    b = a.table,
                    e = this.columns,
                    f = a.startRow || 0,
                    g = a.endRow || Number.MAX_VALUE,
                    h = a.startColumn || 0,
                    i = a.endColumn || Number.MAX_VALUE;
                b && ("string" == typeof b && (b = c.getElementById(b)), d(b.getElementsByTagName("tr"), function(a, b) {
                    b >= f && b <= g && d(a.children, function(a, c) {
                        ("TD" === a.tagName || "TH" === a.tagName) && c >= h && c <= i && (e[c - h] || (e[c - h] = []), e[c - h][b - f] = a.innerHTML)
                    })
                }), this.dataFound())
            },
            parseGoogleSpreadsheet: function() {
                var a, b, c = this,
                    d = this.options,
                    e = d.googleSpreadsheetKey,
                    f = this.columns,
                    g = d.startRow || 0,
                    h = d.endRow || Number.MAX_VALUE,
                    i = d.startColumn || 0,
                    j = d.endColumn || Number.MAX_VALUE;
                e && jQuery.ajax({
                    dataType: "json",
                    url: "https://spreadsheets.google.com/feeds/cells/" + e + "/" + (d.googleSpreadsheetWorksheet || "od6") + "/public/values?alt=json-in-script&callback=?",
                    error: d.error,
                    success: function(d) {
                        var e, k, d = d.feed.entry,
                            l = d.length,
                            m = 0,
                            n = 0;
                        for (k = 0; k < l; k++) e = d[k], m = Math.max(m, e.gs$cell.col), n = Math.max(n, e.gs$cell.row);
                        for (k = 0; k < m; k++) k >= i && k <= j && (f[k - i] = [], f[k - i].length = Math.min(n, h - g));
                        for (k = 0; k < l; k++) e = d[k], a = e.gs$cell.row - 1, b = e.gs$cell.col - 1, b >= i && b <= j && a >= g && a <= h && (f[b - i][a - g] = e.content.$t);
                        c.dataFound()
                    }
                })
            },
            trim: function(a, b) {
                return "string" == typeof a && (a = a.replace(/^\s+|\s+$/g, ""), b && /^[0-9\s]+$/.test(a) && (a = a.replace(/\s/g, "")), this.decimalRegex && (a = a.replace(this.decimalRegex, "$1.$2"))), a
            },
            parseTypes: function() {
                for (var a = this.columns, b = a.length; b--;) this.parseColumn(a[b], b)
            },
            parseColumn: function(a, b) {
                var c, d, e, i, j, k = this.rawColumns,
                    l = this.columns,
                    m = a.length,
                    n = this.firstRowAsNames,
                    o = f(b, this.valueCount.xColumns) !== -1,
                    p = [],
                    q = this.chartOptions,
                    r = (this.options.columnTypes || [])[b],
                    q = o && (q && q.xAxis && "category" === h(q.xAxis)[0].type || "string" === r);
                for (k[b] || (k[b] = []); m--;) c = p[m] || a[m], e = this.trim(c), i = this.trim(c, !0), d = parseFloat(i), void 0 === k[b][m] && (k[b][m] = e), q || 0 === m && n ? a[m] = e : +i === d ? (a[m] = d, d > 31536e6 && "float" !== r ? a.isDatetime = !0 : a.isNumeric = !0, void 0 !== a[m + 1] && (j = d > a[m + 1])) : (d = this.parseDate(c), o && g(d) && "float" !== r ? (p[m] = c, a[m] = d, a.isDatetime = !0, void 0 !== a[m + 1] && (c = d > a[m + 1], c !== j && void 0 !== j && (this.alternativeFormat ? (this.dateFormat = this.alternativeFormat, m = a.length, this.alternativeFormat = this.dateFormats[this.dateFormat].alternative) : a.unsorted = !0), j = c)) : (a[m] = "" === e ? null : e, 0 !== m && (a.isDatetime || a.isNumeric) && (a.mixed = !0)));
                if (o && a.mixed && (l[b] = k[b]), o && j && this.options.sort)
                    for (b = 0; b < l.length; b++) l[b].reverse(), n && l[b].unshift(l[b].pop())
            },
            dateFormats: {
                "YYYY-mm-dd": {
                    regex: /^([0-9]{4})[\-\/\.]([0-9]{2})[\-\/\.]([0-9]{2})$/,
                    parser: function(a) {
                        return Date.UTC(+a[1], a[2] - 1, +a[3])
                    }
                },
                "dd/mm/YYYY": {
                    regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,
                    parser: function(a) {
                        return Date.UTC(+a[3], a[2] - 1, +a[1])
                    },
                    alternative: "mm/dd/YYYY"
                },
                "mm/dd/YYYY": {
                    regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,
                    parser: function(a) {
                        return Date.UTC(+a[3], a[1] - 1, +a[2])
                    }
                },
                "dd/mm/YY": {
                    regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/,
                    parser: function(a) {
                        return Date.UTC(+a[3] + 2e3, a[2] - 1, +a[1])
                    },
                    alternative: "mm/dd/YY"
                },
                "mm/dd/YY": {
                    regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/,
                    parser: function(a) {
                        return Date.UTC(+a[3] + 2e3, a[1] - 1, +a[2])
                    }
                }
            },
            parseDate: function(a) {
                var b, c, d, e = this.options.parseDate,
                    f = this.options.dateFormat || this.dateFormat;
                if (e) b = e(a);
                else if ("string" == typeof a) {
                    if (f) e = this.dateFormats[f], (d = a.match(e.regex)) && (b = e.parser(d));
                    else
                        for (c in this.dateFormats)
                            if (e = this.dateFormats[c], d = a.match(e.regex)) {
                                this.dateFormat = c, this.alternativeFormat = e.alternative, b = e.parser(d);
                                break
                            }
                    d || (d = Date.parse(a), "object" == typeof d && null !== d && d.getTime ? b = d.getTime() - 6e4 * d.getTimezoneOffset() : g(d) && (b = d - 6e4 * new Date(d).getTimezoneOffset()))
                }
                return b
            },
            rowsToColumns: function(a) {
                var b, c, d, e, f;
                if (a)
                    for (f = [], c = a.length, b = 0; b < c; b++)
                        for (e = a[b].length, d = 0; d < e; d++) f[d] || (f[d] = []), f[d][b] = a[b][d];
                return f
            },
            parsed: function() {
                if (this.options.parsed) return this.options.parsed.call(this, this.columns)
            },
            getFreeIndexes: function(a, b) {
                var c, d, e, f = [],
                    g = [];
                for (d = 0; d < a; d += 1) f.push(!0);
                for (c = 0; c < b.length; c += 1)
                    for (e = b[c].getReferencedColumnIndexes(), d = 0; d < e.length; d += 1) f[e[d]] = !1;
                for (d = 0; d < f.length; d += 1) f[d] && g.push(d);
                return g
            },
            complete: function() {
                var a, c, d, e, g, h, i = this.columns,
                    j = this.options,
                    k = [];
                if (j.complete || j.afterComplete) {
                    for (e = 0; e < i.length; e++) this.firstRowAsNames && (i[e].name = i[e].shift());
                    for (c = [], d = this.getFreeIndexes(i.length, this.valueCount.seriesBuilders), e = 0; e < this.valueCount.seriesBuilders.length; e++) h = this.valueCount.seriesBuilders[e], h.populateColumns(d) && k.push(h);
                    for (; d.length > 0;) {
                        for (h = new b, h.addColumnReader(0, "x"), e = f(0, d), e !== -1 && d.splice(e, 1), e = 0; e < this.valueCount.global; e++) h.addColumnReader(void 0, this.valueCount.globalPointArrayMap[e]);
                        h.populateColumns(d) && k.push(h)
                    }
                    if (k.length > 0 && k[0].readers.length > 0 && (h = i[k[0].readers[0].columnIndex], void 0 !== h && (h.isDatetime ? a = "datetime" : h.isNumeric || (a = "category"))), "category" === a)
                        for (e = 0; e < k.length; e++)
                            for (h = k[e], d = 0; d < h.readers.length; d++) "x" === h.readers[d].configName && (h.readers[d].configName = "name");
                    for (e = 0; e < k.length; e++) {
                        for (h = k[e], d = [], g = 0; g < i[0].length; g++) d[g] = h.read(i, g);
                        c[e] = {
                            data: d
                        }, h.name && (c[e].name = h.name), "category" === a && (c[e].turboThreshold = 0)
                    }
                    i = {
                        series: c
                    }, a && (i.xAxis = {
                        type: a
                    }), j.complete && j.complete(i), j.afterComplete && j.afterComplete(i)
                }
            }
        }), a.Data = i, a.data = function(a, b) {
            return new i(a, b)
        }, a.wrap(a.Chart.prototype, "init", function(b, c, d) {
            var e = this;
            c && c.data ? a.data(a.extend(c.data, {
                afterComplete: function(f) {
                    var g, h;
                    if (c.hasOwnProperty("series"))
                        if ("object" == typeof c.series)
                            for (g = Math.max(c.series.length, f.series.length); g--;) h = c.series[g] || {}, c.series[g] = a.merge(h, f.series[g]);
                        else delete c.series;
                    c = a.merge(f, c), b.call(e, c, d)
                }
            }), c) : b.call(e, c, d)
        }), b = function() {
            this.readers = [], this.pointIsArray = !0
        }, b.prototype.populateColumns = function(a) {
            var b = !0;
            return d(this.readers, function(b) {
                void 0 === b.columnIndex && (b.columnIndex = a.shift())
            }), d(this.readers, function(a) {
                void 0 === a.columnIndex && (b = !1)
            }), b
        }, b.prototype.read = function(a, b) {
            var c, e = this.pointIsArray,
                f = e ? [] : {};
            return d(this.readers, function(c) {
                var d = a[c.columnIndex][b];
                e ? f.push(d) : f[c.configName] = d
            }), void 0 === this.name && this.readers.length >= 2 && (c = this.getReferencedColumnIndexes(), c.length >= 2) && (c.shift(), c.sort(), this.name = a[c.shift()].name), f
        }, b.prototype.addColumnReader = function(a, b) {
            this.readers.push({
                columnIndex: a,
                configName: b
            }), "x" !== b && "y" !== b && void 0 !== b && (this.pointIsArray = !1)
        }, b.prototype.getReferencedColumnIndexes = function() {
            var a, b, c = [];
            for (a = 0; a < this.readers.length; a += 1) b = this.readers[a], void 0 !== b.columnIndex && c.push(b.columnIndex);
            return c
        }, b.prototype.hasReader = function(a) {
            var b, c;
            for (b = 0; b < this.readers.length; b += 1)
                if (c = this.readers[b], c.configName === a) return !0
        }
    }),



    function(a) {
        "object" == typeof module && module.exports ? module.exports = a : a(Highcharts)
    }

    (function(a) {
        var b, c = a.win,
            d = c.document,
            e = a.Chart,
            f = a.addEvent,
            g = a.removeEvent,
            h = a.fireEvent,
            i = a.createElement,
            j = a.discardElement,
            k = a.css,
            l = a.merge,
            m = a.each,
            n = a.extend,
            o = a.splat,
            p = Math.max,
            q = a.isTouchDevice,
            r = a.Renderer.prototype.symbols,
            s = a.getOptions();
        n(s.lang, {
            printChart: "Print chart",
            downloadPNG: "Download PNG image",
            downloadJPEG: "Download JPEG image",
            downloadPDF: "Download PDF document",
            downloadSVG: "Download SVG vector image",
            contextButtonTitle: "Chart context menu"
        }), s.navigation = {
            menuStyle: {
                border: "1px solid #A0A0A0",
                background: "#FFFFFF",
                padding: "5px 0"
            },
            menuItemStyle: {
                padding: "0 10px",
                background: "none",
                color: "#303030",
                fontSize: q ? "14px" : "11px"
            },
            menuItemHoverStyle: {
                background: "#4572A5",
                color: "#FFFFFF"
            },
            buttonOptions: {
                symbolFill: "#E0E0E0",
                symbolSize: 14,
                symbolStroke: "#666",
                symbolStrokeWidth: 3,
                symbolX: 12.5,
                symbolY: 10.5,
                align: "right",
                buttonSpacing: 3,
                height: 22,
                theme: {
                    fill: "white",
                    stroke: "none"
                },
                verticalAlign: "top",
                width: 24
            }
        }, s.exporting = {
            type: "image/png",
            url: "https://export.highcharts.com/",
            printMaxWidth: 780,
            buttons: {
                contextButton: {
                    menuClassName: "highcharts-contextmenu",
                    symbol: "menu",
                    _titleKey: "contextButtonTitle",
                    menuItems: [{
                        textKey: "printChart",
                        onclick: function() {
                            this.print()
                        }
                    }, {
                        separator: !0
                    }, {
                        textKey: "downloadPNG",
                        onclick: function() {
                            this.exportChart()
                        }
                    }, {
                        textKey: "downloadJPEG",
                        onclick: function() {
                            this.exportChart({
                                type: "image/jpeg"
                            })
                        }
                    }, {
                        textKey: "downloadPDF",
                        onclick: function() {
                            this.exportChart({
                                type: "application/pdf"
                            })
                        }
                    }, {
                        textKey: "downloadSVG",
                        onclick: function() {
                            this.exportChart({
                                type: "image/svg+xml"
                            })
                        }
                    }]
                }
            }
        }, a.post = function(a, b, c) {
            var e, a = i("form", l({
                method: "post",
                action: a,
                enctype: "multipart/form-data"
            }, c), {
                display: "none"
            }, d.body);
            for (e in b) i("input", {
                type: "hidden",
                name: e,
                value: b[e]
            }, null, a);
            a.submit(), j(a)
        }, n(e.prototype, {
            sanitizeSVG: function(a) {
                return a.replace(/zIndex="[^"]+"/g, "").replace(/isShadow="[^"]+"/g, "").replace(/symbolName="[^"]+"/g, "").replace(/jQuery[0-9]+="[^"]+"/g, "").replace(/url\([^#]+#/g, "url(#").replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g, " xlink:href=").replace(/\n/, " ").replace(/<\/svg>.*?$/, "</svg>").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g, '$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g, " ").replace(/&shy;/g, "­").replace(/<IMG /g, "<image ").replace(/<(\/?)TITLE>/g, "<$1title>").replace(/height=([^" ]+)/g, 'height="$1"').replace(/width=([^" ]+)/g, 'width="$1"').replace(/hc-svg-href="([^"]+)">/g, 'xlink:href="$1"/>').replace(/ id=([^" >]+)/g, ' id="$1"').replace(/class=([^" >]+)/g, 'class="$1"').replace(/ transform /g, " ").replace(/:(path|rect)/g, "$1").replace(/style="([^"]+)"/g, function(a) {
                    return a.toLowerCase()
                })
            },
            getChartHTML: function() {
                return this.container.innerHTML
            },
            getSVG: function(b) {
                var c, e, f, g, h, k = this,
                    p = l(k.options, b),
                    q = p.exporting.allowHTML;
                return d.createElementNS || (d.createElementNS = function(a, b) {
                    return d.createElement(b)
                }), e = i("div", null, {
                    position: "absolute",
                    top: "-9999em",
                    width: k.chartWidth + "px",
                    height: k.chartHeight + "px"
                }, d.body), f = k.renderTo.style.width, h = k.renderTo.style.height, f = p.exporting.sourceWidth || p.chart.width || /px$/.test(f) && parseInt(f, 10) || 600, h = p.exporting.sourceHeight || p.chart.height || /px$/.test(h) && parseInt(h, 10) || 400, n(p.chart, {
                    animation: !1,
                    renderTo: e,
                    forExport: !0,
                    renderer: "SVGRenderer",
                    width: f,
                    height: h
                }), p.exporting.enabled = !1, delete p.data, p.series = [], m(k.series, function(a) {
                    g = l(a.userOptions, {
                        animation: !1,
                        enableMouseTracking: !1,
                        showCheckbox: !1,
                        visible: a.visible
                    }), g.isInternal || p.series.push(g)
                }), b && m(["xAxis", "yAxis"], function(a) {
                    m(o(b[a]), function(b, c) {
                        p[a][c] = l(p[a][c], b)
                    })
                }), c = new a.Chart(p, k.callback), m(["xAxis", "yAxis"], function(a) {
                    m(k[a], function(b, d) {
                        var e = c[a][d],
                            f = b.getExtremes(),
                            g = f.userMin,
                            f = f.userMax;
                        e && (void 0 !== g || void 0 !== f) && e.setExtremes(g, f, !0, !1)
                    })
                }), f = c.getChartHTML(), p = null, c.destroy(), j(e), q && (e = f.match(/<\/svg>(.*?$)/)) && (e = '<foreignObject x="0" y="0" width="200" height="200"><body xmlns="http://www.w3.org/1999/xhtml">' + e[1] + "</body></foreignObject>", f = f.replace("</svg>", e + "</svg>")), f = this.sanitizeSVG(f), f = f.replace(/(url\(#highcharts-[0-9]+)&quot;/g, "$1").replace(/&quot;/g, "'")
            },
            getSVGForExport: function(a, b) {
                var c = this.options.exporting;
                return this.getSVG(l({
                    chart: {
                        borderRadius: 0
                    }
                }, c.chartOptions, b, {
                    exporting: {
                        sourceWidth: a && a.sourceWidth || c.sourceWidth,
                        sourceHeight: a && a.sourceHeight || c.sourceHeight
                    }
                }))
            },
            exportChart: function(b, c) {
                var d = this.getSVGForExport(b, c),
                    b = l(this.options.exporting, b);
                a.post(b.url, {
                    filename: b.filename || "chart",
                    type: b.type,
                    width: b.width || 0,
                    scale: b.scale || 2,
                    svg: d
                }, b.formAttributes)
            },
            print: function() {
                var a, b, e, f = this,
                    g = f.container,
                    i = [],
                    j = g.parentNode,
                    k = d.body,
                    l = k.childNodes,
                    n = f.options.exporting.printMaxWidth;
                f.isPrinting || (f.isPrinting = !0, f.pointer.reset(null, 0), h(f, "beforePrint"), (e = n && f.chartWidth > n) && (a = f.hasUserSize, b = [f.chartWidth, f.chartHeight, !1], f.setSize(n, f.chartHeight, !1)), m(l, function(a, b) {
                    1 === a.nodeType && (i[b] = a.style.display, a.style.display = "none")
                }), k.appendChild(g), c.focus(), c.print(), setTimeout(function() {
                    j.appendChild(g), m(l, function(a, b) {
                        1 === a.nodeType && (a.style.display = i[b])
                    }), f.isPrinting = !1, e && (f.setSize.apply(f, b), f.hasUserSize = a), h(f, "afterPrint")
                }, 1e3))
            },
            contextMenu: function(a, b, c, e, h, j, l) {
                var o, q, r, s = this,
                    t = s.options.navigation,
                    u = t.menuItemStyle,
                    v = s.chartWidth,
                    w = s.chartHeight,
                    x = "cache-" + a,
                    y = s[x],
                    z = p(h, j),
                    A = function(b) {
                        s.pointer.inClass(b.target, a) || q()
                    };
                y || (s[x] = y = i("div", {
                    className: a
                }, {
                    position: "absolute",
                    zIndex: 1e3,
                    padding: z + "px"
                }, s.container), o = i("div", null, n({
                    MozBoxShadow: "3px 3px 10px #888",
                    WebkitBoxShadow: "3px 3px 10px #888",
                    boxShadow: "3px 3px 10px #888"
                }, t.menuStyle), y), q = function() {
                    k(y, {
                        display: "none"
                    }), l && l.setState(0), s.openMenu = !1
                }, f(y, "mouseleave", function() {
                    r = setTimeout(q, 500)
                }), f(y, "mouseenter", function() {
                    clearTimeout(r)
                }), f(d, "mouseup", A), f(s, "destroy", function() {
                    g(d, "mouseup", A)
                }), m(b, function(a) {
                    if (a) {
                        var b = a.separator ? i("hr", null, null, o) : i("div", {
                            onmouseover: function() {
                                k(this, t.menuItemHoverStyle)
                            },
                            onmouseout: function() {
                                k(this, u)
                            },
                            onclick: function(b) {
                                b && b.stopPropagation(), q(), a.onclick && a.onclick.apply(s, arguments)
                            },
                            innerHTML: a.text || s.options.lang[a.textKey]
                        }, n({
                            cursor: "pointer"
                        }, u), o);
                        s.exportDivElements.push(b)
                    }
                }), s.exportDivElements.push(o, y), s.exportMenuWidth = y.offsetWidth, s.exportMenuHeight = y.offsetHeight), b = {
                    display: "block"
                }, c + s.exportMenuWidth > v ? b.right = v - c - h - z + "px" : b.left = c - z + "px", e + j + s.exportMenuHeight > w && "top" !== l.alignOptions.verticalAlign ? b.bottom = w - e - z + "px" : b.top = e + j - z + "px", k(y, b), s.openMenu = !0
            },
            addButton: function(c) {
                var d, e, f = this,
                    g = f.renderer,
                    h = l(f.options.navigation.buttonOptions, c),
                    i = h.onclick,
                    j = h.menuItems,
                    k = {
                        stroke: h.symbolStroke,
                        fill: h.symbolFill
                    },
                    m = h.symbolSize || 12;
                if (f.btnCount || (f.btnCount = 0), f.exportDivElements || (f.exportDivElements = [], f.exportSVGElements = []), h.enabled !== !1) {
                    var o, p = h.theme,
                        q = p.states,
                        r = q && q.hover,
                        q = q && q.select;
                    delete p.states, i ? o = function(a) {
                        a.stopPropagation(), i.call(f, a)
                    } : j && (o = function() {
                        f.contextMenu(e.menuClassName, j, e.translateX, e.translateY, e.width, e.height, e),
                            e.setState(2)
                    }), h.text && h.symbol ? p.paddingLeft = a.pick(p.paddingLeft, 25) : h.text || n(p, {
                        width: h.width,
                        height: h.height,
                        padding: 0
                    }), e = g.button(h.text, 0, 0, o, p, r, q).attr({
                        title: f.options.lang[h._titleKey],
                        "stroke-linecap": "round",
                        zIndex: 3
                    }), e.menuClassName = c.menuClassName || "highcharts-menu-" + f.btnCount++, h.symbol && (d = g.symbol(h.symbol, h.symbolX - m / 2, h.symbolY - m / 2, m, m).attr(n(k, {
                        "stroke-width": h.symbolStrokeWidth || 1,
                        zIndex: 1
                    })).add(e)), e.add().align(n(h, {
                        width: e.width,
                        x: a.pick(h.x, b)
                    }), !0, "spacingBox"), b += (e.width + h.buttonSpacing) * ("right" === h.align ? -1 : 1), f.exportSVGElements.push(e, d)
                }
            },
            destroyExport: function(a) {
                var b, c, a = a.target;
                for (b = 0; b < a.exportSVGElements.length; b++)(c = a.exportSVGElements[b]) && (c.onclick = c.ontouchstart = null, a.exportSVGElements[b] = c.destroy());
                for (b = 0; b < a.exportDivElements.length; b++) c = a.exportDivElements[b], g(c, "mouseleave"), a.exportDivElements[b] = c.onmouseout = c.onmouseover = c.ontouchstart = c.onclick = null, j(c)
            }
        }), r.menu = function(a, b, c, d) {
            return ["M", a, b + 2.5, "L", a + c, b + 2.5, "M", a, b + d / 2 + .5, "L", a + c, b + d / 2 + .5, "M", a, b + d - 1.5, "L", a + c, b + d - 1.5]
        }, e.prototype.callbacks.push(function(a) {
            var c, d = a.options.exporting,
                e = d.buttons;
            if (b = 0, d.enabled !== !1) {
                for (c in e) a.addButton(e[c]);
                f(a, "destroy", a.destroyExport)
            }
        })
    }),



    function(a) {
        "object" == typeof module && module.exports ? module.exports = a : a(Highcharts)
    }

    (function(a) {
        "use strict";

        function b(b, c, d, e, g) {
            var h, i, j, k = (b.options.exporting || {}).csv || {},
                l = k.url || "http://www.highcharts.com/studies/csv-export/download.php";
            j = b.options.exporting.filename ? b.options.exporting.filename : b.title ? b.title.textStr.replace(/ /g, "-").toLowerCase() : "chart", window.Blob && window.navigator.msSaveOrOpenBlob ? (i = new Blob([e]), window.navigator.msSaveOrOpenBlob(i, j + "." + d)) : f ? (h = document.createElement("a"), h.href = c, h.target = "_blank", h.download = j + "." + d, document.body.appendChild(h), h.click(), h.remove()) : a.post(l, {
                data: e,
                type: g,
                extension: d
            })
        }
        var c = a.each,
            d = a.pick,
            e = a.seriesTypes,
            f = void 0 !== document.createElement("a").download;
        a.setOptions({
            lang: {
                downloadCSV: "Download CSV",
                downloadXLS: "Download XLS",
                viewData: "View data table"
            }
        }), a.Chart.prototype.getDataRows = function() {
            var b, e, f, g = (this.options.exporting || {}).csv || {},
                h = this.xAxis[0],
                i = {},
                j = [],
                k = [],
                l = h.options.title && h.options.title.text,
                m = g.dateFormat || "%Y-%m-%d %H:%M:%S",
                n = g.columnHeaderFormatter || function(a, b, c) {
                    return a.name + (c > 1 ? " (" + b + ")" : "")
                };
            e = 0, c(this.series, function(a) {
                var b, f = a.options.keys,
                    g = f || a.pointArrayMap || ["y"],
                    h = g.length,
                    j = a.requireSorting,
                    l = {};
                if (c(g, function(b) {
                        l[b] = a[b + "Axis"] && a[b + "Axis"].categories || []
                    }), a.options.includeInCSVExport !== !1 && a.visible !== !1) {
                    for (b = 0; b < h;) k.push(n(a, g[b], g.length)), b += 1;
                    c(a.points, function(c, f) {
                        var k, m, n = j ? c.x : f;
                        for (b = 0, i[n] || (i[n] = []), i[n].x = c.x, a.xAxis && "name" !== a.exportKey || (i[n].name = c.name); b < h;) k = g[b], m = c[k], i[n][e + b] = d(l[k][m], m), b += 1
                    }), e += b
                }
            });
            for (f in i) i.hasOwnProperty(f) && j.push(i[f]);
            return j.sort(function(a, b) {
                return a.x - b.x
            }), l || (l = h.isDatetimeAxis ? "DateTime" : "Category"), b = [
                [l].concat(k)
            ], c(j, function(c) {
                var e = c.name;
                e || (h.isDatetimeAxis ? (c.x instanceof Date && (c.x = c.x.getTime()), e = a.dateFormat(m, c.x)) : e = h.categories ? d(h.names[c.x], h.categories[c.x], c.x) : c.x), c.unshift(e), b.push(c)
            }), b
        }, a.Chart.prototype.getCSV = function(a) {
            var b = "",
                d = this.getDataRows(),
                e = (this.options.exporting || {}).csv || {},
                f = e.itemDelimiter || ",",
                g = e.lineDelimiter || "\n";
            return c(d, function(c, e) {
                for (var h = "", i = c.length, j = a ? 1.1.toLocaleString()[1] : "."; i--;) h = c[i], "string" == typeof h && (h = '"' + h + '"'), "number" == typeof h && "," === j && (h = h.toString().replace(".", ",")), c[i] = h;
                b += c.join(f), e < d.length - 1 && (b += g)
            }), b
        }, a.Chart.prototype.getTable = function(a) {
            var b = "<table>",
                d = this.getDataRows();
            return c(d, function(c, d) {
                var e, f, g = d ? "td" : "th",
                    h = a ? 1.1.toLocaleString()[1] : ".";
                for (b += "<tr>", f = 0; f < c.length; f += 1) e = c[f], "number" == typeof e ? (e = e.toString(), "," === h && (e = e.replace(".", h)), b += "<" + g + ' class="number">' + e + "</" + g + ">") : b += "<" + g + ">" + (void 0 === e ? "" : e) + "</" + g + ">";
                b += "</tr>"
            }), b += "</table>"
        }, a.Chart.prototype.downloadCSV = function() {
            var a = this.getCSV(!0);
            b(this, "data:text/csv,\ufeff" + a.replace(/\n/g, "%0A"), "csv", a, "text/csv")
        }, a.Chart.prototype.downloadXLS = function() {
            var a = "data:application/vnd.ms-excel;base64,",
                c = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Ark1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><style>td{border:none;font-family: Calibri, sans-serif;} .number{mso-number-format:"0.00";}</style><meta name=ProgId content=Excel.Sheet><meta charset=UTF-8></head><body>' + this.getTable(!0) + "</body></html>",
                d = function(a) {
                    return window.btoa(unescape(encodeURIComponent(a)))
                };
            b(this, a + d(c), "xls", c, "application/vnd.ms-excel")
        }, a.Chart.prototype.viewData = function() {
            if (!this.insertedTable) {
                var a = document.createElement("div");
                a.className = "highcharts-data-table", this.renderTo.parentNode.insertBefore(a, this.renderTo.nextSibling), a.innerHTML = this.getTable(), this.insertedTable = !0
            }
        }, a.getOptions().exporting && a.getOptions().exporting.buttons.contextButton.menuItems.push({
            textKey: "downloadCSV",
            onclick: function() {
                this.downloadCSV()
            }
        }, {
            textKey: "downloadXLS",
            onclick: function() {
                this.downloadXLS()
            }
        }, {
            textKey: "viewData",
            onclick: function() {
                this.viewData()
            }
        }), e.map && (e.map.prototype.exportKey = "name"), e.mapbubble && (e.mapbubble.prototype.exportKey = "name")
    });






/*! etrends 18-08-2016 */
function jsDropDown(a, b, c) {
    document.getElementById(a).src = b + "/" + c + ".html"
}


var seasonalSVGpm25map = {};
seasonalSVGpm25map.svgID = "svgSeasonalPm25map", seasonalSVGpm25map.panZoom, seasonalSVGpm25map.isLoaded = !1, seasonalSVGpm25map.onDropChange = function(a, b) {
    seasonalSVGpm25map.panZoom && seasonalSVGpm25map.panZoom.destroy(), seasonalSVGpm25map.panZoom = null, document.getElementById(seasonalSVGpm25map.svgID).data = a + "/" + b + ".svg"
}, seasonalSVGpm25map.eventsHandler = {
    haltEventListeners: ["touchstart", "touchend", "touchmove", "touchleave", "touchcancel"],
    init: function(a) {
        var b = a.instance,
            c = 1,
            d = 0,
            e = 0;
        this.hammer = Hammer(a.svgElement, {
            inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
        }), this.hammer.get("pinch").set({
            enable: !0
        }), this.hammer.on("doubletap", function(a) {
            b.zoomIn()
        }), this.hammer.on("panstart panmove", function(a) {
            "panstart" === a.type && (d = 0, e = 0), b.panBy({
                x: a.deltaX - d,
                y: a.deltaY - e
            }), d = a.deltaX, e = a.deltaY
        }), this.hammer.on("pinchstart pinchmove", function(a) {
            "pinchstart" === a.type && (c = b.getZoom(), b.zoom(c * a.scale)), b.zoom(c * a.scale)
        }), a.svgElement.addEventListener("touchmove", function(a) {
            a.preventDefault()
        })
    },
    destroy: function() {
        this.hammer.destroy()
    }
}, 




seasonalSVGpm25map.beforePan = function(a, b) {
    var c = 100,
        d = 100,
        e = this.getSizes(),
        f = -((e.viewBox.x + e.viewBox.width) * e.realZoom) + c,
        g = e.width - c - e.viewBox.x * e.realZoom,
        h = -((e.viewBox.y + e.viewBox.height) * e.realZoom) + d,
        i = e.height - d - e.viewBox.y * e.realZoom;
    return customPan = {}, customPan.x = Math.max(f, Math.min(g, b.x)), customPan.y = Math.max(h, Math.min(i, b.y)), customPan
}, 



seasonalSVGpm25map.createSVGpanZoom = function() {
    seasonalSVGpm25map.panZoom && seasonalSVGpm25map.destroy(), seasonalSVGpm25map.panZoom = svgPanZoom("#" + seasonalSVGpm25map.svgID, {
        zoomEnabled: !0,
        controlIconsEnabled: !0,
        maxZoom: 3,
        fit: 1,
        center: 1,
        customEventsHandler: seasonalSVGpm25map.eventsHandler,
        beforePan: seasonalSVGpm25map.beforePan
    })
},




seasonalSVGpm25map.windowResizeHandler = function() {
    $(window).resize(function() {
        seasonalSVGpm25map.panZoom.resize(), seasonalSVGpm25map.panZoom.fit(), seasonalSVGpm25map.panZoom.center()
    })
},




 $("#" + seasonalSVGpm25map.svgID).on("load", function() {
    seasonalSVGpm25map.createSVGpanZoom(), seasonalSVGpm25map.isLoaded === !1 && seasonalSVGpm25map.windowResizeHandler(), seasonalSVGpm25map.isLoaded = !0
}),



 window.onload = function() {}, $(function() {
    $('[data-toggle="tooltip"]').tooltip()
}),



 $(".collapse").on("shown.bs.collapse", function() {
    $(this).parent().find(".icon-hand-o-right").removeClass("icon-hand-o-right").addClass("icon-hand-o-down")
})
 .on("hidden.bs.collapse", function() {
    $(this).parent().find(".icon-hand-o-down").removeClass("icon-hand-o-down").addClass("icon-hand-o-right")
}),


 $(function() {
    $("#fullpage").fullpage({
        autoScrolling: !1,
        fitToSection: !0,
        fitToSectionDelay: 1500,
        scrollBar: !0,
        lockAnchors: !0,
        normalScrollElements: "#report-nav, #naaqsMap, #svgSeasonalPm25map, #naaMap, #ozonesliderMap",
        anchors: ["home_", "welcome_", "intro_", "highlights_", "air_pollution_", "sources_", "effects_", "growth_", "econ_growth_cleaner_air_", "naaqs_", "naaqs_trends_", "composition_", "unhealthy_aq_days_", "nonattainment_", "weather_", "weather_influences_", "visibility_", "scenic_areas_", "toxics_", "toxics_trends_", "outlook_", "2025_projections_", "summary_", "resources_", "social_media_"],
        navigation: !0,
        navigationPosition: "left",
        navigationTooltips: ['Home', 'Welcome', 'Intro', 'County Map', 'Input Data', 'Dashboard', 'Publication Map', 'Summary', 'Resources', 'Social Media'],
        responsiveWidth: 1383,
        responsiveHeight: 900,
        sectionSelector: ".secFP"
    })
}),

























 $("a").keypress(function() {
    this.blur(), this.hideFocus = !1, this.style.outline = null
}),



 $("a").mousedown(function() {
    this.blur(), this.hideFocus = !0, this.style.outline = "none"
}),



 $(".hvr-sweep-to-right").mousedown(function() {
    this.blur(), this.hideFocus = !0, this.style.border = "1px solid #42dca3"
}),


 $(".btnPly, .btnFS").mousedown(function() {
    this.blur(), this.hideFocus = !0, this.style.border = "1px solid rgba(0,0,0,0.7)"
}),


 $(window).load(function() {
    $(".se-pre-con").fadeOut("slow")
});