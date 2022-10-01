package com.example.demo.Security.JWT;

import com.example.demo.DRUser.DRUser;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

public class JwtUsernameAndPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

//
//    public JwtUsernameAndPswAuthFilter(AuthenticationManager authenticationManager){
//        this.authenticationManager = authenticationManager;
//    }

    public JwtUsernameAndPasswordAuthenticationFilter(AuthenticationManager authenticationManager){
        this.authenticationManager = authenticationManager;
    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            UsernameAndPasswordAuthenticationRequest authenticationRequest = new ObjectMapper().readValue(request.getInputStream(),
                    UsernameAndPasswordAuthenticationRequest.class);
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getEmail(),
                    authenticationRequest.getPassword()
            );
            System.out.println(authentication.getCredentials());
            Authentication authenticate = authenticationManager.authenticate(authentication);
            return authenticate;

        }catch(IOException e){
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        String key = "securesecuresecuresecuresecuresecuresecuresecure";
        Date time = new Date();
        time = Date.from(time.toInstant().plusSeconds(60*60*24));
        String token = Jwts.builder().setSubject(((DRUser)authResult.getPrincipal()).getEmail()).claim("authorities",authResult.getAuthorities())
                .setIssuedAt(new Date()).setExpiration(time).signWith(Keys.hmacShaKeyFor(key.getBytes())).compact();
        response.addHeader("Authorization", "Bearer " + token);
        response.getWriter().write("Bearer "+token);

    }
}