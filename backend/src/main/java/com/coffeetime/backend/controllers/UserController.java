package com.coffeetime.backend.controllers;

import com.coffeetime.backend.models.User;
import com.coffeetime.backend.payload.request.UpdateProfileRequest;
import com.coffeetime.backend.payload.response.UserProfileResponse;
import com.coffeetime.backend.payload.response.UsersListResponse;
import com.coffeetime.backend.security.services.UserDetailsImpl;
import com.coffeetime.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        
        return ResponseEntity.ok(UsersListResponse.builder()
                .success(true)
                .count(users.size())
                .users(users)
                .build());
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userService.getUserById(userDetails.getId());

        return ResponseEntity.ok(UserProfileResponse.builder()
                .success(true)
                .user(user)
                .build());
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody UpdateProfileRequest updateRequest, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User updatedUser = userService.updateUserProfile(userDetails.getId(), updateRequest);

        return ResponseEntity.ok(UserProfileResponse.builder()
                .success(true)
                .message("Profile updated successfully")
                .user(updatedUser)
                .build());
    }
}
