# Brain-IoT Privacy Control System
Solution for privacy control, mainly based on popular paradigms in the field of privacy protection in distributed environments, i.e., Sticky policies and Privacy as a service. This framework has the main objective to establish how data must be treated, directly attaching such rules to the corresponding data. Sticky policies are able to regulate how data can be accessed and used throughout their entire life cycle, allowing access control decisions and policy enforcement to be carried out in a distributed way. Such an approach has been introduced for enforcing data protection
Specifically, sticky policies regulate the use of the associated data, and can define the following aspects:
- The data owner;
- The data content;
- The used to be made of the data (e.g., for commercial purposes, safety reasons, open data);
- Specific obligations and restrictions for the data consumers.


The two main components of the framework are the following:

## Brain-IoT PEP

Main component used for deciding and enforcing whether a data consumer service is authorized to access the data in transit.(please refer to the related [readme](https://github.com/eclipse-researchlabs/brain-iot-privacy-control-system-api) for more details).

## Brain-IoT Privacy Dashboard

Web-based user interface which serves as interface for the data owners to set the policies associated to their own data. It also serves as an interface for the service providers to set the data access requirements needed to provide the service. 
The policies defined by Data Owners and Data Consumers through the Privacy Dashboard are stored to the Authorization Server through the BRAIN-IoT PEP (please refer to the related  [readme](https://github.com/eclipse-researchlabs/brain-iot-privacy-control-dashboard) for more details).


## Examples
The repository includes an example folder that contains the application used to test the Privacy Control System, in the use case defined in collaboration with the MONICA EU project. (please refer to the related [readme](https://github.com/eclipse-researchlabs/brain-iot-privacy-control-system/tree/main/examples)).
