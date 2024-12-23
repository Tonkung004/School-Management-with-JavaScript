'use strict';

function parseField(field) {
    return field    
        .split(/\[|\]/)
        .filter((s) => s);
}

function getField(req, field) {
    let val = req.body;
    field.forEach((prop) => {
        val = val[prop];
    });
    return val;
}

exports.required = (field) => {
    field = parseField(field);
    return (req, res, next) => {
        if (getField(req, field)){
            next();
        } else {
            res.error(`${field.join(' ')} is required`);
            res.redirect('back');
        }
    };
};

exports.lengthAbove = (field, len) => {
    field = parseField(field);
    return (req, res, next) => {
        if (getField(req, field).length == len) {
            next();
        } else {
            const fields = field.join(' ');
            if(fields == "credit"){
                res.error(`หน่วยกิตต้องเป็นตัวเลข ${len} หลัก`);
                res.redirect('back');
            }
            else{
                res.error(`รหัสนักศึกษาต้องเป็นตัวเลข ${len} หลัก`);
                res.redirect('back');
            }
           
        }
    };
};

function isNumeric(str) {
    return /^\d+$/.test(str);
}

exports.onlyNumber = (field) =>{
    field = parseField(field);
   return (req,res,next) => {
         const idStd = getField(req,field)
         if(isNumeric(idStd)){
        next()
    }else{
        res.error('รหัสนักศึกษาต้องเป็นตัวเลข!!!');
        res.redirect('back');
    }
    }
   
}



function isAlphabeticString(str) {
    return /^[A-Za-zก-๏]+$/u.test(str);
}

function isFormatIdSubject(str) {
    return /^[A-Z]{4}\d{4}$/.test(str);
}

exports.nameFormat = (field) => {
    field = parseField(field);
    return (req, res, next) => {
        const name = getField(req, field);
        if (name.trim().split(' ').length === 2) {
            const [firstName, lastName] = name.split(' ');
            if (isAlphabeticString(firstName) && isAlphabeticString(lastName)) {
                next();
            } else {
                res.error('ชื่อต้องเป็นตัวอักษรทั้งหมด');
                res.redirect('back');
            }
        } else {
            res.error('ชื่อและนามสกุลต้องมีช่องว่างคั่น 1 ช่อง (หรือไม่ถูกต้องตามรูปแบบชื่อและนามสกุล)');
            res.redirect('back');
        }
    };
};

exports.idSubformat = (field) => {
    field = parseField(field);
    return (req,res,next) => {
        const fields = getField(req,field)
      if(isFormatIdSubject(fields)){
        next()
      }else {
        res.error('รูปแแบบรหัสวิชาผิด (กำหนดรูปแบบตัวอักษร A - Z จำนวน 4 ตัว และต่อท้ายด้วยตัวเลขจำนวน 4 ตัว เช่น ITMI1210)');
        res.redirect('back');
      }

    }
}