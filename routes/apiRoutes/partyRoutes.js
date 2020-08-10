const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Get parties
router.get('/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
    
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Get a single party using id
router.get('/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
    
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Delete a party using id
router.delete('/party/:id', (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ?`;
    const params = [req.params.id];
    // note the function in ES5, not fat arrow, in order to use this.changes
    db.run(sql, params, function(err, result) {
        if (err) {
            res.status(400).json({ error: res.message });
            return;
        }
    
        res.json({ message: 'successfully deleted', changes: this.changes });
    });
});

module.exports = router;