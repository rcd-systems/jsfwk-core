class RcdHistoryRouter {
    constructor() {
        this.routes = {};
        this.defaultRoute;
        window.onpopstate = (event) => this.setState(event.state);
    }

    init() {
        return this;
    }

    addDefaultRoute(callback) {
        this.defaultRoute = callback;
        return this;
    }

    addRoute(route, callback) {
        this.routes[route] = callback;
        return this;
    }

    setState(state) {
        if (state) {
            history.pushState(state, null, '#' + state);
            var parametersIndex = state.indexOf("?");
            var route = parametersIndex == -1 ? state : state.substring(0, parametersIndex);
            this.routes[route]();
        } else {
            this.defaultRoute();
            history.pushState(state, null, '#');
        }

        return this;
    }

    getCurrentState() {
        return location.hash && location.hash.substring(1);
    }

    getParameters() {
        var currentState = this.getCurrentState();
        var parametersIndex = currentState.indexOf("?");

        var parameters = {};
        if (parametersIndex !== -1) {
            var parametersString = currentState.substring(parametersIndex + 1);
            parametersString.split('&').forEach((parameterEntry) => {
                var parameterEntryValue = parameterEntry.split('=');
                parameters[parameterEntryValue[0]] = parameterEntryValue[1];
            });
        }
        return parameters;
    }
}