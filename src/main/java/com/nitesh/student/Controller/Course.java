package com.nitesh.student.Controller;

public class Course {

    private Long id;
    private String title;
    private String description;

    // Default Constructor
    public Course() {
    }

    // Parameterized Constructor
    public Course(Long id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    // Getter for id
    public Long getId() {
        return id;
    }

    // Setter for id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter for title
    public String getTitle() {
        return title;
    }

    // Setter for title
    public void setTitle(String title) {
        this.title = title;
    }

    // Getter for description
    public String getDescription() {
        return description;
    }

    // Setter for description
    public void setDescription(String description) {
        this.description = description;
    }

    // Main method to test the class
    public static void main(String[] args) {

        // Creating object using parameterized constructor
        Course course = new Course(123L, "Nitesh", "eruieoie");

        // Printing values
        System.out.println("ID: " + course.getId());
        System.out.println("Title: " + course.getTitle());
        System.out.println("Description: " + course.getDescription());

        // Updating values using setters
        course.setTitle("Java Programming");
        course.setDescription("Spring Boot Basics");

        System.out.println("\nAfter Updating:");
        System.out.println("ID: " + course.getId());
        System.out.println("Title: " + course.getTitle());
        System.out.println("Description: " + course.getDescription());
    }
}