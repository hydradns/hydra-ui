// Registers jest-dom matchers (toBeInTheDocument, toHaveClass, ...) on Vitest's
// expect and runs after each test cleanup for React Testing Library.
import "@testing-library/jest-dom/vitest"

// jsdom lacks a few browser APIs that shadcn primitives, Radix UI, and vaul
// rely on at mount time (matchMedia for the sidebar's useIsMobile hook,
// ResizeObserver / pointer-capture / scrollIntoView for dialogs, drawers, and
// switches). Provide minimal shims so component render tests don't throw.
if (typeof window !== "undefined") {
  if (!window.matchMedia) {
    window.matchMedia = (query: string) =>
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

  if (!window.ResizeObserver) {
    window.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver
  }

  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {}
  }
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false
  }
  if (!Element.prototype.setPointerCapture) {
    Element.prototype.setPointerCapture = () => {}
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = () => {}
  }
}
