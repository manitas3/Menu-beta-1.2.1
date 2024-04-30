const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/pedido') {
    let data = '';
    req.on('data', chunk => {
      data += chunk.toString();
    });
    req.on('end', () => {
      // Procesar el pedido y almacenarlo en un archivo de texto
      console.log('Pedido recibido:', data);
      guardarPedido(data);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Pedido recibido con éxito.\n');
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página no encontrada.\n');
  }
});

function guardarPedido(pedido) {
  fs.appendFile('pedidos.txt', pedido + '\n', (err) => {
    if (err) throw err;
    console.log('Pedido guardado en pedidos.txt');
  });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

