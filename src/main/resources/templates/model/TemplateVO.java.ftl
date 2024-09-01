package ${packageName}.model.vo;

import cn.hutool.json.JSONUtil;
import ${packageName}.model.entity.${upperDataKey};
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * ${dataName}视图
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://www.code-nav.cn">编程导航学习圈</a>
 */
@Data
public class ${upperDataKey}VO implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 标题
     */
    private String title;

    /**
     * 内容
     */
    private String content;

    /**
     * 创建用户 id
     */
    private Long userId;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 标签列表
     */
    private List<String> tagList;

    /**
     * 创建用户信息
     */
    private UserVO user;

    /**
     * 封装类转对象
     *
     * @param ${dataKey}VO
     * @return
     */
    public static ${upperDataKey} voToObj(${upperDataKey}VO ${dataKey}VO) {
        if (${dataKey}VO == null) {
            return null;
        }
        ${upperDataKey} ${dataKey} = new ${upperDataKey}();
        BeanUtils.copyProperties(${dataKey}VO, ${dataKey});
        List<String> tagList = ${dataKey}VO.getTagList();
        ${dataKey}.setTags(JSONUtil.toJsonStr(tagList));
        return ${dataKey};
    }

    /**
     * 对象转封装类
     *
     * @param ${dataKey}
     * @return
     */
    public static ${upperDataKey}VO objToVo(${upperDataKey} ${dataKey}) {
        if (${dataKey} == null) {
            return null;
        }
        ${upperDataKey}VO ${dataKey}VO = new ${upperDataKey}VO();
        BeanUtils.copyProperties(${dataKey}, ${dataKey}VO);
        ${dataKey}VO.setTagList(JSONUtil.toList(${dataKey}.getTags(), String.class));
        return ${dataKey}VO;
    }
}
