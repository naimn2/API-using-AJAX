class GameItem extends HTMLElement {
    set game(game) {
        this._game = game
        this.render()
    }

    render() {
        this.innerHTML = `
            <img class="fan-art-game" src="${this._game.strTeamFanart1}" alt="Fan Art">
            <div class="game-info">
                <h2>${this._game.strTeam}</h2>
                <p>${this._game.strDescriptionEN}</p>
            </div>
        `
    }
}

customElements.define('game-item', GameItem)