const request = require('supertest');
const expect = require('expect');

var { app } = require('./../server');
var { Todo } = require('./../models/todo');

const Todos = [{
    text: "First Text"
}, {
    text: "Second Text"
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
    })
})

