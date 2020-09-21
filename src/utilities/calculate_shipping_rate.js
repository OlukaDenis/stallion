const calculateShippingRate = (miles, isTruck, isOperable, hasKeys) => {
  const REQUIRES_WINCH = !isOperable || !hasKeys;
  const TIER_ONE_BASE_RATE = 1;
  const TIER_TWO_BASE_RATE = 0.95;
  const TIER_THREE_BASE_RATE = 0.9;

  const TIER_ONE_NEGOTIATION_FEE = 100;
  const TIER_TWO_NEGOTIATION_FEE = 150;
  const TIER_THREE_NEGOTIATION_FEE = 200;

  const NO_KEY_SURCHAGE = 100;
  const WINCH_SURCHAGE = 100;
  const PICKUP_RATE_ADJUSTMENT = 0.25;
  const INOPERABLE_RATE_ADJUSTMENT = 0.1;

  const TIER_ONE_MAX_MILES = 250;
  const TIER_TWO_MAX_MILES = 750;

  let [total, rate] =
    miles <= TIER_ONE_MAX_MILES
      ? [TIER_ONE_NEGOTIATION_FEE, TIER_ONE_BASE_RATE]
      : miles <= TIER_TWO_MAX_MILES
      ? [TIER_TWO_NEGOTIATION_FEE, TIER_TWO_BASE_RATE]
      : [TIER_THREE_NEGOTIATION_FEE, TIER_THREE_BASE_RATE];

  rate = isTruck ? rate + PICKUP_RATE_ADJUSTMENT : rate;

  rate += !isOperable ? INOPERABLE_RATE_ADJUSTMENT : 0;
  total += REQUIRES_WINCH ? WINCH_SURCHAGE : 0;
  total = hasKeys ? total : total + NO_KEY_SURCHAGE;

  total += rate * miles;

  return total;
};

export default calculateShippingRate;

export function calculateTotalShippingRate(quote) {
  return Number(
    Object.keys(quote.cars).reduce(
      (total, key) =>
        total +
        calculateShippingRate(
          quote.distance,
          quote.cars[key].isTruck,
          quote.cars[key].isOperable,
          quote.cars[key].hasKeys
        ),
      0
    )
  ).toFixed(2);
}