package com.student_management.react_springboot.model;

import lombok.Getter;
import lombok.Setter;

public class StudentModel {
	@Getter
	@Setter
	private int studentId;
	
	@Getter
	@Setter
	private String studentName;
	
	@Getter
	@Setter
	private int studentAge;
	
	@Getter
	@Setter
	private String studentEmail;
	
	@Getter
	@Setter
	private String studentAddress;
	
	@Getter
	@Setter
	private String studentPhone;
}
