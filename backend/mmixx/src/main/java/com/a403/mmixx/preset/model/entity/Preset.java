package com.a403.mmixx.preset.model.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@DynamicInsert
public class Preset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer presetSeq;
    @Column(length = 100, nullable = false)
    private String presetName;
    @Column(length = 100)
    private String musicName;
    @Column()
    private int musicLength;
    @Column(length = 100)
    private String musicianName;
    @Column(length = 100)
    private String albumName;
    @Column(length = 500, nullable = false)
    private String presetUrl;
    @Column(length = 500, nullable = false)
    private String coverImage;
}
