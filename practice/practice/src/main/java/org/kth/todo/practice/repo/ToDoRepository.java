package org.kth.todo.practice.repo;

import org.kth.todo.practice.model.ToDoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToDoRepository extends JpaRepository<ToDoItem, Long>{

}
