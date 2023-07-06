const chai = require('chai');
const chaiHttp = require('chai-http');
const { servidor } = require('../index.js');

chai.use(chaiHttp);

// Test para GET
// describe('Probando respuesta de servidor para método GET /autos', () => {
//     it('Comprueba que método GET responde con código 200', (done) => {

//         chai.request(servidor).get('/autos').end((error, respuesta) => {
//             // Podemos recurrir al método expect para pasar directamente la respuesta de la consulta
//             // Para luego utilizar la sintaxis to.have.status(código-de-respuesta);
//             chai.expect(respuesta).to.have.status(200);
//             done();
//         })

//     })
// })

// Test para POST
// describe('Probando respuesta de servidor para método POST /autos', () => {
//     it('Comprueba que método POST responde con código 200', (done) => {

//         chai
//         .request(servidor)
//         .post('/autos')
//         .send({
//             "Marca": "Toyota",
//             "Modelo": "Tercel",
//             "Airbas": true,
//             "ABS": false
//         })
//         .end((error, respuesta) => {
//             chai.expect(respuesta).to.have.status(200);
//             done();
//         })

//     })
// })

// Test para PUT

// describe('Probando respuesta de servidor para método PUT /autos', () => {
//     it('Comprueba que respuestas de método PUt es código 200', (done) => {

//         chai
//         .request(servidor)
//         .put('/autos?id=4159a0d1-857e-4526-9976-3adb5449502d')
//         .send({
//             "Marca": "Toyota",
//             "Modelo": "Trululú",
//             "Airbas": true,
//             "ABS": true
//         })
//         .end((error, respuesta) => {
//             chai.expect(respuesta).to.have.status(200);
//             done();
//         })
//     })
// })

// Test para DELETE

describe('Probando respuesta de servidor para método DELETE /autos', () => {
    it('Comprueba que respuesta de metodo DELETE es código 200', (done) => {

        chai
        .request(servidor)
        .delete('/autos?id=4159a0d1-857e-4526-9976-3adb5449502d')
        .end((error, respuesta) => {
            chai.expect(respuesta).to.have.status(200);
            done();
        })
    })
})