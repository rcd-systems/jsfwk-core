class RcdHistoryRouter {
    constructor() {
        this.routes = {};
        this.defaultRoute = () => {
        };
    }

    init() {
        window.onpopstate = (popstateEvent) => RcdHistoryRouter.notify(popstateEvent.state);
        return this;
    }

    static getInstance() {
        if (!RcdHistoryRouter.instance) {
            RcdHistoryRouter.instance = new RcdHistoryRouter().init();
        }
        return RcdHistoryRouter.instance;
    }

    static setDefaultRoute(callback) {
        RcdHistoryRouter.getInstance().defaultRoute = callback;
        return RcdHistoryRouter;
    }

    static addRoute(state, callback) {
        RcdHistoryRouter.getInstance().routes[state] = callback;
        return RcdHistoryRouter;
    }

    static setState(state) {
        if (state) {
            history.pushState(state, null, '#' + state);
        } else {
            history.pushState(state, null, '#');
        }
        return RcdHistoryRouter.notify(state);
    }

    static notify(state) {
        if (state) {
            const parametersIndex = state.indexOf("?");
            const route = parametersIndex == -1 ? state : state.substring(0, parametersIndex);
            if (RcdHistoryRouter.getInstance().routes[route]) {
                RcdHistoryRouter.getInstance().routes[route]();
            }
        } else {
            RcdHistoryRouter.getInstance().defaultRoute();
        }
        return RcdHistoryRouter;
    }

    static refreshState() {
        RcdHistoryRouter.setState(RcdHistoryRouter.getCurrentState());
    }

    static getCurrentState() {
        return location.hash && location.hash.substring(1);
    }

    static getParameters() {
        const currentState = RcdHistoryRouter.getCurrentState();
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