# Addis Eats — Day 35 Mini-Project

A complete food-ordering frontend for Addis Ababa: browse a menu loaded from an API, filter by category, open any dish on its own page, build an order, and check out through a validated form. Built for IBT College CodeOps Module 3 (React & Next.js).

## Quick Start (Vite)

```bash
cd addis-eats
npm install
npm run dev
```

Open **http://localhost:5173**

> **Fresh-clone check:** clone this repo, install, and run. Everything required is committed and runs without external backend dependencies.

---

## Screens & Routes

| Screen | Route | What it does | Auth |
|---|---|---|---|
| **Home** | `/` | Today's specials, hero banner, link into the menu | Public |
| **Menu** | `/menu` | Fetched dishes, category filter in the URL (`?category=`) | Public |
| **Dish** | `/menu/:id` | Dynamic route: single dish details, add to order | Public |
| **Cart** | `/cart` | Order lines, running ETB total, modal confirmation to clear | Public |
| **Checkout** | `/checkout` | Controlled validated form, guarded by sign-in session | **Guarded** |
| **Orders** | `/orders` | Lazy-loaded order receipts (`React.lazy` + `Suspense`) | Public |
| **Login** | `/login` | Authentication session; preserves return URL | Public |
| **NotFound** | `*` | Catch-all 404 screen | Public |

---

## Component Tree & State Ownership (PDF Page 4)

```text
App
`-- ErrorBoundary
    `-- AuthProvider
        `-- Layout (header, brand, nav, CartBadge, user-chip / sign-in, Outlet, footer)
            |-- Home (owns: specials fetch state)
            |-- Menu (owns: category via URL, dishes via useFetch)
            |   |-- CategoryBar (props: categories, selected, onSelect)
            |   `-- DishList (props: dishes, onAdd)
            |       `-- DishCard (props: dish, onAdd)
            |-- DishDetail (reads :id from useParams, fetches single dish, onAdd)
            |-- Cart (reads: cartStore; owns: isClearModalOpen)
            |   |-- CartPanel (props: items, onRemove)
            |   `-- Modal (generic modal shell for clear confirmation)
            `-- Checkout (owns: form state, touched fields, submitting state)
                `-- Field (reusable form field with error and hint)
```

---

## State Placement Decision Record (PDF Page 4)

| State | Where it belongs | Rationale |
|---|---|---|
| **Selected category** | **The URL (`?category=...`)** | Shareable, bookmarkable, and survives browser refresh. |
| **Fetched dishes** | **The component that displays them (`Menu`, `Home`)** | Scoped to the view via `useFetch` with abort cleanup; not needed globally. |
| **The order / cart** | **Zustand store (`cartStore.js`)** | Read and updated across four screens (`Layout` badge, `Menu`, `DishDetail`, `Cart`, `Checkout`). |
| **Sign-in session** | **Context (`AuthProvider`, `useAuth`)** | Rarely changes, needed by `RequireAuth` route guard and `Layout`. |
| **Checkout form fields** | **The `Checkout` component only** | Local controlled form state; no other screen reads it. |
| **Whether a modal is open** | **The component that opens it (`Cart`)** | Local UI state for user confirmation dialogs. |

---

## Folder Structure (PDF Page 5)

```text
src/
|-- api/
|   `-- dishes.js            # fetch helpers (fetchDishes, fetchDishById, categories)
|-- hooks/
|   |-- useFetch.js          # reusable data fetching with cleanup & retry
|   `-- useDebounce.js       # reusable debounce utility
|-- ui/
|   |-- Button.jsx           # generic button component (no business logic)
|   |-- Modal.jsx            # generic modal dialog shell
|   |-- Spinner.jsx          # loading spinner
|   |-- EmptyState.jsx       # empty state message card
|   |-- ErrorNote.jsx        # fetch error card with retry
|   `-- ErrorBoundary.jsx    # React class error boundary
|-- cart/
|   |-- cartStore.js         # Zustand store with localStorage persistence
|   |-- Cart.jsx             # cart screen
|   |-- CartPanel.jsx        # order lines list component
|   `-- CartBadge.jsx        # navigation counter badge
|-- menu/
|   |-- Menu.jsx             # menu screen with category search params
|   |-- CategoryBar.jsx      # filter chips
|   |-- DishList.jsx         # list container
|   `-- DishCard.jsx         # single dish card
|-- checkout/
|   |-- Checkout.jsx         # controlled checkout form
|   |-- Field.jsx            # accessible form input field
|   `-- validate.js          # validation rules (phone, name, area, payment)
|-- auth/
|   |-- AuthContext.js       # context definition (clean fast refresh)
|   |-- AuthProvider.jsx     # auth context provider with session storage
|   |-- useAuth.js           # auth hook
|   |-- RequireAuth.jsx      # route guard component
|   `-- Login.jsx            # sign-in screen with return-to logic
|-- pages/
|   |-- Home.jsx             # hero & specials
|   |-- Orders.jsx           # lazy-loaded receipts screen
|   `-- NotFound.jsx         # 404 catch-all
|-- App.jsx                  # route tree configuration
|-- Layout.jsx               # persistent site shell
`-- index.css                # accessible, responsive styles
```

---

## Day Requirements Checklist

| From Day | Requirement | Implementation in Addis Eats |
|---|---|---|
| **26–27** | Composed components, props, keys, conditional rendering | `DishList` composes `DishCard`, props passed cleanly, `key={dish.id}`, spicy badge & conditional empty states |
| **28** | State and events; a controlled form | `useState` handlers, controlled `Checkout` inputs, select, radios, and textarea |
| **29** | Data fetched in an effect, with cleanup | `useFetch` hook runs in `useEffect` with `AbortController` signal and cleanup |
| **30** | A custom hook, and context or a store | `useFetch` & `useDebounce` custom hooks, `AuthContext`, and Zustand `useCartStore` |
| **31** | Nested routes, a dynamic route, a guarded route | Nested `Layout` with `<Outlet />`, dynamic `/menu/:id`, and `/checkout` wrapped in `<RequireAuth>` |
| **33–34** | Validation, an error boundary, one lazy route | `validateCheckout()`, root `<ErrorBoundary>`, lazy-loaded `Orders` route with `<Suspense>` |

---

## Testing the 6 Failure Paths (PDF Page 6)

| # | Test Scenario | Action | Expected Behavior |
|---|---|---|---|
| 1 | **Throttle to Slow 3G** | Open DevTools Network tab, choose "Slow 3G", load `/menu` | Spinner displays `Loading today's menu…`; no blank screen or layout shift. |
| 2 | **API / Kitchen Failure** | Visit `/menu?fail=1` | Error card displays with message and working **Retry** button. |
| 3 | **Filter to empty category** | Visit `/menu?category=Dessert` | Shows friendly note: *"No dishes in this category. Try another filter..."* — not an error or broken UI. |
| 4 | **Type a nonsense URL** | Navigate to `/bad-url-123` | Clean `NotFound` screen renders with link back to Home. |
| 5 | **Open `/checkout` signed out** | Log out, open `/checkout` directly | Immediately redirects to `/login` with location state preserved; upon login, returns automatically to `/checkout`. |
| 6 | **Reload on every screen** | Press F5 on `/`, `/menu`, `/menu/1`, `/cart`, `/checkout`, `/orders` | Every screen loads cold without crashing; cart persists in localStorage. |

### Keyboard & Greyscale Accessibility Checks (PDF Page 6)
- **Keyboard Navigation:** Complete checkout solely using `Tab`, `Space`, `Enter`, and arrow keys. Focus rings are explicitly styled with `:focus-visible`.
- **Greyscale Pass:** Confirm that errors are not conveyed by color alone. Every `.field-error` features a bold warning prefix (`⚠️`), and invalid inputs have distinct 2px borders and dashed outlines.

---

## Review Questions & Answers (PDF Page 10)

1. **Which day's topic is currently weakest in your project, and how will you close that gap?**  
   *Answer:* Initial builds commonly overlook error boundary fallback recovery (Day 33) or lazy loading (Day 34). In this project, `ErrorBoundary` wraps the entire route tree with an interactive "Try again" reset button, and `Orders` is cleanly split into a lazy chunk with a polished `Suspense` spinner.
2. **Name one piece of state in your build that is higher in the tree than it needs to be.**  
   *Answer:* It is tempting to place checkout form fields in global store or layout context. Here, form fields are strictly kept in the `Checkout` component, and modal open states live only in `Cart`.
3. **What happens in your application if the data request fails? Show the exact screen.**  
   *Answer:* If the API fails (e.g. `/menu?fail=1`), `useFetch` catches the error, stops the spinner, and renders `ErrorNote`: a card with an alert role, clear error text, and a "Retry" button.
4. **Why is code structure worth a fifth of the mark when the features are worth 40%?**  
   *Answer:* Two projects can look identical on the happy path, but one with tangled global state breaks on edge cases and is unmaintainable. Placing state where it belongs and structuring by feature makes the app resilient to change.
5. **For your capstone: who is the user, and what do they do on the first screen?**  
   *Answer:* For *Roommate Birr*, the user is a university student living in shared housing in Addis Ababa. On the first screen (Dashboard), they immediately see the net balance of who owes whom in ETB this week.
6. **What would make your capstone too large to finish, and how have you scoped that out?**  
   *Answer:* Adding multi-currency conversion, real banking APIs, automated bank-scraping, or multi-flat social feeds would blow up the scope. It is scoped strictly to 5 screens, one local flat, and one currency (ETB) with TeleBirr reference tracking.

---

## 8-Minute Presentation Walkthrough Plan (PDF Page 7)

- **0–1 min:** Overview of Addis Eats, target users in Addis Ababa, and project architecture.
- **1–4 min:** Live walkthrough: browse menu, URL category filtering, open dish detail, add items to cart, open cart, clear cart confirmation modal, proceed to checkout, sign in with return-to-origin, and complete order.
- **4–6 min:** Architectural decisions: why the cart uses a Zustand store (read by 4 screens) while form fields and modal visibility remain strictly local.
- **6–7 min:** Failure path demonstration: simulated kitchen API failure (`/menu?fail=1`) with retry, and cold-reloading on dynamic route `/menu/2`.
- **7–8 min:** Next steps (moving to Next.js in Day 36) and Q&A.
