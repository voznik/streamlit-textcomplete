/**
 * Copyright (c) Streamlit Inc. (2018-2022) Snowflake Inc. (2022)
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Safari doesn't support the EventTarget class, so we use a shim.
/** Messages from Component -> Streamlit */
var ComponentMessageType;
(function (ComponentMessageType) {
    // A component sends this message when it's ready to receive messages
    // from Streamlit. Streamlit won't send any messages until it gets this.
    // Data: { apiVersion: number }
    ComponentMessageType["COMPONENT_READY"] = "streamlit:componentReady";
    // The component has a new widget value. Send it back to Streamlit, which
    // will then re-run the app.
    // Data: { value: any }
    ComponentMessageType["SET_COMPONENT_VALUE"] = "streamlit:setComponentValue";
    // The component has a new height for its iframe.
    // Data: { height: number }
    ComponentMessageType["SET_FRAME_HEIGHT"] = "streamlit:setFrameHeight";
})(ComponentMessageType || (ComponentMessageType = {}));
/**
 * Streamlit communication API.
 *
 * Components can send data to Streamlit via the functions defined here,
 * and receive data from Streamlit via the `events` property.
 */
export var Streamlit = /** @class */ (function () {
    function Streamlit() {
    }
    /**
     * The Streamlit component API version we're targeting.
     * There's currently only 1!
     */
    Streamlit.API_VERSION = 1;
    Streamlit.RENDER_EVENT = "streamlit:render";
    /** Dispatches events received from Streamlit. */
    Streamlit.events = new EventTarget();
    Streamlit.registeredMessageListener = false;
    /**
     * Tell Streamlit that the component is ready to start receiving data.
     * Streamlit will defer emitting RENDER events until it receives the
     * COMPONENT_READY message.
     */
    Streamlit.setComponentReady = function () {
        if (!Streamlit.registeredMessageListener) {
            // Register for message events if we haven't already
            window.addEventListener("message", Streamlit.onMessageEvent);
            Streamlit.registeredMessageListener = true;
        }
        Streamlit.sendBackMsg(ComponentMessageType.COMPONENT_READY, {
            apiVersion: Streamlit.API_VERSION
        });
    };
    /**
     * Report the component's height to Streamlit.
     * This should be called every time the component changes its DOM - that is,
     * when it's first loaded, and any time it updates.
     */
    Streamlit.setFrameHeight = function (height) {
        if (height === undefined) {
            // `height` is optional. If undefined, it defaults to scrollHeight,
            // which is the entire height of the element minus its border,
            // scrollbar, and margin.
            height = document.body.scrollHeight;
        }
        if (height === Streamlit.lastFrameHeight) {
            // Don't bother updating if our height hasn't changed.
            return;
        }
        Streamlit.lastFrameHeight = height;
        Streamlit.sendBackMsg(ComponentMessageType.SET_FRAME_HEIGHT, { height: height });
    };
    /**
     * Set the component's value. This value will be returned to the Python
     * script, and the script will be re-run.
     *
     * For example:
     *
     * JavaScript:
     * Streamlit.setComponentValue("ahoy!")
     *
     * Python:
     * value = st.my_component(...)
     * st.write(value) # -> "ahoy!"
     *
     * The value must be a typed array, an ArrayBuffer, or be
     * serializable to JSON.
     */
    Streamlit.setComponentValue = function (value) {
        var dataType;
        if (isTypedArray(value)) {
            // All typed arrays get sent as Uint8Array, because that's what our
            // protobuf library uses for the "bytes" field type.
            dataType = "bytes";
            value = new Uint8Array(value.buffer);
        }
        else if (value instanceof ArrayBuffer) {
            dataType = "bytes";
            value = new Uint8Array(value);
        }
        else {
            dataType = "json";
        }
        Streamlit.sendBackMsg(ComponentMessageType.SET_COMPONENT_VALUE, {
            value: value,
            dataType: dataType
        });
    };
    /** Receive a ForwardMsg from the Streamlit app */
    Streamlit.onMessageEvent = function (event) {
        var type = event.data["type"];
        switch (type) {
            case Streamlit.RENDER_EVENT:
                Streamlit.onRenderMessage(event.data);
                break;
        }
    };
    /**
     * Handle an untyped Streamlit render event and redispatch it as a
     * StreamlitRenderEvent.
     */
    Streamlit.onRenderMessage = function (data) {
        var args = data["args"];
        if (args == null) {
            console.error("Got null args in onRenderMessage. This should never happen");
            args = {};
        }
        // Parse our dataframe arguments with arrow, and merge them into our args dict
        var dataframeArgs = data["dfs"] && data["dfs"].length > 0
            ? Streamlit.argsDataframeToObject(data["dfs"])
            : {};
        args = __assign(__assign({}, args), dataframeArgs);
        var disabled = Boolean(data["disabled"]);
        var theme = data["theme"];
        if (theme) {
            _injectTheme(theme);
        }
        // Dispatch a render event!
        var eventData = { disabled: disabled, args: args, theme: theme };
        var event = new CustomEvent(Streamlit.RENDER_EVENT, {
            detail: eventData
        });
        Streamlit.events.dispatchEvent(event);
    };
    Streamlit.argsDataframeToObject = function (argsDataframe) {
        return null;
    };
    Streamlit.toArrowTable = function (df) {
        return null;
    };
    /** Post a message to the Streamlit app. */
    Streamlit.sendBackMsg = function (type, data) {
        window.parent.postMessage(__assign({ isStreamlitMessage: true, type: type }, data), "*");
    };
    return Streamlit;
}());
var _injectTheme = function (theme) {
    var style = document.createElement("style");
    document.head.appendChild(style);
    style.innerHTML = "\n    :root {\n      --primary-color: ".concat(theme.primaryColor, ";\n      --background-color: ").concat(theme.backgroundColor, ";\n      --secondary-background-color: ").concat(theme.secondaryBackgroundColor, ";\n      --text-color: ").concat(theme.textColor, ";\n      --font: ").concat(theme.font, ";\n    }\n\n    body {\n      background-color: var(--background-color);\n      color: var(--text-color);\n    }\n  ");
};
/** True if the value is a TypedArray. */
function isTypedArray(value) {
    var isBigIntArray = false;
    try {
        isBigIntArray =
            value instanceof BigInt64Array || value instanceof BigUint64Array;
    }
    catch (e) {
        // Ignore cause Safari does not support this
        // https://caniuse.com/mdn-javascript_builtins_bigint64array
    }
    return (value instanceof Int8Array ||
        value instanceof Uint8Array ||
        value instanceof Uint8ClampedArray ||
        value instanceof Int16Array ||
        value instanceof Uint16Array ||
        value instanceof Int32Array ||
        value instanceof Uint32Array ||
        value instanceof Float32Array ||
        value instanceof Float64Array ||
        isBigIntArray);
}
