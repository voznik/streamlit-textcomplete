# Streamlit Textcomplete - Autocomplete text in any textarea

Streamlit Textcomplete is a custom Streamlit component designed to enhance text input fields with autocomplete functionality. It leverages the powerful `textcomplete` library to provide users with a seamless and intuitive autocomplete experience within Streamlit applications.

## Demo

[demo](https://textcomplete.streamlit.app/)

![Example Screencast](https://github.com/voznik/streamlit-textcomplete/blob/2277ab7b1589f2dd15b53e564e29b7c2e95191d0/screencast.gif?raw=true)


## Features

- **Autocomplete for Text Areas**: Enhance textarea in Streamlit with autocomplete functionality, making data input faster and more accurate.
- **Customizable Strategies**: Define your own strategies for text autocomplete, including username mentions, emoji suggestions, and more.
- **Easy Integration**: Seamlessly integrates with existing Streamlit applications with minimal setup.
- **Flexible and Extensible**: Easily extend the component to support additional autocomplete strategies as per your application's needs.

## Installation

To install Streamlit Textcomplete, run the following command in your terminal:

```sh
pip install streamlit-textcomplete
```

## Usage

To use Streamlit Textcomplete in your Streamlit application, follow these steps:

1. Import the [`textcomplete`] function from the package.
2. Define your autocomplete (multiple) strategies.
3. Define standard streamlit textarea but give it a defined label
4. Initialize the textcomplete component with this label & your strategies.

Example:

```python
import streamlit as st
from textcomplete import textcomplete, StrategyProps

original_label: str = "Textcomplete Example"
txt: str = st.text_area(
    label=original_label,
    key="st_text_area_1",
)
# Define your autocomplete strategies
username_strategy = StrategyProps(
    id="userFullName",
    match="\\B@(\\w*)$",
    search=async_search_function,  # Define your async search function as JS string
    replace="([fullName]) => `${fullName}`",
    template="([fullName]) => `🧑🏻 ${fullName}`",
)

# Initialize the textcomplete component
textcomplete(
    area_label=original_label,
    strategies=[username_strategy],
    max_count=5,
    # Additional options ...
)
```

## Development

To contribute to the development of Streamlit Textcomplete, you can set up a development environment by cloning the repository and installing the dependencies.

```sh
git clone https://github.com/voznik/streamlit-textcomplete.git
cd streamlit-textcomplete
pip install -r requirements.txt
```

## Testing

Run the tests to ensure everything is working as expected:

```sh
pytest
```

## License

Streamlit Textcomplete is MIT licensed, as found in the [LICENSE](LICENSE) file.

## Acknowledgments

- This project is built using the [Textcomplete](https://yuku.takahashi.coffee/textcomplete/) library.
- Special thanks to the Streamlit community for their support and contributions.

