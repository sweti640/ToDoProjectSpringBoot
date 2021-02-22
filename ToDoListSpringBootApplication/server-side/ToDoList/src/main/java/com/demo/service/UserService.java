package com.demo.service;

import java.util.HashMap;
import java.util.List;

import com.demo.bean.Task;
import com.demo.bean.User;



public interface UserService {
	
	 public int createUser(User user);
	 
	 public HashMap<String,String> getloginuser(String email,String password);
	 
	 
	 public List<User> getUser();
	 
	 public List<Task> getTask(String email);
	 
	 public int createTask(Task task);
	 
	 public Task getTaskById(int task_id);
	 
	 public User getUserId( int id);
	 
	 public int deleteUser( int task_id);
	 
	 public int updateTask( Task task);
	 
	 public int updateStatus( User user);
	 
	 public int updateTaskStatu(Task task);


}
