import os
import streamlit as st

# import json
# from streamlit.runtime.caching import cache_data
from textcomplete import (
    TextcompleteResult,
    StrategyProps,
    textcomplete,
)

# from pandas.api.types import ( is_bool_dtype, is_categorical_dtype, is_datetime64_any_dtype, is_numeric_dtype, is_object_dtype, )  # noqa: E501

current_dir = os.path.dirname(os.path.abspath(__file__))
data_dir = os.path.join(current_dir, "textcomplete/frontend/public/assets/data")

if "txt" not in st.session_state:
    st.session_state["txt"] = "Hello, this is textcomplete demo @mr"

original_label: str = "ST Text Area"


def on_change():
    print(st.session_state.txt)


txt: str = st.text_area(
    label=original_label,
    value=st.session_state.txt,
    key="st_text_area_1",
    on_change=on_change,
)

st.write(f"You wrote {len(txt)} characters.")

strategy = StrategyProps(
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


def on_select(textcomplete_result: TextcompleteResult):
    searchResult = textcomplete_result.get("searchResult", "")
    text = textcomplete_result.get("text", "")
    print(searchResult, text)
    st.session_state.txt = text


textcomplete(
    area_label=original_label,
    strategies=[strategy],
    on_select=on_select,
    max_count=5,
    # style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;",
)

# st.write(f"Textcomplete result: {completed}")
