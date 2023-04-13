package com.a403.mmixx.music.model.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.io.File;
import java.nio.file.Files;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

public class MP3MetadataServiceTest {

    @Test
    public void testExtractMetadata() throws Exception {
        // Given
        File mp3File = new File("src/main/resources/static/typical-trap-loop-2b-130751.mp3");
        byte[] mp3Bytes = Files.readAllBytes(mp3File.toPath());
        MultipartFile multipartFile = new MockMultipartFile("typical-trap-loop-2b-130751.mp3", mp3Bytes);

        // When
//        MP3MetadataService service = new MP3MetadataService();
        Map<String, String> metadataMap = MP3MetadataService.extractMetadata(mp3File, multipartFile);

        // Then
        assertNotNull(metadataMap);
        System.out.println(metadataMap);
    }
}
