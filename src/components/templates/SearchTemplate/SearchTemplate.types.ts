import React from 'react';

export interface SearchTemplateProps {
  children: React.ReactNode;
  onSearch: (query: string) => void;
}
