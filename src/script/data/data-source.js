class DataSource {
    static async searchGame(keyword) {
        try {
            const response = await fetch(`https://www.gamespot.com/api/games/?api_key=fc359a43db630b3a7b9f4f0c92a5555af0d83c96&format=json`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const responseJson = await response.json()
            console.log(responseJson);
            const filteredGames = responseJson.teams

            return new Promise((resolve, reject) => {
                if (filteredGames && filteredGames.error === 'OK') {
                    resolve(filteredGames);
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

export default DataSource;