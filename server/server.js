const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const { DataModel } = require("./models/data.model");
const dataRouter = require("./routes/data.routes")

app.use(express.json());
const allowedOrigins = ['http://localhost:3001', 'https://kaiwa-admin.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

const PORT = 3000;
app.use("/api/v1",dataRouter)

// app.get("/api/v1/kaiwa", (req, res) => {
//   res.json({ msg: "Hello" });
// });
// app.use("api/v1/kaiwa",dataRouter)

// app.post("/api/v1/kaiwa", async (req, res) => {
//   const { chatbotName, knowledgeUrls,description, domain } = req.body;
//   const combinedData = knowledgeUrls.map((url, index) => {
//     return {
//       url,
//       description: description[index] ? description[index].des : '' // Assuming description is an array of objects
//     };
//   });
  
//   console.log(combinedData);
//   // console.log(knowledgeUrls,description)
//   try {
//     const fineTuneDoc = await DataModel.create({ chatbotName, combinedData, domain });
//     res.json({ data: { fineTuneDoc } });
//   } catch (error) {
//     res.json({ msg: "Error in post kaiwa" });
//   }
// });

try {
  mongoose.connect("mongodb+srv://chandanyadav:lxMftu0nXZ0wBvOZ@kaiwa.q9z7jq5.mongodb.net/?retryWrites=true&w=majority")
  // mongoose.connect('mongodb://127.0.0.1:27017/kaiwa-admin')
    .then(
      app.listen(PORT, () => {
        console.log(`Running at port ${PORT}...`);
      })
    );
} catch (error) {
  console.log("error in connection");
}





// todo 




