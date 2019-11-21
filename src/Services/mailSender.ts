export interface MailSender {
  send(): Promise<boolean>;
}
