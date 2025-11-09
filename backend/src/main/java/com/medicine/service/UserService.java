package com.medicine.service;

import com.medicine.dto.admin.UpdateUserStatusRequest;
import com.medicine.dto.admin.UserResponse;
import com.medicine.dto.common.MessageResponse;
import com.medicine.dto.common.PagedResponse;
import com.medicine.dto.user.ChangePasswordRequest;
import com.medicine.dto.user.UpdateUserProfileRequest;
import com.medicine.dto.user.UserProfileResponse;

public interface UserService {

    PagedResponse<UserResponse> getAllUsers(int page, int size, String search);

    UserResponse updateUserStatus(Long userId, UpdateUserStatusRequest request);

    UserResponse getUserById(Long userId);

    UserProfileResponse getUserProfile(String userEmail);

    UserProfileResponse updateUserProfile(String userEmail, UpdateUserProfileRequest request);

    MessageResponse changePassword(String userEmail, ChangePasswordRequest request);
}