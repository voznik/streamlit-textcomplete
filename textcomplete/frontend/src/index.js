/* eslint-disable no-new-func */
import { Streamlit } from './streamlit';
import { Textcomplete } from '@textcomplete/core';
import { TextareaEditor } from '@textcomplete/textarea';
import {} from '@textcomplete/utils';

/**
 * Event handler for textcomplete event
 * @callback textcompleteCallback
 * @param {CustomEvent} e - The event object.
 * @param {Object} e.detail - The detail of the event.
 * @param {import('@textcomplete/core').SearchResult} e.detail.searchResult - The search result.
 */

/**
 * Convert stringified functions back into functions
 * @param {import('@textcomplete/core').StrategyProps} props
 * @param {any[]} data
 * @param {string} key
 */
const convertStrategyProps = (props, data = [], [labelKey, valueKey] = []) => {
  let searchFn = new Function('return ' + props.search)();
  let replaceFn = new Function('return ' + props.replace)();
  let templateFn = props.template && new Function('return ' + props.template)();
  let contextFn = props.context && new Function('return ' + props.context)();
  // If data is provided, create a default search function that filters the data by key
  if (Array.isArray(data) && data.length && labelKey && valueKey) {
    // (Required) When the current input matches the "match" regexp above, this
    // function is called. The first argument is the captured substring.
    // You can callback only once for each search.
    searchFn = (term, callback, match) => {
      const filteredData = data.filter(item =>
        `${item[labelKey]}`.toLowerCase().includes(term.toLowerCase())
      );
      callback(filteredData);
    };
    // (Required) Specify how to update the editor value. The whole substring
    // matched in the match phase will be replaced by the returned value.
    // Note that it can return a string or an array of two strings. If it returns
    // an array, the matched substring will be replaced by the concatenated string
    // and the cursor will be set between first and second strings.
    replaceFn = item => `${item[valueKey]}`;
  }
  return {
    id: props.id,
    index: props.index,
    cache: props.cache,
    match: new RegExp(props.match),
    search: searchFn,
    replace: replaceFn,
    template: templateFn,
    context: contextFn,
  };
};

/**
 * Parse the Textcomplete args
 * @param {any} args
 * @param {any} theme
 * */
//  @returns {import('@textcomplete/core').TextcompleteOption}
const parseTextcompleteArgs = (args, theme) => {
  if (!args.area_label) {
    throw new Error('Textcomplete: No label provided.');
  }
  const label = args.area_label;
  const stopEnterPropagation = args.stop_enter_propagation || false;
  if (!args.strategies || !Array.isArray(args.strategies)) {
    throw new Error('Textcomplete: No strategies provided.');
  }
  const strategies = args.strategies.map(s =>
    convertStrategyProps(s, s.data, s.comparatorKeys)
  );
  if (!strategies.length) {
    console.warn('Textcomplete: No strategies provided. There will be no autocomplete.');
  }
  const option = {
    dropdown: Object.assign({}, args.dropdown_option),
  };
  const variables = `
  :root {
    --background-color: ${theme.backgroundColor};
    --secondary-background-color: ${theme.secondaryBackgroundColor};
    --text-color: ${theme.textColor};
    --primary-color: ${theme.primaryColor};
  };
  `;
  const css = variables;
  return { label, strategies, option, stopEnterPropagation, css };
};

/**
 * The component's render function. This will be called immediately after
 * the component is initially loaded, and then again every time the
 * component gets new data from Python.
 *
 * @param {RenderData} event - Data sent from the Streamlit app
 */
function onRender(event) {
  // Get the RenderData from the event
  const { label, strategies, option, stopEnterPropagation, css } = parseTextcompleteArgs(
    event.detail.args,
    event.detail.theme
  );

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

  // const parent = findParentByTestId(textareaElement, 'element-container');
  option.dropdown.parent =
    textareaElement.parentElement || window.parent.document.querySelector('#root');

  const editor = new TextareaEditor(textareaElement);
  const textcomplete = new Textcomplete(editor, strategies, option);

  // Mark the textarea as initialized
  textareaElement.textcompleteInitialized = true;
  // Store the Textcomplete options on the textarea element for potential disposal
  textareaElement.setAttribute(
    'data-textcomplete',
    JSON.stringify(event.detail.args.dropdown_option)
  );
  if (stopEnterPropagation) {
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
    delete searchResult.strategy;
    console.log('Textcomplete selected', searchResult);
    console.log('Text value', text);
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
