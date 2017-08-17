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
var emptyWordString = "";
var userWord = [];

var letters = [ "a", "b", "c", "d", "e", "f", "g",
                "h", "i", "j", "k", "l", "m", "n",
                "o", "p", "q", "r", "s", "t", "u",
                "v", "w", "x", "y", "z" ];

var words = [   "alabama", "alaska", "arizona", "arkansas", "california",
                "colorado", "connecticut", "delaware", "florida", "georgeia",
                "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas",
                "kentucky", "louisiana", "maine", "maryland", "massachusetts",
                "michigan", "minnesota", "mississippi", "missouri", "montana",
                "nebraska", "nevada", "new hampshire", "new jersey",
                "new mexico", "new york", "north carolina", "north dakota", 
                "ohio", "oklahoma", "oregon", "pennsylvania", "rhode island",
                "south carolina", "south dakota", "tennessee", "texas", "utah",
                "vermont", "virginia", "washington", "west virginia",
                "wisconsin", "wyoming"   ]

// Choose the first word randomly
var wordToGuess = words[Math.floor(Math.random() * words.length)];

function buildEmptyWord() {

    emptyWord = [];

    for (var i = 0; i < wordToGuess.length; i++) {
        emptyWord[i] = "_";
    }
}

function buildEmptyWordString() {
    for (var i = 0; i < emptyWord.length; i++) {
        emptyWordString = emptyWordString.concat(emptyWord[i]);
    }
}

// reset function for new game
function reset() {
    guessedLetters = [];
    guessesString = "";
    guesses = 6;
    wordToGuess = words[Math.floor(Math.random() * words.length)];
    buildEmptyWord();
    buildEmptyWordString();

    // Refresh display
    var html =  "<p>Wins: " + wins + "</p>" +
                "<p>Guesses Left: " + guesses + "</p>" +
                "<p>Your Guesses so far: " + guessesString + "</p>";

    document.getElementById("status").innerHTML = html;

    // reset hangman image
    document.getElementById("hangman-image").src = "assets/images/hangman-6.png";

    /*** FOR DEBUGGING ONLY! ***/
    document.getElementById("welcome").innerHTML = wordToGuess;
}

function waitForKey() {

    document.getElementById("welcome").innerHTML = "<p>Press any key to continue</p>";

    while(true) {

        document.onkeyup = function(event) {

            // Determines which key was pressed.
            break;
        };
    }
}

buildEmptyWord();
buildEmptyWordString();

// build text to display in the div #game
var html =  "<p>Wins: " + wins + "</p>" +
            "<p>Guesses Left: " + guesses + "</p>" +
            "<p>Your Guesses so far: " + guessesString + "</p>";

document.getElementById("status").innerHTML = html;

// display emptyWord in HTML
document.getElementById("word-to-guess").innerHTML = emptyWordString;

/*** FOR DEBUGGING ONLY! ***/
document.getElementById("welcome").innerHTML = wordToGuess;

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

                // do {

                // } while ( );

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
            var html =  "<p>Wins: " + wins + "</p>" +
                        "<p>Guesses Left: " + guesses + "</p>" +
                        "<p>Your Guesses so far: " + guessesString + "</p>";

            document.getElementById("status").innerHTML = html;


            if (guesses === 0) {

                losses++;

                setTimeout(reset, 1000);

                // alert("You used all of your guesses.  You lose.")
                // waitForKey();
            }
        }   // letter guessed if
    }   // big else 
};