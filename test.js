import "dotenv/config";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";

//const openAIApiKey = process.env.OPENAI_API_KEY;

const llm = new ChatOpenAI();

const tweetTemplate =
  "Generate a promotional tweet for a product, from this product description: {productDesc}";

const tweetPrompt = PromptTemplate.fromTemplate(tweetTemplate);

const chain = tweetPrompt.pipe(llm);

const result = await chain.invoke({ productDesc: "Electric shoes" });

console.log(result.content);
