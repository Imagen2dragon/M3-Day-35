const AREAS = ["Bole", "Piassa", "CMC", "Kazanchis", "Mexico"];
const ETHIOPIAN_PHONE = /^(?:\+251|0)9\d{8}$/;

export function validateCheckout(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name";
  }

  if (!ETHIOPIAN_PHONE.test(form.phone.trim())) {
    errors.phone = "Use 09xxxxxxxx or +2519xxxxxxxx";
  }

  if (!AREAS.includes(form.area)) {
    errors.area = "Choose a delivery area";
  }

  if (!form.payment) {
    errors.payment = "Choose a payment method";
  }

  if (form.notes.length > 120) {
    errors.notes = "Keep notes under 120 characters";
  }

  return errors;
}

export { AREAS };
