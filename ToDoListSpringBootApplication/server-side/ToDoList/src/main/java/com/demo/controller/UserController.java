package com.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo.bean.Task;
import com.demo.bean.User;
import com.demo.service.UserService;







@CrossOrigin(value = "*",maxAge = 3600)
@Controller
public class UserController {
	
	@Autowired
	private UserService  userService;
	
	
	
	
	@ResponseBody
	@RequestMapping(value ="/createdata", method=RequestMethod.POST,produces =MediaType.APPLICATION_JSON_VALUE,consumes=MediaType.APPLICATION_JSON_VALUE)
	 public ResponseEntity<Map<String,String>> createUser(@RequestBody User user)
	{
		HashMap<String, String> hm = new HashMap<>();
	  if (user == null) 
	  {
		  hm.put("Msg", "Sorry");
		  return new ResponseEntity<Map<String,String>>(HttpStatus.NOT_FOUND);
	  }
	  else
	  {
		  if(userService.createUser(user) == -1)
		  {
			  hm.put("Msg", "Email exits");
		  }
		  else
		  {
			  hm.put("Msg", "Done");
		  }
		
		  return new ResponseEntity<Map<String,String>>(hm, HttpStatus.CREATED); 
	  }
	
	 }
	
	
//	@RequestMapping(value = "/loginuser/{email}/{password}", method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
//	 public HashMap<String,String> getLogin(@PathVariable("email") String email,@PathVariable("password") String password) {
//		
//		HashMap<String,String> user = userService.getloginuser(email,password);
//
//		System.out.println(user);
//	  return user;
//	 }
	
	//http://localhost:8080/loginuser/sara@gmail.com/Sara@123
	@ResponseBody
	@RequestMapping(value = "/loginuser/{email}/{password}", method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String,String>> getLogin (@PathVariable("email") String email,@PathVariable("password") String password){
		 	System.out.println("hiii");

		 
		  HashMap<String, String> loginuser=userService.getloginuser(email,password);
		  System.out.println(loginuser);
		  
		  if (loginuser == null) {
			   	return new ResponseEntity<Map<String,String>>(HttpStatus.NOT_FOUND);
			  	}
			  	return new ResponseEntity<Map<String,String>>(loginuser, HttpStatus.OK);
	}
	
	
	
	
	
	 @ResponseBody
	@RequestMapping(value = "/getalluser", method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
	 public ResponseEntity<List<User>> user() {
	 
		 System.out.println("hiii");
	  HttpHeaders headers = new HttpHeaders();
	  List<User> user = userService.getUser();
	  System.out.println(user);
	  
	 
	  if (user == null||user.isEmpty()) {
	   return new ResponseEntity<List<User>>(HttpStatus.NOT_FOUND);
	  }
	  System.out.println(user);
	  headers.add("Number Of Records Found", String.valueOf(user.size()));
	  return new ResponseEntity<List<User>>(user, headers, HttpStatus.OK);
	 }
	 
	 @ResponseBody
	@RequestMapping(value = "/getalltask/{email}", method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
	 public ResponseEntity<List<Task>> Task(@PathVariable("email") String email) {
	 
	System.out.println("hiii");
	  HttpHeaders headers = new HttpHeaders();
	  List<Task> task = userService.getTask(email);
	  System.out.println(task);
	  
	 
	  if (task == null||task.isEmpty()) {
	   return new ResponseEntity<List<Task>>(HttpStatus.NOT_FOUND);
	  }
	  System.out.println(task);
	  headers.add("Number Of Records Found", String.valueOf(task.size()));
	  return new ResponseEntity<List<Task>>(task, headers, HttpStatus.OK);
	 }
	
	 
	 
	 	//http://localhost:8080/createtask
	 	@ResponseBody
		@RequestMapping(value ="/createtask", method=RequestMethod.POST,produces =MediaType.APPLICATION_JSON_VALUE,consumes=MediaType.APPLICATION_JSON_VALUE)
		 public ResponseEntity<Task> createUser(@RequestBody Task task) {
	 		
			System.out.println("in");
			System.out.println(task);
		  HttpHeaders headers = new HttpHeaders();
		  if (task == null) {
		   return new ResponseEntity<Task>(HttpStatus.BAD_REQUEST);
		  }
		  userService.createTask(task);
		  headers.add("Employee Created  - ", String.valueOf(task.getTask_id()));
		  return new ResponseEntity<Task>(task, headers, HttpStatus.CREATED);
		 }
	 	
	 	
	 	//fatch by task id
	 	
	 	//http://localhost:8080/task/2
		@RequestMapping(value = "/task/{task_id}", method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
	 	public ResponseEntity<Task> getUserById(@PathVariable("task_id") int task_id) {
			
	  	Task task = userService.getTaskById(task_id);
	  	if (task == null) {
	   	return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
	  	}
	  	return new ResponseEntity<Task>(task, HttpStatus.OK);
	 }
		
		
		
		@RequestMapping(value = "/user/{id}", method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
	 	public ResponseEntity<User> getUserId(@PathVariable("id") int id) {
			
	  	User user= userService.getUserId(id);
	  	if (user == null) {
	   	return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	  	}
	  	return new ResponseEntity<User>(user, HttpStatus.OK);
		}
		
		
		
		
		
		
		//delete task by id
		//http://localhost:8080/task/delete/1
		@RequestMapping(value = "/task/delete/{task_id}", method = RequestMethod.DELETE)
		public ResponseEntity<Task> deleteUser(@PathVariable("task_id") int task_id) {
		System.out.println("in delete");
	  HttpHeaders headers = new HttpHeaders();
	  Task task = userService.getTaskById(task_id);
	  if (task == null) {   
	   return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
	  }
	  userService.deleteUser(task_id);
	  headers.add("Employee Deleted - ", String.valueOf(task_id));
	  return new ResponseEntity<Task>(task, headers, HttpStatus.NO_CONTENT);
	 }
	
		
	//http://localhost:8080/upemployee/2    not sure beacuse i dont know how to ckeck in postman
	@RequestMapping(value = "/updatetask/{task_id}", method = RequestMethod.PUT,produces = MediaType.APPLICATION_JSON_VALUE)
	 public ResponseEntity<Task> updateEmployee(@PathVariable("task_id") int task_id, @RequestBody Task task) {
		System.out.println("inside up");
	  HttpHeaders headers = new HttpHeaders();
	  Task isExist = userService.getTaskById(task_id);
	  if (isExist == null) {   
	   return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
	  } else if (task == null) {
	   return new ResponseEntity<Task>(HttpStatus.BAD_REQUEST);
	  }
	  userService.updateTask(task);
	  headers.add("Employee Updated  - ", String.valueOf(task_id));
	  return new ResponseEntity<Task>(task, headers, HttpStatus.OK);
	 }
	
	
	@RequestMapping(value = "/updateStatu/{id}", method = RequestMethod.PUT,produces = MediaType.APPLICATION_JSON_VALUE)
	 public ResponseEntity<User> updateStatu(@PathVariable("id") int id, @RequestBody User user) {
		System.out.println("inside up");
	  HttpHeaders headers = new HttpHeaders();
	  User isExist = userService.getUserId(id);
	  System.out.println(isExist);
	  if (isExist == null) {   
		   return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		  } else if (user == null) {
		   return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
	
		  }
	  userService.updateStatus(user);
	  System.out.println(user);
	  headers.add("Employee Updated  - ", String.valueOf(id));
	  return new ResponseEntity<User>(user, headers, HttpStatus.OK);
	 }
	
	@RequestMapping(value = "/updatetaskStatu/{task_id}", method = RequestMethod.PUT,produces = MediaType.APPLICATION_JSON_VALUE)
	 public ResponseEntity<Task> updateTaskStatu(@PathVariable("task_id") int task_id, @RequestBody Task task) {
		System.out.println("inside up");
	  HttpHeaders headers = new HttpHeaders();
	  Task isExist = userService.getTaskById(task_id);
	  System.out.println(isExist);
	  if (isExist == null) {   
		   return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
		  } else if (task == null) {
		   return new ResponseEntity<Task>(HttpStatus.BAD_REQUEST);
	
		  }
	  userService.updateTaskStatu(task);
	  System.out.println(task);
	  headers.add("Employee Updated  - ", String.valueOf(task_id));
	  return new ResponseEntity<Task>(task, headers, HttpStatus.OK);
	 }
	 	
	
	 
	
	 	
	 	
	 	
	 	
	 	
	 	@ResponseBody
	 	@RequestMapping("/task")
	 	public Task getTask() {
	 		Task t=new Task();
	 		t.setTask_id(1);
	 		t.setStatu("pandding");
	 		
	 		return t;
	 	}

	
	@ResponseBody
	@RequestMapping("/datauser")
	public User getalluser()
	{
		User u=new User();
		u.setFirstName("sweti");
		u.setLastName("patel");
		u.setGender("male");
		u.setBirthDate("8/10/1992");
		u.setEmail("sweti@gmail.com");
		u.setPassword("12345");
		
		u.setStatu("activeted");
		return u;
		
	}

}
