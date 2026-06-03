package com.coffeetime.backend.payload.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {
    private String id;
    private String username;
    private String email;
}
