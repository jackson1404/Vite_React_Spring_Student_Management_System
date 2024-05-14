package com.student_management.react_springboot.repository;

import java.util.List;

import org.mybatis.spring.annotation.MapperScan;

import com.student_management.react_springboot.model.StudentModel;

@MapperScan
public interface StudentRepository {
	
	public int addStudent(StudentModel studentModel);
	public List<StudentModel> studentList();
	public int editStudent (StudentModel studentModel);
	public int deleteStudent(int studentId);
	public StudentModel studentById(String studentName);
	public StudentModel studentByName(int studentId);
}
