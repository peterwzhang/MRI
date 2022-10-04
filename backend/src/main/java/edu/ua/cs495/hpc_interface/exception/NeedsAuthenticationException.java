package edu.ua.cs495.hpc_interface.exception;

import edu.ua.cs495.hpc_interface.domain.types.ErrorCode;
import org.springframework.http.HttpStatus;

public class NeedsAuthenticationException extends AbstractException {

  public NeedsAuthenticationException() {
    super(
      null,
      HttpStatus.UNAUTHORIZED,
      ErrorCode.AUTHENTICATION_REQUIRED,
      "This endpoint requires authentication.",
      null
    );
  }
}
