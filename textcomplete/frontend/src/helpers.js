import Fuse from 'fuse.js/basic';

const validateAndConvertFunction = (fnString, fnName) => {
  if (fnString && typeof fnString === 'string' && fnString.trim() !== '') {
    try {
      const fn = new Function('return ' + fnString)();
      if (typeof fn !== 'function') {
        throw new Error(`${fnName} is not a valid function`);
      }
      return fn;
    } catch (error) {
      throw new Error(`Invalid ${fnName} function: ` + error.message);
    }
  } else {
    throw new Error(`${fnName} is not a valid string or is empty`);
  }
};

const DEFAULT_FUSE_OPTIONS = { keys: ['name'] };
const DEFAULT_NOOP_FN = `() => []`;

/**
 * Convert stringified functions back into functions
 * @param {import('@textcomplete/core').StrategyProps} props
 * @param {any[]} data
 * @param {string} key
 */
export const convertStrategyProps = ({
  id,
  index,
  cache,
  match,
  search,
  replace,
  template,
  context,
  data = [],
  fuseOptions,
}) => {
  let searchFn = validateAndConvertFunction(search || DEFAULT_NOOP_FN, 'search');
  let replaceFn = validateAndConvertFunction(replace, 'replace');
  let templateFn = validateAndConvertFunction(template, 'template');
  let contextFn = context && new Function('return ' + context)();
  // If data is provided, create a default search function that uses Fuse.js to search the data
  if (Array.isArray(data) && data.length) {
    const fuse = new Fuse(data, fuseOptions || DEFAULT_FUSE_OPTIONS);
    // (Required) When the current input matches the "match" regexp above, this
    // function is called. The first argument is the captured substring.
    // You can callback only once for each search.
    searchFn = (term, callback) => {
      const result = fuse.search(term).map(result => result.item);
      callback(result);
    };
  }
  return {
    id: id,
    index: index,
    cache: cache,
    match: new RegExp(match),
    search: searchFn,
    replace: replaceFn,
    template: templateFn,
    context: contextFn,
  };
};

export const parseTextcompleteStrategies = args => {
  if (!args.strategies || !Array.isArray(args.strategies)) {
    throw new Error('Textcomplete: No strategies provided.');
  }
  const strategies = args.strategies.map(s => convertStrategyProps(s));
  if (!strategies.length) {
    console.warn('Textcomplete: No strategies provided. There will be no autocomplete.');
  }
  return strategies;
};

export const parseTextcompleteOption = args => {
  return {
    dropdown: Object.assign({}, args.dropdown_option),
  };
};

export const parseTextcompleteLabel = args => {
  if (!args.area_label) {
    throw new Error('Textcomplete: No label provided.');
  }
  return args.area_label;
};

export const parseTextcompleteCss = theme => {
  return `
  :root {
    --background-color: ${theme.backgroundColor};
    --secondary-background-color: ${theme.secondaryBackgroundColor};
    --text-color: ${theme.textColor};
    --primary-color: ${theme.primaryColor};
  };
  `;
};
