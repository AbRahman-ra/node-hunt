export interface EmailTemplateParams {
    recipient?: { name: string };
    company: { name: string };
    domain: string;
}

export interface EmailDto {
    // context: Record<string, any>;
    to: string;
    cc?: string;
    bcc?: string;
    replyTo?: string;
    subject: string;
    body: string;
    attachments?: { path: string; name?: string }[];
}
