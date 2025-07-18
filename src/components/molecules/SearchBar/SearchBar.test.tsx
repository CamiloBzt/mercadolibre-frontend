import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import SearchBar from './SearchBar';

vi.mock('@/hooks/redux', () => ({
  useAppSelector: vi.fn(() => ''),
}));

describe('SearchBar Component', () => {
  const defaultProps = {
    onSearch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with default placeholder text', () => {
    render(<SearchBar {...defaultProps} />);

    expect(
      screen.getByPlaceholderText(/buscar productos, marcas y más/i)
    ).toBeInTheDocument();
  });

  it('should render with custom placeholder text', () => {
    render(<SearchBar {...defaultProps} placeholder="Buscar aquí" />);

    expect(screen.getByPlaceholderText(/buscar aquí/i)).toBeInTheDocument();
  });

  it('should call onSearch when form is submitted with valid input', async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/buscar productos/i);
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'iPhone' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('iPhone');
    });
  });

  it('should call onSearch when search button is clicked', async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/buscar productos/i);
    const button = screen.getByRole('button', { name: /buscar/i });

    fireEvent.change(input, { target: { value: 'Samsung' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('Samsung');
    });
  });

  it('should not call onSearch with empty query', async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const button = screen.getByRole('button', { name: /buscar/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onSearch).not.toHaveBeenCalled();
    });
  });

  it('should trim whitespace from search query', async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/buscar productos/i);
    const button = screen.getByRole('button', { name: /buscar/i });

    fireEvent.change(input, { target: { value: '  iPhone  ' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('iPhone');
    });
  });

  it('should update input value when typing', () => {
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText(
      /buscar productos/i
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'MacBook' } });
    expect(input.value).toBe('MacBook');
  });

  it('should prevent form submission when query is only whitespace', async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/buscar productos/i);
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(onSearch).not.toHaveBeenCalled();
    });
  });
});
