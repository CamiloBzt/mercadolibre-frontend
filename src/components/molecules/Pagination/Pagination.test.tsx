import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with basic pagination', () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Siguiente')).toBeInTheDocument();
  });

  it('should call onPageChange when a page button is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('should call onPageChange when the next button is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByRole('button', { name: /siguiente/i }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange when the previous button is clicked', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        {...defaultProps}
        currentPage={3}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /anterior/i }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should show ellipsis for large page counts', () => {
    render(<Pagination {...defaultProps} totalPages={20} currentPage={10} />);

    expect(screen.getAllByText('...')).toHaveLength(2);
  });

  it('should highlight the current page', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);

    const currentPageButton = screen.getByRole('button', { name: /página 3/i });
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  });

  it('should not render when totalPages is 1 or less', () => {
    const { container } = render(
      <Pagination {...defaultProps} totalPages={1} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should not render when totalPages is 0', () => {
    const { container } = render(
      <Pagination {...defaultProps} totalPages={0} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should show correct pages in the middle range', () => {
    render(<Pagination {...defaultProps} totalPages={10} currentPage={5} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should not call onPageChange when clicking the current page', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        {...defaultProps}
        currentPage={3}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /página 3/i }));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    render(<Pagination {...defaultProps} className="custom-pagination" />);

    const paginationElement = screen.getByRole('navigation');
    expect(paginationElement).toHaveClass('custom-pagination');
  });
});
