
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;


//you can als log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;
console.log(enemyNames);
console.log(enemyNames.length);

//function to generate a random numeric value 
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}


var fight = function(enemyName) {
    while(playerHealth > 0 && enemyHealth > 0) {
        
    // If the player chooses to fight, then fight
     var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // If the player chooses to skip
     if (promptFight === "skip" || promptFight === "SKIP") {
          // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight 
    if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        //subtract money from playerMoney for skipping
        playerMoney = Math.max(0, playerMoney - 10);
        console.log("playerMoney", playerMoney)
        break;
    }
    // if no (false), ask question again by running fight() again
    else {
        fight();
    }
    }

     if (promptFight === "fight" || promptFight === "FIGHT") {
 
     // generate random damage value based on player's attack power
     var damage = randomNumber(playerAttack - 3, playerAttack);

     enemyHealth = Math.max(0, enemyHealth - damage);
 
     // Log a resulting message to the console so we know that it worked.
     console.log(
         playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining." 
     )
 
     // Check enemy's health
     if (enemyHealth <= 0) {
         window.alert(enemyName + " has died!");

         // award player for winning
         playerMoney = playerMoney + 20;

         //leave while () loop if enemy is dead
         break;
     }
     else {
         window.alert(enemyName + " still has " + enemyHealth + " health left.");
     }
     // generate random damage value based on enemy's attack power
    var damage = randomNumber(enemyAttack -3, enemyAttack);
    
     playerHealth = Math.max(0, playerHealth - damage);
 
     // Log a resulting message to the console so we know that it worked.
     
     console.log(
         enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");
    
     // check player's health
     if (playerHealth <= 0) {
     window.alert(playerName + " has died!");
     //leave while() loop if player is dead
     break;
     } 
     else {
     window.alert(playerName + " still has " + playerHealth + " health left.");
     }
 }
 
    }
 
}
//function to start a new game
var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
for(var i = 0; i < enemyNames.length; i++) {
    // let player know what round they are in, remember that arrays starts at 0 so it needs to have 1 added to it
    if (playerHealth > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + ( i + 1));
    // pick new enemy to fight based on the index of the enemyNames array
        var pickedEnemyName = enemyNames[i];
    // reset enemyHealth before starting new fight
        enemyHealth = randomNumber(40, 60);
    // use debugger to pause script from running and check what's going at that moment in the code
    //debugger
    // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
        fight(pickedEnemyName);
        
}
  // if player is not alive, break out of the loop and let endGame function run
  else {
    window.alert("You have lost your robot in battle! Game Over!");
    break;
  }
}

// after loop ends, we are either out of playerHealth or enemies to fight, so run the endGame function
endGame();
};

// function to end the entire game
var endGame = function() {
window.alert("The game has now ended. Let's see how you did!");

// if player is still alive, player wins!
if (playerHealth > 0) {
  window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + '.');
} else {
  window.alert("You've lost your robot in battle!");
}

// ask player if they'd like to play again
var playAgainConfirm = window.confirm('Would you like to play again?');

if (playAgainConfirm) {
  startGame();
} else {
  window.alert('Thank you for playing Robot Gladiators! Come back soon!');
}
};


//start first game when page loads
startGame();


