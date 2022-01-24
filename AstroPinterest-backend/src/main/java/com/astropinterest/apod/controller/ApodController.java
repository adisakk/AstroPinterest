package com.astropinterest.apod.controller;

import com.astropinterest.apod.AstroPinterestRestApplication;
import com.astropinterest.apod.model.Apod;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "*")
@RestController
public class ApodController {

	private static final Logger log = LoggerFactory.getLogger(AstroPinterestRestApplication.class);
	private static final String apodUrl = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
	//private static final String apodUrl = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=2017-07-08&end_date=2017-07-10";

	@Autowired
	private RestTemplate restTemplate;

	/**
	 * Get the APOD from NASA by giving an empty string, 
	 * or you can get the previous APOD by a specific date.
	 * @param date A string of date of image.
	 * @return Apod.
	 */
	private Apod getNasaApodByDate(String date){
		ResponseEntity<Apod> response = restTemplate.getForEntity(apodUrl+date, Apod.class);
		Apod apod = response.getBody();
		log.debug(apod.toString());
		return apod;
	}
	/**
	 * Get APOD from NASA
	 * @return The APOD of current date.
	 */
	@GetMapping("/get-apod")
	public Apod getApod(){
		return getNasaApodByDate("");
	}

	/**
	 * Get an APOD of the given date.
	 * @param date A string of date of image.
	 * @return Apod.
	 */
	@GetMapping("/get-apod-bydate")
	public Apod getApodByDate(String date){
		return getNasaApodByDate("&date="+date);
	}

	/**
	 * Call NASA API by using apodUrl with the given parameters.
	 * @param params date, date range, count.
	 * @return Apod[], an array of Apod.
	 */
	private Apod[] searchNasaApods(String params){
		ResponseEntity<Apod[]> response = restTemplate.getForEntity(apodUrl+params, Apod[].class);
		Apod[] apods = response.getBody();
		log.debug(apods.toString());
		return apods;
	}

	/**
	 * Search All APOD in the range from start_date to end_date
	 * @param startdate A string in YYYY-MM-DD format indicating the start of a date range.
	 * @param enddate A string in YYYY-MM-DD format indicating the end of a date range.
	 * @return Apod[], All APODs in the given range.
	 */
	@GetMapping("/get-apod-bydate-range")
	public Apod[] getApodByDateRange(String startdate, String enddate){
		return searchNasaApods("&start_date="+startdate+"&end_date="+enddate);
	}

	/**
	 * Allow NASA API to pick the random APOD for the amount of a given number.
	 * @param count A positive integer, no greater than 100.
	 * @return Apod[], The randomly chosen APOds.
	 */
	@GetMapping("/get-random-apod")
	public Apod[] getRandomApod(int count){
		return searchNasaApods("&count="+count);
	}
}