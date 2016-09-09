var score : number = 0;
var streak : number = 0;
var lives : number = 3;
var randomPokemon : number = Math.floor(Math.random() * 151) + 1;
var pokemonName : string = "";
var spriteUrl : string = "";
var currentName : string = "";
var first : boolean = false;

$( document ).ready(function() {
    getSprite();
});

function setSprite() : void {
    $("#sprite").attr("src", spriteUrl);
}

function guess() : void {
    console.log(document.getElementById("textbox").value);
    if ((document.getElementById("textbox").value.toUpperCase()) == currentName) {
        streak++;
        score = score + streak;
        $("#start-button").css("color", "green");
        $("#start-button").html("Correct");
    } else if(lives == 1) {
        $("#start-button").css("color", "red");
        $("#start-button").html("Sorry you lost: " + currentName);

        lives = 3;
        streak = 0;
        score = 0;
    } else {
        lives--;
        streak = 0;
        $("#start-button").css("color", "red");
        $("#start-button").html("Incorrect: " + currentName);
    }
    setSprite()
    getSprite();
    setTimeout(updateValues, 500);
    $("#textbox").val("");

}

function updateValues() : void {
    $("#score-text").html("Score: "  + score);
    $("#streak-text").html("Streak: "  + streak);
    $("#misses-text").html("Lives: "  + lives);

}
function start() : void {
    $("#textbox").val("");
    $("#sprite").attr("src", "img/testimg.png");
    $("#sbutton").hide();
    $("#guess-button").css("display", "inline-block");
    first = true;
    setSprite()
    getSprite();

}
function handle(key) : void {
    if(key.keyCode === 13){
        if (first) {
            key.preventDefault(); // Ensure it is only this code that rusn
            guess();
        }
    }
}

function getSprite() : void {
$.ajax({
   url: "http://pokeapi.co/api/v2/pokemon-form/" + randomPokemon + "/",
   beforeSend: function(xhrObj) {
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

         randomPokemon = Math.floor(Math.random() * 151) + 1
         console.log(randomPokemon);
     }
   })
   .fail (function (error) {
     console.log(error);
   });
}
