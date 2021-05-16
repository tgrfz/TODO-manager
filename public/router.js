let TestPage = {
    render: async () => {
        return `
            <p>Test SPA content page.</p>
        `;
    },
}

async function render(view, into) {
    if ('before_render' in view) {
        await view.before_render();
    }
    into.innerHTML = await view.render();
    if ('after_render' in view) {
        await view.after_render();
    }
}

export class Router {
    constructor(routes) {
        this.routes = routes;
        window.addEventListener('popstate', () => this._onPopState());
    }

    static init(routes) {
        if (Router._instance != null) {
            return Router._instance;
        }

        const router = new Router(routes);
        Router._instance = router;

        router._loadInitial();
        return router;
    }

    static get instance() {
        return this._instance;
    }

    static get _path() {
        return window.location.pathname;
    }

    async navigate(url) {
        console.log("Navigate: " + url);
        window.history.pushState({}, "", url);
        await this._loadPage(url);
    }

    async _loadPage(url) {
        console.log("Load page: " + url);

        const page = this.routes[url] || TestPage;
        const headerView = page.header || { render: async () => `` }

        await render(headerView, document.getElementById('header'))
        await render(page, document.getElementById('content'))
    }

    _loadInitial() {
        console.log("Initial: " + Router._path);
        window.history.replaceState({}, "", Router._path);
        this._loadPage(Router._path);
    }

    _onPopState() {
        console.log("Pop State: " + Router._path);
        this._loadPage(window.location.pathname);
    }
}

Router._instance = null;
