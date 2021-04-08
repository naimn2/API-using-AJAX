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
                <button type="button" class="btn btn-danger" id="button-detail" data-bs-toggle="modal" data-bs-target="#detail-modal-${this._movie.id}" hidden>Details</button>
            </div>
            <div class="movie-info">
                <p>${this._movie.original_title} (${this._movie.release_date.split('-')[0]})</p>
            </div>
            <img class="poster" src="${BASE_IMAGE_URL}${this._movie.poster_path}" alt="">
        </div>
        <div class="modal fade" id="detail-modal-${this._movie.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${this._movie.original_title} (${this._movie.release_date.split('-')[0]})</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${BASE_IMAGE_URL}${this._movie.poster_path}" alt="">
                        ${this._movie.overview}
                    </div>
                    <div class="modal-footer">
                        <span>Release Date: ${this._movie.release_date},</span>
                        <span>Rating: ${this._movie.vote_average}</span>
                    </div>
                </div>
            </div>
        </div>
        `
        const buttonDetail = this.querySelector('#button-detail')
        this.addEventListener('click', this.onItemClick)
        this.addEventListener('mouseover', () => {
            buttonDetail.hidden = false
        });

        this.addEventListener('mouseout', () => {
            buttonDetail.hidden = true
        });
    }
}

customElements.define('movie-item', MovieItem)