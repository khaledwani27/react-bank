import React, { Component } from 'react'

export class Transaction extends Component {
  deleteTransaction = () => {
    this.props.deleteTransaction(this.props.transaction._id)
  }
  render() {
    return (
      <div className='transaction card'>
        <p>{this.props.transaction.vendor}</p>
        <p>{this.props.transaction.category}</p>
        <p>{this.props.transaction.amount}</p>
        <button className='danger' onClick={this.deleteTransaction}>Delete</button>
      </div>
    )
  }
}

export default Transaction