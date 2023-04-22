class News {
    id: number;
    title: string;
    text: string;
    imagePath: string;

    constructor(id: number, title: string, text: string, path: string) {
        this.id = id;
        this.title = title;
        this.text =text;
        this.imagePath = path;
    }
}

export default News;