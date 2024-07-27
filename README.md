# Worder: the best word finder ever | WebApp + API.

This is a Flask-based web application that provides a word searching and filtering API, along with a basic implementation of a Wordle-like game.

## Requirements

Make sure you have the required dependencies installed. You can do this by running:

```bash
pip install -r requirements.txt
```

## Project Structure

```
.
├── main.py
├── worder.py
├── templates
│   ├── index.html
│   └── wordle.html
├── words-en.csv
├── requirements.txt
└── README.md
```

## Running the Application

To start the Flask server, run:

```bash
waitress-serve --host=127.0.0.1 --port=5000 main:app
```
OR
```bash
python main.py
```

The server will be accessible at `http://127.0.0.1:5000/`.

## Endpoints

### GET /

Renders the home page with a link to the `/words` API endpoint.

### POST /words

Accepts form data with word filtering criteria and returns a JSON response with up to 100 words matching the criteria.

**Example Request:**

On Linux
```bash
curl -X POST http://127.0.0.1:5000/words -d "length=3&startsWith=c&endsWith=t"
```

On Windows
```powershell
Invoke-WebRequest -Uri "http://127.0.0.1:5000/words" -Method Post -Body @{length="3"; startsWith="c"; endsWith="t"}
```


**Example Response:**

```json
{
  "words": ["APPLE", "ALONE", "ARGUE", ...]
}
```

### GET /wordslist

Sends the `words-en.csv` file containing the list of words.

## Worder Class

The `Worder` class provides various methods to filter words based on given criteria.

### Initialization

```python
Worder(
    length=0,
    startsWith="",
    xstartsWith="",
    endsWith="",
    xendsWith="",
    includes="",
    excludes="",
    wildcard="",
    xwildcard=""
)
```

### Properties and Methods

- `__words`: Reads and yields words from the `words-en.csv` file.
- `__length(word)`: Filters words by length.
- `__stratswith(word)`: Filters words that start with a specified prefix.
- `__xstratswith(word)`: Excludes words that start with a specified prefix.
- `__endswith(word)`: Filters words that end with a specified suffix.
- `__xendswith(word)`: Excludes words that end with a specified suffix.
- `__includes(word)`: Filters words that include all specified characters.
- `__excludes(word)`: Excludes words that include any of the specified characters.
- `__wildcard(word)`: Filters words that match a wildcard pattern.
- `__xwildcard(word)`: Excludes words that match any of the specified wildcard patterns.
- `find`: Finds words that match the given criteria.

---

This documentation should provide a clear overview of your project, its structure, how to run it, and details about the API endpoints and the `Worder` class.
