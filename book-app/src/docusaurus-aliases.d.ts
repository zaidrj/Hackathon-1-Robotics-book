// Type declarations for Docusaurus path aliases
// These help the IDE understand Docusaurus module paths at edit time
// Note: Docusaurus resolves these paths at runtime, so these are just for IDE support

declare module '@docusaurus/Link' {
  import type {ComponentProps} from 'react';
  
  export interface LinkProps extends Omit<ComponentProps<'a'>, 'href'> {
    to?: string;
    href?: string;
    isNavLink?: boolean;
    activeClassName?: string;
    activeStyle?: React.CSSProperties;
    exact?: boolean;
    strict?: boolean;
  }
  
  const Link: React.ComponentType<LinkProps>;
  export default Link;
}

declare module '@docusaurus/useDocusaurusContext' {
  interface DocusaurusContext {
    siteConfig: {
      title: string;
      tagline: string;
      url: string;
      baseUrl: string;
      [key: string]: any;
    };
  }
  
  export default function useDocusaurusContext(): DocusaurusContext;
}

declare module '@theme/Layout' {
  import type {ComponentProps} from 'react';
  
  export interface LayoutProps {
    title?: string;
    description?: string;
    image?: string;
    keywords?: string | string[];
    permalink?: string;
    wrapperClassName?: string;
    pageClassName?: string;
    searchMetadatas?: {
      version?: string;
      tag?: string;
    };
    children?: React.ReactNode;
  }
  
  const Layout: React.ComponentType<LayoutProps>;
  export default Layout;
}

declare module '@theme/Heading' {
  import type {ComponentProps} from 'react';
  
  export interface HeadingProps extends ComponentProps<'h1'> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  }
  
  const Heading: React.ComponentType<HeadingProps>;
  export default Heading;
}

