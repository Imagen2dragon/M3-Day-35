# Addis Eats — Day 35 Mini-Project

Food-ordering frontend for Addis Ababa. Built for IBT CodeOps Module 3.

## Run (Vite — not Live Server)

```bash
cd addis-eats
npm install
npm run dev
```

Open **http://localhost:5173**

Fresh-clone check: clone this repo, install, and run. Everything needed is committed.

## Screens

| Screen | Route | What it does |
|---|---|---|
| Home | `/` | Today's specials, link into the menu |
| Menu | `/menu` | Fetched dishes, category filter in the URL |
| Dish | `/menu/:id` | One dish, add to order |
| Cart | `/cart` | Order lines and the running ETB total |
| Checkout | `/checkout` | Validated form, guarded by sign-in |
| Orders | `/orders` | Lazy-loaded receipts |
| Login | `/login` | Session for the checkout guard |

## Day checklist

| From day | Where it shows up |
|---|---|
| 26–27 | `DishCard`, props, keys, spicy badge conditional |
| 28 | Controlled checkout form + cart events |
| 29 | `useFetch` effect + AbortController cleanup |
| 30 | `useFetch` hook + Zustand cart store + Auth context |
| 31 | Nested `Layout`/`Outlet`, `/menu/:id`, `RequireAuth` |
| 33–34 | `validate.js`, `ErrorBoundary`, lazy `Orders` |

## State placement

| State | Lives in |
|---|---|
| Selected category | URL (`?category=`) |
| Fetched dishes | Menu / Home (via `useFetch`) |
| Order / cart | Zustand store (`cart/cartStore.js`) |
| Sign-in session | Auth context |
| Checkout form fields | Checkout component only |

## Failure checks

1. Slow load → spinner on `/menu`
2. `/menu?fail=1` → error + Retry
3. Empty category filter → friendly empty note
4. Nonsense URL → NotFound
5. `/checkout` signed out → redirect, then return after login
6. Reload any screen → still works; cart persists

## Presentation talking point

“Cart lives in a store because Home badge, Menu, Cart and Checkout all need it. Checkout form fields stay inside Checkout because no other screen reads them.”
