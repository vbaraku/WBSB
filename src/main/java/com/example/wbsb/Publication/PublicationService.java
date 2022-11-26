package com.example.wbsb.Publication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Service
public class PublicationService {

    PublicationRepository publicationRepository;

    @Autowired
    public PublicationService(PublicationRepository publicationRepository) {
        this.publicationRepository = publicationRepository;
    }

    public String uploadFile(MultipartFile file, String title, MultipartFile image, LocalDate date, String language) throws IOException {
        String imageExtension = image.getOriginalFilename().split("\\.")[1];
        String uuid = UUID.randomUUID().toString();
        Publication doc = new Publication(uuid, title, uuid+"."+imageExtension, date, language);

        String fileLocation = new File("src\\main\\resources\\static\\uploads\\files").getAbsolutePath() + "\\" + uuid + ".pdf";
        String imageLocation = new File("src\\main\\resources\\static\\uploads\\images").getAbsolutePath() + "\\" +uuid + "." + imageExtension;
        publicationRepository.save(doc);
        file.transferTo(new File(fileLocation));
        image.transferTo(new File(imageLocation));
        return uuid;
    }


    public Publication getFile(Integer fileId){
        return publicationRepository.findById(fileId);

    }
}
