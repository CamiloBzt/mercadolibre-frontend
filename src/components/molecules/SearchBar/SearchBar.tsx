import Button from '@/components/atoms/Button/Button';
import SearchIcon from '@/components/atoms/SearchIcon/SearchIcon';
import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import { SearchBarProps } from './SearchBar.types';

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Buscar productos, marcas y más...',
  onSearch,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form className={styles.searchbar} onSubmit={handleSubmit}>
      <div className={styles.searchbar__container}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={styles.searchbar__input}
        />
        <div className={styles.searchbar__input_separator} />
        <Button
          type="submit"
          variant="search"
          className={styles.searchbar__button}
          aria-label="Buscar"
        >
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
