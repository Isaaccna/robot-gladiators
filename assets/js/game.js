//function to generate a random numeric value 
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

// fuction to set name
var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot name?")
    }
    console.log("Your robot's name is " + name);
    return name;
}
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 50;
    },
    refillHealth: function() {
        if (this.money >= 7){
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
        
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -=7;
        }
        else {
            window.alert("You don't have enough money!");
        }
        
    }
}


//you can als log multiple values at once like this
console.log(playerInfo);

var enemyInfo = [
    {
      name: "Roborto",
      attack: randomNumber(10 , 14)
    },
    {
      name: "Amy Android",
      attack: randomNumber(10,14)
    },
    {
      name: "Robo Trumble",
      attack: randomNumber(10,14)
    }
  ];


        var fightOrSkip = function(){
    // ask player if they'd like to fight or skip using fightOrSkip function
     var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

     // Conditional Recursive Function Call
if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }
  promptFight = promptFight.toLowerCase();
    // If the player chooses to skip
     if (promptFight === "skip") {
          // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight 
    if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        //subtract money from playerMoney for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerMoney", playerInfo.money);
        
        //return true if player wants to leave
        return true;
    }
   return false;
    }
        }
        var fight = function(enemy) {
            //keep track of who goes first
            var isPlayerTurn = true;

            if(Math.random() > 0.5) {
                isPlayerTurn = false;
            }
    while(playerInfo.health > 0 && enemy.health > 0) {
       if (isPlayerTurn) {
        if (fightOrSkip()) {
        //if true, leave the fight by breaking the loop
        break;
    }
     // generate random damage value based on player's attack power
     var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

     enemy.health = Math.max(0, enemy.health - damage);
 
     // Log a resulting message to the console so we know that it worked.
     console.log(
         playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining." 
     )
 
     // Check enemy's health
     if (enemy.health <= 0) {
         window.alert(enemy.name + " has died!");

         // award player for winning
         playerInfo.money = playerInfo.money + 50;

         //leave while () loop if enemy is dead
         break;
     }
     else {
         window.alert(enemy.name + " still has " + enemy.health + " health left.");
     }
    }
    else {
     // generate random damage value based on enemy's attack power
    var damage = randomNumber(enemy.attack -3, enemy.attack);
    
    playerInfo.health = Math.max(0, playerInfo.health - damage);
 
     // Log a resulting message to the console so we know that it worked.
     
     console.log(
         enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
    
     // check player's health
     if (playerInfo.health <= 0) {
     window.alert(playerInfo.name + " has died!");
     //leave while() loop if player is dead
     break;
     } 
     else {
     window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
     }
 }
     // switch turn order for next round
     isPlayerTurn = !isPlayerTurn;
    }
}
//function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.reset();
for(var i = 0; i < enemyInfo.length; i++) {
    // check player stats
    console.log(playerInfo);
    // let player know what round they are in, remember that arrays starts at 0 so it needs to have 1 added to it
    if (playerInfo.health > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + ( i + 1));
    // pick new enemy to fight based on the index of the enemyNames array
    var pickedEnemyObj = enemyInfo[i];
    // reset enemyHealth before starting new fight
    pickedEnemyObj.health = randomNumber(40, 60);
    console.log(pickedEnemyObj);
    // use debugger to pause script from running and check what's going at that moment in the code
    //debugger
    // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
    fight(pickedEnemyObj);
        // if player is still alive and we're not at the last enemy in the array
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
            //ask if player wants to use the store before next round
            var storeConfirm = window.confirm("the fight is over, visit the store before the next round?");

            //if yes, take  them to the store() function
            if (storeConfirm) {
            shop();
        }
    }
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
// check localStorage for high score, if it's not there, use 0
var highScore = localStorage.getItem("highscore");
if(highScore === null) {
    highScore = 0;
}
  // if player has more money than the high score, player has new high score1
  if (playerInfo.money > highScore) {
      localStorage.setItem("highscore", playerInfo.money);
      localStorage.setItem("name", playerInfo.name);

      alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
  }
 else {
    alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
}

// ask player if they'd like to play again
var playAgainConfirm = window.confirm('Would you like to play again?');

if (playAgainConfirm) {
  startGame();
} else {
  window.alert('Thank you for playing Robot Gladiators! Come back soon!');
}
};
var shop = function() {
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Plase enter one 1 for REFILL , 2 for UPGRADE or 3 for LEAVE to make a choice. "
    );
    shopOptionPrompt = parseInt(shopOptionPrompt);
    // use switch to carry out action
    switch (shopOptionPrompt) {
        case 1: 
        playerInfo.refillHealth();
        break;

        case 2:
           playerInfo.upgradeAttack();
            break;
      
      case 3:
          window.alert("Leaving the store.");
          break;
          
          default:
              window.alert("You did not pick a valid option. try again. ")

              //call shop() again to force player to pick a valid option

              shop();
              break;

          // do nothing, so function will end
    }
}
//start first game when page loads
startGame();


