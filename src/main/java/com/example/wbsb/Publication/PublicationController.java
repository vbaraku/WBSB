package com.example.wbsb.Publication;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;

@RestController
@RequestMapping("/api/publication")
public class PublicationController {

    PublicationRepository publicationRepository;
    PublicationService publicationService;

    @Autowired
    public PublicationController(PublicationRepository publicationRepository,
                                 PublicationService publicationService) {
        this.publicationRepository = publicationRepository;
        this.publicationService = publicationService;
    }

    @GetMapping
    public List<Publication> getAllPublications(@RequestParam(required = false) Integer year, @RequestParam String language) {
        try {
            List<Publication> publications = new ArrayList<>();

            publicationRepository.findAllByLanguageOrderByDateDesc(language).forEach(publications::add);
            if (year != null) {
                publications = publications.stream().filter(p-> p.getDate().getYear() == year).collect(Collectors.toList());
            }

            return publications;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping(consumes = "multipart/form-data")
    @Transactional
    public ResponseEntity<?> uploadReport(@RequestPart MultipartFile file, @RequestPart MultipartFile image,
                                          @RequestPart String title ,String date, String language) {
        try {
            //transform date to LocalDate with format yyyy-MM-dd

            LocalDate localDate = LocalDate.parse(date);
            publicationService.uploadFile(file,title,image, localDate, language);
            System.out.println("File uploaded successfully");
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadPdf(@PathVariable String id) {

        String fileLocation = new File("src/main/resources/static/uploads").getAbsolutePath() + "/publication" + id + ".pdf";
        FileSystemResource resource = new FileSystemResource(fileLocation);
        MediaType mediaType = MediaTypeFactory
                .getMediaType(resource)
                .orElse(MediaType.APPLICATION_OCTET_STREAM);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);
        // 3
        ContentDisposition disposition = ContentDisposition
                // 3.2
//                .inline()
                 .attachment()
                // 3.1
                .filename(resource.getFilename())
                .build();
        headers.setContentDisposition(disposition);

        return new ResponseEntity(resource, headers, HttpStatus.OK);
    }



    @GetMapping("/{id}")
    public Publication getPublication(@PathVariable Integer id) {
        return publicationService.getFile(id);
    }
}
