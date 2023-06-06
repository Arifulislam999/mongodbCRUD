// import client from "./db.config";

import { ObjectId } from "mongodb";
import dbConnect from "./db.config";

const blogs = async (req, res) => {
  const client = await dbConnect();
  const db = client.db("test_db");
  const blogCollection = db.collection("blogs");
  if (req.method === "GET") {
    const user = await blogCollection.find().toArray();

    res.send({ name: user });
  } else if (req.method === "POST") {
    const user = req.body;
    const result = await blogCollection.insertOne(user);
    res.status(201).send({ result });
  } else if (req.method === "PUT") {
    const post = req.body;
    const { id } = req.query;
    const queryId = { _id: new ObjectId(id) }; // id object by default mongoose
    const updatedDoc = {
      $set: post,
    };
    const result = await blogCollection.updateOne(queryId, updatedDoc);
    res.status(202).send(result);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    const queryId = { _id: new ObjectId(id) };
    const result = await blogCollection.deleteOne(queryId);
    res.status(204).send(result);
  }
};
export default blogs;
// mongodb+srv://arif:<password>@cluster0.ehq4rqq.mongodb.net/
