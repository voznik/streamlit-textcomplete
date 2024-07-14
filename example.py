import json
import os
from typing import Dict, List
import streamlit as st
from streamlit.runtime.caching import cache_data
from textcomplete import (
    Textcomplete,
    TextcompleteOption,
    StrategyProps,
    textcomplete,
)

# from pandas.api.types import ( is_bool_dtype, is_categorical_dtype, is_datetime64_any_dtype, is_numeric_dtype, is_object_dtype, )  # noqa: E501

current_dir = os.path.dirname(os.path.abspath(__file__))
data_dir = os.path.join(current_dir, "textcomplete/frontend/public/assets/data")


def on_select(value):
    print(value)


original_label = "ST Text Area"

txt = st.text_area(
    value="""It was the best of times, it was the worst of times,
it was the age of wisdom,
it was the age of foolishness,
it was the epoch of belief,
it was the epoch of incredulity,
it was the season of Light,
it was the season of Darkness,
it was the spring of hope,
it was the winter of despair (...)""",
    key="st_text_area_1",
    label=original_label,
)

st.write(f"You wrote {len(txt)} characters.")

textcomplete(
    area_label=original_label,
    on_select=on_select,
    max_count=5,
    # style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;",
)
