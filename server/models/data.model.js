const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const RagSchema = new Schema({

  ragDomain:String,

  })
  const RagModel = model("ragdata",RagSchema)

  const RagUpdate = new Schema({
    rag:String
  })
const RagUpdateModel = model("ragupdate",RagUpdate)

const DataSchema = new Schema({
  chatbotID:String,
  chatbotName: String,
  combinedData:[],
  domain: String,
  rag:[],
}, {
  timestamps: true
});

const DataModel = model("data", DataSchema);

module.exports = { DataModel ,RagModel,RagUpdate};
