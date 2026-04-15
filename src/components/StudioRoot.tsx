import React from 'react';
import { Studio } from 'sanity';
import config from '../../sanity.config';
import 'sanity/structure';

export default function StudioRoot() {
  return <Studio config={config} />;
}
