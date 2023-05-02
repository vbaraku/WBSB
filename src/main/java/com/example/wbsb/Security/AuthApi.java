package com.example.wbsb.Security;

import com.example.wbsb.Security.JWT.JwtTokenVerifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/auth/google")
public class AuthApi {
    @GetMapping
    //This method will take a google jwt, validate it and return a jwt for our backend
    public ResponseEntity<String> authenticate(@RequestHeader("Authorization") String token){

        boolean validated = new JwtTokenVerifier()
                .validateToken(token.replace("Bearer ",""));
        //Second, create a jwt for our backend
        if(validated){
            return ResponseEntity.ok(token);
        }else{
            return ResponseEntity.badRequest().body("Invalid token");
        }

    }
}
