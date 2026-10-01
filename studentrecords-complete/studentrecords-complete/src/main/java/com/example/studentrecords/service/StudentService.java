package com.example.studentrecords.service;

import com.example.studentrecords.dto.StudentRequest;
import com.example.studentrecords.entity.Student;
import com.example.studentrecords.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student createStudent(StudentRequest request) {
        Student student = new Student();

        student.setName(request.getName());
        student.setAge(request.getAge());
        student.setCourse(request.getCourse());
        student.setEmail(request.getEmail());

        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(String id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public Student updateStudent(String id, StudentRequest request) {
        Student student = getStudentById(id);

        student.setName(request.getName());
        student.setAge(request.getAge());
        student.setCourse(request.getCourse());
        student.setEmail(request.getEmail());

        return studentRepository.save(student);
    }

    public void deleteStudent(String id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found");
        }

        studentRepository.deleteById(id);
    }
}
