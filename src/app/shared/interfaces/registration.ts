export interface Registration {
  firstName: string;
  lastName: string;
  email: string;
  organization?: string;
  role?: string;
  newsletterConsent: boolean;
  pictureConsent: boolean;
}
