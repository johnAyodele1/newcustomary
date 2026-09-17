type QuantityStepperProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

export function QuantityStepper({ value, min = 1, max = 10, onChange }: QuantityStepperProps) {
  return (
    <div className="quantity-stepper" aria-label="Quantity">
      <button type="button" aria-label="Decrease quantity" disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))}>−</button>
      <span aria-live="polite">{value}</span>
      <button type="button" aria-label="Increase quantity" disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))}>+</button>
    </div>
  );
}
