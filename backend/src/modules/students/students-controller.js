const asyncHandler = require("express-async-handler");
const { 
    getAllStudents, 
    addNewStudent, 
    getStudentDetail, 
    setStudentStatus, 
    updateStudent 
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const filters = {
        name: req.query.name,
        className: req.query.className,
        section: req.query.section,
        roll: req.query.roll
    };

    const students = await getAllStudents(filters);
    res.status(200).json({
        success: true,
        data: students
    });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const payload = req.body;

    const result = await addNewStudent(payload);

    res.status(201).json({
        success: true,
        message: result.message
    });
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const payload = { ...req.body, id };

    const result = await updateStudent(payload);

    res.status(200).json({
        success: true,
        message: result.message
    });
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);

    const student = await getStudentDetail(id);

    res.status(200).json({
        success: true,
        data: student
    });
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { reviewerId, status } = req.body;

    const result = await setStudentStatus({ userId, reviewerId, status });

    res.status(200).json({
        success: true,
        message: result.message
    });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
