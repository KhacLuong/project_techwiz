package com.techwiz.techwizbe.services.interfaces;

public interface IEmailService {
    void sendSimpleMessage(String to, String subject, String text);
}
