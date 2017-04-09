class RcdHistoryRouter {
    constructor() {
        this.routes = {};
        this.defaultRoute = () => {
        };
        window.onpopstate = (popstateEvent) => this.notify(popstateEvent.state);
    }

    init() {
        return this;
    }

    static getInstance() {
        if (!RcdHistoryRouter.instance) {
            RcdHistoryRouter.instance = new RcdHistoryRouter().init();
        }
        return RcdHistoryRouter.instance;
    }

    setDefaultRoute(callback) {
        this.defaultRoute = callback;
        return this;
    }

    addRoute(state, callback) {
        this.routes[state] = callback;
        return this;
    }

    setState(state) {
        if (state) {
            history.pushState(state, null, '#' + state);
        } else {
            history.pushState(state, null, '#');
        }
        return this.notify(state);
    }

    notify(state) {
        if (state) {
            const parametersIndex = state.indexOf("?");
            const route = parametersIndex == -1 ? state : state.substring(0, parametersIndex);
            if (this.routes[route]) {
                this.routes[route]();
            }
        } else {
            this.defaultRoute();
        }
        return this;
    }

    refreshState() {
        this.setState(this.getCurrentState());
    }

    getCurrentState() {
        return location.hash && location.hash.substring(1);
    }

    getParameters() {
        const currentState = this.getCurrentState();
        const parametersIndex = currentState.indexOf("?");

        const parameters = {};
        if (parametersIndex !== -1) {
            const parametersString = currentState.substring(parametersIndex + 1);
            parametersString.split('&').forEach((parameterEntry) => {
                const parameterEntryValue = parameterEntry.split('=');
                parameters[parameterEntryValue[0]] = parameterEntryValue[1];
            });
        }
        return parameters;
    }
}