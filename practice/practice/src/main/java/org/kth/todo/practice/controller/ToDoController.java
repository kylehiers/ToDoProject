package org.kth.todo.practice.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.kth.todo.practice.model.ToDoItem;
import org.kth.todo.practice.repo.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ToDoController {

	@Autowired
	private ToDoRepository repository;

	@GetMapping("/todoitems")
	public List<ToDoItem> getAllToDoItems() {
		return repository.findAll();
	}
	
	@GetMapping("/item/{id}")
	public Optional<ToDoItem> getItemById(@PathVariable("id") long id) {
		Optional<ToDoItem> item = repository.findById(id);
		if (item.isPresent()) {
			return item;
		}
		return null;
	}

	@PostMapping("/additem")
	public void addToDoItem(@RequestBody ToDoItem item) {
		try {
			Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse(item.getStartDate());
			Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse(item.getEndDate());
			if (item != null && (startDate.getTime() <= endDate.getTime())) {
				repository.save(item);
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}

	@PutMapping("/updateItem/{id}")
	public ToDoItem updateItem(@PathVariable("id") long id, @RequestBody ToDoItem item) {
		ToDoItem updateItem = repository.getOne(id);
		if (item != null) {
			updateItem.setTitle(item.getTitle());
			updateItem.setDescription(item.getDescription());
			updateItem.setStartDate(item.getStartDate());
			updateItem.setEndDate(item.getEndDate());
			repository.save(updateItem);
		}
		return updateItem;
	}
				
	@DeleteMapping("/deleteitem/{id}")
	public void deleteToDoItem(@PathVariable("id") long id) {
		repository.deleteById(id);
	}
}
