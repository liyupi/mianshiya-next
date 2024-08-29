package ${packageName}.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import ${packageName}.model.dto.${dataKey}.${upperDataKey}QueryRequest;
import ${packageName}.model.entity.${upperDataKey};
import ${packageName}.model.vo.${upperDataKey}VO;

import javax.servlet.http.HttpServletRequest;

/**
 * ${dataName}服务
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://www.code-nav.cn">编程导航学习圈</a>
 */
public interface ${upperDataKey}Service extends IService<${upperDataKey}> {

    /**
     * 校验数据
     *
     * @param ${dataKey}
     * @param add 对创建的数据进行校验
     */
    void valid${upperDataKey}(${upperDataKey} ${dataKey}, boolean add);

    /**
     * 获取查询条件
     *
     * @param ${dataKey}QueryRequest
     * @return
     */
    QueryWrapper<${upperDataKey}> getQueryWrapper(${upperDataKey}QueryRequest ${dataKey}QueryRequest);
    
    /**
     * 获取${dataName}封装
     *
     * @param ${dataKey}
     * @param request
     * @return
     */
    ${upperDataKey}VO get${upperDataKey}VO(${upperDataKey} ${dataKey}, HttpServletRequest request);

    /**
     * 分页获取${dataName}封装
     *
     * @param ${dataKey}Page
     * @param request
     * @return
     */
    Page<${upperDataKey}VO> get${upperDataKey}VOPage(Page<${upperDataKey}> ${dataKey}Page, HttpServletRequest request);
}
