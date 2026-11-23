package com.yupi.mianshiya.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.mianshiya.common.ErrorCode;
import com.yupi.mianshiya.exception.BusinessException;
import com.yupi.mianshiya.mapper.ArticleThumbMapper;
import com.yupi.mianshiya.model.entity.Article;
import com.yupi.mianshiya.model.entity.ArticleThumb;
import com.yupi.mianshiya.model.entity.User;
import com.yupi.mianshiya.service.ArticleService;
import com.yupi.mianshiya.service.ArticleThumbService;
import javax.annotation.Resource;
import org.springframework.aop.framework.AopContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 文章点赞服务实现
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
@Service
public class ArticleThumbServiceImpl extends ServiceImpl<ArticleThumbMapper, ArticleThumb>
        implements ArticleThumbService {

    @Resource
    private ArticleService articleService;

    /**
     * 点赞
     *
     * @param articleId
     * @param loginUser
     * @return
     */
    @Override
    public int doArticleThumb(long articleId, User loginUser) {
        // 判断实体是否存在，根据类别获取实体
        Article article = articleService.getById(articleId);
        if (article == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        // 是否已点赞
        long userId = loginUser.getId();
        // 每个用户串行点赞
        // 锁必须要包裹住事务方法
        ArticleThumbService articleThumbService = (ArticleThumbService) AopContext.currentProxy();
        synchronized (String.valueOf(userId).intern()) {
            return articleThumbService.doArticleThumbInner(userId, articleId);
        }
    }

    /**
     * 封装了事务的方法
     *
     * @param userId
     * @param articleId
     * @return
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int doArticleThumbInner(long userId, long articleId) {
        ArticleThumb articleThumb = new ArticleThumb();
        articleThumb.setUserId(userId);
        articleThumb.setArticleId(articleId);
        QueryWrapper<ArticleThumb> thumbQueryWrapper = new QueryWrapper<>(articleThumb);
        ArticleThumb oldArticleThumb = this.getOne(thumbQueryWrapper);
        boolean result;
        // 已点赞
        if (oldArticleThumb != null) {
            result = this.remove(thumbQueryWrapper);
            if (result) {
                // 点赞数 - 1
                result = articleService.update()
                        .eq("id", articleId)
                        .gt("thumbNum", 0)
                        .setSql("thumbNum = thumbNum - 1")
                        .update();
                return result ? -1 : 0;
            } else {
                throw new BusinessException(ErrorCode.SYSTEM_ERROR);
            }
        } else {
            // 未点赞
            result = this.save(articleThumb);
            if (result) {
                // 点赞数 + 1
                result = articleService.update()
                        .eq("id", articleId)
                        .setSql("thumbNum = thumbNum + 1")
                        .update();
                return result ? 1 : 0;
            } else {
                throw new BusinessException(ErrorCode.SYSTEM_ERROR);
            }
        }
    }
}
