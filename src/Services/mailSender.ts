export interface IMailSender {
    send(): Promise<boolean>;
}
