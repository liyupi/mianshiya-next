package com.yupi.mianshiya.model.dto.article;

import java.io.Serializable;
import lombok.Data;

/**
 * 文章收藏请求
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
@Data
public class ArticleFavourAddRequest implements Serializable {

    /**
     * 文章 id
     */
    private Long articleId;

    private static final long serialVersionUID = 1L;
}
