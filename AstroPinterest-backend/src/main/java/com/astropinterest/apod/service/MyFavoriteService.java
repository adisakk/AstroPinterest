package com.astropinterest.apod.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.astropinterest.apod.model.MyFavorite;
import com.astropinterest.apod.repository.MyFavoriteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MyFavoriteService {
    
    @Autowired
    MyFavoriteRepository myFavoriteRepository;
    
    /**
     * Getting all MyFavorite records
     * @return
     */
    public List<MyFavorite> getAllMyFavorites() {
        List<MyFavorite> myFavorites = new ArrayList<MyFavorite>();
        myFavoriteRepository.findAll().forEach(myFavorite -> myFavorites.add(myFavorite));
        return myFavorites;
    }

    /**
     * Getting all MyFavortie records by date range
     * @param startdate
     * @param enddate
     * @return List of MyFavorites
     */
    public List<MyFavorite> getMyFavoriteByDateRange(Date startdate, Date enddate) {
        List<MyFavorite> myFavorites = new ArrayList<MyFavorite>();
        myFavoriteRepository.getAllBetweenDates(startdate, enddate)
        .forEach(myFavorite -> myFavorites.add(myFavorite));
        return myFavorites;
    }

    /**
     * Getting a specific MyFavorite record.
     * @param id
     * @return MyFavorite
     */
    public MyFavorite getMyFavoriteById(int id) {
        return myFavoriteRepository.findById(id).get();
    }

    /**
     * Save a new MyFavorite record or Update if it already exists.
     * @param myFavorite
     */
    public void saveOrUpdate(MyFavorite myFavorite) {
        myFavoriteRepository.save(myFavorite);
    }

    /**
     * Deleting a specific MyFavorite record.
     * @param id
     */
    public void delete(int id) 
    {
        myFavoriteRepository.deleteById(id);
    }
}
