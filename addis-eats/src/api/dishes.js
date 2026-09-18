const CATEGORIES = ["All", "Meat", "Vegan", "Breakfast"];
const DELAY_MS = 700;
const ETHIOPIAN_PHONE = /^(?:\+251|0)9\d{8}$/;

export async function fetchDishes({ fail = false, signal } = {}) {
  await wait(DELAY_MS, signal);

  if (fail) {
    throw new Error("Could not reach the Addis Eats kitchen API. Try again.");
  }

  const res = await fetch("/dishes.json", { signal });

  if (!res.ok) {
    throw new Error(`Menu request failed (${res.status})`);
  }

  return res.json();
}

export async function fetchDishById(id, options = {}) {
  const dishes = await fetchDishes(options);
  return dishes.find((dish) => dish.id === Number(id)) ?? null;
}

export function getCategories() {
  return CATEGORIES;
}

export function isValidEthiopianPhone(phone) {
  return ETHIOPIAN_PHONE.test(String(phone || "").trim());
}

function wait(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }

    const timer = setTimeout(resolve, ms);

    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true }
    );
  });
}
