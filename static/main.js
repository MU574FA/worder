var apiLink = $("#apiLink").val();
var easterCount = 0;

function help() {
  $("#help").toggle();
}

function getWords() {
  var length = $("input[name='length']").val();
  var starts = $("input[name='starts']").val();
  var xstarts = $("input[name='xstarts']").val();
  var ends = $("input[name='ends']").val();
  var xends = $("input[name='xends']").val();
  var includes = $("input[name='includes']").val();
  var excludes = $("input[name='excludes']").val();
  var wildcard = $("input[name='wildcard']").val();
  var xwildcard = $("input[name='xwildcard']").val();

  var wordsContainer = $("#words");

  wordsContainer.html(`<progress class="progress w-56"></progress>`);

  $.ajax({
    url: apiLink,
    type: "POST",
    data: {
      length: length,
      startsWith: starts,
      xstartsWith: xstarts,
      endsWith: ends,
      xendsWith: xends,
      includes: includes,
      excludes: excludes,
      wildcard: wildcard,
      xwildcard: xwildcard,
    },

    success: (data) => {
      // clear the previous results
      wordsContainer.html("");

      // show "Clear All" button
      $("input[name=clear]").removeClass("invisible");

      // check if there is words at all
      if (data.words.length == 0) {
        wordsContainer.append(
          `<div class='alert alert-error'>No Words Found!</div>`
        );
      }
      // loop through the words and append them the results container
      for (word in data.words) {
        wordsContainer.append(
          `<span class="badge badge-warning m-1 p-2 rounded">${data.words[
            word
          ].toLowerCase()}</span>`
        );
      }
    },
  });
}

function clearAll() {
  $("input[name='length']").val("");
  $("input[name='starts']").val("");
  $("input[name='xstarts']").val("");
  $("input[name='ends']").val("");
  $("input[name='xends']").val("");
  $("input[name='includes']").val("");
  $("input[name='excludes']").val("");
  $("input[name='wildcard']").val("");
  $("input[name='xwildcard']").val("");
  $(".container::last").html("");
  $("input[name=clear]").addClass("invisible");
}

function easter() {
  if (easterCount >= 4) {
    window.open("/wordle");
  } else {
    easterCount++;
  }
}
