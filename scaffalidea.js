const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');



const app = express();
const port = 3001; // Porta diversa da quella del frontend

app.use(cors()); // abilita CORS per tutte le richieste

// Configurazione del middleware per il parsing dei dati JSON
app.use(bodyParser.json());

// Configurazione della connessione al database MySQL
const connection = mysql.createConnection({
  host: '185.205.41.244',
  user: 'propacutilita',
  password: 'gG]ae4U82S2ANns',
  database: 'propac_utilita',
});

// Connessione al database MySQL
connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database MySQL: ' + err.stack);
    return;
  }

  console.log('Connesso al database MySQL con ID connessione: ' + connection.threadId);
});

// Definizione delle rotte
app.get('/', (req, res) => {
  res.send('Benvenuto nella nostra applicazione!');
});

// Avvio del server Express
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});




//=============================================

// Elenco di tutti gli utenti
app.get('/api/products', (req, res) => {
  connection.query('SELECT * FROM products_test', (err, results) => {
    if (err) {
      console.error('Errore durante l\'esecuzione della query: ' + err.stack);
      return;
    }

    res.json(results);
  });
});

// Dettagli di un utente
app.get('/api/products/:id', (req, res) => {
  const id = req.params.id;

  connection.query('SELECT * FROM products_test WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Errore durante l\'esecuzione della query: ' + err.stack);
      return;
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send('Utente non trovato');
    }
  });
});

// Creazione di un nuovo utente
app.post('/api/products', (req, res) => {
  const user = req.body;

  connection.query('INSERT INTO products_test SET ?', user, (err, result) => {
    if (err) {
      console.error('Errore durante l\'esecuzione della query: ' + err.stack);
      return;
    }

    res.json({ id: result.insertId });
  });
});

// Aggiornamento di un utente
  app.put('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
  
    // codice per aggiornare l'utente con l'ID specificato
    connection.query('UPDATE products_test SET ? WHERE id = ?', [updatedUser, id], (err, result) => {
      if (err) {
        console.error('Errore durante l\'esecuzione della query: ' + err.stack);
        res.status(500).send('Errore durante l\'aggiornamento dell\'utente');
        return;
      }
    
      res.send('Utente aggiornato con successo');
    });
      
  
   
  });
  

  //eliminazione dell'utente con id
  app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id;
  
    // codice per eliminare l'utente con l'ID specificato
    connection.query('DELETE FROM products_test WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Errore durante l\'esecuzione della query: ' + err.stack);
        res.status(500).send('Errore durante l\'eliminazione dell\'utente');
        return;
      }
  
      res.send('Utente eliminato con successo');
    });
  });





