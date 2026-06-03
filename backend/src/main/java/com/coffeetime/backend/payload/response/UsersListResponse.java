package com.coffeetime.backend.payload.response;

import com.coffeetime.backend.models.User;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UsersListResponse {
    private boolean success;
    private int count;
    private List<User> users;
}
