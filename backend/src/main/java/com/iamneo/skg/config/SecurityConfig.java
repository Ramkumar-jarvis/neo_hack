package com.iamneo.skg.config;

import static com.iamneo.skg.model.enumerated.Permission.ADMIN_CREATE;
import static com.iamneo.skg.model.enumerated.Permission.ADMIN_DELETE;
import static com.iamneo.skg.model.enumerated.Permission.ADMIN_READ;
import static com.iamneo.skg.model.enumerated.Permission.ADMIN_UPDATE;
import static com.iamneo.skg.model.enumerated.Permission.STUDENT_CREATE;
import static com.iamneo.skg.model.enumerated.Permission.STUDENT_DELETE;
import static com.iamneo.skg.model.enumerated.Permission.STUDENT_READ;
import static com.iamneo.skg.model.enumerated.Permission.STUDENT_UPDATE;
import static com.iamneo.skg.model.enumerated.Permission.TRAINER_CREATE;
import static com.iamneo.skg.model.enumerated.Permission.TRAINER_DELETE;
import static com.iamneo.skg.model.enumerated.Permission.TRAINER_READ;
import static com.iamneo.skg.model.enumerated.Permission.TRAINER_UPDATE;
import static com.iamneo.skg.model.enumerated.Role.ADMIN;
import static com.iamneo.skg.model.enumerated.Role.STUDENT;
import static com.iamneo.skg.model.enumerated.Role.TRAINER;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.iamneo.skg.util.MyConstant;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@Order(Ordered.HIGHEST_PRECEDENCE)
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthenticationFilter;
        private final AuthenticationProvider authenticationProvider;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
                httpSecurity
                                .csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(authorize -> authorize
                                                .requestMatchers(MyConstant.AUTH_API_PATH + "/**",
                                                                MyConstant.SWAGGER_UI + "/**",
                                                                MyConstant.SWAGGER_UI_HTML)
                                                .permitAll()
                                                // Admin
                                                .requestMatchers(MyConstant.ADMIN_API_PATH + "/**")
                                                .hasRole(ADMIN.name())
                                                .requestMatchers(GET, MyConstant.ADMIN_API_PATH + "/**")
                                                .hasAuthority(ADMIN_READ.name())
                                                .requestMatchers(POST, MyConstant.ADMIN_API_PATH + "/**")
                                                .hasAuthority(ADMIN_CREATE.name())
                                                .requestMatchers(PUT, MyConstant.ADMIN_API_PATH + "/**")
                                                .hasAuthority(ADMIN_UPDATE.name())
                                                .requestMatchers(DELETE, MyConstant.ADMIN_API_PATH + "/**")
                                                .hasAuthority(ADMIN_DELETE.name())
                                                // Trainer
                                                .requestMatchers(MyConstant.TRAINER_API_PATH + "/**")
                                                .hasAnyRole(ADMIN.name(), TRAINER.name())
                                                .requestMatchers(GET, MyConstant.TRAINER_API_PATH + "/**")
                                                .hasAnyAuthority(ADMIN_READ.name(), TRAINER_READ.name())
                                                .requestMatchers(POST, MyConstant.TRAINER_API_PATH + "/**")
                                                .hasAnyAuthority(ADMIN_CREATE.name(), TRAINER_CREATE.name())
                                                .requestMatchers(PUT, MyConstant.TRAINER_API_PATH + "/**")
                                                .hasAnyAuthority(ADMIN_UPDATE.name(), TRAINER_UPDATE.name())
                                                .requestMatchers(DELETE, MyConstant.TRAINER_API_PATH + "/**")
                                                .hasAnyAuthority(ADMIN_DELETE.name(), TRAINER_DELETE.name())
                                                // Student
                                                .requestMatchers(MyConstant.STUDENT_API_PATH + "/**")
                                                .hasAnyRole(ADMIN.name(), STUDENT.name())
                                                .requestMatchers(GET, MyConstant.STUDENT_API_PATH + "/**")
                                                .hasAnyAuthority(ADMIN_READ.name(), STUDENT_READ.name())
                                                .requestMatchers(POST, MyConstant.STUDENT_API_PATH + "/**")
                                                .hasAnyAuthority(ADMIN_CREATE.name(), STUDENT_CREATE.name())
                                                .requestMatchers(PUT, MyConstant.STUDENT_API_PATH + "/**")
                                                .hasAnyAuthority(ADMIN_UPDATE.name(), STUDENT_UPDATE.name())
                                                .requestMatchers(DELETE, MyConstant.STUDENT_API_PATH + "/**")
                                                .hasAnyAuthority(ADMIN_DELETE.name(), STUDENT_DELETE.name())
                                                .anyRequest().authenticated())
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(authenticationProvider)
                                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
                return httpSecurity.build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
                configuration.setAllowCredentials(true);
                configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                configuration.setAllowedOrigins(Arrays.asList(MyConstant.REACT_URL));
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }
}
