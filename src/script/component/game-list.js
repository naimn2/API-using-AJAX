import './game-item.js'

class GameList extends HTMLElement {
    constructor() {
        super()
        this._style = `
            <style>
                .placeholder {
                    font-weight: lighter;
                    color: rgba(0,0,0,0.5);
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
                game-item {
                    display: block;
                    margin-bottom: 18px;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                    /* border-radius: 10px; */
                    overflow: hidden;
                    border: 2px solid grey /* sementara */
                }
                game-item {
                    width: 90%;
                    max-height: 300px;
                    /* object-fit: cover; */
                    object-position: center;
                }
                .fan-art-game {
                    width: 100%;
                    max-height: 300px;
                    /* object-fit: cover; */
                    object-position: center;
                }
                .game-info {
                    padding: 24px;
                }
                .game-info > h2 {
                    font-weight: lighter;
                }
                .game-info > p {
                    margin-top: 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2; /* number of lines to show */
                }
            </style>`
        this._shadowRoot = this.attachShadow({mode: 'open'})
    }

    set games(games) {
        this._games = games
        this.render()
    }

    render() {
        this._shadowRoot.innerHTML = this._style
        this._games.forEach((game) => {
            const gameElement = document.createElement("game-item");
            gameElement.game = game
            this._shadowRoot.appendChild(gameElement);
        })
    }

    renderError(message) {
        this._shadowRoot.innerHTML = this._style
        this._shadowRoot.innerHTML += `<h2 class="placeholder">${message}</h2>`
    }
}

customElements.define('game-list', GameList)