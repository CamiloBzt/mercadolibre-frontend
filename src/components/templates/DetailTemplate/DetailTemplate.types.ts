import React from 'react';

export interface DetailTemplateProps {
  children: React.ReactNode;
  categories?: string[];
  publicationNumber?: number;
  onSearch: (query: string) => void;
}
