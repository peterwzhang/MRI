package edu.ua.cs495.hpc_interface.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.saml2.provider.service.registration.InMemoryRelyingPartyRegistrationRepository;
import org.springframework.security.saml2.provider.service.registration.RelyingPartyRegistration;
import org.springframework.security.saml2.provider.service.registration.RelyingPartyRegistrationRepository;
import org.springframework.security.saml2.provider.service.registration.RelyingPartyRegistrations;

public class SAMLConfig {

  @Bean
  public RelyingPartyRegistrationRepository relyingPartyRegistrations() {
    RelyingPartyRegistration registration = RelyingPartyRegistrations
      .fromMetadataLocation(
        "https://dev-00449127.okta.com/app/exk6odvqkb5jgzPph5d7/sso/saml/metadata"
      )
      .registrationId("okta")
      .build();
    return new InMemoryRelyingPartyRegistrationRepository(registration);
  }
}
