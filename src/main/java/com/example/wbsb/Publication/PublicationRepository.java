package com.example.wbsb.Publication;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface PublicationRepository extends JpaRepository<Publication, Long> {
    Publication findById(Integer fileId);

    List<Publication> findAllByLanguageOrderByDateDesc(String language);
    //		List<Question> findByThematicElementContaining(String thematicElement);
//    Optional<Question> findById(Integer id);
//    Optional<List<Publication>> findAllByDate_Year(Integer year);

//    @Query("select new Publication (p.id, p.date, p.imagePath, p.title) from Publication p")
//    List<Publication> findAllByYear(Integer year);

}
