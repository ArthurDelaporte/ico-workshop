const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur https://ico-workshop.onrender.com`);
});