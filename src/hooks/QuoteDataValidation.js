import { useState } from "react";
import { isValidPhoneNumber, isValidEmail } from '../utilities/data_validators';

export const useIsValidOrigin = (origin) => {
    
    const [hasOriginError, setHasOriginError] = useState(false);

    if (hasOriginError && (origin.match(/,/g) || []).length) {
      setHasOriginError(false);
    } else if (!hasOriginError && !(origin.match(/,/g) || []).length) {
      setHasOriginError(true);
    }

    return !hasOriginError;
}

export const useIsValidDestination = (destination) => {
    const [hasDestinationError, setHasDestinationError] = useState(false);
    if (hasDestinationError && (destination.match(/,/g) || []).length) {
      setHasDestinationError(false);
    } else if (!hasDestinationError && !(destination.match(/,/g) || []).length) {
      setHasDestinationError(true);
    }
    return !hasDestinationError;
}

export const useIsValidSelectedCars = (cars) => {
    const [hasSelectedCarsError, setHasSelectedCarsError] = useState(false);

    if (hasSelectedCarsError && Object.keys(cars).length > 0) {
      setHasSelectedCarsError(false);
    } else if (!hasSelectedCarsError && Object.keys(cars).length < 1) {
      setHasSelectedCarsError(true);
    }
    return !hasSelectedCarsError;
}

export const useIsValidPickupDate = (pickupDate) => {
    const [hasPickupDateError, setHasPickupDateError] = useState(false);

    if (hasPickupDateError && pickupDate) {
      setHasPickupDateError(false);
    } else if (!hasPickupDateError && !pickupDate) {
      setHasPickupDateError(true);
    }
    return !hasPickupDateError;
}

export const useIsValidName = (name) => {
  const [hasNameError, setHasNameError] = useState(false);
  if (hasNameError && name) {
    setHasNameError(false);
  } else if (!hasNameError && !name) {
    setHasNameError(true);
  }
  return !hasNameError;
};

export const useIsValidBusinessName = (businessName) => {
  const [hasBusinessNameError, setHasBusinessNameError] = useState(false);
  if (hasBusinessNameError && businessName) {
    setHasBusinessNameError(false);
  } else if (!hasBusinessNameError && !businessName) {
    setHasBusinessNameError(true);
  }
  return !hasBusinessNameError;
};

export const useIsValidAddress = (address) => {
  const [hasAddressError, setHasAddressError] = useState(false);
  if (hasAddressError && address) {
    setHasAddressError(false);
  } else if (!hasAddressError && !address) {
    setHasAddressError(true);
  }
  return !hasAddressError;
};

export const useIsValidEmail = (email) => {

    const [hasEmailError, setHasEmailError] = useState(false);

    if (hasEmailError && isValidEmail(email)) {
      setHasEmailError(false);
    } else if (!hasEmailError && !isValidEmail(email)) {
      setHasEmailError(true);
    }
    return !hasEmailError;
}

export const useIsValidPhoneNumber = (phone) => {
    const [hasPhoneError, setHasPhoneError] = useState(false);
    if (hasPhoneError && isValidPhoneNumber(phone)) {
      setHasPhoneError(false);
    } else if (!hasPhoneError && !isValidPhoneNumber(phone)) {
      setHasPhoneError(true);
    }
    return !hasPhoneError;
}


const useIsValidQuoteData = (quote) => {
  const isValidOrigin = useIsValidOrigin(quote.origin);
  const isValidDestination = useIsValidDestination(quote.destination);
  const isValidSelectedCars = useIsValidSelectedCars(quote.cars);
  const isValidPickupDate = useIsValidPickupDate(quote.pickupDate);
  const isValidName = useIsValidName(quote.name);
  const isValidPhoneNumber = useIsValidPhoneNumber(quote.phone);
  const isValidEmail = useIsValidEmail(quote.email);

  return (
    isValidOrigin &&
    isValidDestination &&
    isValidSelectedCars &&
    isValidPickupDate &&
    isValidName &&
    isValidPhoneNumber &&
    isValidEmail
  );
};

export default useIsValidQuoteData;