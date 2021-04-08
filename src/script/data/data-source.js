const BASE_URL = "https://api.themoviedb.org"
const V_AUTH = 3
const API_KEY = "7f147371d293faae7c59388c4d5591f5"
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w200"

class DataSource {
    constructor() {
        this._trendingPage = 1
        this._searchPage = 1
    }

    trendingList() {
        this._trendingPage = 1
        return this.trending()
    }

    searchMovie(keyword) {
        this._searchPage = 1
        return this.search(keyword)
    }

    loadMoreTrendingMovies() {
        this._trendingPage++
        return this.trending()
    }

    loadMoreSearchMovies() {
        this._searchPage++
        return this.search(this.keyword)
    }

    async trending() {
        try {
            const response = await fetch(`${BASE_URL}/${V_AUTH}/trending/movie/day?api_key=${API_KEY}&page=${this._trendingPage}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const responseJson = await response.json()
            console.log(responseJson);
            const trendingMovies = responseJson.results
            return new Promise((resolve, reject) => {
                if (trendingMovies) {
                    resolve(responseJson);
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

    async search(keyword) {
        this.keyword = keyword
        try {
            const response = await fetch(`${BASE_URL}/${V_AUTH}/search/movie?api_key=${API_KEY}&page=1&query=${keyword}&page=${this._searchPage}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const responseJson = await response.json()
            console.log(responseJson);
            const filteredMovies = responseJson.results

            return new Promise((resolve, reject) => {
                if (filteredMovies.length) {
                    resolve(responseJson);
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