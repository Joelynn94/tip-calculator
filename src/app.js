import { AppHeader } from "./components/AppHeader";
import { CalcButton } from "./components/CalcButton";
import { AmountInput } from "./components/AmountInput";

export const getTipPercentage = (el, selector) => {
  const shadow = el.shadowRoot;
  const tipPercent = Number(shadow.querySelector(selector).value) / 100;
  console.log(tipPercent);
  return tipPercent;
};

export const getBillAmount = (el, selector) => {
  const shadow = el.shadowRoot;
  const billAmount = Number(shadow.querySelector(selector).value).toFixed(2);
  console.log(billAmount);
  return billAmount;
};

export { CalcButton, AppHeader, AmountInput };
