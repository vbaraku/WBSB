package com.example.wbsb;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

//@EnableWebMvc Remove this
@RestController
public class ResourceController{

    @GetMapping("")
    public String getRoot() {
        return "hello";
    }
    @GetMapping("/files/{id}")
    public ResponseEntity<Resource> getPDF(@PathVariable String id) {

        String fileLocation = new File("src/main/resources/static/uploads/files").getAbsolutePath() + "/" + id;
        FileSystemResource resource = new FileSystemResource(fileLocation);
        MediaType mediaType = MediaTypeFactory
                .getMediaType(resource)
                .orElse(MediaType.APPLICATION_OCTET_STREAM);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);
        // 3
        ContentDisposition disposition = ContentDisposition
                // 3.2
                .inline()
//                .attachment()
                // 3.1
                .filename(resource.getFilename())
                .build();
        headers.setContentDisposition(disposition);

        return new ResponseEntity(resource, headers, HttpStatus.OK);
    }

    @GetMapping("/images/{fileName}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) {

        String fileLocation = new File("src/main/resources/static/uploads/images").getAbsolutePath() +"/"+ fileName;
        FileSystemResource resource = new FileSystemResource(fileLocation);
        MediaType mediaType = MediaTypeFactory
                .getMediaType(resource)
                .orElse(MediaType.APPLICATION_OCTET_STREAM);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);
        // 3
        ContentDisposition disposition = ContentDisposition
                // 3.2
                .inline()
//                .attachment()
                // 3.1
                .filename(resource.getFilename())
                .build();
        headers.setContentDisposition(disposition);

        return new ResponseEntity(resource, headers, HttpStatus.OK);
    }
}