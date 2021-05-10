package eu.brain.iot.privacy.client.api.dto;

import eu.brain.iot.eventing.api.BrainIoTEvent;


public class LocalizationEventDTO extends BrainIoTEvent{
   public String token;
   
   public String deviceId;
   
   public Double positionLat;
   
   public Double positionLon;
   
   public Double positionHeight;
   
   public int quality;
   
   public int superFrameName;
}