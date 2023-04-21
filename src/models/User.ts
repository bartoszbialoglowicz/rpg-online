class User {
    id: number;
    nickname: string;
    email: string;
    authToken: string;

    constructor(id: number, nickname: string, email: string, authToken: string) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.authToken = authToken;
    }
};

export default User;