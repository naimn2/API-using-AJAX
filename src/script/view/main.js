import { DataSource } from '../data/data-source.js'


const main = () => {
    const appbarElement = document.querySelector('app-bar')
    const movieListElement = document.querySelector('movie-list')
    const dataSource = new DataSource();

    const btnLoadMore = document.createElement('button')
    btnLoadMore.setAttribute('class', 'btn btn-danger load-more')
    btnLoadMore.setAttribute('type', 'button')
    btnLoadMore.innerText = 'Load More'

    document.querySelector('#loadmore-grid').appendChild(btnLoadMore)

    const searchMovie = async (query) => {
        console.log('button search clicked!')
        if (!query) {
            return
        }
        try {
            const results = await dataSource.searchMovie(query)
            movieListElement.movies = results.results
            btnLoadMore.hidden = false
            btnLoadMore.onclick = loadMoreMovies('search')
        }
        catch (error) {
            movieListElement.reset()
            movieListElement.renderError(error)
            btnLoadMore.hidden = true
        }
    };

    const loadTrendingMovies = () => {
        dataSource.trendingList()
            .then(results => {
                movieListElement.movies = results.results
                btnLoadMore.hidden = false
                btnLoadMore.onclick = loadMoreMovies('trending')
            }).catch(error => {
                movieListElement.reset()
                movieListElement.renderError(error)
                btnLoadMore.hidden = true
            })
    }

    const loadPopularMovies = () => {
        dataSource.popularList()
            .then(results => {
                movieListElement.movies = results.results
                btnLoadMore.hidden = false
                btnLoadMore.onclick = loadMoreMovies('popular')
            }).catch(error => {
                movieListElement.reset()
                movieListElement.renderError(error)
                btnLoadMore.hidden = true
            })
    }

    const loadUpcomingMovies = () => {
        dataSource.upcomingList()
            .then(results => {
                movieListElement.movies = results.results
                btnLoadMore.hidden = false
                btnLoadMore.onclick = loadMoreMovies('upcoming')
            }).catch(error => {
                movieListElement.reset()
                movieListElement.renderError(error)
                btnLoadMore.hidden = true
            })
    }

    const loadMoreMovies = (tag) => {
        switch (tag) {
            case 'trending':
                return () => {
                    dataSource.loadMoreTrendingMovies()
                        .then(results => {
                            movieListElement.moreMovies = results.results
                            btnLoadMore.hidden = false
                        }).catch(error => {
                            movieListElement.renderError(error)
                            btnLoadMore.hidden = true
                        })
                }
            case 'popular':
                return () => {
                    dataSource.loadMorePopularMovies()
                        .then(results => {
                            movieListElement.moreMovies = results.results
                            btnLoadMore.hidden = false
                        }).catch(error => {
                            movieListElement.renderError(error)
                            btnLoadMore.hidden = true
                        })
                }
            case 'upcoming':
                return () => {
                    dataSource.loadMoreUpcomingMovies()
                        .then(results => {
                            movieListElement.moreMovies = results.results
                            btnLoadMore.hidden = false
                        }).catch(error => {
                            movieListElement.renderError(error)
                            btnLoadMore.hidden = true
                        })
                }
            case 'search':
                return () => {
                    dataSource.loadMoreSearchMovies()
                        .then(results => {
                            movieListElement.moreMovies = results.results
                            btnLoadMore.hidden = false
                        }).catch(error => {
                            movieListElement.renderError(error)
                            btnLoadMore.hidden = true
                        })
                }
        }
    }

    const onMovieClickCallback = id => {
        console.log(id, 'clicked')
    }

    const onMenuClick = (menu='trending') => {
        switch (menu) {
            case 'trending':
                loadTrendingMovies()
                break
            case 'popular':
                loadPopularMovies()
                break
            case 'upcoming':
                loadUpcomingMovies()
                break
        }
    }

    appbarElement.onSearch = searchMovie
    appbarElement.onMenuClick = onMenuClick
    movieListElement.onItemClickCallback = onMovieClickCallback

    loadTrendingMovies()
};

export default main;