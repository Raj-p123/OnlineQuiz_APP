package com.onlineQuiz.online_Quiz_App.auth.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {

    // ✅ Create PasswordEncoder Bean (Fixes your current error)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ✅ Basic security setup (disable CSRF, allow all endpoints for now)
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
            		.requestMatchers("/api/student/**").permitAll()
                .requestMatchers("/api/**").permitAll()  // Allow all APIs for now
                .anyRequest().authenticated()
            )
            .formLogin(login -> login.disable())
            .httpBasic(basic -> basic.disable());

        return http.build();
    }
}
