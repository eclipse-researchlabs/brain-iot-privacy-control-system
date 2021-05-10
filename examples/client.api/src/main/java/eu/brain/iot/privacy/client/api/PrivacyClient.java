package eu.brain.iot.privacy.client.api;

import java.util.List;
import java.util.Map;

import org.osgi.annotation.versioning.ProviderType;

import eu.brain.iot.privacy.pojo.ServiceSpec;

@ProviderType
public interface PrivacyClient {
	public String getToken(final String ID);
	
	public List<ServiceSpec> filter(final Map<String, Object> eventData, final List<String>servicesID);
}
