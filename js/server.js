const cors = require("cors");
const express = require("express");
const app = express();
const axios = require("axios");

app.use(cors());

app.get("/ceps/:id", async (req, res) => {
  try {
    const { data } = await axios(
      `https://viacep.com.br/ws/${req.params.id}/json/`
    );
    console.log(data);
    console.log(req.params);
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

app.listen(3333, () => console.log("Server is running hehehe"));
