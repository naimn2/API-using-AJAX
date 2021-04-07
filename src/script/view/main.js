import {DataSource} from '../data/data-source.js'

const main = () => {
    const mainElement = document.querySelector('main')
    const appbarElement = document.querySelector('app-bar')
    const movieListElement = document.querySelector('movie-list')
    const dataSource = new DataSource();
    const navPage = document.createElement('nav-page')
    mainElement.appendChild(navPage)

    const linkLoadMore = document.createElement('a')
    linkLoadMore.innerText = 'Load More'
    mainElement.appendChild(linkLoadMore)

    const searchCallback = async (query) => {
        console.log('button search clicked!')
        if (!query){
            return
        }
        try {
            const results = await dataSource.searchMovie(query)
            movieListElement.movies = results.results
            navPage.pageCount = results.total_pages
        } 
        catch (error) {
            movieListElement.renderError(error)
        }
    };
    
    const onMovieClickCallback = id => {
        console.log(id, 'clicked')
    }

    const loadMoreTrendingMovies = () => {
        dataSource.loadMoreTrendingMovies()
        .then(results => {
            movieListElement.moreMovies = results.results
        }).catch(error => {
            movieListElement.renderError(error)
        })
    }

    const loadMoreSearchMovies = () => {

    }

    linkLoadMore.addEventListener('click', loadMoreTrendingMovies)

    appbarElement.searchCallback = searchCallback;
    movieListElement.onItemClickCallback = onMovieClickCallback

    dataSource.trendingList()
    .then(results => {
        movieListElement.movies = results.results
        navPage.pageCount = results.total_pages
    }).catch(error => {
        movieListElement.renderError(error)
    })
};

export default main;