class News {
    id: number;
    title: string;
    imagePath: string;

    constructor(id: number, title: string, path: string) {
        this.id = id;
        this.title = title;
        this.imagePath = path;
    }
}

export default News;