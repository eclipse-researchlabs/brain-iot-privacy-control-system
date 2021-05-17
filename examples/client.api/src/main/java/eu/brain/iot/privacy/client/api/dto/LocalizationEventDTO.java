/*******************************************************************************
 * Copyright (C) $2021 - LINKS Foundation
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
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
