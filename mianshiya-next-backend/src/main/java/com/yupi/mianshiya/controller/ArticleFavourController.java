package com.yupi.mianshiya.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yupi.mianshiya.common.BaseResponse;
import com.yupi.mianshiya.common.ErrorCode;
import com.yupi.mianshiya.common.ResultUtils;
import com.yupi.mianshiya.exception.BusinessException;
import com.yupi.mianshiya.exception.ThrowUtils;
import com.yupi.mianshiya.model.dto.article.ArticleFavourAddRequest;
import com.yupi.mianshiya.model.dto.article.ArticleQueryRequest;
import com.yupi.mianshiya.model.entity.Article;
import com.yupi.mianshiya.model.entity.User;
import com.yupi.mianshiya.model.vo.ArticleVO;
import com.yupi.mianshiya.service.ArticleFavourService;
import com.yupi.mianshiya.service.ArticleService;
import com.yupi.mianshiya.service.UserService;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 文章收藏接口
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
@RestController
@RequestMapping("/article_favour")
@Slf4j
public class ArticleFavourController {

    @Resource
    private ArticleFavourService articleFavourService;

    @Resource
    private ArticleService articleService;

    @Resource
    private UserService userService;

    /**
     * 收藏 / 取消收藏
     *
     * @param articleFavourAddRequest
     * @param request
     * @return resultNum 收藏变化数
     */
    @PostMapping("/")
    public BaseResponse<Integer> doArticleFavour(@RequestBody ArticleFavourAddRequest articleFavourAddRequest,
            HttpServletRequest request) {
        if (articleFavourAddRequest == null || articleFavourAddRequest.getArticleId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        // 登录才能操作
        final User loginUser = userService.getLoginUser(request);
        long articleId = articleFavourAddRequest.getArticleId();
        int result = articleFavourService.doArticleFavour(articleId, loginUser);
        return ResultUtils.success(result);
    }

    /**
     * 获取我收藏的文章列表
     *
     * @param articleQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/my/list/page/vo")
    public BaseResponse<Page<ArticleVO>> listMyFavourArticleByPage(@RequestBody ArticleQueryRequest articleQueryRequest,
            HttpServletRequest request) {
        if (articleQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User loginUser = userService.getLoginUser(request);
        long current = articleQueryRequest.getCurrent();
        long size = articleQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Article> articlePage = articleFavourService.listFavourArticleByPage(new Page<>(current, size),
                articleService.getQueryWrapper(articleQueryRequest), loginUser.getId());
        return ResultUtils.success(articleService.getArticleVOPage(articlePage, request));
    }

}
