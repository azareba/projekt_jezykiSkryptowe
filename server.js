const PORT = 3000
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const path = require('path')

// Połączenie z bazą danych
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'booking',
})

db.connect((err) => {
    if (err) {
        console.error('nie udało się polaczyc z bazą danych', err)
        process.exit(1);
    }
    console.log('udane polaczenie z bazą danych')
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client'))) //pliki statyczne json html css itp

// routing dla głównej strony search
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/search/search.html'))
});

app.get('/forms.html', (req, res) => {
    res.sendFile(__dirname + '/client/forms/forms.html')
});


// Endpoint do wyszukiwania ofert
app.post('/search', (req, res) => {
    const { destination, checkin, checkout, adults, children, rooms } = req.body

    const osoby = parseInt(adults) + parseInt(children)

    const query = `
        SELECT id_obiektu, nazwa, miasto, adres,opis, cena 
        FROM OBIEKT
        WHERE miasto = ? AND maxOsob >= ?;
    `;

    db.query(query, [destination, osoby, rooms], (err, results) => {
        
        if (err) {
            console.error('error  wyszukiwania ofert:', err)
            res.status(500).json({ error: 'błąd podczas wyszukiwania ofert' })
            return;
        }

        res.json(results);
    });
});

app.post('/booking', (req, res) => {
    const { firstName, lastName, email, phoneCode, phone, offerId, checkIn, checkOut, totalGuests } = req.body

    // if (!firstName || !lastName || !email || !phone || !offerId || !checkIn || !checkOut || !totalGuests) {
    //     return res.status(400).json({ error: 'Niekompletne dane rezerwacji.' });
    // }

    const addClientQuery = `
        INSERT INTO KLIENT (imie, nazwisko, email, tel)
        VALUES (?, ?, ?, ?);
    `;
    
    const clientValues = [firstName, lastName, email, phoneCode +phone]

    db.query(addClientQuery, clientValues, (err, clientResult) => {
        if (err) {            
            console.error('Błąd przy dodawaniu klienta:', err);
            return res.status(500).json({ error: 'Nie udało się dodać klienta.' });
        }

        const clientId = clientResult.insertId

        const addReservationQuery = `
            INSERT INTO REZERWACJE (id_klienta, id_obiektu, osoby, data_zameldowania, data_wymeldowania)
            VALUES (?, ?, ?, ?, ?);
        `;
        const reservationValues = [clientId, offerId, totalGuests, checkIn, checkOut]

        db.query(addReservationQuery, reservationValues, (err, reservationResult) => {
            if (err) {
                console.error('jest error przy dodawaniu rezerwacji:', err);
                return res.status(500).json({ error: 'nie udało się dodać rezerwacji' })
            }

            res.status(200).json({ message: 'Rezerwacja została zapisana!!!!' })
        })
    })
})


app.listen(PORT, () => {
    console.log(`Serwer nasłuchuje na http://localhost:${PORT}`)
});
