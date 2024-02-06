const {DataModel,RagModel,RagUpdate} = require ("../models/data.model")


// test controller
const test = async(req,res)=>{
    res.json({msg:"This is test url"})
}


const addChatbot = async (req,res)=>{
    const { chatbotID,chatbotName, knowledgeUrls,description, domain } = req.body;
    
  const combinedData = knowledgeUrls.map((url, index) => {
    return {
      url,
      description: description[index] ? description[index].des : '' // Assuming description is an array of objects
    };
  });
  
  console.log(combinedData);
  // console.log(knowledgeUrls,description)
  try {
    const fineTuneDoc = await DataModel.create({ chatbotID,chatbotName, combinedData, domain });
    res.json({ data: { fineTuneDoc } });
  } catch (error) {
    res.json({ msg: "Error in post kaiwa" });
  }
}

// get request 
const getChatbot = async(req,res)=>{
  const chatbot = await DataModel.find({})
  res.status(200).json({data:chatbot})
}
const addRag = async (req,res)=>{
  const {ragDomain} = req.body
  console.log(ragDomain)
  const ragaData = await RagModel.create({ragDomain})
  res.json({msg:"Rag is inserte",
data:ragaData})
}
const getRag= async (req,res)=>{
  const ragData= await RagModel.find({})
  res.status(200).json({data:ragData})
}


// update rag to orignal table
const updateRag = async (req, res) => {
  const { chatbotName, rag } = req.body;

  try {
    // Find the DataModel document with the matching chatbotName
    const dataDoc = await DataModel.findOne({ chatbotName });

    if (!dataDoc) {
      return res.status(404).json({ msg: "Chatbot not found" });
    }

    // Update the rag field in DataModel
    dataDoc.rag = rag; // Assuming `rag` is an array

    // Save the changes
    await dataDoc.save();

    res.json({ msg: "Rag is updated", data: dataDoc });
  } catch (error) {
    console.error("Error updating Rag:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


// search by id 
const getRagDetail = async (req, res) => {
  const { id } = req.body;

  try {
    // Find the DataModel document with the matching _id
    const dataDoc = await DataModel.findById(id);

    if (!dataDoc) {
      return res.status(404).json({ msg: 'Chatbot not found' });
    }

    // Respond with the chatbot data
    res.json({ msg: 'Chatbot data retrieved successfully', data: dataDoc });
  } catch (error) {
    console.error('Error retrieving chatbot data:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports= {addChatbot,test,getChatbot,addRag,getRag,updateRag,getRagDetail}