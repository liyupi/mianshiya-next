package com.yupi.mianshiya.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yupi.mianshiya.annotation.AuthCheck;
import com.yupi.mianshiya.common.BaseResponse;
import com.yupi.mianshiya.common.DeleteRequest;
import com.yupi.mianshiya.common.ErrorCode;
import com.yupi.mianshiya.common.ResultUtils;
import com.yupi.mianshiya.constant.UserConstant;
import com.yupi.mianshiya.exception.BusinessException;
import com.yupi.mianshiya.exception.ThrowUtils;
import com.yupi.mianshiya.model.dto.article.ArticleAddRequest;
import com.yupi.mianshiya.model.dto.article.ArticleEditRequest;
import com.yupi.mianshiya.model.dto.article.ArticleQueryRequest;
import com.yupi.mianshiya.model.dto.article.ArticleUpdateRequest;
import com.yupi.mianshiya.model.entity.Article;
import com.yupi.mianshiya.model.entity.User;
import com.yupi.mianshiya.model.vo.ArticleVO;
import com.yupi.mianshiya.service.ArticleService;
import com.yupi.mianshiya.service.UserService;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 文章接口
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
@RestController
@RequestMapping("/article")
@Slf4j
public class ArticleController {

    @Resource
    private ArticleService articleService;

    @Resource
    private UserService userService;

    // region 增删改查

    /**
     * 创建
     *
     * @param articleAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    public BaseResponse<Long> addArticle(@RequestBody ArticleAddRequest articleAddRequest, HttpServletRequest request) {
        if (articleAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Article article = new Article();
        BeanUtils.copyProperties(articleAddRequest, article);
        List<String> tags = articleAddRequest.getTags();
        if (tags != null) {
            article.setTags(JSONUtil.toJsonStr(tags));
        }
        articleService.validArticle(article, true);
        User loginUser = userService.getLoginUser(request);
        article.setUserId(loginUser.getId());
        article.setFavourNum(0);
        article.setThumbNum(0);
        article.setViewNum(0);
        boolean result = articleService.save(article);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        long newArticleId = article.getId();
        return ResultUtils.success(newArticleId);
    }

    /**
     * 删除
     *
     * @param deleteRequest
     * @param request
     * @return
     */
    @PostMapping("/delete")
    public BaseResponse<Boolean> deleteArticle(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.getLoginUser(request);
        long id = deleteRequest.getId();
        // 判断是否存在
        Article oldArticle = articleService.getById(id);
        ThrowUtils.throwIf(oldArticle == null, ErrorCode.NOT_FOUND_ERROR);
        // 仅本人或管理员可删除
        if (!oldArticle.getUserId().equals(user.getId()) && !userService.isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        boolean b = articleService.removeById(id);
        return ResultUtils.success(b);
    }

    /**
     * 更新（仅管理员）
     *
     * @param articleUpdateRequest
     * @return
     */
    @PostMapping("/update")
    @SaCheckRole(UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateArticle(@RequestBody ArticleUpdateRequest articleUpdateRequest) {
        if (articleUpdateRequest == null || articleUpdateRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Article article = new Article();
        BeanUtils.copyProperties(articleUpdateRequest, article);
        List<String> tags = articleUpdateRequest.getTags();
        if (tags != null) {
            article.setTags(JSONUtil.toJsonStr(tags));
        }
        // 参数校验
        articleService.validArticle(article, false);
        long id = articleUpdateRequest.getId();
        // 判断是否存在
        Article oldArticle = articleService.getById(id);
        ThrowUtils.throwIf(oldArticle == null, ErrorCode.NOT_FOUND_ERROR);
        boolean result = articleService.updateById(article);
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取
     *
     * @param id
     * @return
     */
    @GetMapping("/get/vo")
    public BaseResponse<ArticleVO> getArticleVOById(long id, HttpServletRequest request) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Article article = articleService.getById(id);
        if (article == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        // 增加浏览数
        articleService.addViewNum(id);
        return ResultUtils.success(articleService.getArticleVO(article, request));
    }

    /**
     * 分页获取列表（仅管理员）
     *
     * @param articleQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    @SaCheckRole(UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<Article>> listArticleByPage(@RequestBody ArticleQueryRequest articleQueryRequest) {
        long current = articleQueryRequest.getCurrent();
        long size = articleQueryRequest.getPageSize();
        Page<Article> articlePage = articleService.page(new Page<>(current, size),
                articleService.getQueryWrapper(articleQueryRequest));
        return ResultUtils.success(articlePage);
    }

    /**
     * 分页获取列表（封装类）
     *
     * @param articleQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/list/page/vo")
    public BaseResponse<Page<ArticleVO>> listArticleVOByPage(@RequestBody ArticleQueryRequest articleQueryRequest,
            HttpServletRequest request) {
        long current = articleQueryRequest.getCurrent();
        long size = articleQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Article> articlePage = articleService.page(new Page<>(current, size),
                articleService.getQueryWrapper(articleQueryRequest));
        return ResultUtils.success(articleService.getArticleVOPage(articlePage, request));
    }

    /**
     * 分页获取当前用户创建的资源列表
     *
     * @param articleQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/my/list/page/vo")
    public BaseResponse<Page<ArticleVO>> listMyArticleVOByPage(@RequestBody ArticleQueryRequest articleQueryRequest,
            HttpServletRequest request) {
        if (articleQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User loginUser = userService.getLoginUser(request);
        articleQueryRequest.setUserId(loginUser.getId());
        articleQueryRequest.setNotPublic(true); // 可以查看自己的非公开文章
        long current = articleQueryRequest.getCurrent();
        long size = articleQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Article> articlePage = articleService.page(new Page<>(current, size),
                articleService.getQueryWrapper(articleQueryRequest));
        return ResultUtils.success(articleService.getArticleVOPage(articlePage, request));
    }

    // endregion

    /**
     * 编辑（用户）
     *
     * @param articleEditRequest
     * @param request
     * @return
     */
    @PostMapping("/edit")
    public BaseResponse<Boolean> editArticle(@RequestBody ArticleEditRequest articleEditRequest, HttpServletRequest request) {
        if (articleEditRequest == null || articleEditRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Article article = new Article();
        BeanUtils.copyProperties(articleEditRequest, article);
        List<String> tags = articleEditRequest.getTags();
        if (tags != null) {
            article.setTags(JSONUtil.toJsonStr(tags));
        }
        // 参数校验
        articleService.validArticle(article, false);
        User loginUser = userService.getLoginUser(request);
        long id = articleEditRequest.getId();
        // 判断是否存在
        Article oldArticle = articleService.getById(id);
        ThrowUtils.throwIf(oldArticle == null, ErrorCode.NOT_FOUND_ERROR);
        // 仅本人或管理员可编辑
        if (!oldArticle.getUserId().equals(loginUser.getId()) && !userService.isAdmin(loginUser)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        boolean result = articleService.updateById(article);
        return ResultUtils.success(result);
    }

}
