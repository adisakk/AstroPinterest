package com.astropinterest.apod.controller;

import java.util.Date;
import java.util.List;

import com.astropinterest.apod.model.MyFavorite;
import com.astropinterest.apod.service.MyFavoriteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyFavoriteController {
    
    @Autowired
    MyFavoriteService myFavoriteService;

    /**
     * The GET mapping that retrieves all the MyFavorite detail from the database.
     * @return List of MyFavorites
     */
    @GetMapping("/myfavorites")
    private List<MyFavorite> getAllMyFavorites() {
        return myFavoriteService.getAllMyFavorites();
    }

    @GetMapping("/myfavorites/{startdate}/{enddate}")
    private List<MyFavorite> getMyFavoritesByDateRange(
        @PathVariable("startdate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startdate, 
        @PathVariable("enddate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date enddate) {
        return myFavoriteService.getMyFavoriteByDateRange(startdate, enddate);
    }

    /**
     * The GET mapping that retrieves the detail of a specific MyFavorite
     * @param id
     * @return
     */
    @GetMapping("/myfavorite/{id}")
    private MyFavorite getMyFavorite(@PathVariable("id") int id) {
        return myFavoriteService.getMyFavoriteById(id);
    }
 
    /**
     * The DELETE mapping that deletes a specific MyFavorite
     * @param id
     */
    @DeleteMapping("/myfavorite/{id}")
    private void deleteMyFavorite(@PathVariable("id") int id) {
        myFavoriteService.delete(id);
    }
    
    /**
     * The POST mapping that save or update the MyFavorite detail in the database
     * @param myFavorite
     * @return
     */
    @PostMapping("/myfavorite")
    private int saveMyFavorite(@RequestBody MyFavorite myFavorite) {
        myFavoriteService.saveOrUpdate(myFavorite);
        return myFavorite.getId();
    }
}
