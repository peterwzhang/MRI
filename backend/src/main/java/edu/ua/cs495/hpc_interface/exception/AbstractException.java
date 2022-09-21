package edu.ua.cs495.hpc_interface.exception;

import edu.ua.cs495.hpc_interface.domain.dto.ErrorResponseDTO;
import edu.ua.cs495.hpc_interface.domain.types.ErrorCode;
import edu.ua.cs495.hpc_interface.domain.types.ErrorData;
import java.time.Instant;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Abstract exception, to be implemented by more concrete exceptions thrown from our application.
 * {@link UnknownException UnknownException} should be used for otherwise unknown errors (e.g. generic Exception or Spring-related exceptions).
 */
@Getter
@ToString(callSuper = true)
public abstract class AbstractException extends RuntimeException {

  /** By default, send a 400 */
  public static final HttpStatus DEFAULT_STATUS_CODE = HttpStatus.BAD_REQUEST;

  protected final ErrorCode errorCode;

  protected final HttpStatus statusCode;

  protected final ErrorData data;

  /**
   * Create an AbstractException with the given HTTP status code, error
   * code, message, and format.
   *
   * @param cause      The exception which caused this (may be null)
   * @param statusCode The Spring HTTP status code ({@link org.springframework.http.HttpStatus HttpStatus})
   * @param errorCode  An error code as described in the ErrorResponse API type
   * @param message    A string for the error message
   * @param data       Nullable additional data to include in the response for richer errors
   */
  protected AbstractException(
    Throwable cause,
    HttpStatus statusCode,
    ErrorCode errorCode,
    String message,
    ErrorData data
  ) {
    super(message, cause);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.data = data;
  }

  /**
   * Get the standardized error response for this exception
   *
   * @return {@link org.springframework.http.ResponseEntity} with an {@link ErrorResponseDTO} in its body.
   */
  public ResponseEntity<ErrorResponseDTO> getErrorResponse() {
    ErrorResponseDTO.ErrorResponseDTOBuilder errorBuilder = ErrorResponseDTO
      .builder()
      .timestamp(Instant.now())
      .status(this.getStatusCode().value())
      .code(this.getErrorCode().getValue())
      .message(this.getMessage())
      .data(this.getData());

    for (StackTraceElement frame : this.getStackTrace()) {
      errorBuilder.traceItem(frame.toString());
    }

    Throwable deeperCause = this.getCause();
    while (deeperCause != null) {
      errorBuilder.traceItem("----------------- CAUSED BY -----------------");
      errorBuilder.traceItem(this.getCause().getMessage());
      for (StackTraceElement frame : this.getCause().getStackTrace()) {
        errorBuilder.traceItem(frame.toString());
      }
      deeperCause = deeperCause.getCause();
    }

    return new ResponseEntity<>(errorBuilder.build(), this.getStatusCode());
  }
}
