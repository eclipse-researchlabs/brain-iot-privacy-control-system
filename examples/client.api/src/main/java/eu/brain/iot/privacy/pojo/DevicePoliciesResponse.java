package eu.brain.iot.privacy.pojo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
"device_id",
"policy_list",
"signature"
})
public class DevicePoliciesResponse {

@JsonProperty("device_id")
private String deviceId;
@JsonProperty("policy_list")
private List<String> policyList = null;
@JsonProperty("signature")
private String signature;
@JsonIgnore
private Map<String, Object> additionalProperties = new HashMap<String, Object>();

@JsonProperty("device_id")
public String getDeviceId() {
return deviceId;
}

@JsonProperty("device_id")
public void setDeviceId(String deviceId) {
this.deviceId = deviceId;
}

@JsonProperty("policy_list")
public List<String> getPolicyList() {
return policyList;
}

@JsonProperty("policy_list")
public void setPolicyList(List<String> policyList) {
this.policyList = policyList;
}

@JsonProperty("signature")
public String getSignature() {
return signature;
}

@JsonProperty("signature")
public void setSignature(String signature) {
this.signature = signature;
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