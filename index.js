const express = require('express');
const QRCode = require('qrcode');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/qr/:link', (req, res) => {
    const textoQR = valor = req.params.link;
    console.log(textoQR)

    QRCode.toString(textoQR, { errorCorrectionLevel: 'H', type: 'svg' }, (err, data) => {
        if (err) {
            console.error('Error al generar el código QR:', err);
            res.status(500).send('Error al generar el código QR');
        } else {
            res.type('svg');
            res.send(data);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
