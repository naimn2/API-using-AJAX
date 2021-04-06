import DataSource from '../data/data-source.js'

const main = () => {
    const appbarElement = document.querySelector("app-bar");
    const gameListElement = document.querySelector("game-list");

    const searchCallback = async (query) => {
        console.log('button search clicked!')
        try {
            const results = await DataSource.searchGame(query)
            gameListElement.games = results
        } 
        catch (error) {
            gameListElement.renderError(error)
        }
    };

    appbarElement.searchCallback = searchCallback;
};

export default main;