package lk.ijse.dep.spring.last.main;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@ComponentScan("lk.ijse.dep.spring.last")
@Configuration
public class WebAppConfig {
}
