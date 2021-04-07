class NavPage extends HTMLElement {

    set pageCount(pageCount) {
        this._pageCount = pageCount
        this.currentPage = 1;
        this.render()
    }

    render() {
        this.innerHTML = `
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                    </li>
                </ul>
            </nav>
        `
        const ul = this.querySelector('ul')
        
        if (this._pageCount <= 6) {
            for (let i = 0; i < this._pageCount; i++) {
                const list = document.createElement('li')
                const a = document.createElement('a')
                if (this.currentPage === i+1) {
                    list.setAttribute('class', 'page-item bg-danger')
                    a.setAttribute('class',  'page-link')
                } else {
                    list.setAttribute('class',  'page-item')
                    a.setAttribute('class',  'page-link text-danger')
                }
                a.setAttribute('class',  'page-link')
                a.href = '#'
                a.innerText = i+1
                list.appendChild(a)
                ul.appendChild(list)
            }
        } else {
            for (let i = 0; i < 3; i++) {
                const list = document.createElement('li')
                const a = document.createElement('a')
                if (this.currentPage === i+1) {
                    list.setAttribute('class',  'page-item bg-danger')
                    a.setAttribute('class',  'page-link')
                } else {
                    list.setAttribute('class',  'page-item')
                    a.setAttribute('class',  'page-link text-danger')
                }
                a.href = '#'
                a.innerText = i+1
                list.appendChild(a)
                ul.appendChild(list)
            }

            const list = document.createElement('li')
            list.setAttribute('class',  'page-item disabled')
            const a = document.createElement('a')
            a.setAttribute('class',  'page-link text-danger')
            a.href = '#'
            a.innerText = '..'
            list.appendChild(a)
            ul.appendChild(list)

            for (let i = this._pageCount-3; i < this._pageCount; i++) {
                const list = document.createElement('li')
                const a = document.createElement('a')
                if (this.currentPage === i+1) {
                    list.setAttribute('class',  'page-item bg-danger')
                    a.setAttribute('class',  'page-link')
                } else {
                    list.setAttribute('class',  'page-item')
                    a.setAttribute('class',  'page-link text-danger')
                }
                a.href = '#'
                a.innerText = i+1
                list.appendChild(a)
                ul.appendChild(list)
            }
        }

        const list = document.createElement('li')
        const a = document.createElement('a')
        if (this.currentPage === this._pageCount){
            list.setAttribute('class', 'page-item disabled')
            a.setAttribute('class', 'page-link')    
        } else {
            list.setAttribute('class', 'page-item')
            a.setAttribute('class', 'page-link text-danger')
        }
        a.href = '#'
        a.innerText = 'Next'
        list.appendChild(a)
        ul.appendChild(list)
    }
}

customElements.define('nav-page', NavPage)
