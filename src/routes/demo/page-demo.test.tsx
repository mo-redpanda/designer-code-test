import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { PageDemo } from './page-demo';

describe('PageDemo dashboard', () => {
  it('renders overview and how to connect sections', () => {
    const html = renderToStaticMarkup(<PageDemo />);
    expect(html).toContain('Overview');
    expect(html).toContain('How to connect');
    expect(html).toContain('Running');
  });
});
