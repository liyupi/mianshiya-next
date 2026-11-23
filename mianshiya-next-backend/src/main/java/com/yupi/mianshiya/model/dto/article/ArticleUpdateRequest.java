package com.yupi.mianshiya.model.dto.article;

import java.io.Serializable;
import java.util.List;
import lombok.Data;

/**
 * 更新文章请求
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
@Data
public class ArticleUpdateRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 文章标题
     */
    private String title;

    /**
     * 文章内容
     */
    private String content;

    /**
     * 文章摘要
     */
    private String summary;

    /**
     * 封面图片
     */
    private String cover;

    /**
     * 标签列表
     */
    private List<String> tags;

    /**
     * 文章分类
     */
    private String category;

    /**
     * 状态（0-草稿、1-已发布、2-已下线）
     */
    private Integer status;

    private static final long serialVersionUID = 1L;
}
