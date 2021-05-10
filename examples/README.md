# privacy control application

Repository to test the privacy control system

This is an application used to test the privacy control system. It implements the use case of a fair where the Brain-IoT solution is used to propagate the localization events produced by wearable devices assigned to the visitors to a security service and to several services immplemented by the projects present in the stands. Thanks to the use of the privacy control system of BRAIN-IoT such events are sent only to the services that are compliant with the policies set by the users.
 
The application is composed by the following modules:
- edge.node: an edge node used to receive events from a set of UWB devices of type DECAWAVE, through MQTT events.
- client.api: the API exposed by the BRAIN-PEP client, to be used by other components to call the BRAIN-PEP client.
- brainpep.client: a client to be used to interact with the BRAIN-PEP through its REST API, to retrieve the device token and to filter the services based on the policies set on the device
- activage.service.edge.node: edge node to be used to send events to the service of the project ACTIVAGE
- autopilot.service.edge.node: edge node to be used to send events to the service of the project AUTOPILOT
- cpswarm.service.edge.node: edge node to be used to send events to the service of the project CPSWARM
- iof2020.service.edge.node: edge node to be used to send events to the service of the project IOF2020
- monica.service.edge.node: edge node to be used to send events to the service of the project MONICA
- localization.service: edge node to be used to send events to the dashboard used for security control of all the stands
