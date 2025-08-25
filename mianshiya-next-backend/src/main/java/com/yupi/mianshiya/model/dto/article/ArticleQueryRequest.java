package com.yupi.mianshiya.model.dto.article;

import com.yupi.mianshiya.common.PageRequest;
import java.io.Serializable;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 查询文章请求
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class ArticleQueryRequest extends PageRequest implements Serializable {

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
     * 搜索词
     */
    private String searchText;

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

    /**
     * 创建用户 id
     */
    private Long userId;

    /**
     * 是否查看未公开（只有作者和管理员能看）
     */
    private Boolean notPublic;

    private static final long serialVersionUID = 1L;
}
