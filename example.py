import streamlit as st
import pandas as pd
from emoji.unicode_codes.data_dict import EMOJI_DATA

# from streamlit.runtime.caching import cache_data
from textcomplete import (
    TextcompleteResult,
    StrategyProps,
    textcomplete,
)

username_strategy = StrategyProps(
    id="userFullName",
    match="\\B@(\\w*)$",
    search="""async (term, callback) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  const filteredUsers = users.filter(user =>
    `${user.name}`.toLowerCase().includes(term.toLowerCase())
  );
  callback(filteredUsers.map(user => [user.name]));
}
""",
    replace="""([fullName]) => `${fullName}`""",
    template="""([fullName]) => `🧑🏻 ${fullName}`""",
)

emoji_data = [
    {"name": properties["en"], "value": unicode_repr}
    for unicode_repr, properties in EMOJI_DATA.items()
]
# Example of strategy with default search & replace functions provided by the component
# if search_data list is provided
emoji_strategy = StrategyProps(
    id="emoji",
    match="\\B:(\\w*)$",
    data=emoji_data,
    comparator_keys=["name", "value"],
    template="""(emoji) => `${emoji['value']} :${emoji['name']}`""",
)

col1, col2 = st.columns(2, gap="medium")


if "txt" not in st.session_state:
    st.session_state["txt"] = "Hello, this is textcomplete demo @mr"


def on_change():
    print(st.session_state.txt)


def on_select(textcomplete_result: TextcompleteResult):
    searchResult = textcomplete_result.get("searchResult", "")
    text = textcomplete_result.get("text", "")
    print(searchResult, text)


with col1:
    st.header("Example: `st.text_area` with Autocomplete")
    original_label: str = "Streamlit Autocomplete Textcomplete Example"
    txt: str = st.text_area(
        label=original_label,
        help="Type @ to see the user list, type : to see the emoji list",
        value=st.session_state.txt,
        key="st_text_area_1",
        on_change=on_change,
    )
    st.caption("Type @ to see the user list, type : to see the emoji list")
    st.caption(f"You wrote {len(txt)} characters.")
    st.write(
        """:orange[⚠️ IMPORTANT: Always type a space after autocomplete.
    There's no way to update streamlit react component state event though textarea value is updated :( ]"""
    )

    textcomplete(
        area_label=original_label,
        strategies=[username_strategy, emoji_strategy],
        on_select=on_select,
        max_count=5,
    )

with col2:
    st.header("Example: `st.chat_input` with Autocomplete")
    chat_input_label = "Chat Input"
    messages = st.container(height=300)
    if prompt := st.chat_input(
        placeholder=chat_input_label,
        key="st_chat_input_1",
        on_submit=on_change,
    ):
        messages.chat_message("user").write(prompt)
        messages.chat_message("assistant").write(f"Echo: {prompt}")
    # data-testid="stChatInputTextArea"
    textcomplete(
        area_label=chat_input_label,
        strategies=[username_strategy, emoji_strategy],
        on_select=on_select,
        max_count=10,
        placement="bottom",
    )

st.markdown(
    """# Streamlit Autocomplete Text with Textcomplete

## Vendor

https://yuku.takahashi.coffee/textcomplete/

## Usage
To use textcomplete, you have to create a Textcomplete object with an editor:

## How it works
(An input event is triggered to the underlying HTML element.)
The editor emits a change event.
For each registered strategy:
[Context phase] Test context (Optional).
[Match phase] Try extracting a search term. If it fails, continue to the next strategy.
[Search phase] Gather candidates using the search term. The way how to gather them is completely up to you.
[Render phase] Show a dropdown UI rendering the candidates.
When user selects a dropdown item by either clicking it or pushing an enter key, the editor's value is updated.
Strategy
A strategy object represents a rule of autocompletion. The match, search and replace keys are required.
```
// This is a sample strategy that autocompletes GitHub-style emoji notation.
// This document page is using almost the same strategy for demo.
{
  // (Optional) Identifier of the strategy. Will be appear on data-strategy
  // attribute of a dropdown element.
  id: "mention",

  // (Optional) This function is called on every change before matching. The
  // first argument is the string from head to cursor. If it returns `false`,
  // following matching phase isn't started.
  context: (beforeCursor: string) =>
    // Return false if the cursor is in code block or inline code notation
    // to stop executing the matching phase.
    !isInClode(beforeCursor),

  // (Required) On every change, the string from head to cursor tests with the
  // RegExp. If it matches, the captured substring will be passed to the search
  // parameter's first argument.
  // See also "index" parameter.
  match: /\B:([\-+\w]*)$/,

  // (Optional) Specify the index of target capture group. Default to 1.
  index: 1,

  // (Required) When the current input matches the "match" regexp above, this
  // function is called. The first argument is the captured substring.
  // You can callback only once for each search.
  search: async (
    term: string,
    callback: (results: ResultType[]) => void,
    match: RegExpMatchArray
  ) => {
    callback(await gatherCandidates(term))
  },

  // (Optional) Whether the search results are cached. Default false.
  cache: false,

  // (Optional) Specify how to render each search result on the dropdown UI.
  // The argument is an element of the search results callbacked in the search
  // phase.
  template: ([key, url]) =>
    `<img src="${url}"/>&nbsp;<small>${key}</small>`,

  // (Required) Specify how to update the editor value. The whole substring
  // matched in the match phase will be replaced by the returned value.
  // Note that it can return a string or an array of two strings. If it returns
  // an array, the matched substring will be replaced by the concatenated string
  // and the cursor will be set between first and second strings.
  replace: (result: ResultType): string => `:${result[0]}: `
}
```

## Option
An option object affects rest of behavior.
```
// Default option. All properties are optional recursively.
{
  // Configure a dropdown UI.
  dropdown: {
    // Class attribute of the dropdown element.
    className: "dropdown-menu textcomplete-dropdown",

    // The maximum number of items to be rendered.
    maxCount: 10,

    // Placement of the dropdown. "auto", "top" or "bottom".
    placement: "auto",

    // Return header and footer elements' content
    header: (results: ResultType[]) => "",
    footer: (results: ResultType[]) => "",

    // Whether activate the opposite side item on pressing up or
    // down key when an edge item is active.
    rotate: false,

    // Configure CSS style of the dropdown element.
    style: { display: "none", position: "absolute", zIndex: "1000" },

    // The parent node of the dropdown element.
    parent: document.body,

    item: {
      // Class attribute of the each dropdown item element.
      className: "textcomplete-item",

      // Active item's class attribute.
      activeClassName: "textcomplete-item active",
    }
  }
}
```
"""
)  # noqa: F401
