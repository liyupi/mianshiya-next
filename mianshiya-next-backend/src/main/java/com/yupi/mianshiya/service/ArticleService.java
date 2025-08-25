package com.yupi.mianshiya.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yupi.mianshiya.model.dto.article.ArticleQueryRequest;
import com.yupi.mianshiya.model.entity.Article;
import com.yupi.mianshiya.model.vo.ArticleVO;
import javax.servlet.http.HttpServletRequest;

/**
 * 文章服务
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
public interface ArticleService extends IService<Article> {

    /**
     * 校验
     *
     * @param article
     * @param add
     */
    void validArticle(Article article, boolean add);

    /**
     * 获取查询条件
     *
     * @param articleQueryRequest
     * @return
     */
    QueryWrapper<Article> getQueryWrapper(ArticleQueryRequest articleQueryRequest);

    /**
     * 获取文章封装
     *
     * @param article
     * @param request
     * @return
     */
    ArticleVO getArticleVO(Article article, HttpServletRequest request);

    /**
     * 分页获取文章封装
     *
     * @param articlePage
     * @param request
     * @return
     */
    Page<ArticleVO> getArticleVOPage(Page<Article> articlePage, HttpServletRequest request);

    /**
     * 增加浏览数
     *
     * @param articleId
     */
    void addViewNum(Long articleId);
}
