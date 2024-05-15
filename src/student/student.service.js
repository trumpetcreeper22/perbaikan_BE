const prisma = require("../db")
const { findStudents, findStudentsById, insertStudent, deleteStudent, ubdateStudent } = require("./student.repository")

const getAllStudents = async () => {
    const students = await findStudents()
    return students
}

const getStudentById = async (id) => {
    try {
        const student = await findStudentsById(id)
        return student
    } catch (err) {
        console.error(err);
        throw new Error("Internal server error")
    }
}

const createStudent = async (newStudentsData) => {
    try {
        const student = await insertStudent(newStudentsData)
        return student
    } catch (error) {
        throw error
    }
}

const deleteStudentById = async (id) => {

    
    try {
        const student = await getStudentById(id)
        
        if (!student) {
            throw Error("Student not found")
        }; await deleteStudent(id)
        return student
    } catch (err) {
        console.error(err);
        throw Error("Internal server error")

    }
}

const ubdateStudentById = async (id, studentData) =>{
    await getStudentById(id)
    try {
        const student = await ubdateStudent(id, studentData)

        return student
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    deleteStudentById,
    ubdateStudentById
}
