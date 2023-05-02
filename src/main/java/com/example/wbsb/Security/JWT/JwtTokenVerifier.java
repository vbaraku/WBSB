package com.example.wbsb.Security.JWT;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
//import jdk.internal.joptsimple.internal.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

public class JwtTokenVerifier extends OncePerRequestFilter {

    @Value("${jwt.secret}")
    private String secretKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {


        //if request is get, don't check for token
        if(request.getMethod().equals("GET")){
            filterChain.doFilter(request,response);
            return;
        }
        String authorizationHeader = request.getHeader("Authorization");
        if ((authorizationHeader == null || authorizationHeader.equals("")) || !authorizationHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        String token = authorizationHeader.replace("Bearer ", "");


        try {

            boolean confirm = validateToken(token);
            if (!confirm) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        } catch (JwtException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        filterChain.doFilter(request,response);
    }

    public boolean validateToken(String token) {


        try {
            NetHttpTransport transport = new NetHttpTransport();
            GsonFactory jsonFactory = new GsonFactory();

            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                    // Specify the CLIENT_ID of the app that accesses the backend:
                    .setAudience(Collections.singletonList("361463634645-k1brd3lmdc06n66761o6hmi903onipaj.apps.googleusercontent.com"))
                    // Or, if multiple clients access the backend:
                    //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                    .build();


            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                // Print user identifier
                String userId = payload.getSubject();
                System.out.println("User ID: " + userId);

                // Get profile information from payload
                String email = payload.getEmail();
                System.out.println(email);
                String[] adminEmails = {"arditymeri7@gmail.com", "wbsbkcss@gmail.com"};
                ArrayList<String> adminEmailsList = new ArrayList<String>(Arrays.asList(adminEmails));
                if (!adminEmailsList.contains(email)) {
                    System.out.println("Not an admin");
                    return false;
                }
                return true;
            } else {
                System.out.println("Invalid ID token.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
