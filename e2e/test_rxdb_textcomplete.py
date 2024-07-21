import json
from pathlib import Path

import pytest
from e2e_utils import StreamlitRunner
from playwright.sync_api import Page, expect

ROOT_DIRECTORY = Path(__file__).parent.parent.absolute()
BASIC_EXAMPLE_FILE = ROOT_DIRECTORY / "textcomplete" / "example.py"


@pytest.fixture(autouse=True, scope="module")
def streamlit_app():
    with StreamlitRunner(BASIC_EXAMPLE_FILE, 8502) as runner:
        yield runner


@pytest.fixture(autouse=True, scope="function")
def go_to_app(page: Page, streamlit_app: StreamlitRunner):
    page.goto(streamlit_app.server_url)
    # Wait for app to load
    page.get_by_role("img", name="Running...").is_hidden()


def test_should_render_textcomplete(page: Page):
    st_text_area = page.get_by_label("Streamlit Autocomplete")
    expect(st_text_area).to_be_visible()
    # Retrieve the value of the "data-textcomplete" attribute
    data_textcomplete_value = st_text_area.get_attribute("data-textcomplete")

    # Parse the JSON value
    assert isinstance(
        json.loads(data_textcomplete_value), dict
    ), "'data-textcomplete' is not a valid JSON object"

    # Append "s" to the textarea to trigger the dropdown
    st_text_area.focus()
    st_text_area.evaluate("e => e.setSelectionRange(-1, -1)")
    st_text_area.type("s")
    # Wait for the dropdown to become visible
    dropdown = page.query_selector("ul.textcomplete-dropdown")
    dropdown.wait_for_element_state("visible")
    # Find li element in dropdown
    dropdown_li = dropdown.query_selector("li.textcomplete-item")
    assert dropdown_li.inner_text() == "🧑🏻 Mrs. Dennis Schulist"
    dropdown_li.press("Enter")
    dropdown.wait_for_element_state("hidden")
    assert st_text_area.input_value() == "Hello, this is textcomplete demo Mrs. Dennis Schulist"
    # Append space to the textarea to make original react component state updated
    st_text_area.type(" ")
    st_text_area.blur()
    assert st_text_area.input_value() == "Hello, this is textcomplete demo Mrs. Dennis Schulist "
