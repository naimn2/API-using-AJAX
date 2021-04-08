import { DataSource } from '../data/data-source.js'


const main = () => {
    const mainElement = document.querySelector('main')
    const appbarElement = document.querySelector('app-bar')
    const movieListElement = document.querySelector('movie-list')
    const dataSource = new DataSource();

    const linkLoadMore = document.createElement('button')
    const noMoreMovieElement = document.createElement('div')
    noMoreMovieElement.innerHTML = `<h2 class="placeholder">No more movies</h2>`
    noMoreMovieElement.hidden = true

    linkLoadMore.setAttribute('class', 'max-width btn btn-danger load-more')
    linkLoadMore.setAttribute('type', 'button')
    linkLoadMore.innerText = 'Load More'
    
    mainElement.appendChild(linkLoadMore)
    mainElement.appendChild(noMoreMovieElement)

    const onSearch = async (query) => {
        console.log('button search clicked!')
        if (!query) {
            return
        }
        try {
            const results = await dataSource.searchMovie(query)
            movieListElement.movies = results.results
            noMoreMovieElement.hidden = true
            linkLoadMore.hidden = false
            linkLoadMore.removeEventListener('click', loadMoreTrendingMovies)
            linkLoadMore.addEventListener('click', loadMoreSearchMovies)
        }
        catch (error) {
            movieListElement.renderError(error)
            linkLoadMore.hidden = true
        }
    };

    const onLoadTrendingMovies = () => {
        dataSource.trendingList()
            .then(results => {
                movieListElement.movies = results.results
                noMoreMovieElement.hidden = true
                linkLoadMore.hidden = false
                linkLoadMore.removeEventListener('click', loadMoreSearchMovies)
                linkLoadMore.addEventListener('click', loadMoreTrendingMovies)
            }).catch(error => {
                movieListElement.renderError(error)
                linkLoadMore.hidden = true
            })
    }

    const onMovieClickCallback = id => {
        console.log(id, 'clicked')
    }

    const noMoreMovie = () => {
        noMoreMovieElement.hidden = false
        linkLoadMore.hidden = true
    }

    const loadMoreTrendingMovies = () => {
        dataSource.loadMoreTrendingMovies()
            .then(results => {
                movieListElement.moreMovies = results.results
                linkLoadMore.hidden = false
            }).catch(error => {
                noMoreMovie()
            })
    }

    const loadMoreSearchMovies = () => {
        dataSource.loadMoreSearchMovies()
            .then(results => {
                movieListElement.moreMovies = results.results
                linkLoadMore.hidden = false
            }).catch(error => {
                noMoreMovie()
            })
    }

    appbarElement.onSearch = onSearch;
    movieListElement.onItemClickCallback = onMovieClickCallback

    onLoadTrendingMovies()
};

export default main;