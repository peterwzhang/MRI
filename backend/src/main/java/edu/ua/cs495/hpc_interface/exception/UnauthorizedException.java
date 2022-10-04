package edu.ua.cs495.hpc_interface.exception;

import edu.ua.cs495.hpc_interface.domain.types.ErrorCode;
import org.springframework.http.HttpStatus;

public class UnauthorizedException extends AbstractException {

  public UnauthorizedException() {
    super(
      null,
      HttpStatus.FORBIDDEN,
      ErrorCode.FORBIDDEN,
      "You may not perform this action on the requested entity.",
      null
    );
  }
}
