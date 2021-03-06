/*
 * Hangman!
 * Michael Stange
 * UCSD Coding Boot Camp - Assignment #3
 */

var wins = 0;
var losses = 0;
var guesses = 6;                
var guessedLetters = [];
var guessesString = "";
var emptyWord = [];
var userWord = [];

var letters = [ "a", "b", "c", "d", "e", "f", "g",
                "h", "i", "j", "k", "l", "m", "n",
                "o", "p", "q", "r", "s", "t", "u",
                "v", "w", "x", "y", "z" ];

var words = [   "alabama", "alaska", "arizona", "arkansas", "california",
                "colorado", "connecticut", "delaware", "florida", "georgia",
                "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas",
                "kentucky", "louisiana", "maine", "maryland", "massachusetts",
                "michigan", "minnesota", "mississippi", "missouri", "montana",
                "nebraska", "nevada", "new hampshire", "new jersey",
                "new mexico", "new york", "north carolina", "north dakota", 
                "ohio", "oklahoma", "oregon", "pennsylvania", "rhode island",
                "south carolina", "south dakota", "tennessee", "texas", "utah",
                "vermont", "virginia", "washington", "west virginia",
                "wisconsin", "wyoming"   ]

function buildEmptyWord() {

    emptyWord = [];

    for (var i = 0; i < wordToGuess.length; i++) {
        emptyWord[i] = "_";
    }
}

function buildIndexes(guess) {

    var arrayOfIndexes = [];

    for (var i = 0; i < wordToGuess.length; i++) {

        if(wordToGuess.charAt(i) === guess) {
            arrayOfIndexes.push(i)
        }
    }

    return (arrayOfIndexes);
}

function handleSpaces() {

    if(wordToGuess.includes(" ") !== -1) {
        var indexes = buildIndexes(" ");
    }

    for(var i = 0; i < indexes.length; i++) {
        emptyWord[indexes[i]] = " ";
    }
}

// reset function for new game
function reset() {

    guessedLetters = [];
    guessesString = "";
    guesses = 6;
    wordToGuess = words[Math.floor(Math.random() * words.length)];
    buildEmptyWord();
    handleSpaces();

    // Refresh display
    var refreshedHTML =  "<p>Wins: " + wins + "</p>" +
                            "<p>Losses: " + losses + "</p>" +
                            "<p>Guesses Left: 6</p>";

    $("#status").html(refreshedHTML);
    $("#guesses-used").html("<p>Your Guesses so far: </p>");

    // reset hangman image
    document.getElementById("hangman-image").src = "assets/images/hangman-6.png";

    $("#word-to-guess").html(emptyWord);
}

// wait for any key to start
document.onkeyup = function(event) {

    // Determines which key was pressed.
    var userGuess = event.key;


    // check for valid input
    if (letters.indexOf(userGuess) === -1) {

        alert("Input must be a letter!");
    }

    else {
        
        // if letter has not already been guessed
        if (guessedLetters.indexOf(userGuess) === -1) {

            // if userGuess is not in wordToGuess
            if (!wordToGuess.includes(userGuess)) {

                guesses--;

                var imageLink = "assets/images/hangman-";
                imageLink = imageLink.concat(guesses);
                imageLink = imageLink.concat(".png");

                document.getElementById("hangman-image").src = imageLink;
            }

            // userGuess is in wordToGuess
            else {

                // get indexes of occurrences of userGuess in wordToGuess
                var indexes = buildIndexes(userGuess); 

                // use indexes to update the emptyWord array
                for(i = 0; i < indexes.length; i++) {
                    emptyWord[indexes[i]] = userGuess;
                }

                // overwrite the emptyWord
                $("#word-to-guess").html(emptyWord);

            }

            // add guess to guessedLetters
            guessedLetters.push(userGuess);

            // if this is not the first guessed letter...
            if (guessesString.length) {

                // ...add ", "before guessed letter
                guessesString = guessesString.concat(", ");
            }

            // add guess to the string of guesses
            guessesString = guessesString.concat(userGuess);

            // build text to display in the div #game
            var updatedHTML =  "<p>Wins: " + wins + "</p>" +
                                "<p>Losses: " + losses + "</p>" +
                                "<p>Guesses Left: " + guesses + "</p>";

            $("#status").html(updatedHTML);
            $("#guesses-used").html("<p>Your Guesses so far: " +
                                        guessesString + "</p>");

            // If there are no more "_" characters in emptyWord, WINNER!!!
            if(!emptyWord.includes("_")) {

                wins++;

                // pause for 3 seconds
                setTimeout(reset, 2000);

                var winSound = new Audio();
                winSound.src = "assets/audio/space-ripple.wav";
                winSound.play();
            }

            // Did the user lose?
            else if (guesses === 0) {

                losses++;
                
                // pause for 3 seconds
                setTimeout(reset, 2000);

                var winSound = new Audio();
                winSound.src = "assets/audio/bell-toll.wav";
                winSound.play();

                $("#word-to-guess").html(wordToGuess);
            }
        }
    }
};

/*
 * Initialization methods
 */
$(document).ready(function() {

    $("#welcome-button").on("click", function () {

        $("#welcome-header").html("...We are the <i>UNITED</i> States!");
        document.getElementById("hangman-image").src = "assets/images/hangman-6.png";

        wins = 0;
        losses = 0;

        $("#byline").html("- President Barack Obama");
        $("#welcome-button").html("Reset Score");
        $("#start-message").html("Press any key to start!")

        reset();
    });
});