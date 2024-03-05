const express = require('express');
const QRCode = require('qrcode'); // Asegúrate de haber instalado la biblioteca qrcode previamente
const path = require('path');
import { inject } from '@vercel/analytics';
const app = express();
const PORT = process.env.PORT || 3000;
inject()
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/qr/:link', (req, res) => {
    const textoQR = valor = req.params.link; // Cambia esto al texto que desees codificar
    console.log(textoQR)
    // Genera el código QR en formato SVG (puedes elegir otros formatos también)
    QRCode.toString(textoQR, { errorCorrectionLevel: 'H', type: 'svg' }, (err, data) => {
        if (err) {
            console.error('Error al generar el código QR:', err);
            res.status(500).send('Error al generar el código QR');
        } else {
            // Envía la respuesta al cliente con el código QR
            res.type('svg');
            res.send(data);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
