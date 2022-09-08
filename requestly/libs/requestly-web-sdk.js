/*
* Copyright 2022 Requestly
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at 
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var Requestly = (function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    var NodeType;
    (function (NodeType) {
        NodeType[NodeType["Document"] = 0] = "Document";
        NodeType[NodeType["DocumentType"] = 1] = "DocumentType";
        NodeType[NodeType["Element"] = 2] = "Element";
        NodeType[NodeType["Text"] = 3] = "Text";
        NodeType[NodeType["CDATA"] = 4] = "CDATA";
        NodeType[NodeType["Comment"] = 5] = "Comment";
    })(NodeType || (NodeType = {}));

    function isElement(n) {
        return n.nodeType === n.ELEMENT_NODE;
    }
    function isShadowRoot(n) {
        var _a;
        var host = (_a = n) === null || _a === void 0 ? void 0 : _a.host;
        return Boolean(host && host.shadowRoot && host.shadowRoot === n);
    }
    function maskInputValue(_a) {
        var maskInputOptions = _a.maskInputOptions, tagName = _a.tagName, type = _a.type, value = _a.value, maskInputFn = _a.maskInputFn;
        var text = value || '';
        if (maskInputOptions[tagName.toLowerCase()] ||
            maskInputOptions[type]) {
            if (maskInputFn) {
                text = maskInputFn(text);
            }
            else {
                text = '*'.repeat(text.length);
            }
        }
        return text;
    }
    var ORIGINAL_ATTRIBUTE_NAME = '__rrweb_original__';
    function is2DCanvasBlank(canvas) {
        var ctx = canvas.getContext('2d');
        if (!ctx)
            return true;
        var chunkSize = 50;
        for (var x = 0; x < canvas.width; x += chunkSize) {
            for (var y = 0; y < canvas.height; y += chunkSize) {
                var getImageData = ctx.getImageData;
                var originalGetImageData = ORIGINAL_ATTRIBUTE_NAME in getImageData
                    ? getImageData[ORIGINAL_ATTRIBUTE_NAME]
                    : getImageData;
                var pixelBuffer = new Uint32Array(originalGetImageData.call(ctx, x, y, Math.min(chunkSize, canvas.width - x), Math.min(chunkSize, canvas.height - y)).data.buffer);
                if (pixelBuffer.some(function (pixel) { return pixel !== 0; }))
                    return false;
            }
        }
        return true;
    }

    var _id = 1;
    var tagNameRegex = new RegExp('[^a-z0-9-_:]');
    var IGNORED_NODE = -2;
    function genId() {
        return _id++;
    }
    function getValidTagName(element) {
        if (element instanceof HTMLFormElement) {
            return 'form';
        }
        var processedTagName = element.tagName.toLowerCase().trim();
        if (tagNameRegex.test(processedTagName)) {
            return 'div';
        }
        return processedTagName;
    }
    function getCssRulesString(s) {
        try {
            var rules = s.rules || s.cssRules;
            return rules ? Array.from(rules).map(getCssRuleString).join('') : null;
        }
        catch (error) {
            return null;
        }
    }
    function getCssRuleString(rule) {
        var cssStringified = rule.cssText;
        if (isCSSImportRule(rule)) {
            try {
                cssStringified = getCssRulesString(rule.styleSheet) || cssStringified;
            }
            catch (_a) {
            }
        }
        return cssStringified;
    }
    function isCSSImportRule(rule) {
        return 'styleSheet' in rule;
    }
    function stringifyStyleSheet(sheet) {
        return sheet.cssRules
            ? Array.from(sheet.cssRules)
                .map(function (rule) { return rule.cssText || ''; })
                .join('')
            : '';
    }
    function extractOrigin(url) {
        var origin = '';
        if (url.indexOf('//') > -1) {
            origin = url.split('/').slice(0, 3).join('/');
        }
        else {
            origin = url.split('/')[0];
        }
        origin = origin.split('?')[0];
        return origin;
    }
    var canvasService;
    var canvasCtx;
    var URL_IN_CSS_REF = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm;
    var RELATIVE_PATH = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/|#).*/;
    var DATA_URI = /^(data:)([^,]*),(.*)/i;
    function absoluteToStylesheet(cssText, href) {
        return (cssText || '').replace(URL_IN_CSS_REF, function (origin, quote1, path1, quote2, path2, path3) {
            var filePath = path1 || path2 || path3;
            var maybeQuote = quote1 || quote2 || '';
            if (!filePath) {
                return origin;
            }
            if (!RELATIVE_PATH.test(filePath)) {
                return "url(" + maybeQuote + filePath + maybeQuote + ")";
            }
            if (DATA_URI.test(filePath)) {
                return "url(" + maybeQuote + filePath + maybeQuote + ")";
            }
            if (filePath[0] === '/') {
                return "url(" + maybeQuote + (extractOrigin(href) + filePath) + maybeQuote + ")";
            }
            var stack = href.split('/');
            var parts = filePath.split('/');
            stack.pop();
            for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
                var part = parts_1[_i];
                if (part === '.') {
                    continue;
                }
                else if (part === '..') {
                    stack.pop();
                }
                else {
                    stack.push(part);
                }
            }
            return "url(" + maybeQuote + stack.join('/') + maybeQuote + ")";
        });
    }
    var SRCSET_NOT_SPACES = /^[^ \t\n\r\u000c]+/;
    var SRCSET_COMMAS_OR_SPACES = /^[, \t\n\r\u000c]+/;
    function getAbsoluteSrcsetString(doc, attributeValue) {
        if (attributeValue.trim() === '') {
            return attributeValue;
        }
        var pos = 0;
        function collectCharacters(regEx) {
            var chars;
            var match = regEx.exec(attributeValue.substring(pos));
            if (match) {
                chars = match[0];
                pos += chars.length;
                return chars;
            }
            return '';
        }
        var output = [];
        while (true) {
            collectCharacters(SRCSET_COMMAS_OR_SPACES);
            if (pos >= attributeValue.length) {
                break;
            }
            var url = collectCharacters(SRCSET_NOT_SPACES);
            if (url.slice(-1) === ',') {
                url = absoluteToDoc(doc, url.substring(0, url.length - 1));
                output.push(url);
            }
            else {
                var descriptorsStr = '';
                url = absoluteToDoc(doc, url);
                var inParens = false;
                while (true) {
                    var c = attributeValue.charAt(pos);
                    if (c === '') {
                        output.push((url + descriptorsStr).trim());
                        break;
                    }
                    else if (!inParens) {
                        if (c === ',') {
                            pos += 1;
                            output.push((url + descriptorsStr).trim());
                            break;
                        }
                        else if (c === '(') {
                            inParens = true;
                        }
                    }
                    else {
                        if (c === ')') {
                            inParens = false;
                        }
                    }
                    descriptorsStr += c;
                    pos += 1;
                }
            }
        }
        return output.join(', ');
    }
    function absoluteToDoc(doc, attributeValue) {
        if (!attributeValue || attributeValue.trim() === '') {
            return attributeValue;
        }
        var a = doc.createElement('a');
        a.href = attributeValue;
        return a.href;
    }
    function isSVGElement(el) {
        return Boolean(el.tagName === 'svg' || el.ownerSVGElement);
    }
    function getHref() {
        var a = document.createElement('a');
        a.href = '';
        return a.href;
    }
    function transformAttribute(doc, tagName, name, value) {
        if (name === 'src' || (name === 'href' && value)) {
            return absoluteToDoc(doc, value);
        }
        else if (name === 'xlink:href' && value && value[0] !== '#') {
            return absoluteToDoc(doc, value);
        }
        else if (name === 'background' &&
            value &&
            (tagName === 'table' || tagName === 'td' || tagName === 'th')) {
            return absoluteToDoc(doc, value);
        }
        else if (name === 'srcset' && value) {
            return getAbsoluteSrcsetString(doc, value);
        }
        else if (name === 'style' && value) {
            return absoluteToStylesheet(value, getHref());
        }
        else if (tagName === 'object' && name === 'data' && value) {
            return absoluteToDoc(doc, value);
        }
        else {
            return value;
        }
    }
    function _isBlockedElement(element, blockClass, blockSelector) {
        if (typeof blockClass === 'string') {
            if (element.classList.contains(blockClass)) {
                return true;
            }
        }
        else {
            for (var eIndex = 0; eIndex < element.classList.length; eIndex++) {
                var className = element.classList[eIndex];
                if (blockClass.test(className)) {
                    return true;
                }
            }
        }
        if (blockSelector) {
            return element.matches(blockSelector);
        }
        return false;
    }
    function needMaskingText(node, maskTextClass, maskTextSelector) {
        if (!node) {
            return false;
        }
        if (node.nodeType === node.ELEMENT_NODE) {
            if (typeof maskTextClass === 'string') {
                if (node.classList.contains(maskTextClass)) {
                    return true;
                }
            }
            else {
                for (var eIndex = 0; eIndex < node.classList.length; eIndex++) {
                    var className = node.classList[eIndex];
                    if (maskTextClass.test(className)) {
                        return true;
                    }
                }
            }
            if (maskTextSelector) {
                if (node.matches(maskTextSelector)) {
                    return true;
                }
            }
            return needMaskingText(node.parentNode, maskTextClass, maskTextSelector);
        }
        if (node.nodeType === node.TEXT_NODE) {
            return needMaskingText(node.parentNode, maskTextClass, maskTextSelector);
        }
        return needMaskingText(node.parentNode, maskTextClass, maskTextSelector);
    }
    function onceIframeLoaded(iframeEl, listener, iframeLoadTimeout) {
        var win = iframeEl.contentWindow;
        if (!win) {
            return;
        }
        var fired = false;
        var readyState;
        try {
            readyState = win.document.readyState;
        }
        catch (error) {
            return;
        }
        if (readyState !== 'complete') {
            var timer_1 = setTimeout(function () {
                if (!fired) {
                    listener();
                    fired = true;
                }
            }, iframeLoadTimeout);
            iframeEl.addEventListener('load', function () {
                clearTimeout(timer_1);
                fired = true;
                listener();
            });
            return;
        }
        var blankUrl = 'about:blank';
        if (win.location.href !== blankUrl ||
            iframeEl.src === blankUrl ||
            iframeEl.src === '') {
            setTimeout(listener, 0);
            return;
        }
        iframeEl.addEventListener('load', listener);
    }
    function serializeNode(n, options) {
        var _a;
        var doc = options.doc, blockClass = options.blockClass, blockSelector = options.blockSelector, maskTextClass = options.maskTextClass, maskTextSelector = options.maskTextSelector, inlineStylesheet = options.inlineStylesheet, _b = options.maskInputOptions, maskInputOptions = _b === void 0 ? {} : _b, maskTextFn = options.maskTextFn, maskInputFn = options.maskInputFn, _c = options.dataURLOptions, dataURLOptions = _c === void 0 ? {} : _c, inlineImages = options.inlineImages, recordCanvas = options.recordCanvas, keepIframeSrcFn = options.keepIframeSrcFn;
        var rootId;
        if (doc.__sn) {
            var docId = doc.__sn.id;
            rootId = docId === 1 ? undefined : docId;
        }
        switch (n.nodeType) {
            case n.DOCUMENT_NODE:
                if (n.compatMode !== 'CSS1Compat') {
                    return {
                        type: NodeType.Document,
                        childNodes: [],
                        compatMode: n.compatMode,
                        rootId: rootId
                    };
                }
                else {
                    return {
                        type: NodeType.Document,
                        childNodes: [],
                        rootId: rootId
                    };
                }
            case n.DOCUMENT_TYPE_NODE:
                return {
                    type: NodeType.DocumentType,
                    name: n.name,
                    publicId: n.publicId,
                    systemId: n.systemId,
                    rootId: rootId
                };
            case n.ELEMENT_NODE:
                var needBlock = _isBlockedElement(n, blockClass, blockSelector);
                var tagName = getValidTagName(n);
                var attributes_1 = {};
                for (var _i = 0, _d = Array.from(n.attributes); _i < _d.length; _i++) {
                    var _e = _d[_i], name_1 = _e.name, value = _e.value;
                    attributes_1[name_1] = transformAttribute(doc, tagName, name_1, value);
                }
                if (tagName === 'link' && inlineStylesheet) {
                    var stylesheet = Array.from(doc.styleSheets).find(function (s) {
                        return s.href === n.href;
                    });
                    var cssText = null;
                    if (stylesheet) {
                        cssText = getCssRulesString(stylesheet);
                    }
                    if (cssText) {
                        delete attributes_1.rel;
                        delete attributes_1.href;
                        attributes_1._cssText = absoluteToStylesheet(cssText, stylesheet.href);
                    }
                }
                if (tagName === 'style' &&
                    n.sheet &&
                    !(n.innerText ||
                        n.textContent ||
                        '').trim().length) {
                    var cssText = getCssRulesString(n.sheet);
                    if (cssText) {
                        attributes_1._cssText = absoluteToStylesheet(cssText, getHref());
                    }
                }
                if (tagName === 'input' ||
                    tagName === 'textarea' ||
                    tagName === 'select') {
                    var value = n.value;
                    if (attributes_1.type !== 'radio' &&
                        attributes_1.type !== 'checkbox' &&
                        attributes_1.type !== 'submit' &&
                        attributes_1.type !== 'button' &&
                        value) {
                        attributes_1.value = maskInputValue({
                            type: attributes_1.type,
                            tagName: tagName,
                            value: value,
                            maskInputOptions: maskInputOptions,
                            maskInputFn: maskInputFn
                        });
                    }
                    else if (n.checked) {
                        attributes_1.checked = n.checked;
                    }
                }
                if (tagName === 'option') {
                    if (n.selected && !maskInputOptions['select']) {
                        attributes_1.selected = true;
                    }
                    else {
                        delete attributes_1.selected;
                    }
                }
                if (tagName === 'canvas' && recordCanvas) {
                    if (n.__context === '2d') {
                        if (!is2DCanvasBlank(n)) {
                            attributes_1.rr_dataURL = n.toDataURL(dataURLOptions.type, dataURLOptions.quality);
                        }
                    }
                    else if (!('__context' in n)) {
                        var canvasDataURL = n.toDataURL(dataURLOptions.type, dataURLOptions.quality);
                        var blankCanvas = document.createElement('canvas');
                        blankCanvas.width = n.width;
                        blankCanvas.height = n.height;
                        var blankCanvasDataURL = blankCanvas.toDataURL(dataURLOptions.type, dataURLOptions.quality);
                        if (canvasDataURL !== blankCanvasDataURL) {
                            attributes_1.rr_dataURL = canvasDataURL;
                        }
                    }
                }
                if (tagName === 'img' && inlineImages) {
                    if (!canvasService) {
                        canvasService = doc.createElement('canvas');
                        canvasCtx = canvasService.getContext('2d');
                    }
                    var image_1 = n;
                    var oldValue_1 = image_1.crossOrigin;
                    image_1.crossOrigin = 'anonymous';
                    var recordInlineImage = function () {
                        try {
                            canvasService.width = image_1.naturalWidth;
                            canvasService.height = image_1.naturalHeight;
                            canvasCtx.drawImage(image_1, 0, 0);
                            attributes_1.rr_dataURL = canvasService.toDataURL(dataURLOptions.type, dataURLOptions.quality);
                        }
                        catch (err) {
                            console.warn("Cannot inline img src=" + image_1.currentSrc + "! Error: " + err);
                        }
                        oldValue_1
                            ? (attributes_1.crossOrigin = oldValue_1)
                            : delete attributes_1.crossOrigin;
                    };
                    if (image_1.complete && image_1.naturalWidth !== 0)
                        recordInlineImage();
                    else
                        image_1.onload = recordInlineImage;
                }
                if (tagName === 'audio' || tagName === 'video') {
                    attributes_1.rr_mediaState = n.paused
                        ? 'paused'
                        : 'played';
                    attributes_1.rr_mediaCurrentTime = n.currentTime;
                }
                if (n.scrollLeft) {
                    attributes_1.rr_scrollLeft = n.scrollLeft;
                }
                if (n.scrollTop) {
                    attributes_1.rr_scrollTop = n.scrollTop;
                }
                if (needBlock) {
                    var _f = n.getBoundingClientRect(), width = _f.width, height = _f.height;
                    attributes_1 = {
                        "class": attributes_1["class"],
                        rr_width: width + "px",
                        rr_height: height + "px"
                    };
                }
                if (tagName === 'iframe' && !keepIframeSrcFn(attributes_1.src)) {
                    if (!n.contentDocument) {
                        attributes_1.rr_src = attributes_1.src;
                    }
                    delete attributes_1.src;
                }
                return {
                    type: NodeType.Element,
                    tagName: tagName,
                    attributes: attributes_1,
                    childNodes: [],
                    isSVG: isSVGElement(n) || undefined,
                    needBlock: needBlock,
                    rootId: rootId
                };
            case n.TEXT_NODE:
                var parentTagName = n.parentNode && n.parentNode.tagName;
                var textContent = n.textContent;
                var isStyle = parentTagName === 'STYLE' ? true : undefined;
                var isScript = parentTagName === 'SCRIPT' ? true : undefined;
                if (isStyle && textContent) {
                    try {
                        if (n.nextSibling || n.previousSibling) {
                        }
                        else if ((_a = n.parentNode.sheet) === null || _a === void 0 ? void 0 : _a.cssRules) {
                            textContent = stringifyStyleSheet(n.parentNode.sheet);
                        }
                    }
                    catch (err) {
                        console.warn("Cannot get CSS styles from text's parentNode. Error: " + err, n);
                    }
                    textContent = absoluteToStylesheet(textContent, getHref());
                }
                if (isScript) {
                    textContent = 'SCRIPT_PLACEHOLDER';
                }
                if (!isStyle &&
                    !isScript &&
                    needMaskingText(n, maskTextClass, maskTextSelector) &&
                    textContent) {
                    textContent = maskTextFn
                        ? maskTextFn(textContent)
                        : textContent.replace(/[\S]/g, '*');
                }
                return {
                    type: NodeType.Text,
                    textContent: textContent || '',
                    isStyle: isStyle,
                    rootId: rootId
                };
            case n.CDATA_SECTION_NODE:
                return {
                    type: NodeType.CDATA,
                    textContent: '',
                    rootId: rootId
                };
            case n.COMMENT_NODE:
                return {
                    type: NodeType.Comment,
                    textContent: n.textContent || '',
                    rootId: rootId
                };
            default:
                return false;
        }
    }
    function lowerIfExists(maybeAttr) {
        if (maybeAttr === undefined) {
            return '';
        }
        else {
            return maybeAttr.toLowerCase();
        }
    }
    function slimDOMExcluded(sn, slimDOMOptions) {
        if (slimDOMOptions.comment && sn.type === NodeType.Comment) {
            return true;
        }
        else if (sn.type === NodeType.Element) {
            if (slimDOMOptions.script &&
                (sn.tagName === 'script' ||
                    (sn.tagName === 'link' &&
                        sn.attributes.rel === 'preload' &&
                        sn.attributes.as === 'script') ||
                    (sn.tagName === 'link' &&
                        sn.attributes.rel === 'prefetch' &&
                        typeof sn.attributes.href === 'string' &&
                        sn.attributes.href.endsWith('.js')))) {
                return true;
            }
            else if (slimDOMOptions.headFavicon &&
                ((sn.tagName === 'link' && sn.attributes.rel === 'shortcut icon') ||
                    (sn.tagName === 'meta' &&
                        (lowerIfExists(sn.attributes.name).match(/^msapplication-tile(image|color)$/) ||
                            lowerIfExists(sn.attributes.name) === 'application-name' ||
                            lowerIfExists(sn.attributes.rel) === 'icon' ||
                            lowerIfExists(sn.attributes.rel) === 'apple-touch-icon' ||
                            lowerIfExists(sn.attributes.rel) === 'shortcut icon')))) {
                return true;
            }
            else if (sn.tagName === 'meta') {
                if (slimDOMOptions.headMetaDescKeywords &&
                    lowerIfExists(sn.attributes.name).match(/^description|keywords$/)) {
                    return true;
                }
                else if (slimDOMOptions.headMetaSocial &&
                    (lowerIfExists(sn.attributes.property).match(/^(og|twitter|fb):/) ||
                        lowerIfExists(sn.attributes.name).match(/^(og|twitter):/) ||
                        lowerIfExists(sn.attributes.name) === 'pinterest')) {
                    return true;
                }
                else if (slimDOMOptions.headMetaRobots &&
                    (lowerIfExists(sn.attributes.name) === 'robots' ||
                        lowerIfExists(sn.attributes.name) === 'googlebot' ||
                        lowerIfExists(sn.attributes.name) === 'bingbot')) {
                    return true;
                }
                else if (slimDOMOptions.headMetaHttpEquiv &&
                    sn.attributes['http-equiv'] !== undefined) {
                    return true;
                }
                else if (slimDOMOptions.headMetaAuthorship &&
                    (lowerIfExists(sn.attributes.name) === 'author' ||
                        lowerIfExists(sn.attributes.name) === 'generator' ||
                        lowerIfExists(sn.attributes.name) === 'framework' ||
                        lowerIfExists(sn.attributes.name) === 'publisher' ||
                        lowerIfExists(sn.attributes.name) === 'progid' ||
                        lowerIfExists(sn.attributes.property).match(/^article:/) ||
                        lowerIfExists(sn.attributes.property).match(/^product:/))) {
                    return true;
                }
                else if (slimDOMOptions.headMetaVerification &&
                    (lowerIfExists(sn.attributes.name) === 'google-site-verification' ||
                        lowerIfExists(sn.attributes.name) === 'yandex-verification' ||
                        lowerIfExists(sn.attributes.name) === 'csrf-token' ||
                        lowerIfExists(sn.attributes.name) === 'p:domain_verify' ||
                        lowerIfExists(sn.attributes.name) === 'verify-v1' ||
                        lowerIfExists(sn.attributes.name) === 'verification' ||
                        lowerIfExists(sn.attributes.name) === 'shopify-checkout-api-token')) {
                    return true;
                }
            }
        }
        return false;
    }
    function serializeNodeWithId(n, options) {
        var doc = options.doc, map = options.map, blockClass = options.blockClass, blockSelector = options.blockSelector, maskTextClass = options.maskTextClass, maskTextSelector = options.maskTextSelector, _a = options.skipChild, skipChild = _a === void 0 ? false : _a, _b = options.inlineStylesheet, inlineStylesheet = _b === void 0 ? true : _b, _c = options.maskInputOptions, maskInputOptions = _c === void 0 ? {} : _c, maskTextFn = options.maskTextFn, maskInputFn = options.maskInputFn, slimDOMOptions = options.slimDOMOptions, _d = options.dataURLOptions, dataURLOptions = _d === void 0 ? {} : _d, _e = options.inlineImages, inlineImages = _e === void 0 ? false : _e, _f = options.recordCanvas, recordCanvas = _f === void 0 ? false : _f, onSerialize = options.onSerialize, onIframeLoad = options.onIframeLoad, _g = options.iframeLoadTimeout, iframeLoadTimeout = _g === void 0 ? 5000 : _g, _h = options.keepIframeSrcFn, keepIframeSrcFn = _h === void 0 ? function () { return false; } : _h;
        var _j = options.preserveWhiteSpace, preserveWhiteSpace = _j === void 0 ? true : _j;
        var _serializedNode = serializeNode(n, {
            doc: doc,
            blockClass: blockClass,
            blockSelector: blockSelector,
            maskTextClass: maskTextClass,
            maskTextSelector: maskTextSelector,
            inlineStylesheet: inlineStylesheet,
            maskInputOptions: maskInputOptions,
            maskTextFn: maskTextFn,
            maskInputFn: maskInputFn,
            dataURLOptions: dataURLOptions,
            inlineImages: inlineImages,
            recordCanvas: recordCanvas,
            keepIframeSrcFn: keepIframeSrcFn
        });
        if (!_serializedNode) {
            console.warn(n, 'not serialized');
            return null;
        }
        var id;
        if ('__sn' in n) {
            id = n.__sn.id;
        }
        else if (slimDOMExcluded(_serializedNode, slimDOMOptions) ||
            (!preserveWhiteSpace &&
                _serializedNode.type === NodeType.Text &&
                !_serializedNode.isStyle &&
                !_serializedNode.textContent.replace(/^\s+|\s+$/gm, '').length)) {
            id = IGNORED_NODE;
        }
        else {
            id = genId();
        }
        var serializedNode = Object.assign(_serializedNode, { id: id });
        n.__sn = serializedNode;
        if (id === IGNORED_NODE) {
            return null;
        }
        map[id] = n;
        if (onSerialize) {
            onSerialize(n);
        }
        var recordChild = !skipChild;
        if (serializedNode.type === NodeType.Element) {
            recordChild = recordChild && !serializedNode.needBlock;
            delete serializedNode.needBlock;
            if (n.shadowRoot)
                serializedNode.isShadowHost = true;
        }
        if ((serializedNode.type === NodeType.Document ||
            serializedNode.type === NodeType.Element) &&
            recordChild) {
            if (slimDOMOptions.headWhitespace &&
                _serializedNode.type === NodeType.Element &&
                _serializedNode.tagName === 'head') {
                preserveWhiteSpace = false;
            }
            var bypassOptions = {
                doc: doc,
                map: map,
                blockClass: blockClass,
                blockSelector: blockSelector,
                maskTextClass: maskTextClass,
                maskTextSelector: maskTextSelector,
                skipChild: skipChild,
                inlineStylesheet: inlineStylesheet,
                maskInputOptions: maskInputOptions,
                maskTextFn: maskTextFn,
                maskInputFn: maskInputFn,
                slimDOMOptions: slimDOMOptions,
                dataURLOptions: dataURLOptions,
                inlineImages: inlineImages,
                recordCanvas: recordCanvas,
                preserveWhiteSpace: preserveWhiteSpace,
                onSerialize: onSerialize,
                onIframeLoad: onIframeLoad,
                iframeLoadTimeout: iframeLoadTimeout,
                keepIframeSrcFn: keepIframeSrcFn
            };
            for (var _i = 0, _k = Array.from(n.childNodes); _i < _k.length; _i++) {
                var childN = _k[_i];
                var serializedChildNode = serializeNodeWithId(childN, bypassOptions);
                if (serializedChildNode) {
                    serializedNode.childNodes.push(serializedChildNode);
                }
            }
            if (isElement(n) && n.shadowRoot) {
                for (var _l = 0, _m = Array.from(n.shadowRoot.childNodes); _l < _m.length; _l++) {
                    var childN = _m[_l];
                    var serializedChildNode = serializeNodeWithId(childN, bypassOptions);
                    if (serializedChildNode) {
                        serializedChildNode.isShadow = true;
                        serializedNode.childNodes.push(serializedChildNode);
                    }
                }
            }
        }
        if (n.parentNode && isShadowRoot(n.parentNode)) {
            serializedNode.isShadow = true;
        }
        if (serializedNode.type === NodeType.Element &&
            serializedNode.tagName === 'iframe') {
            onceIframeLoaded(n, function () {
                var iframeDoc = n.contentDocument;
                if (iframeDoc && onIframeLoad) {
                    var serializedIframeNode = serializeNodeWithId(iframeDoc, {
                        doc: iframeDoc,
                        map: map,
                        blockClass: blockClass,
                        blockSelector: blockSelector,
                        maskTextClass: maskTextClass,
                        maskTextSelector: maskTextSelector,
                        skipChild: false,
                        inlineStylesheet: inlineStylesheet,
                        maskInputOptions: maskInputOptions,
                        maskTextFn: maskTextFn,
                        maskInputFn: maskInputFn,
                        slimDOMOptions: slimDOMOptions,
                        dataURLOptions: dataURLOptions,
                        inlineImages: inlineImages,
                        recordCanvas: recordCanvas,
                        preserveWhiteSpace: preserveWhiteSpace,
                        onSerialize: onSerialize,
                        onIframeLoad: onIframeLoad,
                        iframeLoadTimeout: iframeLoadTimeout,
                        keepIframeSrcFn: keepIframeSrcFn
                    });
                    if (serializedIframeNode) {
                        onIframeLoad(n, serializedIframeNode);
                    }
                }
            }, iframeLoadTimeout);
        }
        return serializedNode;
    }
    function snapshot(n, options) {
        var _a = options || {}, _b = _a.blockClass, blockClass = _b === void 0 ? 'rr-block' : _b, _c = _a.blockSelector, blockSelector = _c === void 0 ? null : _c, _d = _a.maskTextClass, maskTextClass = _d === void 0 ? 'rr-mask' : _d, _e = _a.maskTextSelector, maskTextSelector = _e === void 0 ? null : _e, _f = _a.inlineStylesheet, inlineStylesheet = _f === void 0 ? true : _f, _g = _a.inlineImages, inlineImages = _g === void 0 ? false : _g, _h = _a.recordCanvas, recordCanvas = _h === void 0 ? false : _h, _j = _a.maskAllInputs, maskAllInputs = _j === void 0 ? false : _j, maskTextFn = _a.maskTextFn, maskInputFn = _a.maskInputFn, _k = _a.slimDOM, slimDOM = _k === void 0 ? false : _k, dataURLOptions = _a.dataURLOptions, preserveWhiteSpace = _a.preserveWhiteSpace, onSerialize = _a.onSerialize, onIframeLoad = _a.onIframeLoad, iframeLoadTimeout = _a.iframeLoadTimeout, _l = _a.keepIframeSrcFn, keepIframeSrcFn = _l === void 0 ? function () { return false; } : _l;
        var idNodeMap = {};
        var maskInputOptions = maskAllInputs === true
            ? {
                color: true,
                date: true,
                'datetime-local': true,
                email: true,
                month: true,
                number: true,
                range: true,
                search: true,
                tel: true,
                text: true,
                time: true,
                url: true,
                week: true,
                textarea: true,
                select: true,
                password: true
            }
            : maskAllInputs === false
                ? {
                    password: true
                }
                : maskAllInputs;
        var slimDOMOptions = slimDOM === true || slimDOM === 'all'
            ?
                {
                    script: true,
                    comment: true,
                    headFavicon: true,
                    headWhitespace: true,
                    headMetaDescKeywords: slimDOM === 'all',
                    headMetaSocial: true,
                    headMetaRobots: true,
                    headMetaHttpEquiv: true,
                    headMetaAuthorship: true,
                    headMetaVerification: true
                }
            : slimDOM === false
                ? {}
                : slimDOM;
        return [
            serializeNodeWithId(n, {
                doc: n,
                map: idNodeMap,
                blockClass: blockClass,
                blockSelector: blockSelector,
                maskTextClass: maskTextClass,
                maskTextSelector: maskTextSelector,
                skipChild: false,
                inlineStylesheet: inlineStylesheet,
                maskInputOptions: maskInputOptions,
                maskTextFn: maskTextFn,
                maskInputFn: maskInputFn,
                slimDOMOptions: slimDOMOptions,
                dataURLOptions: dataURLOptions,
                inlineImages: inlineImages,
                recordCanvas: recordCanvas,
                preserveWhiteSpace: preserveWhiteSpace,
                onSerialize: onSerialize,
                onIframeLoad: onIframeLoad,
                iframeLoadTimeout: iframeLoadTimeout,
                keepIframeSrcFn: keepIframeSrcFn
            }),
            idNodeMap,
        ];
    }

    var EventType;
    (function (EventType) {
        EventType[EventType["DomContentLoaded"] = 0] = "DomContentLoaded";
        EventType[EventType["Load"] = 1] = "Load";
        EventType[EventType["FullSnapshot"] = 2] = "FullSnapshot";
        EventType[EventType["IncrementalSnapshot"] = 3] = "IncrementalSnapshot";
        EventType[EventType["Meta"] = 4] = "Meta";
        EventType[EventType["Custom"] = 5] = "Custom";
        EventType[EventType["Plugin"] = 6] = "Plugin";
    })(EventType || (EventType = {}));
    var IncrementalSource;
    (function (IncrementalSource) {
        IncrementalSource[IncrementalSource["Mutation"] = 0] = "Mutation";
        IncrementalSource[IncrementalSource["MouseMove"] = 1] = "MouseMove";
        IncrementalSource[IncrementalSource["MouseInteraction"] = 2] = "MouseInteraction";
        IncrementalSource[IncrementalSource["Scroll"] = 3] = "Scroll";
        IncrementalSource[IncrementalSource["ViewportResize"] = 4] = "ViewportResize";
        IncrementalSource[IncrementalSource["Input"] = 5] = "Input";
        IncrementalSource[IncrementalSource["TouchMove"] = 6] = "TouchMove";
        IncrementalSource[IncrementalSource["MediaInteraction"] = 7] = "MediaInteraction";
        IncrementalSource[IncrementalSource["StyleSheetRule"] = 8] = "StyleSheetRule";
        IncrementalSource[IncrementalSource["CanvasMutation"] = 9] = "CanvasMutation";
        IncrementalSource[IncrementalSource["Font"] = 10] = "Font";
        IncrementalSource[IncrementalSource["Log"] = 11] = "Log";
        IncrementalSource[IncrementalSource["Drag"] = 12] = "Drag";
        IncrementalSource[IncrementalSource["StyleDeclaration"] = 13] = "StyleDeclaration";
    })(IncrementalSource || (IncrementalSource = {}));
    var MouseInteractions;
    (function (MouseInteractions) {
        MouseInteractions[MouseInteractions["MouseUp"] = 0] = "MouseUp";
        MouseInteractions[MouseInteractions["MouseDown"] = 1] = "MouseDown";
        MouseInteractions[MouseInteractions["Click"] = 2] = "Click";
        MouseInteractions[MouseInteractions["ContextMenu"] = 3] = "ContextMenu";
        MouseInteractions[MouseInteractions["DblClick"] = 4] = "DblClick";
        MouseInteractions[MouseInteractions["Focus"] = 5] = "Focus";
        MouseInteractions[MouseInteractions["Blur"] = 6] = "Blur";
        MouseInteractions[MouseInteractions["TouchStart"] = 7] = "TouchStart";
        MouseInteractions[MouseInteractions["TouchMove_Departed"] = 8] = "TouchMove_Departed";
        MouseInteractions[MouseInteractions["TouchEnd"] = 9] = "TouchEnd";
        MouseInteractions[MouseInteractions["TouchCancel"] = 10] = "TouchCancel";
    })(MouseInteractions || (MouseInteractions = {}));
    var CanvasContext;
    (function (CanvasContext) {
        CanvasContext[CanvasContext["2D"] = 0] = "2D";
        CanvasContext[CanvasContext["WebGL"] = 1] = "WebGL";
        CanvasContext[CanvasContext["WebGL2"] = 2] = "WebGL2";
    })(CanvasContext || (CanvasContext = {}));
    var MediaInteractions;
    (function (MediaInteractions) {
        MediaInteractions[MediaInteractions["Play"] = 0] = "Play";
        MediaInteractions[MediaInteractions["Pause"] = 1] = "Pause";
        MediaInteractions[MediaInteractions["Seeked"] = 2] = "Seeked";
        MediaInteractions[MediaInteractions["VolumeChange"] = 3] = "VolumeChange";
    })(MediaInteractions || (MediaInteractions = {}));
    var ReplayerEvents;
    (function (ReplayerEvents) {
        ReplayerEvents["Start"] = "start";
        ReplayerEvents["Pause"] = "pause";
        ReplayerEvents["Resume"] = "resume";
        ReplayerEvents["Resize"] = "resize";
        ReplayerEvents["Finish"] = "finish";
        ReplayerEvents["FullsnapshotRebuilded"] = "fullsnapshot-rebuilded";
        ReplayerEvents["LoadStylesheetStart"] = "load-stylesheet-start";
        ReplayerEvents["LoadStylesheetEnd"] = "load-stylesheet-end";
        ReplayerEvents["SkipStart"] = "skip-start";
        ReplayerEvents["SkipEnd"] = "skip-end";
        ReplayerEvents["MouseInteraction"] = "mouse-interaction";
        ReplayerEvents["EventCast"] = "event-cast";
        ReplayerEvents["CustomEvent"] = "custom-event";
        ReplayerEvents["Flush"] = "flush";
        ReplayerEvents["StateChange"] = "state-change";
        ReplayerEvents["PlayBack"] = "play-back";
    })(ReplayerEvents || (ReplayerEvents = {}));

    function on(type, fn, target) {
        if (target === void 0) { target = document; }
        var options = { capture: true, passive: true };
        target.addEventListener(type, fn, options);
        return function () { return target.removeEventListener(type, fn, options); };
    }
    function createMirror() {
        return {
            map: {},
            getId: function (n) {
                if (!n || !n.__sn) {
                    return -1;
                }
                return n.__sn.id;
            },
            getNode: function (id) {
                return this.map[id] || null;
            },
            removeNodeFromMap: function (n) {
                var _this = this;
                var id = n.__sn && n.__sn.id;
                delete this.map[id];
                if (n.childNodes) {
                    n.childNodes.forEach(function (child) {
                        return _this.removeNodeFromMap(child);
                    });
                }
            },
            has: function (id) {
                return this.map.hasOwnProperty(id);
            },
            reset: function () {
                this.map = {};
            },
        };
    }
    var DEPARTED_MIRROR_ACCESS_WARNING = 'Please stop import mirror directly. Instead of that,' +
        '\r\n' +
        'now you can use replayer.getMirror() to access the mirror instance of a replayer,' +
        '\r\n' +
        'or you can use record.mirror to access the mirror instance during recording.';
    var _mirror = {
        map: {},
        getId: function () {
            console.error(DEPARTED_MIRROR_ACCESS_WARNING);
            return -1;
        },
        getNode: function () {
            console.error(DEPARTED_MIRROR_ACCESS_WARNING);
            return null;
        },
        removeNodeFromMap: function () {
            console.error(DEPARTED_MIRROR_ACCESS_WARNING);
        },
        has: function () {
            console.error(DEPARTED_MIRROR_ACCESS_WARNING);
            return false;
        },
        reset: function () {
            console.error(DEPARTED_MIRROR_ACCESS_WARNING);
        },
    };
    if (typeof window !== 'undefined' && window.Proxy && window.Reflect) {
        _mirror = new Proxy(_mirror, {
            get: function (target, prop, receiver) {
                if (prop === 'map') {
                    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
                }
                return Reflect.get(target, prop, receiver);
            },
        });
    }
    function throttle(func, wait, options) {
        if (options === void 0) { options = {}; }
        var timeout = null;
        var previous = 0;
        return function (arg) {
            var now = Date.now();
            if (!previous && options.leading === false) {
                previous = now;
            }
            var remaining = wait - (now - previous);
            var context = this;
            var args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                func.apply(context, args);
            }
            else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(function () {
                    previous = options.leading === false ? 0 : Date.now();
                    timeout = null;
                    func.apply(context, args);
                }, remaining);
            }
        };
    }
    function hookSetter(target, key, d, isRevoked, win) {
        if (win === void 0) { win = window; }
        var original = win.Object.getOwnPropertyDescriptor(target, key);
        win.Object.defineProperty(target, key, isRevoked
            ? d
            : {
                set: function (value) {
                    var _this = this;
                    setTimeout(function () {
                        d.set.call(_this, value);
                    }, 0);
                    if (original && original.set) {
                        original.set.call(this, value);
                    }
                },
            });
        return function () { return hookSetter(target, key, original || {}, true); };
    }
    function patch(source, name, replacement) {
        try {
            if (!(name in source)) {
                return function () { };
            }
            var original_1 = source[name];
            var wrapped = replacement(original_1);
            if (typeof wrapped === 'function') {
                wrapped.prototype = wrapped.prototype || {};
                Object.defineProperties(wrapped, {
                    __rrweb_original__: {
                        enumerable: false,
                        value: original_1,
                    },
                });
            }
            source[name] = wrapped;
            return function () {
                source[name] = original_1;
            };
        }
        catch (_a) {
            return function () { };
        }
    }
    function getWindowHeight() {
        return (window.innerHeight ||
            (document.documentElement && document.documentElement.clientHeight) ||
            (document.body && document.body.clientHeight));
    }
    function getWindowWidth() {
        return (window.innerWidth ||
            (document.documentElement && document.documentElement.clientWidth) ||
            (document.body && document.body.clientWidth));
    }
    function isBlocked(node, blockClass) {
        if (!node) {
            return false;
        }
        if (node.nodeType === node.ELEMENT_NODE) {
            var needBlock_1 = false;
            if (typeof blockClass === 'string') {
                if (node.closest !== undefined) {
                    return node.closest('.' + blockClass) !== null;
                }
                else {
                    needBlock_1 = node.classList.contains(blockClass);
                }
            }
            else {
                node.classList.forEach(function (className) {
                    if (blockClass.test(className)) {
                        needBlock_1 = true;
                    }
                });
            }
            return needBlock_1 || isBlocked(node.parentNode, blockClass);
        }
        if (node.nodeType === node.TEXT_NODE) {
            return isBlocked(node.parentNode, blockClass);
        }
        return isBlocked(node.parentNode, blockClass);
    }
    function isIgnored(n) {
        if ('__sn' in n) {
            return n.__sn.id === IGNORED_NODE;
        }
        return false;
    }
    function isAncestorRemoved(target, mirror) {
        if (isShadowRoot(target)) {
            return false;
        }
        var id = mirror.getId(target);
        if (!mirror.has(id)) {
            return true;
        }
        if (target.parentNode &&
            target.parentNode.nodeType === target.DOCUMENT_NODE) {
            return false;
        }
        if (!target.parentNode) {
            return true;
        }
        return isAncestorRemoved(target.parentNode, mirror);
    }
    function isTouchEvent(event) {
        return Boolean(event.changedTouches);
    }
    function polyfill(win) {
        if (win === void 0) { win = window; }
        if ('NodeList' in win && !win.NodeList.prototype.forEach) {
            win.NodeList.prototype.forEach = Array.prototype
                .forEach;
        }
        if ('DOMTokenList' in win && !win.DOMTokenList.prototype.forEach) {
            win.DOMTokenList.prototype.forEach = Array.prototype
                .forEach;
        }
        if (!Node.prototype.contains) {
            Node.prototype.contains = function contains(node) {
                if (!(0 in arguments)) {
                    throw new TypeError('1 argument is required');
                }
                do {
                    if (this === node) {
                        return true;
                    }
                } while ((node = node && node.parentNode));
                return false;
            };
        }
    }
    function isIframeINode(node) {
        if ('__sn' in node) {
            return (node.__sn.type === NodeType.Element && node.__sn.tagName === 'iframe');
        }
        return false;
    }
    function hasShadowRoot(n) {
        return Boolean(n === null || n === void 0 ? void 0 : n.shadowRoot);
    }

    function isNodeInLinkedList(n) {
        return '__ln' in n;
    }
    var DoubleLinkedList = (function () {
        function DoubleLinkedList() {
            this.length = 0;
            this.head = null;
        }
        DoubleLinkedList.prototype.get = function (position) {
            if (position >= this.length) {
                throw new Error('Position outside of list range');
            }
            var current = this.head;
            for (var index = 0; index < position; index++) {
                current = (current === null || current === void 0 ? void 0 : current.next) || null;
            }
            return current;
        };
        DoubleLinkedList.prototype.addNode = function (n) {
            var node = {
                value: n,
                previous: null,
                next: null,
            };
            n.__ln = node;
            if (n.previousSibling && isNodeInLinkedList(n.previousSibling)) {
                var current = n.previousSibling.__ln.next;
                node.next = current;
                node.previous = n.previousSibling.__ln;
                n.previousSibling.__ln.next = node;
                if (current) {
                    current.previous = node;
                }
            }
            else if (n.nextSibling &&
                isNodeInLinkedList(n.nextSibling) &&
                n.nextSibling.__ln.previous) {
                var current = n.nextSibling.__ln.previous;
                node.previous = current;
                node.next = n.nextSibling.__ln;
                n.nextSibling.__ln.previous = node;
                if (current) {
                    current.next = node;
                }
            }
            else {
                if (this.head) {
                    this.head.previous = node;
                }
                node.next = this.head;
                this.head = node;
            }
            this.length++;
        };
        DoubleLinkedList.prototype.removeNode = function (n) {
            var current = n.__ln;
            if (!this.head) {
                return;
            }
            if (!current.previous) {
                this.head = current.next;
                if (this.head) {
                    this.head.previous = null;
                }
            }
            else {
                current.previous.next = current.next;
                if (current.next) {
                    current.next.previous = current.previous;
                }
            }
            if (n.__ln) {
                delete n.__ln;
            }
            this.length--;
        };
        return DoubleLinkedList;
    }());
    var moveKey = function (id, parentId) { return "".concat(id, "@").concat(parentId); };
    function isINode(n) {
        return '__sn' in n;
    }
    var MutationBuffer = (function () {
        function MutationBuffer() {
            var _this = this;
            this.frozen = false;
            this.locked = false;
            this.texts = [];
            this.attributes = [];
            this.removes = [];
            this.mapRemoves = [];
            this.movedMap = {};
            this.addedSet = new Set();
            this.movedSet = new Set();
            this.droppedSet = new Set();
            this.processMutations = function (mutations) {
                mutations.forEach(_this.processMutation);
                _this.emit();
            };
            this.emit = function () {
                var e_1, _a, e_2, _b;
                if (_this.frozen || _this.locked) {
                    return;
                }
                var adds = [];
                var addList = new DoubleLinkedList();
                var getNextId = function (n) {
                    var ns = n;
                    var nextId = IGNORED_NODE;
                    while (nextId === IGNORED_NODE) {
                        ns = ns && ns.nextSibling;
                        nextId = ns && _this.mirror.getId(ns);
                    }
                    return nextId;
                };
                var pushAdd = function (n) {
                    var _a, _b, _c, _d, _e;
                    var shadowHost = n.getRootNode
                        ? (_a = n.getRootNode()) === null || _a === void 0 ? void 0 : _a.host
                        : null;
                    var rootShadowHost = shadowHost;
                    while ((_c = (_b = rootShadowHost === null || rootShadowHost === void 0 ? void 0 : rootShadowHost.getRootNode) === null || _b === void 0 ? void 0 : _b.call(rootShadowHost)) === null || _c === void 0 ? void 0 : _c.host)
                        rootShadowHost =
                            ((_e = (_d = rootShadowHost === null || rootShadowHost === void 0 ? void 0 : rootShadowHost.getRootNode) === null || _d === void 0 ? void 0 : _d.call(rootShadowHost)) === null || _e === void 0 ? void 0 : _e.host) ||
                                null;
                    var notInDoc = !_this.doc.contains(n) &&
                        (rootShadowHost === null || !_this.doc.contains(rootShadowHost));
                    if (!n.parentNode || notInDoc) {
                        return;
                    }
                    var parentId = isShadowRoot(n.parentNode)
                        ? _this.mirror.getId(shadowHost)
                        : _this.mirror.getId(n.parentNode);
                    var nextId = getNextId(n);
                    if (parentId === -1 || nextId === -1) {
                        return addList.addNode(n);
                    }
                    var sn = serializeNodeWithId(n, {
                        doc: _this.doc,
                        map: _this.mirror.map,
                        blockClass: _this.blockClass,
                        blockSelector: _this.blockSelector,
                        maskTextClass: _this.maskTextClass,
                        maskTextSelector: _this.maskTextSelector,
                        skipChild: true,
                        inlineStylesheet: _this.inlineStylesheet,
                        maskInputOptions: _this.maskInputOptions,
                        maskTextFn: _this.maskTextFn,
                        maskInputFn: _this.maskInputFn,
                        slimDOMOptions: _this.slimDOMOptions,
                        recordCanvas: _this.recordCanvas,
                        inlineImages: _this.inlineImages,
                        onSerialize: function (currentN) {
                            if (isIframeINode(currentN)) {
                                _this.iframeManager.addIframe(currentN);
                            }
                            if (hasShadowRoot(n)) {
                                _this.shadowDomManager.addShadowRoot(n.shadowRoot, document);
                            }
                        },
                        onIframeLoad: function (iframe, childSn) {
                            _this.iframeManager.attachIframe(iframe, childSn);
                            _this.shadowDomManager.observeAttachShadow(iframe);
                        },
                    });
                    if (sn) {
                        adds.push({
                            parentId: parentId,
                            nextId: nextId,
                            node: sn,
                        });
                    }
                };
                while (_this.mapRemoves.length) {
                    _this.mirror.removeNodeFromMap(_this.mapRemoves.shift());
                }
                try {
                    for (var _c = __values(_this.movedSet), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var n = _d.value;
                        if (isParentRemoved(_this.removes, n, _this.mirror) &&
                            !_this.movedSet.has(n.parentNode)) {
                            continue;
                        }
                        pushAdd(n);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                try {
                    for (var _e = __values(_this.addedSet), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var n = _f.value;
                        if (!isAncestorInSet(_this.droppedSet, n) &&
                            !isParentRemoved(_this.removes, n, _this.mirror)) {
                            pushAdd(n);
                        }
                        else if (isAncestorInSet(_this.movedSet, n)) {
                            pushAdd(n);
                        }
                        else {
                            _this.droppedSet.add(n);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                var candidate = null;
                while (addList.length) {
                    var node = null;
                    if (candidate) {
                        var parentId = _this.mirror.getId(candidate.value.parentNode);
                        var nextId = getNextId(candidate.value);
                        if (parentId !== -1 && nextId !== -1) {
                            node = candidate;
                        }
                    }
                    if (!node) {
                        for (var index = addList.length - 1; index >= 0; index--) {
                            var _node = addList.get(index);
                            if (_node) {
                                var parentId = _this.mirror.getId(_node.value.parentNode);
                                var nextId = getNextId(_node.value);
                                if (parentId !== -1 && nextId !== -1) {
                                    node = _node;
                                    break;
                                }
                            }
                        }
                    }
                    if (!node) {
                        while (addList.head) {
                            addList.removeNode(addList.head.value);
                        }
                        break;
                    }
                    candidate = node.previous;
                    addList.removeNode(node.value);
                    pushAdd(node.value);
                }
                var payload = {
                    texts: _this.texts
                        .map(function (text) { return ({
                        id: _this.mirror.getId(text.node),
                        value: text.value,
                    }); })
                        .filter(function (text) { return _this.mirror.has(text.id); }),
                    attributes: _this.attributes
                        .map(function (attribute) { return ({
                        id: _this.mirror.getId(attribute.node),
                        attributes: attribute.attributes,
                    }); })
                        .filter(function (attribute) { return _this.mirror.has(attribute.id); }),
                    removes: _this.removes,
                    adds: adds,
                };
                if (!payload.texts.length &&
                    !payload.attributes.length &&
                    !payload.removes.length &&
                    !payload.adds.length) {
                    return;
                }
                _this.texts = [];
                _this.attributes = [];
                _this.removes = [];
                _this.addedSet = new Set();
                _this.movedSet = new Set();
                _this.droppedSet = new Set();
                _this.movedMap = {};
                _this.mutationCb(payload);
            };
            this.processMutation = function (m) {
                var e_3, _a, e_4, _b;
                if (isIgnored(m.target)) {
                    return;
                }
                switch (m.type) {
                    case 'characterData': {
                        var value = m.target.textContent;
                        if (!isBlocked(m.target, _this.blockClass) && value !== m.oldValue) {
                            _this.texts.push({
                                value: needMaskingText(m.target, _this.maskTextClass, _this.maskTextSelector) && value
                                    ? _this.maskTextFn
                                        ? _this.maskTextFn(value)
                                        : value.replace(/[\S]/g, '*')
                                    : value,
                                node: m.target,
                            });
                        }
                        break;
                    }
                    case 'attributes': {
                        var target = m.target;
                        var value = m.target.getAttribute(m.attributeName);
                        if (m.attributeName === 'value') {
                            value = maskInputValue({
                                maskInputOptions: _this.maskInputOptions,
                                tagName: m.target.tagName,
                                type: m.target.getAttribute('type'),
                                value: value,
                                maskInputFn: _this.maskInputFn,
                            });
                        }
                        if (isBlocked(m.target, _this.blockClass) || value === m.oldValue) {
                            return;
                        }
                        var item = _this.attributes.find(function (a) { return a.node === m.target; });
                        if (!item) {
                            item = {
                                node: m.target,
                                attributes: {},
                            };
                            _this.attributes.push(item);
                        }
                        if (m.attributeName === 'style') {
                            var old = _this.doc.createElement('span');
                            if (m.oldValue) {
                                old.setAttribute('style', m.oldValue);
                            }
                            if (item.attributes.style === undefined ||
                                item.attributes.style === null) {
                                item.attributes.style = {};
                            }
                            var styleObj = item.attributes.style;
                            try {
                                for (var _c = __values(Array.from(target.style)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var pname = _d.value;
                                    var newValue = target.style.getPropertyValue(pname);
                                    var newPriority = target.style.getPropertyPriority(pname);
                                    if (newValue !== old.style.getPropertyValue(pname) ||
                                        newPriority !== old.style.getPropertyPriority(pname)) {
                                        if (newPriority === '') {
                                            styleObj[pname] = newValue;
                                        }
                                        else {
                                            styleObj[pname] = [newValue, newPriority];
                                        }
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                            try {
                                for (var _e = __values(Array.from(old.style)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                    var pname = _f.value;
                                    if (target.style.getPropertyValue(pname) === '') {
                                        styleObj[pname] = false;
                                    }
                                }
                            }
                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                            finally {
                                try {
                                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                }
                                finally { if (e_4) throw e_4.error; }
                            }
                        }
                        else {
                            item.attributes[m.attributeName] = transformAttribute(_this.doc, m.target.tagName, m.attributeName, value);
                        }
                        break;
                    }
                    case 'childList': {
                        m.addedNodes.forEach(function (n) { return _this.genAdds(n, m.target); });
                        m.removedNodes.forEach(function (n) {
                            var nodeId = _this.mirror.getId(n);
                            var parentId = isShadowRoot(m.target)
                                ? _this.mirror.getId(m.target.host)
                                : _this.mirror.getId(m.target);
                            if (isBlocked(m.target, _this.blockClass) || isIgnored(n)) {
                                return;
                            }
                            if (_this.addedSet.has(n)) {
                                deepDelete(_this.addedSet, n);
                                _this.droppedSet.add(n);
                            }
                            else if (_this.addedSet.has(m.target) && nodeId === -1) ;
                            else if (isAncestorRemoved(m.target, _this.mirror)) ;
                            else if (_this.movedSet.has(n) &&
                                _this.movedMap[moveKey(nodeId, parentId)]) {
                                deepDelete(_this.movedSet, n);
                            }
                            else {
                                _this.removes.push({
                                    parentId: parentId,
                                    id: nodeId,
                                    isShadow: isShadowRoot(m.target) ? true : undefined,
                                });
                            }
                            _this.mapRemoves.push(n);
                        });
                        break;
                    }
                }
            };
            this.genAdds = function (n, target) {
                if (target && isBlocked(target, _this.blockClass)) {
                    return;
                }
                if (isINode(n)) {
                    if (isIgnored(n)) {
                        return;
                    }
                    _this.movedSet.add(n);
                    var targetId = null;
                    if (target && isINode(target)) {
                        targetId = target.__sn.id;
                    }
                    if (targetId) {
                        _this.movedMap[moveKey(n.__sn.id, targetId)] = true;
                    }
                }
                else {
                    _this.addedSet.add(n);
                    _this.droppedSet.delete(n);
                }
                if (!isBlocked(n, _this.blockClass))
                    n.childNodes.forEach(function (childN) { return _this.genAdds(childN); });
            };
        }
        MutationBuffer.prototype.init = function (options) {
            var _this = this;
            [
                'mutationCb',
                'blockClass',
                'blockSelector',
                'maskTextClass',
                'maskTextSelector',
                'inlineStylesheet',
                'maskInputOptions',
                'maskTextFn',
                'maskInputFn',
                'recordCanvas',
                'inlineImages',
                'slimDOMOptions',
                'doc',
                'mirror',
                'iframeManager',
                'shadowDomManager',
                'canvasManager',
            ].forEach(function (key) {
                _this[key] = options[key];
            });
        };
        MutationBuffer.prototype.freeze = function () {
            this.frozen = true;
            this.canvasManager.freeze();
        };
        MutationBuffer.prototype.unfreeze = function () {
            this.frozen = false;
            this.canvasManager.unfreeze();
            this.emit();
        };
        MutationBuffer.prototype.isFrozen = function () {
            return this.frozen;
        };
        MutationBuffer.prototype.lock = function () {
            this.locked = true;
            this.canvasManager.lock();
        };
        MutationBuffer.prototype.unlock = function () {
            this.locked = false;
            this.canvasManager.unlock();
            this.emit();
        };
        MutationBuffer.prototype.reset = function () {
            this.shadowDomManager.reset();
            this.canvasManager.reset();
        };
        return MutationBuffer;
    }());
    function deepDelete(addsSet, n) {
        addsSet.delete(n);
        n.childNodes.forEach(function (childN) { return deepDelete(addsSet, childN); });
    }
    function isParentRemoved(removes, n, mirror) {
        var parentNode = n.parentNode;
        if (!parentNode) {
            return false;
        }
        var parentId = mirror.getId(parentNode);
        if (removes.some(function (r) { return r.id === parentId; })) {
            return true;
        }
        return isParentRemoved(removes, parentNode, mirror);
    }
    function isAncestorInSet(set, n) {
        var parentNode = n.parentNode;
        if (!parentNode) {
            return false;
        }
        if (set.has(parentNode)) {
            return true;
        }
        return isAncestorInSet(set, parentNode);
    }

    var MutationBuffer$1 = MutationBuffer;

    var mutationBuffers = [];
    var isCSSGroupingRuleSupported = typeof CSSGroupingRule !== 'undefined';
    var isCSSMediaRuleSupported = typeof CSSMediaRule !== 'undefined';
    var isCSSSupportsRuleSupported = typeof CSSSupportsRule !== 'undefined';
    var isCSSConditionRuleSupported = typeof CSSConditionRule !== 'undefined';
    function getEventTarget(event) {
        try {
            if ('composedPath' in event) {
                var path = event.composedPath();
                if (path.length) {
                    return path[0];
                }
            }
            else if ('path' in event && event.path.length) {
                return event.path[0];
            }
            return event.target;
        }
        catch (_a) {
            return event.target;
        }
    }
    function initMutationObserver(options, rootEl) {
        var _a, _b;
        var mutationBuffer = new MutationBuffer$1();
        mutationBuffers.push(mutationBuffer);
        mutationBuffer.init(options);
        var mutationObserverCtor = window.MutationObserver ||
            window.__rrMutationObserver;
        var angularZoneSymbol = (_b = (_a = window === null || window === void 0 ? void 0 : window.Zone) === null || _a === void 0 ? void 0 : _a.__symbol__) === null || _b === void 0 ? void 0 : _b.call(_a, 'MutationObserver');
        if (angularZoneSymbol &&
            window[angularZoneSymbol]) {
            mutationObserverCtor = window[angularZoneSymbol];
        }
        var observer = new mutationObserverCtor(mutationBuffer.processMutations.bind(mutationBuffer));
        observer.observe(rootEl, {
            attributes: true,
            attributeOldValue: true,
            characterData: true,
            characterDataOldValue: true,
            childList: true,
            subtree: true,
        });
        return observer;
    }
    function initMoveObserver(_a) {
        var mousemoveCb = _a.mousemoveCb, sampling = _a.sampling, doc = _a.doc, mirror = _a.mirror;
        if (sampling.mousemove === false) {
            return function () { };
        }
        var threshold = typeof sampling.mousemove === 'number' ? sampling.mousemove : 50;
        var callbackThreshold = typeof sampling.mousemoveCallback === 'number'
            ? sampling.mousemoveCallback
            : 500;
        var positions = [];
        var timeBaseline;
        var wrappedCb = throttle(function (source) {
            var totalOffset = Date.now() - timeBaseline;
            mousemoveCb(positions.map(function (p) {
                p.timeOffset -= totalOffset;
                return p;
            }), source);
            positions = [];
            timeBaseline = null;
        }, callbackThreshold);
        var updatePosition = throttle(function (evt) {
            var target = getEventTarget(evt);
            var _a = isTouchEvent(evt)
                ? evt.changedTouches[0]
                : evt, clientX = _a.clientX, clientY = _a.clientY;
            if (!timeBaseline) {
                timeBaseline = Date.now();
            }
            positions.push({
                x: clientX,
                y: clientY,
                id: mirror.getId(target),
                timeOffset: Date.now() - timeBaseline,
            });
            wrappedCb(typeof DragEvent !== 'undefined' && evt instanceof DragEvent
                ? IncrementalSource.Drag
                : evt instanceof MouseEvent
                    ? IncrementalSource.MouseMove
                    : IncrementalSource.TouchMove);
        }, threshold, {
            trailing: false,
        });
        var handlers = [
            on('mousemove', updatePosition, doc),
            on('touchmove', updatePosition, doc),
            on('drag', updatePosition, doc),
        ];
        return function () {
            handlers.forEach(function (h) { return h(); });
        };
    }
    function initMouseInteractionObserver(_a) {
        var mouseInteractionCb = _a.mouseInteractionCb, doc = _a.doc, mirror = _a.mirror, blockClass = _a.blockClass, sampling = _a.sampling;
        if (sampling.mouseInteraction === false) {
            return function () { };
        }
        var disableMap = sampling.mouseInteraction === true ||
            sampling.mouseInteraction === undefined
            ? {}
            : sampling.mouseInteraction;
        var handlers = [];
        var getHandler = function (eventKey) {
            return function (event) {
                var target = getEventTarget(event);
                if (isBlocked(target, blockClass)) {
                    return;
                }
                var e = isTouchEvent(event) ? event.changedTouches[0] : event;
                if (!e) {
                    return;
                }
                var id = mirror.getId(target);
                var clientX = e.clientX, clientY = e.clientY;
                mouseInteractionCb({
                    type: MouseInteractions[eventKey],
                    id: id,
                    x: clientX,
                    y: clientY,
                });
            };
        };
        Object.keys(MouseInteractions)
            .filter(function (key) {
            return Number.isNaN(Number(key)) &&
                !key.endsWith('_Departed') &&
                disableMap[key] !== false;
        })
            .forEach(function (eventKey) {
            var eventName = eventKey.toLowerCase();
            var handler = getHandler(eventKey);
            handlers.push(on(eventName, handler, doc));
        });
        return function () {
            handlers.forEach(function (h) { return h(); });
        };
    }
    function initScrollObserver(_a) {
        var scrollCb = _a.scrollCb, doc = _a.doc, mirror = _a.mirror, blockClass = _a.blockClass, sampling = _a.sampling;
        var updatePosition = throttle(function (evt) {
            var target = getEventTarget(evt);
            if (!target || isBlocked(target, blockClass)) {
                return;
            }
            var id = mirror.getId(target);
            if (target === doc) {
                var scrollEl = (doc.scrollingElement || doc.documentElement);
                scrollCb({
                    id: id,
                    x: scrollEl.scrollLeft,
                    y: scrollEl.scrollTop,
                });
            }
            else {
                scrollCb({
                    id: id,
                    x: target.scrollLeft,
                    y: target.scrollTop,
                });
            }
        }, sampling.scroll || 100);
        return on('scroll', updatePosition, doc);
    }
    function initViewportResizeObserver(_a) {
        var viewportResizeCb = _a.viewportResizeCb;
        var lastH = -1;
        var lastW = -1;
        var updateDimension = throttle(function () {
            var height = getWindowHeight();
            var width = getWindowWidth();
            if (lastH !== height || lastW !== width) {
                viewportResizeCb({
                    width: Number(width),
                    height: Number(height),
                });
                lastH = height;
                lastW = width;
            }
        }, 200);
        return on('resize', updateDimension, window);
    }
    function wrapEventWithUserTriggeredFlag(v, enable) {
        var value = __assign({}, v);
        if (!enable)
            delete value.userTriggered;
        return value;
    }
    var INPUT_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];
    var lastInputValueMap = new WeakMap();
    function initInputObserver(_a) {
        var inputCb = _a.inputCb, doc = _a.doc, mirror = _a.mirror, blockClass = _a.blockClass, ignoreClass = _a.ignoreClass, maskInputOptions = _a.maskInputOptions, maskInputFn = _a.maskInputFn, sampling = _a.sampling, userTriggeredOnInput = _a.userTriggeredOnInput;
        function eventHandler(event) {
            var target = getEventTarget(event);
            var userTriggered = event.isTrusted;
            if (target && target.tagName === 'OPTION')
                target = target.parentElement;
            if (!target ||
                !target.tagName ||
                INPUT_TAGS.indexOf(target.tagName) < 0 ||
                isBlocked(target, blockClass)) {
                return;
            }
            var type = target.type;
            if (target.classList.contains(ignoreClass)) {
                return;
            }
            var text = target.value;
            var isChecked = false;
            if (type === 'radio' || type === 'checkbox') {
                isChecked = target.checked;
            }
            else if (maskInputOptions[target.tagName.toLowerCase()] ||
                maskInputOptions[type]) {
                text = maskInputValue({
                    maskInputOptions: maskInputOptions,
                    tagName: target.tagName,
                    type: type,
                    value: text,
                    maskInputFn: maskInputFn,
                });
            }
            cbWithDedup(target, wrapEventWithUserTriggeredFlag({ text: text, isChecked: isChecked, userTriggered: userTriggered }, userTriggeredOnInput));
            var name = target.name;
            if (type === 'radio' && name && isChecked) {
                doc
                    .querySelectorAll("input[type=\"radio\"][name=\"".concat(name, "\"]"))
                    .forEach(function (el) {
                    if (el !== target) {
                        cbWithDedup(el, wrapEventWithUserTriggeredFlag({
                            text: el.value,
                            isChecked: !isChecked,
                            userTriggered: false,
                        }, userTriggeredOnInput));
                    }
                });
            }
        }
        function cbWithDedup(target, v) {
            var lastInputValue = lastInputValueMap.get(target);
            if (!lastInputValue ||
                lastInputValue.text !== v.text ||
                lastInputValue.isChecked !== v.isChecked) {
                lastInputValueMap.set(target, v);
                var id = mirror.getId(target);
                inputCb(__assign(__assign({}, v), { id: id }));
            }
        }
        var events = sampling.input === 'last' ? ['change'] : ['input', 'change'];
        var handlers = events.map(function (eventName) { return on(eventName, eventHandler, doc); });
        var propertyDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
        var hookProperties = [
            [HTMLInputElement.prototype, 'value'],
            [HTMLInputElement.prototype, 'checked'],
            [HTMLSelectElement.prototype, 'value'],
            [HTMLTextAreaElement.prototype, 'value'],
            [HTMLSelectElement.prototype, 'selectedIndex'],
            [HTMLOptionElement.prototype, 'selected'],
        ];
        if (propertyDescriptor && propertyDescriptor.set) {
            handlers.push.apply(handlers, __spreadArray([], __read(hookProperties.map(function (p) {
                return hookSetter(p[0], p[1], {
                    set: function () {
                        eventHandler({ target: this });
                    },
                });
            })), false));
        }
        return function () {
            handlers.forEach(function (h) { return h(); });
        };
    }
    function getNestedCSSRulePositions(rule) {
        var positions = [];
        function recurse(childRule, pos) {
            if ((isCSSGroupingRuleSupported &&
                childRule.parentRule instanceof CSSGroupingRule) ||
                (isCSSMediaRuleSupported &&
                    childRule.parentRule instanceof CSSMediaRule) ||
                (isCSSSupportsRuleSupported &&
                    childRule.parentRule instanceof CSSSupportsRule) ||
                (isCSSConditionRuleSupported &&
                    childRule.parentRule instanceof CSSConditionRule)) {
                var rules = Array.from(childRule.parentRule.cssRules);
                var index = rules.indexOf(childRule);
                pos.unshift(index);
            }
            else {
                var rules = Array.from(childRule.parentStyleSheet.cssRules);
                var index = rules.indexOf(childRule);
                pos.unshift(index);
            }
            return pos;
        }
        return recurse(rule, positions);
    }
    function initStyleSheetObserver(_a, _b) {
        var styleSheetRuleCb = _a.styleSheetRuleCb, mirror = _a.mirror;
        var win = _b.win;
        var insertRule = win.CSSStyleSheet.prototype.insertRule;
        win.CSSStyleSheet.prototype.insertRule = function (rule, index) {
            var id = mirror.getId(this.ownerNode);
            if (id !== -1) {
                styleSheetRuleCb({
                    id: id,
                    adds: [{ rule: rule, index: index }],
                });
            }
            return insertRule.apply(this, arguments);
        };
        var deleteRule = win.CSSStyleSheet.prototype.deleteRule;
        win.CSSStyleSheet.prototype.deleteRule = function (index) {
            var id = mirror.getId(this.ownerNode);
            if (id !== -1) {
                styleSheetRuleCb({
                    id: id,
                    removes: [{ index: index }],
                });
            }
            return deleteRule.apply(this, arguments);
        };
        var supportedNestedCSSRuleTypes = {};
        if (isCSSGroupingRuleSupported) {
            supportedNestedCSSRuleTypes.CSSGroupingRule = win.CSSGroupingRule;
        }
        else {
            if (isCSSMediaRuleSupported) {
                supportedNestedCSSRuleTypes.CSSMediaRule = win.CSSMediaRule;
            }
            if (isCSSConditionRuleSupported) {
                supportedNestedCSSRuleTypes.CSSConditionRule = win.CSSConditionRule;
            }
            if (isCSSSupportsRuleSupported) {
                supportedNestedCSSRuleTypes.CSSSupportsRule = win.CSSSupportsRule;
            }
        }
        var unmodifiedFunctions = {};
        Object.entries(supportedNestedCSSRuleTypes).forEach(function (_a) {
            var _b = __read(_a, 2), typeKey = _b[0], type = _b[1];
            unmodifiedFunctions[typeKey] = {
                insertRule: type.prototype.insertRule,
                deleteRule: type.prototype.deleteRule,
            };
            type.prototype.insertRule = function (rule, index) {
                var id = mirror.getId(this.parentStyleSheet.ownerNode);
                if (id !== -1) {
                    styleSheetRuleCb({
                        id: id,
                        adds: [
                            {
                                rule: rule,
                                index: __spreadArray(__spreadArray([], __read(getNestedCSSRulePositions(this)), false), [
                                    index || 0,
                                ], false),
                            },
                        ],
                    });
                }
                return unmodifiedFunctions[typeKey].insertRule.apply(this, arguments);
            };
            type.prototype.deleteRule = function (index) {
                var id = mirror.getId(this.parentStyleSheet.ownerNode);
                if (id !== -1) {
                    styleSheetRuleCb({
                        id: id,
                        removes: [{ index: __spreadArray(__spreadArray([], __read(getNestedCSSRulePositions(this)), false), [index], false) }],
                    });
                }
                return unmodifiedFunctions[typeKey].deleteRule.apply(this, arguments);
            };
        });
        return function () {
            win.CSSStyleSheet.prototype.insertRule = insertRule;
            win.CSSStyleSheet.prototype.deleteRule = deleteRule;
            Object.entries(supportedNestedCSSRuleTypes).forEach(function (_a) {
                var _b = __read(_a, 2), typeKey = _b[0], type = _b[1];
                type.prototype.insertRule = unmodifiedFunctions[typeKey].insertRule;
                type.prototype.deleteRule = unmodifiedFunctions[typeKey].deleteRule;
            });
        };
    }
    function initStyleDeclarationObserver(_a, _b) {
        var styleDeclarationCb = _a.styleDeclarationCb, mirror = _a.mirror;
        var win = _b.win;
        var setProperty = win.CSSStyleDeclaration.prototype.setProperty;
        win.CSSStyleDeclaration.prototype.setProperty = function (property, value, priority) {
            var _a, _b;
            var id = mirror.getId((_b = (_a = this.parentRule) === null || _a === void 0 ? void 0 : _a.parentStyleSheet) === null || _b === void 0 ? void 0 : _b.ownerNode);
            if (id !== -1) {
                styleDeclarationCb({
                    id: id,
                    set: {
                        property: property,
                        value: value,
                        priority: priority,
                    },
                    index: getNestedCSSRulePositions(this.parentRule),
                });
            }
            return setProperty.apply(this, arguments);
        };
        var removeProperty = win.CSSStyleDeclaration.prototype.removeProperty;
        win.CSSStyleDeclaration.prototype.removeProperty = function (property) {
            var _a, _b;
            var id = mirror.getId((_b = (_a = this.parentRule) === null || _a === void 0 ? void 0 : _a.parentStyleSheet) === null || _b === void 0 ? void 0 : _b.ownerNode);
            if (id !== -1) {
                styleDeclarationCb({
                    id: id,
                    remove: {
                        property: property,
                    },
                    index: getNestedCSSRulePositions(this.parentRule),
                });
            }
            return removeProperty.apply(this, arguments);
        };
        return function () {
            win.CSSStyleDeclaration.prototype.setProperty = setProperty;
            win.CSSStyleDeclaration.prototype.removeProperty = removeProperty;
        };
    }
    function initMediaInteractionObserver(_a) {
        var mediaInteractionCb = _a.mediaInteractionCb, blockClass = _a.blockClass, mirror = _a.mirror, sampling = _a.sampling;
        var handler = function (type) {
            return throttle(function (event) {
                var target = getEventTarget(event);
                if (!target || isBlocked(target, blockClass)) {
                    return;
                }
                var _a = target, currentTime = _a.currentTime, volume = _a.volume, muted = _a.muted;
                mediaInteractionCb({
                    type: type,
                    id: mirror.getId(target),
                    currentTime: currentTime,
                    volume: volume,
                    muted: muted,
                });
            }, sampling.media || 500);
        };
        var handlers = [
            on('play', handler(0)),
            on('pause', handler(1)),
            on('seeked', handler(2)),
            on('volumechange', handler(3)),
        ];
        return function () {
            handlers.forEach(function (h) { return h(); });
        };
    }
    function initFontObserver(_a) {
        var fontCb = _a.fontCb, doc = _a.doc;
        var win = doc.defaultView;
        if (!win) {
            return function () { };
        }
        var handlers = [];
        var fontMap = new WeakMap();
        var originalFontFace = win.FontFace;
        win.FontFace = function FontFace(family, source, descriptors) {
            var fontFace = new originalFontFace(family, source, descriptors);
            fontMap.set(fontFace, {
                family: family,
                buffer: typeof source !== 'string',
                descriptors: descriptors,
                fontSource: typeof source === 'string'
                    ? source
                    :
                        JSON.stringify(Array.from(new Uint8Array(source))),
            });
            return fontFace;
        };
        var restoreHandler = patch(doc.fonts, 'add', function (original) {
            return function (fontFace) {
                setTimeout(function () {
                    var p = fontMap.get(fontFace);
                    if (p) {
                        fontCb(p);
                        fontMap.delete(fontFace);
                    }
                }, 0);
                return original.apply(this, [fontFace]);
            };
        });
        handlers.push(function () {
            win.FontFace = originalFontFace;
        });
        handlers.push(restoreHandler);
        return function () {
            handlers.forEach(function (h) { return h(); });
        };
    }
    function mergeHooks(o, hooks) {
        var mutationCb = o.mutationCb, mousemoveCb = o.mousemoveCb, mouseInteractionCb = o.mouseInteractionCb, scrollCb = o.scrollCb, viewportResizeCb = o.viewportResizeCb, inputCb = o.inputCb, mediaInteractionCb = o.mediaInteractionCb, styleSheetRuleCb = o.styleSheetRuleCb, styleDeclarationCb = o.styleDeclarationCb, canvasMutationCb = o.canvasMutationCb, fontCb = o.fontCb;
        o.mutationCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.mutation) {
                hooks.mutation.apply(hooks, __spreadArray([], __read(p), false));
            }
            mutationCb.apply(void 0, __spreadArray([], __read(p), false));
        };
        o.mousemoveCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.mousemove) {
                hooks.mousemove.apply(hooks, __spreadArray([], __read(p), false));
            }
            mousemoveCb.apply(void 0, __spreadArray([], __read(p), false));
        };
        o.mouseInteractionCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.mouseInteraction) {
                hooks.mouseInteraction.apply(hooks, __spreadArray([], __read(p), false));
            }
            mouseInteractionCb.apply(void 0, __spreadArray([], __read(p), false));
        };
        o.scrollCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.scroll) {
                hooks.scroll.apply(hooks, __spreadArray([], __read(p), false));
            }
            scrollCb.apply(void 0, __spreadArray([], __read(p), false));
        };
        o.viewportResizeCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.viewportResize) {
                hooks.viewportResize.apply(hooks, __spreadArray([], __read(p), false));
            }
            viewportResizeCb.apply(void 0, __spreadArray([], __read(p), false));
        };
        o.inputCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.input) {
                hooks.input.apply(hooks, __spreadArray([], __read(p), false));
            }
            inputCb.apply(void 0, __spreadArray([], __read(p), false));
        };
        o.mediaInteractionCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.mediaInteaction) {
                hooks.mediaInteaction.apply(hooks, __spreadArray([], __read(p), false));
            }
            mediaInteractionCb.apply(void 0, __spreadArray([], __read(p), false));
        };
        o.styleSheetRuleCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.styleSheetRule) {
                hooks.styleSheetRule.apply(hooks, __spreadArray([], __read(p), false));
            }
            styleSheetRuleCb.apply(void 0, __spreadArray([], __read(p), false));
        };
        o.styleDeclarationCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.styleDeclaration) {
                hooks.styleDeclaration.apply(hooks, __spreadArray([], __read(p), false));
            }
            styleDeclarationCb.apply(void 0, __spreadArray([], __read(p), false));
        };
        o.canvasMutationCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.canvasMutation) {
                hooks.canvasMutation.apply(hooks, __spreadArray([], __read(p), false));
            }
            canvasMutationCb.apply(void 0, __spreadArray([], __read(p), false));
        };
        o.fontCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.font) {
                hooks.font.apply(hooks, __spreadArray([], __read(p), false));
            }
            fontCb.apply(void 0, __spreadArray([], __read(p), false));
        };
    }
    function initObservers(o, hooks) {
        var e_1, _a;
        if (hooks === void 0) { hooks = {}; }
        var currentWindow = o.doc.defaultView;
        if (!currentWindow) {
            return function () { };
        }
        mergeHooks(o, hooks);
        var mutationObserver = initMutationObserver(o, o.doc);
        var mousemoveHandler = initMoveObserver(o);
        var mouseInteractionHandler = initMouseInteractionObserver(o);
        var scrollHandler = initScrollObserver(o);
        var viewportResizeHandler = initViewportResizeObserver(o);
        var inputHandler = initInputObserver(o);
        var mediaInteractionHandler = initMediaInteractionObserver(o);
        var styleSheetObserver = initStyleSheetObserver(o, { win: currentWindow });
        var styleDeclarationObserver = initStyleDeclarationObserver(o, {
            win: currentWindow,
        });
        var fontObserver = o.collectFonts ? initFontObserver(o) : function () { };
        var pluginHandlers = [];
        try {
            for (var _b = __values(o.plugins), _c = _b.next(); !_c.done; _c = _b.next()) {
                var plugin = _c.value;
                pluginHandlers.push(plugin.observer(plugin.callback, currentWindow, plugin.options));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return function () {
            mutationBuffers.forEach(function (b) { return b.reset(); });
            mutationObserver.disconnect();
            mousemoveHandler();
            mouseInteractionHandler();
            scrollHandler();
            viewportResizeHandler();
            inputHandler();
            mediaInteractionHandler();
            styleSheetObserver();
            styleDeclarationObserver();
            fontObserver();
            pluginHandlers.forEach(function (h) { return h(); });
        };
    }

    var IframeManager = (function () {
        function IframeManager(options) {
            this.iframes = new WeakMap();
            this.mutationCb = options.mutationCb;
        }
        IframeManager.prototype.addIframe = function (iframeEl) {
            this.iframes.set(iframeEl, true);
        };
        IframeManager.prototype.addLoadListener = function (cb) {
            this.loadListener = cb;
        };
        IframeManager.prototype.attachIframe = function (iframeEl, childSn) {
            var _a;
            this.mutationCb({
                adds: [
                    {
                        parentId: iframeEl.__sn.id,
                        nextId: null,
                        node: childSn,
                    },
                ],
                removes: [],
                texts: [],
                attributes: [],
                isAttachIframe: true,
            });
            (_a = this.loadListener) === null || _a === void 0 ? void 0 : _a.call(this, iframeEl);
        };
        return IframeManager;
    }());

    var ShadowDomManager = (function () {
        function ShadowDomManager(options) {
            this.restorePatches = [];
            this.mutationCb = options.mutationCb;
            this.scrollCb = options.scrollCb;
            this.bypassOptions = options.bypassOptions;
            this.mirror = options.mirror;
            var manager = this;
            this.restorePatches.push(patch(HTMLElement.prototype, 'attachShadow', function (original) {
                return function () {
                    var shadowRoot = original.apply(this, arguments);
                    if (this.shadowRoot)
                        manager.addShadowRoot(this.shadowRoot, this.ownerDocument);
                    return shadowRoot;
                };
            }));
        }
        ShadowDomManager.prototype.addShadowRoot = function (shadowRoot, doc) {
            initMutationObserver(__assign(__assign({}, this.bypassOptions), { doc: doc, mutationCb: this.mutationCb, mirror: this.mirror, shadowDomManager: this }), shadowRoot);
            initScrollObserver(__assign(__assign({}, this.bypassOptions), { scrollCb: this.scrollCb, doc: shadowRoot, mirror: this.mirror }));
        };
        ShadowDomManager.prototype.observeAttachShadow = function (iframeElement) {
            if (iframeElement.contentWindow) {
                var manager_1 = this;
                this.restorePatches.push(patch(iframeElement.contentWindow.HTMLElement.prototype, 'attachShadow', function (original) {
                    return function () {
                        var shadowRoot = original.apply(this, arguments);
                        if (this.shadowRoot)
                            manager_1.addShadowRoot(this.shadowRoot, iframeElement.contentDocument);
                        return shadowRoot;
                    };
                }));
            }
        };
        ShadowDomManager.prototype.reset = function () {
            this.restorePatches.forEach(function (restorePatch) { return restorePatch(); });
        };
        return ShadowDomManager;
    }());

    function initCanvas2DMutationObserver(cb, win, blockClass, mirror) {
        var e_1, _a;
        var handlers = [];
        var props2D = Object.getOwnPropertyNames(win.CanvasRenderingContext2D.prototype);
        var _loop_1 = function (prop) {
            try {
                if (typeof win.CanvasRenderingContext2D.prototype[prop] !== 'function') {
                    return "continue";
                }
                var restoreHandler = patch(win.CanvasRenderingContext2D.prototype, prop, function (original) {
                    return function () {
                        var _this = this;
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        if (!isBlocked(this.canvas, blockClass)) {
                            setTimeout(function () {
                                var recordArgs = __spreadArray([], __read(args), false);
                                if (prop === 'drawImage') {
                                    if (recordArgs[0] &&
                                        recordArgs[0] instanceof HTMLCanvasElement) {
                                        var canvas = recordArgs[0];
                                        var ctx = canvas.getContext('2d');
                                        var imgd = ctx === null || ctx === void 0 ? void 0 : ctx.getImageData(0, 0, canvas.width, canvas.height);
                                        var pix = imgd === null || imgd === void 0 ? void 0 : imgd.data;
                                        recordArgs[0] = JSON.stringify(pix);
                                    }
                                }
                                cb(_this.canvas, {
                                    type: CanvasContext['2D'],
                                    property: prop,
                                    args: recordArgs,
                                });
                            }, 0);
                        }
                        return original.apply(this, args);
                    };
                });
                handlers.push(restoreHandler);
            }
            catch (_b) {
                var hookHandler = hookSetter(win.CanvasRenderingContext2D.prototype, prop, {
                    set: function (v) {
                        cb(this.canvas, {
                            type: CanvasContext['2D'],
                            property: prop,
                            args: [v],
                            setter: true,
                        });
                    },
                });
                handlers.push(hookHandler);
            }
        };
        try {
            for (var props2D_1 = __values(props2D), props2D_1_1 = props2D_1.next(); !props2D_1_1.done; props2D_1_1 = props2D_1.next()) {
                var prop = props2D_1_1.value;
                _loop_1(prop);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (props2D_1_1 && !props2D_1_1.done && (_a = props2D_1.return)) _a.call(props2D_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return function () {
            handlers.forEach(function (h) { return h(); });
        };
    }

    function initCanvasContextObserver(win, blockClass) {
        var handlers = [];
        try {
            var restoreHandler = patch(win.HTMLCanvasElement.prototype, 'getContext', function (original) {
                return function (contextType) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    if (!isBlocked(this, blockClass)) {
                        if (!('__context' in this))
                            this.__context = contextType;
                    }
                    return original.apply(this, __spreadArray([contextType], __read(args), false));
                };
            });
            handlers.push(restoreHandler);
        }
        catch (_a) {
            console.error('failed to patch HTMLCanvasElement.prototype.getContext');
        }
        return function () {
            handlers.forEach(function (h) { return h(); });
        };
    }

    /*
     * base64-arraybuffer 1.0.1 <https://github.com/niklasvh/base64-arraybuffer>
     * Copyright (c) 2021 Niklas von Hertzen <https://hertzen.com>
     * Released under MIT License
     */
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    // Use a lookup table to find the index.
    var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
    for (var i = 0; i < chars.length; i++) {
        lookup[chars.charCodeAt(i)] = i;
    }
    var encode = function (arraybuffer) {
        var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = '';
        for (i = 0; i < len; i += 3) {
            base64 += chars[bytes[i] >> 2];
            base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
            base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
            base64 += chars[bytes[i + 2] & 63];
        }
        if (len % 3 === 2) {
            base64 = base64.substring(0, base64.length - 1) + '=';
        }
        else if (len % 3 === 1) {
            base64 = base64.substring(0, base64.length - 2) + '==';
        }
        return base64;
    };

    var webGLVarMap = new Map();
    function variableListFor(ctx, ctor) {
        var contextMap = webGLVarMap.get(ctx);
        if (!contextMap) {
            contextMap = new Map();
            webGLVarMap.set(ctx, contextMap);
        }
        if (!contextMap.has(ctor)) {
            contextMap.set(ctor, []);
        }
        return contextMap.get(ctor);
    }
    var saveWebGLVar = function (value, win, ctx) {
        if (!value ||
            !(isInstanceOfWebGLObject(value, win) || typeof value === 'object'))
            return;
        var name = value.constructor.name;
        var list = variableListFor(ctx, name);
        var index = list.indexOf(value);
        if (index === -1) {
            index = list.length;
            list.push(value);
        }
        return index;
    };
    function serializeArg(value, win, ctx) {
        if (value instanceof Array) {
            return value.map(function (arg) { return serializeArg(arg, win, ctx); });
        }
        else if (value === null) {
            return value;
        }
        else if (value instanceof Float32Array ||
            value instanceof Float64Array ||
            value instanceof Int32Array ||
            value instanceof Uint32Array ||
            value instanceof Uint8Array ||
            value instanceof Uint16Array ||
            value instanceof Int16Array ||
            value instanceof Int8Array ||
            value instanceof Uint8ClampedArray) {
            var name_1 = value.constructor.name;
            return {
                rr_type: name_1,
                args: [Object.values(value)],
            };
        }
        else if (value instanceof ArrayBuffer) {
            var name_2 = value.constructor.name;
            var base64 = encode(value);
            return {
                rr_type: name_2,
                base64: base64,
            };
        }
        else if (value instanceof DataView) {
            var name_3 = value.constructor.name;
            return {
                rr_type: name_3,
                args: [
                    serializeArg(value.buffer, win, ctx),
                    value.byteOffset,
                    value.byteLength,
                ],
            };
        }
        else if (value instanceof HTMLImageElement) {
            var name_4 = value.constructor.name;
            var src = value.src;
            return {
                rr_type: name_4,
                src: src,
            };
        }
        else if (value instanceof ImageData) {
            var name_5 = value.constructor.name;
            return {
                rr_type: name_5,
                args: [serializeArg(value.data, win, ctx), value.width, value.height],
            };
        }
        else if (isInstanceOfWebGLObject(value, win) || typeof value === 'object') {
            var name_6 = value.constructor.name;
            var index = saveWebGLVar(value, win, ctx);
            return {
                rr_type: name_6,
                index: index,
            };
        }
        return value;
    }
    var serializeArgs = function (args, win, ctx) {
        return __spreadArray([], __read(args), false).map(function (arg) { return serializeArg(arg, win, ctx); });
    };
    var isInstanceOfWebGLObject = function (value, win) {
        var webGLConstructorNames = [
            'WebGLActiveInfo',
            'WebGLBuffer',
            'WebGLFramebuffer',
            'WebGLProgram',
            'WebGLRenderbuffer',
            'WebGLShader',
            'WebGLShaderPrecisionFormat',
            'WebGLTexture',
            'WebGLUniformLocation',
            'WebGLVertexArrayObject',
            'WebGLVertexArrayObjectOES',
        ];
        var supportedWebGLConstructorNames = webGLConstructorNames.filter(function (name) { return typeof win[name] === 'function'; });
        return Boolean(supportedWebGLConstructorNames.find(function (name) { return value instanceof win[name]; }));
    };

    function patchGLPrototype(prototype, type, cb, blockClass, mirror, win) {
        var e_1, _a;
        var handlers = [];
        var props = Object.getOwnPropertyNames(prototype);
        var _loop_1 = function (prop) {
            try {
                if (typeof prototype[prop] !== 'function') {
                    return "continue";
                }
                var restoreHandler = patch(prototype, prop, function (original) {
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var result = original.apply(this, args);
                        saveWebGLVar(result, win, prototype);
                        if (!isBlocked(this.canvas, blockClass)) {
                            var id = mirror.getId(this.canvas);
                            var recordArgs = serializeArgs(__spreadArray([], __read(args), false), win, prototype);
                            var mutation = {
                                type: type,
                                property: prop,
                                args: recordArgs,
                            };
                            cb(this.canvas, mutation);
                        }
                        return result;
                    };
                });
                handlers.push(restoreHandler);
            }
            catch (_b) {
                var hookHandler = hookSetter(prototype, prop, {
                    set: function (v) {
                        cb(this.canvas, {
                            type: type,
                            property: prop,
                            args: [v],
                            setter: true,
                        });
                    },
                });
                handlers.push(hookHandler);
            }
        };
        try {
            for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
                var prop = props_1_1.value;
                _loop_1(prop);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return handlers;
    }
    function initCanvasWebGLMutationObserver(cb, win, blockClass, mirror) {
        var handlers = [];
        handlers.push.apply(handlers, __spreadArray([], __read(patchGLPrototype(win.WebGLRenderingContext.prototype, CanvasContext.WebGL, cb, blockClass, mirror, win)), false));
        if (typeof win.WebGL2RenderingContext !== 'undefined') {
            handlers.push.apply(handlers, __spreadArray([], __read(patchGLPrototype(win.WebGL2RenderingContext.prototype, CanvasContext.WebGL2, cb, blockClass, mirror, win)), false));
        }
        return function () {
            handlers.forEach(function (h) { return h(); });
        };
    }

    var CanvasManager = (function () {
        function CanvasManager(options) {
            this.pendingCanvasMutations = new Map();
            this.rafStamps = { latestId: 0, invokeId: null };
            this.frozen = false;
            this.locked = false;
            this.processMutation = function (target, mutation) {
                var newFrame = this.rafStamps.invokeId &&
                    this.rafStamps.latestId !== this.rafStamps.invokeId;
                if (newFrame || !this.rafStamps.invokeId)
                    this.rafStamps.invokeId = this.rafStamps.latestId;
                if (!this.pendingCanvasMutations.has(target)) {
                    this.pendingCanvasMutations.set(target, []);
                }
                this.pendingCanvasMutations.get(target).push(mutation);
            };
            this.mutationCb = options.mutationCb;
            this.mirror = options.mirror;
            if (options.recordCanvas === true)
                this.initCanvasMutationObserver(options.win, options.blockClass);
        }
        CanvasManager.prototype.reset = function () {
            this.pendingCanvasMutations.clear();
            this.resetObservers && this.resetObservers();
        };
        CanvasManager.prototype.freeze = function () {
            this.frozen = true;
        };
        CanvasManager.prototype.unfreeze = function () {
            this.frozen = false;
        };
        CanvasManager.prototype.lock = function () {
            this.locked = true;
        };
        CanvasManager.prototype.unlock = function () {
            this.locked = false;
        };
        CanvasManager.prototype.initCanvasMutationObserver = function (win, blockClass) {
            this.startRAFTimestamping();
            this.startPendingCanvasMutationFlusher();
            var canvasContextReset = initCanvasContextObserver(win, blockClass);
            var canvas2DReset = initCanvas2DMutationObserver(this.processMutation.bind(this), win, blockClass, this.mirror);
            var canvasWebGL1and2Reset = initCanvasWebGLMutationObserver(this.processMutation.bind(this), win, blockClass, this.mirror);
            this.resetObservers = function () {
                canvasContextReset();
                canvas2DReset();
                canvasWebGL1and2Reset();
            };
        };
        CanvasManager.prototype.startPendingCanvasMutationFlusher = function () {
            var _this = this;
            requestAnimationFrame(function () { return _this.flushPendingCanvasMutations(); });
        };
        CanvasManager.prototype.startRAFTimestamping = function () {
            var _this = this;
            var setLatestRAFTimestamp = function (timestamp) {
                _this.rafStamps.latestId = timestamp;
                requestAnimationFrame(setLatestRAFTimestamp);
            };
            requestAnimationFrame(setLatestRAFTimestamp);
        };
        CanvasManager.prototype.flushPendingCanvasMutations = function () {
            var _this = this;
            this.pendingCanvasMutations.forEach(function (values, canvas) {
                var id = _this.mirror.getId(canvas);
                _this.flushPendingCanvasMutationFor(canvas, id);
            });
            requestAnimationFrame(function () { return _this.flushPendingCanvasMutations(); });
        };
        CanvasManager.prototype.flushPendingCanvasMutationFor = function (canvas, id) {
            if (this.frozen || this.locked) {
                return;
            }
            var valuesWithType = this.pendingCanvasMutations.get(canvas);
            if (!valuesWithType || id === -1)
                return;
            var values = valuesWithType.map(function (value) {
                value.type; var rest = __rest(value, ["type"]);
                return rest;
            });
            var type = valuesWithType[0].type;
            this.mutationCb({ id: id, type: type, commands: values });
            this.pendingCanvasMutations.delete(canvas);
        };
        return CanvasManager;
    }());

    function wrapEvent(e) {
        return __assign(__assign({}, e), { timestamp: Date.now() });
    }
    var wrappedEmit;
    var takeFullSnapshot;
    var mirror = createMirror();
    function record(options) {
        if (options === void 0) { options = {}; }
        var emit = options.emit, checkoutEveryNms = options.checkoutEveryNms, checkoutEveryNth = options.checkoutEveryNth, _a = options.blockClass, blockClass = _a === void 0 ? 'rr-block' : _a, _b = options.blockSelector, blockSelector = _b === void 0 ? null : _b, _c = options.ignoreClass, ignoreClass = _c === void 0 ? 'rr-ignore' : _c, _d = options.maskTextClass, maskTextClass = _d === void 0 ? 'rr-mask' : _d, _e = options.maskTextSelector, maskTextSelector = _e === void 0 ? null : _e, _f = options.inlineStylesheet, inlineStylesheet = _f === void 0 ? true : _f, maskAllInputs = options.maskAllInputs, _maskInputOptions = options.maskInputOptions, _slimDOMOptions = options.slimDOMOptions, maskInputFn = options.maskInputFn, maskTextFn = options.maskTextFn, hooks = options.hooks, packFn = options.packFn, _g = options.sampling, sampling = _g === void 0 ? {} : _g, mousemoveWait = options.mousemoveWait, _h = options.recordCanvas, recordCanvas = _h === void 0 ? false : _h, _j = options.userTriggeredOnInput, userTriggeredOnInput = _j === void 0 ? false : _j, _k = options.collectFonts, collectFonts = _k === void 0 ? false : _k, _l = options.inlineImages, inlineImages = _l === void 0 ? false : _l, plugins = options.plugins, _m = options.keepIframeSrcFn, keepIframeSrcFn = _m === void 0 ? function () { return false; } : _m;
        if (!emit) {
            throw new Error('emit function is required');
        }
        if (mousemoveWait !== undefined && sampling.mousemove === undefined) {
            sampling.mousemove = mousemoveWait;
        }
        var maskInputOptions = maskAllInputs === true
            ? {
                color: true,
                date: true,
                'datetime-local': true,
                email: true,
                month: true,
                number: true,
                range: true,
                search: true,
                tel: true,
                text: true,
                time: true,
                url: true,
                week: true,
                textarea: true,
                select: true,
                password: true,
            }
            : _maskInputOptions !== undefined
                ? _maskInputOptions
                : { password: true };
        var slimDOMOptions = _slimDOMOptions === true || _slimDOMOptions === 'all'
            ? {
                script: true,
                comment: true,
                headFavicon: true,
                headWhitespace: true,
                headMetaSocial: true,
                headMetaRobots: true,
                headMetaHttpEquiv: true,
                headMetaVerification: true,
                headMetaAuthorship: _slimDOMOptions === 'all',
                headMetaDescKeywords: _slimDOMOptions === 'all',
            }
            : _slimDOMOptions
                ? _slimDOMOptions
                : {};
        polyfill();
        var lastFullSnapshotEvent;
        var incrementalSnapshotCount = 0;
        var eventProcessor = function (e) {
            var e_1, _a;
            try {
                for (var _b = __values(plugins || []), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var plugin = _c.value;
                    if (plugin.eventProcessor) {
                        e = plugin.eventProcessor(e);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (packFn) {
                e = packFn(e);
            }
            return e;
        };
        wrappedEmit = function (e, isCheckout) {
            var _a;
            if (((_a = mutationBuffers[0]) === null || _a === void 0 ? void 0 : _a.isFrozen()) &&
                e.type !== EventType.FullSnapshot &&
                !(e.type === EventType.IncrementalSnapshot &&
                    e.data.source === IncrementalSource.Mutation)) {
                mutationBuffers.forEach(function (buf) { return buf.unfreeze(); });
            }
            emit(eventProcessor(e), isCheckout);
            if (e.type === EventType.FullSnapshot) {
                lastFullSnapshotEvent = e;
                incrementalSnapshotCount = 0;
            }
            else if (e.type === EventType.IncrementalSnapshot) {
                if (e.data.source === IncrementalSource.Mutation &&
                    e.data.isAttachIframe) {
                    return;
                }
                incrementalSnapshotCount++;
                var exceedCount = checkoutEveryNth && incrementalSnapshotCount >= checkoutEveryNth;
                var exceedTime = checkoutEveryNms &&
                    e.timestamp - lastFullSnapshotEvent.timestamp > checkoutEveryNms;
                if (exceedCount || exceedTime) {
                    takeFullSnapshot(true);
                }
            }
        };
        var wrappedMutationEmit = function (m) {
            wrappedEmit(wrapEvent({
                type: EventType.IncrementalSnapshot,
                data: __assign({ source: IncrementalSource.Mutation }, m),
            }));
        };
        var wrappedScrollEmit = function (p) {
            return wrappedEmit(wrapEvent({
                type: EventType.IncrementalSnapshot,
                data: __assign({ source: IncrementalSource.Scroll }, p),
            }));
        };
        var wrappedCanvasMutationEmit = function (p) {
            return wrappedEmit(wrapEvent({
                type: EventType.IncrementalSnapshot,
                data: __assign({ source: IncrementalSource.CanvasMutation }, p),
            }));
        };
        var iframeManager = new IframeManager({
            mutationCb: wrappedMutationEmit,
        });
        var canvasManager = new CanvasManager({
            recordCanvas: recordCanvas,
            mutationCb: wrappedCanvasMutationEmit,
            win: window,
            blockClass: blockClass,
            mirror: mirror,
        });
        var shadowDomManager = new ShadowDomManager({
            mutationCb: wrappedMutationEmit,
            scrollCb: wrappedScrollEmit,
            bypassOptions: {
                blockClass: blockClass,
                blockSelector: blockSelector,
                maskTextClass: maskTextClass,
                maskTextSelector: maskTextSelector,
                inlineStylesheet: inlineStylesheet,
                maskInputOptions: maskInputOptions,
                maskTextFn: maskTextFn,
                maskInputFn: maskInputFn,
                recordCanvas: recordCanvas,
                inlineImages: inlineImages,
                sampling: sampling,
                slimDOMOptions: slimDOMOptions,
                iframeManager: iframeManager,
                canvasManager: canvasManager,
            },
            mirror: mirror,
        });
        takeFullSnapshot = function (isCheckout) {
            var _a, _b, _c, _d;
            if (isCheckout === void 0) { isCheckout = false; }
            wrappedEmit(wrapEvent({
                type: EventType.Meta,
                data: {
                    href: window.location.href,
                    width: getWindowWidth(),
                    height: getWindowHeight(),
                },
            }), isCheckout);
            mutationBuffers.forEach(function (buf) { return buf.lock(); });
            var _e = __read(snapshot(document, {
                blockClass: blockClass,
                blockSelector: blockSelector,
                maskTextClass: maskTextClass,
                maskTextSelector: maskTextSelector,
                inlineStylesheet: inlineStylesheet,
                maskAllInputs: maskInputOptions,
                maskTextFn: maskTextFn,
                slimDOM: slimDOMOptions,
                recordCanvas: recordCanvas,
                inlineImages: inlineImages,
                onSerialize: function (n) {
                    if (isIframeINode(n)) {
                        iframeManager.addIframe(n);
                    }
                    if (hasShadowRoot(n)) {
                        shadowDomManager.addShadowRoot(n.shadowRoot, document);
                    }
                },
                onIframeLoad: function (iframe, childSn) {
                    iframeManager.attachIframe(iframe, childSn);
                    shadowDomManager.observeAttachShadow(iframe);
                },
                keepIframeSrcFn: keepIframeSrcFn,
            }), 2), node = _e[0], idNodeMap = _e[1];
            if (!node) {
                return console.warn('Failed to snapshot the document');
            }
            mirror.map = idNodeMap;
            wrappedEmit(wrapEvent({
                type: EventType.FullSnapshot,
                data: {
                    node: node,
                    initialOffset: {
                        left: window.pageXOffset !== undefined
                            ? window.pageXOffset
                            : (document === null || document === void 0 ? void 0 : document.documentElement.scrollLeft) ||
                                ((_b = (_a = document === null || document === void 0 ? void 0 : document.body) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.scrollLeft) ||
                                (document === null || document === void 0 ? void 0 : document.body.scrollLeft) ||
                                0,
                        top: window.pageYOffset !== undefined
                            ? window.pageYOffset
                            : (document === null || document === void 0 ? void 0 : document.documentElement.scrollTop) ||
                                ((_d = (_c = document === null || document === void 0 ? void 0 : document.body) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.scrollTop) ||
                                (document === null || document === void 0 ? void 0 : document.body.scrollTop) ||
                                0,
                    },
                },
            }));
            mutationBuffers.forEach(function (buf) { return buf.unlock(); });
        };
        try {
            var handlers_1 = [];
            handlers_1.push(on('DOMContentLoaded', function () {
                wrappedEmit(wrapEvent({
                    type: EventType.DomContentLoaded,
                    data: {},
                }));
            }));
            var observe_1 = function (doc) {
                var _a;
                return initObservers({
                    mutationCb: wrappedMutationEmit,
                    mousemoveCb: function (positions, source) {
                        return wrappedEmit(wrapEvent({
                            type: EventType.IncrementalSnapshot,
                            data: {
                                source: source,
                                positions: positions,
                            },
                        }));
                    },
                    mouseInteractionCb: function (d) {
                        return wrappedEmit(wrapEvent({
                            type: EventType.IncrementalSnapshot,
                            data: __assign({ source: IncrementalSource.MouseInteraction }, d),
                        }));
                    },
                    scrollCb: wrappedScrollEmit,
                    viewportResizeCb: function (d) {
                        return wrappedEmit(wrapEvent({
                            type: EventType.IncrementalSnapshot,
                            data: __assign({ source: IncrementalSource.ViewportResize }, d),
                        }));
                    },
                    inputCb: function (v) {
                        return wrappedEmit(wrapEvent({
                            type: EventType.IncrementalSnapshot,
                            data: __assign({ source: IncrementalSource.Input }, v),
                        }));
                    },
                    mediaInteractionCb: function (p) {
                        return wrappedEmit(wrapEvent({
                            type: EventType.IncrementalSnapshot,
                            data: __assign({ source: IncrementalSource.MediaInteraction }, p),
                        }));
                    },
                    styleSheetRuleCb: function (r) {
                        return wrappedEmit(wrapEvent({
                            type: EventType.IncrementalSnapshot,
                            data: __assign({ source: IncrementalSource.StyleSheetRule }, r),
                        }));
                    },
                    styleDeclarationCb: function (r) {
                        return wrappedEmit(wrapEvent({
                            type: EventType.IncrementalSnapshot,
                            data: __assign({ source: IncrementalSource.StyleDeclaration }, r),
                        }));
                    },
                    canvasMutationCb: wrappedCanvasMutationEmit,
                    fontCb: function (p) {
                        return wrappedEmit(wrapEvent({
                            type: EventType.IncrementalSnapshot,
                            data: __assign({ source: IncrementalSource.Font }, p),
                        }));
                    },
                    blockClass: blockClass,
                    ignoreClass: ignoreClass,
                    maskTextClass: maskTextClass,
                    maskTextSelector: maskTextSelector,
                    maskInputOptions: maskInputOptions,
                    inlineStylesheet: inlineStylesheet,
                    sampling: sampling,
                    recordCanvas: recordCanvas,
                    inlineImages: inlineImages,
                    userTriggeredOnInput: userTriggeredOnInput,
                    collectFonts: collectFonts,
                    doc: doc,
                    maskInputFn: maskInputFn,
                    maskTextFn: maskTextFn,
                    blockSelector: blockSelector,
                    slimDOMOptions: slimDOMOptions,
                    mirror: mirror,
                    iframeManager: iframeManager,
                    shadowDomManager: shadowDomManager,
                    canvasManager: canvasManager,
                    plugins: ((_a = plugins === null || plugins === void 0 ? void 0 : plugins.filter(function (p) { return p.observer; })) === null || _a === void 0 ? void 0 : _a.map(function (p) { return ({
                        observer: p.observer,
                        options: p.options,
                        callback: function (payload) {
                            return wrappedEmit(wrapEvent({
                                type: EventType.Plugin,
                                data: {
                                    plugin: p.name,
                                    payload: payload,
                                },
                            }));
                        },
                    }); })) || [],
                }, hooks);
            };
            iframeManager.addLoadListener(function (iframeEl) {
                handlers_1.push(observe_1(iframeEl.contentDocument));
            });
            var init_1 = function () {
                takeFullSnapshot();
                handlers_1.push(observe_1(document));
            };
            if (document.readyState === 'interactive' ||
                document.readyState === 'complete') {
                init_1();
            }
            else {
                handlers_1.push(on('load', function () {
                    wrappedEmit(wrapEvent({
                        type: EventType.Load,
                        data: {},
                    }));
                    init_1();
                }, window));
            }
            return function () {
                handlers_1.forEach(function (h) { return h(); });
            };
        }
        catch (error) {
            console.warn(error);
        }
    }
    record.addCustomEvent = function (tag, payload) {
        if (!wrappedEmit) {
            throw new Error('please add custom event after start recording');
        }
        wrappedEmit(wrapEvent({
            type: EventType.Custom,
            data: {
                tag: tag,
                payload: payload,
            },
        }));
    };
    record.freezePage = function () {
        mutationBuffers.forEach(function (buf) { return buf.freeze(); });
    };
    record.takeFullSnapshot = function (isCheckout) {
        if (!takeFullSnapshot) {
            throw new Error('please take full snapshot after start recording');
        }
        takeFullSnapshot(isCheckout);
    };
    record.mirror = mirror;

    var StackFrame = (function () {
        function StackFrame(obj) {
            this.fileName = obj.fileName || '';
            this.functionName = obj.functionName || '';
            this.lineNumber = obj.lineNumber;
            this.columnNumber = obj.columnNumber;
        }
        StackFrame.prototype.toString = function () {
            var lineNumber = this.lineNumber || '';
            var columnNumber = this.columnNumber || '';
            if (this.functionName) {
                return (this.functionName +
                    ' (' +
                    this.fileName +
                    ':' +
                    lineNumber +
                    ':' +
                    columnNumber +
                    ')');
            }
            return this.fileName + ':' + lineNumber + ':' + columnNumber;
        };
        return StackFrame;
    }());
    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;
    var ErrorStackParser = {
        parse: function (error) {
            if (!error) {
                return [];
            }
            if (typeof error.stacktrace !== 'undefined' ||
                typeof error['opera#sourceloc'] !== 'undefined') {
                return this.parseOpera(error);
            }
            else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
                return this.parseV8OrIE(error);
            }
            else if (error.stack) {
                return this.parseFFOrSafari(error);
            }
            else {
                throw new Error('Cannot parse given Error object');
            }
        },
        extractLocation: function (urlLike) {
            if (urlLike.indexOf(':') === -1) {
                return [urlLike];
            }
            var regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
            var parts = regExp.exec(urlLike.replace(/[()]/g, ''));
            if (!parts)
                throw new Error("Cannot parse given url: ".concat(urlLike));
            return [parts[1], parts[2] || undefined, parts[3] || undefined];
        },
        parseV8OrIE: function (error) {
            var filtered = error.stack.split('\n').filter(function (line) {
                return !!line.match(CHROME_IE_STACK_REGEXP);
            }, this);
            return filtered.map(function (line) {
                if (line.indexOf('(eval ') > -1) {
                    line = line
                        .replace(/eval code/g, 'eval')
                        .replace(/(\(eval at [^()]*)|(\),.*$)/g, '');
                }
                var sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '(');
                var location = sanitizedLine.match(/ (\((.+):(\d+):(\d+)\)$)/);
                sanitizedLine = location
                    ? sanitizedLine.replace(location[0], '')
                    : sanitizedLine;
                var tokens = sanitizedLine.split(/\s+/).slice(1);
                var locationParts = this.extractLocation(location ? location[1] : tokens.pop());
                var functionName = tokens.join(' ') || undefined;
                var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1
                    ? undefined
                    : locationParts[0];
                return new StackFrame({
                    functionName: functionName,
                    fileName: fileName,
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                });
            }, this);
        },
        parseFFOrSafari: function (error) {
            var filtered = error.stack.split('\n').filter(function (line) {
                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
            }, this);
            return filtered.map(function (line) {
                if (line.indexOf(' > eval') > -1) {
                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ':$1');
                }
                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
                    return new StackFrame({
                        functionName: line,
                    });
                }
                else {
                    var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
                    var matches = line.match(functionNameRegex);
                    var functionName = matches && matches[1] ? matches[1] : undefined;
                    var locationParts = this.extractLocation(line.replace(functionNameRegex, ''));
                    return new StackFrame({
                        functionName: functionName,
                        fileName: locationParts[0],
                        lineNumber: locationParts[1],
                        columnNumber: locationParts[2],
                    });
                }
            }, this);
        },
        parseOpera: function (e) {
            if (!e.stacktrace ||
                (e.message.indexOf('\n') > -1 &&
                    e.message.split('\n').length > e.stacktrace.split('\n').length)) {
                return this.parseOpera9(e);
            }
            else if (!e.stack) {
                return this.parseOpera10(e);
            }
            else {
                return this.parseOpera11(e);
            }
        },
        parseOpera9: function (e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
            var lines = e.message.split('\n');
            var result = [];
            for (var i = 2, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(new StackFrame({
                        fileName: match[2],
                        lineNumber: parseFloat(match[1]),
                    }));
                }
            }
            return result;
        },
        parseOpera10: function (e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
            var lines = e.stacktrace.split('\n');
            var result = [];
            for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(new StackFrame({
                        functionName: match[3] || undefined,
                        fileName: match[2],
                        lineNumber: parseFloat(match[1]),
                    }));
                }
            }
            return result;
        },
        parseOpera11: function (error) {
            var filtered = error.stack.split('\n').filter(function (line) {
                return (!!line.match(FIREFOX_SAFARI_STACK_REGEXP) &&
                    !line.match(/^Error created at/));
            }, this);
            return filtered.map(function (line) {
                var tokens = line.split('@');
                var locationParts = this.extractLocation(tokens.pop());
                var functionCall = tokens.shift() || '';
                var functionName = functionCall
                    .replace(/<anonymous function(: (\w+))?>/, '$2')
                    .replace(/\([^)]*\)/g, '') || undefined;
                return new StackFrame({
                    functionName: functionName,
                    fileName: locationParts[0],
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                });
            }, this);
        },
    };

    function pathToSelector(node) {
        if (!node || !node.outerHTML) {
            return '';
        }
        var path = '';
        while (node.parentElement) {
            var name_1 = node.localName;
            if (!name_1) {
                break;
            }
            name_1 = name_1.toLowerCase();
            var parent_1 = node.parentElement;
            var domSiblings = [];
            if (parent_1.children && parent_1.children.length > 0) {
                for (var i = 0; i < parent_1.children.length; i++) {
                    var sibling = parent_1.children[i];
                    if (sibling.localName && sibling.localName.toLowerCase) {
                        if (sibling.localName.toLowerCase() === name_1) {
                            domSiblings.push(sibling);
                        }
                    }
                }
            }
            if (domSiblings.length > 1) {
                name_1 += ':eq(' + domSiblings.indexOf(node) + ')';
            }
            path = name_1 + (path ? '>' + path : '');
            node = parent_1;
        }
        return path;
    }
    function isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
    function isObjTooDeep(obj, limit) {
        var e_1, _a;
        if (limit === 0) {
            return true;
        }
        var keys = Object.keys(obj);
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                if (isObject(obj[key]) && isObjTooDeep(obj[key], limit - 1)) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    }
    function stringify(obj, stringifyOptions) {
        var options = {
            numOfKeysLimit: 50,
            depthOfLimit: 4,
        };
        Object.assign(options, stringifyOptions);
        var stack = [];
        var keys = [];
        return JSON.stringify(obj, function (key, value) {
            if (stack.length > 0) {
                var thisPos = stack.indexOf(this);
                ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
                ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
                if (~stack.indexOf(value)) {
                    if (stack[0] === value) {
                        value = '[Circular ~]';
                    }
                    else {
                        value =
                            '[Circular ~.' +
                                keys.slice(0, stack.indexOf(value)).join('.') +
                                ']';
                    }
                }
            }
            else {
                stack.push(value);
            }
            if (value === null || value === undefined) {
                return value;
            }
            if (shouldIgnore(value)) {
                return toString(value);
            }
            if (value instanceof Event) {
                var eventResult = {};
                for (var eventKey in value) {
                    var eventValue = value[eventKey];
                    if (Array.isArray(eventValue)) {
                        eventResult[eventKey] = pathToSelector(eventValue.length ? eventValue[0] : null);
                    }
                    else {
                        eventResult[eventKey] = eventValue;
                    }
                }
                return eventResult;
            }
            else if (value instanceof Node) {
                if (value instanceof HTMLElement) {
                    return value ? value.outerHTML : '';
                }
                return value.nodeName;
            }
            else if (value instanceof Error) {
                return value.stack
                    ? value.stack + '\nEnd of stack for Error object'
                    : value.name + ': ' + value.message;
            }
            return value;
        });
        function shouldIgnore(_obj) {
            if (isObject(_obj) && Object.keys(_obj).length > options.numOfKeysLimit) {
                return true;
            }
            if (typeof _obj === 'function') {
                return true;
            }
            if (isObject(_obj) && isObjTooDeep(_obj, options.depthOfLimit)) {
                return true;
            }
            return false;
        }
        function toString(_obj) {
            var str = _obj.toString();
            if (options.stringLengthLimit && str.length > options.stringLengthLimit) {
                str = "".concat(str.slice(0, options.stringLengthLimit), "...");
            }
            return str;
        }
    }

    var defaultLogOptions = {
        level: [
            'assert',
            'clear',
            'count',
            'countReset',
            'debug',
            'dir',
            'dirxml',
            'error',
            'group',
            'groupCollapsed',
            'groupEnd',
            'info',
            'log',
            'table',
            'time',
            'timeEnd',
            'timeLog',
            'trace',
            'warn',
        ],
        lengthThreshold: 1000,
        logger: 'console',
    };
    function initLogObserver(cb, win, logOptions) {
        var e_1, _a;
        var loggerType = logOptions.logger;
        if (!loggerType) {
            return function () { };
        }
        var logger;
        if (typeof loggerType === 'string') {
            logger = win[loggerType];
        }
        else {
            logger = loggerType;
        }
        var logCount = 0;
        var cancelHandlers = [];
        if (logOptions.level.includes('error')) {
            if (window) {
                var errorHandler_1 = function (event) {
                    var message = event.message, error = event.error;
                    var trace = ErrorStackParser.parse(error).map(function (stackFrame) { return stackFrame.toString(); });
                    var payload = [stringify(message, logOptions.stringifyOptions)];
                    cb({
                        level: 'error',
                        trace: trace,
                        payload: payload,
                    });
                };
                window.addEventListener('error', errorHandler_1);
                cancelHandlers.push(function () {
                    if (window)
                        window.removeEventListener('error', errorHandler_1);
                });
            }
        }
        try {
            for (var _b = __values(logOptions.level), _c = _b.next(); !_c.done; _c = _b.next()) {
                var levelType = _c.value;
                cancelHandlers.push(replace(logger, levelType));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return function () {
            cancelHandlers.forEach(function (h) { return h(); });
        };
        function replace(_logger, level) {
            var _this = this;
            if (!_logger[level]) {
                return function () { };
            }
            return patch(_logger, level, function (original) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    original.apply(_this, args);
                    try {
                        var trace = ErrorStackParser.parse(new Error())
                            .map(function (stackFrame) { return stackFrame.toString(); })
                            .splice(1);
                        var payload = args.map(function (s) {
                            return stringify(s, logOptions.stringifyOptions);
                        });
                        logCount++;
                        if (logCount < logOptions.lengthThreshold) {
                            cb({
                                level: level,
                                trace: trace,
                                payload: payload,
                            });
                        }
                        else if (logCount === logOptions.lengthThreshold) {
                            cb({
                                level: 'warn',
                                trace: [],
                                payload: [
                                    stringify('The number of log records reached the threshold.'),
                                ],
                            });
                        }
                    }
                    catch (error) {
                        original.apply(void 0, __spreadArray(['rrweb logger error:', error], __read(args), false));
                    }
                };
            });
        }
    }
    var PLUGIN_NAME = 'rrweb/console@1';
    var getRecordConsolePlugin = function (options) { return ({
        name: PLUGIN_NAME,
        observer: initLogObserver,
        options: options
            ? Object.assign({}, defaultLogOptions, options)
            : defaultLogOptions,
    }); };

    exports.RQSessionEventType = void 0;
    (function (RQSessionEventType) {
        RQSessionEventType["RRWEB"] = "rrweb";
        RQSessionEventType["NETWORK"] = "network";
    })(exports.RQSessionEventType || (exports.RQSessionEventType = {}));

    // NOTE: this list must be up-to-date with browsers listed in
    // test/acceptance/useragentstrings.yml
    const BROWSER_ALIASES_MAP = {
      'Amazon Silk': 'amazon_silk',
      'Android Browser': 'android',
      Bada: 'bada',
      BlackBerry: 'blackberry',
      Chrome: 'chrome',
      Chromium: 'chromium',
      Electron: 'electron',
      Epiphany: 'epiphany',
      Firefox: 'firefox',
      Focus: 'focus',
      Generic: 'generic',
      'Google Search': 'google_search',
      Googlebot: 'googlebot',
      'Internet Explorer': 'ie',
      'K-Meleon': 'k_meleon',
      Maxthon: 'maxthon',
      'Microsoft Edge': 'edge',
      'MZ Browser': 'mz',
      'NAVER Whale Browser': 'naver',
      Opera: 'opera',
      'Opera Coast': 'opera_coast',
      PhantomJS: 'phantomjs',
      Puffin: 'puffin',
      QupZilla: 'qupzilla',
      QQ: 'qq',
      QQLite: 'qqlite',
      Safari: 'safari',
      Sailfish: 'sailfish',
      'Samsung Internet for Android': 'samsung_internet',
      SeaMonkey: 'seamonkey',
      Sleipnir: 'sleipnir',
      Swing: 'swing',
      Tizen: 'tizen',
      'UC Browser': 'uc',
      Vivaldi: 'vivaldi',
      'WebOS Browser': 'webos',
      WeChat: 'wechat',
      'Yandex Browser': 'yandex',
      Roku: 'roku',
    };

    const BROWSER_MAP = {
      amazon_silk: 'Amazon Silk',
      android: 'Android Browser',
      bada: 'Bada',
      blackberry: 'BlackBerry',
      chrome: 'Chrome',
      chromium: 'Chromium',
      electron: 'Electron',
      epiphany: 'Epiphany',
      firefox: 'Firefox',
      focus: 'Focus',
      generic: 'Generic',
      googlebot: 'Googlebot',
      google_search: 'Google Search',
      ie: 'Internet Explorer',
      k_meleon: 'K-Meleon',
      maxthon: 'Maxthon',
      edge: 'Microsoft Edge',
      mz: 'MZ Browser',
      naver: 'NAVER Whale Browser',
      opera: 'Opera',
      opera_coast: 'Opera Coast',
      phantomjs: 'PhantomJS',
      puffin: 'Puffin',
      qupzilla: 'QupZilla',
      qq: 'QQ Browser',
      qqlite: 'QQ Browser Lite',
      safari: 'Safari',
      sailfish: 'Sailfish',
      samsung_internet: 'Samsung Internet for Android',
      seamonkey: 'SeaMonkey',
      sleipnir: 'Sleipnir',
      swing: 'Swing',
      tizen: 'Tizen',
      uc: 'UC Browser',
      vivaldi: 'Vivaldi',
      webos: 'WebOS Browser',
      wechat: 'WeChat',
      yandex: 'Yandex Browser',
    };

    const PLATFORMS_MAP = {
      tablet: 'tablet',
      mobile: 'mobile',
      desktop: 'desktop',
      tv: 'tv',
    };

    const OS_MAP = {
      WindowsPhone: 'Windows Phone',
      Windows: 'Windows',
      MacOS: 'macOS',
      iOS: 'iOS',
      Android: 'Android',
      WebOS: 'WebOS',
      BlackBerry: 'BlackBerry',
      Bada: 'Bada',
      Tizen: 'Tizen',
      Linux: 'Linux',
      ChromeOS: 'Chrome OS',
      PlayStation4: 'PlayStation 4',
      Roku: 'Roku',
    };

    const ENGINE_MAP = {
      EdgeHTML: 'EdgeHTML',
      Blink: 'Blink',
      Trident: 'Trident',
      Presto: 'Presto',
      Gecko: 'Gecko',
      WebKit: 'WebKit',
    };

    class Utils {
      /**
       * Get first matched item for a string
       * @param {RegExp} regexp
       * @param {String} ua
       * @return {Array|{index: number, input: string}|*|boolean|string}
       */
      static getFirstMatch(regexp, ua) {
        const match = ua.match(regexp);
        return (match && match.length > 0 && match[1]) || '';
      }

      /**
       * Get second matched item for a string
       * @param regexp
       * @param {String} ua
       * @return {Array|{index: number, input: string}|*|boolean|string}
       */
      static getSecondMatch(regexp, ua) {
        const match = ua.match(regexp);
        return (match && match.length > 1 && match[2]) || '';
      }

      /**
       * Match a regexp and return a constant or undefined
       * @param {RegExp} regexp
       * @param {String} ua
       * @param {*} _const Any const that will be returned if regexp matches the string
       * @return {*}
       */
      static matchAndReturnConst(regexp, ua, _const) {
        if (regexp.test(ua)) {
          return _const;
        }
        return void (0);
      }

      static getWindowsVersionName(version) {
        switch (version) {
          case 'NT': return 'NT';
          case 'XP': return 'XP';
          case 'NT 5.0': return '2000';
          case 'NT 5.1': return 'XP';
          case 'NT 5.2': return '2003';
          case 'NT 6.0': return 'Vista';
          case 'NT 6.1': return '7';
          case 'NT 6.2': return '8';
          case 'NT 6.3': return '8.1';
          case 'NT 10.0': return '10';
          default: return undefined;
        }
      }

      /**
       * Get macOS version name
       *    10.5 - Leopard
       *    10.6 - Snow Leopard
       *    10.7 - Lion
       *    10.8 - Mountain Lion
       *    10.9 - Mavericks
       *    10.10 - Yosemite
       *    10.11 - El Capitan
       *    10.12 - Sierra
       *    10.13 - High Sierra
       *    10.14 - Mojave
       *    10.15 - Catalina
       *
       * @example
       *   getMacOSVersionName("10.14") // 'Mojave'
       *
       * @param  {string} version
       * @return {string} versionName
       */
      static getMacOSVersionName(version) {
        const v = version.split('.').splice(0, 2).map(s => parseInt(s, 10) || 0);
        v.push(0);
        if (v[0] !== 10) return undefined;
        switch (v[1]) {
          case 5: return 'Leopard';
          case 6: return 'Snow Leopard';
          case 7: return 'Lion';
          case 8: return 'Mountain Lion';
          case 9: return 'Mavericks';
          case 10: return 'Yosemite';
          case 11: return 'El Capitan';
          case 12: return 'Sierra';
          case 13: return 'High Sierra';
          case 14: return 'Mojave';
          case 15: return 'Catalina';
          default: return undefined;
        }
      }

      /**
       * Get Android version name
       *    1.5 - Cupcake
       *    1.6 - Donut
       *    2.0 - Eclair
       *    2.1 - Eclair
       *    2.2 - Froyo
       *    2.x - Gingerbread
       *    3.x - Honeycomb
       *    4.0 - Ice Cream Sandwich
       *    4.1 - Jelly Bean
       *    4.4 - KitKat
       *    5.x - Lollipop
       *    6.x - Marshmallow
       *    7.x - Nougat
       *    8.x - Oreo
       *    9.x - Pie
       *
       * @example
       *   getAndroidVersionName("7.0") // 'Nougat'
       *
       * @param  {string} version
       * @return {string} versionName
       */
      static getAndroidVersionName(version) {
        const v = version.split('.').splice(0, 2).map(s => parseInt(s, 10) || 0);
        v.push(0);
        if (v[0] === 1 && v[1] < 5) return undefined;
        if (v[0] === 1 && v[1] < 6) return 'Cupcake';
        if (v[0] === 1 && v[1] >= 6) return 'Donut';
        if (v[0] === 2 && v[1] < 2) return 'Eclair';
        if (v[0] === 2 && v[1] === 2) return 'Froyo';
        if (v[0] === 2 && v[1] > 2) return 'Gingerbread';
        if (v[0] === 3) return 'Honeycomb';
        if (v[0] === 4 && v[1] < 1) return 'Ice Cream Sandwich';
        if (v[0] === 4 && v[1] < 4) return 'Jelly Bean';
        if (v[0] === 4 && v[1] >= 4) return 'KitKat';
        if (v[0] === 5) return 'Lollipop';
        if (v[0] === 6) return 'Marshmallow';
        if (v[0] === 7) return 'Nougat';
        if (v[0] === 8) return 'Oreo';
        if (v[0] === 9) return 'Pie';
        return undefined;
      }

      /**
       * Get version precisions count
       *
       * @example
       *   getVersionPrecision("1.10.3") // 3
       *
       * @param  {string} version
       * @return {number}
       */
      static getVersionPrecision(version) {
        return version.split('.').length;
      }

      /**
       * Calculate browser version weight
       *
       * @example
       *   compareVersions('1.10.2.1',  '1.8.2.1.90')    // 1
       *   compareVersions('1.010.2.1', '1.09.2.1.90');  // 1
       *   compareVersions('1.10.2.1',  '1.10.2.1');     // 0
       *   compareVersions('1.10.2.1',  '1.0800.2');     // -1
       *   compareVersions('1.10.2.1',  '1.10',  true);  // 0
       *
       * @param {String} versionA versions versions to compare
       * @param {String} versionB versions versions to compare
       * @param {boolean} [isLoose] enable loose comparison
       * @return {Number} comparison result: -1 when versionA is lower,
       * 1 when versionA is bigger, 0 when both equal
       */
      /* eslint consistent-return: 1 */
      static compareVersions(versionA, versionB, isLoose = false) {
        // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
        const versionAPrecision = Utils.getVersionPrecision(versionA);
        const versionBPrecision = Utils.getVersionPrecision(versionB);

        let precision = Math.max(versionAPrecision, versionBPrecision);
        let lastPrecision = 0;

        const chunks = Utils.map([versionA, versionB], (version) => {
          const delta = precision - Utils.getVersionPrecision(version);

          // 2) "9" -> "9.0" (for precision = 2)
          const _version = version + new Array(delta + 1).join('.0');

          // 3) "9.0" -> ["000000000"", "000000009"]
          return Utils.map(_version.split('.'), chunk => new Array(20 - chunk.length).join('0') + chunk).reverse();
        });

        // adjust precision for loose comparison
        if (isLoose) {
          lastPrecision = precision - Math.min(versionAPrecision, versionBPrecision);
        }

        // iterate in reverse order by reversed chunks array
        precision -= 1;
        while (precision >= lastPrecision) {
          // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
          if (chunks[0][precision] > chunks[1][precision]) {
            return 1;
          }

          if (chunks[0][precision] === chunks[1][precision]) {
            if (precision === lastPrecision) {
              // all version chunks are same
              return 0;
            }

            precision -= 1;
          } else if (chunks[0][precision] < chunks[1][precision]) {
            return -1;
          }
        }

        return undefined;
      }

      /**
       * Array::map polyfill
       *
       * @param  {Array} arr
       * @param  {Function} iterator
       * @return {Array}
       */
      static map(arr, iterator) {
        const result = [];
        let i;
        if (Array.prototype.map) {
          return Array.prototype.map.call(arr, iterator);
        }
        for (i = 0; i < arr.length; i += 1) {
          result.push(iterator(arr[i]));
        }
        return result;
      }

      /**
       * Array::find polyfill
       *
       * @param  {Array} arr
       * @param  {Function} predicate
       * @return {Array}
       */
      static find(arr, predicate) {
        let i;
        let l;
        if (Array.prototype.find) {
          return Array.prototype.find.call(arr, predicate);
        }
        for (i = 0, l = arr.length; i < l; i += 1) {
          const value = arr[i];
          if (predicate(value, i)) {
            return value;
          }
        }
        return undefined;
      }

      /**
       * Object::assign polyfill
       *
       * @param  {Object} obj
       * @param  {Object} ...objs
       * @return {Object}
       */
      static assign(obj, ...assigners) {
        const result = obj;
        let i;
        let l;
        if (Object.assign) {
          return Object.assign(obj, ...assigners);
        }
        for (i = 0, l = assigners.length; i < l; i += 1) {
          const assigner = assigners[i];
          if (typeof assigner === 'object' && assigner !== null) {
            const keys = Object.keys(assigner);
            keys.forEach((key) => {
              result[key] = assigner[key];
            });
          }
        }
        return obj;
      }

      /**
       * Get short version/alias for a browser name
       *
       * @example
       *   getBrowserAlias('Microsoft Edge') // edge
       *
       * @param  {string} browserName
       * @return {string}
       */
      static getBrowserAlias(browserName) {
        return BROWSER_ALIASES_MAP[browserName];
      }

      /**
       * Get short version/alias for a browser name
       *
       * @example
       *   getBrowserAlias('edge') // Microsoft Edge
       *
       * @param  {string} browserAlias
       * @return {string}
       */
      static getBrowserTypeByAlias(browserAlias) {
        return BROWSER_MAP[browserAlias] || '';
      }
    }

    /**
     * Browsers' descriptors
     *
     * The idea of descriptors is simple. You should know about them two simple things:
     * 1. Every descriptor has a method or property called `test` and a `describe` method.
     * 2. Order of descriptors is important.
     *
     * More details:
     * 1. Method or property `test` serves as a way to detect whether the UA string
     * matches some certain browser or not. The `describe` method helps to make a result
     * object with params that show some browser-specific things: name, version, etc.
     * 2. Order of descriptors is important because a Parser goes through them one by one
     * in course. For example, if you insert Chrome's descriptor as the first one,
     * more then a half of browsers will be described as Chrome, because they will pass
     * the Chrome descriptor's test.
     *
     * Descriptor's `test` could be a property with an array of RegExps, where every RegExp
     * will be applied to a UA string to test it whether it matches or not.
     * If a descriptor has two or more regexps in the `test` array it tests them one by one
     * with a logical sum operation. Parser stops if it has found any RegExp that matches the UA.
     *
     * Or `test` could be a method. In that case it gets a Parser instance and should
     * return true/false to get the Parser know if this browser descriptor matches the UA or not.
     */

    const commonVersionIdentifier = /version\/(\d+(\.?_?\d+)+)/i;

    const browsersList = [
      /* Googlebot */
      {
        test: [/googlebot/i],
        describe(ua) {
          const browser = {
            name: 'Googlebot',
          };
          const version = Utils.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },

      /* Opera < 13.0 */
      {
        test: [/opera/i],
        describe(ua) {
          const browser = {
            name: 'Opera',
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },

      /* Opera > 13.0 */
      {
        test: [/opr\/|opios/i],
        describe(ua) {
          const browser = {
            name: 'Opera',
          };
          const version = Utils.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/SamsungBrowser/i],
        describe(ua) {
          const browser = {
            name: 'Samsung Internet for Android',
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/Whale/i],
        describe(ua) {
          const browser = {
            name: 'NAVER Whale Browser',
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/MZBrowser/i],
        describe(ua) {
          const browser = {
            name: 'MZ Browser',
          };
          const version = Utils.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/focus/i],
        describe(ua) {
          const browser = {
            name: 'Focus',
          };
          const version = Utils.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/swing/i],
        describe(ua) {
          const browser = {
            name: 'Swing',
          };
          const version = Utils.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/coast/i],
        describe(ua) {
          const browser = {
            name: 'Opera Coast',
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/opt\/\d+(?:.?_?\d+)+/i],
        describe(ua) {
          const browser = {
            name: 'Opera Touch',
          };
          const version = Utils.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/yabrowser/i],
        describe(ua) {
          const browser = {
            name: 'Yandex Browser',
          };
          const version = Utils.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/ucbrowser/i],
        describe(ua) {
          const browser = {
            name: 'UC Browser',
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/Maxthon|mxios/i],
        describe(ua) {
          const browser = {
            name: 'Maxthon',
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/epiphany/i],
        describe(ua) {
          const browser = {
            name: 'Epiphany',
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/puffin/i],
        describe(ua) {
          const browser = {
            name: 'Puffin',
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/sleipnir/i],
        describe(ua) {
          const browser = {
            name: 'Sleipnir',
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/k-meleon/i],
        describe(ua) {
          const browser = {
            name: 'K-Meleon',
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/micromessenger/i],
        describe(ua) {
          const browser = {
            name: 'WeChat',
          };
          const version = Utils.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/qqbrowser/i],
        describe(ua) {
          const browser = {
            name: (/qqbrowserlite/i).test(ua) ? 'QQ Browser Lite' : 'QQ Browser',
          };
          const version = Utils.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/msie|trident/i],
        describe(ua) {
          const browser = {
            name: 'Internet Explorer',
          };
          const version = Utils.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/\sedg\//i],
        describe(ua) {
          const browser = {
            name: 'Microsoft Edge',
          };

          const version = Utils.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/edg([ea]|ios)/i],
        describe(ua) {
          const browser = {
            name: 'Microsoft Edge',
          };

          const version = Utils.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/vivaldi/i],
        describe(ua) {
          const browser = {
            name: 'Vivaldi',
          };
          const version = Utils.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/seamonkey/i],
        describe(ua) {
          const browser = {
            name: 'SeaMonkey',
          };
          const version = Utils.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/sailfish/i],
        describe(ua) {
          const browser = {
            name: 'Sailfish',
          };

          const version = Utils.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/silk/i],
        describe(ua) {
          const browser = {
            name: 'Amazon Silk',
          };
          const version = Utils.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/phantom/i],
        describe(ua) {
          const browser = {
            name: 'PhantomJS',
          };
          const version = Utils.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/slimerjs/i],
        describe(ua) {
          const browser = {
            name: 'SlimerJS',
          };
          const version = Utils.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
        describe(ua) {
          const browser = {
            name: 'BlackBerry',
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/(web|hpw)[o0]s/i],
        describe(ua) {
          const browser = {
            name: 'WebOS Browser',
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/bada/i],
        describe(ua) {
          const browser = {
            name: 'Bada',
          };
          const version = Utils.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/tizen/i],
        describe(ua) {
          const browser = {
            name: 'Tizen',
          };
          const version = Utils.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/qupzilla/i],
        describe(ua) {
          const browser = {
            name: 'QupZilla',
          };
          const version = Utils.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/firefox|iceweasel|fxios/i],
        describe(ua) {
          const browser = {
            name: 'Firefox',
          };
          const version = Utils.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/electron/i],
        describe(ua) {
          const browser = {
            name: 'Electron',
          };
          const version = Utils.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/MiuiBrowser/i],
        describe(ua) {
          const browser = {
            name: 'Miui',
          };
          const version = Utils.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/chromium/i],
        describe(ua) {
          const browser = {
            name: 'Chromium',
          };
          const version = Utils.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/chrome|crios|crmo/i],
        describe(ua) {
          const browser = {
            name: 'Chrome',
          };
          const version = Utils.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },
      {
        test: [/GSA/i],
        describe(ua) {
          const browser = {
            name: 'Google Search',
          };
          const version = Utils.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },

      /* Android Browser */
      {
        test(parser) {
          const notLikeAndroid = !parser.test(/like android/i);
          const butAndroid = parser.test(/android/i);
          return notLikeAndroid && butAndroid;
        },
        describe(ua) {
          const browser = {
            name: 'Android Browser',
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },

      /* PlayStation 4 */
      {
        test: [/playstation 4/i],
        describe(ua) {
          const browser = {
            name: 'PlayStation 4',
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },

      /* Safari */
      {
        test: [/safari|applewebkit/i],
        describe(ua) {
          const browser = {
            name: 'Safari',
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua);

          if (version) {
            browser.version = version;
          }

          return browser;
        },
      },

      /* Something else */
      {
        test: [/.*/i],
        describe(ua) {
          /* Here we try to make sure that there are explicit details about the device
           * in order to decide what regexp exactly we want to apply
           * (as there is a specific decision based on that conclusion)
           */
          const regexpWithoutDeviceSpec = /^(.*)\/(.*) /;
          const regexpWithDeviceSpec = /^(.*)\/(.*)[ \t]\((.*)/;
          const hasDeviceSpec = ua.search('\\(') !== -1;
          const regexp = hasDeviceSpec ? regexpWithDeviceSpec : regexpWithoutDeviceSpec;
          return {
            name: Utils.getFirstMatch(regexp, ua),
            version: Utils.getSecondMatch(regexp, ua),
          };
        },
      },
    ];

    var osParsersList = [
      /* Roku */
      {
        test: [/Roku\/DVP/],
        describe(ua) {
          const version = Utils.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, ua);
          return {
            name: OS_MAP.Roku,
            version,
          };
        },
      },

      /* Windows Phone */
      {
        test: [/windows phone/i],
        describe(ua) {
          const version = Utils.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, ua);
          return {
            name: OS_MAP.WindowsPhone,
            version,
          };
        },
      },

      /* Windows */
      {
        test: [/windows /i],
        describe(ua) {
          const version = Utils.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, ua);
          const versionName = Utils.getWindowsVersionName(version);

          return {
            name: OS_MAP.Windows,
            version,
            versionName,
          };
        },
      },

      /* Firefox on iPad */
      {
        test: [/Macintosh(.*?) FxiOS(.*?)\//],
        describe(ua) {
          const result = {
            name: OS_MAP.iOS,
          };
          const version = Utils.getSecondMatch(/(Version\/)(\d[\d.]+)/, ua);
          if (version) {
            result.version = version;
          }
          return result;
        },
      },

      /* macOS */
      {
        test: [/macintosh/i],
        describe(ua) {
          const version = Utils.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, ua).replace(/[_\s]/g, '.');
          const versionName = Utils.getMacOSVersionName(version);

          const os = {
            name: OS_MAP.MacOS,
            version,
          };
          if (versionName) {
            os.versionName = versionName;
          }
          return os;
        },
      },

      /* iOS */
      {
        test: [/(ipod|iphone|ipad)/i],
        describe(ua) {
          const version = Utils.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, ua).replace(/[_\s]/g, '.');

          return {
            name: OS_MAP.iOS,
            version,
          };
        },
      },

      /* Android */
      {
        test(parser) {
          const notLikeAndroid = !parser.test(/like android/i);
          const butAndroid = parser.test(/android/i);
          return notLikeAndroid && butAndroid;
        },
        describe(ua) {
          const version = Utils.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, ua);
          const versionName = Utils.getAndroidVersionName(version);
          const os = {
            name: OS_MAP.Android,
            version,
          };
          if (versionName) {
            os.versionName = versionName;
          }
          return os;
        },
      },

      /* WebOS */
      {
        test: [/(web|hpw)[o0]s/i],
        describe(ua) {
          const version = Utils.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, ua);
          const os = {
            name: OS_MAP.WebOS,
          };

          if (version && version.length) {
            os.version = version;
          }
          return os;
        },
      },

      /* BlackBerry */
      {
        test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
        describe(ua) {
          const version = Utils.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, ua)
            || Utils.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, ua)
            || Utils.getFirstMatch(/\bbb(\d+)/i, ua);

          return {
            name: OS_MAP.BlackBerry,
            version,
          };
        },
      },

      /* Bada */
      {
        test: [/bada/i],
        describe(ua) {
          const version = Utils.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, ua);

          return {
            name: OS_MAP.Bada,
            version,
          };
        },
      },

      /* Tizen */
      {
        test: [/tizen/i],
        describe(ua) {
          const version = Utils.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, ua);

          return {
            name: OS_MAP.Tizen,
            version,
          };
        },
      },

      /* Linux */
      {
        test: [/linux/i],
        describe() {
          return {
            name: OS_MAP.Linux,
          };
        },
      },

      /* Chrome OS */
      {
        test: [/CrOS/],
        describe() {
          return {
            name: OS_MAP.ChromeOS,
          };
        },
      },

      /* Playstation 4 */
      {
        test: [/PlayStation 4/],
        describe(ua) {
          const version = Utils.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, ua);
          return {
            name: OS_MAP.PlayStation4,
            version,
          };
        },
      },
    ];

    /*
     * Tablets go first since usually they have more specific
     * signs to detect.
     */

    var platformParsersList = [
      /* Googlebot */
      {
        test: [/googlebot/i],
        describe() {
          return {
            type: 'bot',
            vendor: 'Google',
          };
        },
      },

      /* Huawei */
      {
        test: [/huawei/i],
        describe(ua) {
          const model = Utils.getFirstMatch(/(can-l01)/i, ua) && 'Nova';
          const platform = {
            type: PLATFORMS_MAP.mobile,
            vendor: 'Huawei',
          };
          if (model) {
            platform.model = model;
          }
          return platform;
        },
      },

      /* Nexus Tablet */
      {
        test: [/nexus\s*(?:7|8|9|10).*/i],
        describe() {
          return {
            type: PLATFORMS_MAP.tablet,
            vendor: 'Nexus',
          };
        },
      },

      /* iPad */
      {
        test: [/ipad/i],
        describe() {
          return {
            type: PLATFORMS_MAP.tablet,
            vendor: 'Apple',
            model: 'iPad',
          };
        },
      },

      /* Firefox on iPad */
      {
        test: [/Macintosh(.*?) FxiOS(.*?)\//],
        describe() {
          return {
            type: PLATFORMS_MAP.tablet,
            vendor: 'Apple',
            model: 'iPad',
          };
        },
      },

      /* Amazon Kindle Fire */
      {
        test: [/kftt build/i],
        describe() {
          return {
            type: PLATFORMS_MAP.tablet,
            vendor: 'Amazon',
            model: 'Kindle Fire HD 7',
          };
        },
      },

      /* Another Amazon Tablet with Silk */
      {
        test: [/silk/i],
        describe() {
          return {
            type: PLATFORMS_MAP.tablet,
            vendor: 'Amazon',
          };
        },
      },

      /* Tablet */
      {
        test: [/tablet(?! pc)/i],
        describe() {
          return {
            type: PLATFORMS_MAP.tablet,
          };
        },
      },

      /* iPod/iPhone */
      {
        test(parser) {
          const iDevice = parser.test(/ipod|iphone/i);
          const likeIDevice = parser.test(/like (ipod|iphone)/i);
          return iDevice && !likeIDevice;
        },
        describe(ua) {
          const model = Utils.getFirstMatch(/(ipod|iphone)/i, ua);
          return {
            type: PLATFORMS_MAP.mobile,
            vendor: 'Apple',
            model,
          };
        },
      },

      /* Nexus Mobile */
      {
        test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
        describe() {
          return {
            type: PLATFORMS_MAP.mobile,
            vendor: 'Nexus',
          };
        },
      },

      /* Mobile */
      {
        test: [/[^-]mobi/i],
        describe() {
          return {
            type: PLATFORMS_MAP.mobile,
          };
        },
      },

      /* BlackBerry */
      {
        test(parser) {
          return parser.getBrowserName(true) === 'blackberry';
        },
        describe() {
          return {
            type: PLATFORMS_MAP.mobile,
            vendor: 'BlackBerry',
          };
        },
      },

      /* Bada */
      {
        test(parser) {
          return parser.getBrowserName(true) === 'bada';
        },
        describe() {
          return {
            type: PLATFORMS_MAP.mobile,
          };
        },
      },

      /* Windows Phone */
      {
        test(parser) {
          return parser.getBrowserName() === 'windows phone';
        },
        describe() {
          return {
            type: PLATFORMS_MAP.mobile,
            vendor: 'Microsoft',
          };
        },
      },

      /* Android Tablet */
      {
        test(parser) {
          const osMajorVersion = Number(String(parser.getOSVersion()).split('.')[0]);
          return parser.getOSName(true) === 'android' && (osMajorVersion >= 3);
        },
        describe() {
          return {
            type: PLATFORMS_MAP.tablet,
          };
        },
      },

      /* Android Mobile */
      {
        test(parser) {
          return parser.getOSName(true) === 'android';
        },
        describe() {
          return {
            type: PLATFORMS_MAP.mobile,
          };
        },
      },

      /* desktop */
      {
        test(parser) {
          return parser.getOSName(true) === 'macos';
        },
        describe() {
          return {
            type: PLATFORMS_MAP.desktop,
            vendor: 'Apple',
          };
        },
      },

      /* Windows */
      {
        test(parser) {
          return parser.getOSName(true) === 'windows';
        },
        describe() {
          return {
            type: PLATFORMS_MAP.desktop,
          };
        },
      },

      /* Linux */
      {
        test(parser) {
          return parser.getOSName(true) === 'linux';
        },
        describe() {
          return {
            type: PLATFORMS_MAP.desktop,
          };
        },
      },

      /* PlayStation 4 */
      {
        test(parser) {
          return parser.getOSName(true) === 'playstation 4';
        },
        describe() {
          return {
            type: PLATFORMS_MAP.tv,
          };
        },
      },

      /* Roku */
      {
        test(parser) {
          return parser.getOSName(true) === 'roku';
        },
        describe() {
          return {
            type: PLATFORMS_MAP.tv,
          };
        },
      },
    ];

    /*
     * More specific goes first
     */
    var enginesParsersList = [
      /* EdgeHTML */
      {
        test(parser) {
          return parser.getBrowserName(true) === 'microsoft edge';
        },
        describe(ua) {
          const isBlinkBased = /\sedg\//i.test(ua);

          // return blink if it's blink-based one
          if (isBlinkBased) {
            return {
              name: ENGINE_MAP.Blink,
            };
          }

          // otherwise match the version and return EdgeHTML
          const version = Utils.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, ua);

          return {
            name: ENGINE_MAP.EdgeHTML,
            version,
          };
        },
      },

      /* Trident */
      {
        test: [/trident/i],
        describe(ua) {
          const engine = {
            name: ENGINE_MAP.Trident,
          };

          const version = Utils.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            engine.version = version;
          }

          return engine;
        },
      },

      /* Presto */
      {
        test(parser) {
          return parser.test(/presto/i);
        },
        describe(ua) {
          const engine = {
            name: ENGINE_MAP.Presto,
          };

          const version = Utils.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            engine.version = version;
          }

          return engine;
        },
      },

      /* Gecko */
      {
        test(parser) {
          const isGecko = parser.test(/gecko/i);
          const likeGecko = parser.test(/like gecko/i);
          return isGecko && !likeGecko;
        },
        describe(ua) {
          const engine = {
            name: ENGINE_MAP.Gecko,
          };

          const version = Utils.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            engine.version = version;
          }

          return engine;
        },
      },

      /* Blink */
      {
        test: [/(apple)?webkit\/537\.36/i],
        describe() {
          return {
            name: ENGINE_MAP.Blink,
          };
        },
      },

      /* WebKit */
      {
        test: [/(apple)?webkit/i],
        describe(ua) {
          const engine = {
            name: ENGINE_MAP.WebKit,
          };

          const version = Utils.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, ua);

          if (version) {
            engine.version = version;
          }

          return engine;
        },
      },
    ];

    /**
     * The main class that arranges the whole parsing process.
     */
    class Parser {
      /**
       * Create instance of Parser
       *
       * @param {String} UA User-Agent string
       * @param {Boolean} [skipParsing=false] parser can skip parsing in purpose of performance
       * improvements if you need to make a more particular parsing
       * like {@link Parser#parseBrowser} or {@link Parser#parsePlatform}
       *
       * @throw {Error} in case of empty UA String
       *
       * @constructor
       */
      constructor(UA, skipParsing = false) {
        if (UA === void (0) || UA === null || UA === '') {
          throw new Error("UserAgent parameter can't be empty");
        }

        this._ua = UA;

        /**
         * @typedef ParsedResult
         * @property {Object} browser
         * @property {String|undefined} [browser.name]
         * Browser name, like `"Chrome"` or `"Internet Explorer"`
         * @property {String|undefined} [browser.version] Browser version as a String `"12.01.45334.10"`
         * @property {Object} os
         * @property {String|undefined} [os.name] OS name, like `"Windows"` or `"macOS"`
         * @property {String|undefined} [os.version] OS version, like `"NT 5.1"` or `"10.11.1"`
         * @property {String|undefined} [os.versionName] OS name, like `"XP"` or `"High Sierra"`
         * @property {Object} platform
         * @property {String|undefined} [platform.type]
         * platform type, can be either `"desktop"`, `"tablet"` or `"mobile"`
         * @property {String|undefined} [platform.vendor] Vendor of the device,
         * like `"Apple"` or `"Samsung"`
         * @property {String|undefined} [platform.model] Device model,
         * like `"iPhone"` or `"Kindle Fire HD 7"`
         * @property {Object} engine
         * @property {String|undefined} [engine.name]
         * Can be any of this: `WebKit`, `Blink`, `Gecko`, `Trident`, `Presto`, `EdgeHTML`
         * @property {String|undefined} [engine.version] String version of the engine
         */
        this.parsedResult = {};

        if (skipParsing !== true) {
          this.parse();
        }
      }

      /**
       * Get UserAgent string of current Parser instance
       * @return {String} User-Agent String of the current <Parser> object
       *
       * @public
       */
      getUA() {
        return this._ua;
      }

      /**
       * Test a UA string for a regexp
       * @param {RegExp} regex
       * @return {Boolean}
       */
      test(regex) {
        return regex.test(this._ua);
      }

      /**
       * Get parsed browser object
       * @return {Object}
       */
      parseBrowser() {
        this.parsedResult.browser = {};

        const browserDescriptor = Utils.find(browsersList, (_browser) => {
          if (typeof _browser.test === 'function') {
            return _browser.test(this);
          }

          if (_browser.test instanceof Array) {
            return _browser.test.some(condition => this.test(condition));
          }

          throw new Error("Browser's test function is not valid");
        });

        if (browserDescriptor) {
          this.parsedResult.browser = browserDescriptor.describe(this.getUA());
        }

        return this.parsedResult.browser;
      }

      /**
       * Get parsed browser object
       * @return {Object}
       *
       * @public
       */
      getBrowser() {
        if (this.parsedResult.browser) {
          return this.parsedResult.browser;
        }

        return this.parseBrowser();
      }

      /**
       * Get browser's name
       * @return {String} Browser's name or an empty string
       *
       * @public
       */
      getBrowserName(toLowerCase) {
        if (toLowerCase) {
          return String(this.getBrowser().name).toLowerCase() || '';
        }
        return this.getBrowser().name || '';
      }


      /**
       * Get browser's version
       * @return {String} version of browser
       *
       * @public
       */
      getBrowserVersion() {
        return this.getBrowser().version;
      }

      /**
       * Get OS
       * @return {Object}
       *
       * @example
       * this.getOS();
       * {
       *   name: 'macOS',
       *   version: '10.11.12'
       * }
       */
      getOS() {
        if (this.parsedResult.os) {
          return this.parsedResult.os;
        }

        return this.parseOS();
      }

      /**
       * Parse OS and save it to this.parsedResult.os
       * @return {*|{}}
       */
      parseOS() {
        this.parsedResult.os = {};

        const os = Utils.find(osParsersList, (_os) => {
          if (typeof _os.test === 'function') {
            return _os.test(this);
          }

          if (_os.test instanceof Array) {
            return _os.test.some(condition => this.test(condition));
          }

          throw new Error("Browser's test function is not valid");
        });

        if (os) {
          this.parsedResult.os = os.describe(this.getUA());
        }

        return this.parsedResult.os;
      }

      /**
       * Get OS name
       * @param {Boolean} [toLowerCase] return lower-cased value
       * @return {String} name of the OS — macOS, Windows, Linux, etc.
       */
      getOSName(toLowerCase) {
        const { name } = this.getOS();

        if (toLowerCase) {
          return String(name).toLowerCase() || '';
        }

        return name || '';
      }

      /**
       * Get OS version
       * @return {String} full version with dots ('10.11.12', '5.6', etc)
       */
      getOSVersion() {
        return this.getOS().version;
      }

      /**
       * Get parsed platform
       * @return {{}}
       */
      getPlatform() {
        if (this.parsedResult.platform) {
          return this.parsedResult.platform;
        }

        return this.parsePlatform();
      }

      /**
       * Get platform name
       * @param {Boolean} [toLowerCase=false]
       * @return {*}
       */
      getPlatformType(toLowerCase = false) {
        const { type } = this.getPlatform();

        if (toLowerCase) {
          return String(type).toLowerCase() || '';
        }

        return type || '';
      }

      /**
       * Get parsed platform
       * @return {{}}
       */
      parsePlatform() {
        this.parsedResult.platform = {};

        const platform = Utils.find(platformParsersList, (_platform) => {
          if (typeof _platform.test === 'function') {
            return _platform.test(this);
          }

          if (_platform.test instanceof Array) {
            return _platform.test.some(condition => this.test(condition));
          }

          throw new Error("Browser's test function is not valid");
        });

        if (platform) {
          this.parsedResult.platform = platform.describe(this.getUA());
        }

        return this.parsedResult.platform;
      }

      /**
       * Get parsed engine
       * @return {{}}
       */
      getEngine() {
        if (this.parsedResult.engine) {
          return this.parsedResult.engine;
        }

        return this.parseEngine();
      }

      /**
       * Get engines's name
       * @return {String} Engines's name or an empty string
       *
       * @public
       */
      getEngineName(toLowerCase) {
        if (toLowerCase) {
          return String(this.getEngine().name).toLowerCase() || '';
        }
        return this.getEngine().name || '';
      }

      /**
       * Get parsed platform
       * @return {{}}
       */
      parseEngine() {
        this.parsedResult.engine = {};

        const engine = Utils.find(enginesParsersList, (_engine) => {
          if (typeof _engine.test === 'function') {
            return _engine.test(this);
          }

          if (_engine.test instanceof Array) {
            return _engine.test.some(condition => this.test(condition));
          }

          throw new Error("Browser's test function is not valid");
        });

        if (engine) {
          this.parsedResult.engine = engine.describe(this.getUA());
        }

        return this.parsedResult.engine;
      }

      /**
       * Parse full information about the browser
       * @returns {Parser}
       */
      parse() {
        this.parseBrowser();
        this.parseOS();
        this.parsePlatform();
        this.parseEngine();

        return this;
      }

      /**
       * Get parsed result
       * @return {ParsedResult}
       */
      getResult() {
        return Utils.assign({}, this.parsedResult);
      }

      /**
       * Check if parsed browser matches certain conditions
       *
       * @param {Object} checkTree It's one or two layered object,
       * which can include a platform or an OS on the first layer
       * and should have browsers specs on the bottom-laying layer
       *
       * @returns {Boolean|undefined} Whether the browser satisfies the set conditions or not.
       * Returns `undefined` when the browser is no described in the checkTree object.
       *
       * @example
       * const browser = Bowser.getParser(window.navigator.userAgent);
       * if (browser.satisfies({chrome: '>118.01.1322' }))
       * // or with os
       * if (browser.satisfies({windows: { chrome: '>118.01.1322' } }))
       * // or with platforms
       * if (browser.satisfies({desktop: { chrome: '>118.01.1322' } }))
       */
      satisfies(checkTree) {
        const platformsAndOSes = {};
        let platformsAndOSCounter = 0;
        const browsers = {};
        let browsersCounter = 0;

        const allDefinitions = Object.keys(checkTree);

        allDefinitions.forEach((key) => {
          const currentDefinition = checkTree[key];
          if (typeof currentDefinition === 'string') {
            browsers[key] = currentDefinition;
            browsersCounter += 1;
          } else if (typeof currentDefinition === 'object') {
            platformsAndOSes[key] = currentDefinition;
            platformsAndOSCounter += 1;
          }
        });

        if (platformsAndOSCounter > 0) {
          const platformsAndOSNames = Object.keys(platformsAndOSes);
          const OSMatchingDefinition = Utils.find(platformsAndOSNames, name => (this.isOS(name)));

          if (OSMatchingDefinition) {
            const osResult = this.satisfies(platformsAndOSes[OSMatchingDefinition]);

            if (osResult !== void 0) {
              return osResult;
            }
          }

          const platformMatchingDefinition = Utils.find(
            platformsAndOSNames,
            name => (this.isPlatform(name)),
          );
          if (platformMatchingDefinition) {
            const platformResult = this.satisfies(platformsAndOSes[platformMatchingDefinition]);

            if (platformResult !== void 0) {
              return platformResult;
            }
          }
        }

        if (browsersCounter > 0) {
          const browserNames = Object.keys(browsers);
          const matchingDefinition = Utils.find(browserNames, name => (this.isBrowser(name, true)));

          if (matchingDefinition !== void 0) {
            return this.compareVersion(browsers[matchingDefinition]);
          }
        }

        return undefined;
      }

      /**
       * Check if the browser name equals the passed string
       * @param browserName The string to compare with the browser name
       * @param [includingAlias=false] The flag showing whether alias will be included into comparison
       * @returns {boolean}
       */
      isBrowser(browserName, includingAlias = false) {
        const defaultBrowserName = this.getBrowserName().toLowerCase();
        let browserNameLower = browserName.toLowerCase();
        const alias = Utils.getBrowserTypeByAlias(browserNameLower);

        if (includingAlias && alias) {
          browserNameLower = alias.toLowerCase();
        }
        return browserNameLower === defaultBrowserName;
      }

      compareVersion(version) {
        let expectedResults = [0];
        let comparableVersion = version;
        let isLoose = false;

        const currentBrowserVersion = this.getBrowserVersion();

        if (typeof currentBrowserVersion !== 'string') {
          return void 0;
        }

        if (version[0] === '>' || version[0] === '<') {
          comparableVersion = version.substr(1);
          if (version[1] === '=') {
            isLoose = true;
            comparableVersion = version.substr(2);
          } else {
            expectedResults = [];
          }
          if (version[0] === '>') {
            expectedResults.push(1);
          } else {
            expectedResults.push(-1);
          }
        } else if (version[0] === '=') {
          comparableVersion = version.substr(1);
        } else if (version[0] === '~') {
          isLoose = true;
          comparableVersion = version.substr(1);
        }

        return expectedResults.indexOf(
          Utils.compareVersions(currentBrowserVersion, comparableVersion, isLoose),
        ) > -1;
      }

      isOS(osName) {
        return this.getOSName(true) === String(osName).toLowerCase();
      }

      isPlatform(platformType) {
        return this.getPlatformType(true) === String(platformType).toLowerCase();
      }

      isEngine(engineName) {
        return this.getEngineName(true) === String(engineName).toLowerCase();
      }

      /**
       * Is anything? Check if the browser is called "anything",
       * the OS called "anything" or the platform called "anything"
       * @param {String} anything
       * @param [includingAlias=false] The flag showing whether alias will be included into comparison
       * @returns {Boolean}
       */
      is(anything, includingAlias = false) {
        return this.isBrowser(anything, includingAlias) || this.isOS(anything)
          || this.isPlatform(anything);
      }

      /**
       * Check if any of the given values satisfies this.is(anything)
       * @param {String[]} anythings
       * @returns {Boolean}
       */
      some(anythings = []) {
        return anythings.some(anything => this.is(anything));
      }
    }

    /*!
     * Bowser - a browser detector
     * https://github.com/lancedikson/bowser
     * MIT License | (c) Dustin Diaz 2012-2015
     * MIT License | (c) Denis Demchenko 2015-2019
     */

    /**
     * Bowser class.
     * Keep it simple as much as it can be.
     * It's supposed to work with collections of {@link Parser} instances
     * rather then solve one-instance problems.
     * All the one-instance stuff is located in Parser class.
     *
     * @class
     * @classdesc Bowser is a static object, that provides an API to the Parsers
     * @hideconstructor
     */
    class Bowser {
      /**
       * Creates a {@link Parser} instance
       *
       * @param {String} UA UserAgent string
       * @param {Boolean} [skipParsing=false] Will make the Parser postpone parsing until you ask it
       * explicitly. Same as `skipParsing` for {@link Parser}.
       * @returns {Parser}
       * @throws {Error} when UA is not a String
       *
       * @example
       * const parser = Bowser.getParser(window.navigator.userAgent);
       * const result = parser.getResult();
       */
      static getParser(UA, skipParsing = false) {
        if (typeof UA !== 'string') {
          throw new Error('UserAgent should be a string');
        }
        return new Parser(UA, skipParsing);
      }

      /**
       * Creates a {@link Parser} instance and runs {@link Parser.getResult} immediately
       *
       * @param UA
       * @return {ParsedResult}
       *
       * @example
       * const result = Bowser.parse(window.navigator.userAgent);
       */
      static parse(UA) {
        return (new Parser(UA)).getResult();
      }

      static get BROWSER_MAP() {
        return BROWSER_MAP;
      }

      static get ENGINE_MAP() {
        return ENGINE_MAP;
      }

      static get OS_MAP() {
        return OS_MAP;
      }

      static get PLATFORMS_MAP() {
        return PLATFORMS_MAP;
      }
    }

    const getAbsoluteUrl = (url) => {
        if (url && url.startsWith('/')) {
            return window.origin + url;
        }
        return url;
    };
    const jsonifyValidJSONString = (mightBeJSONString) => {
        if (typeof mightBeJSONString !== 'string') {
            return mightBeJSONString;
        }
        try {
            return JSON.parse(mightBeJSONString);
        }
        catch (e) {
            /* Do Nothing. Unable to parse the param value */
        }
        return mightBeJSONString;
    };
    const convertSearchParamsToJSON = (url) => {
        const result = {};
        if (!url || url === '?' || url.indexOf('?') === -1) {
            return result;
        }
        const paramsObject = Object.fromEntries(new URL(url).searchParams);
        Object.entries(paramsObject).forEach(([paramName, paramValue]) => {
            result[paramName] = jsonifyValidJSONString(paramValue);
        });
        return result;
    };
    const parseHeaders = (headers) => {
        if (headers instanceof Headers) {
            return Array.from(headers).reduce((obj, [key, val]) => {
                obj[key] = val;
                return obj;
            }, {});
        }
        else if (Array.isArray(headers)) {
            return headers.reduce((obj, [key, val]) => {
                obj[key] = val;
                return obj;
            }, {});
        }
        return headers;
    };
    const getCustomResponse = async (interceptor, args, isJsonResponse) => {
        const customResponse = await interceptor(args);
        if (customResponse) {
            if (typeof customResponse === 'object' && isJsonResponse) {
                customResponse.body = JSON.stringify(customResponse);
            }
            if (args.status === 204) {
                customResponse.status = 200;
            }
            return {
                body: args.response,
                headers: args.responseHeaders,
                status: args.status,
                statusText: args.statusText,
                ...customResponse,
            };
        }
        return null;
    };
    const isJsonResponse = (response) => {
        return response.headers.get('content-type')?.indexOf('application/json') !== -1;
    };

    const records = [];
    const addInterceptor = (urlPattern, interceptor, overrideResponse = false) => {
        records.unshift({ urlPattern, interceptor, overrideResponse });
    };
    const getInterceptRecordForUrl = (url) => {
        return records.find(({ urlPattern }) => urlPattern.test(getAbsoluteUrl(url)));
    };
    const clearInterceptors = () => {
        records.length = 0;
    };

    exports.ApiType = void 0;
    (function (ApiType) {
        ApiType["XHR"] = "xmlhttprequest";
        ApiType["FETCH"] = "fetch";
    })(exports.ApiType || (exports.ApiType = {}));

    const onReadyStateChange = async function () {
        if (this.readyState === 4) {
            const { interceptor, overrideResponse } = getInterceptRecordForUrl(this.responseURL) || {};
            if (!interceptor) {
                return;
            }
            let responseTime;
            if (this.startTime) {
                responseTime = Math.floor(performance.now() - this.startTime);
            }
            const responseHeaders = {};
            this.getAllResponseHeaders()
                .trim()
                .split(/[\r\n]+/)
                .forEach((line) => {
                const parts = line.split(': ');
                const header = parts.shift();
                const value = parts.join(': ');
                responseHeaders[header] = value;
            });
            const responseType = this.responseType;
            let requestData;
            if (this.method === 'POST') {
                requestData = jsonifyValidJSONString(this.requestData);
            }
            else {
                requestData = convertSearchParamsToJSON(this.responseURL);
            }
            const interceptorArgs = {
                api: exports.ApiType.XHR,
                responseTime,
                method: this.method,
                url: this.responseURL,
                requestHeaders: this.requestHeaders,
                requestData,
                responseType: this.responseType,
                response: this.response,
                responseJSON: jsonifyValidJSONString(this.response),
                responseHeaders,
                status: this.status,
                statusText: this.statusText,
                contentType: responseHeaders['content-type'],
            };
            if (!overrideResponse) {
                // do not wait for interceptor to finish execution
                interceptor(interceptorArgs);
                return;
            }
            const isJsonResponse = responseType === 'json';
            const customResponse = await getCustomResponse(interceptor, interceptorArgs, isJsonResponse);
            if (!customResponse) {
                // nothing to override
                return;
            }
            Object.defineProperty(this, 'response', {
                get() {
                    if (isJsonResponse) {
                        if (typeof customResponse.body === 'object') {
                            return customResponse.body;
                        }
                        return jsonifyValidJSONString(customResponse.body);
                    }
                    return customResponse.body;
                },
            });
            if (responseType === '' || responseType === 'text') {
                Object.defineProperty(this, 'responseText', { get: () => customResponse.body });
            }
            Object.defineProperty(this, 'status', { get: () => customResponse.status });
            Object.defineProperty(this, 'statusText', { get: () => customResponse.statusText });
            Object.defineProperty(this, 'headers', { get: () => customResponse.headers });
        }
    };
    const XHR = XMLHttpRequest;
    // @ts-ignore
    XMLHttpRequest = function () {
        const xhr = new XHR();
        xhr.addEventListener('readystatechange', onReadyStateChange.bind(xhr), false);
        return xhr;
    };
    XMLHttpRequest.prototype = XHR.prototype;
    Object.entries(XHR).map(([key, val]) => {
        XMLHttpRequest[key] = val;
    });
    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method) {
        this.method = method;
        this.startTime = performance.now();
        open.apply(this, arguments);
    };
    const send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function (data) {
        this.requestData = data;
        send.apply(this, arguments);
    };
    const setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
        this.requestHeaders = this.requestHeaders || {};
        this.requestHeaders[header] = value;
        setRequestHeader.apply(this, arguments);
    };
    ['DONE', 'HEADERS_RECEIVED', 'LOADING', 'OPENED', 'UNSENT'].forEach((extraXHRProperty) => {
        XMLHttpRequest[extraXHRProperty] = XHR[extraXHRProperty];
    });

    const getInterceptorArgs = async (request, response, responseTime) => {
        const url = response.url;
        const method = request.method;
        const requestHeaders = parseHeaders(request.headers);
        let requestData;
        if (method === 'POST') {
            requestData = jsonifyValidJSONString(await request.text());
        }
        else {
            requestData = convertSearchParamsToJSON(url);
        }
        const responseData = await response.text();
        const responseHeaders = parseHeaders(response.headers);
        const responseDataAsJson = jsonifyValidJSONString(responseData);
        return {
            api: exports.ApiType.FETCH,
            method,
            url,
            requestHeaders,
            requestData,
            response: responseData,
            responseJSON: responseDataAsJson,
            responseHeaders,
            contentType: responseHeaders['content-type'],
            responseTime,
            status: response.status,
            statusText: response.statusText,
        };
    };
    const _fetch = fetch;
    // @ts-ignore
    fetch = async (resource, initOptions = {}) => {
        const getOriginalResponse = () => _fetch(resource, initOptions);
        let request;
        if (resource instanceof Request) {
            request = resource.clone();
        }
        else {
            request = new Request(resource.toString(), initOptions);
        }
        const startTime = performance.now();
        const originalResponse = await getOriginalResponse();
        const responseTime = Math.floor(performance.now() - startTime);
        const url = originalResponse.url; // final URL obtained after any redirects
        const { interceptor, overrideResponse } = getInterceptRecordForUrl(url) || {};
        if (!interceptor) {
            return originalResponse;
        }
        const response = originalResponse.clone();
        if (!overrideResponse) {
            // do not wait for interceptor to finish execution
            getInterceptorArgs(request, response, responseTime).then(interceptor);
            return originalResponse;
        }
        const interceptorArgs = await getInterceptorArgs(request, response, responseTime);
        const customResponse = await getCustomResponse(interceptor, interceptorArgs, isJsonResponse(response));
        if (!customResponse) {
            // nothing to override, return original response
            return originalResponse;
        }
        return new Response(new Blob([customResponse.body]), {
            status: customResponse.status,
            statusText: customResponse.statusText,
            headers: customResponse.headers,
        });
    };

    const Network = {
        intercept: addInterceptor,
        clearInterceptors,
    };

    const POST_MESSAGE_SOURCE = 'requestly:websdk:sessionRecorder';
    const RELAY_EVENT_MESSAGE_ACTION = 'relayEventToTopDocument';
    class SessionRecorder {
        #options;
        #stopRecording;
        #url;
        #environment;
        #lastTwoSessionEvents;
        constructor(options) {
            this.#options = {
                ...options,
                maxDuration: options.maxDuration || 10 * 60 * 1000,
                relayEventsToTop: options.relayEventsToTop && window.top !== window,
            };
            this.#url = window.location.href;
            if (!this.#options.relayEventsToTop) {
                this.#captureEnvironment();
                window.addEventListener('message', (message) => {
                    if (message.data.source !== POST_MESSAGE_SOURCE) {
                        return;
                    }
                    if (message.data.action === RELAY_EVENT_MESSAGE_ACTION) {
                        const { eventType, event, url } = message.data.payload;
                        this.#addEvent(eventType, {
                            ...event,
                            frameUrl: url,
                        });
                    }
                });
            }
        }
        start() {
            const plugins = [];
            if (this.#options.console) {
                plugins.push(getRecordConsolePlugin());
            }
            if (this.#options.relayEventsToTop) {
                if (this.#isCrossDomainFrame()) {
                    // RRWeb already handles events for same domain frames
                    this.#stopRecording = record({
                        plugins,
                        emit: (event) => {
                            if (event.type === EventType.Plugin && event.data.plugin === PLUGIN_NAME) {
                                this.#relayEventToTopDocument(exports.RQSessionEventType.RRWEB, event);
                            }
                        },
                    });
                }
                this.#interceptNetworkRequests((event) => {
                    this.#relayEventToTopDocument(exports.RQSessionEventType.NETWORK, event);
                });
                return;
            }
            this.#lastTwoSessionEvents = [this.#getEmptySessionEvents(), this.#getEmptySessionEvents()];
            this.#stopRecording = record({
                plugins,
                checkoutEveryNms: this.#options.maxDuration,
                emit: (event, isCheckout) => {
                    if (isCheckout) {
                        let previousSessionEvents = this.#lastTwoSessionEvents[1];
                        const previousSessionRRWebEvents = previousSessionEvents[exports.RQSessionEventType.RRWEB];
                        const timeElapsedSinceStart = event.timestamp - previousSessionRRWebEvents[0].timestamp;
                        // final session duration should be between T and 2T where T is maxDuration
                        if (timeElapsedSinceStart >= 2 * this.#options.maxDuration) {
                            previousSessionEvents = this.#getEmptySessionEvents();
                        }
                        this.#lastTwoSessionEvents = [previousSessionEvents, this.#getEmptySessionEvents()];
                    }
                    this.#addEvent(exports.RQSessionEventType.RRWEB, event);
                },
            });
            this.#interceptNetworkRequests((event) => {
                this.#addEvent(exports.RQSessionEventType.NETWORK, event);
            });
        }
        stop() {
            this.#stopRecording?.();
            this.#stopRecording = null;
            Network.clearInterceptors();
        }
        getSession() {
            if (this.#options.relayEventsToTop) {
                return null;
            }
            const events = {};
            Object.values(exports.RQSessionEventType).forEach((eventType) => {
                events[eventType] = this.#lastTwoSessionEvents[0][eventType].concat(this.#lastTwoSessionEvents[1][eventType]);
            });
            const rrwebEvents = events[exports.RQSessionEventType.RRWEB];
            const firstEventTime = rrwebEvents[0]?.timestamp;
            const lastEventTime = rrwebEvents[rrwebEvents.length - 1]?.timestamp;
            return {
                attributes: {
                    url: this.#url,
                    startTime: firstEventTime,
                    duration: lastEventTime - firstEventTime,
                    environment: this.#environment,
                },
                events,
            };
        }
        #interceptNetworkRequests(captureEventFn) {
            if (!this.#options.network) {
                return;
            }
            Network.intercept(/.*/, ({ method, url, requestData, response, contentType, status, responseTime }) => {
                captureEventFn({
                    timestamp: Date.now(),
                    method,
                    url,
                    requestData,
                    response,
                    contentType,
                    status,
                    responseTime,
                });
            });
        }
        #addEvent(eventType, event) {
            this.#lastTwoSessionEvents[1]?.[eventType]?.push(event);
        }
        #isCrossDomainFrame() {
            try {
                if (window.parent.document !== null) {
                    // can access parent frame -> not a cross domain frame
                    return false;
                }
            }
            catch (e) { }
            return true;
        }
        #captureEnvironment() {
            const userAgent = window.navigator.userAgent;
            const parsedEnvironment = Bowser.parse(userAgent);
            this.#environment = {
                userAgent,
                language: window.navigator.languages?.[0] || window.navigator.language,
                browser: parsedEnvironment.browser,
                os: parsedEnvironment.os,
                // @ts-ignore
                platform: parsedEnvironment.platform,
                browserDimensions: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                },
                screenDimensions: {
                    width: window.screen.width,
                    height: window.screen.height,
                },
                devicePixelRatio: window.devicePixelRatio,
            };
        }
        #getEmptySessionEvents() {
            const emptySessionEvents = {};
            Object.values(exports.RQSessionEventType).forEach((eventType) => {
                emptySessionEvents[eventType] = [];
            });
            return emptySessionEvents;
        }
        #relayEventToTopDocument(eventType, event) {
            window.top.postMessage({
                source: POST_MESSAGE_SOURCE,
                action: RELAY_EVENT_MESSAGE_ACTION,
                payload: {
                    eventType,
                    event,
                    url: this.#url,
                },
            }, '*');
        }
    }

    const VERSION = '0.10.4';

    exports.Network = Network;
    exports.SessionRecorder = SessionRecorder;
    exports.VERSION = VERSION;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
