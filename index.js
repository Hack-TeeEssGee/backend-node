const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("KGPverse api service working.");
});

app.listen(port, () => {
    console.log(`App started. Listening on port ${port}`);
});