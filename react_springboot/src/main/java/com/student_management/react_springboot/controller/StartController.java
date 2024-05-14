package com.student_management.react_springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.student_management.react_springboot.model.StudentModel;
import com.student_management.react_springboot.service.serviceImpl.StudentServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class StartController {

	@Autowired
	private StudentServiceImpl studentServiceImpl;
	
	@PostMapping(value = "addStudent", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public int addStudent(@RequestBody StudentModel stModel){
		return studentServiceImpl.addStudent(stModel);
	}
	
	@RequestMapping(value = "deleteStudent/{student_id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public int deleteStudent(@PathVariable ("student_id") int student_id) {
		return studentServiceImpl.deleteStudent(student_id);
	}
	
	@RequestMapping(value = "studentList", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<StudentModel> studentList(){
		return studentServiceImpl.studentList();
	}
	
	@RequestMapping(value = "studentById", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public StudentModel studentById(@RequestParam (name = "name")String name) {
		return studentServiceImpl.studentById(name);
	}
	
	@RequestMapping(value = "/studentByName", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public StudentModel studentById(@RequestParam(name = "studentId") int studentId) {
	    return studentServiceImpl.studentByName(studentId);
	}

	
	@RequestMapping(value = "/editStudent", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public int editStudent(@RequestBody StudentModel stModel) {
		return studentServiceImpl.editStudent(stModel);
	}
	
}
