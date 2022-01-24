package com.astropinterest.apod;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class AstroPinterestRestApplication {

	//TODO Implement logger
	//private static final Logger log = LoggerFactory.getLogger(AstroPinterestRestApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(AstroPinterestRestApplication.class, args);
	}

	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder.build();
	}

	@Bean
	public CommandLineRunner run(RestTemplate restTemplate) throws Exception {
		return args -> {
			//TODO Implement the data preparation for APOD.
			// Apod quote = restTemplate.getForObject(
			// 		"https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", Apod.class);
			// log.info(quote.toString());
		};
	}
}
