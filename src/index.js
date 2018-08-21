import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component {
    render() {
        return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
            </div>
        </div>
        );
    }
}


class Board extends React.Component {

    renderSquare(i) {
        return <Square value={i} />;
    }

    render() {
        const status = 'Next Player X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={() => alert('click')}>      {/* Same as: onClick={function() { alert('click'); }}
                                                                              *     + Avoid confusing behavior
                                                                              *     + Save typing
                                                                              * */}
                {this.props.value}
            </button>
        );
    }
}


// ==================================

ReactDOM.render(
    <Game />,                                // Load Game component into DOM
    document.getElementById('root')
)