/** layuiAdmin.pro-v1.2.1 LPPL License By http://www.layui.com/admin/ */
; function ue_callback(e, t) { function a(e, t, a, i) { var r, o = 0, s = 0, n = e.width || a, l = e.height || i; (n > t || l > t) && (n >= l ? (o = n - t) && (r = (o / n).toFixed(2), e.height = l - l * r, e.width = t) : (s = l - t) && (r = (s / l).toFixed(2), e.width = n - n * r, e.height = t)) } var i = document, r = $G("J_picBoard"), o = i.createElement("img"); removeMaskLayer(), "SUCCESS" == t ? (r.innerHTML = "", o.onload = function () { a(this, 300), r.appendChild(o); var e = new scrawl; e.btn2Highlight("J_removeImg"), e.btn2Highlight("J_sacleBoard") }, o.src = e) : alert(t) } function removeMaskLayer() { var e = $G("J_maskLayer"); e.className = "maskLayerNull", e.innerHTML = "", dialog.buttons[0].setDisabled(!1) } function addMaskLayer(e) { var t = $G("J_maskLayer"); dialog.buttons[0].setDisabled(!0), t.className = "maskLayer", t.innerHTML = e } function exec(scrawlObj) { if (scrawlObj.isScrawl) { addMaskLayer(lang.scrawlUpLoading); var base64 = scrawlObj.getCanvasData(); if (base64) { var options = { timeout: 1e5, onsuccess: function (xhr) { if (!scrawlObj.isCancelScrawl) { var responseObj; if (responseObj = eval("(" + xhr.responseText + ")"), "200" == responseObj.Code) { var imgObj = {}, url = editor.options.scrawlUrlPrefix + responseObj.Data.src; imgObj.src = url, imgObj._src = url, imgObj.alt = responseObj.Data.FileName || "", imgObj.title = responseObj.Data.FileName || "", editor.execCommand("insertImage", imgObj), dialog.close() } else alert(responseObj.Msg) } }, onerror: function () { alert(lang.imageError), dialog.close() } }; options[editor.getOpt("scrawlFieldName")] = base64; var actionUrl = editor.getActionUrl(editor.getOpt("scrawlActionName")), params = utils.serializeParam(editor.queryCommandValue("serverparam")) || "", url = utils.formatUrl(actionUrl + (actionUrl.indexOf("?") == -1 ? "?" : "&") + params); ajax.request(url, options) } } else addMaskLayer(lang.noScarwl + "&nbsp;&nbsp;&nbsp;<input type='button' value='" + lang.continueBtn + "'  onclick='removeMaskLayer()'/>") } var scrawl = function (e) { e && this.initOptions(e) }; !function () { var e = $G("J_brushBoard"), t = e.getContext("2d"), a = [], i = 0; scrawl.prototype = { isScrawl: !1, brushWidth: -1, brushColor: "", initOptions: function (e) { var t = this; t.originalState(e), t._buildToolbarColor(e.colorList), t._addBoardListener(e.saveNum), t._addOPerateListener(e.saveNum), t._addColorBarListener(), t._addBrushBarListener(), t._addEraserBarListener(), t._addAddImgListener(), t._addRemoveImgListenter(), t._addScalePicListenter(), t._addClearSelectionListenter(), t._originalColorSelect(e.drawBrushColor), t._originalBrushSelect(e.drawBrushSize), t._clearSelection() }, originalState: function (e) { var a = this; a.brushWidth = e.drawBrushSize, a.brushColor = e.drawBrushColor, t.lineWidth = a.brushWidth, t.strokeStyle = a.brushColor, t.fillStyle = "transparent", t.lineCap = "round", t.fill() }, _buildToolbarColor: function (e) { var t = null, a = []; a.push("<table id='J_colorList'>"); for (var i, r = 0; i = e[r++];)(r - 1) % 5 == 0 && (1 != r && a.push("</tr>"), a.push("<tr>")), t = "#" + i, a.push("<td><a title='" + t + "' href='javascript:void(0)' style='background-color:" + t + "'></a></td>"); a.push("</tr></table>"), $G("J_colorBar").innerHTML = a.join("") }, _addBoardListener: function (r) { var o, s = this, n = 0, l = -1, c = -1, d = !1, h = !1, u = !1, p = 0, m = ""; n = parseInt(domUtils.getComputedStyle($G("J_wrap"), "margin-left")), a.push(t.getImageData(0, 0, t.canvas.width, t.canvas.height)), i += 1, domUtils.on(e, ["mousedown", "mousemove", "mouseup", "mouseout"], function (e) { switch (o = browser.webkit ? e.which : p, e.type) { case "mousedown": p = 1, m = 1, d = !0, u = !1, h = !1, s.isScrawl = !0, l = e.clientX - n, c = e.clientY - n, t.beginPath(); break; case "mousemove": if (!m && 0 == o) return; if (!m && o && (l = e.clientX - n, c = e.clientY - n, t.beginPath(), m = 1), u || !d) return; var a = e.clientX - n, i = e.clientY - n; t.moveTo(l, c), t.lineTo(a, i), t.stroke(), l = a, c = i, h = !0; break; case "mouseup": if (p = 0, !d) return; h || (t.arc(l, c, t.lineWidth, 0, 2 * Math.PI, !1), t.fillStyle = t.strokeStyle, t.fill()), t.closePath(), s._saveOPerate(r), d = !1, h = !1, u = !0, l = -1, c = -1; break; case "mouseout": if (m = "", p = 0, 1 == o) return; t.closePath() } }) }, _addOPerateListener: function (e) { var r = this; domUtils.on($G("J_previousStep"), "click", function () { i > 1 && (i -= 1, t.clearRect(0, 0, t.canvas.width, t.canvas.height), t.putImageData(a[i - 1], 0, 0), r.btn2Highlight("J_nextStep"), 1 == i && r.btn2disable("J_previousStep")) }), domUtils.on($G("J_nextStep"), "click", function () { i > 0 && i < a.length && (t.clearRect(0, 0, t.canvas.width, t.canvas.height), t.putImageData(a[i], 0, 0), i += 1, r.btn2Highlight("J_previousStep"), i == a.length && r.btn2disable("J_nextStep")) }), domUtils.on($G("J_clearBoard"), "click", function () { t.clearRect(0, 0, t.canvas.width, t.canvas.height), a = [], r._saveOPerate(e), i = 1, r.isScrawl = !1, r.btn2disable("J_previousStep"), r.btn2disable("J_nextStep"), r.btn2disable("J_clearBoard") }) }, _addColorBarListener: function () { var e = this; domUtils.on($G("J_colorBar"), "click", function (a) { var i = e.getTarget(a), r = i.title; r && (e._addColorSelect(i), e.brushColor = r, t.globalCompositeOperation = "source-over", t.lineWidth = e.brushWidth, t.strokeStyle = r) }) }, _addBrushBarListener: function () { var e = this; domUtils.on($G("J_brushBar"), "click", function (a) { var i = e.getTarget(a), r = browser.ie ? i.innerText : i.text; r && (e._addBESelect(i), t.globalCompositeOperation = "source-over", t.lineWidth = parseInt(r), t.strokeStyle = e.brushColor, e.brushWidth = t.lineWidth) }) }, _addEraserBarListener: function () { var e = this; domUtils.on($G("J_eraserBar"), "click", function (a) { var i = e.getTarget(a), r = browser.ie ? i.innerText : i.text; r && (e._addBESelect(i), t.lineWidth = parseInt(r), t.globalCompositeOperation = "destination-out", t.strokeStyle = "#FFF") }) }, _addAddImgListener: function () { var e = $G("J_imgTxt"); window.FileReader || ($G("J_addImg").style.display = "none", $G("J_removeImg").style.display = "none", $G("J_sacleBoard").style.display = "none"), domUtils.on(e, "change", function (t) { var a = e.parentNode; addMaskLayer(lang.backgroundUploading); var i = t.target || t.srcElement, r = new FileReader; r.onload = function (e) { var t = e.target || e.srcElement; ue_callback(t.result, "SUCCESS") }, r.readAsDataURL(i.files[0]), a.reset() }) }, _addRemoveImgListenter: function () { var e = this; domUtils.on($G("J_removeImg"), "click", function () { $G("J_picBoard").innerHTML = "", e.btn2disable("J_removeImg"), e.btn2disable("J_sacleBoard") }) }, _addScalePicListenter: function () { domUtils.on($G("J_sacleBoard"), "click", function () { var t = $G("J_picBoard"), a = $G("J_scaleCon"), i = t.children[0]; if (i) if (a) "visible" == a.style.visibility ? (a.style.visibility = "hidden", t.style.position = "", t.style.zIndex = "") : (a.style.visibility = "visible", t.style.cssText += "position:relative;z-index:999"); else { t.style.cssText = "position:relative;z-index:999;" + t.style.cssText, i.style.cssText = "position: absolute;top:" + (e.height - i.height) / 2 + "px;left:" + (e.width - i.width) / 2 + "px;"; var r = new ScaleBoy; t.appendChild(r.init()), r.startScale(i) } }) }, _addClearSelectionListenter: function () { var e = document; domUtils.on(e, "mousemove", function (t) { browser.ie && browser.version < 11 ? e.selection.clear() : window.getSelection().removeAllRanges() }) }, _clearSelection: function () { for (var e, t = ["J_operateBar", "J_colorBar", "J_brushBar", "J_eraserBar", "J_picBoard"], a = 0; e = t[a++];)domUtils.unSelectable($G(e)) }, _saveOPerate: function (e) { var r = this; a.length <= e ? (i < a.length && (r.btn2disable("J_nextStep"), a.splice(i)), a.push(t.getImageData(0, 0, t.canvas.width, t.canvas.height)), i = a.length) : (a.shift(), a.push(t.getImageData(0, 0, t.canvas.width, t.canvas.height)), i = a.length), r.btn2Highlight("J_previousStep"), r.btn2Highlight("J_clearBoard") }, _originalColorSelect: function (e) { for (var t, a = $G("J_colorList").getElementsByTagName("td"), i = 0; t = a[i++];)t.children[0].title.toLowerCase() == e && (t.children[0].style.opacity = 1) }, _originalBrushSelect: function (e) { for (var t, a = $G("J_brushBar").children, i = 0; t = a[i++];)if ("a" == t.tagName.toLowerCase()) { var r = browser.ie ? t.innerText : t.text; r.toLowerCase() == e && (t.style.opacity = 1) } }, _addColorSelect: function (e) { for (var t, a = $G("J_colorList").getElementsByTagName("td"), i = $G("J_eraserBar").children, r = $G("J_brushBar").children, o = 0; t = a[o++];)t.children[0].style.opacity = .3; for (var s, n = 0; s = r[n++];)if ("a" == s.tagName.toLowerCase()) { s.style.opacity = .3; var l = browser.ie ? s.innerText : s.text; l.toLowerCase() == this.brushWidth && (s.style.opacity = 1) } for (var c, d = 0; c = i[d++];)"a" == c.tagName.toLowerCase() && (c.style.opacity = .3); e.style.opacity = 1, e.blur() }, _addBESelect: function (e) { for (var t, a = $G("J_brushBar").children, i = $G("J_eraserBar").children, r = 0; t = a[r++];)"a" == t.tagName.toLowerCase() && (t.style.opacity = .3); for (var o, s = 0; o = i[s++];)"a" == o.tagName.toLowerCase() && (o.style.opacity = .3); e.style.opacity = 1, e.blur() }, getCanvasData: function () { var a = $G("J_picBoard"), i = a.children[0]; if (i) { var r, o; "absolute" == i.style.position ? (r = parseInt(i.style.left), o = parseInt(i.style.top)) : (r = (a.offsetWidth - i.width) / 2, o = (a.offsetHeight - i.height) / 2), t.globalCompositeOperation = "destination-over", t.drawImage(i, r, o, i.width, i.height) } else t.globalCompositeOperation = "destination-atop", t.fillStyle = "#fff", t.fillRect(0, 0, e.width, e.height); try { return e.toDataURL("image/png").substring(22) } catch (s) { return "" } }, btn2Highlight: function (e) { var t = $G(e); t.className.indexOf("H") == -1 && (t.className += "H") }, btn2disable: function (e) { var t = $G(e); t.className.indexOf("H") != -1 && (t.className = t.className.replace("H", "")) }, getTarget: function (e) { return e.target || e.srcElement } } }(); var ScaleBoy = function () { this.dom = null, this.scalingElement = null }; !function () { function e() { var e = document, t = e.getElementsByTagName("head")[0], a = e.createElement("style"), i = ".scale{visibility:hidden;cursor:move;position:absolute;left:0;top:0;width:100px;height:50px;background-color:#fff;font-size:0;line-height:0;opacity:.4;filter:Alpha(opacity=40);}.scale span{position:absolute;left:0;top:0;width:6px;height:6px;background-color:#006DAE;}.scale .hand0, .scale .hand7{cursor:nw-resize;}.scale .hand1, .scale .hand6{left:50%;margin-left:-3px;cursor:n-resize;}.scale .hand2, .scale .hand4, .scale .hand7{left:100%;margin-left:-6px;}.scale .hand3, .scale .hand4{top:50%;margin-top:-3px;cursor:w-resize;}.scale .hand5, .scale .hand6, .scale .hand7{margin-top:-6px;top:100%;}.scale .hand2, .scale .hand5{cursor:ne-resize;}"; a.type = "text/css"; try { a.appendChild(e.createTextNode(i)) } catch (r) { a.styleSheet.cssText = i } t.appendChild(a) } function t() { var e = document, t = [], a = e.createElement("div"); a.id = "J_scaleCon", a.className = "scale"; for (var i = 0; i < 8; i++)t.push("<span class='hand" + i + "'></span>"); return a.innerHTML = t.join(""), a } var a = [[1, 1, -1, -1], [0, 1, 0, -1], [0, 1, 1, -1], [1, 0, -1, 0], [0, 0, 1, 0], [1, 0, -1, 1], [0, 0, 0, 1], [0, 0, 1, 1]]; ScaleBoy.prototype = { init: function () { e(); var a = this, i = a.dom = t(); return a.scaleMousemove.fp = a, domUtils.on(i, "mousedown", function (e) { var t = e.target || e.srcElement; a.start = { x: e.clientX, y: e.clientY }, t.className.indexOf("hand") != -1 && (a.dir = t.className.replace("hand", "")), domUtils.on(document.body, "mousemove", a.scaleMousemove), e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0 }), domUtils.on(document.body, "mouseup", function (e) { a.start && (domUtils.un(document.body, "mousemove", a.scaleMousemove), a.moved && a.updateScaledElement({ position: { x: i.style.left, y: i.style.top }, size: { w: i.style.width, h: i.style.height } }), delete a.start, delete a.moved, delete a.dir) }), i }, startScale: function (e) { var t = this, a = t.dom; a.style.cssText = "visibility:visible;top:" + e.style.top + ";left:" + e.style.left + ";width:" + e.offsetWidth + "px;height:" + e.offsetHeight + "px;", t.scalingElement = e }, updateScaledElement: function (e) { var t = this.scalingElement, a = e.position, i = e.size; a && ("undefined" != typeof a.x && (t.style.left = a.x), "undefined" != typeof a.y && (t.style.top = a.y)), i && (i.w && (t.style.width = i.w), i.h && (t.style.height = i.h)) }, updateStyleByDir: function (e, t) { var i, r = this, o = r.dom; a.def = [1, 1, 0, 0], 0 != a[e][0] && (i = parseInt(o.style.left) + t.x, o.style.left = r._validScaledProp("left", i) + "px"), 0 != a[e][1] && (i = parseInt(o.style.top) + t.y, o.style.top = r._validScaledProp("top", i) + "px"), 0 != a[e][2] && (i = o.clientWidth + a[e][2] * t.x, o.style.width = r._validScaledProp("width", i) + "px"), 0 != a[e][3] && (i = o.clientHeight + a[e][3] * t.y, o.style.height = r._validScaledProp("height", i) + "px"), "def" === e && r.updateScaledElement({ position: { x: o.style.left, y: o.style.top } }) }, scaleMousemove: function (e) { var t = arguments.callee.fp, a = t.start, i = t.dir || "def", r = { x: e.clientX - a.x, y: e.clientY - a.y }; t.updateStyleByDir(i, r), arguments.callee.fp.start = { x: e.clientX, y: e.clientY }, arguments.callee.fp.moved = 1 }, _validScaledProp: function (e, t) { var a = this.dom, i = $G("J_picBoard"); switch (t = isNaN(t) ? 0 : t, e) { case "left": return t < 0 ? 0 : t + a.clientWidth > i.clientWidth ? i.clientWidth - a.clientWidth : t; case "top": return t < 0 ? 0 : t + a.clientHeight > i.clientHeight ? i.clientHeight - a.clientHeight : t; case "width": return t <= 0 ? 1 : t + a.offsetLeft > i.clientWidth ? i.clientWidth - a.offsetLeft : t; case "height": return t <= 0 ? 1 : t + a.offsetTop > i.clientHeight ? i.clientHeight - a.offsetTop : t } } } }();