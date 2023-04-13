package com.a403.mmixx.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.AlternateTypeRules;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
        		.alternateTypeRules(AlternateTypeRules.newRule(Pageable.class, Page.class))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.a403.mmixx"))
                .paths(PathSelectors.any())
                .build();
    }
    
    @Getter 
    @Setter
    @ApiModel
    static class Page {
    	@ApiModelProperty(value = "페이지 번호")
    	private Integer page;
    	
    	@ApiModelProperty(value = "페이지 크기")
    	private Integer size;
    	
    	@ApiModelProperty(value = "정렬")
    	private List<String> sort;
    }

}//SwaggerConfig
