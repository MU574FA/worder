class Wordle {
  constructor(word) {
    this.word = word.trim().toUpperCase();
    this.triesLimit = 5;
    this.triesCount = 0;
    this.wordsList = [];

    // return the count of each item in the list
    this.countItems = (lst) => {
      var res = {};
      for (let i in lst) {
        if (lst[i] in res) {
          res[lst[i]] += 1;
        } else {
          res[lst[i]] = 1;
        }
      }
      return res;
    };

    // check user guess function
    this.check = (guess) => {
      var guess = guess.trim().toUpperCase();
      var result = [];
      var occurance = this.countItems(this.word);

      // if word and guess lengthes does not match
      if (this.word.length != guess.length) {
        return [false, "length_err"];
      }

      // if the guessed word is not in the words list
      if (!this.wordsList.includes(guess)) {
        return [false, guess + " : Not in word list"];
      }

      // check each letter in the guessed word and this.word
      for (let i in this.word) {
        // if the letters are in the same position
        if (this.word[i] == guess[i] && occurance[guess[i]] >= 1) {
          result.push([guess[i], "btn-success"]);
          occurance[guess[i]] -= 1;
          continue;

          // if the letter is in the word but it is in the wrong position
        } else if (this.word.includes(guess[i]) && occurance[guess[i]] >= 1) {
          result.push([guess[i], "btn-warning"]);
          occurance[guess[i]] -= 1;
          continue;

          //else
        } else {
          result.push([guess[i], ""]);
        }
      }

      // check for win
      if ((this.word == guess) & (this.triesCount < this.triesLimit)) {
        this.triesCount += 1;
        gameOver = true;
        return [true, result];
      }

      // check for tries left
      if (this.triesCount >= this.triesLimit) {
        gameOver = true;
        return [false, "ran_out_of_tries_err"];
      }
      // continue
      this.triesCount += 1;
      return [null, result];
    }; // func check()
  } // func constructor()
} // class Wordle{}

// ==========================================|
var word = $("#word").val(); //==============|
var words = $("#words").val().split(","); //=|
var wordle = new Wordle(word); //============|
wordle.wordsList = words; //=================|=======|\
var gameOver = false; //=====================| start | }
//===========================================|=======|/
$("#msg").hide(); //=========================|
$("#reload-game").hide(); //=================|
// ==========================================|
// ==========================================|

function main() {
  if (gameOver) return true;

  // hide message button and reload button
  $("#msg").hide();
  $("#reload-game").hide();

  // get user input
  var userGuess = $("#user-input").val();
  // $("#user-input").val("");
  var check = wordle.check(userGuess);

  // win
  if (check[0] == true) {
    $("#msg").val("Congrats You Won");
    $("#msg").show();
    $("#reload-game").show();
    draw(check);
    gameOver = true;
    return true;

    // error
  } else if (check[0] == false) {
    //----
    if (check[1] == "ran_out_of_tries_err") {
      $("#msg").val(`The word was: ${word}`);
      $("#msg").show();
      $("#reload-game").show();

      //-----
    } else if (check[1] == "length_err") {
      $("#msg").val("Word length err");
      $("#msg").show();

      //-----
    } else {
      $("#msg").val(check[1]);
      $("#msg").show();
    }
    return true;

    // continue
  } else if (check[0] == null) {
    draw(check);
  }
}

// draw the guess to the screen
function draw(check) {
  var row = $(`<div class="row text-center my-2"></div>`);

  for (let i in check[1]) {
    var col = $(
      `<button class="btn mr-1 ${check[1][i][1]}">${check[1][i][0]}</button>`
    );
    row.append(col);
  }

  $("#results").append(row);
  $(`#row-${wordle.triesCount - 1}`).hide();
  return true;
}

// generate empty blocks
function blanks(rows = 5, cols = 5) {
  for (let i = 0; i < rows; i++) {
    // generate rows
    var row = $(`<div class="row text-center my-2" id="row-${i}"></div>`);
    // generate columns
    for (let j = 0; j < cols; j++) {
      var col = $(
        `<button class="btn mr-1" style="color: transparent;">G</button>`
      );
      // append columns to row
      row.append(col);
    }
    // append row to the main element
    $("#blanks").append(row);
  }
  return true;
}

// ===============
blanks();
