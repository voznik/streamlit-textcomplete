import os

# import pyarrow as pa
# from streamlit.proto.Components_pb2 import SpecialArg
# from streamlit.elements import arrow
from typing import (  # noqa: F401,E501
    Any,
    Callable,
    Dict,
    Generic,
    List,
    Literal,
    Optional,
    TypedDict,
    TypeVar,
    Tuple,
    Union,
)

import pandas as pd
import streamlit.components.v1 as components
from streamlit import session_state as ss  # noqa: F401
from streamlit.elements.widgets.text_widgets import (  # noqa: F401
    Key,
    LabelVisibility,
    SupportsStr,
    TextWidgetsMixin,
    WidgetArgs,
    WidgetCallback,
    WidgetKwargs,
)
from streamlit.runtime.caching import cache_data  # noqa: F401

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


class SearchResult(TypedDict):
    data: Any
    term: str


class TextcompleteResult(TypedDict):
    searchResult: SearchResult
    text: str


class StrategyProps:
    """_summary_

    ```typescript
      type ReplaceResult = [string, string] | string | null;
    export interface StrategyProps<T = any> {
        match: RegExp | ((regexp: string | RegExp) => RegExpMatchArray | null);
        search: (term: string, callback: SearchCallback<T>, match: RegExpMatchArray) => void;
        replace: (data: T) => ReplaceResult;
        cache?: boolean;
        context?: (text: string) => string | boolean;
        template?: (data: T, term: string) => string;
        index?: number;
        id?: string;
    }
    ```
    """

    def __init__(
        self,
        match: str = None,
        search: str = None,
        replace: str = None,
        cache: bool = False,
        context: str = None,
        template: str = None,
        index: str = None,
        id: str = None,
        data: List[Dict[str, Any]] | pd.DataFrame = None,
        comparator_keys: List[str] = None,
    ) -> None:
        self.match = match
        self.search = search
        self.replace = replace
        self.cache = cache
        self.context = context
        self.template = template
        self.index = index
        self.id = id
        self.data = data
        self.comparator_keys = comparator_keys if comparator_keys is not None else []

    def to_dict(self) -> Dict[str, Any]:
        result = {
            "match": self.match,
            "search": self.search,
            "replace": self.replace,
            "cache": self.cache,
            "context": self.context,
            "template": self.template,
            "index": self.index,
            "id": self.id,
            "comparatorKeys": self.comparator_keys,
        }

        if isinstance(self.data, pd.DataFrame):
            result["data"] = self.data.to_dict(orient="records")
        else:
            result["data"] = self.data

        return result


def textcomplete(
    area_label: str,
    strategies: List[StrategyProps],
    on_select: WidgetCallback | None = None,
    class_name: str = "dropdown-menu textcomplete-dropdown",
    item_class_name: str = "textcomplete-item",
    item_class_name_active: str = "textcomplete-item active",
    footer: str | None = None,
    header: str | None = None,
    max_count: int = 10,
    placement: Literal["auto"] | Literal["top"] | Literal["bottom"] = "bottom",
    rotate: bool = False,
    stop_enter_propagation: bool = False,
    dynamic_width: bool = True,
    dropdown_style: str = "",
    args: Optional[Tuple] = tuple(),
) -> Optional[TextcompleteResult]:
    # Call through to our private component function. Arguments we pass here
    # will be sent to the frontend, where they'll be available in an "args"
    # dictionary.
    #
    # "default" is a special argument that specifies the initial return
    # value of the component before the user has interacted with it.

    dropdown_option = {
        "className": class_name,
        "footer": footer,
        "header": header,
        "maxCount": max_count,
        "placement": placement,
        "rotate": rotate,
        "style": dropdown_style,
        "dynamicWidth": dynamic_width,
        "item": {
            "className": item_class_name,
            "activeClassName": item_class_name_active,
        },
    }

    result = _textcomplete(
        area_label=area_label,
        strategies=[strategy.to_dict() for strategy in strategies],
        dropdown_option=dropdown_option,
        stop_enter_propagation=stop_enter_propagation,
    )

    if on_select and result:
        on_select(result, *args)

    # We could modify the value returned from the component if we wanted.
    # There's no need to do this in our simple example - but it's an option.
    # return result


__title__ = "Streamlit Textcomplete"
__desc__ = "Streamlit autocomplete Textcomplete editor for HTMLTextAreaElement"
__icon__ = "📝"
# __examples__ = [example]
__author__ = "voznik"
__streamlit_cloud_url__ = "https://textcomplete.streamlitapp.com/"
__github_repo__ = "voznik/streamlit-textcomplete"
