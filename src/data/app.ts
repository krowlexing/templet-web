export type AppData = {
    id: number;
    author: string;
    title: string;
    description: string;
    weblink: string;
    stopped: boolean;
    public: boolean;
};

export type NewApp = {
    title: string;
    description: string;
    weblink: string;
    version: string;
    public: boolean;
    status: 0 | 1 | 2 | 3;
};
