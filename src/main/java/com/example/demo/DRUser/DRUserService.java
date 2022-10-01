package com.example.demo.DRUser;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DRUserService implements UserDetailsService {
    private final DRUserDao drUserDao;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    DRUserService(BCryptPasswordEncoder bc, DRUserDao userDao){
        this.bCryptPasswordEncoder = bc;
        this.drUserDao = userDao;
    }
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDetails d1 = drUserDao.findByEmail(email).get();
        System.out.println(d1.getUsername());
        System.out.println(d1.getPassword());
        System.out.println(d1.getAuthorities());
        return drUserDao.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(""));
    }


    public String register(DRUser user){
//        boolean isValidEmail = emailValidator.test(collabUser.getEmail());
//        if(!isValidEmail){
//            throw new IllegalStateException("Email not valid");
//        }
        boolean userExists = drUserDao.findByEmail(user.getEmail())
                .isPresent();

        if(userExists){
            throw new IllegalStateException("An account with this email already exists.");
        }

        System.out.println(user.toString());
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
//
        user.setPassword(encodedPassword);

        drUserDao.save(user);
        //TODO: send confirmation token
        return "it works";
    }
}
