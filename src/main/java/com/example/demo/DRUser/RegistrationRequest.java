package com.example.demo.DRUser;

import com.example.demo.Security.JWT.UsernameAndPasswordAuthenticationRequest;


public class RegistrationRequest extends UsernameAndPasswordAuthenticationRequest {
    private String username;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public RegistrationRequest() {
    }

    public RegistrationRequest(String username) {
        this.username = username;
    }

}


