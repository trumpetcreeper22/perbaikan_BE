const prisma = require("../db")

const findStudents = async () => {
    const students = await prisma.student.findMany()
    return students
}

const findStudentsById = async (id) => {
    const students = await prisma.student.findUnique({
        where:{
            id,
        }
    })
    return students
}

const insertStudent = async (newStudentsData) => {
    const student = await prisma.student.create({
        data: {
            name: newStudentsData.name,
            address: newStudentsData.address,
        }
    });
    return student
}

const deleteStudent = async (id) =>{
     await prisma.student.delete({
        where: {
            id,
        },
    });
}

const ubdateStudent = async (id, studentData) => {
    const student = await prisma.student.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name: studentData.name,
            address: studentData.address,
        },
    });
    return student
}

module.exports={
    findStudents,
    findStudentsById,
    insertStudent,
    deleteStudent,
    ubdateStudent
}