const Interview = require('../models/interview_Schema');
const Student = require('../models/student_Schema');
const Result = require('../models/result_Schema');

//rendering interview page
module.exports.home = async function(req, res){
    const interviews = await Interview.find({});
    return res.render('interviews', {
        title: 'List of Interviews',
        interviews
    });
}

//function to create interviews
module.exports.create = async function(req, res){
    await Interview.create(req.body);
    return res.redirect('back');
}

//function to show details of that particular interview
module.exports.interview = async function(req, res){
    const interview = await Interview.findById(req.params.id).populate('student');
    const remStudents = await Student.find({_id: { $nin: interview.student }});
    return res.render('interview', {
        title: "Interview",
        interview,
        students: interview.student,
        remStudents
    })
}

//function to add students to an interview
module.exports.add = async function(req, res){
    const interview = await Interview.findById(req.params.id);
    interview.student.push(req.body.student);
    interview.save();
    const student = await Student.findById(req.body.student);
    student.interview.push(req.params.id);
    student.save();
    return res.redirect('back');
}

//function to add result to a student
module.exports.result = async function(req, res){
    const student = await Student.findById(req.params.id);
    student.result = req.body.result;
    student.save();
    const result = await Result.findOne({result: req.body.result});
    if(!result){
        let resultNew = await Result.create({result: req.body.result});
        resultNew.student.push(req.params.id);
        resultNew.save();
    } else {
        result.student.push(req.params.id);
        result.save();
    }
    return res.redirect('back');
}