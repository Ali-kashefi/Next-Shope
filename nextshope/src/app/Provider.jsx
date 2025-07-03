"use client"; // This directive marks the component as a Client Component in Next.js, meaning it runs on the client-side.

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Importing necessary modules from react-query for data fetching and caching.
import React from "react"; // Importing the React library.

/**
 * @typedef {object} ProviderProps
 * @property {React.ReactNode} children - The child components that will be rendered within this provider.
 */

/**
 * Provider component that sets up React Query's QueryClient for its children.
 * This ensures that all child components can access and use React Query hooks (like useQuery, useMutation).
 *
 * @param {ProviderProps} { children } - Props object containing children to be rendered.
 * @returns {JSX.Element} A QueryClientProvider wrapping the children.
 */
export default function Provider({ children }) {
  // Initialize a new QueryClient instance using React's useState hook.
  // This ensures the same client instance is used across re-renders.
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    // Wrap the children with QueryClientProvider, passing the created queryClient.
    // This makes the queryClient available to all components in the subtree.
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}