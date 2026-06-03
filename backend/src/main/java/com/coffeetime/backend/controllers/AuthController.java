package com.coffeetime.backend.controllers;

import com.coffeetime.backend.models.User;
import com.coffeetime.backend.payload.request.LoginRequest;
import com.coffeetime.backend.payload.request.SignupRequest;
import com.coffeetime.backend.payload.response.AuthResponse;
import com.coffeetime.backend.payload.response.UserDto;
import com.coffeetime.backend.repository.UserRepository;
import com.coffeetime.backend.security.services.UserDetailsImpl;
import com.coffeetime.backend.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        
        User user = userRepository.findByUsernameOrEmail(loginRequest.getUsername(), loginRequest.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));
        
        String jwt = authService.authenticateAndGetToken(user.getUsername(), loginRequest.getPassword());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        UserDto userDto = UserDto.builder()
                .id(userDetails.getId())
                .username(userDetails.getUsername())
                .email(userDetails.getEmail())
                .build();

        return ResponseEntity.ok(AuthResponse.builder()
                .success(true)
                .message("Login successful!")
                .token(jwt)
                .user(userDto)
                .build());
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        
        User user = authService.registerUser(signUpRequest);
        String jwt = authService.authenticateAndGetToken(user.getUsername(), signUpRequest.getPassword());
        
        UserDto userDto = UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(AuthResponse.builder()
                .success(true)
                .message("User registered successfully")
                .token(jwt)
                .user(userDto)
                .build());
    }
    

}
