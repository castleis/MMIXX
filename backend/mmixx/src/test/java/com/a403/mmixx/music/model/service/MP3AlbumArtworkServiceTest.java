package com.a403.mmixx.music.model.service;

import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.tag.TagException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class MP3AlbumArtworkServiceTest {

//    @Autowired
//    private MP3AlbumArtworkService mp3AlbumArtworkService;

    @Test
    public void testExtractAlbumArtworkWithArtwork() throws IOException, CannotReadException, TagException, InvalidAudioFrameException, ReadOnlyFileException {
        Path path = Paths.get("src/main/resources/static/typical-trap-loop-2b-130751.mp3");
        String filename = "typical-trap-loop-2b-130751.mp3";
        String contentType = "audio/mpeg";
        byte[] content = Files.readAllBytes(path);
        MockMultipartFile file = new MockMultipartFile(filename, filename, contentType, content);

        byte[] artworkData = MP3AlbumArtworkService.extractAlbumArtwork(path.toFile());
        System.out.println(artworkData);

        assertNotNull(artworkData);
        assertTrue(artworkData.length > 0);
    }

    @Test
    public void testExtractAlbumArtworkWithoutArtwork() throws IOException, CannotReadException, TagException, InvalidAudioFrameException, ReadOnlyFileException {
        Path path = Paths.get("src/main/resources/static/horror-hit-logo-142395.mp3");
        String filename = "horror-hit-logo-142395.mp3";
        String contentType = "audio/mpeg";
        byte[] content = Files.readAllBytes(path);
        MockMultipartFile file = new MockMultipartFile(filename, filename, contentType, content);

        byte[] artworkData = MP3AlbumArtworkService.extractAlbumArtwork(path.toFile());

        assertNotNull(artworkData);
        assertTrue(artworkData.length > 0);
    }

//    @Test
//    public void testExtractAlbumArtworkWithInvalidFile() throws IOException {
//        Path path = Paths.get("src/test/resources/static/sample_invalid_file.mp3");
//        String filename = "sample_invalid_file.mp3";
//        String contentType = "audio/mpeg";
//        byte[] content = Files.readAllBytes(path);
//        MockMultipartFile file = new MockMultipartFile(filename, filename, contentType, content);
//
//        assertThrows(IOException.class, () -> mp3AlbumArtworkService.extractAlbumArtwork(file));
//    }
//
//    @Test
//    public void testExtractAlbumArtworkWithNoFile() throws IOException {
//        MockMultipartFile file = new MockMultipartFile("file", new byte[0]);
//
//        assertThrows(IOException.class, () -> mp3AlbumArtworkService.extractAlbumArtwork(file));
//    }
}
