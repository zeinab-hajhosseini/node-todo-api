const request = require('supertest');
const expect = require('expect');

var { app } = require('./../server');
var { Todo } = require('./../models/todo');

beforeEach((done) => {
    Todo.deleteMany({}).then(() => done())
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
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
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
                    expect(todo.length).toBe(0);
                    done();
                }).catch((err) => done(err));
            });
    })
})

