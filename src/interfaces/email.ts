interface IAddress {
    name: string;
    email: string;
}

interface ITemplate {
    name: string;
    title?: string | undefined;
    url: string;
}

export interface IMessage {
    to?: IAddress | undefined;
    from?: IAddress | undefined;
    subject: string;
    template: ITemplate;
}