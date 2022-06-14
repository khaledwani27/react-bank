import React, { Component } from 'react'
import Transaction from './Transaction'

export class Transactions extends Component {
  render() {
    return (
      <div className='container' id='transactions-container'>
        {this.props.transactions.map((t, index) =>
          <Transaction key={index} transaction={t}
           deleteTransaction={this.props.deleteTransaction}
          />)}
      </div>
    )
  }
}

export default Transactions



