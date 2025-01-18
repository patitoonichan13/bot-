const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Crear el cliente de WhatsApp con autenticación local
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true } // Configura como true para que no se abra una ventana del navegador
});

// Expresión regular para detectar enlaces
const urlPattern = /(https?:\/\/[^\s]+)/g;

// Generar el código QR para autenticar el bot
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log("Escanea el código QR con tu WhatsApp.");
});

// Evento cuando el bot está listo
client.on('ready', () => {
    console.log('LuluBot (anti-link) está listo');
});

// Evento cuando se recibe un mensaje
client.on('message', async (message) => {
    // Verificar si el mensaje contiene un enlace
    if (urlPattern.test(message.body)) {
        // Eliminar el mensaje que contiene un enlace
        await message.delete(true);
        message.reply('Los enlaces no están permitidos en este chat.');
    }
});

// Iniciar el cliente
client.initialize();

