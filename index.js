const http = require('http');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

const servidor = http.createServer(async (req,res) => {
    const { searchParams, pathname } = new URL(req.url, `http://${req.headers.host}`)
    const params = new URLSearchParams(searchParams)
    console.log(pathname); 
    const id = params.get("id");

// CRUD /autos -> Sin modular

try {
    lecturaArchivoAutos = await fs.readFile('./textos/autos.txt')
    res.statusCode = 200;
    res.write('Acceso exitoso al archivo autos.txt\n\n')
} catch (error) {
    res.write('No fue posible acceder al archivo contenedor de autos.')
    res.statusCode = 403
    res.end();
    console.log(`No fue posible acceder al archivo contenedor de autos: ${error}`);
}
const datosOriginalesAutos = JSON.parse(lecturaArchivoAutos)

    if(pathname == '/autos' && req.method == 'GET') {
        try {
            res.write(lecturaArchivoAutos);
            res.statusCode = 200;
            res.write('\n\nLa lectura y muestra del contenido del archivo autos.txt fue exitosa.')
            res.end();
        } catch (error) {
            res.statusCode = 403
            res.write("No fue posible mostrar el contenido del archivo autos.txt")
            res.end()
            console.log(`No fue posible mostrar el contenido del archivo autos.txt: ${error}`);
        }
    }

    if(pathname == '/autos' && req.method == 'POST') {
        const identificacion = uuidv4()
        let datosAutos

        req.on('data', (data) => {
            datosAutos = JSON.parse(data);
        })

        req.on('end', async () => {
            try {
                datosOriginalesAutos[identificacion] = datosAutos;
                await fs.writeFile('./textos/autos.txt', JSON.stringify(datosOriginalesAutos, null, 2));
                res.statusCode = 201;
                res.write('Vehículo agregado exitosamente al archivo autos.txt');
                res.end();
            } catch (error) {
                res.statusCode = 400;
                res.write('No fue posible incorporar el vehículo al archivo autos.txt')
                res.end()
                console.log(`No fue posible incorporar el vehículo al archivo autos.txt: ${error}`);
            }
        })
    }

    if(pathname == '/autos' && req.method == 'PUT') {
        let datosParaModificar;

        req.on('data', (datos) => {
            datosParaModificar = JSON.parse(datos);
        })

        req.on('end', async () => {
            try {
                const autoPorModificar = datosOriginalesAutos[id]
                const autoModificado = {...autoPorModificar, ...datosParaModificar }
    
                datosOriginalesAutos[id] = autoModificado
    
                await fs.writeFile('./textos/autos.txt', JSON.stringify(datosOriginalesAutos, null, 2));
                
                res.write(`Datos del auto indicado previos a la actualización:\n`)
                res.write(JSON.stringify(autoPorModificar, null, 2))
                res.statusCode = 200;
                res.write('\nLos datos del auto indicado han sido modificados y cargados exitosamente al archivo autos.txt:\n')
                res.write(JSON.stringify(autoModificado, null, 2));
                res.end();
            } catch (error) {
                res.statusCode = 400;
                res.write('No fue posible actualizar o modificar los datos del auto indicado.')
                res.end();
                console.log(`No fue posible actualizar o modificar los datos del auto indicado: ${error}`);
            }
        })
    }

    if(pathname == '/autos' && req.method == 'DELETE') {
        try {
            res.write('El auto indicado a continuación será eliminado de autos.txt\n')
            res.write(JSON.stringify(datosOriginalesAutos[id], null, 2))
            delete datosOriginalesAutos[id];
            await fs.writeFile('./textos/autos.txt', JSON.stringify(datosOriginalesAutos, null, 2));
            res.statusCode = 200;
            res.write('\nEl auto indicado ha sido eliminado satisfactoriamente\n');
            res.end()
        } catch (error) {
            res.statusCode = 400;
            res.write('\nHa ocurrido un error. El auto indicado no ha podido ser eliminado.')
            res.end();
            console.log(`El auto indicado no ha podido ser eliminado: ${error}`);
        }
    }

})
.listen(3000, function() {
    console.log("Servidor iniciado en el puerto 3000");
})

module.exports = { servidor };