import os

from typing import Any, Callable, Dict, List, Literal, Optional, Union, overload  # noqa: F401,E501
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


def textcomplete(
    area_label: str,
    height: int | None = None,
    on_select: WidgetCallback | None = None,
    class_name: str = "dropdown-menu textcomplete-dropdown",
    item_class_name: str = "textcomplete-item",
    item_class_name_active: str = "textcomplete-item active",
    footer: str | None = None,
    header: str | None = None,
    max_count: int = 10,
    placement: Literal["auto"] | Literal["top"] | Literal["bottom"] = "bottom",
    rotate: bool = False,
    # style: str | None = None, # TODO: CSSStyleDeclaration
    dynamic_width: bool = True,
    css: str = "",
) -> str | None:
    # Call through to our private component function. Arguments we pass here
    # will be sent to the frontend, where they'll be available in an "args"
    # dictionary.
    #
    # "default" is a special argument that specifies the initial return
    # value of the component before the user has interacted with it.

    dropdown_option = {
        "height": height,
        "className": class_name,
        "footer": footer,
        "header": header,
        "maxCount": max_count,
        "placement": placement,
        "rotate": rotate,
        # "style": style,
        "dynamicWidth": dynamic_width,
        "item": {
            "className": item_class_name,
            "activeClassName": item_class_name_active,
        },
    }

    component_value = _textcomplete(
        area_label=area_label, dropdown_option=dropdown_option, css=css, default=""
    )

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
