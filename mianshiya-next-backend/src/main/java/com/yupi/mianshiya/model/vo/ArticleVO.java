package com.yupi.mianshiya.model.vo;

import cn.hutool.json.JSONUtil;
import com.yupi.mianshiya.model.entity.Article;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import lombok.Data;
import org.springframework.beans.BeanUtils;

/**
 * 文章视图
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
@Data
public class ArticleVO implements Serializable {

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
    private List<String> tagList;

    /**
     * 文章分类
     */
    private String category;

    /**
     * 状态（0-草稿、1-已发布、2-已下线）
     */
    private Integer status;

    /**
     * 浏览数
     */
    private Integer viewNum;

    /**
     * 点赞数
     */
    private Integer thumbNum;

    /**
     * 收藏数
     */
    private Integer favourNum;

    /**
     * 创建用户 id
     */
    private Long userId;

    /**
     * 编辑时间
     */
    private Date editTime;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 创建人信息
     */
    private UserVO user;

    /**
     * 是否已点赞
     */
    private Boolean hasThumb;

    /**
     * 是否已收藏
     */
    private Boolean hasFavour;

    /**
     * 包装类转对象
     *
     * @param articleVO
     * @return
     */
    public static Article voToObj(ArticleVO articleVO) {
        if (articleVO == null) {
            return null;
        }
        Article article = new Article();
        BeanUtils.copyProperties(articleVO, article);
        List<String> tagList = articleVO.getTagList();
        if (tagList != null) {
            article.setTags(JSONUtil.toJsonStr(tagList));
        }
        return article;
    }

    /**
     * 对象转包装类
     *
     * @param article
     * @return
     */
    public static ArticleVO objToVo(Article article) {
        if (article == null) {
            return null;
        }
        ArticleVO articleVO = new ArticleVO();
        BeanUtils.copyProperties(article, articleVO);
        String tags = article.getTags();
        if (tags != null) {
            articleVO.setTagList(JSONUtil.toList(JSONUtil.parseArray(tags), String.class));
        }
        return articleVO;
    }

    private static final long serialVersionUID = 1L;
}
