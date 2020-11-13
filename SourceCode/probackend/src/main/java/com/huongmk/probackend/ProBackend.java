package com.huongmk.probackend;

import com.huongmk.probackend.common.file.FileProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.core.env.AbstractEnvironment;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.WebApplicationInitializer;

/**
 * @author HuongMK
 * @version 1.0
 * @since 2020/10/06
 */
@SpringBootApplication
@EnableCaching
@EnableScheduling
@EnableConfigurationProperties({
        FileProperties.class
})
public class ProBackend extends SpringBootServletInitializer implements WebApplicationInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(ProBackend.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(ProBackend.class, args);
        System.out.println(" ");
        System.out.println("  ||||||   ||    ||  |||    ||  |||    ||  ||  |||    ||    ||||||    \\\\ ");
        System.out.println("  ||   ||  ||    ||  ||||   ||  ||||   ||  ||  ||||   ||   ||          \\\\");
        System.out.println("  ||||||   ||    ||  ||  || ||  ||  || ||  ||  ||  || ||  ||   ====   =====>>>>>>>");
        System.out.println("  ||  ||   ||    ||  ||   ||||  ||   ||||  ||  ||   ||||   ||   ||     //");
        System.out.println("  ||   ||    ||||    ||    |||  ||    |||  ||  ||    |||    ||||||    //  -----(HuongMK)----- ");
        System.out.println(" ");
        System.out.println("ProBackend is running: Profile: " + AbstractEnvironment.ACTIVE_PROFILES_PROPERTY_NAME);
    }
}
