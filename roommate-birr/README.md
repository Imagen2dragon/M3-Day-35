# Roommate Birr — Capstone Brief

## The problem

In shared student housing around Addis Ababa — Bole, CMC, Ayat — roommates buy injera, pay Wi‑Fi, split TeleBirr airtime, and settle electricity. Someone always keeps a messy notebook or WhatsApp thread, and by month’s end nobody agrees who owes whom. Arguments start over 80 ETB of shiro and end with distrust.

Roommate Birr is a small web app where one flat tracks shared expenses in ETB, sees running balances per roommate, and records settlements when someone pays back through TeleBirr.

## The user

**Primary user:** a university student living with 2–4 roommates who already uses TeleBirr and wants a clear, fair record of shared spending — not a full banking product.

**First action on screen 1:** open the flat dashboard and see who is owed money this week.

## Five screens and the data each needs

1. **Dashboard (`/`)** — list of roommates with net balance (ETB), total spent this month, link to add an expense.
2. **Expenses (`/expenses`)** — fetched/local list of shared costs; filter by category in the URL (`?category=food`).
3. **Expense detail (`/expenses/:id`)** — one expense: amount, payer, split among whom, notes.
4. **Add expense (`/expenses/new`)** — controlled form (amount, category, who paid, who shares); requires sign-in.
5. **Settlements (`/settlements`)** — history of “X paid Y via TeleBirr” records; lazy-loaded later in the module.

## Route map

| Path | Renders | Param | Auth |
|---|---|---|---|
| `/` | Dashboard | — | no |
| `/expenses` | ExpenseList | — | no |
| `/expenses/:id` | ExpenseDetail | `id` | no |
| `/expenses/new` | AddExpense | — | **yes** |
| `/settlements` | Settlements | — | no |
| `/login` | Login | — | no |
| `*` | NotFound | — | no |

## Why this scope works

- One clear user (roommate treasurer / any flatmate)
- One data source (expenses + people in the flat)
- 5–6 screens — finishable in five weeks
- Different domain from Addis Eats (no food ordering UI reuse)
- Will move to Next.js from Day 36 with the same routes
