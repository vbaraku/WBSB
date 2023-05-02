package com.example.wbsb.Security;

//import com.example.demo.DRUser.DRUserService;
import com.example.wbsb.Security.JWT.JwtTokenVerifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{

    @Override
    protected void configure(HttpSecurity http) throws Exception {


        http.cors().and().csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .anyRequest().permitAll()
                .and()
                .addFilterBefore(new JwtTokenVerifier(), BasicAuthenticationFilter.class);
    }

//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.authenticationProvider(daoAuthenticationProvider());
//    }
//    @Bean
//    public DaoAuthenticationProvider daoAuthenticationProvider(){
//        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//        provider.setPasswordEncoder(bCryptPasswordEncoder);
//        provider.setUserDetailsService(drUserService);
//        return provider;
//    }
//
//    class HTTPStatusHandler
//            implements AuthenticationFailureHandler, AuthenticationSuccessHandler, LogoutSuccessHandler {
//
//        private HttpStatus status;
//
//        public HTTPStatusHandler(HttpStatus status) {
//            this.status = status;
//        }
//
//        @Override
//        public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
//                                            AuthenticationException exception) throws IOException, ServletException {
//            onAuthenticationSuccess(request, response, null);
//        }
//
//        @Override
//        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
//                                            Authentication authentication) throws IOException, ServletException {
//            response.setStatus(status.value());
//        }
//
//        @Override
//        public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response,
//                                    Authentication authentication) throws IOException, ServletException {
//            onAuthenticationSuccess(request, response, null);
//        }

//    }
}