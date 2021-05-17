/*******************************************************************************
 * Copyright (C) $2021 - LINKS Foundation
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
package eu.brain.iot.privacy.brainpep.client;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.osgi.framework.BundleContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import eu.brain.iot.privacy.client.api.PrivacyClient;
import eu.brain.iot.privacy.pojo.DevicePoliciesResponse;
import eu.brain.iot.privacy.pojo.ServiceSpec;

@Component(immediate=true)
public class BrainpepClientAuthImpl implements PrivacyClient{
	private static final String USER_AGENT = "Mozilla/5.0";
	private static final String DEVICE_API = "https://ipt-services.polito.it/brainpep/api/v1/gateway/device/";
	private static final String SERVICES_API = "https://ipt-services.polito.it/brainpep/api/v1/gateway/filter";
	
	@Activate
	public void start(BundleContext context){
		System.out.println("BrainPEPClient: I am the BrainPep client");
		
	}

	@Override
	public String getToken(String ID) {
		URL url;
		try {
			url = new URL (DEVICE_API+ID);

			HttpURLConnection con = (HttpURLConnection)url.openConnection();
			con.setRequestMethod("GET");
			con.setRequestProperty("User-Agent", USER_AGENT);
			int responseCode = con.getResponseCode();
			System.out.println("GET Response Code :: " + responseCode +" to request: "+DEVICE_API+ID);
			if (responseCode == HttpURLConnection.HTTP_OK) { // success
				BufferedReader in = new BufferedReader(new InputStreamReader(
						con.getInputStream()));
				String inputLine;
				StringBuffer response = new StringBuffer();

				while ((inputLine = in.readLine()) != null) {
					response.append(inputLine);
				}
				in.close();
				ObjectMapper mapper = new ObjectMapper();
				DevicePoliciesResponse responseJSON = null;
				try {
					responseJSON = mapper.readValue(response.toString(), DevicePoliciesResponse.class);
				} catch (JsonProcessingException e) {
					e.printStackTrace();
				}
				System.out.println(responseJSON);
				return responseJSON.getSignature();
			} else {
				System.out.println("GET request not worked");
				return null;
			}
		} catch (MalformedURLException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		} 
		
	}

	@Override
	public List<ServiceSpec> filter(Map<String, Object> eventData, List<String> servicesID) {
		URL url;
		try {
			url = new URL (SERVICES_API);

			HttpURLConnection con = (HttpURLConnection)url.openConnection();
			con.setRequestMethod("POST");
			con.setRequestProperty("Content-Type", "application/json; utf-8");
			con.setRequestProperty("Accept", "application/json; utf-8");
			con.setRequestProperty("Authorization","Bearer ");
			con.setDoOutput(true);

			ObjectMapper objectMapper = new ObjectMapper();
			String jsonServicesID = null; 
			try {
				jsonServicesID = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(servicesID);
			} catch(Exception e) {
				e.printStackTrace();
			}
			
			String jsonInputString = "{\"service_list\": "
					+ jsonServicesID
					+ ", \"sign_device\":\""+eventData.get("token")+"\"}";
			
			try(OutputStream os = con.getOutputStream()) {
				byte[] input = jsonInputString.getBytes("utf-8");
				os.write(input, 0, input.length);			
			}
			
			try(BufferedReader br = new BufferedReader(
					new InputStreamReader(con.getInputStream(), "utf-8"))) {
				StringBuilder response = new StringBuilder();
				String responseLine = null;
				while ((responseLine = br.readLine()) != null) {
					response.append(responseLine.trim());
				}
				ObjectMapper mapper = new ObjectMapper();
				ServiceSpec[] responseJson = mapper.readValue(response.toString(), ServiceSpec[].class);
				System.out.println("List of available services: "+Arrays.toString(responseJson));
				return Arrays.asList(responseJson);
			}

		} catch (MalformedURLException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			// TODO fix
			return null;
		} 
		
	}



}
