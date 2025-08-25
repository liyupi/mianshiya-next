package com.yupi.mianshiya.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yupi.mianshiya.model.entity.Article;
import java.util.Date;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * 文章数据库操作
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
public interface ArticleMapper extends BaseMapper<Article> {

    /**
     * 查询文章列表（包括已被删除的数据）
     */
    @Select("select * from article where updateTime >= #{minUpdateTime}")
    List<Article> listArticleWithDelete(@Param("minUpdateTime") Date minUpdateTime);

}
