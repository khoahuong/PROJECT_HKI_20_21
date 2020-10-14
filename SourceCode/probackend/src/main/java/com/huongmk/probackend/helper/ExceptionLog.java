package com.huongmk.probackend.helper;

import org.slf4j.LoggerFactory;

import java.util.logging.Logger;

/**
 * @author HuongMk
 */
public class ExceptionLog {
    public static final Logger logger = (Logger) LoggerFactory.getLogger(ExceptionLog.class);

    public static final String NOT_FOUND = "Not found!";

    public static final String ERRORS = "Có lỗi mới phát sinh. Vui lòng thử lại sau.";

    public static String createMessage(Exception e) {
        StringBuilder stringBuilder = new StringBuilder(e.toString());
        String errorMess = stringBuilder.toString();
        StringBuilder message = new StringBuilder();

        if (errorMess.contains(NOT_FOUND)) {
            message.append(NOT_FOUND);
        } else {
            message.append(ERRORS);
        }
        return message.toString();
    }
}
