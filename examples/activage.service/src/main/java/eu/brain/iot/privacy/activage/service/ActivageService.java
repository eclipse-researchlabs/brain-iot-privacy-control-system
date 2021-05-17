/*******************************************************************************
 * Copyright (C) $2021 - LINKS Foundation
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
package eu.brain.iot.privacy.activage.service;

import java.util.UUID;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.osgi.framework.BundleContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;


import eu.brain.iot.eventing.annotation.SmartBehaviourDefinition;
import eu.brain.iot.eventing.api.SmartBehaviour;
import eu.brain.iot.privacy.client.api.dto.LocalizationEventDTO;

@Component(immediate=true, service= {SmartBehaviour.class, ActivageService.class})
@SmartBehaviourDefinition(consumed= {LocalizationEventDTO.class},filter="", 
							author="LINKS", name ="ACTIVAGE Service Behavior", 
							description="Service for the ACTIVAGE project")
public class ActivageService implements SmartBehaviour<LocalizationEventDTO>{

	private MqttClient clientMQTT = null;
	private MemoryPersistence persistence = null;
	private MqttConnectOptions connectionOptions = null;
	
	@Activate
	public void start(BundleContext context){
		System.out.println("Service: I am the ACTIVAGE Service");

		String broker = System.getenv("mqtt.broker");
		String user =   System.getenv("username");
		String password = System.getenv("password");
		
		if(broker==null || user==null || password==null) {
			System.out.println("user.name, user.password and mqtt.broker environment variables need to be set");
			return;
		}
		persistence = new MemoryPersistence();
		// build the connection options
		connectionOptions = new MqttConnectOptions();

		// set the clean session parameters
		connectionOptions.setCleanSession(true);
		
		connectionOptions.setPassword(password.toCharArray());
		connectionOptions.setUserName(user);
		
		try {
			clientMQTT = new MqttClient(broker, UUID.randomUUID().toString(), persistence);

			// connect the client
			clientMQTT.connect(connectionOptions);
			while(!clientMQTT.isConnected()){
				Thread.sleep(1000);
			}
			System.out.println("connected to broker "+broker);
		} catch (MqttException e1) {
			e1.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void notify(LocalizationEventDTO event) {
		System.out.println("ACTIVAGE Service: event received with token: "+event.token);
		String eventToSend ="{\"type\": \"tag_uwb\", \"lat\":"+event.positionLat+", \"lon\":"+event.positionLon+ ", \"z\":"+event.positionHeight+", \"quality\":"+event.quality+", \"superFrameNumber\":"+event.superFrameName+"}";
		try {
			clientMQTT.publish("/brainiot/ACTIVAGE/"+event.deviceId+"/localization",	eventToSend.getBytes(), 0, false);
		} catch (MqttException e) {
			e.printStackTrace();
		}
	}
}
