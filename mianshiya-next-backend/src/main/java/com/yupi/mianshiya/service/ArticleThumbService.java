package com.yupi.mianshiya.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yupi.mianshiya.model.entity.ArticleThumb;
import com.yupi.mianshiya.model.entity.User;

/**
 * 文章点赞服务
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
public interface ArticleThumbService extends IService<ArticleThumb> {

    /**
     * 点赞
     *
     * @param articleId
     * @param loginUser
     * @return
     */
    int doArticleThumb(long articleId, User loginUser);

    /**
     * 文章点赞（内部服务）
     *
     * @param userId
     * @param articleId
     * @return
     */
    int doArticleThumbInner(long userId, long articleId);
}
