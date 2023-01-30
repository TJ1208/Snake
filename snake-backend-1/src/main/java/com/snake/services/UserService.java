package com.snake.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.snake.models.User;
import com.snake.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}
	
	public User getUserById(Long id) {
		return userRepo.findById(id).get();
	}
	
	public User getUserByName(String name) {
		return userRepo.getUserByName(name);
	}
	
	public List<User> getUsersByScore() {
		return userRepo.getUsersByScore();
	}
	
	public void addUser(User user) {
		userRepo.save(user);
	}
	
	public void updateUser(User user) {
		userRepo.save(user);
	}
}