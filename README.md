<p align="center">
  <img src="http://blog-assets.risingstack.com/2016/Jan/react_best_practices-1453211146748.png" alt="ReactJS_image" />
</p>

# Tic-Tac-Toe ReactJS Tutorial - BattleShip Challenge
 
**This part is not in Intro to React tutorial** so there is no specific way of do it correctly. In this part we ask you to improve your actual Tic-Tac-Toe code to create a User vs AI BattleShip game. Here I will give a squema which I used due to have a start point.

  1. Create the Object EnemyGame: The aim of this new object will be to create and control a new Board object where the user will make the attacks.  
  2. Separate the game in 3 phases (load Ships, attack Ships, end).  
    2.1. Load Ships: Consists in block the EnemyGame Board while the user introduce their ships. Ships can have a deffault size (1x2, 1x1, 3x1, ...) due to make the game easier.  
    2.2. Attack Ships: Block the User Board and start recording clicks in EnemyGame Board.  
    2.3. End game: Block User Board and EnemyGame Board and display the winner.  
  3. You can make an AI which makes their shoot after you so you don't need to keep the 'X' and 'O' turns.  
