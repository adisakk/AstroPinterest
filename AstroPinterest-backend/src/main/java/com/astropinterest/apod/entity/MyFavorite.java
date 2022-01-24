package com.astropinterest.apod.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Data
@Entity
@Table
public class MyFavorite {

    @Temporal(TemporalType.DATE)
    @Id
    private Date date;          // "2022-01-17"
    
    @Column
    private String concept_tag;   // "concept_tags functionality turned off in current service"

    @Column
    private String copyright;     // "Jarmo RuuthTelescope LiveHeaven's Mirror Observatory"

    @Lob
    @Column
    private String explanation;   // "Sometimes the dark dust of interstellar space has an angular elegance. Such is the case toward the far-south constellation of Chamaeleon. Normally too faint to see, dark dust is best known for blocking visible light from stars and galaxies behind it. In this four-hour exposure, however, the dust is seen mostly in light of its own, with its strong red and near-infrared colors giving creating a brown hue. Contrastingly blue, the bright star Beta Chamaeleontis is visible just to the right of center, with the dust that surrounds it preferentially reflecting blue light from its primarily blue-white color. All of the pictured stars and dust occur in our own Milky Way Galaxy with -- but one notable exception: the white spot just below Beta Chamaeleontis is the galaxy IC 3104 which lies far in the distance. Interstellar dust is mostly created in the cool atmospheres of giant stars and dispersed into space by stellar light, stellar winds, and stellar explosions such as supernovas."

    @Column
    private String hdurl;         // "https://apod.nasa.gov/apod/image/2201/DarkNebulaVd_HmoRuuth_4096.jpg"
    
    @Column
    private String media_type;    // "image"

    @Column
    private String service_version; // "v1"
    
    @Column
    private String title;         // "Chamaeleon Dark Nebulas"

    @Column
    private String url;           // "https://apod.nasa.gov/apod/image/2201/DarkNebulaVd_HmoRuuth_960.jpg"
}
