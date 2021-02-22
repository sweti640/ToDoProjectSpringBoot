package com.demo.bean;

public class Task {
	
	private int task_id;
	private String task_name;
	private String description;
	private java.sql.Date Date;
	private String statu;
	private String email;
	public int getTask_id() {
		return task_id;
	}
	public void setTask_id(int task_id) {
		this.task_id = task_id;
	}
	public String getTask_name() {
		return task_name;
	}
	public void setTask_name(String task_name) {
		this.task_name = task_name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public java.sql.Date getDate() {
		return Date;
	}
	public void setDate(java.sql.Date date) {
		Date = date;
	}
	public String getStatu() {
		return statu;
	}
	public void setStatu(String statu) {
		this.statu = statu;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@Override
	public String toString() {
		return "Task [task_id=" + task_id + ", task_name=" + task_name + ", description=" + description + ", Date="
				+ Date + ", statu=" + statu + ", email=" + email + "]";
	}
	
	
	
	
	

}
