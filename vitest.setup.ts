// Registers jest-dom matchers (toBeInTheDocument, toHaveClass, ...) on Vitest's
// expect and runs after each test cleanup for React Testing Library.
import "@testing-library/jest-dom/vitest"

// jsdom does not implement matchMedia, which several shadcn primitives (the
// sidebar's useIsMobile hook, for one) call on mount. Provide a no-op stub so
// component render tests don't blow up.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList
}
