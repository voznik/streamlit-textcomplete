import { Streamlit, RenderData } from "streamlit-component-lib";
import { Textcomplete, Strategy } from "@textcomplete/core";
import { TextareaEditor } from "@textcomplete/textarea";
// import TestUtils from 'react-dom/test-utils';
import { startsWith } from "./emoji"

/**
 * Event handler for textcomplete event
 * @callback textcompleteCallback
 * @param {CustomEvent} e - The event object.
 * @param {Object} e.detail - The detail of the event.
 * @param {import('@textcomplete/core').SearchResult} e.detail.searchResult - The search result.
 */

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
    item: {
      className: DEFAULT_DROPDOWN_ITEM_CLASS_NAME,
      activeClassName: DEFAULT_DROPDOWN_ITEM_ACTIVE_CLASS_NAME,
    },
  }
};

const CODEBLOCK = /`{3}/g
const INLINECODE = /`/g
const contextFn = (text) => {
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
}
/** @type {import('@textcomplete/core').Strategy} */
const EMOJI_STRATEGY = {
  id: "emoji",
  match: /\B:([\-+\w]*)$/,
  search: async (term, callback) => {
    callback(await startsWith(term))
  },
  replace: ([key]) => `:${key}: `,
  // replace: ([key, value]) => value,
  template: ([key, url]) => `<img src="${url}"/>&nbsp;<small>:${key}:</small>`,
  context: contextFn
};
/** @type {import('@textcomplete/core').Strategy} */
const USER_NAME_STRATEGY = {
  id: "userFullName",
  match: /\B@(\w*)$/,
  search: async (term, callback) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    const filteredUsers = users.filter(user =>
      `${user.name}`.toLowerCase().includes(term.toLowerCase())
    );
    callback(filteredUsers.map(user => [user.name]));
  },
  context: contextFn,
  replace: ([fullName]) => `@${fullName} `,
  template: ([fullName]) => `${fullName}`,
};

/**
 * Convert stringified functions back into functions
 * @param {import('@textcomplete/core').StrategyProps} props */
const convertStrategyProps = (props) => {
  return {
    id: props.id,
    index: props.index,
    cache: props.cache,
    match: new RegExp(props.match),
    search: new Function('return ' + props.search)(),
    replace: new Function('return ' + props.replace)(),
    template: props.template && new Function('return ' + props.template)(),
    context: props.context && new Function('return ' + props.context)() || contextFn,
  }
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
  const originalAreaValue = data.args["area_label"]
  const textareaElement = window.parent.document.querySelector(`textarea[aria-label="${originalAreaValue}"]`);
  const rootElement = window.parent.document.querySelector(`#root`);

  // Check if Textcomplete is already initialized
  if (textareaElement.textcompleteInitialized) {
    console.log("Textcomplete already initialized for this textarea.");
    return; // Skip re-initialization
  }

  const strategies = data.args["strategies"].map(convertStrategyProps);
  if (!strategies.length) {
    strategies.push(EMOJI_STRATEGY)
    strategies.push(USER_NAME_STRATEGY)
  }
  const dropdown = { ...data.args["dropdown_option"] } || DEFAULT_OPTION
  dropdown.parent = window.parent.document.querySelector('#root')
  const rootStyles = getComputedStyle(window.document.documentElement)
  const backgroundColor = rootStyles.getPropertyValue('--background-color')
  const secondaryBackgroundColor = rootStyles.getPropertyValue('--secondary-background-color')
  const textColor = rootStyles.getPropertyValue('--text-color')
  const DEFAULT_CSS = `
.textcomplete-dropdown {
  box-sizing: border-box;
  background-color: ${backgroundColor};
  color: ${textColor};
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
}
.textcomplete-header, .textcomplete-footer {
  display: none;
}
.textcomplete-item {
  padding: 2px 4px;
  cursor: pointer;
  height: 2rem;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2px;
}

.textcomplete-item.active {
  background-color: color-mix(in srgb, ${secondaryBackgroundColor} 50%, white);
}

.textcomplete-item > span {
  display: flex;
  align-items: center;
  padding: 2px;
  width: 100%;
}
.textcomplete-item > span > * {
  max-height: 2rem;
}
`
  const css = data.args["css"] || DEFAULT_CSS
  // Inject default or user-provided CSS into parent iframe's parent document
  const style = document.createElement('style');
  style.innerHTML = css;
  window.parent.document.head.appendChild(style);

  const editor = new TextareaEditor(textareaElement);
  const textcomplete = new Textcomplete(editor, strategies, { dropdown });

  // Mark the textarea as initialized
  textareaElement.textcompleteInitialized = true;
  // Store the Textcomplete options on the textarea element for potential disposal
  textareaElement.setAttribute('data-textcomplete', JSON.stringify(data.args["dropdown_option"]));

  let preventBlur = false;

  textareaElement.addEventListener('blur', (e) => {
    if (preventBlur) {
      e.stopPropagation();
      e.preventDefault();
      console.log("Textcomplete blur prevented", e);
    }
  })

  textcomplete.on('show', (e) => {
    console.log("Textcomplete show", e);
    preventBlur = true;
  })

  /**
   * Event handler for 'selected' event
   * @param {string} ename
   * @param {textcompleteCallback} callback
   */
  textcomplete.on('selected', (e) => {
    const { searchResult } = e.detail;
    const text = textareaElement.value;
    delete searchResult.strategy;
    console.log("Textcomplete selected", searchResult);
    console.log("Text value", text);

    preventBlur = false;

    // Create a new InputEvent object with the same properties and methods as the native event object
    const inputEvent = new InputEvent('input', {
      bubbles: true,
      cancelable: false,
      composed: true,
      inputType: 'insertText',
      data: 'new value',
      dataTransfer: null,
      isComposing: false,
      returnValue: true,
    });
    rootElement.dispatchEvent(inputEvent);

    // Create a new synthetic event object with the same properties and methods as the synthetic event object that is created by React
    const syntheticEvent = new Event({
      nativeEvent: inputEvent,
      type: 'change',
      bubbles: true,
      cancelable: false,
      timeStamp: Date.now(),
      defaultPrevented: false,
      isTrusted: true,
    })

    // Attach the synthetic event object to the native event object using the _reactName property

    syntheticEvent._reactName = 'onChange';
    syntheticEvent.nativeEvent = inputEvent;
    syntheticEvent._dispatchListeners = [syntheticEvent];
    // Dispatch the native event object on the textarea element
    // textareaElement.dispatchEvent(syntheticEvent);
    // TestUtils.Simulate.change(textareaElement); // FIXME: no custom event works, neither simulate
    setTimeout(() => {
      // Streamlit.setComponentValue({ searchResult, text });
    }, 0);
  });

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
