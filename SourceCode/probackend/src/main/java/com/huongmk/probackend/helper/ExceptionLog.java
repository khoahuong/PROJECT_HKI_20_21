package com.huongmk.probackend.helper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * @author HuongMk
 */
public class ExceptionLog {
    public static final Logger logger = LoggerFactory.getLogger(ExceptionLog.class);

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
        // ghi log ra file log
        LogUtil logUtil = new LogUtil();
        logUtil.className = Thread.currentThread().getStackTrace()[2].getClassName();
        logUtil.methodName = Thread.currentThread().getStackTrace()[2].getMethodName();
        logUtil.lineOfCode = Thread.currentThread().getStackTrace()[2].getLineNumber();
        logger.error(e.toString());
        logger.error("ERROR|| Class name: " + logUtil.className + ", method name: " + logUtil.methodName + ", line code: " + logUtil.lineOfCode);

        return message.toString();
    }
}
