export default class RouterFake {
    public routes;

    public configure(handler) {
        handler(this);
    }

    public map(routes) {
        this.routes = routes;
    }
}