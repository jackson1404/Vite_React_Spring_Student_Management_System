package com.student_management.react_springboot.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student_management.react_springboot.model.StudentModel;
import com.student_management.react_springboot.repository.StudentRepository;
import com.student_management.react_springboot.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService{
	
	@Autowired
	private StudentRepository studentRepository;

	@Override
	public int addStudent(StudentModel studentModel) {
		return studentRepository.addStudent(studentModel);
	}

	@Override
	public List<StudentModel> studentList() {
		return studentRepository.studentList();
	}

	@Override
	public int editStudent(StudentModel studentModel) {
		return studentRepository.editStudent(studentModel);
	}

	@Override
	public int deleteStudent(int studentId) {
		return studentRepository.deleteStudent(studentId);
	}

	@Override
	public StudentModel studentById(String studentName) {
		return studentRepository.studentById(studentName);
	}

	@Override
	public StudentModel studentByName(int studentId) {
		return studentRepository.studentByName(studentId);
	}


	
	
}
