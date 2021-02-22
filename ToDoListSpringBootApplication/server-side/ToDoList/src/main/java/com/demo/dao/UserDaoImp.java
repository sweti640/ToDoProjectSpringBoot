package com.demo.dao;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.demo.bean.Task;
import com.demo.bean.User;

@Repository
public class UserDaoImp implements UserDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public int createUser(User user) {
		
		int count = 0;
		
		try
		{
			 count = jdbcTemplate.update(
					"INSERT INTO user(firstName,lastName,gender,birthDate,email,password,statu)VALUES(?,?,?,?,?,?,?)",
					new Object[] { user.getFirstName(), user.getLastName(), user.getGender(), user.getBirthDate(),
							user.getEmail(), user.getPassword(), user.getStatu() });
		}
		catch (Exception e)
		{
		     count = -1;
		}
		
		return count;
	}

	@Override
	public HashMap<String, String> getloginuser(String email, String password) {

		HashMap<String, String> hm = new HashMap<>();
		User user = null;

		if (email.equalsIgnoreCase("admin@gmail.com") && password.equalsIgnoreCase("admin")) {
			System.out.println("hiii");
			hm.put("Msg", "admin");

		} else {
			user = jdbcTemplate.queryForObject("SELECT *FROM user WHERE email=? and  password=?",
					new BeanPropertyRowMapper<User>(User.class), email, password);

			if (user == null) {
				hm.put("Msg", "Not Found");
			}

			else {
				if (user.getStatu().equalsIgnoreCase("activeted")) {
					hm.put("Msg", "activeted");
				} else {
					hm.put("Msg", "deactiveted");
				}

			}
		}

		return hm;
	}

	@Override
	public List<User> getUser() {

		List<User> user = null;
		user = jdbcTemplate.query("SELECT * FROM user", new BeanPropertyRowMapper<User>(User.class));
		return user;
	}

	@Override
	public int createTask(Task task) {

		int count = jdbcTemplate.update("INSERT INTO task(task_name,description,Date,statu,email)VALUES(?,?,?,?,?)",
				new Object[] { task.getTask_name(), task.getDescription(), getCurrentDate(), task.getStatu(),
						task.getEmail() });
		return count;
	}

	private static java.sql.Date getCurrentDate() {
		java.util.Date today = new java.util.Date();
		return new java.sql.Date(today.getTime());
	}

	@Override
	public Task getTaskById(int task_id) {

		Task task = null;
		task = jdbcTemplate.queryForObject("SELECT * FROM task WHERE task_id = ?",
				new BeanPropertyRowMapper<Task>(Task.class), task_id);
		return task;
	}

	@Override
	public int deleteUser(int task_id) {

		int count = jdbcTemplate.update("DELETE from task WHERE task_id = ?", new Object[] { task_id });
		return count;
	}

	@Override
	public int updateTask(Task task) {

		int count = jdbcTemplate.update(
				"UPDATE task set task_name = ? , description = ? , Date = ?,statu=?,email=? where task_id= ?",
				new Object[] { task.getTask_name(), task.getDescription(), getCurrentDate(), task.getStatu(),
						task.getEmail(), task.getTask_id() });

		return count;

	}

	@Override
	public List<Task> getTask(String email) {
		List<Task> task = null;
		task = jdbcTemplate.query("SELECT * FROM task WHERE email = ?", new BeanPropertyRowMapper<Task>(Task.class),
				email);
		return task;
	}

	@Override
	public int updateStatus(User user) {
		System.out.println("dao");
		int count = jdbcTemplate.update(
				"UPDATE user set firstName = ?,lastName = ?,gender = ?,birthDate=?,email=? ,password=?,statu=? where id= ?",
				new Object[] { user.getFirstName(), user.getLastName(), user.getGender(), user.getBirthDate(),
						user.getEmail(), user.getPassword(), user.getStatu(),user.getId() });
		System.out.println(count);
		return count;

	}

	@Override
	public User getUserId(int id) {
		User user = null;
		user = jdbcTemplate.queryForObject("SELECT * FROM user WHERE id = ?",
				new BeanPropertyRowMapper<User>(User.class), id);
		return user;

	}

	@Override
	public int updateTaskStatu(Task task) {
		int count = jdbcTemplate.update("UPDATE task set statu=? where task_id= ?",
				new Object[] { task.getStatu(), task.getTask_id() });

		return count;
	}

}
