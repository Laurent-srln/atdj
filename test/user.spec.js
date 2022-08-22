//Pour utiliser expect ou assert
const { expect, assert } = require('chai');

//Pour utiliser should
const chai = require('chai');
chai.should();

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

//On va maintenant pouvoir appeler notre API Rest en utilisant le protocole http grâce au module chai-http.

const app = require('../index.js');

describe('Endpoints API', () => {

    beforeEach( () => process.env.NODE_ENV = 'test');

    afterEach( () => process.env.NODE_ENV = undefined);

    //Test POST /new-user 
    describe('POST /api-v1/new-user', () => {

        it('It should POST a new user', (done) => {
            const newUser = {
                "email": "tEsT17@gmail.com",
                "firstname": "joHN",
                "lastname": "doe",
                "category": "Member"
            }
            chai.request(app)
                .post("/api-v1/new-user")
                .send(newUser)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message');
                    response.body.should.have.property('newUser');
                    response.body.should.have.nested.property('newUser.id');
                    response.body.should.have.nested.property('newUser.email').eq('test17@gmail.com');
                    response.body.should.have.nested.property('newUser.firstname').eq('John');
                    response.body.should.have.nested.property('newUser.lastname').eq('DOE');
                    response.body.should.have.nested.property('newUser.category').eq('MEMBER');
                    response.body.should.have.nested.property('newUser.password');
                    response.body.should.have.nested.property('newUser.token');
                done();
                })
        })

        // faire le negatif. Vérifier que ça bloque s'il manque une propriété par exemple et le reste. 

    })

    //Test GET /users 
    describe('GET /api-v1/users', () => {

        it('It should GET all the users', (done) => {
            chai.request(app)
                .get("/api-v1/users")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                })
        })

        it('It should NOT GET all the users', (done) => {
            chai.request(app)
                .get("/api-v1/user")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                })
        })
    })

    //Test GET /users/:id 
    describe('GET /api-v1/users/:id', () => {

        it('It should GET a user by id', (done) => {
            chai.request(app)
                .get("/api-v1/users/1")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(1);
                    response.body.should.have.property('email');
                    response.body.should.have.property('firstname');
                    response.body.should.have.property('lastname');
                    response.body.should.have.property('category');
                done();
                })
        })

        it('It should NOT GET a user by id', (done) => {
            chai.request(app)
                .get("/api-v1/users/999999")
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('message').eq('Cet id ne correspond à aucun utilisateur.');
                done();
                })
        })

    })

    //Test PUT /users/:id

    //Test DELETE /users/:id
});