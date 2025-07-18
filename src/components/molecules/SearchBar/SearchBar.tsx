import Button from '@/components/atoms/Button/Button';
import SearchIcon from '@/components/atoms/SearchIcon/SearchIcon';
import { useAppSelector } from '@/hooks/redux';
import { selectQuery } from '@/store/slices/searchSlice';
import React, { useEffect, useState } from 'react';
import styles from './SearchBar.module.scss';
import { SearchBarProps } from './SearchBar.types';

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Buscar productos, marcas y más...',
  onSearch,
}) => {
  const currentQuery = useAppSelector(selectQuery);

  const [query, setQuery] = useState(currentQuery || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    setQuery(currentQuery || '');
  }, [currentQuery]);

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
