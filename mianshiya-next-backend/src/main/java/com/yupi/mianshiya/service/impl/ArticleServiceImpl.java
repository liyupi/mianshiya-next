package com.yupi.mianshiya.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.mianshiya.common.ErrorCode;
import com.yupi.mianshiya.constant.CommonConstant;
import com.yupi.mianshiya.exception.BusinessException;
import com.yupi.mianshiya.exception.ThrowUtils;
import com.yupi.mianshiya.mapper.ArticleFavourMapper;
import com.yupi.mianshiya.mapper.ArticleMapper;
import com.yupi.mianshiya.mapper.ArticleThumbMapper;
import com.yupi.mianshiya.model.dto.article.ArticleQueryRequest;
import com.yupi.mianshiya.model.entity.Article;
import com.yupi.mianshiya.model.entity.ArticleFavour;
import com.yupi.mianshiya.model.entity.ArticleThumb;
import com.yupi.mianshiya.model.entity.User;
import com.yupi.mianshiya.model.vo.ArticleVO;
import com.yupi.mianshiya.model.vo.UserVO;
import com.yupi.mianshiya.service.ArticleService;
import com.yupi.mianshiya.service.UserService;
import com.yupi.mianshiya.utils.SqlUtils;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

/**
 * 文章服务实现
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
@Service
@Slf4j
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements ArticleService {

    @Resource
    private UserService userService;

    @Resource
    private ArticleThumbMapper articleThumbMapper;

    @Resource
    private ArticleFavourMapper articleFavourMapper;

    @Override
    public void validArticle(Article article, boolean add) {
        if (article == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String title = article.getTitle();
        String content = article.getContent();
        // 创建时，参数不能为空
        if (add) {
            ThrowUtils.throwIf(StringUtils.isAnyBlank(title, content), ErrorCode.PARAMS_ERROR);
        }
        // 有参数则校验
        if (StringUtils.isNotBlank(title) && title.length() > 512) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "标题过长");
        }
        if (StringUtils.isNotBlank(content) && content.length() > 65536) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "内容过长");
        }
        String summary = article.getSummary();
        if (StringUtils.isNotBlank(summary) && summary.length() > 1000) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "摘要过长");
        }
    }

    /**
     * 获取查询包装类
     *
     * @param articleQueryRequest
     * @return
     */
    @Override
    public QueryWrapper<Article> getQueryWrapper(ArticleQueryRequest articleQueryRequest) {
        QueryWrapper<Article> queryWrapper = new QueryWrapper<>();
        if (articleQueryRequest == null) {
            return queryWrapper;
        }
        String searchText = articleQueryRequest.getSearchText();
        String sortField = articleQueryRequest.getSortField();
        String sortOrder = articleQueryRequest.getSortOrder();
        Long id = articleQueryRequest.getId();
        String title = articleQueryRequest.getTitle();
        String content = articleQueryRequest.getContent();
        List<String> tagList = articleQueryRequest.getTags();
        String category = articleQueryRequest.getCategory();
        Integer status = articleQueryRequest.getStatus();
        Long userId = articleQueryRequest.getUserId();
        Boolean notPublic = articleQueryRequest.getNotPublic();
        // 拼接查询条件
        if (StringUtils.isNotBlank(searchText)) {
            queryWrapper.and(qw -> qw.like("title", searchText).or().like("content", searchText));
        }
        queryWrapper.like(StringUtils.isNotBlank(title), "title", title);
        queryWrapper.like(StringUtils.isNotBlank(content), "content", content);
        queryWrapper.eq(StringUtils.isNotBlank(category), "category", category);
        if (CollUtil.isNotEmpty(tagList)) {
            for (String tag : tagList) {
                queryWrapper.like("tags", "\"" + tag + "\"");
            }
        }
        queryWrapper.eq(ObjectUtils.isNotEmpty(id), "id", id);
        queryWrapper.eq(ObjectUtils.isNotEmpty(userId), "userId", userId);
        queryWrapper.eq(ObjectUtils.isNotEmpty(status), "status", status);
        // 如果不是查看非公开内容，默认只查看已发布的
        if (notPublic == null || !notPublic) {
            queryWrapper.eq("status", 1);
        }
        queryWrapper.orderBy(SqlUtils.validSortField(sortField), sortOrder.equals(CommonConstant.SORT_ORDER_ASC),
                sortField);
        return queryWrapper;
    }

    @Override
    public ArticleVO getArticleVO(Article article, HttpServletRequest request) {
        ArticleVO articleVO = ArticleVO.objToVo(article);
        long articleId = article.getId();
        // 1. 关联查询用户信息
        Long userId = article.getUserId();
        User user = null;
        if (userId != null && userId > 0) {
            user = userService.getById(userId);
        }
        UserVO userVO = userService.getUserVO(user);
        articleVO.setUser(userVO);
        // 2. 已登录，获取用户点赞、收藏状态
        User loginUser = userService.getLoginUserPermitNull(request);
        if (loginUser != null) {
            // 获取点赞
            QueryWrapper<ArticleThumb> articleThumbQueryWrapper = new QueryWrapper<>();
            articleThumbQueryWrapper.in("articleId", articleId);
            articleThumbQueryWrapper.eq("userId", loginUser.getId());
            ArticleThumb articleThumb = articleThumbMapper.selectOne(articleThumbQueryWrapper);
            articleVO.setHasThumb(articleThumb != null);
            // 获取收藏
            QueryWrapper<ArticleFavour> articleFavourQueryWrapper = new QueryWrapper<>();
            articleFavourQueryWrapper.in("articleId", articleId);
            articleFavourQueryWrapper.eq("userId", loginUser.getId());
            ArticleFavour articleFavour = articleFavourMapper.selectOne(articleFavourQueryWrapper);
            articleVO.setHasFavour(articleFavour != null);
        }
        return articleVO;
    }

    @Override
    public Page<ArticleVO> getArticleVOPage(Page<Article> articlePage, HttpServletRequest request) {
        List<Article> articleList = articlePage.getRecords();
        Page<ArticleVO> articleVOPage = new Page<>(articlePage.getCurrent(), articlePage.getSize(), articlePage.getTotal());
        if (CollUtil.isEmpty(articleList)) {
            return articleVOPage;
        }
        // 1. 关联查询用户信息
        Set<Long> userIdSet = articleList.stream().map(Article::getUserId).collect(Collectors.toSet());
        Map<Long, List<User>> userIdUserListMap = userService.listByIds(userIdSet).stream()
                .collect(Collectors.groupingBy(User::getId));
        // 2. 已登录，获取用户点赞、收藏状态
        Map<Long, Boolean> articleIdHasThumbMap = new HashMap<>();
        Map<Long, Boolean> articleIdHasFavourMap = new HashMap<>();
        User loginUser = userService.getLoginUserPermitNull(request);
        if (loginUser != null) {
            Set<Long> articleIdSet = articleList.stream().map(Article::getId).collect(Collectors.toSet());
            loginUser = userService.getLoginUser(request);
            // 获取点赞
            QueryWrapper<ArticleThumb> articleThumbQueryWrapper = new QueryWrapper<>();
            articleThumbQueryWrapper.in("articleId", articleIdSet);
            articleThumbQueryWrapper.eq("userId", loginUser.getId());
            List<ArticleThumb> articleArticleThumbList = articleThumbMapper.selectList(articleThumbQueryWrapper);
            articleArticleThumbList.forEach(articleThumb -> articleIdHasThumbMap.put(articleThumb.getArticleId(), true));
            // 获取收藏
            QueryWrapper<ArticleFavour> articleFavourQueryWrapper = new QueryWrapper<>();
            articleFavourQueryWrapper.in("articleId", articleIdSet);
            articleFavourQueryWrapper.eq("userId", loginUser.getId());
            List<ArticleFavour> articleFavourList = articleFavourMapper.selectList(articleFavourQueryWrapper);
            articleFavourList.forEach(articleFavour -> articleIdHasFavourMap.put(articleFavour.getArticleId(), true));
        }
        // 填充信息
        List<ArticleVO> articleVOList = articleList.stream().map(article -> {
            ArticleVO articleVO = ArticleVO.objToVo(article);
            Long userId = article.getUserId();
            User user = null;
            if (userIdUserListMap.containsKey(userId)) {
                user = userIdUserListMap.get(userId).get(0);
            }
            articleVO.setUser(userService.getUserVO(user));
            articleVO.setHasThumb(articleIdHasThumbMap.getOrDefault(article.getId(), false));
            articleVO.setHasFavour(articleIdHasFavourMap.getOrDefault(article.getId(), false));
            return articleVO;
        }).collect(Collectors.toList());
        articleVOPage.setRecords(articleVOList);
        return articleVOPage;
    }

    @Override
    public void addViewNum(Long articleId) {
        if (articleId != null && articleId > 0) {
            Article article = this.getById(articleId);
            if (article != null) {
                article.setViewNum(article.getViewNum() + 1);
                this.updateById(article);
            }
        }
    }
}
