package com.techwiz.techwizbe.entities.modals;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.techwiz.techwizbe.entities.enums.Gender;
import com.techwiz.techwizbe.entities.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "users")
@Table(name = "users", schema = "techwiz_database", catalog = "")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserEntity implements UserDetails {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Email
    @Column(name = "email", unique = true)
    @Size(max = 100)
    private String email;
    @Basic
    @Column(name = "phone_number", unique = true)
    @Size(max = 20, message = "Phone number from 10 to 12 digits")
    private String phoneNumber;
    @Basic
    @Column(name = "password", nullable = false)
    @NotEmpty(message = "Password can't be empty!")
    @Size(min = 8, message = "Password must have at least 8 characters.")
    private String password;
    @Basic
    @Column(name = "password_reset_token")
    private String passwordResetToken;
    @Basic
    @Column(name = "password_reset_expired")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date passwordResetExpired;
    @Basic
    @Column(name = "refresh_token")
    private String refreshToken;
    @Basic
    @Column(name = "token_revoked")
    public boolean tokenRevoked;
    @Basic
    @Column(name = "token_expired")
    public boolean tokenExpired;
    @Basic
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;
    @Basic
    @Column(name = "created_at" ,columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
    @Basic
    @Column(name = "full_name")
    public String fullName;
    @Basic
    @Column(name = "gender")
    public Gender gender;
    @Basic
    @Column(name = "dob")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    public Date dateOfBirth;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}