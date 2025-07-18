import { mockProducts } from '@/test/mocks/products';
import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';

describe('ProductList Component', () => {
  const defaultProps = {
    products: mockProducts,
  };

  it('should render a list of products', () => {
    render(<ProductList {...defaultProps} />);

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });

  it('should show empty state when no products are provided', () => {
    render(<ProductList products={[]} />);

    expect(
      screen.getByText(/no se encontraron productos/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/intenta con otros términos/i)).toBeInTheDocument();
  });

  it('should render the correct number of product cards', () => {
    render(<ProductList {...defaultProps} />);

    const productCards = screen.getAllByRole('link');
    expect(productCards).toHaveLength(mockProducts.length);
  });

  it('should apply custom className', () => {
    const { container } = render(
      <ProductList {...defaultProps} className="custom-list" />
    );

    const listElement = container.firstChild;
    expect(listElement).toHaveClass('custom-list');
  });
});
