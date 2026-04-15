import React from 'react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { urlFor } from './sanity';

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(1200).auto('format').url();
      return (
        <img
          src={src}
          alt={value.alt ?? ''}
          loading="lazy"
        />
      );
    },
  },
  marks: {
    link: ({ value, children }: { value?: { href?: string }; children: React.ReactNode }) => {
      const href = value?.href ?? '#';
      const isExternal = href.startsWith('http');
      return (
        <a
          href={href}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          target={isExternal ? '_blank' : undefined}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    normal:     ({ children }) => <p>{children}</p>,
    h2:         ({ children }) => <h2>{children}</h2>,
    h3:         ({ children }) => <h3>{children}</h3>,
    h4:         ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
};

export interface PTProps {
  value: any;
}

export default function PT({ value }: PTProps) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
