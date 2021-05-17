/*******************************************************************************
 * Copyright (C) $2021 - LINKS Foundation
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
package eu.brain.iot.privacy.edge.pojo;

import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
"position",
"superFrameNumber"
})
public class Localization {

	@JsonProperty("position")
	private Position position;
	@JsonProperty("superFrameNumber")
	private Integer superFrameNumber;
	@JsonIgnore
	private Map<String, Object> additionalProperties = new HashMap<String, Object>();

	@JsonProperty("position")
	public Position getPosition() {
		return position;
	}

	@JsonProperty("position")
	public void setPosition(Position position) {
		this.position = position;
	}

	@JsonProperty("superFrameNumber")
	public Integer getSuperFrameNumber() {
		return superFrameNumber;
	}

	@JsonProperty("superFrameNumber")
	public void setSuperFrameNumber(Integer superFrameNumber) {
		this.superFrameNumber = superFrameNumber;
	}

	@JsonAnyGetter
	public Map<String, Object> getAdditionalProperties() {
		return this.additionalProperties;
	}

	@JsonAnySetter
	public void setAdditionalProperty(String name, Object value) {
		this.additionalProperties.put(name, value);
	}

}

