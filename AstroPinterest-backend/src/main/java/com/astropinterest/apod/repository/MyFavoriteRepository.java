package com.astropinterest.apod.repository;

import java.util.Date;
import java.util.List;

import com.astropinterest.apod.model.MyFavorite;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface MyFavoriteRepository extends CrudRepository<MyFavorite, Integer> {
    @Query(value = "from MyFavorite m where m.date BETWEEN :startdate AND :enddate")
    public List<MyFavorite> getAllBetweenDates(
        @Param("startdate")Date startdate,@Param("enddate")Date enddate);
}