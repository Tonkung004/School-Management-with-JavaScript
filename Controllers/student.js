const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'students'
})

exports.list = async (req,res) => {
    db.query(`
    SELECT * FROM student
    `, (err,rows) => {
        if(err) throw err
        res.render('students', { data: rows })
    });
}

exports.read = async (req,res) => {
    const id = req.params.id

    db.query(`
    SELECT * FROM student WHERE idStd = '${id}'
    `, (err,result) => {
        if(err) throw err
        res.send(result)
    })

}

exports.create = async (req,res,next) => {
    db.query(`
    INSERT INTO student (idStd,name) VALUES ('${req.body.idStd}','${req.body.name}')
    `,(err,result) => {
        if(err){
            // console.log(err)
            // return res.send(err)
            res.error('ไอดีถูกใช้ไปแล้ว!!');
            res.redirect('back')
        }else{
        console.log(req.body.idStd)
        console.log(req.body.name)
        res.redirect('/student/list')
        }
    
    });

}

exports.update = async (req,res) => {
    db.query(`
    UPDATE student SET name = '${req.body.name}' WHERE idStd = '${req.params.id}'
    `, (err, result) => {
        if(err) {
            res.error('ไอดีถูกใช้ไปแล้ว!!');
            res.redirect('back')
        }else{
            res.redirect('/student/list')
        }
    
    })
}

exports.remove = async (req,res) => {
    const id = req.params.id
    db.query(`
    DELETE FROM student WHERE idStd = '${id}'
    `, (err,result) => {
        if(err) throw err
        console.log(result)
        res.redirect('/student/list')
    })
}

//views
exports.form = async (req,res) => {
    res.render('postStd',{ title: 'เพิ่มข้อมูลนักเรียน', data: null,})
}

exports.formUpdate = async (req,res) => {
    db.query(`
    SELECT * FROM student WHERE idStd = '${req.params.id}'
    `,(err,rows) => {
        if(err) throw err
        res.render('postStd',{title: 'แก้ไขข้อมูลนักเรียน', data: req.params.id, rows: rows})
    })
}
