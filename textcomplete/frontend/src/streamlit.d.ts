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
import { ArrowTable } from "./ArrowTable";
/** Object defining the currently set theme. */
export interface Theme {
    base: string;
    primaryColor: string;
    backgroundColor: string;
    secondaryBackgroundColor: string;
    textColor: string;
    font: string;
}
/** Data sent in the custom Streamlit render event. */
export interface RenderData<ArgType = any> {
    args: ArgType;
    disabled: boolean;
    theme?: Theme;
}
type ComponentValue = ArrowTable | TypedArray | ArrayBuffer | any;
/**
 * Streamlit communication API.
 *
 * Components can send data to Streamlit via the functions defined here,
 * and receive data from Streamlit via the `events` property.
 */
export declare class Streamlit {
    /**
     * The Streamlit component API version we're targeting.
     * There's currently only 1!
     */
    static readonly API_VERSION = 1;
    static readonly RENDER_EVENT = "streamlit:render";
    /** Dispatches events received from Streamlit. */
    static readonly events: EventTarget;
    private static registeredMessageListener;
    private static lastFrameHeight?;
    /**
     * Tell Streamlit that the component is ready to start receiving data.
     * Streamlit will defer emitting RENDER events until it receives the
     * COMPONENT_READY message.
     */
    static setComponentReady: () => void;
    /**
     * Report the component's height to Streamlit.
     * This should be called every time the component changes its DOM - that is,
     * when it's first loaded, and any time it updates.
     */
    static setFrameHeight: (height?: number) => void;
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
     * The value must be an ArrowTable, a typed array, an ArrayBuffer, or be
     * serializable to JSON.
     */
    static setComponentValue: (value: ComponentValue) => void;
    /** Receive a ForwardMsg from the Streamlit app */
    private static onMessageEvent;
    /**
     * Handle an untyped Streamlit render event and redispatch it as a
     * StreamlitRenderEvent.
     */
    private static onRenderMessage;
    private static argsDataframeToObject;
    private static toArrowTable;
    /** Post a message to the Streamlit app. */
    private static sendBackMsg;
}
type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;
export {};
