var drinkName = "";
var drinkImage = "";
var drinkInstructions = "";
var drinkIngredients = [];
var drinkMeasures = [];
var returnData = "";


const nameOfDrink = "strDrink$";
const instructions = "strInstructions$";
const image = "strDrinkThumb";
const ingredients = "strIngredient";
const measure = "strMeasure";
const glass = "strGlass";

function printDrinks(array) {
  var drinksHtml = "";
  //drink keys are checked top to bottom of data.drinks.[x] because of loops
  //checks every drink of array index and every key in each drink
  for (var drink of array) {
    for (var key in drink) {
      //checks if drink is Alcoholic
      if (drink[key] === "Alcoholic") {
        //starts a new loop checking each key again for strDrink
        for (var key in drink) {
          if (key.match(nameOfDrink) && (drink[key] != null)) {
            drinkName = [(drink[key])];
            drinksHtml += '<div class="drink-wrapper alcoholic transparent-bg">' +
              '<h2>' + [drinkName] + '</h2>' + '<span class="drinkType">' + "Alcoholic" + '</span>';
          }
        }
        //checks if drink is Non-Alcoholic
      } else if (drink[key] === "Non alcoholic") {
        for (var key in drink) {
          if (key.match(nameOfDrink) && (drink[key] != null)) {
            drinkName = [(drink[key])];
            drinksHtml += '<div class="drink-wrapper non-alcoholic transparent-bg">' +
              '<h2>' + [drinkName] + '</h2>' + '<span class="drinkType">' + "Non-alcoholic" + '</span>';
          }
        }
        //checks if drink can be made optionally alcoholic
      } else if (drink[key] === "Optional alcohol") {
        for (var key in drink) {
          if (key.match(nameOfDrink) && (drink[key] != null)) {
            drinkName = [(drink[key])];
            drinksHtml += '<div class="drink-wrapper optional-alcohol transparent-bg">' +
              '<h2>' + [drinkName] + '</h2>' + '<span class="drinkType">' + "Optional Alcohol" + '</span>';
          }
        }
        //checking for drink image in drinks[key]
      } else if (key.match(image)) {
        drinkImage = (drink[key]);
        drinksHtml += '<div class="mat-img_container">' + '<div class="image-container">' +
          '<img src=' + "'" + drinkImage + "'" + '</img>' + '</div>'
        //checking for drink instructions in drinks[key]
      } else if (key.match(instructions) && (drink[key] != null) && (drink[key])) {
        drinkInstructions = (drink[key]);
        drinksHtml += '<div class="instructions-container">' +
          '<p>' + drinkInstructions + '</p>' + '</div>'
      }
    }
    //breaking up loops for adding styling for FlexBox and Div wrappers
    drinksHtml += '<div class="materials-wrapper">' + '<h3>' + 'Ingredients' + '</h3>' + '<div class="ing-mes_wrapper">' + '<div class="ingredient-wrapper">' + '<ul>'
    //checking keys for ingredients
    for (var key in drink) {
      if (key.match(ingredients) && (drink[key] != '') && (drink[key] != null)) {
        drinkIngredients = [(drink[key])];
        drinksHtml += '<div class="ingredient-container">' + '<li>' + drinkIngredients + ':' + '</li>' + '<span>' + '</span>' + '</div>';
      }
    }
    //adding div wrappers out of loops for FlexBox + styling
    drinksHtml += '</ul>' + '</div>' + '<div class="measure-wrapper">' + '<ul class="no-list">'
    //checking keys for measures
    for (var key in drink) {
      if (key.match(measure) && (drink[key] != '') && (drink[key] != " ")) {
        drinkMeasures = [(drink[key])];
        drinksHtml += '<div class="measure-container">' + '<li>' + drinkMeasures + '</li>' + '</div>';
      }
    }
    //closing all Div tags in searchResults wrapper
    drinksHtml += '</ul>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>'
  }
  //Prepends all results above the searchButton
  $('.searchResults').prepend(drinksHtml);
}


//Jquery script
$(document).ready(function() {

  //Submit form - hide search input button after submission
$('.searchForm').submit(function(event) {
  event.preventDefault(); //stopping form from resetting page
  $('.searchResults').empty();
  var searchValue = $('#search').val();
  $.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + searchValue,
    //add a callback
    function(array) {
      //if the value of array.drinks doesn't match anything in the API query
      if (array.drinks === null) {
        $('.searchResults').html('<h1 class="no-results">Sorry no results found :( </h1>');
        return false;
      } else {

        //feature built to limit search to exact result - issue is singular letters
        //possible fix with regex?
        //   let newArray = array.drinks;
        //     for(var drink of newArray) {
        //     for(var key in drink) {
        //       var returnArray = [drink];
        //     if(drink[key] === searchValue){
        //       return true;
        //       // return true;
        //     }
        //     console.log(returnArray);
        //     printDrinks(returnArray);
        //     return true;
        //   }
        // }
        printDrinks(array.drinks);
      }
    });

  // search for a term - animate and disable search
  $('#rs-search_nav').fadeIn(500);
  $('#rs-search_nav').removeClass('hidden');
  $('#rs-search_footer').fadeIn(500);
  $('#rs-search_footer').removeClass('hidden');
  $('.searchForm').fadeOut();
  $('.images').slideUp();
  $('.searchResults').fadeIn(500);
  $('.searchResults').removeClass('hidden');
});

  //functionality for the random drinks button
  $('.random').click(function() {
    event.preventDefault(); //stopping form from resetting page
    $('.searchResults').empty();
    $.get('https://www.thecocktaildb.com/api/json/v1/1/random.php', function(array) {
      printDrinks(array.drinks);
    });

    // search for a term - animate and disable search //refactor later into toggles
    $(this).fadeOut(500);
    $(this).addClass('hidden');
    $('#rs-search_nav').delay(1000).fadeIn(500);
    $('#rs-search_nav').removeClass('hidden');
    $('#rs-search_footer').fadeIn(500);
    $('#rs-search_footer').removeClass('hidden');
    $('.searchForm').fadeOut();
    $('.images').slideUp();
    $('.searchResults').fadeIn(500);
    $('.searchResults').removeClass('hidden');
  });

  //styling form input focus and blur
  $('form input').focus(function() {
    $(this).css('outline', '#99E1D9 solid 4px');
    $(this).css('border-radius', '4px');
  });

  $('form input').blur(function() {
    $(this).css('outline', 'none');
    $(this).css('border-radius', '0px');
  });

  //styling button click, mouseenter and mouse leave
  $('.btn-style').on('mouseup mousedown', function() {
    $(this).toggleClass('btn-click');
  });

  $('.btn-style').on('mouseenter mouseleave', function() {
    $(this).toggleClass('btn-hvr');
  });

  //resets page enabling search again - hides results //refactor later into toggles
  $('.reset-search').click(function() {
    event.preventDefault();
    $('#rs-search_nav').fadeOut();
    $('#rs-search_nav').addClass('hidden');
    $('.random').delay(1000).fadeIn(500);
    $('.random').removeClass('hidden');
    $('.images').slideDown();
    $('.searchForm').fadeIn();
    $('#rs-search_footer').fadeOut(500);
    $('#rs-search_footer').addClass('hidden');
    $('.searchResults').slideUp(500);
    $('.searchResults').fadeOut(500);
    $('.searchResults').addClass('hidden');
  });

  //easter egg animations
  $('.emoji-anim').on('mouseenter mouseleave', function() {
    $(this).toggleClass('spinAnim');
  });









});
