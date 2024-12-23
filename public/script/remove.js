function deleteStudent(id) {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) {
        fetch(`/student/remove/${id}`, {
            method: 'DELETE'
        })
        .then(data => {
            console.log(data);
            location.reload(); // รีโหลดหน้าหลังจากลบข้อมูลเรียบร้อย
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
function deleteSubject(id) {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) {
        fetch(`/subject/remove/${id}`, {
            method: 'DELETE'
        })
        .then(data => {
            console.log(data);
            location.reload(); // รีโหลดหน้าหลังจากลบข้อมูลเรียบร้อย
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}