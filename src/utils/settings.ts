export class AppSettings {
    public static readonly SERVER_IP = '127.0.0.1:8000';
    public static readonly PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    public static readonly EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    public static readonly NICKNAME_REGEX = /^[\s\S]{6,64}$/;
    public static readonly SHOP_ITEMS_LIMIT = 50;
}

export class InterfaceSettings {
    public static readonly STORE_GRID_ROWS = 5;
    public static readonly STORE_GRID_COLUMNS = 10;
}

export type mainContentName = 'CHARACTER' | 'NEWS' | 'EQUIPMENT' | 'MAP' | 'STORE' | 'ENEMIES' | 'QUESTS';