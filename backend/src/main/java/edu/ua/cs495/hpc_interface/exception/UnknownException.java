package edu.ua.cs495.hpc_interface.exception;

import edu.ua.cs495.hpc_interface.domain.types.ErrorCode;
import javax.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;

/**
 * An exception to be used whenever nothing more specific has been written. This
 * will primarily be used by
 * {@link edu.ua.cs495.hpc_interface.controller.APIExceptionHandler APIExceptionHandler}
 * for Spring exceptions (MethodArgumentTypeMismatchException, MissingRequestValueException)
 * and any otherwise unhandled {@link Exception}
 */
public class UnknownException extends AbstractException {

  /**
   * Create an UnknownException with the given error code and message. This constructor assumes a HTTP code of 400 Bad Request
   *
   * @param cause     The exception which caused this (should not be null due to
   *                  the ambiguity of this exception)
   * @param errorCode An error code as described in the {@link ErrorCode ErrorCode} enum
   * @param message   A string for the error message
   */
  public UnknownException(
    Throwable cause,
    ErrorCode errorCode,
    String message
  ) {
    this(cause, AbstractException.DEFAULT_STATUS_CODE, errorCode, message);
  }

  /**
   * Create an UnknownException with the given HTTP status code, error code, and message.
   *
   * @param cause      The exception which caused this (should not be null due to the ambiguity of this exception)
   * @param statusCode The Spring HTTP status code ({@link org.springframework.http.HttpStatus HttpStatus})
   * @param errorCode  An error code as described in the {@link ErrorCode ErrorCode} enum
   * @param message    A string for the error message
   */
  public UnknownException(
    @NotNull Throwable cause,
    HttpStatus statusCode,
    ErrorCode errorCode,
    String message
  ) {
    super(cause, statusCode, errorCode, message, null);
  }
}
