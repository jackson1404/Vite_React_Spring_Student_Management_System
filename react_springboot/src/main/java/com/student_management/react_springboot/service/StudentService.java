package com.student_management.react_springboot.service;

import java.util.List;

import com.student_management.react_springboot.model.StudentModel;

public interface StudentService {
	
	public int addStudent(StudentModel studentModel);
	public List<StudentModel> studentList();
	public int editStudent (StudentModel studentModel);
	public int deleteStudent(int studentId);
	public StudentModel studentById(String studentName);
	public  StudentModel studentByName(int studentId);
}

