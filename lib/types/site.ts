export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface PersonalInfo {
  name: string;
  shortName: string;
  role: string;
  title: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  experienceYears: string;
  resumeUrl: string;
  bio: string;
  aboutParagraphs: string[];
}

export interface SiteConfig {
  personal: PersonalInfo;
  socialLinks: SocialLink[];
  navLinks: NavLink[];
}
