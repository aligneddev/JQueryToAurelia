export default class HttpFake {

    public static createHttpFake(): any {
        return new HttpFake();
    }

    public items: any[];

    public fetch(url) {
        return new Promise(resolve => {
            resolve({ json: () => this.items });
        });
    }

    public configure(func) { }
}
