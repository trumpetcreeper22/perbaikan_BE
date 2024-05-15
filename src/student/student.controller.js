const express = require('express')
const prisma = require('../db')

const { getAllStudents, getStudentById, createStudent, deleteStudentById, ubdateStudentById } = require("./student.service")

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const students = await getAllStudents()

        res.status(200).json({
            status: "success get the database",
            data: students,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/", async (req, res) => {
    const newStudentsData = req.body
    const student = await createStudent(newStudentsData)
    res.send({
        data: student,
        message: "Data berhasil dimasukan"
    })
});

router.delete("/:id", async (req, res) => {
    try {
        const studentId = (req.params.id)
        await deleteStudentById(parseInt(studentId))

        res.status(200).json({
            status: "success",
            message: "Data berhasil dihapus",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("tidak ada data");
    }
});

router.get("/:id", async (req, res) => {
    const studentId = parseInt(req.params.id);
    try {
        const students = await getStudentById(parseInt(studentId));

        res.status(200).json({
            status: "data berhasil didapatkan",
            data: students,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("tidak ada data");
    }
});

router.put("/:id", async (req, res) => {
    const studentId = req.params.id;
    const studentData = req.body;

    if (
        !(
            studentData.name &&
            studentData.address
        )
    ) {
        return res.status(400).send("Some fields are missing")
    }
    try {
        const student = await ubdateStudentById(parseInt(studentId), studentData)
           
        res.send({
            message: "Data berhasil diperbarui",
            data: student,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.patch("/:id", async (req, res) => {
    const studentId = req.params.id;
    const studentData = req.body;

    try {
        const student = await ubdateStudentById(parseInt(studentId), studentData)
           
        res.send({
            message: "Data berhasil diperbarui",
            data: student,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router