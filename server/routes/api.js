const express = require('express')
const Transaction = require('../models/Transaction')
const router = express.Router()

router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

router.get('/transaction', function (req, res) {
    Transaction.find({}).exec(function (err, transactions) {
        if (err) {
            res.status(404).send({ message: "Not found", err: err })
        }
        res.send(transactions)
    })
})



router.post('/transaction', function (req, res) {
    const transactionData = req.body
    const transaction = new Transaction({
        amount: transactionData.amount,
        vendor: transactionData.vendor,
        category: transactionData.category,
    })

    transaction.save().then(t => {
        res.status(201).send({ message: "New transaction was added!!", data: t })
    }).catch(err => {
        res.status(400).send({ message: "can not add new item", err: err })
    })

})

router.delete('/transaction/:id', function (req, res) {
    Transaction.findByIdAndRemove(req.params.id, function (err, t) {
        if (err) {
            res.status(404).send({ message: "Not found can't delete", err: err })
        }
        res.send(200)
    });
})

router.get('/breakdown', function (req, res) {
    Transaction.aggregate([
        {
            $group: {
                _id: '$category',
                sum: { $sum: "$amount" }
            }
        }
    ]).exec(function (err, transactions) {
        if (err) {
            res.status(404).send({ message: "Not found", err: err })
        }
        res.send(transactions)
    })
})

module.exports = router