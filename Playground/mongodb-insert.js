
const { MongoClient, ObjectID } = require('mongodb');

//Set Up Info about mongoDB Server
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

//DB Name
const dbName = "ToDoApp";

async function main() {
    await client.connect();
    console.log("Successfully Connected to mongoDB Server");
    const db = client.db(dbName);
    const collection = db.collection('ToDos');

    const insertResult = await collection.insertOne({
        text: "SomeThing test for todo2",
        completed: false
    });

    console.log(JSON.stringify(insertResult.ops, undefined, 2));
    console.log(insertResult.ops[0]._id.getTimestamp()); //extract Timestamp from object id

    return 'done';

}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => { client.close() })