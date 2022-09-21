package edu.ua.cs495.hpc_interface.exception;

import edu.ua.cs495.hpc_interface.domain.types.ErrorCode;
import javax.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;

/**
 * An exception to be used when an API endpoint has yet to be implemented
 */
public class NotImplementedException extends AbstractException {

  /**
   * Create an NotImplementedException from the given request context
   *
   * @param context the servlet context containing information about this request
   */
  public NotImplementedException(HttpServletRequest context) {
    super(
      null,
      HttpStatus.NOT_IMPLEMENTED,
      ErrorCode.NOT_IMPLEMENTED,
      String.format(
        "%s %s has not been implemented yet.  Please come back later!",
        context.getMethod(),
        context.getRequestURL()
      ),
      null
    );
  }
}
