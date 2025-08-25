package com.yupi.mianshiya.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yupi.mianshiya.model.dto.article.ArticleQueryRequest;
import com.yupi.mianshiya.model.entity.Article;
import com.yupi.mianshiya.model.entity.ArticleFavour;
import com.yupi.mianshiya.model.entity.User;
import com.yupi.mianshiya.model.vo.ArticleVO;
import javax.servlet.http.HttpServletRequest;

/**
 * 文章收藏服务
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
public interface ArticleFavourService extends IService<ArticleFavour> {

    /**
     * 文章收藏
     *
     * @param articleId
     * @param loginUser
     * @return
     */
    int doArticleFavour(long articleId, User loginUser);

    /**
     * 分页获取用户收藏的文章列表
     *
     * @param page
     * @param queryWrapper
     * @param favourUserId
     * @return
     */
    Page<Article> listFavourArticleByPage(Page<Article> page, QueryWrapper<Article> queryWrapper,
                                            long favourUserId);

    /**
     * 文章收藏（内部服务）
     *
     * @param userId
     * @param articleId
     * @return
     */
    int doArticleFavourInner(long userId, long articleId);
}
