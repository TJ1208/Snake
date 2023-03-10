package com.snake.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.snake.models.User;
import com.snake.services.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping()
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}
	
	@GetMapping("/{id}")
	public User getUserById(@PathVariable Long id) {
		return userService.getUserById(id);
	}
	
	@GetMapping("/name/{name}")
	public User getUserByName(@PathVariable String name) {
		return userService.getUserByName(name);
	}
	
	@GetMapping("/score")
	public List<User> getUsersByScore() {
		return userService.getUsersByScore();
	}
	
	@PostMapping("/add")
	public void addUser(@RequestBody User user) {
		userService.addUser(user);
	}
	
	@PutMapping("/update")
	public void updateUser(@RequestBody User user) {
		userService.updateUser(user);
	}
}
