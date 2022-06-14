import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'



export class Operations extends Component {
    constructor() {
        super()
        this.state = {
            amount: "",
            vendor: "",
            category: "",
        }

    }

    handleChange = (event) => {
        let { name, value } = event.target
        this.setState({
            [name]: value
        })
    }



    transaction = async (e) => {
        const { amount, vendor, category } = this.state
        let operation = 1
        if (e.target.name === "Withdraw") {
            operation = -1
        }

        if (amount.trim() === "" || vendor.trim() === "" || category.trim() === "") {
            alert("all fields are required.")
            return
        } else if (isNaN(parseInt(amount)) || parseInt(amount) <= 0) {
            alert("the amount field must be a posotive number")
            return
        }
        const transaction = {
            amount: parseInt(amount) * operation,
            vendor: vendor,
            category: category
        }
        await this.props.addTransactions(transaction)
        this.props.history.replace("/")
    }

    render() {
        return (
            <div className='container center'>
                <div className='card'>
                    <div>
                        <label>Amount</label>
                        <input type="text" name="amount" value={this.state.amount} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Vendor</label>
                        <input type="text" name="vendor" value={this.state.vendor} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Category</label>
                        <input type="text" name="category" value={this.state.category} onChange={this.handleChange} />
                    </div>
                    <div>
                        <button name="deposit" onClick={this.transaction} style={{ marginRight: '20px' }}>Deposit</button>
                        <button name="Withdraw" className='danger' onClick={this.transaction}>Withdraw</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Operations) 