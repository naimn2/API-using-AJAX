import { BASE_IMAGE_URL } from '../data/data-source.js'

class MovieItem extends HTMLElement {

    set onItemClickCallback(onItemClickCallback) {
        this._onItemClickCallback = onItemClickCallback
    }

    set movie(movie) {
        this._movie = movie
        this.onItemClick = () => {
            const id = this._movie.id
            this._onItemClickCallback(id)
        }
        this.render()
    }

    render() {
        // console.log(BASE_IMAGE_URL+this._movie.poster_path);
        this.innerHTML = `
        <div class="movie-container">
            <div class="button-detail-container">
                <button type="button" class="btn btn-danger" id="button-detail" hidden>Details</button>
            </div>
            <div class="movie-info">
                <p>${this._movie.original_title} (${this._movie.release_date.split('-')[0]})</p>
            </div>
            <img src="${BASE_IMAGE_URL}${this._movie.poster_path}" alt="">
        </div>
        `
        this.addEventListener('click', this.onItemClick)
        this.addEventListener('mouseover', () => {
            this.querySelector('#button-detail').hidden = false
        });

        this.addEventListener('mouseout', () => {
            this.querySelector('#button-detail').hidden = true
        });
    }
}

customElements.define('movie-item', MovieItem)