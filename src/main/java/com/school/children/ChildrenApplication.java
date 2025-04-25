package com.school.children;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController // ✅ This was missing
public class ChildrenApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChildrenApplication.class, args);
    }

    @GetMapping("/")
    public String rootEndpoint() {
        return "Welcome to the Children Application!";
    }
}
