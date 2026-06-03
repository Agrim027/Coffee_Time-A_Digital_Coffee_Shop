package com.coffeetime.backend.payload.request;

import lombok.Data;

@Data
public class SignupRequest {
    private String username;
    private String email;
    private String password;
    private String phone;
    private String address;
}
