package com.huongmk.probackend.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author HuongMK
 */
public class DateTimeUtils {
    public static Date convertStringToDate(String str, String pattern) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
        return dateFormat.parse(str);
    }

    public static Date convertStringToDate(String date) throws ParseException {
        if ((date == null) || ("".equals(date))) {
            return null;
        }
        String pattern = "dd/MM/yyyy";
        return convertStringToDate(date, pattern);
    }
}
