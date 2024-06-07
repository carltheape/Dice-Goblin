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
    var resetButton = document.getElementById("reset");
    var diceSections = document.getElementsByClassName("dice-section");
    var increaseButton = document.getElementsByClassName("increase");
    var decreaseButton = document.getElementsByClassName("decrease");
    var checkboxes = document.getElementsByClassName("toggle");
    var adv = document.getElementById("adv");
    var dis = document.getElementById("dis");
    var bobble = document.getElementById("bobble");
    
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
    // Get all checkbox elements

    // Add a click event listener to each checkbox
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", function() {
            // Handle the click event for each checkbox
            // Turn off all other checkboxes
            for (var j = 0; j < checkboxes.length; j++) {
                if (checkboxes[j] !== this) {
                    checkboxes[j].checked = false;
                }
            }
        });
    }

    rollButton.addEventListener("click", function() {
        document.querySelector("#results").innerHTML = "";
        for (var i = 0; i < diceSections.length; i++) {
            let id = diceSections[i].id;
            let dCount = document.querySelector("#" + id + " .d-count").innerText;
            let dValue = document.querySelector("#" + id + " .d-value").innerText;
            let validResult = 0;
            let maxResult = 0;
            let total = 0
            if(dCount > 0){
                let results = multiRollDice(dCount, dValue);
                for (let i = 0; i < results.length; i++) {
                    let resultsElement = document.createElement("div");
                    resultsElement.classList.add("result","result-" + dValue);
                    resultsElement.innerHTML = `<span> ${results[i]}</span>`;
                    if(adv.checked ){
                        if(results[i] == Math.min(...results)){
                            resultsElement.classList.add("drop");
                        }
                        else{
                            total += results[i];
                        }
                    }
                    else if(dis.checked ){
                        if(results[i] == Math.max(...results)){
                            resultsElement.classList.add("drop");
                        }
                        else{
                            total += results[i];
                        }
                    }
                    else if(bobble.checked){
                        if(results[i] % 2 != 0 ){
                            resultsElement.classList.add("drop");
                        }
                        else{
                            validResult++;
                            total += results[i];
                            if(results[i] === 6){
                                maxResult++;
                            }
                        }
                    }
                    else{
                        total += results[i];
                    }
                    document.querySelector("#results").appendChild(resultsElement);
                }
                document.querySelector("#resultsDetails").innerHTML = "";
                let totalDisplay = document.createElement("div");
                totalDisplay.innerHTML = `TOTAL:${total}`;
                document.querySelector("#resultsDetails").appendChild(totalDisplay);
                if(bobble.checked){
                    let totalDisplay = document.createElement("div");
                    totalDisplay.innerHTML = `You made ${validResult} tapped treasures!`;
                    if(maxResult === 7){
                        totalDisplay.innerHTML += `<br>YOU'VE DONE IT!  YOU WIN!!!`;
                    }   
                    document.querySelector("#resultsDetails").appendChild(totalDisplay);
                }
            }
        }
    });

    resetButton.addEventListener("click", function() {
        document.querySelector("#results").innerHTML = "";
        document.querySelector("#resultsDetails").innerHTML = "";
        
        for (var j = 0; j < checkboxes.length; j++) {
                checkboxes[j].checked = false;
        }
        for (var i = 0; i < diceSections.length; i++) {
            let id = diceSections[i].id;
            let dCount = document.querySelector("#" + id + " .d-count");
            dCount.innerHTML = "0";
        }
    });
});