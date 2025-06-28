# Troubleshooting 403 Forbidden Error

## Problem
Getting 403 Forbidden error when trying to fetch movies from backend at `http://localhost:8080/api/program`

## Possible Solutions

### 1. Check if Backend Server is Running
Make sure your backend server is running on port 8080:
```bash
# Check if something is running on port 8080
netstat -an | findstr :8080
# or
lsof -i :8080
```

### 2. CORS Issues
The backend might not be configured to allow requests from your frontend. Check if your backend has CORS configured:

**Spring Boot Example:**
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### 3. Authentication Required
The endpoint might require authentication. Check if you need to:
- Login first to get an access token
- Include the token in the Authorization header
- The token is automatically added if stored in localStorage/sessionStorage

### 4. Wrong Endpoint
Verify the correct endpoint URL. Try these alternatives:
- `http://localhost:8080/api/movies`
- `http://localhost:8080/movies`
- `http://localhost:8080/api/program/movies`

### 5. Backend Security Configuration
Check if your backend has security configured that blocks the endpoint:

**Spring Security Example:**
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/program/**").permitAll() // Allow access to program endpoints
                .anyRequest().authenticated()
            )
            .csrf(csrf -> csrf.disable());
        return http.build();
    }
}
```

### 6. Test Connection
The app now includes a connection test that will show if the backend is reachable. Look for the "Backend Status" message in the UI.

### 7. Check Backend Logs
Look at your backend server logs to see what's causing the 403 error. Common causes:
- Missing authentication
- Wrong permissions
- CORS issues
- Security filters blocking the request

### 8. Manual Testing
Test the endpoint manually using curl or Postman:
```bash
curl -X GET http://localhost:8080/api/program
```

## Current Implementation
The frontend now includes:
- Better error handling
- Automatic token inclusion in requests
- Connection testing
- Loading states
- User-friendly error messages

If the problem persists, check the browser's Network tab in Developer Tools to see the exact request being made and the response from the server. 