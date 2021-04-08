import './movie-item.js'

class MovieList extends HTMLElement {
    constructor() {
        super()
        this._header = 'Trending Movies'
    }

    set onItemClickCallback(onItemClickCallback) {
        this._onItemClickCallback = onItemClickCallback
    }

    set movies(movies) {
        this._movies = movies
        this.render()
    }

    set moreMovies(movies) {
        this._movies = [...this._movies, ...movies]
        this.render()
    }

    set header(header='Trending Movies') {
        this._header = header
    }

    render() {
        this.innerHTML = ``
        for (let movie of this._movies) {
            const movieElement = document.createElement("movie-item")
            movieElement.onItemClickCallback = this._onItemClickCallback
            movieElement.movie = movie
            this.appendChild(movieElement);
        }
    }

    renderError(message) {
        this.innerHTML = ''
        this.innerHTML += `<h2 class="placeholder">${message}</h2>`
    }
}

customElements.define('movie-list', MovieList)