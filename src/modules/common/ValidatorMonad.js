import { ValidationError } from "./Errors";

export default class ValidatorMonad {
  static valid(value) {
    return new ValidatorMonad(true, value);
  }

  static get invalid() {
    return new ValidatorMonad(false);
  }

  static of(value) {
    this.value = value;
    if (value === undefined || value === null) {
      return ValidatorMonad.invalid;
    } else {
      return ValidatorMonad.valid(value);
    }
  }

  constructor(status, value, errorMessage) {
    if ("boolean" !== typeof status)
      throw new ValidationError("Cannot instantiate this class directly.");
    this.status = status;
    this.value = value;
    this.errorMessage = errorMessage;
  }

  close(errorMessage = "Validate is failed.") {
    if (this.status) {
      return this;
    } else {
      this.errorMessage = errorMessage;
      return this;
    }
  }

  map(testFunction) {
    if (this.status) {
      return testFunction(this.value)
        ? ValidatorMonad.valid(this.value)
        : ValidatorMonad.invalid;
    } else {
      return ValidatorMonad.invalid;
    }
  }

  flatMap(testFunction) {
    if (this.status) {
      return testFunction(this.value);
    } else {
      return ValidatorMonad.invalid;
    }
  }

  apply(wrappedTestFunction) {
    if (wrappedTestFunction.status) {
      return this.map(wrappedTestFunction.value);
    } else {
      return ValidatorMonad.invalid;
    }
  }
}
