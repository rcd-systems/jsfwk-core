class RcdHistoryRouter extends RcdObject {
    constructor() {
        super();
        this.routes = {};
        this.defaultRoute = () => {
        };
    }

    init() {
        window.onpopstate = () => RcdHistoryRouter.refresh();
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

    static buildState(state, params) {
        if (state && params) {
            state += '?';
            let firstParameter = true;
            for (const paramName in params) {
                if (params[paramName]) {
                    if (firstParameter) {
                        firstParameter = false;
                    } else {
                        state += '&'
                    }
                    state += paramName + '=' + encodeURIComponent(params[paramName]);
                }
            }
        }
        return state;
    }

    static setState(state, params) {
        state = RcdHistoryRouter.buildState(state, params);

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
                return RcdHistoryRouter;
            }
        }
        RcdHistoryRouter.getInstance().defaultRoute();
        return RcdHistoryRouter;
    }

    static refresh() {
        RcdHistoryRouter.notify(RcdHistoryRouter.getCurrentState());
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
                parameters[parameterEntryValue[0]] = decodeURIComponent(parameterEntryValue[1]);
            });
        }
        return parameters;
    }
}