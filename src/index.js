import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component {
    render() {                              // Render html code in js file (BAD PRACTICE).//
        return (
        <div className="game">              {/* React comment example */}
            <div className="game-board">    {/* Space destined to host an specific component */}
                <Board />                   {/* (3rd step) Link Board component with Game component */}
            </div>
            <div className="game-info">     {/* Space destined to log Game actions */}
            </div>
        </div>
        );
    }
}


class Board extends React.Component {
    render() {
        const status = 'Next Player X';     // Board need to know who is playing, set initial Board state to player 'X' or 'O'.

        return (                            // We want a [3row x 3col] tic-tac-toe
            <div>
                <div className="status">{status}</div>
                <div className="board-row">Row
                    {/* Insert row-Squares-amount here (4th step) */}
                </div>
                <div className="board-row">Row
                    {/* Insert row-Squares-amount here (4th step) */}
                </div>
                <div className="board-row">Row
                    {/* Insert row-Squares-amount here (4th step) */}
                </div>
            </div>
        );
    }
}


// ==================================

ReactDOM.render(
    <Game />,                                // Load Game component into DOM
    document.getElementById('root')
)