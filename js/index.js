var score = 0;
var streak = 0;
var lives = 3;
var randomPokemon = Math.floor(Math.random() * 151) + 1;
var pokemonName = "";
var spriteUrl = "";
var currentName = "";
$(document).ready(function () {
    getSprite();
});
function setSprite() {
    $("#sprite").attr("src", spriteUrl);
}
function guess() {
    console.log(document.getElementById("textbox").value);
    if ((document.getElementById("textbox").value.toUpperCase()) == currentName) {
        streak++;
        score = score + streak;
        $("#start-button").css("color", "green");
        $("#start-button").html("Correct");
    }
    else if (lives == 1) {
        $("#start-button").css("color", "red");
        $("#start-button").html("Sorry you lost: " + currentName);
        lives = 3;
        streak = 0;
        score = 0;
    }
    else {
        lives--;
        streak = 0;
        $("#start-button").css("color", "red");
        $("#start-button").html("Incorrect: " + currentName);
    }
    setSprite();
    getSprite();
    setTimeout(updateValues, 250);
    $("#textbox").val("");
}
function updateValues() {
    $("#score-text").html("Score: " + score);
    $("#streak-text").html("Streak: " + streak);
    $("#misses-text").html("Lives: " + lives);
}
function start() {
    $("#sprite").attr("src", "img/testimg.png");
    $("#sbutton").hide();
    $("#guess-button").css("display", "inline-block");
    setSprite();
    getSprite();
}
function handle(key) {
    if (key.keyCode === 13) {
        key.preventDefault();
        guess();
    }
}
function getSprite() {
    $.ajax({
        url: "http://pokeapi.co/api/v2/pokemon-form/" + randomPokemon + "/",
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Accept", "application/json");
        },
        type: "GET"
    })
        .done(function (data) {
        if (data) {
            currentName = pokemonName;
            spriteUrl = data.sprites.front_default;
            console.log(data);
            pokemonName = data.name.toUpperCase();
            console.log(pokemonName);
            console.log(spriteUrl);
            randomPokemon = Math.floor(Math.random() * 151) + 1;
            console.log(randomPokemon);
        }
    })
        .fail(function (error) {
        console.log(error);
    });
}
