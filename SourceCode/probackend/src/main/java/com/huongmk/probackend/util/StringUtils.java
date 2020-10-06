package com.huongmk.probackend.util;

import java.util.Calendar;

/**
 * @author HuongMK
 */
public class StringUtils {
    public static boolean isNullOrEmpty(String str){
        if(str !=null && !"".equals(str.trim()))
            return false;
        return true;
    }

    /**
     * auto gen code for regis
     *
     * @param id
     * @return
     */
    public static String getAutoRegisCode(Long id) {
        Integer year = Calendar.getInstance().get(Calendar.YEAR);
        if (id.longValue() >= 1000000L) {
            id = Long.valueOf(id.longValue() - 1000000L + 1L);
        }
        String autoNumber = String.format("%s%d%06d", "HS", year, id);
        return autoNumber;
    }
}
