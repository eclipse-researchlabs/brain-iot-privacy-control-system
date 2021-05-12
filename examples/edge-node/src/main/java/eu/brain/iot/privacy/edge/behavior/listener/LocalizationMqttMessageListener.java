package eu.brain.iot.privacy.edge.behavior.listener;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Timer;
import java.util.TimerTask;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttSecurityException;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import eu.brain.iot.eventing.api.EventBus;
import eu.brain.iot.privacy.client.api.PrivacyClient;
import eu.brain.iot.privacy.client.api.dto.LocalizationEventDTO;
import eu.brain.iot.privacy.edge.pojo.Localization;

public class LocalizationMqttMessageListener implements MqttCallback {
	private final static double THETA = 296; // # 278.10
	private final static double ORIGIN_LAT = 45.0655020732702; //  # 44.965566
	private final static double ORIGIN_LON = 7.65904350393726;  // # 7.837751
	private final static double ORIGIN_ALT = 250; //  # 251

	private Object SEMAPHORE = new Object();
	private EventBus eventBus = null;
	private PrivacyClient clientPrivacy = null;
	private Pattern pattern = null;
	private MqttClient clientMQTT = null;
	private String broker = null;
	private MemoryPersistence persistence = null;
	private MqttConnectOptions options = null;
	
	public LocalizationMqttMessageListener(final EventBus eventBus, 
			final PrivacyClient clientPrivacy, 
			final MqttClient clientMQTT, 
			final String broker, 
			final MemoryPersistence persistence,
			final MqttConnectOptions options) {
		this.eventBus = eventBus;
		this.clientPrivacy = clientPrivacy;
		this.clientMQTT = clientMQTT;
		pattern = Pattern.compile("node/(.*)/");
		this.broker = broker;
		this.persistence = persistence;
		this.options = options;
	}
	
	@Override
	public void messageArrived(String topic, MqttMessage mqttMessage) {
		synchronized (SEMAPHORE) {
			String payload = new String(mqttMessage.getPayload());
			ObjectMapper mapper = new ObjectMapper();
			Localization obj = null;
			try {
				obj = mapper.readValue(payload, Localization.class);
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
			String lat = null;
			String lon = null;
			String height = null;
			try {
				Process proc = Runtime.getRuntime()
						.exec(new String[] { "python", "geoutil.py", "localxyz2geodetic", obj.getPosition().getX().toString(), obj.getPosition().getY().toString(), obj.getPosition().getZ().toString(), String.valueOf(THETA), String.valueOf(ORIGIN_LAT), String.valueOf(ORIGIN_LON), String.valueOf(ORIGIN_ALT)});
				String line = "";
				BufferedReader input = new BufferedReader(new InputStreamReader(proc.getInputStream()));
				while ((line = input.readLine()) != null ) {
					if(line.startsWith("lat=")) {
						lat = line.trim().split("=")[1];
					} else if(line.startsWith("lon=")) {
						lon = line.trim().split("=")[1];
					} else if(line.startsWith("height=")) {
						height = line.trim().split("=")[1];
					}
				}
				proc.waitFor();
				proc = null;
				input.close();
				line = null;
	
			} catch (Exception e) {
				e.printStackTrace();
			}
			LocalizationEventDTO event = new LocalizationEventDTO();
			Matcher matcher = pattern.matcher(topic);
			matcher.find();
			event.deviceId=matcher.group().substring(5,matcher.group().length()-8);
			//event.token = clientPrivacy.getToken(event.deviceId);
			event.token = "sss";
			if(event.token==null) {
				System.out.println("Privacy token not available. Event discarded");
				return;
			}
			event.positionLat = Double.parseDouble(lat);
			event.positionLon = Double.parseDouble(lon);
			event.positionHeight = Double.parseDouble(height);
			event.quality = obj.getPosition().getQuality();
			event.superFrameName = obj.getSuperFrameNumber();
			//eventBus.deliver(event);
			System.out.println("Edge Node Behavior: One event with token " + event.token +" sent");
		}
	}

	@Override
	public void connectionLost(Throwable cause) {
		System.out.print("MQTT Connection lost...reconnecting");
		Timer timer = new Timer();
		timer.schedule(new TimerTask() {
			@Override
			public void run() {
				try {
					clientMQTT.close();
					do{
						
					} while (clientMQTT.isConnected());
					clientMQTT = null;
					persistence = new MemoryPersistence();
					clientMQTT = new MqttClient(broker, UUID.randomUUID().toString(), persistence);
					clientMQTT.connect(options);
					clientMQTT.setCallback(new LocalizationMqttMessageListener(eventBus, clientPrivacy, clientMQTT, broker, persistence, options));
					clientMQTT.subscribe("dwm/node/+/uplink/location");
				} catch (MqttSecurityException e) {
					e.printStackTrace();
				} catch (MqttException e) {
					e.printStackTrace();
				}
			}
		}, 2000);
	}

	@Override
	public void deliveryComplete(IMqttDeliveryToken token) {
		// TODO Auto-generated method stub
	}	
}
