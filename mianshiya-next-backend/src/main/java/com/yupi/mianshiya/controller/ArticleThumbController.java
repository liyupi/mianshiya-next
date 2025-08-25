package com.yupi.mianshiya.controller;

import com.yupi.mianshiya.common.BaseResponse;
import com.yupi.mianshiya.common.ErrorCode;
import com.yupi.mianshiya.common.ResultUtils;
import com.yupi.mianshiya.exception.BusinessException;
import com.yupi.mianshiya.model.dto.article.ArticleThumbAddRequest;
import com.yupi.mianshiya.model.entity.User;
import com.yupi.mianshiya.service.ArticleThumbService;
import com.yupi.mianshiya.service.UserService;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 文章点赞接口
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
@RestController
@RequestMapping("/article_thumb")
@Slf4j
public class ArticleThumbController {

    @Resource
    private ArticleThumbService articleThumbService;

    @Resource
    private UserService userService;

    /**
     * 点赞 / 取消点赞
     *
     * @param articleThumbAddRequest
     * @param request
     * @return resultNum 本次点赞变化数
     */
    @PostMapping("/")
    public BaseResponse<Integer> doThumb(@RequestBody ArticleThumbAddRequest articleThumbAddRequest,
            HttpServletRequest request) {
        if (articleThumbAddRequest == null || articleThumbAddRequest.getArticleId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        // 登录才能点赞
        final User loginUser = userService.getLoginUser(request);
        long articleId = articleThumbAddRequest.getArticleId();
        int result = articleThumbService.doArticleThumb(articleId, loginUser);
        return ResultUtils.success(result);
    }

}
