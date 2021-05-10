package eu.brain.iot.privacy.edge.behavior;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Timer;
import java.util.TimerTask;
import java.util.UUID;

import org.eclipse.paho.client.mqttv3.MqttAsyncClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.osgi.framework.BundleContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import eu.brain.iot.eventing.annotation.SmartBehaviourDefinition;
import eu.brain.iot.eventing.api.BrainIoTEvent;
import eu.brain.iot.eventing.api.EventBus;
import eu.brain.iot.eventing.api.SmartBehaviour;
import eu.brain.iot.privacy.client.api.PrivacyClient;
import eu.brain.iot.privacy.client.api.dto.LocalizationEventDTO;
import eu.brain.iot.privacy.edge.behavior.listener.LocalizationMqttMessageListener;
import eu.brain.iot.privacy.edge.pojo.Localization;


@Component(service= {SmartBehaviour.class, EdgeNodeBehavior.class},
immediate=true)
@SmartBehaviourDefinition(consumed = {},
author = "LINKS", name = "edge node",
description = "Implement a behavior which can inject an event.")
public class EdgeNodeBehavior implements SmartBehaviour<BrainIoTEvent>{
	@Reference 
	EventBus eventBus;
	@Reference
	PrivacyClient client;
	
	private MqttClient clientMQTT = null;
	private MemoryPersistence persistence = null;
	private MqttConnectOptions connectionOptions = null;
	
	private Double minLat = 45.065615505422;
	private Double maxLat = 45.0656907235434;
	private Double minLon = 7.65914587730561;
	private Double maxLon = 7.65919778459936;
	
	@Activate
	public void start(BundleContext context){
		System.out.println("Edge Node Behavior: I am the Edge Node Behavior");
				
		Timer timer = new Timer();
		timer.schedule(new TimerTask() {
			@Override
			public void run() {
				// The script to be executed to calculate the coordinates is copied in the tmp dir
				InputStream stream = this.getClass().getResourceAsStream("/geoutil.py");
				BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
				String line = "";
				BufferedWriter writer=null;
				try {
					writer = new BufferedWriter(new FileWriter("geoutil.py"));
					while ((line = reader.readLine()) != null ) {
						writer.append(line+"\n");
					}
					writer.close();
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			

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

					clientMQTT.setCallback(new LocalizationMqttMessageListener(eventBus, client));
					clientMQTT.subscribe("dwm/node/+/uplink/location");
				} catch (MqttException e1) {
					e1.printStackTrace();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				/*
				 * Decomment to send simulated events
				 *
				LocalizationEventDTO event = new LocalizationEventDTO();

				//event.positionLat = 45.065578797845966; //INSIDE MONICA
				//event.positionLon = 7.658985205806535; //INSIDE MONICA
				
				event.positionHeight = 248.69061653721354;
				event.quality = 90;
				event.superFrameName = 1070;
				event.deviceId = "4ebb";
				//event.token = client.getToken("4ebb");
				event.token = "h";
				eventBus.deliver(event);
				System.out.println("Edge Node Behavior: One event with token " + event.token +" sent");
				*/
			};
		}, 1000);
	}

	@Override
	public void notify(BrainIoTEvent event) {
	}	
}

