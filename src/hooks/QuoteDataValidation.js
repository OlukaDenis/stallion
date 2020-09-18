import { useState } from "react";
import { isValidPhoneNumber, isValidEmail } from '../utilities/data_validators';

export const useIsValidOrigin = (origin) => {
    
    const [hasOriginError, setHasOriginError] = useState(false);

    if ((origin.match(/,/g) || []).length) {
        setHasOriginError(false);
    } else if (!hasOriginError)  {
        setHasOriginError(true);
    }

    return !hasOriginError;
}

export const useIsValidDestination = (destination) => {
    const [hasDestinationError, setHasDestinationError] = useState(false);
    if ((destination.match(/,/g) || []).length) {
        setHasDestinationError(false);
    } else if (!hasDestinationError) {

        setHasDestinationError(true);
    }
    return !hasDestinationError;
}

export const useIsValidSelectedCars = (cars) => {
    const [hasSelectedCarsError, setHasSelectedCarsError] = useState(false);

    if (Object.keys(cars).length > 0) {
        setHasSelectedCarsError(false);
    } else if (!hasSelectedCarsError) {

        setHasSelectedCarsError(true);
    }
    return !hasSelectedCarsError;
}
export const useIsValidPickupDate = (pickupDate) => {
    const [hasPickupDateError, setHasPickupDateError] = useState(false);

    if (pickupDate) {
        setHasPickupDateError(false);
    } else if (!hasPickupDateError) {

        setHasPickupDateError(true);
    }
    return !hasPickupDateError;
}

export const useIsValidName = (name) => {
    const [hasNameError, setHasNameError] = useState(false);
    if (name) {
        setHasNameError(false);
    } else if (!hasNameError) {
        setHasNameError(true);
    }
    return !hasNameError;
}

export const useIsValidEmail = (email) => {

    const [hasEmailError, setHasEmailError] = useState(false);

    if (isValidEmail(email)) {
        setHasEmailError(false);
    } else if (!hasEmailError) {
        setHasEmailError(true);
    }
    return !hasEmailError;
}

export const useIsValidPhoneNumber = (phone) => {
    const [hasPhoneError, setHasPhoneError] = useState(false);
    if (isValidPhoneNumber(phone)) {
        setHasPhoneError(false);
    } else if (!hasPhoneError) {
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