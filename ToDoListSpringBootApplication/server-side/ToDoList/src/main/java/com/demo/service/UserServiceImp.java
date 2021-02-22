package com.demo.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.bean.Task;
import com.demo.bean.User;
import com.demo.dao.UserDao;



@Service
public class UserServiceImp  implements UserService{
	
	@Autowired
	private  UserDao userdao;

	@Override
	public int createUser(User user) {
		
		return userdao.createUser(user);
		
	}

	@Override
	public HashMap<String, String> getloginuser(String email, String password) {
		
		HashMap<String,String> user=userdao.getloginuser(email,password);
		
		  return user;
	}

	@Override
	public List<User> getUser() {
		
		List<User> user = userdao.getUser();
		  
		  return user;
		
	}

	@Override
	public int createTask(Task task) {
		
		return userdao.createTask(task);
	}

	@Override
	public Task getTaskById(int task_id) {
		/*Employee employee = employeeDao.getEmployee(employeeId);
		  return employee;*/
		Task task=userdao.getTaskById(task_id);
		return task;
	}

	@Override
	public int deleteUser(int task_id) {
		return userdao.deleteUser(task_id);
	}

	@Override
	public int updateTask(Task task) {
		// TODO Auto-generated method stub
		return userdao.updateTask(task);
	}

	@Override
	public List<Task> getTask(String email) {
		List<Task> task=userdao.getTask(email);
		return task;
	}

	@Override
	public int updateStatus(User user) {
		// TODO Auto-generated method stub
		return userdao.updateStatus(user);
	}

	@Override
	public User getUserId(int id) {
		User user=userdao.getUserId(id);
		return user;
	}

	@Override
	public int updateTaskStatu(Task task) {
		
		return userdao.updateTaskStatu(task);
	}

	
	

}
