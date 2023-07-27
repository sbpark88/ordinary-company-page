/**
 * 다음과 같이 사용한다.
 *
 * const response = await fetch(url, options)
 * if (!response.ok) throw new HTTPError(response.status, response.statusText)
 */
class HTTPError extends Error {
  constructor(status, statusText) {
    super(`HTTP Error ${status}: ${statusText}`);
    this.status = status;
    this.statusText = statusText;
  }
}

/**
 * 다음과 같이 사용한다.
 *
 * if (id.length < 8) throw new ValidationError(false, "아이디는 8글자 이상입니다.")
 */
class ValidationError extends Error {
  constructor(message) {
    super(`Validator Error: ${message}`);
    this.message = message;
  }
}

export { HTTPError, ValidationError };
