const BASE_URL = 'https://api.themoviedb.org'
const V_AUTH = 3
const API_KEY = '7f147371d293faae7c59388c4d5591f5'
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w200'

class DataSource {
    constructor() {
        this._currentPage = 1
    }

    trendingList() {
        this._currentPage = 1
        return this.trending()
    }

    popularList() {
        this._currentPage = 1
        return this.popular()
    }

    upcomingList() {
        this._currentPage = 1
        return this.upcoming()
    }

    searchMovie(keyword) {
        this._currentPage = 1
        return this.search(keyword)
    }

    loadMoreTrendingMovies() {
        this._currentPage++
        return this.trending()
    }

    loadMorePopularMovies() {
        this._currentPage++
        return this.popular()
    }

    loadMoreUpcomingMovies() {
        this._currentPage++
        return this.upcoming()
    }

    loadMoreSearchMovies() {
        this._currentPage++
        return this.search(this.keyword)
    }

    async trending() {
        try {
            const response = await fetch(`${BASE_URL}/${V_AUTH}/trending/movie/day?api_key=${API_KEY}&page=${this._currentPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const responseJson = await response.json()
            console.log(responseJson);
            const trendingMovies = responseJson.results
            return new Promise((resolve, reject) => {
                if (trendingMovies) {
                    resolve(responseJson);
                } else if (this._currentPage > 1) {
                    reject(`No more movies`);
                } else {
                    reject(`No trending movies`);
                }
            })
        } catch (error) {
            return new Promise((_, reject) => {
                reject(`Ups something went wrong :(`);
            })
        }
    }

    async popular() {
        try {
            const response = await fetch(`${BASE_URL}/${V_AUTH}/movie/popular?api_key=${API_KEY}&page=${this._currentPage}&language=en-US`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const responseJson = await response.json()
            console.log(responseJson);
            const popularMovies = responseJson.results
            return new Promise((resolve, reject) => {
                if (popularMovies) {
                    resolve(responseJson);
                } else if (this._currentPage > 1) {
                    reject(`No more movies`);
                } else {
                    reject(`No upcoming movies`);
                }
            })
        } catch (error) {
            return new Promise((_, reject) => {
                reject(`Ups something went wrong :(`);
            })
        }
    }

    async upcoming() {
        try {
            const response = await fetch(`${BASE_URL}/${V_AUTH}/movie/upcoming?api_key=${API_KEY}&page=${this._currentPage}&language=en-US`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const responseJson = await response.json()
            console.log(responseJson);
            const upcomingMovies = responseJson.results
            return new Promise((resolve, reject) => {
                if (upcomingMovies) {
                    resolve(responseJson);
                } else if (this._currentPage > 1) {
                    reject(`No more movies`);
                } else {
                    reject(`No upcoming movies`);
                }
            })
        } catch (error) {
            return new Promise((_, reject) => {
                reject(`Ups something went wrong :(`);
            })
        }
    }

    async search(keyword) {
        this.keyword = keyword
        try {
            const response = await fetch(`${BASE_URL}/${V_AUTH}/search/movie?api_key=${API_KEY}&page=1&query=${keyword}&page=${this._currentPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const responseJson = await response.json()
            console.log(responseJson);
            const filteredMovies = responseJson.results

            return new Promise((resolve, reject) => {
                if (filteredMovies.length) {
                    resolve(responseJson);
                } else if (this._currentPage > 1) {
                    reject(`No more movies`);
                } else {
                    reject(`${keyword} is not found`);
                }
            })
        } catch (error) {
            return new Promise((_, reject) => {
                reject(`${keyword} is not found`);
            })
        }
    }
}

export { DataSource, BASE_IMAGE_URL };