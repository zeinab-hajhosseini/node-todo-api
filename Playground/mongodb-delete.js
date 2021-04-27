const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "ToDoApp";

async function main() {
    await client.connect();
    console.log("Successfully Connected to mongoDB Server");
    const db = client.db(dbName);
    const collection = db.collection('ToDos');

    // const deleteResult = await collection.deleteMany({ completed: true });
    const deleteResult = await collection.deleteOne({ completed: true });
    console.log(deleteResult);
    return 'done';

}


main()
    .then(console.log)
    .catch(console.error)
    .finally(() => { client.close(); })