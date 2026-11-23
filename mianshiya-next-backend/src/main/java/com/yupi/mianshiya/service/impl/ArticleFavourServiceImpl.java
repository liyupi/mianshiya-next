package com.yupi.mianshiya.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.mianshiya.common.ErrorCode;
import com.yupi.mianshiya.exception.BusinessException;
import com.yupi.mianshiya.mapper.ArticleFavourMapper;
import com.yupi.mianshiya.model.entity.Article;
import com.yupi.mianshiya.model.entity.ArticleFavour;
import com.yupi.mianshiya.model.entity.User;
import com.yupi.mianshiya.model.vo.ArticleVO;
import com.yupi.mianshiya.service.ArticleFavourService;
import com.yupi.mianshiya.service.ArticleService;
import javax.annotation.Resource;
import org.springframework.aop.framework.AopContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 文章收藏服务实现
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
@Service
public class ArticleFavourServiceImpl extends ServiceImpl<ArticleFavourMapper, ArticleFavour>
        implements ArticleFavourService {

    @Resource
    private ArticleService articleService;

    /**
     * 文章收藏
     *
     * @param articleId
     * @param loginUser
     * @return
     */
    @Override
    public int doArticleFavour(long articleId, User loginUser) {
        // 判断是否存在
        Article article = articleService.getById(articleId);
        if (article == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        // 是否已收藏
        long userId = loginUser.getId();
        // 每个用户串行收藏
        // 锁必须要包裹住事务方法
        ArticleFavourService articleFavourService = (ArticleFavourService) AopContext.currentProxy();
        synchronized (String.valueOf(userId).intern()) {
            return articleFavourService.doArticleFavourInner(userId, articleId);
        }
    }

    @Override
    public Page<Article> listFavourArticleByPage(Page<Article> page, QueryWrapper<Article> queryWrapper,
                                                   long favourUserId) {
        if (favourUserId <= 0) {
            return new Page<>();
        }
        return baseMapper.listFavourArticleByPage(page, queryWrapper, favourUserId);
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
    public int doArticleFavourInner(long userId, long articleId) {
        ArticleFavour articleFavour = new ArticleFavour();
        articleFavour.setUserId(userId);
        articleFavour.setArticleId(articleId);
        QueryWrapper<ArticleFavour> favourQueryWrapper = new QueryWrapper<>(articleFavour);
        ArticleFavour oldArticleFavour = this.getOne(favourQueryWrapper);
        boolean result;
        // 已收藏
        if (oldArticleFavour != null) {
            result = this.remove(favourQueryWrapper);
            if (result) {
                // 收藏数 - 1
                result = articleService.update()
                        .eq("id", articleId)
                        .gt("favourNum", 0)
                        .setSql("favourNum = favourNum - 1")
                        .update();
                return result ? -1 : 0;
            } else {
                throw new BusinessException(ErrorCode.SYSTEM_ERROR);
            }
        } else {
            // 取消收藏
            result = this.save(articleFavour);
            if (result) {
                // 收藏数 + 1
                result = articleService.update()
                        .eq("id", articleId)
                        .setSql("favourNum = favourNum + 1")
                        .update();
                return result ? 1 : 0;
            } else {
                throw new BusinessException(ErrorCode.SYSTEM_ERROR);
            }
        }
    }
}
