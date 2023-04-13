package com.a403.mmixx.music.model.service;

import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.tag.TagException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.jaudiotagger.audio.AudioFileIO;
import org.apache.commons.io.IOUtils;
import org.jaudiotagger.audio.AudioFile;
import org.jaudiotagger.tag.FieldKey;
import org.jaudiotagger.tag.Tag;
import org.jaudiotagger.tag.datatype.Artwork;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;

@Service
public class MP3AlbumArtworkService {

    public static byte[] extractAlbumArtwork(File file) throws IOException, CannotReadException, TagException, InvalidAudioFrameException, ReadOnlyFileException {
        // Convert multipart file to MP3 file
//    	System.out.println("extract Album Art file size : " + file.getSize());
//    	System.out.println("extract Album Art file name : " + file.getName());
    	
        

        // Extract album artwork from MP3 file using JAudioTagger library
        AudioFile audioFile = AudioFileIO.read(file);
        Tag tag = audioFile.getTag();

        // If tag is null, the default album artwork will be used
        if (tag == null) {
            return getDefaultAlbumArtwork();
        }

        Artwork artwork = tag.getFirstArtwork();
        byte[] artworkData = artwork != null ? artwork.getBinaryData() : null;

        // Delete temporary MP3 file
//        mp3File.delete();

        // if byte[] artworkData is empty, the default album artwork will be used
        if (artworkData == null) {
            artworkData = getDefaultAlbumArtwork();
        }

        return artworkData;
    }

    private static byte[] getDefaultAlbumArtwork() throws IOException {
        ClassLoader classLoader = MP3AlbumArtworkService.class.getClassLoader();
        InputStream inputStream = classLoader.getResourceAsStream("static/default_cover.jpg");
        byte[] bytes = IOUtils.toByteArray(inputStream);
        inputStream.close();
        return bytes;
    }
}
