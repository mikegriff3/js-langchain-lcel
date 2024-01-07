import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
//import "dotenv/config";

try {
  let contents = fs.readFileSync("./scrimba-info.txt").toString();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });
  const docs = await splitter.createDocuments([contents]);

  const sbApiKey = import.meta.env.SUPA_API_KEY;
  const sbUrl = import.meta.env.SUPA_URL;
  const openaiApiKey = import.meta.env.OPENAI_API_KEY;

  const client = createClient(sbUrl, sbApiKey);

  await SupabaseVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({ openaiApiKey }),
    {
      client,
      tableName: "documents",
    }
  );
} catch (err) {
  console.log(err);
}
