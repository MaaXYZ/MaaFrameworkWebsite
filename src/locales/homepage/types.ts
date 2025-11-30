// 首页国际化文案类型定义

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  buttons: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface Integration {
  id: string;
  name: string;
  recommended?: boolean;
  scenario: string;
  advantages: string[];
  codeExample: {
    language: string;
    code?: string;
    image?: string;
  };
  resources?: {
    label: string;
    link: string;
  }[];
}

export interface CTACard {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  link: string;
}

export interface FooterColumn {
  title: string;
  links: {
    label: string;
    link: string;
  }[];
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  content: string;
  project: string;
}

export interface HomepageContent {
  hero: HeroContent;
  features: {
    title: string;
    items: Feature[];
  };
  integrations: {
    title: string;
    subtitle: string;
    items: Integration[];
    comparison: {
      dimensions: string[];
    };
    labels: {
      recommended: string;
      scenario: string;
      advantages: string;
      resources: string;
    };
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: Testimonial[];
  };
  community: {
    title: string;
    subtitle: string;
    viewMore: string;
  };
  cta: {
    title: string;
    subtitle: string;
    cards: CTACard[];
  };
  footer: {
    about: {
      title: string;
      description: string;
    };
    columns: FooterColumn[];
    copyright: string;
  };
}
