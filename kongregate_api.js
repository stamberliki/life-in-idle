/*
 contentloaded.js

 Author: Diego Perini (diego.perini at gmail.com)
 Summary: cross-browser wrapper for DOMContentLoaded
 Updated: 20101020
 License: MIT
 Version: 1.2

 URL:
 http://javascript.nwbox.com/ContentLoaded/
 http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE

*/
var Kongregate = Kongregate || {};
Kongregate.Utils = Kongregate.Utils || {};
Kongregate.Utils.isKlient = function() { return /klient|kartridge\//.test(navigator.userAgent.toLowerCase()) };
Kongregate.Utils.findKongregateWindow = function() { if (!Kongregate.Utils.isKlient()) return top; for (var a = window, b = window.parent; b !== top;) a = b, b = a.parent; return a };
Kongregate.Utils.catchErrors = function(a, b, c) { return function() { try { return a.apply(b, arguments) } catch (d) { return Kongregate.Log.error("catchErrors caught unhandled exception", d), c } } };
(function() {
    function a(a, c, d) { Kongregate.Log[a] = function() { try { "undefined" !== typeof active_user && void 0 === Kongregate.Log.debugLevel && (Kongregate.Log.debugLevel = active_user.debugLevel()), Kongregate.Log.debugLevel >= c && (console[d] ? Function.prototype.apply.call(console[d], console, arguments) : console.log(arguments)) } catch (l) {} } } Kongregate.Log = {};
    a("spam", 5, "log");
    a("debug", 4, "log");
    a("info", 3, "info");
    a("warn", 2, "warn");
    a("error", 1, "error")
})();
KonduitEvent = {
    INIT: "init",
    CONNECT: "connect",
    CONNECTED: "connected",
    DISCONNECT: "disconnect",
    LOGIN: "login",
    SWITCH_USER: "switch_user",
    JOIN_ROOM: "join_room",
    LEAVE_ROOM: "leave_room",
    USER_JOIN: "user_join",
    USER_DEPARTURE: "user_departure",
    USER_CHANGED: "user_changed",
    ROOM_MESSAGE: "room_message",
    SYSTEM_MESSAGE: "system_message",
    PRIVATE_MESSAGE: "private_message",
    ADMIN_MESSAGE: "admin_message",
    MESSAGE_ERROR: "message_error",
    SET_PRESENCE: "set_presence",
    GUEST_COUNT: "guest_count",
    ROOM_NOT_FOUND: "room_not_found",
    ROOM_FULL: "room_full",
    REQUEST_CHAT_ROOM: "request_chat_room",
    CREATE_PRIVATE_ROOM: "create_private_room",
    DESTROY_PRIVATE_ROOM: "destroy_private_room",
    PRIVATE_ROOM_INVITATION: "private_room_invitation",
    PRIVATE_ROOM_KICK: "private_room_kick",
    PRIVATE_ROOM_INVITATION_SENT: "private_room_invitation_sent",
    JOIN_GUILD_ROOM: "join_guild_room",
    SILENCED: "silenced",
    PARTICIPATE: "participate",
    AMNESTY: "amnesty",
    API_INITIALIZED: "api_initialized",
    ADD_STATISTICS: "add_statistics",
    STATISTIC_UPDATED: "statistic_updated",
    STATISTIC_SUBMISSION: "statistic_submission",
    STATISTICS_FLUSH: "statistics_flush",
    STATISTICS_FORCE_FLUSH: "statistics_force_flush",
    SET_ACCOMPLISHMENT_PROGRESS: "set_accomplishment_progress",
    NEW_HIGH_SCORE: "new_high_score",
    DISPLAY_SHOUT_BOX: "display_shout_box",
    DISPLAY_INVITATION_BOX: "display_invitation_box",
    SEND_PRIVATE_MESSAGE: "send_private_message",
    DISPLAY_FEED_POST_BOX: "display_feed_post_box",
    DISPLAY_SIGN_IN_LIGHTBOX: "display_sign_in_lightbox",
    DISPLAY_REGISTRATION_LIGHTBOX: "display_registration_lightbox",
    LIGHTBOX_OPENED: "lightbox_opened",
    LIGHTBOX_CLOSED: "lightbox_closed",
    ACCOMPLISHMENT_TASK_PROGRESS: "accomplishment_task_progress",
    ACCOMPLISHMENT_COMPLETE: "accomplishment_complete",
    RESIZE_GAME: "resize_game",
    HANDLE_ITEM_CHECKOUT_REQUEST: "handle_item_checkout_request",
    KONDUIT_MESSAGE: "konduit_message",
    ANALYTICS_PAYLOAD: "analytics_payload",
    OP_EXTERNAL_MESSAGE: "ext.msg",
    OP_CONNECTED: "connected",
    OP_HELLO: "hello",
    OP_USER_INFO: "user.info",
    OP_SIGN_IN: "sign_in",
    PARAM_USER: "user",
    PARAM_USER_ID: "user_id",
    PARAM_GAME_AUTH_TOKEN: "auth_token",
    PURCHASE_RESULT: "purchase_result",
    PARAM_LOCALCONNECTION_ONLY: "localconnection_only",
    CUSTOM_TAB_MESSAGE: "custom_tab_message",
    CUSTOM_TAB_SHOW: "custom_tab_show",
    CUSTOM_TAB_CLOSE: "custom_tab_close",
    CUSTOM_TAB_SHOWN: "custom_tab_shown",
    CUSTOM_TAB_CLEAR_MESSAGES: "custom_tab_clear_messages",
    OP_CHAT_TAB: "chat.tab",
    OP_CHAT_CLEAR_DIALOG: "chat.dlg.clear",
    OP_CHAT_DISPLAY: "chat.disp",
    OP_CHAT_MSG: "chat.msg",
    OP_CHAT_CANVAS_ELEMENT: "chat.elm",
    OP_CHAT_PRIVATE_MESSAGE: "chat.privateMessage",
    OP_CHAT_RESIZE_GAME: "chat.resizeGame",
    OP_CHAT_DISPLAY_INVITATION_BOX: "chat.invite",
    OP_CHAT_DISPLAY_FEED_POST_BOX: "chat.feedpost",
    OP_CHAT_DISPLAY_REGISTRATION: "chat.registration",
    OP_CHAT_DISPLAY_SHOUT_BOX: "chat.shoutbox",
    PARAM_SHOUT_MESSAGE: "shout_message",
    PARAM_CANVAS_SIZE: "chat.canvas.size",
    PARAM_RESIZE_GAME_WIDTH: "chat.resizeGame.width",
    PARAM_RESIZE_GAME_HEIGHT: "chat.resizeGame.height",
    PARAM_INVITATION_MESSAGE: "invitation_message",
    PARAM_FRIEND_FILTER: "filter",
    PARAM_IMAGE_URI: "image_uri",
    PARAM_KV_PARAMS: "kv_params",
    PARAM_NAME: "name",
    PARAM_DESCRIPTION: "desc",
    PARAM_DATA: "data",
    OP_SHOUT_CALLBACK: "ext.shout_callback",
    PARAM_MESSAGE_TYPE: "ext.message_type",
    PARAM_MESSAGE_RECIPIENTS: "ext.message_recipients",
    PARAM_ERROR: "error",
    PARAM_SUCCESS: "success",
    PARAM_REQUEST_ID: "req.id",
    OP_STATS_SUBMIT: "stat.submit",
    PARAM_STATS: "stats",
    ITEM_LIST: "mtx.item_list",
    ITEM_CHECKOUT: "mtx.checkout",
    PURCHASE_KREDS: "mtx.kred_purchase",
    ITEM_INSTANCES: "mtx.item_instances",
    USE_ITEM_INSTANCE: "mtx.use_item_instance",
    PARAM_PURCHASE_METHOD: "purchase_method",
    PARAM_ITEM_TAGS: "item_tags",
    PARAM_ITEMS: "items",
    PARAM_ORDER_INFO: "order_info",
    PARAM_ID: "id",
    ADS_INITIALIZE: "ads.initialize",
    ADS_AVAILABLE: "ads.available",
    ADS_UNAVAILABLE: "ads.unavailable",
    ADS_SHOW_INCENTIVIZED: "ads.show_incentivized",
    AD_OPENED: "ads.ad_opened",
    AD_COMPLETED: "ads.ad_completed",
    AD_ABANDONED: "ads.ad_abandoned",
    PROCESSING_SAVE_SHARED_CONTENT: "processing_save_shared_content",
    SAVE_SHARED_CONTENT: "save_shared_content",
    SAVE_SHARED_CONTENT_COMPLETE: "shared_content_save_complete",
    LOAD_SHARED_CONTENT: "load_shared_content",
    BROWSE_SHARED_CONTENT: "browse_shared_content",
    OP_SAVE_SHARED_CONTENT: "save_shared_content",
    OP_BROWSE_SHARED_CONTENT: "browse_shared_content",
    OP_LOAD_SHARED_CONTENT: "load_shared_content",
    OP_SHARED_CONTENT_SAVE_COMPLETE: "shared_content_save_complete",
    PARAM_CONTENT_TYPE: "content_type",
    PARAM_LABEL: "label",
    PARAM_IMAGE: "image",
    PARAM_PERMALINK: "permalink",
    OP_IMAGE_AVATAR_SUBMIT: "avatar.submit",
    OP_IMAGE_AVATAR_FINISHED: "avatar.finished",
    IMAGE_AVATAR_SUBMIT: "image_avatar_submit",
    IMAGE_AVATAR_COMPLETE: "image_avatar_complete",
    OP_ANALYTICS_PAYLOAD: "analytics.payload",
    HOLODECK_DATA: "holodeck_data",
    PARAM_HOLODECK_TYPE: "holodeck_type",
    FETCH_HISTORY: "fetch_history",
    HISTORY_RECEIVED: "history_received",
    FAYE_DISCONNECT: "faye_disconnect"
};
KonduitChatErrorMessage = { MESSAGE_TOO_LONG: "error_msg_too_long", RATE_LIMITED: "error_msg_rate_limit" };
KonduitPresenceType = { CHAT: "chat", AWAY: "away" };
Kongregate.polyfillJSON = function() {
    window.JSON || (window.JSON = {
        parse: function(a) { return eval("(" + a + ")") },
        stringify: function() {
            var a = Object.prototype.toString,
                b = Array.isArray || function(b) { return "[object Array]" === a.call(b) },
                c = { '"': '\\"', "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "\t": "\\t" },
                d = function(a) { return c[a] || "\\u" + (a.charCodeAt(0) + 65536).toString(16).substr(1) },
                l = /[\\"\u0000-\u001F\u2028\u2029]/g;
            return function h(c) {
                if (null == c) return "null";
                if ("number" === typeof c) return isFinite(c) ?
                    c.toString() : "null";
                if ("boolean" === typeof c) return c.toString();
                if ("object" === typeof c) { if ("function" === typeof c.toJSON) return h(c.toJSON()); if (b(c)) { for (var g = "[", n = 0; n < c.length; n++) g += (n ? ", " : "") + h(c[n]); return g + "]" } if ("[object Object]" === a.call(c)) { g = []; for (n in c) Object.prototype.hasOwnProperty.call(c, n) && g.push(h(n) + ": " + h(c[n])); return "{" + g.join(", ") + "}" } }
                return '"' + c.toString().replace(l, d) + '"'
            }
        }()
    })
};
Kongregate.contentLoaded = function(a) {
    var b = window,
        c = !1,
        d = !0,
        l = b.document,
        q = l.documentElement,
        g = l.addEventListener,
        h = g ? "addEventListener" : "attachEvent",
        p = g ? "removeEventListener" : "detachEvent",
        n = g ? "" : "on",
        m = function(d) { if ("readystatechange" != d.type || "complete" == l.readyState)("load" == d.type ? b : l)[p](n + d.type, m, !1), !c && (c = !0) && a.call(b, d.type || d) },
        v = function() { try { q.doScroll("left") } catch (r) { setTimeout(v, 50); return } m("poll") };
    if ("complete" == l.readyState) a.call(b, "lazy");
    else {
        if (!g && q.doScroll) {
            try { d = !b.frameElement } catch (r) {} d &&
                v()
        }
        l[h](n + "DOMContentLoaded", m, !1);
        l[h](n + "readystatechange", m, !1);
        b[h](n + "load", m, !1)
    }
};
(function() {
    var a;
    Kongregate.MessageConnection = function(a) { this.initialize(a) };
    Kongregate.MessageConnection.MESSAGE_EVENT = "kongregate:api:message";
    Kongregate.MessageConnection.prototype = {
        initialize: function(b) {
            a = b.channel_id;
            this._window = b.window || window;
            this._targetOrigin = b.target_origin;
            this._targetWindows = b.target_window ? [b.target_window] : [];
            this._sendListener = b.send_listener;
            this._retryConnection = b.retry_connection || !1;
            this._messageListeners = [];
            this._supportsObjects = Kongregate.PostMessage.supportsObjects();
            this._client = "string" === typeof this._targetOrigin;
            this._connected = this._handleMessages = !1
        },
        addMessageListener: function(a) { this._messageListeners.push(a) },
        isSupported: function() { return this.supportsObjects() || "undefined" !== typeof this._window.JSON ? "undefined" !== typeof(this._targetWindows[0] || window).postMessage : !1 },
        connected: function() { return this._connected },
        isClient: function() { return this._client },
        supportsObjects: function() { return this._supportsObjects },
        logPrefix: function() {
            return this._client ? "[Game:JS]" :
                "[Konduit]"
        },
        listen: function() {
            if (this.isSupported() && !this._listening) {
                this._listening = !0;
                var a = this;
                Kongregate.PostMessage.addMessageListener(this._window, function(b) { a.onMessageReceived.call(a, b) })
            }
        },
        parseMessage: function(a) { try { var b = Kongregate.PostMessage.parseMessage(a); if (b && b.kongregate_type === Kongregate.MessageConnection.MESSAGE_EVENT) return { opcode: b.opcode, params: b.params } } catch (d) { Kongregate.Log.warn(this.logPrefix(), "Error parsing message", a, d) } return null },
        onMessageReceived: function(a) {
            var b =
                a.origin || a.originalEvent.origin;
            this._targetOrigin && b !== this._targetOrigin ? Kongregate.Log.debug(this.logPrefix(), "Ignoring message from " + b) : (b = this.parseMessage(a.data)) && this.processMessage(b, a)
        },
        processMessage: function(a, c) {
            Kongregate.Log.debug(this.logPrefix(), "Message received:", a);
            switch (a.opcode) {
                case KonduitEvent.CONNECT:
                    this.onClientConnected(a.params, c.source);
                    break;
                case KonduitEvent.CONNECTED:
                    this.onConnectedToServer()
            }
            for (c = 0; c < this._messageListeners.length; c++) this._messageListeners[c](a.opcode,
                a.params)
        },
        sendMessage: function(a, c) {
            this.removeMissingWindows();
            if (this.connected() || a === KonduitEvent.CONNECT || a === KonduitEvent.CONNECTED) {
                var b = { kongregate_type: Kongregate.MessageConnection.MESSAGE_EVENT, opcode: a, params: "string" === typeof c ? JSON.parse(c) : c };
                this.supportsObjects() || (b = JSON.stringify(b));
                for (var l = this._targetOrigin || "*", q = 0; q < this._targetWindows.length; q++) this._targetWindows[q].postMessage(b, "*");
                this._sendListener && this._sendListener(a, c)
            } else Kongregate.Log.debug(this.logPrefix(),
                "Not sending " + a + ", not connected")
        },
        connect: function() { this.connected() || (this.listen(), Kongregate.Log.debug("Attempting to connect to Kongregate API"), this.sendMessage(KonduitEvent.CONNECT, { chnl: a }), this._retryConnection && this.retryConnection()) },
        retryConnection: function() {
            var a = this;
            setTimeout(function() { a.connect() }, 5E3)
        },
        onClientConnected: function(b, c) {
            b.chnl !== a ? Kongregate.Log.warn(this.logPrefix(), "Channel ID mismatch, ignoring connect") : (Kongregate.Log.debug(this.logPrefix(), "API connection established!"),
                this.acceptClientConnection(c))
        },
        onConnectedToServer: function() { this.connected() || (Kongregate.Log.debug(this.logPrefix(), "API connection established!"), this._connected = !0) },
        acceptClientConnection: function(a) {
            for (var b = !1, d = this._targetWindows, l = 0; l < this._targetWindows.length; l++)
                if (this._targetWindows[l] === a) {
                    Kongregate.Log.warn("Re-initializing duplicate connection");
                    b = !0;
                    break
                } this._targetWindows = [a];
            this.sendMessage(KonduitEvent.CONNECTED, {});
            this._targetWindows = d;
            b || this._targetWindows.push(a);
            this.removeMissingWindows()
        },
        removeMissingWindows: function(a) {
            if (!this._client) {
                for (i = this._targetWindows.length - 1; 0 <= i; i--) this._targetWindows[i].top || this._targetWindows.splice(i, 1);
                this._connected = 0 < this._targetWindows.length
            }
        }
    }
})();
Kongregate.PostMessage = {
    addMessageListener: function(a, b) { if (a.document.addEventListener) try { a.document.addEventListener.call(a, "message", b, !1) } catch (c) { Kongregate.Log.debug("addEventListener failed, using iframe addEventListener: " + c), Kongregate.PostMessage.createIframeEventListener(a, b) } else a.attachEvent ? a.attachEvent("onmessage", b) : Kongregate.Log.error("Could not add event listener, neither addEventListener or attachEvent found!"); return b },
    removeMessageListener: function(a, b) {
        a.removeEventListener ?
            a.removeEventListener("message", b) : a.detachEvent && a.detachEvent("onmessage", b)
    },
    supportsObjects: function() {
        var a = document.createElement("iframe"),
            b = !0;
        a.src = "about:blank";
        document.body.appendChild(a);
        try { a.contentWindow.postMessage({ toString: function() { b = !1; return "" } }, "*") } catch (c) {} document.body.removeChild(a);
        return b
    },
    parseMessage: function(a) { return "string" === typeof a && "{" === a.charAt(0) ? JSON.parse(a) : "object" === typeof a ? a : null },
    createIframeEventListener: function(a, b) {
        var c = document.createElement("iframe");
        c.src = "about:blank";
        document.head.appendChild(c);
        c.contentWindow.addEventListener.call(a, "message", b, !1);
        document.head.removeChild(c)
    }
};
(function() {
    Kongregate.Utils.merge = function(a, c) { if (!a || !c) return a; for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b]); return a };
    Kongregate.Utils.toW3CDTF = function(a) {
        function b(a) { return 10 > a ? "0" + a : a }
        return a instanceof Date ? a.getUTCFullYear() + "-" + b(a.getUTCMonth() + 1) + "-" + b(a.getUTCDate()) + "T" + b(a.getUTCHours()) + ":" + b(a.getUTCMinutes()) + ":" + b(a.getUTCSeconds()) + "." + (a.getUTCMilliseconds() / 1E3).toFixed(3).slice(2, 5) + "-00:00" : ""
    };
    Kongregate.Utils.parseW3CDTF = function(b, c) {
        try {
            var d, l = 0,
                q = [1, 4, 5, 6, 7, 10,
                    11
                ];
            if (d = a.exec(b)) {
                for (var g = 0, h; h = q[g]; ++g) d[h] = +d[h] || 0;
                d[2] = (+d[2] || 1) - 1;
                d[3] = +d[3] || 1;
                "Z" !== d[8] && void 0 !== d[9] && (l = 60 * d[10] + d[11], "+" === d[9] && (l = 0 - l));
                var p = new Date(Date.UTC(d[1], d[2], d[3], d[4], d[5] + l, d[6], d[7]))
            }
            if (!p || "Invalid Date" === p.toString()) throw Error("This date does not conform to W3CDTF.");
        } catch (n) { return Kongregate.Log.error("Unable to parse the string [" + b + "] into a date. " + ("The internal error was: " + n.toString())), c }
        return p
    };
    Kongregate.Utils.indexOf = function(a, c) {
        if (!a) return -1;
        if ("function" === typeof a.indexOf) return a.indexOf(c);
        for (var b = 0; b < a.length; b++)
            if (a[b] === c) return b;
        return -1
    };
    var a = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/
})();
(function() {
    Kongregate.AnalyticsClient = function(a) { this.initialize(a) };
    var a = Kongregate.AnalyticsClient,
        b = ["auto_event", "retry_count"];
    Kongregate.AnalyticsClient.prototype = {
        initialize: function(a) {
            this._type = "kong";
            this._applicationId = a.application_id;
            this._apiKey = a.api_key;
            this._eventQueue = a.event_queue || [];
            this._url = a.url;
            this._requestHeaders = a.request_headers || {};
            this._submitting = !1
        },
        enqueueEvent: function(a) { this._filterEvent(a) && this._eventQueue.push(a) },
        sendEvents: function(a) {
            var b = new XMLHttpRequest,
                c = this._eventQueue,
                d = c.length,
                h = this;
            if (!this._submitting && d) {
                this._submitting = !0;
                var p = function(b) {
                    h._submitting = !1;
                    h._onError(c, d, b, a)
                };
                Kongregate.Log.debug("Flushing " + this._type + " event queue");
                b.open("POST", this._url);
                b.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                for (var n in this._requestHeaders) this._requestHeaders.hasOwnProperty(n) && b.setRequestHeader(n, this._requestHeaders[n]);
                b.onerror = b.onabort = p;
                b.onload = function() {
                    h._submitting = !1;
                    h._onBatchResponse(b, c, d, a, p)
                };
                "undefined" !== typeof b.timeout && (b.timeout = 3E4, b.ontimeout = p);
                b.send(JSON.stringify(this._createPayload(c)))
            }
        },
        _filterEvent: function(a) { return 0 !== a.name.indexOf(c.SWRVE_EVENT_IDENTIFIER) },
        _validateResponse: function(a) { return !0 },
        _onBatchResponse: function(a, b, c, g, h) {
            var d = !1,
                l = a.status || 0;
            if (200 === l || 202 === l) d = this._validateResponse(a.responseText);
            d ? (Kongregate.Log.debug(this._type + " submission complete, " + c + " event(s)"), b.splice(0, c), g && g({ success: !0 })) : (a = 500 > l, Kongregate.Log.error("Error submitting " +
                this._type + " httpStatus: " + l + ", numEvents: " + c + ", fatal: " + a), h(a))
        },
        _onError: function(a, b, c, g) {
            for (var d = 0; d < b && d < a.length; d++) {
                var l = a[d];
                if (l) {
                    var n = (l.event.retry_count || 0) + (c ? this._maxRetries() + 1 : 1);
                    l.event.retry_count = n
                }
            }
            this._pruneEvents(a);
            g && g({ success: !1 })
        },
        _createPayload: function(a) {
            for (var b = [], c = { events: b }, d = 0; d < a.length; d++) {
                var h = a[d],
                    p = h.name;
                h = Kongregate.Utils.merge({}, h.event);
                this._removeTransientProperties(h);
                b.push({ event_type: p, payload: h })
            }
            return c
        },
        _pruneEvents: function(a) {
            for (var b =
                    a.length - 1; 0 <= b; b--) a[b].event && a[b].event.retry_count > this._maxRetries() && (Kongregate.Log.debug("Event " + a[b].name + " is over max retry count, deleting it"), a.splice(b, 1));
            b = this._maxBacklogSize();
            a && a.length > b && a.splice(0, a.length - b)
        },
        _removeTransientProperties: function(a) {
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                void 0 !== a[d] && delete a[d]
            }
        },
        _maxRetries: function() { return 2 },
        _maxBacklogSize: function() { return 100 },
        _getDate: function() { return new Date },
        _getTime: function(a) {
            var b = this._getDate();
            a.event &&
                a.event[Kongregate.AnalyticsServices.KONG_ANALYTICS_EVENT_TIME] && (b = Kongregate.Utils.parseW3CDTF(a.event[Kongregate.AnalyticsServices.KONG_ANALYTICS_EVENT_TIME], this._getDate()));
            return Math.floor(b.getTime() / 1E3)
        }
    };
    Kongregate.SwrveClient = function(a) { this.initialize(a) };
    var c = Kongregate.SwrveClient;
    c.prototype = Kongregate.Utils.merge({}, a.prototype);
    Kongregate.Utils.merge(c.prototype, {
        initialize: function(b) {
            a.prototype.initialize.call(this, b);
            this._type = "swrve";
            this._playerId = b.player_id;
            this._clientVersion =
                b.client_version
        },
        _filterEvent: function(a) { return !0 },
        _validateResponse: function(a) {
            var b = 0 === a.length;
            b || (b = 200 === JSON.parse(a).code);
            return b
        },
        _createPayload: function(a) {
            for (var b = [], d = { app_version: this._clientVersion, session_token: this._createSessionToken(), user: this._playerId, data: b }, g = 0; g < a.length; g++) {
                var h = a[g],
                    p = h.name,
                    n = this._getTime(h);
                h = Kongregate.Utils.merge({}, h.event);
                this._removeTransientProperties(h);
                c.SWRVE_SESSION_START_IDENTIFIER === p ? b.push({ type: "session_start", time: n }) : c.SWRVE_USER_IDENTIFIER ===
                    p ? b.push({ type: "user", time: n, attributes: h }) : c.SWRVE_IAP_IDENTIFIER === p ? b.push(Kongregate.Utils.merge({ type: "iap", time: n }, h)) : 0 === p.indexOf(c.SWRVE_EVENT_IDENTIFIER) ? (p = p.replace(c.SWRVE_EVENT_IDENTIFIER, "Kongregate."), b.push({ type: "event", name: p, time: n, payload: h })) : (p = "Kongregate.RawData." + p, b.push({ type: "event", name: p, time: n, payload: { data: JSON.stringify(h) } }))
            }
            return d
        },
        _createSessionToken: function() {
            var a = Math.floor(this._getDate().getTime() / 1E3);
            return this._applicationId + "=" + this._playerId + "=" +
                String(a) + "=" + Kongregate.Utils.md5(this._playerId + String(a) + this._apiKey)
        }
    });
    c.SWRVE_EVENT_IDENTIFIER = "swrve.";
    c.SWRVE_BARE_EVENT_IDENTIFIER = c.SWRVE_EVENT_IDENTIFIER + "__bare_";
    c.SWRVE_SESSION_START_IDENTIFIER = c.SWRVE_BARE_EVENT_IDENTIFIER + "session_start";
    c.SWRVE_USER_IDENTIFIER = c.SWRVE_BARE_EVENT_IDENTIFIER + "user";
    c.SWRVE_IAP_IDENTIFIER = c.SWRVE_BARE_EVENT_IDENTIFIER + "iap"
})();
(function() {
    Kongregate.AnalyticsServices = function(a) { this.initialize(a) };
    Kongregate.AnalyticsServices.prototype = {
        initialize: function(a) {
            var b = this;
            this._heartbeatInterval = a.heartbeat_interval || 15E3;
            this._services = a.services;
            this._clients = a.clients || {};
            this._mtx = a.mtx;
            this._kongVars = a.kongregate_variables;
            this._staticVars = {};
            this._persistentStore = a.persistent_store || {};
            this._heartbeatCount = 0;
            this._enablePersistence = a.enable_persistence && !a.persistent_store;
            this._services.addEventListener(KonduitEvent.KONDUIT_MESSAGE,
                function(a) { b._onIncomingMessage(a.opcode, a.params) });
            a.start && this._setup()
        },
        addEvent: function(a, b) { this._enabled && (!this._autoAnalyticsDisabled() && 0 <= Kongregate.Utils.indexOf(la, a) ? Kongregate.Log.warn("Ignoring analytics event: " + a + " since it is a kong-automatic event.") : this._addEventInternal(a, this._objectify(b))) },
        addFilterType: function(a) {
            if (this._enabled && a) {
                var b = /^[a-zA-Z0-9_]+$/;
                a && b.test(a) ? (b = (b = this._savedData[E]) ? b.split(",") : [], 0 > Kongregate.Utils.indexOf(b, a) && (b.push(a), b.sort(), this._savedData[E] =
                    b.join(","), this._flushPersistentStore(), Kongregate.Log.info("Filter type added: " + a))) : Kongregate.Log.warn("Invalid filterType: " + a + ", must be alpha_numeric")
            }
        },
        setCommonPropsCallback: function(a) { this._enabled && (this._commonPropsCallback = a, this.updateCommonProperties()) },
        setCommonProperties: function(a) {
            a = this._objectify(a);
            this.setCommonPropsCallback(function() { return a })
        },
        updateCommonProperties: function() {
            try {
                "function" === typeof this._commonPropsCallback && (this._commonProperties = this._objectify(this._commonPropsCallback()),
                    this._savedData[ma] = this._commonProperties, this._commonProperties[S] && !this._savedData[F] && (this._savedData[F] = this._commonProperties[S]))
            } catch (D) { Kongregate.Log.error("Error updating common properties: " + D) }
        },
        getAutoLongProperty: function(a) { return this.getAutoIntProperty(a) },
        getAutoLongLongProperty: function(a) { return this.getAutoLongProperty(a) },
        getAutoStringProperty: function(a) {
            if (!this._enabled) return null;
            var b = this._getKongAutomaticVariables();
            if ("string" === typeof b[a]) return b[a];
            Kongregate.Log.warn("Property is not a string: " +
                a);
            return null
        },
        getAutoBoolProperty: function(a) { return this._enabled ? !!this._getKongAutomaticVariables()[a] : !1 },
        getAutoDoubleProperty: function(a) { if (!this._enabled) return NaN; var b = this._getKongAutomaticVariables(); return Number(b[a]) },
        getAutoIntProperty: function(a) { return this._enabled ? Math.floor(this.getAutoDoubleProperty(a)) : NaN },
        getAutoUTCProperty: function(a) { return this.getAutoStringProperty(a) },
        getAutoPropertiesJSON: function() {
            if (!this._enabled) return "{}";
            this._buildKongAutomaticVariables();
            return "function" === typeof JSON.stringify ? JSON.stringify(this._automaticVars) : "{}"
        },
        startPurchase: function(a, b) {
            if (!this._autoAnalyticsDisabled()) {
                var c = this._getProductId(a);
                c ? (this._priceUSD = this._getUSDPrice(c, b), this._iapID && Kongregate.Log.warn("startPurchase: invoked before active transaction finished. iap_ids may mismatch."), Kongregate.Log.debug("IAP FLOW STEP: startPurchase(): " + c), this._iapID = this._uuid(), this._productId = c, this._addIAPEvent(null, this._objectify(b), G)) : Kongregate.Log.warn("startPurchase: Can't start purchase with null productId, param was: " +
                    a)
            }
        },
        finishPurchase: function(a, b, c) { this._autoAnalyticsDisabled() || (Kongregate.Log.debug("IAP FLOW STEP: finishPurchase(): " + this._productId + ", transactionId: " + b + ", resultCode: " + a), na === a ? (this._numPurchases++, this._totalSpentUSD += this._priceUSD, this._addIAPEvent(b, this._objectify(c), H)) : this._addIAPFailEvent(b, this._objectify(c))) },
        setAutomaticVariablesListener: function(a) { this._enabled && (this._automaticVarsListener = a, this._getKongAutomaticVariables()) },
        start: function() {},
        _setup: function() {
            if (!this._savedData) {
                var b =
                    this._services.isKongregate();
                this._mode = b ? this._kongVars.kongregate_analytics_mode : null;
                this._enabled = null !== this._mode && void 0 !== this._mode && this._checkBrowserSupport();
                Kongregate.Log.debug("Initializing Analytics API, mode: " + this._mode);
                if (this._enabled) {
                    this._enablePersistence && this._hasLocalStorage() && this._loadPersistentStore();
                    this._clientVersion = b ? this._kongVars.kongregate_game_version : "1";
                    this._pendingEvents = this._persistentStore.pending_events = this._persistentStore.pending_events || [];
                    this._eventQueues =
                        this._persistentStore.event_queues = this._persistentStore.event_queues || {};
                    this._eventQueues.swrve = this._eventQueues.swrve || [];
                    this._eventQueues.kong = this._eventQueues.kong || [];
                    this._savedData = this._persistentStore.saved_data = this._persistentStore.saved_data || {};
                    this._items = this._persistentStore.items = this._persistentStore.items || [];
                    this._commonProperties = this._savedData.common_properties = this._savedData.common_properties || {};
                    this._bundleId = this._savedData[g];
                    this._autoAnalyticsDisabled() ? Kongregate.Log.debug("Auto analytics disabled") :
                        this._autoAnalyticsExcludesServer() ? Kongregate.Log.debug("Game has a server, only tracking a subset of analytics automatically") : Kongregate.Log.debug("Automatic analytics enabled");
                    b && this._requestItems();
                    b = this._getDate();
                    var c = !this._savedData[z];
                    this._setInitialSavedData(z, this._toW3CDTF(b));
                    this._setInitialSavedData(I, a);
                    this._setInitialSavedData(J, this._clientVersion);
                    this._setInitialSavedData(B, this._timeZoneOffset());
                    c && (Kongregate.Log.debug("Analytics: First play"), this._installEvent());
                    this._startSession();
                    this._buildKongStaticVars()
                } else Kongregate.Log.debug("Analytics API not enabled")
            }
        },
        _enqueueEvent: function(a, b) { return this._initialized ? !1 : (this._autoAnalyticsDisabled() && b[K] || (Kongregate.Log.debug("Queueing pending event: " + a), this._pendingEvents.push({ name: a, event: b })), !0) },
        _addEventInternal: function(a, b, c) {
            var k = 0 === a.indexOf(Kongregate.SwrveClient.SWRVE_EVENT_IDENTIFIER);
            k || b[T] || (b = this._merge(this._buildEventSpecificVariables(), b));
            if (!this._enqueueEvent(a, b) && this._enabled) {
                U === a && this._refreshPlayerInfoFields(b);
                var D = this._getKongAutomaticVariables(),
                    u = {};
                k ? u = b : (this._merge(u, this._objectify(this._commonProperties)), b[K] ? (this._merge(u, D), this._merge(u, b)) : (this._merge(u, b), this._merge(u, D)));
                Kongregate.SwrveClient.SWRVE_SESSION_START_IDENTIFIER === a && (c = !0);
                Kongregate.Log.debug("Adding event: " + a + ", flush=" + c);
                this._forEachClient(function(b) { return b.enqueueEvent({ name: a, event: u }) });
                this._flushQueue();
                c && this._flushPersistentStore()
            }
        },
        _forEachClient: function(a) {
            for (var b in this._clients) this._clients.hasOwnProperty(b) &&
                a(this._clients[b])
        },
        _flushQueue: function() {
            var a = this;
            this._forEachClient(function(b) {
                b.sendEvents(function(b) {
                    a._flushPersistentStore();
                    a._flushQueueDelayed(b.success ? 1E3 : 1E4)
                })
            })
        },
        _flushQueueDelayed: function(a) {
            var b = this;
            setTimeout(function() { b._flushQueue() }, a)
        },
        _persistentStoreName: function() { return Kongregate.AnalyticsServices.persistentStoreName(this._kongVars.kongregate_game_id) },
        _loadPersistentStore: function() {
            try { var a = localStorage.getItem(this._persistentStoreName()) || "{}"; var b = JSON.parse(a) } catch (ka) {
                Kongregate.Log.warn("Error loading persistent store: " +
                    ka)
            }
            this._persistentStore = b || {}
        },
        _flushPersistentStore: function() {
            try {
                var a = JSON.stringify(this._persistentStore);
                localStorage.setItem(this._persistentStoreName(), a)
            } catch (x) { Kongregate.Log.warn("Error flushing persistent store: " + x) }
        },
        _destroyPersistentStore: function() { localStorage.removeItem(this._persistentStoreName()) },
        _buildEventSpecificVariables: function() {
            var a = {};
            a[T] = 0;
            if (this._autoAnalyticsDisabled()) return a;
            a[k] = this._uuid();
            a[f] = this._toW3CDTF(this._getDate());
            a[pa] = this._timeZoneOffset();
            return a
        },
        _refreshPlayerInfoFields: function(a) {
            a[L] = this._savedData[L];
            a[M] = this._savedData[M];
            for (var b = 0; b < V.length; b++) {
                var c = V[b];
                a[c] ? this._savedData[c] = a[c] : a[c] = this._savedData[c] ? this._savedData[c] : null
            }
        },
        _addAutoEvent: function(a, b) { this._autoAnalyticsDisabled() || (b = this._objectify(b), b[K] = !0, this._addEventInternal(a, b)) },
        _addIAPEvent: function(a, b, c) {
            var k = {};
            this._merge(k, this._objectify(b));
            k[N] = this._priceUSD;
            k[qa] = this._productId;
            k[W] = this._iapID;
            G != c && (k[X] = a || Y);
            this._services.isKongregate() ?
                (k[O] = this._getKredPrice(this._productId), k[P] = "KRED") : (k[O] = b[O] || this._priceUSD, k[P] = b[P] || "USD");
            H === c && (this._sendSwrveIAPEvent(this._productId, this._priceUSD, b), this._productId = this._iapID = null, this._priceUSD = 0);
            this._addEventInternal(c, k)
        },
        _addIAPFailEvent: function(a, b) {
            var c = {};
            this._merge(c, this._objectify(b));
            c[ra] = "SKErrorPaymentCancelled";
            c[X] = a || Y;
            c[W] = this._iapID;
            this._productId = this._iapID = null;
            this._priceUSD = 0;
            this._addEventInternal(Z, c)
        },
        _sendSwrveUserEvent: function() {
            if (!this._autoAnalyticsDisabled()) {
                for (var a =
                        this._getKongAutomaticVariables(), b = {}, c = 0; c < aa.length; c++) {
                    var k = aa[c];
                    b["kong." + k] = a[k]
                }
                this._addAutoEvent(Kongregate.SwrveClient.SWRVE_USER_IDENTIFIER, b)
            }
        },
        _sendSwrveIAPEvent: function(a, b, c) {
            b = { product_id: a, quantity: 1, local_cost: b, local_currency: "USD", app_store: "unknown_store" };
            var k = {};
            k[a] = { type: "item", amount: 1 };
            c.soft_currency_change && (k.soft_currency_change = { type: "currency", amount: c.soft_currency_change });
            c.hard_currency_change && (k.hard_currency_change = { type: "currency", amount: c.hard_currency_change });
            c.type && (k[c.type] = { type: "item", amount: 1 });
            b.rewards = k;
            this.addEvent(Kongregate.SwrveClient.SWRVE_IAP_IDENTIFIER, b)
        },
        _onIncomingMessage: function(a, b) { a === KonduitEvent.OP_ANALYTICS_PAYLOAD && this._processAnalyticsPayload(b.data.info, b.data.payload) },
        _setInitialSavedData: function(a, b) { this._savedData[a] || (this._savedData[a] = b) },
        _autoAnalyticsDisabled: function() { return !this._enabled || this._mode === c },
        _autoAnalyticsAllEnabled: function() { return this._enabled && this._mode === d },
        _autoAnalyticsExcludesServer: function() {
            return this._enabled &&
                this._mode === l
        },
        _getProductId: function(a) { try { if ("string" === typeof a) return a; if (Number(parseFloat(a)) == a) return a.toString(); if ("[object Array]" === Object.prototype.toString.call(a)) { if (0 < a.length) return this._getProductId(a[0]) } else if ("string" === typeof a.identifier) return a.identifier } catch (x) { Kongregate.Log.error("Error calculating product ID:", x) } Kongregate.Log.warn("Couldn't get product ID from: " + a + ", type=" + typeof a); return null },
        _getUSDPrice: function(a, b) {
            if (this._services.isKongregate()) {
                if (b =
                    this._getKredPrice(a), 0 !== b) return Math.floor(b * this._kredExchangeRate * 100) / 100
            } else if (b && b[N]) return b[N];
            if ((b = a.match(/^.*t([0-9][0-9])_.*$/)) && 2 === b.length && (b = parseInt(b[1], 10), 0 < b && b <= ba.length)) return ba[b - 1];
            Kongregate.Log.warn("Couldn't calculate USD price for identifier: " + a);
            return 0
        },
        _getKredPrice: function(a) { for (var b = 0; b < this._items.length; b++) { var c = this._items[b]; if (a === c.identifier) return c.price } Kongregate.Log.warn("Couldn't get kred price for identifier: " + a); return 0 },
        _requestItems: function(a) {
            a =
                a || 0;
            if (5 < a) Kongregate.Log.error("Giving up on retrieving item list");
            else {
                var b = this;
                this._mtx.requestItemList(null, function(c) { c.success ? b._items = b._persistentStore.items = c.data : b._retryRequestItems(a + 1) })
            }
        },
        _retryRequestItems: function(a) {
            var b = this;
            Kongregate.Log.warn("Retrying item list request, retry #" + a);
            setTimeout(function() { b.requestItems(a) }, 15E3 * a)
        },
        _processAnalyticsPayload: function(a, b) {
            Kongregate.Log.info("Analytics payload received");
            if (this._enabled)
                if (this._checkBrowserSupport(b)) {
                    this._config =
                        a;
                    a = this._config.swrve;
                    var c = this._config.kong;
                    this._svid = b.site_visitor_uid;
                    b.kger && (this._kredExchangeRate = b.kger);
                    this._updateKongStaticVars(b);
                    this._initialized || (this._initialized = !0, !this._clients.swrve && a && a.application_id && a.key && (Kongregate.Log.debug("Swrve initialized"), this._clients.swrve = new Kongregate.SwrveClient({ application_id: a.application_id, api_key: a.key, url: a.url, player_id: this._services.isKongregate() ? this._svid : this._savedData[Q], client_version: this._clientVersion, event_queue: this._eventQueues.swrve })),
                        !this._clients.kong && c && c.application_id && c.key && (Kongregate.Log.debug("Kong analytics initialized"), this._clients.kong = new Kongregate.AnalyticsClient({ application_id: c.application_id, api_key: c.key, url: c.url, event_queue: this._eventQueues.kong, request_headers: { "X-Api-Key": c.key } })), this._clients.swrve || this._clients.kong ? (this._submitLock = !1, this._startHeartbeatTimer(), this._flushPendingEvents(), this._sendSwrveUserEvent(), this.addEvent(U, {}), this._flushQueue()) : (Kongregate.Log.debug("Analytics not initialized, no services configured"),
                            this._enabled = !1))
                } else this._enabled = !1
        },
        _checkBrowserSupport: function(a) {
            try {
                if (a && "safari" === a.browser.browser.toLowerCase()) Kongregate.Log.warn("Analytics disabled on Safari");
                else {
                    if (window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest) return !0;
                    Kongregate.Log.warn("Analytics disabled due to lack of XHR/CORS support")
                }
            } catch (x) { Kongregate.Log.warn("Error while checking browser support: " + x) }
            return !1
        },
        _hasLocalStorage: function() {
            try {
                var a = "kong-" + this._getDate().getTime();
                localStorage.setItem(a,
                    a);
                localStorage.removeItem(a);
                return !0
            } catch (x) { return !1 }
        },
        _startHeartbeatTimer: function() {
            if (this._heartbeatInterval) {
                var a = this;
                setInterval(function() { a._onHeartbeatInterval() }, this._heartbeatInterval)
            }
        },
        _onHeartbeatInterval: function() {
            this._heartbeatCount += 1;
            this._session.active = this._getDate().getTime();
            4 == this._heartbeatCount && (this._heartbeatCount = 0, this.addEvent(sa, {}))
        },
        _flushPendingEvents: function() {
            if (0 < this._pendingEvents.length) {
                Kongregate.Log.debug("Flushing " + this._pendingEvents.length +
                    " pending event(s)");
                for (var a = 0; a < this._pendingEvents.length; a++) {
                    var b = this._pendingEvents[a];
                    this._addEventInternal(b.name, b.event, !1)
                }
                this._pendingEvents.length = 0
            }
        },
        _buildKongStaticVars: function() {
            if (!this._autoAnalyticsDisabled()) {
                var b = this._services.isKongregate();
                this._staticVars[g] = this._bundleId;
                this._staticVars[ca] = this._services.getUsername();
                this._staticVars[ta] = this._services.getUserId();
                this._staticVars[ua] = b ? this._svid : "";
                this._staticVars[R] = this._session.id;
                this._staticVars[va] = a;
                this._staticVars[A] = this._numSessions();
                this._staticVars[r] = this._clientVersion;
                this._staticVars[t] = this._clientVersion;
                this._staticVars[J] = this._savedData[J];
                this._staticVars[F] = this._savedData[F] || null;
                this._staticVars[wa] = "kongregate_web";
                this._autoAnalyticsExcludesServer() || (this._staticVars[Q] = b ? this._svid : this._savedData[Q]);
                this._staticVars[u] = "browser";
                this._staticVars[xa] = null;
                this._staticVars[z] = this._savedData[z];
                this._staticVars[I] = this._savedData[I];
                this._staticVars[B] = this._savedData[B];
                this._staticVars[ya] = this._kongVars.kongregate_language || (window.navigator.userLanguage || window.navigator.language).split("-")[0];
                this._staticVars[da] = null;
                this._staticVars[ea] = null;
                this._staticVars[za] = null;
                this._staticVars[Aa] = null;
                this._staticVars[q] = !1;
                this._staticVars[C] = "wifi";
                this._staticVars[n] = null;
                this._staticVars[Ba] = null;
                this._staticVars[Ca] = null;
                this._staticVars[Da] = !0;
                this._staticVars[Ea] = "web"
            }
        },
        _buildKongAutomaticVariables: function() {
            if (this._autoAnalyticsDisabled()) this._automaticVars = {};
            else {
                var a = {};
                a[E] = this._savedData[E] || "";
                a[Fa] = this._numPurchases;
                a[y] = this._daysRetained();
                this._autoAnalyticsExcludesServer() || (a[fa] = this._totalSpentUSD);
                this._automaticVars = this._merge(a, this._staticVars)
            }
        },
        _updateKongStaticVars: function(a) {
            if (!this._autoAnalyticsDisabled()) {
                this._bundleId = "com.kongregate.web." + a.game_permalink;
                this._services.isExternal() && (this._bundleId += ".external");
                this._savedData[g] = this._bundleId;
                this._buildKongStaticVars();
                var b = this._parseOS(a.browser.os);
                this._staticVars[m] =
                    b.type;
                this._staticVars[v] = b.version;
                this._staticVars[Ga] = a.premium;
                this._staticVars[Ha] = a.powerup_rewards_tier;
                this._savedData[L] = a.pur_link_date || null;
                this._savedData[M] = a.join_date || null;
                this._staticVars[Ia] = Number(a.spent_on_kreds);
                this._totalSpentUSD = a.spent_usd;
                this._numPurchases = a.num_purchases;
                this._staticVars[h] = a.browser.browser;
                this._staticVars[p] = a.browser.version;
                this._staticVars[Ja] = a.ip_address;
                this._staticVars[e] = a.ip_address;
                b = this._getDate();
                b = Math.abs(b.getTime() - this._parseW3CDTF(a.server_time,
                    b).getTime()) / 1E3;
                this._staticVars[Ka] = Math.floor(b);
                this._savedData[La] = a.server_time;
                this._staticVars[w] = a.country_code;
                this._getKongAutomaticVariables()
            }
        },
        _getKongAutomaticVariables: function() {
            if (!this._enabled) return {};
            this.updateCommonProperties();
            this._buildKongAutomaticVariables();
            this._automaticVarsListener && this._automaticVarsListener(this._automaticVars);
            return this._automaticVars
        },
        _startSession: function() {
            var a = this._getDate(),
                c = (this._previousSession = this._savedData.current_session) ? (a.getTime() -
                    this._previousSession.active) / 1E3 : 0,
                k = this._previousSession ? (a.getTime() - this._previousSession.start) / 1E3 : 0;
            c > b ? (Kongregate.Log.debug("Terminating previous session (" + this._previousSession.id + "), inactiveFor=" + c + ", length=" + k), c = {}, c[R] = this._previousSession.id, c[A] = this._numSessions(), c[Ma] = this._toW3CDTF(this._previousSession.active), c[Na] = k, c[Oa] = !1, this._addAutoEvent(ha, c)) : this._previousSession && (this._session = this._previousSession, Kongregate.Log.debug("Reopening previous session (" + this._previousSession.id +
                "), inactiveFor=" + c + ", length=" + k));
            this._session || (this._session = { id: this._uuid(), start: a.getTime(), active: a.getTime() }, this._savedData.current_session = this._session, a = this._savedData[A] ? this._numSessions() + 1 : 1, this._savedData[A] = a, Kongregate.Log.debug("Created new session: " + this._session.id));
            this._session != this._previousSession && (this.addEvent(Kongregate.SwrveClient.SWRVE_SESSION_START_IDENTIFIER, {}), a = {}, a[Pa] = !1, this._addAutoEvent(ia, a))
        },
        _installEvent: function() {
            if (this._autoAnalyticsAllEnabled()) {
                var a = {};
                a[Qa] = null;
                a[Ra] = null;
                a[Sa] = null;
                a[Ta] = null;
                a[Ua] = null;
                a[Va] = null;
                this._addAutoEvent(ja, a)
            } else Kongregate.Log.debug("Not firing installs event since analytics mode is not all")
        },
        _parseOS: function(a) {
            var b = "Unknown",
                c = "Unknown";
            try {
                var k = a.split(" ");
                if (2 > k.length) throw Error("Not enough segments in OS string");
                b = k.shift();
                "OS" === b && (b = "MacOS", k.shift());
                c = k.join(" ")
            } catch (oa) { Kongregate.Log.error("Error parsing OS version (" + a + "): " + oa.toString()) }
            return { type: b, version: c }
        },
        _numSessions: function() {
            return this._savedData[A] ||
                1
        },
        _timeZoneOffset: function() { return this._getDate().getTimezoneOffset() / -60 },
        _daysRetained: function() {
            var a = this._getDate(),
                b = this._timeZoneOffset(),
                c = this._staticVars[z];
            c && (a = this._parseW3CDTF(c, null), null === a && (Kongregate.Log.warn("Failed to parse first play date: " + c + ", resetting"), a = this._getDate(), this._savedData[z] = this._toW3CDTF(a), this._flushPersistentStore()));
            this._staticVars[B] && (b = this._staticVars[B]);
            return this._daysSince(a, b)
        },
        _dayOfEra: function(a, b) {
            return Math.floor((a + 3600 * b) /
                86400)
        },
        _daysSince: function(a, b) {
            var c = Math.floor(this._getDate() / 1E3);
            a = Math.floor(a.getTime() / 1E3);
            return this._dayOfEra(c, this._timeZoneOffset()) - this._dayOfEra(a, b)
        },
        _objectify: function(a) { if ("string" === typeof a) { if (0 === a.length || "function" !== typeof JSON.parse) return {}; try { return JSON.parse(a) || {} } catch (x) { return Kongregate.Log.warn("Failed to parse JSON: " + a + ", error: " + x), {} } } return a },
        _toW3CDTF: function(a) { return Kongregate.Utils.toW3CDTF(a) },
        _parseW3CDTF: function(a, b) {
            return Kongregate.Utils.parseW3CDTF(a,
                b)
        },
        _uuid: function() {
            var a = this._getDate().getTime();
            window.performance && "function" === typeof window.performance.now && (a += performance.now());
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(b) {
                var c = (a + 16 * Math.random()) % 16 | 0;
                a = Math.floor(a / 16);
                return ("x" == b ? c : c & 3 | 8).toString(16)
            })
        },
        _merge: function(a, b) { return Kongregate.Utils.merge(a, b) },
        _getDate: function() { return new Date }
    };
    var a = "2.0.0",
        b = 300,
        c = "none",
        d = "all",
        l = "cloud",
        q = "ad_tracking",
        g = "bundle_id",
        h = "browser",
        p = "browser_version",
        n = "carrier",
        m = "client_os_type",
        v = "client_os_version",
        r = "client_version",
        w = "country_code",
        C = "data_connection_type",
        y = "days_retained",
        t = "dev_client_version",
        k = "device_event_id",
        u = "device_type",
        f = "event_time",
        e = "external_ip_address",
        E = "filter_type",
        J = "first_client_version",
        B = "first_play_time_offset",
        z = "first_play_time",
        I = "first_sdk_version",
        F = "first_server_version",
        Ba = "gamecenter_id",
        Ca = "gamecenter_alias",
        Ha = "pur_tier",
        da = "idfa",
        ea = "idfv",
        Aa = "imei",
        za = "android_id",
        Ja = "ip_address",
        Da = "is_valid",
        ta = "kong_user_id",
        ca = "kong_username",
        Ga = "kong_plus",
        ya = "lang_code",
        La = "last_skew_refresh_time",
        Fa = "num_purchases",
        A = "num_sessions",
        xa = "mac_address",
        Q = "player_id",
        va = "sdk_version",
        S = "server_version",
        R = "session_id",
        Ka = "time_skew",
        fa = "total_spent_in_usd",
        pa = "event_time_offset",
        ua = "site_visitor_id",
        Ia = "usd_spent_on_kreds",
        wa = "platform",
        Ea = "pkg_src",
        T = "retry_count",
        K = "auto_event",
        ia = "session_starts",
        Pa = "is_from_background",
        ha = "session_ends",
        Na = "session_length_seconds",
        Ma = "session_end_time",
        Oa = "did_crash",
        ja = "installs",
        Qa = "stub_field",
        Ra = "utm_source",
        Sa = "utm_medium",
        Ta = "utm_term",
        Ua = "utm_content",
        Va = "utm_campaign",
        G = "iap_attempts",
        H = "iap_transactions",
        Z = "iap_fails",
        N = "usd_cost",
        qa = "product_id",
        W = "iap_id",
        ra = "fail_reason",
        X = "receipt_id",
        P = "local_currency_type",
        O = "local_currency_cost",
        na = "SUCCESS",
        Y = "none",
        U = "player_info",
        M = "kong_join_date",
        L = "pur_link_date",
        la = [ja, ia, ha, "foreground_visits", "background_visits", G, Z, H, "invalid_states"],
        V = ["twitter_id", "fb_user_id", "fb_username", "fb_email", "email"],
        aa = [fa, z, A, y, u, m,
            v, w, ca, R, da, ea, r
        ],
        sa = "swrve.heartbeat",
        ba = [.99, 1.99, 2.99, 3.99, 4.99, 5.99, 6.99, 7.99, 8.99, 9.99, 10.99, 11.99, 12.99, 13.99, 14.99, 15.99, 16.99, 17.99, 18.99, 19.99, 20.99, 21.99, 22.99, 23.99, 24.99, 25.99, 26.99, 27.99, 28.99, 29.99, 30.99, 31.99, 32.99, 33.99, 34.99, 35.99, 36.99, 37.99, 38.99, 39.99, 40.99, 41.99, 42.99, 43.99, 44.99, 45.99, 46.99, 47.99, 48.99, 49.99, 54.99, 59.99, 64.99, 69.99, 74.99, 79.99, 84.99, 89.99, 94.99, 99.99, 109.99, 119.99, 124.99, 129.99, 139.99, 149.99, 159.99, 169.99, 174.99, 179.99, 189.99, 199.99, 209.99, 219.99, 229.99, 239.99,
            249.99, 299.99, 349.99, 399.99, 449.99, 499.99, 599.99, 699.99, 799.99, 899.99, 999.99
        ],
        ma = "common_properties";
    Kongregate.AnalyticsServices.KONG_ANALYTICS_EVENT_TIME = f;
    Kongregate.AnalyticsServices.persistentStoreName = function(a) { return "kong-game-analytics-" + a }
})();
Kongregate.ApiServices = function(a) { this.initialize(a) };
Kongregate.ApiServices.prototype = {
    initialize: function(a) {
        this._kongVars = a.kongregate_variables || {};
        this._messageConnection = a.message_connection;
        this._eventListeners = {};
        this._requestHandlers = {};
        this._messageQueue = [];
        this._requestId = 0;
        this._initializeKongVars(this._kongVars);
        this.initializeEventListeners()
    },
    initializeEventListeners: function() {
        var a = this;
        this._messageConnection.addMessageListener(function(b, c) { a._onIncomingMessage(b, c) })
    },
    _initializeKongVars: function(a) {
        a = a || {};
        this._kongregate = "true" ===
            String(a.kongregate);
        this._username = a.kongregate_username || "Guest";
        this._authToken = a.kongregate_game_auth_token;
        this._userId = parseInt(a.kongregate_user_id, 10) || 0;
        this._gameId = parseInt(a.kongregate_game_id, 10) || 0
    },
    addEventListener: function(a, b) {
        this._eventListeners[a] || (this._eventListeners[a] = []);
        this._eventListeners[a].push(b)
    },
    _dispatchEvent: function(a, b) { a = this._eventListeners[a] || []; for (var c = 0; c < a.length; c++) a[c](b || {}) },
    connect: function() {},
    connectExternal: function() { Kongregate.Log.warn("The Kongregate externally hosted API is not available") },
    isExternal: function() { return !this.isKongregate() },
    isKongregate: function() { return this._kongregate },
    getUsername: function() { return this._username },
    getGameAuthToken: function() { return this._authToken },
    getUserId: function() { return this._userId },
    getUserID: function() { return this.getUserId() },
    getGameId: function() { return this._gameId },
    getGameID: function() { return this.getGameId() },
    isGuest: function() { return 0 === this.getUserId() },
    isConnected: function() { return this._messageConnection.connected() && !this._messageQueue },
    sendMessage: function(a) { this.isConnected() ? this._messageConnection.sendMessage(a.opcode, a.params) : (Kongregate.Log.debug("Queueing message " + a.opcode + " since API is not yet connected!"), this._messageQueue.push(a)) },
    _flushMessageQueue: function() {
        if (this._messageQueue) {
            var a = this._messageQueue;
            this._messageQueue = null;
            Kongregate.Log.debug("Flushing message queue", a);
            for (var b = 0; b < a.length; b++) this.sendMessage(a[b])
        }
    },
    _onIncomingMessage: function(a, b) {
        switch (a) {
            case KonduitEvent.OP_CONNECTED:
                this.sendMessage({
                    opcode: KonduitEvent.OP_HELLO,
                    params: {}
                });
                this._flushMessageQueue();
                break;
            case KonduitEvent.OP_EXTERNAL_MESSAGE:
                this._onIncomingMessage(b.opcode, b.data);
                break;
            case KonduitEvent.OP_SHOUT_CALLBACK:
                this._onShoutResponse(b);
                break;
            case KonduitEvent.OP_USER_INFO:
                this._onUserInfo(b)
        }
        this._dispatchEvent(KonduitEvent.KONDUIT_MESSAGE, { opcode: a, params: b })
    },
    _onShoutResponse: function(a) { this._completeRequest(a, { type: a[KonduitEvent.PARAM_MESSAGE_TYPE], recipients: a[KonduitEvent.PARAM_MESSAGE_RECIPIENTS], success: a.success, error: a.error }) },
    _onUserInfo: function(a) {
        var b =
            a[KonduitEvent.PARAM_USER_ID];
        if (0 !== b) {
            var c = this.isGuest();
            this._username = a[KonduitEvent.PARAM_USER];
            this._authToken = a[KonduitEvent.PARAM_GAME_AUTH_TOKEN];
            this._userId = b;
            c && this._dispatchEvent(KonduitEvent.LOGIN)
        }
    },
    privateMessage: function(a, b) { this._ensureKongregate(b) && (a = { shout_message: ("string" === typeof a ? a : a.content) || "" }, this._enqueueRequest(a, b), this.sendMessage({ opcode: KonduitEvent.OP_CHAT_PRIVATE_MESSAGE, params: a })) },
    resizeGame: function(a, b) {
        if (this._ensureKongregate()) {
            var c = {};
            c[KonduitEvent.PARAM_RESIZE_GAME_WIDTH] =
                a;
            c[KonduitEvent.PARAM_RESIZE_GAME_HEIGHT] = b;
            this.sendMessage({ opcode: KonduitEvent.OP_CHAT_RESIZE_GAME, params: c })
        }
    },
    showInvitationBox: function(a, b) {
        if (this._ensureKongregate()) {
            var c = {};
            a = "string" === typeof a ? { content: a } : a;
            c[KonduitEvent.PARAM_INVITATION_MESSAGE] = a.content || "";
            c[KonduitEvent.PARAM_FRIEND_FILTER] = a.filter || "";
            c[KonduitEvent.PARAM_KV_PARAMS] = a.kv_params || {};
            this._enqueueRequest(c, b);
            this.sendMessage({ opcode: KonduitEvent.OP_CHAT_DISPLAY_INVITATION_BOX, params: c })
        }
    },
    showFeedPostBox: function(a,
        b) {
        if (this._ensureKongregate()) {
            var c = {};
            a = "string" === typeof a ? { content: a } : a;
            c[KonduitEvent.PARAM_SHOUT_MESSAGE] = a.content || "";
            c[KonduitEvent.PARAM_KV_PARAMS] = a.kv_params || {};
            a.image_uri && (c[KonduitEvent.PARAM_IMAGE_URI] = a.image_uri);
            this._enqueueRequest(c, b);
            this.sendMessage({ opcode: KonduitEvent.OP_CHAT_DISPLAY_FEED_POST_BOX, params: c })
        }
    },
    showSignInBox: function() { this.showRegistrationBox() },
    showRegistrationBox: function() {
        this._ensureKongregate() && this.isGuest() && this.sendMessage({
            opcode: KonduitEvent.OP_CHAT_DISPLAY_REGISTRATION,
            params: {}
        })
    },
    showShoutBox: function(a, b) {
        if (this._ensureKongregate()) {
            var c = {};
            c[KonduitEvent.PARAM_SHOUT_MESSAGE] = ("string" === typeof a ? a : a.content) || "";
            this._enqueueRequest(c, b);
            this.sendMessage({ opcode: KonduitEvent.OP_CHAT_DISPLAY_SHOUT_BOX, params: c })
        }
    },
    _ensureKongregate: function(a) { return this.isKongregate() ? !0 : (a && a({ success: !1 }), !1) },
    _enqueueRequest: function(a, b) {
        var c = this._nextRequestId();
        a[KonduitEvent.PARAM_REQUEST_ID] = c;
        "function" === typeof b && (this._requestHandlers[c] = b)
    },
    _completeRequest: function(a,
        b) {
        var c = a[KonduitEvent.PARAM_REQUEST_ID],
            d = this._requestHandlers[c];
        "function" === typeof d && (d(b || a), delete this._requestHandlers[c])
    },
    _nextRequestId: function() { return this._requestId += 1 }
};
Kongregate.ChatServices = function(a) { this.initialize(a) };
Kongregate.ChatServices.DEFAULT_TAB = "Default";
Kongregate.ChatServices.prototype = {
    initialize: function(a) {
        var b = this;
        this._services = a.services;
        this._eventCallbacks = [];
        this._services.addEventListener(KonduitEvent.KONDUIT_MESSAGE, function(a) { b._onIncomingMessage(a.opcode, a.params) })
    },
    showTab: function(a, b, c) {
        var d = {};
        d[KonduitEvent.PARAM_NAME] = a;
        d[KonduitEvent.PARAM_DESCRIPTION] = b;
        c && c.size && (d[KonduitEvent.PARAM_CANVAS_SIZE] = c.size);
        this._services.sendMessage({ opcode: KonduitEvent.OP_CHAT_TAB, params: d })
    },
    closeTab: function() { this.showTab(Kongregate.ChatServices.DEFAULT_TAB) },
    displayMessage: function(a, b) {
        var c = {};
        c[KonduitEvent.PARAM_DATA] = a;
        c[KonduitEvent.PARAM_USER] = b;
        this._services.sendMessage({ opcode: KonduitEvent.OP_CHAT_DISPLAY, params: c })
    },
    clearMessages: function() { this._services.sendMessage({ opcode: KonduitEvent.OP_CHAT_CLEAR_DIALOG }) },
    displayCanvasImage: function(a, b, c) {
        var d = {};
        d[KonduitEvent.PARAM_DATA] = { type: "image", name: a, url: b, position: c };
        this._services.sendMessage({ opcode: KonduitEvent.OP_CHAT_CANVAS_ELEMENT, params: d })
    },
    displayCanvasText: function(a, b, c, d) {
        var l = {};
        l[KonduitEvent.PARAM_DATA] = { type: "text", name: a, text: b, position: c, options: d };
        this._services.sendMessage({ opcode: KonduitEvent.OP_CHAT_CANVAS_ELEMENT, params: l })
    },
    drawCanvasObject: function(a, b) {
        var c = {};
        c[KonduitEvent.PARAM_DATA] = { type: "draw", name: a, commands: b };
        this._services.sendMessage({ opcode: KonduitEvent.OP_CHAT_CANVAS_ELEMENT, params: c })
    },
    removeCanvasObject: function(a) {
        var b = {};
        b[KonduitEvent.PARAM_DATA] = { type: "remove", name: a };
        this._services.sendMessage({
            opcode: KonduitEvent.OP_CHAT_CANVAS_ELEMENT,
            params: b
        })
    },
    _onIncomingMessage: function(a, b) {
        switch (a) {
            case KonduitEvent.OP_CHAT_MSG:
                this._handleChatEvent("message", b);
                break;
            case KonduitEvent.OP_CHAT_ROOM_MESSAGE:
                this._handleChatEvent("room.message", b);
                break;
            case KonduitEvent.OP_CHAT_TAB:
                this._handleChatEvent("tab_visible", b)
        }
    },
    addEventListener: function(a, b) { "function" !== typeof b ? Kongregate.Log.error("addEventListener requires a callback function") : (this._eventCallbacks[a] || (this._eventCallbacks[a] = []), this._eventCallbacks[a].push(b)) },
    _handleChatEvent: function(a,
        b) {
        if (a = this._eventCallbacks[a])
            for (var c = 0; c < a.length; c++) a[c](b)
    }
};
Kongregate.ImageServices = function(a) { this.initialize(a) };
Kongregate.ImageServices.prototype = {
    initialize: function(a) {
        var b = this;
        this._services = a.services;
        this._submitting = !1;
        this._callback = null;
        this._services.addEventListener(KonduitEvent.KONDUIT_MESSAGE, function(a) { b._onIncomingMessage(a.opcode, a.params) })
    },
    submitAvatar: function(a, b) { this._submitting ? (Kongregate.Log.warn("Another avatar submission is active, ignoring"), b && b({ success: !1 })) : (this._submitting = !0, this._callback = b, this._services.sendMessage({ opcode: KonduitEvent.OP_IMAGE_AVATAR_SUBMIT, params: { image: a } })) },
    _onIncomingMessage: function(a, b) { KonduitEvent.OP_IMAGE_AVATAR_FINISHED === a && (this._submitting = !1, this._callback && this._callback(b.success)) }
};

function KongregateAPI() { this._initialize() }
KongregateAPI.prototype = {
    unityElementId: null,
    _initialize: function() {
        this._flashVarsString = "";
        this._flashVarsObject = {};
        this._services = {};
        this._postMessageParams = void 0;
        this._loaded = this._paramsReceived = !1;
        this._klient = Kongregate.Utils.isKlient();
        this._queuedMessages = [];
        this._loadCallbacks = [];
        this._processParentKongregateParams();
        this._processParams(location.search.split("?")[1]);
        this._updateDebugLevel();
        this._kongWindow = Kongregate.Utils.findKongregateWindow();
        if (this._postMessageParams = !this.flashVarsObject().kongregate_username &&
            top != window) {
            var a = this;
            Kongregate.polyfillJSON();
            Kongregate.PostMessage.addMessageListener(window, function(b) { a._messageOriginIsKongregate(b) && (b = Kongregate.PostMessage.parseMessage(b.data)) && "params" === b.type && a._handleParamsMessage(b.data) });
            this._kongWindow.postMessage("kongregate_request_params", "*")
        } else this._paramsReceived = !0;
        setTimeout(this._hijackUnityErrorHandler, 0)
    },
    flashVarsString: function() { return this._flashVarsString },
    flashVarsObject: function() { return this._flashVarsObject },
    getVariable: function(a) { return this._flashVarsObject[a] },
    loadAPI: function(a) {!this._postMessageParams || this._paramsReceived ? this._doLoadAPI(a) : this._loadCallbacks.push(a) },
    getAPI: function() { return this._services },
    embedFrame: function(a, b) {
        try { console.warn("KONGREGATE WARNING: The Kongregate Shell and embedFrame method are deprecated, and it is very unlikely that this functionality is really needed. See the note on the documentation page: https://docs.kongregate.com/v1.0/docs/concepts-kongregate-shell") } catch (c) {} b = document.getElementById(b ? b : "contentdiv");
        b.innerHTML = "<iframe id='content' frameborder='0' style='position:relative;top:0px;left:0px;" + ("border:0px none;padding:0px;width:" + b.offsetWidth + "px;height:" + b.offsetHeight + "px;'") + ("src='" + a + "'></iframe>")
    },
    _forwardToKlient: function(a, b) { this._klient && top.postMessage({ type: "kongregate:api-message:" + b, message: a }, "*") },
    _setGameSwf: function(a) {
        var b = this.flashVarsObject(),
            c = this,
            d = this._findSwf(a);
        d ? (this._gameSwf = d, this.messageConnection = this.messageConnection || this._createMessageConnection(b), this.messageConnection.isSupported() ?
            setTimeout(function() { c._gameSwf.setConnectionObject("kongregateAPI.messageConnection") ? c.messageConnection.connect() : Kongregate.Log.warn("setConnectionObject returned false, not connecting") }, 1) : (Kongregate.Log.debug("MessageConnection isSupported was false"), setTimeout(function() { c._gameSwf.setConnectionObject(null) }, 1))) : Kongregate.Log.debug("Kongregate game SWF element does not appear to be a swf: " + a)
    },
    _isSwf: function(a) { return a && "undefined" !== typeof a.Play && "undefined" !== typeof a.setConnectionObject },
    _findSwf: function(a) {
        var b = document.getElementById(a),
            c = this,
            d = function(a) {
                for (var d = 0; d < a.length; d++)
                    if (b = a[d], c._isSwf(b)) return b
            };
        return this._isSwf(b) ? b : b = d(document.getElementsByName(a)) || d(document.querySelectorAll("[id='" + a + "']")) || d(document.getElementsByTagName("object")) || d(document.getElementsByTagName("embed"))
    },
    _updateDebugLevel: function() { Kongregate.Log.debugLevel = this._flashVarsObject.kongregate_debug_level || 2 },
    _processParentKongregateParams: function(a) {
        try {
            for (var b = window.parent; b !==
                top;) { try { b.kongregateAPI && this._processParams(b.kongregateAPI.flashVarsString()) } catch (c) {} b = b.parent }
        } catch (c) {}
    },
    _handleParamsMessage: function(a) {
        if (!this._paramsReceived) {
            for (var b in a) this._processParam(b, a[b]);
            this._paramsReceived = !0;
            this._updateDebugLevel();
            this._hijackUnityErrorHandler();
            0 < this._loadCallbacks.length && this._doLoadAPI()
        }
    },
    _fireLoadCallbacks: function() {
        var a = this._loadCallbacks.length;
        Kongregate.Log.debug("Kongregate API: Firing " + a + " load callback(s)");
        for (var b = 0; b < a; b++) {
            var c =
                this._loadCallbacks[b];
            "function" === typeof c && setTimeout(c, 0)
        }
        this._loadCallbacks = []
    },
    _checkAlreadyLoaded: function() { this._loaded && this._fireLoadCallbacks(); return this._loaded },
    _doLoadAPI: function(a) {
        var b = this;
        Kongregate.contentLoaded(function() {
            b._loadCallbacks.push(a);
            b._checkAlreadyLoaded() || (b._loaded = !0, Kongregate.polyfillJSON(), b._hijackUnityErrorHandler(), b.messageConnection = b._createMessageConnection(), b._createJavascriptApi(), b._fireLoadCallbacks())
        })
    },
    _processParams: function(a) {
        if (a) {
            a =
                a.split("&");
            for (var b = 0; b < a.length; b++) {
                var c = a[b].split("=");
                c && 2 == c.length && this._processParam(c[0], c[1])
            }
        }
    },
    _processParam: function(a, b) { 0 === a.indexOf("kongregate") && (this._flashVarsObject[a] = b, this._flashVarsString += a + "=" + b + "&") },
    _messageOriginIsKongregate: function(a) {
        var b = decodeURIComponent(this._flashVarsObject.kongregate_host || "");
        a = a.origin;
        return b && (a === b || a == "http://" + b || a == "https://" + b)
    },
    _createJavascriptApi: function() {
        var a = this;
        this._services.services = new Kongregate.ApiServices({
            kongregate_variables: this.flashVarsObject(),
            message_connection: this.messageConnection
        });
        this._services.stats = new Kongregate.StatisticServices({ services: this._services.services });
        this._services.sharedContent = new Kongregate.SharedContentServices({ services: this._services.services });
        this._services.images = new Kongregate.ImageServices({ services: this._services.services });
        this._services.mtx = new Kongregate.MicrotransactionServices({ services: this._services.services });
        this._services.chat = new Kongregate.ChatServices({ services: this._services.services });
        this._services.analytics = new Kongregate.AnalyticsServices({ services: this._services.services, mtx: this._services.mtx, kongregate_variables: this.flashVarsObject(), enable_persistence: !0, start: !0 });
        setTimeout(function() { a.messageConnection.connect() }, 0)
    },
    _createMessageConnection: function() {
        var a = this,
            b = this.flashVarsObject();
        b = { target_window: this._kongWindow, target_origin: decodeURIComponent(b.kongregate_host), channel_id: b.kongregate_channel_id, retry_connection: !0 };
        this._klient && (b.send_listener = function(b,
            d) { a._forwardToKlient({ opcode: b, params: d }, "out") });
        b = new Kongregate.MessageConnection(b);
        b.isSupported() && b.addMessageListener(function(b, d) {
            var c = a._gameSwf;
            b = { opcode: b, params: d };
            c && "function" === typeof c.handleMessageConnectionEvent && c.handleMessageConnectionEvent(JSON.stringify(b))
        });
        return b
    },
    _hijackUnityErrorHandler: function() { try { kongregateUnitySupport.hijackUnityErrorHandler() } catch (a) {} }
};
kongregateAPI = new KongregateAPI;
! function(a) {
    function b(a) {
        for (var b = 16; b--;) {
            var c = b << 2;
            p[b] = a.charCodeAt(c) + (a.charCodeAt(c + 1) << 8) + (a.charCodeAt(c + 2) << 16) + (a.charCodeAt(c + 3) << 24)
        }
    }

    function c(a, b, c, e, d, g, h) { b += a + e + h; return (b << d | b >>> g) + c << 0 }

    function d(a) {
        q(0, 0, 0, 0, a);
        r[0] = t[0] + 1732584193 << 0;
        r[1] = t[1] - 271733879 << 0;
        r[2] = t[2] - 1732584194 << 0;
        r[3] = t[3] + 271733878 << 0
    }

    function l(a) {
        q(r[0], r[1], r[2], r[3], a);
        r[0] = t[0] + r[0] << 0;
        r[1] = t[1] + r[1] << 0;
        r[2] = t[2] + r[2] << 0;
        r[3] = t[3] + r[3] << 0
    }

    function q(a, b, f, e, d) {
        w ? (a = c((f ^ e) & b ^ e, a, b, d[0], 7, 25, -680876936),
            e = c((b ^ f) & a ^ f, e, a, d[1], 12, 20, -389564586), f = c((a ^ b) & e ^ b, f, e, d[2], 17, 15, 606105819), b = c((e ^ a) & f ^ a, b, f, d[3], 22, 10, -1044525330)) : (a = d[0] - 680876937, a = (a << 7 | a >>> 25) - 271733879 << 0, e = d[1] - 117830708 + (2004318071 & a ^ -1732584194), e = (e << 12 | e >>> 20) + a << 0, f = d[2] - 1126478375 + ((a ^ -271733879) & e ^ -271733879), f = (f << 17 | f >>> 15) + e << 0, b = d[3] - 1316259209 + ((e ^ a) & f ^ a), b = (b << 22 | b >>> 10) + f << 0);
        a = c((f ^ e) & b ^ e, a, b, d[4], 7, 25, -176418897);
        e = c((b ^ f) & a ^ f, e, a, d[5], 12, 20, 1200080426);
        f = c((a ^ b) & e ^ b, f, e, d[6], 17, 15, -1473231341);
        b = c((e ^ a) & f ^ a, b, f,
            d[7], 22, 10, -45705983);
        a = c((f ^ e) & b ^ e, a, b, d[8], 7, 25, 1770035416);
        e = c((b ^ f) & a ^ f, e, a, d[9], 12, 20, -1958414417);
        f = c((a ^ b) & e ^ b, f, e, d[10], 17, 15, -42063);
        b = c((e ^ a) & f ^ a, b, f, d[11], 22, 10, -1990404162);
        a = c((f ^ e) & b ^ e, a, b, d[12], 7, 25, 1804603682);
        e = c((b ^ f) & a ^ f, e, a, d[13], 12, 20, -40341101);
        f = c((a ^ b) & e ^ b, f, e, d[14], 17, 15, -1502002290);
        b = c((e ^ a) & f ^ a, b, f, d[15], 22, 10, 1236535329);
        a = c((b ^ f) & e ^ f, a, b, d[1], 5, 27, -165796510);
        e = c((a ^ b) & f ^ b, e, a, d[6], 9, 23, -1069501632);
        f = c((e ^ a) & b ^ a, f, e, d[11], 14, 18, 643717713);
        b = c((f ^ e) & a ^ e, b, f, d[0], 20, 12,
            -373897302);
        a = c((b ^ f) & e ^ f, a, b, d[5], 5, 27, -701558691);
        e = c((a ^ b) & f ^ b, e, a, d[10], 9, 23, 38016083);
        f = c((e ^ a) & b ^ a, f, e, d[15], 14, 18, -660478335);
        b = c((f ^ e) & a ^ e, b, f, d[4], 20, 12, -405537848);
        a = c((b ^ f) & e ^ f, a, b, d[9], 5, 27, 568446438);
        e = c((a ^ b) & f ^ b, e, a, d[14], 9, 23, -1019803690);
        f = c((e ^ a) & b ^ a, f, e, d[3], 14, 18, -187363961);
        b = c((f ^ e) & a ^ e, b, f, d[8], 20, 12, 1163531501);
        a = c((b ^ f) & e ^ f, a, b, d[13], 5, 27, -1444681467);
        e = c((a ^ b) & f ^ b, e, a, d[2], 9, 23, -51403784);
        f = c((e ^ a) & b ^ a, f, e, d[7], 14, 18, 1735328473);
        b = c((f ^ e) & a ^ e, b, f, d[12], 20, 12, -1926607734);
        var k = b ^ f;
        a = c(k ^ e, a, b, d[5], 4, 28, -378558);
        e = c(k ^ a, e, a, d[8], 11, 21, -2022574463);
        k = e ^ a;
        f = c(k ^ b, f, e, d[11], 16, 16, 1839030562);
        b = c(k ^ f, b, f, d[14], 23, 9, -35309556);
        k = b ^ f;
        a = c(k ^ e, a, b, d[1], 4, 28, -1530992060);
        e = c(k ^ a, e, a, d[4], 11, 21, 1272893353);
        k = e ^ a;
        f = c(k ^ b, f, e, d[7], 16, 16, -155497632);
        b = c(k ^ f, b, f, d[10], 23, 9, -1094730640);
        k = b ^ f;
        a = c(k ^ e, a, b, d[13], 4, 28, 681279174);
        e = c(k ^ a, e, a, d[0], 11, 21, -358537222);
        k = e ^ a;
        f = c(k ^ b, f, e, d[3], 16, 16, -722521979);
        b = c(k ^ f, b, f, d[6], 23, 9, 76029189);
        k = b ^ f;
        a = c(k ^ e, a, b, d[9], 4, 28, -640364487);
        e = c(k ^ a,
            e, a, d[12], 11, 21, -421815835);
        k = e ^ a;
        f = c(k ^ b, f, e, d[15], 16, 16, 530742520);
        b = c(k ^ f, b, f, d[2], 23, 9, -995338651);
        a = c(f ^ (b | ~e), a, b, d[0], 6, 26, -198630844);
        e = c(b ^ (a | ~f), e, a, d[7], 10, 22, 1126891415);
        f = c(a ^ (e | ~b), f, e, d[14], 15, 17, -1416354905);
        b = c(e ^ (f | ~a), b, f, d[5], 21, 11, -57434055);
        a = c(f ^ (b | ~e), a, b, d[12], 6, 26, 1700485571);
        e = c(b ^ (a | ~f), e, a, d[3], 10, 22, -1894986606);
        f = c(a ^ (e | ~b), f, e, d[10], 15, 17, -1051523);
        b = c(e ^ (f | ~a), b, f, d[1], 21, 11, -2054922799);
        a = c(f ^ (b | ~e), a, b, d[8], 6, 26, 1873313359);
        e = c(b ^ (a | ~f), e, a, d[15], 10, 22, -30611744);
        f = c(a ^ (e | ~b), f, e, d[6], 15, 17, -1560198380);
        b = c(e ^ (f | ~a), b, f, d[13], 21, 11, 1309151649);
        a = c(f ^ (b | ~e), a, b, d[4], 6, 26, -145523070);
        e = c(b ^ (a | ~f), e, a, d[11], 10, 22, -1120210379);
        f = c(a ^ (e | ~b), f, e, d[2], 15, 17, 718787259);
        b = c(e ^ (f | ~a), b, f, d[9], 21, 11, -343485551);
        t[0] = a;
        t[1] = b;
        t[2] = f;
        t[3] = e
    }
    var g = [],
        h = [],
        p = [],
        n = [],
        m = "0123456789abcdef".split(""),
        v = [],
        r = [],
        w = !1,
        C = 0,
        y = 0,
        t = [];
    if (a.Int32Array) h = new Int32Array(16), p = new Int32Array(16), n = new Int32Array(4), v = new Int32Array(4), r = new Int32Array(4), t = new Int32Array(4);
    else {
        for (a =
            0; 16 > a; a++) h[a] = p[a] = 0;
        for (a = 0; 4 > a; a++) n[a] = v[a] = r[a] = t[a] = 0
    }
    n[0] = 128;
    n[1] = 32768;
    n[2] = 8388608;
    n[3] = -2147483648;
    v[0] = 0;
    v[1] = 8;
    v[2] = 16;
    v[3] = 24;
    Kongregate.Utils.md5 = function(a, c, f) {
        if (!c) {
            c = "";
            for (var e, k = 0, t = 0, q = 0, u = a.length; q < u; q++) e = a.charCodeAt(q), 128 > e ? t++ : (e = 2048 > e ? String.fromCharCode(e >> 6 | 192, e & 63 | 128) : String.fromCharCode(e >> 12 | 224, e >> 6 & 63 | 128, e & 63 | 128), t > k && (c += a.slice(k, t)), c += e, k = t = q + 1);
            t > k && (c += a.slice(k, u));
            a = c
        }
        a += "";
        w = !1;
        C = y = a.length;
        if (63 < y) {
            b(a.substring(0, 64));
            d(p);
            w = !0;
            for (c = 128; c <=
                y; c += 64) b(a.substring(c - 64, c)), l(p);
            a = a.substring(c - 64);
            y = a.length
        }
        for (c = h[0] = h[1] = h[2] = h[3] = h[4] = h[5] = h[6] = h[7] = h[8] = h[9] = h[10] = h[11] = h[12] = h[13] = h[14] = h[15] = 0; c < y; c++) k = c & 3, h[c >> 2] = 0 === k ? a.charCodeAt(c) : h[c >> 2] | a.charCodeAt(c) << v[k];
        h[c >> 2] |= n[c & 3];
        55 < c ? (w ? l(h) : (d(h), w = !0), l([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, C << 3, 0])) : (h[14] = C << 3, w ? l(h) : d(h));
        a = r[0];
        g[1] = m[a & 15];
        g[0] = m[(a >>= 4) & 15];
        g[3] = m[(a >>= 4) & 15];
        g[2] = m[(a >>= 4) & 15];
        g[5] = m[(a >>= 4) & 15];
        g[4] = m[(a >>= 4) & 15];
        g[7] = m[(a >>= 4) & 15];
        g[6] = m[a >> 4 & 15];
        a = r[1];
        g[9] =
            m[a & 15];
        g[8] = m[(a >>= 4) & 15];
        g[11] = m[(a >>= 4) & 15];
        g[10] = m[(a >>= 4) & 15];
        g[13] = m[(a >>= 4) & 15];
        g[12] = m[(a >>= 4) & 15];
        g[15] = m[(a >>= 4) & 15];
        g[14] = m[a >> 4 & 15];
        a = r[2];
        g[17] = m[a & 15];
        g[16] = m[(a >>= 4) & 15];
        g[19] = m[(a >>= 4) & 15];
        g[18] = m[(a >>= 4) & 15];
        g[21] = m[(a >>= 4) & 15];
        g[20] = m[(a >>= 4) & 15];
        g[23] = m[(a >>= 4) & 15];
        g[22] = m[a >> 4 & 15];
        a = r[3];
        g[25] = m[a & 15];
        g[24] = m[(a >>= 4) & 15];
        g[27] = m[(a >>= 4) & 15];
        g[26] = m[(a >>= 4) & 15];
        g[29] = m[(a >>= 4) & 15];
        g[28] = m[(a >>= 4) & 15];
        g[31] = m[(a >>= 4) & 15];
        g[30] = m[a >> 4 & 15];
        return f ? g : g.join("")
    }
}("undefined" === typeof global ?
    window : global);
Kongregate.MicrotransactionServices = function(a) { this.initialize(a) };
Kongregate.MicrotransactionServices.prototype = {
    initialize: function(a) {
        var b = this;
        this._services = a.services;
        this._services.addEventListener(KonduitEvent.KONDUIT_MESSAGE, function(a) { b._onIncomingMessage(a.opcode, a.params) });
        this._adCallbacks = []
    },
    requestItemList: function(a, b) {
        Kongregate.Log.info("MicrotransactionServices.requestItemList(" + a + ")");
        var c = {};
        a && 0 < a.length && (c[KonduitEvent.PARAM_ITEM_TAGS] = a);
        this._services._enqueueRequest(c, b);
        this._services.sendMessage({ opcode: KonduitEvent.ITEM_LIST, params: c })
    },
    requestUserItemList: function(a, b) {
        Kongregate.Log.info("MicrotransactionServices.requestUserItemList(" + a + ")");
        var c = {};
        c[KonduitEvent.PARAM_USER] = a || this._services.getUsername();
        this._services._enqueueRequest(c, b);
        this._services.sendMessage({ opcode: KonduitEvent.ITEM_INSTANCES, params: c })
    },
    purchaseItems: function(a, b) {
        Kongregate.Log.info("MicrotransactionServices.purchaseItems(" + a + ")");
        var c = {};
        a && 0 < a.length ? (this._purchaseItemsCallback = b, c[KonduitEvent.PARAM_ITEMS] = a, this._services.sendMessage({
            opcode: KonduitEvent.ITEM_CHECKOUT,
            params: c
        })) : (Kongregate.Log.error("purchaseItems requires a non-empty item identifier array"), b && b({ success: !1 }))
    },
    purchaseItemsRemote: function(a, b) {
        Kongregate.Log.info("MicrotransactionServices.purchaseItemsRemote(" + a + ")");
        var c = {};
        a && 0 < String(a).length ? (this._purchaseItemsCallback = b, c[KonduitEvent.PARAM_ORDER_INFO] = String(a), this._services.sendMessage({ opcode: KonduitEvent.ITEM_CHECKOUT, params: c })) : (Kongregate.Log.error("purchaseItemsRemote requires an orderInformation string"), b && b({ success: !1 }))
    },
    useItemInstance: function(a, b) {
        Kongregate.Log.info("MicrotransactionServices.useItemInstance(" + a + ")");
        var c = {};
        a ? (c[KonduitEvent.PARAM_ID] = a, this._services._enqueueRequest(c, b), this._services.sendMessage({ opcode: KonduitEvent.USE_ITEM_INSTANCE, params: c })) : (Kongregate.Log.error("useItemInstance requires an itemInstanceId"), b && b({ success: !1 }))
    },
    showKredPurchaseDialog: function(a) {
        var b = {};
        b[KonduitEvent.PARAM_PURCHASE_METHOD] = a;
        this._services.sendMessage({ opcode: KonduitEvent.PURCHASE_KREDS, params: b })
    },
    initializeIncentivizedAds: function() { this._services.sendMessage({ opcode: KonduitEvent.ADS_INITIALIZE }) },
    showIncentivizedAd: function() { this._services.sendMessage({ opcode: KonduitEvent.ADS_SHOW_INCENTIVIZED }) },
    addEventListener: function(a, b) { "function" !== typeof b ? Kongregate.Log.error("addEventListener requires a callback function") : (this._adCallbacks[a] || (this._adCallbacks[a] = []), this._adCallbacks[a].push(b)) },
    _onIncomingMessage: function(a, b) {
        switch (a) {
            case KonduitEvent.ITEM_INSTANCES:
            case KonduitEvent.ITEM_LIST:
            case KonduitEvent.USE_ITEM_INSTANCE:
                this._services._completeRequest(b);
                break;
            case KonduitEvent.PURCHASE_RESULT:
                this._onPurchaseResultResponse(b);
                break;
            case KonduitEvent.ADS_AVAILABLE:
                this._handleAdEvent("adsAvailable", b);
                break;
            case KonduitEvent.ADS_UNAVAILABLE:
                this._handleAdEvent("adsUnavailable", b);
                break;
            case KonduitEvent.AD_OPENED:
                this._handleAdEvent("adOpened", b);
                break;
            case KonduitEvent.AD_COMPLETED:
                this._handleAdEvent("adCompleted", b);
                break;
            case KonduitEvent.AD_ABANDONED:
                this._handleAdEvent("adAbandoned", b)
        }
    },
    _onPurchaseResultResponse: function(a) {
        this._purchaseItemsCallback &&
            (this._purchaseItemsCallback(a), this._purchaseItemsCallback = null)
    },
    _handleAdEvent: function(a, b) {
        if (a = this._adCallbacks[a])
            for (var c = 0; c < a.length; c++) a[c](b)
    }
};
Kongregate.SharedContentServices = function(a) { this.initialize(a) };
Kongregate.SharedContentServices.CONTENT_TYPE_LIMIT = 12;
Kongregate.SharedContentServices.prototype = {
    initialize: function(a) {
        var b = this;
        this._services = a.services;
        this._loadListeners = {};
        this._services.addEventListener(KonduitEvent.KONDUIT_MESSAGE, function(a) { b._onIncomingMessage(a.opcode, a.params) })
    },
    browse: function(a, b, c) {
        var d = {};
        d[KonduitEvent.PARAM_CONTENT_TYPE] = a;
        c && (d[KonduitEvent.PARAM_LABEL] = c);
        b && (d[KonduitEvent.PARAM_SORT] = b);
        this._services.sendMessage({ opcode: KonduitEvent.OP_BROWSE_SHARED_CONTENT, params: d })
    },
    save: function(a, b, c, d, l) {
        if (this._saving ||
            a.length > Kongregate.SharedContentServices.CONTENT_TYPE_LIMIT) c && c({ success: !1 });
        else {
            var q = {};
            q[KonduitEvent.PARAM_CONTENT_TYPE] = a;
            q[KonduitEvent.PARAM_LABEL] = l;
            q[KonduitEvent.PARAM_DATA] = b;
            q[KonduitEvent.PARAM_IMAGE] = d;
            this._services.sendMessage({ opcode: KonduitEvent.OP_SAVE_SHARED_CONTENT, params: q });
            this._saving = !0;
            this._saveCallback = c
        }
    },
    addLoadListener: function(a, b) {
        this._loadListeners[a] || (this._loadListeners[a] = []);
        this._loadListeners[a].push(b)
    },
    _onIncomingMessage: function(a, b) {
        switch (a) {
            case KonduitEvent.OP_SHARED_CONTENT_SAVE_COMPLETE:
                this._onSaveContentComplete(b);
                break;
            case KonduitEvent.OP_LOAD_SHARED_CONTENT:
                this._onLoadSharedContent(b)
        }
    },
    _onSaveContentComplete: function(a) {
        this._saving = !1;
        this._saveCallback && (this._saveCallback({ id: a[KonduitEvent.PARAM_ID], success: a[KonduitEvent.PARAM_SUCCESS], name: a[KonduitEvent.PARAM_NAME], permalink: a[KonduitEvent.PARAM_PERMALINK], content: a[KonduitEvent.PARAM_DATA], label: a[KonduitEvent.PARAM_LABEL] }), this._saveCallback = null)
    },
    _onLoadSharedContent: function(a) {
        var b = a[KonduitEvent.PARAM_CONTENT_TYPE];
        a = {
            id: a[KonduitEvent.PARAM_ID],
            name: a[KonduitEvent.PARAM_NAME],
            permalink: a[KonduitEvent.PARAM_PERMALINK],
            content: a[KonduitEvent.PARAM_DATA],
            label: a[KonduitEvent.PARAM_LABEL]
        };
        Kongregate.Log.info({ loadContent: a });
        b = this._loadListeners[b] || [];
        for (var c = 0; c < b.length; c++) b[c](a)
    }
};
Kongregate.StatisticServices = function(a) { this.initialize(a) };
Kongregate.StatisticServices.prototype = {
    initialize: function(a) { this._services = a.services },
    submit: function(a, b) { Kongregate.Log.info("StatServices.submit(" + a + "," + b + ")");!a || null === b || void 0 === b || isNaN(b) ? Kongregate.Log.warn("Invalid stat name or value:", a, b) : this._services.sendMessage({ opcode: KonduitEvent.OP_STATS_SUBMIT, params: { stats: [{ name: a, value: b }] } }) },
    submitArray: function(a) {
        if (a && a.length)
            for (var b = 0; b < a.length; b++) this.submit(a[b].name, a[b].value)
    }
};
"undefined" == typeof kongregateUnitySupport && (kongregateUnitySupport = function() {
    function a(a) {
        a = q.getElementById(a);
        if (!a) return null;
        var b;
        m.win && m.ie ? (a = a.getElementsByTagName("object")[0]) && "OBJECT" == a.nodeName && (b = a) : (a = a.getElementsByTagName("embed")[0]) && "EMBED" == a.nodeName && (b = a);
        return b && "undefined" == typeof b.GetPluginVersion ? null : b
    }

    function b() {
        var b = "undefined" != typeof kongregateAPI && kongregateAPI.unityGameInstance ? kongregateAPI.unityGameInstance : "function" === typeof window.SendMessage ? window :
            window.gameInstance && "function" === typeof window.gameInstance.SendMessage ? window.gameInstance : window.unityInstance && "function" === typeof window.unityInstance.SendMessage ? window.unityInstance : null;
        if (b) return b;
        b = "kongregateUnityDiv";
        "undefined" != typeof kongregateAPI && kongregateAPI.unityElementId && (b = kongregateAPI.unityElementId);
        return a(b) || a("unityPlayer")
    }

    function c() { return [kongregate.services.getUserId(), kongregate.services.getUsername(), kongregate.services.getGameAuthToken()].join("|") }
    var d = [],
        l = navigator,
        q = document,
        g = l.userAgent;
    l = l.platform;
    var h = !1,
        p = /chrome/i.test(g),
        n = {};
    /msie/i.test(g) ? h = parseFloat(g.replace(/^.*msie ([0-9]+(\.[0-9]+)?).*$/i, "$1")) : /Trident/i.test(g) && (h = parseFloat(g.replace(/^.*rv:([0-9]+(\.[0-9]+)?).*$/i, "$1")));
    var m = {
        w3: "undefined" != typeof q.getElementById && "undefined" != typeof q.getElementsByTagName && "undefined" != typeof q.createElement,
        win: l ? /win/i.test(l) : /win/i.test(g),
        mac: l ? /mac/i.test(l) : /mac/i.test(g),
        ie: h,
        ff: /firefox/i.test(g),
        op: /opera/i.test(g),
        ch: p,
        ch_v: /chrome/i.test(g) ? parseFloat(g.replace(/^.*chrome\/(\d+(\.\d+)?).*$/i, "$1")) : !1,
        sf: /safari/i.test(g) && !p,
        wk: /webkit/i.test(g) ? parseFloat(g.replace(/^.*webkit\/(\d+(\.\d+)?).*$/i, "$1")) : !1,
        x64: /win64/i.test(g) && /x64/i.test(g),
        moz: /mozilla/i.test(g) ? parseFloat(g.replace(/^.*mozilla\/([0-9]+(\.[0-9]+)?).*$/i, "$1")) : 0,
        mobile: /ipad/i.test(l) || /iphone/i.test(l) || /ipod/i.test(l) || /android/i.test(g) || /windows phone/i.test(g)
    };
    m.clientBrand = m.ch ? "ch" : m.ff ? "ff" : m.sf ? "sf" : m.ie ? "ie" : m.op ? "op" : "??";
    m.clientPlatform =
        m.win ? "win" : m.mac ? "mac" : "???";
    return {
        onUnityEmbed: function(a) { $("unity_missing") && (a.success ? "missingUnityObject" == a.id ? ($("missingUnityObject").update(""), $("kongregateUnityDiv").update(""), top.location.replace(decodeURIComponent(kongregateAPI.getVariable("kongregate_game_url")))) : $("unity_missing").remove() : $("unity_missing").show()) },
        initAPI: function(a, g) {
            d.push({ object: a || "KongregateAPI", callback: g || "OnKongregateAPILoaded" });
            kongregateAPI.loadAPI(function() {
                "undefined" === typeof kongregate && (kongregate =
                    kongregateAPI.getAPI());
                for (var a = 0; a < d.length; a++) {
                    var g = d[a];
                    b().SendMessage(g.object, g.callback, c())
                }
                d = []
            })
        },
        getUnityObject: function() { return b() },
        getUserInfoString: function() { return c() },
        hijackUnityErrorHandler: function() {
            if (!kongregateAPI.disableUnityErrorHandler && !this.unityErrorHandlerInstalled) {
                var a = function(a) {
                    if (a.match(/Permission denied to access property/)) { try { console.error("Caught error: " + a) } catch (u) {} return !0 }
                    try {
                        b: {
                            if ("string" === typeof a) {
                                if (-1 !== a.indexOf("Cannot enlarge memory arrays")) {
                                    var b =
                                        "UnityWebGL:Memory:WebGL";
                                    break b
                                }
                                if (-1 !== a.indexOf("out of memory")) { b = "UnityWebGL:Memory:Browser"; break b }
                            }
                            b = void 0
                        }
                        if (b && !n[b]) {
                            var c = decodeURIComponent(kongregateAPI.flashVarsObject().kongregate_host || "*");
                            n[b] = !0;
                            top.postMessage({ kongregateGameError: { type: b } }, c)
                        }
                    }
                    catch (u) {}
                };
                if ("undefined" !== typeof UnityLoader && UnityLoader.Error && UnityLoader.Error.handler) {
                    var b = UnityLoader.Error.handler;
                    UnityLoader.Error.handler = function(c) {
                        return a(c.message) ? !0 : "function" === typeof b && b.apply(UnityLoader.Error,
                            arguments)
                    };
                    this.unityErrorHandlerInstalled = !0
                }
                var c = window.Module;
                if (c && c.TOTAL_MEMORY && c.codeUrl) {
                    var d = c.errorhandler;
                    c.errorhandler = function(b, c, g) { return a(b) ? !0 : "function" === typeof d && d(b, c, g) };
                    this.unityErrorHandlerInstalled = !0
                }
            }
        }
    }
}());