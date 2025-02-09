### The BK Recipe Budget project demonstrates a filterable product table built with React. This app allows users to 
## Filter products to only show items that are in stock.
## The app uses state management with React hooks (useState) to control the filter input and stock filter options.

We are using the useState hook to manage state and props within functional components.


When the user types in the search bar, the onFilterTextChange function is called. It updates the state (filterText) in the parent component (FilterableProductTable).
The updated filterText is passed down as a prop to both SearchBar and ProductTable, causing them to re-render with the updated search value.
Similarly, when the "in stock" checkbox is toggled, onInStockOnlyChange updates the inStockOnly state, and this value is passed down to ProductTable to filter the displayed products.


Hosted Link :: https://food-data-phi.vercel.app/
