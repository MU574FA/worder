from flask import Flask, request, jsonify, render_template, send_file
from worder import Worder, wordle, wordsFilePath

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html", apiLink="/words")


@app.route("/words", methods=["POST"])
def worder():
    data  = request.form
    words = set(Worder(**data).find)
    return jsonify({"words": sorted(words)[:100]})


@app.route("/wordle")
def wordle_index():
    data = wordle()
    return render_template("wordle.html", word=data.get("word"), words=','.join(data.get("wordsList")))


@app.route("/wordslist")
def wordsList():
    return send_file(wordsFilePath)



if __name__ == "__main__":
    app.run(debug=True)