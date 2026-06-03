package com.coffeetime.backend.payload.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private boolean success;
    private String message;
    private String token;
    private UserDto user;
}
