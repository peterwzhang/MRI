package edu.ua.cs495.hpc_interface.exception;

import edu.ua.cs495.hpc_interface.domain.types.ErrorCode;
import org.springframework.http.HttpStatus;

/**
 * An exception to be used when an API endpoint has yet to be implemented
 */
public class NotFoundException extends AbstractException {

  /**
   * Create a NotFoundException
   */
  public NotFoundException() {
    super(
      null,
      HttpStatus.NOT_FOUND,
      ErrorCode.NOT_FOUND,
      "The requested entity could not be found.",
      null
    );
  }
}
