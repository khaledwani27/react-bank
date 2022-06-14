import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Transactions from './components/Transactions';
import Operations from './components/Operations';
import axios from 'axios';
import NavBar from './components/NavBar';
import { Breakdown } from './components/Breakdown';

export class App extends Component {
  constructor() {
    super()
    this.state = {
      balance: 0,
      transactions: [],
    }

  }

  Balance = (transactions) => {
    let sum = 0
    transactions.map(t => sum += t.amount)
    return sum
  }

  addTransactions = async (transaction) => {
    if (this.state.balance + transaction.amount >= 0) {
      try {
        await axios.post(`http://localhost:4200/transaction`, transaction)
        this.loadDbData()
        return
      } catch (error) {
         console.log(error);
      }
    }
    alert("you can not compelete this transaction, you do not have enough in your balance")
  }

  componentDidMount = () => {
    this.loadDbData()
  }

  loadDbData = () => {
    axios.get(`http://localhost:4200/transaction`)
      .then(res => {
        const transactions = res.data;
        this.setState({ transactions, balance: this.Balance(transactions) });
      }).catch(err => {
        throw (err)
      })
  }

 
  deleteTransaction = async (transactionId) => {
    try {
      await axios.delete(`http://localhost:4200/transaction/${transactionId}`)
      this.loadDbData()
      
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Router>
        <main>
          <NavBar balance={this.state.balance} />
          <Route path="/" exact render={() => <Transactions transactions={this.state.transactions}
            deleteTransaction={this.deleteTransaction} />} />
          <Route path="/operations" exact render={() => <Operations addTransactions={this.addTransactions} />} />
          <Route path="/breakdown" exact component={Breakdown} />
        </main>
      </Router>

    )
  }
}

export default App
