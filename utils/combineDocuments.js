export function combineDocuments(docs) {
  let contextDoc = "";

  for (let doc in docs) {
    contextDoc += docs[doc].pageContent;
  }

  //console.log(contextDoc);
  return contextDoc;
}
