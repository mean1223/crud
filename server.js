var express = require('express');
var cors = require('cors');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'mydb'
});

var app = express();
app.use(cors());
app.use(express.json());

// เริ่มฟังคำขอที่ port 5000
app.listen(5000, function() {
    console.log('CORS-enabled web server listening on port 5000');
});

// ดึงข้อมูลผู้ใช้ทั้งหมด
app.get('/users', function(req, res, next) {
    connection.query(
        'SELECT * FROM users',
        function(err, results, fields) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        }
    );
});

// ดึงข้อมูลผู้ใช้ตาม ID
app.get('/users/:id', function(req, res, next) {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [id],
        function(err, results, fields) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(results);
        }
    );
});

// สร้างผู้ใช้ใหม่
app.post('/users/create', function(req, res) {
    const { fname, lname, username, password, avatar } = req.body;

    connection.query(
        'INSERT INTO users (fname, lname, username, password, avatar) VALUES (?, ?, ?, ?, ?)',
        [fname, lname, username, password, avatar],
        function(err, results, fields) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'User created successfully', userId: results.insertId });
        }
    );
});


// อัปเดตข้อมูลผู้ใช้
app.put('/users/update/:id', function(req, res) {
    const id = req.params.id;
    const { fname, lname, username, password, avatar } = req.body;

    connection.query(
        'UPDATE users SET fname=?, lname=?, username=?, password=?, avatar=? WHERE id=?',
        [fname, lname, username, password, avatar, id],
        function(err, results) {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User updated successfully', results });
        }
    );
});

// ลบผู้ใช้ตาม ID
app.delete("/users/delete/:id", (req, res) => {
    const userId = req.params.id; // ดึง ID จาก URL
    console.log("Deleting user with ID:", userId);

    const sql = "DELETE FROM users WHERE id = ?"; // คำสั่ง SQL
    connection.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).json({ message: "Server error", error: err });
        }

        if (result.affectedRows >= 1) {
            return res.json({ message: "User deleted successfully", affectedRows: result.affectedRows });
        } else {
            return res.status(404).json({ message: "User not found" }); // ใช้ 404 ถ้าผู้ใช้ไม่มี
        }
    });
});
