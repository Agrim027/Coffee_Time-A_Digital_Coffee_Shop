package com.coffeetime.backend.services;

import com.coffeetime.backend.models.User;
import com.coffeetime.backend.payload.request.UpdateProfileRequest;
import com.coffeetime.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public User updateUserProfile(String userId, UpdateProfileRequest updateRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (updateRequest.getUsername() != null) user.setUsername(updateRequest.getUsername());
        if (updateRequest.getEmail() != null) user.setEmail(updateRequest.getEmail());
        if (updateRequest.getPhone() != null) user.setPhone(updateRequest.getPhone());
        if (updateRequest.getAddress() != null) user.setAddress(updateRequest.getAddress());

        return userRepository.save(user);
    }
}
