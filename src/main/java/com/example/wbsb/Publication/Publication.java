package com.example.wbsb.Publication;

//import com.example.demo.Answers.Answers;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
public class Publication {

    @Id
    String id;

    @Column(length = 5500)
    private String title;

    private String imagePath;


//    @Column(length = 5500, unique = true)
//    private String title;
//
//    @Lob
//    private byte[] file;

    private LocalDate date;

    public Publication() {
    }


    public Publication(String id, String title, String fileName) {
        date = LocalDate.now();
        this.title = title;
        this.id = id;
        this.imagePath = fileName;
    }

    public Publication(String id, LocalDate date, String fileName, String title) {
        this.date = date;
        this.title = title;
        this.id = id;
        this.imagePath = fileName;
    }



    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String fileName) {
        this.imagePath = fileName;
    }
//    public byte[] getFile() {
//        return file;
//    }
//
//    public void setFile(byte[] file) {
//        this.file = file;
//    }
}


