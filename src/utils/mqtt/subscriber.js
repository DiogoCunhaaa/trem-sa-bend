import mqtt from "mqtt";

const brokerURL = "mqtts://d8ab813c18e242c0a418f3b1609e5f94.s1.eu.hivemq.cloud";
const options = {
  username: "hivemq.webclient.1761663875221",
  password: "Gih;Q3.H<0N9vm7oTrE,",
  reconnectPeriod: 1000,
};
const client = mqtt.connect(brokerURL, options);
const topics = ["develop/S1", "develop/S2", "develop/S3"];

let ultimaMensagem = null; // importar em outro arquivo para usar;

client.on("connect", () => {
  console.log(`Conectado ao broker MQTT: ${brokerURL}`);

  topics.forEach((topic) =>
    client.subscribe(topic, (err) => {
      if (!err) {
        console.log(`Inscrito no tópico ${topic}`);
      } else {
        console.error("Erro ao se increver", err);
      }
    })
  );
});

client.on("message", (topic, message) => {
  console.log(`Mensagem recebida em ${topic}: ${message.toString()}`);
  ultimaMensagem = message.toString();
});

client.on("error", (err) => {
  console.error("Erro na conexão MQTT: ", err);
});

client.on("reconnect", () => {
  console.log("Tentando reconectar ao broker...");
});

client.on("close", () => {
  console.log("Conexão MQTT encerrada.");
});

export { client, ultimaMensagem };
