const request = require('supertest');
const expect = require('expect');

var { app } = require('./../server');
var { Todo } = require('./../models/todo');
const { ObjectId } = require('mongodb');
const { text } = require('body-parser');

const Todos = [{
    _id: new ObjectId(),
    text: "First Text",
    completed: false
}, {
    _id: new ObjectId(),
    text: "Second Text",
    completed: false
}];


beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(Todos);
    }).then(() => done());
})

describe("POST /todo Test", () => {
    it("Should create new Todo", (done) => {
        var text = "Test Todo text";
        request(app)
            .post('/todo')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text); 0
            })
            .end((err, res) => {
                if (err)
                    done(err)
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    expect(todos[2].text).toBe(text);
                    done();
                }).catch((error) => {
                    done(error);
                })

            })
    });

    it("Should Not Create Todo", (done) => {
        request(app)
            .post("/todo")
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err)
                    done(err)
                Todo.find().then((todo) => {
                    expect(todo.length).toBe(2);
                    done();
                }).catch((err) => done(err));
            });
    })
});

describe("GET /todo Test", () => {
    it("Should be get all Todos", (done) => {
        request(app)
            .get("/todo")
            .expect(200)
            .expect((res) => {
                expect(res.body.length).toBe(2)
            })
            .end(done)
    });
});

describe("GET /todos/:id", () => {
    it("Should be return todo with id", (done) => {
        request(app)
            .get(`/todos/${Todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(Todos[0].text);
            })
            .end(done);
    });
    it("Should be return 404 for invalid ObjectID", (done) => {
        request(app)
            .get(`/todos/${new ObjectId().toHexString()}`)
            .expect(404)
            .end(done)
    });

    it("Should be return 404 for nonObjectID", (done) => {
        request(app)
            .get(`/todos/123kl`)
            .expect(404)
            .end(done)
    });

});

describe("DELETE /todos/:id", (done) => {
    it("Should be delete todo with id", () => {
        var hex_id = Todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hex_id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(hex_id);
            })
            .end(() => {
                Todo.findById(hex_id).then((todo) => {
                    expect(todo).toBeNull();
                    done()
                }).catch((err) => {
                    return done(err)
                })
            })
    });
    it("Should be return 404 for invalid ObjectID", (done) => {
        var fake_hex_id = new ObjectId().toHexString();
        console.log(fake_hex_id);
        request(app)
            .delete(`/todos/${fake_hex_id}`)
            .expect(404)
            .end(done)
    });

    it("Should be return 404 for nonObjectID", (done) => {
        request(app)
            .delete(`/todos/123kl`)
            .expect(404)
            .end(done)
    });

});

describe("PATCH /todos/:id", () => {
    it("Should be update date when completed", (done) => {
        var hex_id = Todos[0]._id.toHexString();
        var text = "Test Update text";
        request(app)
            .patch(`/todos/${hex_id}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done);
    });
    it("Should be null date when completed false", (done) => {
        var hex_id = Todos[1]._id;
        var text = "Test Update text";

        request(app)
            .patch(`/todos/${hex_id}`)
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completedAt).toBeNull();
            })
            .end(done)

    });

});

