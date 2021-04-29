const axio = require("axios");
const express = require("express");
const app = express();
app.use(express.json());

const PrimaryKey = "INSCRICAO";
const funcoes = {
  ObservacaoCriada: (observacao) => {
    observacao.status = observacao.cadastro.includes(PrimaryKey)
      ? "CNPJ"
      : "CPF";
    axio.post("http://localhost:8000/eventos", {
      tipo: "ObservacaoClassificada",
      dados: observacao,
    });
  },
};
app.post("/eventos", (req, res) => {
  try {
    functions[req.body.tipo](req.body.dados);
  } catch (err) {}
  res.status(200).send({ msg: "ok" });
});
app.listen(7000, () => console.log("Classificação. Porta 7000"));
