package com.yupi.mianshiya.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yupi.mianshiya.model.entity.Article;
import com.yupi.mianshiya.model.entity.ArticleFavour;
import com.yupi.mianshiya.model.vo.ArticleVO;
import org.apache.ibatis.annotations.Param;

/**
 * 文章收藏数据库操作
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
public interface ArticleFavourMapper extends BaseMapper<ArticleFavour> {

    /**
     * 分页查询收藏文章列表
     *
     * @param page
     * @param queryWrapper
     * @param favourUserId
     * @return
     */
    Page<Article> listFavourArticleByPage(Page<Article> page, @Param("ew") Wrapper<Article> queryWrapper,
                                            long favourUserId);

}
