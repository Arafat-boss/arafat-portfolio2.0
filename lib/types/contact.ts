export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export interface ContactMessageDocument extends ContactFormData {
  _id?: string;
  createdAt: string | Date;
  status: "unread" | "read" | "archived";
  ip?: string;
  userAgent?: string;
}
