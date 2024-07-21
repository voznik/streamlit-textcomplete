/**
 * Convert stringified functions back into functions
 * @param {import('@textcomplete/core').StrategyProps} props
 * @param {any[]} data
 * @param {string} key
 */
export const convertStrategyProps = (props, data = [], [labelKey, valueKey] = []) => {
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
export const parseTextcompleteArgs = (args, theme) => {
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
