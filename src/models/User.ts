class User {
    id: number;
    nickname: string;
    email: string;
    authToken: string;
    isNew: boolean;

    constructor(id: number, nickname: string, email: string, authToken: string, isNew: boolean) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.authToken = authToken;
        this.isNew =isNew;
    }
};

export default User;