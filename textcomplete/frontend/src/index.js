/* eslint-disable no-new-func */
import { Streamlit } from './streamlit';
import { Textcomplete } from '@textcomplete/core';
import { TextareaEditor } from '@textcomplete/textarea';
import {
  parseTextcompleteLabel,
  parseTextcompleteCss,
  parseTextcompleteOption,
  parseTextcompleteStrategies,
} from './helpers';

/**
 * Event handler for textcomplete event
 * @callback textcompleteCallback
 * @param {CustomEvent} e - The event object.
 * @param {Object} e.detail - The detail of the event.
 * @param {import('@textcomplete/core').SearchResult} e.detail.searchResult - The search result.
 */
// -----------------------------------------------------------------------------

/**
 * The component's render function. This will be called immediately after
 * the component is initially loaded, and then again every time the
 * component gets new data from Python.
 *
 * @param {RenderData} event - Data sent from the Streamlit app
 */
function onRender(event) {
  const { args, theme } = event.detail;
  const label = parseTextcompleteLabel(args);
  const css = parseTextcompleteCss(theme);
  const rootElement = window.parent.document.querySelector('#root');
  const textareaElement = window.parent.document.querySelector(
    `textarea[aria-label="${label}"]`
  );

  // Check if Textcomplete is already initialized
  if (textareaElement.textcompleteInitialized) {
    console.warn('Textcomplete already initialized for this textarea.');
    return; // Skip re-initialization
  }

  // Inject default or user-provided CSS into parent iframe's parent document
  const style = document.createElement('style');
  style.innerHTML = document.querySelector('style').innerHTML + '\n' + css;
  window.parent.document.head.appendChild(style);

  const option = parseTextcompleteOption(args);
  option.dropdown.parent = textareaElement.parentElement || rootElement;
  const strategies = parseTextcompleteStrategies(args);

  const editor = new TextareaEditor(textareaElement);
  const textcomplete = new Textcomplete(editor, strategies, option);

  // Mark the textarea as initialized
  textareaElement.textcompleteInitialized = true;
  // Store the Textcomplete options on the textarea element for potential disposal
  textareaElement.setAttribute(
    'data-textcomplete',
    JSON.stringify(event.detail.args.dropdown_option)
  );
  if (!!args.stop_enter_propagation) {
    textareaElement.setAttribute('data-textcomplete-stopenterpropagation', true);
  }
  /**
   * Adjust position of dropdown when rendered
   */
  textcomplete.on('rendered', () => {
    const dropdownElement = textareaElement.parentElement.querySelector(
      '.textcomplete-dropdown'
    );
    dropdownElement.style.top = '4px';
  });
  /**
   * Event handler for 'selected' event
   * @param {string} ename
   * @param {textcompleteCallback} callback
   */
  textcomplete.on('selected', e => {
    const { searchResult } = e.detail;
    const text = textareaElement.value;
    // textareaElement.value += ' ';
    delete searchResult.strategy;
    console.log('Textcomplete selected', searchResult);
    console.log('Text value', text);

    // Create a new InputEvent object with the same properties and methods as the native event object
    const nativeEvent = new InputEvent('textInput', {
      data: ' ',
      bubbles: true,
      cancelable: false,
    });
    Object.defineProperty(nativeEvent, 'target', {
      writable: false,
      value: textareaElement,
    });
    Object.defineProperty(nativeEvent, 'srcElement', {
      writable: false,
      value: textareaElement,
    });
    // Create a new synthetic event object with the same properties and methods as the synthetic event object that is created by React
    const changeEvent = new Event('change', {
      bubbles: true,
      cancelable: false,
    });
    Object.defineProperty(changeEvent, 'target', {
      writable: false,
      value: textareaElement,
    });
    // Attach the synthetic event object to the native event object using the _reactName property
    changeEvent._reactName = 'onChange';
    changeEvent.nativeEvent = nativeEvent;
    // Dispatch the native event object on the textarea element
    rootElement.dispatchEvent(changeEvent);
    textareaElement.dispatchEvent(changeEvent);
    // Streamlit.setComponentValue({ searchResult, text }); // FIXME: updating component causes re-render and resets textarea value by original react component state
  });

  // We tell Streamlit to update our frameHeight after each render event, in
  // case it has changed. (This isn't strictly necessary for the example
  // because our height stays fixed, but this is a low-cost function, so
  // there's no harm in doing it redundantly.)
  Streamlit.setFrameHeight();
}

// Attach our `onRender` handler to Streamlit's render event.
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender);

// Tell Streamlit we're ready to start receiving data. We won't get our
// first RENDER_EVENT until we call this function.
Streamlit.setComponentReady();
