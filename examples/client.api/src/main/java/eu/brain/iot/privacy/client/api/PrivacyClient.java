/*******************************************************************************
 * Copyright (C) $2021 - LINKS Foundation
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
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
