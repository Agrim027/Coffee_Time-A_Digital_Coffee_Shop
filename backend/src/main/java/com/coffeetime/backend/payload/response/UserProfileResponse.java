package com.coffeetime.backend.payload.response;

import com.coffeetime.backend.models.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserProfileResponse {
    private boolean success;
    private String message; // Optional, might be used for updates
    private User user;
}
