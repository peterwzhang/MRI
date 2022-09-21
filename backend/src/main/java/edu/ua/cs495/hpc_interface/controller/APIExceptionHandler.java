package edu.ua.cs495.hpc_interface.controller;

import edu.ua.cs495.hpc_interface.domain.dto.ErrorResponseDTO;
import edu.ua.cs495.hpc_interface.domain.types.ErrorCode;
import edu.ua.cs495.hpc_interface.exception.AbstractException;
import edu.ua.cs495.hpc_interface.exception.UnknownException;
import java.util.Arrays;
import javax.servlet.ServletException;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingRequestValueException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;

/**
 * Overall controller to handle exceptions and return proper API responses
 */
@Log4j2
@RestControllerAdvice
public class APIExceptionHandler {

  /**
   * Handles exceptions from our application
   *
   * @param exception an {@link AbstractException AbstractException}
   * @see AbstractException
   * @return {@link org.springframework.http.ResponseEntity ResponseEntity}
   *         with an {@link ErrorResponseDTO ErrorResponseDTO} body.
   */
  @ExceptionHandler(AbstractException.class)
  public ResponseEntity<ErrorResponseDTO> handleOurException(
    AbstractException exception
  ) {
    log.info(exception);
    return exception.getErrorResponse();
  }

  /**
   * Handles requests to endpoints that do not exist
   *
   * @param exception exception indicating that no handler exists for an endpoint
   * @return {@link org.springframework.http.ResponseEntity ResponseEntity}
   *         with an {@link ErrorResponseDTO ErrorResponseDTO} body.
   */
  @ExceptionHandler(NoHandlerFoundException.class)
  public ResponseEntity<ErrorResponseDTO> handleNotFound(
    NoHandlerFoundException exception
  ) {
    log.info(exception);
    return new UnknownException(
      exception,
      HttpStatus.NOT_FOUND,
      ErrorCode.ENDPOINT_NOT_FOUND,
      String.format(
        "No endpoint matches a %s request to %s",
        exception.getHttpMethod(),
        exception.getRequestURL()
      )
    )
      .getErrorResponse();
  }

  /**
   * Handles requests to endpoints with unknown methods
   *
   * @param exception exception indicating that no handler exists for an endpoint with this method
   * @return {@link org.springframework.http.ResponseEntity ResponseEntity}
   *         with an {@link ErrorResponseDTO ErrorResponseDTO} body.
   */
  @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
  public ResponseEntity<ErrorResponseDTO> handleBadMethod(
    HttpRequestMethodNotSupportedException exception
  ) {
    log.info(exception);
    return new UnknownException(
      exception,
      HttpStatus.METHOD_NOT_ALLOWED,
      ErrorCode.ENDPOINT_INVALID_METHOD,
      String.format(
        "%s requests are not accepted on this endpoint.  Accepted methods: %s",
        exception.getMethod(),
        Arrays.toString(exception.getSupportedMethods())
      )
    )
      .getErrorResponse();
  }

  /**
   * Handles improperly typed parameters/requests
   *
   * @param exception exception indicating that the request could not be parsed
   * @return {@link org.springframework.http.ResponseEntity ResponseEntity}
   *         with an {@link ErrorResponseDTO ErrorResponseDTO} body.
   */
  @ExceptionHandler(
    {
      ServletException.class,
      MethodArgumentTypeMismatchException.class,
      MissingRequestValueException.class,
      HttpMessageNotReadableException.class,
    }
  )
  public ResponseEntity<ErrorResponseDTO> handleBadRequest(
    Exception exception
  ) {
    log.info(exception);
    return new UnknownException(
      exception,
      ErrorCode.INVALID_REQUEST,
      exception.getMessage()
    )
      .getErrorResponse();
  }

  /**
   * Handles all uncaught exceptions.
   *
   * @param exception exceptions not otherwise caught
   * @return {@link org.springframework.http.ResponseEntity ResponseEntity}
   *         with an {@link ErrorResponseDTO ErrorResponseDTO} body.
   */
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponseDTO> handleAllOtherExceptions(
    Exception exception
  ) {
    log.error(exception);
    log.error(exception.getMessage());

    // As a note, NullPointerException can be thrown deep in the servlet code if parsing invalid JSON.
    // However, NPE is far too generic to catch and always attribute to bad input.
    return new UnknownException(
      exception,
      HttpStatus.INTERNAL_SERVER_ERROR,
      ErrorCode.UNKNOWN_ERROR,
      String.format(
        "Internal Server error (%s): %s",
        exception.getClass().getSimpleName(),
        exception.getMessage()
      )
    )
      .getErrorResponse();
  }
}
