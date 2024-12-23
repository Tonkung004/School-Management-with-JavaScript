const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'subjects'
})

exports.list = async (req,res) => {
    db.query(`
    SELECT * FROM subject
    `, (err,rows) => {
        if(err) throw err
        res.render('subjects', { data: rows })
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
    INSERT INTO subject (idSubject,name,credit) VALUES ('${req.body.idSubject}','${req.body.name}', '${req.body.credit}')
    `,(err,result) => {
        if(err){
            // console.log(err)
            // return res.send(err)
            res.error('ไอดี ถูกใช้ไปแล้ว');
            res.redirect('back')
        }else{
        console.log(req.body.idSubject)
        console.log(req.body.name)
        console.log(req.body.credit)
        res.redirect('/subject/list')
        }
    
    });

}

exports.update = async (req,res) => {
    db.query(`
    UPDATE subject SET name = '${req.body.name}', credit = '${req.body.credit}' WHERE idSubject = '${req.params.id}'
    `, (err, result) => {
        if(err) {
            res.error('ไอดีนี้ถูกใช้ไปแล้ว');
            res.redirect('back')
        }else{
            res.redirect('/subject/list')
        }
    
    })
}

exports.remove = async (req,res) => {
    const id = req.params.id
    db.query(`
    DELETE FROM subject WHERE idSubject = '${id}'
    `, (err,result) => {
        if(err) throw err
        console.log(result)
        res.redirect('/subject/list')
    })
}

//views
exports.form = async (req,res) => {
    res.render('postSub',{ title: 'เพิ่มรายวิชา', data: null,})
}

exports.formUpdate = async (req,res) => {
    db.query(`
    SELECT * FROM subject WHERE idSubject = '${req.params.id}'
    `,(err,rows) => {
        if(err) throw err
        res.render('postSub',{title: 'แก้ไขรายวิชา', data: req.params.id, rows: rows})
    })
}