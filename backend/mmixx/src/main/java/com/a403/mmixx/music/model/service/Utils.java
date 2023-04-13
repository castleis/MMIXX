package com.a403.mmixx.music.model.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@Service
public class Utils {

    //  Convert MultipartFile to byte[]
    public static byte[] convertMultipartFileToByteArray(MultipartFile file) throws IOException {
        byte[] bytes = file.getBytes();
        return bytes;
    }

    //  Convert byte[] to MultipartFile
    public static MultipartFile convertByteArrayToMultipartFile
            (byte[] bytes, String originalFilename, String contentType) throws IOException {
        return new MultipartFile() {
            @Override
            public String getName() {
                return originalFilename;
            }

            @Override
            public String getOriginalFilename() {
                return originalFilename;
            }

            @Override
            public String getContentType() {
                return contentType;
            }

            @Override
            public boolean isEmpty() {
                return false;
            }

            @Override
            public long getSize() {
                return bytes.length;
            }

            @Override
            public byte[] getBytes() throws IOException {
                return bytes;
            }

            @Override
            public InputStream getInputStream() throws IOException {
                return null;
            }

            @Override
            public void transferTo(File dest) throws IOException, IllegalStateException {


            }
        };
    }

}
