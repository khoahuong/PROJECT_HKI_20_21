package com.huongmk.probackend.common.file;

import com.huongmk.probackend.helper.ExceptionLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author HuongMK
 */
@RestController
@RequestMapping("/file")
public class FileController {
    @Autowired
    private FileService fileService;

    /**
     * upload 1 file
     *
     * @param file
     * @return
     */
    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    public FileResponse uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            return fileService.saveFile(file);
        } catch (Exception e) {
            return new FileResponse(ExceptionLog.createMessage(e), false);
        }
    }

    /**
     * upload nhiều file
     *
     * @param files
     * @return
     */
    @RequestMapping(value = "/uploadMultiFile", method = RequestMethod.POST)
    public List<FileResponse> uploadMultiFile(@RequestParam("files") MultipartFile[] files) {
        return Arrays.asList(files).stream().map(file -> uploadFile(file)).collect(Collectors.toList());
    }

    /**
     * download file
     *
     * @param fileName
     * @param request
     * @return
     */
    @RequestMapping(value = "downloadFile", method = RequestMethod.GET)
    public ResponseEntity<Resource> downloadFile(@RequestParam String fileName,
                                                 HttpServletRequest request) {
        Resource resource = fileService.downloadFile(fileName);
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (Exception e) {
            ExceptionLog.createMessage(e);
        }
        if (contentType == null) {
            contentType = "application/octet-stream";
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

}
