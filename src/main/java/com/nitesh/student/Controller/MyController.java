package com.nitesh.student.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
public class MyController {
   private String name;
   private int id;

    @GetMapping("/homes")
    public String home(){
        return "This is mine home";
    }
    @GetMapping("/nitesh")
    public String hello(){
        return "hello how are you?";
    }
 public static class Student{

 }
    @PostMapping("/student")
        String hi(@RequestBody Student student)
    {
        int id = student.getId();
        int age = student.getAge();
        return "Your id is " + id + "your age is" + age;
    }
}
