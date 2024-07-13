import { Streamlit, RenderData } from "streamlit-component-lib";
import { Textcomplete, Strategy } from "@textcomplete/core";
import { TextareaEditor } from "@textcomplete/textarea";
// import Alpine from 'alpinejs'
import { startsWith } from "./emoji"

// window.Alpine = Alpine;
// Alpine.start();

const iframeElement = window.frameElement;
// const parentElement = window.parent.document.parentElement;
console.log("iframeElement", iframeElement);
iframeElement.style.height = "100%";
const textareaContainer = document.querySelector("#streamlit-textcomplete-container");
const textareaElement = document.querySelector("#streamlit-textcomplete-textarea");
const editor = new TextareaEditor(textareaElement);
// const textcomplete = new Textcomplete(editor, [EMOJI_STRATEGY], DEFAULT_OPTIONS); // DEBUG

const DEFAULT_DROPDOWN_MAX_COUNT = 3
const DEFAULT_DROPDOWN_PLACEMENT = "bottom"
const DEFAULT_DROPDOWN_CLASS_NAME = "dropdown-menu textcomplete-dropdown"

// Default constants for DropdownItem
const DEFAULT_DROPDOWN_ITEM_CLASS_NAME = "textcomplete-item"
const DEFAULT_DROPDOWN_ITEM_ACTIVE_CLASS_NAME = `${DEFAULT_DROPDOWN_ITEM_CLASS_NAME} active`
/** @type {import('@textcomplete/core').Dropdown} */
const DEFAULT_OPTIONS = {
  dropdown: {
    maxCount: DEFAULT_DROPDOWN_MAX_COUNT,
    placement: DEFAULT_DROPDOWN_PLACEMENT,
    className: DEFAULT_DROPDOWN_CLASS_NAME,
    parent: textareaContainer,
    item: {
      className: DEFAULT_DROPDOWN_ITEM_CLASS_NAME,
      activeClassName: DEFAULT_DROPDOWN_ITEM_ACTIVE_CLASS_NAME,
    },
  }
};

const CODEBLOCK = /`{3}/g
const INLINECODE = /`/g
/** @type {import('@textcomplete/core').Strategy} */
const EMOJI_STRATEGY = {
  id: "emoji",
  match: /\B:([\-+\w]*)$/,
  search: async (term, callback) => {
    callback(await startsWith(term))
  },
  replace: ([key]) => `:${key}: `,
  template: ([key, url]) => `<img src="${url}"/>&nbsp;<small>:${key}:</small>`,
  context: (text) => {
    const blockmatch = text.match(CODEBLOCK)
    if (blockmatch && blockmatch.length % 2) {
      // Cursor is in a code block
      return false
    }
    const inlinematch = text.match(INLINECODE)
    if (inlinematch && inlinematch.length % 2) {
      // Cursor is in a inline code
      return false
    }
    return true
  },
};


// Add a click handler to our textareaElement. It will send data back to Streamlit.
let numClicks = 0
let isFocused = false
textareaElement.oninput = function (e) {
  // Increment numClicks, and pass the new value back to
  // Streamlit via `Streamlit.setComponentValue`.
  numClicks += 1
  console.log("Textcomplete oninput", e.data, e.target.value);
  // Streamlit.setComponentValue(e.target.value)
}

textareaElement.onfocus = function () {
  isFocused = true
}

textareaElement.onblur = function () {
  isFocused = false
}

/**
 * The component's render function. This will be called immediately after
 * the component is initially loaded, and then again every time the
 * component gets new data from Python.
 *
 * @param {RenderData} event - Data sent from the Streamlit app
 */
function onRender(event) {
  // Get the RenderData from the event
  const data = event.detail
  const strategies = data.args["strategies"] || [EMOJI_STRATEGY]
  const options = data.args["option"] || DEFAULT_OPTIONS

  textareaElement.placeholder = "Suggest!"
  const textcomplete = new Textcomplete(editor, strategies, options);

  // Maintain compatibility with older versions of Streamlit that don't send
  // a theme object.
  if (data.theme) {
    // Use CSS vars to style our button border. Alternatively, the theme style
    // is defined in the data.theme object.
    const borderStyling = `1px solid var(${isFocused ? "--primary-color" : "gray"
      })`
    textareaElement.style.border = borderStyling
    textareaElement.style.outline = borderStyling
  }

  // Disable our button if necessary.
  textareaElement.disabled = data.disabled

  textcomplete.on('selected', (e) => {

    console.log("Textcomplete selected", e.detail.value);
    Streamlit.setComponentValue(e.detail.value);
  });


  // RenderData.args is the JSON dictionary of arguments sent from the
  // Python script.
  let name = data.args["name"]

  // Show "Hello, name!" with a non-breaking space afterwards.
  textareaElement.textContent = `Hello, ${name}! ` + String.fromCharCode(160)

  // We tell Streamlit to update our frameHeight after each render event, in
  // case it has changed. (This isn't strictly necessary for the example
  // because our height stays fixed, but this is a low-cost function, so
  // there's no harm in doing it redundantly.)
  Streamlit.setFrameHeight()
}

// Attach our `onRender` handler to Streamlit's render event.
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)

// Tell Streamlit we're ready to start receiving data. We won't get our
// first RENDER_EVENT until we call this function.
Streamlit.setComponentReady()

// Finally, tell Streamlit to update our initial height. We omit the
// `height` parameter here to have it default to our scrollHeight.
Streamlit.setFrameHeight()
