export default class RouterFake {
    public static createRouterFake(): any {
        return new RouterFake();
    }

    public routes;

    public configure(handler) {
        handler(this);
    }

    public map(routes) {
        this.routes = routes;
    }
}