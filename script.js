document.addEventListener('DOMContentLoaded', function() {
    // Static Data
    const staticData = {
        productIdentifier: "Conveyor C",
        identification: {
            brand: "Fischertechnik",
            model: "Conveyor Belt 24V"
        },
        technicalData: {
            powerSupply: "24V"
        },
        productionData: {
            manufacturingDetails: {
                location: "Portugal"
            }
        }
    };

    // Update Static Data on Page
    document.getElementById('productIdentifier').innerText += staticData.productIdentifier;
    document.getElementById('brand').innerText += staticData.identification.brand;
    document.getElementById('model').innerText += staticData.identification.model;
    document.getElementById('powerSupply').innerText += staticData.technicalData.powerSupply;
    document.getElementById('location').innerText += staticData.productionData.manufacturingDetails.location;

    // MQTT Setup
    const clientId = 'mqtt_' + Math.random().toString(16).substr(2, 8);
    const host = 'wss://test.mosquitto.org:8081';

    const options = {
        keepalive: 60,
        clientId: clientId,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
    };

    const client = mqtt.connect(host, options);

    client.on('connect', function() {
        console.log('Connected to MQTT broker');
        client.subscribe('dynamic/data', function(err) {
            if (err) {
                console.log('Subscription error: ', err);
            }
        });
    });

    client.on('message', function(topic, message) {
        if (topic === 'dynamic/data') {
            const data = JSON.parse(message.toString());
            document.getElementById('material').innerText = "Material: " + data.material;
            document.getElementById('latitude').innerText = "Latitude: " + data.latitude;
            document.getElementById('longitude').innerText = "Longitude: " + data.longitude;
        }
    });

    client.on('error', function(err) {
        console.log('MQTT error: ', err);
    });
});
