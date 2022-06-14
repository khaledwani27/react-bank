import React, { Component } from 'react'
import axios from 'axios';
export class Breakdown extends Component {

    constructor() {
        super()
        this.state = {
            breakdown: [],
        }
    }
    componentDidMount = () => {
        this.loadBreakDowns()
    }

    loadBreakDowns = () => {
        axios.get(`http://localhost:4200/breakdown`)
            .then(res => {
                const breakdown = res.data;
                this.setState({ breakdown });
            }).catch(err => {
                throw (err)
            })
    }


    render() {
        return (
            <div className='container'>
                <h1 className='title'>Breakdown</h1>
                <div className='card'>
                    {this.state.breakdown.map(c => {
                        return (
                            <div>
                                <span>{c._id}: </span>
                                <span>${c.sum}</span>
                            </div>
                        )
                    })}

                </div>
            </div>
        )
    }
}

export default Breakdown