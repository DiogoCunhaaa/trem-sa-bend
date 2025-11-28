import mqtt from "mqtt";

const brokerURL = "mqtts://d8ab813c18e242c0a418f3b1609e5f94.s1.eu.hivemq.cloud";
const options = {
  username: "hivemq.webclient.1761663875221",
  password: "Gih;Q3.H<0N9vm7oTrE,",
};

const client = mqtt.connect(brokerURL, options);

client.on("connect", () => {
  console.log("MQTT conectado com sucesso!");
});

client.on("error", (err) => {
  console.error("Erro MQTT:", err);
});

export function MqttMessage(topic, message) {
  if (!client.connected) {
    console.warn("MQTT ainda não conectado, aguardando...");

    client.once("connect", () => {
      client.publish(topic, message, {}, () => {
        console.log("Mensagem enviada");
      });
    });

    return;
  }

  client.publish(topic, message, {}, () => {
    console.log(`Mensagem enviada imediatamente: ${topic}`);
  });
}

//const topic = "develop/S3";

//const message = "Teste do diogo";
//
//client.on("connect", () => {
//  console.log("Conectado ao broker, enviando mensagem...");
//  client.publish(topic, message);
//  client.end();
//});
