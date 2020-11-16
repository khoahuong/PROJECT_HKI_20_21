package com.huongmk.probackend.common.file;

import com.huongmk.probackend.helper.ExceptionLog;
import com.huongmk.probackend.util.Constants;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author HuongMK
 */
@Service
public class FileServiceImpl implements FileService {

    public static final Logger logger = LoggerFactory.getLogger(FileServiceImpl.class);

    private final Path fileFolderLocation;

    @Autowired
    public FileServiceImpl(FileProperties fileProperties) {
        this.fileFolderLocation = Paths.get(fileProperties.getUploadDir()).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileFolderLocation);
        } catch (Exception e) {
            ExceptionLog.createMessage(e);
        }
    }

    @Override
    public FileResponse saveFile(MultipartFile file) {
        // tao folder luu tru file
        Date date = Calendar.getInstance().getTime();
        DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        String strDate = dateFormat.format(date);

        File directory = new File(this.fileFolderLocation + "/" + strDate);
        if (!directory.exists()) {
            directory.mkdirs(); // tao thu muc neu chua co
        }

        UUID uuid = UUID.randomUUID();
        String fileName = file.getOriginalFilename();
        String fileExtension = FilenameUtils.getExtension(fileName);
        String fileCode = uuid + "." + fileExtension;
        Long fileSize = file.getSize();
        try {
            // Check if the file's name contains invalid characters
            if (fileCode.contains("..")) {
                logger.error("Sorry! Filename contains invalid path sequence " + fileCode);
                return new FileResponse("Sorry! Filename contains invalid path sequence " + fileCode, false);
            }
            String[] arr = {"jpg", "JPG", "jpeg", "JPEG", "png", "PNG", "pdf", "PDF"};
            List<String> lstExtension = Arrays.asList(arr);
            if (!lstExtension.contains(fileExtension)) {
                return new FileResponse("Tệp tải lên phải là tệp thuộc các định dạng sau: .jpg, .JPG, .jpeg, .JPEG, .png, .PNG, .pdf, .PDF", false);
            }
            if (fileName.length() > 250) {
                return new FileResponse("Tên tệp đính kèm không được quá 250 kí tự", false);
            }
            String[] charSpecial = {
                    "á", "à", "ả", "ã", "ạ", "ă", "ắ", "ằ", "ẳ", "ẵ", "ặ", "â", "ấ", "ầ", "ẩ", "ẫ", "ậ",
                    "Á", "À", "Ả", "Ã", "Ạ", "Ă", "Ắ", "Ằ", "Ẳ", "Ẵ", "Ặ", "Â", "Ấ", "Ầ", "Ẩ", "Ẫ", "Ậ",
                    "đ", "Đ",
                    "é", "è", "ẻ", "ẽ", "ẹ", "ê", "ế", "ề", "ể", "ễ", "ệ",
                    "É", "È", "Ẻ", "Ẽ", "Ẹ", "Ê", "Ế", "Ề", "Ể", "Ễ", "Ệ",
                    "í", "ì", "ỉ", "ĩ", "ị",
                    "Í", "Ì", "Ỉ", "Ĩ", "Ị",
                    "ó", "ò", "ỏ", "õ", "ọ", "ơ", "ớ", "ờ", "ở", "ỡ", "ợ", "ô", "ố", "ồ", "ổ", "ỗ", "ộ",
                    "Ó", "Ò", "Ỏ", "Õ", "Ọ", "Ơ", "Ớ", "Ờ", "Ở", "Ỡ", "Ợ", "Ô", "Ố", "Ồ", "Ổ", "Ỗ", "Ộ",
                    "ú", "ù", "ủ", "ũ", "ụ", "ư", "ứ", "ừ", "ử", "ữ", "ự",
                    "Ú", "Ù", "Ủ", "Ũ", "Ụ", "Ư", "Ứ", "Ừ", "Ử", "Ữ", "Ự",
                    "ý", "ỳ", "ỷ", "ỹ", "ỵ",
                    "Ý", "Ỳ", "Ỷ", "Ỹ", "Ỵ",
                    "/", "~", "`", "!", "#", "$", "%", "^", "&",
                    "*", "+", "=", "[", "]", "'", ";", "{", "}", "|", "\"", ":", "<", ">", "?"
            };
            // check ki tự đặc biệt của tên file
            if (fileName != null && !"".equals(fileName)) {
                for (int i = 0; i < charSpecial.length; i++) {
                    if (fileName.contains(charSpecial[i])) {
                        return new FileResponse("Tên tệp tải lên không được chứa kí tự tiếng việt có " +
                                "dấu hoặc có chứa các kí tự sau /~`!#$%^&*+=[]';{}|:<>?", false);
                    }
                }
            }
            // check dung luong file tai len
            if (fileSize > (1024 * 1024 * 5)) {
                return new FileResponse("Dung lượng tệp tải lên không vượt quá 5(MB)", false);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            String filePath = strDate + "/" + fileCode;
            Path targetLocation = this.fileFolderLocation.resolve(filePath);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return new FileResponse(fileName, fileCode, filePath, file.getContentType(), fileSize,
                    Constants.INFO.SUCCESS_FILE, true);
        } catch (IOException e) {
            logger.error(e.toString());
            return new FileResponse("Could not store file " + fileCode + ". Please try again!", false);
        }
    }

    @Override
    public Resource downloadFile(String filePath) {
        try {
            Path fileurl = this.fileFolderLocation.resolve(filePath).normalize();
            Resource resource = new UrlResource(fileurl.toUri());
            if (resource.exists()) {
                return resource;
            }
        } catch (MalformedURLException e) {
            ExceptionLog.createMessage(e);
        }
        return null;
    }
}
