package com.yupi.mianshiya.satoken;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.Header;
import cn.hutool.http.useragent.UserAgent;
import cn.hutool.http.useragent.UserAgentUtil;
import com.yupi.mianshiya.common.ErrorCode;
import com.yupi.mianshiya.exception.ThrowUtils;

import javax.servlet.http.HttpServletRequest;

/**
 * 设备工具类
 */
public class DeviceUtils {

    /**
     * 根据请求获取设备信息
     * @param request
     * @return
     */
    public static String getRequestDevice(HttpServletRequest request) {
        String userAgentStr = request.getHeader(Header.USER_AGENT.toString());
        // 使用 Hutool 解析 UserAgent
        UserAgent userAgent = UserAgentUtil.parse(userAgentStr);
        ThrowUtils.throwIf(userAgent == null, ErrorCode.OPERATION_ERROR, "非法请求");
        // 默认值是 PC
        String device = "pc";
        // 是否为小程序
        if (isMiniProgram(userAgentStr)) {
            device = "miniProgram";
        } else if (isPad(userAgentStr)) {
            // 是否为 Pad
            device = "pad";
        } else if (userAgent.isMobile()) {
            // 是否为手机
            device = "mobile";
        }
        return device;
    }

    /**
     * 判断是否是小程序
     * 一般通过 User-Agent 字符串中的 "MicroMessenger" 来判断是否是微信小程序
     **/
    private static boolean isMiniProgram(String userAgentStr) {
        // 判断 User-Agent 是否包含 "MicroMessenger" 表示是微信环境
        return StrUtil.containsIgnoreCase(userAgentStr, "MicroMessenger")
                && StrUtil.containsIgnoreCase(userAgentStr, "MiniProgram");
    }

    /**
     * 判断是否为平板设备
     * 支持 iOS（如 iPad）和 Android 平板的检测
     **/
    private static boolean isPad(String userAgentStr) {
        // 检查 iPad 的 User-Agent 标志
        boolean isIpad = StrUtil.containsIgnoreCase(userAgentStr, "iPad");

        // 检查 Android 平板（包含 "Android" 且不包含 "Mobile"）
        boolean isAndroidTablet = StrUtil.containsIgnoreCase(userAgentStr, "Android")
                && !StrUtil.containsIgnoreCase(userAgentStr, "Mobile");

        // 如果是 iPad 或 Android 平板，则返回 true
        return isIpad || isAndroidTablet;
    }
}
