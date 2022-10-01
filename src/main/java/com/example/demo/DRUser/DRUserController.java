package com.example.demo.DRUser;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.demo.Answers.AnswersDao;
import com.example.demo.Answers.AnswersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.data.jpa.domain.Specification.where;

@RestController
@RequestMapping("/api/user")
public class DRUserController {
  @Autowired
  DRUserService userService;

  @Autowired
  AnswersDao answersDao;

  @Autowired
  AnswersService answersService;

  @Autowired
  DRUserDao userDao;

  @Autowired
  DRUserCriteriaRepository userCriteriaRepository;

  @GetMapping
  public ResponseEntity<List<DRUser>> getAllTutorials(
          @RequestParam(required = false) String country,
          @RequestParam(required = false) String size,
          @RequestParam(required = false) String vetType
          ) {
    try {
      List<DRUser> users = new ArrayList<DRUser>();
      Specification spec = where(null);
      if(country != null) spec = spec.and(DRUserSpecifications.equalCountry(country));
      if(size != null) spec = spec.and(DRUserSpecifications.equalSize(size));
      if(vetType != null) spec = spec.and(DRUserSpecifications.equalVetType(vetType));


      users = userDao.findAll(spec);
      return new ResponseEntity<>(users,HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
//  @GetMapping("/{id}")
//  public ResponseEntity<Tutorial> getTutorialById(@PathVariable("id") long id) {
//    Optional<Tutorial> tutorialData = tutorialRepository.findById(id);
//    if (tutorialData.isPresent()) {
//      return new ResponseEntity<>(tutorialData.get(), HttpStatus.OK);
//    } else {
//      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }
//  }

  @PostMapping(path = "/register")
  public ResponseEntity register(@RequestBody RegistrationRequest registrationRequest) {
    DRUser user = new DRUser(registrationRequest.getEmail(),registrationRequest.getPassword());
    try{
      userService.register(user);
    }catch(IllegalStateException e){
      return ResponseEntity.status( HttpStatus.BAD_REQUEST).body("That email already exists.");
    }

    return ResponseEntity.status(HttpStatus.OK).body("Email created successfully");
  }

  @PostMapping("")
  public ResponseEntity<DRUser> create(@RequestBody DRUser user) {
    try {
      DRUser _user = userDao
          .save(user);
      return new ResponseEntity<>(_user, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/is_registered")
  public Boolean isRegistered(Principal principal){
      DRUser user = userDao.findByEmail(principal.getName()).get();
      return user.isRegistered();
  }
  @PutMapping
  public ResponseEntity<DRUser> updateUser(Principal principal, @RequestBody DRUser user) {
    Optional<DRUser> userData = userDao.findByEmail(principal.getName());
    if (userData.isPresent()) {
      DRUser _user = userData.get();
      _user.setVetType(user.getVetType());
      _user.setSize(user.getSize());
      _user.setType(user.getType());
      _user.setCountry(user.getCountry());
      _user.setJob(user.getJob());
      _user.setWorkExp(user.getWorkExp());
      _user.setGender(user.getGender());
      _user.setAge(user.getAge());
      
      return new ResponseEntity<>(userDao.save(_user), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
  
//  @DeleteMapping("/tutorials/{id}")
//  public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") long id) {
//    try {
//      tutorialRepository.deleteById(id);
//      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    } catch (Exception e) {
//      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//  }
//  @DeleteMapping("/tutorials")
//  public ResponseEntity<HttpStatus> deleteAllTutorials() {
//    try {
//      tutorialRepository.deleteAll();
//      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    } catch (Exception e) {
//      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//  }
//  @GetMapping("/tutorials/published")
//  public ResponseEntity<List<Tutorial>> findByPublished() {
//    try {
//      List<Tutorial> tutorials = tutorialRepository.findByPublished(true);
//      if (tutorials.isEmpty()) {
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//      }
//      return new ResponseEntity<>(tutorials, HttpStatus.OK);
//    } catch (Exception e) {
//      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//  }
}