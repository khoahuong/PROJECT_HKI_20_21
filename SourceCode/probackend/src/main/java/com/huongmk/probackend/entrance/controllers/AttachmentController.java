package com.huongmk.probackend.entrance.controllers;

import com.huongmk.probackend.entrance.models.TableRegisAttachmentsDomain;
import com.huongmk.probackend.entrance.services.RegisAttachmentsService;
import com.huongmk.probackend.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLConnection;

/**
 * @author HuongMK
 */
@RestController
@RequestMapping("/attachments")
public class AttachmentController {

    @Autowired
    private RegisAttachmentsService regisAttachmentsService;

    @Autowired
    private Environment environment;

    /**
     * hàm thực hiện download file với id tệp đính kèm
     *
     * @param response
     * @param idDinhkem
     * @throws IOException
     */
    @RequestMapping(value = "/downloadFile/{idDinhkem}", method = RequestMethod.GET)
    public void downloadFile(HttpServletResponse response,
                             @PathVariable Long idDinhkem) throws IOException {
        TableRegisAttachmentsDomain dinhkem = regisAttachmentsService.getDataDinhkem(idDinhkem);
        if (dinhkem != null && dinhkem.getFileUrl() != "") {
            //get folder root chua file
            String folderFiles = environment.getRequiredProperty(Constants.FOLDER_FILE.folderFile);
            File file = new File(folderFiles + "/" + dinhkem.getFileUrl()); // doc file

            // set response download file
            String mineType = URLConnection.guessContentTypeFromName(file.getName());
            if (mineType == null) {
                mineType = "application/octet-stream";
            }
            response.setContentType(mineType);
            response.setHeader("Content-Disposition", String.format("inline; filename=\"" + dinhkem.getFileName() + "\""));
            response.setContentLength((int) file.length());
            InputStream inputStream = new BufferedInputStream(new FileInputStream(file));
            FileCopyUtils.copy(inputStream, response.getOutputStream());
        }
    }
}
