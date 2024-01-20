// routes.js
const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

// Endpoint para redefinir o estado
router.post('/reset', (req, res) => {
  controllers.resetAccounts();
  res.sendStatus(200);
});

// Endpoint para obter o saldo de uma conta
router.get('/balance', (req, res) => {
  const accountId = req.query.account_id;
  const balance = controllers.getBalance(accountId);

  if (!balance) {
    res.status(404).json(0);
  } else {
    res.status(200).json(balance);
  }
});

router.post('/event', (req, res) => {
  const eventData = req.body;
  const result = controllers.handleEvent(eventData);
  if (result.error) {
    res.status(400).json(result);
  } else if (result === 0) {
    res.status(404).json(0);
  } else {
    res.status(201).json(result);
  }
});

module.exports = router;
