import mqtt from "mqtt";

const brokerURL = "mqtts://d8ab813c18e242c0a418f3b1609e5f94.s1.eu.hivemq.cloud";
const options = {
    username: "hivemq.webclient.1761663875221",
    password: "Gih;Q3.H<0N9vm7oTrE,",
    reconnectPeriod: 1000,
}
const client = mqtt.connect(brokerURL, options);

const topic = "develop/S3";

client.on("connect", () => {
  console.log(`Conectado ao broker MQTT: ${brokerURL}`);

  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Inscrito no tópico ${topic}`);
    } else {
      console.error("Erro ao se increver", err);
    }
  });
});

client.on("message", (topic, message) => {
  console.log(`Mensagem recebida em ${topic}: ${message.toString()}`);
});

client.on("error", (err) => {
  console.error("Erro na conexão MQTT: ", err);
});
