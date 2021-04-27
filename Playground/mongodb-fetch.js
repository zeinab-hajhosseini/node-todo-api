const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "ToDoApp";

async function main() {
    await client.connect();
    console.log("Successfully Connected To Server");
    const db = client.db(dbName);
    const collection = db.collection('ToDos');

    var fetchResult = await collection.find({ completed: true }).toArray();

    console.log(fetchResult);

    return 'done'
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => { client.close });
