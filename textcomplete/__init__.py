import os

from typing import Any, Callable, Dict, List, Optional, Union, overload  # noqa: F401,E501
import pandas as pd
import streamlit as st
import streamlit.components.v1 as components
from streamlit.elements.widgets.text_widgets import (
    LabelVisibility,
    WidgetCallback,
    WidgetArgs,
    WidgetKwargs,
    Key,
    SupportsStr,
    TextWidgetsMixin,
)
from streamlit import session_state as ss  # noqa: F401

# from streamlit.elements.widgets import WidgetCallback
from streamlit.runtime.caching import cache_data

# Create a _RELEASE constant. We'll set this to False while we're developing
# the component, and True when we're ready to package and distribute it.
_RELEASE = True

parent_dir = os.path.dirname(os.path.abspath(__file__))
if not _RELEASE:  # NOSONAR
    # _textcomplete = components.declare_component( "textcomplete", url="http://localhost:4201", )
    path = os.path.join(parent_dir, "frontend/src")
else:
    path = os.path.join(parent_dir, "frontend/build")

index_js_path = os.path.join(path, "index.js")
_textcomplete = components.declare_component("textcomplete", path=path)

DEFAULT_CONFIG = {
    "name": "streamlit-rxdb",
    "options": {"storageType": "dexie"},
    "multiInstance": False,
    "ignoreDuplicate": True,
}


class Textcomplete:
    def __init__(self, strategies, trigger_immediately=None, option=None, focus=None):
        self.trigger_immediately = trigger_immediately
        self.strategies = strategies
        self.option = option
        self.focus = focus


class StrategyProps:
    # Define the properties of StrategyProps here
    pass


class TextcompleteOption:
    # Define the properties of TextcompleteOption here
    pass


@cache_data
def get_dataframe_by_schema(schema: dict) -> pd:
    """
    Create a `pandas.DataFrame` based on the given JSONSchema.
    """
    df = pd.DataFrame()
    properties = schema.get("properties", {})
    for column, prop in properties.items():
        if prop["type"] == "string" and prop.get("format") == "date-time":
            df[column] = pd.Series(dtype="datetime64[ns]")
        elif prop["type"] == "string":
            df[column] = pd.Series(dtype="object")
        elif prop["type"] == "boolean":
            df[column] = pd.Series(dtype="bool")
        elif prop["type"] == "object":
            df[column] = pd.Series(dtype="category")
        elif prop.get("enum") and len(prop["enum"]) > 0:
            df[column] = pd.Series(dtype="category")
        elif prop["type"] == "integer" and prop.get("format") == "time":
            df[column] = pd.Series(dtype="int")  # pd.Timestamp.now()
        elif prop["type"] == "integer":
            df[column] = pd.Series(dtype="int")
        elif prop["type"] == "number":
            df[column] = pd.Series(dtype="float")
    return df


def _textcomplete_fn(
    # self,
    label: str,
    value: str = "",
    height: int | None = None,
    max_chars: int | None = None,
    key: Key | None = None,
    help: str | None = None,
    on_change: WidgetCallback | None = None,
    args: WidgetArgs | None = None,
    kwargs: WidgetKwargs | None = None,
    *,  # keyword-only arguments:
    placeholder: str | None = None,
    disabled: bool = False,
    label_visibility: LabelVisibility = "visible",
) -> str:
    print("textcomplete")


@overload
def textcomplete(
    # self,
    label: str,
    value: SupportsStr | None = None,
    height: int | None = None,
    max_chars: int | None = None,
    key: Key | None = None,
    help: str | None = None,
    on_change: WidgetCallback | None = None,
    args: WidgetArgs | None = None,
    kwargs: WidgetKwargs | None = None,
    *,  # keyword-only arguments:
    placeholder: str | None = None,
    disabled: bool = False,
    label_visibility: LabelVisibility = "visible",
) -> str | None:
    pass


def textcomplete(
    # self,
    label: str,
    value: SupportsStr | None = None,
    height: int | None = None,
    max_chars: int | None = None,
    key: Key | None = None,
    help: str | None = None,
    on_change: WidgetCallback | None = None,
    args: WidgetArgs | None = None,
    kwargs: WidgetKwargs | None = None,
    *,  # keyword-only arguments:
    placeholder: str | None = None,
    disabled: bool = False,
    label_visibility: LabelVisibility = "visible",
) -> str | None:
    # Call through to our private component function. Arguments we pass here
    # will be sent to the frontend, where they'll be available in an "args"
    # dictionary.
    #
    # "default" is a special argument that specifies the initial return
    # value of the component before the user has interacted with it.
    component_value = _textcomplete(label=label, key=key)

    # We could modify the value returned from the component if we wanted.
    # There's no need to do this in our simple example - but it's an option.
    return component_value


__title__ = "Streamlit Textcomplete"
__desc__ = "Textcomplete editor for HTMLTextAreaElement."
__icon__ = "🏦"
# __examples__ = [example]
__author__ = "voznik"
__streamlit_cloud_url__ = "https://st-textcomplete.streamlitapp.com/"
__github_repo__ = "voznik/streamlit-textcomplete"
