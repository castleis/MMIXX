package com.a403.mmixx.music.model.service;

import com.a403.mmixx.music.model.entity.Music;

import lombok.extern.slf4j.Slf4j;

import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.mp3.Mp3Parser;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class MP3MetadataService {

    public static List<Music> extractMetadataFromMultipartFileList(List<String> filepath, List<MultipartFile> multipartFiles) throws Exception {
    	System.out.println("extractMetadataFromMultipartFileList 시작~~~~!!^^");
        List<Music> musicContainerList = new ArrayList<>();

//        for (MultipartFile multipartFile : multipartFiles) {
        for (int i = 0; i < filepath.size(); i++) {
            Music musicContainer = new Music();
            
            System.out.println("extractMetadata 시작");
        	
//            File mp3File = Files.createTempFile("temp", ".mp3").toFile();
        	Path path = Paths.get(filepath.get(i)).toAbsolutePath();
//        	multipartFile.transferTo(path.toFile());
            
        	Map<String, String> metadataMap = extractMetadata(path.toFile(), multipartFiles.get(i));
            System.out.println("extractMetadata 종료");
            
            //  if musicName is null, set musicName to its own file name
            if (metadataMap.get("musicName") == null) {
                byte[] euckrStringBuffer = multipartFiles.get(i).getOriginalFilename().getBytes(Charset.forName("euc-kr"));
                String decodedFromEucKr = new String(euckrStringBuffer, "euc-kr");
                byte[] utf8StringBuffer = decodedFromEucKr.getBytes("utf-8");
                String decodedFromUtf8 = new String(utf8StringBuffer, "utf-8");
                System.out.println("decodedFromUtf8 : " + decodedFromUtf8);
                musicContainer.setMusicName(decodedFromUtf8);
//                musicContainer.setMusicName(path.getFileName().toString());
//                musicContainer.setMusicName(multipartFile.getOriginalFilename());
            } else {
                musicContainer.setMusicName(metadataMap.get("musicName"));
            }
            musicContainer.setMusicLength((int) Math.ceil(Double.valueOf(metadataMap.get("musicLength")) * 1000));
            musicContainer.setMusicianName(metadataMap.get("musicianName"));
            musicContainer.setAlbumName(metadataMap.get("albumName"));
            musicContainerList.add(musicContainer);
        }

        //  print all metadata (filtered data check)
        for (Music music : musicContainerList) {
            System.out.println("<musicName> : " + music.getMusicName());
            System.out.println("<musicLength> : " + music.getMusicLength() + "(milliseconds)");
            System.out.println("<musicianName> : " + music.getMusicianName());
            System.out.println("<albumName> : " + music.getAlbumName());
        }

        return musicContainerList;
    }

    public static Map<String, String> extractMetadata(File file, MultipartFile multipartFile) throws Exception {
        // Convert multipart file to MP3 file
    	System.out.println("extract Metadata 시작");

        Map<String, String> metadataMap = new HashMap<>();

        // Create a Tika parser and parse the MP3 file's metadata
        BodyContentHandler handler = new BodyContentHandler();
        Metadata metadata = new Metadata();

        // File to InputStream
        InputStream stream = new FileInputStream(file);
        ParseContext parseContext = new ParseContext();
        Mp3Parser parser = new Mp3Parser();
        parser.parse(stream, handler, metadata, parseContext);
        
        stream.close();
        boolean utf = true;
        
        // Extract the metadata fields and add them to the map
        if (metadata.get("title") != null) {
        	if(utf) metadataMap.put("musicName", metadata.get("title"));
        	else metadataMap.put("musicName", euckrToUtf8(metadata.get("title")));
        } else {
            metadataMap.put("musicName", multipartFile.getOriginalFilename());
        }
        metadataMap.put("musicLength", metadata.get("xmpDM:duration"));

        if (metadata.get("xmpDM:artist") != null) {
        	if(utf) metadataMap.put("musicianName", metadata.get("xmpDM:artist"));
        	else metadataMap.put("musicianName", euckrToUtf8(metadata.get("xmpDM:artist")));
        } else {
            metadataMap.put("musicianName", "Unknown");
        }

        if (metadata.get("xmpDM:album") != null) {
        	if(utf) metadataMap.put("albumName", metadata.get("xmpDM:album"));
        	else metadataMap.put("albumName", euckrToUtf8(metadata.get("xmpDM:album")));
        } else {
            metadataMap.put("albumName", "Unknown");
        }
        
        // euckr to utf8
//        metadataMap.put("musicName", euckrToUtf8(metadata.get("title")));
//        metadataMap.put("musicLength", metadata.get("xmpDM:duration"));
//        metadataMap.put("musicianName", euckrToUtf8(metadata.get("xmpDM:artist")));
//        metadataMap.put("albumName", euckrToUtf8(metadata.get("xmpDM:album")));
        
        // utf-8 -> ?나오면 사용
//        metadataMap.put("musicName", metadata.get("title"));
//        metadataMap.put("musicLength", metadata.get("xmpDM:duration"));
//        metadataMap.put("musicianName", metadata.get("xmpDM:artist"));
//        metadataMap.put("albumName", metadata.get("xmpDM:album"));

        if (metadata.get("title") != null) {
        	
            System.out.println("*********************************************************************************");
            System.out.println("metadata.get(\"title\") - utf8 : " + metadata.get("title"));
            System.out.println("metadata.get(\"title\") - euckr to utf8 : " + euckrToUtf8(metadata.get("title")));

//            String[] charSet = {"utf-8", "euc-kr", "ksc5601", "iso-8859-1", "x-windows-949"};
//            for (int i = 0; i < charSet.length; i++) {
//                for (int j = 0; j < charSet.length; j++) {
//                    System.out.println("[" + charSet[i] + "," + charSet[j] + "]" + new String(metadata.get("title").getBytes(charSet[i]), charSet[j]));
//                }
//            }
            System.out.println("*********************************************************************************");
        }

        //  print all metadata (raw data check)
        String[] metadataNames = metadata.names();
        for (String name : metadataNames) {
            System.out.println(name + ": " + metadata.get(name));
        }

        // Delete temporary MP3 file
        // TODO: cleanup '.tmp' garbage files...
//        mp3File.delete();
        return metadataMap;
    }

    public static String euckrToUtf8(String data) {
        if (data != null) {
//    		byte[] euckrStringBuffer = data.getBytes(Charset.forName("euc-kr"));
//        	String decodedFromEucKr = new String(euckrStringBuffer, "euc-kr");
//			byte[] utf8StringBuffer = decodedFromEucKr.getBytes("utf-8");
//        	String decodedFromUtf8 = new String(utf8StringBuffer, "utf-8");
//        	System.out.println("decodedFromUtf8 : " + decodedFromUtf8);

            try {
                return new String(data.getBytes("iso-8859-1"), "euc-kr");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
                return null;
            }
        } else {
            return null;
        }
    }
}
