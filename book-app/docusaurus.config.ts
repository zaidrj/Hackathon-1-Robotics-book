import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'An AI-native textbook on the principles of robotics.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Custom fields for runtime configuration
  customFields: {
    apiUrl: process.env.API_URL || 'http://localhost:8001',
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/', // Serve the docs at the site's root
        },
        blog: false, // Disable the blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'AI-Driven Development',
      logo: {
        alt: 'AI-Driven Development',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'defaultSidebar',
          position: 'left',
          label: 'Book',
        },
        {
          href: 'https://github.com/panaversity',
          label: 'Panaversity',
          position: 'right',
        },
        {
          href: 'https://github.com/zaidrj/Hackathon-1-Robotics-book',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://github.com/zaidrj',
          label: 'My GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Book',
          items: [
            {
              label: 'Preface',
              to: '/preface',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Panaversity',
              href: 'https://www.panaversity.com/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Panaversity. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;