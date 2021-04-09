import $ from 'jquery'
class AppBar extends HTMLElement {
    constructor() {
        super()
        this._title = 'Moviepots'
        this.search = () => {
            const query = this.querySelector('#searchElement').value
            this._onSearch(query)
        }
        this.onTrendingClick = () => {
            this._onMenuClick('trending')
        }
        this.onPopularClick = () => {
            this._onMenuClick('popular')
        }
        this.onUpcomingClick = () => {
            this._onMenuClick('upcoming')
        }
    }

    connectedCallback() {
        this.render()
    }

    set title(title){
        this._title = title
        this.render()
    }

    set onSearch(onSearch) {
        this._onSearch = onSearch
        this.querySelector('#searchButton').addEventListener('click', this.search)
    }

    set onMenuClick(onMenuClick) {
        this._onMenuClick = onMenuClick
    }

    render() {
        this.innerHTML = `
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/"><strong>${this._title}</strong></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item" id="menu-trending">
                            <a class="nav-link" aria-current="page" href="#">Trending</a>
                        </li>
                        <li class="nav-item" id="menu-popular">
                            <a class="nav-link" aria-current="page" href="#">Popular</a>
                        </li>
                        <li class="nav-item" id="menu-upcoming">
                            <a class="nav-link" aria-current="page" href="#">Upcoming</a>
                        </li>
                    </ul>
                    <div class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="searchElement">
                        <button class="btn btn-outline-danger" type="submit" id="searchButton">Search</button>
                    </div>
                </div>
            </div>
        </nav>
        `
        $('#searchElement').focus(()=>{
            console.log('on search focus');
            $('#searchElement').animate({
                width: '+=40px'
            })
        })
        $('#searchElement').focusout(()=>{
            console.log('on search focus');
            $('#searchElement').animate({
                width: '-=40px'
            })
        })
        $('#menu-trending').click(this.onTrendingClick)
        $('#menu-popular').click(this.onPopularClick)
        $('#menu-upcoming').click(this.onUpcomingClick)
    }
}

customElements.define('app-bar', AppBar)