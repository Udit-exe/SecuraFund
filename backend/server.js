// server.js

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Hasura GraphQL endpoint and admin secret
const HASURA_ENDPOINT = 'https://your-hasura-instance/v1/graphql';
const HASURA_ADMIN_SECRET = 'your-hasura-admin-secret';

// GraphQL query for inserting a transaction
const INSERT_TRANSACTION_QUERY = `
  mutation insertTransaction($accountNumber: String!, $amount: numeric!, $transactionType: String!) {
    insert_transactions_one(object: {
      account_number: $accountNumber,
      amount: $amount,
      transaction_type: $transactionType
    }) {
      id
      account_number
      amount
      transaction_type
    }
  }
`;

// Route to handle transactions
app.post('/api/transaction', async (req, res) => {
  const { accountNumber, amount, transactionType } = req.body;

  try {
    const response = await axios.post(
      HASURA_ENDPOINT,
      {
        query: INSERT_TRANSACTION_QUERY,
        variables: { accountNumber, amount, transactionType }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': HASURA_ADMIN_SECRET
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Error inserting transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
