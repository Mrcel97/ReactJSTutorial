import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component {
    render() {                              // Render html code in js file (BAD PRACTICE).//
        return (
        <div className="game">              {/* React comment example */}
            <div className="game-board">    {/* Space destined to host an specific component */}
            Game Board
            </div>
            <div className="game-info">     {/* Space destined to log Game actions */}
            </div>
        </div>
        );
    }
}
