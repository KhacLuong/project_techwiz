package com.techwiz.techwizbe.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.sql.Time;
import java.text.Normalizer;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Random;
import java.util.regex.Pattern;

public final class Helper {
    public static Sort sortQuery(String sortField, String sortDir) {
        return sortDir.equals("asc") ? Sort.by(Sort.Order.asc(sortField)) : Sort.by(Sort.Order.desc(sortField));
    }
    public static Pageable pageableQuery(int pageNumber, int perPage, String sortField, String sortDir) {
        Sort sort = Helper.sortQuery(sortField, sortDir);
        return PageRequest.of(pageNumber - 1, perPage, sort);
    }
    public static String handleRandomCode() {
        String CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        int LENGTH = 7;
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(LENGTH);
        for (int i = 0; i < LENGTH; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(randomIndex));
        }
        return sb.toString();
    }
    public static boolean isTimeWithinRange(Time time, Time startTime, Time endTime) {
        return time.compareTo(startTime) >= 0 && time.compareTo(endTime) <= 0;
    }
    public static String decode(String value) {
        return URLDecoder.decode(value, StandardCharsets.UTF_8);
    }
    public static Long[] convertStringToLongArray(String str) {
        if (str != null && !str.isEmpty()) {
            String[] strArr = Helper.decode(str).split("\\|");
            Long[] arr = new Long[strArr.length];

            for (int i = 0; i < strArr.length; i++) {
                arr[i] = Long.parseLong(strArr[i]);
            }
            return arr;
        }
        return null;
    }
    public static Time convertStringToTime(String timeString) {
        if (timeString == null || timeString.isEmpty()) {
            return null;
        }
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
            LocalTime localTime = LocalTime.parse(Helper.decode(timeString), formatter);
            return Time.valueOf(localTime);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public static Date convertStringToDate(String dateString) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.parse(dateString);
    }
    public static String handleRandomSKU() {
        final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        final int SKU_LENGTH = 8;
        Random random = new Random();
        StringBuilder sku = new StringBuilder();

        for (int i = 0; i < SKU_LENGTH; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sku.append(CHARACTERS.charAt(randomIndex));
        }

        return sku.toString();
    }
    public static String handleConvertToSlug(String text) {
        String normalizedText = Normalizer.normalize(text, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String noAccentText = pattern.matcher(normalizedText).replaceAll("");
        return noAccentText.toLowerCase().replaceAll(" ", "-");
    }

    public static String[] convertStringToStringArray(String param) {
        if (param != null && !param.isEmpty()) {
            String[] srtArray = Helper.decode(param).split("\\|");
            String[] arr = new String[srtArray.length];

            for (int i = 0; i < srtArray.length; i++) {
                arr[i] = srtArray[i];
            }
            return srtArray;
        }
        return null;
    }
}
