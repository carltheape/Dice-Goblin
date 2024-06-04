const d4 = 4
const d6 = 6
const d8 = 8
const d10 = 10
const d12 = 12
const d20 = 20



function rollDice(d) {
    return Math.floor(Math.random() * d) + 1;
  }

function multiRollDice(n, d) {
    let results = [];
    for (let i = 0; i < n; i++) {
      results.push(rollDice(d));    }
    return results;
  }

  document.addEventListener("DOMContentLoaded", function() {
    // Get the button element by its id
    var rollButton = document.getElementById("rollem");
    var diceSections = document.getElementsByClassName("dice-section");
    var increaseButton = document.getElementsByClassName("increase");
    var decreaseButton = document.getElementsByClassName("decrease");
    
    // Add a click event listener to each button
    for (var i = 0; i < increaseButton.length; i++) {
        increaseButton[i].addEventListener("click", function() {
            // Handle the click event for each button
            let id = this.parentNode.id;
            let dCount = document.querySelector("#" + id + " .d-count");
            dCount.innerHTML = parseInt(dCount.innerHTML) + 1;
        });
    }
    // Add a click event listener to each button
    for (var i = 0; i < decreaseButton.length; i++) {
        decreaseButton[i].addEventListener("click", function() {
            // Handle the click event for each button
            let id = this.parentNode.id;
            let dCount = document.querySelector("#" + id + " .d-count");
            if(parseInt(dCount.innerHTML) > 0){
                dCount.innerHTML = parseInt(dCount.innerHTML) - 1;
            }
            else{
                dCount.innerHTML = 0;}
        });
    }

    rollButton.addEventListener("click", function() {
        document.querySelector("#results").innerHTML = "";
        for (var i = 0; i < diceSections.length; i++) {
            let id = diceSections[i].id;
            let dCount = document.querySelector("#" + id + " .d-count").innerText;
            let dValue = document.querySelector("#" + id + " .d-value").innerText;
            if(dCount > 0){
                let results = multiRollDice(dCount, dValue);
                for (let i = 0; i < results.length; i++) {
                    let resultsElement = document.createElement("div");
                    resultsElement.classList.add("result","result-" + dValue);
                    resultsElement.innerHTML = `<span> ${results[i]}</span>`;
                    document.querySelector("#results").appendChild(resultsElement);
                }
            }
        }
    });
});