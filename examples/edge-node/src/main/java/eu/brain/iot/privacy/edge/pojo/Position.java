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
"x",
"y",
"z",
"quality"
})

public class Position {

@JsonProperty("x")
private Double x;
@JsonProperty("y")
private Double y;
@JsonProperty("z")
private Double z;
@JsonProperty("quality")
private Integer quality;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("x")
public Double getX() {
return x;
}

@JsonProperty("x")
public void setX(Double x) {
this.x = x;
}

@JsonProperty("y")
public Double getY() {
return y;
}

@JsonProperty("y")
public void setY(Double y) {
this.y = y;
}

@JsonProperty("z")
public Double getZ() {
return z;
}

@JsonProperty("z")
public void setZ(Double z) {
this.z = z;
}

@JsonProperty("quality")
public Integer getQuality() {
return quality;
}

@JsonProperty("quality")
public void setQuality(Integer quality) {
this.quality = quality;
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
