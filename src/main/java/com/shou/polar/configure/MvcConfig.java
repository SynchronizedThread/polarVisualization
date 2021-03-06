package com.shou.polar.configure;

import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.*;
import org.springframework.http.converter.json.GsonHttpMessageConverter;
import org.springframework.web.servlet.config.annotation.*;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.List;

@Configuration
@EnableWebMvc
@ComponentScan
public class MvcConfig implements WebMvcConfigurer {
    private static final String CHARSET_UTF_8 = "UTF-8";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") //设置允许跨域的路径
                .allowedOrigins("*") //设置允许跨域请求的域名
                .allowCredentials(true) //是否允许证书 不再默认开启
                .allowedMethods("GET", "POST", "PUT", "DELETE") //设置允许的方法
                .maxAge(3600); //跨域允许时间
    }

    @Bean
    public HttpMessageConverter<String> charsetConverter(){
        return new StringHttpMessageConverter(Charset.forName(CHARSET_UTF_8)); // 设置传给前端的编码格式
    }

    @Bean
    public HttpMessageConverter<?> gsonConverter(){
        return new GsonHttpMessageConverter();
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(charsetConverter());
        converters.add(gsonConverter());
    }
}
