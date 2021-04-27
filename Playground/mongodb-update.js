const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "ToDoApp";

async function main() {
    await client.connect();
    console.log("Successfully Connected to mongoDB Server");
    const db = client.db(dbName);
    const collection = db.collection('ToDos');

    const updateResult = await collection.findOneAndUpdate({ completed: true }, { $set: { completed: false } })
    console.log('Updated documents =>', updateResult)


    return 'done';

}


main()
    .then(console.log)
    .catch(console.error)
    .finally(() => { client.close(); })