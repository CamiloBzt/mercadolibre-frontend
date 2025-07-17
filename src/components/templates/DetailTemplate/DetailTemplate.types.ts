import React from 'react';

export interface DetailTemplateProps {
  children: React.ReactNode;
  categories?: string[];
  onSearch: (query: string) => void;
}
