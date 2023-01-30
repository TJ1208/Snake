package com.snake.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import com.snake.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	@Query("SELECT u FROM User u WHERE u.name = :name")
	public User getUserByName(@PathVariable String name);
	
	@Query("SELECT u FROM User u ORDER BY u.score DESC")
	public List<User> getUsersByScore();

}
