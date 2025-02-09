import { useState } from 'react';

// Main component that handles the filterable product table
function FilterableProductTable({ products }) {
  // State to handle the filter text and in-stock-only checkbox
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <h1>BK RECIPE BUDGET</h1>
      {/* Search bar component for filtering products */}
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly} />
      
      {/* Product table that displays products based on the filters */}
      <ProductTable 
        products={products} 
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

// Component that represents a category row in the product table
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

// Component that represents a product row in the table
function ProductRow({ product }) {
  // Highlight out-of-stock products by changing the name color to red
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

// Component that handles the display of the product table with the filtering logic
function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  // Loop through each product and check if it matches the filter criteria
  products.forEach((product) => {
    // Filter products based on the search text
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    // Filter products to only show those that are in stock if the checkbox is checked
    if (inStockOnly && !product.stocked) {
      return;
    }
    // If the product's category is different from the previous one, add a new category row
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    // Add the product row to the table
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category; // Keep track of the last category to avoid duplicate rows
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

// Component that renders the search bar and checkbox for filtering products
function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      {/* Input field for searching product names */}
      <input 
        type="text" 
        value={filterText} 
        placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value)} />
      
      {/* Checkbox to filter products based on in-stock availability */}
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

// Sample product data for testing
const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

// Main App component that initializes the filterable product table with sample data
export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
