class AppBar extends HTMLElement {
    constructor() {
        super()
        this._title = 'Gamepots'
        this.search = () => {
            const query = this.querySelector('#searchElement').value
            this._callback(query)
        }
    }

    connectedCallback() {
        this.render()
    }

    set title(title){
        this._title = title
        this.render()
    }

    set searchCallback(callback) {
        this._callback = callback
        this.querySelector('#searchButton').addEventListener('click', this.search)
    }

    render() {
        this.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#"><strong>${this._title}</strong></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#">All</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#">Action</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#">Adventure</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#">Physics</a>
                        </li>
                    </ul>
                    <div class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="searchElement">
                        <button class="btn btn-warning" type="submit" id="searchButton">Search</button>
                    </div>
                </div>
            </div>
        </nav>
        `
    }
}

customElements.define('app-bar', AppBar)